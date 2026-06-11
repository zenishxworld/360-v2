import notifications from "../../../../mock-data/notifications.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getNotifications = async (params = {}) => {
  await delay(300);
  let result = [...notifications];
  if (params.unreadOnly) result = result.filter((n) => !n.read);
  return { success: true, data: result };
};

export const getUnreadCount = async () => {
  await delay(200);
  return { success: true, data: { count: notifications.filter((n) => !n.read).length } };
};

export const markAsRead = async (id) => {
  await delay(200);
  return { success: true };
};

export const markAllAsRead = async () => {
  await delay(200);
  return { success: true };
};

export const createNotification = async (data) => {
  await delay(300);
  return { success: true, data: { id: Math.floor(Math.random() * 1000), ...data } };
};

export const getNotificationOverview = async () => ({ success: true, data: { total: notifications.length, unread: notifications.filter((n) => !n.read).length } });
export const broadcastNotification = async (data) => {
  await delay(300);
  return { success: true, data: { id: Math.floor(Math.random() * 1000), ...data } };
};
export const getNotificationAnalytics = async () => ({ success: true, data: { sentThisMonth: 45, readRate: 0.68 } });
export const getNotificationTemplates = async () => ({ success: true, data: [{ id: 1, name: "Welcome", subject: "Welcome to Uni360" }, { id: 2, name: "Reminder", subject: "Application Reminder" }] });

export default { getNotifications, getUnreadCount, markAsRead, markAllAsRead, createNotification, getNotificationOverview, broadcastNotification, getNotificationAnalytics, getNotificationTemplates };
