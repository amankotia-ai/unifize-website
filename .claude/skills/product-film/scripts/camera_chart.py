"""
camera_chart.py - draws a film's camera path from its scene: zoom and pan
over the whole film, step boundaries, the keys, and where the camera is
effectively still (where each step's key action should sit).

  python3 camera_chart.py SCENE.html OUT.png [--titles "A|B|..."]

Reads the CAM<n> key arrays and the S<n> step lengths from the scene.
"""
import math, re, sys
from PIL import Image, ImageDraw, ImageFont

scene, out = sys.argv[1], sys.argv[2]
titles = sys.argv[sys.argv.index("--titles") + 1].split("|") if "--titles" in sys.argv else []
src = open(scene).read()
lens = [float(x) for x in re.findall(r"S\d\s*=\s*([\d.]+)", re.search(r"const S1 = [^;]+;", src).group(0))]
cams = []
for n in range(1, len(lens) + 1):
    block = re.search(rf"const CAM{n} = \[(.*?)\];", src, re.S).group(1)
    cams.append([tuple(float(v) for v in m) for m in re.findall(r"t:\s*([\d.]+),\s*cx:\s*([\d.]+),\s*cy:\s*([\d.]+),\s*vw:\s*([\d.]+)", block)])

def monotone(xs, ys):
    n, d, m = len(xs), [], [0.0] * len(xs)
    for i in range(n - 1): d.append((ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i]))
    for i in range(1, n - 1):
        m[i] = 0 if d[i - 1] * d[i] <= 0 else (3 * (xs[i + 1] - xs[i - 1])) / ((2 * xs[i + 1] - xs[i] - xs[i - 1]) / d[i - 1] + (xs[i + 1] + xs[i] - 2 * xs[i - 1]) / d[i])
    def f(x):
        if x <= xs[0]: return ys[0]
        if x >= xs[-1]: return ys[-1]
        i = 0
        while x > xs[i + 1]: i += 1
        h = xs[i + 1] - xs[i]; s = (x - xs[i]) / h
        return (2*s**3 - 3*s**2 + 1) * ys[i] + (s**3 - 2*s**2 + s) * h * m[i] + (-2*s**3 + 3*s**2) * ys[i + 1] + (s**3 - s**2) * h * m[i + 1]
    return f

funcs = []
for keys in cams:
    ts = [k[0] for k in keys]
    funcs.append((monotone(ts, [k[1] for k in keys]), monotone(ts, [k[2] for k in keys]), monotone(ts, [math.log(k[3]) for k in keys])))
starts = [sum(lens[:i]) for i in range(len(lens))]
DUR = sum(lens)
def cam(T):
    T = min(max(T, 0.0), DUR)
    i = max(j for j in range(len(lens)) if T >= starts[j] - 1e-9)
    fx, fy, fz = funcs[i]; t = T - starts[i]
    return fx(t), fy(t), math.exp(fz(t))

W, H, L, R, TOP = 2400, 930, 90, 30, 70
PH = 300   # panel height
img = Image.new("RGB", (W, H), (23, 25, 29)); d = ImageDraw.Draw(img)
try: font = ImageFont.truetype("/System/Library/Fonts/SFNSMono.ttf", 18)
except Exception: font = ImageFont.load_default()
X = lambda T: L + (W - L - R) * T / DUR
zmax = max(2150 / cam(T / 30)[2] for T in range(int(DUR * 30)))
Yz = lambda z: TOP + PH - (z - 1) / (zmax - 1 + 1e-9) * (PH - 20)
Yp = lambda v, lo, hi: TOP + PH + 90 + PH - (v - lo) / (hi - lo) * (PH - 20)
# still spans (pan + zoom speed under 0.05 frame widths a second)
prev = None
for f in range(int(DUR * 30)):
    T = f / 30
    a, b = cam(T - 1 / 60), cam(T + 1 / 60)
    sp = (math.hypot(b[0] - a[0], b[1] - a[1]) / ((a[2] + b[2]) / 2) + abs(math.log(b[2] / a[2]))) * 30
    if sp < 0.05: d.rectangle([X(T), TOP, X(T + 1 / 30), H - 40], fill=(34, 52, 40))
    elif sp < 0.15: d.rectangle([X(T), TOP, X(T + 1 / 30), H - 40], fill=(28, 36, 32))
for i, s0 in enumerate(starts):
    d.line([X(s0), TOP - 30, X(s0), H - 40], fill=(90, 94, 102), width=2)
    label = f"{i + 1}  " + (titles[i] if i < len(titles) else "")
    d.text((X(s0) + 8, TOP - 34), label, fill=(210, 214, 220), font=font)
d.text((10, TOP + 4), "zoom", fill=(150, 156, 166), font=font)
d.text((10, TOP + PH + 94), "pan", fill=(150, 156, 166), font=font)
pts = [(X(f / 30), Yz(2150 / cam(f / 30)[2])) for f in range(int(DUR * 30) + 1)]
d.line(pts, fill=(217, 163, 91), width=4)
xs = [cam(f / 30)[0] for f in range(int(DUR * 30) + 1)]; ys = [cam(f / 30)[1] for f in range(int(DUR * 30) + 1)]
lo, hi = min(xs + ys) - 20, max(xs + ys) + 20
d.line([(X(f / 30), Yp(xs[f], lo, hi)) for f in range(len(xs))], fill=(70, 144, 240), width=3)
d.line([(X(f / 30), Yp(ys[f], lo, hi)) for f in range(len(ys))], fill=(150, 120, 230), width=3)
for i, keys in enumerate(cams):
    for k in keys:
        T = starts[i] + k[0]; z = 2150 / k[3]
        d.ellipse([X(T) - 6, Yz(z) - 6, X(T) + 6, Yz(z) + 6], outline=(240, 240, 240), width=2)
for z in (1, 1.5, 2, 2.5):
    if z <= zmax: d.text((L - 60, Yz(z) - 10), f"{z:.1f}x", fill=(120, 126, 136), font=font)
for s in range(0, int(DUR) + 1, 5):
    d.text((X(s) - 10, H - 36), f"{s}s", fill=(120, 126, 136), font=font)
d.text((L, H - 64), "orange: zoom (1x = whole window)   blue: pan x   violet: pan y   green: camera still (< 0.05 frame widths/s)   dim green: slow (< 0.15)", fill=(170, 176, 186), font=font)
img.save(out)
print(out, f"{DUR:.1f} s, {len(lens)} steps, max zoom {zmax:.2f}x")
