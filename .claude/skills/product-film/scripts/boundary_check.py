"""
boundary_check.py - the continuity gate. Compares pairs of frames that must
match: a step's last frame and the next step's first, a frame before and
after an edit, the film's last frame and its first (the loop).

  python3 boundary_check.py A.png:B.png [C.png:D.png ...] [--label name,...]

Pass = max channel difference <= 3 and no pixel over 8 (encoder-level noise).
On a failure it prints the bounding box of what differs, in the images' own
pixels (divide by 4 for window px on 4x textures), so you can find it.
Exit code 1 if any pair fails.
"""
import sys
import numpy as np
from PIL import Image

args = [a for a in sys.argv[1:] if not a.startswith("--")]
labels = next((a.split("=", 1)[1].split(",") for a in sys.argv[1:] if a.startswith("--label=")), [])
L = lambda p: np.asarray(Image.open(p).convert("RGB"), dtype=np.int16)
bad = 0
for i, pair in enumerate(args):
    a, b = pair.split(":")
    x, y = L(a), L(b)
    if x.shape != y.shape:
        print(f"FAIL {labels[i] if i < len(labels) else pair}: sizes differ {x.shape} vs {y.shape}"); bad += 1; continue
    q = np.abs(x - y).max(axis=2)
    over = int((q > 8).sum())
    ok = q.max() <= 3 and over == 0
    name = labels[i] if i < len(labels) else pair
    line = f"{'ok  ' if ok else 'FAIL'} {name}: max {int(q.max())}, pixels over 8: {over}"
    if not ok:
        ys, xs = np.where(q > 8) if over else np.where(q == q.max())
        line += f", differs in x {xs.min()}-{xs.max()}, y {ys.min()}-{ys.max()}"
        bad += 1
    print(line)
sys.exit(1 if bad else 0)
