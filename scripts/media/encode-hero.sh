#!/bin/bash
set -euo pipefail
# Usage: encode-hero.sh <scratch-dir>  (expects <scratch-dir>/raw-video/hero-hd.mp4 — the 1080p Wistia rendition of 8kirf86p7j)
S="$1"; SRC="$S/raw-video/hero-hd.mp4"; OUT="$S/out-video"
SEGS=(2.80:5.36 56.85:58.40 52.92:53.96 60.96:61.96 42.76:44.00 47.84:49.12 68.00:69.04 70.76:71.72 15.24:17.90 55.06:55.88)
F=""; C=""; i=0
for seg in "${SEGS[@]}"; do a="${seg%%:*}"; b="${seg##*:}"; F+="[0:v]trim=start=$a:end=$b,setpts=PTS-STARTPTS[v$i];"; C+="[v$i]"; i=$((i+1)); done
FC="${F}${C}concat=n=$i:v=1:a=0[cat]"
ffmpeg -v error -y -i "$SRC" -filter_complex "$FC;[cat]scale=1280:720:flags=lanczos,eq=saturation=0.92:contrast=1.04,format=yuv420p[out]" -map "[out]" -an -c:v libx264 -profile:v high -preset veryslow -crf 29 -g 50 -movflags +faststart "$OUT/hero-1280.mp4"
ffmpeg -v error -y -i "$SRC" -filter_complex "$FC;[cat]crop=608:1080:(iw-608)/2:0,scale=540:960:flags=lanczos,eq=saturation=0.92:contrast=1.04,format=yuv420p[out]" -map "[out]" -an -c:v libx264 -profile:v high -preset veryslow -crf 29 -g 50 -movflags +faststart "$OUT/hero-540x960.mp4"
ffmpeg -v error -y -ss 0.3 -i "$OUT/hero-1280.mp4" -frames:v 1 -q:v 3 "$OUT/hero-poster.jpg"
ffmpeg -v error -y -ss 0.3 -i "$OUT/hero-540x960.mp4" -frames:v 1 -q:v 3 "$OUT/hero-poster-mobile.jpg"
ffmpeg -v error -y -i "$OUT/hero-1280.mp4" -vf "fps=1,scale=240:-1,tile=8x2" -frames:v 1 "$S/frames/hero-loop-check.jpg"
ls -la "$OUT"; for f in "$OUT"/*.mp4; do echo "$(basename "$f"): $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")s"; done
