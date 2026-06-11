// Preference Store — local student preference management
// No Supabase, No Backend, No Database

import { localStorageService } from "@/services/localStorage";
import { StudentPreferences, DEFAULT_PREFERENCES } from "@/data/mock/recommendations";

const PREFS_KEY = "student_preferences";

export const preferenceStore = {
  get(): StudentPreferences {
    return localStorageService.get<StudentPreferences>(PREFS_KEY, DEFAULT_PREFERENCES);
  },

  save(prefs: Partial<StudentPreferences>): StudentPreferences {
    const current = this.get();
    const updated = { ...current, ...prefs };
    localStorageService.set(PREFS_KEY, updated);
    return updated;
  },

  update<K extends keyof StudentPreferences>(key: K, value: StudentPreferences[K]): StudentPreferences {
    return this.save({ [key]: value });
  },

  reset(): void {
    localStorageService.remove(PREFS_KEY);
  },

  hasPreferences(): boolean {
    const prefs = this.get();
    return prefs.preferredCountries.length > 0 || prefs.degreeLevel !== "" || prefs.cgpa > 0;
  },
};
