"""
quality_compare.py - pick an encode by measurement: decodes the same frames
from each candidate MP4 and reports PSNR against the source frames, with
file sizes. Use a fast push, a still with small type, a drag and a pull-back.

  python3 quality_compare.py SOURCE_FRAMES_DIR FRAMES CAND1.mp4 [CAND2.mp4 ...]

SOURCE_FRAMES_DIR: the joined, finished frames the MP4s were encoded from
FRAMES: comma list of 1-based frame numbers, e.g. 211,281,729,906
"""
import os, subprocess, sys, tempfile
import numpy as np
from PIL import Image

B = "/Applications/Blender.app/Contents/MacOS/Blender"
HERE = os.path.dirname(os.path.abspath(__file__))
src, frames, cands = sys.argv[1], [int(x) for x in sys.argv[2].split(",")], sys.argv[3:]
files = sorted(f for f in os.listdir(src) if f.endswith(".png"))
L = lambda p: np.asarray(Image.open(p).convert("RGB"), dtype=np.float64)
tmp = tempfile.mkdtemp()
size = "x".join(map(str, Image.open(os.path.join(src, files[0])).size))   # decode at the source frames' size
print(f"{'encode':34s} {'MB':>6s}  " + "  ".join(f"f{f:>5d}" for f in frames))
for c in cands:
    row = []
    for f in frames:
        out = os.path.join(tmp, f"{os.path.basename(c)}-{f}.png")
        subprocess.run([B, "-b", "-P", os.path.join(HERE, "decode_frame.py"), "--", c, str(f), out, size], capture_output=True)
        a, b = L(os.path.join(src, files[f - 1])), L(out)
        row.append(10 * np.log10(255 ** 2 / max(((a - b) ** 2).mean(), 1e-9)))
    print(f"{os.path.basename(c)[:34]:34s} {os.path.getsize(c) / 1e6:6.2f}  " + "  ".join(f"{x:5.1f}dB" for x in row))
