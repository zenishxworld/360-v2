const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  get: async (url, config) => {
    await delay(200);
    return { success: true, data: [] };
  },
  post: async (url, data, config) => {
    await delay(200);
    return { success: true, data: { id: Math.floor(Math.random() * 1000) } };
  },
  put: async (url, data, config) => {
    await delay(200);
    return { success: true };
  },
  delete: async (url, config) => {
    await delay(200);
    return { success: true };
  },
};

export default apiService;
