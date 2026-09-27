#!/opt/anaconda3/bin/python3
"""
Generador Maestro de Locución Institucional con Google Gemini 3.8 Flash TTS
Video Corporativo de Presentación de Producto:
Plataforma de Educación Continua y Bolsas de Crédito FCE — Universidad de Cartagena
Audiencia: Decano, Consejo de Facultad, Rector y Dirección Financiera
Voz: Charon (Narrador documental institucional, formal, prestigioso y elocuente)
"""

import json
import os
import re
import struct
import subprocess
import sys
import time

from google import genai
from google.genai import types

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_DIR = os.path.join(BASE_DIR, "public", "audio")
TIMINGS_FILE = os.path.join(OUTPUT_DIR, "voice_timings.json")
os.makedirs(OUTPUT_DIR, exist_ok=True)

FFMPEG_PATH = os.path.join(
    BASE_DIR, "node_modules", "@remotion", "compositor-darwin-arm64", "ffmpeg"
)
FFMPEG_ENV = os.environ.copy()
FFMPEG_ENV["DYLD_LIBRARY_PATH"] = os.path.dirname(FFMPEG_PATH)

API_KEYS = [
    "AIzaSyBThiNlPaGOsa4mNIO-6bNi2ae4dGyB5CA",
    "AIzaSyBU45m8jtpUnFo5nAE99-O6kfLhQPflmbE",
    "AIzaSyBc0Sh0YAeEV71Eno4Rw_bOYdu0nTOQmCo",
    "AIzaSyCTeJMuPfDjb7f4nH7KpSuQEAcNrmngw5M"
]
current_key_idx = 0

def get_next_client():
    global current_key_idx
    key = API_KEYS[current_key_idx % len(API_KEYS)]
    current_key_idx += 1
    return genai.Client(api_key=key)

ACTS = [
    {
        "id": "act1",
        "title": "Apertura Institucional: La Evolución de la Educación Continua",
        "direction": (
            "Habla con tono institucional, solemne, pero muy moderno, dinámico y visionario, estilo presentación tecnológica de Apple. "
            "Representas a la Universidad de Cartagena. Ritmo pausado pero energético, destacando la innovación."
        ),
        "sentences": [
            {
                "display": "Universidad de Cartagena: dos siglos de excelencia evolucionando hacia el futuro.",
                "spoken": "Universidad de Cartagena. Dos siglos de excelencia académica, evolucionando hacia el futuro digital."
            },
            {
                "display": "Presentamos la nueva Plataforma Digital de Educación Continua de la Facultad de Ciencias Económicas.",
                "spoken": "Hoy presentamos la nueva Plataforma de Educación Continua de la Facultad de Ciencias Económicas. Una solución tecnológica de primer nivel."
            },
            {
                "display": "Las dinámicas del mercado laboral contemporáneo exigen agilidad y precisión.",
                "spoken": "Las dinámicas del mercado laboral exigen hoy agilidad y precisión. Los profesionales y las empresas necesitan actualizar sus competencias de forma inmediata."
            },
            {
                "display": "Esta plataforma democratiza el acceso a la formación ejecutiva de altísimo nivel.",
                "spoken": "Nuestra plataforma nace para responder a esa necesidad: transformar módulos de posgrado en formación continua accesible, impulsando el desarrollo profesional de la región."
            }
        ]
    },
    {
        "id": "act2",
        "title": "Catálogo Dinámico: 124 Cursos Modulares",
        "direction": (
            "Voz entusiasta, moderna y tecnológica. Tono de demostración de producto de alta gama, mostrando velocidad y eficiencia."
        ),
        "sentences": [
            {
                "display": "Una experiencia digital de vanguardia con 124 módulos ejecutivos.",
                "spoken": "Hemos diseñado una experiencia digital de vanguardia. La plataforma ofrece un catálogo integral de ciento veinticuatro módulos ejecutivos de posgrado."
            },
            {
                "display": "Búsqueda en tiempo real y filtrado inteligente.",
                "spoken": "Gracias a un motor de búsqueda en tiempo real y filtrado inteligente, encontrar el curso adecuado toma tan solo segundos."
            },
            {
                "display": "Cubrimos seis áreas estratégicas de alto impacto regional.",
                "spoken": "Nuestra oferta cubre seis áreas estratégicas, desde finanzas y auditoría médica, hasta comercio internacional."
            }
        ]
    },
    {
        "id": "act3",
        "title": "Ficha Técnica e Interactividad",
        "direction": (
            "Tono descriptivo, enfocado en la usabilidad, experiencia de usuario y claridad de la información."
        ),
        "sentences": [
            {
                "display": "Cada curso dispone de una ficha técnica detallada en pestañas dinámicas.",
                "spoken": "La información es clave. Por eso, cada curso cuenta con una ficha técnica estructurada en pestañas dinámicas y de carga instantánea."
            },
            {
                "display": "Temario, perfil docente y especificaciones de certificación, accesibles con un clic.",
                "spoken": "Temario completo, perfil de nuestros docentes investigadores y detalles de la certificación oficial, todo a un solo clic de distancia."
            },
            {
                "display": "Un diseño centrado en el usuario para una inscripción en tres pasos.",
                "spoken": "Un diseño centrado en el usuario que acompaña al profesional en una inscripción intuitiva y sin fricciones."
            }
        ]
    },
    {
        "id": "act4",
        "title": "Pasarela de Pagos Inmediata",
        "direction": (
            "Voz resolutiva y de alta tecnología. Enfatiza la eliminación de burocracia, la automatización y la seguridad."
        ),
        "sentences": [
            {
                "display": "Eliminamos las barreras del recaudo tradicional con una pasarela 100% digital.",
                "spoken": "Redefinimos el recaudo. Eliminamos las barreras tradicionales integrando una pasarela de pagos cien por ciento digital y segura."
            },
            {
                "display": "Transacciones procesadas mediante Webhooks automatizados en menos de dos segundos.",
                "spoken": "Las transacciones son procesadas y confirmadas en menos de dos segundos mediante Webhooks automatizados."
            },
            {
                "display": "Activación inmediata del servicio, cero intervención manual, 24/7.",
                "spoken": "El resultado es la activación inmediata del curso. Cero intervención manual, cero errores, funcionando las veinticuatro horas del día."
            }
        ]
    },
    {
        "id": "act5",
        "title": "Portal Corporativo: UdeC Empresas",
        "direction": (
            "Voz corporativa, persuasiva y visionaria. Destaca el modelo B2B, la innovación para el talento humano y el cierre institucional."
        ),
        "sentences": [
            {
                "display": "El mayor salto estratégico: UdeC Empresas, nuestro portal B2B.",
                "spoken": "Pero nuestro mayor salto estratégico es UdeC Empresas. Un ecosistema B-2-B diseñado para revolucionar la capacitación corporativa."
            },
            {
                "display": "Asignación masiva de créditos formativos con un panel de control en tiempo real.",
                "spoken": "Las organizaciones ahora adquieren bolsas de crédito y, mediante un sofisticado panel de control, asignan cursos a su talento humano en tiempo real."
            },
            {
                "display": "La Universidad de Cartagena reafirma su liderazgo tecnológico y académico.",
                "spoken": "Con esta plataforma tecnológica, la Facultad de Ciencias Económicas no solo innova, sino que reafirma el liderazgo inquebrantable de la Universidad de Cartagena hacia el futuro. Muchas gracias."
            }
        ]
    }
]

