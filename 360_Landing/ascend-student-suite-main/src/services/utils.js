export const setAccessToken = (token) => {};
export const setRefreshToken = (token) => {};
export const setTokens = (accessToken, refreshToken) => {};
export const getToken = () => "mock-access-token";
export const getAccessToken = () => "mock-access-token";
export const getRefreshToken = () => "mock-refresh-token";
export const removeAccessToken = () => {};
export const removeRefreshToken = () => {};
export const removeTokens = () => {};
export const setUser = (user) => {};
export const getUser = () => ({
  id: 1,
  uuid: "ST2025-000001",
  email: "john.doe@example.com",
  name: "John Doe",
  firstName: "John",
  lastName: "Doe",
  userType: "STUDENT",
  status: "ACTIVE",
});
export const removeUser = () => {};
export const clearAuthData = () => {};
export const isAuthenticated = () => true;
export const isTokenExpired = (token) => false;
export const handleApiError = (error) => error;
export const getAuthHeaders = () => ({ Authorization: "Bearer mock-access-token" });
export const getCommonHeaders = () => ({ "Content-Type": "application/json" });
export const formatUserName = (firstName, lastName) => [firstName, lastName].filter(Boolean).join(" ") || "User";
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const generateUsernameFromEmail = (email) => email?.split("@")[0]?.toLowerCase() || "";
export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const generateUserUUID = (email, id) => `ST2025-${String(id || Math.random()).padStart(6, "0").slice(-6)}`;
export const getUserUUID = (user) => user?.uuid || `ST2025-000001`;
