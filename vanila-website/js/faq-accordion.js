/**
 * faq-accordion.js
 * StyloBliss — FAQ accordion with smooth max-height expand/collapse transition.
 *
 * Expected DOM per item:
 *   .faq-item
 *     button.faq-item__trigger  (aria-expanded, aria-controls)
 *       .faq-item__question-text
 *       .faq-item__chevron
 *     div.faq-item__answer  (id matching aria-controls, hidden by default)
 *
 * @module faq-accordion
 */

'use strict';

/**
 * Opens a single FAQ item.
 * @param {HTMLElement} itemEl — the `.faq-item` container
 */
function openFaqItem(itemEl) {
  const trigger = itemEl.querySelector('.faq-item__trigger');
  const answerPanel = itemEl.querySelector('.faq-item__answer');
  if (!trigger || !answerPanel) return;

  itemEl.classList.add('faq-item--open');
  trigger.setAttribute('aria-expanded', 'true');
  answerPanel.style.maxHeight = `${answerPanel.scrollHeight}px`;
}

/**
 * Closes a single FAQ item.
 * @param {HTMLElement} itemEl — the `.faq-item` container
 */
function closeFaqItem(itemEl) {
  const trigger = itemEl.querySelector('.faq-item__trigger');
  const answerPanel = itemEl.querySelector('.faq-item__answer');
  if (!trigger || !answerPanel) return;

  itemEl.classList.remove('faq-item--open');
  trigger.setAttribute('aria-expanded', 'false');
  answerPanel.style.maxHeight = '0px';
}

/**
 * Initializes all FAQ accordion instances on the page.
 * Each `.faq-accordion` wrapper is independent; opening one item
 * does NOT auto-close others (matches the React source behavior).
 */
function initFaqAccordion() {
  const allAccordionWrappers = document.querySelectorAll('.faq-accordion');
  if (!allAccordionWrappers.length) return;

  allAccordionWrappers.forEach((accordionWrapper) => {
    const allItems = Array.from(accordionWrapper.querySelectorAll('.faq-item'));

    allItems.forEach((itemEl) => {
      const triggerBtn = itemEl.querySelector('.faq-item__trigger');
      const answerPanel = itemEl.querySelector('.faq-item__answer');

      if (!triggerBtn || !answerPanel) return;

      // Ensure closed state initially
      answerPanel.style.maxHeight = '0px';
      answerPanel.style.overflow = 'hidden';
      answerPanel.style.transition = 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

      triggerBtn.addEventListener('click', () => {
        const isCurrentlyOpen = itemEl.classList.contains('faq-item--open');
        if (isCurrentlyOpen) {
          closeFaqItem(itemEl);
        } else {
          openFaqItem(itemEl);
        }
      });
    });
  });
}

export { initFaqAccordion };
