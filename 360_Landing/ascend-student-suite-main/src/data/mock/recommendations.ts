// Mock Recommendations — local filtering rules only
// Do NOT use AI, LLMs, or external APIs.
// Do NOT create Supabase tables for this data.

import { University, mockUniversities } from "./universities";
import { Course, mockCourses } from "./courses";

export interface StudentPreferences {
  preferredCountries: string[];
  degreeLevel: string;
  targetCourse: string;
  cgpa: number;
  ielts: number;
  toefl: number | null;
  pte: number | null;
  gre: number | null;
  gmat: number | null;
  workExperience: string;
}

export type RecommendationTier = "dream" | "target" | "safe";

export interface Recommendation {
  university: University;
  matchingCourses: Course[];
  tier: RecommendationTier;
  matchReason: string;
}

/**
 * Recommendation rules engine (local filtering only):
 * 
 * Dream:   CGPA ≥ 9.0  AND IELTS ≥ 7.5  → Top 50 QS
 * Target:  CGPA ≥ 7.5  AND IELTS ≥ 6.5  → 50-200 QS
 * Safe:    CGPA < 7.5  OR  IELTS < 6.5  → 200+ QS
 *
 * Fallback: Any unmatched university goes to Target tier
 */
export function generateRecommendations(prefs: StudentPreferences): Recommendation[] {
  const results: Recommendation[] = [];

  const countryFiltered = prefs.preferredCountries.length > 0
    ? mockUniversities.filter(u => prefs.preferredCountries.includes(u.country))
    : mockUniversities;

  for (const uni of countryFiltered) {
    const matchingCourses = mockCourses.filter(
      c => c.universityId === uni.id &&
        c.degreeLevel.toLowerCase() === prefs.degreeLevel.toLowerCase()
    );

    if (matchingCourses.length === 0) continue;

    let tier: RecommendationTier = "target";
    let reason = "Good match based on your profile";

    const cgpa = prefs.cgpa || 0;
    const ielts = prefs.ielts || 0;

    if (cgpa >= 9.0 && ielts >= 7.5 && uni.qsRanking <= 50) {
      tier = "dream";
      reason = "Excellent academic profile matches top-tier university";
    } else if (cgpa >= 7.5 && ielts >= 6.5 && uni.qsRanking <= 200) {
      tier = "target";
      reason = "Strong match for this university";
    } else if (uni.qsRanking > 200) {
      tier = "safe";
      reason = "High probability of admission";
    } else if (uni.qsRanking <= 50 && (cgpa < 7.5 || ielts < 6.5)) {
      tier = "dream";
      reason = "Ambitious reach — consider improving test scores";
    }

    results.push({
      university: uni,
      matchingCourses,
      tier,
      matchReason: reason,
    });
  }

  // Sort: dream first, then target, then safe
  const tierOrder: Record<RecommendationTier, number> = { dream: 0, target: 1, safe: 2 };
  results.sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier]);

  return results;
}

/**
 * Generate mock recommendations using a sample profile
 */
export function getSampleRecommendations(): Recommendation[] {
  return generateRecommendations({
    preferredCountries: ["Germany", "UK", "Switzerland"],
    degreeLevel: "Master",
    targetCourse: "Computer Science",
    cgpa: 8.5,
    ielts: 7.0,
    toefl: null,
    pte: null,
    gre: null,
    gmat: null,
    workExperience: "1-2 Years",
  });
}

export const DEFAULT_PREFERENCES: StudentPreferences = {
  preferredCountries: [],
  degreeLevel: "",
  targetCourse: "",
  cgpa: 0,
  ielts: 0,
  toefl: null,
  pte: null,
  gre: null,
  gmat: null,
  workExperience: "",
};
