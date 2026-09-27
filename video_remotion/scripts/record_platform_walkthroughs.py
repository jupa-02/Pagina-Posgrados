import asyncio
import os
import subprocess
import math
from playwright.async_api import async_playwright

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CLIPS_DIR = os.path.join(BASE_DIR, "public", "assets", "clips")
TEMP_REC_DIR = os.path.join(BASE_DIR, "public", "assets", "temp_recordings")
os.makedirs(CLIPS_DIR, exist_ok=True)
os.makedirs(TEMP_REC_DIR, exist_ok=True)

FFMPEG_PATH = os.path.join(
    BASE_DIR, "node_modules", "@remotion", "compositor-darwin-arm64", "ffmpeg"
)
FFMPEG_ENV = os.environ.copy()
FFMPEG_ENV["DYLD_LIBRARY_PATH"] = os.path.dirname(FFMPEG_PATH)

def convert_webm_to_mp4(webm_path: str, mp4_path: str):
    cmd = [
        FFMPEG_PATH, "-y",
        "-i", webm_path,
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "18",
        "-pix_fmt", "yuv420p",
        "-r", "30",
        mp4_path
    ]
    subprocess.run(cmd, env=FFMPEG_ENV, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

async def move_cursor_to_selector(page, selector, duration=800):
    box = await page.locator(selector).first.bounding_box()
    if box:
        x = box["x"] + box["width"] / 2
        y = box["y"] + box["height"] / 2
        
        # Calculate steps based on duration. Playwright's mouse.move runs ~60 steps per second.
        steps = max(10, int(duration / 16))
        await page.mouse.move(x, y, steps=steps)
        return True
    return False

async def simulate_click(page, selector, duration=800):
    success = await move_cursor_to_selector(page, selector, duration)
    if success:
        await page.wait_for_timeout(200)
        await page.mouse.click(
            (await page.locator(selector).first.bounding_box())["x"] + (await page.locator(selector).first.bounding_box())["width"]/2,
            (await page.locator(selector).first.bounding_box())["y"] + (await page.locator(selector).first.bounding_box())["height"]/2
        )
        return True
    return False

async def smooth_scroll(page, target_y, duration_ms):
    await page.evaluate(f"""
        () => {{
            return new Promise((resolve) => {{
                const startY = window.scrollY;
                const endY = {target_y};
                const distance = endY - startY;
                const duration = {duration_ms};
                let startTime = null;
                
                function animation(currentTime) {{
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const ease = progress < .5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
                    
                    window.scrollTo(0, startY + (distance * ease));
                    
                    if (timeElapsed < duration) {{
                        requestAnimationFrame(animation);
                    }} else {{
                        resolve();
                    }}
                }}
                requestAnimationFrame(animation);
            }});
        }}
    """)

async def record_clip(name: str, record_func):
    rec_dir = os.path.join(TEMP_REC_DIR, name)
    os.makedirs(rec_dir, exist_ok=True)
    # Clear directory to prevent picking up old failed 0-byte webm files
    for f in os.listdir(rec_dir):
        os.remove(os.path.join(rec_dir, f))

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False, channel="chrome")
        context = await browser.new_context(
            viewport={"width": 1920, "height": 1080},
            device_scale_factor=1,
            record_video_dir=rec_dir,
            record_video_size={"width": 1920, "height": 1080}
        )
        page = await context.new_page()

        print(f"🎬 Grabando pantalla en vivo: [{name}]...")
        await record_func(page)

        await page.wait_for_timeout(1000)
        await context.close()
        await browser.close()

        files = [f for f in os.listdir(rec_dir) if f.endswith(".webm") and os.path.getsize(os.path.join(rec_dir, f)) > 0]
        if files:
            webm_file = os.path.join(rec_dir, files[-1]) # take the last one which is most likely correct
            mp4_file = os.path.join(CLIPS_DIR, f"{name}.mp4")
            convert_webm_to_mp4(webm_file, mp4_file)
            print(f"   ✓ Video generado: {mp4_file}")
            for f in files:
                os.remove(os.path.join(rec_dir, f))
            os.rmdir(rec_dir)

