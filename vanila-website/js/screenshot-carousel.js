/**
 * screenshot-carousel.js
 * StyloBliss — Product screenshot carousel with:
 *  - 4-second auto-advance
 *  - Tab click switching
 *  - Keyboard arrow navigation
 *  - Touch/drag swipe on mobile
 *  - Mobile pill indicator position tracker
 *
 * @module screenshot-carousel
 */

'use strict';

/** Auto-advance interval in milliseconds (matches React source FILL_DURATION = 4000) */
const CAROUSEL_AUTOPLAY_INTERVAL_MS = 4000;

/** Minimum swipe distance in pixels to trigger a slide change */
const SWIPE_THRESHOLD_PX = 40;

/** Total number of slides */
const TOTAL_SLIDES = 5;

/**
 * Initializes the screenshot carousel.
 * Expects the following DOM structure:
 *   .screenshot-carousel
 *     .screenshot-carousel__slides-track  (contains .screenshot-carousel__slide × N)
 *     .screenshot-carousel__desktop-tab × N  (data-slide-index)
 *     .screenshot-carousel__mobile-pill  (CSS left/width set by JS)
 *     .screenshot-carousel__mobile-tab × N  (data-slide-index)
 */
function initScreenshotCarousel() {
  const carouselEl = document.querySelector('[data-component="screenshot-carousel"]');
  if (!carouselEl) return;

  const slidesTrack = carouselEl.querySelector('.screenshot-carousel__slides-track');
  const desktopTabs = Array.from(carouselEl.querySelectorAll('.screenshot-carousel__desktop-tab'));
  const mobileTabs = Array.from(carouselEl.querySelectorAll('.screenshot-carousel__mobile-tab'));
  const mobilePill = carouselEl.querySelector('.screenshot-carousel__mobile-pill');
  const mobileNavScroll = carouselEl.querySelector('.screenshot-carousel__mobile-nav-scroll');
  const mobileNavFadeLeft = carouselEl.querySelector('.screenshot-carousel__mobile-nav-fade--left');
  const mobileNavFadeRight = carouselEl.querySelector('.screenshot-carousel__mobile-nav-fade--right');

  if (!slidesTrack) return;

  let activeSlideIndex = 0;
  let autoplayTimerId = null;
  let touchStartX = 0;
  let touchStartY = 0;
  let isDragging = false;

  /* ── Slide to a specific index ─────────────────────────────────── */

  function goToSlide(targetIndex) {
    const clampedIndex = ((targetIndex % TOTAL_SLIDES) + TOTAL_SLIDES) % TOTAL_SLIDES;
    activeSlideIndex = clampedIndex;

    // Move the track
    slidesTrack.style.transform = `translateX(-${clampedIndex * 100}%)`;

    // Update desktop tabs
    desktopTabs.forEach((tab, index) => {
      const isActive = index === clampedIndex;
      tab.classList.toggle('screenshot-carousel__desktop-tab--active', isActive);

      // Reset and restart progress bar animation for active tab
      const progressBar = tab.querySelector('.screenshot-carousel__tab-progress');
      if (progressBar) {
        if (isActive) {
          progressBar.style.animation = 'none';
          // Force reflow to restart the animation
          void progressBar.offsetWidth;
          progressBar.style.setProperty('--carousel-duration', `${CAROUSEL_AUTOPLAY_INTERVAL_MS}ms`);
          progressBar.style.animation = `carouselTabFill ${CAROUSEL_AUTOPLAY_INTERVAL_MS}ms linear forwards`;
        } else {
          progressBar.style.animation = 'none';
          progressBar.style.width = '0%';
        }
      }
    });

    // Update mobile tabs
    mobileTabs.forEach((tab, index) => {
      tab.classList.toggle('screenshot-carousel__mobile-tab--active', index === clampedIndex);
    });

    // Update mobile pill position
    updateMobilePillPosition(clampedIndex);

    // Auto-scroll mobile nav to keep active tab visible
    if (mobileNavScroll && mobileTabs[clampedIndex]) {
      const activeTab = mobileTabs[clampedIndex];
      const scrollLeft = activeTab.offsetLeft - mobileNavScroll.offsetWidth / 2 + activeTab.offsetWidth / 2;
      mobileNavScroll.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }

  /* ── Mobile pill position ──────────────────────────────────────── */

  function updateMobilePillPosition(index) {
    if (!mobilePill || !mobileTabs[index]) return;
    const activeTab = mobileTabs[index];
    mobilePill.style.left = `${activeTab.offsetLeft}px`;
    mobilePill.style.width = `${activeTab.offsetWidth}px`;
  }

  /* ── Autoplay ──────────────────────────────────────────────────── */

  function startAutoplay() {
    stopAutoplay();
    autoplayTimerId = setInterval(() => {
      goToSlide(activeSlideIndex + 1);
    }, CAROUSEL_AUTOPLAY_INTERVAL_MS);
  }

  function stopAutoplay() {
    if (autoplayTimerId !== null) {
      clearInterval(autoplayTimerId);
      autoplayTimerId = null;
    }
  }

  /* ── Tab click handlers ────────────────────────────────────────── */

  desktopTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      goToSlide(index);
      stopAutoplay();
      startAutoplay();
    });
  });

  mobileTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      goToSlide(index);
      stopAutoplay();
      startAutoplay();
    });
  });

  /* ── Keyboard navigation ───────────────────────────────────────── */

  carouselEl.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      goToSlide(activeSlideIndex + 1);
      stopAutoplay();
      startAutoplay();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      goToSlide(activeSlideIndex - 1);
      stopAutoplay();
      startAutoplay();
    }
  });

  /* ── Touch / Swipe ─────────────────────────────────────────────── */

  slidesTrack.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    isDragging = true;
  }, { passive: true });

  slidesTrack.addEventListener('touchmove', (event) => {
    if (!isDragging) return;
    // Detect horizontal vs vertical scroll to avoid hijacking vertical scroll
    const deltaX = Math.abs(event.touches[0].clientX - touchStartX);
    const deltaY = Math.abs(event.touches[0].clientY - touchStartY);
    if (deltaX > deltaY && deltaX > 10) {
      event.preventDefault();
    }
  }, { passive: false });

  slidesTrack.addEventListener('touchend', (event) => {
    if (!isDragging) return;
    isDragging = false;
    const touchEndX = event.changedTouches[0].clientX;
    const swipeDelta = touchStartX - touchEndX;

    if (Math.abs(swipeDelta) > SWIPE_THRESHOLD_PX) {
      if (swipeDelta > 0) {
        goToSlide(activeSlideIndex + 1);
      } else {
        goToSlide(activeSlideIndex - 1);
      }
      stopAutoplay();
      startAutoplay();
    }
  }, { passive: true });

  /* ── Mobile nav scroll edge fades ─────────────────────────────── */

  if (mobileNavScroll) {
    function updateMobileNavFades() {
      if (mobileNavFadeLeft) {
        mobileNavFadeLeft.classList.toggle('visible', mobileNavScroll.scrollLeft > 4);
      }
      if (mobileNavFadeRight) {
        const atEnd = mobileNavScroll.scrollLeft >= mobileNavScroll.scrollWidth - mobileNavScroll.clientWidth - 4;
        mobileNavFadeRight.classList.toggle('hidden', atEnd);
      }
    }
    mobileNavScroll.addEventListener('scroll', updateMobileNavFades, { passive: true });
    updateMobileNavFades();
  }

  /* ── Re-measure pill on window resize ─────────────────────────── */

  window.addEventListener('resize', () => {
    updateMobilePillPosition(activeSlideIndex);
  });

  /* ── Init ──────────────────────────────────────────────────────── */

  goToSlide(0);
  startAutoplay();
}

export { initScreenshotCarousel };
