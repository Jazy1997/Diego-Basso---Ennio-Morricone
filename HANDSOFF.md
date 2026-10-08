# HANDSOFF — 2026-10-08 · sessione 1: M0–M2 completate (setup, fondamenta, asset) + grafo graphify

**Stato**: M0–M2 completate (T01–T13 chiuse) · rebuild notturno attivo (02:00 UTC) · prod: https://diegobassoenniomorricone.vercel.app (pagina provvisoria `noindex`)
**Prossimo**: M3 componenti: T14 Pulsante+Etichetta, T21 content collections (riusare `src/content/foto.json`), T16 Cinemascope → T17 HeroVideo (`public/video/hero-*.mp4`, poster `src/assets/video/hero-poster.jpg`) → T15 Testata (+ verifica visiva mobile, non ancora fatta).
**Bloccanti**: T40 (#40) attende date, contatti booking/stampa, partner, titolare privacy, fotografo delle 5 foto `creditoDaConfermare`.
**Decisioni**: Astro 7 statico + adapter Vercel (solo `/api/contatti` serverless, Resend) · CSS token/classi `om-` dal DS (no Tailwind) · font self-hosted · IT `/`, EN `/en/` · segnaposto esclusi in prod · hero = loop 9,5 s variante "caldo" (approvata) · foto ritagliate 8% in basso (firma con logo ricolorato) · grana = `.om-grana` del DS.
**Flusso**: branch `feat/Txx-…` → PR (`Closes #n`) → attesa check Vercel → squash merge. Numero issue = numero ticket.
**Riferimenti**: DS https://claude.ai/artifact/RoM5dV4WD9VgpbCGJG5nxs · materiali `../MATERIALE GRAFICO` · testi `../DOCS` · grafo `graphify-out/` (locale, ignorato da git)
**Comandi**: `npm run dev|build|check` · `python scripts/tokens.py` · `python scripts/loghi.py` · `python scripts/foto.py` · `bash scripts/video_hero.sh`
**Note**: in Bash usare `"/c/Program Files/GitHub CLI/gh.exe"` · `compressHTML: false` (Astro 7 mangiava gli spazi tra testo e tag) · `Logo.astro` blocca la build sotto 240/280 px · `maestro-04` e `luogo-aperto-01` solo 2048 px.

<!-- Regola: sovrascrivere a fine sessione, max ~15 righe. La storia sta in git e nelle issue. ARCHITECTURE.md si legge solo nelle sezioni citate dal ticket. -->
