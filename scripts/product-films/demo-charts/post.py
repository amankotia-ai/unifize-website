"""
post.py - join film.py's two passes into the finished transparent frames:
the lit marks (with their shadows off the catcher) laid over the translucent
tracks, straight alpha, sRGB, the way the browser will lay the video over
the wash.

  python3 post.py RENDER_DIR OUT_DIR        (RENDER_DIR holds marks/ and tracks/)
"""
import os, sys
from PIL import Image

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
names = sorted(f for f in os.listdir(os.path.join(src, "marks")) if f.endswith(".png"))
done = 0
for f in names:
    dst = os.path.join(out, f)
    tp = os.path.join(src, "tracks", f)
    if not os.path.exists(tp):
        continue
    if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(tp):
        continue
    marks = Image.open(os.path.join(src, "marks", f)).convert("RGBA")
    tracks = Image.open(tp).convert("RGBA")
    Image.alpha_composite(tracks, marks).save(dst, compress_level=3)
    done += 1
print("post", out, done, "of", len(names))
