"""
film.py - the Book-a-demo modal chart films: three 8 s chapters in one 24 s
loop, each a published customer result charted as it happened, the "before"
in tax rust morphing into the "with Unifize" figure in brand blue. Direction
log: direction.md (same folder).

  1  Will-Burt     NCR closure        4 to 5 weeks  ->  7.2 days (75% faster)
  2  Applechem     approval cycle     3 to 8 months ->  about 2 weeks
  3  ATS Scientific internal audit prep  weeks      ->  under 30 minutes

One set of 35 pieces carries all three: a calendar of days (1), a strip of
weeks under a months axis (2), which bends into a one-hour clock (3), which
breaks back into the calendar, so the loop never cuts.

Every frame is a pure function of global time T in [0, 24): seek(T) puts
every object in its state at T. The film is transparent (shadow catcher),
the page's own gradient wash shows through.

  Blender -b -P film.py -- OUT_DIR [--times 1.2,4.5] [--frames 0:1440]
                           [--scale 2] [--samples 64] [--fps 60]
"""
import math, os, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import kit
from kit import (E, Solid, Stage, Text, clamp, ease, ease_out, ease_q, lerp,
                 lerp_strip, mixc, prog, rect_strip, sector_strip, strip_poly,
                 sub_strip, W, H, K)

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
OUT = os.path.abspath(argv[0]) if argv else "/tmp/demo-charts"
opt = lambda k, d: argv[argv.index(k) + 1] if k in argv else d
SCALE = float(opt("--scale", "2"))
SAMPLES = int(opt("--samples", "64"))
FPS = int(opt("--fps", "60"))
TIMES = [float(x) for x in opt("--times", "").split(",") if x]
FRAMES = opt("--frames", "")

FILM, TOTAL, N = 8.0, 24.0, 35

# ------------------------------------------------------------------ palette
# vibrant set (27 Sep, "vibrant green, orange, blue, not these dull colours"):
# orange = before (the cost), green = with Unifize (the result), blue = the
# brand accents (#0052FF, PRODUCT.md's primary)
INK, INK2, MUTED = "#17191f", "#3f4550", "#525b6a"
ORANGE, ORANGE_TEXT = "#ff6a00", "#d24e00"
GREEN, GREEN_TEXT = "#14c15a", "#0a8c3f"
BLUE = "#0052ff"
# DC_AFTER=blue tries the result in brand blue (green then only marks the gain)
AFTER = BLUE if os.environ.get("DC_AFTER") == "blue" else GREEN
TAX, TAX_TEXT = ORANGE, ORANGE_TEXT
WHITE, HAIR = "#ffffff", BLUE
TRACK_A = 0.8       # the frosted track: white at this opacity over the wash
TINT = "#f7b587"    # the "up to" part of a range: rust half way to white, opaque
TINT2 = "#fbd8bd"   # fainter still, the open end of "weeks"
LIFT, FLAT = float(os.environ.get("DC_LIFT", "1.6")), 0.4

# ------------------------------------------------------------------ layout
X0, X1 = 48, 672                     # the text column
EYE_Y, FIG_Y, SUB_Y, SRC_Y = 62, 136, 172, 560

# 1: the calendar, 7 days x 5 weeks, week labels at the right
CW, CH, CG, GX, GY = 74, 40, 8, 49, 238


def grid(i):
    c, r = i % 7, i // 7
    return rect_strip(GX + c * (CW + CG), GY + r * (CH + CG), CW, CH)


# 2: 35 weeks in one row under a months axis
SG, SY, SH = 3, 300, 64
SL = X1 - X0 + 2                     # 626: the strip's length
SW = (SL - (N - 1) * SG) / N


def strip_span(i, gap):
    """piece i's span along the strip's length, gaps of `gap` px"""
    w = (SL - (N - 1) * gap) / N
    return i * (w + gap), i * (w + gap) + w


def strip(i):
    s0, s1 = strip_span(i, SG)
    return rect_strip(X0 - 1 + s0, SY, s1 - s0, SH)


