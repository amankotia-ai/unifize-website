"""
changed_frames.py - which frames of a step need re-rendering after an edit:
compares two texture folders from frames.mjs (flat mode), frame by frame
(texture bytes and camera.json), and prints 1-based ranges for film_step.py.

  python3 changed_frames.py OLD_TEX NEW_TEX
"""
import hashlib, json, os, sys

old, new = sys.argv[1], sys.argv[2]
ca, cb = json.load(open(os.path.join(old, "camera.json")))["cam"], json.load(open(os.path.join(new, "camera.json")))["cam"]
h = lambda p: hashlib.md5(open(p, "rb").read()).hexdigest()
n = min(len(ca), len(cb))
diff = [i + 1 for i in range(n)
        if h(os.path.join(old, f"f{i:04d}.png")) != h(os.path.join(new, f"f{i:04d}.png"))
        or any(abs(ca[i][k] - cb[i][k]) > 1e-6 for k in ca[i])]
diff += list(range(n + 1, len(cb) + 1))   # frames that did not exist before
runs = []
for f in diff:
    if runs and f == runs[-1][1] + 1: runs[-1][1] = f
    else: runs.append([f, f])
print(f"{len(diff)} of {len(cb)} frames changed")
print(" ".join(f"{a}:{b}" for a, b in runs) or "none")
