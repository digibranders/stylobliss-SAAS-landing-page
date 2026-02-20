import React from 'react';
import svgPaths from '../imports/svg-i1sco4tsfp';
import { imgImage31 } from '../imports/svg-muw2g';
import imgMakeTheMostOfChairTime from '@/assets/feature-chair-time.png';
import imgFrictionless247Booking from '@/assets/feature-booking-247.png';
import imgFasterBookingMoreRevenue from '@/assets/feature-faster-booking.png';
import imgBuildLoyalClientRelationships from '@/assets/feature-client-relationships.png';
import imgBoostProductSales from '@/assets/feature-product-sales.png';
import imgStayConnectedWithYourCustomers from '@/assets/feature-stay-connected.png';
import imgEffortlessCheckoutExperience from '@/assets/feature-effortless-checkout.png';
import imgHearItFromTopHairSalonProfessionals from '@/assets/testimonials-header.png';
import imgUpgradeWithoutTheStress from '@/assets/upgrade-stress-free.png';
import imgLightPng from '@/assets/marketing-100-logo.png';
import imgM100Left from '@/assets/marketing-100-left.png';
import imgM100Right from '@/assets/marketing-100-right.png';
import imgCtaImageDesktopJpg from '@/assets/cta-desktop.png';
// Feature icons
import imgCalendarSchedulingIcon from '@/assets/icon-calendar.png';
import imgPaymentsPointOfSaleIcon from '@/assets/icon-pos.png';
import imgOnlineBookingIcon from '@/assets/icon-online-booking.png';
import imgExpressBookingIcon from '@/assets/icon-express-booking.png';
import imgMobileAppsIcon from '@/assets/icon-mobile-apps.png';
import imgClientManagementIcon from '@/assets/icon-client-mgmt.png';
import imgCallTextChatIcon from '@/assets/icon-call-chat.png';
import imgMembershipsPackagesIcon from '@/assets/icon-memberships.png';
import imgFormsChartingIcon from '@/assets/icon-forms.png';
import imgGiftCardsIcon from '@/assets/icon-gift-cards.png';
import imgAutomatedFlowsIcon from '@/assets/icon-automated-flows.png';
import imgCampaignsIcon from '@/assets/icon-campaigns.png';
import imgOffersDiscountsIcon from '@/assets/icon-offers.png';
import imgVirtualWaitingRoomIcon from '@/assets/icon-virtual-waiting-room.png';
import imgRetailInventoryIcon from '@/assets/icon-retail.png';
import imgStaffManagementIcon from '@/assets/icon-staff.png';
import imgReportingIcon from '@/assets/icon-reporting.png';
import imgMultiLocationIcon from '@/assets/icon-multi-location.png';
import imgPayrollProcessingIcon from '@/assets/icon-payroll.png';

/* ─────────────────────────────────────────────────────────────
   Arrow SVG for CTA links
   ───────────────────────────────────────────────────────────── */
