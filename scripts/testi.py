"""Testi lunghi IT dal docx (ARCHITECTURE.md §9, §11): una sezione Heading 1 = un file in src/content/testi/it/.

Il testo resta alla lettera; cambia solo la resa dei titoli (DS › Tono): film, album e il titolo dello
spettacolo passano da “…” al corsivo, i temi e i brani restano tra “ ”. Il grassetto del docx resta grassetto.

Uso: python scripts/testi.py
"""
import re
from pathlib import Path

import docx

RADICE = Path(__file__).resolve().parent.parent
DOCX = RADICE.parent / 'DOCS' / 'TESTI PRESENTAZIONE.docx'
USCITA = RADICE / 'src' / 'content' / 'testi' / 'it'

# Titolo del docx (maiuscolo) → file e titolo in maiuscole/minuscole normali.
SEZIONI = {
    'IL PROGETTO': ('progetto', 'Il progetto'),
    'UN VIAGGIO NELLA MUSICA PER IL CINEMA': ('viaggio', 'Un viaggio nella musica per il cinema'),
    'LA VISIONE DEL MAESTRO DIEGO BASSO': ('visione', 'La visione del Maestro Diego Basso'),
    'UN CONCERTO CHE DIVENTA RACCONTO': ('racconto', 'Un concerto che diventa racconto'),
    'OLTRE VENT’ANNI DI STORIA': ('storia', 'Oltre vent’anni di storia'),
    'FORMAZIONE ARTISTICA': ('formazione', 'Formazione artistica'),
    'L’ESPERIENZA PER IL PUBBLICO': ('esperienza', 'L’esperienza per il pubblico'),
}

# Temi e brani: restano tra virgolette. Ogni altro “…” è un film, un album o lo spettacolo → corsivo.
BRANI = {'Gabriel’s Oboe', 'L’estasi dell’oro', 'Chi Mai', 'Playing Love', 'Lost Boys Calling'}


def paragrafo(p) -> str:
    testo = ''.join(f'**{r.text}**' if r.bold and r.text.strip() else r.text for r in p.runs)
    testo = testo.replace('****', '')
    return re.sub(r'“([^”]+)”', lambda m: m.group(0) if m.group(1) in BRANI else f'*{m.group(1)}*', testo)


def main() -> None:
    documento = docx.Document(str(DOCX))
    sezioni: list[tuple[str, list[str]]] = []
    for p in documento.paragraphs:
        if p.style.name == 'Heading 1':
            sezioni.append((p.text.strip(), []))
        elif sezioni and p.text.strip():
            sezioni[-1][1].append(paragrafo(p))

    # Dopo l'ultima sezione il docx chiude con titolo e frase finale (DS › Tono › Chiusura): non sono testo lungo.
    nomi = [n for n, _ in sezioni]
    assert set(nomi) == set(SEZIONI), f'sezioni del docx cambiate: {nomi}'
    ultima = sezioni[-1][1]
    while ultima and ultima[-1].strip('*').startswith(('OMAGGIO A ENNIO MORRICONE', 'Un viaggio nella memoria')):
        ultima.pop()

    USCITA.mkdir(parents=True, exist_ok=True)
    for ordine, (nome, paragrafi) in enumerate(sezioni, 1):
        file, titolo = SEZIONI[nome]
        corpo = '\n\n'.join(paragrafi)
        testa = f'---\ntitolo: "{titolo}"\nordine: {ordine}\nlang: it\n---\n\n'
        (USCITA / f'{file}.md').write_text(testa + corpo + '\n', encoding='utf-8', newline='\n')
        print(f'{file}.md  {len(paragrafi)} paragrafi')


if __name__ == '__main__':
    main()
