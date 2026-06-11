export const isAuthenticated = () => true;
export const getUser = () => ({ name: "Admin User", email: "admin@uni360.com", role: "admin" });
export const getToken = () => "mock-access-token";
export const hasValidToken = () => true;
export const login = async (username, password) => ({ success: true, data: { user: { name: "Admin User" }, token: "mock-token" } });
export const logout = () => {};
export const refreshToken = async () => ({ success: true, data: { token: "mock-token" } });
export const validateToken = () => true;
export const getCurrentUser = () => ({ name: "Admin User", email: "admin@uni360.com" });
