const mockToken = "mock-access-token-for-demo";

export const getAccessToken = async () => mockToken;

export const refreshToken = async () => mockToken;

export const clearToken = () => {};

export const setUserToken = (token) => {};

export const getAuthHeaders = async () => ({
  Authorization: `Bearer ${mockToken}`,
  "Content-Type": "application/json",
});

export const makeAuthenticatedRequest = async (endpoint, options = {}) => {
  return { success: true, data: {} };
};

export default {
  getAccessToken,
  refreshToken,
  clearToken,
  setUserToken,
  getAuthHeaders,
  makeAuthenticatedRequest,
};
