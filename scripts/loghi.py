"""Prepara i loghi per il sito (ARCHITECTURE.md §10) dai 4 PNG originali.

- src/assets/logo/logo-{oro,bianco}-{verticale,orizzontale}.png  master ritagliati, 1600 px di larghezza
  (le misure finali le genera astro:assets: testata 280/560 px, hero 480/960 px)
- public/favicon.ico (16/32/48), public/apple-touch-icon.png (180), public/icona-512.png
  logo verticale oro su sala-100 con area di rispetto 0,5 H (eccezione ammessa dal DS per favicon e profilo)
- public/og/default.jpg 1200×630 provvisoria (logo su sala-100); quelle con foto arrivano in T36

Uso: python scripts/loghi.py
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SORGENTE = ROOT.parent / "MATERIALE GRAFICO" / "LOGO"
ASSET = ROOT / "src" / "assets" / "logo"
PUBLIC = ROOT / "public"
SALA_100 = (11, 10, 8)

# Abbinamento verificato a vista (T08): bbox 4407×1506 = verticale, 4740×687 = orizzontale
MAPPA = {
    "Logo Morricone-01.png": "logo-bianco-verticale.png",
    "Logo Morricone-02.png": "logo-bianco-orizzontale.png",
    "Logo Morricone-03.png": "logo-oro-verticale.png",
    "Logo Morricone-04.png": "logo-oro-orizzontale.png",
}
H_VERTICALE = 0.12  # H ≈ 12% della larghezza del logo verticale (DS › Logo)


def ritaglia(nome):
    im = Image.open(SORGENTE / nome).convert("RGBA")
    return im.crop(im.getbbox())


def su_sala(logo, lato_w, lato_h, larghezza_logo):
    tela = Image.new("RGB", (lato_w, lato_h), SALA_100)
    l = logo.copy()
    l.thumbnail((larghezza_logo, lato_h), Image.LANCZOS)
    tela.paste(l, ((lato_w - l.width) // 2, (lato_h - l.height) // 2), l)
    return tela


def main():
    ASSET.mkdir(parents=True, exist_ok=True)
    (PUBLIC / "og").mkdir(parents=True, exist_ok=True)
    for src, dst in MAPPA.items():
        im = ritaglia(src)
        im.thumbnail((1600, 1600), Image.LANCZOS)
        im.save(ASSET / dst, optimize=True)
        print(f"{src} -> src/assets/logo/{dst} {im.size}")

    vert = ritaglia("Logo Morricone-03.png")
    # Icona quadrata: logo largo quanto il lato meno 0,5 H per parte → larghezza = lato / (1 + H)
    icona = su_sala(vert, 512, 512, int(512 / (1 + H_VERTICALE)))
    icona.save(PUBLIC / "icona-512.png", optimize=True)
    icona.resize((180, 180), Image.LANCZOS).save(PUBLIC / "apple-touch-icon.png", optimize=True)
    icona.save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

    og = su_sala(vert, 1200, 630, 640)
    og.save(PUBLIC / "og" / "default.jpg", quality=88, optimize=True, progressive=True)
    print("favicon.ico, apple-touch-icon.png, icona-512.png, og/default.jpg")


if __name__ == "__main__":
    main()
