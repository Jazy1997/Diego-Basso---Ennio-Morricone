// Comparsa allo scorrimento: aggiunge .is-visibile agli elementi [data-reveal] una sola volta.
// Senza JS o con movimento ridotto gli elementi restano visibili (vedi global.css).
const elementi = document.querySelectorAll<HTMLElement>('[data-reveal]');
const ridotto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (ridotto || !('IntersectionObserver' in window)) {
  elementi.forEach((el) => el.classList.add('is-visibile'));
} else {
  const osservatore = new IntersectionObserver(
    (voci) => {
      for (const voce of voci) {
        if (!voce.isIntersecting) continue;
        voce.target.classList.add('is-visibile');
        osservatore.unobserve(voce.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  elementi.forEach((el) => osservatore.observe(el));
}
