/**
 * chatbot-widget.js
 * Handles:
 * - Open/close the chatbot dialog panel
 * - Typing indicator animation
 * - Send message flow with simulated bot response
 */

const BOT_RESPONSE_DELAY_MS = 1200;
const TYPING_INDICATOR_DELAY_MS = 600;

const BOT_RESPONSES = [
  "Great question! StyloBliss is an all-in-one platform designed specifically for hair salons. Would you like to start a free trial?",
  "I'd be happy to help! Our Express Booking™ feature lets clients book in under 60 seconds. Shall I show you more?",
  "StyloBliss offers flexible pricing starting at $165/month. Would you like to see our full pricing page?",
  "Our platform includes calendar & scheduling, payments, client management, and more. What feature interests you most?",
  "You can get started with a free trial — no credit card required! Would you like me to help you sign up?",
];

let responseIndex = 0;

/**
 * Initialises the chatbot widget open/close and messaging behaviour.
 */
export function initChatbotWidget() {
  const trigger = document.getElementById('chatbot-trigger');
  const panel = document.getElementById('chatbot-panel');
  const closeBtn = document.getElementById('chatbot-close');
  const input = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');
  const messages = document.getElementById('chatbot-messages');
  const typingIndicator = document.getElementById('chatbot-typing');

  if (!trigger || !panel) return;

  let isOpen = false;

  // ── Open / close ─────────────────────────────────────────
  function openChat() {
    isOpen = true;
    panel.classList.add('open');
    trigger.classList.add('hidden');
    if (input) input.focus();
  }

  function closeChat() {
    isOpen = false;
    panel.classList.remove('open');
    trigger.classList.remove('hidden');
  }

  trigger.addEventListener('click', () => {
    if (isOpen) closeChat();
    else openChat();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeChat);
  }

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeChat();
    }
  });

  // ── Send message ──────────────────────────────────────────
  function sendMessage() {
    const text = input?.value?.trim();
    if (!text) return;

    appendMessage(text, 'user');
    input.value = '';

    showTypingIndicator();

    setTimeout(() => {
      hideTypingIndicator();
      const response = BOT_RESPONSES[responseIndex % BOT_RESPONSES.length];
      responseIndex++;
      appendMessage(response, 'bot');
    }, BOT_RESPONSE_DELAY_MS);
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
  }

  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // ── Message helpers ───────────────────────────────────────
  function appendMessage(text, role) {
    if (!messages) return;

    const wrapper = document.createElement('div');
    wrapper.className = `chatbot-msg chatbot-msg--${role}`;

    const bubble = document.createElement('div');
    bubble.className = 'chatbot-msg__bubble';
    bubble.textContent = text;

    wrapper.appendChild(bubble);
    messages.appendChild(wrapper);

    // Scroll to bottom
    messages.scrollTop = messages.scrollHeight;
  }

  function showTypingIndicator() {
    if (typingIndicator) {
      typingIndicator.classList.add('visible');
      if (messages) {
        messages.scrollTop = messages.scrollHeight;
      }
    }
  }

  function hideTypingIndicator() {
    if (typingIndicator) {
      typingIndicator.classList.remove('visible');
    }
  }
}
