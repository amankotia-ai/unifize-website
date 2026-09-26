"""
contact_sheet.py - board frames (frames.mjs board, t<seconds>.jpg) into one
sheet in time order, for reviewing a step at a glance.

  python3 contact_sheet.py FRAMES_DIR OUT.jpg [--cols 2] [--width 800]
"""
import glob, os, sys
from PIL import Image, ImageDraw

d, out = sys.argv[1], sys.argv[2]
opt = lambda k, v: int(sys.argv[sys.argv.index(k) + 1]) if k in sys.argv else v
cols, w = opt("--cols", 2), opt("--width", 800)
fs = sorted(glob.glob(os.path.join(d, "t*.jpg")), key=lambda f: float(os.path.basename(f)[1:-4]))
assert fs, "no t*.jpg frames"
first = Image.open(fs[0]); h = round(w * first.height / first.width)
rows = (len(fs) + cols - 1) // cols
sheet = Image.new("RGB", (w * cols, (h + 22) * rows), (20, 21, 24))
draw = ImageDraw.Draw(sheet)
for i, f in enumerate(fs):
    x, y = (i % cols) * w, (i // cols) * (h + 22)
    draw.text((x + 8, y + 5), os.path.basename(f)[1:-4] + " s", fill=(200, 204, 210))
    sheet.paste(Image.open(f).resize((w, h)), (x, y + 22))
sheet.save(out, quality=85)
print(out, sheet.size, len(fs), "frames")
