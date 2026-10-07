"""Prepara le foto del sito (ARCHITECTURE.md §10) dagli originali elencati in src/content/foto.json.

Per ogni voce: orientamento EXIF applicato, ritaglio dell'8% in basso (elimina la firma stampata
del fotografo e il logo ricolorato, vietato dal DS), lato lungo 3200 px, sRGB, JPG q85 progressivo,
nessun metadato. Uscita: src/assets/foto/<id>.jpg (le misure finali le genera astro:assets).

Uso: python scripts/foto.py [--forza]
"""
import io
import json
import sys
from pathlib import Path

from PIL import Image, ImageCms, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SORGENTE = ROOT.parent / "MATERIALE GRAFICO" / "FOTO"
USCITA = ROOT / "src" / "assets" / "foto"
TAGLIO_BASSO = 0.08
LATO = 3200
SRGB = ImageCms.createProfile("sRGB")


def prepara(voce, forza):
    dst = USCITA / f"{voce['id']}.jpg"
    if dst.exists() and not forza:
        return f"= {dst.name} (già presente)"
    im = Image.open(SORGENTE / voce["originale"])
    im = ImageOps.exif_transpose(im)
    icc = im.info.get("icc_profile")
    if icc:  # converte in sRGB se la foto ha un altro profilo (es. Adobe RGB)
        im = ImageCms.profileToProfile(im, ImageCms.ImageCmsProfile(io.BytesIO(icc)), SRGB, outputMode="RGB")
    im = im.convert("RGB")
    w, h = im.size
    im = im.crop((0, 0, w, round(h * (1 - TAGLIO_BASSO))))
    im.thumbnail((LATO, LATO), Image.LANCZOS)
    im.save(dst, "JPEG", quality=85, progressive=True, optimize=True)
    return f"+ {dst.name} {im.size[0]}x{im.size[1]} {dst.stat().st_size / 1e6:.1f} MB"


def main():
    forza = "--forza" in sys.argv
    USCITA.mkdir(parents=True, exist_ok=True)
    voci = json.loads((ROOT / "src" / "content" / "foto.json").read_text(encoding="utf-8"))
    for voce in voci:
        print(prepara(voce, forza))
    totale = sum(f.stat().st_size for f in USCITA.glob("*.jpg")) / 1e6
    print(f"{len(voci)} foto, {totale:.1f} MB in src/assets/foto")


if __name__ == "__main__":
    main()
