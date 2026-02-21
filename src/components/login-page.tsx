import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import svgPaths from '../imports/svg-92iqr9gc5w';
import imgContainer from "@/assets/login-bg-warm.png";

/* ------------------------------------------------------------------ */
/*  Design tokens                                                      */
/* ------------------------------------------------------------------ */
const C = {
  blazeOrange: '#bc269b',
  blazeOrangeHover: '#921185',
  mirage: '#191e49',
  deepSea: '#bc269b',
  white: '#FFFFFF',
  muted: 'rgba(25, 30, 73, 0.45)',
  mutedHalf: 'rgba(25, 30, 73, 0.5)',
  border: 'rgba(25, 30, 73, 0.12)',
  inputBorder: 'rgba(25, 30, 73, 0.15)',
  tagBg: 'rgba(255, 255, 255, 0.2)',
  tagBorder: 'rgba(255, 255, 255, 0.18)',
  decor1: 'rgba(255, 255, 255, 0.04)',
  decor2: 'rgba(255, 255, 255, 0.03)',
  backBg: 'rgba(255, 255, 255, 0.18)',
};

const FONT = 'tt-commons-pro, sans-serif';
const MONO = 'tt-commons-mono, monospace';

/* ------------------------------------------------------------------ */
/*  Testimonials data                                                  */
/* ------------------------------------------------------------------ */
const TESTIMONIALS = [
  {
    quote: 'I was able to reduce the time taken to manage appointments by 45% using the platform.',
    name: 'Angela Kim',
    role: 'Owner, Lumiere Beauty Studio',
    tags: ['Salon management', 'Scheduling'],
  },
  {
    quote: 'StyloBliss transformed our booking flow — clients love the seamless experience and we save hours every week.',
    name: 'Marcus Chen',
    role: 'Director, Bloom Wellness Spa',
    tags: ['Online booking', 'Client experience'],
  },
  {
    quote: 'The payments and POS system is incredibly smooth. Our checkout time dropped by 60% overnight.',
    name: 'Priya Sharma',
    role: 'Founder, Glow Skincare Studio',
    tags: ['Payments', 'Point of sale'],
  },
];

