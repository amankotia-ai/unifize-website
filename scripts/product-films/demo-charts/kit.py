"""
kit.py - the Blender side of the demo-modal chart films. The marks are real
geometry a few millimetres proud of an invisible ground; the ground is a
shadow catcher and the film is transparent, so each frame is the chart and
its soft contact shadow ONLY, and the page's own gradient wash shows through
(WebM VP9 alpha / HEVC alpha on the page). Type is flat emission.

Scale: 1 design px = 1 mm. The frame is 720 x 600 design px (the video box
in the modal at 1x) and renders at 2x (1440 x 1200). Orthographic camera,
square on: nothing here should look like perspective.

Lighting is calibrated so a fully lit face renders exactly its albedo under
the Standard view transform: world (uniform white, strength WORLD) plus one
sun whose cosine term adds the remaining 1 - WORLD. Brand colours come out as
drawn; only the shadow catcher picks up shade.
"""
import bpy, bmesh, math, os, time
from mathutils import Vector

W, H = 720, 600
PX = 0.001
WORLD = float(os.environ.get("DC_WORLD", "0.9"))
FONTS = os.path.expanduser("~/Downloads/product-films/demo-charts/fonts")

# new objects link here; the stage makes two collections, "marks" (everything
# lit, with the shadow catcher) and "tracks" (the translucent tracks). Each
# frame renders the two as separate passes and post.py lays marks over
# tracks: a translucent surface over a shadow catcher renders as shadow.
LINK = None


def _link(o):
    (LINK or bpy.context.scene.collection).objects.link(o)


# ------------------------------------------------------------------ colour
def _lin(c):
    c = c / 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def rgb(hexs):
    h = hexs.lstrip("#")
    return [_lin(int(h[i:i + 2], 16)) for i in (0, 2, 4)]


def mixc(a, b, k):
    """mix two colours (hex or linear rgb) in linear light"""
    A = rgb(a) if isinstance(a, str) else a
    B = rgb(b) if isinstance(b, str) else b
    return [x + (y - x) * k for x, y in zip(A, B)]


# ------------------------------------------------------------------ time
def clamp(x, a=0.0, b=1.0):
    return a if x < a else b if x > b else x


def prog(t, t0, t1):
    return clamp((t - t0) / (t1 - t0)) if t1 > t0 else float(t >= t1)


def ease(k):  # easeInOutCubic, the film kit's default
    return 4 * k * k * k if k < 0.5 else 1 - (-2 * k + 2) ** 3 / 2


def ease_out(k):  # easeOutCubic
    return 1 - (1 - k) ** 3


def ease_q(k):  # easeInOutQuart, for the long travels
    return 8 * k ** 4 if k < 0.5 else 1 - (-2 * k + 2) ** 4 / 2


def lerp(a, b, k):
    return a + (b - a) * k


def E(t, t0, t1, f=ease):
    return f(prog(t, t0, t1))


# ------------------------------------------------------------------ stage
def P(x, y, z=0.0):
    """frame px (origin top-left, y down) -> world metres"""
    return Vector(((x - W / 2) * PX, (H / 2 - y) * PX, z * PX))


