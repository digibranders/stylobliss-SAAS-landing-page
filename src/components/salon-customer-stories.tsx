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
   Bottom Line Nav — Mangomint-style
   Thin segment lines + labels + fill progress
   ───────────────────────────────────────── */
function BottomLineNav({
  activeIndex,
  isDragging,
  onNavClick,
  onAdvance,
}: {
  activeIndex: number;
  isDragging: boolean;
  onNavClick: (i: number) => void;
  onAdvance: () => void;
}) {
  return (
    <>
      <style>{`
        @keyframes barFill {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
      <div className="flex justify-center">
        <div
          className="flex items-center"
          style={{ gap: 'clamp(8px, 1.5vw, 20px)' }}
        >
          {NAV_ITEMS.map((label, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={label}
                onClick={() => onNavClick(i)}
                className="relative overflow-hidden bg-transparent border-none cursor-pointer p-0 flex-shrink-0"
                style={{
                  width: 'clamp(50px, 11vw, 170px)',
                  height: '3px',
                  borderRadius: '2px',
                  background: 'rgba(71, 79, 123, 0.45)',
                }}
                aria-label={label}
              >
                {isActive && (
                  <div
                    key={activeIndex}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgb(252, 250, 250)',
                      borderRadius: '2px',
                      transformOrigin: 'left center',
                      animation: `barFill ${FILL_DURATION}ms linear forwards`,
                      animationPlayState: isDragging ? 'paused' : 'running',
                    }}
                    onAnimationEnd={onAdvance}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   Main Component
   ───────────────────────────────────────── */
export function SalonCustomerStories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [activeIndex, setActiveIndex] = useState(0);
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

  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);

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
    },
    [animateToIndex],
  );

  /* ── onAdvance: called by CSS animationEnd on the active bar fill ── */
  const handleAdvance = useCallback(() => {
    advanceToNext(activeIndexRef.current);
  }, [advanceToNext]);

  const handleNavClick = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    animateToIndex(index);
  };

  /* ── Drag handlers ── */
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
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
        {/* Soft top and bottom bleeds to remove hard edges against the background */}
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 h-[80px] md:h-[120px] z-[0]"
          style={{ background: 'linear-gradient(180deg, rgba(252,250,250,1) 0%, rgba(25,30,73,0) 100%)' }}
        />
        <div
          className="pointer-events-none absolute left-0 right-0 bottom-0 h-[80px] md:h-[120px] z-[0]"
          style={{ background: 'linear-gradient(0deg, rgba(252,250,250,1) 0%, rgba(25,30,73,0) 100%)' }}
        />

        {/* ── Eyebrow ── */}
        <p
          className="inline-block text-center uppercase mt-[16px] sm:mt-[24px] md:mt-[30px] mb-[16px] sm:mb-[20px] md:mb-[24px] text-[rgb(120, 127, 167)] text-[12px] sm:text-[13px] md:text-[14px] tracking-[0.42px] leading-[16px]"
          style={{
            fontFamily: 'tt-commons-mono, monospace',
            fontWeight: 500,
          }}
        >
          Built for Hair Salons
        </p>

        {/* ── Heading ── */}
        <h2
          className="mx-auto text-center mt-[8px] md:mt-[10px] mb-[8px] sm:mb-[12px] md:mb-[16px] text-[rgb(252,_250,_250)] text-[28px] sm:text-[36px] md:text-[44px] lg:text-[48px] tracking-[-1.2px] leading-[1.15] px-5 sm:px-8 md:px-0 max-w-[700px]"
          style={{ fontWeight: 620 }}
        >
          Every tool you need to grow your salon
        </h2>

        {/* ── Description ── */}
        <p
          className="mx-auto text-center mb-[10px] sm:mb-[14px] md:mb-[20px] text-[rgb(120,_127,_167)] text-[15px] sm:text-[16px] md:text-[18px] leading-[24px] sm:leading-[26px] md:leading-[28px] px-6 sm:px-8 md:px-0 max-w-[560px]"
          style={{ fontWeight: 500 }}
        >
          We obsess over the details. Every feature in StyloBliss has been thoughtfully designed to simplify your workflow and free up your day.
        </p>

        {/* ── Watch Video Tour ── */}
        <div className="flex justify-center mb-[24px] sm:mb-[32px] md:mb-[44px]">
          <button
            className="flex items-center justify-center h-[50px] px-[32px] rounded-[56px] text-white text-[16px] sm:text-[13px] md:text-[14px] tracking-[0.42px] leading-[16px] bg-transparent border-none cursor-pointer"
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
                  fill="white"
                />
              </svg>
            </div>
            Watch Video Tour
          </button>
        </div>



        {/* ── Screenshot Carousel ── */}
        <div
          ref={containerRef}
          className="overflow-hidden relative w-full cursor-grab active:cursor-grabbing select-none mx-auto mb-[32px] sm:mb-[40px]"
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
                      className="absolute inset-0 bg-[rgb(25,30,73)] z-[3] rounded-[0.75rem] sm:rounded-[1rem] md:rounded-[1.5625rem] pointer-events-none"
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

        {/* ── Bottom Line Nav (Mangomint-style) ── */}
        <div className="relative z-[20] pb-[30px] sm:pb-[40px] md:pb-[50px] flex justify-center">
          <BottomLineNav
            activeIndex={activeIndex}
            isDragging={isDragging}
            onNavClick={handleNavClick}
            onAdvance={handleAdvance}
          />
        </div>
      </div>
    </section>
  );
}