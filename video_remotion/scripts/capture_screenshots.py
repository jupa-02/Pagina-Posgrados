import asyncio
import os
from playwright.async_api import async_playwright

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "assets")
os.makedirs(OUTPUT_DIR, exist_ok=True)

async def capture():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(
            viewport={"width": 1920, "height": 1080},
            device_scale_factor=2
        )
        page = await context.new_page()

        # 1. Homepage Hero
        print("Capturing Homepage Hero...")
        await page.goto("http://localhost:3000", wait_until="networkidle")
        await page.wait_for_timeout(1000)
        await page.screenshot(path=os.path.join(OUTPUT_DIR, "screen_hero.png"))

        # 2. Homepage Catalog Section
        print("Capturing Course Catalog...")
        catalog_el = page.locator("#programas")
        if await catalog_el.count() > 0:
            await catalog_el.scroll_into_view_if_needed()
            await page.wait_for_timeout(800)
            await page.screenshot(path=os.path.join(OUTPUT_DIR, "screen_catalog.png"))

        # 3. Course Details (4 Tabs)
        print("Capturing Course Details...")
        await page.goto("http://localhost:3000/programas/28", wait_until="networkidle")
        await page.wait_for_timeout(1000)
        await page.screenshot(path=os.path.join(OUTPUT_DIR, "screen_course_tabs.png"))

        # 4. PSE Checkout Simulator
        print("Capturing Checkout Simulator...")
        await page.goto("http://localhost:3000/checkout/simulador?ref=REF-UDEC-2026-DEMO", wait_until="networkidle")
        await page.wait_for_timeout(1000)
        await page.screenshot(path=os.path.join(OUTPUT_DIR, "screen_checkout_pse.png"))

        # 5. Corporate Portal
        print("Capturing Corporate Portal...")
        await page.goto("http://localhost:3000/empresas", wait_until="networkidle")
        await page.wait_for_timeout(1000)
        portal_section = page.locator("#portal")
        if await portal_section.count() > 0:
            await portal_section.scroll_into_view_if_needed()
            await page.wait_for_timeout(800)
        await page.screenshot(path=os.path.join(OUTPUT_DIR, "screen_empresas_dashboard.png"))

        # 6. SMA Bridge
        print("Capturing SMA Bridge...")
        await page.goto("http://localhost:3000/admin/sma-bridge", wait_until="networkidle")
        await page.wait_for_timeout(1000)
        await page.screenshot(path=os.path.join(OUTPUT_DIR, "screen_sma_bridge.png"))

        await browser.close()
        print("✓ All screenshots captured successfully in:", OUTPUT_DIR)

if __name__ == "__main__":
    asyncio.run(capture())
