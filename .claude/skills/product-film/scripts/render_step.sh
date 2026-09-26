#!/usr/bin/env bash
# render_step.sh - render a range of one step in Blender, resuming from the
# first unfinished frame if Blender dies (Cycles on Metal can crash mid-run,
# and background jobs can end silently).
#
#   render_step.sh TEX_DIR OUT_DIR [FROM:TO] [SAMPLES]
#
# TEX_DIR: frames.mjs flat output (f0000.png... + camera.json)
# FROM:TO: 1-based frame numbers, default all frames
# Writes OUT_DIR/r0001.png... and logs next to OUT_DIR.
set -u
REPO="$(cd "$(dirname "$0")/../../../.." && pwd)"
B=/Applications/Blender.app/Contents/MacOS/Blender
TEX="$1"; OUT="$2"; RANGE="${3:-}"; SAMPLES="${4:-48}"
N=$(ls "$TEX"/f*.png | wc -l | tr -d ' ')
FROM=${RANGE%%:*}; TO=${RANGE##*:}
[ -z "$RANGE" ] && FROM=1 && TO=$N
mkdir -p "$OUT"
s=$FROM
for attempt in 1 2 3 4 5 6 7 8; do
  [ "$s" -gt "$TO" ] && break
  log="$OUT.render.$attempt.log"
  echo "attempt $attempt: frames $s:$TO"
  "$B" -b -P "$REPO/scripts/platform-render/v3/film_step.py" -- "$TEX" "$OUT" --frames "$s:$TO" --samples "$SAMPLES" > "$log" 2>&1
  last=$(grep -o "r0[0-9]*\.png'" "$log" | tail -1 | tr -dc '0-9')
  [ -n "$last" ] && s=$((10#$last + 1))
done
if [ "$s" -gt "$TO" ]; then echo "done: $FROM:$TO"; else echo "STOPPED at $s (see $OUT.render.*.log)"; exit 1; fi
