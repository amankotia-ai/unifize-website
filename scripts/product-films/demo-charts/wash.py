"""
wash.py - composite transparent film frames over the modal's left-pane wash
(book-demo.css: .uzd__stage.rf gradient + its two white hatch bands), the way
the page will show them. For boards and review cuts only; the page composites
the real thing live.

  python3 wash.py IN_DIR OUT_DIR [--scale 1] [--jpg]
"""
import os, sys
from PIL import Image, ImageDraw

src, out = sys.argv[1], sys.argv[2]
S = float(sys.argv[sys.argv.index("--scale") + 1]) if "--scale" in sys.argv else 1.0
JPG = "--jpg" in sys.argv
PW, PH = round(760 * S), round(700 * S)      # the pane at a 1440 x 900 viewport
VW, VH = round(720 * S), round(600 * S)      # the film box, centred


def hexrgb(h):
    return tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))


def wash():
    stops = [(0, hexrgb("#cfe3ff")), (0.55, hexrgb("#e3eeff")), (1, hexrgb("#f1f6ff"))]
    im = Image.new("RGB", (PW, PH))
    px = im.load()
    for y in range(PH):
        v = y / (PH - 1)
        for (a, ca), (b, cb) in zip(stops, stops[1:]):
            if a <= v <= b:
                k = (v - a) / (b - a)
                c = tuple(round(ca[i] + (cb[i] - ca[i]) * k) for i in range(3))
                break
        for x in range(PW):
            px[x, y] = c
    # the two white bands, faded out to the right (mask 20% -> 72%)
    band = Image.new("L", (PW, PH), 0)
    d = ImageDraw.Draw(band)
    d.rectangle([0, round(PH * 0.14), PW, round(PH * 0.26)], fill=round(255 * 0.4))
    d.rectangle([0, round(PH * 0.40), PW, round(PH * 0.48)], fill=round(255 * 0.26))
    mask = Image.new("L", (PW, 1))
    for x in range(PW):
        u = x / PW
        mask.putpixel((x, 0), 255 if u <= 0.2 else 0 if u >= 0.72 else round(255 * (0.72 - u) / 0.52))
    mask = mask.resize((PW, PH))
    band = Image.fromarray(__import__("numpy").minimum(
        __import__("numpy").array(band, dtype="uint16") * __import__("numpy").array(mask, dtype="uint16") // 255, 255).astype("uint8"))
    im.paste(Image.new("RGB", (PW, PH), (255, 255, 255)), (0, 0), band)
    return im


base = wash()
os.makedirs(out, exist_ok=True)
for f in sorted(os.listdir(src)):
    if not f.endswith(".png"):
        continue
    fr = Image.open(os.path.join(src, f)).convert("RGBA").resize((VW, VH), Image.LANCZOS)
    im = base.copy()
    im.paste(fr, ((PW - VW) // 2, (PH - VH) // 2), fr)
    name = os.path.splitext(f)[0] + (".jpg" if JPG else ".png")
    im.save(os.path.join(out, name), quality=92) if JPG else im.save(os.path.join(out, name))
print("washed", out)
