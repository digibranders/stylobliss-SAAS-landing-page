/**
 * chatbot-widget.js
 * StyloBliss — Chatbot widget open/close, message sending, typing indicator,
 * and simulated AI responses. Mirrors src/components/chatbot-widget.tsx.
 *
 * @module chatbot-widget
 */

'use strict';

/* ─── AI Response Lookup ──────────────────────────────────────────────────────── */

/** @type {Record<string, string>} */
const AI_RESPONSE_MAP = {
  pricing: "Our plans start at $165/mo for solo professionals and scale with your team. Every plan includes unlimited clients, online booking, and 24/7 support. Want me to show you the full breakdown?",
  demo: "Absolutely! Our demos are personalized to your business type. A StyloBliss specialist will show you exactly how the platform fits your workflow. Ready to pick a time?",
  features: "StyloBliss includes scheduling, payments & POS, online booking, Express Booking™, client management, automated flows, campaigns, mobile apps, and so much more. What area interests you most?",
  salon: "StyloBliss is purpose-built for salons — from appointment booking to retail inventory, it handles everything so you can focus on your craft. Thousands of salons already trust us as their #1 platform.",
  spa: "Spas love StyloBliss for its seamless scheduling, memberships & packages management, and beautiful client-facing booking experience. It's the modern spa software you've been waiting for.",
  support: "We offer 24/7 support through chat, email, and phone. Our average response time is under 2 minutes. You're never alone with StyloBliss!",
  integrations: "StyloBliss integrates with the tools you already use — payment processors, marketing platforms, accounting software, and more. We're always adding new integrations based on customer feedback.",
};

/**
 * Returns a simulated AI response for the given user message.
 * @param {string} userMessage
 * @returns {string}
 */
function generateAiResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  for (const [keyword, responseText] of Object.entries(AI_RESPONSE_MAP)) {
    if (lowerMessage.includes(keyword)) return responseText;
  }

  if (/hello|hi\b|hey/.test(lowerMessage)) {
    return "Hey there! 👋 Welcome to StyloBliss. I'm here to help you learn about our salon & spa platform. What would you like to know?";
  }
  if (/trial|free|try/.test(lowerMessage)) {
    return "You can start a free trial right away — no credit card required! You'll get full access to every feature so you can see exactly how StyloBliss works for your business. Want me to get you started?";
  }
  if (/thank/.test(lowerMessage)) {
    return "You're welcome! 😊 If you have any other questions about StyloBliss, I'm always here. Have a wonderful day!";
  }
  return "That's a great question! I'd love to help. For the most detailed answer, I can connect you with a StyloBliss specialist, or you can explore our FAQ and tutorials. What would you prefer?";
}

/* ─── DOM Helpers ────────────────────────────────────────────────────────────── */

/**
 * Builds and appends a new message bubble to the chat messages container.
 * @param {'assistant' | 'user'} role
 * @param {string} content
 * @param {HTMLElement} messagesContainer
 */
