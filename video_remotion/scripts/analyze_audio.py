import numpy as np
from scipy.io import wavfile

rate, data = wavfile.read("public/audio/act1_raw.wav")
# Convert to mono if it's stereo
if len(data.shape) > 1:
    data = data[:, 0]

# Print the max amplitude of 0.1s windows in the last 1.5 seconds
window = int(rate * 0.1)
last_samples = int(rate * 1.5)
end_data = data[-last_samples:]

for i in range(15):
    chunk = end_data[i*window:(i+1)*window]
    print(f"Window {i*0.1:.1f}s - {(i+1)*0.1:.1f}s (from end - {1.5 - i*0.1:.1f}s): Max {np.max(np.abs(chunk))}")
