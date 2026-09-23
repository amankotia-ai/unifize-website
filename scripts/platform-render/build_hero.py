"""
build_hero.py - the Platform hero film: "One change, one take".

Six real product screens (captured flat from the live PlatformJourney, see
capture.mjs) laid out as thin physical slabs on a dark table that carries
the dark hero's own charcoal. The camera glides screen to screen in the rail's
order; at each stop the one UI piece that carries the claim lifts off its
screen toward the lens, rimmed in Unifize blue, with a narrow focus band.

Headless:
  /Applications/Blender.app/Contents/MacOS/Blender -b -P scripts/platform-render/build_hero.py -- --board OUT_DIR [--preview]
  (--board renders the storyboard keyframes as one PNG each)

Scale: 1 scene unit = 1 m, 1 UI px = 1 mm, so a window is 1.15 x 0.56 m and
real f-stops give real depth of field.
"""
import bpy, math, sys, os
from mathutils import Vector

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
HERE = os.path.dirname(os.path.abspath(__file__))
TEX = os.path.join(HERE, "tex")
PREVIEW = "--preview" in argv
BOARD = argv[argv.index("--board") + 1] if "--board" in argv else None
ONLY = argv[argv.index("--only") + 1].split(",") if "--only" in argv else None

# ------------------------------------------------------------------ params
PX = 0.001                      # metres per UI px
WIN_W, WIN_H = 1150, 560        # the arcade window, in px
GAP = 260                       # px between screens on the table
SLAB_Z = 0.018                  # screens float this high off the table
SLAB_T = 0.010                  # screen slab thickness
ATOM_T = 0.006                  # lifted piece thickness
BLUE = "#005bb7"                # Unifize blue: the rim on a lifted piece

# the six screens in the rail's order. seal has an "after" state (signed,
# dialog gone) captured separately.
SCREENS = ["home", "inbox", "checklist", "seal", "builder", "dashboard"]

# the pieces that lift: name -> (screen, texture, rect in window px x0,y0,x1,y1
# with y down, as captured). One claim each.
PIECES = {
    "home-queue":       ("home", "home", (80, 113, 688, 301)),          # the role's queue
    "inbox-thread":     ("inbox", "inbox", (390, 403, 845, 470)),       # one owner, every function
    "checklist-impact": ("checklist", "checklist", (883, 260, 1148, 335)),  # typed on the record
    "seal-dialog":      ("seal", "seal", (566, 127, 907, 431)),         # the Part 11 dialog
    "seal-signed":      ("seal", "seal_after", (382, 270, 847, 391)),   # the signature, in the thread
    "seal-chip":        ("seal", "seal_after", (1096, 225, 1143, 245)), # Signed, on the checklist
    "builder-field":    ("builder", "builder", (725, 180, 912, 243)),   # an Approval field, from the palette
    "builder-route":    ("builder", "builder", (80, 283, 699, 415)),    # who signs, in what order
    "dash-kpi":         ("dashboard", "dashboard", (343, 110, 598, 191)),  # median closure
    "dash-chart":       ("dashboard", "dashboard", (80, 204, 424, 538)),   # closure, month by month
}

# ------------------------------------------------------------------ scene
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.render.engine = "CYCLES"
prefs = bpy.context.preferences.addons.get("cycles")
if prefs:
    try:
        prefs.preferences.compute_device_type = "METAL"
        prefs.preferences.get_devices()
        for d in prefs.preferences.devices:
            d.use = True
        scene.cycles.device = "GPU"
    except Exception:
        scene.cycles.device = "CPU"
scene.cycles.samples = 48 if PREVIEW else 192
scene.cycles.use_denoising = True
scene.render.resolution_x = 1280 if PREVIEW else 2560
scene.render.resolution_y = 720 if PREVIEW else 1440
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
# Standard, not AgX: the UI's whites and brand blue must come out as drawn
scene.view_settings.view_transform = "Standard"
scene.view_settings.look = "None"
scene.view_settings.exposure = 0.0

