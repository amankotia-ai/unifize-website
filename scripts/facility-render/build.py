"""
build.py - renders a cutaway facility maquette for the Glide-style homepage
hero (docs/home-glide/teardown.md). Run headless:

  /Applications/Blender.app/Contents/MacOS/Blender -b -P scripts/facility-render/build.py -- pharma out.png [--preview]

The building is a front elevation cutaway: the street wall is omitted, so the
floors, partitions, equipment and people are seen through the section, the
way Glide stages its buildings. Everything is procedural: boxes, cylinders,
and a small kit of equipment, lit by a soft sun and warm interior lights,
rendered with Cycles on a transparent film with a shadow catcher so the page
composites it on white.
"""
import bpy, bmesh, math, sys, random
from mathutils import Vector

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
SCENE_KEY = argv[0] if argv else "pharma"
OUT = argv[1] if len(argv) > 1 else "/tmp/facility.png"
PREVIEW = "--preview" in argv
random.seed(7)

# ---------------------------------------------------------------- scene reset
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
scene.cycles.samples = 48 if PREVIEW else 160
scene.cycles.use_denoising = True
scene.render.film_transparent = True
scene.render.resolution_x = 1600 if PREVIEW else 3200
scene.render.resolution_y = 500 if PREVIEW else 1000
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGBA"
scene.view_settings.view_transform = "AgX" if "AgX" in [i.identifier for i in bpy.types.ColorManagedViewSettings.bl_rna.properties["view_transform"].enum_items] else "Filmic"
looks = [i.identifier for i in bpy.types.ColorManagedViewSettings.bl_rna.properties["look"].enum_items]
scene.view_settings.look = next((l for l in looks if "Medium High Contrast" in l), "None")

world = bpy.data.worlds.new("World")
scene.world = world
world.use_nodes = True
bg = world.node_tree.nodes["Background"]
bg.inputs[0].default_value = (1, 1, 1, 1)
bg.inputs[1].default_value = 0.7

# ---------------------------------------------------------------- materials
MATS = {}

def hexc(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)) + (1,)

def srgb_to_linear(c):
    return tuple((v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4) if i < 3 else v for i, v in enumerate(c))

def mat(name, color, rough=0.75, metal=0.0, emit=0.0, alpha=1.0, transmission=0.0, bump=None):
    if name in MATS:
        return MATS[name]
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    b = nt.nodes["Principled BSDF"]
    col = srgb_to_linear(hexc(color))
    def setin(key, val):
        if key in b.inputs:
            b.inputs[key].default_value = val
    setin("Base Color", col)
    setin("Roughness", rough)
    setin("Metallic", metal)
    if emit:
        setin("Emission Color", col)
        setin("Emission Strength", emit)
    if alpha < 1:
        setin("Alpha", alpha)
        try:
            m.surface_render_method = "BLENDED"
        except Exception:
            pass
    if transmission:
        setin("Transmission Weight", transmission)
        setin("Roughness", 0.05)
        setin("IOR", 1.45)
    if bump:
        wave = nt.nodes.new("ShaderNodeTexWave")
        wave.wave_type = "BANDS"
        wave.bands_direction = "X"
        wave.inputs["Scale"].default_value = bump
        wave.inputs["Distortion"].default_value = 0
        bmp = nt.nodes.new("ShaderNodeBump")
        bmp.inputs["Strength"].default_value = 0.8
        bmp.inputs["Distance"].default_value = 0.02
        nt.links.new(wave.outputs["Color"], bmp.inputs["Height"])
        nt.links.new(bmp.outputs["Normal"], b.inputs["Normal"])
    MATS[name] = m
    return m

M = dict(
    concrete=lambda: mat("concrete", "#d9dce0", 0.9),
    slab=lambda: mat("slab", "#c5cad0", 0.85),
    clad=lambda: mat("clad", "#b9bec5", 0.75, 0.0, bump=6),
    wall=lambda: mat("wall", "#f4f5f6", 0.9),
    floor=lambda: mat("floor", "#e6e8eb", 0.8),
    cleanfloor=lambda: mat("cleanfloor", "#e9eef4", 0.5),
    glass=lambda: mat("glass", "#d9e6f2", 0.05, 0.0, alpha=0.18),
    metal=lambda: mat("metal", "#aeb3ba", 0.35, 0.7),
    steel=lambda: mat("steel", "#d0d4d8", 0.22, 0.95),
    dark=lambda: mat("dark", "#5b6169", 0.6, 0.2),
    carton=lambda: mat("carton", "#cdb08a", 0.9),
    warm=lambda: mat("warm", "#ffd9a0", 0.9, emit=1.6),
    cool=lambda: mat("cool", "#eaf2ff", 0.9, emit=1.2),
    hivis=lambda: mat("hivis", "#ff7a1a", 0.7),
    helmet=lambda: mat("helmet", "#ffd23c", 0.5),
    gown=lambda: mat("gown", "#f6f6f6", 0.8),
    coat=lambda: mat("coat", "#f2f4f6", 0.8),
    suit=lambda: mat("suit", "#2c3543", 0.8),
    skin=lambda: mat("skin", "#c99a7a", 0.8),
    blue=lambda: mat("blue", "#005bb7", 0.4, emit=1.2),
    green=lambda: mat("green", "#5f8f6a", 0.8),
    shadow=lambda: mat("shadow", "#ffffff", 1.0),
)

# ---------------------------------------------------------------- primitives
ROOT = bpy.data.collections.new("Facility")
scene.collection.children.link(ROOT)

def link(o):
    ROOT.objects.link(o)
    return o

def box(name, c, s, m, rot=(0, 0, 0)):
    mesh = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    bm.to_mesh(mesh)
    bm.free()
    o = bpy.data.objects.new(name, mesh)
    o.location = c
    o.scale = s
    o.rotation_euler = rot
    o.data.materials.append(M[m]())
    return link(o)

def cyl(name, c, r, h, m, axis="Z", segs=32):
    mesh = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=segs, radius1=r, radius2=r, depth=h)
    bm.to_mesh(mesh)
    bm.free()
    o = bpy.data.objects.new(name, mesh)
    o.location = c
    if axis == "Y":
        o.rotation_euler = (math.pi / 2, 0, 0)
    elif axis == "X":
        o.rotation_euler = (0, math.pi / 2, 0)
    o.data.materials.append(M[m]())
    return link(o)

def cone(name, c, r1, r2, h, m):
    mesh = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=32, radius1=r1, radius2=r2, depth=h)
    bm.to_mesh(mesh)
    bm.free()
    o = bpy.data.objects.new(name, mesh)
    o.location = c
    o.data.materials.append(M[m]())
    return link(o)

