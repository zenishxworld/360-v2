import axios from 'axios';

const authApi = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json', 'X-Client-ID': 'uniflow' }
});

export const login = async (usernameOrEmail, password) => {
  const userData = {
    id: 1,
    username: usernameOrEmail || "admin",
    email: "admin@uni360.com",
    firstName: "Admin",
    lastName: "Super",
    fullName: "Admin Super",
    displayName: "Admin Super",
    userType: "MASTER_ADMIN",
    status: "ACTIVE",
    roles: ["SUPER_ADMIN"],
    permissions: ["ALL"],
    clientType: "master_admin",
    timezone: "UTC",
    language: "en",
    emailVerified: true,
    phoneVerified: true,
    isFirstLogin: false,
    loginAt: new Date().toISOString(),
  };

  return {
    success: true,
    data: { user: userData, token: "mock-master-admin-token" },
  };
};

export const validateToken = () => true;

export const logout = () => {};

export const getCurrentUser = () => ({
  id: 1,
  username: "admin",
  email: "admin@uni360.com",
  firstName: "Admin",
  lastName: "Super",
  fullName: "Admin Super",
  userType: "MASTER_ADMIN",
  roles: ["SUPER_ADMIN"],
  permissions: ["ALL"],
});

export const getToken = () => "mock-master-admin-token";

export const isAuthenticated = () => true;

export const refreshToken = async () => ({
  success: true,
  data: { token: "mock-master-admin-token" },
});

export default {
  login,
  logout,
  getCurrentUser,
  getToken,
  isAuthenticated,
  refreshToken,
  validateToken,
};
