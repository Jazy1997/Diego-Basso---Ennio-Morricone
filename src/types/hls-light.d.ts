// hls.js non dichiara i tipi per l'export "./light": è la stessa API del pacchetto completo.
declare module 'hls.js/light' {
  export * from 'hls.js';
  export { default } from 'hls.js';
}
