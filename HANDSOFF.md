# HANDSOFF — 2026-10-08 · sessione 2: M3 completata (componenti T14–T24, PR #59–#69)

**Stato**: M0–M3 completate · componenti in `src/components/` · campionario su `/` (provvisoria `noindex`) · prod: https://diegobassoenniomorricone.vercel.app
**Prossimo**: M4: T25 (config i18n Astro + `it.ts`/`en.ts`; `src/i18n/utils.ts` con `routes`/`localizedPath`/`alternate` esiste già), T26 testi IT dal docx (la collezione `testi` è vuota), T27 EN. Poi M5 (T28 Home: cablare `Testata trasparente` + `Footer` negli slot di BaseLayout e la preload di `precaricaPoster()`).
**Da verificare a mano**: riproduzione/pausa del video hero sulla preview (nel Chrome automatizzato la finestra è `hidden`, quindi i media non partono).
**Bloccanti**: T40 (#40): date reali, contatti, social, loghi partner, titolare privacy, fotografo delle 5 foto `creditoDaConfermare`.
**Decisioni M3**: dati via `prendi()` (`src/lib/contenuti.ts`), che esclude `segnaposto: true` solo con `VERCEL_ENV=production` · foto per id con `src/lib/foto.ts` · date/coordinate con `src/i18n/date.ts` (Europe/Rome) · menu Testata chiuso **sotto 1200 px** (DS: 1080; la barra intera misura ~1190 px) · pannello mobile = `<dialog>` modale · trailer `Vj3FlYADbdM`, facciata nocookie · icone `lucide-static` via `Icona.astro` (nessuna icona brand: social come parole).
**Flusso**: branch `feat/Txx-…` → PR (`Closes #n`) → check Vercel → squash merge autonomo. Numero issue = numero ticket.
**Riferimenti**: DS https://claude.ai/artifact/RoM5dV4WD9VgpbCGJG5nxs · materiali `../MATERIALE GRAFICO` · testi `../DOCS` · grafo `graphify-out/` (locale)
**Comandi**: `npm run dev|build|check` · test prod: `VERCEL_ENV=production npx astro build` · `python scripts/{tokens,loghi,foto}.py` · `bash scripts/video_hero.sh`
**Note**: in Bash anteporre `export PATH="/c/Program Files/nodejs:$PATH"` e usare `"/c/Program Files/GitHub CLI/gh.exe"` · controllare l'exit code della build (un errore di file bloccato su Windows è capitato una volta) · verifiche mobile con iframe da 360/375 px (la finestra Chrome non si ridimensiona) · `compressHTML: false` · `Logo.astro` blocca sotto 240/280 px.

<!-- Regola: sovrascrivere a fine sessione, max ~15 righe. La storia sta in git e nelle issue. ARCHITECTURE.md si legge solo nelle sezioni citate dal ticket. -->
