/**
 * app-init.js
 * StyloBliss — Main entry point for all vanilla JavaScript.
 *
 * Execution order:
 *  1. injectSiteLayout()         — renders shared header, footer, chatbot HTML
 *  2. initSiteNavbar()           — scroll detection, mega menu, mobile menu
 *  3. initLogoMarquee()          — duplicate marquee track items for seamless loop
 *  4. initScreenshotCarousel()   — auto-advance, tab switching, swipe
 *  5. initCustomerStories()      — scroll-triggered clip-path animation
 *  6. initFaqAccordion()         — expand/collapse FAQ items
 *  7. initChatbotWidget()        — open/close chatbot panel, message flow
 *
 * Each init function checks for its required DOM element before running,
 * so unused components on a given page are safely skipped.
 *
 * @module app-init
 */

'use strict';

import { injectSiteLayout } from './site-layout.js';
import { initSiteNavbar } from './site-navbar.js';
import { initLogoMarquee } from './logo-marquee.js';
import { initScreenshotCarousel } from './screenshot-carousel.js';
import { initCustomerStories } from './customer-stories.js';
import { initFaqAccordion } from './faq-accordion.js';
import { initChatbotWidget } from './chatbot-widget.js';

/**
 * Reads the page's `data-page-type` attribute to determine layout options.
 * Standalone pages (login, trial) skip the shared header/footer.
 * @returns {{ includeLayout: boolean }}
 */
function resolvePageLayoutOptions() {
  const pageType = document.body.getAttribute('data-page-type');
  const standalonePages = new Set(['login', 'trial']);
  return {
    includeLayout: !standalonePages.has(pageType),
  };
}

/**
 * Main initialization — called once the DOM is ready.
 */
function initApplication() {
  const { includeLayout } = resolvePageLayoutOptions();

  // Step 1: Inject shared layout HTML into mount points
  injectSiteLayout({ includeLayout, includeChatbot: true });

  // Step 2: Initialize navbar (requires header HTML to be in DOM)
  if (includeLayout) {
    initSiteNavbar();
  }

  // Step 3: Logo marquee (on pages that have it)
  if (document.querySelector('.logo-marquee__track')) {
    initLogoMarquee();
  }

  // Step 4: Screenshot carousel
  if (document.querySelector('[data-component="screenshot-carousel"]')) {
    initScreenshotCarousel();
  }

  // Step 5: Customer stories scroll animation
  if (document.querySelector('[data-component="customer-stories"]')) {
    initCustomerStories();
  }

  // Step 6: FAQ accordion (may appear on multiple pages)
  if (document.querySelector('.faq-accordion')) {
    initFaqAccordion();
  }

  // Step 7: Chatbot widget (always — injected by injectSiteLayout)
  if (document.getElementById('chatbot-widget')) {
    initChatbotWidget();
  }
}

// Boot on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApplication);
} else {
  // DOMContentLoaded already fired (e.g., script placed at end of body)
  initApplication();
}
