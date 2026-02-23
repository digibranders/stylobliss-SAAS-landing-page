/**
 * site-layout.js
 * Injects shared header, mobile menu, mesh background, footer, and chatbot
 * into every page. Marks the active nav link based on current pathname.
 */

/* ─────────────────────────────────────────────────────────
   Header HTML
   ───────────────────────────────────────────────────────── */
function buildHeaderHtml() {
  return `
<header class="site-header" id="site-header">
  <div class="site-header__backdrop" id="header-backdrop"></div>
  <nav class="site-header__nav">
    <!-- Logo -->
    <a href="index.html" class="site-header__logo">
      <span class="site-header__logo-text">StyloBliss</span>
    </a>

    <!-- Desktop nav items -->
    <div class="site-header__nav-items">
      <ul class="site-header__nav-list">
        <!-- Explore dropdown -->
        <li class="site-header__nav-item">
          <button class="site-header__nav-btn" data-mega="explore" aria-expanded="false">
            Explore
            <span class="site-header__chevron" id="chevron-explore"></span>
          </button>
        </li>

        <!-- Engage dropdown -->
        <li class="site-header__nav-item">
          <button class="site-header__nav-btn" data-mega="engage" aria-expanded="false">
            Engage
            <span class="site-header__chevron" id="chevron-engage"></span>
          </button>
        </li>

        <!-- Salons -->
        <li class="site-header__nav-item">
          <a href="salons.html" class="site-header__nav-link" data-page="salons">Salons</a>
        </li>

        <!-- Why StyloBliss -->
        <li class="site-header__nav-item">
          <a href="why-stylobliss.html" class="site-header__nav-link" data-page="why-stylobliss">Why StyloBliss</a>
        </li>

        <!-- Pricing -->
        <li class="site-header__nav-item">
          <a href="pricing.html" class="site-header__nav-link" data-page="pricing">Pricing</a>
        </li>
      </ul>

      <!-- Login + CTA -->
      <a href="login.html" class="site-header__login-link" data-page="login">Log in</a>
      <a href="trial.html" class="site-header__cta-link" data-page="trial">Start free trial</a>
    </div>

    <!-- Mobile hamburger -->
    <button class="site-header__hamburger" id="mobile-hamburger" aria-label="Open menu">
      <span class="site-header__hamburger-icon">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>
  </nav>

  <!-- ── Mega menu: Explore ── -->
  <div class="site-header__mega-panel" id="mega-explore">
    <div class="site-header__mega-arrow" id="mega-arrow-explore"></div>
    <div class="site-header__mega-container">
      <div class="mega-panel__explore">
        <!-- Links column -->
        <div class="mega-panel__link-list">
          <div class="mega-panel__section-title">Scheduling & Payments</div>
          <div class="mega-panel__links">
            <a href="#" class="mega-panel__link">Calendar &amp; Scheduling</a>
            <a href="#" class="mega-panel__link">Online Booking</a>
            <a href="#" class="mega-panel__link">Express Booking™</a>
            <a href="#" class="mega-panel__link">Payments &amp; POS</a>
            <a href="#" class="mega-panel__link">Mobile Apps</a>
          </div>
        </div>
        <!-- Highlight card -->
        <a href="salons.html" class="mega-panel__highlight-card">
          <div class="mega-panel__highlight-card-text">
            <span class="mega-panel__highlight-card-title">Built for salons</span>
            <span class="mega-panel__highlight-card-desc">All-in-one platform for salon management</span>
          </div>
          <div class="mega-panel__highlight-card-img">
            <img src="https://images.unsplash.com/photo-1706629503603-e47c37722776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=240" alt="Salon" />
          </div>
        </a>
      </div>
    </div>
  </div>

  <!-- ── Mega menu: Engage ── -->
  <div class="site-header__mega-panel" id="mega-engage">
    <div class="site-header__mega-arrow" id="mega-arrow-engage"></div>
    <div class="site-header__mega-container">
      <div class="mega-panel__engage">
        <!-- Links column -->
        <div class="mega-panel__link-list">
          <div class="mega-panel__section-title">Marketing &amp; Automation</div>
          <div class="mega-panel__links">
            <a href="#" class="mega-panel__link">Automated Flows</a>
            <a href="#" class="mega-panel__link">Campaigns</a>
            <a href="#" class="mega-panel__link">Client Management</a>
            <a href="#" class="mega-panel__link">Memberships &amp; Packages</a>
            <a href="#" class="mega-panel__link">Gift Cards</a>
          </div>
        </div>
        <!-- Highlight card -->
        <a href="why-stylobliss.html" class="mega-panel__highlight-card">
          <div class="mega-panel__highlight-card-text">
            <span class="mega-panel__highlight-card-title">Why StyloBliss</span>
            <span class="mega-panel__highlight-card-desc">See why 10,000+ salons chose us</span>
          </div>
          <div class="mega-panel__highlight-card-img">
            <img src="https://images.unsplash.com/photo-1637777277337-f114350fb088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=240" alt="Why StyloBliss" />
          </div>
        </a>
      </div>
    </div>
  </div>

  <!-- ── Mega backdrop ── -->
  <div class="site-header__mega-backdrop" id="mega-backdrop"></div>
</header>
`;
}

