import React from 'react';
import { Link } from 'react-router-dom';

const SV = { fontVariationSettings: '"slnt" 0' };

/* ─────────────────────────────────────────────────────────────
   Pricing tiers
   ───────────────────────────────────────────────────────────── */
const plans = [
  {
    id: 'essentials',
    name: 'Essentials',
    tagline: 'For independent professionals',
    price: 165,
    period: '/mo',
    description: 'Everything you need to run a solo practice with ease.',
    cta: 'Start free trial',
    features: [
      'Online booking & calendar',
      'Integrated payments & POS',
      'Client management',
      'Automated reminders',
      'Mobile app (iOS & Android)',
      'Gift cards',
      'Basic reporting',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    tagline: 'For growing teams',
    price: 245,
    period: '/mo',
    description: 'Powerful tools for salons ready to scale their business.',
    cta: 'Start free trial',
    popular: true,
    features: [
      'Everything in Essentials',
      'Staff management & scheduling',
      'Express Booking\u2122',
      'Memberships & packages',
      'Campaigns & automated flows',
      'Forms & charting',
      'Advanced reporting',
      'Virtual Waiting Room',
    ],
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    tagline: 'For multi-location businesses',
    price: 375,
    period: '/mo',
    description: 'Enterprise-grade power for large salons and salon groups.',
    cta: 'Start free trial',
    features: [
      'Everything in Standard',
      'Multi-location management',
      'Payroll processing',
      'Custom integrations & API',
      'Dedicated account manager',
      'Priority support',
      'Advanced analytics',
      'Custom onboarding',
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   "What's included in every plan" features
   ───────────────────────────────────────────────────────────── */
const includedFeatures = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(188,38,155)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'No hidden fees',
    description: 'Transparent pricing with no contracts, setup fees, or surprise charges.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(188,38,155)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Unlimited clients',
    description: 'Every plan includes unlimited client records — no per-client pricing.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(188,38,155)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Five-star support',
    description: 'US-based support via call, text, and chat — available when you need it.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(188,38,155)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    ),
    title: 'Free data migration',
    description: 'We handle the entire switch — client data, memberships, everything.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(188,38,155)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'All devices',
    description: 'Works beautifully on desktop, tablet, and mobile — no app install required.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(188,38,155)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Regular updates',
    description: 'New features and improvements shipped monthly at no extra cost.',
  },
];

/* ─────────────────────────────────────────────────────────────
   Pricing FAQ
   ───────────────────────────────────────────────────────────── */
const pricingFaqItems = [
  {
    question: 'Is there a free trial?',
    answer:
      'Yes! Every plan comes with a full-featured 14-day free trial. No credit card required to get started.',
  },
  {
    question: 'Can I switch plans later?',
    answer:
      'Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle, and we\u2019ll prorate any differences.',
  },
  {
    question: 'Are there any long-term contracts?',
    answer:
      'No contracts, ever. StyloBliss is month-to-month. You can cancel at any time without penalties or cancellation fees.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, Mastercard, American Express) and ACH bank transfers for annual plans.',
  },
  {
    question: 'Is there a discount for annual billing?',
    answer:
      'Yes \u2014 save up to 20% when you choose annual billing. Contact our team to learn more about annual pricing options.',
  },
  {
    question: 'What happens to my data if I cancel?',
    answer:
      'Your data remains accessible for 30 days after cancellation. We can also export your full client database, appointment history, and financial records at any time.',
  },
];

/* ─────────────────────────────────────────────────────────────
   Check icon for feature lists
   ───────────────────────────────────────────────────────────── */
function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgb(188,38,155)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[3px]">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Pricing Page Component
   ───────────────────────────────────────────────────────────── */
export function PricingPage() {
  const [annual, setAnnual] = React.useState(false);
  const [faqOpen, setFaqOpen] = React.useState<number | null>(null);

  return (
    <div style={{ ...SV }}>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative w-full pt-[120px] md:pt-[160px] pb-[60px] md:pb-[80px] px-4 md:px-[70px]">
        <div className="relative z-[1] max-w-[1160px] mx-auto text-center">
          <p
            className="font-medium uppercase mb-[20px] text-[rgb(71,79,123)] text-[14px] tracking-[0.42px] leading-[16px]"
            style={{ fontFamily: 'tt-commons-mono, monospace', ...SV }}
          >
            PRICING
          </p>
          <h1
            className="text-[32px] md:text-[48px] tracking-[-1px] md:tracking-[-1.4px] leading-[38px] md:leading-[54px] text-[rgb(25,30,73)] mb-[16px] md:mb-[20px]"
            style={{ fontWeight: 620, ...SV }}
          >
            Simple, transparent pricing
          </h1>
          <p
            className="font-medium text-[17px] md:text-[20px] leading-[26px] md:leading-[30px] text-[rgb(71,79,123)] max-w-[520px] mx-auto mb-[32px] md:mb-[40px]"
            style={SV}
          >
            No hidden fees. No long-term contracts. Start your free trial today and upgrade when you're ready.
          </p>

          {/* Annual / Monthly toggle */}
          <div className="flex flex-col items-center gap-[8px]">
            <div className="flex items-center justify-center gap-[14px]">
              <span
                className="text-[15px] text-[rgb(25,30,73)]"
                style={{ fontWeight: annual ? 450 : 620, ...SV }}
              >
                Monthly
              </span>
              <button
                onClick={() => setAnnual(!annual)}
                className="relative w-[52px] h-[28px] rounded-full cursor-pointer border-none transition-colors duration-200"
                style={{ background: annual ? 'rgb(188,38,155)' : 'rgb(202,205,221)' }}
              >
                <div
                  className="absolute top-[3px] w-[22px] h-[22px] rounded-full bg-white transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.15)]"
                  style={{ left: annual ? '27px' : '3px' }}
                />
              </button>
              <span
                className="text-[15px] text-[rgb(25,30,73)]"
                style={{ fontWeight: annual ? 620 : 450, ...SV }}
              >
                Annual
              </span>
            </div>

            <div className="h-[24px] flex items-center justify-center">
              {annual && (
                <span
                  className="text-[12px] text-[rgb(71,79,123)] px-[10px] py-[4px] rounded-full fade-in"
                  style={{ fontWeight: 620, background: 'rgba(188,38,155,0.08)', ...SV }}
                >
                  Save 20%
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PRICING CARDS ═══════════════ */}
      <section className="relative z-[2] max-w-[1160px] mx-auto px-4 md:px-[70px] pb-[60px] md:pb-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] pt-[28px]">
          {plans.map((plan) => {
            const displayPrice = annual ? Math.round(plan.price * 0.8) : plan.price;
            return (
              <div key={plan.id} className="relative">
                {plan.popular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      padding: '5px 16px',
                      borderRadius: '9999px',
                      background: 'rgb(188,38,155)',
                      color: 'white',
                      fontSize: '12px',
                      letterSpacing: '0.3px',
                      fontWeight: 620,
                      whiteSpace: 'nowrap',
                      zIndex: 10,
                      ...SV,
                    }}
                  >
                    Most popular
                  </div>
                )}
                <div
                  className="bg-white rounded-[24px] p-[24px] md:p-[40px] flex flex-col h-full shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-shadow duration-300"
                  style={plan.popular ? { boxShadow: '0 0 0 2px rgb(188,38,155), 0 8px 32px rgba(0,0,0,0.08)' } : {}}
                >
                  <p
                    className="font-medium uppercase mb-[6px] text-[rgb(71,79,123)] text-[12px] tracking-[0.42px] leading-[16px]"
                    style={{ fontFamily: 'tt-commons-mono, monospace', ...SV }}
                  >
                    {plan.tagline}
                  </p>
                  <h3
                    className="text-[rgb(25,30,73)] text-[24px] tracking-[-0.6px] leading-[30px] mb-[16px]"
                    style={{ fontWeight: 620, ...SV }}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-[4px] mb-[8px]">
                    <span
                      className="text-[rgb(25,30,73)] text-[40px] md:text-[48px] tracking-[-1.5px] leading-[44px] md:leading-[52px]"
                      style={{ fontWeight: 620, ...SV }}
                    >
                      ${displayPrice}
                    </span>
                    <span className="text-[rgb(71,79,123)] text-[15px]" style={{ fontWeight: 450, ...SV }}>
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-[rgb(71,79,123)] text-[14px] leading-[21px] mb-[28px]" style={{ fontWeight: 450, ...SV }}>
                    {plan.description}
                  </p>
                  <Link
                    to="/trial"
                    className="flex items-center justify-center h-[48px] rounded-[3rem] text-[15px] tracking-[-0.096px] mb-[28px] transition-opacity hover:opacity-90"
                    style={{
                      fontWeight: 580,
                      backgroundColor: plan.popular ? 'rgb(188,38,155)' : 'transparent',
                      color: plan.popular ? 'white' : 'rgb(188,38,155)',
                      boxShadow: plan.popular ? 'none' : 'inset 0 0 0 2px rgb(188,38,155)',
                      textDecoration: 'none',
                      ...SV,
                    }}
                  >
                    {plan.cta}
                  </Link>
                  <div className="flex flex-col gap-[12px]">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-start gap-[10px]">
                        <Check />
                        <span className="text-[rgb(25,30,73)] text-[14px] leading-[20px]" style={{ fontWeight: 450, ...SV }}>
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════ INCLUDED IN EVERY PLAN ═══════════════ */}
      <section className="relative w-full py-[60px] md:py-[80px] px-4 md:px-[70px]">
        <div className="relative z-[1] max-w-[1160px] mx-auto">
          <div className="text-center mb-[36px] md:mb-[60px]">
            <p
              className="font-medium uppercase mb-[12px] md:mb-[16px] text-[rgb(71,79,123)] text-[13px] md:text-[14px] tracking-[0.42px] leading-[16px]"
              style={{ fontFamily: 'tt-commons-mono, monospace', ...SV }}
            >
              INCLUDED IN EVERY PLAN
            </p>
            <h2
              className="text-[rgb(25,30,73)] text-[28px] md:text-[36px] tracking-[-0.8px] md:tracking-[-1.2px] leading-[34px] md:leading-[42px]"
              style={{ fontWeight: 620, ...SV }}
            >
              Everything you need, nothing you don't
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] md:gap-[24px]">
            {includedFeatures.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-[24px] p-[24px] md:p-[32px] flex flex-col gap-[12px] md:gap-[14px] shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
              >
                <div className="w-[48px] h-[48px] rounded-[12px] bg-[rgb(188,38,155)]/8 flex items-center justify-center">
                  {f.icon}
                </div>
                <h4
                  className="text-[rgb(25,30,73)] text-[17px] tracking-[-0.3px] leading-[22px]"
                  style={{ fontWeight: 620, ...SV }}
                >
                  {f.title}
                </h4>
                <p className="text-[rgb(71,79,123)] text-[14px] leading-[21px]" style={{ fontWeight: 450, ...SV }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PRICING FAQ ═══════════════ */}
      <section className="relative z-[2] w-full py-[60px] md:py-[80px] px-4 md:px-[70px]">
        <div className="relative z-[1] mx-auto flex flex-col items-center max-w-[760px]">
          <h3
            className="text-center text-[rgb(25,30,73)] text-[26px] md:text-[33px] tracking-[-0.8px] md:tracking-[-1px] leading-[34px] md:leading-[40px] mb-[30px] md:mb-[40px]"
            style={{ fontWeight: 700, ...SV }}
          >
            Pricing FAQ
          </h3>
          <div className="w-full">
            {pricingFaqItems.map((item, idx) => (
              <div key={idx} className="border-b border-[rgb(224,226,237)] first:border-t">
                <button
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full flex items-center justify-between py-[24px] px-[10px] cursor-pointer bg-transparent border-none text-left"
                >
                  <span
                    className="text-[rgb(25,30,73)] text-[16px] md:text-[18px] tracking-[-0.3px] md:tracking-[-0.4px] leading-[24px] md:leading-[30px]"
                    style={{ fontWeight: 700, ...SV }}
                  >
                    {item.question}
                  </span>
                  <div className="shrink-0 ml-[20px] p-[10px]">
                    <svg
                      width="6" height="10" viewBox="0 0 6 10" fill="none"
                      className={`transition-transform duration-200 ${faqOpen === idx ? 'rotate-90' : '-rotate-90'}`}
                    >
                      <path d="M5 1L1 5L5 9" stroke="rgb(188, 38, 155)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
                {faqOpen === idx && (
                  <div className="px-[10px] pb-[24px]">
                    <p className="text-[rgb(25,30,73)] text-[16px] leading-[26px]" style={{ fontWeight: 450, ...SV }}>
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA CARD ═══════════════ */}
      <section className="relative w-full pb-[60px] md:pb-[100px] px-4 md:px-[70px]">
        <div
          className="relative z-[1] mx-auto max-w-[760px] py-[40px] px-[24px] md:py-[60px] md:px-[70px] flex flex-col items-center text-center rounded-[30px]"
          style={{
            background: 'linear-gradient(90deg, #dde1ff, #e9dbfc 35%, #fddfee 65%, #ffebdd)',
          }}
        >
          <h3
            className="mb-[12px] md:mb-[16px] text-[rgb(25,30,73)] text-[26px] md:text-[32px] tracking-[-0.8px] md:tracking-[-1px] leading-[34px] md:leading-[40px]"
            style={{ fontWeight: 700, ...SV }}
          >
            Ready to try StyloBliss?
          </h3>
          <p
            className="mb-[24px] md:mb-[30px] text-[rgb(25,30,73)] text-[16px] md:text-[17px] leading-[26px] md:leading-[28px] max-w-[440px]"
            style={{ fontWeight: 450, ...SV }}
          >
            Start your 14-day free trial. No credit card required. Cancel anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-[12px] sm:gap-[16px] items-center">
            <Link
              to="/demo"
              className="flex items-center justify-center h-[50px] px-[30px] rounded-[56px] text-[rgb(188,38,155)] text-[15px] tracking-[-0.096px] hover:opacity-90 transition-opacity"
              style={{
                fontWeight: 580,
                textDecoration: 'none',
                boxShadow: 'inset 0 0 0 2px rgb(188, 38, 155)',
                ...SV,
              }}
            >
              Book a live demo
            </Link>
            <Link
              to="/trial"
              className="flex items-center justify-center h-[50px] px-[30px] rounded-[56px] text-white text-[15px] tracking-[-0.096px] hover:opacity-90 transition-opacity"
              style={{
                fontWeight: 580,
                background: 'rgb(188, 38, 155)',
                color: 'white',
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