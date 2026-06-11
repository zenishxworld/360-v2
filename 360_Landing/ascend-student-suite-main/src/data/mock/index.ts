// Barrel export for mock data
export { mockUniversities } from "./universities";
export type { University } from "./universities";
export { mockCourses } from "./courses";
export type { Course } from "./courses";
export { mockApplications } from "./applications";
export type { Application, ApplicationStatus, ApplicationDocument } from "./applications";
export { mockDocuments, DOCUMENT_CATEGORIES } from "./documents";
export type { Document, DocumentType, DocumentStatus } from "./documents";
export { generateRecommendations, getSampleRecommendations, DEFAULT_PREFERENCES } from "./recommendations";
export type { StudentPreferences, Recommendation, RecommendationTier } from "./recommendations";
