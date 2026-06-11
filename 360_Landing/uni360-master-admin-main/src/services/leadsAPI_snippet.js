const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getLeads = async (params) => {
  await delay(300);
  return { success: true, data: [] };
};

export const getLeadById = async (id) => {
  await delay(200);
  return null;
};

export const updateLeadStatus = async (id, status) => {
  await delay(200);
  return { success: true };
};

export default { getLeads, getLeadById, updateLeadStatus };
