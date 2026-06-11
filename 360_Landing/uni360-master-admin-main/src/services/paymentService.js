const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getPayments = async (params = {}) => {
  await delay(300);
  return {
    success: true,
    data: [
      { id: 1, studentName: "John Doe", type: "Application Fee", amount: 75, currency: "EUR", status: "COMPLETED", date: "2025-03-10" },
      { id: 2, studentName: "Priya Sharma", type: "Tuition Deposit", amount: 5000, currency: "GBP", status: "PENDING", date: "2025-04-15" },
      { id: 3, studentName: "Ahmed Khan", type: "Consulting Fee", amount: 200, currency: "EUR", status: "COMPLETED", date: "2025-04-01" },
    ],
    pagination: { total: 3, page: 0, size: 20 },
  };
};

export const getPaymentById = async (id) => {
  await delay(200);
  return { success: true, data: { id: Number(id), studentName: "John Doe", type: "Application Fee", amount: 75, currency: "EUR", status: "COMPLETED" } };
};

export const createPayment = async (data) => {
  await delay(400);
  return { success: true, data: { id: Math.floor(Math.random() * 1000), ...data, status: "PENDING" } };
};

export const updatePaymentStatus = async (id, status) => {
  await delay(200);
  return { success: true };
};

export default { getPayments, getPaymentById, createPayment, updatePaymentStatus };
