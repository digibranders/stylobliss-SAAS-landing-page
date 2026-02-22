import React, { useState, useMemo } from 'react';
import featuredImg from '@/assets/blog-featured.png';

const SV = { fontVariationSettings: '"slnt" 0' };

/* ──────────────────────────────────────────────────────────
   Category types
   ────────────────────────────────────────────────────────── */
type Category = 'Features' | 'Guides' | 'Industry' | 'Company' | 'Tools';

/* ──────────────────────────────────────────────────────────
   Blog article data
   ────────────────────────────────────────────────────────── */
interface BlogArticle {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  categories: Category[];
  author: string;
  date: string;
  popular?: boolean;
}

const FEATURED_ARTICLE = {
  title: 'StyloBliss Connect: Web Chat, Phone Calls, and Texting',
  description:
    'StyloBliss Connect is your new all-in-one communication suite. Seamlessly engage with clients through web chat, phone calls, and text messaging.',
  image: featuredImg,
  author: 'Josephine Hulburd Schultz',
  role: 'Marketing Manager',
  avatar:
    'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhlYWRzaG90JTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcwNzg0NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
};

const POPULAR_ARTICLES: BlogArticle[] = [
  {
    id: 'pop1',
    title: 'Sell Memberships & Packages Online with StyloBliss',
    description:
      'Now you can sell memberships and packages online through StyloBliss — boost visibility, drive recurring revenue, and give clients a seamless way to buy your best offerings, anytime.',
    thumbnail:
      'https://images.unsplash.com/photo-1700847304964-9fe563059742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxvbiUyMG1lbWJlcnNoaXBzJTIwcGFja2FnZXMlMjBwcmljaW5nfGVufDF8fHx8MTc3MDc4NDczNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    categories: ['Features'],
    author: 'Josephine Hulburd Schultz',
    date: 'Aug 27, 2025',
    popular: true,
  },
  {
    id: 'pop2',
    title: 'Introducing Automated Flows for personalized marketing',
    description:
      'Create highly personalized sequences of emails and text messages to rebook clients, welcome first-time guests, encourage reviews, upsell memberships, and more.',
    thumbnail:
      'https://images.unsplash.com/photo-1760552069049-600f71fa5bbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwaGFpciUyMHdvbWFuJTIwcG9ydHJhaXQlMjBiZWF1dHl8ZW58MXx8fHwxNzcwNzg0NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    categories: ['Features'],
    author: 'Abby Schmautz',
    date: 'Sep 5, 2024',
    popular: true,
  },
];

