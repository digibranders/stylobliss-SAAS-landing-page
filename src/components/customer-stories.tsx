import React, { useRef, useEffect, useState } from 'react';

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

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function CustomerCard({ customer, progress }: { customer: typeof CUSTOMERS[0]; progress: number }) {
  const cardH = Math.round(lerp(340, 432, progress));
  const nameOpacity = progress;

  return (
    <div
      className="shrink-0 flex flex-col items-center justify-center"
      style={{ width: '295px', minWidth: '295px' }}
    >
      <div
        className="overflow-hidden relative rounded-[1.875rem]"
        style={{
          width: '260px',
          minWidth: '260px',
          height: `${cardH}px`,
          transition: 'height 0.1s linear',
        }}
      >
        <img
          alt={customer.name}
          src={customer.img}
          className="block h-full object-cover absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          draggable={false}
        />
        {(customer as any).hasPlay && (
          <div className="absolute inset-0 flex items-end justify-end z-[5] p-4">
            <div
              className="w-[48px] h-[48px] rounded-full flex items-center justify-center"
              style={{ background: 'rgb(255, 91, 4)' }}
            >
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 8.268C18.333 9.038 18.333 10.962 17 11.732L3.5 19.526C2.167 20.296 0.5 19.334 0.5 17.794V2.206C0.5 0.666 2.167 -0.296 3.5 0.474L17 8.268Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
      <h3
        className="mt-[20px] mb-[10px] text-[rgb(228,_238,_240)] text-[22px] tracking-[-0.44px] leading-[26px] text-center w-full"
        style={{
          fontWeight: 620,
          opacity: nameOpacity,
          transform: `translateY(${lerp(10, 0, progress)}px)`,
          transition: 'opacity 0.15s ease, transform 0.15s ease',
        }}
      >
        {customer.name}
      </h3>
      <p
        className="text-center uppercase text-[rgb(168,_212,_216)] text-[13px] tracking-[0.39px] leading-[15px]"
        style={{
          fontFamily: 'tt-commons-mono, monospace',
          fontWeight: 500,
          opacity: nameOpacity,
          transform: `translateY(${lerp(8, 0, progress)}px)`,
          transition: 'opacity 0.15s ease, transform 0.15s ease',
        }}
      >
        {customer.business}
      </p>
    </div>
  );
}

export function CustomerStories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

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
      setProgress(isNaN(raw) ? 0 : clamp(raw, 0, 1));
    }

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  // Percentage-based clip-path — no JS measurement needed, fully responsive
  // Start: 13% inset on each side (~74% visible) with 60px rounded corners
  // End: 0% inset (full edge-to-edge) with 0px rounded corners
  const insetPct = lerp(13, 0, progress);
  const borderRadius = lerp(60, 0, progress);
  const clipPath = `inset(0px ${insetPct}% round ${borderRadius}px)`;

  const marqueeItems = [...CUSTOMERS, ...CUSTOMERS, ...CUSTOMERS, ...CUSTOMERS];

  return (
    <section
      ref={sectionRef}
      className="relative z-[3]"
      style={{
        /* Break out of max-w parent to full viewport width.
           The parent flex-col has items-center, which centers this
           overflowing child equally on both sides — no left/transform needed.
           overflow-x-hidden on the scroll container clips any scrollbar overshoot. */
        width: '100vw',
      }}
    >
      <style>{`
        @keyframes customerMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
      `}</style>

      <div
        className="relative text-center w-full pt-20 pb-20 z-[3] my-[30px]"
        style={{
          background: 'rgb(22, 35, 42)',
          clipPath,
          transition: 'clip-path 0.05s linear',
        }}
      >
        {/* Header */}
        <p
          className="inline-block text-center uppercase mt-[30px] mb-[24px] text-[rgb(168,212,216)] text-[14px] tracking-[0.42px] leading-[16px]"
          style={{
            fontFamily: 'tt-commons-mono, monospace',
            fontWeight: 500,
          }}
        >
          Customer Stories
        </p>
        <h2
          className="mx-auto text-center mt-[10px] mb-[70px] text-[rgb(228,_238,_240)] text-[32px] md:text-[48px] tracking-[-1.2px] leading-[1.1] max-w-[calc(100%-60px)] md:max-w-[700px]"
          style={{ fontWeight: 620 }}
        >
          Loved by thousands of salon and spa owners
        </h2>

        {/* Customer photos marquee */}
        <div className="overflow-hidden relative text-center w-full mb-[10px]">
          <div className="overflow-hidden relative w-full">
            <div
              className="flex"
              style={{
                gap: '0px',
                width: 'max-content',
                animation: 'customerMarquee 50s linear infinite',
              }}
            >
              {marqueeItems.map((customer, i) => (
                <CustomerCard
                  key={`${customer.name}-${i}`}
                  customer={customer}
                  progress={progress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}