# 3: the strip bent into a ring (a one-hour clock): mid radius = SL / 2 pi
RC = (360, 350)
RR = SL / (2 * math.pi)              # 99.6
RT = 28                              # ring thickness


def bent(i, k, gap, thick, anchor):
    """piece i of the strip bent by k (0 = straight, 1 = closed ring): the
    middle of the strip stays at the bottom and the ends curl up to meet at
    twelve. The strip's top edge becomes the ring's inner edge."""
    s0, s1 = strip_span(i, gap)
    kap = 2 * math.pi / SL * max(k, 1e-5)
    ax, ay = anchor
    top, bot = [], []
    for j in range(K + 1):
        s = s0 + (s1 - s0) * j / K - SL / 2
        a = kap * s
        cx = math.sin(a) / kap
        cy = (1 - math.cos(a)) / kap       # upward, maths axes
        nx, ny = -math.sin(a), math.cos(a) # towards the centre of curvature
        h = thick / 2
        top.append((ax + cx + nx * h, ay - (cy + ny * h)))
        bot.append((ax + cx - nx * h, ay - (cy - ny * h)))
    return top, bot


def ring(i, gap=0.0):
    return bent(i, 1.0, gap, RT, (RC[0], RC[1] + RR))


def ring_angle(i):
    """clock angle (deg, clockwise from 12) of piece i's middle on the ring:
    piece 0 sits just left of twelve and the pieces run anticlockwise"""
    s0, s1 = strip_span(i, 0)
    s = (s0 + s1) / 2 - SL / 2
    return (180 - math.degrees(2 * math.pi / SL * s)) % 360


# ------------------------------------------------------------------ rigid morph
def centroid(S):
    pts = S[0] + S[1]
    return (sum(p[0] for p in pts) / len(pts), sum(p[1] for p in pts) / len(pts))


def rot(p, a):
    c, s = math.cos(a), math.sin(a)
    return (p[0] * c - p[1] * s, p[0] * s + p[1] * c)


def flipped(S):
    """the same piece described from its other edge (a 180 degree turn)"""
    return S[1][::-1], S[0][::-1]


def fly(A, a_ang, B, b_ang, k):
    """move piece A (turned a_ang) to piece B (turned b_ang): centroid on a
    straight path, turn by the short way, shape morphs in its own frame"""
    ca, cb = centroid(A), centroid(B)
    la = ([rot((x - ca[0], y - ca[1]), -a_ang) for x, y in A[0]],
          [rot((x - ca[0], y - ca[1]), -a_ang) for x, y in A[1]])
    lb = ([rot((x - cb[0], y - cb[1]), -b_ang) for x, y in B[0]],
          [rot((x - cb[0], y - cb[1]), -b_ang) for x, y in B[1]])
    loc = lerp_strip(la, lb, k)
    d = (b_ang - a_ang + math.pi) % (2 * math.pi) - math.pi
    ang = a_ang + d * k
    c = (lerp(ca[0], cb[0], k), lerp(ca[1], cb[1], k))
    return ([(c[0] + p[0], c[1] + p[1]) for p in (rot(q, ang) for q in loc[0])],
            [(c[0] + p[0], c[1] + p[1]) for p in (rot(q, ang) for q in loc[1])])


def ring_for_flight(i, gap):
    """piece i on the ring, described so it turns no more than 90 degrees on
    its way to an upright cell: returns (strip, its turn in radians)"""
    S = ring(i, gap)
    phi = ring_angle(i)
    turn = math.radians(phi - 180)            # inner edge on top
    if abs((turn + math.pi) % (2 * math.pi) - math.pi) > math.pi / 2:
        S, turn = flipped(S), turn + math.pi  # outer edge on top instead
    return S, turn


# ------------------------------------------------------------------ the pieces
def wrap(T, start):
    """time since `start`, measured forwards around the 24 s loop"""
    return (T - start) % TOTAL


