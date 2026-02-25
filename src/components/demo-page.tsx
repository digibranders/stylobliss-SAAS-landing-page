import React from 'react';

const SV = { fontVariationSettings: '"slnt" 0' };

const benefits = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(188,38,155)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: 'Calendar & Scheduling',
    description: 'See how our lightning-fast calendar handles bookings, walk-ins, and automated reminders.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(188,38,155)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    title: 'Payments & POS',
    description: 'Explore integrated payment processing with transparent pricing and no hidden fees.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(188,38,155)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Client Management',
    description: 'Discover smart client profiles, history tracking, and automated engagement tools.',
  },
];

const testimonials = [
  {
    quote: "I was blown away by how intuitive everything was during the demo. It's clearly built by people who understand salons.",
    name: 'Marcus Chen',
    role: 'Director, Serenity Spa & Wellness',
  },
];

export function DemoPage() {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    teamSize: '',
  });
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={SV}>
      {/* Hero */}
      <section className="relative w-full pt-[120px] md:pt-[160px] pb-[32px] px-4 md:px-[70px]">
        <div
          className="pointer-events-none absolute w-screen left-[50%] -translate-x-[50%]"
          style={{
            top: 0,
            height: '700px',
            zIndex: 0,
            background: 'linear-gradient(180deg, rgb(245, 238, 233) 0%, rgb(245, 238, 233) 80%, transparent 100%)',
          }}
        />
        <div className="relative z-[1] max-w-[1160px] mx-auto text-center">
          <p
            className="font-medium uppercase mb-[20px] text-[rgb(71,79,123)] text-[14px] tracking-[0.42px] leading-[16px]"
            style={{ fontFamily: 'tt-commons-mono, monospace', ...SV }}
          >
            BOOK A DEMO
          </p>
          <h1
            className="text-[48px] tracking-[-1.4px] leading-[54px] text-[rgb(25,30,73)] mb-[20px]"
            style={{ fontWeight: 620, ...SV }}
          >
            See StyloBliss in action
          </h1>
          <p
            className="font-medium text-[20px] leading-[30px] text-[rgb(71,79,123)] max-w-[580px] mx-auto"
            style={SV}
          >
            Get a personalized walkthrough of the platform tailored to your business. Our product experts will show you exactly how StyloBliss can transform your workflow.
          </p>
        </div>
      </section>

      {/* Form + Benefits */}
      <section className="relative z-[1] max-w-[1160px] mx-auto px-4 md:px-[70px] pb-[60px] md:pb-[100px]">
        <div className="grid gap-[32px] grid-cols-1 md:grid-cols-2">
          {/* Demo Form */}
          <div className="bg-white rounded-[24px] p-[48px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] self-start">
            <h2
              className="text-[28px] tracking-[-0.8px] leading-[34px] text-[rgb(25,30,73)] mb-[8px]"
              style={{ fontWeight: 620, ...SV }}
            >
              Request your demo
            </h2>
            <p className="text-[15px] leading-[22px] text-[rgb(71,79,123)] mb-[32px]" style={SV}>
              Fill out the details below and we'll schedule a personalized demo at a time that works for you.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-[60px] gap-[16px]">
                <div className="w-[56px] h-[56px] rounded-full bg-[rgb(188,38,155)]/10 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgb(188,38,155)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3
                  className="text-[22px] tracking-[-0.4px] text-[rgb(25,30,73)]"
                  style={{ fontWeight: 620, ...SV }}
                >
                  You're all set!
                </h3>
                <p className="text-[15px] text-[rgb(71,79,123)] text-center max-w-[320px]" style={SV}>
                  A StyloBliss product expert will reach out within 1 business day to schedule your personalized demo.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
                <div className="grid grid-cols-2 gap-[16px]">
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[13px] text-[rgb(71,79,123)]" style={{ fontWeight: 560, ...SV }}>
                      First name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="h-[44px] px-[14px] rounded-[10px] border border-[rgb(202,205,221)] bg-[rgb(252,250,250)] text-[rgb(25,30,73)] text-[15px] outline-none focus:border-[rgb(188,38,155)] transition-colors"
                      placeholder="First name"
                      style={SV}
                    />
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[13px] text-[rgb(71,79,123)]" style={{ fontWeight: 560, ...SV }}>
                      Last name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="h-[44px] px-[14px] rounded-[10px] border border-[rgb(202,205,221)] bg-[rgb(252,250,250)] text-[rgb(25,30,73)] text-[15px] outline-none focus:border-[rgb(188,38,155)] transition-colors"
                      placeholder="Last name"
                      style={SV}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-[16px]">
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[13px] text-[rgb(71,79,123)]" style={{ fontWeight: 560, ...SV }}>
                      Work email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-[44px] px-[14px] rounded-[10px] border border-[rgb(202,205,221)] bg-[rgb(252,250,250)] text-[rgb(25,30,73)] text-[15px] outline-none focus:border-[rgb(188,38,155)] transition-colors"
                      placeholder="you@salon.com"
                      style={SV}
                    />
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[13px] text-[rgb(71,79,123)]" style={{ fontWeight: 560, ...SV }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-[44px] px-[14px] rounded-[10px] border border-[rgb(202,205,221)] bg-[rgb(252,250,250)] text-[rgb(25,30,73)] text-[15px] outline-none focus:border-[rgb(188,38,155)] transition-colors"
                      placeholder="(555) 000-0000"
                      style={SV}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[13px] text-[rgb(71,79,123)]" style={{ fontWeight: 560, ...SV }}>
                    Business name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="h-[44px] px-[14px] rounded-[10px] border border-[rgb(202,205,221)] bg-[rgb(252,250,250)] text-[rgb(25,30,73)] text-[15px] outline-none focus:border-[rgb(188,38,155)] transition-colors"
                    placeholder="Your salon or spa name"
                    style={SV}
                  />
                </div>
                <div className="grid grid-cols-2 gap-[16px]">
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[13px] text-[rgb(71,79,123)]" style={{ fontWeight: 560, ...SV }}>
                      Business type
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="h-[44px] px-[14px] rounded-[10px] border border-[rgb(202,205,221)] bg-[rgb(252,250,250)] text-[rgb(25,30,73)] text-[15px] outline-none focus:border-[rgb(188,38,155)] transition-colors appearance-none cursor-pointer"
                      style={SV}
                    >
                      <option value="">Select type</option>
                      <option value="hair-salon">Hair Salon</option>
                      <option value="med-spa">Med Spa</option>
                      <option value="day-spa">Day Spa</option>
                      <option value="barbershop">Barbershop</option>
                      <option value="nail-salon">Nail Salon</option>
                      <option value="wellness">Wellness Center</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[13px] text-[rgb(71,79,123)]" style={{ fontWeight: 560, ...SV }}>
                      Team size
                    </label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className="h-[44px] px-[14px] rounded-[10px] border border-[rgb(202,205,221)] bg-[rgb(252,250,250)] text-[rgb(25,30,73)] text-[15px] outline-none focus:border-[rgb(188,38,155)] transition-colors appearance-none cursor-pointer"
                      style={SV}
                    >
                      <option value="">Select size</option>
                      <option value="1">Just me</option>
                      <option value="2-5">2–5</option>
                      <option value="6-15">6–15</option>
                      <option value="16-50">16–50</option>
                      <option value="50+">50+</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="h-[48px] bg-[rgb(188,38,155)] text-white rounded-[3rem] text-[16px] tracking-[-0.096px] hover:opacity-90 transition-opacity cursor-pointer"
                  style={{ fontWeight: 560, color: 'white', ...SV }}
                >
                  Book my demo
                </button>
                <p className="text-[12px] text-[rgb(71,79,123)] text-center leading-[18px]" style={SV}>
                  No commitment required. We'll never share your information.
                </p>
              </form>
            )}
          </div>

          {/* Right side — What you'll see + Testimonials */}
          <div className="flex flex-col gap-[32px]">
            {/* Image */}


            {/* What you'll see */}
            <div className="bg-white rounded-[24px] p-[36px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex-auto flex flex-col">
              <h3
                className="text-[20px] tracking-[-0.4px] leading-[26px] text-[rgb(25,30,73)] mb-[24px]"
                style={{ fontWeight: 620, ...SV }}
              >
                What you'll see in your demo
              </h3>
              <div className="flex flex-col gap-[20px]">
                {benefits.map((b) => (
                  <div key={b.title} className="flex gap-[14px] items-start">
                    <div className="w-[40px] h-[40px] rounded-[10px] bg-[rgb(188,38,155)]/8 flex items-center justify-center shrink-0 mt-[2px]">
                      {b.icon}
                    </div>
                    <div>
                      <h4
                        className="text-[15px] tracking-[-0.2px] leading-[20px] text-[rgb(25,30,73)] mb-[4px]"
                        style={{ fontWeight: 600, ...SV }}
                      >
                        {b.title}
                      </h4>
                      <p className="text-[13px] leading-[19px] text-[rgb(71,79,123)]" style={SV}>
                        {b.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="rounded-[24px] p-[36px] flex-auto flex flex-col" style={{ backgroundColor: '#141E23' }}>
              <p
                className="font-medium uppercase mb-[24px] text-[14px] tracking-[0.42px] leading-[16px]"
                style={{
                  fontFamily: 'tt-commons-mono, monospace',
                  color: '#86B3AD',
                  ...SV,
                }}
              >
                WHAT PEOPLE SAY
              </p>
              <div className="flex flex-col gap-[24px]">
                {testimonials.map((t) => (
                  <div key={t.name} className="flex flex-col gap-[12px]">
                    <p className="text-[15px] leading-[22px] italic" style={{ color: '#ffffff', ...SV }}>
                      "{t.quote}"
                    </p>
                    <div>
                      <p className="text-white text-[14px]" style={{ fontWeight: 600, ...SV }}>
                        {t.name}
                      </p>
                      <p className="text-[13px]" style={{ color: '#86B3AD', ...SV }}>
                        {t.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}