import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, ArrowRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Design tokens (StyloBliss rebrand palette)                         */
/* ------------------------------------------------------------------ */
const COLORS = {
  // Primary palette from brand guide
  mirage: '#191e49',        // Dark charcoal — header, text
  blazeOrange: '#bc269b',   // Vibrant orange — FAB, user bubbles, CTA
  blazeOrangeHover: '#921185',
  deepSea: '#bc269b',       // Deep teal — avatar, accents
  wildSand: '#fcfafa',      // Light blue-gray — canvas, chat body

  // Derived tokens
  dark: '#191e49',
  white: '#FFFFFF',
  textMuted: 'rgba(25, 30, 73, 0.50)',
  textLight: 'rgba(252, 250, 250, 0.75)',
  border: 'rgba(25, 30, 73, 0.10)',
  warmBg: '#EDF4F6',        // Slightly lighter Wild Sand for hovers
};

const FONT = 'tt-commons-pro, sans-serif';
const MONO = 'tt-commons-mono, monospace';

/* ------------------------------------------------------------------ */
/*  Quick-action prompts                                               */
/* ------------------------------------------------------------------ */
const QUICK_ACTIONS = [
  { label: 'Book a demo', icon: '📅', response: "I'd love to set up a personalized demo for you! You can pick a time that works best — our team will walk you through everything StyloBliss can do for your salon or spa. Would you like me to take you to the booking page?" },
  { label: 'See pricing', icon: '💰', response: "Great question! StyloBliss offers flexible plans designed for salons and spas of every size — from solo stylists to multi-location businesses. Shall I walk you through the options, or would you prefer to visit our pricing page directly?" },
  { label: 'How it works', icon: '✨', response: "StyloBliss is an all-in-one platform that handles scheduling, payments, client management, and marketing — beautifully designed and lightning-fast on every device. It's built from the ground up for beauty & wellness professionals who demand better. Want to know more about a specific feature?" },
];

/* ------------------------------------------------------------------ */
/*  Simulated AI responses                                             */
/* ------------------------------------------------------------------ */
const AI_RESPONSES: Record<string, string> = {
  pricing: "Our plans start at $165/mo for solo professionals and scale with your team. Every plan includes unlimited clients, online booking, and 24/7 support. Want me to show you the full breakdown?",
  demo: "Absolutely! Our demos are personalized to your business type. A StyloBliss specialist will show you exactly how the platform fits your workflow. Ready to pick a time?",
  features: "StyloBliss includes scheduling, payments & POS, online booking, Express Booking™, client management, automated flows, campaigns, mobile apps, and so much more. What area interests you most?",
  salon: "StyloBliss is purpose-built for salons — from appointment booking to retail inventory, it handles everything so you can focus on your craft. Thousands of salons already trust us as their #1 platform.",
  spa: "Spas love StyloBliss for its seamless scheduling, memberships & packages management, and beautiful client-facing booking experience. It's the modern spa software you've been waiting for.",
  support: "We offer 24/7 support through chat, email, and phone. Our average response time is under 2 minutes. You're never alone with StyloBliss!",
  integrations: "StyloBliss integrates with the tools you already use — payment processors, marketing platforms, accounting software, and more. We're always adding new integrations based on customer feedback.",
};

