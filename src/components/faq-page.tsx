import React from 'react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────────────────────
   FAQ Data — same as salon-feature-showcases.tsx FAQSection
   ───────────────────────────────────────────────────────────── */
const faqItems = [
  {
    question: 'How can my clients book appointments in StyloBliss?',
    answer:
      'Clients can book appointments through your custom online booking page, which can be embedded directly on your website. They can browse services, choose their preferred stylist, select a time, and confirm their booking—all without being redirected to another platform or needing to create an account.',
  },
  {
    question: 'Can I set variable pricing for different stylists or service levels?',
    answer:
      'Absolutely. StyloBliss allows you to set different prices based on the service provider, experience level, or any custom criteria you define. This makes it easy to offer tiered pricing for junior, senior, and master-level professionals.',
  },
  {
    question: 'Can StyloBliss manage walk-in clients and waitlists for hair salons?',
    answer:
      'Yes, StyloBliss includes a Virtual Waiting Room feature that lets you manage walk-in clients and waitlists seamlessly. Clients can check in digitally, and your staff can manage the queue in real time.',
  },
  {
    question: 'Does StyloBliss support booth rental hair salons?',
    answer:
      'Yes, StyloBliss fully supports booth rental setups. Each professional can have their own independent schedule, pricing, client list, and payment processing, while the salon owner maintains oversight of the overall business.',
  },
  {
    question: 'What customer support does StyloBliss offer?',
    answer:
      'StyloBliss provides five-star, US-based customer support that is just a click away. Our support team is available via call, text, and chat to help you with any questions or issues you may encounter.',
  },
  {
    question: "How do I switch to StyloBliss's hair salon software?",
    answer:
      'Our team handles the entire migration process, including client data, memberships, and inventory records—so you can transition without losing critical business information. We ensure zero downtime during the switch.',
  },
  {
    question: 'Where can I find StyloBliss reviews?',
    answer:
      'You can find StyloBliss reviews on Capterra, G2, and other popular software review platforms. StyloBliss is consistently rated #1 for User Satisfaction in the salon and spa software category.',
  },
];

/* ─────────────────────────────────────────────────────────────
   FAQ Page Component
   ───────────────────────────────────────────────────────────── */
export function FAQPage() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div style={{ fontVariationSettings: '"slnt" 0', background: '#ffffff' }}>
      {/* FAQ Accordion — matches salon-feature-showcases FAQSection */}
      <section className="relative z-[2] w-full pt-[120px] pb-[80px] md:pt-[120px] md:pb-[120px] px-4 md:px-[70px]">
        <div
          className="relative z-[1] mx-auto flex flex-col items-center max-w-[760px] py-[40px] px-[16px] md:py-[60px] md:px-[70px] rounded-[30px]"
        >
          {/* Header */}
          <h3
            className="text-center text-[rgb(22,_35,_42)] text-[33px] tracking-[-1px] leading-[40px] mb-[40px]"
            style={{ fontWeight: 700 }}
          >
            Frequently Asked Questions
          </h3>
          {/* Items */}
          <div className="w-full">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="border-b border-[rgb(224,226,237)] first:border-t"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between py-[24px] px-[10px] cursor-pointer bg-transparent border-none text-left"
                >
                  <span
                    className="text-[rgb(22,_35,_42)] text-[18px] tracking-[-0.4px] leading-[30px]"
                    style={{ fontWeight: 700 }}
                  >
                    {item.question}
                  </span>
                  <div className="shrink-0 ml-[20px] p-[10px]">
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      className={`transition-transform duration-200 ${openIndex === idx ? 'rotate-90' : '-rotate-90'}`}
                    >
                      <path
                        d="M5 1L1 5L5 9"
                        stroke="rgb(7, 80, 86)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
                {openIndex === idx && (
                  <div className="px-[10px] pb-[24px]">
                    <p
                      className="text-[rgb(22,_35,_42)] text-[16px] leading-[26px]"
                      style={{ fontWeight: 450 }}
                    >
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions? CTA */}
      <section className="relative w-full pb-[60px] md:pb-[100px] px-4 md:px-[70px]">
        <div
          className="relative z-[1] mx-auto max-w-[760px] rounded-[30px] py-[40px] px-[16px] md:py-[60px] md:px-[70px] flex flex-col items-center text-center"
          style={{
            backgroundColor: 'rgba(217, 162, 130, 0.15)',
          }}
        >
          <h3
            className="mb-[16px] text-[rgb(22,_35,_42)] text-[32px] tracking-[-1px] leading-[40px]"
            style={{ fontWeight: 700 }}
          >
            Still have questions?
          </h3>
          <p
            className="mb-[30px] text-[rgb(22,_35,_42)] text-[17px] leading-[28px] max-w-[440px]"
            style={{ fontWeight: 450 }}
          >
            Our team is here to help. Book a live demo to get personalized answers or start your free trial today.
          </p>
          <div className="flex gap-[16px] items-center">
            <Link
              to="/demo"
              className="flex items-center justify-center h-[50px] px-[30px] rounded-[56px] text-[rgb(255,_91,_4)] text-[15px] tracking-[-0.096px]"
              style={{
                fontWeight: 580,
                textDecoration: 'none',
                boxShadow: 'inset 0 0 0 2px rgb(255, 91, 4)',
              }}
            >
              Book a live demo
            </Link>
            <Link
              to="/trial"
              className="flex items-center justify-center h-[50px] px-[30px] rounded-[56px] text-[rgb(228,_238,_240)] text-[15px] tracking-[-0.096px]"
              style={{
                fontWeight: 580,
                background: 'rgb(255, 91, 4)',
                textDecoration: 'none',
              }}
            >
              Try it now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}