/* ─────────────────────────────────────────────────────────
   Mobile menu HTML
   ───────────────────────────────────────────────────────── */
function buildMobileMenuHtml() {
  return `
<div class="site-mobile-menu" id="site-mobile-menu" role="dialog" aria-label="Navigation menu">
  <div class="site-mobile-menu__inner">
    <a href="index.html" class="site-mobile-menu__link" data-page="home">Home</a>
    <a href="salons.html" class="site-mobile-menu__link" data-page="salons">Salons</a>
    <a href="pricing.html" class="site-mobile-menu__link" data-page="pricing">Pricing</a>
    <a href="why-stylobliss.html" class="site-mobile-menu__link" data-page="why-stylobliss">Why StyloBliss</a>
    <a href="faq.html" class="site-mobile-menu__link" data-page="faq">FAQ</a>
    <a href="tutorials.html" class="site-mobile-menu__link" data-page="tutorials">Tutorials</a>
    <a href="blog.html" class="site-mobile-menu__link" data-page="blog">Blog</a>
    <hr class="site-mobile-menu__divider" />
    <a href="login.html" class="site-mobile-menu__link" data-page="login">Log in</a>
    <a href="trial.html" class="site-mobile-menu__cta">Start free trial</a>
  </div>
</div>
`;
}

/* ─────────────────────────────────────────────────────────
   Mesh background HTML
   ───────────────────────────────────────────────────────── */
function buildMeshHtml() {
  return `
<div class="mesh-gradient-background" aria-hidden="true">
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="orb orb-3"></div>
  <div class="orb orb-4"></div>
  <div class="orb orb-5"></div>
</div>
`;
}

/* ─────────────────────────────────────────────────────────
   Footer HTML
   ───────────────────────────────────────────────────────── */
function buildFooterHtml() {
  return `
<section class="site-footer-section">
  <footer class="site-footer">
    <div class="site-footer__inner">
      <!-- Logo -->
      <div class="site-footer__logo-wrap">
        <a href="index.html" class="site-footer__logo">StyloBliss</a>
      </div>

      <!-- Columns grid -->
      <div class="site-footer__grid">
        <!-- Scheduling & Payments -->
        <div class="site-footer__card">
          <span class="site-footer__card-title">Scheduling &amp; Payments</span>
          <div class="site-footer__links">
            <a href="#" class="site-footer__link">Calendar &amp; Scheduling</a>
            <a href="#" class="site-footer__link">Online Booking</a>
            <a href="#" class="site-footer__link">Express Booking™</a>
            <a href="#" class="site-footer__link">Payments &amp; POS</a>
            <a href="#" class="site-footer__link">Mobile Apps</a>
          </div>
        </div>

        <!-- Client Relationships -->
        <div class="site-footer__card">
          <span class="site-footer__card-title">Client Relationships</span>
          <div class="site-footer__links">
            <a href="#" class="site-footer__link">Client Management</a>
            <a href="#" class="site-footer__link">Call, Text &amp; Chat</a>
            <a href="#" class="site-footer__link">Memberships &amp; Packages</a>
            <a href="#" class="site-footer__link">Forms &amp; Charting</a>
            <a href="#" class="site-footer__link">Gift Cards</a>
          </div>
        </div>

        <!-- Company -->
        <div class="site-footer__card">
          <span class="site-footer__card-title">Company</span>
          <div class="site-footer__links">
            <a href="why-stylobliss.html" class="site-footer__link">Why StyloBliss</a>
            <a href="pricing.html" class="site-footer__link">Pricing</a>
            <a href="blog.html" class="site-footer__link">Blog</a>
            <a href="tutorials.html" class="site-footer__link">Tutorials</a>
            <a href="contact.html" class="site-footer__link">Contact</a>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="site-footer__bottom">
        <span>© 2024 StyloBliss. All rights reserved.</span>
        <div class="site-footer__legal-links">
          <a href="#" class="site-footer__legal-link">Privacy Policy</a>
          <a href="#" class="site-footer__legal-link">Terms of Service</a>
          <a href="#" class="site-footer__legal-link">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Tagline below footer -->
  <div class="site-footer__tagline">
    <p>Do something beautiful today. ✦</p>
  </div>
</section>
`;
}

