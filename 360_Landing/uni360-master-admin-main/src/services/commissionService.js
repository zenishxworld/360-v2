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

export const getEarnedCommissions = async (adminId) => ({ success: true, data: { total: 1250, currency: "EUR", commissions: [] } });
export const getCommissionStats = async () => ({ success: true, data: { totalPending: 500, totalPaid: 750, totalCommissions: 1250, averageCommissionRate: 8.5 } });
export const getAllUniversityCommissionRates = async () => ({ success: true, data: [{ universityId: 1, universityName: "TU Munich", rate: 10 }, { universityId: 2, universityName: "Cambridge", rate: 8 }] });
export const setUniversityCommissionRate = async (universityId, rate) => {
  await delay(200);
  return { success: true };
};

export default { getCommissions, createCommission, updateCommissionStatus, getEarnedCommissions, getCommissionStats, getAllUniversityCommissionRates, setUniversityCommissionRate };
