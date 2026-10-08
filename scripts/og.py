"""Immagini Open Graph 1200×630 per pagina (ARCHITECTURE.md §10, §12).

Stile Cinemascope: foto nella finestra 2,39:1 (1200×470 nella tela) tra due bande sala-000; logo orizzontale oro
nella banda bassa. Nessun testo oltre al logo, quindi la stessa immagine vale per IT ed EN.
Le foto arrivano da src/assets/foto (via scripts/foto.py), con il punto di ritaglio di foto.json.

Uso: python scripts/og.py
"""
import json
from pathlib import Path

from PIL import Image

RADICE = Path(__file__).resolve().parent.parent
FOTO = RADICE / 'src' / 'assets' / 'foto'
LOGO = RADICE / 'src' / 'assets' / 'logo' / 'logo-oro-orizzontale.png'
USCITA = RADICE / 'public' / 'og'

L, H = 1200, 630
FINESTRA = 470  # finestra 1200×470 (≈2,55:1, appena più larga del 2,39): bande da 80 px, spazio per il logo
BANDA = (H - FINESTRA) // 2
SALA_000 = (5, 4, 4)
LOGO_LARGHEZZA = 360
MARGINE = 48

# Pagina → foto (id in foto.json). "default" serve a Privacy, Cookie, Grazie e 404.
PAGINE = {
    'home': 'orchestra-schermo-03',
    'progetto': 'orchestra-schermo-01',
    'maestro': 'maestro-01',
    'date': 'pubblico-01',
    'promoter': 'luogo-castello-01',
    'contatti': 'saluti-01',
    'default': 'orchestra-schermo-02',
}


def posizione(valore: str) -> tuple[float, float]:
    x, y = (float(v.strip('%')) / 100 for v in valore.split())
    return x, y


def ritaglia(foto: Image.Image, larghezza: int, altezza: int, pos: tuple[float, float]) -> Image.Image:
    """Come object-fit: cover + object-position."""
    scala = max(larghezza / foto.width, altezza / foto.height)
    f = foto.resize((round(foto.width * scala), round(foto.height * scala)), Image.LANCZOS)
    x = round((f.width - larghezza) * pos[0])
    y = round((f.height - altezza) * pos[1])
    return f.crop((x, y, x + larghezza, y + altezza))


def main() -> None:
    voci = {v['id']: v for v in json.loads((RADICE / 'src' / 'content' / 'foto.json').read_text(encoding='utf-8'))}
    logo = Image.open(LOGO).convert('RGBA')
    logo = logo.resize((LOGO_LARGHEZZA, round(logo.height * LOGO_LARGHEZZA / logo.width)), Image.LANCZOS)
    USCITA.mkdir(parents=True, exist_ok=True)

    for pagina, id_foto in PAGINE.items():
        foto = Image.open(FOTO / f'{id_foto}.jpg').convert('RGB')
        pos = posizione(voci[id_foto].get('posizione', '50% 50%'))
        tela = Image.new('RGB', (L, H), SALA_000)
        tela.paste(ritaglia(foto, L, FINESTRA, pos), (0, BANDA))
        tela.paste(logo, (MARGINE, BANDA + FINESTRA + (BANDA - logo.height) // 2), logo)
        tela.save(USCITA / f'{pagina}.jpg', quality=86, optimize=True, progressive=True)
        print(f'og/{pagina}.jpg ← {id_foto}')


if __name__ == '__main__':
    main()
