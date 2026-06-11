import axios from "axios";

const api = axios.create({
  baseURL: "",
  timeout: 30000,
  headers: { "Content-Type": "application/json", "X-Client-ID": "uniflow" },
});

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = "Bearer mock-master-admin-token";
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => Promise.reject(error)
);

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
