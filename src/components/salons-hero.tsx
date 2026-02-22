import React from 'react';
import { Link } from 'react-router-dom';

const SV = { fontVariationSettings: '"slnt" 0' };

const heroImg =
  'https://images.unsplash.com/photo-1706629503603-e47c37722776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzYWxvbiUyMGJyaWdodCUyMGVsZWdhbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzA4NzMyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

export function SalonsHero() {
  return (
    <section className="relative w-full pt-[160px] md:pt-[200px] pb-[40px] md:pb-[60px] px-4 md:px-10 overflow-hidden">
      {/* Subtle background wash */}
      <div
        className="pointer-events-none absolute w-screen left-[50%] -translate-x-[50%]"
        style={{
          top: 0,
          bottom: '-200px',
          zIndex: 0,
          background: 'linear-gradient(180deg, rgb(252, 250, 250) 0%, rgb(252, 250, 250) 80%, transparent 100%)',
        }}
      />

      {/* Centered content */}
      <div className="relative z-[2] max-w-[1160px] mx-auto flex flex-col items-center text-center" style={SV}>
        {/* Eyebrow — uppercase monospace */}
        <p
          className="uppercase mb-[24px] md:mb-[30px] text-[rgb(188,38,155)] text-[13px] md:text-[14px] tracking-[0.42px] leading-[16px]"
          style={{
            fontFamily: 'tt-commons-mono, monospace',
            fontWeight: 500,
            ...SV,
          }}
        >
          Built for high-performing hair salons
        </p>

        {/* Headline */}
        <h1
          className="text-[rgb(25,30,73)] text-[36px] md:text-[48px] lg:text-[54px] tracking-[-1.62px] leading-[1.1] max-w-[680px] mb-[20px] md:mb-[30px]"
          style={{
            fontFamily: 'tt-commons-pro, sans-serif',
            fontWeight: 620,
            ...SV,
          }}
        >
          Elevate your salon experience
        </h1>

        {/* Subtitle */}
        <p
          className="text-[rgb(25,30,73)] text-[16px] md:text-[20px] leading-[1.5] max-w-[560px] mb-[30px] md:mb-[40px]"
          style={{
            fontFamily: 'tt-commons-pro, sans-serif',
            fontWeight: 500,
            ...SV,
          }}
        >
          Simplify scheduling, delight your clients, and scale your
          salon with the most powerful salon management and booking
          platform available.
        </p>

        {/* Dual pill CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-[16px] mb-[50px] md:mb-[80px]">
          <Link
            to="/trial"
            className="items-center flex justify-center overflow-hidden text-center whitespace-nowrap h-[52px] md:h-[56px] bg-[rgb(188,38,155)] text-[rgb(252,250,250)] text-[16px] md:text-[17px] gap-[10px] tracking-[-0.096px] leading-[16px] px-[28px] md:px-[32px] rounded-[3rem] hover:opacity-90 transition-opacity"
            style={{
              fontFamily: 'tt-commons-pro, sans-serif',
              fontWeight: 540,
              textDecoration: 'none',
              ...SV,
            }}
          >
            Try It for Free
          </Link>
          <Link
            to="/demo"
            className="items-center flex justify-center overflow-hidden text-center whitespace-nowrap h-[52px] md:h-[56px] text-[rgb(188,38,155)] text-[16px] md:text-[17px] gap-[10px] tracking-[-0.096px] leading-[16px] px-[28px] md:px-[32px] rounded-[3rem] hover:opacity-90 transition-opacity"
            style={{
              fontFamily: 'tt-commons-pro, sans-serif',
              fontWeight: 540,
              textDecoration: 'none',
              boxShadow: 'inset 0 0 0 2px rgb(188, 38, 155)',
              ...SV,
            }}
          >
            Book a Live Demo
          </Link>
        </div>

        {/* Image showcase */}
        <div className="w-full max-w-[1060px] rounded-[20px] md:rounded-[30px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
          <img
            src={heroImg}
            alt="Modern salon interior"
            className="w-full h-auto block aspect-[16/9] object-cover"
          />
        </div>
      </div>
    </section>
  );
}