def sphere(name, c, r, m):
    mesh = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=16, v_segments=10, radius=r)
    bm.to_mesh(mesh)
    bm.free()
    o = bpy.data.objects.new(name, mesh)
    o.location = c
    o.data.materials.append(M[m]())
    return link(o)

def smooth(o):
    for p in o.data.polygons:
        p.use_smooth = True

# ---------------------------------------------------------------- the kit
D = 14.0          # building depth (y), the section runs along x
SLAB = 0.35
YB = D / 2        # back wall y

def person(x, y, z, attire="hivis", helmet=True):
    """1.7 m figure: legs, torso, head. Reads at maquette scale."""
    body = {"hivis": "hivis", "gown": "gown", "coat": "coat", "suit": "suit", "coverall": "dark"}[attire]
    legs = "dark" if attire in ("hivis", "coverall", "suit") else "gown"
    box(f"legs", (x, y, z + 0.4), (0.34, 0.24, 0.8), legs)
    t = cyl("torso", (x, y, z + 1.15), 0.21, 0.7, body)
    smooth(t)
    h = sphere("head", (x, y, z + 1.62), 0.13, "skin")
    smooth(h)
    if helmet:
        hm = sphere("helmet", (x, y, z + 1.66), 0.15, "helmet" if attire == "hivis" else ("gown" if attire == "gown" else "dark"))
        smooth(hm)

def rack(x0, x1, y, z, levels=3):
    for lx in (x0, x1):
        for ly in (y - 0.5, y + 0.5):
            box("post", (lx, ly, z + 0.5 * levels * 1.5), (0.08, 0.08, levels * 1.5), "metal")
    for l in range(levels):
        zz = z + 0.15 + l * 1.5
        box("shelf", ((x0 + x1) / 2, y, zz), (x1 - x0, 1.1, 0.06), "metal")
        n = max(1, int((x1 - x0) / 1.2))
        for i in range(n):
            bx = x0 + 0.6 + i * ((x1 - x0 - 1.2) / max(1, n - 1)) if n > 1 else (x0 + x1) / 2
            box("carton", (bx, y, zz + 0.03 + 0.45), (0.9, 0.9, 0.9), "carton")

def desk(x, y, z, with_person=None):
    box("desk", (x, y, z + 0.72), (1.6, 0.8, 0.05), "wall")
    box("deskleg", (x - 0.7, y, z + 0.36), (0.06, 0.7, 0.72), "metal")
    box("deskleg", (x + 0.7, y, z + 0.36), (0.06, 0.7, 0.72), "metal")
    box("monitor", (x + 0.2, y + 0.2, z + 1.0), (0.55, 0.04, 0.34), "dark")
    box("chair", (x - 0.1, y - 0.6, z + 0.45), (0.5, 0.5, 0.06), "dark")
    box("chairback", (x - 0.1, y - 0.82, z + 0.75), (0.5, 0.06, 0.55), "dark")
    if with_person:
        person(x - 0.1, y - 0.62, z, with_person, helmet=False)

def bench(x0, x1, y, z, stuff=True):
    box("bench", ((x0 + x1) / 2, y, z + 0.9), (x1 - x0, 0.9, 0.06), "wall")
    box("benchbase", ((x0 + x1) / 2, y, z + 0.44), (x1 - x0 - 0.2, 0.8, 0.86), "floor")
    if stuff:
        n = int((x1 - x0) / 1.1)
        for i in range(n):
            bx = x0 + 0.55 + i * 1.1
            k = i % 3
            if k == 0:
                box("hplc", (bx, y, z + 1.2), (0.5, 0.6, 0.55), "wall")
                box("hplc2", (bx, y, z + 1.55), (0.5, 0.6, 0.15), "dark")
            elif k == 1:
                box("screen", (bx, y + 0.15, z + 1.15), (0.45, 0.04, 0.3), "dark")
            else:
                cyl("bottle", (bx - 0.15, y, z + 1.05), 0.07, 0.3, "glass")
                cyl("bottle", (bx + 0.12, y - 0.1, z + 1.02), 0.06, 0.24, "glass")

def fume_hood(x, y, z):
    box("hood", (x, y, z + 1.3), (1.6, 1.0, 2.6), "wall")
    box("hoodglass", (x, y - 0.52, z + 1.6), (1.4, 0.03, 1.2), "glass")
    box("hoodsash", (x, y - 0.52, z + 0.95), (1.4, 0.05, 0.1), "metal")

def tablet_press(x, y, z):
    box("press", (x, y, z + 0.9), (1.4, 1.4, 1.8), "steel")
    box("presswin", (x, y - 0.71, z + 1.0), (0.7, 0.02, 0.6), "glass")
    cone("hopper", (x, y, z + 2.1), 0.45, 0.12, 0.6, "steel")
    box("presspanel", (x + 1.2, y, z + 0.8), (0.5, 0.4, 1.6), "wall")

def fluid_bed(x, y, z):
    c = cyl("fbd", (x, y, z + 2.2), 0.7, 2.6, "steel")
    smooth(c)
    cone("fbdcone", (x, y, z + 0.6), 0.7, 0.25, 0.6, "steel")
    box("fbdbin", (x + 1.4, y, z + 0.5), (0.9, 0.9, 1.0), "metal")

def coating_pan(x, y, z):
    box("panbase", (x, y, z + 0.5), (2.2, 1.4, 1.0), "steel")
    p = cyl("pan", (x + 0.2, y, z + 1.7), 0.85, 0.9, "steel", axis="Y")
    smooth(p)
    box("pancab", (x - 1.5, y, z + 1.0), (0.6, 1.0, 2.0), "wall")

def conveyor(x0, x1, y, z, items="box", machine=True):
    box("belt", ((x0 + x1) / 2, y, z + 0.85), (x1 - x0, 0.6, 0.08), "dark")
    for i in range(int((x1 - x0) / 2.2) + 1):
        box("leg", (x0 + 0.3 + i * 2.2, y, z + 0.42), (0.08, 0.5, 0.8), "metal")
    n = int((x1 - x0) / (0.9 if items == "box" else 0.35))
    for i in range(n):
        bx = x0 + 0.4 + i * (0.9 if items == "box" else 0.35)
        if items == "box":
            box("carton", (bx, y, z + 0.89 + 0.25), (0.5, 0.45, 0.5), "carton")
        else:
            cyl("bottle", (bx, y, z + 1.05), 0.08, 0.3, "glass")
    if machine:
        box("machine", (x0 - 0.9, y, z + 1.0), (1.6, 1.2, 2.0), "steel")
        box("machinewin", (x0 - 0.9, y - 0.61, z + 1.2), (0.9, 0.02, 0.6), "glass")