/* ------------------------------------------------------------------ */
/*  Inline SVG icon components using Figma-imported paths              */
/* ------------------------------------------------------------------ */
function BoltIcon() {
  return (
    <svg width="19" height="21" viewBox="0 0 18.7334 20.6068" fill="none" className="block">
      <path
        d={svgPaths.pf86ca40}
        fill="#bc269b"
        stroke="#bc269b"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.405"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 16.8601 16.8601" fill="none" className="block">
      <path
        d={svgPaths.p27260300}
        stroke="#191e49"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.45"
        strokeWidth="1.405"
      />
      <path
        d={svgPaths.p3001e370}
        stroke="#191e49"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.45"
        strokeWidth="1.405"
      />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" className="block">
      <path
        d="M2.1 2.1l12.8 12.8M6.9 7.05a2.2 2.2 0 003.05 3.05"
        stroke="#191e49"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.45"
        strokeWidth="1.4"
      />
      <path
        d="M1.4 8.5c.6-1.4 1.5-2.5 2.7-3.4M14.6 8.5c-.6 1.4-1.5 2.5-2.7 3.4M5.5 13a8 8 0 003 .5c3.5 0 5.8-2.2 7.1-5a8 8 0 00-.8-1.3M1.4 8.5a8 8 0 01.8-1.3"
        stroke="#191e49"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.45"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 18.7334 18.7334" fill="none" className="block">
      <path d={svgPaths.p24659480} fill="#4285F4" />
      <path d={svgPaths.p1034200} fill="#34A853" />
      <path d={svgPaths.p1131c3c0} fill="#FBBC05" />
      <path d={svgPaths.p27e37790} fill="#EA4335" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="10" height="19" viewBox="0 0 10.3034 18.7334" fill="none" className="block">
      <path d={svgPaths.pf5c14c0} fill="#1877F2" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="17" height="19" viewBox="0 0 16.8601 18.7334" fill="none" className="block">
      <path d={svgPaths.pd684e00} fill="#191e49" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="block">
      <path
        d="M11.25 13.5L6.75 9L11.25 4.5"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="block">
      <path
        d="M4.16667 10H15.8333"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d={svgPaths.p1ae0b780}
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Login Page                                                    */
/* ------------------------------------------------------------------ */
export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const currentTestimonial = TESTIMONIALS[testimonialIdx];

  const nextTestimonial = () =>
    setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length);
  const prevTestimonial = () =>
    setTestimonialIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setError('This is a demo — login is not connected to a backend.');
    }, 1400);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-y-auto"
      style={{ background: C.blazeOrange, fontFamily: FONT }}
    >
      {/* ── Decorative bg circles ── */}
      <div
        className="absolute pointer-events-none rounded-[300px] hidden sm:block"
        style={{ width: 600, height: 600, background: C.decor1, top: -200, right: -100 }}
      />
      <div
        className="absolute pointer-events-none rounded-[200px] hidden sm:block"
        style={{ width: 400, height: 400, background: C.decor2, bottom: -150, left: -80 }}
      />

      {/* ── Back to home ── */}
      {/* ── Back to home ── */}
      <Link
        to="/"
        className="absolute top-[20px] left-[20px] lg:top-[32px] lg:left-[36px] z-20 flex items-center gap-[8px] group"
        style={{ textDecoration: 'none', color: C.white, fontSize: '15px', fontWeight: 500 }}
      >
        <div
          className="w-[36px] h-[36px] rounded-full flex items-center justify-center transition-colors"
          style={{ background: C.backBg }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.32)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = C.backBg)}
        >
          <ChevronLeftIcon />
        </div>
        <span className="opacity-80 group-hover:opacity-100 transition-opacity hidden sm:inline">Back to home</span>
      </Link>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  White outer wrapper (holds both cards)                        */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 flex flex-col lg:flex-row lg:gap-[28px] xl:gap-[37px] lg:items-stretch p-[8px] sm:p-[12px] lg:p-[20px] mx-[10px] sm:mx-4 my-[72px] sm:my-[80px] lg:my-0 max-w-full lg:max-w-[1080px] rounded-[28px] sm:rounded-[36px] lg:rounded-[43px]"
        style={{
          background: C.white,
          boxShadow: '0 40px 100px rgba(0,0,0,0.10)',
        }}
      >
        {/* ─────────────────────────────────────────── */}
        {/*  LEFT — Login form card                     */}
        {/* ─────────────────────────────────────────── */}
        <div
          className="flex flex-col relative w-full lg:w-[500px] xl:w-[537px] shrink-0"
          style={{
            background: C.white,
            borderRadius: '30px',
          }}
        >
          {/* ── Header: icon + heading + subtitle ── */}
          <div className="px-[24px] pt-[28px] sm:px-[32px] sm:pt-[36px] lg:pl-[41px] lg:pr-[41px] lg:pt-[45px]">
            {/* Lightning bolt icon */}
            <div
              className="flex items-center justify-center mb-[20px] sm:mb-[26px]"
              style={{
                width: '37.5px',
                height: '37.5px',
                borderRadius: '11px',
                background: 'rgba(188,38,155,0.1)',
              }}
            >
              <BoltIcon />
            </div>

            <h1
              className="text-[26px] sm:text-[30px]"
              style={{
                fontWeight: 700,
                color: C.mirage,
                letterSpacing: '-0.56px',
                lineHeight: '34px',
                margin: 0,
              }}
            >
              Login to your account
            </h1>
            <div className="mt-[8px]" style={{ color: C.muted, fontSize: '15px', lineHeight: '20.6px' }}>
              <p style={{ margin: 0 }}>Start exploring and managing all the tools</p>
              <p style={{ margin: 0 }}>that help elevate your salon &amp; spa.</p>
            </div>
          </div>

          {/* ── Form fields ── */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col px-[24px] sm:px-[32px] lg:px-[41px] mt-[24px] sm:mt-[30px]"
            style={{ width: '100%' }}
          >
            {/* Email */}
            <div className="flex flex-col gap-[6.5px] mb-[21px]">
              <label
                style={{ fontSize: '16px', fontWeight: 700, color: C.mirage, lineHeight: '19px' }}
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full outline-none"
                  style={{
                    fontFamily: FONT,
                    fontSize: '16px',
                    color: C.mirage,
                    lineHeight: '22px',
                    padding: '11px 0',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: `1.4px solid ${C.inputBorder}`,
                    borderRadius: 0,
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = C.blazeOrange)}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = C.inputBorder)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-[6.5px]">
              <label
                style={{ fontSize: '16px', fontWeight: 700, color: C.mirage, lineHeight: '19px' }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full outline-none"
                  style={{
                    fontFamily: FONT,
                    fontSize: '16px',
                    color: C.mirage,
                    lineHeight: '22px',
                    padding: '11px 36px 11px 0',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: `1.4px solid ${C.inputBorder}`,
                    borderRadius: 0,
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = C.blazeOrange)}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = C.inputBorder)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 14 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="rounded-[14px] px-[16px] py-[10px] overflow-hidden"
                  style={{
                    background: error.includes('demo')
                      ? 'rgba(188,38,155,0.08)'
                      : 'rgba(188,38,155,0.08)',
                    color: error.includes('demo') ? C.deepSea : C.blazeOrange,
                    fontSize: '13px',
                    fontWeight: 500,
                    lineHeight: '19px',
                  }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center overflow-hidden mt-[24px]"
              style={{
                height: '49px',
                background: C.blazeOrange,
                color: C.white,
                fontFamily: FONT,
                fontSize: '15px',
                fontWeight: 700,
                letterSpacing: '-0.09px',
                lineHeight: '22.5px',
                border: 'none',
                borderRadius: '47px',
                cursor: isSubmitting ? 'wait' : 'pointer',
                opacity: isSubmitting ? 0.85 : 1,
                width: '100%',
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.background = C.blazeOrangeHover; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = C.blazeOrange; }}
            >
              {isSubmitting ? (
                <motion.div
                  className="w-[20px] h-[20px] rounded-full"
                  style={{ border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: C.white }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                />
              ) : (
                'Login'
              )}
            </motion.button>
          </form>

          {/* ── OR divider ── */}
          <div className="flex items-center gap-[15px] px-[24px] sm:px-[32px] lg:px-[41px] mt-[20px] sm:mt-[24px]">
            <div className="flex-1 h-[0.94px]" style={{ background: C.border }} />
            <span style={{ fontSize: '12px', fontWeight: 500, color: C.muted, letterSpacing: '0.19px' }}>
              OR
            </span>
            <div className="flex-1 h-[0.94px]" style={{ background: C.border }} />
          </div>

          {/* ── Social login buttons ── */}
          <div className="flex gap-[11px] justify-center mt-[18px] sm:mt-[20px]">
            {[
              { icon: <GoogleIcon />, key: 'google' },
              { icon: <FacebookIcon />, key: 'facebook' },
              { icon: <AppleIcon />, key: 'apple' },
            ].map(({ icon, key }) => (
              <button
                key={key}
                className="w-[60px] h-[44px] sm:w-[67px] sm:h-[47px] rounded-[13px] flex items-center justify-center transition-all relative"
                style={{ background: C.white, border: `1.4px solid ${C.border}`, cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(25,30,73,0.28)';
                  e.currentTarget.style.background = 'rgba(25,30,73,0.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.background = C.white;
                }}
              >
                {icon}
              </button>
            ))}
          </div>

          {/* ── Bottom link ── */}
          <p
            className="text-center mt-[18px] sm:mt-[22px] pb-[28px] sm:pb-[32px] lg:pb-[10px]"
            style={{ fontSize: '13px', color: C.muted, fontWeight: 460, lineHeight: '19px' }}
          >
            Don't have an account?{' '}
            <Link
              to="/demo"
              style={{ color: C.blazeOrange, fontWeight: 700, textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              Start free trial
            </Link>
          </p>
        </div>

        {/* ─────────────────────────────────────────── */}
        {/*  RIGHT — Testimonial card                   */}
        {/* ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden lg:flex flex-col flex-1 min-w-0 overflow-hidden"
          style={{
            maxWidth: '460px',
            minHeight: '580px',
            borderRadius: '38px',
            background: C.white,
          }}
        >
          {/* Image area with gradient overlay */}
          <div
            className="relative flex-1 overflow-hidden m-[12px] mb-0"
            style={{ borderRadius: '24px' }}
          >
            <img
              src={imgContainer}
              alt="Warm abstract gradient"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ borderRadius: '24px' }}
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                borderRadius: '24px',
                background:
                  'linear-gradient(to top, rgba(25,30,73,0.7) 0%, rgba(25,30,73,0.15) 40%, rgba(0,0,0,0) 60%)',
              }}
            />

            {/* Tags + Quote — bottom of image */}
            <div className="absolute bottom-0 left-0 right-0 p-[20px] flex flex-col gap-[17px]">
              {/* Tags */}
              <div className="flex gap-[9.5px]">
                <AnimatePresence mode="wait">
                  {currentTestimonial.tags.map((tag) => (
                    <motion.span
                      key={`${tag}-${testimonialIdx}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="px-[15px] py-[7px] rounded-full"
                      style={{
                        background: C.tagBg,
                        backdropFilter: 'blur(12px)',
                        color: C.white,
                        fontSize: '14px',
                        fontWeight: 500,
                        letterSpacing: '0.12px',
                        lineHeight: '21px',
                        border: `1.2px solid ${C.tagBorder}`,
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>

              {/* Quote */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={testimonialIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    color: C.white,
                    fontSize: '21px',
                    fontWeight: 700,
                    lineHeight: '31px',
                    letterSpacing: '-0.24px',
                    margin: 0,
                    maxWidth: '366px',
                  }}
                >
                  {currentTestimonial.quote}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom bar: Author info + navigation arrows */}
          <div className="flex items-center justify-between px-[20px]" style={{ height: '87px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  style={{
                    fontSize: '17px',
                    fontWeight: 700,
                    color: C.mirage,
                    lineHeight: '21px',
                  }}
                >
                  {currentTestimonial.name}
                </div>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 400,
                    color: C.muted,
                    lineHeight: '20px',
                    marginTop: '2px',
                    fontFamily: MONO,
                  }}
                >
                  {currentTestimonial.role}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-[9.5px]">
              {/* Prev — empty circle (matches Figma) */}
              <button
                onClick={prevTestimonial}
                className="rounded-full flex items-center justify-center transition-all"
                style={{
                  width: '45px',
                  height: '45px',
                  background: 'transparent',
                  border: `1.77px solid ${C.mirage}`,
                  cursor: 'pointer',
                  transform: 'rotate(180deg)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(25,30,73,0.06)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <ArrowRightIcon />
              </button>
              {/* Next — circle with arrow icon */}
              <button
                onClick={nextTestimonial}
                className="rounded-full flex items-center justify-center transition-all"
                style={{
                  width: '45px',
                  height: '45px',
                  background: 'transparent',
                  border: `1.77px solid ${C.mirage}`,
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(25,30,73,0.06)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}