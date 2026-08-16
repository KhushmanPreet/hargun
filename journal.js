/* ============================================================
   JOURNAL — grouped into projects

   Desktop : one composition at a time, click anywhere = forward.
             Project list top-left: visible on arrival, hides on
             first click, returns when the pointer nears it.
   Phone   : every entry becomes a row in one vertical scroll,
             with a fixed project label bottom-right.
   ============================================================ */

   (function () {
    'use strict';
    console.log("THIS IS THE NEW JOURNAL.JS");
    /* ------------------------------------------------------------
       1. YOUR PROJECTS — the only thing you edit.
  
       Each project has a name and a list of entries. Each entry is
       one click-step on desktop, one row on phone.
  
         photos  array of image paths (1 or more, laid out in a row)
         size    'fit'  fills the whole zone
                 'xl' 87.5% | 'l' 75% | 'm' 55% | 's' 30%
         zone    'full'   full width
                 'left' / 'right'   half width — put two adjacent
                 entries on opposite sides and they pair into one
                 row on phone, side by side
         align   'left|center|right' + '-' + 'top|center|bottom'
         gap     'none' | 's' | 'm' | 'l'
  
       Anything you leave out falls back to DEFAULTS below.
       ------------------------------------------------------------ */
  
    var PROJECTS = [
      {
        name: 'Infrared Testament',
        entries: [
          { photos: ['allProject/journal/infraredtestament/1.webp'], size: 'fit', gap: 'l' },
          { photos: ['allProject/journal/infraredtestament/2.webp','allProject/journal/infraredtestament/3.webp', 'allProject/journal/infraredtestament/4.webp'], size: 'l', gap: 'l' },
          { photos: ['allProject/journal/infraredtestament/5.webp'], size: 'fit', align: 'center-center' },
          { photos: ['allProject/journal/infraredtestament/6.webp'], size: 'fit', align: 'right-center' },
          { photos: ['allProject/journal/infraredtestament/7.webp', 'allProject/journal/infraredtestament/8.webp'], size: 'l', gap: "l",  align: 'left-center' },
        ]
      },
      {
        name: 'No Saint',
        entries: [
          { photos: ['allProject/journal/nosaint/1.webp'], size: 'fit', align: 'center-center', gap: 'l' },
          { photos: ['allProject/journal/nosaint/2.webp'], size: 'xl',  zone: 'left',  align: 'center-center' },
          { photos: ['allProject/journal/nosaint/3.webp'], size: 'xl', zone: 'right', align: 'center-center' },
          { photos: ['allProject/journal/nosaint/4.webp', 'allProject/journal/nosaint/5.webp'], size: 'l',  align: 'center-center' },
          { photos: ['allProject/journal/nosaint/6.webp'], size: 'l',  zone: 'left',  align: 'center-bottom' },
          { photos: ['allProject/journal/nosaint/7.webp'], size: 'xl',  zone: 'right', align: 'center-center' },
          { photos: ['allProject/journal/nosaint/8.webp'], size: 'fit', gap: 'none' }
        ]
      },
      // {
      //   name: 'Long Way Home',
      //   entries: [
      //     { photos: ['img/journal/11.jpg'], size: 'l',  zone: 'left',  align: 'center-bottom' },
      //     { photos: ['img/journal/12.jpg'], size: 'm',  zone: 'right', align: 'right-top' },
      //     { photos: ['img/journal/13.jpg', 'img/journal/14.jpg', 'img/journal/15.jpg'],
      //       size: 'm', gap: 's' },
      //     { photos: ['img/journal/16.jpg'], size: 'fit', gap: 'none' }
      //   ]
      // }
    ];
  
    var DEFAULTS = {
      size:  'l',
      zone:  'full',
      align: 'center-center',
      gap:   'm'
    };
  
    var SIZES = { s: 0.30, m: 0.55, l: 0.75, xl: 0.875 };
  
    /* Phone row heights, in vw — taken from the reference site. */
    var ROW_LANDSCAPE = 62.5;
    var ROW_PORTRAIT  = 100;
  
    /* How close to the left edge the pointer must come to bring the
       project list back, once it has been dismissed. */
    var MENU_HOTZONE = 300;
  
    /* ------------------------------------------------------------ */
  
    var stage = document.querySelector('.journal');
    if (!stage) return;
  
    var advance  = document.querySelector('.journal__advance');
    var menu     = document.querySelector('.journal__menu');
    var menuList = menu && menu.querySelector('ul');
    var label    = document.querySelector('.journal__project');
    var nowEl    = document.querySelector('.journal__counter-now');
    var totalEl  = document.querySelector('.journal__counter-total');
  
    var narrow = window.matchMedia('(max-width: 768px)');
  
    var layers        = [];
    var entryOf       = [];    // flat index -> { project, entry }
    var index         = 0;
    var observer      = null;
    var labelObserver = null;
    var swapTimer     = null;
    var hasAdvanced   = false;
    var labelName     = null;
    var lastLabelCheck = 0;
  
    function pad(n) { return (n < 10 ? '0' : '') + n; }
  
  
    /* ---------- build ---------- */
  
    function build() {
      var frag = document.createDocumentFragment();
      var flat = 0;
  
      PROJECTS.forEach(function (project, p) {
        project.entries.forEach(function (entry) {
          var layer = document.createElement('section');
          layer.className = 'jl jl--zone-' + (entry.zone  || DEFAULTS.zone) +
                            ' jl--align-'  + (entry.align || DEFAULTS.align) +
                            ' jl--gap-'    + (entry.gap   || DEFAULTS.gap);
          layer.setAttribute('data-size', entry.size || DEFAULTS.size);
          layer.setAttribute('data-project', p);
          layer.setAttribute('data-index', flat);
  
          var row = document.createElement('div');
          row.className = 'jl__assets';
  
          entry.photos.forEach(function (src) {
            var fig = document.createElement('figure');
            fig.className = 'jl__asset';
  
            var img = document.createElement('img');
            img.src = src;
            img.alt = entry.alt || '';
            img.draggable = false;
            img.addEventListener('load', function () {
              setRowHeight(layer);
              measure(layer);
            });
  
            fig.appendChild(img);
            row.appendChild(fig);
          });
  
          layer.appendChild(row);
          frag.appendChild(layer);
  
          entryOf[flat] = { project: p, entry: entry };
          flat++;
        });
      });
  
      stage.innerHTML = '';
      stage.appendChild(frag);
      layers = Array.prototype.slice.call(stage.children);
  
      if (totalEl) totalEl.textContent = pad(layers.length);
    }
  
    function buildMenu() {
      if (!menuList) return;
  
      PROJECTS.forEach(function (project, p) {
        var li  = document.createElement('li');
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = project.name;
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          jumpToProject(p);
        });
        li.appendChild(btn);
        menuList.appendChild(li);
      });
    }
  
    function firstIndexOfProject(p) {
      for (var i = 0; i < entryOf.length; i++) {
        if (entryOf[i].project === p) return i;
      }
      return 0;
    }
  
    function markMenu() {
      if (!menuList) return;
      var current = entryOf[index] ? entryOf[index].project : 0;
      Array.prototype.forEach.call(menuList.children, function (li, p) {
        li.classList.toggle('is-current', p === current);
      });
    }
  
  
    /* ---------- phone row height ---------- */
  
    function setRowHeight(layer) {
      var img = layer.querySelector('img');
      var ar  = (img && img.naturalWidth && img.naturalHeight)
                  ? img.naturalWidth / img.naturalHeight
                  : 1.5;
      layer.style.setProperty('--row-h', (ar > 1.05 ? ROW_LANDSCAPE : ROW_PORTRAIT) + 'vw');
    }
  
    function setRowHeights() { layers.forEach(setRowHeight); }
  
  
    /* ---------- sizing ---------- */
  
    function measure(layer) {
      var row  = layer.querySelector('.jl__assets');
      var imgs = row.querySelectorAll('img');
      if (!imgs.length) return;
  
      var cs = getComputedStyle(layer);
      var availW = layer.clientWidth  - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      var availH = layer.clientHeight - parseFloat(cs.paddingTop)  - parseFloat(cs.paddingBottom);
      if (availW <= 0 || availH <= 0) return;
  
      var sumAR = 0;
      for (var i = 0; i < imgs.length; i++) {
        var w = imgs[i].naturalWidth, h = imgs[i].naturalHeight;
        sumAR += (w && h) ? (w / h) : 1.5;
      }
  
      var gap  = parseFloat(getComputedStyle(row).columnGap) || 0;
      var gaps = gap * (imgs.length - 1);
  
      var key    = layer.getAttribute('data-size');
      var height = (key === 'fit') ? availH : availH * (SIZES[key] || SIZES.l);
  
      if (height * sumAR + gaps > availW) {
        height = (availW - gaps) / sumAR;
      }
  
      row.style.height = Math.max(0, Math.floor(height)) + 'px';
    }
  
    function measureAll() { layers.forEach(measure); }
  
  
    /* ---------- desktop navigation (forward only) ---------- */
  
    function preload(i) {
      var slot = entryOf[(i + entryOf.length) % entryOf.length];
      if (!slot) return;
      slot.entry.photos.forEach(function (src) { new Image().src = src; });
    }
  
    function show(i) {
      if (!layers.length || narrow.matches) return;
  
      index = (i + layers.length) % layers.length;
  
      layers.forEach(function (layer, n) {
        layer.classList.toggle('is-current', n === index);
      });
  
      measure(layers[index]);
      markMenu();
  
      if (nowEl) nowEl.textContent = pad(index + 1);
      try { history.replaceState(null, '', '?id=' + index); } catch (e) {}
  
      preload(index + 1);
    }
  
    function next() { show(index + 1); }
  
    function jumpToProject(p) {
      hasAdvanced = true;
      show(firstIndexOfProject(p));
      setMenu(false);
    }
  
    function onAdvanceClick() {
      if (!hasAdvanced) { hasAdvanced = true; setMenu(false); }
      next();
    }
  
    function onKey(e) {
      if (narrow.matches) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        onAdvanceClick();
      }
    }
  
  
    /* ---------- menu show / hide ---------- */
  
    function setMenu(open) {
      if (menu) menu.classList.toggle('is-open', !!open);
    }
  
    function onMove(e) {
      if (narrow.matches || !hasAdvanced) return;
      setMenu(e.clientX < MENU_HOTZONE);
    }
  
  
    /* ---------- phone project label ----------
       Driven by an IntersectionObserver with the viewport squeezed to
       a thin band across the middle, so only the row crossing the
       centre line reports in. Deliberately NOT scroll + rAF: if a
       rAF is ever dropped, a throttle flag like that never resets and
       the label freezes for the rest of the session.               */
  
    function setLabelFrom(layer) {
      if (!label || !layer) return;
  
      var name = PROJECTS[+layer.getAttribute('data-project')].name;
      if (name === labelName) return;
  
      labelName = name;
      label.classList.add('is-swapping');
      clearTimeout(swapTimer);
      swapTimer = setTimeout(function () {
        label.textContent = name;
        label.classList.remove('is-swapping');
      }, 200);
    }
  
    /* first paint, before anything has crossed the centre */
    function seedLabel() {
      if (!label || !layers.length) return;
      labelName = null;
      var name = PROJECTS[+layers[0].getAttribute('data-project')].name;
      labelName = name;
      label.textContent = name;
    }
  
    /* whichever row sits closest to the middle of the screen wins */
    function updateLabelFromCentre() {
      if (!label || !layers.length) return;
  
      var mid = window.innerHeight / 2;
      var best = null, bestD = Infinity;
  
      for (var i = 0; i < layers.length; i++) {
        var r = layers[i].getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) continue;
        var d = Math.abs((r.top + r.height / 2) - mid);
        if (d < bestD) { bestD = d; best = layers[i]; }
      }
      setLabelFrom(best);
    }
  
    /* Time-based throttle, not a boolean flag: it can never get stuck
       in the "busy" state, so the label cannot freeze permanently. */
    function onScroll() {
      var now = Date.now();
      if (now - lastLabelCheck < 100) return;
      lastLabelCheck = now;
      updateLabelFromCentre();
    }
  
    function startLabelTracking() {
      stopLabelTracking();
  
      /* Two independent triggers on purpose. Either one alone is
         enough; running both means the label still tracks if a
         browser withholds scroll events or observer callbacks. */
      window.addEventListener('scroll', onScroll, { passive: true });
  
      if ('IntersectionObserver' in window) {
        labelObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) setLabelFrom(en.target);
          });
        }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
  
        layers.forEach(function (l) { labelObserver.observe(l); });
      }
    }
  
    function stopLabelTracking() {
      window.removeEventListener('scroll', onScroll);
      if (labelObserver) { labelObserver.disconnect(); labelObserver = null; }
    }
  
  
    /* ---------- mode switching ---------- */
  
    function stopObserver() {
      if (observer) { observer.disconnect(); observer = null; }
    }
  
    function startPhone() {
      setMenu(false);
      layers.forEach(function (l) { l.classList.remove('is-current'); });
  
      setRowHeights();
      measureAll();
  
      seedLabel();
      startLabelTracking();
      updateLabelFromCentre();
  
      if (!('IntersectionObserver' in window)) {
        layers.forEach(function (l) { l.classList.add('in-view'); });
        return;
      }
  
      stopObserver();
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('in-view');
            observer.unobserve(en.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.02 });
  
      layers.forEach(function (l) { observer.observe(l); });
    }
  
    function startDesktop() {
      stopObserver();
      stopLabelTracking();
      layers.forEach(function (l) { l.classList.remove('in-view'); });
  
      measureAll();
      show(index);
      setMenu(!hasAdvanced);      // visible until the first click
    }
  
    function apply() {
      if (narrow.matches) startPhone();
      else startDesktop();
    }
  
  
    /* ---------- boot ---------- */
  
    function indexFromUrl() {
      var m = /[?&]id=(\d+)/.exec(window.location.search);
      if (!m) return 0;
      var n = parseInt(m[1], 10);
      return (isNaN(n) || n < 0 || n >= entryOf.length) ? 0 : n;
    }
  
    build();
    buildMenu();
    index = indexFromUrl();
  
    if (advance) advance.addEventListener('click', onAdvanceClick);
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousemove', onMove);
  
    var resizeTimer;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (narrow.matches) setRowHeights();
        measureAll();
      }, 90);
    }
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
  
    if (narrow.addEventListener) narrow.addEventListener('change', apply);
    else if (narrow.addListener) narrow.addListener(apply);
  
    apply();
  })();
  