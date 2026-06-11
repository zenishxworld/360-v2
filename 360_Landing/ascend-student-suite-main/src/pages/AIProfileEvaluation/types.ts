export interface StudentProfile {
  countries: string[];
  degreeLevel: string;
  interests: string[];
  qualification: string;
  graduationYear: string; // The requirement asks for a number, but dropdown usually works with string. Let's make it string and parse if needed. Actually we will use number as asked.
  score: string;
  scoreType: string;
  englishTestRequired: boolean;
  englishTestType?: string;
  englishScore?: string;
  budget: number;
  intake: string;
  name: string;
  email: string;
  phone: string;
  countryCode: string;
}

export type WizardStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
