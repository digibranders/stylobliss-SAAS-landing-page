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
    const inner = section.querySelector('.stories-inner');
    if (!inner) return;

    // --- Dynamic Marquee Generation ---
    const CUSTOMERS = [
        {
            name: 'Arielle Deguzman',
            business: 'House of Aanuko',
            img: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F97ca2ea7534360712b00200372905fc0eedc3a39.jpg?generation=1770623289279624&alt=media',
        },
        {
            name: 'Emily Katz',
            business: 'Goldust Studios',
            img: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fdcfbd972c54236e167312e20e3b481aea128227a.jpg?generation=1770623289347356&alt=media',
            hasPlay: true,
        },
        {
            name: 'Michelle Leach',
            business: 'Pure Beauty Aesthetics',
            img: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fdd6c50e1d4dbaf86d4a3361200c4c93c0eab3c36.jpg?generation=1770623289296150&alt=media',
        },
        {
            name: 'Monica DeAngelis',
            business: 'Bare Laser Medspa',
            img: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F796ddc2c3a7f76e30a3cc7f11048bf58d9bdc699.jpg?generation=1770623289141610&alt=media',
        },
        {
            name: 'Paola Girotti',
            business: 'Sugarmoon',
            img: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fd4965e88ac2401597114d0a0272122c901e7c926.jpg?generation=1770623289190198&alt=media',
        },
        {
            name: 'Gina Monique Lafler',
            business: 'My Little Beautique',
            img: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fdc4e2a8c42184a6864596e0c33bb3a2c8533b3e4.jpg?generation=1770623289209928&alt=media',
        },
        {
            name: 'John Cohn',
            business: 'Venice Soleil',
            img: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F9dd6879e3306bdbf775b8a83cce1cac063382b42.jpg?generation=1770623289215604&alt=media',
        },
        {
            name: 'Angela Walker',
            business: 'N Natural Hair Studio',
            img: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fea8c23bfd5e448116bf8c7aed9e0c167d288773f.jpg?generation=1770623289202914&alt=media',
        },
        {
            name: 'Brett Foreman',
            business: 'Pony Studios Co',
            img: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6ca1324557b82991b00efcead61a5c674fd3ccd1.jpg?generation=1770623289237663&alt=media',
        },
    ];

    const marqueeFlex = section.querySelector('.stories-flex');
    if (marqueeFlex) {
        // Clear static hardcoded HTML
        marqueeFlex.innerHTML = '';
        const marqueeItems = [...CUSTOMERS, ...CUSTOMERS, ...CUSTOMERS, ...CUSTOMERS];

        marqueeItems.forEach(customer => {
            const card = document.createElement('div');
            card.className = 'story-card';

            let playHtml = '';
            if (customer.hasPlay) {
                playHtml = `
                    <div class="story-play-overlay">
                        <div class="story-play-btn">
                            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 8.268C18.333 9.038 18.333 10.962 17 11.732L3.5 19.526C2.167 20.296 0.5 19.334 0.5 17.794V2.206C0.5 0.666 2.167 -0.296 3.5 0.474L17 8.268Z" fill="white"/>
                            </svg>
                        </div>
                    </div>
                `;
            }

            card.innerHTML = `
                <div class="story-img-wrapper">
                    <img alt="${customer.name}" src="${customer.img}" class="story-img" draggable="false">
                    ${playHtml}
                </div>
                <h3 class="story-name">${customer.name}</h3>
                <p class="story-business">${customer.business}</p>
            `;
            marqueeFlex.appendChild(card);
        });
    }

    // --- Original Scroll Reveal Logic ---
    const scrollContainer = document.querySelector('.layout-container');
    if (!scrollContainer) return;

    function lerp(a, b, t) { return a + (b - a) * t; }
    function clamp(v, lo, hi) { return Math.min(Math.max(v, lo), hi); }

    function onScroll() {
        const containerRect = scrollContainer.getBoundingClientRect();
        const sectionRect = section.getBoundingClientRect();
        const sectionTopRelative = sectionRect.top - containerRect.top;
        const vH = containerRect.height;
        const startTrigger = vH * 0.7;
        const endTrigger = vH * 0.05;

        const raw = 1 - (sectionTopRelative - endTrigger) / (startTrigger - endTrigger);
        const progress = clamp(isNaN(raw) ? 0 : raw, 0, 1);

        const insetPct = lerp(13, 0, progress);
        const radius = lerp(60, 0, progress);
        inner.style.clipPath = `inset(0px ${insetPct}% round ${radius}px)`;

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
    onScroll();
}

/* ============================================================
   TUTORIALS FILTERING
   Filters videos based on search input and active chips in tutorials page
   ============================================================ */
