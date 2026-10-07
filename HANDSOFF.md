# HANDSOFF — 2026-10-07 · sessione 0: impianto (ARCHITECTURE, issue #1–#41 = T01–T41, epic #42–#48 = M0–M6)

**Stato**: M0 · fatto: T01, T02 · T03 in PR (`feat/T03-vercel`) · prod: https://diegobassoenniomorricone.vercel.app
**Prossimo**: merge T03 → M1 (T04 token, T05 font) e M2 asset (T08–T13). Utente: Deploy Hook Vercel → secret GitHub `VERCEL_DEPLOY_HOOK`.
**Bloccanti**: T40 (#40) attende dal cliente date, contatti booking/stampa, partner, crediti foto, titolare privacy.
**Decisioni**: Astro 7 statico · Vercel (statico + endpoint `/api/contatti` con Resend) · CSS token/classi `om-` dal DS (no Tailwind) · font self-hosted · IT `/`, EN `/en/` · segnaposto esclusi in produzione · hero = montaggio ~10 s in loop dal sorgente senza i primi 12 s.
**Riferimenti**: DS https://claude.ai/artifact/RoM5dV4WD9VgpbCGJG5nxs · materiali `../MATERIALE GRAFICO` · testi `../DOCS` · `gh issue list -L 100` · numero issue = numero ticket
**Comandi**: `npm run dev|build|check` · `python scripts/foto.py` · `bash scripts/video_hero.sh`
**Note**: nel terminale Bash di Claude `gh` potrebbe non essere nel PATH: usare `"/c/Program Files/GitHub CLI/gh.exe"` o PowerShell.

<!-- Regola: sovrascrivere a fine sessione, max ~15 righe. La storia sta in git e nelle issue. ARCHITECTURE.md si legge solo nelle sezioni citate dal ticket. -->
