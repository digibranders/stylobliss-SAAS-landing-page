import React from 'react';
// @ts-ignore

const SV = { fontVariationSettings: '"slnt" 0' };

/* ── Salon brand logos (text-based, styled to match reference) ── */
const SALON_BRANDS = [
  { name: 'Ouidad', style: 'italic', fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 400 },
  { name: 'PALM SUNDAY', style: 'normal', fontFamily: '"Arial Black", sans-serif', fontSize: '22px', fontWeight: 900, letterSpacing: '1px' },
  { name: 'Mero\nMero', style: 'italic', fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 700, letterSpacing: '0px', lineHeight: '1.05' },
  { name: 'Loc Shop', style: 'italic', fontFamily: 'Georgia, serif', fontSize: '26px', fontWeight: 400, letterSpacing: '0.5px' },
  { name: 'perrym.', style: 'italic', fontFamily: 'Georgia, serif', fontSize: '26px', fontWeight: 400, letterSpacing: '0px' },
];

function SalonLogoBrand({ brand }: { brand: typeof SALON_BRANDS[0] }) {
  return (
    <div
      className="shrink-0 flex items-center justify-center rounded-[1.25rem] bg-white"
      style={{
        width: '190px',
        height: '120px',
        boxShadow: '0 1px 8px rgba(0,0,0,0.04), 0 0 1px rgba(0,0,0,0.06)',
      }}
    >
      <span
        className="text-[#191e49] text-center whitespace-pre-line select-none"
        style={{
          fontFamily: brand.fontFamily,
          fontSize: brand.fontSize,
          fontWeight: brand.fontWeight,
          fontStyle: brand.style,
          letterSpacing: (brand as any).letterSpacing || '0px',
          lineHeight: (brand as any).lineHeight || '1.2',
        }}
      >
        {brand.name}
      </span>
    </div>
  );
}

/* ── Key Features data ── */
const KEY_FEATURES = [
  ['Login-free online booking', 'Staff specific service customizations', 'Book via SMS & collect card-on-file'],
  ['Intelligent waitlist for cancellations', 'Retail & inventory management', 'Checkout & pay via SMS'],
  ['Embedded two-way texting', 'Payroll calculation and processing', 'Inspiration photo upload for clients'],
];

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className="shrink-0 mt-[2px]"
    >
      <path
        d="M4.5 9.5L7.5 12.5L13.5 5.5"
        stroke="#bc269b"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Section 1: Join 10,000+ ── */
export function SalonLogosSection() {
  // Triple the logos for seamless infinite scroll
  const logos = [...SALON_BRANDS, ...SALON_BRANDS, ...SALON_BRANDS];

  return (
    <section
      className="relative w-full pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px]"
      style={SV}
    >
      <div className="mx-auto max-w-[1060px] px-4 md:px-[40px]">
        {/* Heading */}
        <h2
          className="text-center text-[#191e49] text-[24px] sm:text-[28px] md:text-[30px] tracking-[-0.9px] leading-[1.25] mb-[30px] md:mb-[40px] px-2"
          style={{
            fontFamily: 'tt-commons-pro, sans-serif',
            fontWeight: 620,
            ...SV,
          }}
        >
          Join 10,000+ salon professionals who made the switch to StyloBliss
        </h2>
      </div>

      {/* Logos strip with infinite marquee + transparent fade edges */}
      <div
        className="relative overflow-hidden mx-auto max-w-[1100px]"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >

        {/* Marquee track */}
        <div className="flex items-center gap-[14px] animate-[salonMarquee_25s_linear_infinite] w-max">
          {logos.map((brand, i) => (
            <SalonLogoBrand key={`${brand.name}-${i}`} brand={brand} />
          ))}
        </div>

        {/* Keyframes injected via style tag */}
        <style>{`
          @keyframes salonMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-1 * (190px + 14px) * ${SALON_BRANDS.length})); }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ── Section 2: Key Features ── */
export function SalonKeyFeaturesSection() {
  // Flatten the 2D array for simple flow-based rendering
  const allFeatures = KEY_FEATURES.flat();

  return (
    <section
      className="relative w-full pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px]"
      style={SV}
    >
      <div className="mx-auto max-w-[1060px] px-4 md:px-[40px]">
        <div
          className="relative py-[24px] px-[16px] sm:py-[30px] sm:px-[20px] md:py-[50px] md:px-[60px] bg-[rgb(245,238,233)] rounded-[24px]"
        >
          {/* Heading */}
          <h3
            className="text-center text-[#191e49] text-[24px] sm:text-[28px] md:text-[30px] tracking-[-0.9px] leading-[1.25] mb-[24px] sm:mb-[30px] md:mb-[40px]"
            style={{
              fontFamily: 'tt-commons-pro, sans-serif',
              fontWeight: 620,
              ...SV,
            }}
          >
            Key features for hair salons:
          </h3>

          {/* Features list — single column on mobile, 2 on sm, 3 on lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[30px] md:gap-x-[40px] gap-y-[14px] sm:gap-y-[18px] md:gap-y-[20px]">
            {allFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-[10px]"
              >
                <CheckIcon />
                <span
                  className="text-[#191e49] text-[15px] sm:text-[16px] leading-[22px]"
                  style={{
                    fontFamily: 'tt-commons-pro, sans-serif',
                    fontWeight: 500,
                    ...SV,
                  }}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}