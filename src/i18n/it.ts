// Dizionario UI italiano (ARCHITECTURE.md §11): menu, pulsanti, etichette, footer, testi di servizio.
// I testi lunghi stanno in content/testi/; le date in i18n/date.ts. en.ts deve avere le stesse chiavi.
export const it = {
  comune: {
    biglietti: 'Biglietti',
    nuovaScheda: 'si apre in una nuova scheda',
    saltaContenuto: 'Vai al contenuto',
    riproduciVideo: 'Riproduci il video',
  },
  lingue: { it: 'Italiano', en: 'English' },
  menu: {
    progetto: 'Il progetto',
    maestro: 'Il Maestro',
    date: 'Date',
    promoter: 'Promoter e venue',
    contatti: 'Contatti',
  },
  testata: { nav: 'Principale', menu: 'Menu', chiudi: 'Chiudi' },
  hero: {
    occhiello: 'Diego Basso dirige',
    sottotitolo: 'Musica e cinema in un unico grande spettacolo',
    date: 'Prossime date',
    pausa: 'Metti in pausa il video',
  },
  date: { vuoto: 'Nuove date in arrivo', contatti: 'Scrivici' },
  etichette: {
    nuova: 'Nuova data',
    ultimi: 'Ultimi posti',
    esaurito: 'Esaurito',
    proiezioni: 'Con proiezioni',
  },
  crediti: { direttore: 'Direttore', soprano: 'Soprano', orchestra: '46 elementi' },
  album: {
    occhiello: 'Ascolta l’album',
    crediti:
      'Orchestra Ritmico Sinfonica Italiana, Coro lirico Opera House, Coro pop Art Voice Academy. Diego Basso, direttore.',
    ascolta: 'Ascolta qui',
    nota: 'Il player di Spotify si carica al click.',
    etichetta: 'Ascolta l’album qui con il player di Spotify',
    piattaforme: 'Anche su',
    titoloPlayer: 'Player Spotify: Omaggio a Ennio Morricone',
  },
  partner: {
    patrocinio: 'Con il patrocinio di',
    collaborazione: 'In collaborazione con',
    organizzazione: 'Organizzazione',
    main: 'Main partner',
  },
  contatto: { email: 'Email', tel: 'Telefono' },
  piede: {
    contatti: 'Contatti',
    booking: 'Booking',
    stampa: 'Stampa',
    pubblico: 'Informazioni per il pubblico',
    ascolta: 'Ascolta l’album',
    seguici: 'Seguici',
    foto: 'Fotografie',
    privacy: 'Privacy',
    cookie: 'Cookie',
  },
};

/** Forma del dizionario: stesse chiavi in ogni lingua, valori stringa. */
type Forma<T> = { [K in keyof T]: T[K] extends string ? string : Forma<T[K]> };
export type Dizionario = Forma<typeof it>;
