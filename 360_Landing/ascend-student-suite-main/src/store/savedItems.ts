// Saved Items Store — save/remove universities and courses
// No Supabase, No Backend, No Database

import { localStorageService } from "@/services/localStorage";

const SAVED_UNIS_KEY = "saved_universities";
const SAVED_COURSES_KEY = "saved_courses";

export interface SavedUniversity {
  universityId: number;
  savedAt: string;
}

export interface SavedCourse {
  courseId: number;
  universityId: number;
  savedAt: string;
}

export const savedItemsStore = {
  // ── Universities ──────────────────────────────────────────
  getSavedUniversities(): SavedUniversity[] {
    return localStorageService.get<SavedUniversity[]>(SAVED_UNIS_KEY, []);
  },

  isUniversitySaved(universityId: number): boolean {
    const saved = this.getSavedUniversities();
    return saved.some(s => s.universityId === universityId);
  },

  saveUniversity(universityId: number): void {
    const saved = this.getSavedUniversities();
    if (!this.isUniversitySaved(universityId)) {
      saved.push({ universityId, savedAt: new Date().toISOString() });
      localStorageService.set(SAVED_UNIS_KEY, saved);
    }
  },

  removeUniversity(universityId: number): void {
    const saved = this.getSavedUniversities().filter(s => s.universityId !== universityId);
    localStorageService.set(SAVED_UNIS_KEY, saved);
  },

  toggleUniversity(universityId: number): boolean {
    if (this.isUniversitySaved(universityId)) {
      this.removeUniversity(universityId);
      return false;
    } else {
      this.saveUniversity(universityId);
      return true;
    }
  },

  // ── Courses ──────────────────────────────────────────────
  getSavedCourses(): SavedCourse[] {
    return localStorageService.get<SavedCourse[]>(SAVED_COURSES_KEY, []);
  },

  isCourseSaved(courseId: number): boolean {
    const saved = this.getSavedCourses();
    return saved.some(s => s.courseId === courseId);
  },

  saveCourse(courseId: number, universityId: number): void {
    const saved = this.getSavedCourses();
    if (!this.isCourseSaved(courseId)) {
      saved.push({ courseId, universityId, savedAt: new Date().toISOString() });
      localStorageService.set(SAVED_COURSES_KEY, saved);
    }
  },

  removeCourse(courseId: number): void {
    const saved = this.getSavedCourses().filter(s => s.courseId !== courseId);
    localStorageService.set(SAVED_COURSES_KEY, saved);
  },

  toggleCourse(courseId: number, universityId: number): boolean {
    if (this.isCourseSaved(courseId)) {
      this.removeCourse(courseId);
      return false;
    } else {
      this.saveCourse(courseId, universityId);
      return true;
    }
  },

  // ── Counts ───────────────────────────────────────────────
  getSavedCounts() {
    return {
      universities: this.getSavedUniversities().length,
      courses: this.getSavedCourses().length,
    };
  },
};
