"""
decode_frame.py - decode one frame of an MP4 to PNG with Blender's own FFmpeg
(the machine has no ffmpeg that reads MP4).

  /Applications/Blender.app/Contents/MacOS/Blender -b -P decode_frame.py -- IN.mp4 FRAME OUT.png [WxH]

FRAME is 1-based. WxH defaults to 2560x1152.
"""
import bpy, sys

argv = sys.argv[sys.argv.index("--") + 1:]
src, frame, out = argv[0], int(argv[1]), argv[2]
w, h = map(int, (argv[3] if len(argv) > 3 else "2560x1152").split("x"))
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
se = sc.sequence_editor_create()
strips = se.strips if hasattr(se, "strips") else se.sequences
strips.new_movie("m", src, 1, 1)
sc.render.resolution_x, sc.render.resolution_y, sc.render.resolution_percentage = w, h, 100
sc.view_settings.view_transform = "Standard"
sc.frame_start = sc.frame_end = sc.frame_current = frame
sc.render.image_settings.file_format = "PNG"
sc.render.filepath = out
bpy.ops.render.render(write_still=True)
