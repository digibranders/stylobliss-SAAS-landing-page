import React from 'react';
import { Link } from 'react-router-dom';
import iconCalendar from '@/assets/icon-calendar.png';
import iconPos from '@/assets/icon-pos.png';
import iconOnlineBooking from '@/assets/icon-online-booking.png';
import iconExpressBooking from '@/assets/icon-express-booking.png';
import iconMobileApps from '@/assets/icon-mobile-apps.png';
import iconClientMgmt from '@/assets/icon-client-mgmt.png';
import iconCallChat from '@/assets/icon-call-chat.png';
import iconMemberships from '@/assets/icon-memberships.png';
import iconForms from '@/assets/icon-forms.png';
import iconGiftCards from '@/assets/icon-gift-cards.png';
import iconAutomatedFlows from '@/assets/icon-automated-flows.png';
import iconCampaigns from '@/assets/icon-campaigns.png';
import iconOffers from '@/assets/icon-offers.png';
import iconVirtualWaitingRoom from '@/assets/icon-virtual-waiting-room.png';
import iconStaff from '@/assets/icon-staff.png';
import iconReporting from '@/assets/icon-reporting.png';
import iconMultiLocation from '@/assets/icon-multi-location.png';
import iconPayroll from '@/assets/icon-payroll.png';

const SV = { "fontVariationSettings": "\"slnt\" 0" };

const BUSINESS_TYPES = [
  { name: 'Hair Salons', href: '/salons' },
  { name: 'Med Spas', href: '/salons' },
  { name: 'IV Therapy', href: '/salons' },
  { name: 'Skincare Studios', href: '/salons' },
  { name: 'Beauty Studios', href: '/salons' },
  { name: 'Massage Studios', href: '/salons' },
  { name: 'Hair Removal', href: '/salons' },
  { name: 'Tattoo & Piercing', href: '/salons' },
  { name: 'Nail Salons', href: '/salons' },
  { name: 'Barbershops', href: '/salons' },
  { name: 'Wellness Centers', href: '/salons' },
  { name: 'Spas', href: '/salons' },
];

const ICON_BG = "https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fb0d0dfccdd8a513dd04d79aa73406d0e55084b7d.svg%2Bxml?generation=1770623289331516&alt=media";

const FEATURE_GROUPS = [
  {
    label: 'Scheduling & Payments',
    items: [
      { name: 'Calendar & Scheduling', href: '/why', icon: iconCalendar },
      { name: 'Payments & Point-of-Sale', href: '/why', icon: iconPos },
      { name: 'Online Booking', href: '/why', icon: iconOnlineBooking },
      { name: 'Express Booking\u2122', href: '/why', icon: iconExpressBooking },
      { name: 'Mobile Apps', href: '/why', icon: iconMobileApps },
    ],
  },
  {
    label: 'Client Relationships',
    items: [
      { name: 'Client Management', href: '/why', icon: iconClientMgmt },
      { name: 'Call, Text, & Chat', href: '/why', icon: iconCallChat },
      { name: 'Memberships & Packages', href: '/why', icon: iconMemberships },
      { name: 'Forms & Charting', href: '/why', icon: iconForms },
      { name: 'Gift Cards', href: '/why', icon: iconGiftCards },
    ],
  },
  {
    label: 'Marketing & Growth',
    items: [
      { name: 'Automated Flows', href: '/why', icon: iconAutomatedFlows },
      { name: 'Campaigns', href: '/why', icon: iconCampaigns },
      { name: 'Offers & Discounts', href: '/why', icon: iconOffers },
      { name: 'Virtual Waiting Room', href: '/why', icon: iconVirtualWaitingRoom },
      { name: 'Integrations', href: '/why', icon: iconGiftCards },
    ],
  },
  {
    label: 'Business Operations',
    items: [
      { name: 'Staff Management', href: '/why', icon: iconStaff },
      { name: 'Reporting', href: '/why', icon: iconReporting },
      { name: 'Multi-Location', href: '/why', icon: iconMultiLocation },
      { name: 'Payroll Processing', href: '/why', icon: iconPayroll },
    ],
  },
];

function FeatureLink({ name, href, icon }: { name: string; href: string; icon: string }) {
  return (
    <Link
      to={href}
      className="group items-center flex w-full rounded-[0.75rem] transition-all duration-200"
      style={{
        ...SV,
        minHeight: '48px',
        paddingLeft: '20px',
        paddingRight: '18px',
        paddingTop: '10px',
        paddingBottom: '10px',
        gap: '12px',
        backgroundColor: '#ffffff',
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.10)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.12)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 6px rgba(0,0,0,0.05)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.07)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      <div className="overflow-hidden relative align-top w-[26px] h-[26px] min-w-[26px]" style={SV}>
        <div className="max-w-[104px]" style={SV}>
          <img role="presentation" src={ICON_BG} className="block size-full max-w-full object-cover overflow-clip left-0 top-0 right-0 bottom-0" style={SV} />
        </div>
        <picture className="inline" style={SV}>
          <source className="inline" style={SV}></source>
          <img alt={`${name} icon`} src={icon} className="block size-full object-cover overflow-clip absolute left-0 top-0 right-0 bottom-0 aspect-[auto_104_/_104]" style={SV} />
        </picture>
      </div>
      <div className="items-center flex grow" style={SV}>
        <h4 className="text-[15px] md:text-[17px] tracking-[-0.18px] leading-[1.3] text-[rgb(25,30,73)]" style={{ ...SV, fontWeight: 540 }}>{name}</h4>
      </div>
    </Link>
  );
}

