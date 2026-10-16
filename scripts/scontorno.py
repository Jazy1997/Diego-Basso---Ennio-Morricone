"""Prepara lo scontorno del Maestro (scena "Il Maestro" in home e nella pagina, ARCHITECTURE.md §6, §10).

Dal PNG scontornato: ritaglio ai bordi della figura, RGB azzerato dove la trasparenza è totale (evita aloni
marroni ricampionando), sRGB, altezza 2600 px, WebP con alfa q92. Uscita: src/assets/foto/maestro-scontornato.webp
(le misure finali AVIF/WebP le genera astro:assets).

Uso: python scripts/scontorno.py
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SORGENTE = ROOT.parent / "MATERIALE GRAFICO" / "FOTO" / "Diego Scontornata.png"
USCITA = ROOT / "src" / "assets" / "foto" / "maestro-scontornato.webp"
ALTEZZA = 2600

im = Image.open(SORGENTE).convert("RGBA")
alfa = im.getchannel("A")
im = im.crop(alfa.point(lambda a: 255 if a > 8 else 0).getbbox())
nero = Image.new("RGBA", im.size, (0, 0, 0, 0))
im = Image.composite(im, nero, im.getchannel("A").point(lambda a: 255 if a > 0 else 0))
im = im.resize((round(im.width * ALTEZZA / im.height), ALTEZZA), Image.LANCZOS)
im.save(USCITA, "WEBP", quality=92, method=6)
print(f"+ {USCITA.name} {im.size[0]}x{im.size[1]} {USCITA.stat().st_size / 1e6:.1f} MB")
