"""
make_previews.py - quarter-size JPG previews of each step's textures, so the
Blender overview file plays smoothly in the viewport.

  python3 make_previews.py BLENDER_FOLDER

BLENDER_FOLDER holds step<N>-<slug>/tex/f0000.png...; writes
step<N>-<slug>/preview/p0000.jpg... (1360 x 660).
"""
import os, sys
from multiprocessing import Pool
from PIL import Image

def one(job):
    src, dst = job
    Image.open(src).convert("RGB").resize((1360, 660), Image.BILINEAR).save(dst, quality=90)

if __name__ == "__main__":      # the guard matters: macOS spawns workers by re-importing this file
    root = os.path.abspath(sys.argv[1])
    jobs = []
    for step in sorted(d for d in os.listdir(root) if d.startswith("step") and os.path.isdir(os.path.join(root, d, "tex"))):
        src, dst = os.path.join(root, step, "tex"), os.path.join(root, step, "preview")
        os.makedirs(dst, exist_ok=True)
        jobs += [(os.path.join(src, f), os.path.join(dst, "p" + f[1:-4] + ".jpg")) for f in sorted(os.listdir(src)) if f.endswith(".png")]
    with Pool() as p:
        for i, _ in enumerate(p.imap_unordered(one, jobs, chunksize=4)):
            if i % 200 == 0: print(i, "/", len(jobs), flush=True)
    print(len(jobs), "previews")
