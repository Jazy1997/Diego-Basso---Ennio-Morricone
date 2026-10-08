// Facciata del trailer: al click il link diventa l'iframe youtube-nocookie in autoplay (ARCHITECTURE.md §15).
for (const trailer of document.querySelectorAll<HTMLElement>('[data-trailer]')) {
  const link = trailer.querySelector('a');
  const { id, titolo } = trailer.dataset;
  if (!link || !id) continue;

  link.addEventListener('click', (evento) => {
    if (evento.metaKey || evento.ctrlKey || evento.shiftKey) return; // nuova scheda: lascia fare al browser
    evento.preventDefault();
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
    iframe.title = titolo ?? '';
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    link.replaceWith(iframe);
    iframe.focus();
  });
}
