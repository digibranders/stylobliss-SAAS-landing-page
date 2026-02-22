/**
 * site-layout.js
 * StyloBliss — Injects shared header, mobile menu overlay, footer, and chatbot
 * into every page. Marks the active nav link based on the current page path.
 *
 * Usage: imported by app-init.js — call injectSiteLayout(options).
 */

'use strict';

/* ─── SVG Icon Helpers ──────────────────────────────────────────────────────── */

/**
 * Returns inline SVG for the hamburger (Menu) icon.
 * @returns {string}
 */
function buildHamburgerIconSvg() {
  return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(25,30,73)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
}

/**
 * Returns inline SVG for the X (close) icon.
 * @returns {string}
 */
function buildCloseIconSvg() {
  return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(25,30,73)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
}

/* ─── Chevron helper ─────────────────────────────────────────────────────────── */

/**
 * Returns HTML for a nav trigger chevron arrow.
 * @returns {string}
 */
function buildChevronHtml() {
  return `
    <span class="site-header__nav-trigger-chevron" aria-hidden="true">
      <span class="site-header__nav-trigger-chevron-arm site-header__nav-trigger-chevron-arm--left"></span>
      <span class="site-header__nav-trigger-chevron-arm site-header__nav-trigger-chevron-arm--right"></span>
    </span>
  `;
}

/* ─── Header HTML ────────────────────────────────────────────────────────────── */

/**
 * Builds the full site header HTML string.
 * @param {string} currentPath - The current page's pathname (e.g. "/pricing.html")
 * @returns {string}
 */
function buildHeaderHtml(currentPath) {
  const pricingActive = currentPath.includes('pricing') ? ' site-header__nav-link--active' : '';
  const whyActive = currentPath.includes('why-stylobliss') ? ' site-header__nav-link--active' : '';

  return `
    <header class="site-header" id="site-header">
      <div class="site-header__bg-layer"></div>
      <nav class="site-header__nav" role="navigation" aria-label="Main navigation">

        <!-- Logo -->
        <a href="index.html" class="site-header__logo-link" aria-label="StyloBliss Home">
          <span class="site-header__logo-text">StyloBliss</span>
        </a>

        <!-- Desktop nav -->
        <div class="site-header__desktop-nav">
          <ul class="site-header__nav-list" role="menubar">
            <div></div>

            <!-- Explore trigger -->
            <li class="site-header__nav-item" role="none">
              <button
                class="site-header__nav-trigger"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded="false"
                data-menu-trigger="explore"
              >
                Explore ${buildChevronHtml()}
              </button>
            </li>

            <!-- Engage trigger -->
            <li class="site-header__nav-item" role="none">
              <button
                class="site-header__nav-trigger"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded="false"
                data-menu-trigger="engage"
              >
                Engage ${buildChevronHtml()}
              </button>
            </li>

            <!-- Pricing -->
            <li class="site-header__nav-item" role="none">
              <a href="pricing.html" class="site-header__nav-link${pricingActive}" role="menuitem">Pricing</a>
            </li>

            <!-- Why StyloBliss -->
            <li class="site-header__nav-item" role="none">
              <a href="why-stylobliss.html" class="site-header__nav-link${whyActive}" role="menuitem">Why StyloBliss</a>
            </li>
          </ul>

          <!-- Login -->
          <a href="login.html" class="site-header__login-link">Login</a>

          <!-- CTA -->
          <a href="trial.html" class="site-header__cta-button">Try It for Free</a>
        </div>

        <!-- Mobile hamburger button -->
        <button
          class="site-header__hamburger-btn"
          id="site-hamburger-btn"
          aria-label="Toggle menu"
          aria-expanded="false"
          aria-controls="site-mobile-menu"
        >
          ${buildHamburgerIconSvg()}
        </button>

        <!-- Mega menu panel (positioned below header) -->
        <div class="site-header__mega-menu" id="site-mega-menu" role="region" aria-label="Dropdown menu">
          <!-- Popover arrow -->
          <div class="site-header__mega-menu-arrow" id="site-mega-menu-arrow"></div>
          <!-- Panel body -->
          <div class="site-header__mega-menu-body" id="site-mega-menu-body"></div>
        </div>
      </nav>

      <!-- Backdrop blur overlay -->
      <div class="site-header__backdrop" id="site-header-backdrop" aria-hidden="true"></div>
    </header>
  `;
}

