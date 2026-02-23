/**
 * faq-accordion.js
 * Handles expand/collapse behaviour for FAQ accordion items.
 * Uses max-height transition from 0 → scrollHeight for smooth animation.
 * Supports multiple independent accordion groups on a single page.
 */

/**
 * Initialises all FAQ accordion items on the page.
 * Expects the following HTML structure:
 *   .faq-item
 *     button.faq-item__trigger
 *     .faq-item__answer
 *       .faq-item__answer-inner
 */
export function initFaqAccordion() {
  const triggers = document.querySelectorAll('.faq-item__trigger');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      if (!item) return;

      const isOpen = item.classList.contains('faq-item--open');
      const answer = item.querySelector('.faq-item__answer');

      if (isOpen) {
        closeItem(item, answer);
      } else {
        // Optionally close siblings in the same group
        const group = item.closest('.faq-list');
        if (group) {
          group.querySelectorAll('.faq-item--open').forEach((openItem) => {
            if (openItem !== item) {
              const openAnswer = openItem.querySelector('.faq-item__answer');
              closeItem(openItem, openAnswer);
            }
          });
        }
        openItem(item, answer);
      }

      // Update aria-expanded
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}

/**
 * Opens a single FAQ item with smooth max-height transition.
 * @param {HTMLElement} item - The .faq-item container
 * @param {HTMLElement} answer - The .faq-item__answer element
 */
function openItem(item, answer) {
  item.classList.add('faq-item--open');
  if (answer) {
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

/**
 * Closes a single FAQ item.
 * @param {HTMLElement} item
 * @param {HTMLElement} answer
 */
function closeItem(item, answer) {
  item.classList.remove('faq-item--open');
  if (answer) {
    answer.style.maxHeight = '0';
  }
}
