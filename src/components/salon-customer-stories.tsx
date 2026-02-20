import React, { useRef, useEffect, useState, useCallback } from 'react';

const DESKTOP_SLIDE_WIDTH = 1040;
const SLIDE_GAP = 10;
const FILL_DURATION = 4000;

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

const NAV_ITEMS = SLIDES.map((s) => s.label.toUpperCase());
const extendedSlides = [...SLIDES, ...SLIDES, ...SLIDES];
const TOTAL = SLIDES.length;

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* ─────────────────────────────────────────
   Mobile Tab Nav — horizontally scrollable
   with sliding pill indicator
   ───────────────────────────────────────── */
function MobileTabNav({
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

  const measurePill = useCallback(() => {
    const btn = btnRefs.current[activeIndex];
    const container = scrollRef.current;
    if (!btn || !container) return;
    const cRect = container.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    setPill({ left: bRect.left - cRect.left + container.scrollLeft, width: bRect.width });
  }, [activeIndex]);

  useEffect(() => {
    measurePill();
    window.addEventListener('resize', measurePill);
    return () => window.removeEventListener('resize', measurePill);
  }, [measurePill]);

  // Auto-scroll active tab into view (horizontal only, no page scroll)
  useEffect(() => {
    const btn = btnRefs.current[activeIndex];
    const container = scrollRef.current;
    if (!btn || !container) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const targetScroll = container.scrollLeft + (btnRect.left - containerRect.left) - (containerRect.width / 2) + (btnRect.width / 2);
    container.scrollTo({ left: targetScroll, behavior: 'smooth' });
  }, [activeIndex]);

  return (
    <div className="relative w-full max-w-full px-4 sm:px-6 md:hidden">
      <div
        ref={scrollRef}
        className="relative flex items-center gap-[4px] overflow-x-auto scrollbar-hide rounded-full px-[6px] py-[6px]"
        style={{
          background: 'rgba(252, 250, 250, 0.1)',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* Sliding pill */}
        <div
          className="absolute top-[6px] bottom-[6px] rounded-full pointer-events-none z-0"
          style={{
            left: `${pill.left}px`,
            width: `${pill.width}px`,
            background: 'rgba(252, 250, 250, 0.15)',
            transition: 'left 0.3s ease, width 0.3s ease',
          }}
        />
        {NAV_ITEMS.map((label, i) => (
          <button
            key={label}
            ref={(el) => { btnRefs.current[i] = el; }}
            onClick={() => onNavClick(i)}
            className="relative z-[1] shrink-0 px-[14px] py-[8px] rounded-full bg-transparent border-none cursor-pointer whitespace-nowrap"
            style={{
              fontFamily: 'tt-commons-mono, monospace',
              fontWeight: 500,
              fontSize: '11px',
              letterSpacing: '0.3px',
              color: i === activeIndex ? 'rgb(252, 250, 250)' : 'rgba(160, 169, 252, 0.6)',
              transition: 'color 0.3s ease',
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-[6px] mt-[12px]">
        {NAV_ITEMS.map((_, i) => (
          <button
            key={i}
            onClick={() => onNavClick(i)}
            className="border-none bg-transparent cursor-pointer p-0"
          >
            <div
              className="rounded-full"
              style={{
                width: i === activeIndex ? '18px' : '6px',
                height: '6px',
                background: i === activeIndex ? 'rgb(188, 38, 155)' : 'rgba(252, 250, 250, 0.3)',
                transition: 'all 0.3s ease',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Desktop Tab Nav — horizontal pill bar
   with fill-progress indicator
   ───────────────────────────────────────── */
function DesktopTabNav({
  activeIndex,
  progress,
  onNavClick,
}: {
  activeIndex: number;
  progress: number;
  onNavClick: (i: number) => void;
}) {
  return (
    <div className="hidden md:flex items-center justify-center gap-[6px] rounded-full px-[8px] py-[8px]"
      style={{ background: 'rgba(252, 250, 250, 0.08)' }}
    >
      {NAV_ITEMS.map((label, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={label}
            onClick={() => onNavClick(i)}
            className="relative shrink-0 px-[18px] lg:px-[22px] py-[10px] rounded-full bg-transparent border-none cursor-pointer whitespace-nowrap overflow-hidden"
            style={{
              fontFamily: 'tt-commons-mono, monospace',
              fontWeight: 500,
              fontSize: '12px',
              letterSpacing: '0.35px',
              color: isActive ? 'rgb(252, 250, 250)' : 'rgba(160, 169, 252, 0.55)',
              transition: 'color 0.3s ease',
            }}
          >
            {/* Fill bar behind active tab */}
            {isActive && (
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: 'rgba(252, 250, 250, 0.12)' }}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 rounded-full"
                  style={{
                    width: `${progress * 100}%`,
                    background: 'rgba(188, 38, 155, 0.25)',
                    transition: 'width 0.05s linear',
                  }}
                />
              </div>
            )}
            <span className="relative z-[1]">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Component
   ───────────────────────────────────────── */
export function SalonCustomerStories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [fillProgress, setFillProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [trackOffset, setTrackOffset] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // Responsive slide width based on container
  const slideWidth = containerWidth > 0
    ? containerWidth < 640
      ? containerWidth - 32
      : containerWidth < 1024
        ? Math.min(900, containerWidth - 60)
        : DESKTOP_SLIDE_WIDTH
    : DESKTOP_SLIDE_WIDTH;
  const slideTotal = slideWidth + SLIDE_GAP;

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const progressStart = useRef(performance.now());
  const animRef = useRef<number>(0);

  /* ── Scroll-driven clip-path animation ── */
  useEffect(() => {
    const scrollContainer = sectionRef.current?.closest('.overflow-y-scroll') as HTMLElement | null;
    if (!scrollContainer) return;

    function handleScroll() {
      if (!sectionRef.current || !scrollContainer) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const containerRect = scrollContainer.getBoundingClientRect();
      const sectionTopRelative = rect.top - containerRect.top;
      const viewportH = containerRect.height;
      const start = viewportH * 0.7;
      const end = viewportH * 0.05;
      const raw = 1 - (sectionTopRelative - end) / (start - end);
      setScrollProgress(isNaN(raw) ? 0 : clamp(raw, 0, 1));
    }

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Carousel: measure container ── */
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const getTargetOffset = useCallback(
    (index: number) => {
      const slideCenter = (TOTAL + index) * slideTotal + slideWidth / 2;
      return slideCenter - containerWidth / 2;
    },
    [containerWidth, slideTotal, slideWidth],
  );

  const animateToIndex = useCallback(
    (index: number) => setTrackOffset(getTargetOffset(index)),
    [getTargetOffset],
  );

  const advanceToNext = useCallback(
    (currentIdx: number) => {
      const next = (currentIdx + 1) % TOTAL;
      setActiveIndex(next);
      animateToIndex(next);
      setFillProgress(0);
    },
    [animateToIndex],
  );

  /* ── Auto-advance timer ── */
  useEffect(() => {
    if (isDragging) return;
    progressStart.current = performance.now();
    setFillProgress(0);

    const tick = () => {
      const elapsed = performance.now() - progressStart.current;
      const pct = Math.min(elapsed / FILL_DURATION, 1);
      setFillProgress(pct);
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
    setFillProgress(0);
  };

  /* ── Drag handlers ── */
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      cancelAnimationFrame(animRef.current);
      dragStartX.current = e.clientX;
      dragStartOffset.current = trackOffset;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [trackOffset],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const dx = dragStartX.current - e.clientX;
      setTrackOffset(dragStartOffset.current + dx);
    },
    [isDragging],
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    const baseOffset = TOTAL * slideTotal;
    const relativeOffset = trackOffset - baseOffset;
    let snappedIndex = Math.round(relativeOffset / slideTotal);
    snappedIndex = ((snappedIndex % TOTAL) + TOTAL) % TOTAL;
    setActiveIndex(snappedIndex);
    animateToIndex(snappedIndex);
    setFillProgress(0);
  }, [isDragging, trackOffset, animateToIndex, slideTotal]);

  /* ── Initial position ── */
  useEffect(() => {
    setTrackOffset(getTargetOffset(0));
  }, [getTargetOffset]);

  /* ── Clip-path interpolation — percentage-based for full responsiveness ── */
  const insetPct = lerp(13, 0, scrollProgress);
  const borderRadius = lerp(60, 0, scrollProgress);
  const clipPath = `inset(0px ${insetPct}% round ${borderRadius}px)`;

  return (
    <section
      ref={sectionRef}
      className="relative z-[3]"
      style={{ width: '100vw' }}
    >
      <div
        className="relative text-center w-full pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px] z-[3]"
        style={{
          background: 'rgb(25, 30, 73)',
          clipPath,
          transition: 'clip-path 0.05s linear',
        }}
      >
        {/* ── Eyebrow ── */}
        <p
          className="inline-block text-center uppercase mt-[16px] sm:mt-[24px] md:mt-[30px] mb-[16px] sm:mb-[20px] md:mb-[24px] text-[rgb(160, 169, 252)] text-[12px] sm:text-[13px] md:text-[14px] tracking-[0.42px] leading-[16px]"
          style={{
            fontFamily: 'tt-commons-mono, monospace',
            fontWeight: 500,
          }}
        >
          Built for Hair Salons
        </p>

        {/* ── Heading ── */}
        <h2
          className="mx-auto text-center mt-[8px] md:mt-[10px] mb-[16px] sm:mb-[24px] md:mb-[30px] text-[#FCFAFA] text-[28px] sm:text-[36px] md:text-[44px] lg:text-[48px] tracking-[-1.2px] leading-[1.15] px-5 sm:px-8 md:px-0 max-w-[700px]"
          style={{ fontWeight: 620 }}
        >
          Every tool you need to grow your salon
        </h2>

        {/* ── Description ── */}
        <p
          className="mx-auto text-center mb-[20px] sm:mb-[28px] md:mb-[40px] text-[rgb(168,_212,_216)] text-[15px] sm:text-[16px] md:text-[18px] leading-[24px] sm:leading-[26px] md:leading-[28px] px-6 sm:px-8 md:px-0 max-w-[560px]"
          style={{ fontWeight: 500 }}
        >
          We obsess over the details. Every feature in StyloBliss has been thoughtfully designed to simplify your workflow and free up your day.
        </p>

        {/* ── Watch Video Tour ── */}
        <div className="flex justify-center mb-[24px] sm:mb-[32px] md:mb-[44px]">
          <button
            className="items-center inline-flex justify-center gap-[10px] uppercase text-[#FCFAFA] text-[12px] sm:text-[13px] md:text-[14px] tracking-[0.42px] leading-[16px] bg-transparent border-none cursor-pointer"
            style={{
              fontFamily: 'tt-commons-mono, monospace',
              fontWeight: 500,
            }}
          >
            <div
              className="w-[26px] h-[26px] sm:w-[28px] sm:h-[28px] rounded-full flex items-center justify-center"
              style={{ border: '1.5px solid rgba(252, 250, 250, 0.5)' }}
            >
              <svg
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.5 5.134C10.167 5.519 10.167 6.481 9.5 6.866L1.25 11.629C0.583 12.014 -0.001 11.533 -0.001 10.763V1.237C-0.001 0.467 0.583 -0.014 1.25 0.371L9.5 5.134Z"
                  fill="rgb(252, 250, 250)"
                />
              </svg>
            </div>
            Watch Video Tour
          </button>
        </div>

        {/* ── Tab Navigation ── */}
        <div className="relative z-[20] mb-[12px] sm:mb-[16px] flex justify-center">
          <DesktopTabNav
            activeIndex={activeIndex}
            progress={fillProgress}
            onNavClick={handleNavClick}
          />
          <MobileTabNav
            activeIndex={activeIndex}
            progress={fillProgress}
            onNavClick={handleNavClick}
          />
        </div>

        {/* ── Screenshot Carousel ── */}
        <div
          ref={containerRef}
          className="overflow-hidden relative w-full cursor-grab active:cursor-grabbing select-none mx-auto mb-[10px]"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ touchAction: 'pan-y' }}
        >
          <div
            ref={trackRef}
            className="flex"
            style={{
              transform: `translate3d(-${trackOffset}px, 0px, 0px)`,
              gap: `${SLIDE_GAP}px`,
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
                    width: `${slideWidth}px`,
                    aspectRatio: '52 / 31',
                  }}
                >
                  <figure
                    className="relative text-center mx-[8px] sm:mx-[16px] md:mx-[24px] shadow-[rgba(0,0,0,0.2)_0px_10px_30px_0px] rounded-[0.75rem] sm:rounded-[1rem] md:rounded-[1.5625rem] overflow-hidden"
                    style={{
                      transform: `scale(${scale})`,
                      transition: 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    }}
                  >
                    <div
                      className="absolute inset-0 bg-[rgb(25, 30, 73)] z-[3] rounded-[0.75rem] sm:rounded-[1rem] md:rounded-[1.5625rem] pointer-events-none"
                      style={{
                        opacity: overlayOpacity,
                        transition: 'opacity 0.6s ease',
                      }}
                    />
                    <img
                      src={slide.src}
                      alt={slide.label}
                      className="block w-full h-full object-cover rounded-[0.75rem] sm:rounded-[1rem] md:rounded-[1.5625rem]"
                      draggable={false}
                      style={{ aspectRatio: '2080 / 1240' }}
                    />
                  </figure>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}