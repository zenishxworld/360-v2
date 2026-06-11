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

export default { getNotifications, getUnreadCount, markAsRead, markAllAsRead, createNotification };
