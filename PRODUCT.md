# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- **Spettatori**: cercano emozione, le prossime date, i biglietti, l'album da ascoltare. Arrivano soprattutto da mobile, spesso da un link social o da una ricerca sul nome di Morricone.
- **Promoter, teatri, festival**: valutano se programmare lo spettacolo. Cercano organico, storia, versioni, scheda tecnica e press kit, e vogliono un contatto per il booking.
- **Stampa**: cerca testi, foto in alta risoluzione e contatti.

## Product Purpose
Sito promozionale dello spettacolo *Omaggio a Ennio Morricone*, ideato nel 2004 dal Maestro Diego Basso: Orchestra Ritmico Sinfonica Italiana (46 elementi), il soprano lirico Claudia Sasso e le proiezioni sul grande schermo. Il successo si misura con i click verso le biglietterie, i download del press kit, gli invii del modulo booking e i click sullo streaming.

## Positioning
Non è un concerto "tributo" generico: è uno spettacolo che rimette la musica di Morricone accanto alle immagini dei film, sul grande schermo, con una grande orchestra dal vivo. Lo porta in scena da oltre vent'anni lo stesso Maestro, dal Teatro Malibran alla Guangzhou Symphony Orchestra.

## Operating Context
Sito statico Astro 7 bilingue IT (radice) / EN (`/en/`), hosting Vercel (preview per branch), modulo contatti su `/api/contatti`. Date in `src/content/eventi/`, testi lunghi alla lettera dal docx in `src/content/testi/`, UI in `src/i18n/`. Contenuti segnaposto esclusi in produzione.

## Capabilities and Constraints
- Pagine: Home, Il progetto, Il Maestro, Date (prossime + archivio), Promoter e venue (press kit, scheda tecnica), Contatti (modulo), Privacy, Cookie, 404.
- Testi lunghi da usare alla lettera; tono "raccontiamo, non vendiamo": niente esclamativi né superlativi vuoti.
- Performance: Lighthouse mobile ≥ 95, LCP < 2,5 s, CLS < 0,05. WCAG 2.2 AA, `prefers-reduced-motion` rispettato.
- Budget JS alzato dall'utente (ottobre 2026) per una regia di scroll con GSAP + ScrollTrigger + Lenis.

## Brand Commitments
- **Logo** "Omaggio a Ennio Morricone" (SVG, oro `#e7ad54` / bianco, verticale e orizzontale): resta invariato.
- Il vecchio Design System (palette sala/avorio/oro, Cormorant + Nunito Sans) **non è più vincolante**: l'utente ha chiesto una nuova identità tipografica e cromatica (ottobre 2026).
- Reference amate: edolus.com (preferita in assoluto), arstraumur.music, framedcars.it, nyphil.org/discover/gustavo. Da non imitare: microsoft.com/it-it, iconamusic.it. Sintesi in `design/reference/SINTESI.md`.

## Evidence on Hand
- Foto di Lorenzo Marafante in `src/assets/foto/` (orchestra con schermo, sezioni, Maestro, soprano, pubblico, quinte, luoghi).
- Video hero (HLS, ~86 s) e poster, trailer YouTube, copertina dell'album.
- Date reali (Fenice di Venezia 7/11/2026 e archivio 2013–2026), luoghi storici con coordinate verificate.
- Mancano ancora: contatti reali, social, press kit definitivo (vedi `DATI-DA-FORNIRE.md`). Non vanno inventati.

## Product Principles
1. Lo spettacolo prima del catalogo: chi arriva deve *sentire* il concerto prima di leggerlo.
2. Due porte chiare: chi vuole il biglietto e chi vuole programmare lo spettacolo trovano subito la propria strada.
3. La musica di Morricone e le immagini del cinema sono il soggetto; il sito è la sala.
4. Verità sui fatti: date, numeri e luoghi sono quelli reali.

## Accessibility & Inclusion
WCAG 2.2 AA; tutto il motion ha un'alternativa con `prefers-reduced-motion`; video muto con pausa visibile.
