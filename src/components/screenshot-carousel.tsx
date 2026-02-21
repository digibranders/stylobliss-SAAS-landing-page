import React, { useRef, useState, useEffect, useCallback, useMemo, useLayoutEffect } from 'react';

const FILL_DURATION = 4000;

const navItems = [
  'CALENDAR',
  'ONLINE BOOKING',
  'SALES & PAYMENTS',
  'CALLS & TEXTS',
  'MARKETING',
];

const slides = [
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

const TOTAL = slides.length;
const extendedSlides = [...slides, ...slides, ...slides];

/* ─────────────────────────────────────────────
   Mobile Nav — unified glass bar + sliding pill
   ───────────────────────────────────────────── */
function MobileNav({
  activeIndex,
  progress,
  onNavClick,
}: {
  activeIndex: number;
  progress: number;
  onNavClick: (i: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  // Measure active button position for sliding pill
  const measurePill = useCallback(() => {
    const btn = btnRefs.current[activeIndex];
    const container = scrollRef.current;
    if (!btn || !container) return;
    setPill({
      left: btn.offsetLeft,
      width: btn.offsetWidth,
    });
  }, [activeIndex]);

  useLayoutEffect(() => {
    measurePill();
  }, [measurePill]);

  // Auto-scroll so active tab is centered + update fades
  useEffect(() => {
    const container = scrollRef.current;
    const btn = btnRefs.current[activeIndex];
    if (!container || !btn) return;
    const scrollLeft = btn.offsetLeft - container.offsetWidth / 2 + btn.offsetWidth / 2;
    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }, [activeIndex]);

  // Track scroll to show/hide edge fades
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      setShowLeftFade(el.scrollLeft > 4);
      setShowRightFade(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    };
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // Re-measure on resize
  useEffect(() => {
    const onResize = () => measurePill();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [measurePill]);

  return (
    <div className="relative w-full max-w-full px-3">
      {/* Unified glass container */}
      <div
        className="relative rounded-[2rem] overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.25)',
          border: '1px solid rgba(255,255,255,0.4)',
          backdropFilter: 'blur(20px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
          boxShadow:
            '0 4px 24px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.5) inset',
        }}
      >
        {/* Left edge fade */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-[28px] z-[5] rounded-l-[2rem]"
          style={{
            background:
              'linear-gradient(to right, rgba(252,250,250,0.85) 0%, transparent 100%)',
            opacity: showLeftFade ? 1 : 0,
            transition: 'opacity 0.25s ease',
          }}
        />
        {/* Right edge fade */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-[28px] z-[5] rounded-r-[2rem]"
          style={{
            background:
              'linear-gradient(to left, rgba(252,250,250,0.85) 0%, transparent 100%)',
            opacity: showRightFade ? 1 : 0,
            transition: 'opacity 0.25s ease',
          }}
        />

        {/* Scrollable tab area */}
        <div
          ref={scrollRef}
          className="relative flex items-center overflow-x-auto no-scrollbar"
          style={{
            padding: '5px 6px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* Sliding active pill indicator */}
          <div
            className="absolute top-[5px] bottom-[5px] z-[1] rounded-[1.5rem] pointer-events-none"
            style={{
              left: `${pill.left}px`,
              width: `${pill.width}px`,
              background: 'rgba(255,255,255,0.55)',
              boxShadow:
                '0 1px 6px rgba(0,0,0,0.05), 0 0 0 0.5px rgba(255,255,255,0.6) inset',
              transition: 'left 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {/* Progress fill within the pill */}
            <div
              className="absolute left-0 top-0 bottom-0 rounded-[1.5rem]"
              style={{
                width: `${progress * 100}%`,
                background: 'rgba(255,255,255,0.45)',
                transition: 'none', // driven by rAF, no CSS transition
              }}
            />
          </div>

          {/* Tab buttons */}
          {navItems.map((label, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={label}
                ref={(el) => { btnRefs.current[i] = el; }}
                onClick={() => onNavClick(i)}
                className="relative z-[2] shrink-0 cursor-pointer whitespace-nowrap select-none"
                style={{
                  padding: '10px 14px',
                  minHeight: '40px',
                  fontSize: '10.5px',
                  fontFamily: 'tt-commons-mono, monospace',
                  letterSpacing: '0.5px',
                  color: isActive
                    ? 'rgb(25, 30, 73)'
                    : 'rgba(25, 30, 73, 0.45)',
                  fontWeight: isActive ? 600 : 500,
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '1.5rem',
                  transition: 'color 0.25s ease, font-weight 0.25s ease',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dot indicators — shows which tab is active at a glance */}
      <div className="flex items-center justify-center gap-[6px] mt-[10px]">
        {navItems.map((_, i) => (
          <button
            key={`dot-${i}`}
            onClick={() => onNavClick(i)}
            className="cursor-pointer p-0 border-none bg-transparent"
            style={{ WebkitTapHighlightColor: 'transparent' }}
            aria-label={`Go to ${navItems[i]}`}
          >
            <div
              className="rounded-full"
              style={{
                width: i === activeIndex ? '16px' : '5px',
                height: '5px',
                background:
                  i === activeIndex
                    ? 'rgb(25, 30, 73)'
                    : 'rgba(25, 30, 73, 0.2)',
                transition:
                  'width 0.35s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Desktop Nav — individual glass pill buttons
   ───────────────────────────────────────────── */
function DesktopNav({
  activeIndex,
  progress,
  onNavClick,
}: {
  activeIndex: number;
  progress: number;
  onNavClick: (i: number) => void;
}) {
  return (
    <div
      className="flex items-center gap-[6px] px-[10px] py-[8px] rounded-[3rem]"
      style={{ background: 'transparent' }}
    >
      {navItems.map((label, i) => {
        const isActive = i === activeIndex;
        const fillWidth = isActive ? `${progress * 100}%` : '0%';
        return (
          <button
            key={label}
            onClick={() => onNavClick(i)}
            className="relative overflow-hidden px-[18px] py-[10px] rounded-[2.5rem] text-[13px] tracking-[0.4px] cursor-pointer whitespace-nowrap"
            style={{
              fontFamily: 'tt-commons-mono, monospace',
              color: isActive
                ? 'rgb(25, 30, 73)'
                : 'rgba(25, 30, 73, 0.55)',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.35)',
              backdropFilter: 'blur(16px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
              boxShadow:
                '0 2px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.4)',
              transition: 'color 0.3s ease',
            }}
          >
            <div
              className="absolute left-0 top-0 bottom-0 rounded-[2.5rem] pointer-events-none"
              style={{
                width: fillWidth,
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.45) 100%)',
              }}
            />
            <span className="relative z-[2]">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Carousel
   ───────────────────────────────────────────── */
export function ScreenshotCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [trackOffset, setTrackOffset] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const progressStart = useRef(performance.now());
  const animRef = useRef<number>(0);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const dims = useMemo(() => {
    if (containerWidth === 0) {
      return { slideW: 1040, gap: 10, figureMx: 24, radius: 25 };
    }
    if (containerWidth >= 1200) {
      return { slideW: 1040, gap: 10, figureMx: 24, radius: 25 };
    }
    if (containerWidth >= 768) {
      const slideW = Math.round(containerWidth * 0.72);
      return { slideW, gap: 10, figureMx: 16, radius: 20 };
    }
    const slideW = Math.round(containerWidth * 0.80);
    return { slideW, gap: 8, figureMx: 8, radius: 16 };
  }, [containerWidth]);

  const slideTotal = dims.slideW + dims.gap;
  const isMobile = containerWidth > 0 && containerWidth < 768;

  const getTargetOffset = useCallback(
    (index: number) => {
      const slideCenter = (TOTAL + index) * slideTotal + dims.slideW / 2;
      return slideCenter - containerWidth / 2;
    },
    [containerWidth, slideTotal, dims.slideW]
  );

  const animateToIndex = useCallback(
    (index: number) => {
      setTrackOffset(getTargetOffset(index));
    },
    [getTargetOffset]
  );

  const advanceToNext = useCallback(
    (currentIdx: number) => {
      const next = (currentIdx + 1) % TOTAL;
      setActiveIndex(next);
      animateToIndex(next);
      setProgress(0);
    },
    [animateToIndex]
  );

  // Progress timer
  useEffect(() => {
    if (isDragging) return;
    progressStart.current = performance.now();
    setProgress(0);
    const tick = () => {
      const elapsed = performance.now() - progressStart.current;
      const pct = Math.min(elapsed / FILL_DURATION, 1);
      setProgress(pct);
      if (pct < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        advanceToNext(activeIndex);
      }
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [activeIndex, isDragging, advanceToNext]);

  const handleNavClick = (index: number) => {
    if (index === activeIndex) return;
    cancelAnimationFrame(animRef.current);
    setActiveIndex(index);
    animateToIndex(index);
    setProgress(0);
  };

  // Drag handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      cancelAnimationFrame(animRef.current);
      dragStartX.current = e.clientX;
      dragStartOffset.current = trackOffset;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [trackOffset]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const dx = dragStartX.current - e.clientX;
      setTrackOffset(dragStartOffset.current + dx);
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    const currentOffset = trackOffset;
    const baseOffset = TOTAL * slideTotal;
    const relativeOffset = currentOffset - baseOffset;
    let snappedIndex = Math.round(relativeOffset / slideTotal);
    snappedIndex = ((snappedIndex % TOTAL) + TOTAL) % TOTAL;
    setActiveIndex(snappedIndex);
    animateToIndex(snappedIndex);
    setProgress(0);
  }, [isDragging, trackOffset, animateToIndex, slideTotal]);

  // Initial position
  useEffect(() => {
    if (containerWidth > 0) {
      setTrackOffset(getTargetOffset(0));
    }
  }, [getTargetOffset, containerWidth]);

  return (
    <div className="flex flex-col items-center gap-0">
      {/* Nav — responsive: mobile vs desktop */}
      <div className="relative z-[20] mb-[12px] md:mb-[16px] w-full flex justify-center">
        {isMobile ? (
          <MobileNav
            activeIndex={activeIndex}
            progress={progress}
            onNavClick={handleNavClick}
          />
        ) : (
          <DesktopNav
            activeIndex={activeIndex}
            progress={progress}
            onNavClick={handleNavClick}
          />
        )}
      </div>

      {/* Screenshot Carousel */}
      <div
        className="overflow-hidden relative w-full cursor-grab active:cursor-grabbing select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: 'pan-y' }}
        ref={containerRef}
      >
        <div
          ref={trackRef}
          className="flex"
          style={{
            transform: `translate3d(-${trackOffset}px, 0px, 0px)`,
            gap: `${dims.gap}px`,
            willChange: 'transform',
            transition: isDragging
              ? 'none'
              : 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          {extendedSlides.map((slide, i) => {
            const middleActiveIndex = TOTAL + activeIndex;
            const isActiveSlide = i === middleActiveIndex;
            const scale = isActiveSlide ? 1 : 0.92;
            const overlayOpacity = isActiveSlide ? 0 : 0.35;

            return (
              <div
                key={`slide-${i}`}
                className="items-center grid text-center shrink-0"
                style={{
                  width: `${dims.slideW}px`,
                  aspectRatio: '52 / 31',
                  borderRadius: `${dims.radius}px`,
                }}
              >
                <figure
                  className="relative text-center overflow-hidden"
                  style={{
                    marginLeft: `${dims.figureMx}px`,
                    marginRight: `${dims.figureMx}px`,
                    borderRadius: `${dims.radius}px`,
                    boxShadow: 'rgba(0,0,0,0.09) 0px 10px 30px 0px',
                    transform: `scale(${scale})`,
                    transition:
                      'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
                  }}
                >
                  <div
                    className="absolute inset-0 bg-[rgb(252,250,250)] pointer-events-none"
                    style={{
                      zIndex: 3,
                      borderRadius: `${dims.radius}px`,
                      opacity: overlayOpacity,
                      transition: 'opacity 0.6s ease',
                    }}
                  />
                  <img
                    src={slide.src}
                    alt={slide.label}
                    className="block w-full h-full object-cover"
                    draggable={false}
                    style={{
                      aspectRatio: '2080 / 1240',
                      borderRadius: `${dims.radius}px`,
                    }}
                  />
                </figure>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