def piece_shape(i, T):
    # 3 -> 1: the ring breaks and its pieces fly into the calendar
    u = wrap(T, 23.25)
    if u < 1.65:
        k = E(u, i * 0.02, i * 0.02 + 0.9, ease_q)
        A, a = ring_for_flight(i, 2.2 * E(u, 0.0, 0.35))
        return fly(A, a, grid(i), 0.0, k)
    # 1 -> 2: the calendar streams into one row of weeks
    if 7.4 <= T < 9.1:
        k = E(T, 7.4 + i * 0.018, 7.4 + i * 0.018 + 0.9, ease_q)
        return fly(grid(i), 0.0, strip(i), 0.0, k)
    if T < 9.1:
        return grid(i)
    # 3: the strip bends into the clock, the gaps close
    if T < 18.8:
        return strip(i)
    kb = E(T, 18.8, 20.4, ease_q)
    gap = lerp(SG, 0.0, E(T, 19.7, 20.5))
    thick = lerp(SH, RT, E(T, 18.8, 20.2))
    anchor = (360, lerp(SY + SH / 2, RC[1] + RR, E(T, 18.8, 20.3, ease_q)))
    if kb >= 1.0 and gap <= 0.0:
        return ring(i)
    return bent(i, kb, gap, thick, anchor)


def piece_fill(i, T):
    """(fraction, colour, opacity, blue wipe fraction) of piece i's fill at
    T. A result turns blue by a blue fill wiping over the rust, never by
    mixing the two (half way from rust to blue is a muddy purple)."""
    g = 0.0
    if T < FILM:
        t = T
        if i < 28:
            f = E(t, 1.0 + i * 0.05, 1.22 + i * 0.05, ease_out)
            col = TAX
        else:
            f = E(t, 2.45 + (i - 28) * 0.05, 2.67 + (i - 28) * 0.05, ease_out)
            col = TINT
        if i >= 8:
            f *= 1 - E(t, 3.5 + (34 - i) * 0.03, 3.7 + (34 - i) * 0.03)
        elif i == 7:
            f *= lerp(1.0, 0.2, E(t, 4.3, 4.68))
            g = 0.2 * E(t, 4.5, 4.8, ease_out)
        else:
            g = E(t, 3.95 + i * 0.05, 4.25 + i * 0.05)
        if i <= 7:
            d = 1 - E(t, 7.2 + (7 - i) * 0.03, 7.4 + (7 - i) * 0.03)
            f, g = f * d, g * d
        return f, col, 1.0, g
    if T < 2 * FILM:
        t = T - FILM
        if i < 13:
            f, col = E(t, 1.0 + i * 0.045, 1.2 + i * 0.045, ease_out), TAX
        else:
            f, col = E(t, 1.6 + (i - 13) * 0.03, 1.8 + (i - 13) * 0.03, ease_out), TINT
        if i >= 2:
            f *= 1 - E(t, 3.4 + (34 - i) * 0.025, 3.6 + (34 - i) * 0.025)
        else:
            g = E(t, 4.1 + i * 0.08, 4.4 + i * 0.08)
            d = 1 - E(t, 7.2 + (1 - i) * 0.05, 7.42 + (1 - i) * 0.05)
            f, g = f * d, g * d
        return f, col, 1.0, g
    t = T - 2 * FILM
    if i > 3:
        return 0.0, TAX, 0.0, 0.0
    col = [TAX, TAX, TINT, TINT2][i]
    f = E(t, 1.0 + i * 0.12, 1.25 + i * 0.12, ease_out)
    return f, col, 1 - E(t, 3.9, 4.3), 0.0


# ------------------------------------------------------------------ copy
CH1 = dict(eyebrow="NCR CLOSURE TIME", legend="1 SQUARE = 1 DAY",
           fig=("4 to 5 weeks", "7.2 days"), sub=("Average time to close an NCR", "Down from 4 to 5 weeks"),
           swap=4.2, source="The Will-Burt Company · published case study")
CH2 = dict(eyebrow="APPROVAL CYCLE TIME", legend="1 SQUARE = 1 WEEK",
           fig=("3 to 8 months", "About 2 weeks"), sub=("A typical approval, start to finish", "Down from 3 to 8 months"),
           swap=4.15, source="Applechem · published case study")
