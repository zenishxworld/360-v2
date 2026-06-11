const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAllQueries = async (params = {}) => {
  await delay(300);
  return { success: true, data: [] };
};

export const getQueries = async (params = {}) => {
  await delay(300);
  return { success: true, data: [] };
};

export const getQueryById = async (id) => {
  await delay(200);
  return null;
};

export const updateQueryStatus = async (id, status) => {
  await delay(200);
  return { success: true };
};

export const createQuery = async (data) => {
  await delay(400);
  return { success: true, data: { id: Math.floor(Math.random() * 1000), ...data } };
};

export default { getQueries, getQueryById, updateQueryStatus, createQuery };
