"""
view_in_blender.py - open a v3 film .blend in Blender's window ready to
watch: every 3D view looks through the camera with the UI showing (rendered
for the EEVEE overview, material preview for the Cycles step files), no
overlays, the camera framed, and playback running.

  open -n -a Blender --args FILE.blend --python scripts/platform-render/v3/view_in_blender.py

(Saved viewport settings don't survive a file written from background mode,
so this runs in the window once the file is loaded.)
"""
import bpy


def setup():
    scene = bpy.context.scene
    shading = "RENDERED" if scene.render.engine == "BLENDER_EEVEE" else "MATERIAL"
    played = False
    for win in bpy.context.window_manager.windows:
        for area in win.screen.areas:
            if area.type != "VIEW_3D":
                continue
            space = area.spaces[0]
            space.shading.type = shading
            if shading == "MATERIAL":
                space.shading.use_scene_world = True
                space.shading.use_scene_lights = True
            space.overlay.show_overlays = False
            space.show_gizmo = False
            space.region_3d.view_perspective = "CAMERA"
            region = next(r for r in area.regions if r.type == "WINDOW")
            with bpy.context.temp_override(window=win, area=area, region=region):
                bpy.ops.view3d.view_center_camera()
                if not played:
                    scene.frame_current = scene.frame_start
                    bpy.ops.screen.animation_play()
                    played = True
    return None


bpy.app.timers.register(setup, first_interval=0.6)