const BROWSE_ARTICLES: BlogArticle[] = [
  {
    id: 'b1',
    title: 'Hot Tip: How to turn gift card holders into loyal customers',
    description:
      'Transform one-time gift card recipients into repeat clients with these proven strategies.',
    thumbnail:
      'https://images.unsplash.com/photo-1713086199494-6da80f369b5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxvbiUyMGdpZnQlMjBjYXJkJTIwcHJvbW90aW9uJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzcwNzg0NzMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    categories: ['Features'],
    author: 'Josephine Hulburd Schultz',
    date: 'Feb 5, 2026',
  },
  {
    id: 'b2',
    title: '10 Must-Have Salon Software Features for 2026',
    description:
      'Stay ahead of the curve with the essential software features every modern salon needs.',
    thumbnail:
      'https://images.unsplash.com/photo-1653130029149-9109b115ab9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBiZWF1dHklMjBzYWxvbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzA3ODQ3MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    categories: ['Guides'],
    author: 'Josephine Hulburd Schultz',
    date: 'Feb 3, 2026',
  },
  {
    id: 'b3',
    title: "Host a Valentine's Day micro-event with StyloBliss's most loved features",
    description:
      'Create an unforgettable Valentine\'s Day experience using our themed tools and templates.',
    thumbnail:
      'https://images.unsplash.com/photo-1664170462134-fa7451aaa96f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWxlbnRpbmVzJTIwZGF5JTIwZmxvd2VycyUyMGJvdXF1ZXQlMjBwaW5rfGVufDF8fHx8MTc3MDc4NDczMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    categories: ['Features', 'Guides'],
    author: 'Clara Winter',
    date: 'Jan 29, 2026',
  },
  {
    id: 'b4',
    title: 'Lola Rosa Head Spa flourishes with StyloBliss',
    description:
      'Discover how Lola Rosa Head Spa scaled their business using StyloBliss\'s integrated platform.',
    thumbnail:
      'https://images.unsplash.com/photo-1630048340090-ec6954dd7ffc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoYWlyJTIwc2Fsb24lMjBnb2xkJTIwYnJhbmRpbmd8ZW58MXx8fHwxNzcwNzg0NzMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    categories: ['Features', 'Industry'],
    author: 'Josephine Hulburd Schultz',
    date: 'Dec 22, 2025',
  },
  {
    id: 'b5',
    title: 'How THE SPACE transformed client communication with StyloBliss Connect',
    description:
      'Learn how THE SPACE uses web chat, calls, and texts to keep clients engaged and coming back.',
    thumbnail:
      'https://images.unsplash.com/photo-1599387737838-660b75526801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxvbiUyMHN0eWxpc3QlMjBjbGllbnQlMjBjb21tdW5pY2F0aW9ufGVufDF8fHx8MTc3MDc4NDczM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    categories: ['Industry', 'Features'],
    author: 'Josephine Hulburd Schultz',
    date: 'Dec 19, 2025',
  },
  {
    id: 'b6',
    title: "StyloBliss Ranks #49 on Deloitte's Fast 500",
    description:
      'We\'re proud to be recognized as one of the fastest-growing technology companies in North America.',
    thumbnail:
      'https://images.unsplash.com/photo-1621176302431-e02e9a190723?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwYnVzaW5lc3MlMjBhd2FyZCUyMGFjaGlldmVtZW50fGVufDF8fHx8MTc3MDc4NDczM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    categories: ['Company'],
    author: 'Sarah Bradshaw',
    date: 'Dec 4, 2025',
  },
  {
    id: 'b7',
    title: 'The Complete Guide to Salon Client Retention in 2026',
    description:
      'From automated follow-ups to loyalty programs — everything you need to keep clients coming back.',
    thumbnail:
      'https://images.unsplash.com/photo-1661961111247-e218f67d1cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBzb2Z0d2FyZSUyMGZlYXR1cmVzJTIwdGVjaG5vbG9neSUyMHRhYmxldHxlbnwxfHx8fDE3NzA3ODQ3Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    categories: ['Guides'],
    author: 'Abby Schmautz',
    date: 'Nov 20, 2025',
  },
  {
    id: 'b8',
    title: '5 Email Automation Sequences Every Salon Should Run',
    description:
      'Set up these five essential email flows to drive bookings, reviews, and recurring revenue on autopilot.',
    thumbnail:
      'https://images.unsplash.com/photo-1705484228982-fd9655904a07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbWF0ZWQlMjBtYXJrZXRpbmclMjBlbWFpbCUyMHNlcXVlbmNlfGVufDF8fHx8MTc3MDc4NDczOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    categories: ['Tools'],
    author: 'Clara Winter',
    date: 'Nov 8, 2025',
  },
  {
    id: 'b9',
    title: 'How Multi-Location Salons Scale with StyloBliss',
    description:
      'Managing multiple locations? Here\'s how top salon brands use StyloBliss to streamline operations across every site.',
    thumbnail:
      'https://images.unsplash.com/photo-1700847304964-9fe563059742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxvbiUyMG1lbWJlcnNoaXBzJTIwcGFja2FnZXMlMjBwcmljaW5nfGVufDF8fHx8MTc3MDc4NDczNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    categories: ['Industry'],
    author: 'Sarah Bradshaw',
    date: 'Oct 15, 2025',
  },
];

