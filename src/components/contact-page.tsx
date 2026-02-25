import React from 'react';

const SV = { fontVariationSettings: '"slnt" 0' };

const contactMethods = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgb(188,38,155)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: 'Call Us',
    description: 'Speak directly with our team during business hours.',
    detail: '+1 (800) 555-STYLE',
    action: 'tel:+18005557895',
    actionLabel: 'Call now',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgb(188,38,155)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: 'Email Us',
    description: 'Send us a message and we\'ll respond within 24 hours.',
    detail: 'hello@stylobliss.com',
    action: 'mailto:hello@stylobliss.com',
    actionLabel: 'Send email',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgb(188,38,155)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Live Chat',
    description: 'Chat with a StyloBliss specialist in real time.',
    detail: 'Available Mon–Fri, 8am–8pm ET',
    action: '#',
    actionLabel: 'Start chat',
  },
];

const offices = [
  {
    city: 'New York',
    address: '350 Fifth Avenue, Suite 4800',
    region: 'New York, NY 10118',
  },
  {
    city: 'Los Angeles',
    address: '1999 Avenue of the Stars, Suite 1100',
    region: 'Los Angeles, CA 90067',
  },
  {
    city: 'Austin',
    address: '300 W 6th Street, Suite 1200',
    region: 'Austin, TX 78701',
  },
];

