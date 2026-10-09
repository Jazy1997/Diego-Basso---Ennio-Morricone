// Dizionario UI inglese (ARCHITECTURE.md §11): stesse chiavi di it.ts, il tipo lo impone.
import type { Dizionario } from './it';

export const en: Dizionario = {
  comune: {
    biglietti: 'Tickets',
    nuovaScheda: 'opens in a new tab',
    saltaContenuto: 'Skip to content',
    riproduciVideo: 'Play the video',
  },
  lingue: { it: 'Italiano', en: 'English' },
  menu: {
    progetto: 'The project',
    maestro: 'The Maestro',
    date: 'Dates',
    promoter: 'Promoters & venues',
    contatti: 'Contacts',
  },
  testata: { nav: 'Main', menu: 'Menu', chiudi: 'Close' },
  claim: {
    sottotitolo: 'Music and cinema in one great show',
    proiezioni: 'A journey through projections and music.',
    chiusura: 'A journey into the memory of cinema through the power of live music.',
  },
  hero: {
    date: 'Upcoming dates',
    pausa: 'Pause the video',
    prossima: 'Next date',
    salta: 'Skip intro',
  },
  date: { vuoto: 'New dates coming soon', contatti: 'Get in touch', archivio: 'Past concerts' },
  etichette: {
    nuova: 'New date',
    ultimi: 'Last tickets',
    esaurito: 'Sold out',
    proiezioni: 'With projections',
  },
  crediti: { direttore: 'Conductor', soprano: 'Soprano', orchestra: '46 musicians' },
  album: {
    occhiello: 'Listen to the album',
    crediti:
      'Orchestra Ritmico Sinfonica Italiana, Coro lirico Opera House, Coro pop Art Voice Academy. Diego Basso, conductor.',
    ascolta: 'Listen here',
    nota: 'The Spotify player loads when you click.',
    etichetta: 'Listen to the album here with the Spotify player',
    piattaforme: 'Also on',
    titoloPlayer: 'Spotify player: Omaggio a Ennio Morricone',
  },
  partner: {
    patrocinio: 'Under the patronage of',
    collaborazione: 'In collaboration with',
    organizzazione: 'Organised by',
    main: 'Main partner',
  },
  seo: {
    home: {
      title: 'Omaggio a Ennio Morricone — Diego Basso, Orchestra Ritmico Sinfonica Italiana',
      description:
        'Conceived in 2004 by conductor Diego Basso: the Orchestra Ritmico Sinfonica Italiana and soprano Claudia Sasso perform Ennio Morricone’s music for cinema.',
    },
    progetto:
      'The project conceived in 2004 by Maestro Diego Basso: orchestra, voice and the big screen on a symphonic journey through Ennio Morricone’s music for cinema.',
    maestro:
      'Diego Basso, conductor and transcriber: his vision of Ennio Morricone’s repertoire, his work with Alessandroni and Griminelli, and the line-up.',
    date: 'Upcoming dates of Omaggio a Ennio Morricone with Diego Basso and the Orchestra Ritmico Sinfonica Italiana: cities, venues, times, tickets and past concerts.',
    promoter:
      'For theatres, festivals and major events: more than twenty years of history, two versions of the show, technical rider, press kit and booking contact.',
    contatti:
      'Contacts for Omaggio a Ennio Morricone: booking for theatres and festivals, press office and audience information, with a form to write to us.',
    privacy:
      'Privacy notice for the Omaggio a Ennio Morricone website: what data we process through the contact form, why, for how long and what your rights are.',
    cookie:
      'The Omaggio a Ennio Morricone website uses no profiling or analytics cookies; YouTube and Spotify load only when you start them with a click.',
  },
  home: {
    nastro: ['Orchestra', 'Voice', 'Cinema'],
    tutteDate: 'All dates',
    progetto: 'The project',
    scopriProgetto: 'Discover the project',
    repertorio: 'The repertoire',
    repertorioTitolo: 'A journey through music for cinema',
    maestro: 'The Maestro',
    maestroTitolo: 'The vision of Maestro Diego Basso',
    scopriMaestro: 'Meet the Maestro',
    formazione: 'Line-up',
    video: 'Video',
    promoter: 'Promoters & venues',
    promoterTitolo: 'A show for theatres, festivals and large venues',
    argomenti: [
      {
        titolo: '46 musicians',
        testo: 'A true symphony orchestra, the Orchestra Ritmico Sinfonica Italiana, with lyric soprano Claudia Sasso.',
      },
      {
        titolo: 'More than twenty years of history',
        testo: 'Since 2004 in theatres, squares and remarkable venues, as far as the Guangzhou Symphony Orchestra in China.',
      },
      {
        titolo: 'Two versions',
        testo: 'With projections on the big screen or as a concert, to suit every space.',
      },
    ],
    pressKit: 'Download the press kit',
    pressKitInArrivo: 'Press kit coming soon',
    booking: 'Contact booking',
    scopriPromoter: 'Everything for promoters & venues',
  },
  maestro: { collaborazioni: 'Collaborations' },
  promoter: {
    schedaTecnica: 'Download the technical rider',
    luoghi: 'Where it has been performed',
    internazionale: 'Abroad',
    versioni: 'Two versions',
    conProiezioni: {
      titolo: 'With projections',
      testo: 'Images from the films on the big screen in dialogue with the live orchestra: for theatres and venues that can host a screen.',
    },
    inConcerto: {
      titolo: 'In concert',
      testo: 'The orchestra, the voice and the repertoire without a screen: for theatres, squares and open-air venues of any size.',
    },
    scheda: 'Technical rider',
    schedaNota: 'From the stage plot of the standard version. For different requirements, contact booking.',
    voci: [
      { nome: 'Stage', valore: '10 × 10 m' },
      { nome: 'Risers', valore: '10 × 2 m and 8 × 2 m, 40 cm high' },
      { nome: 'Line-up', valore: '46 musicians, soprano and conductor' },
      { nome: 'Audio channels', valore: '54' },
      { nome: 'Music stands', valore: '30' },
      { nome: 'Seats', valore: '37, plus stools for drums, double bass (high) and keyboards' },
    ],
    booking: 'Booking',
    scrivi: 'Contact booking',
  },
  modulo: {
    titolo: 'Write to us',
    nome: 'Full name',
    email: 'Email',
    motivo: 'Subject',
    motivi: { booking: 'Booking', stampa: 'Press', pubblico: 'Information' },
    messaggio: 'Message',
    privacy: 'I have read the privacy notice and consent to the processing of my data in order to receive a reply.',
    informativa: 'Read the privacy notice',
    obbligatori: 'All fields are required.',
    invia: 'Send',
    invio: 'Sending…',
    riepilogo: 'Please check these fields:',
    errori: {
      nome: 'Please enter your name.',
      email: 'Please enter a valid email address.',
      motivo: 'Please choose a subject.',
      messaggio: 'Please write a message of at least 10 characters.',
      privacy: 'We need your consent to reply.',
      frequenza: 'Too many messages sent: please try again in a few minutes.',
      invio: 'Your message could not be sent. Please try again or email us directly.',
      configurazione: 'The form is not active yet. Please email us directly.',
    },
    grazieTitolo: 'Message sent',
    grazieTesto: 'Thank you, we will get back to you as soon as possible.',
    torna: 'Back to the home page',
  },
  legale: {
    titolare: 'Data controller',
    senzaTitolare: 'For any request about your data, write to us from the page',
    aggiornato: 'Last updated: 8 October 2026',
  },
  errore: {
    titolo: 'Page not found',
    testo: 'The page you are looking for does not exist or has been moved.',
    home: 'Back to the home page',
  },
  repertorio: {
    leone: 'The great westerns of Sergio Leone',
    citazione:
      'Some of Ennio Morricone’s best-loved film scores, from <em>Cinema Paradiso</em> to <em>The Mission</em>, from <em>The Legend of 1900</em> to <em>Once Upon a Time in America</em>, all the way to the great westerns of Sergio Leone.',
  },
  contatto: { email: 'Email', tel: 'Phone' },
  piede: {
    contatti: 'Contacts',
    booking: 'Booking',
    stampa: 'Press',
    pubblico: 'Audience information',
    ascolta: 'Listen to the album',
    seguici: 'Follow us',
    foto: 'Photography',
    privacy: 'Privacy',
    cookie: 'Cookies',
    fine: 'The End',
  },
};
