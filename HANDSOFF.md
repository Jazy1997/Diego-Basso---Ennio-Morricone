# HANDSOFF — 2026-10-07 · sessione 0: impianto (ARCHITECTURE, issue #1–#41 = T01–T41, epic #42–#48 = M0–M6)

**Stato**: M2 completata (T09–T10, T13 in PR) · prod: https://diegobassoenniomorricone.vercel.app
**Prossimo**: M3 componenti: T14 Pulsante+Etichetta, T21 content collections (usare `src/content/foto.json`), T16 Cinemascope → T17 HeroVideo → T15 Testata. Workflow rebuild: serve `gh auth refresh -s workflow`.
**Bloccanti**: T40 (#40) attende dal cliente date, contatti booking/stampa, partner, crediti foto, titolare privacy.
**Decisioni**: Astro 7 statico · Vercel (statico + endpoint `/api/contatti` con Resend) · CSS token/classi `om-` dal DS (no Tailwind) · font self-hosted · IT `/`, EN `/en/` · segnaposto esclusi in produzione · hero = montaggio ~10 s in loop dal sorgente senza i primi 12 s.
**Riferimenti**: DS https://claude.ai/artifact/RoM5dV4WD9VgpbCGJG5nxs · materiali `../MATERIALE GRAFICO` · testi `../DOCS` · `gh issue list -L 100` · numero issue = numero ticket
**Comandi**: `npm run dev|build|check` · `python scripts/foto.py` · `bash scripts/video_hero.sh` · `python scripts/loghi.py` · `python scripts/tokens.py` · `bash scripts/video_hero.sh` (caldo, approvato)
**Note**: nel terminale Bash di Claude `gh` potrebbe non essere nel PATH: usare `"/c/Program Files/GitHub CLI/gh.exe"` o PowerShell. · `compressHTML: false` (Astro 7 mangiava gli spazi tra testo e tag) · `tokens.py` genera anche `tipografia.css`.

<!-- Regola: sovrascrivere a fine sessione, max ~15 righe. La storia sta in git e nelle issue. ARCHITECTURE.md si legge solo nelle sezioni citate dal ticket. -->
