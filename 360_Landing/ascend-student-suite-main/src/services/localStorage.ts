// Local Storage Service — generic persistence layer for MVP
// No Supabase, No Backend, No Database

const STORAGE_PREFIX = "uni360_";

export const localStorageService = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + key);
      if (raw === null || raw === undefined) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Failed to save ${key} to localStorage:`, e);
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
    } catch (e) {
      console.warn(`Failed to remove ${key} from localStorage:`, e);
    }
  },

  has(key: string): boolean {
    return localStorage.getItem(STORAGE_PREFIX + key) !== null;
  },

  clear(): void {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(STORAGE_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
    } catch (e) {
      console.warn("Failed to clear localStorage:", e);
    }
  },
};
