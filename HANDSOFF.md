# HANDSOFF — 2026-10-08 · sessione 3: M4 completata, loghi SVG, M5 avviata (T28 Home)

**Stato**: M0–M4 completate · Home vera su `/` e `/en/` (ancora `noindex`) · prod: https://diegobassoenniomorricone.vercel.app
**Fatto in sessione**: T25 dizionario UI `t(lang)` in `src/i18n/{it,en}.ts` · T26 `scripts/testi.py` docx → `content/testi/it/` · T27 `content/testi/en/` · loghi da `Logo Morricone.svg` (`node scripts/loghi-svg.mjs && python scripts/loghi.py`, `Logo` usa gli SVG: la "O" tagliata era il WebP ricampionato, non il file) · T28 Home: `components/pagine/Home.astro` (+ `Sezione`, `lib/testi.ts`), file sottili `pages/index.astro` e `pages/en/index.astro`; il campionario è stato rimosso (resta in git).
**Da far approvare all'utente**: testi EN medio/lunghi (madrelingua) · testi nuovi della Home in `t(lang).home` (sezione Promoter: titolo e 3 argomenti) · docx vs DS su *Il buono, il brutto e il cattivo* / “Chi Mai” (tenuto il docx).
**In attesa dall'utente**: master video (`bash scripts/video_hero.sh …`) · T40 dati reali · zip press kit in `public/presskit/` (il pulsante oro compare da solo).
**Prossimo**: M5: T29 Il progetto, T30 Il Maestro, T31 Date, T32 Promoter, T33 Contatti (+ Resend, azione utente), T34 Privacy/Cookie/404, T35 verifica EN. Schema: componente in `src/components/pagine/` con prop `lang` + due file sottili IT/EN.
**Decisioni**: dati via `prendi()` (segnaposto esclusi con `VERCEL_ENV=production`) · menu Testata sotto 1200 px · hero: deroga DS (testo sopra il video) · titoli film EN nell'edizione inglese, `Repertorio` resta coi titoli originali · oro del logo = `#e7ad54`.
**Flusso**: branch → PR (`Closes #n`) → check Vercel → squash merge autonomo. Numero issue = numero ticket.
**Comandi**: `npm run dev|build|check` · test prod `VERCEL_ENV=production npx astro build` · `python scripts/{tokens,foto,testi}.py` · `bash scripts/video_hero.sh`
**Note**: in Bash `export PATH="/c/Program Files/nodejs:$PATH"` e `"/c/Program Files/GitHub CLI/gh.exe"` · niente `\b` dentro heredoc Python (diventa backspace) · stili per classi passate a `Sezione` → `:global(...)` · lo scroll del sito è smooth: negli screenshot usare `behavior: 'instant'` · verifiche mobile con iframe 360/768 px · `compressHTML: false`.

<!-- Regola: sovrascrivere a fine sessione, max ~15 righe. La storia sta in git e nelle issue. ARCHITECTURE.md si legge solo nelle sezioni citate dal ticket. -->