# 1. Clip Hero & Apertura
async def run_clip_hero(page):
    await page.goto("http://localhost:3000", wait_until="networkidle")
    await page.evaluate("document.body.style.overflow = 'hidden';")
    await page.wait_for_timeout(2000)
    
    await move_cursor_to_selector(page, "h1")
    await page.wait_for_timeout(1000)
    
    await smooth_scroll(page, 700, 3000)
    await page.wait_for_timeout(1500)
    await move_cursor_to_selector(page, "a:has-text('Explorar Cursos Cortos'), button:has-text('Explorar Cursos Cortos'), a:has-text('Explorar')", duration=1000)
    await page.wait_for_timeout(1000)
    await smooth_scroll(page, 1400, 2500)
    await page.wait_for_timeout(2000)

# 2. Clip Catálogo de 124 Cursos
async def run_clip_catalog(page):
    await page.goto("http://localhost:3000/", wait_until="networkidle")
    await page.evaluate("document.body.style.overflow = 'hidden';")
    await page.wait_for_timeout(1000)
    
    # Scroll deeper into the page to reach the catalog
    await smooth_scroll(page, 2200, 2500)
    await page.wait_for_timeout(1000)

    # Just smooth scroll down through the catalog to show the cards
    await smooth_scroll(page, 2800, 4000)
    await page.wait_for_timeout(2000)

# 3. Clip Ficha de Asignatura (4 Pestañas)
async def run_clip_course_tabs(page):
    await page.goto("http://localhost:3000/programas/28", wait_until="networkidle")
    await page.evaluate("document.body.style.overflow = 'hidden';")
    await page.wait_for_timeout(1500)

    await smooth_scroll(page, 500, 1500)
    await page.wait_for_timeout(1500)

    # Click Tab Temario
    if await page.locator("button:has-text('Temario'), button:has-text('Estructura')").count() > 0:
        await simulate_click(page, "button:has-text('Temario'), button:has-text('Estructura')")
        await page.wait_for_timeout(2500)

    # Click Tab Docente
    if await page.locator("button:has-text('Docente'), button:has-text('Metodología')").count() > 0:
        await simulate_click(page, "button:has-text('Docente'), button:has-text('Metodología')")
        await page.wait_for_timeout(2500)

    # Click Tab Certificación
    if await page.locator("button:has-text('Certificación'), button:has-text('QR')").count() > 0:
        await simulate_click(page, "button:has-text('Certificación'), button:has-text('QR')")
        await page.wait_for_timeout(3000)

    await smooth_scroll(page, 1100, 2000)
    await page.wait_for_timeout(2000)

# 4. Clip Pasarela PSE
async def run_clip_checkout(page):
    await page.goto("http://localhost:3000/checkout/simulador?ref=REF-UDEC-2026-DEMO", wait_until="networkidle")
    await page.evaluate("document.body.style.overflow = 'hidden';")
    await page.wait_for_timeout(2000)

    # Select bank dropdown
    if await page.locator("select").count() > 0:
        await simulate_click(page, "select")
        await page.wait_for_timeout(500)
        await page.locator("select").first.select_option("Bancolombia")
        await page.wait_for_timeout(1000)
        
        # Fill details
        # (Removed text input as it does not exist)
        await page.wait_for_timeout(500)

        # Click Pay
        await simulate_click(page, "button:has-text('Simular')")
    
    # Wait for success modal (or simulate wait)
    await page.wait_for_timeout(3000)

# 5. Clip B2B Empresas
async def run_clip_empresas(page):
    await page.goto("http://localhost:3000/empresas", wait_until="networkidle")
    await page.evaluate("document.body.style.overflow = 'hidden';")
    await page.wait_for_timeout(1000)

    # Calculate offset to the portal section
    await page.evaluate("""() => {
        const portal = document.getElementById('portal');
        if(portal) {
            window.scrollTo({top: portal.offsetTop - 50, behavior: 'smooth'});
        }
    }""")
    await page.wait_for_timeout(2500) # wait for smooth scroll

    # Just smooth scroll a little bit to show the portal interface
    await smooth_scroll(page, await page.evaluate("window.scrollY") + 300, 2000)
    await page.wait_for_timeout(3000)

async def main():
    print("=========================================================")
    print("🎬 INICIANDO MASTERIZACIÓN DE CLIPS DE VIDEO (PLAYWRIGHT)")
    print("=========================================================")
    await record_clip("clip_1_hero", run_clip_hero)
    await record_clip("clip_2_catalog", run_clip_catalog)
    await record_clip("clip_3_course_tabs", run_clip_course_tabs)
    await record_clip("clip_4_checkout", run_clip_checkout)
    await record_clip("clip_5_empresas", run_clip_empresas)
    print("\n✅ Todos los clips han sido grabados y masterizados con éxito.")

if __name__ == "__main__":
    asyncio.run(main())