class Stage:
    def __init__(self, scale=2.0, samples=64, fps=60):
        bpy.ops.wm.read_factory_settings(use_empty=True)
        sc = self.sc = bpy.context.scene
        sc.render.engine = "CYCLES"
        try:
            prefs = bpy.context.preferences.addons["cycles"].preferences
            prefs.compute_device_type = "METAL"
            prefs.get_devices()
            for d in prefs.devices:
                d.use = True
            sc.cycles.device = "GPU"
        except Exception:
            sc.cycles.device = "CPU"
        sc.cycles.samples = samples
        # flat regions settle early; the shadow penumbrae get the samples
        sc.cycles.use_adaptive_sampling = True
        sc.cycles.adaptive_threshold = float(os.environ.get("DC_NOISE", "0.006"))
        sc.cycles.adaptive_min_samples = 24
        sc.cycles.use_denoising = False           # a denoiser smears type
        sc.cycles.pixel_filter_type = "BLACKMAN_HARRIS"
        sc.cycles.filter_width = 1.0
        sc.cycles.max_bounces = 2
        # no bounce light: the fills must not tint the track or the ground
        sc.cycles.diffuse_bounces = 0
        sc.cycles.glossy_bounces = 0
        sc.cycles.transmission_bounces = 0
        sc.cycles.transparent_max_bounces = 24
        sc.cycles.seed = 7
        sc.render.film_transparent = True
        sc.render.resolution_x = round(W * scale)
        sc.render.resolution_y = round(H * scale)
        sc.render.resolution_percentage = 100
        sc.render.fps = fps
        sc.render.dither_intensity = 0.0
        sc.render.use_persistent_data = True
        sc.render.image_settings.file_format = "PNG"
        sc.render.image_settings.color_mode = "RGBA"
        sc.render.image_settings.color_depth = "8"
        sc.render.image_settings.compression = 30
        sc.view_settings.view_transform = "Standard"
        sc.view_settings.look = "None"
        self.samples = samples

        global LINK
        self.marks = bpy.data.collections.new("marks")
        self.tracks = bpy.data.collections.new("tracks")
        sc.collection.children.link(self.marks)
        sc.collection.children.link(self.tracks)
        LINK = self.marks

        wd = bpy.data.worlds.new("sky")
        wd.use_nodes = True
        bg = wd.node_tree.nodes["Background"]
        bg.inputs["Color"].default_value = (1, 1, 1, 1)
        bg.inputs["Strength"].default_value = WORLD
        sc.world = wd

        # one soft sun from the upper left: shadows fall down and to the right
        elev = math.radians(55)
        sd = bpy.data.lights.new("sun", "SUN")
        sd.energy = (1 - WORLD) * math.pi / math.sin(elev)
        sd.angle = math.radians(float(os.environ.get("DC_SUN_ANGLE", "12")))
        sun = bpy.data.objects.new("sun", sd)
        sc.collection.objects.link(sun)                 # lights both passes
        d = Vector((-0.55, 0.62, 0)).normalized() * math.cos(elev)
        d.z = math.sin(elev)
        sun.rotation_euler = d.to_track_quat("Z", "Y").to_euler()

        # the ground: catches shadows, renders transparent everywhere else
        bpy.ops.mesh.primitive_plane_add(size=1)
        g = bpy.context.active_object
        for c in list(g.users_collection):
            c.objects.unlink(g)
        self.marks.objects.link(g)
        g.name = "ground"
        g.scale = (W * 3 * PX, H * 3 * PX, 1)
        g.is_shadow_catcher = True
        gm = bpy.data.materials.new("ground")
        gm.use_nodes = True
        gm.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (1, 1, 1, 1)
        g.data.materials.append(gm)

        cd = bpy.data.cameras.new("lens")
        cd.type = "ORTHO"
        cd.ortho_scale = W * PX
        cd.sensor_fit = "HORIZONTAL"
        cd.clip_start, cd.clip_end = 0.01, 10
        self.cam = bpy.data.objects.new("lens", cd)
        sc.collection.objects.link(self.cam)
        sc.camera = self.cam
        self.cam.location = (0, 0, 2)

    def _pass(self, which, samples, path):
        lc = bpy.context.view_layer.layer_collection.children
        lc["marks"].exclude = which != "marks"
        lc["tracks"].exclude = which != "tracks"
        self.sc.cycles.samples = samples
        self.sc.render.filepath = path
        bpy.ops.render.render(write_still=True)

    def render(self, marks_path, tracks_path, track_samples=16):
        """the frame as two passes: lit marks + shadows, then the tracks"""
        t0 = time.time()
        self._pass("marks", self.samples, marks_path)
        t1 = time.time()
        self._pass("tracks", track_samples, tracks_path)
        # both back in the view layer: excluded objects are not evaluated,
        # so a text's width would read stale until the next pass
        lc = bpy.context.view_layer.layer_collection.children
        lc["marks"].exclude = lc["tracks"].exclude = False
        print(f"frame {os.path.basename(marks_path)} marks {t1 - t0:.1f}s tracks {time.time() - t1:.1f}s", flush=True)


# ------------------------------------------------------------------ materials
def _material(name, emission=False):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    for n in list(nt.nodes):
        nt.nodes.remove(n)
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    if emission:
        sh = nt.nodes.new("ShaderNodeEmission")
        sh.inputs["Strength"].default_value = 1.0
    else:
        sh = nt.nodes.new("ShaderNodeBsdfDiffuse")
        sh.inputs["Roughness"].default_value = 0.0   # Lambert: Oren-Nayar darkens
    tr = nt.nodes.new("ShaderNodeBsdfTransparent")
    mx = nt.nodes.new("ShaderNodeMixShader")
    mx.inputs["Fac"].default_value = 1.0
    nt.links.new(tr.outputs[0], mx.inputs[1])
    nt.links.new(sh.outputs[0], mx.inputs[2])
    nt.links.new(mx.outputs[0], out.inputs["Surface"])
    m["sh"], m["mx"] = sh.name, mx.name
    if emission:
        m.cycles.emission_sampling = "NONE"    # type lights nothing
    return m


