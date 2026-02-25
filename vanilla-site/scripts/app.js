// vanilla-site/scripts/app.js
import { initNav } from './nav.js';
import { initCarousel, initPricing, initScrollReveal, initCustomerStories } from './components.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation & global header behavior
    initNav();

    // Initialize component-level scripts (will only run if elements exist on page)
    initCarousel();
    initPricing();
    initScrollReveal();
    initCustomerStories();
});

// Appended missing functionalities for the Salons page
document.addEventListener('DOMContentLoaded', () => {
    initSalonsCarousel();
    initSalonsFAQ();
    initSalonsScrollAnimation();
});

function initSalonsFAQ() {
    const faqList = document.querySelector('[data-salons-faq]');
    if (!faqList) return;

    const faqItems = faqList.querySelectorAll('.salons-faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.salons-faq-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                const isOpen = item.classList.contains('is-open');
                faqItems.forEach(f => f.classList.remove('is-open'));
                if (!isOpen) item.classList.add('is-open');
            });
        }
    });
}

function initSalonsCarousel() {
    const container = document.querySelector('[data-salons-carousel]');
    if (!container) return;

    const track = container.querySelector('[data-carousel-track]');
    const navContainer = document.querySelector('[data-carousel-nav]');
    if (!track || !navContainer) return;

    // Reuse the existing SLIDES array to build the DOM dynamically
    const CUSTOMER_SLIDES = [
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

    const TOTAL = CUSTOMER_SLIDES.length;
    let containerWidth = container.offsetWidth;

    // Dimensions Helper matching React exactly
    function getDims() {
        if (containerWidth < 640) return { slideWidth: containerWidth - 32, gap: 10 };
        if (containerWidth < 1024) return { slideWidth: Math.min(900, containerWidth - 60), gap: 10 };
        return { slideWidth: 1040, gap: 10 };
    }

    // Build DOM
    // Nav 
    navContainer.innerHTML = '';
    CUSTOMER_SLIDES.forEach((slide, i) => {
        const btn = document.createElement('button');
        btn.className = 'salons-nav-dot';
        btn.setAttribute('aria-label', slide.label);
        const progress = document.createElement('div');
        progress.className = 'salons-nav-progress';

        // Progress complete event listener
        progress.addEventListener('animationend', () => {
            if (btn.classList.contains('is-active') && !isDragging) {
                goTo((activeIndex + 1) % TOTAL);
            }
        });

        btn.appendChild(progress);
        btn.addEventListener('click', () => {
            if (i !== activeIndex) goTo(i);
        });
        navContainer.appendChild(btn);
    });

    const extendedSlides = [...CUSTOMER_SLIDES, ...CUSTOMER_SLIDES, ...CUSTOMER_SLIDES];

    track.innerHTML = '';
    extendedSlides.forEach((slide, i) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'salons-carousel-slide';

        const fig = document.createElement('figure');
        fig.className = 'salons-carousel-figure';

        const overlay = document.createElement('div');
        overlay.className = 'salons-carousel-overlay';

        const img = document.createElement('img');
        img.className = 'salons-carousel-img';
        img.src = slide.src;
        img.alt = slide.label;
        img.draggable = false;

        fig.appendChild(overlay);
        fig.appendChild(img);
        wrapper.appendChild(fig);
        track.appendChild(wrapper);
    });

    const navBtns = Array.from(navContainer.querySelectorAll('.salons-nav-dot'));
    const slides = Array.from(track.children);

    let activeIndex = 0;
    let trackOffset = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartOffset = 0;

    function applyWidths() {
        const d = getDims();
        slides.forEach(s => s.style.width = d.slideWidth + 'px');
        track.style.gap = d.gap + 'px';
    }

    function getTargetOffset(index) {
        const d = getDims();
        const slideTotal = d.slideWidth + d.gap;
        const middleOffset = (TOTAL + index);
        const centerPoint = middleOffset * slideTotal + d.slideWidth / 2;
        return centerPoint - containerWidth / 2;
    }

    function updateVisuals() {
        navBtns.forEach((btn, i) => {
            if (i === activeIndex) {
                btn.classList.add('is-active');
            } else {
                btn.classList.remove('is-active');
            }
        });

        slides.forEach((slide, i) => {
            if (i === (TOTAL + activeIndex)) {
                slide.classList.add('is-active');
            } else {
                slide.classList.remove('is-active');
            }
        });
    }

    function goTo(index, animate = true) {
        activeIndex = index;
        const d = getDims();
        const offset = getTargetOffset(index);
        trackOffset = offset;

        track.style.transition = animate ? 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none';
        track.style.transform = `translate3d(-${offset}px, 0px, 0px)`;

        updateVisuals();
    }

    // Drag Logic
    container.addEventListener('pointerdown', e => {
        isDragging = true;
        dragStartX = e.clientX;
        dragStartOffset = trackOffset;
        container.setPointerCapture(e.pointerId);
        track.style.transition = 'none';

        // Pause animation when dragging by temporarily removing class
        navBtns.forEach(btn => btn.classList.remove('is-active'));
    });

    container.addEventListener('pointermove', e => {
        if (!isDragging) return;
        const dx = dragStartX - e.clientX;
        trackOffset = dragStartOffset + dx;
        track.style.transform = `translate3d(-${trackOffset}px, 0px, 0px)`;
    });

    const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;

        const d = getDims();
        const slideTotal = d.slideWidth + d.gap;
        const baseOffset = TOTAL * slideTotal;
        const relativeOffset = trackOffset - baseOffset;

        let snapped = Math.round(relativeOffset / slideTotal);
        snapped = ((snapped % TOTAL) + TOTAL) % TOTAL;

        goTo(snapped, true);
    };

    container.addEventListener('pointerup', endDrag);
    container.addEventListener('pointercancel', endDrag);

    window.addEventListener('resize', () => {
        containerWidth = container.offsetWidth;
        applyWidths();
        goTo(activeIndex, false);
    });

    // Init
    applyWidths();
    goTo(0, false);
}

function initSalonsScrollAnimation() {
    const section = document.querySelector('[data-salons-stories]');
    if (!section) return;
    const inner = section.querySelector('.salons-stories-inner');
    if (!inner) return;

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
    }

    scrollContainer.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}
