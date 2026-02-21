import React from 'react';
import { Link } from 'react-router-dom';

const SV = { fontVariationSettings: '"slnt" 0' };

/* ─────────────────────────────────────────────────────────────
   Core differentiators
   ───────────────────────────────────────────────────────────── */
const differentiators = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgb(255,91,4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Lightning fast',
    description:
      'Every interaction feels instant. Our platform is engineered for speed \u2014 from page loads to appointment booking to checkout. No loading spinners, no waiting.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgb(255,91,4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: 'Beautifully designed',
    description:
      'A modern, intuitive interface that your team and clients will love. Every screen is crafted for clarity, not clutter.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgb(255,91,4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Built for every device',
    description:
      'Whether you\u2019re at the front desk, on the salon floor, or at home \u2014 StyloBliss works beautifully on desktop, tablet, and phone.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgb(255,91,4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: 'No learning curve',
    description:
      'Your team can start using StyloBliss in minutes, not weeks. Our intuitive design means less training and more productivity from day one.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgb(255,91,4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Five-star support',
    description:
      'US-based support that\u2019s a click away. Our team knows the beauty industry inside-out and treats your success as their own.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgb(255,91,4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Effortless migration',
    description:
      'Switching from another platform? We handle everything \u2014 client data, memberships, inventory, and more. Zero downtime, zero hassle.',
  },
];

/* ─────────────────────────────────────────────────────────────
   Stats
   ───────────────────────────────────────────────────────────── */
const stats = [
  { value: '#1', label: 'Top-rated platform on Capterra & G2' },
  { value: '4.9/5', label: 'Average customer rating' },
  { value: '<1 min', label: 'Average support response time' },
  { value: '99.99%', label: 'Platform uptime reliability' },
];

/* ─────────────────────────────────────────────────────────────
   Feature showcase sections
   ───────────────────────────────────────────────────────────── */
const showcases = [
  {
    eyebrow: 'BUILT DIFFERENT',
    title: 'Software that actually makes your life easier',
    description:
      'Most salon software was designed decades ago and patched together over time. StyloBliss was built from scratch with modern technology \u2014 so every feature works together seamlessly, and everything just feels right.',
    points: [
      'Real-time calendar with drag-and-drop scheduling',
      'Integrated payments with transparent, competitive rates',
      'Automated client reminders that reduce no-shows by 90%',
    ],
    image: 'https://images.unsplash.com/photo-1637777277337-f114350fb088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWF1dHklMjBzYWxvbiUyMGludGVyaW9yJTIwYnJpZ2h0fGVufDF8fHx8MTc3MDg5Njg0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    imageAlt: 'Modern salon interior',
    reverse: false,
  },
  {
    eyebrow: 'YOUR CLIENTS WILL LOVE IT',
    title: 'A booking experience that delights',
    description:
      'Your clients deserve better than clunky booking forms. StyloBliss offers a beautiful, branded online booking experience that converts visitors into loyal clients.',
    points: [
      'Express Booking\u2122 \u2014 book in under 30 seconds',
      'Smart rebooking suggestions based on history',
      'Integrated virtual waiting room for walk-ins',
    ],
    image: 'https://images.unsplash.com/photo-1761931403671-d020a14928d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxvbiUyMHN0eWxpc3QlMjBjdXR0aW5nJTIwaGFpciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzA4OTY4NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    imageAlt: 'Stylist with client',
    reverse: true,
  },
  {
    eyebrow: 'GROW YOUR BUSINESS',
    title: 'Marketing tools that work while you sleep',
    description:
      'Automated flows, targeted campaigns, and smart engagement tools help you fill empty chairs, retain more clients, and grow revenue \u2014 all on autopilot.',
    points: [
      'Automated win-back campaigns for inactive clients',
      'Birthday offers and loyalty rewards',
      'Real-time analytics and revenue dashboards',
    ],
    image: 'https://images.unsplash.com/photo-1758632031161-b6d7e913c2b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjB3ZWxsbmVzcyUyMHRyZWF0bWVudCUyMHJvb20lMjBzZXJlbmV8ZW58MXx8fHwxNzcwODk2ODQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    imageAlt: 'Spa treatment room',
    reverse: false,
  },
];

