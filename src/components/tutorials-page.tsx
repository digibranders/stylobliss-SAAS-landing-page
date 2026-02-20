import React, { useState, useMemo } from 'react';
import { CustomerStories } from './customer-stories';

const SV = { fontVariationSettings: '"slnt" 0' };

/* ──────────────────────────────────────────────────────────
   Tutorial data
   ────────────────────────────────────────────────────────── */
type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
type Category = 'Getting Started' | 'Scheduling' | 'Payments' | 'Marketing' | 'Client Management' | 'Reporting' | 'Staff Management' | 'Integrations';
type Duration = 'Short' | 'Medium' | 'Long';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  durationCategory: Duration;
  difficulty: Difficulty;
  category: Category;
  featured?: boolean;
  popular?: boolean;
}

const TUTORIALS: Tutorial[] = [
  {
    id: '1',
    title: 'Getting Started with StyloBliss',
    description: 'A complete walkthrough of setting up your salon account from scratch.',
    thumbnail: 'https://images.unsplash.com/photo-1611211235015-e2e3a7d09e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMGludGVyaW9yJTIwbW9kZXJufGVufDF8fHx8MTc3MDczODY2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: '12 min',
    durationCategory: 'Medium',
    difficulty: 'Beginner',
    category: 'Getting Started',
    featured: true,
    popular: true,
  },
  {
    id: '2',
    title: 'Mastering the Calendar & Scheduling',
    description: 'Learn to manage appointments, block times, and optimize your daily flow.',
    thumbnail: 'https://images.unsplash.com/photo-1758556549027-879615701c61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxvbiUyMGJvb2tpbmclMjBjYWxlbmRhciUyMGFwcG9pbnRtZW50fGVufDF8fHx8MTc3MDc4NDAyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: '18 min',
    durationCategory: 'Medium',
    difficulty: 'Beginner',
    category: 'Scheduling',
    popular: true,
  },
  {
    id: '3',
    title: 'Setting Up Payments & POS',
    description: 'Configure payment processing, tips, and your point-of-sale system.',
    thumbnail: 'https://images.unsplash.com/photo-1764611907608-2618966a8387?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXltZW50JTIwcHJvY2Vzc2luZyUyMHRlcm1pbmFsJTIwbW9kZXJufGVufDF8fHx8MTc3MDc4NDAyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: '10 min',
    durationCategory: 'Short',
    difficulty: 'Beginner',
    category: 'Payments',
    featured: true,
  },
  {
    id: '4',
    title: 'Automated Marketing Flows',
    description: 'Build powerful automated campaigns that bring clients back.',
    thumbnail: 'https://images.unsplash.com/photo-1562646329-0d0f4d3bf503?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxvbiUyMG1hcmtldGluZyUyMHNvY2lhbCUyMG1lZGlhfGVufDF8fHx8MTc3MDc4NDAyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: '22 min',
    durationCategory: 'Long',
    difficulty: 'Advanced',
    category: 'Marketing',
    featured: true,
    popular: true,
  },
  {
    id: '5',
    title: 'Client Management Deep Dive',
    description: 'Organize client profiles, notes, history, and communication preferences.',
    thumbnail: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxvbiUyMGNsaWVudCUyMGNvbnN1bHRhdGlvbnxlbnwxfHx8fDE3NzA3ODQwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: '15 min',
    durationCategory: 'Medium',
    difficulty: 'Intermediate',
    category: 'Client Management',
    popular: true,
  },
  {
    id: '6',
    title: 'Staff Management & Permissions',
    description: 'Set up team roles, permissions, schedules, and commission structures.',
    thumbnail: 'https://images.unsplash.com/photo-1706973320004-98a2fe6ddb7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxvbiUyMHRlYW0lMjBzdGFmZiUyMG1hbmFnZW1lbnR8ZW58MXx8fHwxNzcwNzg0MDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: '14 min',
    durationCategory: 'Medium',
    difficulty: 'Intermediate',
    category: 'Staff Management',
  },
  {
    id: '7',
    title: 'Reporting & Analytics',
    description: 'Understand your business metrics and make data-driven decisions.',
    thumbnail: 'https://images.unsplash.com/photo-1587400873558-dfac934a6051?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBhbmFseXRpY3MlMjByZXBvcnRzfGVufDF8fHx8MTc3MDc4NDAzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: '20 min',
    durationCategory: 'Long',
    difficulty: 'Advanced',
    category: 'Reporting',
  },
  {
    id: '8',
    title: 'Online Booking Configuration',
    description: 'Customize your booking page, embed it on your website, and go live.',
    thumbnail: 'https://images.unsplash.com/photo-1762330910399-95caa55acf04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBvbmxpbmUlMjBsZWFybmluZyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NzA3ODQwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: '8 min',
    durationCategory: 'Short',
    difficulty: 'Beginner',
    category: 'Scheduling',
  },
  {
    id: '9',
    title: 'Third-Party Integrations',
    description: 'Connect StyloBliss with your favorite tools and services.',
    thumbnail: 'https://images.unsplash.com/photo-1759216853079-831ef8c8b327?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjB0cmVhdG1lbnQlMjByb29tJTIwd2VsbG5lc3N8ZW58MXx8fHwxNzcwNzg0MDMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: '16 min',
    durationCategory: 'Medium',
    difficulty: 'Intermediate',
    category: 'Integrations',
  },
  {
    id: '10',
    title: 'Campaigns & Email Marketing',
    description: 'Create targeted campaigns to grow your client base effectively.',
    thumbnail: 'https://images.unsplash.com/photo-1758273705996-bdeefbdbce5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHJlY29yZGluZyUyMHZpZGVvJTIwY29udGVudCUyMGNyZWF0b3J8ZW58MXx8fHwxNzcwNzg0MDMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: '25 min',
    durationCategory: 'Long',
    difficulty: 'Advanced',
    category: 'Marketing',
  },
  {
    id: '11',
    title: 'Memberships & Packages Setup',
    description: 'Create and manage membership plans and service packages.',
    thumbnail: 'https://images.unsplash.com/photo-1520338661084-680395057c93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxvbiUyMGhhaXJzdHlsaW5nJTIwdHV0b3JpYWwlMjB2aWRlb3xlbnwxfHx8fDE3NzA3ODQwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: '11 min',
    durationCategory: 'Medium',
    difficulty: 'Intermediate',
    category: 'Client Management',
  },
  {
    id: '12',
    title: 'Express Booking Walkthrough',
    description: 'Enable instant rebooking and walk-in management with Express Booking.',
    thumbnail: 'https://images.unsplash.com/photo-1611211235015-e2e3a7d09e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMGludGVyaW9yJTIwbW9kZXJufGVufDF8fHx8MTc3MDczODY2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: '7 min',
    durationCategory: 'Short',
    difficulty: 'Beginner',
    category: 'Scheduling',
    popular: true,
  },
];

