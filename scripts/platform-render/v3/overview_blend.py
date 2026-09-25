"""
overview_blend.py - the six platform screens of the v3 film in one Blender
file, to look at rather than to render the film from: a 3 x 2 grid, each
screen playing its own step on a loop (quarter-size previews, so the
viewport keeps up), labelled with its rail step, seen through a camera in
rendered view. Also sets each step's own file to open looking through its
camera with the UI showing.

  /Applications/Blender.app/Contents/MacOS/Blender -b -P scripts/platform-render/v3/overview_blend.py -- FOLDER

FOLDER holds step1-home/ ... step6-dashboard/, each with preview/ (from
tex/) and its stepN-*.blend (film_step.py --save).
"""
import bpy, os, sys

FOLDER = os.path.abspath(sys.argv[sys.argv.index("--") + 1])
STEPS = [
    ("step1-home", "The home screen"),
    ("step2-inbox", "The inbox"),
    ("step3-checklist", "The checklist"),
    ("step4-seal", "The seal"),
    ("step5-builder", "The process builder"),
    ("step6-dashboard", "The dashboard"),
]
W, H, GAP_X, GAP_Y = 1.36, 0.66, 0.26, 0.42     # a window is 1360 x 660 px at 1 px = 1 mm
HERO = (0x1F, 0x21, 0x26)


def lin(c):
    c = c / 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def emission(name, color=None, image=None, frames=0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nt = mat.node_tree
    for n in list(nt.nodes):
        nt.nodes.remove(n)
    em = nt.nodes.new("ShaderNodeEmission")
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    nt.links.new(em.outputs["Emission"], out.inputs["Surface"])
    if image:
        tex = nt.nodes.new("ShaderNodeTexImage")
        tex.image = image
        tex.interpolation = "Linear"
        tex.image_user.frame_duration = frames
        tex.image_user.frame_start = 1
        tex.image_user.frame_offset = -1
        tex.image_user.use_cyclic = True
        tex.image_user.use_auto_refresh = True
        nt.links.new(tex.outputs["Color"], em.inputs["Color"])
    else:
        em.inputs["Color"].default_value = (*color, 1)
    return mat


def look_through_camera(shading):
    """every 3D view opens through the camera, textures on, no floor grid"""
    for screen in bpy.data.screens:
        for area in screen.areas:
            if area.type != "VIEW_3D":
                continue
            space = area.spaces[0]
            space.shading.type = shading
            if shading == "MATERIAL":
                space.shading.use_scene_world = True
                space.shading.use_scene_lights = True
            space.overlay.show_floor = False
            space.overlay.show_axis_x = space.overlay.show_axis_y = False
            space.region_3d.view_perspective = "CAMERA"


# ------------------------------------------------------------------ overview
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.name = "Platform screens"
scene.render.engine = "BLENDER_EEVEE"
scene.render.resolution_x, scene.render.resolution_y = 2560, 1440
scene.view_settings.view_transform = "Standard"
scene.render.fps = 30
world = bpy.data.worlds.new("hero")
world.use_nodes = True
world.node_tree.nodes["Background"].inputs["Color"].default_value = (*[lin(c) for c in HERO], 1)
scene.world = world

longest = 0
label_mat = emission("label", color=(0.82, 0.84, 0.87))
for i, (folder, title) in enumerate(STEPS):
    col, row = i % 3, i // 3
    x = (col - 1) * (W + GAP_X)
    y = (0.5 - row) * (H + GAP_Y)
    prev = os.path.join(FOLDER, folder, "preview")
    files = sorted(f for f in os.listdir(prev) if f.endswith(".jpg"))
    longest = max(longest, len(files))
    img = bpy.data.images.load(os.path.join(prev, files[0]))
    img.source = "SEQUENCE"
    bpy.ops.mesh.primitive_plane_add(size=1, location=(x, y, 0))
    plane = bpy.context.active_object
    plane.name = f"{i + 1} {title}"
    plane.scale = (W, H, 1)
    plane.data.materials.append(emission(f"screen {i + 1}", image=img, frames=len(files)))
    bpy.ops.object.text_add(location=(x - W / 2, y + H / 2 + 0.07, 0))
    label = bpy.context.active_object
    label.name = f"label {i + 1}"
    label.data.body = f"{i + 1:02d}   {title}"
    label.data.size = 0.075
    label.data.materials.append(label_mat)

cam_data = bpy.data.cameras.new("overview")
cam_data.type = "ORTHO"
cam_data.ortho_scale = 3 * W + 2 * GAP_X + 0.6
cam = bpy.data.objects.new("overview", cam_data)
cam.location = (0, 0.03, 5)
scene.collection.objects.link(cam)
scene.camera = cam
scene.frame_start, scene.frame_end = 1, longest
look_through_camera("RENDERED")
out = os.path.join(FOLDER, "platform-film-v3-overview.blend")
bpy.ops.wm.save_as_mainfile(filepath=out, relative_remap=True)
for im in bpy.data.images:
    im.filepath = bpy.path.relpath(im.filepath)
bpy.ops.wm.save_mainfile()
print("saved", out)

# ------------------------------------------------------------------ each step's own file
for folder, _ in STEPS:
    path = os.path.join(FOLDER, folder, folder + ".blend")
    bpy.ops.wm.open_mainfile(filepath=path)
    look_through_camera("MATERIAL")
    bpy.context.scene.frame_current = 1
    bpy.ops.wm.save_mainfile()
    print("viewport set", path)
for root, _, files in os.walk(FOLDER):
    for f in files:
        if f.endswith(".blend1"):
            os.remove(os.path.join(root, f))
