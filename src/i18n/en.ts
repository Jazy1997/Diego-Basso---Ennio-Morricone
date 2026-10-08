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
  hero: {
    occhiello: 'Diego Basso conducts',
    sottotitolo: 'Music and cinema in one great show',
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