/* ──────────────────────────────────────────────────────────
   Learning Paths
   ────────────────────────────────────────────────────────── */
const LEARNING_PATHS = [
  {
    id: 'lp1',
    title: 'New to StyloBliss',
    description: 'Everything you need to get your salon up and running.',
    videoCount: 6,
    progress: 0,
    color: 'rgb(160, 169, 252)',
  },
  {
    id: 'lp2',
    title: 'Scheduling Pro',
    description: 'Master calendar management, booking, and time optimization.',
    videoCount: 4,
    progress: 50,
    color: 'rgb(192, 152, 245)',
  },
  {
    id: 'lp3',
    title: 'Marketing & Growth',
    description: 'Learn campaigns, automated flows, and client retention tactics.',
    videoCount: 5,
    progress: 20,
    color: 'rgb(250, 164, 205)',
  },
  {
    id: 'lp4',
    title: 'Business Operations',
    description: 'Reporting, staff management, payroll, and multi-location setup.',
    videoCount: 4,
    progress: 75,
    color: 'rgb(250, 164, 205)',
  },
];

/* ──────────────────────────────────────────────────────────
   FAQ data (tutorials-specific)
   ────────────────────────────────────────────────────────── */
const faqItems = [
  {
    question: 'Are the tutorials free to access?',
    answer:
      'Yes! All video tutorials are completely free for StyloBliss users. Simply log in to your account and start learning at your own pace.',
  },
  {
    question: 'Can I download tutorials for offline viewing?',
    answer:
      'Currently, tutorials are available for streaming only. However, you can bookmark your favorite tutorials and access them anytime you have an internet connection.',
  },
  {
    question: 'How often are new tutorials added?',
    answer:
      'We add new tutorials every week based on feature updates and user feedback. Subscribe to our newsletter to get notified when new content is published.',
  },
  {
    question: 'Can I request a tutorial on a specific topic?',
    answer:
      'Absolutely! We love hearing from our users. Reach out through the "Contact Us" page or your StyloBliss dashboard to suggest tutorial topics.',
  },
  {
    question: 'Do you offer live training sessions?',
    answer:
      'Yes, we offer live webinars and one-on-one training sessions. Book a live demo to get personalized guidance from our expert team.',
  },
];

