const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const serbiaLeadAPI = {
  getLeads: async (params) => {
    await delay(300);
    return { success: true, data: [] };
  },
  getLeadById: async (id) => {
    await delay(200);
    return null;
  },
  createLead: async (leadData) => {
    await delay(500);
    return { success: true, data: { id: Math.floor(Math.random() * 1000), ...leadData } };
  },
  updateLeadStatus: async (id, status) => {
    await delay(200);
    return { success: true };
  },
};

export default serbiaLeadAPI;
