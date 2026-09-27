import os
import subprocess
import json
import numpy as np
from scipy.io import wavfile

FFMPEG_PATH = "/Users/juanpablo/Desktop/Pagina posgrados/video_remotion/node_modules/@ffmpeg-installer/darwin-arm64/ffmpeg"

def main():
    acts = ["act1", "act2", "act3", "act4", "act5"]
    
    for act in acts:
        raw_path = f"public/audio/{act}_raw.wav"
        fixed_wav_path = f"public/audio/{act}_fixed.wav"
        mp3_path = f"public/audio/posgrados_{act}.mp3"
        
        # Read wav
        rate, data = wavfile.read(raw_path)
        
        # Trim last 0.35 seconds to safely remove the glitch
        trim_samples = int(rate * 0.35)
        data = data[:-trim_samples]
        
        # Apply 0.1s fade out
        fade_samples = int(rate * 0.1)
        fade_curve = np.linspace(1.0, 0.0, fade_samples)
        data[-fade_samples:] = (data[-fade_samples:] * fade_curve).astype(data.dtype)
        
        # Save fixed wav
        wavfile.write(fixed_wav_path, rate, data)
        
        # Re-encode to mp3
        subprocess.run([
            FFMPEG_PATH, "-y",
            "-i", fixed_wav_path,
            "-af", "volume=2.0",
            "-c:a", "libmp3lame",
            "-b:a", "320k",
            "-ar", "44100",
            mp3_path
        ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        
        print(f"Fixed {mp3_path}")

if __name__ == '__main__':
    main()
