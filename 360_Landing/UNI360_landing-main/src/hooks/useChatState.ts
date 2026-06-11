import { useState, useCallback, useRef } from "react";
import type {
  ChatMessage,
  ChatState,
  CounselingStep,
  LeadStep,
  LeadData,
} from "@/types/chat";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";
import {
  COUNTRIES,
  COUNSELING_QUESTIONS,
  getCountryByCode,
  getCounselingQuestion,
  getCounselingStepIndex,
  TOTAL_COUNSELING_STEPS,
} from "@/data/countries";

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  text: "Welcome to Uni360 AI.\n\nWhich country are you interested in?",
  isBot: true,
  timestamp: new Date(),
  type: "country-selection",
};

const COUNSELING_INTRO: ChatMessage = {
  id: "counseling-intro",
  text:
    "No problem! Let me help you find the best country for your studies.\n\n" +
    "I'll ask you a few quick questions to recommend the perfect destination.",
  isBot: true,
  timestamp: new Date(),
  type: "text",
};

function generateId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function createBotMessage(
  text: string,
  type: ChatMessage["type"] = "text",
  counselingStep?: CounselingStep
): ChatMessage {
  return {
    id: generateId(),
    text,
    isBot: true,
    timestamp: new Date(),
    type,
    counselingStep,
  };
}

function createUserMessage(text: string): ChatMessage {
  return {
    id: generateId(),
    text,
    isBot: false,
    timestamp: new Date(),
  };
}

const LEAD_TRIGGER_THRESHOLD = 2;

function validateWhatsApp(value: string): boolean {
  const cleaned = value.replace(/[\s\-()]/g, "");
  // Must start with + and have 8-15 digits
  return /^\+\d{8,15}$/.test(cleaned);
}

function formatWhatsAppForStorage(value: string): string {
  return value.replace(/[\s\-()]/g, "");
}