function getAIResponse(message: string): string {
  const lower = message.toLowerCase();
  for (const [key, response] of Object.entries(AI_RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return "Hey there! 👋 Welcome to StyloBliss. I'm here to help you learn about our salon & spa platform. What would you like to know?";
  }
  if (lower.includes('trial') || lower.includes('free') || lower.includes('try')) {
    return "You can start a free trial right away — no credit card required! You'll get full access to every feature so you can see exactly how StyloBliss works for your business. Want me to get you started?";
  }
  if (lower.includes('thank')) {
    return "You're welcome! 😊 If you have any other questions about StyloBliss, I'm always here. Have a wonderful day!";
  }
  return "That's a great question! I'd love to help. For the most detailed answer, I can connect you with a StyloBliss specialist, or you can explore our FAQ and tutorials. What would you prefer?";
}

/* ------------------------------------------------------------------ */
/*  Message types                                                      */
/* ------------------------------------------------------------------ */
interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

/* ------------------------------------------------------------------ */
/*  Typing indicator                                                   */
/* ------------------------------------------------------------------ */
function TypingIndicator() {
  return (
    <div className="flex items-end gap-[10px] px-[24px] py-[4px]">
      <div
        className="w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0"
        style={{ background: COLORS.deepSea }}
      >
        <Sparkles size={14} color={COLORS.wildSand} />
      </div>
      <div
        className="px-[16px] py-[12px] rounded-[20px] rounded-bl-[6px] flex gap-[5px] items-center"
        style={{ background: COLORS.white, boxShadow: '0 1px 4px rgba(25,30,73,0.06)' }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-[6px] h-[6px] rounded-full"
            style={{ background: COLORS.blazeOrange }}
            animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Single message bubble                                              */
/* ------------------------------------------------------------------ */
function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex items-end gap-[10px] px-[24px] py-[4px] ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      {!isUser && (
        <div
          className="w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0"
          style={{ background: COLORS.deepSea }}
        >
          <Sparkles size={14} color={COLORS.wildSand} />
        </div>
      )}
      {/* Bubble */}
      <div
        className={`max-w-[75%] px-[16px] py-[11px] ${
          isUser
            ? 'rounded-[20px] rounded-br-[6px]'
            : 'rounded-[20px] rounded-bl-[6px]'
        }`}
        style={{
          background: isUser ? COLORS.blazeOrange : COLORS.white,
          color: isUser ? COLORS.white : COLORS.mirage,
          boxShadow: isUser ? 'none' : '0 1px 4px rgba(25,30,73,0.06)',
          fontFamily: FONT,
          fontSize: '14.5px',
          lineHeight: '21px',
        }}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Custom chat bubble SVG icon (converted from PNG)                   */
/* ------------------------------------------------------------------ */
function ChatBubbleIcon({ size = 24, color = '#FFFFFF' }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Rounded speech bubble body with bottom-left tail */}
      <path
        d="M4 7C4 4.79086 5.79086 3 8 3H24C26.2091 3 28 4.79086 28 7V19C28 21.2091 26.2091 23 24 23H13.5L8.5 27.5C7.5 28.4 6 27.7 6 26.3V23H8C5.79086 23 4 21.2091 4 19V7Z"
        fill={color}
      />
      {/* Three dots */}
      <circle cx="11" cy="13" r="1.8" fill={color === '#FFFFFF' ? '#bc269b' : '#FFFFFF'} />
      <circle cx="16" cy="13" r="1.8" fill={color === '#FFFFFF' ? '#bc269b' : '#FFFFFF'} />
      <circle cx="21" cy="13" r="1.8" fill={color === '#FFFFFF' ? '#bc269b' : '#FFFFFF'} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main chatbot widget                                                */
/* ------------------------------------------------------------------ */
export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi there! 👋 I'm the StyloBliss assistant. I can help you learn about our salon & spa platform, pricing, or set up a demo. How can I help?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen]);

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking
    const delay = 800 + Math.random() * 800;
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: getAIResponse(content),
        timestamp: new Date(),
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
      if (!isOpen) setHasUnread(true);
    }, delay);
  };

  const handleQuickAction = (action: typeof QUICK_ACTIONS[number]) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: action.label,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: action.response,
        timestamp: new Date(),
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const showQuickActions = messages.length === 1;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        zIndex: 99999,
        fontFamily: FONT,
      }}
      className="sm:bottom-[28px] sm:right-[28px]"
    >
      {/* ---- Chat card ---- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="absolute bottom-[76px] right-0 flex flex-col overflow-hidden"
            style={{
              width: 'min(380px, calc(100vw - 32px))',
              height: 'min(540px, calc(100vh - 140px))',
              borderRadius: '28px',
              background: COLORS.wildSand,
              boxShadow: '0 25px 70px rgba(25,30,73,0.18), 0 8px 24px rgba(25,30,73,0.08)',
              transformOrigin: 'bottom right',
            }}
          >
            {/* ---- Header ---- */}
            <div
              className="relative shrink-0 flex items-center justify-between px-[24px] py-[18px]"
              style={{
                background: COLORS.dark,
                minHeight: '72px',
              }}
            >
              {/* Subtle warm accent line at top */}
              
              <div className="flex items-center gap-[12px]">
                <div
                  className="w-[38px] h-[38px] rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(188, 38, 155, 0.2)' }}
                >
                  <Sparkles size={18} color={COLORS.blazeOrange} />
                </div>
                <div>
                  <div
                    style={{
                      color: COLORS.white,
                      fontSize: '16px',
                      fontWeight: 600,
                      lineHeight: '20px',
                      letterSpacing: '-0.2px',
                    }}
                  >
                    StyloBliss AI
                  </div>
                  <div
                    className="flex items-center gap-[6px]"
                    style={{
                      color: COLORS.textLight,
                      fontSize: '12.5px',
                      lineHeight: '16px',
                      fontFamily: MONO,
                    }}
                  >
                    <span
                      className="inline-block w-[7px] h-[7px] rounded-full"
                      style={{ background: '#3DD68C' }}
                    />
                    Always online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-[34px] h-[34px] rounded-full transition-colors"
                style={{ background: 'rgba(255,255,255,0.08)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
              >
                <X size={17} color="rgba(255,255,255,0.7)" />
              </button>
            </div>

            {/* ---- Messages area ---- */}
            <div
              className="flex-1 overflow-y-auto py-[16px]"
              style={{
                background: COLORS.wildSand,
                scrollbarWidth: 'thin',
                scrollbarColor: `${COLORS.deepSea}30 transparent`,
              }}
            >
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}

              {/* Quick actions after welcome */}
              {showQuickActions && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="flex flex-col gap-[8px] px-[24px] pt-[12px] pl-[64px]"
                >
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => handleQuickAction(action)}
                      className="flex items-center gap-[10px] px-[16px] py-[10px] rounded-[16px] text-left transition-all group"
                      style={{
                        background: COLORS.white,
                        border: `1.5px solid ${COLORS.border}`,
                        fontSize: '13.5px',
                        lineHeight: '18px',
                        color: COLORS.dark,
                        fontFamily: FONT,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = COLORS.blazeOrange;
                        e.currentTarget.style.background = COLORS.warmBg;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = COLORS.border;
                        e.currentTarget.style.background = COLORS.white;
                      }}
                    >
                      <span className="text-[16px]">{action.icon}</span>
                      <span style={{ fontWeight: 520 }}>{action.label}</span>
                      <ArrowRight
                        size={14}
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                        color={COLORS.blazeOrange}
                      />
                    </button>
                  ))}
                </motion.div>
              )}

              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* ---- Input area ---- */}
            <div
              className="shrink-0 px-[16px] py-[14px]"
              style={{
                background: COLORS.white,
                borderTop: `1px solid ${COLORS.border}`,
              }}
            >
              <form onSubmit={handleSubmit} className="flex items-center gap-[10px]">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask anything about StyloBliss..."
                  className="flex-1 bg-transparent outline-none placeholder:text-[rgba(3,19,38,0.35)]"
                  style={{
                    fontFamily: FONT,
                    fontSize: '14.5px',
                    lineHeight: '20px',
                    color: COLORS.dark,
                    padding: '10px 16px',
                    background: COLORS.wildSand,
                    borderRadius: '16px',
                    border: 'none',
                  }}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="flex items-center justify-center w-[42px] h-[42px] rounded-full shrink-0 transition-all"
                  style={{
                    background: inputValue.trim() ? COLORS.blazeOrange : 'rgba(25,30,73,0.08)',
                    cursor: inputValue.trim() ? 'pointer' : 'default',
                  }}
                  onMouseEnter={(e) => {
                    if (inputValue.trim()) e.currentTarget.style.background = COLORS.blazeOrangeHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = inputValue.trim()
                      ? COLORS.blazeOrange
                      : 'rgba(25,30,73,0.08)';
                  }}
                >
                  <Send
                    size={17}
                    color={inputValue.trim() ? COLORS.white : 'rgba(25,30,73,0.25)'}
                    style={{ marginLeft: '1px' }}
                  />
                </button>
              </form>
              <div
                className="text-center pt-[8px]"
                style={{
                  fontSize: '11px',
                  color: COLORS.textMuted,
                  fontFamily: MONO,
                  letterSpacing: '0.3px',
                }}
              >
                Powered by StyloBliss AI
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- FAB Button ---- */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex items-center justify-center w-[60px] h-[60px] rounded-full shadow-lg"
        style={{
          background: COLORS.blazeOrange,
          boxShadow: `0 8px 30px rgba(188, 38, 155, 0.35), 0 2px 8px rgba(188, 38, 155, 0.2)`,
          border: 'none',
          cursor: 'pointer',
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} color={COLORS.white} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChatBubbleIcon size={26} color={COLORS.white} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        <AnimatePresence>
          {hasUnread && !isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-[2px] -right-[2px] w-[18px] h-[18px] rounded-full flex items-center justify-center"
              style={{
                background: COLORS.deepSea,
                border: `2px solid ${COLORS.white}`,
                fontSize: '10px',
                fontWeight: 700,
                color: COLORS.white,
              }}
            >
              1
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring when closed */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: `2px solid ${COLORS.blazeOrange}`,
            }}
            animate={{
              scale: [1, 1.5],
              opacity: [0.4, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeOut',
            }}
          />
        )}
      </motion.button>
    </div>
  );
}