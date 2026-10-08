// Video dell'hero (ARCHITECTURE.md §7.2): parte da solo solo se consentito (niente reduced-motion
// né Save-Data, deciso dallo script inline di HeroVideo con [data-anima]); pausa fuori viewport e con la
// scheda nascosta; il pulsante pausa/play vince sempre sulla scelta automatica.
for (const hero of document.querySelectorAll<HTMLElement>('[data-hero]')) {
  const video = hero.querySelector('video');
  const pulsante = hero.querySelector<HTMLButtonElement>('.om-hero__pausa');
  if (!video || !pulsante) continue;

  let vuole = hero.hasAttribute('data-anima'); // riproduzione desiderata (automatica o scelta dall'utente)
  let visibile = false;

  const aggiorna = () => {
    const inPausa = video.paused;
    pulsante.toggleAttribute('data-in-pausa', inPausa);
    pulsante.setAttribute('aria-label', (inPausa ? pulsante.dataset.riproduci : pulsante.dataset.pausa) ?? '');
  };

  const sincronizza = () => {
    if (vuole && visibile && !document.hidden) {
      video.play().catch(() => {
        vuole = false;
        aggiorna();
      });
    } else if (!video.paused) {
      video.pause();
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
  ).observe(video);

  document.addEventListener('visibilitychange', sincronizza);

  pulsante.hidden = false;
  aggiorna();
}
