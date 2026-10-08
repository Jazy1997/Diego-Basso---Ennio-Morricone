# ARCHITECTURE — Sito "Omaggio a Ennio Morricone"

> Documento di riferimento tecnico e funzionale. Si legge **per sezioni**: ogni ticket indica quali.
> In caso di conflitto vince il **Design System** (DS): https://claude.ai/artifact/RoM5dV4WD9VgpbCGJG5nxs

---

## 1. Obiettivo e pubblico

Sito promozionale del progetto *Omaggio a Ennio Morricone*, ideato nel 2004 dal Maestro Diego Basso: Orchestra Ritmico Sinfonica Italiana (46 elementi), Claudia Sasso soprano lirico, proiezioni sul grande schermo.

| Pubblico | Cosa cerca | Azione chiave |
| --- | --- | --- |
| Spettatori | Emozione, prossime date, biglietti, ascolto | Click "Biglietti", streaming album |
| Promoter, teatri, festival | Organico, storia, versioni, scheda tecnica, materiali | Download press kit, contatto booking |
| Stampa | Testi, foto HD, contatti | Download press kit, contatto stampa |

**KPI**: click in uscita verso le biglietterie · download press kit · invii del modulo booking · click streaming.

**Tono**: raccontiamo, non vendiamo; nessun punto esclamativo, nessun superlativo vuoto (DS › Tono di voce).

---

## 2. Fonti di verità

| Fonte | Percorso | Cosa contiene |
| --- | --- | --- |
| Design System | link sopra — `project/README.md`, `tokens.json`, `sezioni/*.md`, `components/*/README.md`, `components/bundle.css` | Token, componenti `om-…`, mappa del sito, regole tecniche |
| Testi | `../DOCS/TESTI PRESENTAZIONE.docx` | Testi lunghi IT, **da usare alla lettera** |
| Link | `../DOCS/DOCS.txt` | Spotify, Apple Music, Tidal, playlist YouTube, Database teatri (interno, **non** pubblicare) |
| Scheda tecnica | `../DOCS/STAGE PLOT - ENNIO MORRICONE.pdf` | Palco, organico, esigenze tecniche |
| Foto | `../MATERIALE GRAFICO/FOTO/` | 50 JPG originali (fino a 31 MB): **mai nel repo** |
| Video | `../MATERIALE GRAFICO/VIDEO/VIDEO HERO.mp4` | 104,3 s, 1920×1080, 25 fps, H.264 + AAC |
| Logo | `../MATERIALE GRAFICO/LOGO/Logo Morricone.svg` | Vettoriale con le 4 versioni (oro/bianco × verticale/orizzontale) su una tavola; i PNG `Logo Morricone-01…04.png` restano come riferimento |

Sezioni DS più usate: `05-segno` (Cinemascope, coordinate, grana, icone), `06-immagini`, `07-tono` (testi approvati IT/EN, nomi), `08-formati` § Sito, `02-logo`.

---

## 3. Stack

| Ambito | Scelta | Perché |
| --- | --- | --- |
| Framework | **Astro 7**, output statico, TypeScript `strict` | HTML puro, zero JS di default, i18n nativo, ottimizzazione immagini |
| Stili | CSS puro + custom properties | Token e classi `om-` del DS sono già CSS; niente Tailwind |
| Immagini | `astro:assets` (`<Picture>`, sharp) → AVIF + WebP + fallback JPG | Formati e misure generati in build |
| Font | `@fontsource-variable/nunito-sans`, `@fontsource-variable/source-sans-3`, `@fontsource/cormorant-garamond` (500, 500 italic, 600 italic) | Self-hosted: niente Google Fonts remoto (GDPR) |
| Sitemap | `@astrojs/sitemap` con i18n | SEO |
| Icone | `lucide-static` (SVG inline, tratto 1,5) | Regola DS |
| Qualità | Prettier + `prettier-plugin-astro`, `astro check` | Coerenza |
| Hosting | **Vercel**: deploy da `main`, preview per ogni PR; adapter `@astrojs/vercel` solo per l'endpoint del modulo (`/api/contatti`, `prerender = false`); tutto il resto statico | Gratis (Hobby), HTTPS, preview automatiche |
| Email modulo | **Resend** (API, piano gratuito) chiamato dall'endpoint; chiave in variabile d'ambiente Vercel `RESEND_API_KEY` | Nessun servizio form di terze parti nel browser |
| Media | Python 3.12 (Pillow) + ffmpeg 9 in `scripts/` | Pipeline foto/video riproducibile |

