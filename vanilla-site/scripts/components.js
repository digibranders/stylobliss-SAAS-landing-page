// vanilla-site/scripts/components.js

/* ============================================================
   CAROUSEL
   Mirrors the React ScreenshotCarousel exactly:
   - 5 slides, triple-cloned for infinite loop
   - Click nav button → jump to that slide
   - Auto-advance every 4 s with progress-fill animation
   - Drag/swipe support (pointer events)
   ============================================================ */

const FILL_DURATION = 4000;
const TOTAL = 5;

const SLIDES = [
    {
        src: 'https://images.unsplash.com/photo-1765561667528-28e39c6174dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9qZWN0JTIwbWFuYWdlbWVudCUyMHNvZnR3YXJlJTIwc2NyZWVufGVufDF8fHx8MTc3MDYyOTI2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
        label: 'Calendar',
    },
    {
        src: 'https://images.unsplash.com/photo-1653933686802-86d21b59b03b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBhdXRvbWF0aW9uJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc3MDYyOTI2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
        label: 'Online Booking',
    },
    {
        src: 'https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBhZG1pbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NzA2MjkyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        label: 'Sales & Payments',
    },
    {
        src: 'https://images.unsplash.com/photo-1763038311036-6d18805537e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGludGVsbGlnZW5jZSUyMGRhdGElMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc3MDYyOTI2NHww&ixlib=rb-4.1.0&q=80&w=1080',
        label: 'Calls & Texts',
    },
    {
        src: 'https://images.unsplash.com/photo-1554306274-f23873d9a26c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGFwcGxpY2F0aW9uJTIwZGVza3RvcCUyMHNjcmVlbnNob3R8ZW58MXx8fHwxNzcwNjI5MjY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        label: 'Marketing',
    },
];