/* ──────────────────────────────────────────────────────────
   Sub-components
   ────────────────────────────────────────────────────────── */

function CategoryTag({ category, small }: { category: string; small?: boolean }) {
  return (
    <span
      className={`uppercase tracking-[0.5px] ${small ? 'text-[11px]' : 'text-[12px]'}`}
      style={{
        fontFamily: 'tt-commons-mono, monospace',
        fontWeight: 600,
        color: 'rgb(188, 38, 155)',
        ...SV,
      }}
    >
      {category}
    </span>
  );
}

function CategoryChip({
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
      className="px-[18px] py-[8px] rounded-[30px] text-[13px] tracking-[0.3px] uppercase cursor-pointer transition-all duration-200 border"
      style={{
        fontFamily: 'tt-commons-mono, monospace',
        fontWeight: 600,
        background: active ? 'rgb(25, 30, 73)' : 'transparent',
        color: active ? 'white' : 'rgb(25, 30, 73)',
        borderColor: active ? 'rgb(25, 30, 73)' : 'rgb(200, 203, 220)',
        ...SV,
      }}
    >
      {label}
    </button>
  );
}

/* ──────────────────────────────────────────────────────────
   Popular Article Card
   ────────────────────────────────────────────────────────── */
function PopularArticleCard({ article }: { article: BlogArticle }) {
  return (
    <a href="#" className="group flex flex-col cursor-pointer" style={{ textDecoration: 'none' }}>
      {/* Thumbnail */}
      <div
        className="relative w-full aspect-[16/9] rounded-[20px] overflow-hidden mb-[24px]"
        style={{ background: 'rgb(237, 232, 245)' }}
      >
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>
      {/* Category */}
      <div className="flex items-center gap-[6px] mb-[12px]">
        {article.categories.map((cat, i) => (
          <span key={cat} className="inline-flex items-center gap-[6px]">
            {i > 0 && (
              <span className="text-[rgb(188,38,155)] text-[12px]" style={SV}>
                ·
              </span>
            )}
            <CategoryTag category={cat} />
          </span>
        ))}
      </div>
      {/* Title */}
      <h3
        className="text-[rgb(25,30,73)] text-[24px] tracking-[-0.6px] leading-[32px] mb-[12px] group-hover:text-[rgb(188,38,155)] transition-colors duration-200"
        style={{ fontWeight: 620, ...SV }}
      >
        {article.title}
      </h3>
      {/* Description */}
      <p
        className="text-[rgb(188,38,155)] text-[15px] leading-[24px] mb-[16px]"
        style={{ fontWeight: 450, ...SV }}
      >
        {article.description}
      </p>
      {/* Author & Date */}
      <div className="flex items-center gap-[8px]">
        <span
          className="text-[rgb(25,30,73)] text-[13px]"
          style={{ fontWeight: 550, ...SV }}
        >
          By {article.author}
        </span>
        <span className="text-[rgb(188,38,155)] text-[13px]" style={SV}>|</span>
        <span
          className="text-[rgb(188,38,155)] text-[13px]"
          style={{ fontWeight: 450, ...SV }}
        >
          {article.date}
        </span>
      </div>
    </a>
  );
}

/* ──────────────────────────────────────────────────────────
   Browse Article Card
   ────────────────────────────────────────────────────────── */
