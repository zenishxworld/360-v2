export const getAccessToken = async () => "mock-master-admin-token";
export const refreshToken = async () => "mock-master-admin-token";
export const clearToken = () => {};
export const setUserToken = (token) => {};
export const getAuthHeaders = async () => ({
  'Authorization': 'Bearer mock-master-admin-token',
  'X-Client-ID': 'uniflow',
  'Content-Type': 'application/json',
});
export const makeAuthenticatedRequest = async (endpoint, options = {}) => {
  return { success: true, data: [] };
};

export default {
  getAccessToken,
  refreshToken,
  clearToken,
  setUserToken,
  getAuthHeaders,
  makeAuthenticatedRequest,
};
