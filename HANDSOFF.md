# HANDSOFF — 2026-10-08 · sessione 2: M3 completata + revisione dell'utente (PR #59–#77)

**Stato**: M0–M3 completate · campionario su `/` (provvisoria `noindex`) · prod: https://diegobassoenniomorricone.vercel.app
**Revisione fatta**: hover pulsanti oro · Repertorio con temi sotto i film (+ *Maddalena*) · contatti/social/piattaforme solo icone (`LinkIcona`, Simple Icons) · sezione Album con player Spotify al click (T73) · hero a tutto schermo, video intero in HLS adattivo (T75, ARCHITECTURE §7 riscritto).
**In attesa dall'utente**: (1) **master video** dal videomaker (ProRes/alto bitrate, meglio 4K) → `bash scripts/video_hero.sh "/percorso/master.mov" [inizio] [fine]`; (2) **loghi corretti** dal grafico: nei 4 PNG originali la "O" di OMAGGIO è tagliata dritta a sinistra (difetto del file, non nostro) → poi `python scripts/loghi.py`; (3) T40: date, contatti, social, partner, titolare privacy, fotografo.
**Da verificare a mano**: video hero su Safari/iOS (HLS nativo) sulla preview.
**Prossimo**: M4: T25 (config i18n + `it.ts`/`en.ts`; `src/i18n/utils.ts` esiste già), T26 testi IT, T27 EN. Poi M5 (T28 Home: cablare `Testata trasparente`, `Footer`, `Album`, preload `precaricaPoster()`).
**Decisioni**: dati via `prendi()` (segnaposto esclusi solo con `VERCEL_ENV=production`) · menu Testata sotto 1200 px · hero: deroga DS (testo sopra il video), animazione "sipario" 2,39:1 → tutto schermo · sorgente video con SAR errato → `setsar=1` · HLS su Vercel in cartella versionata (`/video/*` immutabile), spostabile su Cloudflare R2 con `PUBLIC_VIDEO_BASE` · `hls.js/light` caricato solo quando parte il video.
**Flusso**: branch → PR (`Closes #n`) → check Vercel → squash merge autonomo. Numero issue = numero ticket (le issue nuove si rititolano `Tnn`).
**Comandi**: `npm run dev|build|check` · test prod `VERCEL_ENV=production npx astro build` · `python scripts/{tokens,loghi,foto}.py` · `bash scripts/video_hero.sh`
**Note**: in Bash `export PATH="/c/Program Files/nodejs:$PATH"` e `"/c/Program Files/GitHub CLI/gh.exe"` · controllare l'exit code della build · dopo modifiche agli schemi riavviare il dev server · verifiche mobile con iframe 375 px · `compressHTML: false` · `Logo.astro` blocca sotto 240/280 px.

<!-- Regola: sovrascrivere a fine sessione, max ~15 righe. La storia sta in git e nelle issue. ARCHITECTURE.md si legge solo nelle sezioni citate dal ticket. -->
