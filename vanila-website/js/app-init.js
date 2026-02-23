/**
 * app-init.js
 * Entry point for all pages.
 * - Injects shared site layout (header, footer, mesh background, chatbot)
 * - Initialises interactive feature modules based on elements present in DOM
 */

import { injectSiteLayout } from './site-layout.js';
import { initSiteNavbar } from './site-navbar.js';

document.addEventListener('DOMContentLoaded', async () => {
  // ── 1. Inject shared layout (header, mobile menu, footer, chatbot, mesh bg) ──
  injectSiteLayout();

  // ── 2. Initialise navbar (always present after layout injection) ──
  initSiteNavbar();

  // ── 3. Conditionally initialise feature modules ──

  // Logo marquee
  if (document.querySelector('.logo-marquee-track')) {
    const { initLogoMarquee } = await import('./logo-marquee.js');
    initLogoMarquee();
  }

  // Screenshot carousel
  if (document.querySelector('.screenshot-carousel-tabs')) {
    const { initScreenshotCarousel } = await import('./screenshot-carousel.js');
    initScreenshotCarousel();
  }

  // Customer stories
  if (document.querySelector('.customer-stories-section')) {
    const { initCustomerStories } = await import('./customer-stories.js');
    initCustomerStories();
  }

  // FAQ accordion (any page)
  if (document.querySelector('.faq-item')) {
    const { initFaqAccordion } = await import('./faq-accordion.js');
    initFaqAccordion();
  }

  // Chatbot widget (injected by site-layout.js)
  if (document.querySelector('#chatbot-widget')) {
    const { initChatbotWidget } = await import('./chatbot-widget.js');
    initChatbotWidget();
  }

  // Pricing toggle
  if (document.querySelector('#billing-toggle')) {
    initPricingToggle();
  }

  // Blog filter chips
  if (document.querySelector('.page-blog__filter-chip')) {
    initBlogFilters();
  }

  // Tutorial filter chips
  if (document.querySelector('.page-tutorials__filter-chip')) {
    initTutorialFilters();
  }

  // Salon logo marquee (page-specific)
  if (document.querySelector('.page-salons__logo-track')) {
    initSalonLogoMarquee();
  }

  // Login testimonial carousel
  if (document.querySelector('.login-testimonials')) {
    initLoginTestimonials();
  }

  // Trial page quiz
  if (document.querySelector('.page-trial__quiz')) {
    initTrialQuiz();
  }
});

/* ─────────────────────────────────────────────────────────
   Pricing toggle (annual / monthly)
   ───────────────────────────────────────────────────────── */
function initPricingToggle() {
  const toggle = document.getElementById('billing-toggle');
  const annualLabel = document.getElementById('billing-label-annual');
  const monthlyLabel = document.getElementById('billing-label-monthly');
  const prices = document.querySelectorAll('[data-monthly][data-annual]');
  const saveBadge = document.getElementById('billing-save-badge');

  if (!toggle) return;

  let isAnnual = true;

  function updatePrices() {
    prices.forEach((el) => {
      const val = isAnnual ? el.getAttribute('data-annual') : el.getAttribute('data-monthly');
      el.textContent = val;
    });
    if (annualLabel) annualLabel.classList.toggle('active', isAnnual);
    if (monthlyLabel) monthlyLabel.classList.toggle('active', !isAnnual);
    if (saveBadge) saveBadge.style.opacity = isAnnual ? '1' : '0';
  }

  toggle.addEventListener('change', () => {
    isAnnual = toggle.checked;
    updatePrices();
  });

  updatePrices();
}

/* ─────────────────────────────────────────────────────────
   Blog filter chips
   ───────────────────────────────────────────────────────── */
function initBlogFilters() {
  const chips = document.querySelectorAll('.page-blog__filter-chip');
  const cards = document.querySelectorAll('[data-blog-category]');

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');

      const category = chip.getAttribute('data-category');
      cards.forEach((card) => {
        if (category === 'all' || card.getAttribute('data-blog-category') === category) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ─────────────────────────────────────────────────────────
   Tutorial filter chips
   ───────────────────────────────────────────────────────── */
function initTutorialFilters() {
  const chips = document.querySelectorAll('.page-tutorials__filter-chip');
  const cards = document.querySelectorAll('[data-tutorial-category]');

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');

      const category = chip.getAttribute('data-category');
      cards.forEach((card) => {
        if (category === 'all' || card.getAttribute('data-tutorial-category') === category) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ─────────────────────────────────────────────────────────
   Salon logo marquee (inline CSS animation)
   ───────────────────────────────────────────────────────── */
function initSalonLogoMarquee() {
  const tracks = document.querySelectorAll('.page-salons__logo-track');
  tracks.forEach((track) => {
    const items = [...track.children];
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });
  });
}

/* ─────────────────────────────────────────────────────────
   Login testimonial auto-carousel
   ───────────────────────────────────────────────────────── */
function initLoginTestimonials() {
  const slides = document.querySelectorAll('.login-testimonial-slide');
  const dots = document.querySelectorAll('.login-testimonial-dot');
  if (!slides.length) return;

  let current = 0;
  let interval = null;

  function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    current = index;
  }

  function next() {
    showSlide((current + 1) % slides.length);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      clearInterval(interval);
      interval = setInterval(next, 5000);
    });
  });

  showSlide(0);
  interval = setInterval(next, 5000);
}

/* ─────────────────────────────────────────────────────────
   Trial page quiz
   ───────────────────────────────────────────────────────── */
function initTrialQuiz() {
  const steps = document.querySelectorAll('.page-trial__step');
  const progressFill = document.getElementById('trial-progress-fill');
  const progressText = document.getElementById('trial-progress-text');
  let currentStep = 0;

  function showStep(index) {
    steps.forEach((s, i) => s.classList.toggle('active', i === index));
    currentStep = index;

    const total = steps.length;
    const percent = Math.round(((index + 1) / total) * 100);
    if (progressFill) progressFill.style.width = `${percent}%`;
    if (progressText) progressText.textContent = `Step ${index + 1} of ${total}`;
  }

  // Next buttons
  document.querySelectorAll('[data-trial-next]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (currentStep < steps.length - 1) {
        showStep(currentStep + 1);
      }
    });
  });

  // Back buttons
  document.querySelectorAll('[data-trial-back]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) {
        showStep(currentStep - 1);
      }
    });
  });

  // Single-select options (auto-advance)
  document.querySelectorAll('.page-trial__option[data-auto-advance]').forEach((option) => {
    option.addEventListener('click', () => {
      const group = option.closest('.page-trial__options');
      if (group) {
        group.querySelectorAll('.page-trial__option').forEach((o) => o.classList.remove('selected'));
      }
      option.classList.add('selected');

      setTimeout(() => {
        if (currentStep < steps.length - 1) {
          showStep(currentStep + 1);
        }
      }, 300);
    });
  });

  // Multi-select options (just toggle selected)
  document.querySelectorAll('.page-trial__option[data-multi]').forEach((option) => {
    option.addEventListener('click', () => {
      option.classList.toggle('selected');
    });
  });

  showStep(0);
}
