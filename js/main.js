/* PLUMBING_V 4 — Bespoke Studio · meccanica invisibile canonica.
   ────────────────────────────────────────────────────────────────
   CONFINE (inviolabile): questo file contiene SOLO plumbing — la meccanica
   che il visitatore non percepisce come design. NIENTE markup di sezioni,
   NIENTE stile, NIENTE struttura: concept, griglia, tipografia, hero e
   animazioni-firma si progettano DA ZERO per ogni cliente (GATE #3).
   Se qui dentro scivola del layout, questo diventa il nuovo scheletro
   condiviso — cioè il difetto "copia-incolla" che il metodo combatte.

   Come si usa: si COPIA nella cartella js/ del sito e si adatta la sola
   costante SITE. Le animazioni-firma del sito si scrivono nel proprio
   main.js DOPO questo file (o in coda a questo file, sotto il marcatore).
   Ogni bug nuovo si corregge QUI (bump PLUMBING_V + changelog nel README)
   e poi nel sito: mai il contrario.

   Fix già incorporati (non rimuovere):
   - ScrollTrigger registrato SUBITO allo script load, MAI dentro l'intro
     o un setTimeout (bug APF #5 del 16/7: race col watchdog → sezioni
     che sparivano allo scroll).
   - Reveal con once:true (niente re-animazioni da zero ri-scorrendo).
   - Watchdog 1,5s che forza visibile e UCCIDE i trigger non scattati.
   - Lightbox su [hidden] + override CSS !important (bug: display:flex
     batteva [hidden] e la lightbox restava visibile).
   - Foto-contenuto MAI lazy (regola workflow §8): il plumbing non tocca
     il loading, ma il lint lo verifica.
   - Orari Europe/Rome con finestre multiple e scavalco di mezzanotte
     (pattern Il Cavallante 18:00–00:30). */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO — l'unica parte da adattare ══════════ */
  var SITE = {
    slug: 'rudybike',
    /* nessun WhatsApp dichiarato: il telefono */
    whatsapp: { number: '', message: '', ids: [] },
    /* la scheda Google (2/10/2026): lunedì–venerdì 9–12:30 e 15–18:30, sabato 9–12, domenica chiuso */
    hours: {
      0: [],
      1: [['09:00', '12:30'], ['15:00', '18:30']], 2: [['09:00', '12:30'], ['15:00', '18:30']], 3: [['09:00', '12:30'], ['15:00', '18:30']], 4: [['09:00', '12:30'], ['15:00', '18:30']], 5: [['09:00', '12:30'], ['15:00', '18:30']], 6: [['09:00', '12:00']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1800,
    revealSelector: '.reveal',
    inViewClass: 'in-view',
    breakpointMenu: 1100,
    EN: {
      "m.salta": "Skip to the content",
      "m.top": "Rudybike: back to the top",
      "m.nav": "The sections",
      "m.lingua": "Language",
      "m.menu": "Open the menu",
      "m.ingrandisci": "Enlarge the photo",
      "m.lightbox": "Enlarged photo",
      "m.chiudi": "Close",
      "n.lavori": "What we repair",
      "n.prova": "The water test",
      "n.negozio": "The shop",
      "n.recensioni": "Reviews",
      "n.orari": "Hours",
      "t.chiama": "Call",
      "t.indicazioni": "Directions",
      "t.orari": "Hours",
      "h.occhio": "Viale Corsica 58 · right by the 12 and 27 tram stop",
      "h.frase": "Bicycle servicing and repairs",
      "h.detto": "“I do my best.”",
      "h.dettochi": "our reply to a customer, on Google",
      "h.descr": "We service and repair bicycles. By appointment we also service and repair scooters and motorbikes.",
      "m.voto": "4.9",
      "h.voto": "on Google, 46 reviews",
      "a.tavola": "The pine tool board with spanners, pliers and screwdrivers hanging on the orange wall, the clock, the shelves and, below, the blue workbench with the vice.",
      "h.ftavola": "The tool board, above the blue workbench",
      "l.occhio": "What we repair",
      "l.titolo": "Bicycles, and by appointment scooters and motorbikes",
      "l.g1": "Bicycles",
      "l.g1t": "Our everyday work: bring your bike to the shop during opening hours, or give us a call first.",
      "l.v1": "A flat tyre: puncture and inner tube",
      "l.v2": "Brakes",
      "l.v3": "A rim to replace",
      "l.v4": "Oiling and a full check-up",
      "l.v5": "Road bikes",
      "l.v6": "E-bikes, servicing included",
      "l.g2": "Scooters and motorbikes",
      "l.g2t": "Servicing and repairs by appointment: call 389 837 0520 to book one.",
      "l.v7": "Servicing",
      "l.v8": "Repairs",
      "l.v9": "By appointment",
      "l.g3": "Second-hand bikes",
      "l.g3t": "There are second-hand bikes in the shop too: ask us which ones are available.",
      "l.citchi": "on Google",
      "p.occhio": "The water test",
      "p.titolo": "Where the bubbles come out, there’s the hole",
      "p.intro": "It’s the oldest trick of the trade for a flat tyre: the inner tube goes into the water and the bubbles show where the hole is. If it’s small, a patch will do; if it’s a long cut, the tube gets replaced. Then it’s pumped up to the right pressure.",
      "a.lavandino": "The white sink in the workshop, with the tap and the sponge, in front of the grey planks.",
      "p.flavandino": "Our sink, next to the tool board",
      "c.titolo": "The water test: where the bubbles come out, there’s the hole",
      "c.desc": "A flat inner tube hangs above the workshop sink. It goes down into the water and bubbles come out from one spot: that’s where the hole is. It comes back up, the chalk marks the spot, the patch goes on, the pump hose is attached to the valve and the gauge needle rises as the tube inflates. In the second mode the hole is a long cut, the bubbles come out from several spots and the tube is replaced with a new one.",
      "p.d0": "The bubbles come out from one spot only: it’s a small hole, and a patch usually does the job.",
      "p.d1": "The bubbles come out from several spots: it’s a long cut, and a patch won’t do; it needs a new inner tube.",
      "p.modi": "What’s wrong with the inner tube",
      "p.b0": "Small hole",
      "p.b1": "Long cut",
      "ng.occhio": "The shop",
      "ng.titolo": "At number 58, Viale Corsica",
      "a.vetrine": "The shop front on Viale Corsica: two windows with dark green frames, the bikes and the orange wall inside; next to them the green front door.",
      "ng.fvetrine": "Our two windows, with their dark green frames",
      "ng.testo1": "We are at number 58, Viale Corsica, between Via Lomellina and Via Negroli: the 12 and 27 tram stop is right outside.",
      "ng.testo2": "Inside, the orange wall: the white counter, the shelves of spare parts, the repair stands and, through the back, the tool board above the blue workbench.",
      "a.negozio": "Inside the shop: the orange wall, the white counter, the grey door, the shelves of spare parts, the bikes and two repair stands.",
      "ng.fnegozio": "The white counter and the shelves of spare parts (we blurred the brands)",
      "a.laboratorio": "The workshop: the sink, the tool board, the blue workbench with the vice, the tyres, the blue stool.",
      "ng.flaboratorio": "The workshop, from the sink to the blue workbench",
      "r.occhio": "Reviews",
      "r.titolo": "The word that keeps coming back: honest",
      "r.voto": "on Google, 46 reviews; «onesto» (honest) comes up in 9",
      "r.g21": "Google, 2021",
      "r.g22": "Google, 2022",
      "r.g23": "Google, 2023",
      "r.g25": "Google, 2025",
      "r.g26": "Google, 2026",
      "r.nota": "From the reviews on Google, as they were written, in Italian; […] where we shortened them.",
      "r.tutte": "All the reviews on Google",
      "o.occhio": "Hours and directions",
      "o.titolo": "Monday to Saturday morning",
      "o.orari": "Opening hours",
      "o.cap": "Opening hours",
      "g.lun": "Monday",
      "g.mar": "Tuesday",
      "g.mer": "Wednesday",
      "g.gio": "Thursday",
      "g.ven": "Friday",
      "g.sab": "Saturday",
      "g.dom": "Sunday",
      "g.chiuso": "closed",
      "o.nota": "Hours from our Google listing (October 2026).",
      "w.dove": "Where",
      "w.dovev": "Viale Corsica 58, 20137 Milan",
      "w.tram": "Tram",
      "w.tramv": "the 12 and the 27, Viale Corsica – Via Lomellina stop, a few steps away",
      "w.bus": "Bus",
      "w.busv": "the 45 and the 175 at Viale Corsica – Via Negroli, about 180 metres away; trolleybus 93 about 400 metres away",
      "w.metro": "Metro and rail",
      "w.metrov": "M4 Stazione Forlanini, about 500 metres away; Milano Forlanini station (S5, S6, S9) about 550 metres away",
      "w.tel": "Phone",
      "w.mappa": "Map: Rudybike, Viale Corsica 58, Milan",
      "q.occhio": "Questions",
      "q.titolo": "Before you drop by",
      "q.d1": "Do I need an appointment?",
      "q.r1": "For scooters and motorbikes, yes: servicing and repairs are by appointment, on 389 837 0520. For bicycles, come to the shop during opening hours, or give us a call first.",
      "q.d2": "Do you also repair road bikes and e-bikes?",
      "q.r2": "Yes, road bikes and e-bikes too, servicing included.",
      "q.d3": "Do you have used bikes?",
      "q.r3": "There are second-hand bikes in the shop too: ask us which ones are available.",
      "q.d4": "Are you open on Saturdays?",
      "q.r4": "Yes, on Saturdays from 9am to 12pm. Monday to Friday 9am–12:30pm and 3pm–6:30pm; we are closed on Sundays.",
      "q.d5": "How do I get there by public transport?",
      "q.r5": "The Viale Corsica – Via Lomellina stop of trams 12 and 27 is a few steps away; M4 Stazione Forlanini is about 500 metres away.",
      "f2.orario": "Monday–Friday 9am–12:30pm and 3pm–6:30pm, Saturday 9am–12pm, Sunday closed",
      "f2.cred": "Demo website made by <a href=\"https://bespokestud.io\" rel=\"noopener\">Bespoke Studio</a>. <a href=\"privacy.html\">Privacy</a>. Hours, rating and reviews from the Google listing (October 2026), photos from our Google listing (brands blurred). We drew the water test&nbsp;ourselves.",
      "f2.su": "Back to top"
    },
    LANGS: null,
    RTL: ['ar', 'he', 'fa', 'ur'],
    HOURS_I18N: null,
  };
  /* normalizzazione: EN storico -> LANGS */
  if (!SITE.LANGS) SITE.LANGS = SITE.EN && Object.keys(SITE.EN).length ? { en: SITE.EN } : {};
  var LANG_CODES = Object.keys(SITE.LANGS);   // senza 'it', che è il DOM
  /* ═════════════════════════════════════════════════════════════════ */

  /* ---------- WhatsApp wiring ---------- */
  if (SITE.whatsapp.number) {
    var waHref = 'https://wa.me/' + SITE.whatsapp.number + '?text=' +
      encodeURIComponent(SITE.whatsapp.message);
    SITE.whatsapp.ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.href = waHref; el.target = '_blank'; el.rel = 'noopener'; }
    });
  }

  /* ---------- GSAP: registrazione IMMEDIATA + reveal + watchdog ---------- */
  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll(SITE.revealSelector);
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) {
      if (hasST) {
        els.forEach(function (el) {
          ScrollTrigger.getAll().forEach(function (st) {
            if (st.trigger === el && !st.progress) st.kill();
          });
        });
      }
      gsap.set(els, { opacity: 1, y: 0, x: 0 });
    }
  }
  // FIX FOUC (18/7): il watchdog è SOLO un fallback se GSAP non c'è (o reduced-motion).
  // Rivelare in anticipo tutti i .reveal mentre gli scroll-trigger sono attivi causava il
  // flash (scompaiono/ricompaiono) sotto la piega. Con GSAP attivo, rivelano gli ScrollTrigger.
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    // reveal generico: le animazioni-FIRMA del sito vanno oltre questo,
    // ma si registrano ANCHE LORO subito, mai dopo l'intro.
    // ⚠️ REGOLA ANTI-FLASH (18/7): un elemento .reveal deve avere UNA SOLA animazione che
    // ne porta l'opacità a 1. Se un elemento ha una FIRMA che ne anima l'opacità (stagger,
    // timeline, ecc.), ESCLUDILO da qui via SITE.revealSelector (es. '.reveal:not(.mondo)'),
    // altrimenti il reveal generico + la firma si sovrappongono e l'elemento FLASHA.
    // immediateRender:false → lo stato "from" (opacity:0) NON viene ri-applicato ad ogni
    // ScrollTrigger.refresh() (che scatta al window.load mentre scrolli) → niente flash su refresh.
    gsap.utils.toArray(SITE.revealSelector).forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
  } else {
    // fallback senza GSAP: IntersectionObserver + classe
    if ('IntersectionObserver' in window && !reducedMotion) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add(SITE.inViewClass); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(SITE.revealSelector).forEach(function (el) { io.observe(el); });
    } else {
      showAllReveals();
    }
  }

  /* ---------- intro skippabile (NON gate-a nulla) ---------- */
  var intro = document.getElementById(SITE.introId);
  /* ⚠️ L'hook si legge AL MOMENTO DELLA CHIAMATA, mai catturato per valore
     qui. Il codice-firma vive sotto il marcatore di fine plumbing — cioè
     gira DOPO questa riga — quindi `window.bespokeHeroEntrance ||
     function(){}` congelava la funzione vuota e l'entrata dell'hero non
     partiva più: titolo a opacity 0 per sempre, hero vuota sul live.
     (20/7/2026, riprodotto a schermo su Benessere Futuro #159.) */
  function heroEntrance() {
    if (typeof window.bespokeHeroEntrance === 'function') window.bespokeHeroEntrance();
  }
  function hideIntro() {
    if (!intro) return;
    var el = intro; intro = null;
    el.classList.add('hide');
    setTimeout(function () { el.remove(); }, 700);
    heroEntrance();
  }
  // rimozione IMMEDIATA (niente fade): serve quando qualcosa deve stare sopra
  // l'intro subito, es. l'apertura del menu. Durante il fade l'intro resta
  // hit-testable e i link del drawer non sono cliccabili.
  function killIntroNow() {
    if (!intro) return;
    var el = intro; intro = null;
    el.remove();
    heroEntrance();
  }
  if (reducedMotion || !intro) {
    if (intro) { intro.remove(); intro = null; }
    /* ⚠️ setTimeout 0 NON è decorativo: senza intro questo ramo gira in modo
       SINCRONO, cioè PRIMA che il codice-firma — che sta sotto il marcatore
       di fine plumbing, dentro questa stessa IIFE — abbia assegnato
       `window.bespokeHeroEntrance`. Il risultato è un'entrata dell'hero MUTA:
       nessun errore, elementi visibili, animazione semplicemente mai partita.
       Rimandando di un tick la IIFE è conclusa e l'hook esiste.
       (14/8/2026, A.S.FA. Sicilia: misurato h1 a opacity 1 già al load.)
       Cugino del bug `hero-hook-congelato` del 20/7: lì l'hook era catturato
       troppo presto, qui è CHIAMATO troppo presto. */
    setTimeout(heroEntrance, 0);
  } else {
    setTimeout(hideIntro, SITE.introDuration);
    setTimeout(hideIntro, 6000); // safety net: l'intro non può incastrarsi
    intro.addEventListener('click', hideIntro);
  }

  /* ---------- burger menu (inert + focus + Escape + resize) ---------- */
  var burger = document.getElementById('burger');
  /* 26/7/2026 (Il Papiro #168) — IL PANNELLO SI RISOLVE DA `aria-controls`.
     Il canone apriva sempre `#mainNav`, dando per scontato che la nav
     desktop FOSSE anche il drawer. Molti siti invece hanno un drawer
     separato (`#mobile-menu`) con `hidden`, mentre `#mainNav` su mobile è
     `display:none`: il burger aggiungeva `nav-open` a un elemento nascosto
     e il menu non si apriva. È la stessa decisione già presa il 20/7 per
     qa-motion — «è lì che il markup accessibile dice qual è il pannello» —
     che però non era mai rientrata qui. */
  var nav = (function () {
    var byAria = burger && burger.getAttribute('aria-controls');
    return (byAria && document.getElementById(byAria)) || document.getElementById('mainNav');
  })();
  if (burger && nav) {
    var navUsaHidden = nav.hasAttribute('hidden');
    var lastFocus = null;
    var closeNav = function () {
      nav.classList.remove('nav-open');
      if (navUsaHidden) nav.hidden = true;
      burger.setAttribute('aria-expanded', 'false');
      if (lastFocus) { lastFocus.focus(); lastFocus = null; }
    };
    var openNav = function () {
      // L'intro ha z-index alto ed è figlia del body: se è ancora a schermo
      // copre il drawer (che vive nello stacking context dell'header) e i link
      // risultano non cliccabili. Aprire il menu chiude l'intro.
      // (bug trovato da qa-motion su Linea Uomo, 19/7/2026 → PLUMBING_V 2)
      if (typeof killIntroNow === 'function') killIntroNow();
      lastFocus = document.activeElement;
      if (navUsaHidden) nav.hidden = false;
      nav.classList.add('nav-open');
      burger.setAttribute('aria-expanded', 'true');
      var first = nav.querySelector('a, button');
      if (first) first.focus();
    };
    burger.addEventListener('click', function () {
      nav.classList.contains('nav-open') ? closeNav() : openNav();
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > SITE.breakpointMenu) closeNav();
    });
  }

  /* ---------- lightbox accessibile ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) {
      lightboxImg.src = src; lightboxImg.alt = alt || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    };
    var closeLb = function () {
      lightbox.hidden = true; lightboxImg.src = '';
      document.body.style.overflow = '';
      if (opener) { opener.focus(); opener = null; }
    };
    document.querySelectorAll('[data-full]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        opener = btn;
        var img = btn.querySelector('img');
        openLb(btn.getAttribute('data-full'), img ? img.alt : '');
      });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !lightbox.hidden) closeLb();
    });
  }

  /* ---------- orari dinamici Europe/Rome (finestre multiple + scavalco) ---------- */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
      });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var get = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[get('weekday')], mins: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }
  var toMin = function (hm) {
    var a = hm.split(':');
    return parseInt(a[0], 10) * 60 + parseInt(a[1], 10);
  };
  var fmt = function (m) {
    m = m % 1440;
    return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2);
  };
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var HOURS_BASE = {
    it: { open: 'Aperto ora', closesAt: 'chiude alle ', opensToday: 'Chiuso · apre oggi alle ',
          opensOn: 'Chiuso · apre {day} alle ', closed: 'Chiuso', days: DAYS_IT },
    en: { open: 'Open now', closesAt: 'closes at ', opensToday: 'Closed · opens today at ',
          opensOn: 'Closed · opens {day} at ', closed: 'Closed', days: DAYS_EN },
  };
  /* risolve le etichette orari per la lingua richiesta, con fallback en -> it */
  function strings(lang) {
    var custom = (SITE.HOURS_I18N && SITE.HOURS_I18N[lang]) || null;
    var base = HOURS_BASE[lang] || HOURS_BASE.en;
    if (!custom) return base;
    var outp = {};
    Object.keys(HOURS_BASE.it).forEach(function (k) {
      outp[k] = custom[k] !== undefined ? custom[k] : base[k];
    });
    return outp;
  }

  function hoursState() {
    var now = romeNow();
    // finestra del giorno corrente
    var wins = SITE.hours[now.day] || [];
    for (var i = 0; i < wins.length; i++) {
      var s = toMin(wins[i][0]), e = toMin(wins[i][1]);
      if (now.mins >= s && now.mins < Math.min(e, 1440)) {
        return { open: true, day: now.day, closesAt: fmt(e) };
      }
    }
    // coda dopo mezzanotte della sera PRIMA
    var prev = (now.day + 6) % 7;
    var pw = SITE.hours[prev] || [];
    for (var j = 0; j < pw.length; j++) {
      var pe = toMin(pw[j][1]);
      if (pe > 1440 && now.mins < pe - 1440) {
        return { open: true, day: prev, closesAt: fmt(pe) };
      }
    }
    // chiuso: prossima apertura (oggi o nei prossimi 7 giorni)
    for (var k = 0; k < wins.length; k++) {
      if (now.mins < toMin(wins[k][0])) {
        return { open: false, day: now.day, opensToday: fmt(toMin(wins[k][0])) };
      }
    }
    for (var d = 1; d <= 7; d++) {
      var nd = (now.day + d) % 7;
      var nw = SITE.hours[nd] || [];
      if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) };
    }
    return { open: false, day: now.day };
  }

  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId);
    var st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) {
      row.classList.toggle(SITE.todayClass,
        parseInt(row.getAttribute('data-day'), 10) === st.day);
    });
    if (!el) return;
    /* V4: le etichette si risolvono per lingua corrente, non con un booleano
       en/it. Fallback a catena lingua -> en -> it, così un sito con AR o FR
       che non traduce lo stato orari resta comunque leggibile. */
    var L = strings(root.lang);
    var txt;
    if (st.open) {
      txt = L.open + ' · ' + L.closesAt + st.closesAt;
    } else if (st.opensToday) {
      txt = L.opensToday + st.opensToday;
    } else if (st.opensAt !== undefined) {
      txt = L.opensOn.replace('{day}', L.days[st.opensDay]) + st.opensAt;
    } else {
      txt = L.closed;
    }
    el.textContent = txt;
  }
  renderHours();
  setInterval(renderHours, 60000);

  /* ---------- i18n overlay (EN sopra l'IT del DOM) ---------- */
  var originals = {}; // attr -> key -> testo IT
  var I18N_ATTRS = [
    ['data-i18n', null],
    ['data-i18n-aria', 'aria-label'],
    ['data-i18n-alt', 'alt'],
    ['data-i18n-placeholder', 'placeholder'],
    ['data-i18n-title', 'title'],
  ];
  function setLang(lang) {
    /* V4: qualunque lingua dichiarata in SITE.LANGS, non più solo 'en'.
       'it' resta la lingua del DOM: nessun dizionario, nessuna sostituzione.
       Una lingua sconosciuta ricade su 'it' invece di rompere la pagina. */
    root.lang = (lang === 'it' || LANG_CODES.indexOf(lang) !== -1) ? lang : 'it';
    root.dir = SITE.RTL.indexOf(root.lang) !== -1 ? 'rtl' : 'ltr';
    var dict = SITE.LANGS[root.lang] || null;
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr);
        var store = originals[dattr];
        /* innerHTML, NON textContent: gli elementi tradotti contengono
           quasi sempre markup (<strong>, <br>) e con textContent il primo
           passaggio a EN lo appiattisce — tornando in italiano il grassetto
           non torna più. I valori del dizionario sono statici e scritti da
           noi. (20/7/2026: la flotta era già così, il boilerplate no.) */
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = dict && dict[key] !== undefined ? dict[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    /* stato visivo della coppia di bottoni lingua, se il sito la usa */
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      var on = b.getAttribute('data-lang') === root.lang;
      b.classList.toggle('is-on', on);
      if (b.tagName === 'BUTTON') b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  /* 26/7/2026 (Il Papiro #168) — SI CABLANO ENTRAMBE LE FORME DI SELETTORE.
     Il canone conosceva solo il toggle singolo `#langToggle`, ma nella
     flotta esiste da tempo anche la COPPIA di bottoni `[data-lang]`
     (Warsa, Mido…): `i18n-roundtrip` era già stato insegnato a riconoscerle
     il 20/7, il plumbing no. Chi copiava il boilerplate e usava la coppia
     si ritrovava il cambio lingua MORTO, e nessun lint statico se ne
     accorgeva (lo becca solo qa-motion, a runtime). */
  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    /* V4: il toggle singolo CICLA sull'anello ['it', ...LANG_CODES].
       Con due lingue il comportamento è identico a prima (it <-> en). */
    var RING = ['it'].concat(LANG_CODES);
    langToggle.addEventListener('click', function () {
      var i = RING.indexOf(root.lang);
      setLang(RING[(i + 1) % RING.length]);
    });
  }
  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
  try {
    var saved = localStorage.getItem(SITE.slug + '-lang');
    if (saved && saved !== 'it' && LANG_CODES.indexOf(saved) !== -1) setLang(saved);
  } catch (e) {}

  /* ---------- action-bar mobile (opzionale: #actionBar) ---------- */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () {
      actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ══════════ FINE PLUMBING — da qui in giù SOLO il codice-firma
     del sito (animazioni e interazioni uniche del cliente), che si
     registra comunque SUBITO, mai dentro setTimeout/intro. ══════════ */

  /* ══════════ RUDYBIKE — assistenza e riparazione di biciclette, Viale Corsica 58 ══════════
     la FIRMA — «la prova dell'acqua»: la camera d'aria sgonfia appesa sopra il lavandino scende nell'acqua, dal buco escono le
     bollicine, risale, il gesso segna il punto, la toppa (o la camera nuova), il tubo della pompa, la lancetta che sale. Lo stato è
     M (La toppa / Camera nuova), T (0…1) e V (0 al suo posto; fino a 1 la scena sale di poco e si spegne; da −1 a 0 arriva la
     prossima, sgonfia e appesa). Senza JS e alla fine: La toppa, T = 1, V = 0 (l'HTML). L'attesa (classe nell'head): la camera
     sgonfia e appesa. Reduced-motion: tutto subito. rAF a tempo, guardia 1,5 s, IO al 60 %, resize solo se cambia la larghezza;
     un gesto durante l'animazione la ferma dov'è. */
  var DATI = {"vb":[640,560],"via":-16,"giu":200,"sgonfia":0.86,"cy":154,"giro":121.5,"gx":566,"gy":446,"modi":[{"nome":"La toppa","bolle":[{"x":294,"y":409.2,"sale":67.2,"ondeggia":3,"w":[0.15,0.1]},{"x":291,"y":409.2,"sale":67.2,"ondeggia":-3,"w":[0.19,0.1]},{"x":296,"y":409.2,"sale":67.2,"ondeggia":4,"w":[0.23,0.1]},{"x":293,"y":409.2,"sale":67.2,"ondeggia":-2,"w":[0.27,0.1]},{"x":297,"y":409.2,"sale":67.2,"ondeggia":3,"w":[0.31,0.1]},{"x":292,"y":409.2,"sale":67.2,"ondeggia":-4,"w":[0.35,0.1]}],"esce":null,"entra":{"w":[0.67,0.11],"dx":180,"dy":-40},"immergi":[0.03,0.1],"emergi":[0.5,0.08],"segno":[0.6,0.05],"attacca":[0.86,0.03],"gonfia":[0.9,0.1]},{"nome":"Camera nuova","bolle":[{"x":351.2,"y":408.8,"sale":66.8,"ondeggia":3,"w":[0.15,0.1]},{"x":316.8,"y":409.9,"sale":67.9,"ondeggia":-4,"w":[0.172,0.1]},{"x":276.7,"y":408,"sale":66,"ondeggia":4,"w":[0.194,0.1]},{"x":246,"y":403.4,"sale":61.4,"ondeggia":-3,"w":[0.216,0.1]},{"x":351.2,"y":408.8,"sale":66.8,"ondeggia":3,"w":[0.238,0.1]},{"x":316.8,"y":409.9,"sale":67.9,"ondeggia":-4,"w":[0.26,0.1]},{"x":276.7,"y":408,"sale":66,"ondeggia":4,"w":[0.282,0.1]},{"x":246,"y":403.4,"sale":61.4,"ondeggia":-3,"w":[0.304,0.1]},{"x":351.2,"y":408.8,"sale":66.8,"ondeggia":3,"w":[0.326,0.1]},{"x":316.8,"y":409.9,"sale":67.9,"ondeggia":-4,"w":[0.348,0.1]},{"x":276.7,"y":408,"sale":66,"ondeggia":4,"w":[0.37,0.1]},{"x":246,"y":403.4,"sale":61.4,"ondeggia":-3,"w":[0.392,0.1]}],"esce":{"w":[0.67,0.08],"dx":-220,"dy":0},"entra":{"w":[0.76,0.08],"dx":220,"dy":0},"immergi":[0.03,0.1],"emergi":[0.5,0.08],"segno":[0.6,0.05],"attacca":[0.86,0.03],"gonfia":[0.9,0.1]}],"tempi":{"inizio":300,"camera":6500,"servi":420,"arriva":480,"cameraV":5500}};
  /* la prova dell'acqua a (M, T, V) — una sola fonte: la usano _rdb_firma.mjs (l'HTML allo stato finale), main.js (via rdb_main.cjs)
     e la prova (firma-prova.mjs). T = 1, V = 0 dà gli stessi attributi dell'HTML; T = 0 gli stessi pixel dell'attesa (il CSS).
     La camera d'aria sgonfia appesa al gancio sopra il lavandino scende nell'acqua, dal buco escono le bollicine, risale, il gesso
     segna il punto; poi la toppa (o la camera nuova al posto della vecchia), il tubo della pompa si attacca e la lancetta del
     manometro sale mentre la camera si tende. Col V la camera, le bollicine, il tubo e la lancetta salgono di poco e si spengono;
     la prossima arriva sgonfia. */
  function creaCamera(svg, D) {
    var c01 = function (t) { return Math.max(0, Math.min(1, t)); };
    var r1 = function (n) { return Math.round(n * 10) / 10; };
    var r3 = function (n) { return Math.round(n * 1000) / 1000; };
    /* la fine di una fase arriva a 1 esatto (#256) */
    var fase = function (t, w) { return t >= w[0] + w[1] - 1e-9 ? 1 : c01((t - w[0]) / w[1]); };
    var dolce = function (u) { return u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; };
    var esce = function (u) { return 1 - Math.pow(1 - u, 2); };
    var q = function (sel) { return svg.querySelector(sel); };
    var servito = q('.servito');
    var uno = function (cl, m, k) { return q('.' + cl + '[data-m="' + m + '"]' + (k === undefined ? '' : '[data-k="' + k + '"]')); };
    var pezzi = D.modi.map(function (M, m) {
      return {
        camera: uno('ca-camera', m), forma: uno('ca-forma', m), segno: uno('ca-segno', m),
        bolle: M.bolle.map(function (_, k) { return uno('ca-bolla', m, k); }),
        esce: M.esce ? uno('ca-esce', m) : null, entra: uno('ca-entra', m), tubo: uno('ca-tubo', m), lancetta: uno('ca-lancetta', m)
      };
    });
    var sposta = function (el, x, y) { el.setAttribute('transform', 'translate(' + r1(x) + ' ' + r1(y) + ')'); };
    function disegna(m, t, v) {
      var P = pezzi[m], M = D.modi[m], k;
      /* la camera scende nell'acqua e risale (dolce) */
      sposta(P.camera, 0, D.giu * (dolce(fase(t, M.immergi)) - dolce(fase(t, M.emergi))));
      /* sgonfia (schiacciata in altezza intorno al suo centro) finché la pompa non la gonfia */
      var s = D.sgonfia + (1 - D.sgonfia) * dolce(fase(t, M.gonfia));
      P.forma.setAttribute('transform', 'matrix(1 0 0 ' + r3(s) + ' 0 ' + r1(D.cy * (1 - s)) + ')');
      /* le bollicine: salgono dal buco alla superficie, si allargano, compaiono e spariscono */
      for (k = 0; k < P.bolle.length; k++) {
        var B = M.bolle[k], u = fase(t, B.w), su = esce(u);
        var op = u <= 0 || u >= 1 ? 0 : Math.min(1, u / 0.1, (1 - u) / 0.15);
        P.bolle[k].setAttribute('transform', 'translate(' + r1(B.x + B.ondeggia * Math.sin(u * Math.PI * 2)) + ' ' + r1(B.y - B.sale * su) + ') scale(' + r3(1 + 0.8 * su) + ')');
        P.bolle[k].setAttribute('opacity', r3(op));
      }
      /* il gesso segna il punto */
      P.segno.setAttribute('opacity', r3(dolce(fase(t, M.segno))));
      /* la camera vecchia esce di lato (solo «Camera nuova»); entra la toppa o la camera nuova */
      if (P.esce) { var e1 = dolce(fase(t, M.esce.w)); sposta(P.esce, M.esce.dx * e1, M.esce.dy * e1); P.esce.setAttribute('opacity', r3(1 - e1)); }
      var e2 = dolce(fase(t, M.entra.w));
      sposta(P.entra, M.entra.dx * (1 - e2), M.entra.dy * (1 - e2));
      P.entra.setAttribute('opacity', r3(e2));
      /* il tubo della pompa si attacca alla valvola, la lancetta sale */
      P.tubo.setAttribute('opacity', r3(dolce(fase(t, M.attacca))));
      P.lancetta.setAttribute('transform', 'rotate(' + r1(D.giro * dolce(fase(t, M.gonfia))) + ' ' + D.gx + ' ' + D.gy + ')');
      /* col V la scena sale di poco e si spegne; la prossima arriva */
      servito.setAttribute('transform', 'translate(0 ' + r1(D.via * v) + ')');
      servito.setAttribute('opacity', r3(1 - Math.abs(v)));
    }
    var completo = !!servito && pezzi.every(function (P, m) { return P.camera && P.forma && P.segno && P.entra && P.tubo && P.lancetta && (!D.modi[m].esce || P.esce) && P.bolle.every(Boolean); });
    return { disegna: disegna, pezzi: pezzi, completo: completo };
  }

  var prendi = function (id) { return document.getElementById(id); };
  var figuraF = prendi('camera-firma'), svgF = prendi('cameraSvg'), leggiF = prendi('cameraLeggi');
  var CAMERA = svgF ? creaCamera(svgF, DATI) : null;
  var BOTTONI = [].slice.call(document.querySelectorAll('.camera__modi button[data-modo]'));
  var TF = DATI.tempi;
  var faseF = 'fatta', modoF = '', rafF = 0, guardiaF = 0, larghezzaAvvioF = 0, corseF = 0, pianoF = null;
  var MF = 0, TT = 1, VF = 0;
  var destinazioneF = { m: 0 };
  var c01 = function (t) { return Math.max(0, Math.min(1, t)); };
  var CURVE = {
    dolce: function (u) { return u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; },
    lineare: function (u) { return u; }
  };
  function annunciaF(m) {
    var el = document.querySelector('.camera__d[data-m="' + m + '"]');
    if (leggiF) leggiF.textContent = el ? el.textContent : '';
  }
  function disegnaF(m, t, v) {
    if (m !== MF || figuraF.getAttribute('data-modo') !== String(m)) {
      MF = m;
      figuraF.setAttribute('data-modo', String(m));
      BOTTONI.forEach(function (bt) { bt.setAttribute('aria-pressed', String(+bt.getAttribute('data-modo') === m)); });
    }
    TT = t; VF = v;
    CAMERA.disegna(m, t, v);
  }
  /* un piano: tratti { da, a, m, x0: {t, v}, x1: {…}, curva } */
  function fotogrammaF(t) {
    var P = pianoF.piano, cur = null;
    for (var i = 0; i < P.length; i++) if (t >= P[i].da) cur = P[i];
    if (!cur) return;
    var q = t < cur.a ? c01((t - cur.da) / Math.max(1, cur.a - cur.da)) : 1, e = CURVE[cur.curva](q), A = cur.x0, B = cur.x1;
    disegnaF(cur.m, A.t + (B.t - A.t) * e, A.v + (B.v - A.v) * e);
  }
  var st2 = function (t, v) { return { t: t, v: v }; };
  function sorvegliaF() { clearTimeout(guardiaF); guardiaF = setTimeout(chiudiF, 1500); }
  function chiudiF() {
    cancelAnimationFrame(rafF); rafF = 0;
    clearTimeout(guardiaF);
    disegnaF(destinazioneF.m, 1, 0);
    /* gli altri modi tornano come nell'HTML (#257) */
    DATI.modi.forEach(function (_, k) { if (k !== destinazioneF.m) CAMERA.disegna(k, 1, 0); });
    CAMERA.disegna(destinazioneF.m, 1, 0);
    if (figuraF) figuraF.setAttribute('data-firma', 'fatta');
    root.classList.remove('firma-attesa');
    faseF = 'fatta';
  }
  /* un gesto durante un'animazione (o nell'attesa): tutto si ferma dov'è (#244); dall'attesa resta la camera sgonfia e appesa */
  function fermaF() {
    cancelAnimationFrame(rafF); rafF = 0;
    clearTimeout(guardiaF);
    if (root.classList.contains('firma-attesa')) { disegnaF(MF, 0, 0); root.classList.remove('firma-attesa'); }
    else disegnaF(MF, TT, VF);
    if (figuraF) figuraF.setAttribute('data-firma', 'fatta');
    faseF = 'fatta';
  }
  function avviaF(modo, piano) {
    cancelAnimationFrame(rafF); rafF = 0;
    modoF = modo; pianoF = piano;
    root.classList.remove('firma-attesa');
    faseF = 'corre'; if (figuraF) figuraF.setAttribute('data-firma', 'corre');
    larghezzaAvvioF = window.innerWidth;
    var t0 = null, corsa = ++corseF;
    function fotogramma(ts) {
      rafF = 0;
      /* un fotogramma rimasto in coda dopo la chiusura (o di una corsa vecchia) non riapre niente */
      if (faseF !== 'corre' || corsa !== corseF) return;
      if (t0 === null) t0 = ts;
      var t = ts - t0;
      fotogrammaF(t);
      if (t >= pianoF.fine) { chiudiF(); return; }
      sorvegliaF();
      rafF = requestAnimationFrame(fotogramma);
    }
    sorvegliaF();
    rafF = requestAnimationFrame(fotogramma);
  }
  function avviaIntroF() {
    /* dalla classe d'attesa agli attributi senza cambiare un pixel: la camera sgonfia e appesa */
    disegnaF(0, 0, 0);
    destinazioneF = { m: 0 };
    var P = [{ da: 0, a: TF.inizio, m: 0, x0: st2(0, 0), x1: st2(0, 0), curva: 'lineare' }, { da: TF.inizio, a: TF.inizio + TF.camera, m: 0, x0: st2(0, 0), x1: st2(1, 0), curva: 'lineare' }];
    avviaF('intro', { piano: P, fine: TF.inizio + TF.camera });
  }
  /* il gesto: scegliere che cosa guardare. Se è quello che si sta già facendo, niente; altrimenti tutto si ferma dov'è,
     la scena scende e si spegne, arriva dall'alto la prossima, vuota, e si rifà da capo. */
  function sceltaF(m) {
    if (faseF === 'corre' && destinazioneF.m === m) return;
    if (faseF === 'corre' || root.classList.contains('firma-attesa')) fermaF();
    destinazioneF = { m: m };
    annunciaF(m);
    if (reducedMotion) { chiudiF(); return; }
    var P = [], t = 0, mm = MF, a = st2(TT, VF);
    var passo = function (dura, m2, b, curva) { P.push({ da: t, a: t + dura, m: m2, x0: a, x1: b, curva: curva }); t += dura; a = b; };
    if (a.v >= 0) {
      passo(TF.servi, mm, st2(a.t, 1), 'dolce');
      a = st2(0, -1);
    }
    passo(TF.arriva, m, st2(0, 0), 'dolce');
    passo(TF.cameraV, m, st2(1, 0), 'lineare');
    avviaF('prepara', { piano: P, fine: t });
  }

  /* la testata segna la sezione in cui ti trovi */
  var linkVoci = [].slice.call(document.querySelectorAll('#mainNav a'));
  var bersagliVoci = linkVoci.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  function aggiornaVoci() {
    var y = (document.getElementById('testata') || { offsetHeight: 80 }).offsetHeight + 40, ora = -1;
    for (var i = 0; i < bersagliVoci.length; i++) { if (bersagliVoci[i] && bersagliVoci[i].getBoundingClientRect().top <= y) ora = i; }
    linkVoci.forEach(function (a, k) { if (k === ora) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
  }
  var tickVoci = 0;
  window.addEventListener('scroll', function () {
    if (tickVoci) return;
    tickVoci = requestAnimationFrame(function () { tickVoci = 0; aggiornaVoci(); });
  }, { passive: true });
  aggiornaVoci();

  /* lo stato degli orari anche sopra la tabella */
  function copiaStato() {
    var primo = document.getElementById(SITE.hoursStatusId);
    if (!primo) return;
    var aperto = hoursState().open;
    ['orarioStato', 'orarioStato2'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (el !== primo) el.textContent = primo.textContent;
      el.classList.toggle('is-aperto', aperto);
    });
  }
  copiaStato();
  setInterval(copiaStato, 60000);
  /* la copia segue lo stato principale a ogni cambio, anche di lingua (#243, stato-lingua-check) */
  (function () {
    var primoS = document.getElementById(SITE.hoursStatusId);
    if (primoS && window.MutationObserver) new MutationObserver(copiaStato).observe(primoS, { childList: true, characterData: true, subtree: true });
  })();

  /* la firma è «in vista» quando se ne vede almeno il 60% (o il 60% della finestra, se è più alta della finestra); l'altezza è quella
     del documento: all'avvio innerHeight di un telefono può non essere ancora quella vera (#233) */
  function altezzaVista() { return document.documentElement.clientHeight || window.innerHeight || 800; }
  function abbastanza(top, bottom, alto, vh) { return Math.min(bottom, vh) - Math.max(top, 0) >= 0.6 * Math.min(alto, vh); }
  function inVistaF() { var r = svgF.getBoundingClientRect(); return abbastanza(r.top, r.bottom, r.height, altezzaVista()); }

  if (figuraF && svgF && CAMERA && CAMERA.completo && BOTTONI.length === DATI.modi.length) {
    try { clearTimeout(window.__attesaCamera); } catch (e) {}
    window.__camera = {
      stato: function () {
        return { fase: faseF, modo: modoF, corse: corseF, m: MF, t: TT, v: VF, meta: destinazioneF.m };
      },
      tempi: TF,
    };
    var daFareF = !reducedMotion && root.classList.contains('firma-attesa');
    /* la pagina aperta su una sezione (#orari): il browser ci scorre dopo, la firma non si vedrebbe */
    var ancoraF = location.hash && location.hash.length > 1 && location.hash !== '#inizio';
    var inVista = inVistaF();
    /* perché la firma è partita o no (lo legge il check) */
    window.__camera.avvio = { daFare: daFareF, ancora: !!ancoraF, inVista: inVista, top: svgF.getBoundingClientRect().top, vh: altezzaVista() };
    if (!daFareF || ancoraF) chiudiF();
    else if (inVista) avviaIntroF();
    else if ('IntersectionObserver' in window) {
      /* la firma sotto la piega (sul telefono): parte quando se ne vede abbastanza; fino ad allora resta la camera sgonfia e appesa */
      var soglie = []; for (var sg = 0; sg <= 20; sg++) soglie.push(sg / 20);
      var ioF = new IntersectionObserver(function (voci) {
        if (!voci.some(function (v) { return v.isIntersecting && abbastanza(v.boundingClientRect.top, v.boundingClientRect.bottom, v.boundingClientRect.height, altezzaVista()); })) return;
        ioF.disconnect();
        if (faseF === 'fatta' && root.classList.contains('firma-attesa')) avviaIntroF();
      }, { threshold: soglie });
      ioF.observe(svgF);
      window.__camera.avvio.aspetta = true;
    } else chiudiF();
    /* un resize chiude la firma solo se cambia la LARGHEZZA (sul telefono arrivano resize della sola altezza, #228) */
    window.addEventListener('resize', function () {
      if (faseF !== 'corre' || Math.abs(window.innerWidth - larghezzaAvvioF) <= 1) return;
      chiudiF();
    });
    BOTTONI.forEach(function (b) { b.addEventListener('click', function () { sceltaF(+b.getAttribute('data-modo')); }); });
  }
})();