/* ─── Mega Menu Panel HTML ───────────────────────────────────────────────────── */

/**
 * Builds the Explore dropdown panel HTML.
 * @returns {string}
 */
function buildExplorePanelHtml() {
  return `
    <div class="site-mega-menu__panel site-mega-menu__panel--explore">
      <!-- Left: Product + Resources -->
      <div class="site-mega-menu__group-col">
        <!-- Product -->
        <div class="site-mega-menu__link-group">
          <p class="site-mega-menu__group-label">Product</p>
          <ul class="site-mega-menu__link-list">
            <li><a href="salons.html" class="site-mega-menu__link" data-mega-menu-link>Salons</a></li>
          </ul>
        </div>
        <!-- Resources -->
        <div class="site-mega-menu__link-group">
          <p class="site-mega-menu__group-label">Resources</p>
          <ul class="site-mega-menu__link-list">
            <li><a href="faq.html" class="site-mega-menu__link" data-mega-menu-link>FAQ</a></li>
            <li><a href="tutorials.html" class="site-mega-menu__link" data-mega-menu-link>Tutorials</a></li>
            <li><a href="blog.html" class="site-mega-menu__link" data-mega-menu-link>Blog</a></li>
          </ul>
        </div>
      </div>
      <!-- Right: Why We're Different highlight card -->
      <a href="why-stylobliss.html" class="site-mega-menu__highlight-card site-mega-menu__highlight-card--dark" data-mega-menu-link>
        <div class="site-mega-menu__highlight-card-content">
          <h4 class="site-mega-menu__highlight-card-title">Why We're Different</h4>
          <p class="site-mega-menu__highlight-card-desc">Modern salon &amp; spa software that's fast, beautiful, and intuitive. See what sets StyloBliss apart.</p>
        </div>
        <div class="site-mega-menu__highlight-card-img-wrapper">
          <img
            src="https://images.unsplash.com/photo-1758188753373-5b01a0fc6d9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxvbiUyMHNwYSUyMGJlYXV0eSUyMHdlbGxuZXNzJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcwNzE1NjE4fDA&ixlib=rb-4.1.0&q=80&w=400"
            alt="Why We're Different"
            class="site-mega-menu__highlight-card-img"
            loading="lazy"
          />
        </div>
      </a>
    </div>
  `;
}

/**
 * Builds the Engage dropdown panel HTML.
 * @returns {string}
 */
function buildEngagePanelHtml() {
  return `
    <div class="site-mega-menu__panel site-mega-menu__panel--engage">
      <!-- Left: Get in Touch -->
      <div class="site-mega-menu__group-col site-mega-menu__group-col--padded">
        <div class="site-mega-menu__link-group">
          <p class="site-mega-menu__group-label">Get in Touch</p>
          <ul class="site-mega-menu__link-list">
            <li><a href="contact.html" class="site-mega-menu__link" data-mega-menu-link>Contact Us</a></li>
            <li><a href="demo.html" class="site-mega-menu__link" data-mega-menu-link>Book a Demo</a></li>
          </ul>
        </div>
      </div>
      <!-- Right: Scheduling & Payments highlight card -->
      <a href="why-stylobliss.html" class="site-mega-menu__highlight-card site-mega-menu__highlight-card--dark" data-mega-menu-link>
        <div class="site-mega-menu__highlight-card-content">
          <h4 class="site-mega-menu__highlight-card-title">Scheduling &amp; Payments</h4>
          <p class="site-mega-menu__highlight-card-desc">A complete booking and payment solution. Calendar, online booking, Express Booking, and integrated POS.</p>
        </div>
        <div class="site-mega-menu__highlight-card-img-wrapper">
          <img
            src="https://images.unsplash.com/photo-1769596722257-282ec3fe8594?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBzY2hlZHVsaW5nJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcwNzE1NjE5fDA&ixlib=rb-4.1.0&q=80&w=400"
            alt="Scheduling and Payments"
            class="site-mega-menu__highlight-card-img"
            loading="lazy"
          />
        </div>
      </a>
    </div>
  `;
}

