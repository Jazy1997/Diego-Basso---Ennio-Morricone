// Facciata del player Spotify (ARCHITECTURE.md §15): nessuna richiesta a Spotify finché non si clicca.
for (const player of document.querySelectorAll<HTMLElement>('[data-album]')) {
  const pulsante = player.querySelector('button');
  const { id, titolo } = player.dataset;
  if (!pulsante || !id) continue;

  pulsante.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = `https://open.spotify.com/embed/album/${encodeURIComponent(id)}?theme=0`;
    iframe.title = titolo ?? '';
    iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.loading = 'eager';
    player.replaceChildren(iframe);
    player.style.height = '352px';
    iframe.focus();
  });
}