function ArrowRight() {
  return (
    <svg width="19" height="10" viewBox="0 0 19 10" fill="none" className="shrink-0">
      <path d="M11.5 9L15.5 5L11.5 1" stroke="rgb(188, 38, 155)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.5 5H3.5" stroke="rgb(188, 38, 155)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Alternating Feature Section (image + text, left/right)
   ───────────────────────────────────────────────────────────── */
interface FeatureSectionData {
  eyebrow: string;
  heading: string[];
  description: string[];
  ctaLabel: string;
  image: string;
  imageOnLeft: boolean;
}

const featureSections: FeatureSectionData[] = [
  {
    eyebrow: 'Make the most of chair time',
    heading: ["Take control of your salon's", 'schedule'],
    description: [
      'Optimize your calendar with an intuitive interface that',
      'manages appointments, staff, and resources, and allows',
      'for service customizations and add-ons.',
    ],
    ctaLabel: 'Explore Calendar & Scheduling',
    image: imgMakeTheMostOfChairTime,
    imageOnLeft: true,
  },
  {
    eyebrow: 'Frictionless 24/7 booking',
    heading: ['Book anytime, anywhere'],
    description: [
      'Let your clients book their favorite stylists directly on',
      "your website\u2014they won't be redirected to another",
      'platform or asked to create an account.',
    ],
    ctaLabel: 'Explore Online Booking',
    image: imgFrictionless247Booking,
    imageOnLeft: false,
  },
  {
    eyebrow: 'Faster booking, more revenue',
    heading: ['Book clients in seconds'],
    description: [
      "StyloBliss Express Booking\u2122 lets you text clients a",
      'link to complete details, add a credit card, accept your',
      'policies, and more\u2014so they can book instantly.',
    ],
    ctaLabel: 'Explore Express Booking\u2122',
    image: imgFasterBookingMoreRevenue,
    imageOnLeft: true,
  },
  {
    eyebrow: 'Build loyal client relationships',
    heading: ['Personalized client profiles'],
    description: [
      'Keep detailed records of client preferences, color',
      'formulas, and style history to offer a customized',
      'experience every time.',
    ],
    ctaLabel: 'Explore Client Management',
    image: imgBuildLoyalClientRelationships,
    imageOnLeft: false,
  },
  {
    eyebrow: 'Boost product sales',
    heading: ['Smart inventory', 'management'],
    description: [
      'Never run out of best-sellers. Track inventory in real-time',
      'and easily reorder products to maximize retail sales and',
      'client satisfaction.',
    ],
    ctaLabel: 'Explore retail & inventory',
    image: imgBoostProductSales,
    imageOnLeft: true,
  },
  {
    eyebrow: 'Stay connected with your customers',
    heading: ['Automated marketing that', 'works'],
    description: [
      'Engage clients with targeted campaigns. Set up automated',
      "messages to remind clients to rebook when it's time for",
      'their next hair cut or color.',
    ],
    ctaLabel: 'Explore Automated Flows',
    image: imgStayConnectedWithYourCustomers,
    imageOnLeft: false,
  },
  {
    eyebrow: 'Effortless checkout experience',
    heading: ['Seamless transactions'],
    description: [
      'Let clients pay and tip from their own phones and',
      'securely store cards-on-file\u2014all while routing earnings',
      'directly to the right salon professional.',
    ],
    ctaLabel: 'Explore Payments & POS',
    image: imgEffortlessCheckoutExperience,
    imageOnLeft: true,
  },
];

function FeatureSection({ data }: { data: FeatureSectionData }) {
  const hasMultiLineHeading = data.heading.length > 1;

  const textBlock = (
    <div className="flex flex-col flex-1 max-w-full lg:max-w-[440px] text-center lg:text-left items-center lg:items-start">
      {/* Eyebrow */}
      <p
        className="uppercase mb-[20px] md:mb-[35px] text-[#474F7B] text-[13px] md:text-[14px] tracking-[0.42px] leading-[16px]"
        style={{ fontFamily: 'tt-commons-mono, monospace', fontWeight: 500 }}
      >
        {data.eyebrow}
      </p>
      {/* Heading */}
      <h2
        className="mb-[16px] md:mb-[30px] text-[#191E49] text-[28px] sm:text-[34px] md:text-[40px] tracking-[-1.32px] leading-[1.15]"
        style={{ fontWeight: 700 }}
      >
        {data.heading.join(' ')}
      </h2>
      {/* Description */}
      <p
        className="mb-[24px] md:mb-[35px] text-[#191E49] text-[16px] md:text-[18px] leading-[26px] md:leading-[30px]"
        style={{ fontWeight: 500 }}
      >
        {data.description.join(' ')}
      </p>
      {/* CTA */}
      <a
        href="#"
        className="inline-flex items-center gap-[5px] uppercase text-[#BC269B] text-[13px] md:text-[14px] tracking-[0.42px] leading-[16px]"
        style={{
          fontFamily: 'tt-commons-mono, monospace',
          fontWeight: 500,
          textDecoration: 'none',
        }}
      >
        {data.ctaLabel}
        <ArrowRight />
      </a>
    </div>
  );

  const imageBlock = (
    <div className="flex-1 flex items-center justify-center w-full">
      <div className="w-full max-w-[532px] rounded-[20px] md:rounded-[30px] overflow-hidden">
        <img
          src={data.image}
          alt={data.heading.join(' ')}
          className="w-full h-auto block"
        />
      </div>
    </div>
  );

  return (
    <section className="relative w-full py-[40px] md:py-[60px] px-4 md:px-[70px]">
      <div className="mx-auto flex flex-col lg:flex-row items-center gap-[24px] md:gap-[30px] max-w-[1160px]">
        {/* On mobile, always show image first, then text */}
        <div className="lg:hidden flex flex-col items-center gap-[24px] w-full">
          {imageBlock}
          {textBlock}
        </div>
        {/* On desktop, respect imageOnLeft */}
        <div className="hidden lg:contents">
          {data.imageOnLeft ? (
            <>
              {imageBlock}
              {textBlock}
            </>
          ) : (
            <>
              {textBlock}
              {imageBlock}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Testimonials Section - "Don't just take our word for it"
   ───────────────────────────────────────────────────────────── */
function TestimonialsSection() {
  return (
    <section className="relative w-full py-[40px] md:py-[80px] px-4 md:px-[70px]">
      <div className="mx-auto flex flex-col items-center gap-[40px] md:gap-[100px] max-w-[1160px]">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-[700px]">
          <p
            className="uppercase mb-[20px] md:mb-[35px] text-[#474F7B] text-[13px] md:text-[14px] tracking-[0.42px] leading-[16px]"
            style={{ fontFamily: 'tt-commons-mono, monospace', fontWeight: 500 }}
          >
            Hear it from top hair salon professionals
          </p>
          <h2
            className="mb-[16px] md:mb-[30px] text-[#191E49] text-[28px] sm:text-[36px] md:text-[44px] tracking-[-1.2px] leading-[1.15]"
            style={{ fontWeight: 700 }}
          >
            Don't just take our word for it
          </h2>
          <p
            className="text-[#191E49] text-[15px] md:text-[18px] leading-[26px] md:leading-[30px]"
            style={{ fontWeight: 500 }}
          >
            Rated #1 for User Satisfaction, StyloBliss offers an intuitive interface with smart automations and five-star, US-based support—just a click away.
          </p>
        </div>
        {/* Testimonials image */}
        <div className="w-full max-w-[912px]">
          <img
            src={imgHearItFromTopHairSalonProfessionals}
            alt="Hair salon professionals testimonials"
            className="w-full h-auto block"
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Migration Section - "Switch to StyloBliss with zero downtime"
   ───────────────────────────────────────────────────────────── */
function MigrationSection() {
  return (
    <section className="relative w-full py-[40px] md:py-[80px] px-4 md:px-[70px]">
      <div className="mx-auto flex flex-col items-center gap-[40px] md:gap-[100px] max-w-[1160px]">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-[700px]">
          <p
            className="uppercase mb-[20px] md:mb-[35px] text-[#474F7B] text-[13px] md:text-[14px] tracking-[0.42px] leading-[16px]"
            style={{ fontFamily: 'tt-commons-mono, monospace', fontWeight: 500 }}
          >
            Upgrade without the stress
          </p>
          <h2
            className="mb-[16px] md:mb-[30px] text-[#191E49] text-[28px] sm:text-[36px] md:text-[44px] tracking-[-1.2px] leading-[1.15]"
            style={{ fontWeight: 700 }}
          >
            Switch to StyloBliss with zero downtime
          </h2>
          <p
            className="text-[#191E49] text-[15px] md:text-[18px] leading-[26px] md:leading-[30px]"
            style={{ fontWeight: 500 }}
          >
            Our team handles the entire migration process, including client data, memberships, and inventory records—so you can transition without losing critical business information.
          </p>
        </div>
        {/* Migration image */}
        <div className="w-full max-w-[912px]">
          <img
            src={imgUpgradeWithoutTheStress}
            alt="Switch to StyloBliss"
            className="w-full h-auto block"
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Marketing 100 Section - "Salon Tips Worth a Double Take"
   ───────────────────────────────────────────────────────────── */
function Marketing100Section() {
  return (
    <section className="relative w-full py-[40px] md:py-[80px] px-4 md:px-[70px]">
      <div
        className="mx-auto flex flex-col items-center relative max-w-[1160px] min-h-[350px] md:min-h-[400px] overflow-hidden pt-[40px] md:pt-[70px] rounded-[20px] md:rounded-[30px]"
        style={{
          backgroundColor: 'rgba(217, 162, 130, 0.15)',
        }}
      >
        {/* Text + form */}
        <div className="flex flex-col items-center text-center max-w-[640px] relative z-[2] px-4 md:px-[30px]">
          <h3
            className="mb-[16px] md:mb-[20px] text-[#191E49] text-[26px] sm:text-[32px] md:text-[38px] tracking-[-1.32px] leading-[1.2]"
            style={{ fontWeight: 700 }}
          >
            Salon Tips Worth a Double Take
          </h3>
          <p
            className="mb-[24px] md:mb-[30px] text-[#191E49] text-[14px] md:text-[16px] leading-[24px] md:leading-[28px]"
            style={{ fontWeight: 500 }}
          >
            Want 100 quick-hit, tactical tips to grow your salon? Marketing 100 is here—100 bite-sized videos straight to your inbox, one day at a time.
          </p>
        </div>
        {/* Email form */}
        <div className="flex flex-col items-center w-full max-w-[360px] px-4 md:px-0 relative z-[2]">
          <div className="w-full mb-[15px]">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full h-[48px] rounded-[25px] px-[25px] py-[14px] text-[14px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.05)] outline-none border-none"
              style={{ fontWeight: 500, color: 'rgb(120, 127, 167)' }}
            />
          </div>
          <button
            className="w-full h-[48px] rounded-[56px] text-[15px] tracking-[-0.096px] cursor-pointer border-none"
            style={{
              background: 'rgb(188, 38, 155)',
              color: 'rgb(252, 250, 250)',
              fontWeight: 600,
            }}
          >
            Sign up
          </button>
        </div>
        {/* Logo */}
        <div className="py-[30px] md:py-[45px] relative z-[1]">
          <img src={imgLightPng} alt="Marketing 100" className="w-[120px] md:w-[160px] h-auto" />
        </div>
        {/* Side images — hidden on small mobile to avoid overlap */}
        <div className="absolute bottom-0 left-0 right-0 hidden sm:flex items-end justify-between pointer-events-none">
          <div className="overflow-hidden">
            <img
              src={imgM100Left}
              alt=""
              className="w-[180px] md:w-[320px] h-auto object-cover"
            />
          </div>
          <div className="overflow-hidden">
            <img
              src={imgM100Right}
              alt=""
              className="w-[180px] md:w-[320px] h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Explore Features Section
   ───────────────────────────────────────────────────────────── */
interface FeatureCategory {
  label: string;
  items: { icon: string; name: string }[];
}

const featureCategories: FeatureCategory[] = [
  {
    label: 'Scheduling & Payments',
    items: [
      { icon: imgCalendarSchedulingIcon, name: 'Calendar & Scheduling' },
      { icon: imgPaymentsPointOfSaleIcon, name: 'Payments & Point-of-Sale' },
      { icon: imgOnlineBookingIcon, name: 'Online Booking' },
      { icon: imgExpressBookingIcon, name: 'Express Booking\u2122' },
      { icon: imgMobileAppsIcon, name: 'Mobile Apps' },
    ],
  },
  {
    label: 'Client Relationships',
    items: [
      { icon: imgClientManagementIcon, name: 'Client Management' },
      { icon: imgCallTextChatIcon, name: 'Call, Text, & Chat' },
      { icon: imgMembershipsPackagesIcon, name: 'Memberships & Packages' },
      { icon: imgFormsChartingIcon, name: 'Forms & Charting' },
      { icon: imgGiftCardsIcon, name: 'Gift Cards' },
    ],
  },
  {
    label: 'Marketing & Automation',
    items: [
      { icon: imgAutomatedFlowsIcon, name: 'Automated Flows' },
      { icon: imgCampaignsIcon, name: 'Campaigns' },
      { icon: imgOffersDiscountsIcon, name: 'Offers & Discounts' },
      { icon: imgVirtualWaitingRoomIcon, name: 'Virtual Waiting Room' },
    ],
  },
  {
    label: 'Management',
    items: [
      { icon: imgRetailInventoryIcon, name: 'Retail & Inventory' },
      { icon: imgStaffManagementIcon, name: 'Staff Management' },
      { icon: imgReportingIcon, name: 'Reporting' },
      { icon: imgMultiLocationIcon, name: 'Multi-Location' },
      { icon: imgPayrollProcessingIcon, name: 'Payroll Processing' },
    ],
  },
];

function ExploreFeaturesSection() {
  return (
    <section className="relative w-full py-[40px] md:py-[80px] px-4 md:px-[70px]">
      <div className="mx-auto flex flex-col gap-[30px] md:gap-[50px] max-w-[1160px]">
        {/* Header */}
        <h3
          className="text-center text-[#191E49] text-[26px] sm:text-[30px] md:text-[33px] tracking-[-1px] leading-[1.2]"
          style={{ fontWeight: 700 }}
        >
          Explore our features
        </h3>
        {/* Feature columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px] md:gap-[30px] items-start justify-center">
          {featureCategories.map((cat) => (
            <div key={cat.label} className="flex-1 flex flex-col">
              {/* Category label */}
              <div className="pb-[18px] pl-[20px]">
                <p
                  className="uppercase text-[#474F7B] text-[12px] tracking-[0.39px] leading-[15px]"
                  style={{ fontFamily: 'tt-commons-mono, monospace', fontWeight: 500 }}
                >
                  {cat.label}
                </p>
              </div>
              {/* Feature items */}
              <div className="flex flex-col gap-[15px]">
                {cat.items.map((item) => (
                  <a
                    key={item.name}
                    href="#"
                    className="flex items-center gap-[10px] h-[48px] px-[17px] rounded-[10px] shadow-[0px_1px_30px_0px_rgba(0,0,0,0.05)]"
                    style={{
                      background: 'rgba(255,255,255,0.65)',
                      textDecoration: 'none',
                    }}
                  >
                    <div className="w-[26px] h-[26px] relative shrink-0">
                      <img
                        src={item.icon}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span
                      className="text-[#191E49] text-[15px] tracking-[-0.18px] leading-[22px]"
                      style={{ fontWeight: 600 }}
                    >
                      {item.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FAQ Section
   ───────────────────────────────────────────────────────────── */
const faqItems = [
  'How can my clients book appointments in StyloBliss?',
  'Can I set variable pricing for different stylists or service levels?',
  'Can StyloBliss manage walk-in clients and waitlists for hair salons?',
  'Does StyloBliss support booth rental hair salons?',
  'What customer support does StyloBliss offer?',
  "How do I switch to StyloBliss's hair salon software?",
  'Where can I find StyloBliss reviews?',
];

function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section className="relative w-full py-[30px] md:py-[50px] px-4 md:px-[70px]">
      <div className="mx-auto flex flex-col items-center max-w-[760px] pt-[30px] md:pt-[50px] pb-[10px]">
        {/* Header */}
        <h3
          className="text-center text-[#191E49] text-[26px] sm:text-[30px] md:text-[33px] tracking-[-1px] leading-[1.2] mb-[24px] md:mb-[40px]"
          style={{ fontWeight: 700 }}
        >
          Frequently Asked Questions
        </h3>
        {/* Items */}
        <div className="w-full">
          {faqItems.map((question, idx) => (
            <div
              key={idx}
              className="border-b border-[rgb(224,226,237)] first:border-t"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between py-[18px] md:py-[24px] px-[6px] md:px-[10px] cursor-pointer bg-transparent border-none text-left"
              >
                <span
                  className="text-[rgb(25,_30,_73)] text-[16px] md:text-[18px] tracking-[-0.4px] leading-[24px] md:leading-[30px]"
                  style={{ fontWeight: 700 }}
                >
                  {question}
                </span>
                <div className="shrink-0 ml-[12px] md:ml-[20px] p-[8px] md:p-[10px]">
                  <svg
                    width="6"
                    height="10"
                    viewBox="0 0 6 10"
                    fill="none"
                    className={`transition-transform duration-200 ${openIndex === idx ? 'rotate-90' : '-rotate-90'}`}
                  >
                    <path
                      d="M5 1L1 5L5 9"
                      stroke="rgb(71, 79, 123)"
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
                    className="text-[#191E49] text-[16px] leading-[26px]"
                    style={{ fontWeight: 450 }}
                  >
                    Contact us or check our help center for detailed information about this topic.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CTA Section - "Find out if StyloBliss is right for you"
   ───────────────────────────────────────────────────────────── */
function CtaSection() {
  return (
    <section className="relative w-full py-[40px] md:py-[60px] px-4 md:px-[70px]">
      <div
        className="mx-auto flex flex-col md:flex-row items-center gap-[24px] md:gap-[38px] max-w-[1102px] rounded-[20px] md:rounded-[30px] shadow-[0px_10px_30px_0px_rgba(0,0,0,0.09)] px-5 md:pl-[76px] md:pr-[19px] py-[30px] md:py-[19px] overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.65)' }}
      >
        {/* Left: text + buttons */}
        <div className="flex flex-col gap-[20px] md:gap-[28px] items-center md:items-start justify-center max-w-[399px] self-stretch text-center md:text-left">
          <h2
            className="text-[#191E49] text-[28px] sm:text-[32px] md:text-[37px] tracking-[-1.25px] leading-[1.2]"
            style={{ fontWeight: 700 }}
          >
            Find out if StyloBliss is right for you
          </h2>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-[14px] md:gap-[19px] items-center md:items-start w-full sm:w-auto">
            <a
              href="#"
              className="flex items-center justify-center h-[48px] md:h-[53px] px-[28px] md:px-[34px] rounded-[56px] text-[#BC269B] text-[15px] md:text-[16px] tracking-[-0.096px] leading-[17px] w-full sm:w-auto"
              style={{
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: 'inset 0 0 0 2px rgb(188, 38, 155)',
              }}
            >
              Book a live demo
            </a>
            <a
              href="#"
              className="flex items-center justify-center h-[48px] md:h-[53px] px-[28px] md:px-[34px] rounded-[56px] text-[#FCFAFA] text-[14px] md:text-[15px] tracking-[-0.096px] leading-[17px] w-full sm:w-auto"
              style={{
                fontWeight: 600,
                background: 'rgb(188, 38, 155)',
                textDecoration: 'none',
              }}
            >
              Try it now
            </a>
          </div>
          {/* Watch video tour */}
          <button
            className="inline-flex items-center gap-[9.5px] justify-center py-[5px] bg-transparent border-none cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 19.95 19.95" fill="none">
              <path
                d={svgPaths.p8672180}
                stroke="rgb(188, 38, 155)"
                strokeWidth="1.73"
              />
              <path
                d={svgPaths.p87c9800}
                fill="rgb(188, 38, 155)"
                stroke="rgb(188, 38, 155)"
                strokeWidth="0.87"
              />
            </svg>
            <span
              className="uppercase text-[#BC269B] text-[13px] tracking-[0.4px] leading-[19px]"
              style={{ fontFamily: 'tt-commons-mono, monospace', fontWeight: 400 }}
            >
              Watch a video tour
            </span>
          </button>
        </div>
        {/* Right: masked image — hidden on mobile, visible on md+ */}
        <div className="hidden md:flex flex-1 items-start justify-end self-stretch">
          <div
            className="w-[513px] h-[342px] relative rounded-[20px] overflow-hidden"
            style={{
              maskImage: `url('${imgImage31}')`,
              WebkitMaskImage: `url('${imgImage31}')`,
              maskSize: '513px 342px',
              WebkitMaskSize: '513px 342px',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
            }}
          >
            <img
              src={imgCtaImageDesktopJpg}
              alt="StyloBliss CTA"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* Mobile: simple rounded image */}
        <div className="md:hidden w-full rounded-[16px] overflow-hidden">
          <img
            src={imgCtaImageDesktopJpg}
            alt="StyloBliss CTA"
            className="w-full h-auto block"
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Export
   ───────────────────────────────────────────────────────────── */
export function SalonFeatureShowcases() {
  return (
    <div className="relative flex flex-col gap-[20px] md:gap-[40px] w-full">
      {/* ── Home-page-style colorful gradient band behind mid-section ── */}
      <div
        className="pointer-events-none absolute w-screen left-[50%] -translate-x-[50%]"
        style={{
          top: '1200px',
          height: '1200px',
          zIndex: 0,
          backgroundColor: 'rgb(252, 250, 250)',
        }}
      />
      {/* ── Bottom colorful gradient bleed behind CTA ── */}
      <div
        className="pointer-events-none absolute w-screen left-[50%] -translate-x-[50%]"
        style={{
          bottom: 0,
          height: '600px',
          zIndex: 0,
          backgroundColor: 'rgb(252, 250, 250)',
        }}
      />
      {/* 7 alternating feature sections */}
      {featureSections.map((section, idx) => (
        <FeatureSection key={idx} data={section} />
      ))}
      {/* Testimonials */}
      <TestimonialsSection />
      {/* Migration */}
      <MigrationSection />
      {/* Marketing 100 */}
      <Marketing100Section />
      {/* Explore Features */}
      <ExploreFeaturesSection />
      {/* FAQ */}
      <FAQSection />
      {/* CTA */}
      <CtaSection />
    </div>
  );
}