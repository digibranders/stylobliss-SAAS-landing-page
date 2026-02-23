/**
 * site-navbar.js
 * Handles:
 * - Scroll detection → header backdrop blur
 * - Mega menu open/close (desktop)
 * - Mobile hamburger toggle + body scroll-lock
 * - Click-outside to close mega menus
 */

const NAVBAR_SCROLL_THRESHOLD_PX = 10;

/**
 * Initialises all navbar interactive behaviours.
 * Must be called after site-layout.js has injected the header HTML.
 */
export function initSiteNavbar() {
  const header = document.getElementById('site-header');
  if (!header) return;

  // ── Scroll detection ──────────────────────────────────────
  function handleScroll() {
    if (window.scrollY > NAVBAR_SCROLL_THRESHOLD_PX) {
      header.classList.add('site-header--scrolled');
    } else {
      header.classList.remove('site-header--scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load

  // ── Mega menu state ────────────────────────────────────────
  let openMenuKey = null; // 'explore' | 'engage' | null

  function openMegaMenu(key) {
    if (openMenuKey === key) return;
    closeMegaMenu(); // close any open menu first

    openMenuKey = key;

    const panel = document.getElementById(`mega-${key}`);
    const backdrop = document.getElementById('mega-backdrop');
    const chevron = document.getElementById(`chevron-${key}`);
    const btn = document.querySelector(`[data-mega="${key}"]`);

    if (!panel) return;

    panel.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    if (chevron) chevron.classList.add('open');
    if (btn) {
      btn.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
    }

    header.classList.add('site-header--menu-open');

    // Position the arrow below the button
    positionArrow(key, btn);
  }

  function closeMegaMenu() {
    if (!openMenuKey) return;

    const panel = document.getElementById(`mega-${openMenuKey}`);
    const backdrop = document.getElementById('mega-backdrop');
    const chevron = document.getElementById(`chevron-${openMenuKey}`);
    const btn = document.querySelector(`[data-mega="${openMenuKey}"]`);

    if (panel) panel.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    if (chevron) chevron.classList.remove('open');
    if (btn) {
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
    }

    header.classList.remove('site-header--menu-open');
    openMenuKey = null;
  }

  function toggleMegaMenu(key) {
    if (openMenuKey === key) {
      closeMegaMenu();
    } else {
      openMegaMenu(key);
    }
  }

  function positionArrow(key, triggerBtn) {
    const arrow = document.getElementById(`mega-arrow-${key}`);
    if (!arrow || !triggerBtn) return;
    const btnRect = triggerBtn.getBoundingClientRect();
    const panelEl = document.getElementById(`mega-${key}`);
    if (!panelEl) return;
    const panelRect = panelEl.getBoundingClientRect();
    const arrowLeft = btnRect.left + btnRect.width / 2 - panelRect.left - 9;
    arrow.style.left = `${Math.max(16, arrowLeft)}px`;
  }

  // ── Mega menu button click handlers ──────────────────────
  document.querySelectorAll('[data-mega]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = btn.getAttribute('data-mega');
      toggleMegaMenu(key);
    });
  });

  // ── Backdrop click closes menu ────────────────────────────
  const backdropEl = document.getElementById('mega-backdrop');
  if (backdropEl) {
    backdropEl.addEventListener('click', closeMegaMenu);
  }

  // ── Click outside closes menu ─────────────────────────────
  document.addEventListener('click', (e) => {
    if (openMenuKey && !e.target.closest('#site-header')) {
      closeMegaMenu();
    }
  });

  // ── Escape key closes menu ────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMegaMenu();
      closeMobileMenu();
    }
  });

  // ── Mobile hamburger ──────────────────────────────────────
  const hamburger = document.getElementById('mobile-hamburger');
  const mobileMenu = document.getElementById('site-mobile-menu');

  let mobileMenuOpen = false;

  function openMobileMenu() {
    mobileMenuOpen = true;
    hamburger?.classList.add('open');
    mobileMenu?.classList.add('open');
    document.body.style.overflow = 'hidden';
    header.classList.add('site-header--mobile-open');
  }

  function closeMobileMenu() {
    if (!mobileMenuOpen) return;
    mobileMenuOpen = false;
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
    document.body.style.overflow = '';
    header.classList.remove('site-header--mobile-open');
  }

  function toggleMobileMenu() {
    if (mobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }
}
