const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const api = {
  defaults: { headers: {} },
  interceptors: { request: { use: () => {} }, response: { use: () => {} } },
  get: async (url, config) => {
    await delay(200);
    if (url.includes("/contacts")) return { data: { success: true, data: [] } };
    return { data: { success: true, data: {} } };
  },
  post: async (url, data, config) => {
    await delay(200);
    return { data: { success: true, data: { id: Math.floor(Math.random() * 1000), ...data } } };
  },
  put: async (url, data) => {
    await delay(200);
    return { data: { success: true } };
  },
  patch: async (url, data) => {
    await delay(200);
    return { data: { success: true } };
  },
  delete: async (url) => {
    await delay(200);
    return { data: { success: true } };
  },
};

export const hasValidToken = () => true;

export const getAuthHeaders = () => ({
  Authorization: "Bearer mock-master-admin-token",
  "Content-Type": "application/json",
  "X-Client-ID": "uniflow",
});

export const leadsAPI = {
  getContacts: async (token) => [],
  updateStatus: async (id, status, token) => ({ success: true }),
};

export default api;
