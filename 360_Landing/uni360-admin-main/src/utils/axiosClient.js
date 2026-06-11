const axiosClient = {
  defaults: { headers: {} },
  interceptors: { request: { use: () => {} }, response: { use: () => {} } },
  get: async () => ({ data: { success: true, data: [] } }),
  post: async () => ({ data: { success: true, data: {} } }),
  put: async () => ({ data: { success: true } }),
  patch: async () => ({ data: { success: true } }),
  delete: async () => ({ data: { success: true } }),
};

export default axiosClient;