export function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ ...SV }}>
      {/* Hero */}
      <section className="relative w-full pt-[120px] md:pt-[160px] pb-[60px] md:pb-[80px] px-4 md:px-[70px]">
        {/* Background gradient */}
        <div
          className="pointer-events-none absolute w-screen left-[50%] -translate-x-[50%]"
          style={{
            top: 0,
            height: '700px',
            zIndex: 0,
            background: 'linear-gradient(180deg, #f6f1fe 0%, #f6f1fe 80%, transparent 100%)',
          }}
        />
        <div className="relative z-[1] max-w-[1160px] mx-auto text-center">
          <p
            className="font-medium uppercase mb-[20px] text-[rgb(71,79,123)] text-[14px] tracking-[0.42px] leading-[16px]"
            style={{ fontFamily: 'tt-commons-mono, monospace', ...SV }}
          >
            CONTACT US
          </p>
          <h1
            className="text-[48px] tracking-[-1.4px] leading-[54px] text-[rgb(25,30,73)] mb-[20px]"
            style={{ fontWeight: 620, ...SV }}
          >
            We'd love to hear from you
          </h1>
          <p
            className="font-medium text-[20px] leading-[30px] text-[rgb(71,79,123)] max-w-[560px] mx-auto"
            style={SV}
          >
            Whether you have a question, need support, or want to explore how StyloBliss can help your business — reach out anytime.
          </p>
        </div>
      </section>

      {/* Contact Methods Cards */}
      <section className="relative z-[1] max-w-[1160px] mx-auto px-4 md:px-[70px] pb-[32px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] md:gap-[32px]">
          {contactMethods.map((method) => (
            <div
              key={method.title}
              className="bg-white rounded-[24px] p-[36px] flex flex-col gap-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-shadow duration-300"
            >
              {method.icon}
              <h3
                className="text-[20px] tracking-[-0.4px] leading-[26px] text-[rgb(25,30,73)]"
                style={{ fontWeight: 620, ...SV }}
              >
                {method.title}
              </h3>
              <p className="text-[15px] leading-[22px] text-[rgb(71,79,123)]" style={SV}>
                {method.description}
              </p>
              <p
                className="text-[14px] leading-[20px] text-[rgb(25,30,73)]"
                style={{ fontWeight: 560, ...SV }}
              >
                {method.detail}
              </p>
              <a
                href={method.action}
                className="mt-auto inline-flex items-center gap-[6px] text-[rgb(188,38,155)] text-[15px] hover:underline"
                style={{ fontWeight: 560, ...SV }}
              >
                {method.actionLabel}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form + Image */}
      <section className="relative z-[1] max-w-[1160px] mx-auto px-4 md:px-[70px] pb-[60px] md:pb-[100px]">
        <div className="grid gap-[32px] grid-cols-1 md:grid-cols-2">
          {/* Form */}
          <div className="bg-white rounded-[24px] p-[48px] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            <h2
              className="text-[28px] tracking-[-0.8px] leading-[34px] text-[rgb(25,30,73)] mb-[8px]"
              style={{ fontWeight: 620, ...SV }}
            >
              Send us a message
            </h2>
            <p className="text-[15px] leading-[22px] text-[rgb(71,79,123)] mb-[32px]" style={SV}>
              Fill out the form below and our team will get back to you shortly.
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
                  Message sent!
                </h3>
                <p className="text-[15px] text-[rgb(71,79,123)] text-center" style={SV}>
                  Thank you for reaching out. We'll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
                <div className="grid grid-cols-2 gap-[16px]">
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[13px] text-[rgb(71,79,123)]" style={{ fontWeight: 560, ...SV }}>
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-[44px] px-[14px] rounded-[10px] border border-[rgb(202,205,221)] bg-[rgb(252,250,250)] text-[rgb(25,30,73)] text-[15px] outline-none focus:border-[rgb(188,38,155)] transition-colors"
                      placeholder="Your name"
                      style={SV}
                    />
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[13px] text-[rgb(71,79,123)]" style={{ fontWeight: 560, ...SV }}>
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-[44px] px-[14px] rounded-[10px] border border-[rgb(202,205,221)] bg-[rgb(252,250,250)] text-[rgb(25,30,73)] text-[15px] outline-none focus:border-[rgb(188,38,155)] transition-colors"
                      placeholder="you@example.com"
                      style={SV}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-[16px]">
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[13px] text-[rgb(71,79,123)]" style={{ fontWeight: 560, ...SV }}>
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="h-[44px] px-[14px] rounded-[10px] border border-[rgb(202,205,221)] bg-[rgb(252,250,250)] text-[rgb(25,30,73)] text-[15px] outline-none focus:border-[rgb(188,38,155)] transition-colors"
                      placeholder="Your business"
                      style={SV}
                    />
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[13px] text-[rgb(71,79,123)]" style={{ fontWeight: 560, ...SV }}>
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="h-[44px] px-[14px] rounded-[10px] border border-[rgb(202,205,221)] bg-[rgb(252,250,250)] text-[rgb(25,30,73)] text-[15px] outline-none focus:border-[rgb(188,38,155)] transition-colors"
                      placeholder="How can we help?"
                      style={SV}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[13px] text-[rgb(71,79,123)]" style={{ fontWeight: 560, ...SV }}>
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="px-[14px] py-[12px] rounded-[10px] border border-[rgb(202,205,221)] bg-[rgb(252,250,250)] text-[rgb(25,30,73)] text-[15px] outline-none focus:border-[rgb(188,38,155)] transition-colors resize-none"
                    placeholder="Tell us more..."
                    style={SV}
                  />
                </div>
                <button
                  type="submit"
                  className="h-[48px] bg-[rgb(188,38,155)] text-[rgb(252,250,250)] rounded-[3rem] text-[16px] tracking-[-0.096px] hover:opacity-90 transition-opacity cursor-pointer"
                  style={{ fontWeight: 560, color: 'white', ...SV }}
                >
                  Send message
                </button>
              </form>
            )}
          </div>

          {/* Image + Offices */}
          <div className="flex flex-col gap-[32px]">
            <div className="rounded-[24px] overflow-hidden h-[280px]">
              <img
                src="https://images.unsplash.com/photo-1553775282-20af80779df7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHN1cHBvcnQlMjBjb250YWN0JTIwY2VudGVyJTIwaGVhZHNldHxlbnwxfHx8fDE3NzA4ODgzNTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="StyloBliss support team"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-[24px] p-[36px]" style={{ backgroundColor: '#141E23' }}>
              <p
                className="font-medium uppercase mb-[24px] text-[14px] tracking-[0.42px] leading-[16px]"
                style={{
                  fontFamily: 'tt-commons-mono, monospace',
                  color: '#86B3AD',
                  ...SV,
                }}
              >
                OUR OFFICES
              </p>
              <div className="grid grid-cols-1 gap-[24px]">
                {offices.map((office) => (
                  <div key={office.city} className="flex flex-col gap-[4px]">
                    <h4
                      className="text-white text-[16px] tracking-[-0.2px] leading-[22px]"
                      style={{ fontWeight: 620, ...SV }}
                    >
                      {office.city}
                    </h4>
                    <p className="text-[14px] leading-[20px]" style={{ color: '#86B3AD', ...SV }}>
                      {office.address}
                    </p>
                    <p className="text-[14px] leading-[20px]" style={{ color: '#86B3AD', ...SV }}>
                      {office.region}
                    </p>
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