Node 24 LTS. Nessun framework UI client (React/Vue): il poco JS è in `<script>` di Astro (vanilla, moduli).

---

## 4. Struttura cartelle

```
WEBSITE/
├─ ARCHITECTURE.md · HANDSOFF.md · CLAUDE.md · README.md
├─ astro.config.mjs · vercel.json · tsconfig.json · package.json
├─ scripts/
│  ├─ foto.py            # originali selezionati → src/assets/foto (3200 px, q85)
│  ├─ loghi-svg.mjs      # SVG del logo → 4 SVG ritagliati + master PNG 1600 px
│  ├─ loghi.py           # master PNG → favicon, icone, OG provvisoria
│  ├─ testi.py           # docx → content/testi/it/*.md (alla lettera, titoli film in corsivo)
│  ├─ video_analisi.sh   # scene detection + contact sheet (output in scripts/out/, ignorato)
│  └─ video_hero.sh      # montaggio 10 s, export MP4/WebM, poster
├─ public/
│  ├─ video/             # hero-1920.mp4, hero-1280.mp4, hero.webm
│  ├─ favicon.svg/.ico, apple-touch-icon.png, og/*.jpg
│  └─ presskit/          # zip press kit (quando disponibile)
└─ src/
   ├─ assets/
   │  ├─ foto/           # JPG ottimizzati con nomi semantici
   │  ├─ logo/           # logo-{oro,bianco}-{verticale,orizzontale}.svg (+ master .png)
   │  ├─ video/          # hero-poster.jpg (per <Picture>)
      ├─ components/        # vedi §8
   ├─ layouts/BaseLayout.astro
   ├─ content/           # vedi §9
   ├─ content.config.ts  # schemi Zod
   ├─ i18n/{it,en}.ts · i18n/utils.ts
   ├─ pages/             # vedi §5
   └─ styles/
      ├─ ds/tokens.css   # da tokens.json del DS
      ├─ ds/bundle.css   # copia di components/bundle.css del DS (non modificare: override in global.css)
      └─ global.css      # reset, base, layout, utility
```

Non si committano: originali foto/video, `scripts/out/`, `dist/`, `node_modules/`, `.vercel/`.

---

## 5. Mappa e routing

Lingua predefinita **italiano** alla radice, **inglese** su `/en/`. Configurazione Astro i18n: `defaultLocale: 'it'`, `locales: ['it','en']`, `prefixDefaultLocale: false`.

| Pagina | IT | EN | Contenuto |
| --- | --- | --- | --- |
| Home | `/` | `/en/` | §6 |
| Il progetto | `/il-progetto/` | `/en/the-project/` | Testi lunghi: Il progetto · Un viaggio nella musica per il cinema · Un concerto che diventa racconto · L'esperienza per il pubblico; Repertorio; foto 2,39:1 tra le sezioni |
| Il Maestro | `/il-maestro/` | `/en/the-maestro/` | La visione del Maestro Diego Basso; ritratto; collaborazioni; Formazione (`Crediti`) |
| Date | `/date/` | `/en/dates/` | Prossime date (`DataTour`), Archivio, stato vuoto |
| Promoter e venue | `/promoter-e-venue/` | `/en/promoters-and-venues/` | Oltre vent'anni di storia (luoghi + coordinate) · Versioni (con proiezioni / in concerto) · Scheda tecnica · Press kit · Contatto booking |
| Contatti | `/contatti/` | `/en/contacts/` | Schede Booking/Stampa/Pubblico, modulo |
| Privacy | `/privacy/` | `/en/privacy/` | Informativa |
| Cookie | `/cookie/` | `/en/cookies/` | Solo tecnici |
| 404 | `/404` | — | Bilingue, link a Home |

- Slug tradotti in `src/i18n/utils.ts` (`routes = { progetto: { it: 'il-progetto', en: 'the-project' }, … }`) + helper `localizedPath(key, lang)` e `alternate(path)` per il selettore lingua e gli `hreflang`.
- Le pagine stanno in `src/pages/` (IT) e `src/pages/en/` (EN) come file sottili che importano un componente-pagina condiviso (`src/components/pagine/Progetto.astro` con prop `lang`): **una sola implementazione per pagina**.
- Menu (max 6 voci, DS › Testata): Il progetto · Il Maestro · Date · Promoter e venue · Contatti. Pulsante oro "Biglietti" → `/date/`.

