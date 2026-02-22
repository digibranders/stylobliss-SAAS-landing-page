/**
 * customer-stories.js
 * StyloBliss — Scroll-triggered clip-path morph animation for the Customer
 * Stories section. Interpolates the clip-path inset and border-radius as the
 * section scrolls into view, exactly matching the React source.
 *
 * @module customer-stories
 */

'use strict';

/**
 * Clamps a value between min and max.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function clampValue(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linearly interpolates between a and b by factor t.
 * @param {number} startValue
 * @param {number} endValue
 * @param {number} factor - 0 to 1
 * @returns {number}
 */
function linearInterpolate(startValue, endValue, factor) {
  return startValue + (endValue - startValue) * factor;
}

/**
 * Initializes the customer stories scroll animation.
 *
 * Looks for:
 *   .customer-stories-section          — outer wrapper
 *   .customer-stories-section__panel   — the dark pill (clip-path target)
 *   .customer-stories-section__card-photo-wrapper — card photo height targets
 *   .customer-stories-section__card-name, .customer-stories-section__card-business
 */
function initCustomerStories() {
  const sectionEl = document.querySelector('[data-component="customer-stories"]');
  if (!sectionEl) return;

  const panelEl = sectionEl.querySelector('.customer-stories-section__panel');
  if (!panelEl) return;

  const photoWrappers = Array.from(sectionEl.querySelectorAll('.customer-stories-section__card-photo-wrapper'));
  const cardNames = Array.from(sectionEl.querySelectorAll('.customer-stories-section__card-name'));
  const cardBusinesses = Array.from(sectionEl.querySelectorAll('.customer-stories-section__card-business'));

  let currentProgress = 0;

  /**
   * Applies the animated styles based on the scroll progress value (0–1).
   * @param {number} progress
   */
  function applyScrollProgress(progress) {
    currentProgress = progress;

    // Clip-path: inset(0px X% round Rpx) where X goes from 13 → 0, R from 60 → 0
    const insetPercent = linearInterpolate(13, 0, progress);
    const borderRadiusPx = linearInterpolate(60, 0, progress);
    panelEl.style.clipPath = `inset(0px ${insetPercent}% round ${borderRadiusPx}px)`;

    // Card photo heights: lerp(340, 432, progress)
    const cardHeight = Math.round(linearInterpolate(340, 432, progress));
    photoWrappers.forEach((wrapper) => {
      wrapper.style.height = `${cardHeight}px`;
    });

    // Card name opacity and translateY: opacity = progress, y = lerp(10, 0, progress)
    const nameOpacity = progress;
    const nameTranslateY = linearInterpolate(10, 0, progress);
    cardNames.forEach((nameEl) => {
      nameEl.style.opacity = nameOpacity;
      nameEl.style.transform = `translateY(${nameTranslateY}px)`;
    });

    // Card business opacity and translateY: opacity = progress, y = lerp(8, 0, progress)
    const businessTranslateY = linearInterpolate(8, 0, progress);
    cardBusinesses.forEach((businessEl) => {
      businessEl.style.opacity = nameOpacity;
      businessEl.style.transform = `translateY(${businessTranslateY}px)`;
    });
  }

  /**
   * Scroll handler — mirrors the React source scroll logic.
   */
  function handlePageScroll() {
    const rect = sectionEl.getBoundingClientRect();
    const viewportH = window.innerHeight;

    // start = 70% of viewport height from top, end = 5% from top
    const scrollStart = viewportH * 0.7;
    const scrollEnd = viewportH * 0.05;
    const rawProgress = 1 - (rect.top - scrollEnd) / (scrollStart - scrollEnd);

    const clampedProgress = isNaN(rawProgress) ? 0 : clampValue(rawProgress, 0, 1);
    applyScrollProgress(clampedProgress);
  }

  window.addEventListener('scroll', handlePageScroll, { passive: true });
  handlePageScroll(); // set initial state
}

export { initCustomerStories };