/* ─────────────────────────────────────────────────────────
   Chatbot widget HTML
   ───────────────────────────────────────────────────────── */
function buildChatbotHtml() {
  return `
<div id="chatbot-widget">
  <!-- Trigger button -->
  <button class="chatbot-widget__trigger" id="chatbot-trigger" aria-label="Open chat">
    <svg class="chatbot-widget__trigger-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  </button>

  <!-- Dialog panel -->
  <div class="chatbot-widget__panel" id="chatbot-panel" role="dialog" aria-label="Chat with us">
    <!-- Header -->
    <div class="chatbot-widget__header">
      <div class="chatbot-widget__header-info">
        <span class="chatbot-widget__header-title">StyloBliss Support</span>
        <span class="chatbot-widget__header-status">
          <span class="chatbot-widget__status-dot"></span>
          Online
        </span>
      </div>
      <button class="chatbot-widget__close-btn" id="chatbot-close" aria-label="Close chat">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>

    <!-- Messages -->
    <div class="chatbot-widget__messages" id="chatbot-messages">
      <div class="chatbot-msg chatbot-msg--bot">
        <div class="chatbot-msg__bubble">👋 Hi! I'm here to help you get started with StyloBliss. What can I help you with today?</div>
      </div>
    </div>

    <!-- Typing indicator -->
    <div class="chatbot-typing" id="chatbot-typing">
      <div class="chatbot-typing__bubble">
        <span class="chatbot-typing__dot"></span>
        <span class="chatbot-typing__dot"></span>
        <span class="chatbot-typing__dot"></span>
      </div>
    </div>

    <!-- Input area -->
    <div class="chatbot-widget__input-area">
      <input
        type="text"
        class="chatbot-widget__input"
        id="chatbot-input"
        placeholder="Type a message..."
        aria-label="Message input"
      />
      <button class="chatbot-widget__send-btn" id="chatbot-send" aria-label="Send message">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </div>
  </div>
</div>
`;
}

/* ─────────────────────────────────────────────────────────
   Inject Layout
   ───────────────────────────────────────────────────────── */

/**
 * Injects the shared site layout (mesh BG, header, mobile menu, footer, chatbot)
 * into the corresponding mount points in the page.
 * @param {Object} [options]
 * @param {string} [options.activePage] - Key matching data-page attribute on nav links
 */
export function injectSiteLayout(options = {}) {
  const meshMount = document.getElementById('site-mesh-background');
  if (meshMount) meshMount.innerHTML = buildMeshHtml();

  const headerMount = document.getElementById('site-header-mount');
  if (headerMount) headerMount.innerHTML = buildHeaderHtml();

  const mobileMenuMount = document.getElementById('site-mobile-menu-mount');
  if (mobileMenuMount) mobileMenuMount.innerHTML = buildMobileMenuHtml();

  const footerMount = document.getElementById('site-footer-mount');
  if (footerMount) footerMount.innerHTML = buildFooterHtml();

  const chatbotMount = document.getElementById('chatbot-mount');
  if (chatbotMount) chatbotMount.innerHTML = buildChatbotHtml();

  // Mark active nav link
  const pathname = window.location.pathname;
  const activePage = options.activePage || detectActivePage(pathname);
  if (activePage) {
    document.querySelectorAll('[data-page]').forEach((el) => {
      if (el.getAttribute('data-page') === activePage) {
        el.classList.add('active');
      }
    });
  }
}

/**
 * Detects the active page slug from the current URL pathname.
 * @param {string} pathname
 * @returns {string}
 */
function detectActivePage(pathname) {
  const filename = pathname.split('/').pop().replace('.html', '') || 'home';
  const pageMap = {
    'index': 'home',
    '': 'home',
    'salons': 'salons',
    'pricing': 'pricing',
    'why-stylobliss': 'why-stylobliss',
    'faq': 'faq',
    'tutorials': 'tutorials',
    'blog': 'blog',
    'contact': 'contact',
    'demo': 'demo',
    'login': 'login',
    'trial': 'trial',
  };
  return pageMap[filename] || filename;
}
