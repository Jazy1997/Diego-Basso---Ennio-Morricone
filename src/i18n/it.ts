// Dizionario UI italiano (ARCHITECTURE.md §11): menu, pulsanti, etichette, footer, testi di servizio.
// Testi lunghi, breve e medio in content/testi/; claim del DS › Tono qui sotto; le date in i18n/date.ts. en.ts deve avere le stesse chiavi.
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
  claim: {
    sottotitolo: 'Musica e cinema in un unico grande spettacolo',
    proiezioni: 'Un viaggio tra proiezioni e musica.',
    chiusura: 'Un viaggio nella memoria del cinema attraverso la forza della musica dal vivo.',
  },
  hero: {
    occhiello: 'Diego Basso dirige',
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
  seo: {
    home: {
      title: 'Omaggio a Ennio Morricone — Diego Basso, Orchestra Ritmico Sinfonica Italiana',
      description:
        'Il progetto ideato nel 2004 dal Maestro Diego Basso: l’Orchestra Ritmico Sinfonica Italiana e il soprano Claudia Sasso nella musica per il cinema di Ennio Morricone.',
    },
  },
  home: {
    tutteDate: 'Tutte le date',
    progetto: 'Il progetto',
    scopriProgetto: 'Scopri il progetto',
    repertorio: 'Il repertorio',
    repertorioTitolo: 'Un viaggio nella musica per il cinema',
    maestro: 'Il Maestro',
    maestroTitolo: 'La visione del Maestro Diego Basso',
    scopriMaestro: 'Scopri il Maestro',
    formazione: 'Formazione',
    video: 'Video',
    promoter: 'Promoter e venue',
    promoterTitolo: 'Uno spettacolo per teatri, festival e grandi spazi',
    argomenti: [
      {
        titolo: '46 elementi',
        testo: 'Una vera orchestra sinfonica, l’Orchestra Ritmico Sinfonica Italiana, con il soprano lirico Claudia Sasso.',
      },
      {
        titolo: 'Oltre vent’anni di storia',
        testo: 'Dal 2004 in teatri, piazze e luoghi di particolare valore, fino alla Guangzhou Symphony Orchestra in Cina.',
      },
      {
        titolo: 'Due versioni',
        testo: 'Con le proiezioni sul grande schermo oppure in concerto, per adattarsi a ogni spazio.',
      },
    ],
    pressKit: 'Scarica il press kit',
    pressKitInArrivo: 'Press kit in arrivo',
    booking: 'Contatta il booking',
    scopriPromoter: 'Tutto per promoter e venue',
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
type Forma<T> = T extends string
  ? string
  : T extends readonly (infer V)[]
    ? Forma<V>[]
    : { [K in keyof T]: Forma<T[K]> };
export type Dizionario = Forma<typeof it>;