def stability(x0, x1, y, z):
    n = int((x1 - x0) / 1.1)
    for i in range(n):
        bx = x0 + 0.55 + i * 1.1
        box("chamber", (bx, y, z + 1.0), (0.95, 0.9, 2.0), "wall")
        box("chamberdoor", (bx, y - 0.46, z + 1.0), (0.8, 0.02, 1.8), "steel")
        box("handle", (bx + 0.32, y - 0.5, z + 1.0), (0.04, 0.04, 0.5), "dark")

def bsc(x, y, z):
    box("bsc", (x, y, z + 1.2), (1.6, 0.9, 2.4), "wall")
    box("bscopen", (x, y - 0.46, z + 1.0), (1.4, 0.02, 0.7), "cool")
    box("bscglass", (x, y - 0.46, z + 1.75), (1.4, 0.02, 0.7), "glass")

def tank(x, y, z, r=0.8, h=2.6, agitator=True):
    t = cyl("tank", (x, y, z + 0.5 + h / 2), r, h, "steel")
    smooth(t)
    for a in (0, 2.09, 4.19):
        box("tankleg", (x + math.cos(a) * r * 0.8, y + math.sin(a) * r * 0.8, z + 0.25), (0.08, 0.08, 0.5), "metal")
    if agitator:
        box("motor", (x, y, z + 0.5 + h + 0.25), (0.4, 0.4, 0.5), "dark")

def reactor(x, y, z, r=1.3, h=5.0):
    t = cyl("reactor", (x, y, z + 1.0 + h / 2), r, h, "steel")
    smooth(t)
    top = sphere("rtop", (x, y, z + 1.0 + h), r, "steel")
    top.scale = (1, 1, 0.35)
    smooth(top)
    bot = sphere("rbot", (x, y, z + 1.0), r, "steel")
    bot.scale = (1, 1, 0.35)
    smooth(bot)
    box("motor", (x, y, z + 1.0 + h + 0.7), (0.7, 0.7, 0.8), "dark")
    for a in (0.6, 2.7, 4.8):
        box("rleg", (x + math.cos(a) * r * 0.85, y + math.sin(a) * r * 0.85, z + 0.5), (0.12, 0.12, 1.0), "metal")
    # platform at mid height
    box("platform", (x, y, z + 1.0 + h * 0.55), (r * 2 + 2.4, D * 0.5, 0.08), "metal")
    for i in range(6):
        px = x - r - 1.2 + i * ((r * 2 + 2.4) / 5)
        box("rail", (px, y - D * 0.25, z + 1.0 + h * 0.55 + 0.55), (0.04, 0.04, 1.1), "metal")
    box("railtop", (x, y - D * 0.25, z + 1.0 + h * 0.55 + 1.1), (r * 2 + 2.4, 0.04, 0.04), "metal")
    # pipes
    cyl("pipe", (x + r + 0.2, y, z + 1.0 + h + 1.4), 0.09, 2.8, "steel")
    cyl("pipe", (x + r + 0.2, y, z + 1.0 + h + 2.8), 0.09, 4.0, "steel", axis="X")

def moulding_machine(x, y, z):
    box("imm", (x, y, z + 0.8), (4.2, 1.2, 1.6), "steel")
    box("immclamp", (x + 1.6, y, z + 1.4), (1.2, 1.4, 2.8), "steel")
    cone("immhopper", (x - 1.2, y, z + 2.1), 0.5, 0.15, 0.9, "wall")
    box("immguard", (x - 0.2, y - 0.62, z + 1.2), (2.4, 0.02, 0.8), "glass")

def laminar_hood(x0, x1, y, z, h):
    box("plenum", ((x0 + x1) / 2, y, z + h - 0.45), (x1 - x0 - 0.6, D * 0.55, 0.3), "wall")
    box("plenumlight", ((x0 + x1) / 2, y, z + h - 0.61), (x1 - x0 - 0.9, D * 0.5, 0.02), "cool")

def steriliser(x, y, z):
    box("eto", (x, y, z + 1.5), (2.8, 3.0, 3.0), "steel")
    d = cyl("etodoor", (x, y - 1.51, z + 1.5), 1.05, 0.08, "metal", axis="Y")
    smooth(d)
    d2 = cyl("etodoor2", (x, y - 1.56, z + 1.5), 0.7, 0.08, "steel", axis="Y")
    smooth(d2)
    box("trolley", (x + 2.4, y, z + 0.6), (1.4, 1.0, 0.9), "metal")

def hvac_unit(x, y, z):
    box("ahu", (x, y, z + 0.9), (3.2, 2.2, 1.8), "wall")
    box("ahugrille", (x - 0.6, y - 1.11, z + 0.9), (1.4, 0.02, 1.2), "dark")
    f = cyl("fan", (x + 0.9, y, z + 1.9), 0.55, 0.2, "dark")
    smooth(f)
    cyl("duct", (x + 2.1, y, z + 0.5), 0.35, 1.0, "metal")

def silo(x, y, z, r=1.4, h=9.0):
    s = cyl("silo", (x, y, z + 2.2 + h / 2), r, h, "steel")
    smooth(s)
    c = cone("silocone", (x, y, z + 1.45), r, 0.3, 1.5, "steel")
    smooth(c)
    top = sphere("silotop", (x, y, z + 2.2 + h), r, "steel")
    top.scale = (1, 1, 0.25)
    smooth(top)
    for a in (0.5, 2.6, 4.7):
        box("sleg", (x + math.cos(a) * r * 0.85, y + math.sin(a) * r * 0.85, z + 1.1), (0.14, 0.14, 2.2), "metal")
    box("ladder", (x + r + 0.15, y, z + 1.2 + h / 2), (0.05, 0.4, h + 2.0), "metal")