world = bpy.data.worlds.new("World")
scene.world = world
world.use_nodes = True
# the world is the hero charcoal too, so reflections and the horizon stay in it
world.node_tree.nodes["Background"].inputs[0].default_value = (0.012, 0.013, 0.016, 1)
world.node_tree.nodes["Background"].inputs[1].default_value = 0.6


def hexc(h):
    h = h.lstrip("#")
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple((v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4) for v in c) + (1,)


def principled(name, color, rough=0.5, emit=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = hexc(color)
    b.inputs["Roughness"].default_value = rough
    if emit:
        b.inputs["Emission Color"].default_value = hexc(color)
        b.inputs["Emission Strength"].default_value = emit
    return m


DIMMERS = {}          # texname -> {"amt", "cx", "cy", "r0", "r1"} value nodes
BODY_AMTS = []        # the slab bodies dissolve with their faces
GHOST = 0.05          # how much of a dissolved screen stays, right beside its piece
                      # (the UI is self-lit, so even 5% reads clearly on the charcoal)
ASPECT = 1150 / 560   # screen UVs are stretched this much in x


def _val(nt, v):
    n = nt.nodes.new("ShaderNodeValue")
    n.outputs[0].default_value = v
    return n


def _math(nt, op, a, b=None):
    n = nt.nodes.new("ShaderNodeMath")
    n.operation = op
    for i, x in enumerate((a, b)):
        if x is None:
            continue
        if isinstance(x, (int, float)):
            n.inputs[i].default_value = x
        else:
            nt.links.new(x, n.inputs[i])
    return n.outputs[0]


def _dissolve(nt, shader_out, keep):
    """mix the surface toward the hero charcoal (unlit, so it matches the
    ground exactly); keep = 1 shows the surface, 0 is pure charcoal"""
    em = nt.nodes.new("ShaderNodeEmission")
    em.inputs["Color"].default_value = hexc(HERO_BG)
    mix = nt.nodes.new("ShaderNodeMixShader")
    nt.links.new(keep, mix.inputs[0])
    nt.links.new(em.outputs[0], mix.inputs[1])
    nt.links.new(shader_out, mix.inputs[2])
    nt.links.new(mix.outputs[0], nt.nodes["Material Output"].inputs["Surface"])


def ui_material(name, path, dimmable=True, texname=None):
    """The screen face: the captured UI, lit physically but with a little
    self-light so whites stay paper-white on the dark hero.

    Screen faces dissolve rather than darken: a lit surface can never get
    as dark as the unlit ground, so a darkened screen always showed its
    outline as a box inside the rails. Dissolving mixes the face into the
    exact charcoal, keeping a ghost of the UI only in a soft spotlight round
    the lifted piece (centre cx, cy in UV; radii in screen heights), so
    nothing of the screen reaches the frame edge."""
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    b = nt.nodes["Principled BSDF"]
    tex = nt.nodes.new("ShaderNodeTexImage")
    tex.image = bpy.data.images.load(path, check_existing=True)
    tex.interpolation = "Cubic"
    nt.links.new(tex.outputs["Color"], b.inputs["Base Color"])
    nt.links.new(tex.outputs["Color"], b.inputs["Emission Color"])
    b.inputs["Emission Strength"].default_value = 0.3
    # matte: the camera looks almost straight down, so any gloss mirrors the
    # key light across the screen
    b.inputs["Roughness"].default_value = 0.7
    b.inputs["Specular IOR Level"].default_value = 0.06
    if dimmable:
        nodes = {k: _val(nt, v) for k, v in (("amt", 0.0), ("cx", 0.5), ("cy", 0.5), ("hx", 0.1), ("hy", 0.1), ("r1", 0.2))}
        uv = nt.nodes.new("ShaderNodeTexCoord").outputs["UV"]
        sep = nt.nodes.new("ShaderNodeSeparateXYZ")
        nt.links.new(uv, sep.inputs[0])
        dx = _math(nt, "MULTIPLY", _math(nt, "SUBTRACT", sep.outputs[0], nodes["cx"].outputs[0]), ASPECT)
        dy = _math(nt, "SUBTRACT", sep.outputs[1], nodes["cy"].outputs[0])
        # distance to the piece's RECTANGLE (half sizes hx, hy, in screen
        # heights), so the light hugs the piece's shape instead of a circle
        qx = _math(nt, "MAXIMUM", _math(nt, "SUBTRACT", _math(nt, "ABSOLUTE", dx), nodes["hx"].outputs[0]), 0.0)
        qy = _math(nt, "MAXIMUM", _math(nt, "SUBTRACT", _math(nt, "ABSOLUTE", dy), nodes["hy"].outputs[0]), 0.0)
        dist = _math(nt, "SQRT", _math(nt, "ADD", _math(nt, "MULTIPLY", qx, qx), _math(nt, "MULTIPLY", qy, qy)))
        mr = nt.nodes.new("ShaderNodeMapRange")
        mr.interpolation_type = "SMOOTHERSTEP"
        nt.links.new(dist, mr.inputs["Value"])
        mr.inputs["From Min"].default_value = 0.0
        nt.links.new(nodes["r1"].outputs[0], mr.inputs["From Max"])
        mr.inputs["To Min"].default_value = GHOST
        mr.inputs["To Max"].default_value = 0.0
        # keep = 1 - amt * (1 - spot)
        keep = _math(nt, "SUBTRACT", 1.0, _math(nt, "MULTIPLY", nodes["amt"].outputs[0],
                                                _math(nt, "SUBTRACT", 1.0, mr.outputs["Result"])))
        _dissolve(nt, b.outputs[0], keep)
        DIMMERS[texname or name] = nodes
    return m


def body_material():
    m = principled("slab-body", "#d9dde3", 0.45)
    nt = m.node_tree
    amt = _val(nt, 0.0)
    _dissolve(nt, nt.nodes["Principled BSDF"].outputs[0], _math(nt, "SUBTRACT", 1.0, amt.outputs[0]))
    BODY_AMTS.append(amt)
    return m


def set_dim(v, spots=None):
    """v: 1 = screens whole, DIM = dissolved to the spotlight. spots maps a
    texname to (cx, cy, hx, hy, r1) round its lifted piece."""
    amt = max(0.0, min(1.0, (1.0 - v) / (1.0 - DIM)))
    for tex, n in DIMMERS.items():
        n["amt"].outputs[0].default_value = amt
        if spots and tex in spots:
            for k, val in zip(("cx", "cy", "hx", "hy", "r1"), spots[tex]):
                n[k].outputs[0].default_value = val
    for a in BODY_AMTS:
        a.outputs[0].default_value = amt


HERO_BG = "#1f2126"                 # --hm-charcoal: the dark hero the film sits flush on


def table_material():
    """The hero's own charcoal as the table, UNLIT: pure emission of
    HERO_BG under the Standard view transform comes out as exactly #1f2126,
    so the ground is the page's hero and the film has no edge to show. The
    glow the screens throw onto it is added in post.py."""
    m = bpy.data.materials.new("table")
    m.use_nodes = True
    nt = m.node_tree
    for n in list(nt.nodes):
        if n.type != "OUTPUT_MATERIAL":
            nt.nodes.remove(n)
    em = nt.nodes.new("ShaderNodeEmission")
    em.inputs["Color"].default_value = hexc(HERO_BG)
    em.inputs["Strength"].default_value = 1.0
    nt.links.new(em.outputs[0], nt.nodes["Material Output"].inputs["Surface"])
    return m


def plane(name, w, h, loc, mat, uv=(0, 0, 1, 1)):
    """A w x h plane facing +Z, UVs mapped to a sub-rect of its texture."""
    me = bpy.data.meshes.new(name)
    x, y = w / 2, h / 2
    me.from_pydata([(-x, -y, 0), (x, -y, 0), (x, y, 0), (-x, y, 0)], [], [(0, 1, 2, 3)])
    uvl = me.uv_layers.new()
    u0, v0, u1, v1 = uv
    for li, (u, v) in zip(range(4), ((u0, v0), (u1, v0), (u1, v1), (u0, v1))):
        uvl.data[li].uv = (u, v)
    me.materials.append(mat)
    ob = bpy.data.objects.new(name, me)
    ob.location = loc
    scene.collection.objects.link(ob)
    return ob


def box(name, w, h, t, loc, mat, bevel=0.0012):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    ob = bpy.context.active_object
    ob.name = name
    ob.scale = (w, h, t)
    bpy.ops.object.transform_apply(scale=True)
    if bevel:
        mod = ob.modifiers.new("bevel", "BEVEL")
        mod.width = bevel
        mod.segments = 3
    ob.data.materials.append(mat)
    return ob


# ------------------------------------------------------------------ build
M_TABLE = table_material()
M_BODY = body_material()
M_RIM = principled("atom-rim", BLUE, 0.3, emit=2.5)

table = plane("table", 40, 20, (0, 0, 0), M_TABLE)

UI = {}


def ui(texname, piece=False):
    """Screen faces dim; lifted pieces never do."""
    k = (texname, piece)
    if k not in UI:
        UI[k] = ui_material(f"ui-{texname}{'-piece' if piece else ''}",
                            os.path.join(TEX, f"{texname}.png"), dimmable=not piece, texname=texname)
    return UI[k]


FACES, ATOMS, BASE = {}, {}, {}
for i, key in enumerate(SCREENS):
    cx = i * (WIN_W + GAP) * PX
    w, h = WIN_W * PX, WIN_H * PX
    box(f"body-{key}", w, h, SLAB_T, (cx, 0, SLAB_Z - SLAB_T / 2), M_BODY)
    FACES[key] = {key: plane(f"face-{key}", w, h, (cx, 0, SLAB_Z + 0.0002), ui(key))}

# screen states captured after the step's action (seal: signed, dialog gone);
# one face per state, shown by visibility
STATES = {"seal": ["seal_after"]}
for key, alts in STATES.items():
    cx = SCREENS.index(key) * (WIN_W + GAP) * PX
    for texname in alts:
        alt = plane(f"face-{texname}", WIN_W * PX, WIN_H * PX, (cx, 0, SLAB_Z + 0.0002), ui(texname))
        alt.hide_render = True
        FACES[key][texname] = alt

for name, (key, texname, (x0, y0, x1, y1)) in PIECES.items():
    cx = SCREENS.index(key) * (WIN_W + GAP) * PX
    aw, ah = (x1 - x0) * PX, (y1 - y0) * PX
    ax = cx + ((x0 + x1) / 2 - WIN_W / 2) * PX
    ay = (WIN_H / 2 - (y0 + y1) / 2) * PX
    uv = (x0 / WIN_W, 1 - y1 / WIN_H, x1 / WIN_W, 1 - y0 / WIN_H)
    # the piece: its own UI face on a thin body whose sides carry the blue
    # rim (the UI's own focus ring, turned into an edge that catches light)
    root = bpy.data.objects.new(f"atom-{name}", None)
    root.location = (ax, ay, SLAB_Z)
    scene.collection.objects.link(root)
    rim = box(f"atom-rim-{name}", aw, ah, ATOM_T, (0, 0, ATOM_T / 2), M_RIM, bevel=0.0008)
    rim.parent = root
    top = plane(f"atom-face-{name}", aw, ah, (0, 0, ATOM_T + 0.0003), ui(texname, piece=True), uv)
    top.parent = root
    ATOMS[name] = root
    BASE[name] = root.location.copy()


def screen_state(key, texname):
    for name, face in FACES[key].items():
        face.hide_render = name != texname


def screen_centre(key):
    return Vector((SCREENS.index(key) * (WIN_W + GAP) * PX, 0, SLAB_Z))


def atom_centre(name, lift=0.0):
    return BASE[name] + Vector((0, 0, lift))


# ------------------------------------------------------------------ light
def area(name, loc, size, power, color=(1, 1, 1)):
    ld = bpy.data.lights.new(name, "AREA")
    ld.size = size
    ld.energy = power
    ld.color = color
    ob = bpy.data.objects.new(name, ld)
    ob.location = loc
    scene.collection.objects.link(ob)
    return ob


KEY = area("key", (0, 1.4, 2.2), 1.6, 40)
RIM = area("rim", (0, 1.8, 0.9), 2.0, 16, (0.86, 0.92, 1.0))
FILL = area("fill", (0, -2.2, 1.2), 3.0, 8, (1.0, 0.95, 0.9))


def follow_lights(x):
    """Lights ride with the camera along the row so every stop is lit alike."""
    KEY.location.x = x - 0.25   # up and behind the screens, out of the mirror angle
    RIM.location.x = x
    FILL.location.x = x
    for ob, tgt in ((KEY, (x, 0, 0)), (RIM, (x, 0, 0)), (FILL, (x, 0, 0))):
        d = Vector(tgt) - ob.location
        ob.rotation_euler = d.to_track_quat("-Z", "Y").to_euler()


# ------------------------------------------------------------------ camera
cam_data = bpy.data.cameras.new("cam")
cam = bpy.data.objects.new("cam", cam_data)
scene.collection.objects.link(cam)
scene.camera = cam
cam_data.lens = 50
cam_data.sensor_width = 36
cam_data.dof.use_dof = True
cam_data.clip_start = 0.01


def aim(target, az, el, dist, fstop=2.8, focus=None, roll=0.0):
    """Place the camera on a sphere round `target`: az from -Y (in front of
    the screens), el up from the table. The matrix is built from the look
    direction with world +Z as up, so the view never flips."""
    t = Vector(target)
    a, e = math.radians(az), math.radians(el)
    offset = Vector((math.sin(a) * math.cos(e), -math.cos(a) * math.cos(e), math.sin(e))) * dist
    cam.location = t + offset
    q = (t - cam.location).to_track_quat("-Z", "Y")
    cam.rotation_euler = q.to_euler()
    cam.rotation_euler.rotate_axis("Z", math.radians(roll))
    cam_data.dof.focus_distance = ((Vector(focus) if focus else t) - cam.location).length
    cam_data.dof.aperture_fstop = fstop
    follow_lights(t.x)


def lift(name, h, scale=1.0):
    for child in ATOMS[name].children:   # hiding an empty does not hide its children
        child.hide_render = h <= 0
    ATOMS[name].location.z = SLAB_Z + h
    ATOMS[name].scale = (scale, scale, 1)


def rest_all():
    for k in ATOMS:
        lift(k, 0.0)
    screen_state("seal", "seal")
    set_dim(1.0)


# ------------------------------------------------------------------ the film
# One 30 s loop, five seconds per rail step, so the rail seeks to 0/5/10/15/
# 20/25 s. Each key is a full state: camera (target, az, el, dist, f-stop,
# focus), which pieces are lifted (height, scale), how far the screens are
# dimmed, and which seal state shows. Between keys everything eases
# (smoothstep), so the camera settles at each key and glides between them.
# Mostly flattish (el 70-76): the angle is a hint, not a pose. These poses
# are the shipped v2 cut. The page shows it in a 20:9 box (10% cropped top
# and bottom); a future re-render could pull the seal dialog and dashboard
# back (tried: seal dist ~1.28, dashboard ~1.62 aimed lower) to fit it.
STEP = 5.0
LOOP = 6 * STEP
DIM = 0.035


def K(t, target, az=0, el=74, dist=2.3, fstop=4.0, focus=None, lifts=None, dim=1.0, seal="seal"):
    return dict(t=t, target=Vector(target), az=az, el=el, dist=dist, fstop=fstop,
                focus=Vector(focus) if focus is not None else Vector(target),
                lifts=lifts or {}, dim=dim, seal=seal)


def wide(t, key, dist=2.3, **kw):
    return K(t, screen_centre(key), dist=dist, **kw)


def close(t, name, h, s=1.03, off=(0, 0, 0), el=70, dist=1.0, fstop=1.8, also=None, **kw):
    f = atom_centre(name, h)
    lifts = {name: (h, s)}
    lifts.update(also or {})
    return K(t, f + Vector(off), el=el, dist=dist, fstop=fstop, focus=f, lifts=lifts, dim=DIM, **kw)


def chapter(i, key, beats):
    """wide, a slow push, then the step's beats (relative times)."""
    T = i * STEP
    return [wide(T, key), wide(T + 0.7, key, dist=2.18)] + [b(T) for b in beats]


def hold(k, dt, dist=0.95):
    """the same close, a touch nearer, dt later: the camera never stops dead"""
    k2 = dict(k)
    k2["t"] = k["t"] + dt
    k2["dist"] = k["dist"] * dist
    return k2


home_c = lambda T: close(T + 2.1, "home-queue", 0.055, 1.03, (0, -0.02, 0), el=70, dist=1.3)
inbox_c = lambda T: close(T + 2.1, "inbox-thread", 0.05, 1.04, el=72, dist=0.95, fstop=1.6)
check_c = lambda T: close(T + 2.1, "checklist-impact", 0.05, 1.05, (-0.04, 0, 0), el=70, dist=0.75, fstop=1.4)
seal_d = lambda T: close(T + 1.7, "seal-dialog", 0.09, 1.02, el=76, dist=1.0)
seal_p = lambda T: close(T + 3.1, "seal-dialog", 0.012, 1.0, el=76, dist=0.98)
seal_x = lambda T: close(T + 3.25, "seal-signed", 0.0, 1.0, (0.15, 0, 0), el=72, dist=1.15, fstop=2.2, seal="seal_after")
seal_s = lambda T: close(T + 4.1, "seal-signed", 0.04, 1.03, (0.15, 0, 0), el=72, dist=1.15, fstop=2.2,
                         also={"seal-chip": (0.03, 1.15)}, seal="seal_after")
bld_f = lambda T: close(T + 1.7, "builder-field", 0.085, 1.08, (-0.10, -0.06, 0), el=72, dist=0.95)
bld_r = lambda T: close(T + 3.3, "builder-route", 0.06, 1.03, (0.03, 0, 0), el=70, dist=1.3, fstop=1.7)
def dash_c(T):
    """the KPI and the chart it comes from, framed together"""
    k = close(T + 1.7, "dash-kpi", 0.08, 1.08, el=72, dist=1.15, also={"dash-chart": (0.035, 1.02)})
    k["target"] = atom_centre("dash-kpi", 0.08).lerp(atom_centre("dash-chart", 0.035), 0.5) + Vector((0.05, 0, 0))
    return k


def _pullback(T):
    c = screen_centre("checklist").lerp(screen_centre("seal"), 0.5)
    return K(T + 3.9, c, az=-12, el=62, dist=4.6, fstop=3.2, focus=screen_centre("checklist"))


KEYS = (
    chapter(0, "home", [home_c, lambda T: hold(home_c(T), 1.4)])
    + chapter(1, "inbox", [inbox_c, lambda T: hold(inbox_c(T), 1.4)])
    + chapter(2, "checklist", [check_c, lambda T: hold(check_c(T), 1.4)])
    + chapter(3, "seal", [seal_d, lambda T: hold(seal_d(T), 0.9, 0.97), seal_p, seal_x, seal_s,
                          lambda T: hold(seal_s(T), 0.6, 0.98)])
    + chapter(4, "builder", [bld_f, lambda T: hold(bld_f(T), 0.9, 0.97), bld_r, lambda T: hold(bld_r(T), 0.9)])
    + chapter(5, "dashboard", [dash_c, lambda T: hold(dash_c(T), 1.0), _pullback])
)
KEYS.append(dict(KEYS[0], t=LOOP))   # the loop closes on its own first frame


def ease(u):
    return u * u * (3 - 2 * u)


def state_at(t):
    t = t % LOOP
    for k0, k1 in zip(KEYS, KEYS[1:]):
        if k0["t"] <= t <= k1["t"]:
            break
    span = max(k1["t"] - k0["t"], 1e-6)
    u = ease((t - k0["t"]) / span)
    mix = lambda a, b: a + (b - a) * u
    names = set(k0["lifts"]) | set(k1["lifts"])
    lifts = {}
    for n in names:
        h0, s0 = k0["lifts"].get(n, (0.0, 1.0))
        h1, s1 = k1["lifts"].get(n, (0.0, 1.0))
        lifts[n] = (mix(h0, h1), mix(s0, s1))
    return dict(
        target=k0["target"].lerp(k1["target"], u), focus=k0["focus"].lerp(k1["focus"], u),
        az=mix(k0["az"], k1["az"]), el=mix(k0["el"], k1["el"]), dist=mix(k0["dist"], k1["dist"]),
        fstop=mix(k0["fstop"], k1["fstop"]), dim=mix(k0["dim"], k1["dim"]),
        lifts=lifts, seal=k1["seal"] if u >= 1 else k0["seal"],
    )


def spots_for(lifts):
    """the spotlight on each screen follows its most-lifted piece"""
    best = {}
    for n, (h, _) in lifts.items():
        key, texname, (x0, y0, x1, y1) = PIECES[n]
        if h > best.get(key, (0, None))[0]:
            best[key] = (h, (x0, y0, x1, y1))
    spots = {}
    for key, (h, (x0, y0, x1, y1)) in best.items():
        cx, cy = (x0 + x1) / 2 / WIN_W, 1 - (y0 + y1) / 2 / WIN_H
        spot = (cx, cy, (x1 - x0) / 2 / WIN_H, (y1 - y0) / 2 / WIN_H, 0.18)
        spots[key] = spot
        if key == "seal":
            spots["seal_after"] = spot
    return spots


def apply(st):
    rest_all()
    screen_state("seal", st["seal"])
    set_dim(st["dim"], spots_for(st["lifts"]))
    for n, (h, sc) in st["lifts"].items():
        if n == "seal-dialog" and st["seal"] != "seal":
            continue
        if n in ("seal-signed", "seal-chip") and st["seal"] != "seal_after":
            continue
        lift(n, h, sc)
    aim(st["target"], st["az"], st["el"], st["dist"], fstop=st["fstop"], focus=st["focus"])


# storyboard frames are samples of the film itself, so board and film agree
BOARD_TIMES = [
    ("01-home-wide", 0.4), ("02-home-lift", 2.6), ("03-glide", 4.35), ("04-inbox-lift", 7.4),
    ("05-checklist-lift", 12.4), ("06-seal-dialog", 17.0), ("07-seal-signed", 19.4),
    ("08-builder-field", 22.0), ("09-builder-route", 23.6), ("10-dashboard-lift", 27.0),
    ("11-pullback", 28.9),
]

if "--eevee" in argv:
    scene.render.engine = "BLENDER_EEVEE"
    ee = scene.eevee
    for attr, val in (("taa_render_samples", 64), ("use_shadows", True), ("use_raytracing", True)):
        if hasattr(ee, attr):
            setattr(ee, attr, val)

FPS = 30
if BOARD:
    os.makedirs(BOARD, exist_ok=True)
    for name, t in BOARD_TIMES:
        if ONLY and not any(name.startswith(o) for o in ONLY):
            continue
        apply(state_at(t))
        scene.render.filepath = os.path.join(BOARD, f"{name}.png")
        bpy.ops.render.render(write_still=True)
        print("rendered", name)

if "--film" in argv:
    out = argv[argv.index("--film") + 1]
    os.makedirs(out, exist_ok=True)
    start = int(argv[argv.index("--start") + 1]) if "--start" in argv else 0
    end = int(argv[argv.index("--end") + 1]) if "--end" in argv else int(LOOP * FPS)
    for f in range(start, end):
        path = os.path.join(out, f"f{f:04d}.png")
        if os.path.exists(path):
            continue                     # resumable
        apply(state_at(f / FPS))
        scene.render.filepath = path
        bpy.ops.render.render(write_still=True)
        print("frame", f, flush=True)
