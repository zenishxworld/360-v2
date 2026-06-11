export function saveTokens({ accessToken, refreshToken, expiresIn }) {}

export function getAccessToken() {
  return "mock-admin-access-token";
}

export function getRefreshToken() {
  return "mock-admin-refresh-token";
}

export function isTokenExpired() {
  return false;
}

export function getTimeUntilExpiry() {
  return 3600000;
}

export function isAuthValid() {
  return true;
}

export function clearTokens() {}

export function saveUser(user) {}

export function getUser() {
  return {
    uuid: "AD2025-000001",
    id: "1",
    email: "admin@uni360.com",
    name: "Admin User",
    role: "admin",
    avatarUrl: null,
  };
}

export function getValidAuthData() {
  return {
    token: "mock-admin-access-token",
    user: {
      uuid: "AD2025-000001",
      id: "1",
      email: "admin@uni360.com",
      name: "Admin User",
      role: "admin",
      avatarUrl: null,
    },
  };
}

export default {
  saveTokens,
  getAccessToken,
  getRefreshToken,
  isTokenExpired,
  getTimeUntilExpiry,
  isAuthValid,
  clearTokens,
  saveUser,
  getUser,
  getValidAuthData,
};