/* ─── Mobile Menu HTML ───────────────────────────────────────────────────────── */

/**
 * Builds the mobile menu overlay HTML.
 * @returns {string}
 */
function buildMobileMenuHtml() {
  return `
    <div class="site-mobile-menu" id="site-mobile-menu" role="dialog" aria-label="Mobile navigation" aria-modal="true">
      <div class="site-mobile-menu__inner">
        <a href="salons.html" class="site-mobile-menu__link">Salons</a>
        <a href="faq.html" class="site-mobile-menu__link">FAQ</a>
        <a href="tutorials.html" class="site-mobile-menu__link">Tutorials</a>
        <a href="blog.html" class="site-mobile-menu__link">Blog</a>
        <a href="pricing.html" class="site-mobile-menu__link">Pricing</a>
        <a href="why-stylobliss.html" class="site-mobile-menu__link">Why StyloBliss</a>
        <a href="contact.html" class="site-mobile-menu__link">Contact</a>
        <a href="demo.html" class="site-mobile-menu__link">Book a Demo</a>
        <hr class="site-mobile-menu__divider" aria-hidden="true" />
        <a href="login.html" class="site-mobile-menu__link">Login</a>
        <a href="trial.html" class="site-mobile-menu__cta-button">Try It for Free</a>
      </div>
    </div>
  `;
}

/* ─── Footer HTML ────────────────────────────────────────────────────────────── */

/**
 * Builds the full site footer HTML string.
 * @returns {string}
 */
function buildFooterHtml() {
  return `
    <div class="site-footer-wrapper">
      <!-- Soft fade overlay -->
      <div class="site-footer-wrapper__fade-overlay" aria-hidden="true"></div>
      <!-- Radial gradient accents -->
      <div class="site-footer-wrapper__accent-glow" aria-hidden="true"></div>
      <!-- Corner glow -->
      <div class="site-footer-wrapper__corner-glow" aria-hidden="true"></div>

      <footer class="site-footer">
        <div class="site-footer__card">

          <!-- Logo -->
          <div class="site-footer__logo-row">
            <a href="index.html" class="site-footer__logo-link">
              <span class="site-footer__logo-text">StyloBliss</span>
            </a>
          </div>

          <!-- 3-column grid -->
          <div class="site-footer__columns">
            <!-- EXPLORE -->
            <div class="site-footer__column">
              <span class="site-footer__column-heading">EXPLORE</span>
              <ul class="site-footer__column-links">
                <li><a href="salons.html" class="site-footer__column-link">Salons</a></li>
                <li><a href="faq.html" class="site-footer__column-link">FAQ</a></li>
                <li><a href="tutorials.html" class="site-footer__column-link">Tutorials</a></li>
                <li><a href="blog.html" class="site-footer__column-link">Blog</a></li>
              </ul>
            </div>
            <!-- ENGAGE -->
            <div class="site-footer__column">
              <span class="site-footer__column-heading">ENGAGE</span>
              <ul class="site-footer__column-links">
                <li><a href="contact.html" class="site-footer__column-link">Contact Us</a></li>
                <li><a href="demo.html" class="site-footer__column-link">Book a Demo</a></li>
              </ul>
            </div>
            <!-- PLATFORM -->
            <div class="site-footer__column">
              <span class="site-footer__column-heading">PLATFORM</span>
              <ul class="site-footer__column-links">
                <li><a href="pricing.html" class="site-footer__column-link">Pricing</a></li>
                <li><a href="why-stylobliss.html" class="site-footer__column-link">Why StyloBliss</a></li>
                <li><a href="login.html" class="site-footer__column-link">Login</a></li>
                <li><a href="trial.html" class="site-footer__column-link">Try It for Free</a></li>
              </ul>
            </div>
          </div>

          <!-- Bottom bar -->
          <div class="site-footer__bottom-bar">
            <div class="site-footer__bottom-bar-copyright">&copy; StyloBliss, Inc. All rights reserved.</div>
            <div class="site-footer__bottom-bar-links">
              <a href="#" class="site-footer__bottom-bar-link">Legal</a>
              <a href="#" class="site-footer__bottom-bar-link">Terms of Service</a>
              <a href="#" class="site-footer__bottom-bar-link">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

      <!-- Tagline below footer -->
      <div class="site-footer__tagline-row">
        <p class="site-footer__tagline">Do something beautiful today.</p>
      </div>
    </div>
  `;
}

