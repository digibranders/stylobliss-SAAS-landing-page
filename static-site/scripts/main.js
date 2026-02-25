document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
    const mobileMenuBtn = document.querySelector('button[aria-label="Toggle menu"]');
    const mobileMenu = document.getElementById('mobile-menu');
    const barsIcon = mobileMenuBtn?.querySelector('.menu-icon-bars');
    const closeIcon = mobileMenuBtn?.querySelector('.menu-icon-close');
    let isMobileMenuOpen = false;

    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            if (mobileMenu) mobileMenu.classList.remove('hidden');
            if (barsIcon) barsIcon.classList.add('hidden');
            if (closeIcon) closeIcon.classList.remove('hidden');
        } else {
            document.body.style.overflow = '';
            if (mobileMenu) mobileMenu.classList.add('hidden');
            if (barsIcon) barsIcon.classList.remove('hidden');
            if (closeIcon) closeIcon.classList.add('hidden');
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Header Scroll Logic
    const headerBg = document.querySelector('header > div.pointer-events-none.backdrop-blur-\\[20px\\]');
    function onScroll() {
        if (window.scrollY > 50) {
            if (headerBg) headerBg.classList.replace('opacity-0', 'opacity-100');
        } else {
            if (headerBg) headerBg.classList.replace('opacity-100', 'opacity-0');
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mega Menu Logic
    const menuBtns = document.querySelectorAll('[data-menu-trigger]');
    const megaMenuContainer = document.getElementById('mega-menu-container');
    let activeMenu = null;

    const MENUS = {
        explore: `
      <div class="absolute top-[80px] left-0 w-full bg-white shadow-lg border-t border-gray-100 z-[9990] transition-all duration-300">
        <div class="max-w-[1440px] mx-auto p-8 grid grid-cols-4 gap-8">
          <div class="col-span-1">
            <h4 class="text-sm font-semibold uppercase text-gray-500 mb-4 tracking-wider">Product</h4>
            <ul class="space-y-3">
              <li><a href="/salons/" class="text-[15px] hover:text-[#c3157e] transition-colors">For Salons & Spas</a></li>
              <li><a href="/pricing/" class="text-[15px] hover:text-[#c3157e] transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div class="col-span-1">
            <h4 class="text-sm font-semibold uppercase text-gray-500 mb-4 tracking-wider">Resources</h4>
            <ul class="space-y-3">
              <li><a href="/faq/" class="text-[15px] hover:text-[#c3157e] transition-colors">FAQ</a></li>
              <li><a href="/tutorials/" class="text-[15px] hover:text-[#c3157e] transition-colors">Tutorials</a></li>
              <li><a href="/blog/" class="text-[15px] hover:text-[#c3157e] transition-colors">Blog</a></li>
            </ul>
          </div>
          <div class="col-span-2 bg-gray-50 rounded-2xl p-6 relative overflow-hidden">
            <div class="relative z-10">
              <h4 class="text-lg font-semibold text-[rgb(25,30,73)] mb-2">See StyloBliss in Action</h4>
              <p class="text-sm text-gray-600 mb-4 max-w-sm">Discover how our all-in-one platform can help you grow your salon or spa business.</p>
              <a href="/demo/" class="inline-flex items-center text-sm font-semibold text-[#c3157e] hover:text-[#9e1166]">Book a Demo &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    `,
        engage: `
      <div class="absolute top-[80px] left-0 w-full bg-white shadow-lg border-t border-gray-100 z-[9990] transition-all duration-300">
        <div class="max-w-[1440px] mx-auto p-8 grid grid-cols-4 gap-8">
          <div class="col-span-1">
            <h4 class="text-sm font-semibold uppercase text-gray-500 mb-4 tracking-wider">Get in Touch</h4>
            <ul class="space-y-3">
              <li><a href="/contact/" class="text-[15px] hover:text-[#c3157e] transition-colors">Contact Support</a></li>
              <li><a href="/demo/" class="text-[15px] hover:text-[#c3157e] transition-colors">Sales Inquiry</a></li>
            </ul>
          </div>
          <div class="col-span-3 bg-[rgb(252,250,250)] rounded-2xl p-6">
             <h4 class="text-lg font-semibold text-[rgb(25,30,73)] mb-2">Join our Community</h4>
             <p class="text-sm text-gray-600">Connect with thousands of beauty professionals using StyloBliss.</p>
          </div>
        </div>
      </div>
    `
    };

    function updateMenuDisplay() {
        menuBtns.forEach(btn => {
            const type = btn.getAttribute('data-menu-trigger');
            if (type === activeMenu) {
                btn.classList.add('text-[#c3157e]');
            } else {
                btn.classList.remove('text-[#c3157e]');
            }
        });

        if (activeMenu && megaMenuContainer) {
            megaMenuContainer.innerHTML = MENUS[activeMenu];
            if (headerBg) headerBg.classList.replace('opacity-0', 'opacity-100');
        } else {
            if (megaMenuContainer) megaMenuContainer.innerHTML = '';
            if (window.scrollY <= 50 && headerBg) {
                headerBg.classList.replace('opacity-100', 'opacity-0');
            }
        }
    }

    menuBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const type = btn.getAttribute('data-menu-trigger');
            if (activeMenu === type) {
                activeMenu = null;
            } else {
                activeMenu = type;
            }
            updateMenuDisplay();
        });
    });

    document.addEventListener('click', (e) => {
        if (activeMenu && megaMenuContainer && !megaMenuContainer.contains(e.target)) {
            let isTrigger = false;
            menuBtns.forEach(btn => { if (btn.contains(e.target)) isTrigger = true; });
            if (!isTrigger) {
                activeMenu = null;
                updateMenuDisplay();
            }
        }
    });

    // Mobile menu link closing
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (isMobileMenuOpen) toggleMobileMenu();
        });
    });
});
