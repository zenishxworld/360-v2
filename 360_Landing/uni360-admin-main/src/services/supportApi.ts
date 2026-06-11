const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const supportAPI = {
  getTickets: async (params) => {
    await delay(300);
    return { success: true, data: [] };
  },
  getTicketById: async (id) => {
    await delay(200);
    return null;
  },
  createTicket: async (ticketData) => {
    await delay(400);
    return { success: true, data: { id: Math.floor(Math.random() * 1000), ...ticketData, status: "OPEN" } };
  },
  sendMessage: async (ticketId, message) => {
    await delay(200);
    return { success: true };
  },
  escalateTicket: async (ticketId) => {
    await delay(200);
    return { success: true };
  },
};

export default supportAPI;