function BrowseArticleCard({ article }: { article: BlogArticle }) {
  return (
    <a href="#" className="group flex flex-col cursor-pointer" style={{ textDecoration: 'none' }}>
      {/* Thumbnail */}
      <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-[18px] bg-[rgb(240,238,248)]">
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>
      {/* Categories */}
      <div className="flex items-center gap-[6px] mb-[10px]">
        {article.categories.map((cat, i) => (
          <span key={cat} className="inline-flex items-center gap-[6px]">
            {i > 0 && (
              <span className="text-[rgb(71,79,123)] text-[11px]" style={SV}>
                ·
              </span>
            )}
            <CategoryTag category={cat} small />
          </span>
        ))}
      </div>
      {/* Title */}
      <h3
        className="text-[rgb(25,30,73)] text-[24px] tracking-[-0.6px] leading-[32px] mb-[12px] group-hover:text-[rgb(188,38,155)] transition-colors duration-200"
        style={{ fontWeight: 620, ...SV }}
      >
        {article.title}
      </h3>
      {/* Description */}
      <p
        className="text-[rgb(188,38,155)] text-[15px] leading-[24px] mb-[16px]"
        style={{ fontWeight: 450, ...SV }}
      >
        {article.description}
      </p>
      {/* Author & Date */}
      <div className="flex items-center gap-[8px]">
        <span
          className="text-[rgb(25,30,73)] text-[13px]"
          style={{ fontWeight: 550, ...SV }}
        >
          By {article.author}
        </span>
        <span className="text-[rgb(188,38,155)] text-[13px]" style={SV}>|</span>
        <span
          className="text-[rgb(188,38,155)] text-[13px]"
          style={{ fontWeight: 450, ...SV }}
        >
          {article.date}
        </span>
      </div>
    </a>
  );
}

/* ──────────────────────────────────────────────────────────
   Main Blog Page
   ────────────────────────────────────────────────────────── */