CH3 = dict(eyebrow="INTERNAL AUDIT PREP", legend="1 SQUARE = 1 WEEK",
           fig=("Weeks", "Under 30 minutes"), sub=("Getting ready for an internal audit", "Down from weeks"),
           swap=4.4, source="ATS Scientific Products · published case study")
CHAPTERS = [CH1, CH2, CH3]


def head_in(t, j):
    """an element of a chapter's head arriving (0 -> 1), stagger j"""
    return E(t, 0.3 + j * 0.06, 0.75 + j * 0.06, ease_out)


def head_out(t):
    return E(t, 7.2, 7.55)


# ------------------------------------------------------------------ build
stage = Stage(scale=SCALE, samples=SAMPLES, fps=FPS)

kit.LINK = stage.tracks
# unlit: flat white needs no light, and lit translucent layers crossing in
# flight shade each other into speckle
bases = [Solid(f"base{i}", WHITE, shadow=False, emission=True) for i in range(N)]
kit.LINK = stage.marks
fills = [Solid(f"fill{i}", TAX) for i in range(N)]
wipes = [Solid(f"wipe{i}", AFTER) for i in range(N)]
arc = Solid("arc", AFTER)

sq = Solid("eyesq", BLUE, shadow=False, emission=True)
sq.set([[(X0, 53), (X0 + 9, 53), (X0 + 9, 62), (X0, 62)]], h_mm=0.02)


def texts(font, size, col, align="LEFT", track=0.0):
    return [Text(font, size, col, align, track) for _ in range(3)]


eyebrow = texts("JetBrainsMono-500.ttf", 13, INK2, track=0.1)
legend = texts("JetBrainsMono-500.ttf", 13, MUTED, "RIGHT", 0.1)
fig_a = texts("IBMPlexSans-600.ttf", 58, TAX_TEXT)
fig_b = texts("IBMPlexSans-600.ttf", 58, INK)
sub_a = texts("Inter-400.ttf", 18, INK2)
sub_b = texts("Inter-400.ttf", 18, INK2)
source = texts("Inter-500.ttf", 14, MUTED)
chip = Text("IBMPlexSans-600.ttf", 30, GREEN_TEXT, "RIGHT")
legend3 = Text("JetBrainsMono-500.ttf", 13, MUTED, "RIGHT", 0.1)
weeks = [Text("JetBrainsMono-500.ttf", 12, MUTED, "RIGHT", 0.06) for _ in range(5)]
months = [Text("JetBrainsMono-500.ttf", 12, MUTED, "CENTER", 0.04) for _ in range(9)]
mticks = [Solid(f"mtick{m}", HAIR, shadow=False, emission=True) for m in range(9)]
cticks = [Solid(f"ctick{q}", HAIR, shadow=False, emission=True) for q in range(4)]
clabels = [Text("JetBrainsMono-500.ttf", 12, MUTED, "CENTER", 0.04) for _ in range(4)]


def slide(txt, body, x, y, a, dy):
    txt.set(body, x, y + dy, a)


