/**
 * site-navbar.js
 * StyloBliss — Navbar interactions:
 *  - Scroll detection → backdrop blur class on header
 *  - Mega menu open/close with arrow positioning
 *  - Click-outside and Escape key to close menus
 *  - Mobile hamburger toggle + body scroll-lock
 *
 * @module site-navbar
 */

'use strict';

import { buildExplorePanelHtml, buildEngagePanelHtml } from './site-layout.js';

/** Scroll threshold (px) before navbar background appears */
const NAVBAR_SCROLL_THRESHOLD_PX = 50;

/** Currently active mega menu type: 'explore' | 'engage' | null */
let activeMegaMenuType = null;

/** Whether mobile menu is currently open */
let isMobileMenuOpen = false;

/* ─── Utility: get scroll container ─────────────────────────────────────────── */

/**
 * Returns the main scroll container element.
 * StyloBliss uses the <body> as the scroll root (unlike the React app which used
 * a custom div). Falls back to window scroll for older browsers.
 * @returns {Element}
 */
function getScrollContainer() {
  return document.documentElement;
}

/* ─── Header backdrop on scroll ──────────────────────────────────────────────── */

/**
 * Sets up a scroll listener that adds/removes the scrolled class on the header.
 */
function initScrollDetection() {
  const siteHeader = document.getElementById('site-header');
  if (!siteHeader) return;

  function onPageScroll() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > NAVBAR_SCROLL_THRESHOLD_PX) {
      siteHeader.classList.add('site-header--scrolled');
    } else {
      siteHeader.classList.remove('site-header--scrolled');
    }
  }

  window.addEventListener('scroll', onPageScroll, { passive: true });
  onPageScroll(); // set initial state
}

/* ─── Mega Menu ──────────────────────────────────────────────────────────────── */

/**
 * Updates the mega menu panel content and positions the arrow caret
 * under the trigger button.
 * @param {'explore' | 'engage'} menuType
 */
function openMegaMenu(menuType) {
  const megaMenu = document.getElementById('site-mega-menu');
  const megaMenuBody = document.getElementById('site-mega-menu-body');
  const megaMenuArrow = document.getElementById('site-mega-menu-arrow');
  const siteHeader = document.getElementById('site-header');
  const backdrop = document.getElementById('site-mega-menu-backdrop');

  if (!megaMenu || !megaMenuBody || !siteHeader) return;

  // Set panel content
  if (menuType === 'explore') {
    megaMenuBody.innerHTML = buildExplorePanelHtml();
  } else if (menuType === 'engage') {
    megaMenuBody.innerHTML = buildEngagePanelHtml();
  }

  // Show panel
  megaMenu.classList.add('site-header__mega-menu--visible');
  siteHeader.classList.add('site-header--menu-open');
  if (backdrop) backdrop.classList.add('site-mega-menu-backdrop--visible');

  // Update trigger button aria state
  document.querySelectorAll('[data-menu-trigger]').forEach((btn) => {
    const isActive = btn.getAttribute('data-menu-trigger') === menuType;
    btn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    if (isActive) {
      btn.classList.add('site-header__nav-trigger--active');
    } else {
      btn.classList.remove('site-header__nav-trigger--active');
    }
  });

  // Position arrow under active trigger
  setTimeout(() => {
    const triggerBtn = document.querySelector(`[data-menu-trigger="${menuType}"]`);
    const containerRect = megaMenu.getBoundingClientRect();
    if (triggerBtn && megaMenuArrow) {
      const triggerRect = triggerBtn.getBoundingClientRect();
      const arrowLeft = triggerRect.left + (triggerRect.width / 2) - containerRect.left - 7;
      if (arrowLeft > 20 && arrowLeft < 480) {
        megaMenuArrow.style.left = `${arrowLeft}px`;
        // Also update transform-origin for the panel animation
        megaMenu.style.transformOrigin = `${arrowLeft}px top`;
      }
    }
  }, 0);

  activeMegaMenuType = menuType;

  // Attach close-on-link-click listeners to mega menu links
  megaMenuBody.querySelectorAll('[data-mega-menu-link]').forEach((link) => {
    link.addEventListener('click', closeMegaMenu);
  });
}

/**
 * Closes the active mega menu.
 */
function closeMegaMenu() {
  const megaMenu = document.getElementById('site-mega-menu');
  const siteHeader = document.getElementById('site-header');
  const backdrop = document.getElementById('site-mega-menu-backdrop');

  if (megaMenu) megaMenu.classList.remove('site-header__mega-menu--visible');
  if (siteHeader) siteHeader.classList.remove('site-header--menu-open');
  if (backdrop) backdrop.classList.remove('site-mega-menu-backdrop--visible');

  document.querySelectorAll('[data-menu-trigger]').forEach((btn) => {
    btn.setAttribute('aria-expanded', 'false');
    btn.classList.remove('site-header__nav-trigger--active');
  });

  activeMegaMenuType = null;
}

