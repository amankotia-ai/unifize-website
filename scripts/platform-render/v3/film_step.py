"""
film_step.py - films one v3 step: the UI texture sequence (frames.mjs flat
mode, one PNG per frame at 4x) on a flat plane, a camera that faces it square
on and dollies along the path the scene itself defines (camera.json), real
motion blur on the moves, the hero charcoal all round.

  /Applications/Blender.app/Contents/MacOS/Blender -b -P scripts/platform-render/v3/film_step.py -- \
      TEX_DIR OUT_DIR [--frames 1:150] [--samples 32] [--res 2560x1152] [--filter 0.9]
      [--save FILE.blend]   build the scene and save it instead of rendering
                            (texture and output paths relative to the file)

Scale: 1 UI px = 1 mm, so the window is a 1.36 x 0.66 m plane. The plane and
the ground are UNLIT emission under the Standard view transform, so the UI's
whites and brand blue come out exactly as drawn and the ground is exactly
#1f2126 (the hero's charcoal: no frame edge on the page).
"""
import bpy, json, math, os, sys

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
TEX, OUT = os.path.abspath(argv[0]), os.path.abspath(argv[1])
opt = lambda k, d: argv[argv.index(k) + 1] if k in argv else d
F0, F1 = map(int, opt("--frames", "1:0").split(":"))
SAMPLES = int(opt("--samples", "32"))
RES_X, RES_Y = map(int, opt("--res", "2560x1152").split("x"))
FILTER = float(opt("--filter", "0.9"))
SAVE = opt("--save", None)  # px; 1.5 (the default) softened the type

PX = 0.001                      # metres per UI px
SENSOR = 36.0                   # mm, fitted to the frame width
FOCAL = 85.0                    # mm; a flat plane square to the lens films the
                                # same at any focal length, this only sets distance
HERO = (0x1F, 0x21, 0x26)

meta = json.load(open(os.path.join(TEX, "camera.json")))
WIN_W, WIN_H = meta["window"]
CAMS = meta["cam"]
frames = sorted(f for f in os.listdir(TEX) if f.endswith(".png"))
assert len(frames) == len(CAMS), (len(frames), len(CAMS))
if F1 == 0:
    F1 = len(frames)


def srgb_to_linear(c):
    c = c / 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


# ------------------------------------------------------------------ scene
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.render.engine = "CYCLES"
try:
    prefs = bpy.context.preferences.addons["cycles"].preferences
    prefs.compute_device_type = "METAL"
    prefs.get_devices()
    for d in prefs.devices:
        d.use = True
    scene.cycles.device = "GPU"
except Exception:
    scene.cycles.device = "CPU"
scene.cycles.samples = SAMPLES
scene.cycles.use_adaptive_sampling = False
scene.cycles.use_denoising = False          # a denoiser would smear the type
scene.cycles.max_bounces = 0                # nothing here bounces: all emission
scene.cycles.pixel_filter_type = "BLACKMAN_HARRIS"
scene.cycles.filter_width = FILTER
scene.render.resolution_x, scene.render.resolution_y = RES_X, RES_Y
scene.render.resolution_percentage = 100
scene.render.fps = 30
scene.render.dither_intensity = 0.0         # grain is added in post, on purpose
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGB"
scene.view_settings.view_transform = "Standard"
scene.view_settings.look = "None"
scene.view_settings.exposure = 0.0
scene.view_settings.gamma = 1.0
# motion blur on the camera's moves: a 180 degree shutter, centred on the frame
scene.render.use_motion_blur = True
scene.render.motion_blur_shutter = 0.5
scene.render.motion_blur_position = "CENTER"

world = bpy.data.worlds.new("hero")
world.use_nodes = True
bg = world.node_tree.nodes["Background"]
bg.inputs["Color"].default_value = (*[srgb_to_linear(c) for c in HERO], 1)
bg.inputs["Strength"].default_value = 1.0
scene.world = world

# ------------------------------------------------------------------ the window
bpy.ops.mesh.primitive_plane_add(size=1)
win = bpy.context.active_object
win.name = "window"
win.scale = (WIN_W * PX, WIN_H * PX, 1)

img = bpy.data.images.load(os.path.join(TEX, frames[0]))
img.source = "SEQUENCE"
img.colorspace_settings.name = "sRGB"
mat = bpy.data.materials.new("ui")
mat.use_nodes = True
nt = mat.node_tree
for n in list(nt.nodes):
    nt.nodes.remove(n)
tex = nt.nodes.new("ShaderNodeTexImage")
tex.image = img
tex.interpolation = "Linear"
tex.extension = "CLIP"
tex.image_user.frame_duration = len(frames)
tex.image_user.frame_start = 1
tex.image_user.frame_offset = -1            # scene frame 1 -> f0000.png
tex.image_user.use_auto_refresh = True
emit = nt.nodes.new("ShaderNodeEmission")
emit.inputs["Strength"].default_value = 1.0
outn = nt.nodes.new("ShaderNodeOutputMaterial")
nt.links.new(tex.outputs["Color"], emit.inputs["Color"])
nt.links.new(emit.outputs["Emission"], outn.inputs["Surface"])
win.data.materials.append(mat)
# the camera never sees the plane edge-on, but keep it out of the light paths
win.visible_shadow = False

# ------------------------------------------------------------------ the camera
cam_data = bpy.data.cameras.new("lens")
cam_data.lens = FOCAL
cam_data.sensor_width = SENSOR
cam_data.sensor_fit = "HORIZONTAL"
cam_data.clip_start = 0.05
cam_data.clip_end = 100
cam = bpy.data.objects.new("lens", cam_data)
scene.collection.objects.link(cam)
scene.camera = cam
cam.rotation_euler = (0, 0, 0)              # square on: looking straight down -Z


def to_world(cx, cy):
    """window px (x right, y down, origin top-left) -> plane coordinates"""
    return ((cx - WIN_W / 2) * PX, (WIN_H / 2 - cy) * PX)


# one key per frame, linear between them: the path is the scene's own spline,
# sampled; motion blur reads the subframe positions off these keys
bpy.context.preferences.edit.keyframe_new_interpolation_type = "LINEAR"
for i, c in enumerate(CAMS):
    x, y = to_world(c["cx"], c["cy"])
    dist = c["vw"] * PX * FOCAL / SENSOR    # distance at which vw px span the frame width
    cam.location = (x, y, dist)
    cam.keyframe_insert("location", frame=i + 1)

scene.frame_start, scene.frame_end = F0, F1
if SAVE:
    scene.render.filepath = "//render/r"
    bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(SAVE), relative_remap=True)
    img.filepath = bpy.path.relpath(img.filepath)
    bpy.ops.wm.save_mainfile()
    print("saved", SAVE)
    sys.exit(0)
os.makedirs(OUT, exist_ok=True)
scene.render.filepath = os.path.join(OUT, "r")
scene.render.use_file_extension = True
bpy.ops.render.render(animation=True)
print("rendered", F0, "to", F1, "into", OUT)
