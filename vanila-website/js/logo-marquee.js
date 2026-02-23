/**
 * logo-marquee.js
 * Clones marquee track nodes to achieve a seamless infinite loop.
 * The CSS `@keyframes logoMarqueeLeft` / `logoMarqueeRight` handle the
 * actual animation; this script just ensures enough content exists for
 * the loop to be gapless at any screen width.
 */

const CLONE_MULTIPLIER = 3; // Number of extra copies appended

/**
 * Initialises all logo marquee tracks on the page.
 * Must be called after the DOM contains `.logo-marquee-track` elements.
 */
export function initLogoMarquee() {
  const tracks = document.querySelectorAll('.logo-marquee-track');

  tracks.forEach((track) => {
    cloneTrackItems(track);
  });
}

/**
 * Clones the original children of a track element multiple times
 * so the scrolling content never shows a gap.
 *
 * @param {HTMLElement} track
 */
function cloneTrackItems(track) {
  const originalItems = [...track.children];
  if (!originalItems.length) return;

  for (let i = 0; i < CLONE_MULTIPLIER; i++) {
    originalItems.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  }
}
