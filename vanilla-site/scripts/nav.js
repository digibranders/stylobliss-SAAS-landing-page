// vanilla-site/scripts/nav.js
export function initNav() {
    const header = document.querySelector('.header');
    const scrollContainer = document.querySelector('.layout-container') || window;
    const mobileMenuBtn = document.querySelector('[data-mobile-menu-btn]');
    const mobileMenuOverlay = document.querySelector('[data-mobile-menu-overlay]');
    const mobileMenuCloseLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__login, .mobile-menu__trial');
    const dropdownTriggers = document.querySelectorAll('[data-menu-trigger]');

    if (!header) return;

    // ─── Mega menu content (panels built at body level) ───────────────────────
    const MEGA_CONTENT = {
        explore: `
            <div class="mega-menu__arrow"></div>
            <div class="mega-menu__card">
                <div class="mega-menu__grid">
                    <div class="mega-menu__links-col">
                        <div class="mega-menu__group">
                            <p class="mega-menu__group-title">PRODUCT</p>
                            <ul class="mega-menu__link-list">
                                <li><a href="/salons.html" class="mega-menu__link">Salons</a></li>
                            </ul>
                        </div>
                        <div class="mega-menu__group">
                            <p class="mega-menu__group-title">RESOURCES</p>
                            <ul class="mega-menu__link-list">
                                <li><a href="/faq.html" class="mega-menu__link">FAQ</a></li>
                                <li><a href="/tutorials.html" class="mega-menu__link">Tutorials</a></li>
                                <li><a href="/blog.html" class="mega-menu__link">Blog</a></li>
                            </ul>
                        </div>
                    </div>
                    <a href="/why.html" class="mega-menu__highlight">
                        <div class="mega-menu__highlight-text">
                            <h4 class="mega-menu__highlight-title">Why We're Different</h4>
                            <p class="mega-menu__highlight-desc">Modern salon &amp; spa software that's fast, beautiful, and intuitive. See what sets StyloBliss apart.</p>
                        </div>
                        <div class="mega-menu__highlight-img-wrapper">
                            <img src="https://images.unsplash.com/photo-1758188753373-5b01a0fc6d9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400" alt="Why We're Different" class="mega-menu__highlight-img">
                        </div>
                    </a>
                </div>
            </div>`,
        engage: `
            <div class="mega-menu__arrow"></div>
            <div class="mega-menu__card">
                <div class="mega-menu__grid">
                    <div class="mega-menu__links-col">
                        <div class="mega-menu__group">
                            <p class="mega-menu__group-title">GET IN TOUCH</p>
                            <ul class="mega-menu__link-list">
                                <li><a href="/contact.html" class="mega-menu__link">Contact Us</a></li>
                                <li><a href="/demo.html" class="mega-menu__link">Book a Demo</a></li>
                            </ul>
                        </div>
                    </div>
                    <a href="/why.html" class="mega-menu__highlight">
                        <div class="mega-menu__highlight-text">
                            <h4 class="mega-menu__highlight-title">Scheduling &amp; Payments</h4>
                            <p class="mega-menu__highlight-desc">A complete booking and payment solution. Calendar, online booking, Express Booking, and integrated POS.</p>
                        </div>
                        <div class="mega-menu__highlight-img-wrapper">
                            <img src="https://images.unsplash.com/photo-1769596722257-282ec3fe8594?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400" alt="Scheduling &amp; Payments" class="mega-menu__highlight-img">
                        </div>
                    </a>
                </div>
            </div>`
    };

    // Backdrop overlay
    const backdrop = document.createElement('div');
    backdrop.className = 'mega-menu-backdrop';
    document.body.appendChild(backdrop);

    // Fixed-position container for all panels (escapes overflow:hidden on layout-container)
    const menuContainer = document.createElement('div');
    menuContainer.className = 'mega-menu-fixed-container';
    document.body.appendChild(menuContainer);

    // Build each panel
    const panels = {};
    ['explore', 'engage'].forEach(id => {
        const panel = document.createElement('div');
        panel.className = 'mega-menu-panel';
        panel.setAttribute('data-panel', id);
        panel.innerHTML = MEGA_CONTENT[id];
        menuContainer.appendChild(panel);
        panels[id] = panel;
    });

    // ─── Position panel exactly like React (left: 40px from nav edge, NOT from trigger) ──
    // React: `className="absolute left-[40px] top-[80px]"` — anchored to the header's nav
    function positionPanel(panelEl, triggerEl) {
        const headerRect = header.getBoundingClientRect();
        const navInner = header.querySelector('.header__nav');
        const navRect = navInner ? navInner.getBoundingClientRect() : headerRect;

        // Panel top: just below header (header height 80px from its top edge)
        panelEl.style.top = (headerRect.bottom + 10) + 'px';

        // Panel left: fixed 40px from the start of the nav container
        const panelLeft = navRect.left + 40;
        panelEl.style.left = panelLeft + 'px';

        // Calculate arrow offset (center of trigger, relative to panel's left edge)
        const triggerRect = triggerEl.getBoundingClientRect();
        const arrowLeft = Math.round(triggerRect.left + triggerRect.width / 2 - panelLeft - 7);
        const clampedArrow = Math.max(20, Math.min(arrowLeft, 460));

        panelEl.style.setProperty('--arrow-left', clampedArrow + 'px');
        panelEl.style.transformOrigin = clampedArrow + 'px top';
    }

    let activeMenu = null;

    // ─── Track scroll for sticky navbar blur ────────────────
    const onScroll = () => {
        const top = (scrollContainer !== window && scrollContainer.scrollTop !== undefined)
            ? scrollContainer.scrollTop
            : window.scrollY;
        if (top > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
        // Reposition open panel on scroll (header stays sticky at top)
        if (activeMenu) {
            const trigger = document.querySelector(`[data-menu-trigger="${activeMenu}"]`);
            if (trigger) positionPanel(panels[activeMenu], trigger);
        }
    };
    if (scrollContainer !== window) {
        scrollContainer.addEventListener('scroll', onScroll, { passive: true });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ─── Mobile Menu Toggle ──────────────────────────────────
    let isMobileOpen = false;

    function toggleMobileMenu() {
        isMobileOpen = !isMobileOpen;
        if (isMobileOpen && mobileMenuOverlay) {
            mobileMenuOverlay.classList.add('is-active');
            header.classList.add('is-mobile-open');
            document.body.style.overflow = 'hidden';
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(25,30,73)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
            }
        } else {
            if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('is-active');
            header.classList.remove('is-mobile-open');
            document.body.style.overflow = '';
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(25,30,73)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
            }
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    mobileMenuCloseLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMobileOpen) toggleMobileMenu();
        });
    });

    // ─── Desktop Mega Menu — Event Delegation ───────────────

    function closeMenus() {
        activeMenu = null;
        dropdownTriggers.forEach(btn => btn.classList.remove('is-active'));
        Object.values(panels).forEach(p => {
            p.classList.remove('is-active');
        });
        header.classList.remove('is-menu-open');
        backdrop.classList.remove('is-active');
        menuContainer.classList.remove('is-active');
    }

    function openMenu(menuId) {
        closeMenus();
        activeMenu = menuId;
        const trigger = document.querySelector(`[data-menu-trigger="${menuId}"]`);
        const panel = panels[menuId];
        if (!trigger || !panel) return;

        // Position FIRST so transformOrigin is set before transition fires
        positionPanel(panel, trigger);

        trigger.classList.add('is-active');
        header.classList.add('is-menu-open');
        backdrop.classList.add('is-active');
        menuContainer.classList.add('is-active');

        // rAF ensures position is painted before CSS transition kicks in
        requestAnimationFrame(() => {
            panel.classList.add('is-active');
        });
    }

    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-menu-trigger]');
        if (trigger) {
            e.stopPropagation();
            e.preventDefault();
            const menuId = trigger.getAttribute('data-menu-trigger');
            if (activeMenu === menuId) {
                closeMenus();
            } else {
                openMenu(menuId);
            }
            return;
        }
        if (activeMenu) {
            const isInsidePanel = Object.values(panels).some(p => p.contains(e.target));
            if (!isInsidePanel) closeMenus();
        }
    });

    backdrop.addEventListener('click', closeMenus);

    document.addEventListener('keyup', (e) => {
        if (e.key === 'Escape' && activeMenu) closeMenus();
    });

    window.addEventListener('resize', () => {
        if (activeMenu) {
            const trigger = document.querySelector(`[data-menu-trigger="${activeMenu}"]`);
            if (trigger) positionPanel(panels[activeMenu], trigger);
        }
    });
}