/**
 * Toggles the given mega menu. If the same menu is already open, closes it.
 * @param {'explore' | 'engage'} menuType
 */
function toggleMegaMenu(menuType) {
  if (activeMegaMenuType === menuType) {
    closeMegaMenu();
  } else {
    openMegaMenu(menuType);
  }
}

/**
 * Sets up click listeners on dropdown trigger buttons.
 */
function initMegaMenuTriggers() {
  // Trigger buttons are injected by site-layout.js, so listen on document
  document.addEventListener('click', (event) => {
    const triggerBtn = event.target.closest('[data-menu-trigger]');
    if (triggerBtn) {
      const menuType = triggerBtn.getAttribute('data-menu-trigger');
      toggleMegaMenu(menuType);
      event.stopPropagation();
      return;
    }

    // Click outside the mega menu → close it
    const megaMenu = document.getElementById('site-mega-menu');
    if (megaMenu && activeMegaMenuType) {
      const isInsideMenu = megaMenu.contains(event.target);
      const isInsideTrigger = event.target.closest('[data-menu-trigger]');
      if (!isInsideMenu && !isInsideTrigger) {
        closeMegaMenu();
      }
    }
  });
}

/**
 * Sets up backdrop click listener to close mega menu.
 */
function initMegaMenuBackdrop() {
  // Backdrop is injected into body before app-init runs
  document.addEventListener('click', (event) => {
    const backdrop = document.getElementById('site-mega-menu-backdrop');
    if (backdrop && event.target === backdrop) {
      closeMegaMenu();
    }
  });
}

/**
 * Sets up Escape key listener to close menus.
 */
function initEscapeKeyListener() {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (activeMegaMenuType) closeMegaMenu();
      if (isMobileMenuOpen) closeMobileMenu();
    }
  });
}

/* ─── Mobile Menu ────────────────────────────────────────────────────────────── */

/**
 * Opens the mobile menu overlay.
 */
function openMobileMenu() {
  const mobileMenu = document.getElementById('site-mobile-menu');
  const hamburgerBtn = document.getElementById('site-hamburger-btn');
  const siteHeader = document.getElementById('site-header');

  if (mobileMenu) mobileMenu.classList.add('site-mobile-menu--open');
  if (siteHeader) siteHeader.classList.add('site-header--mobile-open');
  if (hamburgerBtn) {
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    hamburgerBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(25,30,73)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
  }
  document.body.classList.add('mobile-menu-scroll-locked');
  isMobileMenuOpen = true;
}

/**
 * Closes the mobile menu overlay.
 */
function closeMobileMenu() {
  const mobileMenu = document.getElementById('site-mobile-menu');
  const hamburgerBtn = document.getElementById('site-hamburger-btn');
  const siteHeader = document.getElementById('site-header');

  if (mobileMenu) mobileMenu.classList.remove('site-mobile-menu--open');
  if (siteHeader) siteHeader.classList.remove('site-header--mobile-open');
  if (hamburgerBtn) {
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(25,30,73)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
  }
  document.body.classList.remove('mobile-menu-scroll-locked');
  isMobileMenuOpen = false;
}

/**
 * Sets up the hamburger button click listener.
 */
function initMobileMenuToggle() {
  document.addEventListener('click', (event) => {
    const hamburgerBtn = event.target.closest('#site-hamburger-btn');
    if (hamburgerBtn) {
      if (isMobileMenuOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
      return;
    }

    // Close mobile menu when a nav link inside it is clicked
    const mobileMenu = document.getElementById('site-mobile-menu');
    if (mobileMenu && isMobileMenuOpen) {
      const clickedLink = event.target.closest('.site-mobile-menu__link, .site-mobile-menu__cta-button');
      if (clickedLink) {
        closeMobileMenu();
      }
    }
  });
}

/* ─── Main init ──────────────────────────────────────────────────────────────── */

/**
 * Initializes all navbar interactive behaviors.
 * Must be called after site-layout.js has injected the header HTML.
 */
function initSiteNavbar() {
  // Inject backdrop overlay element into body for mega menu
  if (!document.getElementById('site-mega-menu-backdrop')) {
    const backdropEl = document.createElement('div');
    backdropEl.id = 'site-mega-menu-backdrop';
    backdropEl.className = 'site-mega-menu-backdrop';
    backdropEl.setAttribute('aria-hidden', 'true');
    document.body.appendChild(backdropEl);
  }

  initScrollDetection();
  initMegaMenuTriggers();
  initMegaMenuBackdrop();
  initEscapeKeyListener();
  initMobileMenuToggle();
}

export { initSiteNavbar };
