import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

const SV = { fontVariationSettings: '"slnt" 0' };

/* ------------------------------------------------------------------ */
/*  Explore menu data                                                  */
/* ------------------------------------------------------------------ */
const EXPLORE_SECTIONS = {
  highlight: {
    title: "Why We're Different",
    description:
      "Modern salon & spa software that's fast, beautiful, and intuitive. See what sets StyloBliss apart.",
    href: '/why',
    image: 'https://images.unsplash.com/photo-1758188753373-5b01a0fc6d9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxvbiUyMHNwYSUyMGJlYXV0eSUyMHdlbGxuZXNzJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcwNzE1NjE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  product: {
    title: 'Product',
    items: [
      { label: 'Salons', href: '/salons' },
    ],
  },
  resources: {
    title: 'Resources',
    items: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Tutorials', href: '/tutorials' },
      { label: 'Blog', href: '/blog' },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Engage menu data                                                   */
/* ------------------------------------------------------------------ */
const ENGAGE_SECTIONS = {
  highlight: {
    title: 'Scheduling & Payments',
    description:
      'A complete booking and payment solution. Calendar, online booking, Express Booking, and integrated POS.',
    href: '/why',
    image: 'https://images.unsplash.com/photo-1769596722257-282ec3fe8594?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBzY2hlZHVsaW5nJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcwNzE1NjE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  getInTouch: {
    title: 'Get in Touch',
    items: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Book a Demo', href: '/demo' },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Shared sub-components                                              */
/* ------------------------------------------------------------------ */
function MenuLinkList({
  title,
  items,
  onClose,
}: {
  title: string;
  items: { label: string; href: string }[];
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col gap-[14px]">
      <p
        className="font-medium uppercase text-[12px] tracking-[0.4px] leading-[14px] text-[#c3157e]"
        style={{ fontFamily: 'tt-commons-mono, monospace', ...SV }}
      >
        {title}
      </p>
      <ul className="flex flex-col" style={SV}>
        {items.map((item) => (
          <li key={item.label} className="list-none" style={SV}>
            <Link
              to={item.href}
              className="block text-[rgb(25,_30,_73)] text-[16px] leading-[22px] px-[16px] py-[10px] -mx-[16px] rounded-[10px] hover:bg-white hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:text-[#c3157e] transition-all duration-200"
              style={{ fontWeight: 500, ...SV }}
              onClick={onClose}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HighlightCard({
  title,
  description,
  href,
  image,
  gradient,
  onClose,
}: {
  title: string;
  description: string;
  href: string;
  image: string;
  gradient: string;
  onClose: () => void;
}) {
  return (
    <Link
      to={href}
      className="group flex flex-col overflow-hidden rounded-[16px] h-full transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
      style={SV}
      onClick={onClose}
    >

      <div className="flex flex-col gap-[6px] p-[16px] bg-white/80 flex-1">
        <h4
          className="text-[15px] tracking-[-0.2px] leading-[20px] text-[rgb(25,_30,_73)]"
          style={{ fontWeight: 620, ...SV }}
        >
          {title}
        </h4>
        <p
          className="text-[13px] leading-[18px] text-[#c3157e]"
          style={{ fontWeight: 450, ...SV }}
        >
          {description}
        </p>
      </div>
    </Link>
  );
}

function LargeHighlightCard({
  title,
  description,
  href,
  image,
  onClose,
}: {
  title: string;
  description: string;
  href: string;
  image: string;
  onClose: () => void;
}) {
  return (
    <Link
      to={href}
      className="group flex gap-[14px] p-[14px] rounded-[16px] bg-[rgb(25,_30,_73)] items-center transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
      style={SV}
      onClick={onClose}
    >
      <div className="flex flex-col gap-[5px] flex-1">
        <h4
          className="text-[16px] tracking-[-0.2px] leading-[22px] text-white"
          style={{ fontWeight: 620, ...SV }}
        >
          {title}
        </h4>
        <p
          className="text-[13px] leading-[18px] text-[rgb(120,_127,_167)]"
          style={{ fontWeight: 450, ...SV }}
        >
          {description}
        </p>
      </div>
      <div className="w-[80px] h-[64px] rounded-[10px] overflow-hidden shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Explore Panel                                                      */
/* ------------------------------------------------------------------ */
function ExplorePanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="grid gap-[20px] p-[20px]" style={{ gridTemplateColumns: '1fr 300px' }}>
      {/* Product + Resources in a single column */}
      <div className="flex flex-col gap-[20px]">
        <MenuLinkList
          title="Product"
          items={[
            { label: 'Salons', href: '/salons' },
          ]}
          onClose={onClose}
        />

        <MenuLinkList
          title="Resources"
          items={[
            { label: 'FAQ', href: '/faq' },
            { label: 'Tutorials', href: '/tutorials' },
            { label: 'Blog', href: '/blog' },
          ]}
          onClose={onClose}
        />
      </div>

      {/* Why We're Different - large card (right side) */}
      <LargeHighlightCard
        title={EXPLORE_SECTIONS.highlight.title}
        description={EXPLORE_SECTIONS.highlight.description}
        href={EXPLORE_SECTIONS.highlight.href}
        image={EXPLORE_SECTIONS.highlight.image}
        onClose={onClose}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Engage Panel                                                       */
/* ------------------------------------------------------------------ */
function EngagePanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="grid gap-[20px] p-[20px] items-start" style={{ gridTemplateColumns: '1fr 300px' }}>
      {/* Get in Touch */}
      <div className="p-[14px]">
        <MenuLinkList
          title={ENGAGE_SECTIONS.getInTouch.title}
          items={ENGAGE_SECTIONS.getInTouch.items}
          onClose={onClose}
        />
      </div>

      {/* Scheduling & Payments - compact card (right side) */}
      <LargeHighlightCard
        title={ENGAGE_SECTIONS.highlight.title}
        description={ENGAGE_SECTIONS.highlight.description}
        href={ENGAGE_SECTIONS.highlight.href}
        image={ENGAGE_SECTIONS.highlight.image}
        onClose={onClose}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main exported component                                            */
/* ------------------------------------------------------------------ */
export type MenuType = 'explore' | 'engage' | null;


export function NavbarMegaMenu({
  activeMenu,
  onClose,
}: {
  activeMenu: MenuType;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [arrowLeft, setArrowLeft] = React.useState(100);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest('[data-menu-trigger]')
      ) {
        onClose();
      }
    }
    if (activeMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeMenu, onClose]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (activeMenu) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [activeMenu, onClose]);

  useEffect(() => {
    if (activeMenu) {
      // Small timeout to ensure DOM is ready and container is rendered
      setTimeout(() => {
        const trigger = document.querySelector(`[data-menu-trigger="${activeMenu}"]`) as HTMLElement;
        const container = panelRef.current;
        if (trigger && container) {
          const triggerRect = trigger.getBoundingClientRect();
          // To get accurate unscaled bounds, we can just use offset values or getBoundingClientRect
          const containerRect = container.getBoundingClientRect();
          const targetLeft = triggerRect.left + (triggerRect.width / 2) - containerRect.left - 7;
          if (targetLeft > 20 && targetLeft < 480) {
            setArrowLeft(targetLeft);
          }
        }
      }, 0);
    }
  }, [activeMenu]);

  return (
    <AnimatePresence>
      {activeMenu && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9997]"
            style={{ background: 'rgba(25, 30, 73, 0.08)' }}
            onClick={onClose}
          />

          {/* Menu panel */}
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute left-[40px] top-[80px] z-[9998] w-[520px] pt-[12px]`}
            style={{ ...SV, transformOrigin: `${arrowLeft}px top` }}
          >
            {/* Popover Arrow */}
            <div 
              className="absolute bg-[rgb(252,_250,_250)] border-l border-t border-black/[0.08] rounded-tl-[3px] z-[9999]"
              style={{
                width: '18px',
                height: '18px',
                top: '3px',
                left: `${arrowLeft}px`,
                transform: 'rotate(45deg)',
                boxShadow: '-3px -3px 6px rgba(0,0,0,0.02)',
                transition: 'left 0.15s ease-out'
              }}
            />
            <div
              className="bg-[rgb(252,_250,_250)] backdrop-blur-[24px] rounded-[20px] shadow-[0_12px_48px_rgba(0,0,0,0.12),_0_2px_8px_rgba(0,0,0,0.06)] border border-black/[0.06] overflow-hidden relative z-[9998]"
              style={SV}
            >
              {activeMenu === 'explore' && <ExplorePanel onClose={onClose} />}
              {activeMenu === 'engage' && <EngagePanel onClose={onClose} />}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}