/* ──────────────────────────────────────────────────────────
   Sub-components
   ────────────────────────────────────────────────────────── */

function DifficultyBadge({ level }: { level: Difficulty }) {
  const colors: Record<Difficulty, { bg: string; text: string }> = {
    Beginner: { bg: 'rgba(160, 169, 252, 0.2)', text: 'rgb(71, 79, 123)' },
    Intermediate: { bg: 'rgba(192, 152, 245, 0.2)', text: 'rgb(71, 79, 123)' },
    Advanced: { bg: 'rgba(250, 164, 205, 0.2)', text: 'rgb(200, 90, 50)' },
  };
  return (
    <span
      className="inline-flex items-center px-[10px] py-[3px] rounded-[20px] text-[11px] tracking-[0.3px]"
      style={{ background: colors[level].bg, color: colors[level].text, fontWeight: 600, ...SV }}
    >
      {level}
    </span>
  );
}

function DurationBadge({ duration }: { duration: string }) {
  return (
    <span
      className="inline-flex items-center gap-[4px] px-[8px] py-[3px] rounded-[8px] text-[11px] tracking-[0.2px] text-white"
      style={{ background: 'rgba(0,0,0,0.55)', fontWeight: 550, backdropFilter: 'blur(4px)', ...SV }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <circle cx="5" cy="5" r="4" stroke="white" strokeWidth="1.2" />
        <path d="M5 3V5.5L6.5 6.5" stroke="white" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {duration}
    </span>
  );
}

function PlayOverlay({ size = 48 }: { size?: number }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          background: 'rgba(188, 38, 155, 0.9)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 0 30px rgba(188, 38, 155, 0.4)',
        }}
      >
        <svg width={size * 0.35} height={size * 0.4} viewBox="0 0 14 16" fill="none">
          <path d="M13 6.268C14.333 7.038 14.333 8.962 13 9.732L3 15.526C1.667 16.296 0 15.334 0 13.794V2.206C0 0.666 1.667 -0.296 3 0.474L13 6.268Z" fill="white" />
        </svg>
      </div>
    </div>
  );
}

