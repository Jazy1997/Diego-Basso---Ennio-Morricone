// Video dell'hero (ARCHITECTURE.md §7.2), in streaming adattivo HLS.
// - Parte da solo solo se consentito (niente reduced-motion né Save-Data: [data-anima] dallo script inline).
// - La sorgente si collega solo quando il video deve partire: Safari/iOS leggono HLS da soli, gli altri
//   browser caricano hls.js (build light) in quel momento, quindi non pesa sul primo caricamento.
// - Pausa fuori viewport e con la scheda nascosta; in pausa hls.js smette anche di scaricare.
// - Il pulsante pausa/play vince sempre sulla scelta automatica.
import type Hls from 'hls.js/light';

for (const hero of document.querySelectorAll<HTMLElement>('[data-hero]')) {
  const video = hero.querySelector('video');
  const pulsante = hero.querySelector<HTMLButtonElement>('.hero__pausa');
  const sorgente = hero.dataset.sorgente;
  if (!video || !pulsante || !sorgente) continue;

  let vuole = hero.hasAttribute('data-anima'); // riproduzione desiderata (automatica o scelta dall'utente)
  let visibile = false;
  let hls: Hls | undefined;
  let collegato: Promise<boolean> | undefined;

  const collega = (): Promise<boolean> =>
    (collegato ??= (async () => {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = sorgente;
        return true;
      }
      const { default: HlsJs } = await import('hls.js/light');
      if (!HlsJs.isSupported()) return false;
      hls = new HlsJs({ capLevelToPlayerSize: true, maxBufferLength: 20, startLevel: -1 });
      hls.loadSource(sorgente);
      hls.attachMedia(video);
      return true;
    })());

  const aggiorna = () => {
    const inPausa = video.paused;
    pulsante.toggleAttribute('data-in-pausa', inPausa);
    pulsante.setAttribute('aria-label', (inPausa ? pulsante.dataset.riproduci : pulsante.dataset.pausa) ?? '');
  };

  const sincronizza = async () => {
    if (vuole && visibile && !document.hidden) {
      if (!(await collega())) return;
      hls?.startLoad();
      video.play().catch(() => {
        vuole = false;
        aggiorna();
      });
    } else {
      if (!video.paused) video.pause();
      hls?.stopLoad();
    }
  };

  video.addEventListener('playing', () => video.classList.add('is-in-riproduzione'));
  video.addEventListener('play', aggiorna);
  video.addEventListener('pause', aggiorna);

  pulsante.addEventListener('click', () => {
    vuole = video.paused;
    sincronizza();
  });

  new IntersectionObserver(
    ([voce]) => {
      visibile = voce.isIntersecting;
      sincronizza();
    },
    { threshold: 0.25 },
  ).observe(hero);

  document.addEventListener('visibilitychange', sincronizza);

  pulsante.hidden = false;
  aggiorna();
}
