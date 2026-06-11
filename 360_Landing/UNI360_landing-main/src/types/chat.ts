export type LeadStep = "NONE" | "ASK_NAME" | "ASK_WHATSAPP" | "COMPLETED";

export interface LeadData {
  name: string;
  whatsapp: string;
  country: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  /** For bot messages that include interactive elements */
  type?: "text" | "country-selection" | "counseling-question" | "counseling-complete" | "lead-capture";
  /** Counseling step if this is a counseling flow message */
  counselingStep?: CounselingStep;
}

export interface CountryConfig {
  code: string;
  name: string;
  flag: string;
  description: string;
  /** AI confirmation message shown after user selects this country */
  confirmationMessage: string;
  /** Topics the AI can help with for this country */
  topics: string[];
}

export type CounselingStep =
  | "qualification"
  | "budget"
  | "language"
  | "pr-interest"
  | "complete";

export interface CounselingOption {
  value: string;
  label: string;
}

export interface CounselingQuestion {
  step: CounselingStep;
  question: string;
  options: CounselingOption[];
}

export interface ChatState {
  messages: ChatMessage[];
  selectedCountry: string | null;
  isCounseling: boolean;
  counselingAnswers: Partial<Record<CounselingStep, string>>;
  currentCounselingStep: CounselingStep | null;
  hasOpened: boolean;
  /** Lead capture state */
  leadCaptured: boolean;
  leadStep: LeadStep;
  leadData: Partial<LeadData>;
  /** Counters to trigger lead capture after N replies */
  botReplyCount: number;
  userMessageCount: number;
  /** Loading state while waiting for AI response */
  isAwaitingReply: boolean;
}
