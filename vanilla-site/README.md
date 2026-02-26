# Stylobliss – Vanilla Site

## How to Run

1. Open the project folder in your terminal.
2. Start any local static server. For example:
   ```bash
   # Python
   python3 -m http.server 8000

   # Node (npx)
   npx serve .
   ```
3. Visit `http://localhost:8000` in your browser.

> **Tip:** You can also just open `index.html` directly in a browser — no server needed for basic browsing.

## Project Structure

```
vanilla-site/
├── index.html              # Homepage
├── salons.html             # Salons page
├── pricing.html            # Pricing page
├── why.html                # Why Stylobliss
├── tutorials.html          # Tutorials
├── blog.html               # Blog
├── faq.html                # FAQ
├── contact.html            # Contact
├── demo.html               # Request a demo
├── login.html              # Login
├── trial.html              # Free trial signup
│
├── assets/                 # Images & media
│   ├── feature-*.png       # Feature section images
│   ├── icon-*.png          # UI icons (booking, POS, payroll, etc.)
│   ├── asset-*.png         # Misc branded assets
│   ├── div-bg-*.png        # Section background textures
│   ├── marketing-*.png     # Marketing banner images
│   ├── blog-featured.png   # Blog hero image
│   ├── cta-desktop.png     # CTA section desktop visual
│   ├── login-bg-warm.png   # Login page background
│   └── testimonials-header.png
│
├── styles/                 # All CSS
│   ├── base.css            # CSS reset & variables
│   ├── components.css      # Reusable component styles (buttons, cards, etc.)
│   ├── layout.css          # Header, footer, grid & layout utilities
│   └── pages/              # Page-specific styles
│       ├── home.css
│       ├── salons.css
│       ├── pricing.css
│       ├── why.css
│       ├── tutorials.css
│       ├── blog.css
│       ├── faq.css
│       ├── contact.css
│       ├── demo.css
│       ├── login.css
│       ├── trial.css
│       └── carousel.css    # Carousel / slider component
│
└── scripts/                # JavaScript
    ├── app.js              # Main app logic & page initialisation
    ├── components.js       # Shared interactive components (accordions, sliders, etc.)
    └── nav.js              # Navigation & mobile menu behaviour
```
