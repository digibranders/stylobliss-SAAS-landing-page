/**
 * screenshot-carousel.js
 * Handles:
 * - 4-second auto-advance between product screenshot slides
 * - Tab click switching
 * - Mobile pill indicator tracking
 * - Touch / drag swipe support
 */

const AUTOPLAY_INTERVAL_MS = 4000;

/**
 * Initialises the screenshot carousel.
 * Expects the following HTML structure:
 *   .screenshot-carousel-tabs > .screenshot-carousel-tab[data-slide]
 *   .screenshot-carousel-slides > .screenshot-carousel-slide[data-slide]
 *   .screenshot-carousel-pills > .screenshot-carousel-pill[data-slide]
 */
export function initScreenshotCarousel() {
  const tabs = document.querySelectorAll('.screenshot-carousel-tab');
  const slides = document.querySelectorAll('.screenshot-carousel-slide');
  const pills = document.querySelectorAll('.screenshot-carousel-pill');
  const slidesContainer = document.querySelector('.screenshot-carousel-slides');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  let progressTimer = null;

  // ── Activate a specific slide by index ────────────────────
  function goToSlide(index) {
    const newIndex = (index + slides.length) % slides.length;

    // Update slides
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === newIndex);
    });

    // Update tabs
    tabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === newIndex);
    });

    // Update pills
    pills.forEach((pill, i) => {
      pill.classList.toggle('active', i === newIndex);
    });

    currentIndex = newIndex;
  }

  // ── Start autoplay ────────────────────────────────────────
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, AUTOPLAY_INTERVAL_MS);
  }

  // ── Stop autoplay ─────────────────────────────────────────
  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // ── Tab click handlers ────────────────────────────────────
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      goToSlide(index);
      stopAutoplay();
      startAutoplay();
    });
  });

  // ── Pill click handlers ───────────────────────────────────
  pills.forEach((pill, index) => {
    pill.addEventListener('click', () => {
      goToSlide(index);
      stopAutoplay();
      startAutoplay();
    });
  });

  // ── Keyboard arrow navigation ─────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (!document.querySelector('.screenshot-carousel-slides')) return;
    if (e.key === 'ArrowLeft') {
      goToSlide(currentIndex - 1);
      stopAutoplay();
      startAutoplay();
    } else if (e.key === 'ArrowRight') {
      goToSlide(currentIndex + 1);
      stopAutoplay();
      startAutoplay();
    }
  });

  // ── Touch / drag swipe ────────────────────────────────────
  if (slidesContainer) {
    let touchStartX = 0;
    let touchStartY = 0;
    let isDragging = false;

    slidesContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isDragging = true;
    }, { passive: true });

    slidesContainer.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;

      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaY = e.changedTouches[0].clientY - touchStartY;

      // Only respond to mostly-horizontal swipes
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
        if (deltaX < 0) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(currentIndex - 1);
        }
        stopAutoplay();
        startAutoplay();
      }
    }, { passive: true });

    // Mouse drag support for desktop
    let mouseStartX = 0;
    let isMouseDragging = false;

    slidesContainer.addEventListener('mousedown', (e) => {
      mouseStartX = e.clientX;
      isMouseDragging = true;
    });

    slidesContainer.addEventListener('mouseup', (e) => {
      if (!isMouseDragging) return;
      isMouseDragging = false;

      const deltaX = e.clientX - mouseStartX;
      if (Math.abs(deltaX) > 40) {
        if (deltaX < 0) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(currentIndex - 1);
        }
        stopAutoplay();
        startAutoplay();
      }
    });

    slidesContainer.addEventListener('mouseleave', () => {
      isMouseDragging = false;
    });
  }

  // ── Pause autoplay on hover ───────────────────────────────
  const carouselRoot = document.querySelector('.screenshot-carousel-section');
  if (carouselRoot) {
    carouselRoot.addEventListener('mouseenter', stopAutoplay);
    carouselRoot.addEventListener('mouseleave', startAutoplay);
  }

  // ── Init ──────────────────────────────────────────────────
  goToSlide(0);
  startAutoplay();
}