def stair_tower(x, y, z, w=3.4, h=12.0):
    box("towerback", (x, y + D * 0.35, z + h / 2), (w, 0.3, h), "wall")
    box("towerside", (x - w / 2, y, z + h / 2), (0.3, D * 0.7, h), "wall")
    box("towerside", (x + w / 2, y, z + h / 2), (0.3, D * 0.7, h), "wall")
    box("towerglass", (x, y - D * 0.35, z + h / 2), (w, 0.06, h), "glass")
    for i in range(int(h / 3.2) + 1):
        box("towermullion", (x, y - D * 0.35, z + i * 3.2), (w, 0.1, 0.12), "metal")
    lamp = bpy.data.lights.new("towerlight", "AREA")
    lamp.energy = 40 * h
    lamp.color = (0.9, 0.94, 1.0)
    lamp.size = w - 0.4
    lamp.size_y = D * 0.6
    lo = bpy.data.objects.new("towerlight", lamp)
    lo.location = (x, y, z + h - 0.3)
    link(lo)
    box("towerroof", (x, y, z + h + 0.15), (w + 0.4, D * 0.7 + 0.4, 0.3), "slab")
    flights = int(h / 3.2)
    for f in range(flights):
        z0 = z + f * 3.2
        for st in range(8):
            t = st / 8
            fx = x - w / 2 + 0.3 + (t if f % 2 == 0 else 1 - t) * (w - 0.6)
            box("step", (fx, y, z0 + 0.2 + t * 2.9), (0.32, D * 0.55, 0.12), "metal")
        box("landing", (x + (w / 2 - 0.5) * (1 if f % 2 == 0 else -1), y, z0 + 3.15), (0.9, D * 0.6, 0.1), "metal")

def pallets(x, y, z, n=2):
    for i in range(n):
        px = x + i * 1.5
        for l in range(3):
            box("pallet", (px, y, z + 0.08 + l * 0.16), (1.2, 1.0, 0.14), "carton")
        if i % 2 == 0:
            box("palletbox", (px, y, z + 0.55 + 0.35), (1.0, 0.9, 0.7), "carton")

def dock_door(x, y, z, w=3.0, h=3.4):
    box("dock", (x, y, z + h / 2), (w, 0.2, h), "dark")
    for i in range(8):
        box("dockrib", (x, y - 0.11, z + 0.3 + i * (h - 0.6) / 7), (w - 0.1, 0.02, 0.05), "metal")
    box("dockcanopy", (x, y - 0.6, z + h + 0.1), (w + 0.6, 1.4, 0.15), "slab")
    box("bumper", (x - w / 2 + 0.3, y - 0.2, z + 0.25), (0.3, 0.2, 0.5), "dark")
    box("bumper", (x + w / 2 - 0.3, y - 0.2, z + 0.25), (0.3, 0.2, 0.5), "dark")

def fence(x0, x1, y, z):
    for i in range(int((x1 - x0) / 2.4) + 1):
        box("post", (x0 + i * 2.4, y, z + 0.9), (0.06, 0.06, 1.8), "metal")
    box("rail", ((x0 + x1) / 2, y, z + 1.75), (x1 - x0, 0.03, 0.03), "metal")
    box("mesh", ((x0 + x1) / 2, y, z + 0.9), (x1 - x0, 0.005, 1.7), "glass")

def pin(x, y, z):
    box("pin", (x, y, z), (0.9, 0.9, 0.9), "blue")
    box("pinstem", (x, y, z - 0.9), (0.08, 0.08, 1.6), "blue")

# ---------------------------------------------------------------- rooms
ROOM_KIT = {}

def room_kit(kind):
    def deco(fn):
        ROOM_KIT[kind] = fn
        return fn
    return deco

@room_kit("warehouse")
def _(x0, x1, z, h, y):
    w = x1 - x0
    n = max(1, int((w - 1.5) / 3.6))
    for i in range(n):
        rx = x0 + 0.9 + i * 3.6
        rack(rx, rx + 2.8, y - 2.0, z, levels=min(3, int((h - 0.6) / 1.5)))
        rack(rx, rx + 2.8, y + 2.6, z, levels=min(3, int((h - 0.6) / 1.5)))
    pallets(x0 + 1.4, y - 5.0, z, 2)

@room_kit("dispensing")
def _(x0, x1, z, h, y):
    cx = (x0 + x1) / 2
    box("booth", (cx - 0.6, y + 1.0, z + 1.5), (3.0, 2.6, 3.0), "glass")
    box("boothtop", (cx - 0.6, y + 1.0, z + 3.0), (3.2, 2.8, 0.2), "wall")
    box("scaletable", (cx - 0.6, y + 1.0, z + 0.8), (1.6, 0.8, 0.05), "wall")
    box("scale", (cx - 0.6, y + 1.0, z + 0.95), (0.5, 0.5, 0.25), "steel")
    cyl("drum", (cx + 1.8, y - 2.0, z + 0.45), 0.3, 0.9, "steel")
    cyl("drum", (cx + 2.5, y - 2.4, z + 0.45), 0.3, 0.9, "steel")

@room_kit("granulation")
def _(x0, x1, z, h, y):
    fluid_bed((x0 + x1) / 2 - 0.5, y, z)

@room_kit("compression")
def _(x0, x1, z, h, y):
    tablet_press((x0 + x1) / 2 - 0.9, y + 0.5, z)
    box("tabbin", (x1 - 1.0, y - 2.5, z + 0.45), (0.8, 0.8, 0.9), "steel")

@room_kit("coating")
def _(x0, x1, z, h, y):
    coating_pan((x0 + x1) / 2, y, z)

@room_kit("packaging")
def _(x0, x1, z, h, y):
    conveyor(x0 + 2.4, x1 - 0.6, y - 0.5, z)
    if x1 - x0 > 9:
        conveyor(x0 + 2.4, x1 - 0.6, y + 3.5, z)

@room_kit("filling")
def _(x0, x1, z, h, y):
    conveyor(x0 + 2.6, x1 - 0.6, y - 0.5, z, items="bottle")
    box("filler", ((x0 + x1) / 2, y - 0.5, z + 1.9), (2.0, 1.2, 1.2), "steel")
    box("fillerglass", ((x0 + x1) / 2, y - 1.11, z + 1.9), (1.6, 0.02, 0.8), "glass")

@room_kit("qclab")
def _(x0, x1, z, h, y):
    bench(x0 + 0.6, x1 - 2.4, y + 2.5, z)
    bench(x0 + 0.6, x1 - 2.4, y - 2.0, z, stuff=False)
    box("screen", ((x0 + x1) / 2, y - 1.9, z + 1.15), (0.45, 0.04, 0.3), "dark")
    fume_hood(x1 - 1.3, y + 2.5, z)

@room_kit("micro")
def _(x0, x1, z, h, y):
    bsc(x0 + 1.2, y + 2.0, z)
    box("incubator", (x1 - 1.0, y + 2.0, z + 0.9), (0.9, 0.8, 1.8), "wall")
    bench(x0 + 0.6, x1 - 0.6, y - 2.5, z, stuff=False)