/* ─── Mesh Background HTML ───────────────────────────────────────────────────── */

/**
 * Builds the mesh gradient background HTML.
 * @returns {string}
 */
function buildMeshBackgroundHtml() {
  return `
    <div class="mesh-gradient-background" aria-hidden="true">
      <div class="mesh-gradient-background__orb mesh-gradient-background__orb--periwinkle-top"></div>
      <div class="mesh-gradient-background__orb mesh-gradient-background__orb--peach-top"></div>
      <div class="mesh-gradient-background__orb mesh-gradient-background__orb--purple-mid"></div>
      <div class="mesh-gradient-background__orb mesh-gradient-background__orb--pink-lower"></div>
      <div class="mesh-gradient-background__orb mesh-gradient-background__orb--periwinkle-bottom"></div>
    </div>
  `;
}

/* ─── Chatbot Widget HTML ────────────────────────────────────────────────────── */

/**
 * Builds the chatbot widget HTML.
 * @returns {string}
 */
function buildChatbotWidgetHtml() {
  return `
    <div class="chatbot-widget" id="chatbot-widget">
      <!-- Chat card (hidden by default) -->
      <div class="chatbot-widget__card" id="chatbot-card" role="dialog" aria-label="StyloBliss AI Chat" aria-modal="true">
        <!-- Header -->
        <div class="chatbot-widget__card-header">
          <div class="chatbot-widget__card-header-identity">
            <div class="chatbot-widget__card-header-avatar" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(188,38,155)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <div>
              <div class="chatbot-widget__card-header-name">StyloBliss AI</div>
              <div class="chatbot-widget__card-header-status">
                <span class="chatbot-widget__card-header-status-dot"></span>
                Always online
              </div>
            </div>
          </div>
          <button class="chatbot-widget__card-close-btn" id="chatbot-close-btn" aria-label="Close chat">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <!-- Messages -->
        <div class="chatbot-widget__messages" id="chatbot-messages">
          <!-- Initial welcome message -->
          <div class="chatbot-widget__message-row" data-message-role="assistant">
            <div class="chatbot-widget__message-avatar" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgb(252,250,250)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <div class="chatbot-widget__message-bubble chatbot-widget__message-bubble--assistant">
              Hi there! 👋 I'm the StyloBliss assistant. I can help you learn about our salon &amp; spa platform, pricing, or set up a demo. How can I help?
            </div>
          </div>

          <!-- Quick action buttons (shown after welcome) -->
          <div class="chatbot-widget__quick-actions" id="chatbot-quick-actions">
            <button class="chatbot-widget__quick-action-btn" data-quick-action="Book a demo" data-quick-response="I'd love to set up a personalized demo for you! You can pick a time that works best — our team will walk you through everything StyloBliss can do for your salon or spa. Would you like me to take you to the booking page?">
              <span>📅</span>
              <span class="chatbot-widget__quick-action-label">Book a demo</span>
              <svg class="chatbot-widget__quick-action-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgb(188,38,155)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <button class="chatbot-widget__quick-action-btn" data-quick-action="See pricing" data-quick-response="Great question! StyloBliss offers flexible plans designed for salons and spas of every size — from solo stylists to multi-location businesses. Shall I walk you through the options, or would you prefer to visit our pricing page directly?">
              <span>💰</span>
              <span class="chatbot-widget__quick-action-label">See pricing</span>
              <svg class="chatbot-widget__quick-action-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgb(188,38,155)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <button class="chatbot-widget__quick-action-btn" data-quick-action="How it works" data-quick-response="StyloBliss is an all-in-one platform that handles scheduling, payments, client management, and marketing — beautifully designed and lightning-fast on every device. It's built from the ground up for beauty &amp; wellness professionals who demand better. Want to know more about a specific feature?">
              <span>✨</span>
              <span class="chatbot-widget__quick-action-label">How it works</span>
              <svg class="chatbot-widget__quick-action-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgb(188,38,155)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </div>

        <!-- Input area -->
        <div class="chatbot-widget__input-area">
          <form class="chatbot-widget__input-form" id="chatbot-form" autocomplete="off">
            <input
              type="text"
              id="chatbot-input"
              class="chatbot-widget__input-field"
              placeholder="Ask anything about StyloBliss..."
              aria-label="Type your message"
              autocomplete="off"
            />
            <button
              type="submit"
              id="chatbot-send-btn"
              class="chatbot-widget__send-btn"
              aria-label="Send message"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(25,30,73,0.25)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:1px"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </form>
          <div class="chatbot-widget__input-powered-by">Powered by StyloBliss AI</div>
        </div>
      </div>

      <!-- FAB button -->
      <button class="chatbot-widget__fab" id="chatbot-fab-btn" aria-label="Open StyloBliss AI chat" aria-expanded="false" aria-controls="chatbot-card">
        <span class="chatbot-widget__fab-icon chatbot-widget__fab-icon--visible" id="chatbot-fab-icon-open">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M4 7C4 4.79086 5.79086 3 8 3H24C26.2091 3 28 4.79086 28 7V19C28 21.2091 26.2091 23 24 23H13.5L8.5 27.5C7.5 28.4 6 27.7 6 26.3V23H8C5.79086 23 4 21.2091 4 19V7Z" fill="white"/>
            <circle cx="11" cy="13" r="1.8" fill="#bc269b"/>
            <circle cx="16" cy="13" r="1.8" fill="#bc269b"/>
            <circle cx="21" cy="13" r="1.8" fill="#bc269b"/>
          </svg>
        </span>
        <span class="chatbot-widget__fab-icon chatbot-widget__fab-icon--hidden" id="chatbot-fab-icon-close">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </span>
        <span class="chatbot-widget__unread-badge" id="chatbot-unread-badge" aria-label="New message"></span>
      </button>
    </div>
  `;
}