export function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<Category | 'All'>('All');
  const [email, setEmail] = useState('');

  const filteredArticles = useMemo(() => {
    if (activeFilter === 'All') return BROWSE_ARTICLES;
    return BROWSE_ARTICLES.filter((a) => a.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div style={{ ...SV }}>
      {/* ═══════════════ SECTION 1 — HEADER + FEATURED ARTICLE ═══════════════ */}
      <section className="relative w-full pt-[120px] md:pt-[150px] pb-[50px] md:pb-[80px] px-4 md:px-[70px]">
        {/* ── Soft radial pastel wash — mirrors the home hero's blurred image feel ── */}
        <div
          className="pointer-events-none absolute w-screen left-[50%] -translate-x-[50%]"
          style={{
            top: 0,
            bottom: '-200px',
            zIndex: 0,
            background: 'linear-gradient(180deg, #f6f1fe 0%, #f6f1fe 80%, transparent 100%)',
          }}
        />
        <div className="relative z-[1] mx-auto max-w-[1160px]">
          {/* Top bar: Title + Subscribe */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-[20px] md:gap-[16px] mb-[36px] md:mb-[60px]">
            <h1
              className="text-[rgb(25,30,73)] text-[30px] md:text-[42px] tracking-[-1px] md:tracking-[-1.4px] leading-[36px] md:leading-[50px]"
              style={{ fontWeight: 640, fontStyle: 'italic', ...SV }}
            >
              StyloBliss Blog
            </h1>
            <div className="flex items-center gap-[8px] w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="h-[44px] flex-1 md:flex-none md:w-[240px] px-[20px] rounded-[30px] border border-[rgb(200,203,220)] bg-white text-[14px] text-[rgb(25,30,73)] outline-none focus:border-[rgb(188,38,155)] transition-colors min-w-0"
                style={{ fontWeight: 450, ...SV }}
              />
              <button
                className="h-[44px] px-[24px] rounded-[30px] text-white text-[14px] tracking-[-0.1px] cursor-pointer border-none shrink-0"
                style={{
                  fontWeight: 600,
                  background: 'rgb(188, 38, 155)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Featured article */}
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-[30px] md:gap-[50px] items-center">
            {/* Image */}
            <a href="#" className="group block rounded-[24px] overflow-hidden cursor-pointer" style={{ textDecoration: 'none' }}>
              <div
                className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden"
                style={{
                  backgroundColor: '#f6f1fe',
                }}
              >
                <img
                  src={FEATURED_ARTICLE.image}
                  alt={FEATURED_ARTICLE.title}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </a>

            {/* Text */}
            <div className="flex flex-col gap-[16px] md:gap-[20px]">
              <p
                className="uppercase text-[rgb(188,38,155)] text-[12px] tracking-[1.5px] leading-[14px]"
                style={{ fontFamily: 'tt-commons-mono, monospace', fontWeight: 600, ...SV }}
              >
                Featured Article
              </p>
              <h2
                className="text-[rgb(25,30,73)] text-[26px] md:text-[36px] tracking-[-0.8px] md:tracking-[-1.2px] leading-[34px] md:leading-[44px]"
                style={{ fontWeight: 640, ...SV }}
              >
                {FEATURED_ARTICLE.title}
              </h2>
              <p
                className="text-[rgb(188,38,155)] text-[16px] leading-[26px]"
                style={{ fontWeight: 450, ...SV }}
              >
                {FEATURED_ARTICLE.description}
              </p>
              {/* Author */}
              <div className="flex items-center gap-[14px] mt-[8px]">
                <img
                  src={FEATURED_ARTICLE.avatar}
                  alt={FEATURED_ARTICLE.author}
                  className="w-[44px] h-[44px] rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span
                    className="text-[rgb(25,30,73)] text-[14px]"
                    style={{ fontWeight: 600, ...SV }}
                  >
                    By {FEATURED_ARTICLE.author}
                  </span>
                  <span
                    className="text-[rgb(188,38,155)] text-[13px]"
                    style={{ fontWeight: 450, ...SV }}
                  >
                    {FEATURED_ARTICLE.role}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 2 — POPULAR ARTICLES ═══════════════ */}
      <section className="relative w-full py-[50px] md:py-[70px] px-4 md:px-[70px]">
        <div className="relative z-[1] mx-auto max-w-[1160px]">
          <h2
            className="text-[rgb(25,30,73)] text-[26px] md:text-[32px] tracking-[-0.8px] md:tracking-[-1px] leading-[34px] md:leading-[40px] mb-[30px] md:mb-[40px]"
            style={{ fontWeight: 640, ...SV }}
          >
            Popular articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[40px]">
            {POPULAR_ARTICLES.map((article) => (
              <PopularArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 3 — BROWSE ARTICLES ═══════════════ */}
      <section className="relative w-full pt-[40px] md:pt-[60px] pb-[60px] md:pb-[100px] px-4 md:px-[70px]">
        {/* ── Bottom colorful gradient bleed ── */}
        <div
          className="pointer-events-none absolute w-screen left-[50%] -translate-x-[50%]"
          style={{
            bottom: 0,
            height: '500px',
            zIndex: 0,
            background: 'linear-gradient(180deg, transparent 0%, #f3f3f8 15%, #f3f3f8 100%)',
          }}
        />
        <div className="relative z-[1] mx-auto max-w-[1160px]">
          <h2
            className="text-[rgb(25,30,73)] text-[26px] md:text-[32px] tracking-[-0.8px] md:tracking-[-1px] leading-[34px] md:leading-[40px] mb-[24px] md:mb-[30px]"
            style={{ fontWeight: 640, ...SV }}
          >
            Browse articles
          </h2>

          {/* Filter chips */}
          <div className="flex flex-wrap items-center gap-[8px] md:gap-[10px] mb-[30px] md:mb-[40px]">
            <CategoryChip
              label="See All"
              active={activeFilter === 'All'}
              onClick={() => setActiveFilter('All')}
            />
            {(['Features', 'Guides', 'Industry', 'Company', 'Tools'] as Category[]).map((cat) => (
              <CategoryChip
                key={cat}
                label={cat}
                active={activeFilter === cat}
                onClick={() => setActiveFilter(cat)}
              />
            ))}
          </div>

          {/* Article grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[24px] md:gap-x-[36px] gap-y-[40px] md:gap-y-[50px]">
              {filteredArticles.map((article) => (
                <BrowseArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-[60px] text-center">
              <p
                className="text-[rgb(188,38,155)] text-[18px] leading-[28px]"
                style={{ fontWeight: 500, ...SV }}
              >
                No articles found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}