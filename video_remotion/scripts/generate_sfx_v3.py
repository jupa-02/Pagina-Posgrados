import numpy as np
from scipy.io import wavfile
import os

sample_rate = 44100

def generate_soft_click():
    # Very short, soft tick (like a Mac keyboard tap)
    duration = 0.015
    t = np.linspace(0, duration, int(sample_rate * duration), False)
    # Filtered noise + short sine
    noise = np.random.normal(0, 0.5, len(t))
    envelope = np.exp(-t * 300)
    audio = noise * envelope
    return np.int16(audio * 32767)

def generate_soft_swoosh():
    # Like a page turning or soft air
    duration = 0.4
    t = np.linspace(0, duration, int(sample_rate * duration), False)
    noise = np.random.normal(0, 0.3, len(t))
    # Bandpass filter approximation via envelope
    envelope = (np.sin(t * np.pi / duration)) ** 3
    audio = noise * envelope
    return np.int16(audio * 32767)

os.makedirs('public/audio', exist_ok=True)
wavfile.write('public/audio/click.wav', sample_rate, generate_soft_click())
wavfile.write('public/audio/swoosh.wav', sample_rate, generate_soft_swoosh())
print("V3 SFX generated.")