function appendChatMessage(role, content, messagesContainer) {
  const isUser = role === 'user';

  const rowEl = document.createElement('div');
  rowEl.className = `chatbot-widget__message-row${isUser ? ' chatbot-widget__message-row--user' : ''}`;
  rowEl.setAttribute('data-message-role', role);

  if (!isUser) {
    const avatarEl = document.createElement('div');
    avatarEl.className = 'chatbot-widget__message-avatar';
    avatarEl.setAttribute('aria-hidden', 'true');
    avatarEl.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgb(252,250,250)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    rowEl.appendChild(avatarEl);
  }

  const bubbleEl = document.createElement('div');
  bubbleEl.className = `chatbot-widget__message-bubble chatbot-widget__message-bubble--${role}`;
  bubbleEl.textContent = content;
  rowEl.appendChild(bubbleEl);

  messagesContainer.appendChild(rowEl);
  rowEl.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

/**
 * Shows the typing indicator in the messages container.
 * @param {HTMLElement} messagesContainer
 * @returns {HTMLElement} the typing row element (to remove later)
 */
function showTypingIndicator(messagesContainer) {
  const typingRowEl = document.createElement('div');
  typingRowEl.className = 'chatbot-widget__typing-row';
  typingRowEl.id = 'chatbot-typing-indicator';

  const avatarEl = document.createElement('div');
  avatarEl.className = 'chatbot-widget__message-avatar';
  avatarEl.setAttribute('aria-hidden', 'true');
  avatarEl.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgb(252,250,250)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  typingRowEl.appendChild(avatarEl);

  const bubbleEl = document.createElement('div');
  bubbleEl.className = 'chatbot-widget__typing-bubble';
  for (let dotIndex = 0; dotIndex < 3; dotIndex++) {
    const dotEl = document.createElement('div');
    dotEl.className = 'chatbot-widget__typing-dot';
    bubbleEl.appendChild(dotEl);
  }
  typingRowEl.appendChild(bubbleEl);

  messagesContainer.appendChild(typingRowEl);
  typingRowEl.scrollIntoView({ behavior: 'smooth', block: 'end' });
  return typingRowEl;
}

/**
 * Removes the typing indicator from the DOM.
 * @param {HTMLElement} typingRowEl
 */
function hideTypingIndicator(typingRowEl) {
  if (typingRowEl && typingRowEl.parentNode) {
    typingRowEl.parentNode.removeChild(typingRowEl);
  }
}

/* ─── Send Message Flow ──────────────────────────────────────────────────────── */

/**
 * Handles sending a user message and showing the AI response after a delay.
 * @param {string} messageText
 * @param {HTMLElement} messagesContainer
 * @param {HTMLElement} quickActionsEl
 * @param {HTMLInputElement} inputEl
 * @param {HTMLButtonElement} sendBtnEl
 */
function sendChatMessage(messageText, messagesContainer, quickActionsEl, inputEl, sendBtnEl) {
  if (!messageText.trim()) return;

  // Hide quick actions after first user message
  if (quickActionsEl) {
    quickActionsEl.style.display = 'none';
  }

  // Append user bubble
  appendChatMessage('user', messageText.trim(), messagesContainer);

  // Clear input and reset send button
  if (inputEl) inputEl.value = '';
  updateSendButtonState(sendBtnEl, false);

  // Show typing indicator
  const typingIndicatorEl = showTypingIndicator(messagesContainer);

  // Simulate AI thinking delay: 800ms + random 0-800ms
  const thinkingDelayMs = 800 + Math.random() * 800;
  setTimeout(() => {
    hideTypingIndicator(typingIndicatorEl);
    const responseText = generateAiResponse(messageText);
    appendChatMessage('assistant', responseText, messagesContainer);
  }, thinkingDelayMs);
}

/**
 * Updates the send button appearance based on whether input has text.
 * @param {HTMLButtonElement} sendBtnEl
 * @param {boolean} hasText
 */
function updateSendButtonState(sendBtnEl, hasText) {
  if (!sendBtnEl) return;
  const iconEl = sendBtnEl.querySelector('svg');
  if (hasText) {
    sendBtnEl.classList.add('chatbot-widget__send-btn--active');
    if (iconEl) iconEl.setAttribute('stroke', 'rgb(252,250,250)');
  } else {
    sendBtnEl.classList.remove('chatbot-widget__send-btn--active');
    if (iconEl) iconEl.setAttribute('stroke', 'rgba(25,30,73,0.25)');
  }
}

/* ─── Widget Open/Close ──────────────────────────────────────────────────────── */

/**
 * Opens the chatbot panel.
 * @param {HTMLElement} cardEl
 * @param {HTMLElement} fabBtnEl
 * @param {HTMLElement} unreadBadgeEl
 * @param {HTMLElement} openIconEl
 * @param {HTMLElement} closeIconEl
 * @param {HTMLInputElement} inputEl
 */
function openChatbotWidget(cardEl, fabBtnEl, unreadBadgeEl, openIconEl, closeIconEl, inputEl) {
  if (!cardEl) return;
  cardEl.classList.add('chatbot-widget__card--open');
  if (fabBtnEl) fabBtnEl.setAttribute('aria-expanded', 'true');
  if (unreadBadgeEl) unreadBadgeEl.classList.remove('chatbot-widget__unread-badge--visible');

  // Swap FAB icon
  if (openIconEl) {
    openIconEl.classList.remove('chatbot-widget__fab-icon--visible');
    openIconEl.classList.add('chatbot-widget__fab-icon--hidden');
  }
  if (closeIconEl) {
    closeIconEl.classList.remove('chatbot-widget__fab-icon--hidden');
    closeIconEl.classList.add('chatbot-widget__fab-icon--visible');
  }

  // Focus input after animation
  setTimeout(() => {
    if (inputEl) inputEl.focus();
  }, 350);
}

/**
 * Closes the chatbot panel.
 * @param {HTMLElement} cardEl
 * @param {HTMLElement} fabBtnEl
 * @param {HTMLElement} openIconEl
 * @param {HTMLElement} closeIconEl
 */
function closeChatbotWidget(cardEl, fabBtnEl, openIconEl, closeIconEl) {
  if (!cardEl) return;
  cardEl.classList.remove('chatbot-widget__card--open');
  if (fabBtnEl) fabBtnEl.setAttribute('aria-expanded', 'false');

  // Swap FAB icon back
  if (openIconEl) {
    openIconEl.classList.remove('chatbot-widget__fab-icon--hidden');
    openIconEl.classList.add('chatbot-widget__fab-icon--visible');
  }
  if (closeIconEl) {
    closeIconEl.classList.remove('chatbot-widget__fab-icon--visible');
    closeIconEl.classList.add('chatbot-widget__fab-icon--hidden');
  }
}

/* ─── Main init ──────────────────────────────────────────────────────────────── */

/**
 * Initializes the chatbot widget.
 */
function initChatbotWidget() {
  const widgetEl = document.getElementById('chatbot-widget');
  if (!widgetEl) return;

  const cardEl = document.getElementById('chatbot-card');
  const fabBtnEl = document.getElementById('chatbot-fab-btn');
  const closeBtnEl = document.getElementById('chatbot-close-btn');
  const messagesContainerEl = document.getElementById('chatbot-messages');
  const quickActionsEl = document.getElementById('chatbot-quick-actions');
  const formEl = document.getElementById('chatbot-form');
  const inputEl = document.getElementById('chatbot-input');
  const sendBtnEl = document.getElementById('chatbot-send-btn');
  const unreadBadgeEl = document.getElementById('chatbot-unread-badge');
  const openIconEl = document.getElementById('chatbot-fab-icon-open');
  const closeIconEl = document.getElementById('chatbot-fab-icon-close');

  let isOpen = false;

  // FAB click: toggle open/close
  if (fabBtnEl) {
    fabBtnEl.addEventListener('click', () => {
      isOpen = !isOpen;
      if (isOpen) {
        openChatbotWidget(cardEl, fabBtnEl, unreadBadgeEl, openIconEl, closeIconEl, inputEl);
      } else {
        closeChatbotWidget(cardEl, fabBtnEl, openIconEl, closeIconEl);
      }
    });
  }

  // Close button click
  if (closeBtnEl) {
    closeBtnEl.addEventListener('click', () => {
      isOpen = false;
      closeChatbotWidget(cardEl, fabBtnEl, openIconEl, closeIconEl);
    });
  }

  // Form submit
  if (formEl && inputEl) {
    formEl.addEventListener('submit', (event) => {
      event.preventDefault();
      sendChatMessage(inputEl.value, messagesContainerEl, quickActionsEl, inputEl, sendBtnEl);
    });
  }

  // Input change: update send button state
  if (inputEl && sendBtnEl) {
    inputEl.addEventListener('input', () => {
      updateSendButtonState(sendBtnEl, inputEl.value.trim().length > 0);
    });
  }

  // Quick action buttons
  if (quickActionsEl) {
    quickActionsEl.addEventListener('click', (event) => {
      const quickActionBtn = event.target.closest('.chatbot-widget__quick-action-btn');
      if (!quickActionBtn) return;

      const actionLabel = quickActionBtn.getAttribute('data-quick-action');
      const actionResponse = quickActionBtn.getAttribute('data-quick-response');

      if (!actionLabel || !actionResponse) return;

      // Hide quick actions
      quickActionsEl.style.display = 'none';

      // Append user message with action label
      appendChatMessage('user', actionLabel, messagesContainerEl);

      // Show typing then response
      const typingIndicatorEl = showTypingIndicator(messagesContainerEl);
      setTimeout(() => {
        hideTypingIndicator(typingIndicatorEl);
        appendChatMessage('assistant', actionResponse, messagesContainerEl);
      }, 900);
    });
  }
}

export { initChatbotWidget };
