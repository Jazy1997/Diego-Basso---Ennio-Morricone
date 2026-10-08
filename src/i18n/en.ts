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
    occhiello: 'Diego Basso conducts',
    date: 'Upcoming dates',
    pausa: 'Pause the video',
  },
  date: { vuoto: 'New dates coming soon', contatti: 'Get in touch' },
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
  },
  home: {
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
  },
};