function VideoCard({ tutorial }: { tutorial: Tutorial }) {
  return (
    <div className="group flex flex-col rounded-[20px] overflow-hidden cursor-pointer transition-all duration-300 bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-transparent hover:border-[rgba(192, 152, 245, 0.2)]">
      {/* Thumbnail */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <img
          src={tutorial.thumbnail}
          alt={tutorial.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <PlayOverlay size={44} />
        {/* Duration badge */}
        <div className="absolute top-[10px] right-[10px] z-[3]">
          <DurationBadge duration={tutorial.duration} />
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col gap-[8px] p-[18px] flex-1">
        <div className="flex items-center gap-[8px]">
          <DifficultyBadge level={tutorial.difficulty} />
          <span
            className="text-[11px] tracking-[0.2px] text-[rgb(71, 79, 123)]"
            style={{ fontWeight: 500, ...SV }}
          >
            {tutorial.category}
          </span>
        </div>
        <h4
          className="text-[rgb(25, 30, 73)] text-[16px] tracking-[-0.3px] leading-[22px] line-clamp-2"
          style={{ fontWeight: 620, ...SV }}
        >
          {tutorial.title}
        </h4>
        <p
          className="text-[rgb(71, 79, 123)] text-[13px] leading-[19px] line-clamp-1"
          style={{ fontWeight: 450, ...SV }}
        >
          {tutorial.description}
        </p>
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-[16px] py-[8px] rounded-[30px] text-[13px] tracking-[-0.1px] border cursor-pointer transition-all duration-200"
      style={{
        fontWeight: 550,
        background: active ? 'rgb(188, 38, 155)' : 'white',
        color: active ? 'white' : 'rgb(25, 30, 73)',
        borderColor: active ? 'rgb(188, 38, 155)' : 'rgb(224, 226, 237)',
        ...SV,
      }}
    >
      {label}
    </button>
  );
}

/* ──────────────────────────────────────────────────────────
   Main Component
   ────────────────────────────────────────────────────────── */
export function TutorialsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [activeDuration, setActiveDuration] = useState<Duration | 'All'>('All');
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty | 'All'>('All');
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  const categories: (Category | 'All')[] = [
    'All',
    'Getting Started',
    'Scheduling',
    'Payments',
    'Marketing',
    'Client Management',
    'Reporting',
    'Staff Management',
    'Integrations',
  ];

  const filteredTutorials = useMemo(() => {
    return TUTORIALS.filter((t) => {
      if (activeCategory !== 'All' && t.category !== activeCategory) return false;
      if (activeDuration !== 'All' && t.durationCategory !== activeDuration) return false;
      if (activeDifficulty !== 'All' && t.difficulty !== activeDifficulty) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [searchQuery, activeCategory, activeDuration, activeDifficulty]);

  const featuredTutorials = TUTORIALS.filter((t) => t.featured);
  const popularTutorials = TUTORIALS.filter((t) => t.popular);

  const heroTutorial = TUTORIALS[0];

  return (
    <div style={{ ...SV, background: '#ffffff' }}>
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="relative w-full pt-[120px] md:pt-[160px] pb-[60px] md:pb-[80px] px-4 md:px-[70px] overflow-hidden">
        {/* Gradient background — home-page-style colorful band */}
        <div
          className="pointer-events-none absolute w-screen left-[50%] -translate-x-[50%]"
          style={{
            top: 0,
            height: '800px',
            zIndex: 0,
            backgroundColor: 'rgb(252, 250, 250)',
          }}
        />
        <div className="relative z-[1] mx-auto max-w-[1160px]">
          <div className="grid items-center gap-[30px] md:gap-[60px] grid-cols-1 md:grid-cols-2">
            {/* Left side */}
            <div className="flex flex-col gap-[24px]">
              <p
                className="uppercase text-[rgb(188, 38, 155)] text-[13px] tracking-[0.42px] leading-[16px]"
                style={{ fontFamily: 'tt-commons-mono, monospace', fontWeight: 600, ...SV }}
              >
                Video Tutorials
              </p>
              <h1
                className="text-[rgb(25, 30, 73)] text-[32px] md:text-[48px] tracking-[-1.2px] md:tracking-[-1.6px] leading-[38px] md:leading-[54px]"
                style={{ fontWeight: 620, ...SV }}
              >
                Learn step-by-step with expert-led video guides
              </h1>
              <p
                className="text-[rgb(71,79,123)] text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] max-w-[440px]"
                style={{ fontWeight: 450, ...SV }}
              >
                From first setup to advanced marketing flows — master every feature of StyloBliss at your own pace.
              </p>
              <div className="flex flex-col sm:flex-row gap-[14px] mt-[8px]">
                <a
                  href="#tutorials-grid"
                  className="flex items-center justify-center h-[50px] px-[28px] rounded-[56px] text-white text-[15px] tracking-[-0.096px]"
                  style={{
                    fontWeight: 580,
                    background: 'rgb(188, 38, 155)',
                    textDecoration: 'none',
                    ...SV,
                  }}
                >
                  Browse Tutorials
                </a>
                <a
                  href="#learning-paths"
                  className="flex items-center justify-center h-[50px] px-[28px] rounded-[56px] text-[rgb(188, 38, 155)] text-[15px] tracking-[-0.096px]"
                  style={{
                    fontWeight: 580,
                    textDecoration: 'none',
                    boxShadow: 'inset 0 0 0 2px rgb(188, 38, 155)',
                    ...SV,
                  }}
                >
                  Start Learning
                </a>
              </div>
            </div>

            {/* Right side — hero video preview */}
            <div className="group relative rounded-[24px] overflow-hidden cursor-pointer">
              <div className="aspect-[16/9] relative">
                <img
                  src={heroTutorial.thumbnail}
                  alt="Featured tutorial"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center z-[3]">
                  <div
                    className="flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                    style={{
                      width: 72,
                      height: 72,
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(16px)',
                      boxShadow: '0 0 40px rgba(188, 38, 155, 0.3), inset 0 0 0 1.5px rgba(255,255,255,0.3)',
                    }}
                  >
                    <svg width="24" height="28" viewBox="0 0 18 20" fill="none">
                      <path
                        d="M17 8.268C18.333 9.038 18.333 10.962 17 11.732L3.5 19.526C2.167 20.296 0.5 19.334 0.5 17.794V2.206C0.5 0.666 2.167 -0.296 3.5 0.474L17 8.268Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-[24px] z-[3]">
                  <div className="flex items-center gap-[10px] mb-[8px]">
                    <DifficultyBadge level={heroTutorial.difficulty} />
                    <DurationBadge duration={heroTutorial.duration} />
                  </div>
                  <h3
                    className="text-white text-[22px] tracking-[-0.5px] leading-[28px]"
                    style={{ fontWeight: 620, ...SV }}
                  >
                    {heroTutorial.title}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FILTER & SEARCH ═══════════════ */}
      <section id="tutorials-grid" className="relative w-full py-[40px] px-4 md:px-[70px]">
        <div className="mx-auto max-w-[1160px]">
          {/* Search + dropdowns */}
          <div className="flex flex-col gap-[16px] mb-[20px]">
            {/* Search input */}
            <div className="relative flex-1 md:max-w-[360px]">
              <svg
                className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[rgb(71, 79, 123)]"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tutorials..."
                className="w-full h-[44px] pl-[40px] pr-[16px] rounded-[30px] border border-[rgb(224,226,237)] bg-white text-[14px] text-[rgb(25, 30, 73)] outline-none focus:border-[rgb(192, 152, 245)] transition-colors"
                style={{ fontWeight: 450, ...SV }}
              />
            </div>

            {/* Difficulty filter */}
            <div className="flex flex-wrap items-center gap-[8px]">
              {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((d) => (
                <FilterChip
                  key={d}
                  label={d}
                  active={activeDifficulty === d}
                  onClick={() => setActiveDifficulty(d)}
                />
              ))}
            </div>

            {/* Duration filter */}
            <div className="flex flex-wrap items-center gap-[8px]">
              {(['All', 'Short', 'Medium', 'Long'] as const).map((d) => (
                <FilterChip
                  key={d}
                  label={d === 'All' ? 'Any Length' : `${d}`}
                  active={activeDuration === d}
                  onClick={() => setActiveDuration(d)}
                />
              ))}
            </div>
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap items-center gap-[8px]">
            {categories.map((cat) => (
              <FilterChip
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ VIDEO TUTORIALS GRID ═══════════════ */}
      <section className="relative w-full pb-[60px] md:pb-[80px] px-4 md:px-[70px]">
        <div className="mx-auto max-w-[1160px]">
          <h2
            className="text-[rgb(25,30,73)] text-[22px] md:text-[28px] tracking-[-0.8px] leading-[30px] md:leading-[36px] mb-[24px] md:mb-[30px]"
            style={{ fontWeight: 620, ...SV }}
          >
            {activeCategory === 'All' ? 'All Tutorials' : activeCategory}
            <span
              className="ml-[10px] text-[rgb(71, 79, 123)] text-[16px] tracking-normal"
              style={{ fontWeight: 450 }}
            >
              ({filteredTutorials.length})
            </span>
          </h2>
          {filteredTutorials.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] md:gap-[24px]">
              {filteredTutorials.map((t) => (
                <VideoCard key={t.id} tutorial={t} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-[80px] text-center">
              <p
                className="text-[rgb(71, 79, 123)] text-[18px] leading-[28px] mb-[8px]"
                style={{ fontWeight: 500, ...SV }}
              >
                No tutorials found
              </p>
              <p
                className="text-[rgb(71, 79, 123)] text-[14px] leading-[22px]"
                style={{ fontWeight: 400, ...SV }}
              >
                Try adjusting your filters or search query.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════ FEATURED / POPULAR ═══════════════ */}
      <section className="relative w-full py-[50px] md:py-[80px] px-4 md:px-[70px]">
        {/* Home-page-style colorful band behind Featured/Popular */}
        <div
          className="pointer-events-none absolute w-screen left-[50%] -translate-x-[50%]"
          style={{
            top: '-100px',
            bottom: '-100px',
            zIndex: 0,
            backgroundColor: 'rgb(252, 250, 250)',
          }}
        />
        <div className="relative z-[1] mx-auto max-w-[1160px]">
          {/* Featured */}
          <div className="mb-[50px] md:mb-[70px]">
            <div className="flex items-center gap-[12px] mb-[24px] md:mb-[30px]">
              <div className="w-[28px] h-[28px] overflow-hidden shrink-0">
                <img
                  src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F54c462ec9d6e9666dda0f36f83f374b0aa341af6.png%3Fw=104&h=104&q=90&fm=webp&bg=transparent?generation=1770623289738047&alt=media"
                  alt="Featured"
                  className="block w-full h-full object-cover"
                />
              </div>
              <h2
                className="text-[rgb(25, 30, 73)] text-[22px] md:text-[28px] tracking-[-0.8px] leading-[30px] md:leading-[36px]"
                style={{ fontWeight: 620, ...SV }}
              >
                Featured Tutorials
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] md:gap-[24px]">
              {featuredTutorials.map((t) => (
                <VideoCard key={t.id} tutorial={t} />
              ))}
            </div>
          </div>

          {/* Popular */}
          <div>
            <div className="flex items-center gap-[12px] mb-[24px] md:mb-[30px]">
              <div className="w-[28px] h-[28px] overflow-hidden shrink-0">
                <img
                  src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fb2f478a2a62be9c02fe475935a106b17091e2c57.png%3Fw=104&h=104&q=90&fm=webp&bg=transparent?generation=1770623289712736&alt=media"
                  alt="Popular"
                  className="block w-full h-full object-cover"
                />
              </div>
              <h2
                className="text-[rgb(25, 30, 73)] text-[22px] md:text-[28px] tracking-[-0.8px] leading-[30px] md:leading-[36px]"
                style={{ fontWeight: 620, ...SV }}
              >
                Most Popular
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
              {popularTutorials.map((t) => (
                <VideoCard key={t.id} tutorial={t} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ LEARNING PATHS ═══════════════ */}
      <section id="learning-paths" className="relative w-full py-[50px] md:py-[80px] px-4 md:px-[70px]">
        <div className="mx-auto max-w-[1160px]">
          <div className="text-center mb-[50px]">
            <p
              className="uppercase text-[rgb(188,38,155)] text-[13px] tracking-[0.42px] leading-[16px] mb-[16px]"
              style={{ fontFamily: 'tt-commons-mono, monospace', fontWeight: 600, ...SV }}
            >
              Learning Paths
            </p>
            <h2
              className="text-[rgb(25, 30, 73)] text-[28px] md:text-[40px] tracking-[-1.2px] leading-[34px] md:leading-[48px] mb-[14px]"
              style={{ fontWeight: 620, ...SV }}
            >
              Structured Learning Paths
            </h2>
            <p
              className="text-[rgb(71, 79, 123)] text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] max-w-[520px] mx-auto"
              style={{ fontWeight: 450, ...SV }}
            >
              Follow curated sequences of tutorials to build your skills from beginner to expert.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
            {LEARNING_PATHS.map((path) => (
              <div
                key={path.id}
                className="group flex flex-col rounded-[24px] p-[28px] bg-white border border-[rgb(224,226,237)] hover:border-transparent hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer"
              >
                {/* Color accent bar */}
                <div
                  className="w-[40px] h-[4px] rounded-full mb-[20px]"
                  style={{ background: path.color }}
                />
                <h3
                  className="text-[rgb(25,30,73)] text-[18px] tracking-[-0.3px] leading-[24px] mb-[8px]"
                  style={{ fontWeight: 620, ...SV }}
                >
                  {path.title}
                </h3>
                <p
                  className="text-[rgb(71,79,123)] text-[14px] leading-[21px] mb-[20px] flex-1"
                  style={{ fontWeight: 450, ...SV }}
                >
                  {path.description}
                </p>
                {/* Video count */}
                <p
                  className="text-[rgb(71,79,123)] text-[12px] tracking-[0.2px] mb-[12px]"
                  style={{ fontWeight: 500, ...SV }}
                >
                  {path.videoCount} videos
                </p>
                {/* Progress bar */}
                <div className="w-full h-[4px] rounded-full bg-[rgb(237,238,245)] mb-[16px] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${path.progress}%`, background: path.color }}
                  />
                </div>
                {/* CTA */}
                <button
                  className="flex items-center gap-[6px] text-[rgb(188, 38, 155)] text-[14px] tracking-[-0.1px] bg-transparent border-none cursor-pointer p-0 group-hover:gap-[10px] transition-all duration-200"
                  style={{ fontWeight: 580, ...SV }}
                >
                  {path.progress > 0 ? 'Continue Path' : 'Start Path'}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M4.5 2.5L8 6L4.5 9.5"
                      stroke="rgb(188, 38, 155)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CUSTOMER STORIES (reused) ═══════════════ */}
      <div className="relative">
        <CustomerStories />
      </div>

      {/* ═══════════════ FAQ SECTION ═══════════════ */}
      <section className="relative z-[2] w-full py-[50px] md:py-[80px] px-4 md:px-[70px]">
        <div className="relative z-[1] mx-auto flex flex-col items-center max-w-[760px]">
          <h3
            className="text-center text-[rgb(25,30,73)] text-[26px] md:text-[33px] tracking-[-1px] leading-[34px] md:leading-[40px] mb-[30px] md:mb-[40px]"
            style={{ fontWeight: 700, ...SV }}
          >
            Frequently Asked Questions
          </h3>
          <div className="w-full">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="border-b border-[rgb(224,226,237)] first:border-t"
              >
                <button
                  onClick={() => setFaqOpenIndex(faqOpenIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between py-[24px] px-[10px] cursor-pointer bg-transparent border-none text-left"
                >
                  <span
                    className="text-[rgb(25,30,73)] text-[18px] tracking-[-0.4px] leading-[30px]"
                    style={{ fontWeight: 700, ...SV }}
                  >
                    {item.question}
                  </span>
                  <div className="shrink-0 ml-[20px] p-[10px]">
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      className={`transition-transform duration-200 ${faqOpenIndex === idx ? 'rotate-90' : '-rotate-90'}`}
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
                {faqOpenIndex === idx && (
                  <div className="px-[10px] pb-[24px]">
                    <p
                      className="text-[rgb(25,30,73)] text-[16px] leading-[26px]"
                      style={{ fontWeight: 450, ...SV }}
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

      {/* ═══════════════ CTA CARD ═══════════════ */}
      <section className="relative w-full pb-[60px] md:pb-[100px] px-4 md:px-[70px]">
        {/* Bottom colorful gradient bleed behind CTA */}
        <div
          className="pointer-events-none absolute w-screen left-[50%] -translate-x-[50%]"
          style={{
            top: '-200px',
            bottom: 0,
            zIndex: 0,
            backgroundColor: 'rgb(252, 250, 250)',
          }}
        />
        <div
          className="relative z-[1] mx-auto max-w-[760px] rounded-[30px] py-[40px] px-[20px] md:py-[60px] md:px-[70px] flex flex-col items-center text-center"
          style={{
            backgroundColor: 'rgba(217, 162, 130, 0.15)',
          }}
        >
          <h3
            className="mb-[16px] text-[rgb(25, 30, 73)] text-[26px] md:text-[32px] tracking-[-1px] leading-[34px] md:leading-[40px]"
            style={{ fontWeight: 700, ...SV }}
          >
            Ready to get started?
          </h3>
          <p
            className="mb-[30px] text-[rgb(25, 30, 73)] text-[17px] leading-[28px] max-w-[440px]"
            style={{ fontWeight: 450, ...SV }}
          >
            Try StyloBliss free and explore all features with step-by-step guidance from our tutorials.
          </p>
          <div className="flex flex-col sm:flex-row gap-[16px] items-center">
            <a
              href="#"
              className="flex items-center justify-center h-[50px] px-[30px] rounded-[56px] text-[rgb(188,38,155)] text-[15px] tracking-[-0.096px]"
              style={{
                fontWeight: 580,
                textDecoration: 'none',
                boxShadow: 'inset 0 0 0 2px rgb(188, 38, 155)',
                ...SV,
              }}
            >
              Book a live demo
            </a>
            <a
              href="#"
              className="flex items-center justify-center h-[50px] px-[30px] rounded-[56px] text-[rgb(252, 250, 250)] text-[15px] tracking-[-0.096px]"
              style={{
                fontWeight: 580,
                background: 'rgb(188, 38, 155)',
                textDecoration: 'none',
                ...SV,
              }}
            >
              Try it now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}