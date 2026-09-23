"""
encode.py - the finished frames (post.py output) to video, with Blender's own
FFmpeg, since the machine has no ffmpeg on PATH.

  /Applications/Blender.app/Contents/MacOS/Blender -b -P scripts/platform-render/encode.py -- FRAMES_DIR OUT.mp4 [--webm OUT.webm] [--fps 30]

H.264 MP4 for every browser; VP9 WebM as the lighter first source.
"""
import bpy, os, sys

argv = sys.argv[sys.argv.index("--") + 1:]
frames_dir, out_mp4 = argv[0], argv[1]
out_webm = argv[argv.index("--webm") + 1] if "--webm" in argv else None
fps = int(argv[argv.index("--fps") + 1]) if "--fps" in argv else 30
# Blender CRF presets: HIGH, MEDIUM, LOW, VERYLOW (LOW keeps UI text crisp at ~half the size)
crf = argv[argv.index("--crf") + 1] if "--crf" in argv else "LOW"

files = sorted(f for f in os.listdir(frames_dir) if f.endswith(".png"))
assert files, "no frames"

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
first = bpy.data.images.load(os.path.join(frames_dir, files[0]))
scene.render.resolution_x, scene.render.resolution_y = first.size[0], first.size[1]
scene.render.resolution_percentage = 100
scene.render.fps = fps
scene.frame_start, scene.frame_end = 1, len(files)
scene.view_settings.view_transform = "Standard"

se = scene.sequence_editor_create()
strips = se.strips if hasattr(se, "strips") else se.sequences
strip = strips.new_image("frames", os.path.join(frames_dir, files[0]), 1, 1)
for f in files[1:]:
    strip.elements.append(f)
strip.frame_final_duration = len(files)


def encode(path, container, codec, crf):
    ims = scene.render.image_settings
    if hasattr(ims, "media_type"):
        ims.media_type = "VIDEO"          # Blender 5: pick VIDEO before FFMPEG
    ims.file_format = "FFMPEG"
    ff = scene.render.ffmpeg
    ff.format = container
    ff.codec = codec
    ff.constant_rate_factor = crf
    ff.ffmpeg_preset = "GOOD"
    ff.gopsize = fps                      # a keyframe every second, so rail seeks land fast
    ff.audio_codec = "NONE"
    scene.render.filepath = path
    bpy.ops.render.render(animation=True)
    print("encoded", path)


encode(out_mp4, "MPEG4", "H264", crf)
if out_webm:
    encode(out_webm, "WEBM", "WEBM", crf)