export function initCarousel() {
    const container = document.querySelector('[data-carousel]');
    if (!container) return;

    const track = container.querySelector('.carousel-track');
    const trackContainer = container.querySelector('.carousel-track-container');
    const navBtns = Array.from(container.querySelectorAll('.carousel-desktop-nav .carousel-nav-btn'));
    const fillEls = Array.from(container.querySelectorAll('.carousel-desktop-nav .carousel-nav-fill'));

    // Mobile Nav Elements
    const mobileBtns = Array.from(container.querySelectorAll('.carousel-mobile-btn'));
    const mobileDots = Array.from(container.querySelectorAll('.carousel-mobile-dot'));
    const mobilePill = container.querySelector('.carousel-mobile-nav-pill');
    const mobilePillFill = container.querySelector('.carousel-mobile-nav-fill');
    const mobileScroll = container.querySelector('.carousel-mobile-nav-scroll');
    const fadeLeft = container.querySelector('.carousel-mobile-nav-fade-left');
    const fadeRight = container.querySelector('.carousel-mobile-nav-fade-right');

    if (!track || !trackContainer) return;

    // Build triple-clone slides if not already done
    if (track.children.length < TOTAL * 3) {
        _buildSlides(track);
    }

    let activeIndex = 0;
    let isDragging = false;
    let trackOffset = 0;
    let containerWidth = 0;
    let dragStartX = 0;
    let dragStartOffset = 0;
    let progressRAF = null;
    let progressStart = null;

    // ── Dims helper (matches React exactly) ──────────────────
    function getDims() {
        containerWidth = trackContainer.offsetWidth;
        if (containerWidth >= 1200) return { slideW: 1040, gap: 10, figureMx: 24, radius: 25 };
        if (containerWidth >= 768) return { slideW: Math.round(containerWidth * 0.72), gap: 10, figureMx: 16, radius: 20 };
        return { slideW: Math.round(containerWidth * 0.80), gap: 8, figureMx: 8, radius: 16 };
    }

    function getTargetOffset(index) {
        const d = getDims();
        const slideTotal = d.slideW + d.gap;
        // Center the active slide (index in the middle set = TOTAL + index)
        const slideCenter = (TOTAL + index) * slideTotal + d.slideW / 2;
        return slideCenter - containerWidth / 2;
    }

    // ── Update all slides' scale & overlay ───────────────────
    function updateSlideVisuals() {
        const slides = Array.from(track.querySelectorAll('.carousel-slide-wrapper'));
        slides.forEach((slide, i) => {
            const fig = slide.querySelector('.carousel-figure');
            const overlay = slide.querySelector('.carousel-overlay');
            // The middle set is TOTAL .. 2*TOTAL-1
            const isActive = i === (TOTAL + activeIndex);
            if (fig) fig.style.transform = isActive ? 'scale(1)' : 'scale(0.92)';
            if (overlay) overlay.style.opacity = isActive ? '0' : '0.35';
        });
    }

    function applyDims() {
        const d = getDims();
        const slides = Array.from(track.querySelectorAll('.carousel-slide-wrapper'));
        slides.forEach(slide => {
            slide.style.width = `${d.slideW}px`;
            slide.style.borderRadius = `${d.radius}px`;
            const fig = slide.querySelector('.carousel-figure');
            if (fig) {
                fig.style.marginLeft = `${d.figureMx}px`;
                fig.style.marginRight = `${d.figureMx}px`;
                fig.style.borderRadius = `${d.radius}px`;
            }
            const img = slide.querySelector('.carousel-img');
            if (img) img.style.borderRadius = `${d.radius}px`;
        });
        track.style.gap = `${d.gap}px`;
    }

    function snapTo(index, animate = true) {
        const offset = getTargetOffset(index);
        trackOffset = offset;
        track.style.transition = animate ? 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none';
        track.style.transform = `translate3d(-${offset}px, 0px, 0px)`;
        updateSlideVisuals();
    }

    // ── Nav button & Mobile Nav state ────────────────────────
    function updateNavBtns() {
        // Desktop
        navBtns.forEach((btn, i) => {
            if (i === activeIndex) {
                btn.classList.add('is-active');
            } else {
                btn.classList.remove('is-active');
                if (fillEls[i]) fillEls[i].style.width = '0%';
            }
        });

        // Mobile Buttons & Dots
        mobileBtns.forEach((btn, i) => {
            if (i === activeIndex) btn.classList.add('is-active');
            else btn.classList.remove('is-active');
        });
        mobileDots.forEach((dot, i) => {
            if (i === activeIndex) dot.classList.add('is-active');
            else dot.classList.remove('is-active');
        });

        // Move Mobile Pill
        if (mobilePill && mobileBtns[activeIndex]) {
            const btn = mobileBtns[activeIndex];
            mobilePill.style.left = `${btn.offsetLeft}px`;
            mobilePill.style.width = `${btn.offsetWidth}px`;
        }

        // Center Active Mobile Button in Scroll Area
        if (mobileScroll && mobileBtns[activeIndex]) {
            const btn = mobileBtns[activeIndex];
            const scrollLeft = btn.offsetLeft - mobileScroll.offsetWidth / 2 + btn.offsetWidth / 2;
            mobileScroll.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    }

    // ── Progress timer ────────────────────────────────────────
    // Mirrors React exactly: pure linear fill over FILL_DURATION, driven by rAF.
    // No easing or phase-split — the bar simply tracks elapsed / 4000ms.
    function startProgress() {
        cancelAnimationFrame(progressRAF);
        if (fillEls[activeIndex]) fillEls[activeIndex].style.width = '0%';
        if (mobilePillFill) mobilePillFill.style.width = '0%';
        progressStart = performance.now();

        function tick() {
            const elapsed = performance.now() - progressStart;
            const pct = Math.min(elapsed / FILL_DURATION, 1);

            if (fillEls[activeIndex]) fillEls[activeIndex].style.width = `${pct * 100}%`;
            if (mobilePillFill) mobilePillFill.style.width = `${pct * 100}%`;

            if (pct < 1) {
                progressRAF = requestAnimationFrame(tick);
            } else {
                // Auto-advance to next
                const next = (activeIndex + 1) % TOTAL;
                goTo(next);
            }
        }
        progressRAF = requestAnimationFrame(tick);
    }

    function goTo(index) {
        if (index === activeIndex && !isDragging) return;
        cancelAnimationFrame(progressRAF);
        activeIndex = index;
        snapTo(index, true);
        updateNavBtns();
        startProgress();
    }

    // ── Nav click handlers ────────────────────────────────────
    const attachClick = (elements) => {
        elements.forEach((el, i) => {
            el.addEventListener('click', () => {
                if (i !== activeIndex) goTo(i);
            });
        });
    };
    attachClick(navBtns);
    attachClick(mobileBtns);
    attachClick(mobileDots);

    // ── Mobile Scroll Fades ───────────────────────────────────
    if (mobileScroll) {
        const updateFades = () => {
            if (fadeLeft) fadeLeft.style.opacity = mobileScroll.scrollLeft > 4 ? '1' : '0';
            if (fadeRight) fadeRight.style.opacity = mobileScroll.scrollLeft < mobileScroll.scrollWidth - mobileScroll.clientWidth - 4 ? '1' : '0';
        };
        mobileScroll.addEventListener('scroll', updateFades, { passive: true });
        updateFades();
    }

    // ── Pointer drag ──────────────────────────────────────────
    trackContainer.style.cursor = 'grab';
    trackContainer.addEventListener('pointerdown', e => {
        isDragging = true;
        dragStartX = e.clientX;
        dragStartOffset = trackOffset;
        track.style.transition = 'none';
        trackContainer.style.cursor = 'grabbing';
        trackContainer.setPointerCapture(e.pointerId);
        cancelAnimationFrame(progressRAF);
    });

    trackContainer.addEventListener('pointermove', e => {
        if (!isDragging) return;
        const dx = dragStartX - e.clientX;
        trackOffset = dragStartOffset + dx;
        track.style.transform = `translate3d(-${trackOffset}px, 0px, 0px)`;
    });

    const stopDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        trackContainer.style.cursor = 'grab';
        // Snap to nearest slide
        const d = getDims();
        const slideTotal = d.slideW + d.gap;
        const baseOffset = TOTAL * slideTotal;
        const relativeOffset = trackOffset - baseOffset;
        let snapped = Math.round(relativeOffset / slideTotal);
        snapped = ((snapped % TOTAL) + TOTAL) % TOTAL;
        activeIndex = snapped;
        snapTo(snapped, true);
        updateNavBtns();
        startProgress();
    };

    trackContainer.addEventListener('pointerup', stopDrag);
    trackContainer.addEventListener('pointercancel', stopDrag);

    // ── Resize ────────────────────────────────────────────────
    const onResize = () => {
        applyDims();
        snapTo(activeIndex, false);
        // Reposition pill on resize without animation glitch
        if (mobilePill && mobileBtns[activeIndex]) {
            mobilePill.style.transition = 'none';
            mobilePill.style.left = `${mobileBtns[activeIndex].offsetLeft}px`;
            mobilePill.style.width = `${mobileBtns[activeIndex].offsetWidth}px`;
            // Restore transition slightly after
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    mobilePill.style.transition = 'left 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
                });
            });
        }
    };
    window.addEventListener('resize', onResize);

    // ── Initialize ────────────────────────────────────────────
    applyDims();
    containerWidth = trackContainer.offsetWidth;
    snapTo(0, false);
    updateNavBtns();
    startProgress();
}