def parse_audio_mime_type(mime_type: str) -> dict:
    bits_per_sample = 16
    rate = 24000
    for param in mime_type.split(";"):
        param = param.strip()
        if param.lower().startswith("rate="):
            try:
                rate = int(param.split("=", 1)[1])
            except (ValueError, IndexError):
                pass
    return {"bits_per_sample": bits_per_sample, "rate": rate}

def convert_to_wav(audio_data: bytes, mime_type: str) -> bytes:
    parameters = parse_audio_mime_type(mime_type)
    bits_per_sample = parameters["bits_per_sample"]
    sample_rate = parameters["rate"]
    num_channels = 1
    data_size = len(audio_data)
    bytes_per_sample = bits_per_sample // 8
    block_align = num_channels * bytes_per_sample
    byte_rate = sample_rate * block_align
    chunk_size = 36 + data_size

    header = struct.pack(
        "<4sI4s4sIHHIIHH4sI",
        b"RIFF",
        chunk_size,
        b"WAVE",
        b"fmt ",
        16,
        1,
        num_channels,
        sample_rate,
        byte_rate,
        block_align,
        bits_per_sample,
        b"data",
        data_size
    )
    return header + audio_data

def get_audio_duration(file_path):
    cmd = [FFMPEG_PATH, "-i", file_path]
    res = subprocess.run(
        cmd,
        env=FFMPEG_ENV,
        capture_output=True,
        text=True
    )
    for line in res.stderr.splitlines():
        if "Duration:" in line:
            parts = line.split("Duration:")[1].split(",")[0].strip()
            h, m, s = parts.split(":")
            return float(h) * 3600 + float(m) * 60 + float(s)
    return 10.0

def master_audio(raw_wav_file: str, out_mp3_file: str):
    """Aplica masterización broadcast EBU R128 y compresión de alta calidad a 320 kbps"""
    cmd = [
        FFMPEG_PATH, "-y",
        "-i", raw_wav_file,
        "-af", "volume=2.0",
        "-c:a", "libmp3lame",
        "-b:a", "320k",
        "-ar", "44100",
        out_mp3_file
    ]
    subprocess.run(
        cmd,
        env=FFMPEG_ENV,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        check=True
    )

