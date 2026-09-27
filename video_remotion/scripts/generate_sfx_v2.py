import wave
import struct
import math
import random
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO_DIR = os.path.join(BASE_DIR, "public", "audio")

def save_wav(filename, samples, sample_rate=44100):
    with wave.open(os.path.join(AUDIO_DIR, filename), 'w') as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(sample_rate)
        for s in samples:
            s = max(-1.0, min(1.0, s))
            f.writeframesraw(struct.pack('<h', int(s * 32767)))

sr = 44100

# 1. PREMIUM SWOOSH
# Use brown noise (integration of white noise) for a softer, deeper wind-like sound
dur = 0.6
samples_swoosh = []
last_val = 0
for i in range(int(sr * dur)):
    t = i / sr
    env = math.sin(t / dur * math.pi) ** 2  # Smoother envelope
    white = random.uniform(-1, 1)
    # Simple low pass (brown noise-ish)
    val = (last_val + (0.02 * white)) / 1.02
    last_val = val
    samples_swoosh.append(val * env * 2.0) # Boost since brown noise is lower amplitude

save_wav("swoosh.wav", samples_swoosh)

# 2. PREMIUM CLICK / POP (Apple-like soft pop)
dur_click = 0.15
samples_click = []
for i in range(int(sr * dur_click)):
    t = i / sr
    env = math.exp(-t * 150) # Fast decay
    # Low frequency pop (around 300Hz dropping)
    freq = 300 * math.exp(-t * 200)
    wave_val = math.sin(2 * math.pi * freq * t)
    samples_click.append(wave_val * env * 0.4)

save_wav("click.wav", samples_click)

print("✅ Premium SFX generated!")
