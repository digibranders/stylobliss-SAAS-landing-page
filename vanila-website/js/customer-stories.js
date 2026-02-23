/**
 * customer-stories.js
 * Animates testimonial cards using clip-path morphing driven by scroll position.
 * - Uses IntersectionObserver to detect when the section enters the viewport
 * - Uses scroll event listener to interpolate clip-path based on scroll progress
 */

/**
 * Initialises the customer stories scroll animation.
 */
export function initCustomerStories() {
  const section = document.querySelector('.customer-stories-section');
  if (!section) return;

  const cards = section.querySelectorAll('.customer-stories-card');
  if (!cards.length) return;

  // Desktop: tab switching
  const tabBtns = section.querySelectorAll('.customer-stories-tab');
  const tabPanels = section.querySelectorAll('.customer-stories-panel');

  if (tabBtns.length) {
    tabBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        tabBtns.forEach((b) => b.classList.remove('active'));
        tabPanels.forEach((p) => p.classList.remove('active'));
        btn.classList.add('active');
        if (tabPanels[index]) tabPanels[index].classList.add('active');
      });
    });

    // Activate first tab
    tabBtns[0]?.classList.add('active');
    tabPanels[0]?.classList.add('active');
  }

  // ── Scroll-based clip-path animation ─────────────────────
  let isVisible = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          updateClipPaths();
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(section);

  function getScrollProgress() {
    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    // progress 0 = section just entered viewport bottom
    // progress 1 = section top at viewport top
    const progress = 1 - rect.top / viewportHeight;
    return Math.max(0, Math.min(1, progress));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function updateClipPaths() {
    const progress = getScrollProgress();

    cards.forEach((card, index) => {
      // Each card starts expanding slightly after the previous
      const cardDelay = index * 0.15;
      const cardProgress = Math.max(0, Math.min(1, (progress - cardDelay) / 0.6));

      // Interpolate from inset(13% 0% 0% 0%) → inset(0% 0% 0% 0%)
      const insetTop = lerp(13, 0, cardProgress);
      card.style.clipPath = `inset(${insetTop}% 0% 0% 0% round 60px)`;
      card.style.opacity = cardProgress > 0 ? '1' : '0';
    });
  }

  window.addEventListener('scroll', () => {
    if (isVisible) {
      updateClipPaths();
    }
  }, { passive: true });

  // Run once in case section is already in view on load
  updateClipPaths();
}