// Build the full triple-cloned slide list into the track element
function _buildSlides(track) {
    track.innerHTML = '';
    const tripled = [...SLIDES, ...SLIDES, ...SLIDES];
    tripled.forEach(slide => {
        const wrapper = document.createElement('div');
        wrapper.className = 'carousel-slide-wrapper';
        wrapper.style.cssText = `
            display: grid;
            align-items: center;
            text-align: center;
            flex-shrink: 0;
            aspect-ratio: 52 / 31;
            transition: width 0.3s ease;
        `;
        const fig = document.createElement('figure');
        fig.className = 'carousel-figure';
        fig.style.cssText = `
            position: relative;
            text-align: center;
            overflow: hidden;
            box-shadow: rgba(0,0,0,0.09) 0px 10px 30px 0px;
            transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
        `;
        const overlay = document.createElement('div');
        overlay.className = 'carousel-overlay';
        overlay.style.cssText = `
            position: absolute;
            inset: 0;
            background: rgb(252,250,250);
            pointer-events: none;
            z-index: 3;
            opacity: 0.35;
            transition: opacity 0.6s ease;
        `;
        const img = document.createElement('img');
        img.className = 'carousel-img';
        img.src = slide.src;
        img.alt = slide.label;
        img.draggable = false;
        img.style.cssText = `
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            aspect-ratio: 2080 / 1240;
            user-select: none;
        `;
        fig.appendChild(overlay);
        fig.appendChild(img);
        wrapper.appendChild(fig);
        track.appendChild(wrapper);
    });
}

/* ============================================================
   PRICING TOGGLE & FAQ ACCORDION
   ============================================================ */