export function ExploreAndFeaturesSection() {
  return (
    <section className="grid mx-auto relative w-full gap-[50px] md:gap-[80px] max-w-[1160px] z-[3] px-4 md:px-0" style={SV}>

      <div style={SV}>
        <h4 className="text-center mb-[30px] md:mb-[50px] text-[28px] md:text-[36px] tracking-[-1px] leading-[1.15] px-4 md:px-[30px]" style={{ ...SV, fontWeight: 620 }}>
          ...or learn more about our{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #a259f7 0%, #f7923a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            features
          </span>
        </h4>
        <div style={SV}>
          <div className="max-w-full relative w-full" style={SV}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto max-w-full relative w-full gap-[35px_24px] md:gap-[35px_30px] z-[0]" style={SV}>
              {FEATURE_GROUPS.map((group) => (
                <div key={group.label} className="flex flex-col" style={SV}>
                  <p className="font-medium uppercase ml-[4px] mb-[14px] text-[rgb(71,_79,_123)] text-[12px] tracking-[0.6px] leading-[15px]" style={{ fontFamily: "tt-commons-mono, monospace", ...SV }}>{group.label}</p>
                  <div className="flex flex-col gap-[10px]" style={SV}>
                    {group.items.map((item) => (
                      <FeatureLink key={item.name} name={item.name} href={item.href} icon={item.icon} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section className="items-stretch flex flex-col md:flex-row justify-between relative w-full bg-white/5 backdrop-blur-[12px] shadow-[rgba(0,0,0,0.04)_0px_8px_30px_0px] gap-[30px] md:gap-[40px] max-w-[1160px] p-5 md:pt-5 md:pr-5 md:pb-5 md:pl-20 z-[3] rounded-[1.875rem] mx-4 md:mx-auto" style={SV}>
      <div className="flex flex-col justify-center gap-[24px] md:gap-[30px] max-w-[420px] p-4 md:p-0" style={SV}>
        <h2 className="text-[28px] md:text-[42px] tracking-[-1.32px] leading-[1.1]" style={{ ...SV, fontWeight: 620 }}>Discover if StyloBliss is the right fit for your business</h2>
        <div className="flex flex-col sm:flex-row gap-[16px] md:gap-[20px]" style={SV}>
          <Link to="/demo" className="items-center flex justify-center overflow-hidden relative text-center whitespace-nowrap h-12 md:h-14 text-[rgb(188,_38,_155)] text-[16px] md:text-[18px] gap-[8px] tracking-[-0.096px] leading-[18px] px-6 md:px-9 py-4 z-[2] shrink-[0] rounded-[3.5rem] hover:opacity-90 transition-opacity" style={{ ...SV, fontWeight: 540, textDecoration: "none", boxShadow: "inset 0 0 0 2px rgb(188, 38, 155)" }}>Book a live demo</Link>
          <Link to="/trial" className="items-center flex justify-center overflow-hidden relative text-center whitespace-nowrap h-12 md:h-14 bg-[rgb(188,_38,_155)] text-white text-[16px] md:text-[18px] gap-[8px] tracking-[-0.096px] leading-[18px] px-6 md:px-9 py-4 z-[2] shrink-[0] rounded-[3.5rem]" style={{ ...SV, fontWeight: 540, textDecoration: "none", color: "white" }}>Try it now</Link>
        </div>
      </div>
      <div className="flex grow justify-center md:justify-end basis-[0%]" style={SV}>
        <div className="h-full overflow-hidden relative align-top rounded-[1.25rem] w-full md:w-auto" style={SV}>
          <div className="max-w-[540px]" style={SV}>
            <img role="presentation" src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F3c4999cf616a1e6ca57c197872c8832b55cc0459.svg%2Bxml?generation=1770623290043512&alt=media" className="block size-full max-w-full object-cover overflow-clip left-0 top-0 right-0 bottom-0" style={SV} />
          </div>
          <picture className="inline" style={SV}>
            <source className="inline" style={SV}></source>
            <source className="inline" style={SV}></source>
            <source className="inline" style={SV}></source>
            <source className="inline" style={SV}></source>
            <source className="inline" style={SV}></source>
            <source className="inline" style={SV}></source>
            <source className="inline" style={SV}></source>
            <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F423fe12f04d7cda4415ae81fc7d564b37b2950ab.jpg%3Fw=1080&h=720&q=90&fm=webp&bg=transparent?generation=1770623290043330&alt=media" className="block size-full object-cover overflow-clip absolute left-0 top-0 right-0 bottom-0 aspect-[auto_540_/_360] rounded-[1.25rem]" style={SV} />
          </picture>
        </div>
      </div>
    </section>
  );
}