export function initTutorials() {
    const searchInput = document.querySelector('.tut-search-input');
    const filterGroup = document.querySelector('.tut-filter-group');
    if (!searchInput && !filterGroup) return;

    const ALL_VIDEOS = Array.from(document.querySelectorAll('.tut-grid-sec .vid-card'));
    const EMPTY_STATE = document.querySelector('.tut-empty-state');
    const COUNT_LABEL = document.querySelector('.tut-grid-count');
    const GRID_LIST = document.querySelector('.tut-grid-list');

    let state = {
        query: '',
        category: 'All',
        duration: 'All',
        difficulty: 'All'
    };

    function updateFilters() {
        let count = 0;

        ALL_VIDEOS.forEach(card => {
            const titleEl = card.querySelector('.vid-title');
            const descEl = card.querySelector('.vid-desc');
            const catEl = card.querySelector('.vid-cat');

            // Get text contents safely
            const title = titleEl ? titleEl.textContent.trim() : '';
            const desc = descEl ? descEl.textContent.trim() : '';
            const cat = catEl ? catEl.textContent.trim() : '';

            // Search Query Filter
            const searchQuery = state.query.toLowerCase();
            const matchesSearch = title.toLowerCase().includes(searchQuery) ||
                desc.toLowerCase().includes(searchQuery) ||
                cat.toLowerCase().includes(searchQuery);

            // Category Filter
            const matchesCat = state.category === 'All' || cat === state.category;

            // Difficulty Filter
            let diffStr = '';
            if (card.querySelector('.badge-diff-beginner')) diffStr = 'Beginner';
            else if (card.querySelector('.badge-diff-intermediate')) diffStr = 'Intermediate';
            else if (card.querySelector('.badge-diff-advanced')) diffStr = 'Advanced';
            const matchesDiff = state.difficulty === 'All' || diffStr === state.difficulty;

            // Duration Filter
            // Extract number from "12 min"
            let durationStr = 'All';
            const durBadge = card.querySelector('.badge-duration');
            if (durBadge) {
                const text = durBadge.textContent.replace(/[^0-9]/g, '');
                const mins = parseInt(text, 10);
                if (!isNaN(mins)) {
                    if (mins < 11) durationStr = 'Short';
                    else if (mins < 20) durationStr = 'Medium';
                    else durationStr = 'Long';
                }
            }
            const matchesDur = state.duration === 'All' || durationStr === state.duration;

            // Visibility
            const isVisible = matchesSearch && matchesCat && matchesDiff && matchesDur;

            if (isVisible) {
                card.style.display = 'flex';
                count++;
            } else {
                card.style.display = 'none';
            }
        });

        if (COUNT_LABEL) {
            COUNT_LABEL.textContent = `(${count})`;
        }

        if (count === 0) {
            if (GRID_LIST) GRID_LIST.style.display = 'none';
            if (EMPTY_STATE) EMPTY_STATE.style.display = 'flex';
        } else {
            if (GRID_LIST) GRID_LIST.style.display = 'grid';
            if (EMPTY_STATE) EMPTY_STATE.style.display = 'none';
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            state.query = e.target.value;
            updateFilters();
        });
    }

    if (filterGroup) {
        const chips = filterGroup.querySelectorAll('.tut-chip');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                const groupType = chip.getAttribute('data-group'); // You can add data-group to HTML or infer from parent logic. Wait, let's infer logic manually

                // Let's infer type from content for simplicity exactly like React matches
                const text = chip.textContent.trim();

                // Unselect all siblings of the same 'type'
                // This gets tricky if we don't have data attributes, let's just group them manually.
                let filterType = '';
                if (['All', 'Payments', 'Scheduling', 'Getting Started', 'Marketing', 'Features'].includes(text) && !chip.dataset.diff && !chip.dataset.dur) {
                    filterType = 'category';
                    if (text === 'All' && !chip.textContent.includes('All Difficulties') && !chip.textContent.includes('All Durations')) {
                        // it is category ALL
                    }
                }
                if (['All Difficulties', 'Beginner', 'Intermediate', 'Advanced'].includes(text)) {
                    filterType = 'difficulty';
                }
                if (['All Durations', 'Short', 'Medium', 'Long'].includes(text)) {
                    filterType = 'duration';
                }

                if (filterType === 'category') {
                    state.category = text === 'All' ? 'All' : text;
                    chips.forEach(c => {
                        const ct = c.textContent.trim();
                        if (['All', 'Payments', 'Scheduling', 'Getting Started', 'Marketing', 'Features'].includes(ct) && ct !== 'All Difficulties' && ct !== 'All Durations') {
                            c.classList.remove('is-active');
                        }
                    });
                } else if (filterType === 'difficulty') {
                    state.difficulty = text === 'All Difficulties' ? 'All' : text;
                    chips.forEach(c => {
                        if (['All Difficulties', 'Beginner', 'Intermediate', 'Advanced'].includes(c.textContent.trim())) {
                            c.classList.remove('is-active');
                        }
                    });
                } else if (filterType === 'duration') {
                    state.duration = text === 'All Durations' ? 'All' : text;
                    chips.forEach(c => {
                        if (['All Durations', 'Short', 'Medium', 'Long'].includes(c.textContent.trim())) {
                            c.classList.remove('is-active');
                        }
                    });
                }

                chip.classList.add('is-active');
                updateFilters();
            });
        });
    }
}
