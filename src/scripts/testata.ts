// Testata (ARCHITECTURE.md §8): passaggio da trasparente a piena dopo lo scorrimento e pannello mobile.
// Il pannello è un <dialog> modale: il browser intrappola il focus e chiude con Esc; qui si aggiornano
// aria-expanded e il ritorno del focus al pulsante "Menu".
const testata = document.querySelector<HTMLElement>('[data-testata]');
const pannello = document.querySelector<HTMLDialogElement>('[data-pannello]');
const apri = document.querySelector<HTMLButtonElement>('[data-apri-menu]');

if (testata?.classList.contains('testata--sopra-hero')) {
  const aggiorna = () => testata.classList.toggle('is-scorsa', window.scrollY > 16);
  window.addEventListener('scroll', aggiorna, { passive: true });
  aggiorna();
}

if (pannello && apri) {
  // Aggiornamento idempotente: si chiama sia alla chiusura esplicita sia agli eventi del <dialog> (Esc).
  const chiuso = () => {
    if (apri.getAttribute('aria-expanded') === 'false') return;
    apri.setAttribute('aria-expanded', 'false');
    apri.focus();
  };
  const chiudi = () => {
    pannello.close();
    chiuso();
  };

  apri.addEventListener('click', () => {
    pannello.showModal();
    apri.setAttribute('aria-expanded', 'true');
  });

  pannello.addEventListener('cancel', chiuso);
  pannello.addEventListener('close', chiuso);
  pannello.querySelector('[data-chiudi-menu]')?.addEventListener('click', chiudi);
  // Un link verso un'ancora della stessa pagina deve chiudere il pannello.
  pannello.querySelectorAll('a').forEach((a) => a.addEventListener('click', chiudi));

  window
    .matchMedia('(min-width: 1200px)')
    .addEventListener('change', (e) => e.matches && pannello.open && chiudi());
}
