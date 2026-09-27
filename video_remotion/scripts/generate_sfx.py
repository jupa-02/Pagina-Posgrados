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
            # clip to [-1, 1]
            s = max(-1.0, min(1.0, s))
            f.writeframesraw(struct.pack('<h', int(s * 32767)))

# 1. Swoosh (Zoom effect) - Pink noise with fade
# Approximating swoosh with low pass filtered white noise that sweeps
sr = 44100
dur = 0.4
samples_swoosh = []
for i in range(int(sr * dur)):
    t = i / sr
    env = math.sin(t / dur * math.pi)  # Envelope
    noise = random.uniform(-1, 1) * 0.5
    samples_swoosh.append(noise * env)

save_wav("swoosh.wav", samples_swoosh)

# 2. Click (Ting effect) - Short high pitched ping
dur_click = 0.05
samples_click = []
for i in range(int(sr * dur_click)):
    t = i / sr
    env = math.exp(-t * 80)
    wave_val = math.sin(2 * math.pi * 1200 * t)
    samples_click.append(wave_val * env * 0.3)

save_wav("click.wav", samples_click)

# 3. Typing (Keyboard taps)
dur_type = 0.5
samples_type = []
taps = [0.0, 0.1, 0.25, 0.35, 0.45]
for i in range(int(sr * dur_type)):
    t = i / sr
    val = 0
    for tap in taps:
        if t > tap and t < tap + 0.02:
            env = math.exp(-(t-tap) * 200)
            val += random.uniform(-1, 1) * env * 0.15
    samples_type.append(val)

save_wav("typing.wav", samples_type)

print("✅ Custom SFX generated!")
