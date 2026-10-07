# HANDSOFF — 2026-10-07 · sessione 0: impianto (ARCHITECTURE, issue #1–#41 = T01–T41, epic #42–#48 = M0–M6)

**Stato**: M0 · fatto: T01 (#1 chiusa) · in corso: —
**Prossimo**: T02 scaffold Astro (#2) → T03 Netlify (#3). In parallelo da T02: T08–T13, T21, T26.
**Bloccanti**: T40 (#40) attende dal cliente date, contatti booking/stampa, partner, crediti foto, titolare privacy.
**Decisioni**: Astro 5 statico · Netlify (+Forms) · CSS token/classi `om-` dal DS (no Tailwind) · font self-hosted · IT `/`, EN `/en/` · segnaposto esclusi in produzione · hero = montaggio ~10 s in loop dal sorgente senza i primi 12 s.
**Riferimenti**: DS https://claude.ai/artifact/RoM5dV4WD9VgpbCGJG5nxs · materiali `../MATERIALE GRAFICO` · testi `../DOCS` · `gh issue list -L 100` · numero issue = numero ticket
**Comandi**: `npm run dev|build|check` · `python scripts/foto.py` · `bash scripts/video_hero.sh`
**Note**: nel terminale Bash di Claude `gh` potrebbe non essere nel PATH: usare `"/c/Program Files/GitHub CLI/gh.exe"` o PowerShell.

<!-- Regola: sovrascrivere a fine sessione, max ~15 righe. La storia sta in git e nelle issue. ARCHITECTURE.md si legge solo nelle sezioni citate dal ticket. -->
