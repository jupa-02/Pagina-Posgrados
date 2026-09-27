import cv2
import math
import numpy as np

video_path = "/Users/juanpablo/Desktop/Pagina posgrados/Grabación de pantalla 2026-09-26 a la(s) 11.39.46 p.m..mov"
cap = cv2.VideoCapture(video_path)
fps = cap.get(cv2.CAP_PROP_FPS)

# Extract a frame every 5 seconds
frames = []
for sec in range(0, 295, 5):
    frame_id = int(fps * sec)
    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_id)
    ret, frame = cap.read()
    if ret:
        # Resize to thumbnail to fit in memory easily (e.g. 320x180)
        thumb = cv2.resize(frame, (320, 180))
        # Add timestamp text
        cv2.putText(thumb, f"{sec}s", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
        frames.append(thumb)

cap.release()

# Create a grid. Let's say 10 columns wide.
cols = 10
rows = math.ceil(len(frames) / cols)

# Pad with black frames if necessary
while len(frames) < cols * rows:
    frames.append(np.zeros((180, 320, 3), dtype=np.uint8))

grid_rows = []
for i in range(rows):
    row_frames = frames[i*cols:(i+1)*cols]
    grid_rows.append(np.hstack(row_frames))

grid = np.vstack(grid_rows)
cv2.imwrite("video_grid.jpg", grid)
print("Saved video_grid.jpg")
