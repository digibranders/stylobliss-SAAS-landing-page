import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SV = { fontVariationSettings: '"slnt" 0' };

/* ─────────────────────────────────────────────────────────────
   Step definitions
   ───────────────────────────────────────────────────────────── */
const STEPS = [
  {
    question: 'What type of business do you run?',
    subtitle: 'This helps us tailor StyloBliss to your needs.',
    options: [
      'Hair Salon',
      'Barbershop',
      'Med Spa',
      'Nail Salon',
      'Skincare Studio',
      'Massage Studio',
      'Wellness Center',
      'Other',
    ],
  },
  {
    question: 'How many service providers work at your business?',
    subtitle: 'Including yourself, if applicable.',
    options: ['Just me', '2–5', '6–10', '11–20', '21–50', '50+'],
  },
  {
    question: 'Which features matter most to you?',
    subtitle: 'Select all that apply — you can always explore more later.',
    options: [
      'Online Booking',
      'Calendar & Scheduling',
      'Payments & POS',
      'Client Management',
      'Marketing & Campaigns',
      'Memberships & Packages',
      'Reporting & Analytics',
      'Staff Management',
    ],
    multi: true,
  },
  {
    question: 'Are you currently using salon software?',
    subtitle: "We'll make switching easy if you are.",
    options: [
      'Yes, and I want to switch',
      'Yes, but just exploring',
      'No, this is my first time',
    ],
  },
  {
    question: 'How did you hear about StyloBliss?',
    subtitle: 'Just curious — helps us know what\u2019s working.',
    options: [
      'Google search',
      'Social media',
      'Friend or colleague',
      'Industry event',
      'Review site (Capterra, G2)',
      'Other',
    ],
  },
  {
    question: "You're all set! Let's create your account.",
    subtitle: 'Start your free 14-day trial — no credit card required.',
    isForm: true,
  },
];

/* ─────────────────────────────────────────────────────────────
   Trial Page Component
   ───────────────────────────────────────────────────────────── */