/* ─── Main inject function ───────────────────────────────────────────────────── */

/**
 * Injects the shared site layout (mesh background, header, mobile menu,
 * footer, chatbot widget) into the page mount points.
 *
 * @param {{ includeLayout?: boolean; includeChatbot?: boolean }} options
 *   - includeLayout: set false for standalone pages (login, trial) to skip header/footer
 *   - includeChatbot: always true — chatbot appears on all pages
 */
function injectSiteLayout({ includeLayout = true, includeChatbot = true } = {}) {
  const currentPath = window.location.pathname;

  // Mesh background (all pages)
  const meshMount = document.getElementById('site-mesh-background');
  if (meshMount) {
    meshMount.innerHTML = buildMeshBackgroundHtml();
  }

  if (includeLayout) {
    // Header
    const headerMount = document.getElementById('site-header-mount');
    if (headerMount) {
      headerMount.innerHTML = buildHeaderHtml(currentPath);
    }

    // Mobile menu overlay
    const mobileMenuMount = document.getElementById('site-mobile-menu-mount');
    if (mobileMenuMount) {
      mobileMenuMount.innerHTML = buildMobileMenuHtml();
    }

    // Footer
    const footerMount = document.getElementById('site-footer-mount');
    if (footerMount) {
      footerMount.innerHTML = buildFooterHtml();
    }
  }

  if (includeChatbot) {
    const chatbotMount = document.getElementById('chatbot-mount');
    if (chatbotMount) {
      chatbotMount.innerHTML = buildChatbotWidgetHtml();
    }
  }
}

export {
  injectSiteLayout,
  buildExplorePanelHtml,
  buildEngagePanelHtml,
};
