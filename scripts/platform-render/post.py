"""
post.py - the finishing pass for the platform hero film, per frame:
glow, grain, and a wide eased edge fade to the hero charcoal so the film sits flush
on the dark hero with no visible rectangle.

  python3 scripts/platform-render/post.py IN.png OUT.png [--seed N]
  python3 scripts/platform-render/post.py IN_DIR OUT_DIR

Glow: bright and blue pixels (the lit screens, the blue rims) are blurred at
two radii and screened back on, so light spills softly onto the charcoal.
Grain: fine luminance noise, weighted toward the dark ground where film
grain shows, faded out at the edge so the border is pure #1f2126.
"""
import sys, os
import numpy as np
from PIL import Image, ImageFilter

HERO_BG = np.array([0x1F, 0x21, 0x26], dtype=np.float32) / 255
GLOW = 0.38          # overall glow strength
GRAIN = 0.011        # grain amplitude (0-1 scale); 0 for the web film, where
                     # the page lays grain over the video in CSS (animated grain
                     # defeats video compression)
import os as _os
if _os.environ.get("NO_GRAIN"):
    GRAIN = 0.0
EDGE_X = 0.15        # fraction of the width that fades to HERO_BG at each side
EDGE_Y = 0.2         # fraction of the height, top and bottom


def blur(arr, r):
    im = Image.fromarray((np.clip(arr, 0, 1) * 255).astype(np.uint8))
    return np.asarray(im.filter(ImageFilter.GaussianBlur(r)), dtype=np.float32) / 255


def finish(src, dst, seed=0):
    img = np.asarray(Image.open(src).convert("RGB"), dtype=np.float32) / 255
    h, w, _ = img.shape
    s = min(w, h)

    # glow source: luminance above the ground, plus anything strongly blue
    lum = img @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    blue = np.clip(img[..., 2] - img[..., 0] - 0.15, 0, 1)[..., None]
    src_glow = img * np.clip((lum - 0.55) / 0.45, 0, 1)[..., None] * 0.6 + img * blue * 1.6
    g = blur(src_glow, s * 0.012) * 0.6 + blur(src_glow, s * 0.045) * 0.4
    # screened on only where the frame is dark: the light spills onto the
    # charcoal but never hazes the UI's own text
    dark = np.clip(1 - lum / 0.5, 0, 1)[..., None] ** 2
    out = 1 - (1 - img) * (1 - np.clip(g * GLOW * 2.2 * dark, 0, 1))

    # edge fade: separate eased ramps on each axis, multiplied, so the sides
    # beside the rails dissolve over a wide band and the corners round off
    # instead of meeting in a box. Smootherstep has no visible start or end.
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    def ramp(d, band):
        t = np.clip(d / band, 0, 1)
        return t * t * t * (t * (t * 6 - 15) + 10)
    m = ramp(np.minimum(xx, w - 1 - xx), w * EDGE_X) * ramp(np.minimum(yy, h - 1 - yy), h * EDGE_Y)
    out = HERO_BG + (out - HERO_BG) * m[..., None]

    # grain: luminance only, stronger in the darks, none at the border
    rng = np.random.default_rng(seed)
    n = rng.standard_normal((h, w)).astype(np.float32)
    n = (n + np.roll(n, 1, 0) * 0.35 + np.roll(n, 1, 1) * 0.35) / 1.2
    lum = out @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    amt = GRAIN * (1.2 - 0.7 * lum) * m
    out = out + (n * amt)[..., None]

    Image.fromarray((np.clip(out, 0, 1) * 255 + 0.5).astype(np.uint8)).save(dst)


if __name__ == "__main__":
    a, b = sys.argv[1], sys.argv[2]
    if os.path.isdir(a):
        os.makedirs(b, exist_ok=True)
        for i, f in enumerate(sorted(os.listdir(a))):
            if f.endswith(".png"):
                finish(os.path.join(a, f), os.path.join(b, f), seed=i)
    else:
        finish(a, b)
