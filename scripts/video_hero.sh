#!/usr/bin/env bash
# Montaggio del video dell'hero (ARCHITECTURE.md §7.1).
# Sorgente senza i primi 12 s, 5 inquadrature tagliate sugli stacchi, dissolvenze di 0,7 s,
# l'ultima inquadratura dissolve nella prima: il file finale gira in loop senza stacco.
#
# Uso: bash scripts/video_hero.sh [caldo|originale] [cartella_uscita]
#   caldo (predefinito): correzione colore DS (schermo da ciano a grigio caldo, saturazione -15%)
#   uscita predefinita: public/video
set -euo pipefail

FF="${FFMPEG:-ffmpeg}"
command -v "$FF" >/dev/null || FF="/c/Users/cazza/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.2-full_build/bin/ffmpeg"
RADICE="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$RADICE/../MATERIALE GRAFICO/VIDEO/VIDEO HERO.mp4"
VARIANTE="${1:-caldo}"
OUT="${2:-$RADICE/public/video}"
mkdir -p "$OUT"

# Inquadrature (inizio fine in secondi del sorgente), scelte dal provino (T11)
CLIP=(
  "97.0 99.8"  # teatro all'italiana dorato, panoramica
  "13.0 15.5"  # orchestra intera con lo schermo
  "34.2 36.6"  # il Maestro, primo piano
  "70.9 73.3"  # arpa e orchestra dal palco
  "84.0 86.9"  # il Maestro dal basso, platea sullo sfondo
)
XF=0.7

case "$VARIANTE" in
  caldo) COLORE="selectivecolor=cyans='-0.5 0.1 0.3 0':blues='-0.3 0.05 0.3 0',eq=saturation=0.85" ;;
  originale) COLORE="null" ;;
  *) echo "Variante sconosciuta: $VARIANTE" >&2; exit 1 ;;
esac

# Catena: c0 … c4, poi di nuovo c0 per chiudere il loop
N=${#CLIP[@]}
FILTRI=""
DURATE=()
for i in $(seq 0 $N); do
  k=$((i % N)); read -r A B <<<"${CLIP[$k]}"
  DURATE+=("$(awk "BEGIN{print $B-$A}")")
  FILTRI+="[0:v]trim=$A:$B,setpts=PTS-STARTPTS,fps=25,format=yuv420p[c$i];"
done
PREC="c0"; OFFSET=0
for i in $(seq 1 $N); do
  OFFSET=$(awk "BEGIN{print $OFFSET + ${DURATE[$((i-1))]} - $XF}")
  FILTRI+="[$PREC][c$i]xfade=transition=fade:duration=$XF:offset=$OFFSET[x$i];"
  PREC="x$i"
done
# Il loop: dall'istante XF (solo c0) all'istante OFFSET+XF (solo la copia di c0) → stesso fotogramma.
# +1 fotogramma (0,04 s) per l'arrotondamento dei tagli: verificato confrontando ultimo e primo fotogramma.
DURATA=$OFFSET
FILTRI+="[$PREC]trim=$XF:$(awk "BEGIN{print $OFFSET + $XF + 0.04}"),setpts=PTS-STARTPTS,$COLORE[v]"

echo "Variante $VARIANTE: durata loop ${DURATA}s"
TMP="$OUT/.hero-master.mp4"
"$FF" -v error -y -i "$SRC" -filter_complex "$FILTRI" -map "[v]" -an -c:v libx264 -crf 14 -preset slow "$TMP"

"$FF" -v error -y -i "$TMP" -an -c:v libx264 -profile:v high -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart "$OUT/hero-1920.mp4"
"$FF" -v error -y -i "$TMP" -an -vf scale=1280:-2 -c:v libx264 -profile:v high -crf 27 -preset slow -pix_fmt yuv420p -movflags +faststart "$OUT/hero-1280.mp4"
"$FF" -v error -y -i "$TMP" -an -vf "select=eq(n\,0)" -frames:v 1 -q:v 3 "$OUT/hero-poster.jpg"
rm -f "$TMP"
# Uscita predefinita: il poster va in src/assets/video per <Picture> (AVIF/WebP generati da Astro)
if [ "$OUT" = "$RADICE/public/video" ]; then
  mkdir -p "$RADICE/src/assets/video" && mv "$OUT/hero-poster.jpg" "$RADICE/src/assets/video/hero-poster.jpg"
fi
for f in "$OUT"/hero-*; do
  echo "$(awk "BEGIN{printf \"%.2f\", $(wc -c <"$f")/1048576}") MB  $(basename "$f")"
done
