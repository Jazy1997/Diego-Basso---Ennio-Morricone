# HANDSOFF — 2026-10-09 · sessione 5: revisione UX/UI "La pellicola in sala" in anteprima (PR #102, NON unire senza ok)

**Stato**: produzione invariata (`main`). Redesign sul branch `redesign/motion`, PR bozza #102, anteprima Vercel https://diegobassoenniomorricone-git-bc523c-giacomos-projects-3426766d.vercel.app · stato precedente nel tag `pre-redesign-2026-10-09`.
**Se l'utente approva**: squash merge di #102. **Se rifiuta**: chiudere la PR e cancellare il branch (`main` è già lo stato precedente); per riportare un branch al punto esatto: `git checkout -B <branch> pre-redesign-2026-10-09`.
**Redesign**: identità nuova (logo invariato) in `src/styles/tema.css` (sovrascrive i token di `ds/`, che non si toccano) · font Archivo (wdth 62–125) + Bodoni Moda corsivo + JetBrains Mono (`scripts/fonts.mjs`) · regia in `src/scripts/regia.ts` (Lenis + GSAP ScrollTrigger/SplitText; attributi `data-righe|illumina|sipario|parallasse|conta|accendi|reveal`) · hero in `HeroVideo.astro` + `hero-regia.ts` (ouverture 3‑2‑1 una volta per sessione, video che si richiude in 2,39:1, `refreshPriority: 1` sul pin) · `Pellicola.astro` (avanzamento) · View Transitions cross-document in `tema.css` · "Fine" nel footer.
**Regole nuove**: niente occhielli sopra i titoli (TestaPagina/Sezione li ignorano) · `.regia-attiva` decisa nel `<head>` (reduced-motion → tutto statico) · JS iniziale ~53 KB gzip (budget alzato dall'utente).
**Direzione e contesto**: `PRODUCT.md`, `.impeccable/surfaces/src-components-pagine-home-astro.md` (contratto), `design/reference/SINTESI.md` (reference). Manca DESIGN.md (da scrivere con l'agente documenter dopo l'ok).
**Ancora aperti**: T33 (email), T40 (dati in `DATI-DA-FORNIRE.md`), T41 (go-live) · Lighthouse da rifare sul redesign · ARCHITECTURE.md §6–§8 descrive ancora la vecchia home.
**Flusso**: branch → PR (`Closes #n`) → check Vercel → squash merge autonomo (ma #102 solo dopo l'ok esplicito dell'utente).
**Comandi**: `npm run dev|build|check` · `npx astro dev --background` · `VERCEL_ENV=production npx astro build && python scripts/verifica_en.py` · `python scripts/{foto,testi,og,loghi}.py`.
**Note**: in Bash `export PATH="/c/Program Files/nodejs:$PATH"` e `"/c/Program Files/GitHub CLI/gh.exe"` · non lanciare Prettier su file interi · GSAP: con transform già in CSS usare `fromTo` con `y: 0` · catture di lavoro in `.impeccable/review/` e `design/reference/*.jpeg` (ignorate da git).

<!-- Regola: sovrascrivere a fine sessione, max ~15 righe. La storia sta in git e nelle issue. ARCHITECTURE.md si legge solo nelle sezioni citate dal ticket. -->