export function initPricing() {
    const pricingMain = document.querySelector('.pricing-main');
    if (!pricingMain) return;

    // ── Annual Toggle ──
    const toggleBtn = document.getElementById('pricing-toggle');
    const labelMonthly = document.getElementById('label-monthly');
    const labelAnnual = document.getElementById('label-annual');
    const saveBadge = document.getElementById('save-badge');

    let isAnnual = false;

    if (toggleBtn) {
        const priceNodes = document.querySelectorAll('.pricing-card-price');

        toggleBtn.addEventListener('click', () => {
            isAnnual = !isAnnual;

            if (isAnnual) {
                toggleBtn.style.background = 'rgb(188,38,155)';
                const knob = toggleBtn.querySelector('.pricing-toggle-knob');
                if (knob) knob.style.left = '27px';
                if (labelMonthly) labelMonthly.style.fontWeight = '450';
                if (labelAnnual) labelAnnual.style.fontWeight = '620';
                if (saveBadge) saveBadge.classList.add('is-visible');
                priceNodes.forEach(node => {
                    const p = node.getAttribute('data-annual');
                    if (p) node.textContent = `$${p}`;
                });
            } else {
                toggleBtn.style.background = 'rgb(202,205,221)';
                const knob = toggleBtn.querySelector('.pricing-toggle-knob');
                if (knob) knob.style.left = '3px';
                if (labelMonthly) labelMonthly.style.fontWeight = '620';
                if (labelAnnual) labelAnnual.style.fontWeight = '450';
                if (saveBadge) saveBadge.classList.remove('is-visible');
                priceNodes.forEach(node => {
                    const p = node.getAttribute('data-monthly');
                    if (p) node.textContent = `$${p}`;
                });
            }
        });
    }

    // ── FAQ Accordion ──
    const faqList = document.getElementById('faq-list');
    if (faqList) {
        const faqItems = faqList.querySelectorAll('.pricing-faq-item');
        faqItems.forEach(item => {
            const btn = item.querySelector('.pricing-faq-btn');
            if (btn) {
                btn.addEventListener('click', () => {
                    const isOpen = item.classList.contains('is-open');
                    faqItems.forEach(f => f.classList.remove('is-open'));
                    if (!isOpen) item.classList.add('is-open');
                });
            }
        });
    }
}

/* ============================================================
   SCROLL REVEAL (Intersection Observer)
   Adds class `is-visible` to [data-animate] elements
   when they enter the viewport.
   ============================================================ */
export function initScrollReveal() {
    const targets = document.querySelectorAll('[data-animate]');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach(el => observer.observe(el));
}

/* ============================================================
   CUSTOMER STORIES — Scroll-driven clip-path + card height animation
   Mirrors the React customer-stories.tsx scroll logic exactly.
   ============================================================ */
export function initCustomerStories() {
    const section = document.querySelector('[data-customer-stories]');
    if (!section) return;
    // The inner div is the one that receives the clip-path
    const inner = section.querySelector('.stories-inner');
    if (!inner) return;

    // The scroll container is .layout-container (the full-height scroller)
    const scrollContainer = document.querySelector('.layout-container');
    if (!scrollContainer) return;

    function lerp(a, b, t) { return a + (b - a) * t; }
    function clamp(v, lo, hi) { return Math.min(Math.max(v, lo), hi); }

    function onScroll() {
        const containerRect = scrollContainer.getBoundingClientRect();
        const sectionRect = section.getBoundingClientRect();
        // sectionTop relative to viewport (positive = below fold, negative = above)
        const sectionTopRelative = sectionRect.top - containerRect.top;
        const vH = containerRect.height;
        const startTrigger = vH * 0.7;  // start expanding at 70% from top
        const endTrigger = vH * 0.05;   // fully expanded at 5% from top

        const raw = 1 - (sectionTopRelative - endTrigger) / (startTrigger - endTrigger);
        const progress = clamp(isNaN(raw) ? 0 : raw, 0, 1);

        // clip-path: inset(0px X% round Rpx) — starts 13% inset each side, rounds from 60px
        const insetPct = lerp(13, 0, progress);
        const radius = lerp(60, 0, progress);
        inner.style.clipPath = `inset(0px ${insetPct}% round ${radius}px)`;

        // Card height: 340px → 432px; name/business opacity/translateY fade in
        const cards = section.querySelectorAll('.story-card');
        const cardH = Math.round(lerp(340, 432, progress));
        const nameOpacity = progress;
        const nameTranslate = lerp(10, 0, progress);
        const bizTranslate = lerp(8, 0, progress);
        cards.forEach(card => {
            const imgWrapper = card.querySelector('.story-img-wrapper');
            if (imgWrapper) imgWrapper.style.height = cardH + 'px';
            const name = card.querySelector('.story-name');
            const biz = card.querySelector('.story-business');
            if (name) {
                name.style.opacity = nameOpacity;
                name.style.transform = `translateY(${nameTranslate}px)`;
            }
            if (biz) {
                biz.style.opacity = nameOpacity;
                biz.style.transform = `translateY(${bizTranslate}px)`;
            }
        });
    }

    scrollContainer.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on init so initial state is correct
}