@room_kit("stability")
def _(x0, x1, z, h, y):
    stability(x0 + 0.5, x1 - 0.5, y + 2.5, z)

@room_kit("office")
def _(x0, x1, z, h, y):
    n = max(1, int((x1 - x0) / 2.6))
    for i in range(n):
        desk(x0 + 1.5 + i * 2.6, y - 1.0, z, with_person="suit" if i % 2 == 0 else None)
    if x1 - x0 > 6:
        for i in range(n):
            desk(x0 + 1.5 + i * 2.6, y + 3.5, z)
    cyl("plant", (x1 - 0.7, y - 4.5, z + 0.25), 0.22, 0.5, "dark")
    s = sphere("plantball", (x1 - 0.7, y - 4.5, z + 0.9), 0.45, "green")
    smooth(s)

@room_kit("meeting")
def _(x0, x1, z, h, y):
    cx = (x0 + x1) / 2
    box("table", (cx, y, z + 0.74), (min(4.0, x1 - x0 - 1.6), 1.4, 0.06), "wall")
    box("tableleg", (cx, y, z + 0.36), (0.6, 0.6, 0.7), "metal")
    for i in range(4):
        box("chair", (cx - 1.5 + i * 1.0, y - 1.2, z + 0.45), (0.5, 0.5, 0.06), "dark")
        box("chairback", (cx - 1.5 + i * 1.0, y - 1.45, z + 0.75), (0.5, 0.06, 0.55), "dark")
    box("screen", (cx, y + YB - 0.2, z + 1.9), (2.4, 0.06, 1.4), "dark")

@room_kit("corridor")
def _(x0, x1, z, h, y):
    pass

@room_kit("gowning")
def _(x0, x1, z, h, y):
    n = int((x1 - x0 - 0.6) / 0.5)
    for i in range(n):
        box("locker", (x0 + 0.5 + i * 0.5, y + YB - 0.35, z + 0.95), (0.45, 0.5, 1.9), "wall")
    box("stepover", ((x0 + x1) / 2, y - 1.5, z + 0.25), (x1 - x0 - 1.0, 0.4, 0.5), "wall")

@room_kit("moulding")
def _(x0, x1, z, h, y):
    moulding_machine((x0 + x1) / 2, y + 1.0, z)

@room_kit("assembly")
def _(x0, x1, z, h, y):
    laminar_hood(x0, x1, y, z, h)
    bench(x0 + 0.8, x1 - 0.8, y + 2.0, z, stuff=False)
    bench(x0 + 0.8, x1 - 0.8, y - 2.5, z, stuff=False)
    for i in range(int((x1 - x0) / 2.4)):
        bx = x0 + 1.6 + i * 2.4
        box("scope", (bx, y + 2.0, z + 1.25), (0.25, 0.25, 0.6), "dark")
        box("screen", (bx + 0.8, y - 2.4, z + 1.15), (0.45, 0.04, 0.3), "dark")

@room_kit("steriliser")
def _(x0, x1, z, h, y):
    steriliser((x0 + x1) / 2 - 0.8, y + 1.0, z)

@room_kit("metrology")
def _(x0, x1, z, h, y):
    cx = (x0 + x1) / 2
    box("granite", (cx, y + 1.0, z + 0.45), (2.6, 1.6, 0.9), "dark")
    box("cmmpost", (cx - 1.0, y + 1.0, z + 1.5), (0.15, 0.15, 2.0), "metal")
    box("cmmpost", (cx + 1.0, y + 1.0, z + 1.5), (0.15, 0.15, 2.0), "metal")
    box("cmmbeam", (cx, y + 1.0, z + 2.5), (2.3, 0.15, 0.15), "metal")
    box("cmmprobe", (cx + 0.2, y + 1.0, z + 1.8), (0.06, 0.06, 1.3), "metal")
    bench(x0 + 0.6, x1 - 0.6, y - 2.5, z, stuff=False)

@room_kit("control")
def _(x0, x1, z, h, y):
    bench(x0 + 0.6, x1 - 0.6, y - 1.5, z, stuff=False)
    for i in range(int((x1 - x0) / 1.4)):
        box("screen", (x0 + 1.2 + i * 1.4, y - 1.35, z + 1.2), (0.7, 0.04, 0.4), "dark")
    box("wallscreen", ((x0 + x1) / 2, y + YB - 0.2, z + 2.2), (min(5.0, x1 - x0 - 1.5), 0.06, 1.6), "cool")

@room_kit("mixing")
def _(x0, x1, z, h, y):
    n = max(1, int((x1 - x0) / 3.2))
    for i in range(n):
        tank(x0 + 1.8 + i * 3.2, y + 1.0, z)

@room_kit("formulation")
def _(x0, x1, z, h, y):
    bench(x0 + 0.6, x1 - 3.0, y + 2.5, z)
    tank(x1 - 1.6, y + 1.0, z, r=0.5, h=1.4)

@room_kit("reception")
def _(x0, x1, z, h, y):
    box("counter", ((x0 + x1) / 2 - 0.5, y - 2.5, z + 0.55), (3.0, 0.7, 1.1), "wall")
    box("countertop", ((x0 + x1) / 2 - 0.5, y - 2.5, z + 1.12), (3.2, 0.9, 0.05), "dark")
    rack(x1 - 2.6, x1 - 0.4, y + 2.5, z, levels=2)

@room_kit("coldstore")
def _(x0, x1, z, h, y):
    stability(x0 + 0.5, x1 - 0.5, y + 2.5, z)

@room_kit("reactor")
def _(x0, x1, z, h, y):
    reactor((x0 + x1) / 2, y + 1.0, z)

@room_kit("drumfill")
def _(x0, x1, z, h, y):
    for i in range(int((x1 - x0) / 1.1)):
        cyl("drum", (x0 + 0.8 + i * 1.1, y - 1.5, z + 0.45), 0.3, 0.9, "steel")
    box("fillhead", ((x0 + x1) / 2, y - 1.5, z + 2.0), (0.6, 0.6, 0.5), "dark")
    box("fillarm", ((x0 + x1) / 2, y - 1.5, z + h - 0.9), (0.2, 0.2, h - 3.5), "metal")

@room_kit("instruments")
def _(x0, x1, z, h, y):
    bench(x0 + 0.6, x1 - 0.6, y + 2.5, z)

@room_kit("autoclave")
def _(x0, x1, z, h, y):
    steriliser((x0 + x1) / 2, y + 1.0, z)

