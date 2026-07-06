/* ============================================================
   ARCHIT DUDEJA — BUSINESS DATA ANALYST PORTFOLIO
   Interactions: crosshair cursor, magnetic elements, role
   typewriter, counters, case-file carousel, project tilt.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------
     1. CROSSHAIR CURSOR
     ---------------------------------------------------------- */
  const crosshair = document.getElementById('crosshair');
  const crosshairX = document.getElementById('crosshairX');
  const crosshairY = document.getElementById('crosshairY');
  const crosshairTag = document.getElementById('crosshairTag');

  const tickerValues = ['35% ↑', '$500K saved', '30% faster', '40% accuracy', '25% ROAS ↑'];
  let tickerIndex = 0;
  let hoveringEl = false;

  if (!isTouch && crosshair) {
    window.addEventListener('mousemove', (e) => {
      crosshair.classList.add('is-active');
      crosshairX.style.top = e.clientY + 'px';
      crosshairY.style.left = e.clientX + 'px';
      crosshairTag.style.left = e.clientX + 'px';
      crosshairTag.style.top = e.clientY + 'px';
    });

    window.addEventListener('mouseleave', () => crosshair.classList.remove('is-active'));

    document.querySelectorAll('[data-magnetic], [data-tilt]').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        hoveringEl = true;
        crosshair.classList.add('is-hovering');
        crosshairTag.textContent = el.dataset.tag || 'View';
      });
      el.addEventListener('mouseleave', () => {
        hoveringEl = false;
        crosshair.classList.remove('is-hovering');
      });
    });

    if (!prefersReduced) {
      setInterval(() => {
        if (!hoveringEl) {
          tickerIndex = (tickerIndex + 1) % tickerValues.length;
          crosshairTag.textContent = tickerValues[tickerIndex];
        }
      }, 2200);
      crosshairTag.textContent = tickerValues[0];
    } else if (!hoveringEl) {
      crosshairTag.textContent = tickerValues[0];
    }
  }

  /* ----------------------------------------------------------
     2. MAGNETIC HOVER
     ---------------------------------------------------------- */
  if (!isTouch) {
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      const strength = el.classList.contains('btn') ? 0.3 : 0.18;
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
      });
    });
  }

  /* ----------------------------------------------------------
     3. NAV — ACTIVE SECTION
     ---------------------------------------------------------- */
  const navlinks = document.querySelectorAll('.navlink[data-section]');
  const sections = document.querySelectorAll('section[id]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navlinks.forEach((link) => {
          link.classList.toggle('is-active', link.dataset.section === id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  sections.forEach((sec) => sectionObserver.observe(sec));

  /* ----------------------------------------------------------
     4. HERO — role typewriter
     ---------------------------------------------------------- */
  const roles = [
    'Turning data into decisions',
    'Building dashboards people open daily',
    'Finding the story inside a spreadsheet',
    'Forecasting what happens next'
  ];
  const roleEl = document.getElementById('roleText');

  function typewriter(el, words, opts = {}) {
    const { typeSpeed = 65, deleteSpeed = 35, pause = 1500 } = opts;
    let wordIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      const word = words[wordIndex];
      if (!deleting) {
        charIndex++;
        el.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) {
          deleting = true;
          return setTimeout(tick, pause);
        }
      } else {
        charIndex--;
        el.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      setTimeout(tick, deleting ? deleteSpeed : typeSpeed);
    }
    tick();
  }

  if (roleEl) {
    if (prefersReduced) {
      roleEl.textContent = roles[0];
    } else {
      typewriter(roleEl, roles);
    }
  }

  /* ----------------------------------------------------------
     5. METRIC COUNTERS
     ---------------------------------------------------------- */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = prefix + Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.6 });

  counters.forEach((el) => counterObserver.observe(el));

  /* ----------------------------------------------------------
     6. CASE-FILE CAROUSEL
     ---------------------------------------------------------- */
  const track = document.getElementById('caseTrack');
  const dots = document.querySelectorAll('#caseDots span');
  const prevBtn = document.getElementById('casePrev');
  const nextBtn = document.getElementById('caseNext');

  if (track) {
    const cards = track.querySelectorAll('.case-card');

    function scrollToCard(i) {
      const card = cards[i];
      if (!card) return;
      track.scrollTo({ left: card.offsetLeft - 0, behavior: 'smooth' });
    }

    prevBtn.addEventListener('click', () => {
      const current = getCurrentIndex();
      scrollToCard(Math.max(0, current - 1));
    });
    nextBtn.addEventListener('click', () => {
      const current = getCurrentIndex();
      scrollToCard(Math.min(cards.length - 1, current + 1));
    });

    function getCurrentIndex() {
      let closest = 0, minDiff = Infinity;
      cards.forEach((card, i) => {
        const diff = Math.abs(card.offsetLeft - track.scrollLeft);
        if (diff < minDiff) { minDiff = diff; closest = i; }
      });
      return closest;
    }

    track.addEventListener('scroll', debounce(() => {
      const i = getCurrentIndex();
      dots.forEach((d, idx) => d.classList.toggle('is-active', idx === i));
    }, 80));
  }

  function debounce(fn, ms) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  }

  /* ----------------------------------------------------------
     7. PROJECT CARD 3D TILT
     ---------------------------------------------------------- */
  if (!isTouch) {
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rotateX = (-y * 8).toFixed(2);
        const rotateY = (x * 10).toFixed(2);
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015,1.015,1.015)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
      });
    });
  }

  /* ----------------------------------------------------------
     8. SCROLL REVEALS (GSAP)
     ---------------------------------------------------------- */
  if (window.gsap && window.ScrollTrigger && !prefersReduced) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero__content > *', {
      y: 24,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.08,
      delay: 0.2
    });

    gsap.from('.impact-console', {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5
    });

    gsap.utils.toArray('.section__head').forEach((el) => {
      gsap.from(el.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: { trigger: el, start: 'top 80%' }
      });
    });

    gsap.from('.case-card', {
      x: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: { trigger: '.caseload', start: 'top 80%' }
    });

    gsap.from('.transcript-card', {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: { trigger: '.transcript-grid', start: 'top 85%' }
    });

    gsap.from('.toolkit-panel', {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: '.toolkit-grid', start: 'top 85%' }
    });

    gsap.utils.toArray('.study-card').forEach((card) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%' }
      });
    });

    gsap.from('.contact-card', {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: '.contact__grid', start: 'top 85%' }
    });
  } else {
    document.querySelectorAll('.section__head, .case-card, .transcript-card, .toolkit-panel, .study-card, .contact-card, .hero__content > *, .impact-console')
      .forEach((el) => { el.style.opacity = '1'; });
  }

});