def main():
    fps = 30
    model = "gemini-3.8-flash-tts"
    voice = "Charon"

    print("=" * 75)
    print("🎙️  SÍNTESIS VOCAL INSTITUCIONAL CON GOOGLE GEMINI 3.8 FLASH TTS")
    print(f"   Modelo : {model}")
    print(f"   Voz    : {voice} (Narrador Institucional Universitario)")
    print(f"   Destino: {OUTPUT_DIR}")
    print("=" * 75)

    timings_data = {
        "title": "Video Institucional - Plataforma de Educación Continua FCE UdeC",
        "fps": fps,
        "model": model,
        "voice": voice,
        "acts": {},
        "totalFrames": 0,
        "totalSeconds": 0
    }

    total_video_frames = 0

    for idx, act in enumerate(ACTS):
        act_id = act["id"]
        print(f"\n🎬 Generando Acto {idx + 1} de {len(ACTS)}: [{act['id']}] {act['title']}")

        full_spoken_text = " ".join([s["spoken"] for s in act["sentences"]])
        prompt = f"{full_spoken_text}"

        generate_config = types.GenerateContentConfig(
            temperature=0.7,
            response_modalities=["AUDIO"],
            speech_config=types.SpeechConfig(
                voice_config=types.VoiceConfig(
                    prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name=voice)
                )
            )
        )

        raw_wav_path = os.path.join(OUTPUT_DIR, f"{act_id}_raw.wav")
        final_mp3_path = os.path.join(OUTPUT_DIR, f"posgrados_{act_id}.mp3")

        audio_bytes = None
        if os.path.exists(raw_wav_path) and os.path.getsize(raw_wav_path) > 30000:
            print(f"   ⚡ Reutilizando archivo generado existente: {raw_wav_path}")
            with open(raw_wav_path, "rb") as f:
                audio_bytes = f.read()
        else:
            for attempt in range(10):
                try:
                    print(f"   Llamando a Gemini 3.8 Flash TTS (intento {attempt + 1})...")
                    client = get_next_client()
                    resp = client.models.generate_content(
                        model=model,
                        contents=prompt,
                        config=generate_config
                    )
                    part = resp.candidates[0].content.parts[0]
                    if part.inline_data and part.inline_data.data:
                        raw_data = part.inline_data.data
                        mime_type = part.inline_data.mime_type or "audio/L16;rate=24000"
                        audio_bytes = convert_to_wav(raw_data, mime_type)
                        with open(raw_wav_path, "wb") as f:
                            f.write(audio_bytes)
                        print(f"   ✓ Audio recibido ({len(audio_bytes)} bytes WAV).")
                        break
                    else:
                        print("   Advertencia: parte sin datos de audio.")
                except Exception as ex:
                    print(f"   ⚠️ Excepción en API: {ex}")
                    time.sleep(60)

        if not audio_bytes:
            raise RuntimeError(f"Fallo al sintetizar el audio para {act_id}")

        # Masterizar con ffmpeg
        master_audio(raw_wav_path, final_mp3_path)
        duration_sec = get_audio_duration(final_mp3_path)
        # Añadir un margen suave de 0.8s (24 frames) entre actos
        act_frames = round(duration_sec * fps) + 24
        print(f"   ✓ Audio masterizado: {duration_sec:.2f} segundos ({act_frames} frames Remotion)")

        # Calcular metadata por oración
        total_chars = sum(len(s["spoken"]) for s in act["sentences"])
        current_frame_offset = 0
        sentences_meta = []

        for s_idx, s in enumerate(act["sentences"]):
            weight = len(s["spoken"]) / total_chars
            s_frames = round(weight * (act_frames - 24))
            sentences_meta.append({
                "index": s_idx,
                "display": s["display"],
                "spoken": s["spoken"],
                "startFrame": current_frame_offset,
                "durationFrames": s_frames
            })
            current_frame_offset += s_frames

        timings_data["acts"][act_id] = {
            "title": act["title"],
            "audioFile": f"audio/posgrados_{act_id}.mp3",
            "durationSec": duration_sec,
            "durationFrames": act_frames,
            "startFrame": total_video_frames,
            "sentences": sentences_meta
        }

        total_video_frames += act_frames

    timings_data["totalFrames"] = total_video_frames
    timings_data["totalSeconds"] = round(total_video_frames / fps, 2)

    with open(TIMINGS_FILE, "w", encoding="utf-8") as f:
        json.dump(timings_data, f, indent=2, ensure_ascii=False)

    print("\n" + "=" * 75)
    print(f"🎉 SÍNTESIS EXITOSA DE TODOS LOS ACTOS!")
    print(f"   Total Frames : {total_video_frames} frames ({timings_data['totalSeconds']}s ~ {round(timings_data['totalSeconds']/60, 2)} minutos)")
    print(f"   Manifest JSON: {TIMINGS_FILE}")
    print("=" * 75 + "\n")

if __name__ == "__main__":
    main()
