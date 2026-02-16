import React from 'react';
import { Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import { ScreenshotCarousel } from './components/screenshot-carousel';
import { LogoMarquee } from './components/logo-marquee';
import { CustomerStories } from './components/customer-stories';
import { ExploreAndFeaturesSection, CtaSection } from './components/page-bottom-sections';
import { NavbarMegaMenu, MenuType } from './components/navbar-mega-menu';
import { SalonsHero } from './components/salons-hero';
import { SalonLogosSection, SalonKeyFeaturesSection } from './components/salons-content-sections';
import { SalonCustomerStories } from './components/salon-customer-stories';
import { SalonFeatureShowcases } from './components/salon-feature-showcases';
import { FAQPage } from './components/faq-page';
import { TutorialsPage } from './components/tutorials-page';
import { BlogPage } from './components/blog-page';
import { ContactPage } from './components/contact-page';
import { DemoPage } from './components/demo-page';
import { PricingPage } from './components/pricing-page';
import { WhyStyloBlissPage } from './components/why-stylobliss-page';
import { LoginPage } from './components/login-page';
import { TrialPage } from './components/trial-page';
import { ChatbotWidget } from './components/chatbot-widget';
import { Menu, X } from 'lucide-react';

/* ── Global mesh gradient background (teal ↔ warm, from Figma Container-2062-920) ── */
const MESH_BG = [
  'radial-gradient(ellipse 120% 60% at 0% 0%, rgba(180,220,224,0.55) 0%, transparent 70%)',
  'radial-gradient(ellipse 80% 50% at 90% 10%, rgba(255,190,150,0.22) 0%, transparent 70%)',
  'radial-gradient(ellipse 90% 60% at 15% 40%, rgba(120,190,196,0.25) 0%, transparent 70%)',
  'radial-gradient(ellipse 70% 45% at 85% 50%, rgba(255,190,150,0.18) 0%, transparent 70%)',
  'radial-gradient(ellipse 100% 55% at 10% 75%, rgba(180,220,224,0.35) 0%, transparent 70%)',
  'radial-gradient(ellipse 80% 50% at 80% 85%, rgba(255,140,80,0.12) 0%, transparent 70%)',
  'radial-gradient(ellipse 60% 40% at 50% 95%, rgba(120,190,196,0.2) 0%, transparent 70%)',
].join(', ');
const MESH_BASE = `${MESH_BG}, linear-gradient(180deg, rgb(228,238,240) 0%, rgb(233,241,243) 50%, rgb(228,238,240) 100%)`;

/* Footer accent — the full Figma gradient */
const FOOTER_ACCENT = 'linear-gradient(rgb(228,238,240) 27.5%, rgba(255,255,255,0) 60%, rgba(255,255,255,0) 75%, rgb(228,238,240) 100%), linear-gradient(rgba(228,238,240,0.05) 0%, rgba(228,238,240,0.1) 100%), linear-gradient(90deg, rgb(180,220,224) 0%, rgb(120,190,196) 30%, rgb(255,190,150) 65%, rgb(255,140,80) 100%)';

function Layout({ children }: { children: React.ReactNode }) {
  const [activeMenu, setActiveMenu] = React.useState<MenuType>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = React.useCallback((menu: MenuType) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  }, []);

  const closeMenu = React.useCallback(() => {
    setActiveMenu(null);
  }, []);

  // Reset menu and scroll on route change
  React.useEffect(() => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
    scrollRef.current?.scrollTo(0, 0);
  }, [location.pathname]);

  // Track scroll position for navbar background
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 50);
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <div ref={scrollRef} className="h-screen overflow-x-hidden overflow-y-scroll text-black text-[16px] leading-[normal] w-full" style={{ "fontFamily": "tt-commons-pro, sans-serif", "fontVariationSettings": "\"slnt\" 0" }}>
      <div className="bg-[rgb(228,_238,_240)] text-[rgb(22,_35,_42)] leading-[22.4px] relative" style={{ "fontVariationSettings": "\"slnt\" 0", "textDecoration": "rgb(22, 35, 42)", backgroundImage: MESH_BASE }}>
        <header className="block sticky w-full left-0 top-0 shadow-[rgba(0,0,0,0)_0px_0px_20px_0px] px-4 md:px-10 z-[9999]" style={{ "fontVariationSettings": "\"slnt\" 0", "textDecoration": "rgb(22, 35, 42)" }}>
          <div className="pointer-events-none absolute left-0 top-0 right-0 bottom-0 content-[''] z-[-2]" style={{ "fontVariationSettings": "\"slnt\" 0" }}></div>
          <nav className="items-center flex mx-auto relative h-20 max-w-[1440px]" style={{ "fontVariationSettings": "\"slnt\" 0" }}>
            <Link to="/" className="items-center flex h-full justify-center relative drop-shadow-[rgb(228,238,240)] z-[10000]" style={{ "fontVariationSettings": "\"slnt\" 0" }}>
              <span className="text-[rgb(22,35,42)] text-[22px] tracking-[-0.5px]" style={{ "fontFamily": "tt-commons-pro, sans-serif", "fontWeight": "700", "fontVariationSettings": "\"slnt\" 0" }}>StyloBliss</span>
            </Link>

            {/* Desktop nav items */}
            <div className="items-center hidden lg:flex grow basis-[0%]" style={{ "fontVariationSettings": "\"slnt\" 0" }}>
              <ul className="grid grow grid-flow-col ml-[27px] basis-[0%] gap-[normal_0px]" style={{ "fontVariationSettings": "\"slnt\" 0", "justifyContent": "left" }}>
                <div className="content-['']" style={{ "fontVariationSettings": "\"slnt\" 0" }}></div>
                <li className="list-none relative text-left" style={{ "fontVariationSettings": "\"slnt\" 0" }}>
                  <button data-menu-trigger role="menuitem" onClick={() => toggleMenu('explore')} className={`items-center flex relative text-center whitespace-nowrap bg-black/0 text-[17px] tracking-[-0.017px] leading-[21px] pt-2 pr-4 pb-2 pl-4 ${activeMenu === 'explore' ? 'text-[rgb(255,91,4)]' : ''}`} style={{ "fontVariationSettings": "\"slnt\" 0", "fontWeight": "540" }}>
                    Explore<span className={`block relative text-center w-[11px] h-[11px] ml-[5px] transition-transform duration-200 ${activeMenu === 'explore' ? 'rotate-180' : ''}`} style={{ "fontVariationSettings": "\"slnt\" 0" }}>
                      <div className={`absolute text-center w-[65%] h-[2px] left-0 top-[calc(50%-1px)] content-[''] translate-y-[1px] rotate-45 rounded-lg ${activeMenu === 'explore' ? 'bg-[rgb(255,91,4)]' : 'bg-[rgb(22,_35,_42)]'}`} style={{ "fontVariationSettings": "\"slnt\" 0" }}></div>
                      <div className={`absolute text-center w-[65%] h-[2px] top-[calc(50%-1px)] right-0 content-[''] translate-y-[1px] -rotate-45 rounded-lg ${activeMenu === 'explore' ? 'bg-[rgb(255,91,4)]' : 'bg-[rgb(22,_35,_42)]'}`} style={{ "fontVariationSettings": "\"slnt\" 0" }}></div>
                    </span>                  </button>
                </li>
                <li className="list-none relative text-left" style={{ "fontVariationSettings": "\"slnt\" 0" }}>
                  <button data-menu-trigger role="menuitem" onClick={() => toggleMenu('engage')} className={`items-center flex relative text-center whitespace-nowrap bg-black/0 text-[17px] tracking-[-0.017px] leading-[21px] pt-2 pr-4 pb-2 pl-4 ${activeMenu === 'engage' ? 'text-[rgb(255,91,4)]' : ''}`} style={{ "fontVariationSettings": "\"slnt\" 0", "fontWeight": "540" }}>
                    Engage<span className={`block relative text-center w-[11px] h-[11px] ml-[5px] transition-transform duration-200 ${activeMenu === 'engage' ? 'rotate-180' : ''}`} style={{ "fontVariationSettings": "\"slnt\" 0" }}>
                      <div className={`absolute text-center w-[65%] h-[2px] left-0 top-[calc(50%-1px)] content-[''] translate-y-[1px] rotate-45 rounded-lg ${activeMenu === 'engage' ? 'bg-[rgb(255,91,4)]' : 'bg-[rgb(22,_35,_42)]'}`} style={{ "fontVariationSettings": "\"slnt\" 0" }}></div>
                      <div className={`absolute text-center w-[65%] h-[2px] top-[calc(50%-1px)] right-0 content-[''] translate-y-[1px] -rotate-45 rounded-lg ${activeMenu === 'engage' ? 'bg-[rgb(255,91,4)]' : 'bg-[rgb(22,_35,_42)]'}`} style={{ "fontVariationSettings": "\"slnt\" 0" }}></div>
                    </span>                  </button>
                </li>
                <li className="list-none text-left whitespace-nowrap" style={{ "fontVariationSettings": "\"slnt\" 0" }}>
                  <Link to="/pricing" className="block relative text-left text-[17px] tracking-[-0.017px] leading-[21px] pt-2 pr-4 pb-2 pl-4" style={{ "fontVariationSettings": "\"slnt\" 0", "fontWeight": "540" }}>Pricing</Link>
                </li>
                <li className="list-none text-left whitespace-nowrap" style={{ "fontVariationSettings": "\"slnt\" 0" }}>
                  <Link to="/why" className="block relative text-left text-[17px] tracking-[-0.017px] leading-[21px] pt-2 pr-4 pb-2 pl-4" style={{ "fontVariationSettings": "\"slnt\" 0", "fontWeight": "540" }}>Why StyloBliss</Link>
                </li>
              </ul>
              <Link to="/login" className="block relative whitespace-nowrap text-[17px] tracking-[-0.017px] leading-[21px] px-[42px] py-[8px]" style={{ "fontVariationSettings": "\"slnt\" 0", "fontWeight": "540" }}>Login</Link>

              <Link to="/trial" className="items-center flex justify-center overflow-hidden relative text-center whitespace-nowrap h-12 bg-[rgb(255,_91,_4)] text-[rgb(228,_238,_240)] gap-[8px] tracking-[-0.096px] leading-[16px] pt-4 pr-[25px] pb-[17px] pl-[25px] z-[1] shrink-[0] rounded-[3rem]" style={{ "fontVariationSettings": "\"slnt\" 0", "fontWeight": "540", "textDecoration": "rgb(228, 238, 240)" }}>Try It for Free</Link>
            </div>

            {/* Mobile hamburger button */}
            <button
              className="lg:hidden ml-auto flex items-center justify-center w-[44px] h-[44px] rounded-full bg-transparent border-none cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} color="rgb(22,35,42)" /> : <Menu size={24} color="rgb(22,35,42)" />}
            </button>
          </nav>
          <NavbarMegaMenu activeMenu={activeMenu} onClose={closeMenu} />
          <div className={`pointer-events-none absolute left-0 top-0 right-0 bottom-0 backdrop-blur-[20px] bg-white/85 shadow-[rgba(0,0,0,0.09)_0px_10px_30px_0px] content-[""] z-[-1] transition-opacity duration-200 ${activeMenu || scrolled || mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} style={{ "fontVariationSettings": "\"slnt\" 0" }}></div>
        </header>

        {children}

        {/* Footer */}
        <div className="relative z-[1]">
          {/* Shared background — soft fade, no hard edge */}
          <div
            className="pointer-events-none absolute w-full left-[50%] max-w-[1440px] translate-x-[-50%] z-[0]"
            style={{
              top: '-500px',
              bottom: '0',
              background: 'linear-gradient(180deg, transparent 0%, rgba(228,238,240,0.4) 30%, rgba(228,238,240,0.7) 100%)',
              fontVariationSettings: '"slnt" 0',
            }}
          ></div>
          {/* Footer gradient accent from Figma */}
          <div
            className="pointer-events-none absolute inset-0 z-[0]"
            style={{ backgroundImage: FOOTER_ACCENT }}
          />
          <footer className="items-center flex justify-center relative w-full px-4 md:px-10" style={{ "fontVariationSettings": "\"slnt\" 0" }}>
            <div
              className="overflow-hidden relative w-full max-w-[1300px] pt-[40px] px-[20px] pb-[30px] sm:pt-[50px] sm:px-[40px] md:pt-[70px] md:px-[70px] md:pb-[60px] rounded-[1.875rem] md:rounded-[3.75rem]"
              style={{
                background: '#16232a',
                fontVariationSettings: '"slnt" 0',
              }}
            >
              {/* Top: Logo */}
              <div className="mb-[30px] md:mb-[50px]">
                <Link to="/" className="block w-fit">
                  <span className="text-white text-[22px] tracking-[-0.5px]" style={{ "fontFamily": "tt-commons-pro, sans-serif", "fontWeight": "700", "fontVariationSettings": "\"slnt\" 0" }}>StyloBliss</span>
                </Link>
              </div>

              {/* Main columns grid */}
              <div className="grid mb-[40px] md:mb-[65px] gap-[16px] sm:gap-[20px] grid-cols-1 sm:grid-cols-3 lg:grid-cols-3">
                {/* EXPLORE — mirrors Explore dropdown (Product + Resources) */}
                <div className="p-[20px] sm:p-[24px] md:p-[30px] rounded-[1.25rem]" style={{ background: '#1e2f38' }}>
                  <p className="uppercase whitespace-nowrap w-fit mb-[20px] text-[14px] tracking-[0.42px] leading-[16px]" style={{ fontFamily: 'tt-commons-mono, monospace', color: '#ffffff', fontVariationSettings: '"slnt" 0' }}>EXPLORE</p>
                  <ul className="flex flex-col gap-[12px]">
                    {[
                      { label: 'Salons', href: '/salons' },
                      { label: 'FAQ', href: '/faq' },
                      { label: 'Tutorials', href: '/tutorials' },
                      { label: 'Blog', href: '/blog' },
                    ].map(l => (
                      <li key={l.label} className="list-none">
                        <Link to={l.href} className="text-[14px] leading-[22px] hover:text-white transition-colors" style={{ color: '#a8d4d8' }}>{l.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ENGAGE — mirrors Engage dropdown (Get in Touch) */}
                <div className="p-[20px] sm:p-[24px] md:p-[30px] rounded-[1.25rem]" style={{ background: '#1e2f38' }}>
                  <p className="uppercase whitespace-nowrap w-fit mb-[20px] text-[14px] tracking-[0.42px] leading-[16px]" style={{ fontFamily: 'tt-commons-mono, monospace', color: '#ffffff', fontVariationSettings: '"slnt" 0' }}>ENGAGE</p>
                  <ul className="flex flex-col gap-[12px]">
                    {[
                      { label: 'Contact Us', href: '/contact' },
                      { label: 'Book a Demo', href: '/demo' },
                    ].map(l => (
                      <li key={l.label} className="list-none">
                        <Link to={l.href} className="text-[14px] leading-[22px] hover:text-white transition-colors" style={{ color: '#a8d4d8' }}>{l.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* PLATFORM — top-level nav links (Pricing, Why, Login, CTA) */}
                <div className="p-[20px] sm:p-[24px] md:p-[30px] rounded-[1.25rem]" style={{ background: '#1e2f38' }}>
                  <p className="uppercase whitespace-nowrap w-fit mb-[20px] text-[14px] tracking-[0.42px] leading-[16px]" style={{ fontFamily: 'tt-commons-mono, monospace', color: '#ffffff', fontVariationSettings: '"slnt" 0' }}>PLATFORM</p>
                  <ul className="flex flex-col gap-[12px]">
                    {[
                      { label: 'Pricing', href: '/pricing' },
                      { label: 'Why StyloBliss', href: '/why' },
                      { label: 'Login', href: '/login' },
                      { label: 'Try It for Free', href: '/trial' },
                    ].map(l => (
                      <li key={l.label} className="list-none">
                        <Link to={l.href} className="text-[14px] leading-[22px] hover:text-white transition-colors" style={{ color: '#a8d4d8' }}>{l.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="flex flex-col sm:flex-row flex-wrap justify-between relative text-[12px] leading-[18px] z-[1] gap-[12px]" style={{ color: '#a8d4d8' }}>
                <div>&copy; StyloBliss, Inc. All rights reserved.</div>
                <div className="flex gap-[20px] md:gap-[30px]">
                  <Link to="#" className="block hover:text-white transition-colors">Legal</Link>
                  <Link to="#" className="block hover:text-white transition-colors">Terms of Service</Link>
                  <Link to="#" className="block hover:text-white transition-colors">Privacy Policy</Link>
                </div>
              </div>
            </div>
          </footer>
          <div className="items-center grid justify-items-center relative w-full h-[120px] md:h-[165px] z-[1]" style={{ "fontVariationSettings": "\"slnt\" 0" }}>

            <p className="font-medium text-center whitespace-nowrap mt-[6px] tracking-[-0.16px] leading-[22px] text-[rgb(22,35,42)]" style={{ "fontVariationSettings": "\"slnt\" 0" }}>Do something beautiful today.</p>
          </div>
        </div>
      </div>
      {/* Mobile menu overlay — at root level, outside scroll container, for proper fixed positioning */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[80px] z-[9998] bg-white backdrop-blur-[20px] overflow-y-auto" style={{ fontFamily: 'tt-commons-pro, sans-serif' }}>
          <div className="flex flex-col px-4 pt-4 pb-6 gap-2">
            <Link to="/salons" className="py-3 px-4 text-[18px] text-[rgb(22,35,42)] rounded-[16px] hover:bg-[rgba(255,91,4,0.06)] transition-colors" style={{ fontWeight: 540 }} onClick={() => setMobileMenuOpen(false)}>Salons</Link>
            <Link to="/faq" className="py-3 px-4 text-[18px] text-[rgb(22,35,42)] rounded-[16px] hover:bg-[rgba(255,91,4,0.06)] transition-colors" style={{ fontWeight: 540 }} onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
            <Link to="/tutorials" className="py-3 px-4 text-[18px] text-[rgb(22,35,42)] rounded-[16px] hover:bg-[rgba(255,91,4,0.06)] transition-colors" style={{ fontWeight: 540 }} onClick={() => setMobileMenuOpen(false)}>Tutorials</Link>
            <Link to="/blog" className="py-3 px-4 text-[18px] text-[rgb(22,35,42)] rounded-[16px] hover:bg-[rgba(255,91,4,0.06)] transition-colors" style={{ fontWeight: 540 }} onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link to="/pricing" className="py-3 px-4 text-[18px] text-[rgb(22,35,42)] rounded-[16px] hover:bg-[rgba(255,91,4,0.06)] transition-colors" style={{ fontWeight: 540 }} onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link to="/why" className="py-3 px-4 text-[18px] text-[rgb(22,35,42)] rounded-[16px] hover:bg-[rgba(255,91,4,0.06)] transition-colors" style={{ fontWeight: 540 }} onClick={() => setMobileMenuOpen(false)}>Why StyloBliss</Link>
            <Link to="/contact" className="py-3 px-4 text-[18px] text-[rgb(22,35,42)] rounded-[16px] hover:bg-[rgba(255,91,4,0.06)] transition-colors" style={{ fontWeight: 540 }} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <Link to="/demo" className="py-3 px-4 text-[18px] text-[rgb(22,35,42)] rounded-[16px] hover:bg-[rgba(255,91,4,0.06)] transition-colors" style={{ fontWeight: 540 }} onClick={() => setMobileMenuOpen(false)}>Book a Demo</Link>
            <div className="border-t border-[rgba(22,35,42,0.1)] my-2"></div>
            <Link to="/login" className="py-3 px-4 text-[18px] text-[rgb(22,35,42)] rounded-[16px] hover:bg-[rgba(255,91,4,0.06)] transition-colors" style={{ fontWeight: 540 }} onClick={() => setMobileMenuOpen(false)}>Login</Link>
            <Link to="/trial" className="mt-2 flex items-center justify-center h-[52px] bg-[rgb(255,91,4)] text-[rgb(228,238,240)] text-[17px] rounded-[3rem]" style={{ fontWeight: 540, textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>Try It for Free</Link>
          </div>
        </div>
      )}
      <ChatbotWidget />
    </div>
  );
}

function HomePage() {
  return (
    <main className="overflow-hidden relative top-0 mt-[-100px] min-h-[720px] pt-[100px] pb-[60px] md:pb-[100px] z-[3]" style={{ "fontVariationSettings": "\"slnt\" 0" }}>
      <div className="relative px-4 md:px-[70px]" style={{ "fontVariationSettings": "\"slnt\" 0" }}>
        <div className="items-center flex flex-col justify-between mx-auto w-full gap-[60px] md:gap-[120px] max-w-[1300px]" style={{ "fontVariationSettings": "\"slnt\" 0" }}>
          <section className="grid justify-center relative w-full z-[10] rounded-[3.75rem]" style={{ "fontVariationSettings": "\"slnt\" 0" }}>
            <div className="overflow-visible pointer-events-none absolute w-screen h-[200%] left-[calc(50%-50vw)] top-[-25%]" style={{ "fontVariationSettings": "\"slnt\" 0" }}>
              <div className="h-full overflow-visible pointer-events-none absolute w-screen left-[50%] top-[-350px] translate-x-[-50%] z-[-1] opacity-[0.95]" style={{ "fontVariationSettings": "\"slnt\" 0" }}>
                <img src="@/assets/feature-chair-time.png" className="inline-block overflow-clip pointer-events-none aspect-[auto_1440_/_1785] blur-[60px] scale-[1.25_1.25]" style={{ "fontVariationSettings": "\"slnt\" 0", "textDecoration": "rgb(22, 35, 42)" }} />
              </div>
            </div>
            <div className="relative max-w-[1440px] z-[3]" style={{ "fontVariationSettings": "\"slnt\" 0" }}>
              <div className="grid-rows-1 grid justify-center justify-items-center relative text-center mb-[-10px] gap-[20px_0px] md:gap-[30px_0px] pt-[30px] md:pt-[45px] px-4 md:px-10 pb-0 z-[9]" style={{ "gridTemplateColumns": "minmax(0px, 645px)", "fontVariationSettings": "\"slnt\" 0", "gridTemplateAreas": "\"eyebrow\" \"headline\" \"subheading\" \"cta\"" }}>
                <div className="pointer-events-none absolute text-center w-[1200px] h-[1200px] left-[calc(50%-600px)] top-[-100px] content-[''] z-[-1]" style={{ "backgroundImage": "radial-gradient(circle at center top, rgb(228, 238, 240) 25%, rgba(255, 255, 255, 0) 44.44%)", "fontVariationSettings": "\"slnt\" 0" }}></div>
                <h1 className="text-center text-[28px] sm:text-[32px] md:text-[42px] lg:text-[54px] tracking-[-1.62px] leading-[1.1] px-2 sm:px-0" style={{ "fontVariationSettings": "\"slnt\" 0", "fontWeight": "620", "gridArea": "headline" }}>The all-in-one platform to run your salon and spa</h1>
                <div className="font-medium text-center text-[15px] md:text-[20px] leading-[1.5] px-2 sm:px-0" style={{ "fontVariationSettings": "\"slnt\" 0", "gridArea": "subheading" }}>
                  <p className="text-center" style={{ "fontVariationSettings": "\"slnt\" 0" }}>Scheduling, payments, client management, and marketing — all in one place. A complete toolkit that's lightning-fast, beautifully designed, and built for every device.</p>
                </div>
                <div className="relative text-center mb-[40px] md:mb-[80px] min-h-[31px] z-[999]" style={{ "fontVariationSettings": "\"slnt\" 0", "gridArea": "cta", "pointerEvents": "all" }}>
                  <button
                    className="items-center inline-flex justify-center gap-[10px] bg-transparent border-none cursor-pointer text-center uppercase text-[rgb(255,_91,_4)] text-[14px] tracking-[0.42px] leading-[19.6px] min-h-[31px] p-[5px]"
                    style={{ fontFamily: 'Menlo, tt-commons-mono, monospace', pointerEvents: 'all' }}
                  >
                    {/* Play circle icon from Figma Container-2065-244 */}
                    <span className="relative w-[21px] h-[21px] shrink-0 inline-flex items-center justify-center">
                      <svg className="block w-full h-full" fill="none" viewBox="0 0 20.9985 20.9985">
                        <path d="M10.4993 20.0855C15.7936 20.0855 20.0855 15.7936 20.0855 10.4993C20.0855 5.20491 15.7936 0.912979 10.4993 0.912979C5.20491 0.912979 0.912979 5.20491 0.912979 10.4993C0.912979 15.7936 5.20491 20.0855 10.4993 20.0855Z" stroke="#FF5B04" strokeWidth="1.826" />
                      </svg>
                      <svg className="absolute" style={{ width: '6.5px', height: '7.66px', left: '36.96%', top: '31.74%' }} fill="none" viewBox="0 0 6.49433 7.66127">
                        <path d="M0 0.912979C0 0.408755 0.408755 0 0.912979 0C1.08409 0 1.25176 0.0480858 1.39686 0.138774L6.06511 3.05643C6.49269 3.32367 6.62267 3.88693 6.35543 4.31451C6.28196 4.43208 6.18267 4.53136 6.06511 4.60484L1.39686 7.5225C1.25176 7.61319 1.08409 7.66127 0.912979 7.66127C0.444771 7.66127 0.058881 7.30882 0.00614268 6.85476L0 6.74829V0.912979Z" fill="#FF5B04" />
                      </svg>
                    </span>
                    Watch a video tour
                  </button>
                </div>
              </div>
              <div className="relative mt-[-79px] pt-[79px] pb-20 z-[10]" style={{ "fontVariationSettings": "\"slnt\" 0", "width": "100vw", "marginLeft": "calc(50% - 50vw)" }}>
                <ScreenshotCarousel />
              </div>
            </div>
          </section>
          <section className="flex flex-col md:grid items-center mx-auto relative mt-[-60px] md:mt-[-100px] gap-[30px] md:gap-[30px] max-w-[1300px] w-full z-[10] px-4 md:px-0" style={{ "gridTemplateColumns": "minmax(auto, 380px) 1fr", "fontVariationSettings": "\"slnt\" 0" }}>
            {/* Gradient blend overlay from section 1 to section 2 */}
            <div
              className="pointer-events-none absolute w-[200vw] left-[-50vw]"
              style={{
                top: '-80px',
                bottom: '0',
                zIndex: -1,
                background: 'linear-gradient(180deg, transparent 0%, rgba(228,238,240,0.6) 40%, rgba(228,238,240,0.6) 100%)',
              }}
            />
            {/* Caption: heading + badges */}
            <div className="items-center md:items-start flex flex-col gap-[24px] md:gap-[50px]" style={{ "fontVariationSettings": "\"slnt\" 0" }}>
              <h3 className="text-center md:text-left md:self-start text-[24px] sm:text-[28px] md:text-[36px] tracking-[-1px] leading-[1.1] max-w-[380px]" style={{ "fontVariationSettings": "\"slnt\" 0", "fontWeight": "620" }}>#1 top-rated platform trusted by thousands of beauty &amp; wellness professionals</h3>
              <div className="flex justify-center md:justify-start gap-[16px] sm:gap-[20px] md:gap-[30px] flex-wrap" style={{ "fontVariationSettings": "\"slnt\" 0" }}>
                <div className="fill-none overflow-hidden w-[127px] h-[33px]" style={{ "fontVariationSettings": "\"slnt\" 0" }}>
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F1f0d7e8e235c6037607ecb5410db87585b9a85d7.svg?generation=1770623288501684&amp;alt=media" className="block size-full" />
                </div>
                <div className="fill-none overflow-hidden w-[164px] h-[33px]" style={{ "fontVariationSettings": "\"slnt\" 0" }}>
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F567b53e1ad3707ef7d364a9766ff22b964d61917.svg?generation=1770623288501722&amp;alt=media" className="block size-full" />
                </div>
                {/* Placeholder to keep spacing for removed stars */}
                <div className="fill-none overflow-hidden w-[130px] h-[33px]" style={{ "fontVariationSettings": "\"slnt\" 0" }}></div>
              </div>
            </div>
            {/* Logos: horizontal marquee on md+, vertical grid on mobile */}
            <div className="overflow-hidden hidden md:block">
              <LogoMarquee />
            </div>
            {/* Mobile logos — show marquee on small screens too */}
            <div className="md:hidden w-full overflow-hidden">
              <LogoMarquee />
            </div>
          </section>
          <section className="flex justify-center relative w-full z-[2]" style={{ "fontVariationSettings": "\"slnt\" 0" }}>
            <div className="absolute w-screen h-[calc(100%+200px)] left-[50%] top-[-80px] content-[''] translate-x-[-50%]" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(228,238,240,0.5) 15%, rgba(228,238,240,0.5) 85%, transparent 100%)', "fontVariationSettings": "\"slnt\" 0" }}></div>
            <div className="items-center flex flex-col relative text-center max-w-[600px] px-4" style={{ "fontVariationSettings": "\"slnt\" 0" }}>
              <div className="aspect-square absolute text-center left-0 top-[-300px] right-0 bottom-0 content-[''] blur-[80px] scale-[1.5_1.5] rounded-[100%]" style={{ "fontVariationSettings": "\"slnt\" 0", background: 'rgba(228,238,240,0.4)' }}></div>
              <div className="relative text-center z-[3]" style={{ "fontVariationSettings": "\"slnt\" 0" }}>
                <p className="font-medium text-center uppercase mb-[35px] text-[rgb(7,_80,_86)] text-[14px] tracking-[0.42px] leading-[16px]" style={{ "fontFamily": "tt-commons-mono, monospace", "fontVariationSettings": "\"slnt\" 0", "textDecoration": "rgb(7, 80, 86)" }}>WHY WE'RE DIFFERENT</p>
                <h2 className="text-center mb-[30px] text-[32px] md:text-[42px] lg:text-[54px] tracking-[-1.8px] leading-[1.1]" style={{ "fontVariationSettings": "\"slnt\" 0", "fontWeight": "620" }}>Beauty software, reimagined from the ground up</h2>
                <p className="font-medium text-center mb-[35px] text-[16px] md:text-[20px] leading-[1.5]" style={{ "fontVariationSettings": "\"slnt\" 0" }}>Most salon and spa software feels outdated — clunky interfaces, sluggish performance, and features that slow you down. StyloBliss is a fresh approach: modern tools purpose-built for beauty professionals who demand better.</p>
                <a href="/why" className="items-center inline-flex justify-center overflow-hidden relative text-center whitespace-nowrap h-14 mb-[40px] bg-[rgb(255,_91,_4)] text-[rgb(228,_238,_240)] text-[16px] md:text-[18px] gap-[8px] tracking-[-0.096px] leading-[18px] pt-4 px-6 md:px-9 pb-[17px] z-[2] rounded-[3.5rem]" style={{ "fontVariationSettings": "\"slnt\" 0", "fontWeight": "540", "textDecoration": "rgb(228, 238, 240)" }}>Learn why we're different</a>
              </div>
            </div>
          </section>
          <CustomerStories />
          {/* Bottom sections */}
          <div className="relative w-full flex flex-col items-center gap-[60px] md:gap-[120px]">
            <div
              className="pointer-events-none absolute w-screen left-1/2 -translate-x-1/2"
              style={{
                top: '-120px',
                bottom: '-100px',
                zIndex: 0,
                background: 'linear-gradient(180deg, transparent 0%, rgba(228,238,240,0.55) 10%, rgba(228,238,240,0.55) 90%, transparent 100%)',
              }}
            />
            <ExploreAndFeaturesSection />
            <CtaSection />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout><HomePage /></Layout>} path="/" />
      <Route element={<Layout><main className="relative mt-[-120px] z-[3] flex flex-col items-center" style={{ "fontVariationSettings": "\"slnt\" 0" }}><SalonsHero /><SalonLogosSection /><SalonKeyFeaturesSection /><SalonCustomerStories /><SalonFeatureShowcases /></main></Layout>} path="/salons" />
      <Route element={<Layout><main className="relative mt-[-120px] z-[3]" style={{ "fontVariationSettings": "\"slnt\" 0" }}><FAQPage /></main></Layout>} path="/faq" />
      <Route element={<Layout><main className="relative mt-[-120px] z-[3]" style={{ "fontVariationSettings": "\"slnt\" 0" }}><TutorialsPage /></main></Layout>} path="/tutorials" />
      <Route element={<Layout><main className="relative mt-[-120px] z-[3]" style={{ "fontVariationSettings": "\"slnt\" 0" }}><BlogPage /></main></Layout>} path="/blog" />
      <Route element={<Layout><main className="relative mt-[-120px] z-[3]" style={{ "fontVariationSettings": "\"slnt\" 0" }}><ContactPage /></main></Layout>} path="/contact" />
      <Route element={<Layout><main className="relative mt-[-120px] z-[3]" style={{ "fontVariationSettings": "\"slnt\" 0" }}><DemoPage /></main></Layout>} path="/demo" />
      <Route element={<Layout><main className="relative mt-[-120px] z-[3]" style={{ "fontVariationSettings": "\"slnt\" 0" }}><PricingPage /></main></Layout>} path="/pricing" />
      <Route element={<Layout><main className="relative mt-[-120px] z-[3]" style={{ "fontVariationSettings": "\"slnt\" 0" }}><WhyStyloBlissPage /></main></Layout>} path="/why" />

      {/* Pages without Layout */}
      <Route path="/login" element={<><LoginPage /><ChatbotWidget /></>} />
      <Route path="/trial" element={<><TrialPage /><ChatbotWidget /></>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}