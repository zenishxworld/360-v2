const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const createOrder = async (amount, currency = "EUR") => {
  await delay(500);
  return { success: true, data: { id: `order_${Math.random().toString(36).slice(2)}`, amount, currency } };
};

export const verifyPayment = async (paymentData) => {
  await delay(300);
  return { success: true, data: { status: "CAPTURED" } };
};

export const healthCheck = async () => {
  await delay(200);
  return { success: true, status: "UP" };
};

export default { createOrder, verifyPayment, healthCheck };
