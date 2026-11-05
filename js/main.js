/* =====================================================================
   Sumangal Bhattacharya — Portfolio | main.js
   Animations: aurora, floating math symbols, typing, counters, reveal,
   tilt, magnetic buttons, marquee, progress bar, gallery + lightbox.
   ===================================================================== */

(function () {
  'use strict';

  /* ---------- DOM ready ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    buildMathField();
    initNav();
    initProgressBar();
    initReveal();
    initTilt();
    initMagnetic();
    initTyping();
    initCounters();
    initSkillBars();
    initToTop();
    initGallery();
    initSlider();
    initLightbox();
    setYear();
  });

  /* ---------- floating math symbols ---------- */
  function buildMathField() {
    var field = document.getElementById('mathfield');
    if (!field) return;
    var syms = ['\u2211', '\u222B', '\u03C0', '\u03C3', '\u03BB', '\u03BC',
      '\u221E', '\u221A', '\u0394', '\u2202', '\u03B8', '\u2295',
      'x\u00B2', '\u2260', '\u2264', '\u2297', '\u2192', '\u2225'];
    var count = 22;
    for (var i = 0; i < count; i++) {
      var s = document.createElement('i');
      s.textContent = syms[i % syms.length];
      s.style.left = (Math.random() * 100) + 'vw';
      s.style.fontSize = (18 + Math.random() * 30) + 'px';
      var dur = 18 + Math.random() * 26;
      s.style.animationDuration = dur + 's';
      s.style.animationDelay = (-Math.random() * dur) + 's';
      field.appendChild(s);
    }
  }

  /* ---------- mobile nav + active link ---------- */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('open');
        toggle.textContent = open ? '\u2715' : '\u2630';
      });
      links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          links.classList.remove('open');
          toggle.textContent = '\u2630';
        });
      });
    }

    var here = (location.pathname.split('/').pop() || 'index.html');
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      var target = a.getAttribute('href');
      if (target === here || (here === '' && target === 'index.html')) {
        a.classList.add('active');
      }
    });

    var header = document.querySelector('.site-header');
    window.addEventListener('scroll', function () {
      if (!header) return;
      header.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* ---------- scroll progress bar ---------- */
  function initProgressBar() {
    var bar = document.querySelector('.progress');
    if (!bar) return;
    window.addEventListener('scroll', function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    }, { passive: true });
  }

  /* ---------- reveal on scroll ---------- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 3D tilt on cards ---------- */
  function initTilt() {
    var cards = document.querySelectorAll('.tilt');
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          'perspective(800px) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ---------- magnetic buttons ---------- */
  function initMagnetic() {
    var btns = document.querySelectorAll('.btn');
    btns.forEach(function (b) {
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.25;
        var y = (e.clientY - r.top - r.height / 2) * 0.25;
        b.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
      b.addEventListener('mouseleave', function () {
        b.style.transform = '';
      });
    });
  }

  /* ---------- typing effect ---------- */
  function initTyping() {
    var el = document.querySelector('.type-wrap');
    if (!el) return;
    var phrases = [
      'Assistant Professor @ NIT Manipur',
      'Copula-based dependence models',
      'Survival & reliability analysis',
      'Bayesian computation',
      'Statistics · Mathematics · ML'
    ];
    var p = 0, c = 0, deleting = false;
    function tick() {
      var cur = phrases[p];
      el.textContent = cur.slice(0, c);
      if (!deleting) {
        c++;
        if (c > cur.length) { deleting = true; setTimeout(tick, 1600); return; }
        setTimeout(tick, 60);
      } else {
        c--;
        if (c < 0) {
          deleting = false;
          p = (p + 1) % phrases.length;
          setTimeout(tick, 350);
          return;
        }
        setTimeout(tick, 30);
      }
    }
    setTimeout(tick, 800);
  }

  /* ---------- animated counters ---------- */
  function initCounters() {
    var nums = document.querySelectorAll('.stat .n[data-count]');
    if (!nums.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseInt(el.getAttribute('data-count'), 10);
        var start = performance.now();
        var dur = 1500;
        function frame(now) {
          var t = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased);
          if (t < 1) requestAnimationFrame(frame);
          else el.textContent = target;
        }
        requestAnimationFrame(frame);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { io.observe(n); });
  }

  /* ---------- skill bars fill ---------- */
  function initSkillBars() {
    var bars = document.querySelectorAll('.sb-fill');
    if (!bars.length) return;
    if (!('IntersectionObserver' in window)) {
      bars.forEach(function (b) { b.style.width = b.getAttribute('data-w') + '%'; });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.width = e.target.getAttribute('data-w') + '%';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(function (b) { io.observe(b); });
  }

  /* ---------- back to top ---------- */
  function initToTop() {
    var btn = document.querySelector('.to-top');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- gallery loader ---------- */
  function initGallery() {
    var grid = document.getElementById('gallery-grid');
    if (!grid || typeof GALLERY_IMAGES === 'undefined') return;

    var countEl = document.querySelector('.gallery-count');
    if (countEl) countEl.textContent = GALLERY_IMAGES.length + ' photographs · Conferences, classrooms, travels & memories';

    GALLERY_IMAGES.forEach(function (img, i) {
      var item = document.createElement('div');
      item.className = 'g-item';
      item.setAttribute('data-idx', i);
      item.tabIndex = 0;

      var pic = document.createElement('img');
      pic.loading = 'lazy';
      pic.alt = img.name;
      pic.src = encodeURI(img.src);
      pic.onerror = function () { item.classList.add('missing'); };

      var cap = document.createElement('div');
      cap.className = 'g-cap';
      cap.innerHTML = '<span>' + escapeHtml(img.name) + '</span><span class="zoom">&#128269;</span>';

      item.appendChild(pic);
      item.appendChild(cap);

      item.addEventListener('click', function () { openLightbox(i); });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); }
      });
      grid.appendChild(item);

      requestAnimationFrame(function () {
        setTimeout(function () { item.classList.add('show'); }, (i % 10) * 40);
      });
    });
  }

  /* ---------- gallery slider ---------- */
  var slIndex = 0, slTimer = null;

  function initSlider() {
    var slider = document.getElementById('slider');
    if (!slider || typeof GALLERY_IMAGES === 'undefined') return;

    var slidesEl = document.getElementById('slides');
    var dotsEl = document.getElementById('sl-dots');
    var thumbsEl = document.getElementById('thumbs');
    var capEl = document.getElementById('sl-caption');
    var counterEl = document.getElementById('sl-counter');
    var progEl = document.getElementById('sl-progress');
    var countEl = document.getElementById('sl-total');

    if (counterEl) counterEl.textContent = GALLERY_IMAGES.length + ' photographs · Conferences, classrooms, travels & memories';

    GALLERY_IMAGES.forEach(function (img, i) {
      var slide = document.createElement('div');
      slide.className = 'slide';
      slide.setAttribute('data-idx', i);

      var pic = document.createElement('img');
      pic.loading = i === 0 ? 'eager' : 'lazy';
      pic.alt = img.name;
      pic.src = encodeURI(img.src);

      var shade = document.createElement('div');
      shade.className = 'sl-shade';

      var indexTag = document.createElement('div');
      indexTag.className = 'sl-index';
      indexTag.textContent = String(i + 1).padStart(2, '0');

      var cap = document.createElement('div');
      cap.className = 'sl-cap';
      cap.innerHTML = '<span class="mono-tag">Photo ' + String(i + 1).padStart(2, '0') + ' · ' + escapeHtml(img.category || 'Memory') + '</span>' + escapeHtml(img.caption || img.name);

      slide.appendChild(pic);
      slide.appendChild(shade);
      slide.appendChild(indexTag);
      slide.appendChild(cap);
      slidesEl.appendChild(slide);

      slide.addEventListener('click', function () { openLightbox(i); });

      var dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Go to photo ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); });
      dotsEl.appendChild(dot);

      var thumb = document.createElement('button');
      thumb.className = 'thumb';
      thumb.setAttribute('aria-label', img.name);
      var tpic = document.createElement('img');
      tpic.loading = 'lazy';
      tpic.alt = img.name;
      tpic.src = encodeURI(img.src);
      thumb.appendChild(tpic);
      thumb.addEventListener('click', function () { goTo(i); });
      thumbsEl.appendChild(thumb);
    });

    function goTo(i) {
      var total = GALLERY_IMAGES.length;
      var nextIdx = (i + total) % total;
      var dir = nextIdx >= slIndex ? (nextIdx === slIndex ? 0 : 1) : -1;
      if (nextIdx === slIndex && total > 1) {
        // wrap-around: force direction
        dir = (nextIdx - slIndex + total) % total === 1 ? 1 : -1;
      }
      var slides = slidesEl.children;
      var old = slides[slIndex];
      if (old && old !== slides[nextIdx]) {
        if (dir === 1) { old.classList.remove('active'); old.classList.add('to-left'); }
        else { old.classList.remove('active', 'to-left'); }
        var self = old;
        setTimeout(function () { self.classList.remove('to-left'); }, 750);
      }
      slIndex = nextIdx;
      slides[slIndex].classList.add('active');
      slides[slIndex].classList.remove('to-left');

      var dots = dotsEl.children;
      for (var d = 0; d < dots.length; d++) {
        dots[d].classList.toggle('active', d === slIndex);
      }
      var thumbs = thumbsEl.children;
      for (var t = 0; t < thumbs.length; t++) {
        thumbs[t].classList.toggle('active', t === slIndex);
      }
      if (capEl) capEl.textContent = GALLERY_IMAGES[slIndex].caption || GALLERY_IMAGES[slIndex].name;
      if (progEl) {
        progEl.style.transition = 'none';
        progEl.style.width = '0%';
        requestAnimationFrame(function () {
          progEl.style.transition = 'width 4s linear';
          progEl.style.width = '100%';
        });
      }
      if (slider) { slider.classList.add('paused'); clearInterval(slTimer); }
      startAutoplay();
    }

    function nextSlide() { goTo((slIndex + 1) % GALLERY_IMAGES.length); }
    function prevSlide() { goTo((slIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length); }

    function startAutoplay() {
      clearInterval(slTimer);
      slTimer = setInterval(nextSlide, 4200);
    }

    var prevBtn = slider.querySelector('.sl-arrow.prev');
    var nextBtn = slider.querySelector('.sl-arrow.next');
    if (prevBtn) prevBtn.addEventListener('click', function () { prevSlide(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { nextSlide(); });

    slider.addEventListener('mouseenter', function () { clearInterval(slTimer); });
    slider.addEventListener('mouseleave', startAutoplay);
    slider.addEventListener('touchstart', function () { clearInterval(slTimer); }, { passive: true });

    document.addEventListener('keydown', function (e) {
      var lb = document.querySelector('.lightbox');
      if (lb && lb.classList.contains('open')) return;
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    });

    goTo(0);
  }

  /* ---------- lightbox ---------- */
  var lbIndex = 0;

  function openLightbox(i) {
    lbIndex = i;
    var lb = document.querySelector('.lightbox');
    if (!lb || typeof GALLERY_IMAGES === 'undefined') return;
    lb.classList.add('open');
    renderLb();
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    var lb = document.querySelector('.lightbox');
    if (!lb) return;
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  function renderLb() {
    var lb = document.querySelector('.lightbox');
    if (!lb || typeof GALLERY_IMAGES === 'undefined') return;
    var img = GALLERY_IMAGES[lbIndex];
    var pic = lb.querySelector('img');
    var cap = lb.querySelector('.lb-caption');
    var counter = lb.querySelector('.lb-counter');
    pic.src = encodeURI(img.src);
    pic.alt = img.name;
    if (cap) cap.textContent = img.caption ? img.caption + (img.category ? ' · ' + img.category : '') : img.name;
    if (counter) counter.textContent = (lbIndex + 1) + ' / ' + GALLERY_IMAGES.length;
  }

  function initLightbox() {
    var lb = document.querySelector('.lightbox');
    if (!lb) return;
    var close = lb.querySelector('.lb-close');
    var prev = lb.querySelector('.lb-prev');
    var next = lb.querySelector('.lb-next');

    if (close) close.addEventListener('click', closeLightbox);
    if (prev) prev.addEventListener('click', function (e) {
      e.stopPropagation();
      lbIndex = (lbIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
      renderLb();
    });
    if (next) next.addEventListener('click', function (e) {
      e.stopPropagation();
      lbIndex = (lbIndex + 1) % GALLERY_IMAGES.length;
      renderLb();
    });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && prev) prev.click();
      if (e.key === 'ArrowRight' && next) next.click();
    });
  }

  /* ---------- misc ---------- */
  function setYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

})();
