const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const submitTravelRequest = async (requestData) => {
  await delay(500);
  return { success: true, data: { id: Math.floor(Math.random() * 1000), status: "PENDING", ...requestData } };
};

export const getTravelRequests = async () => {
  await delay(300);
  return [];
};

export default { submitTravelRequest, getTravelRequests };
