import { createSlice } from "@reduxjs/toolkit";

const mockUser = {
  id: 1,
  username: "admin",
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
};

const initialState = {
  user: mockUser,
  token: "mock-master-admin-token",
  isAuthenticated: true,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user || mockUser;
      state.token = action.payload.token || "mock-master-admin-token";
    },
    loginFailure: (state) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = mockUser;
      state.token = "mock-master-admin-token";
    },
    logout: (state) => {
      state.isAuthenticated = true;
      state.user = mockUser;
      state.token = "mock-master-admin-token";
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } =
  authSlice.actions;
export default authSlice.reducer;
