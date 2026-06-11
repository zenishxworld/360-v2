const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const API_BASE_URL = "";

export const serbiaLeadAPI = {
  submitLead: async (leadData) => {
    await delay(500);
    return { success: true, data: { id: Math.floor(Math.random() * 1000), ...leadData, status: "NEW" } };
  },

  getLeads: async () => {
    await delay(300);
    return [];
  },

  getLeadById: async (id) => {
    await delay(200);
    return null;
  },

  updateLeadStatus: async (id, status) => {
    await delay(200);
    return { success: true };
  },
};

export default serbiaLeadAPI;
