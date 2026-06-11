const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getCommissions = async (params = {}) => {
  await delay(300);
  return {
    success: true,
    data: [
      { id: 1, adminName: "Sarah Wilson", studentName: "John Doe", university: "TUM", amount: 500, currency: "EUR", status: "PENDING", date: "2025-04-01" },
      { id: 2, adminName: "James Smith", studentName: "Priya Sharma", university: "Cambridge", amount: 750, currency: "GBP", status: "PAID", date: "2025-03-15" },
    ],
    pagination: { total: 2, page: 0, size: 20 },
  };
};

export const createCommission = async (data) => {
  await delay(400);
  return { success: true, data: { id: Math.floor(Math.random() * 1000), ...data } };
};

export const updateCommissionStatus = async (id, status) => {
  await delay(200);
  return { success: true };
};

export default { getCommissions, createCommission, updateCommissionStatus };
