const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getPayments = async (params = {}) => {
  await delay(300);
  return {
    success: true,
    data: [
      { id: 1, studentName: "John Doe", type: "Application Fee", amount: 75, currency: "EUR", status: "PAID", date: "2025-03-10" },
      { id: 2, studentName: "Priya Sharma", type: "Tuition Deposit", amount: 5000, currency: "GBP", status: "PENDING", date: "2025-04-15" },
      { id: 3, studentName: "Ahmed Khan", type: "Application Fee", amount: 150, currency: "CHF", status: "PAID", date: "2025-04-01" },
      { id: 4, studentName: "Maria Garcia", type: "Consulting Fee", amount: 200, currency: "EUR", status: "PAID", date: "2025-02-20" },
    ],
    pagination: { total: 4, page: 0, size: 20 },
  };
};

export const createPayment = async (paymentData) => {
  await delay(400);
  return { success: true, data: { id: Math.floor(Math.random() * 1000), ...paymentData, status: "PENDING" } };
};

export const updatePaymentStatus = async (paymentId, status) => {
  await delay(200);
  return { success: true };
};

export default { getPayments, createPayment, updatePaymentStatus };
