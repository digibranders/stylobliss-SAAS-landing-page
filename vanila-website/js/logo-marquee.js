/**
 * logo-marquee.js
 * StyloBliss — Clones marquee track nodes for seamless infinite loop.
 *
 * The CSS animation moves the track by -25%. By cloning the content 4×
 * total (original + 3 clones), the loop is seamless on all screen sizes.
 *
 * @module logo-marquee
 */

'use strict';

/**
 * Initializes all logo marquee tracks on the page.
 * Selects every `.logo-marquee__track` and duplicates its children
 * until there are at least 4× the original item count, ensuring the
 * -25% translateX animation loops without gaps.
 */
function initLogoMarquee() {
  const allTracks = document.querySelectorAll('.logo-marquee__track');
  if (!allTracks.length) return;

  allTracks.forEach((track) => {
    const originalChildren = Array.from(track.children);
    if (!originalChildren.length) return;

    // We need 4 copies total (original + 3 clones) for the -25% animation
    const clonesNeeded = 3;
    for (let copyIndex = 0; copyIndex < clonesNeeded; copyIndex++) {
      originalChildren.forEach((child) => {
        const clone = child.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
    }
  });
}

export { initLogoMarquee };
