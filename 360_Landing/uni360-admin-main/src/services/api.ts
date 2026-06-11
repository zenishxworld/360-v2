import notifications from "../../../../mock-data/notifications.json";

const mockResponse = (data: any) => ({
  data: { success: true, data },
});

export const api = {
  interceptors: {
    request: { use: () => {} },
    response: { use: () => {} },
  },
  get: async (url: string, config?: any) => {
    if (url.includes("/notifications")) {
      return mockResponse({
        count: notifications.length,
        notifications: notifications.map((n) => ({
          id: String(n.id),
          userId: n.userId,
          senderId: 1,
          type: n.type === "SUCCESS" ? "TASK_COMPLETION" : n.type === "WARNING" ? "SYSTEM_ALERT" : "INFO",
          title: n.title,
          message: n.message,
          contentType: "PLAIN",
          status: n.read ? "READ" : "UNREAD",
          metadata: {},
          createdAt: n.timestamp,
        })),
      });
    }
    return mockResponse([]);
  },
  post: async (url: string, data?: any, config?: any) => mockResponse({ accessToken: "mock", refreshToken: "mock", expiresIn: 3600, userId: 1, email: "admin@uni360.com", username: "admin", userType: "admin" }),
  put: async (url: string, data?: any) => mockResponse({}),
  patch: async (url: string, data?: any) => mockResponse({}),
  delete: async (url: string) => mockResponse({}),
};

const ensureApiV1 = (path: string) => path;

export async function apiRequest(path: string, method = "GET", body?: any, extraHeaders: Record<string, string> = {}) {
  return { success: true, data: [] };
}

export const loginUser = async ({ email, password }: any) => ({
  user: { uuid: "AD2025-000001", id: "1", email: email || "admin@uni360.com", name: "Admin User", role: "admin" },
  tokens: { accessToken: "mock-access-token", refreshToken: "mock-refresh-token" },
});

export const registerUser = async (payload: any) => ({ success: true, data: { userId: 1 } });

export function logoutUser() {}

export const tokenStorage = {
  setTokens: () => {},
  getAccessToken: () => "mock-access-token",
  getExpiry: () => null,
  setUser: () => {},
  getUser: () => ({ uuid: "AD2025-000001", email: "admin@uni360.com", name: "Admin User", role: "admin" }),
  clear: () => {},
};

export default api;
