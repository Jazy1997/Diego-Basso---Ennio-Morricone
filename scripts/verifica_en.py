"""Verifica delle pagine EN sulla build (T35, ARCHITECTURE.md §5, §11).

- ogni pagina IT ha la sua EN (e viceversa), secondo routes in src/i18n/utils.ts
- hreflang it/en/x-default presenti e reciproci, <html lang> corretto
- nessuna parola italiana nel testo visibile delle pagine EN, esclusi gli elementi marcati lang="it"
  (titolo dello spettacolo, titoli dei film) e i nomi propri

Si verifica la build di produzione (i dati segnaposto, in italiano, sono esclusi):
Uso: VERCEL_ENV=production npx astro build && python scripts/verifica_en.py
"""
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

RADICE = Path(__file__).resolve().parent.parent
STATICO = RADICE / '.vercel' / 'output' / 'static'
UTILS = (RADICE / 'src' / 'i18n' / 'utils.ts').read_text(encoding='utf-8')

ROUTES = {k: (it, en) for k, it, en in re.findall(r"(\w+): \{ it: '([^']*)', en: '([^']*)' \}", UTILS)}

# Parole italiane frequenti che non compaiono nei testi inglesi (né nei nomi propri del sito).
ITALIANO = {
    'il', 'lo', 'la', 'gli', 'le', 'della', 'delle', 'degli', 'dello', 'del', 'nel', 'nella', 'con', 'per',
    'che', 'una', 'uno', 'sono', 'questo', 'questa', 'anche', 'tutti', 'tutte', 'biglietti', 'prossime',
    'contatti', 'progetto', 'scopri', 'ascolta', 'seguici', 'scrivici', 'informativa', 'pagina',
    'invia', 'messaggio', 'nome', 'motivo', 'stampa', 'pubblico', 'elementi', 'direttore', 'arrivo',
    'nuove', 'versioni', 'scheda', 'tecnica', 'palco', 'leggii', 'sedute', 'segnaposto', 'chiudi',
}
# Nomi propri e titoli che restano in italiano anche nel testo inglese.
AMMESSI = re.compile(
    r"Omaggio a Ennio Morricone|Orchestra Ritmico Sinfonica Italiana|Coro lirico Opera House|"
    r"Coro pop Art Voice Academy|Teatro (Malibran|Mario Del Monaco|Verdi|Comunale Mario Del Monaco)|"
    r"Ponte di Bassano|Spiaggia del Faro|Bassano del Grappa|Concerto di Natale|Chi Mai|"
    r"Giù la testa|Sacco e Vanzetti|Nuovo Cinema Paradiso|Per un pugno di dollari"
)


class Testo(HTMLParser):
    """Testo visibile, saltando script/style/svg e i sottoalberi con lang="it"."""

    VUOTI = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'}

    def __init__(self):
        super().__init__()
        self.pila: list[bool] = []  # True = escluso
        self.pezzi: list[str] = []

    def handle_starttag(self, tag, attrs):
        if tag in self.VUOTI:
            return
        a = dict(attrs)
        escluso = (self.pila[-1] if self.pila else False) or tag in ('script', 'style', 'svg', 'head') or (
            a.get('lang') == 'it' and tag != 'html'
        ) or a.get('aria-hidden') == 'true' and tag == 'span'
        self.pila.append(escluso)

    def handle_endtag(self, tag):
        if tag not in self.VUOTI and self.pila:
            self.pila.pop()

    def handle_data(self, data):
        if not (self.pila and self.pila[-1]) and data.strip():
            self.pezzi.append(data.strip())


def pagina(percorso: str) -> Path:
    return STATICO / percorso.strip('/') / 'index.html' if percorso.strip('/') else STATICO / 'index.html'


def main() -> int:
    problemi: list[str] = []
    for chiave, (it, en) in ROUTES.items():
        url_it = f'/{it}/' if it else '/'
        url_en = f'/en/{en}/' if en else '/en/'
        f_it, f_en = pagina(url_it), pagina(url_en)
        for f, url in ((f_it, url_it), (f_en, url_en)):
            if not f.exists():
                problemi.append(f'{chiave}: manca {url}')
        if not (f_it.exists() and f_en.exists()):
            continue
        for f, lang in ((f_it, 'it'), (f_en, 'en')):
            html = f.read_text(encoding='utf-8')
            if f'<html lang="{lang}"' not in html:
                problemi.append(f'{f.relative_to(STATICO)}: <html lang> diverso da {lang}')
            for hl, url in (('it', url_it), ('en', url_en), ('x-default', url_it)):
                if not re.search(rf'hreflang="{hl}" href="[^"]*{re.escape(url)}"', html):
                    problemi.append(f'{f.relative_to(STATICO)}: hreflang {hl} → {url} mancante')
        parser = Testo()
        parser.feed(f_en.read_text(encoding='utf-8'))
        testo = AMMESSI.sub(' ', ' '.join(parser.pezzi))
        trovate = sorted({p for p in re.findall(r"[A-Za-zÀ-ÿ’']+", testo) if p.lower() in ITALIANO})
        if trovate:
            problemi.append(f'{url_en}: parole italiane {trovate}')

    print('\n'.join(problemi) if problemi else f'OK: {len(ROUTES)} pagine IT/EN, hreflang e testi EN puliti')
    return 1 if problemi else 0


if __name__ == '__main__':
    sys.exit(main())
