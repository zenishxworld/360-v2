export const authService = {
  async login(payload) {
    return {
      user: {
        uuid: "AD2025-000001",
        id: "1",
        email: payload.email || "admin@uni360.com",
        name: "Admin User",
        role: "admin",
        avatarUrl: null,
      },
    };
  },

  async registerB2BAdmin(payload) {
    return {
      success: true,
      message: "Admin registered successfully",
      data: { userId: 1, email: payload.email, status: "PENDING_VERIFICATION" },
      timestamp: new Date().toISOString(),
    };
  },

  async registerAdmin(min) {
    return { tempPassword: "TempPass123!" };
  },

  async signup(payload) {
    return { user: { uuid: "AD2025-000001", email: payload.email, name: payload.name, role: payload.role || "admin" } };
  },

  getStoredToken() {
    return "mock-access-token";
  },

  getStoredUser() {
    return { uuid: "AD2025-000001", id: "1", email: "admin@uni360.com", name: "Admin User", role: "admin", avatarUrl: null };
  },

  logout() {},

  isSessionValid() {
    return true;
  },
};