export function useChatState() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    selectedCountry: null,
    isCounseling: false,
    counselingAnswers: {},
    currentCounselingStep: null,
    hasOpened: false,
    leadCaptured: false,
    leadStep: "NONE",
    leadData: {},
    botReplyCount: 0,
    userMessageCount: 0,
    isAwaitingReply: false,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  /**
   * Initialize the chat with the welcome message and country buttons.
   * Called once when the chat opens for the first time.
   */
  const initializeChat = useCallback(() => {
    setState((prev) => {
      if (prev.hasOpened) return prev;
      return {
        ...prev,
        messages: [WELCOME_MESSAGE],
        hasOpened: true,
        leadCaptured: false,
        leadStep: "NONE",
        leadData: {},
        botReplyCount: 0,
        userMessageCount: 0,
      };
    });
    scrollToBottom();
  }, [scrollToBottom]);

  /**
   * Check if lead capture should be triggered.
   * Triggers after N bot replies sent OR N user messages received.
   */
  const maybeTriggerLeadCapture = useCallback(
    (newState: ChatState): ChatState => {
      if (newState.leadCaptured || newState.leadStep !== "NONE") return newState;
      if (newState.isCounseling) return newState; // Don't interrupt counseling

      const total = newState.botReplyCount + newState.userMessageCount;
      if (total < LEAD_TRIGGER_THRESHOLD) return newState;

      // Trigger lead capture
      const askNameMsg = createBotMessage(
        "Before we continue, I'd love to know who I'm chatting with! What's your full name?",
        "lead-capture"
      );

      return {
        ...newState,
        leadStep: "ASK_NAME",
        messages: [...newState.messages, askNameMsg],
      };
    },
    []
  );

  /**
   * Handle country selection. Adds user message + bot confirmation.
   * If "not-decided", starts the counseling flow instead.
   */
  const selectCountry = useCallback(
    (countryCode: string) => {
      if (countryCode === "not-decided") {
        startCounseling();
        return;
      }

      const country = getCountryByCode(countryCode);
      if (!country) return;

      const userMsg = createUserMessage(country.name);
      const botMsg = createBotMessage(country.confirmationMessage);

      setState((prev) => {
        const newState: ChatState = {
          ...prev,
          messages: [...prev.messages, userMsg, botMsg],
          selectedCountry: countryCode,
          botReplyCount: prev.botReplyCount + 1,
          userMessageCount: prev.userMessageCount + 1,
        };

        // Check if lead capture should trigger after country selection
        return maybeTriggerLeadCapture(newState);
      });

      scrollToBottom();
    },
    [scrollToBottom, maybeTriggerLeadCapture]
  );

  /**
   * Start the "Not Decided Yet" counseling flow.
   */
  const startCounseling = useCallback(() => {
    const userMsg = createUserMessage("Not Decided Yet");
    const firstQuestion = COUNSELING_QUESTIONS[0];
    const questionMsg = createBotMessage(
      firstQuestion.question,
      "counseling-question",
      firstQuestion.step
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMsg, COUNSELING_INTRO, questionMsg],
      isCounseling: true,
      currentCounselingStep: firstQuestion.step,
    }));

    scrollToBottom();
  }, [scrollToBottom]);

  /**
   * Answer a counseling question and either ask the next one or complete.
   */
  const answerCounseling = useCallback(
    (step: CounselingStep, answer: string, label: string) => {
      const userMsg = createUserMessage(label);
      const currentIndex = getCounselingStepIndex(step);
      const nextIndex = currentIndex + 1;

      if (nextIndex < TOTAL_COUNSELING_STEPS) {
        // Ask next question
        const nextQuestion = COUNSELING_QUESTIONS[nextIndex];
        const questionMsg = createBotMessage(
          nextQuestion.question,
          "counseling-question",
          nextQuestion.step
        );

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, userMsg, questionMsg],
          counselingAnswers: { ...prev.counselingAnswers, [step]: answer },
          currentCounselingStep: nextQuestion.step,
        }));
      } else {
        // Counseling complete — generate recommendations
        const answers = { ...state.counselingAnswers, [step]: answer };
        const completionMsg = createBotMessage(
          generateCounselingRecommendation(answers),
          "counseling-complete"
        );

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, userMsg, completionMsg],
          counselingAnswers: answers,
          currentCounselingStep: "complete",
        }));
      }

      scrollToBottom();
    },
    [state.counselingAnswers, scrollToBottom]
  );

  /**
   * Save the captured lead data locally and mark as complete.
   */
  const completeLeadCapture = useCallback(
    (prev: ChatState, leadData: Partial<LeadData>): ChatState => {
      const fullLead: LeadData = {
        name: leadData.name || "",
        whatsapp: leadData.whatsapp || "",
        country: prev.selectedCountry || "",
        timestamp: new Date().toISOString(),
      };

      console.log("📋 Lead captured:", JSON.stringify(fullLead, null, 2));

      // Submit lead to backend
      const countryName = fullLead.country
        ? getCountryByCode(fullLead.country)?.name || fullLead.country
        : "";

      fetch(`${API_BASE_URL}/public/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullLead.name,
          whatsapp: fullLead.whatsapp,
          country: countryName,
          source: "AI Chatbot",
          pageUrl: window.location.pathname,
        }),
      }).catch((err) => console.error("Lead submit failed:", err));

      const confirmMsg = createBotMessage(
        `Thanks, ${fullLead.name}! You're all set. Feel free to ask me anything about studying in ${countryName || "abroad"}.`
      );

      return {
        ...prev,
        leadStep: "COMPLETED",
        leadCaptured: true,
        leadData: fullLead,
        messages: [...prev.messages, confirmMsg],
      };
    },
    []
  );

  /**
   * Send a free-text message (after country is selected or counseling is done).
   * Also handles lead capture input if leadStep is active.
   */
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;
      const trimmed = text.trim();

      // Handle lead capture flow (synchronous, no API call)
      if (state.leadStep === "ASK_NAME") {
        const userMsg = createUserMessage(trimmed);
        const askWhatsappMsg = createBotMessage(
          `Nice to meet you, ${trimmed}! What's your WhatsApp number? We'll use it to share study tips and country updates.\n\nPlease include your country code (e.g., +91 98765 43210).`,
          "lead-capture"
        );
        setState((prev) => ({
          ...prev,
          leadStep: "ASK_WHATSAPP",
          leadData: { ...prev.leadData, name: trimmed },
          messages: [...prev.messages, userMsg, askWhatsappMsg],
          userMessageCount: prev.userMessageCount + 1,
        }));
        scrollToBottom();
        return;
      }

      if (state.leadStep === "ASK_WHATSAPP") {
        const userMsg = createUserMessage(trimmed);
        const isValid = validateWhatsApp(trimmed);

        if (isValid) {
          const formatted = formatWhatsAppForStorage(trimmed);
          setState((prev) =>
            completeLeadCapture(
              { ...prev, messages: [...prev.messages, userMsg], userMessageCount: prev.userMessageCount + 1 },
              { ...prev.leadData, whatsapp: formatted }
            )
          );
        } else {
          const retryMsg = createBotMessage(
            "That doesn't look like a valid WhatsApp number. Please enter it with your country code, like this:\n\n+1 555 123 4567\n+44 7700 900 123\n+91 98765 43210",
            "lead-capture"
          );
          setState((prev) => ({
            ...prev,
            messages: [...prev.messages, userMsg, retryMsg],
            userMessageCount: prev.userMessageCount + 1,
          }));
        }
        scrollToBottom();
        return;
      }

      // Normal flow — add user message, set loading, call backend API
      const userMsg = createUserMessage(trimmed);

      setState((prev) => {
        const withUserMsg: ChatState = {
          ...prev,
          messages: [...prev.messages, userMsg],
          userMessageCount: prev.userMessageCount + 1,
        };
        // Check lead trigger before sending to API
        const afterLead = maybeTriggerLeadCapture(withUserMsg);
        if (afterLead !== withUserMsg) return afterLead;

        return { ...withUserMsg, isAwaitingReply: true };
      });

      scrollToBottom();

      // Call backend DeepSeek API
      const country = state.selectedCountry || "";
      try {
        const res = await fetch(`${API_BASE_URL}/public/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country, message: trimmed }),
        });

        if (!res.ok) throw new Error(`API returned ${res.status}`);

        const data = await res.json();
        const answer = data.answer || "I'm sorry, I couldn't process that request.";

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, createBotMessage(answer)],
          botReplyCount: prev.botReplyCount + 1,
          isAwaitingReply: false,
        }));
      } catch (err) {
        console.error("Chat API error:", err);
        const fallbackMsg = createBotMessage(
          "I'm having trouble connecting right now. Please try again in a moment."
        );
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, fallbackMsg],
          isAwaitingReply: false,
        }));
      }

      scrollToBottom();
    },
    [state.leadStep, state.selectedCountry, scrollToBottom, maybeTriggerLeadCapture, completeLeadCapture]
  );

  /**
   * Reset the chat to initial state.
   */
  const resetChat = useCallback(() => {
    setState({
      messages: [],
      selectedCountry: null,
      isCounseling: false,
      counselingAnswers: {},
      currentCounselingStep: null,
      hasOpened: false,
      leadCaptured: false,
      leadStep: "NONE",
      leadData: {},
      botReplyCount: 0,
      userMessageCount: 0,
      isAwaitingReply: false,
    });
  }, []);

  return {
    state,
    messagesEndRef,
    initializeChat,
    selectCountry,
    answerCounseling,
    sendMessage,
    resetChat,
  };
}

/**
 * Generate a personalized recommendation based on counseling answers.
 */
function generateCounselingRecommendation(
  answers: Record<string, string>
): string {
  const qualification = answers.qualification || "";
  const budget = answers.budget || "";
  const language = answers.language || "";
  const prInterest = answers["pr-interest"] || "";

  const recommendations: string[] = [];

  // Budget-based filtering
  if (budget === "under-10k" || budget === "10k-20k") {
    recommendations.push(
      "🇩🇪 **Germany** — Near-zero tuition fees at public universities, only semester contributions (€100–€400)."
    );
    recommendations.push(
      "🇮🇹 **Italy** — Low tuition from €890/year with DSU scholarship opportunities."
    );
    recommendations.push(
      "🇫🇷 **France** — Very affordable tuition at public universities (€2,700–€3,800/year for EU rates)."
    );
  } else {
    recommendations.push(
      "🇬🇧 **UK** — Premium education with 1-year Master's and strong global recognition."
    );
    recommendations.push(
      "🇩🇪 **Germany** — Excellent value with near-zero tuition at public universities."
    );
    recommendations.push(
      "🇮🇹 **Italy** — Great balance of affordability and quality of life."
    );
    recommendations.push(
      "🇫🇷 **France** — World-class education with competitive tuition."
    );
  }

  // PR interest
  if (prInterest === "yes" || prInterest === "maybe") {
    recommendations.push(
      "\n\nFor PR pathways: **Germany** offers a fast track (24 months of pension contributions after qualified work). **UK** has the Graduate Route (2 years) leading to Skilled Worker Visa. **France** offers up to 24 months post-study visa for Master's graduates."
    );
  }

  // Language preference
  if (language === "english") {
    recommendations.push(
      "\n\nSince you prefer English: **UK** is fully English-speaking. **Germany**, **France**, and **Italy** also offer many English-taught programs, especially at Master's level."
    );
  }

  recommendations.push(
    "\n\nWould you like more details about any of these countries? Feel free to ask!"
  );

  return (
    "Based on your answers, here are my recommendations:\n\n" +
    recommendations.join("\n")
  );
}