@room_kit("lobby")
def _(x0, x1, z, h, y):
    box("counter", ((x0 + x1) / 2, y + 2.0, z + 0.55), (2.6, 0.8, 1.1), "wall")
    cyl("plant", (x0 + 0.9, y - 3.5, z + 0.25), 0.22, 0.5, "dark")
    s = sphere("plantball", (x0 + 0.9, y - 3.5, z + 0.9), 0.45, "green")
    smooth(s)

@room_kit("hvacroom")
def _(x0, x1, z, h, y):
    hvac_unit((x0 + x1) / 2, y, z)

@room_kit("facade")
def _(x0, x1, z, h, y):
    pass

# ---------------------------------------------------------------- building
ANCHORS = {}
PIN_WORLD = [None]

def block(x, w, floors, roof="parapet", clad="clad"):
    """floors: list of dict(h, rooms=[dict(kind, w, lit, cool, glass, people=[...], pin)]) bottom-up."""
    z = 0.0
    total = sum(f["h"] + SLAB for f in floors)
    # ground slab
    box("groundslab", (x + w / 2, 0, -0.2), (w + 0.6, D + 0.6, 0.4), "slab")
    # back wall
    box("backwall", (x + w / 2, YB, total / 2), (w, 0.3, total), "wall")
    # side walls
    box("sidewall", (x - 0.15, 0, total / 2), (0.3, D, total), clad)
    box("sidewall", (x + w + 0.15, 0, total / 2), (0.3, D, total), clad)
    for fi, f in enumerate(floors):
        h = f["h"]
        tw = sum(r["w"] for r in f["rooms"])
        rx = x
        for r in f["rooms"]:
            rw = w * r["w"] / tw
            x0, x1 = rx, rx + rw
            kind = r["kind"]
            # floor finish
            box("floorfin", ((x0 + x1) / 2, 0, z + 0.01), (rw, D, 0.02), "cleanfloor" if r.get("cool") else "floor")
            if kind == "facade":
                box("facade", ((x0 + x1) / 2, -YB + 0.15, z + h / 2), (rw, 0.3, h), clad)
            else:
                # ceiling light panel
                if r.get("lit") or r.get("cool"):
                    box("ceil", ((x0 + x1) / 2, 0, z + h - 0.06), (rw - 0.4, D - 0.8, 0.04), "cool" if r.get("cool") else "warm")
                    lamp = bpy.data.lights.new("roomlight", "AREA")
                    lamp.energy = (95 if r.get("cool") else 80) * (rw * D) / 60
                    lamp.color = (0.86, 0.92, 1.0) if r.get("cool") else (1.0, 0.85, 0.62)
                    lamp.shape = "RECTANGLE"
                    lamp.size = rw - 0.8
                    lamp.size_y = D - 1.5
                    lo = bpy.data.objects.new("roomlight", lamp)
                    lo.location = ((x0 + x1) / 2, 0, z + h - 0.15)
                    link(lo)
                # kit
                ROOM_KIT.get(kind, lambda *a: None)(x0, x1, z, h, 0.0)
                # people
                ppl = r.get("people", [])
                for i, attire in enumerate(ppl):
                    px = x0 + rw * (i + 1) / (len(ppl) + 1) + (0.6 if i % 2 else -0.6)
                    person(px, -YB + 2.2 + (i % 2) * 1.6, z, attire, helmet=attire in ("hivis", "coverall") or (kind in ("warehouse", "reactor", "drumfill")))
                # glass front for offices
                if r.get("glass"):
                    box("glassfront", ((x0 + x1) / 2, -YB + 0.05, z + h / 2), (rw, 0.06, h), "glass")
                    for i in range(1, int(rw / 1.8)):
                        box("mullion", (x0 + i * 1.8, -YB + 0.05, z + h / 2), (0.06, 0.1, h), "metal")
                    box("spandrel", ((x0 + x1) / 2, -YB + 0.05, z + 0.5), (rw, 0.1, 1.0), "clad")
                if r.get("pin"):
                    pin((x0 + x1) / 2, -YB + 3.0, z + h - 1.4)
                    PIN_WORLD[0] = Vector(((x0 + x1) / 2, -YB + 3.0, z + h - 1.4))
                if r.get("id"):
                    ANCHORS[r["id"]] = Vector(((x0 + x1) / 2, -YB + 1.0, z + h * 0.55))
            # partition to the next room
            if r is not f["rooms"][-1]:
                box("partition", (x1, 0, z + h / 2), (0.2, D, h), "wall")
            rx = x1
        # slab above
        z += h
        box("slab", (x + w / 2, 0, z + SLAB / 2), (w + 0.3, D + 0.3, SLAB), "slab")
        z += SLAB
    # roof furniture
    if roof in ("parapet", "hvac", "stack"):
        box("parapet", (x + w / 2, -YB, z + 0.35), (w + 0.3, 0.25, 0.7), "clad")
        box("parapet", (x + w / 2, YB, z + 0.35), (w + 0.3, 0.25, 0.7), "clad")
    if roof == "hvac":
        hvac_unit(x + w * 0.25, 1.0, z)
        hvac_unit(x + w * 0.65, -1.5, z)
        cyl("roofduct", (x + w * 0.45, 0.2, z + 0.9), 0.32, w * 0.36, "metal", axis="X")
        for i in range(int(w / 3.0) + 1):
            box("railpost", (x + i * 3.0, -YB + 0.3, z + 1.2), (0.05, 0.05, 1.1), "metal")
        box("railtop", (x + w / 2, -YB + 0.3, z + 1.75), (w, 0.04, 0.04), "metal")
    if roof == "stack":
        cyl("stack", (x + w * 0.7, 2.0, z + 3.5), 0.45, 7.0, "steel")
        box("stackcap", (x + w * 0.7, 2.0, z + 7.1), (1.2, 1.2, 0.2), "dark")
    return z

