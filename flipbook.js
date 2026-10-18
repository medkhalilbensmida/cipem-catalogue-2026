/**
 * CIPEM Flipbook — Ultra-Realistic 3D Catalogue Book Viewer
 * Utilise PDF.js avec rendu Retina Ultra-HD, animation 3D réaliste avec ombrage dynamique,
 * synthèse sonore de feuilletage Web Audio API et mode Plein Écran.
 */
(function () {
  'use strict';

  /* ─── PDF Source URLs ─────────────────────────────────────────────────────── */
  const PDF_URLS = {
    fr: 'CIPEM - Catalogue Formations 2026 - Premium Visual Edition.pdf',
    en: 'CIPEM - Training Catalogue 2026 - Premium Visual Edition.pdf'
  };

  /* ─── State ───────────────────────────────────────────────────────────────── */
  const fb = {
    pdf: null,
    N: 0,            // Total PDF pages
    totalSpreads: 0, // Total spreads
    spread: 0,       // Current spread index (0-based)
    pageW: 420,      // Display width per page in px (A4 portrait)
    pageH: 594,      // Display height per page in px (A4 portrait ratio 1:1.4142)
    animating: false,
    loaded: false,
    thumbsDone: false,
    lang: 'fr',
    soundEnabled: true,
    cache: {}        // Pre-rendered canvas cache { pageNum: HTMLCanvasElement }
  };

  /* ─── DOM References ──────────────────────────────────────────────────────── */
  let elScene, elBook, elLeft, elRight, elFlip, elFlipFront, elFlipBack;
  let elPrev, elNext, elFirst, elLast, elCounter, elFill, elLoading, elLoadingText, elThumbsScroll;
  let elCastShadow, elShadeFront, elShadeBack, elSoundBtn, elSoundIcon, elFullscreenBtn;

  function isSinglePage() {
    return window.innerWidth < 768;
  }

  function lPage(k) { return k === 0 ? 0 : 2 * k; }
  function rPage(k) { const p = 2 * k + 1; return p <= fb.N ? p : 0; }
  function calcTotal(N) { return isSinglePage() ? N : (Math.floor(N / 2) + 1); }

  /* ─── Web Audio API: Realistic Paper Turn Sound ───────────────────────────── */
  function playPaperSound() {
    if (!fb.soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      const duration = 0.22;
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      let last = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (last + (0.025 * white)) / 1.025;
        last = data[i];
        data[i] *= 3.8;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.Q.setValueAtTime(0.75, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.onended = () => { ctx.close().catch(() => {}); };
    } catch (e) {}
  }

  /* ─── High-Definition PDF Rendering (Retina Sharpness) ────────────────────── */
  async function renderPageToCanvas(canvas, pageNum) {
    const ctx = canvas.getContext('2d');

    if (!pageNum || pageNum < 1 || pageNum > fb.N) {
      canvas.width = fb.pageW * 2;
      canvas.height = fb.pageH * 2;
      canvas.style.width = fb.pageW + 'px';
      canvas.style.height = fb.pageH + 'px';

      ctx.fillStyle = '#fbf7ee';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(180, 145, 95, 0.08)';
      ctx.lineWidth = 1.5;
      for (let y = 60; y < canvas.height; y += 45) {
        ctx.beginPath();
        ctx.moveTo(50, y);
        ctx.lineTo(canvas.width - 50, y);
        ctx.stroke();
      }

      ctx.font = '600 28px sans-serif';
      ctx.fillStyle = 'rgba(180, 145, 95, 0.12)';
      ctx.textAlign = 'center';
      ctx.fillText('CIPEM 2026', canvas.width / 2, canvas.height / 2);
      return;
    }

    if (fb.cache[pageNum]) {
      const cached = fb.cache[pageNum];
      canvas.width = cached.width;
      canvas.height = cached.height;
      canvas.style.width = fb.pageW + 'px';
      canvas.style.height = fb.pageH + 'px';
      ctx.drawImage(cached, 0, 0);
      return;
    }

    try {
      const page = await fb.pdf.getPage(pageNum);
      const baseVp = page.getViewport({ scale: 1 });
      const cssScale = fb.pageH / baseVp.height;

      // Ultra-HD Retina scale (at least 2.2x to guarantee crystal-clear, sharp text)
      const dpr = Math.max(window.devicePixelRatio || 1, 2) * 1.35;
      const renderVp = page.getViewport({ scale: cssScale * dpr });

      canvas.width = Math.round(renderVp.width);
      canvas.height = Math.round(renderVp.height);
      canvas.style.width = fb.pageW + 'px';
      canvas.style.height = fb.pageH + 'px';

      await page.render({
        canvasContext: ctx,
        viewport: renderVp
      }).promise;

      const offscreen = document.createElement('canvas');
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
      offscreen.getContext('2d').drawImage(canvas, 0, 0);
      fb.cache[pageNum] = offscreen;

    } catch (err) {
      console.error('[Flipbook] Error rendering page', pageNum, err);
    }
  }

  /* ─── Sizing & Layout Calculation ─────────────────────────────────────────── */
  function computeDimensions() {
    const isFull = elScene && elScene.classList.contains('is-fullscreen');
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const single = isSinglePage();

    fb.totalSpreads = calcTotal(fb.N);
    if (fb.spread >= fb.totalSpreads) fb.spread = fb.totalSpreads - 1;

    let availW;
    let screenH;

    if (isFull) {
      availW = Math.max(winW - 32, 280);
      screenH = Math.max(winH - 120, 360);
    } else {
      const containerW = Math.min(winW, 1200);
      const isMobile = winW < 640;
      const pad = isMobile ? 24 : (winW < 992 ? 40 : 64);
      availW = Math.max(containerW - pad, 260);
      screenH = isMobile ? Math.min(winH * 0.72, 540) : Math.min(winH * 0.72, 600);
    }

    let targetPageW, targetPageH;

    if (single) {
      targetPageW = Math.min(availW, 460);
      targetPageH = Math.round(targetPageW * 1.4142);
      if (targetPageH > screenH) {
        targetPageH = Math.round(screenH);
        targetPageW = Math.floor(targetPageH / 1.4142);
      }
    } else {
      targetPageW = Math.floor(availW / 2);
      targetPageH = Math.round(targetPageW * 1.4142);
      if (targetPageH > screenH) {
        targetPageH = Math.round(screenH);
        targetPageW = Math.floor(targetPageH / 1.4142);
      }
    }

    fb.pageW = Math.max(targetPageW, 140);
    fb.pageH = Math.max(targetPageH, 198);

    if (elLeft && elLeft.parentElement) {
      elLeft.parentElement.style.width = fb.pageW + 'px';
      elLeft.parentElement.style.height = fb.pageH + 'px';
      elLeft.parentElement.style.display = single ? 'none' : 'block';
    }
    const spineEl = document.getElementById('fbSpine');
    if (spineEl) spineEl.style.display = single ? 'none' : 'block';

    const edgeLeft = document.querySelector('.fb-edge-stack.left');
    if (edgeLeft) edgeLeft.style.display = single ? 'none' : 'block';

    const ribbonEl = document.querySelector('.fb-ribbon');
    if (ribbonEl) ribbonEl.style.display = single ? 'none' : 'block';

    if (elRight && elRight.parentElement) {
      elRight.parentElement.style.width = fb.pageW + 'px';
      elRight.parentElement.style.height = fb.pageH + 'px';
      elRight.parentElement.style.borderRadius = single ? '8px' : '0 4px 4px 0';
    }
    if (elFlip) {
      elFlip.style.width = fb.pageW + 'px';
      elFlip.style.height = fb.pageH + 'px';
    }
  }

  /* ─── Render Spread ───────────────────────────────────────────────────────── */
  async function renderSpread(k) {
    if (isSinglePage()) {
      const pageNum = k + 1;
      await renderPageToCanvas(elRight, pageNum);
    } else {
      await Promise.all([
        renderPageToCanvas(elLeft, lPage(k)),
        renderPageToCanvas(elRight, rPage(k))
      ]);
    }
    updateUI(k);

    setTimeout(() => {
      if (isSinglePage()) {
        const next = k + 2;
        const prev = k;
        [next, prev].forEach(p => {
          if (p > 0 && p <= fb.N && !fb.cache[p]) {
            const temp = document.createElement('canvas');
            renderPageToCanvas(temp, p);
          }
        });
      } else {
        const nextL = lPage(k + 1);
        const nextR = rPage(k + 1);
        const prevL = lPage(k - 1);
        const prevR = rPage(k - 1);
        [nextL, nextR, prevL, prevR].forEach(p => {
          if (p > 0 && p <= fb.N && !fb.cache[p]) {
            const temp = document.createElement('canvas');
            renderPageToCanvas(temp, p);
          }
        });
      }
    }, 150);
  }

  /* ─── UI Status Updates ───────────────────────────────────────────────────── */
  function updateUI(k) {
    let txt = '';
    if (isSinglePage()) {
      const pageNum = k + 1;
      if (pageNum === 1) {
        txt = fb.lang === 'en' ? 'Cover (Page 1 / 56)' : 'Couverture (1 / 56)';
      } else {
        txt = fb.lang === 'en'
          ? ('Page ' + pageNum + ' of ' + fb.N)
          : ('Page ' + pageNum + ' sur ' + fb.N);
      }
    } else {
      const lp = lPage(k);
      const rp = rPage(k);
      if (k === 0) {
        txt = fb.lang === 'en' ? 'Cover' : 'Couverture';
      } else if (rp === 0) {
        txt = fb.lang === 'en' ? ('Page ' + lp + ' (Back cover)') : ('Page ' + lp + ' (Dernière page)');
      } else {
        txt = fb.lang === 'en'
          ? ('Pages ' + lp + '–' + rp + ' of ' + fb.N)
          : ('Pages ' + lp + '–' + rp + ' sur ' + fb.N);
      }
    }

    if (elCounter) elCounter.textContent = txt;

    const pct = fb.totalSpreads > 1 ? (k / (fb.totalSpreads - 1)) * 100 : 0;
    if (elFill) elFill.style.width = pct + '%';

    if (elPrev) elPrev.disabled = k === 0;
    if (elNext) elNext.disabled = k >= fb.totalSpreads - 1;
    if (elFirst) elFirst.disabled = k === 0;
    if (elLast) elLast.disabled = k >= fb.totalSpreads - 1;

    if (elThumbsScroll) {
      const activeThumb = elThumbsScroll.querySelector('.fb-thumb[data-spread="' + k + '"]');
      elThumbsScroll.querySelectorAll('.fb-thumb').forEach(t => t.classList.remove('active'));
      if (activeThumb) {
        activeThumb.classList.add('active');
        activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }

  /* ─── 3D Page Turn Engine ─────────────────────────────────────────────────── */
  async function doFlip(direction) {
    if (fb.animating) return;

    const next = fb.spread + (direction === 'fwd' ? 1 : -1);
    if (next < 0 || next >= fb.totalSpreads) return;

    fb.animating = true;
    playPaperSound();

    if (isSinglePage()) {
      try {
        if (elRight) {
          elRight.style.transition = 'opacity 0.18s ease, transform 0.18s ease';
          elRight.style.opacity = '0.35';
          elRight.style.transform = direction === 'fwd' ? 'translateX(-12px)' : 'translateX(12px)';
        }
        await renderSpread(next);
        if (elRight) {
          elRight.style.opacity = '1';
          elRight.style.transform = 'translateX(0)';
        }
        fb.spread = next;
        updateUI(next);
      } finally {
        setTimeout(() => {
          if (elRight) {
            elRight.style.transition = 'none';
            elRight.style.transform = 'none';
          }
          fb.animating = false;
        }, 180);
      }
      return;
    }

    const spineEl = document.getElementById('fbSpine');
    const spineW = spineEl ? spineEl.offsetWidth : 18;

    try {
      if (direction === 'fwd') {
        const currR = rPage(fb.spread);
        const nextL = lPage(next);
        const nextR = rPage(next);

        await Promise.all([
          renderPageToCanvas(elFlipFront, currR),
          renderPageToCanvas(elFlipBack, nextL)
        ]);

        await renderPageToCanvas(elRight, nextR);

        elFlip.style.left = (fb.pageW + spineW) + 'px';
        elFlip.style.width = fb.pageW + 'px';
        elFlip.style.height = fb.pageH + 'px';
        elFlip.style.transformOrigin = 'left center';
        elFlip.style.transform = 'rotateY(0deg)';
        elFlip.style.visibility = 'visible';

        await animateFlipForward();

        await renderPageToCanvas(elLeft, nextL);

      } else {
        const currL = lPage(fb.spread);
        const prevR = rPage(next);
        const prevL = lPage(next);

        await Promise.all([
          renderPageToCanvas(elFlipFront, currL),
          renderPageToCanvas(elFlipBack, prevR)
        ]);

        await renderPageToCanvas(elLeft, prevL);

        elFlip.style.left = '0px';
        elFlip.style.width = fb.pageW + 'px';
        elFlip.style.height = fb.pageH + 'px';
        elFlip.style.transformOrigin = 'right center';
        elFlip.style.transform = 'rotateY(0deg)';
        elFlip.style.visibility = 'visible';

        await animateFlipBackward();

        await renderPageToCanvas(elRight, prevR);
      }

      fb.spread = next;
      updateUI(next);

    } finally {
      elFlip.style.visibility = 'hidden';
      elFlip.style.transition = 'none';
      elFlip.style.transform = 'rotateY(0deg)';
      if (elCastShadow) elCastShadow.style.opacity = '0';
      if (elShadeFront) elShadeFront.style.opacity = '0';
      if (elShadeBack) elShadeBack.style.opacity = '0';
      fb.animating = false;
    }
  }

  function animateFlipForward() {
    return new Promise(resolve => {
      void elFlip.offsetHeight;

      if (elCastShadow) {
        elCastShadow.style.transition = 'opacity 0.3s ease';
        elCastShadow.style.opacity = '0.35';
      }
      if (elShadeFront) {
        elShadeFront.style.transition = 'opacity 0.25s linear';
        elShadeFront.style.opacity = '0.4';
      }

      elFlip.style.transition = 'transform 0.62s cubic-bezier(0.45, 0.05, 0.25, 1.0)';
      elFlip.style.transform = 'rotateY(-180deg)';

      setTimeout(() => {
        if (elShadeFront) elShadeFront.style.opacity = '0';
        if (elShadeBack) {
          elShadeBack.style.transition = 'opacity 0.3s ease';
          elShadeBack.style.opacity = '0.35';
        }
      }, 260);

      setTimeout(() => {
        if (elCastShadow) elCastShadow.style.opacity = '0';
        if (elShadeBack) elShadeBack.style.opacity = '0';
      }, 480);

      elFlip.addEventListener('transitionend', function h() {
        elFlip.removeEventListener('transitionend', h);
        resolve();
      }, { once: true });
    });
  }

  function animateFlipBackward() {
    return new Promise(resolve => {
      void elFlip.offsetHeight;

      elFlip.style.transition = 'transform 0.62s cubic-bezier(0.45, 0.05, 0.25, 1.0)';
      elFlip.style.transform = 'rotateY(180deg)';

      if (elShadeFront) {
        elShadeFront.style.transition = 'opacity 0.25s linear';
        elShadeFront.style.opacity = '0.4';
      }

      setTimeout(() => {
        if (elShadeFront) elShadeFront.style.opacity = '0';
        if (elShadeBack) {
          elShadeBack.style.transition = 'opacity 0.3s ease';
          elShadeBack.style.opacity = '0.35';
        }
      }, 260);

      setTimeout(() => {
        if (elShadeBack) elShadeBack.style.opacity = '0';
      }, 480);

      elFlip.addEventListener('transitionend', function h() {
        elFlip.removeEventListener('transitionend', h);
        resolve();
      }, { once: true });
    });
  }

  async function goToSpread(target) {
    if (fb.animating || target === fb.spread) return;
    if (target < 0 || target >= fb.totalSpreads) return;

    if (Math.abs(target - fb.spread) === 1) {
      await doFlip(target > fb.spread ? 'fwd' : 'bwd');
    } else {
      playPaperSound();
      fb.spread = target;
      await renderSpread(target);
    }
  }

  async function buildThumbs() {
    if (fb.thumbsDone || !elThumbsScroll) return;
    fb.thumbsDone = true;
    elThumbsScroll.innerHTML = '';

    const single = isSinglePage();
    for (let k = 0; k < fb.totalSpreads; k++) {
      let pageToRender;
      let labelText;

      if (single) {
        pageToRender = k + 1;
        labelText = k === 0 ? (fb.lang === 'en' ? 'Cover' : 'Couv.') : ('p.' + (k + 1));
      } else {
        const rp = rPage(k);
        const lp = lPage(k);
        pageToRender = (k === 0 || !lp) ? (rp || 1) : lp;
        labelText = k === 0 ? (fb.lang === 'en' ? 'Cover' : 'Couv.') : (rp ? (lp + '–' + rp) : ('' + lp));
      }

      const item = document.createElement('div');
      item.className = 'fb-thumb' + (k === fb.spread ? ' active' : '');
      item.dataset.spread = k;

      const canvas = document.createElement('canvas');
      canvas.width = 46;
      canvas.height = 65;
      canvas.style.width = '46px';
      canvas.style.height = '65px';

      const label = document.createElement('span');
      label.className = 'fb-thumb-label';
      label.textContent = labelText;

      item.appendChild(canvas);
      item.appendChild(label);
      elThumbsScroll.appendChild(item);

      item.addEventListener('click', () => goToSpread(k));

      (async (p, c) => {
        try {
          const page = await fb.pdf.getPage(p);
          const vp = page.getViewport({ scale: 65 / page.getViewport({ scale: 1 }).height });
          c.width = Math.round(vp.width);
          c.height = Math.round(vp.height);
          await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
        } catch (e) {}
      })(pageToRender, canvas);
    }
  }

  function setupEvents() {
    if (elPrev) elPrev.onclick = () => doFlip('bwd');
    if (elNext) elNext.onclick = () => doFlip('fwd');
    if (elFirst) elFirst.onclick = () => goToSpread(0);
    if (elLast) elLast.onclick = () => goToSpread(fb.totalSpreads - 1);

    const leftContainer = document.getElementById('fbPageLeft');
    const rightContainer = document.getElementById('fbPageRight');
    if (leftContainer) {
      leftContainer.title = fb.lang === 'en' ? 'Click to flip back' : 'Cliquer pour reculer';
      leftContainer.onclick = () => doFlip('bwd');
    }
    if (rightContainer) {
      rightContainer.title = fb.lang === 'en' ? 'Click to flip forward' : 'Cliquer pour avancer';
      rightContainer.onclick = () => doFlip('fwd');
    }

    if (elSoundBtn) {
      elSoundBtn.title = fb.soundEnabled
        ? (fb.lang === 'en' ? 'Page flip sound effect (Enabled)' : 'Effet sonore de feuilletage (Activé)')
        : (fb.lang === 'en' ? 'Page flip sound effect (Muted)' : 'Effet sonore de feuilletage (Muet)');
      elSoundBtn.onclick = () => {
        fb.soundEnabled = !fb.soundEnabled;
        elSoundBtn.title = fb.soundEnabled
          ? (fb.lang === 'en' ? 'Page flip sound effect (Enabled)' : 'Effet sonore de feuilletage (Activé)')
          : (fb.lang === 'en' ? 'Page flip sound effect (Muted)' : 'Effet sonore de feuilletage (Muet)');
        if (elSoundIcon) {
          elSoundIcon.innerHTML = fb.soundEnabled
            ? '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>'
            : '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>';
        }
      };
    }

    if (elFullscreenBtn) {
      elFullscreenBtn.onclick = toggleFullscreen;
    }

    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'ArrowRight') {
        const sec = document.getElementById('flipbook');
        if (sec && isElementInViewport(sec)) doFlip('fwd');
      } else if (e.key === 'ArrowLeft') {
        const sec = document.getElementById('flipbook');
        if (sec && isElementInViewport(sec)) doFlip('bwd');
      } else if (e.key === 'Escape' && elScene && elScene.classList.contains('is-fullscreen')) {
        toggleFullscreen();
      }
    });

    /* Touch Swipe for Mobile & Tablets */
    let touchStartX = 0;
    let touchStartY = 0;
    const bookOuter = document.querySelector('.fb-book-outer') || elBook;
    if (bookOuter) {
      bookOuter.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      bookOuter.addEventListener('touchend', (e) => {
        if (e.changedTouches && e.changedTouches.length === 1) {
          const diffX = e.changedTouches[0].clientX - touchStartX;
          const diffY = e.changedTouches[0].clientY - touchStartY;
          if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX < 0) doFlip('fwd');
            else doFlip('bwd');
          }
        }
      }, { passive: true });
    }

    window.addEventListener('resize', debounce(() => {
      computeDimensions();
      renderSpread(fb.spread);
    }, 250));
  }

  function toggleFullscreen() {
    if (!elScene) return;
    elScene.classList.toggle('is-fullscreen');
    computeDimensions();
    renderSpread(fb.spread);
  }

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  function debounce(fn, ms) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  function setLoading(show) {
    if (!elLoading) return;
    if (show) elLoading.classList.remove('fb-hidden');
    else elLoading.classList.add('fb-hidden');
  }

  async function initFlipbook(lang) {
    fb.lang = lang || 'fr';
    fb.cache = {};

    elScene = document.getElementById('fbScene');
    elBook = document.getElementById('fbBook');
    elLeft = document.getElementById('fbLeft');
    elRight = document.getElementById('fbRight');
    elFlip = document.getElementById('fbFlip');
    elFlipFront = document.getElementById('fbFlipFront');
    elFlipBack = document.getElementById('fbFlipBack');
    elCastShadow = document.getElementById('fbCastShadow');
    elShadeFront = document.getElementById('fbShadeFront');
    elShadeBack = document.getElementById('fbShadeBack');

    elPrev = document.getElementById('fbPrev');
    elNext = document.getElementById('fbNext');
    elFirst = document.getElementById('fbFirst');
    elLast = document.getElementById('fbLast');
    elCounter = document.getElementById('fbCounter');
    elFill = document.getElementById('fbProgressFill');
    elLoading = document.getElementById('fbLoading');
    elLoadingText = document.getElementById('fbLoadingText');
    elThumbsScroll = document.getElementById('fbThumbsScroll');
    elSoundBtn = document.getElementById('fbSoundBtn');
    elSoundIcon = document.getElementById('fbSoundIcon');
    elFullscreenBtn = document.getElementById('fbFullscreenBtn');

    if (!elLeft || !elRight) return;

    setLoading(true);
    if (elLoadingText) {
      elLoadingText.textContent = fb.lang === 'en'
        ? 'Loading high-definition catalogue...'
        : 'Chargement du catalogue haute définition...';
    }

    try {
      if (!window.pdfjsLib) throw new Error('PDF.js not available');

      pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

      const url = PDF_URLS[fb.lang] || PDF_URLS.fr;
      const task = pdfjsLib.getDocument(url);
      fb.pdf = await task.promise;
      fb.N = fb.pdf.numPages;
      fb.totalSpreads = calcTotal(fb.N);
      fb.spread = 0;
      fb.thumbsDone = false;

      computeDimensions();

      await renderSpread(0);
      setLoading(false);
      fb.loaded = true;

      setupEvents();

      setTimeout(() => buildThumbs(), 400);

    } catch (err) {
      console.error('[Flipbook] Error loading PDF:', err);
      setLoading(false);
      if (elLoading) {
        elLoading.classList.remove('fb-hidden');
        elLoading.innerHTML = '<span style="color:#f97316; font-weight:600;">Erreur de chargement du PDF.</span>';
      }
    }
  }

  window.reloadFlipbookForLang = async function (lang) {
    if (!document.getElementById('fbLeft')) return;
    fb.loaded = false;
    fb.thumbsDone = false;
    fb.pdf = null;
    fb.spread = 0;
    fb.lang = lang;
    await initFlipbook(lang);
  };

  document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('flipbook');
    if (!section) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !fb.loaded) {
          io.disconnect();
          const lang = localStorage.getItem('cipem_lang') || 'fr';
          initFlipbook(lang);
        }
      });
    }, { rootMargin: '300px' });

    io.observe(section);
  });

})();
