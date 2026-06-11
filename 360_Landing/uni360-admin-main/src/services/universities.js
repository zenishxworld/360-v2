import universities from "../../../../mock-data/universities.json";
import courses from "../../../../mock-data/courses.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const universityAPI = {
  getUniversities: async (params = {}) => {
    await delay(300);
    let result = [...universities];
    if (params.search) {
      const s = params.search.toLowerCase();
      result = result.filter((u) => u.name.toLowerCase().includes(s) || u.city.toLowerCase().includes(s));
    }
    if (params.country && params.country !== "all") result = result.filter((u) => u.country === params.country);
    if (params.active !== undefined) result = result.filter((u) => u.isActive === params.active);
    return { totalCount: result.length, data: result, page: 0, size: 20, hasMore: false };
  },

  getUniversityById: async (id) => {
    await delay(200);
    return universities.find((u) => u.id === Number(id)) || null;
  },

  getCities: async () => {
    await delay(200);
    return [...new Set(universities.map((u) => u.city))];
  },

  getStates: async () => {
    await delay(200);
    return [...new Set(universities.map((u) => u.state))];
  },

  getCountries: async () => {
    await delay(200);
    return [...new Set(universities.map((u) => u.country))];
  },

  getLanguages: async () => {
    await delay(200);
    return ["English", "German", "French", "Italian"];
  },

  getTypes: async () => {
    await delay(200);
    return ["PUBLIC", "PRIVATE"];
  },
};

export const courseAPI = {
  getCoursesByUniversity: async (universityId) => {
    await delay(200);
    return courses.filter((c) => c.universityId === Number(universityId));
  },

  getSubjectAreas: async () => {
    await delay(200);
    return [...new Set(courses.map((c) => c.fieldOfStudy))];
  },
};

export const wishlistAPI = {
  getFavoriteCourses: async (token) => [],
  addToFavorites: async (token, courseId) => ({ success: true }),
  removeFromFavorites: async (token, courseId) => ({ success: true }),
};

export const apiUtils = {
  isAuthenticated: () => true,
  getAuthToken: () => "mock-access-token",
  getAuthUser: () => ({ name: "Admin User", email: "admin@uni360.com" }),
  setAuthData: () => {},
  clearAuthData: () => {},
};

export default { universityAPI, courseAPI, wishlistAPI, apiUtils };