# ---------------------------------------------------------------- scenes
G = "gown"; C = "coat"; H = "hivis"; S = "suit"; V = "coverall"
SCENES = {
    "pharma": dict(
        blocks=[
            dict(x=-31, w=32, roof="hvac", floors=[
                dict(h=5.6, rooms=[
                    dict(kind="warehouse", w=2.4, lit=True, people=[H, H]),
                    dict(kind="dispensing", w=1.4, cool=True, people=[G]),
                    dict(kind="granulation", w=1.3, cool=True, people=[G]),
                    dict(kind="compression", w=1.6, cool=True, people=[G, G], pin=True),
                ]),
                dict(h=3.6, rooms=[
                    dict(id="qa", kind="office", w=2.2, lit=True, glass=True, people=[S]),
                    dict(kind="meeting", w=1.3, lit=True, glass=True, people=[S]),
                    dict(kind="corridor", w=0.4),
                    dict(id="qc", kind="qclab", w=2.4, lit=True, people=[C, C]),
                ]),
                dict(h=3.2, rooms=[
                    dict(kind="hvacroom", w=2.0, lit=True, people=[V]),
                    dict(id="prod", kind="office", w=2.4, lit=True, glass=True, people=[S]),
                    dict(kind="stability", w=1.6, lit=True),
                ]),
            ]),
            dict(x=2, w=22, roof="parapet", floors=[
                dict(h=5.6, rooms=[
                    dict(kind="coating", w=1.3, cool=True, people=[G]),
                    dict(kind="packaging", w=2.4, lit=True, people=[V, V]),
                ]),
                dict(h=3.6, rooms=[
                    dict(kind="gowning", w=1.0, cool=True, people=[G]),
                    dict(kind="micro", w=1.5, cool=True, people=[C]),
                    dict(kind="meeting", w=1.2, lit=True, glass=True, people=[S]),
                ]),
            ]),
            dict(x=27, w=9, roof="parapet", floors=[dict(h=6.4, rooms=[dict(kind="facade", w=1)])]),
        ],
        props=[("stairs", 25.3, 13.4), ("dock", 31.5, 0), ("pallets", -36.5, 0), ("fence", 37, 44), ("silo", 41, 0)],
        links=[("qa", "QA"), ("prod", "Production"), ("qc", "QC")],
    ),
    "medical-devices": dict(
        blocks=[
            dict(x=-31, w=32, roof="hvac", floors=[
                dict(h=5.6, rooms=[
                    dict(kind="moulding", w=2.2, lit=True, people=[V, V]),
                    dict(kind="assembly", w=2.8, cool=True, people=[G, G, G], pin=True),
                    dict(kind="gowning", w=1.0, cool=True, people=[G]),
                ]),
                dict(h=3.6, rooms=[
                    dict(id="design", kind="office", w=2.2, lit=True, glass=True, people=[S]),
                    dict(kind="metrology", w=1.8, lit=True, people=[C]),
                    dict(id="quality", kind="office", w=1.6, lit=True, glass=True, people=[S]),
                ]),
                dict(h=3.2, rooms=[
                    dict(kind="hvacroom", w=1.6, lit=True, people=[V]),
                    dict(kind="meeting", w=1.4, lit=True, glass=True, people=[S]),
                    dict(kind="stability", w=1.6, lit=True),
                ]),
            ]),
            dict(x=2, w=24, roof="parapet", floors=[
                dict(h=5.6, rooms=[
                    dict(kind="steriliser", w=1.6, lit=True, people=[V]),
                    dict(kind="packaging", w=2.2, cool=True, people=[V, V]),
                    dict(kind="warehouse", w=1.6, lit=True, people=[H]),
                ]),
                dict(h=3.6, rooms=[
                    dict(id="qc", kind="qclab", w=2.2, lit=True, people=[C, C]),
                    dict(id="prod", kind="office", w=1.4, lit=True, glass=True, people=[S]),
                ]),
            ]),
            dict(x=29.5, w=9, roof="parapet", floors=[
                dict(h=5.6, rooms=[dict(kind="lobby", w=1, lit=True, glass=True, people=[S])]),
                dict(h=3.6, rooms=[dict(kind="office", w=1, lit=True, glass=True, people=[S])]),
            ]),
        ],
        props=[("stairs", 27.7, 13.4), ("pallets", -36.5, 0), ("fence", -44, -38), ("tank", 43, 0)],
        links=[("quality", "Quality engineering"), ("prod", "Production"), ("design", "Design")],
    ),
    "chemicals": dict(
        blocks=[
            dict(x=-34, w=16, roof="parapet", floors=[
                dict(h=5.0, rooms=[dict(kind="control", w=1, cool=True, people=[V, V])]),
                dict(h=3.6, rooms=[dict(id="ehs", kind="office", w=1, lit=True, glass=True, people=[S])]),
                dict(h=3.4, rooms=[dict(id="peng", kind="office", w=1, lit=True, glass=True, people=[S])]),
            ]),
            dict(x=-17, w=26, roof="stack", floors=[
                dict(h=13.0, rooms=[
                    dict(kind="reactor", w=1, cool=True, people=[V, H], pin=True),
                    dict(kind="reactor", w=1, cool=True, people=[V]),
                ]),
            ]),
            dict(x=10, w=22, roof="hvac", floors=[
                dict(h=5.0, rooms=[
                    dict(kind="drumfill", w=1.6, lit=True, people=[H, H]),
                    dict(kind="warehouse", w=2.0, lit=True, people=[H]),
                ]),
                dict(h=3.6, rooms=[
                    dict(id="qc", kind="qclab", w=2.2, lit=True, people=[C, C]),
                    dict(kind="meeting", w=1.2, lit=True, glass=True, people=[S]),
                ]),
            ]),
        ],
        props=[("stairs", 33.7, 9.0), ("silo", 39, 0), ("silo", 44.5, 0), ("tank", -37.6, 0), ("drums", 35.5, 0)],
        links=[("peng", "Process engineering"), ("ehs", "EHS"), ("qc", "QA")],
        cam=dict(dist=232, z=38, tz=8.5),
    ),
    "cosmetics": dict(
        blocks=[
            dict(x=-31, w=32, roof="hvac", floors=[
                dict(h=5.6, rooms=[
                    dict(kind="mixing", w=1.8, lit=True, people=[V, V]),
                    dict(kind="filling", w=2.6, cool=True, people=[V, V], pin=True),
                ]),
                dict(h=3.6, rooms=[
                    dict(kind="formulation", w=2.2, lit=True, people=[C, C]),
                    dict(id="qa", kind="office", w=2.2, lit=True, glass=True, people=[S]),
                ]),
                dict(h=3.2, rooms=[
                    dict(id="prod", kind="office", w=2.0, lit=True, glass=True, people=[S]),
                    dict(kind="meeting", w=1.4, lit=True, glass=True, people=[S]),
                    dict(kind="hvacroom", w=1.6, lit=True, people=[V]),
                ]),
            ]),
            dict(x=2, w=24, roof="parapet", floors=[
                dict(h=5.6, rooms=[
                    dict(kind="packaging", w=2.4, lit=True, people=[V, V]),
                    dict(kind="warehouse", w=2.0, lit=True, people=[H]),
                ]),
                dict(h=3.6, rooms=[
                    dict(id="qc", kind="qclab", w=1.8, lit=True, people=[C]),
                    dict(kind="micro", w=1.4, cool=True, people=[C]),
                    dict(kind="stability", w=1.2, lit=True),
                ]),
            ]),
            dict(x=27, w=9, roof="parapet", floors=[dict(h=6.4, rooms=[dict(kind="facade", w=1)])]),
        ],
        props=[("stairs", 25.3, 13.4), ("dock", 31.5, 0), ("pallets", -36.5, 0), ("tank", 40, 0)],
        links=[("qc", "QC"), ("prod", "Production"), ("qa", "QA")],
    ),
    "laboratories": dict(
        blocks=[
            dict(x=-29, w=32, roof="hvac", floors=[
                dict(h=4.4, rooms=[
                    dict(kind="reception", w=1.4, lit=True, people=[C]),
                    dict(kind="qclab", w=2.8, lit=True, people=[C, C, C], pin=True),
                    dict(kind="autoclave", w=1.3, lit=True, people=[C]),
                ]),
                dict(h=3.8, rooms=[
                    dict(kind="micro", w=2.0, cool=True, people=[C, C]),
                    dict(kind="gowning", w=0.8, cool=True),
                    dict(kind="stability", w=1.6, lit=True),
                    dict(id="sup", kind="office", w=1.4, lit=True, glass=True, people=[S]),
                ]),
                dict(h=3.4, rooms=[
                    dict(id="qa", kind="office", w=2.4, lit=True, glass=True, people=[S]),
                    dict(kind="meeting", w=1.6, lit=True, glass=True, people=[S]),
                    dict(kind="control", w=1.2, lit=True, people=[C]),
                ]),
            ]),
            dict(x=4, w=22, roof="parapet", floors=[
                dict(h=4.4, rooms=[
                    dict(kind="warehouse", w=1.5, lit=True, people=[H]),
                    dict(kind="formulation", w=1.8, lit=True, people=[C]),
                ]),
                dict(h=3.8, rooms=[
                    dict(kind="metrology", w=2.0, lit=True, people=[C]),
                    dict(kind="coldstore", w=1.4, lit=True),
                ]),
            ]),
            dict(x=27.5, w=9, roof="parapet", floors=[
                dict(h=4.4, rooms=[dict(kind="lobby", w=1, lit=True, glass=True, people=[S])]),
                dict(h=3.8, rooms=[dict(kind="office", w=1, lit=True, glass=True, people=[S])]),
            ]),
        ],
        props=[("stairs", 25.7, 12.4), ("pallets", -34.5, 0), ("tank", 40, 0), ("fence", -42, -36)],
        links=[("sup", "Lab supervisor"), ("qa", "QA")],
    ),
}

