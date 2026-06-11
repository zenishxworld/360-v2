const mockUser = {
  id: 1,
  uuid: "ST2025-000001",
  email: "john.doe@example.com",
  name: "John Doe",
  firstName: "John",
  lastName: "Doe",
  fullName: "John Doe",
  username: "john.doe",
  isVerified: true,
  emailVerified: true,
  phoneVerified: true,
  userType: "STUDENT",
  status: "ACTIVE",
  hasPassword: true,
  authProvider: "LOCAL",
  provider: "LOCAL",
  roles: ["STUDENT"],
  permissions: [],
};

export const loginUser = async (credentials) => ({
  user: mockUser,
  accessToken: "mock-access-token",
  refreshToken: "mock-refresh-token",
});

export const registerUser = async (signUpData) => ({
  user: { ...mockUser, ...signUpData },
  requiresEmailVerification: false,
  accessToken: "mock-access-token",
  refreshToken: "mock-refresh-token",
});

export const getGoogleAuthUrl = async () => "#";

export const handleGoogleCallback = (payload) => ({
  user: mockUser,
  accessToken: "mock-access-token",
  refreshToken: "mock-refresh-token",
});

export const refreshToken = async (refreshToken) => ({
  accessToken: "mock-access-token",
  refreshToken: refreshToken || "mock-refresh-token",
});

export const logoutUser = async () => {};

export const verifyUser = async () => mockUser;

export const requestPasswordReset = async (email) => ({ success: true });

export const setPassword = async (data) => ({ success: true });

export const resetPassword = async (token, password) => ({ success: true });

export const changePassword = async (oldPassword, newPassword) => ({ success: true });

export const getApplications = async () => [];

export const createApplication = async (applicationData) => ({
  id: Math.floor(Math.random() * 1000),
  ...applicationData,
  status: "DRAFT",
});

export const submitApplication = async (applicationId) => ({
  success: true,
  id: applicationId,
});

export const getApplicationById = async (applicationId) => ({
  id: applicationId,
  status: "DRAFT",
});

export const updateApplication = async (applicationId, updateData) => ({
  id: applicationId,
  ...updateData,
});

export const deleteApplication = async (applicationId) => {};

export const getNotifications = async (unreadOnly = false, type = null) => [];
export const markNotificationAsRead = async (notificationId) => ({ success: true });
export const markAllNotificationsAsRead = async () => ({ success: true });
