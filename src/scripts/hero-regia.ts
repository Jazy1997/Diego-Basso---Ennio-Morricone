// Scena dell'hero (revisione UX/UI, ottobre 2026): scorrendo, la scena resta ferma e il video si richiude
// in una finestra panoramica con i margini della pagina; il claim entra sopra e sotto la finestra, le misure
// (formato, coordinate della prossima data) compaiono ai bordi. Tutto legato allo scroll (scrub), reversibile.
import { gsap, ridotto } from './regia';

const hero = document.querySelector<HTMLElement>('[data-hero]');
const scena = hero?.querySelector<HTMLElement>('[data-scena]');

if (hero && scena && !ridotto) {
  const schermo = scena.querySelector<HTMLElement>('[data-schermo]')!;
  const contenuto = scena.querySelector<HTMLElement>('[data-contenuto]')!;
  const velo = scena.querySelector<HTMLElement>('[data-velo]')!;
  const misure = scena.querySelector<HTMLElement>('[data-misure]');
  const righe = scena.querySelectorAll<HTMLElement>('.hero__claim-riga > span');

  // Bordi della finestra in px, ricalcolati a ogni refresh (resize, font).
  const finestra = () => {
    const stile = getComputedStyle(scena);
    const margine = parseFloat(getComputedStyle(contenuto).paddingLeft) || 24;
    const rapporto = parseFloat(stile.getPropertyValue('--rapporto')) || 2.39;
    const scala = parseFloat(stile.getPropertyValue('--scala')) || 1;
    const l = (scena.clientWidth - 2 * margine) * scala;
    const h = l / rapporto;
    const lato = (scena.clientWidth - l) / 2;
    const v = Math.max(0, (scena.clientHeight - h) / 2);
    return `inset(${v}px ${lato}px ${v}px ${lato}px)`;
  };

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: () => `+=${window.innerHeight * 1.1}`,
      pin: scena,
      scrub: 0.8,
      invalidateOnRefresh: true,
      // Il pin aggiunge spazio alla pagina: va ricalcolato prima di tutti gli altri trigger.
      refreshPriority: 1,
    },
  });

  tl.fromTo(
    schermo,
    { clipPath: 'inset(0px 0px 0px 0px)' },
    { clipPath: finestra, duration: 1, ease: 'power2.inOut' },
    0,
  )
    .to(contenuto, { autoAlpha: 0, y: -48, duration: 0.35 }, 0)
    .to(velo, { opacity: 0.25, duration: 0.6 }, 0)
    .fromTo(righe, { y: 0, yPercent: 110 }, { y: 0, yPercent: 0, duration: 0.45, ease: 'expo.out', stagger: 0.12 }, 0.5);
  if (misure) tl.to(misure, { opacity: 1, duration: 0.3 }, 0.75);
  // Uno spazio di respiro a finestra chiusa prima che la scena riparta.
  tl.to({}, { duration: 0.25 });
}
