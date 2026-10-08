#!/usr/bin/env bash
# Video dell'hero (ARCHITECTURE.md §7.1): tutto il video, in loop, in streaming adattivo HLS.
# - Taglio: dall'inizio della prima inquadratura (13,0 s) a prima della dissolvenza al nero finale (99,5 s).
# - Loop senza stacco: gli ultimi 0,7 s dissolvono nei primi (il file finisce sul fotogramma da cui riparte).
# - Colore "caldo" approvato in T12 (schermo da ciano a grigio caldo, saturazione -15%).
# - Scaletta HLS H.264 (fMP4, segmenti da 4 s): 1080p, 720p, 480p e 2160p se il sorgente è almeno 4K.
#   Uscita in public/video/hero-AAAAMMGG-HHMM/ (cartella nuova a ogni esecuzione: /video/* ha cache immutabile);
#   il nome della cartella va in src/assets/video/hero.json, letto da HeroVideo. Le cartelle vecchie si cancellano.
# - Poster: il primo fotogramma del loop in src/assets/video/hero-poster.jpg (AVIF/WebP generati da Astro).
#
# Uso: bash scripts/video_hero.sh [sorgente] [inizio] [fine]
#   Quando arriva il master del videomaker: bash scripts/video_hero.sh "/percorso/master.mov" (rivedere inizio/fine).
set -euo pipefail

FF="${FFMPEG:-ffmpeg}"
FP="${FFPROBE:-ffprobe}"
WINGET="/c/Users/cazza/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.2-full_build/bin"
command -v "$FF" >/dev/null || FF="$WINGET/ffmpeg"
command -v "$FP" >/dev/null || FP="$WINGET/ffprobe"

RADICE="$(cd "$(dirname "$0")/.." && pwd)"
SRC="${1:-$RADICE/../MATERIALE GRAFICO/VIDEO/VIDEO HERO.mp4}"
INIZIO="${2:-13.0}"
FINE="${3:-99.5}"
XF=0.7
COLORE="selectivecolor=cyans='-0.5 0.1 0.3 0':blues='-0.3 0.05 0.3 0',eq=saturation=0.85"

CARTELLA="hero-$(date +%Y%m%d-%H%M)"
OUT="$RADICE/public/video/$CARTELLA"
TMP="$RADICE/scripts/out/hero-master.mkv"
mkdir -p "$OUT" "$RADICE/scripts/out"

ALTEZZA=$("$FP" -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$SRC")
FPS=$("$FP" -v error -select_streams v:0 -show_entries stream=r_frame_rate -of csv=p=0 "$SRC")
echo "Sorgente: ${ALTEZZA}p, $FPS fps, taglio $INIZIO–$FINE s"

# Il sorgente dichiara pixel anamorfici (SAR 540:409 → 2,35:1) ma il contenuto è 16:9: con il flag i browser
# lo allargano del 32%. setsar=1 riporta i pixel quadrati (verificato a vista sui primi piani, ottobre 2026).
# 1) Master intermedio quasi senza perdite: corpo [INIZIO+XF, FINE] che dissolve nella testa [INIZIO, INIZIO+XF].
CORPO=$(awk "BEGIN{print $FINE - $INIZIO - $XF}")
"$FF" -v error -y -i "$SRC" -filter_complex "\
[0:v]trim=$(awk "BEGIN{print $INIZIO + $XF}"):$FINE,setpts=PTS-STARTPTS,setsar=1,format=yuv420p[corpo];\
[0:v]trim=$INIZIO:$(awk "BEGIN{print $INIZIO + $XF}"),setpts=PTS-STARTPTS,setsar=1,format=yuv420p[testa];\
[corpo][testa]xfade=transition=fade:duration=$XF:offset=$(awk "BEGIN{print $CORPO - $XF}"),$COLORE[v]" \
  -map "[v]" -an -c:v libx264 -crf 10 -preset slow "$TMP"

# 2) Scaletta HLS. GOP = 4 s, senza keyframe sui cambi scena: segmenti allineati tra le qualità.
GOP=$(awk "BEGIN{split(\"$FPS\",f,\"/\"); print int(4 * f[1] / (f[2] ? f[2] : 1) + 0.5)}")
#        nome  altezza  crf  maxrate  bufsize
LIVELLI=("480 480 22 1500k 3000k" "720 720 21 3500k 7000k" "1080 1080 20 6000k 12000k")
[ "$ALTEZZA" -ge 2160 ] && LIVELLI+=("2160 2160 20 16000k 32000k")

MAPPE=(); FILTRO="[0:v]split=${#LIVELLI[@]}"; CATENE=""; VARIANTI=""; i=0
for l in "${LIVELLI[@]}"; do
  read -r NOME H CRF MAX BUF <<<"$l"
  FILTRO+="[s$i]"
  CATENE+=";[s$i]scale=-2:$H:flags=lanczos,setsar=1[v$i]"
  MAPPE+=(-map "[v$i]" "-c:v:$i" libx264 "-crf:v:$i" "$CRF" "-maxrate:v:$i" "$MAX" "-bufsize:v:$i" "$BUF")
  VARIANTI+="v:$i,name:$NOME "
  i=$((i + 1))
done

"$FF" -v error -y -i "$TMP" -filter_complex "$FILTRO$CATENE" "${MAPPE[@]}" \
  -profile:v high -preset slow -tune film -pix_fmt yuv420p \
  -g "$GOP" -keyint_min "$GOP" -sc_threshold 0 -an \
  -f hls -hls_time 4 -hls_playlist_type vod -hls_segment_type fmp4 \
  -hls_fmp4_init_filename "init.mp4" \
  -hls_segment_filename "$OUT/%v/seg-%03d.m4s" \
  -master_pl_name master.m3u8 -var_stream_map "${VARIANTI% }" \
  "$OUT/%v/index.m3u8"

# 3) Poster: primo fotogramma del loop, qualità alta (Astro genera AVIF/WebP).
"$FF" -v error -y -i "$TMP" -vf "select=eq(n\,0)" -frames:v 1 -q:v 2 "$RADICE/src/assets/video/hero-poster.jpg"
rm -f "$TMP"

# 4) Pubblica la nuova cartella e cancella le vecchie.
printf '{ "cartella": "%s" }\n' "$CARTELLA" > "$RADICE/src/assets/video/hero.json"
for vecchia in "$RADICE"/public/video/hero-*; do
  [ "$(basename "$vecchia")" = "$CARTELLA" ] || rm -rf "$vecchia"
done

echo "Durata loop: $(awk "BEGIN{print $CORPO}") s → public/video/$CARTELLA"
for d in "$OUT"/*/; do
  echo "  $(basename "$d"): $(du -sh "$d" | cut -f1)"
done
