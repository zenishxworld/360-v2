const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getTasks = async (params = {}) => {
  await delay(300);
  return { success: true, data: [] };
};

export const createTask = async (taskData) => {
  await delay(400);
  return { success: true, data: { id: Math.floor(Math.random() * 1000), ...taskData } };
};

export const updateTask = async (taskId, updates) => {
  await delay(200);
  return { success: true };
};

export default { getTasks, createTask, updateTask };
