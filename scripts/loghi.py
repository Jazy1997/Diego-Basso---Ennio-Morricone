"""Favicon, icone e OG provvisoria dal logo (ARCHITECTURE.md §10).

Il logo arriva da "Logo Morricone.svg": prima `node scripts/loghi-svg.mjs` (SVG per il sito + master PNG
1600 px in src/assets/logo), poi questo script, che parte dal master verticale oro.

- public/favicon.ico (16/32/48), public/apple-touch-icon.png (180), public/icona-512.png
  logo verticale oro su sala-100 con area di rispetto 0,5 H (eccezione ammessa dal DS per favicon e profilo)
- public/og/default.jpg 1200×630 provvisoria (logo su sala-100); quelle con foto arrivano in T36

Uso: python scripts/loghi.py
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ASSET = ROOT / "src" / "assets" / "logo"
PUBLIC = ROOT / "public"
SALA_100 = (11, 10, 8)

H_VERTICALE = 0.12  # H ≈ 12% della larghezza del logo verticale (DS › Logo)


def su_sala(logo, lato_w, lato_h, larghezza_logo):
    tela = Image.new("RGB", (lato_w, lato_h), SALA_100)
    l = logo.copy()
    l.thumbnail((larghezza_logo, lato_h), Image.LANCZOS)
    tela.paste(l, ((lato_w - l.width) // 2, (lato_h - l.height) // 2), l)
    return tela


def main():
    (PUBLIC / "og").mkdir(parents=True, exist_ok=True)
    vert = Image.open(ASSET / "logo-oro-verticale.png").convert("RGBA")
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
