"""
storyboard.py - a captioned storyboard sheet: a scene's board frames in
beat order, each with its time, what happens and what lands. The sheet the
person approves before any final render.

  node scripts/platform-render/v3/frames.mjs SCENE OUT board <times> [--vp=WxH] --dsf=1 [--query=step=N]
  python3 .claude/skills/product-film/scripts/storyboard.py OUT beats.json SHEET.jpg

beats/sN.json: {"title": "...", "sub": "...", "beats": [{"t": 0.9, "head": "...", "text": "..."}]}
The frames are the ones frames.mjs names t<t>.jpg.
"""
import json, os, sys, textwrap
from PIL import Image, ImageDraw, ImageFont

src, spec_path, out = sys.argv[1:4]
spec = json.load(open(spec_path))
F = "/System/Library/Fonts/HelveticaNeue.ttc"
bold = lambda s: ImageFont.truetype(F, s, index=1)
reg = lambda s: ImageFont.truetype(F, s, index=0)
mono = ImageFont.truetype("/System/Library/Fonts/SFNSMono.ttf", 20)

COLS, CW, GAP, PAD = 2, 960, 36, 56
beats = spec["beats"]
thumbs = []
for b in beats:
    im = Image.open(os.path.join(src, f"t{b['t']:.2f}.jpg")).convert("RGB")
    thumbs.append(im.resize((CW, round(im.height * CW / im.width)), Image.LANCZOS))
TH = thumbs[0].height
CAP = 150
rows = (len(beats) + COLS - 1) // COLS
sub_lines = textwrap.wrap(spec["sub"], 150)
HEAD = 170 + 30 * (len(sub_lines) - 1)
W = PAD * 2 + COLS * CW + (COLS - 1) * GAP
H = HEAD + rows * (TH + CAP + GAP) + PAD
sheet = Image.new("RGB", (W, H), "#f4f5f7")
d = ImageDraw.Draw(sheet)
d.rectangle([0, 0, W, HEAD - 40], fill="#1f2126")
d.text((PAD, 38), spec["title"], font=bold(40), fill="#ffffff")
for j, line in enumerate(sub_lines):
    d.text((PAD, 92 + 30 * j), line, font=reg(24), fill="#b9bec8")
for i, (b, im) in enumerate(zip(beats, thumbs)):
    r, c = divmod(i, COLS)
    x, y = PAD + c * (CW + GAP), HEAD + r * (TH + CAP + GAP)
    sheet.paste(im, (x, y))
    d.rectangle([x, y, x + CW - 1, y + TH - 1], outline="#d9dde3")
    chip = f"{i + 1:02d} · {b['t']:.2f} s"
    tw = d.textlength(chip, font=mono)
    d.rounded_rectangle([x, y + TH + 16, x + tw + 20, y + TH + 46], radius=4, fill="#005bb7")
    d.text((x + 10, y + TH + 20), chip, font=mono, fill="#ffffff")
    d.text((x + tw + 34, y + TH + 17), b["head"], font=bold(24), fill="#17191f")
    for j, line in enumerate(textwrap.wrap(b["text"], 88)[:3]):
        d.text((x, y + TH + 58 + j * 28), line, font=reg(21), fill="#454b56")
sheet.save(out, quality=90)
print(out, sheet.size, len(beats), "beats")