# ------------------------------------------------------------------ seek
def seek(T):
    T %= TOTAL
    ch = int(T // FILM)
    t = T - ch * FILM

    # pieces: frosted track + fill
    for i in range(N):
        S = piece_shape(i, T)
        # one face only (a translucent slab stacks its top and bottom), lifted off
        # the shadow catcher so the two never share a plane
        # each piece on its own layer, so pieces crossing in flight overlap
        # cleanly instead of fighting for the same plane
        bases[i].set(strip_poly(S), h_mm=0, z0=0.1 + i * 0.01, a=TRACK_A)
        f, col, a, g = piece_fill(i, T)
        if f > 0.004 and a > 0.004:
            fills[i].color(col)
            fills[i].set(strip_poly(sub_strip(S, 0.0, f)), h_mm=LIFT, z0=0.05 + i * 0.01, a=a)
        else:
            fills[i].set([], a=0)
        if g > 0.004:
            wipes[i].set(strip_poly(sub_strip(S, 0.0, g)), h_mm=LIFT, z0=0.5 + i * 0.01)
        else:
            wipes[i].set([], a=0)

    # the clock's blue arc: sweeps clockwise from twelve
    th = 0.0
    if ch == 2:
        th = 170 * E(t, 4.35, 5.25) * (1 - E(t, 7.15, 7.45))
    if th > 0.3:
        S = sector_strip(RC[0], RC[1], RR - RT / 2, RR + RT / 2, 0, th)
        arc.set(strip_poly(S), h_mm=LIFT, z0=0.05)
    else:
        arc.set([], a=0)

    # heads: all three chapters' texts, only the live one visible
    for c, C in enumerate(CHAPTERS):
        live = c == ch
        tt = t if live else -1
        a_in = [head_in(tt, j) if live else 0 for j in range(5)]
        a_out = head_out(tt) if live else 1
        ga = lambda j: a_in[j] * (1 - a_out)
        dy = lambda j: (1 - a_in[j]) * 8 - a_out * 6
        sw = C["swap"]
        k_out = E(tt, sw, sw + 0.25) if live else 0
        k_in = E(tt, sw + 0.12, sw + 0.47, ease_out) if live else 0

        slide(eyebrow[c], C["eyebrow"], X0 + 18, EYE_Y, ga(0), dy(0))
        slide(fig_a[c], C["fig"][0], X0, FIG_Y, ga(1) * (1 - k_out), dy(1) - k_out * 6)
        slide(fig_b[c], C["fig"][1], X0, FIG_Y, k_in * (1 - a_out), (1 - k_in) * 8 - a_out * 6)
        slide(sub_a[c], C["sub"][0], X0, SUB_Y, ga(2) * (1 - k_out), dy(2) - k_out * 6)
        slide(sub_b[c], C["sub"][1], X0, SUB_Y, k_in * (1 - a_out), (1 - k_in) * 8 - a_out * 6)
        slide(source[c], C["source"], X0, SRC_Y, ga(4), dy(4))

    # legends: the same words across 2 -> 3 stay put; 3 swaps at the bend
    la = [0.0, 0.0, 0.0]
    if ch == 0:
        la[0] = head_in(t, 0) * (1 - head_out(t))
    elif ch == 1:
        la[1] = head_in(t, 0)
    else:
        la[1] = 1 - E(t, 3.5, 3.75)
    legend[0].set(CH1["legend"], X1, EYE_Y, la[0])
    legend[1].set(CH2["legend"], X1, EYE_Y, la[1])
    legend[2].set("", X1, EYE_Y, 0)
    l3 = E(t, 3.65, 4.0, ease_out) * (1 - head_out(t)) if ch == 2 else 0
    legend3.set("1 LAP = 1 HOUR", X1, EYE_Y + (1 - l3) * 6, l3)

    # 1: the chip counts up; week labels by the calendar
    if ch == 0:
        kc = E(t, 4.3, 5.0, ease_out)
        ca = E(t, 4.3, 4.55) * (1 - head_out(t))
        chip.set(f"{round(75 * kc)}% faster", X1, FIG_Y, ca)
        for r in range(5):
            weeks[r].set(f"WEEK {r + 1}", X1, GY + r * (CH + CG) + CH / 2 + 4,
                         head_in(t, 3) * (1 - E(t, 7.2, 7.5)))
    else:
        chip.set("", X1, FIG_Y, 0)
        for r in range(5):
            weeks[r].set("", X1, 0, 0)

    # 2 (and the start of 3): the months axis under the strip
    ma = 0.0
    if ch == 1:
        ma = E(t, 0.55, 1.0, ease_out)
    elif ch == 2:
        ma = 1 - E(t, 2.5, 2.8)
    for m in range(9):
        x = X0 - 1 + SL * (4.345 * m / 35)
        x = min(x, X1)
        mticks[m].set([[(x - 0.5, SY + SH + 8), (x + 0.5, SY + SH + 8),
                        (x + 0.5, SY + SH + 16), (x - 0.5, SY + SH + 16)]], h_mm=0.02, a=ma * 0.9)
        months[m].set("8 MO" if m == 8 else str(m), x, SY + SH + 34, ma)

    # 3: the clock's quarter ticks and labels
    qa = E(t, 4.25, 4.7, ease_out) * (1 - head_out(t)) if ch == 2 else 0
    for q in range(4):
        a = math.radians(q * 90)
        s, c = math.sin(a), -math.cos(a)
        r0, r1 = RR + RT / 2 + 5, RR + RT / 2 + 13
        w = 0.5
        px, py = -c * w, s * w
        p0 = (RC[0] + s * r0, RC[1] + c * r0)
        p1 = (RC[0] + s * r1, RC[1] + c * r1)
        cticks[q].set([[(p0[0] + px, p0[1] + py), (p1[0] + px, p1[1] + py),
                        (p1[0] - px, p1[1] - py), (p0[0] - px, p0[1] - py)]], h_mm=0.02, a=qa * 0.9)
        rl = RR + RT / 2 + 30
        clabels[q].set(["0", "15", "30", "45"][q], RC[0] + s * rl, RC[1] + c * rl + 4, qa)


# ------------------------------------------------------------------ stills
# One frame per chart with the before AND the result on it (a still has no
# morph to carry the comparison): the before in orange (solid, then hatched
# for the "up to" part of a range), the result in green laid over it, a key
# under the chart, and a green pill for the headline gain.
KEY_Y = 522
key_sw = [Solid(f"keysw{k}", c, shadow=False, emission=True) for k, c in enumerate((ORANGE, AFTER))]
key_hatch = Solid("keyhatch", ORANGE, shadow=False, emission=True)
key_tx = [Text("Inter-500.ttf", 14, INK2) for _ in range(3)]
pill = Solid("pill", GREEN)
pill_tx = Text("IBMPlexSans-600.ttf", 17, WHITE, "RIGHT", z=LIFT + 0.2)   # on the pill
hatches = [Solid(f"hatch{i}", ORANGE) for i in range(N)]


def half(poly, a, b, c):
    """clip a convex polygon to a*x + b*y <= c"""
    out = []
    for p, q in zip(poly, poly[1:] + poly[:1]):
        fp, fq = a * p[0] + b * p[1] - c, a * q[0] + b * q[1] - c
        if fp <= 0:
            out.append(p)
        if fp * fq < 0:
            k = fp / (fp - fq)
            out.append((p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k))
    return out


def hatch(S, period=6.0, width=2.2):
    """diagonal stripes ( / ) clipped to a strip, one convex quad at a time"""
    out = []
    for j in range(K):
        quad = [S[0][j], S[0][j + 1], S[1][j + 1], S[1][j]]
        us = [x + y for x, y in quad]
        c = math.floor(min(us) / period) * period
        while c < max(us):
            p = half(half(quad, -1, -1, -c), 1, 1, c + width * math.sqrt(2))
            if len(p) >= 3:
                out.append(p)
            c += period
    return out


def rounded(x0, y0, x1, y1, r, seg=10):
    pts = []
    for cx, cy, a0 in ((x1 - r, y0 + r, -90), (x1 - r, y1 - r, 0), (x0 + r, y1 - r, 90), (x0 + r, y0 + r, 180)):
        for s in range(seg + 1):
            a = math.radians(a0 + 90 * s / seg)
            pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
    return pts


def key(items):
    """the key under the chart: [(swatch kind, text)], left to right"""
    x = X0
    for k in range(3):
        key_tx[k].set("", 0, 0, 0)
    key_sw[0].set([], a=0)
    key_sw[1].set([], a=0)
    key_hatch.set([], a=0)
    for k, (kind, body) in enumerate(items):
        box = rect_strip(x, KEY_Y - 11, 12, 12)
        if kind == "before":
            key_sw[0].set(strip_poly(box), h_mm=0.02)
        elif kind == "range":
            key_hatch.set(hatch(box, 4.0, 1.6), h_mm=0.02)
        else:
            key_sw[1].set(strip_poly(box), h_mm=0.02)
        key_tx[k].set(body, x + 20, KEY_Y, 1)
        x += 20 + key_tx[k].width(body) + 28


def gain(body):
    tw = pill_tx.width(body)
    h, pad = 34, 15
    y1 = FIG_Y - 8
    pill.set([rounded(X1 - tw - 2 * pad, y1 - h, X1, y1, h / 2)], h_mm=LIFT)
    pill_tx.set(body, X1 - pad, y1 - 11, 1)


def still(n):
    T = {1: 6.6, 2: 14.2, 3: 22.6}[n]
    seek(T)
    chip.set("", X1, FIG_Y, 0)
    for i in range(N):
        hatches[i].set([], a=0)
        fills[i].set([], a=0)
        wipes[i].set([], a=0)
    if n in (1, 2):
        solid, after = (28, 7.2) if n == 1 else (13, 2)
        for i in range(N):
            S = grid(i) if n == 1 else strip(i)
            if i < solid:
                fills[i].color(ORANGE)
                fills[i].set(strip_poly(S), h_mm=LIFT, z0=0.05 + i * 0.01)
            else:
                hatches[i].set(hatch(S), h_mm=0.8, z0=0.05)
            g = clamp(after - i)
            if g > 0:
                wipes[i].set(strip_poly(sub_strip(S, 0, g)), h_mm=LIFT, z0=0.5 + i * 0.01)
        if n == 1:
            key([("before", "Before: 4 weeks"), ("range", "up to 5"), ("after", "With Unifize: 7.2 days")])
            gain("75% faster")
        else:
            key([("before", "Before: 3 months"), ("range", "up to 8"), ("after", "With Unifize: about 2 weeks")])
            gain("Weeks, not months")
    else:
        # the before ran round the clock for weeks: the whole ring, hatched
        # like every open-ended "before", the result laid over it
        for i in range(N):
            hatches[i].set(hatch(ring(i)), h_mm=0.8, z0=0.05)
        key([("range", "Before: weeks, off the clock"), ("after", "With Unifize: under 30 minutes")])
        gain("Minutes, not weeks")


# ------------------------------------------------------------------ render
# two passes per frame into OUT/marks and OUT/tracks; post.py joins them
for d in ("marks", "tracks"):
    os.makedirs(os.path.join(OUT, d), exist_ok=True)


def shoot(name):
    stage.render(os.path.join(OUT, "marks", name), os.path.join(OUT, "tracks", name))


STILLS = "--stills" in argv
if STILLS:
    for n in (1, 2, 3):
        still(n)
        shoot(f"s{n}.png")
elif TIMES:
    for T in TIMES:
        seek(T)
        shoot(f"t{T:05.2f}.png")
else:
    import bpy, shutil

    def signature():
        """everything a frame is made of, rounded: equal signatures render
        equal frames, so a hold renders once and is copied"""
        sig = []
        for o in bpy.context.scene.objects:
            if o.hide_render:
                continue
            m = o.active_material
            mx = m.node_tree.nodes.get(m.get("mx", "")) if m else None
            sh = m.node_tree.nodes.get(m.get("sh", "")) if m else None
            d = o.data
            geo = (d.body,) if o.type == "FONT" else (
                (len(d.vertices), round(sum(v.co.x + 3 * v.co.y + 7 * v.co.z for v in d.vertices), 7))
                if o.type == "MESH" else ())
            sig.append((o.name, tuple(round(c, 7) for c in o.location), geo,
                        round(mx.inputs["Fac"].default_value, 4) if mx else None,
                        tuple(round(c, 4) for c in sh.inputs["Color"].default_value) if sh else None))
        return tuple(sig)

    f0, f1 = (map(int, FRAMES.split(":")) if FRAMES else (0, int(TOTAL * FPS)))
    last = (None, None)
    for n in range(f0, f1):
        name = f"f{n:05d}.png"
        seek(n / FPS)
        sig = signature()
        done = os.path.exists(os.path.join(OUT, "tracks", name))
        if not done and sig == last[0] and last[1]:
            for d in ("marks", "tracks"):
                shutil.copyfile(os.path.join(OUT, d, last[1]), os.path.join(OUT, d, name))
            print(f"frame {name} held", flush=True)
        elif not done:
            shoot(name)                           # (existing frames: resume after a crash)
        last = (sig, name)
print("done", OUT)