/* ─────────────────────────────────────────────────────────────
   Testimonial
   ───────────────────────────────────────────────────────────── */
const testimonial = {
  quote:
    "We tried every salon software out there before finding StyloBliss. The difference is night and day \u2014 it's faster, more intuitive, and our team actually enjoys using it.",
  name: 'Sarah Mitchell',
  role: 'Owner, Lumiere Salon & Spa',
  rating: 5,
};

/* ─────────────────────────────────────────────────────────────
   Check icon
   ───────────────────────────────────────────────────────────── */
function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgb(255,91,4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[3px]">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Why StyloBliss Page
   ───────────────────────────────────────────────────────────── */
export function WhyStyloBlissPage() {
  return (
    <div style={{ ...SV, background: '#ffffff' }}>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative w-full pt-[120px] md:pt-[160px] pb-[60px] md:pb-[100px] px-4 md:px-[70px]">
        {/* Hero gradient band */}
        <div
          className="pointer-events-none absolute w-screen left-[50%] -translate-x-[50%]"
          style={{
            top: 0,
            bottom: '-160px',
            zIndex: 0,
            backgroundColor: 'rgb(245, 238, 233)',
          }}
        />
        <div className="relative z-[1] max-w-[1160px] mx-auto text-center">
          <p
            className="font-medium uppercase mb-[20px] text-[rgb(7,80,86)] text-[14px] tracking-[0.42px] leading-[16px]"
            style={{ fontFamily: 'tt-commons-mono, monospace', ...SV }}
          >
            WHY WE'RE DIFFERENT
          </p>
          <h1
            className="text-[32px] md:text-[48px] tracking-[-1px] md:tracking-[-1.4px] leading-[38px] md:leading-[54px] text-[rgb(22,35,42)] mb-[16px] md:mb-[20px] max-w-[680px] mx-auto"
            style={{ fontWeight: 620, ...SV }}
          >
            Beauty software, reimagined from the ground up
          </h1>
          <p
            className="font-medium text-[17px] md:text-[20px] leading-[26px] md:leading-[30px] text-[rgb(7,80,86)] max-w-[560px] mx-auto mb-[32px] md:mb-[40px]"
            style={SV}
          >
            Most salon software feels outdated — clunky interfaces, sluggish performance, and features that slow you down. StyloBliss is a fresh approach.
          </p>
          <div className="flex flex-col sm:flex-row gap-[12px] sm:gap-[16px] items-center justify-center">
            <Link
              to="/demo"
              className="flex items-center justify-center h-[50px] px-[30px] rounded-[56px] text-white text-[15px] tracking-[-0.096px]"
              style={{
                fontWeight: 580,
                background: 'rgb(255, 91, 4)',
                textDecoration: 'none',
                ...SV,
              }}
            >
              Book a live demo
            </Link>
            <Link
              to="/trial"
              className="flex items-center justify-center h-[50px] px-[30px] rounded-[56px] text-[rgb(255,91,4)] text-[15px] tracking-[-0.096px]"
              style={{
                fontWeight: 580,
                textDecoration: 'none',
                boxShadow: 'inset 0 0 0 2px rgb(255, 91, 4)',
                ...SV,
              }}
            >
              Try it for free
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="relative z-[2] max-w-[1160px] mx-auto px-4 md:px-[70px] pb-[60px] md:pb-[80px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px] md:gap-[24px]">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-[20px] md:rounded-[24px] p-[20px] md:p-[32px] text-center shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
            >
              <p
                className="text-[rgb(255,91,4)] text-[28px] md:text-[36px] tracking-[-0.8px] md:tracking-[-1px] leading-[34px] md:leading-[42px] mb-[6px] md:mb-[8px]"
                style={{ fontWeight: 700, ...SV }}
              >
                {s.value}
              </p>
              <p className="text-[rgb(7,80,86)] text-[13px] md:text-[14px] leading-[18px] md:leading-[20px]" style={{ fontWeight: 450, ...SV }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ DIFFERENTIATORS ═══════════════ */}
      <section className="relative w-full py-[60px] md:py-[80px] px-4 md:px-[70px]">
        {/* Subtle colorful band */}
        <div
          className="pointer-events-none absolute w-screen left-[50%] -translate-x-[50%]"
          style={{
            top: '-200px',
            bottom: '-200px',
            zIndex: 0,
            backgroundColor: 'rgb(245, 238, 233)',
          }}
        />
        <div className="relative z-[1] max-w-[1160px] mx-auto">
          <div className="text-center mb-[36px] md:mb-[60px]">
            <p
              className="font-medium uppercase mb-[12px] md:mb-[16px] text-[rgb(7,80,86)] text-[13px] md:text-[14px] tracking-[0.42px] leading-[16px]"
              style={{ fontFamily: 'tt-commons-mono, monospace', ...SV }}
            >
              THE STYLOBLISS DIFFERENCE
            </p>
            <h2
              className="text-[rgb(22,35,42)] text-[28px] md:text-[36px] tracking-[-0.8px] md:tracking-[-1.2px] leading-[34px] md:leading-[42px] max-w-[480px] mx-auto"
              style={{ fontWeight: 620, ...SV }}
            >
              Six reasons beauty pros choose StyloBliss
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] md:gap-[24px]">
            {differentiators.map((d) => (
              <div
                key={d.title}
                className="bg-white rounded-[24px] p-[24px] md:p-[36px] flex flex-col gap-[14px] md:gap-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-shadow duration-300"
              >
                <div className="w-[52px] h-[52px] rounded-[14px] bg-[rgb(255,91,4)]/8 flex items-center justify-center">
                  {d.icon}
                </div>
                <h3
                  className="text-[rgb(22,35,42)] text-[20px] tracking-[-0.4px] leading-[26px]"
                  style={{ fontWeight: 620, ...SV }}
                >
                  {d.title}
                </h3>
                <p className="text-[rgb(7,80,86)] text-[15px] leading-[22px]" style={{ fontWeight: 450, ...SV }}>
                  {d.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURE SHOWCASES ═══════════════ */}
      {showcases.map((s, i) => (
        <section key={i} className="relative z-[2] w-full py-[50px] md:py-[80px] px-4 md:px-[70px]">
          <div
            className="relative z-[1] max-w-[1160px] mx-auto grid items-center gap-[30px] md:gap-[60px] grid-cols-1 md:grid-cols-2"
          >
            {/* Image */}
            <div
              className={`rounded-[24px] overflow-hidden aspect-[4/3] ${s.reverse ? 'md:order-2' : 'order-1'}`}
            >
              <img
                src={s.image}
                alt={s.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text */}
            <div className={`flex flex-col gap-[20px] ${s.reverse ? 'md:order-1' : 'order-2'}`}>
              <p
                className="font-medium uppercase text-[rgb(7,80,86)] text-[12px] tracking-[1.5px] leading-[14px]"
                style={{ fontFamily: 'tt-commons-mono, monospace', fontWeight: 600, ...SV }}
              >
                {s.eyebrow}
              </p>
              <h2
                className="text-[rgb(22,35,42)] text-[26px] md:text-[32px] tracking-[-0.8px] md:tracking-[-1px] leading-[34px] md:leading-[38px]"
                style={{ fontWeight: 620, ...SV }}
              >
                {s.title}
              </h2>
              <p className="text-[rgb(7,80,86)] text-[16px] leading-[26px]" style={{ fontWeight: 450, ...SV }}>
                {s.description}
              </p>
              <div className="flex flex-col gap-[12px] mt-[8px]">
                {s.points.map((p) => (
                  <div key={p} className="flex items-start gap-[10px]">
                    <Check />
                    <span className="text-[rgb(22,35,42)] text-[15px] leading-[22px]" style={{ fontWeight: 500, ...SV }}>
                      {p}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ═══════════════ TESTIMONIAL ═══════════════ */}
      <section className="relative z-[2] w-full py-[50px] md:py-[80px] px-4 md:px-[70px]">
        <div className="relative z-[1] max-w-[760px] mx-auto">
          <div className="bg-[rgb(22,35,42)] rounded-[24px] p-[28px] sm:p-[40px] md:p-[60px] text-center">
            {/* Stars */}
            <div className="flex items-center justify-center gap-[4px] mb-[20px] md:mb-[24px]">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="rgb(255,180,0)">
                  <path d="M10 1l2.47 5.56L18.5 7.3l-4.27 3.85L15.34 17 10 13.97 4.66 17l1.11-5.85L1.5 7.3l6.03-.74L10 1z" />
                </svg>
              ))}
            </div>
            <p
              className="text-white text-[18px] md:text-[20px] leading-[28px] md:leading-[32px] mb-[24px] md:mb-[28px] italic"
              style={{ fontWeight: 450, ...SV }}
            >
              "{testimonial.quote}"
            </p>
            <p className="text-white text-[15px] md:text-[16px]" style={{ fontWeight: 620, ...SV }}>
              {testimonial.name}
            </p>
            <p className="text-[rgb(168,212,216)] text-[13px] md:text-[14px] mt-[4px]" style={{ fontWeight: 450, ...SV }}>
              {testimonial.role}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA CARD ═══════════════ */}
      <section className="relative w-full pb-[60px] md:pb-[100px] px-4 md:px-[70px]">
        {/* Bottom colorful gradient bleed behind CTA */}
        <div
          className="pointer-events-none absolute w-screen left-[50%] -translate-x-[50%]"
          style={{
            top: '-200px',
            bottom: 0,
            zIndex: 0,
            backgroundColor: 'rgb(245, 238, 233)',
          }}
        />
        <div
          className="relative z-[1] mx-auto max-w-[760px] rounded-[30px] py-[40px] px-[24px] md:py-[60px] md:px-[70px] flex flex-col items-center text-center"
          style={{
            backgroundColor: 'rgba(217, 162, 130, 0.15)',
          }}
        >
          <h3
            className="mb-[12px] md:mb-[16px] text-[rgb(22,35,42)] text-[26px] md:text-[32px] tracking-[-0.8px] md:tracking-[-1px] leading-[34px] md:leading-[40px]"
            style={{ fontWeight: 700, ...SV }}
          >
            Ready to experience the difference?
          </h3>
          <p
            className="mb-[24px] md:mb-[30px] text-[rgb(22,35,42)] text-[16px] md:text-[17px] leading-[26px] md:leading-[28px] max-w-[440px]"
            style={{ fontWeight: 450, ...SV }}
          >
            Start your free trial today. No credit card required. See why thousands of beauty professionals made the switch.
          </p>
          <div className="flex flex-col sm:flex-row gap-[12px] sm:gap-[16px] items-center">
            <Link
              to="/demo"
              className="flex items-center justify-center h-[50px] px-[30px] rounded-[56px] text-[rgb(255,91,4)] text-[15px] tracking-[-0.096px]"
              style={{
                fontWeight: 580,
                textDecoration: 'none',
                boxShadow: 'inset 0 0 0 2px rgb(255, 91, 4)',
                ...SV,
              }}
            >
              Book a live demo
            </Link>
            <Link
              to="/trial"
              className="flex items-center justify-center h-[50px] px-[30px] rounded-[56px] text-[rgb(228,238,240)] text-[15px] tracking-[-0.096px]"
              style={{
                fontWeight: 580,
                background: 'rgb(255, 91, 4)',
                textDecoration: 'none',
                ...SV,
              }}
            >
              Start free trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}