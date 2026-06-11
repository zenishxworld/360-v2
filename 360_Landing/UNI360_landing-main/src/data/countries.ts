import type { CountryConfig, CounselingQuestion } from "@/types/chat";

/**
 * Country configurations for the chat country selection flow.
 * To add a new country, simply add an entry to this array.
 * The UI will automatically pick up the new country.
 */
export const COUNTRIES: CountryConfig[] = [
  {
    code: "germany",
    name: "Germany",
    flag: "/germany logo.png",
    description: "World-renowned engineering and technology programs",
    confirmationMessage:
      "Great choice! I can help you with universities, admissions, scholarships, tuition fees, visas, accommodation, jobs, and post-study opportunities in Germany.\n\nGermany offers near-zero tuition at public universities, an 18-month post-study work visa, and strong industry links with companies like Siemens, SAP, and BMW.\n\nWhat would you like to know?",
    topics: [
      "Universities",
      "Admissions",
      "Scholarships",
      "Tuition Fees",
      "Visas",
      "Accommodation",
      "Jobs",
      "Post-Study Opportunities",
    ],
  },
  {
    code: "uk",
    name: "United Kingdom",
    flag: "/uk logo.png",
    description: "Prestigious universities with global recognition",
    confirmationMessage:
      "Great choice! I can help you with universities, admissions, scholarships, tuition fees, visas, accommodation, jobs, and post-study opportunities in the UK.\n\nUK universities offer world-class education with 1-year Master's programs, a Graduate Route visa for 2 years of post-study work, and a rich academic heritage.\n\nWhat would you like to know?",
    topics: [
      "Universities",
      "Admissions",
      "Scholarships",
      "Tuition Fees",
      "Visas",
      "Accommodation",
      "Jobs",
      "Post-Study Opportunities",
    ],
  },
  {
    code: "france",
    name: "France",
    flag: "",
    description: "Affordable world-class education in the heart of Europe",
    confirmationMessage:
      "Great choice! I can help you with universities, admissions, scholarships, tuition fees, visas, accommodation, jobs, and post-study opportunities in France.\n\nFrance offers very low tuition fees at public universities, up to 24 months post-study work visa for Master's graduates, and world-leading sectors in AI, aerospace, and luxury.\n\nWhat would you like to know?",
    topics: [
      "Universities",
      "Admissions",
      "Scholarships",
      "Tuition Fees",
      "Visas",
      "Accommodation",
      "Jobs",
      "Post-Study Opportunities",
    ],
  },
  {
    code: "italy",
    name: "Italy",
    flag: "",
    description: "Affordable world-class education in the heart of Europe",
    confirmationMessage:
      "Great choice! I can help you with universities, admissions, scholarships, tuition fees, visas, accommodation, jobs, and post-study opportunities in Italy.\n\nItaly offers low tuition fees at public universities (from €890/year), DSU scholarships covering tuition and living costs, a 12-month stay-back visa, and a rich cultural heritage.\n\nWhat would you like to know?",
    topics: [
      "Universities",
      "Admissions",
      "Scholarships",
      "Tuition Fees",
      "Visas",
      "Accommodation",
      "Jobs",
      "Post-Study Opportunities",
    ],
  },
  {
    code: "serbia",
    name: "Serbia",
    flag: "",
    description: "Affordable European education with high visa success rates",
    confirmationMessage:
      "Great choice! I can help you with universities, admissions, scholarships, tuition fees, visas, accommodation, jobs, and post-study opportunities in Serbia.\n\nSerbia offers one of the most affordable European educations with tuition from €1,500/year, a 90%+ visa success rate, no IELTS requirement, and a growing Indian student community.\n\nWhat would you like to know?",
    topics: [
      "Universities",
      "Admissions",
      "Scholarships",
      "Tuition Fees",
      "Visas",
      "Accommodation",
      "Jobs",
      "Post-Study Opportunities",
    ],
  },
];

export const COUNSELING_QUESTIONS: CounselingQuestion[] = [
  {
    step: "qualification",
    question: "What is your highest qualification?",
    options: [
      { value: "high-school", label: "High School (12th Grade)" },
      { value: "bachelors", label: "Bachelor's Degree" },
      { value: "masters", label: "Master's Degree" },
      { value: "other", label: "Other / Diploma" },
    ],
  },
  {
    step: "budget",
    question: "What is your approximate budget per year (including tuition & living)?",
    options: [
      { value: "under-10k", label: "Under €10,000" },
      { value: "10k-20k", label: "€10,000 – €20,000" },
      { value: "20k-30k", label: "€20,000 – €30,000" },
      { value: "30k-plus", label: "€30,000+" },
    ],
  },
  {
    step: "language",
    question: "What language do you prefer for studying?",
    options: [
      { value: "english", label: "English only" },
      { value: "local", label: "Local language (German/French/Italian)" },
      { value: "both", label: "Both English & local language" },
      { value: "undecided", label: "Not sure yet" },
    ],
  },
  {
    step: "pr-interest",
    question: "Are you interested in Permanent Residency (PR) after your studies?",
    options: [
      { value: "yes", label: "Yes, definitely" },
      { value: "maybe", label: "Maybe, I'm open to it" },
      { value: "no", label: "No, I plan to return home" },
      { value: "unsure", label: "I don't know yet" },
    ],
  },
];

/**
 * Get country config by country code.
 */
export function getCountryByCode(code: string): CountryConfig | undefined {
  return COUNTRIES.find((c) => c.code === code);
}

/**
 * Get the "Not Decided Yet" counseling question by step.
 */
export function getCounselingQuestion(
  step: string
): CounselingQuestion | undefined {
  return COUNSELING_QUESTIONS.find((q) => q.step === step);
}

/**
 * Get the index of a counseling step to track progress.
 */
export function getCounselingStepIndex(step: string): number {
  return COUNSELING_QUESTIONS.findIndex((q) => q.step === step);
}

export const TOTAL_COUNSELING_STEPS = COUNSELING_QUESTIONS.length;
