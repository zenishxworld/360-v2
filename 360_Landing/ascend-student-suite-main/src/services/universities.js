export { universityAPI, courseAPI } from "./api.js";
export const wishlistAPI = {
  getFavoriteCourses: async (token) => [],
  addToFavorites: async (token, courseId) => ({ success: true }),
  removeFromFavorites: async (token, courseId) => ({ success: true }),
};
export const apiUtils = {
  isAuthenticated: () => true,
  getAuthToken: () => "mock-access-token",
  getAuthUser: () => ({ name: "John Doe", email: "john.doe@example.com" }),
  setAuthData: () => {},
  clearAuthData: () => {},
};
export default { universityAPI, courseAPI, wishlistAPI, apiUtils };