class Mark:
    """one object with its own material: colour and opacity set per frame"""

    def __init__(self, obj, emission):
        self.o = obj
        self.m = _material(obj.name + ".m", emission)
        obj.data.materials.append(self.m)
        self._sh = self.m.node_tree.nodes[self.m["sh"]]
        self._mx = self.m.node_tree.nodes[self.m["mx"]]
        self._a = 1.0

    def color(self, c):
        lin = rgb(c) if isinstance(c, str) else c
        self._sh.inputs["Color"].default_value = (*lin, 1)
        return self

    def alpha(self, a):
        self._a = clamp(a)
        self._mx.inputs["Fac"].default_value = self._a
        self.o.hide_render = self._a <= 0.002
        return self


class Text(Mark):
    """flat type as emission, a hair above the ground; y is the baseline"""

    _fonts = {}

    def __init__(self, font, size, col, align="LEFT", track=0.0, z=0.02):
        if font not in Text._fonts:
            Text._fonts[font] = bpy.data.fonts.load(os.path.join(FONTS, font))
        cu = bpy.data.curves.new("t", "FONT")
        cu.font = Text._fonts[font]
        cu.size = size * PX
        cu.align_x = align
        cu.align_y = "TOP_BASELINE"
        cu.space_character = 1 + track
        cu.resolution_u = 32
        o = bpy.data.objects.new("t", cu)
        _link(o)
        o.visible_shadow = False
        super().__init__(o, True)
        self.z = z
        self.color(col)

    def set(self, body, x, y, a=1.0):
        if self.o.data.body != body:
            self.o.data.body = body
        self.o.location = P(x, y, self.z)
        self.alpha(a)
        return self

    def width(self, body):
        """rendered width in px of a string in this face and size"""
        old = self.o.data.body
        self.o.data.body = body
        bpy.context.view_layer.update()
        w = self.o.dimensions.x / PX
        self.o.data.body = old
        return w


class Solid(Mark):
    """a mesh rebuilt every frame from polygons (frame px), raised h_mm"""

    def __init__(self, name, col, shadow=True, emission=False):
        me = bpy.data.meshes.new(name)
        o = bpy.data.objects.new(name, me)
        _link(o)
        o.visible_shadow = shadow
        super().__init__(o, emission)
        self.color(col)

    def set(self, polys, h_mm=3.0, z0=0.0, a=1.0):
        bm = bmesh.new()
        for poly in polys:
            if len(poly) < 3:
                continue
            vs = [bm.verts.new(P(x, y, z0)) for x, y in poly]
            try:
                f = bm.faces.new(vs)
            except ValueError:
                continue
            if h_mm > 0.001:
                ext = bmesh.ops.extrude_face_region(bm, geom=[f])
                top = [e for e in ext["geom"] if isinstance(e, bmesh.types.BMVert)]
                bmesh.ops.translate(bm, verts=top, vec=(0, 0, h_mm * PX))
        bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
        bm.to_mesh(self.o.data)
        bm.free()
        self.o.data.update()
        self.alpha(a if polys else 0)
        return self


# ------------------------------------------------------------------ shapes
# Every chart mark is a STRIP: K+1 points along its outer edge and K+1 along
# its inner edge, so a cell, a bar segment and a ring sector share one form
# and morph into each other by moving points.
K = 16


def rect_strip(x, y, w, h):
    top = [(x + w * j / K, y) for j in range(K + 1)]
    bot = [(x + w * j / K, y + h) for j in range(K + 1)]
    return top, bot


def sector_strip(cx, cy, r0, r1, a0, a1):
    """angles in degrees, clockwise from 12 o'clock; 'top' is the outer edge"""
    top, bot = [], []
    for j in range(K + 1):
        a = math.radians(a0 + (a1 - a0) * j / K)
        s, c = math.sin(a), -math.cos(a)
        top.append((cx + r1 * s, cy + r1 * c))
        bot.append((cx + r0 * s, cy + r0 * c))
    return top, bot


def lerp_strip(A, B, k):
    return ([(lerp(p[0], q[0], k), lerp(p[1], q[1], k)) for p, q in zip(A[0], B[0])],
            [(lerp(p[0], q[0], k), lerp(p[1], q[1], k)) for p, q in zip(A[1], B[1])])


def sub_strip(S, u0, u1):
    """the part of a strip between u0 and u1 (0..1 along its length)"""
    def at(pts, u):
        f = u * K
        i = min(int(f), K - 1)
        r = f - i
        return (lerp(pts[i][0], pts[i + 1][0], r), lerp(pts[i][1], pts[i + 1][1], r))
    us = [u0 + (u1 - u0) * j / K for j in range(K + 1)]
    return [at(S[0], u) for u in us], [at(S[1], u) for u in us]


def strip_poly(S):
    return [S[0] + S[1][::-1]]
