// Regia dello scroll (revisione UX/UI, ottobre 2026): scroll fluido con Lenis e movimenti legati allo scroll con
// GSAP + ScrollTrigger. Si attiva con attributi nel markup, così le pagine restano HTML leggibile anche senza JS:
//   data-righe      titolo che esce riga per riga da una maschera (una volta)
//   data-illumina   frase che si accende parola per parola mentre scorre (scrub)
//   data-sipario    immagine che si apre dal centro come le tende del panoramico (una volta)
//   data-parallasse immagine che scorre più lenta della pagina dentro la sua cornice (scrub)
//   data-conta      numero che conta fino al suo valore (una volta)
//   data-accendi    elemento che prende la classe .is-acceso quando passa al centro dello schermo
// Con prefers-reduced-motion niente di tutto questo: lo stato iniziale visibile è quello finale.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

const ridotto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const radice = document.documentElement;

gsap.registerPlugin(ScrollTrigger, SplitText);

// ---------- Scroll fluido ----------
let lenis: Lenis | undefined;
if (!ridotto) {
  lenis = new Lenis({ lerp: 0.11, anchors: { offset: -80 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((tempo) => lenis?.raf(tempo * 1000));
  gsap.ticker.lagSmoothing(0);
  // Il pannello del menu (<dialog> modale) e gli iframe dei player devono scorrere da soli.
  const pannello = document.querySelector<HTMLDialogElement>('[data-pannello]');
  if (pannello) {
    new MutationObserver(() => (pannello.open ? lenis?.stop() : lenis?.start())).observe(pannello, {
      attributes: true,
      attributeFilter: ['open'],
    });
  }
}
radice.classList.toggle('regia-attiva', !ridotto);

// ---------- Pellicola: avanzamento della pagina come film che scorre nel proiettore ----------
// Fotogrammi a 24 al secondo, un fotogramma ogni 6 px di scorrimento: il contatore è una misura reale.
const pellicola = document.querySelector<HTMLElement>('[data-pellicola]');
if (pellicola) {
  const contatore = pellicola.querySelector<HTMLElement>('[data-fotogramma]');
  const tempo = pellicola.querySelector<HTMLElement>('[data-timecode]');
  const due = (n: number) => String(Math.floor(n)).padStart(2, '0');
  let ultimo = -1;
  const aggiorna = () => {
    const y = window.scrollY;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const fotogramma = Math.round(y / 6);
    pellicola.style.setProperty('--avanzamento', String(Math.min(1, y / max)));
    pellicola.style.setProperty('--scorrimento', `${-(y * 0.5) % 48}px`);
    if (fotogramma === ultimo) return;
    ultimo = fotogramma;
    if (contatore) contatore.textContent = String(fotogramma).padStart(5, '0');
    if (tempo) {
      const s = fotogramma / 24;
      tempo.textContent = `${due(s / 3600)}:${due((s / 60) % 60)}:${due(s % 60)}:${due(fotogramma % 24)}`;
    }
  };
  if (lenis) lenis.on('scroll', aggiorna);
  else window.addEventListener('scroll', aggiorna, { passive: true });
  aggiorna();
}

// ---------- Testata: si ritira scendendo, torna risalendo ----------
const testata = document.querySelector<HTMLElement>('[data-testata]');
if (testata && !ridotto) {
  ScrollTrigger.create({
    start: () => window.innerHeight * 0.9,
    end: 'max',
    onUpdate: (st) => testata.classList.toggle('is-ritirata', st.direction === 1),
    onLeaveBack: () => testata.classList.remove('is-ritirata'),
  });
  testata.addEventListener('focusin', () => testata.classList.remove('is-ritirata'));
}

if (!ridotto) {
  const uscita = 'expo.out';

  // Le misure delle righe dipendono dal font: si divide quando i font sono pronti, e di nuovo al resize.
  document.fonts.ready.then(() => {
    for (const el of document.querySelectorAll<HTMLElement>('[data-righe]')) {
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'riga',
        autoSplit: true,
        aria: 'auto',
        onSplit: (diviso) =>
          gsap.from(diviso.lines, {
            yPercent: 110,
            duration: 1.2,
            ease: uscita,
            stagger: 0.09,
            delay: Number(el.dataset.ritardo ?? 0),
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }),
      });
    }

    for (const el of document.querySelectorAll<HTMLElement>('[data-illumina]')) {
      SplitText.create(el, {
        type: 'words',
        wordsClass: 'parola',
        autoSplit: true,
        aria: 'auto',
        onSplit: (diviso) =>
          gsap.fromTo(
            diviso.words,
            { opacity: 0.16 },
            {
              opacity: 1,
              ease: 'none',
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 52%', scrub: 0.6 },
            },
          ),
      });
    }
    ScrollTrigger.refresh();
  });

  // Sipario: la cornice si apre dal centro (bande nere sopra e sotto), l'immagine rientra da uno zoom leggero.
  for (const el of document.querySelectorAll<HTMLElement>('[data-sipario]')) {
    const immagine = el.querySelector('img, video');
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 82%', once: true } });
    tl.fromTo(
      el,
      { clipPath: 'inset(50% 0% 50% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' },
    );
    if (immagine) tl.from(immagine, { scale: 1.18, duration: 2, ease: uscita }, 0);
  }

  for (const el of document.querySelectorAll<HTMLElement>('[data-parallasse]')) {
    const immagine = el.querySelector('img, video');
    if (!immagine) continue;
    gsap.fromTo(
      immagine,
      { yPercent: -7, scale: 1.16 },
      {
        yPercent: 7,
        scale: 1.16,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  }

  for (const el of document.querySelectorAll<HTMLElement>('[data-conta]')) {
    const fine = Number(el.dataset.conta);
    const valore = { n: 0 };
    el.textContent = '0';
    gsap.to(valore, {
      n: fine,
      duration: 1.8,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => (el.textContent = String(Math.round(valore.n))),
    });
  }

  for (const el of document.querySelectorAll<HTMLElement>('[data-accendi]')) {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 58%',
      end: 'bottom 42%',
      toggleClass: { targets: el, className: 'is-acceso' },
    });
  }

  // Comparse generiche (pagine interne): salita breve e dissolvenza, una volta.
  for (const el of document.querySelectorAll<HTMLElement>('[data-reveal]')) {
    gsap.from(el, {
      opacity: 0,
      y: 28,
      duration: 1.1,
      ease: uscita,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  }
} else {
  document.querySelectorAll('[data-accendi]').forEach((el) => el.classList.add('is-acceso'));
}

// Le altre parti (hero) usano la stessa istanza.
export { gsap, ScrollTrigger, lenis, ridotto };
