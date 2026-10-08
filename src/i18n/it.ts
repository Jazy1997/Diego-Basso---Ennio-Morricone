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
  date: { vuoto: 'Nuove date in arrivo', contatti: 'Scrivici', archivio: 'Archivio' },
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
    progetto:
      'Il progetto ideato nel 2004 dal Maestro Diego Basso: orchestra, voce e grande schermo in un viaggio sinfonico nella musica per il cinema di Ennio Morricone.',
    maestro:
      'Diego Basso, direttore e trascrittore: la sua visione del repertorio di Ennio Morricone, le collaborazioni con Alessandroni e Griminelli e la formazione.',
    date: 'Le prossime date di Omaggio a Ennio Morricone con Diego Basso e l’Orchestra Ritmico Sinfonica Italiana: città, teatri, orari, biglietti e archivio dei concerti.',
    promoter:
      'Per teatri, festival e grandi eventi: oltre vent’anni di storia, due versioni dello spettacolo, scheda tecnica, press kit e contatto booking.',
    contatti:
      'Contatti di Omaggio a Ennio Morricone: booking per teatri e festival, ufficio stampa e informazioni per il pubblico, con il modulo per scriverci.',
    privacy:
      'Informativa sulla privacy del sito Omaggio a Ennio Morricone: quali dati trattiamo con il modulo contatti, perché, per quanto tempo e quali sono i tuoi diritti.',
    cookie:
      'Il sito Omaggio a Ennio Morricone non usa cookie di profilazione né di statistica; YouTube e Spotify si caricano solo quando li avvii tu con un clic.',
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
  maestro: { collaborazioni: 'Collaborazioni' },
  promoter: {
    luoghi: 'Dove è andato in scena',
    internazionale: 'All’estero',
    versioni: 'Due versioni',
    conProiezioni: {
      titolo: 'Con proiezioni',
      testo: 'Le immagini dei film sul grande schermo dialogano con l’orchestra dal vivo: per teatri e spazi che possono ospitare uno schermo.',
    },
    inConcerto: {
      titolo: 'In concerto',
      testo: 'L’orchestra, la voce e il repertorio senza schermo: per teatri, piazze e luoghi all’aperto di ogni dimensione.',
    },
    scheda: 'Scheda tecnica',
    schedaNota: 'Dallo stage plot della versione standard. Per esigenze diverse scrivi al booking.',
    voci: [
      { nome: 'Palco', valore: '10 × 10 m' },
      { nome: 'Pedane', valore: '10 × 2 m e 8 × 2 m, altezza 40 cm' },
      { nome: 'Organico', valore: '46 elementi, soprano e direttore' },
      { nome: 'Canali audio', valore: '54' },
      { nome: 'Leggii', valore: '30' },
      { nome: 'Sedute', valore: '37, più sgabelli per batteria, contrabbasso (alto) e tastiere' },
    ],
    booking: 'Booking',
    scrivi: 'Scrivi al booking',
  },
  modulo: {
    titolo: 'Scrivici',
    nome: 'Nome e cognome',
    email: 'Email',
    motivo: 'Motivo',
    motivi: { booking: 'Booking', stampa: 'Stampa', pubblico: 'Informazioni' },
    messaggio: 'Messaggio',
    privacy: 'Ho letto l’informativa sulla privacy e acconsento al trattamento dei dati per ricevere una risposta.',
    informativa: 'Leggi l’informativa',
    obbligatori: 'Tutti i campi sono obbligatori.',
    invia: 'Invia',
    invio: 'Invio in corso…',
    riepilogo: 'Controlla i campi indicati:',
    errori: {
      nome: 'Scrivi il tuo nome.',
      email: 'Scrivi un indirizzo email valido.',
      motivo: 'Scegli un motivo.',
      messaggio: 'Scrivi un messaggio di almeno 10 caratteri.',
      privacy: 'Serve il consenso per poterti rispondere.',
      frequenza: 'Hai inviato troppi messaggi: riprova tra qualche minuto.',
      invio: 'Il messaggio non è partito. Riprova o scrivici direttamente via email.',
      configurazione: 'Il modulo non è ancora attivo. Scrivici direttamente via email.',
    },
    grazieTitolo: 'Messaggio inviato',
    grazieTesto: 'Grazie, ti risponderemo il prima possibile.',
    torna: 'Torna alla home',
  },
  legale: {
    titolare: 'Titolare del trattamento',
    senzaTitolare: 'Per qualsiasi richiesta sui tuoi dati scrivici dalla pagina',
    aggiornato: 'Ultimo aggiornamento: 8 ottobre 2026',
  },
  errore: {
    titolo: 'Pagina non trovata',
    testo: 'La pagina che cerchi non esiste o è stata spostata.',
    home: 'Torna alla home',
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