---

## 6. Home, sezione per sezione

Spazio tra sezioni `spazio-24` (desktop) / `spazio-16` (mobile); margini `margine-web`; testo max `colonna-testo`. Ogni sezione compare con `Reveal` (dissolvenza 600 ms + salita 12 px, una volta; niente parallasse).

| # | Sezione | Componente | Contenuto | Mobile |
| --- | --- | --- | --- | --- |
| 1 | Testata | `Testata` | Logo orizzontale oro 280 px, menu, IT/EN, "Biglietti". Trasparente sopra l'hero, `sala-100` + filetto `linea` dopo lo scorrimento | < 1080 px: pulsante "Menu" → pannello a tutto schermo, voci `titolo-m` |
| 2 | Hero | `HeroVideo` | Finestra Cinemascope a tutta larghezza, video muto in loop (§7). Banda alta: occhiello "DIEGO BASSO DIRIGE". Banda bassa: logo **verticale oro** (≥ 240 px) + sottotitolo *Musica e cinema in un unico grande spettacolo* (`evocativo`) + pulsante oro "Prossime date" | Bande più alte, logo 240 px, pulsante a tutta larghezza |
| 3 | Prossime date | `ListaDate` (3 `DataTour`) | Prime 3 date future + link "Tutte le date". Nessuna data: "Nuove date in arrivo" + link contatti | Righe impilate |
| 4 | Il progetto | `Sezione` + `Cinemascope` | Occhiello "IL PROGETTO", `lead` = sottotitolo, testo medio (DS › Tono), foto orchestra+schermo 2,39:1, link "Scopri il progetto" | — |
| 5 | Il repertorio | `Repertorio` | Titoli dei film in `evocativo`, colonna centrata come titoli di coda; temi in `citazione` | Una colonna |
| 6 | Il Maestro | `Sezione` | Ritratto verticale Diego Basso + estratto "La visione del Maestro" + link | Foto sopra, testo sotto |
| 7 | Formazione | `Crediti` | Direttore — Diego Basso · Soprano — Claudia Sasso · 46 elementi — Orchestra Ritmico Sinfonica Italiana | Voci impilate |
| 8 | Video | `VideoTrailer` | Trailer 16:9, play rotondo, facade youtube-nocookie | — |
| 9 | Ascolta l'album | `Streaming` | "Omaggio a Ennio Morricone" — Spotify · Apple Music · Tidal (`om-pulsante--contorno`, nuova scheda) | Pulsanti a tutta larghezza |
| 10 | Promoter e venue | `Sezione` | 3 argomenti (organico 46 elementi · oltre vent'anni di storia · due versioni), "Scarica il press kit" (oro), contatto booking | — |
| 11 | Piè di pagina | `Footer` | Schede Booking/Stampa/Pubblico, social, `FasciaPartner`, crediti fotografici, Privacy/Cookie, © | Impilato |

Un solo pulsante oro per schermata (DS › Pulsante): in Hero "Prossime date"; in Testata il "Biglietti" è `piccolo` e sta fuori dalla stessa schermata dell'hero grazie al contrasto di scala (accettato dal DS, che lo prevede in Testata).

---

## 7. Hero video

> **Revisione (ottobre 2026, decisione dell'utente):** hero a tutto schermo su desktop e mobile, con testata, logo e testi **sopra** il video (deroga al DS, che vuole il testo solo nelle bande). Si usa tutto il video, non più un montaggio di 10 s.

### 7.1 Pipeline (`scripts/video_hero.sh`)
1. **Taglio**: da 13,0 s (prima inquadratura dopo l'intro) a 99,5 s (prima della dissolvenza al nero) → loop di ~86 s.
2. **Loop senza stacco**: gli ultimi 0,7 s dissolvono nei primi (`xfade`).
3. **Pixel quadrati**: il sorgente dichiara SAR 540:409 (2,35:1) ma il contenuto è 16:9 → `setsar=1`, altrimenti i browser allargano l'immagine del 32%.
4. **Colore** "caldo" approvato (T12): `selectivecolor` su ciano/blu, saturazione -15%.
5. **Streaming adattivo HLS** (H.264 High, fMP4, segmenti 4 s, GOP 4 s): 480p (≤1,5 Mbit/s), 720p (≤3,5), 1080p (≤6), 2160p se il sorgente è 4K. CRF 20–22 con tetto `maxrate`.
6. **Uscita** in `public/video/hero-AAAAMMGG-HHMM/` (cartella nuova a ogni esecuzione, perché `/video/*` ha cache immutabile); il nome va in `src/assets/video/hero.json`. Poster = primo fotogramma in `src/assets/video/hero-poster.jpg`.
7. **Qualità**: il sorgente attuale è un export web a 1,5 Mbit/s. Per un risultato impeccabile serve il **master** del videomaker (ProRes o H.264/H.265 ad alto bitrate, meglio 4K): `bash scripts/video_hero.sh "/percorso/master.mov" [inizio] [fine]`.

### 7.2 Componente `HeroVideo`
- `section.hero` alta `max(100svh, 520px)`; poster (`<Picture>`, LCP precaricato con `precaricaPoster()`) e `<video muted loop playsinline preload="none">` a tutto schermo con `object-fit: cover`; grana; due veli sfumati (in alto per la testata trasparente, in basso per i testi).
- In basso a sinistra: occhiello "DIEGO BASSO DIRIGE", logo verticale oro (`h1`, 240–360 px), sottotitolo, pulsante oro "Prossime date". Pausa/play in basso a destra (su mobile in alto a destra).
- **Animazione firma**: all'apertura il video è una finestra 2,39:1 al centro (`clip-path: inset(max(0px, calc(50% - 20.92vw)) 0)`) che in 0,8 s si apre a tutto schermo; poi compaiono i testi. Sugli schermi più larghi di 2,39:1 l'effetto è nullo.
- `prefers-reduced-motion` **o** Save-Data: niente animazione, niente video (resta il poster). Uno script inline decide prima del primo disegno (`data-anima`).
- `src/scripts/hero.ts`: la sorgente si collega solo quando il video deve partire. Safari/iOS usano HLS nativo, gli altri browser caricano `hls.js/light` in quel momento (~110 KB gzip, chunk separato), con `capLevelToPlayerSize`. Pausa fuori viewport e con scheda nascosta, e in pausa smette anche il download (`stopLoad`).
- **Hosting gratuito**: i file stanno su Vercel (`/video/…`). Se la banda del piano Hobby (100 GB/mese) diventasse stretta, la stessa cartella si sposta su Cloudflare R2 (nessun costo di uscita dati, 10 GB gratuiti) impostando `PUBLIC_VIDEO_BASE`.

---

## 8. Componenti

Ogni componente usa le classi `om-` di `src/styles/ds/bundle.css` (copiato dal DS, non modificato); ritocchi solo in `global.css` o nello `<style>` del componente. Props tipizzate (`interface Props`). Tutti accettano `lang: 'it' | 'en'` se hanno testi.

| Componente | Classi DS | Props principali | Note / a11y |
| --- | --- | --- | --- |
| `Pulsante` | `om-pulsante--oro / --contorno / --testo / --piccolo` | `href`, `variante`, `esterno`, `disabilitato` | `esterno` → `target="_blank" rel="noopener"` + testo SR "(si apre in una nuova scheda)"; disabilitato → `aria-disabled` |
| `Etichetta` | `om-etichetta`, `--nuova`, `--esaurito` | `tipo` | Una per data |
| `Testata` | `om-testata`, `--trasparente`, `om-lingua` | `lang`, `corrente`, `trasparente` | `aria-current="page"`; pannello mobile con focus trap, `Esc` chiude, `aria-expanded` |
| `Cinemascope` | `om-cinemascope`, `__banda`, `__finestra`, `--filetto`, `om-grana` | `immagine` \| slot video, `occhiello`, `sottotitolo`, `filetto` | `figure`/`figcaption`, alt obbligatorio |
| `HeroVideo` | come sopra | `poster`, `lang` | §7.2 |
| `DataTour` / `ListaDate` | `om-date`, `om-data`, `__numero`, `__anno`, `__citta`, `__sede`, `__coordinate`, `__azione`, `--passata` | `evento`, `lang` / `eventi`, `limite`, `archivio` | JSON-LD `MusicEvent` per riga; `<time datetime>` |
| `Crediti` | `om-crediti`, `--centrato` | `lang`, `centrato` | `dl/dt/dd`, ordine fisso |
| `Repertorio` | — (nuovo, token DS) | `lang` | Film in `evocativo` (corsivo), temi tra “ ” |
| `FasciaPartner` | `om-partner`, `__gruppo`, `__etichetta`, `__loghi`, `__riquadro` | `gruppi` | Nascosta se vuota; mai segnaposto in prod |
| `VideoTrailer` | — | `youtubeId`, `titolo`, `poster` | Facade: poster + play rotondo (`raggio-tondo`); al click iframe `youtube-nocookie.com` |
| `Streaming` | `om-pulsante--contorno` | `lang` | Link da `content/link.json` |
| `SchedaContatto` | — (`sala-200`, `raggio-0`) | `titolo`, `nome`, `email`, `telefono` | `mailto:`/`tel:` |
| `ModuloContatti` | campi `sala-300`, bordo `linea-forte` | `lang` | POST a `/api/contatti` (validazione Zod lato server, invio via Resend), honeypot + limite di frequenza, motivo (Booking/Stampa/Info), consenso privacy obbligatorio, pagina di conferma |
| `Footer` | `om-partner` | `lang` | Crediti fotografici aggregati da `foto.json` |
| `Reveal` | — | slot | `IntersectionObserver` aggiunge `.is-visibile`; disattivo con reduced-motion |
| `Sezione` | — | `id`, `occhiello`, `titolo` | `h2` + occhiello, spaziatura DS |
| `Seo` | — | `title`, `description`, `og`, `lang`, `alternate` | Dentro BaseLayout |

`BaseLayout.astro`: `<html lang>`, meta, `Seo`, preload font e poster, skip link "Vai al contenuto", `Testata`, `<main id="contenuto">`, `Footer`, script globali (Testata, Reveal).

---

## 9. Modello dati (`src/content/` + `content.config.ts`)

| Collezione | Formato | Schema (Zod) |
| --- | --- | --- |
| `eventi` | `eventi/*.json` (un file per data) | `data` (ISO), `ora` ("21:00"), `citta`, `sede`, `indirizzo`, `nazione`, `lat`, `lng` (4 decimali), `biglietti` (url, opz.), `stato` (`nessuno`\|`nuova`\|`ultimi`\|`esaurito`), `versione` (`proiezioni`\|`concerto`), `segnaposto` (bool) |
| `testi` | `testi/{it,en}/*.md` | `titolo`, `ordine`, `lang`; corpo = testo del docx alla lettera |
| `persone` | `persone.json` | `id`, `nome`, `ruolo` {it,en}, `bio` {it,en}, `foto` |
| `luoghi` | `luoghi.json` | Luoghi storici (Teatro Malibran, Mario Del Monaco, Verdi, Ponte di Bassano, Faro di Bibione, Guangzhou) con città e coordinate **verificate** |
| `partner` | `partner.json` | `gruppo`, `nome`, `logo`, `url` |
| `contatti` | `contatti.json` | `booking`, `stampa`, `pubblico`: nome, email, telefono; `social`: url |
| `link` | `link.json` | Spotify, Apple Music, Tidal, YouTube playlist, trailer id |
| `foto` | `foto.json` | `file`, `categoria`, `alt` {it,en}, `credito`, `segnaposto` |

Regole:
- Eventi futuri ordinati per data crescente; passati → Archivio (decrescente). Data passata calcolata a build: serve un **rebuild giornaliero** (Vercel Deploy Hook chiamato da una GitHub Action cron alle 04:00) — vedi T03.
- **Segnaposto**: in `astro dev` visibili con bordo tratteggiato e scritta "SEGNAPOSTO"; in build di produzione (`VERCEL_ENV=production`) i contenuti `segnaposto: true` sono **esclusi**. Il ticket T40 li sostituisce.
- Formati data (DS): grafica `SAB 17.07.2027 · ORE 21:00`, testo "sabato 17 luglio 2027, ore 21", EN "Sat 17 July 2027, 9 pm". Helper in `src/i18n/date.ts` con `Intl.DateTimeFormat`, fuso `Europe/Rome`.

---

## 10. Pipeline media

### Foto (`scripts/foto.py`)
- **Selezione** (~18): da contact sheet dei 50 originali, per categorie DS › Fotografia: orchestra+schermo (3), Maestro che dirige (3, di cui 1 verticale), Claudia Sasso (2), sezioni (3), luoghi (3), pubblico controluce (2), +2 riserva. Preferire luce calda, neri profondi, spazio sopra/sotto per le bande. Escludere foto con loghi di altri eventi.
- **Elaborazione**: Pillow, lato lungo 3200 px, JPG q85 progressivo, profilo sRGB, EXIF rimossi (tranne copyright), nomi semantici `orchestra-schermo-01.jpg`, `maestro-dirige-01.jpg` …
- **Mappa** in `content/foto.json` (originale → nuovo nome, alt IT/EN, credito).
- In pagina: `<Picture formats={['avif','webp']} widths={[640,960,1280,1920,2560]} sizes=…>`; tagli 2,39:1 via `object-fit: cover` + `object-position` per foto.

### Loghi (`scripts/loghi-svg.mjs` → `scripts/loghi.py`)
- Sorgente: `Logo Morricone.svg`, un `<g>` per versione. `loghi-svg.mjs` misura ogni gruppo (raster con sharp + trim), scrive `src/assets/logo/logo-{colore}-{forma}.svg` con `viewBox` ritagliato e un master PNG 1600 px. L'oro del file (`#f2a93d`) diventa l'oro del DS `#e7ad54`, lo stesso dei PNG originali.
- Nel sito il componente `Logo` usa gli SVG (`<img>`, nitidi a ogni misura): il WebP ricampionato dai PNG perdeva il lato sinistro della "O" di OMAGGIO.
- Favicon (`loghi.py`, dal master verticale oro: `favicon.ico` 16/32/48 + `apple-touch-icon.png` 180): logo su `sala-100`, area 0,5 H. Misure minime DS: sotto 240 px (vert.) / 280 px (oriz.) **non** usare il logo.
- OG 1200×630: finestra Cinemascope con foto + logo orizzontale oro nella banda; una per pagina (`public/og/`).

### Grana
Si usa `.om-grana` di `bundle.css` del DS (rumore SVG incorporato, nessun file in più), con `opacity: var(--grana-opacita)` e `mix-blend-mode: overlay`, solo sopra foto e video (T13).

### Note sulle foto (T09)
- 19 foto scelte e approvate; provini in `scripts/out/` (non nel repo). Escluse: fotogrammi di film sullo schermo, scritte "Tribute to Ennio Morricone".
- Ritaglio 8% in basso: elimina la firma del fotografo con il logo ricolorato (vietato dal DS).
- Crediti: Lorenzo Marafante; le foto con "© Omaggio a Ennio Morricone" (#12–16 del provino) hanno `creditoDaConfermare: true` (T40).
- `maestro-04` e `luogo-aperto-01` sono a 2048 px: non usarle a tutta larghezza.

---

## 11. i18n

- `src/i18n/it.ts` / `en.ts`: dizionario UI (menu, pulsanti, etichette, date, form, footer, alt generici).
- Testi lunghi: `content/testi/it/*.md` dal docx **alla lettera**; `content/testi/en/*.md` tradotti (testi brevi/medi EN già approvati nel DS › Tono; i lunghi da far **revisionare**).
- Il logo e il titolo *Omaggio a Ennio Morricone* restano in italiano anche in EN.
- Selettore lingua: porta alla pagina equivalente, `hreflang="it|en|x-default"`.

---

## 12. SEO

- Title: `<Pagina> — Omaggio a Ennio Morricone` (Home: `Omaggio a Ennio Morricone — Diego Basso, Orchestra Ritmico Sinfonica Italiana`). Description 140–160 caratteri per pagina e lingua (dal testo breve DS).
- OG/Twitter: `og:image` 1200×630 per pagina, `og:locale` it_IT / en_GB.
- JSON-LD: `MusicEvent` per ogni data (name, startDate con fuso, location `Place`+`PostalAddress`+`GeoCoordinates`, performer `PerformingGroup` + `Person`, offers url, eventStatus, eventAttendanceMode); `PerformingGroup` + `MusicAlbum` (streaming) in Home.
- `@astrojs/sitemap` con i18n, `robots.txt`, canonical, 404 `noindex`. Le preview Vercel hanno già `X-Robots-Tag: noindex`.

---

## 13. Performance (budget)

| Metrica | Obiettivo |
| --- | --- |
| LCP (4G, mobile) | < 2,5 s (poster AVIF preload) |
| CLS | < 0,05 (dimensioni esplicite ovunque) |
| JS totale | < 30 KB gzip al caricamento (eccezione: `hls.js/light` ~110 KB, caricato solo quando parte il video dell'hero) |
| CSS | < 40 KB gzip |
| Video hero | HLS adattivo: si scaricano solo i segmenti riprodotti (1080p ≈ 3,2 Mbit/s medi, 480p ≈ 0,8) |
| Font | ≤ 3 file preload (subset latin) |
| Lighthouse mobile | ≥ 95 in tutte le categorie |

Cache (`vercel.json` › headers): `/_astro/*` e `/video/*` `max-age=31536000, immutable`; HTML `no-cache`.

---

## 14. Accessibilità (WCAG 2.2 AA)

- Contrasti già validati dal DS (`avorio` ≥ 14,5:1, `avorio-tenue` ≥ 7,3:1, `oro` ≥ 8,5:1 su `sala-*`).
- `anello-focus` su ogni elemento interattivo; skip link; ordine dei titoli h1→h2→h3, un solo h1 per pagina (in Home: h1 visivamente nascosto o il logo con `alt` come h1).
- Video: muto, pausa visibile, niente autoplay con reduced-motion.
- Menu mobile: `aria-expanded`, focus trap, `Esc`.
- Form: label visibili, errori testuali collegati (`aria-describedby`), consenso esplicito.
- Link esterni annunciati; lingua dei titoli di film inglesi con `lang="en"` dove serve.

---

## 15. Privacy e legale

- Nessun cookie di profilazione → nessun banner cookie necessario (solo informativa).
- Font self-hosted; YouTube solo al click (facade, `youtube-nocookie.com`); player Spotify solo al click (facade nella sezione Album); Apple Music/Tidal solo link.
- Analytics: opzionale, cookieless (Vercel Web Analytics o Plausible).
- Modulo: dati trattati da Vercel e Resend (USA) → indicarlo nell'informativa; titolare del trattamento **da fornire** (segnaposto).

---

## 16. Convenzioni di lavoro

- **Ticket**: GitHub Issues `T01…T41`, milestone M0–M6, label per area; `Dipende da: #n` nel corpo. Epic per milestone con task list.
- **Branch**: `feat/T08-loghi`; commit `T08: export loghi web (#12)`; PR verso `main` → preview Vercel → approvazione → merge (squash).
- **Definition of Done** (ogni ticket):
  - [ ] Criteri di accettazione dell'issue soddisfatti
  - [ ] Regole d'oro DS rispettate (buio, oro ≤ 10%, logo intatto, Cinemascope, tre voci tipografiche, solo materiale nostro, mai viola/verde, moderno non vintage, spazio, nomi esatti)
  - [ ] Verificato a 360 px, 768 px, 1440 px
  - [ ] Tastiera + focus visibile; reduced-motion
  - [ ] `npm run build` e `astro check` senza errori
  - [ ] Nessun segnaposto visibile in produzione
  - [ ] HANDSOFF.md aggiornato
- **Comandi**: `npm run dev` · `npm run build` · `npm run preview` · `npm run check` · `python scripts/foto.py` · `bash scripts/video_hero.sh`.

---

## 17. Ticket (sintesi; dettaglio nelle issue)

| Milestone | Ticket |
| --- | --- |
| M0 Setup | T01 toolchain · T02 scaffold Astro · T03 Vercel |
| M1 Fondamenta | T04 token + bundle DS · T05 font · T06 stili base · T07 BaseLayout |
| M2 Asset | T08 loghi · T09 curation foto · T10 pipeline foto · T11 analisi video · T12 montaggio video · T13 grana |
| M3 Componenti | T14 Pulsante+Etichetta · T15 Testata · T16 Cinemascope · T17 HeroVideo · T18 Crediti · T19 DataTour · T20 FasciaPartner · T21 content collections · T22 VideoTrailer · T23 Repertorio · T24 Footer |
| M4 Contenuti/i18n | T25 routing i18n · T26 testi IT · T27 testi EN |
| M5 Pagine | T28 Home · T29 Il progetto · T30 Il Maestro · T31 Date · T32 Promoter e venue · T33 Contatti · T34 Legali+404 · T35 pagine EN |
| M6 Qualità/lancio | T36 SEO · T37 performance · T38 accessibilità · T39 QA cross-device · T40 sostituzione segnaposto · T41 go-live |

Percorso critico: T01 → T02 → T04/T05 → T06 → T07 → T15 … → T28 → T35 → T36–T38 → T39 → T41. In parallelo dal T02: asset (T08–T13) e dati (T21, T26).