spec = SCENES[SCENE_KEY]
for b in spec["blocks"]:
    block(b["x"], b["w"], b["floors"], roof=b.get("roof", "parapet"))
for p in spec.get("props", []):
    kind, a, bb = p
    if kind == "stairs":
        stair_tower(a, 0, 0, h=bb)
    elif kind == "dock":
        dock_door(a, -YB + 0.2, 0)
    elif kind == "pallets":
        pallets(a, -YB + 1.0, 0, 2)
    elif kind == "fence":
        fence(a, bb, -YB - 0.5, 0)
    elif kind == "silo":
        silo(a, 1.0, 0)
    elif kind == "tank":
        silo(a, 1.0, 0, r=0.9, h=5.0)
    elif kind == "drums":
        for i in range(4):
            cyl("drum", (a + i * 0.8, -YB - 1.5, 0.45), 0.3, 0.9, "steel")

# ---------------------------------------------------------------- ground, light, camera
ground = box("ground", (0, 0, -0.41), (400, 400, 0.02), "shadow")
try:
    ground.is_shadow_catcher = True
except Exception:
    pass

sun = bpy.data.lights.new("sun", "SUN")
sun.energy = 4.0
sun.angle = math.radians(8)
sun.color = (1.0, 0.96, 0.9)
so = bpy.data.objects.new("sun", sun)
so.rotation_euler = (math.radians(50), math.radians(-25), math.radians(-40))
link(so)

fill = bpy.data.lights.new("fill", "AREA")
fill.energy = 1200
fill.size = 80
fill.color = (0.9, 0.94, 1.0)
fo = bpy.data.objects.new("fill", fill)
fo.location = (0, -70, 40)
fo.rotation_euler = (math.radians(58), 0, 0)
link(fo)

cam = bpy.data.cameras.new("cam")
cam.lens = 85
cam.sensor_width = 36
cam.clip_end = 1000
co = bpy.data.objects.new("cam", cam)
camspec = spec.get("cam", {})
co.location = (-6.0, -camspec.get("dist", 205), camspec.get("z", 34))
target = Vector((camspec.get("tx", 3.0), 0, camspec.get("tz", 6.5)))
direction = target - co.location
co.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
link(co)
scene.camera = co

print("DEVICE", scene.cycles.device, [ (d.name, d.type, d.use) for d in (prefs.preferences.devices if prefs else [])])
scene.render.filepath = OUT
bpy.ops.render.render(write_still=True)

# sidecar: where the pin and each linked department land in the image (0..1, y down)
import json
from bpy_extras.object_utils import world_to_camera_view
def proj(v):
    p = world_to_camera_view(scene, co, v)
    return {"x": round(p.x, 4), "y": round(1 - p.y, 4)}
side = {"pin": proj(PIN_WORLD[0]) if PIN_WORLD[0] else None,
        "links": [{"id": i, "role": role, **proj(ANCHORS[i])} for i, role in spec.get("links", []) if i in ANCHORS]}
with open(OUT.replace(".png", ".json"), "w") as f:
    json.dump(side, f)
print("POINTS", side)
print("RENDERED", OUT)

# a white-composited copy for review (the page composites the transparent one)
import numpy as np
img = bpy.data.images.load(OUT)
px = np.array(img.pixels[:], dtype=np.float32).reshape(-1, 4)
a = px[:, 3:4]
rgb = px[:, :3] * a + (1.0 - a)
out = np.concatenate([rgb, np.ones_like(a)], axis=1).reshape(-1)
img2 = bpy.data.images.new("white", img.size[0], img.size[1], alpha=False)
img2.pixels = out.tolist()
img2.filepath_raw = OUT.replace(".png", "-white.png")
img2.file_format = "PNG"
img2.save()
print("REVIEW", img2.filepath_raw)