export function TrialPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [formData, setFormData] = useState({ name: '', email: '', business: '' });
  const [submitted, setSubmitted] = useState(false);

  const current = STEPS[step];
  const totalSteps = STEPS.length;
  const progressPct = ((step + 1) / totalSteps) * 100;

  const handleSelect = (option: string) => {
    if (current.multi) {
      const prev = (answers[step] as string[]) || [];
      const updated = prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option];
      setAnswers({ ...answers, [step]: updated });
    } else {
      setAnswers({ ...answers, [step]: option });
      // Auto-advance on single select
      if (step < totalSteps - 1) {
        setTimeout(() => setStep(step + 1), 300);
      }
    }
  };

  const isSelected = (option: string) => {
    const a = answers[step];
    if (Array.isArray(a)) return a.includes(option);
    return a === option;
  };

  const canContinue = current.multi
    ? Array.isArray(answers[step]) && (answers[step] as string[]).length > 0
    : !!answers[step];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: 'rgb(252, 250, 250)', ...SV }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 md:px-[40px] py-[20px]">
        <Link
          to="/"
          className="text-[rgb(25,30,73)] text-[22px] tracking-[-0.5px]"
          style={{ fontFamily: 'tt-commons-pro, sans-serif', fontWeight: 700, textDecoration: 'none', ...SV }}
        >
          StyloBliss
        </Link>
        <Link
          to="/"
          className="text-[rgb(188,38,155)] text-[15px] hover:text-[rgb(188,38,155)] transition-colors"
          style={{ fontWeight: 540, textDecoration: 'none', ...SV }}
        >
          ← Back to home
        </Link>
      </div>

      {/* Progress bar */}
      <div className="w-full px-4 md:px-[40px]">
        <div className="w-full h-[4px] rounded-full" style={{ background: 'rgba(25, 30, 73, 0.08)' }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${progressPct}%`,
              background: 'rgb(188, 38, 155)',
              transition: 'width 0.4s ease',
            }}
          />
        </div>
        <p
          className="mt-[8px] text-[13px] text-[rgb(188,38,155)]"
          style={{ fontFamily: 'tt-commons-mono, monospace', ...SV }}
        >
          STEP {step + 1} OF {totalSteps}
        </p>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-[40px] py-[40px]">
        {submitted ? (
          /* ── Success state ── */
          <div className="flex flex-col items-center text-center max-w-[480px]">
            <div
              className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-[24px]"
              style={{ background: 'rgba(188, 38, 155, 0.1)' }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgb(188,38,155)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1
              className="text-[36px] tracking-[-1px] leading-[42px] text-[rgb(25,30,73)] mb-[16px]"
              style={{ fontWeight: 620, ...SV }}
            >
              Welcome to StyloBliss!
            </h1>
            <p className="text-[18px] leading-[28px] text-[rgb(188,38,155)] mb-[32px]" style={SV}>
              Your 14-day free trial is ready. Check your inbox for a confirmation email to get started.
            </p>
            <Link
              to="/"
              className="flex items-center justify-center h-[50px] px-[32px] rounded-[56px] text-white text-[16px]"
              style={{
                fontWeight: 580,
                background: 'rgb(188, 38, 155)',
                textDecoration: 'none',
                ...SV,
              }}
            >
              Go to dashboard
            </Link>
          </div>
        ) : current.isForm ? (
          /* ── Step 6: Account creation form ── */
          <div className="w-full max-w-[480px]">
            <h2
              className="text-[36px] tracking-[-1px] leading-[42px] text-[rgb(25,30,73)] mb-[8px] text-center"
              style={{ fontWeight: 620, ...SV }}
            >
              {current.question}
            </h2>
            <p className="text-[18px] leading-[28px] text-[rgb(188,38,155)] mb-[40px] text-center" style={SV}>
              {current.subtitle}
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[6px]">
                <label className="text-[13px] text-[rgb(188,38,155)]" style={{ fontWeight: 560, ...SV }}>
                  Full name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-[48px] px-[16px] rounded-[12px] border border-[rgb(202,205,221)] bg-white text-[rgb(25,30,73)] text-[16px] outline-none focus:border-[rgb(188,38,155)] transition-colors"
                  placeholder="Jane Smith"
                  style={SV}
                />
              </div>
              <div className="flex flex-col gap-[6px]">
                <label className="text-[13px] text-[rgb(188,38,155)]" style={{ fontWeight: 560, ...SV }}>
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-[48px] px-[16px] rounded-[12px] border border-[rgb(202,205,221)] bg-white text-[rgb(25,30,73)] text-[16px] outline-none focus:border-[rgb(188,38,155)] transition-colors"
                  placeholder="jane@yoursalon.com"
                  style={SV}
                />
              </div>
              <div className="flex flex-col gap-[6px]">
                <label className="text-[13px] text-[rgb(188,38,155)]" style={{ fontWeight: 560, ...SV }}>
                  Business name
                </label>
                <input
                  type="text"
                  required
                  value={formData.business}
                  onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                  className="h-[48px] px-[16px] rounded-[12px] border border-[rgb(202,205,221)] bg-white text-[rgb(25,30,73)] text-[16px] outline-none focus:border-[rgb(188,38,155)] transition-colors"
                  placeholder="Your salon or spa name"
                  style={SV}
                />
              </div>
              <button
                type="submit"
                className="h-[52px] bg-[rgb(188,38,155)] text-white rounded-[56px] text-[16px] tracking-[-0.096px] hover:opacity-90 transition-opacity cursor-pointer mt-[8px]"
                style={{ fontWeight: 580, ...SV }}
              >
                Start my free trial
              </button>
              <p className="text-[13px] text-[rgb(188,38,155)] text-center mt-[4px]" style={SV}>
                No credit card required · Cancel anytime
              </p>
            </form>
            {/* Back button */}
            <button
              onClick={() => setStep(step - 1)}
              className="mt-[24px] mx-auto block text-[rgb(188,38,155)] text-[15px] hover:text-[rgb(188,38,155)] transition-colors cursor-pointer bg-transparent border-none"
              style={{ fontWeight: 540, ...SV }}
            >
              ← Back
            </button>
          </div>
        ) : (
          /* ── Steps 1–5: Quiz options ── */
          <div className="w-full max-w-[580px]">
            <h2
              className="text-[36px] tracking-[-1px] leading-[42px] text-[rgb(25,30,73)] mb-[8px] text-center"
              style={{ fontWeight: 620, ...SV }}
            >
              {current.question}
            </h2>
            <p className="text-[18px] leading-[28px] text-[rgb(188,38,155)] mb-[40px] text-center" style={SV}>
              {current.subtitle}
            </p>

            <div
              className="grid gap-[12px]"
              style={{
                gridTemplateColumns:
                  current.options && current.options.length > 4
                    ? 'repeat(2, 1fr)'
                    : '1fr',
              }}
            >
              {current.options?.map((option) => {
                const selected = isSelected(option);
                return (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className="flex items-center gap-[14px] px-[24px] py-[18px] rounded-[16px] cursor-pointer transition-all duration-200 text-left border"
                    style={{
                      background: selected ? 'rgba(188, 38, 155, 0.06)' : 'white',
                      borderColor: selected ? 'rgb(188, 38, 155)' : 'rgba(25, 30, 73, 0.1)',
                      boxShadow: selected
                        ? '0 0 0 1px rgb(188, 38, 155)'
                        : '0 1px 4px rgba(0,0,0,0.04)',
                      ...SV,
                    }}
                  >
                    {/* Radio / checkbox indicator */}
                    <div
                      className="shrink-0 w-[22px] h-[22px] flex items-center justify-center border-2"
                      style={{
                        borderRadius: current.multi ? '6px' : '50%',
                        borderColor: selected ? 'rgb(188, 38, 155)' : 'rgba(25, 30, 73, 0.25)',
                        background: selected ? 'rgb(188, 38, 155)' : 'transparent',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {selected && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span
                      className="text-[16px] text-[rgb(25,30,73)]"
                      style={{ fontWeight: selected ? 580 : 480, ...SV }}
                    >
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-[36px]">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                className="text-[rgb(188,38,155)] text-[15px] hover:text-[rgb(188,38,155)] transition-colors cursor-pointer bg-transparent border-none"
                style={{
                  fontWeight: 540,
                  visibility: step === 0 ? 'hidden' : 'visible',
                  ...SV,
                }}
              >
                ← Back
              </button>

              {current.multi && (
                <button
                  onClick={() => {
                    if (canContinue && step < totalSteps - 1) setStep(step + 1);
                  }}
                  className="flex items-center justify-center h-[48px] px-[32px] rounded-[56px] text-white text-[15px] transition-opacity cursor-pointer"
                  style={{
                    fontWeight: 580,
                    background: canContinue ? 'rgb(188, 38, 155)' : 'rgba(25, 30, 73, 0.15)',
                    opacity: canContinue ? 1 : 0.6,
                    ...SV,
                  }}
                  disabled={!canContinue}
                >
                  Continue →
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}