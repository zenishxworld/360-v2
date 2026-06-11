import applications from "../../../../mock-data/applications.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getApplications = async (params = {}) => {
  await delay(300);
  let result = [...applications];
  if (params.status) result = result.filter((a) => a.status === params.status);
  if (params.countryCode) {
    const map = { DE: "Germany", UK: "UK" };
    result = result.filter((a) => a.country === (map[params.countryCode] || params.countryCode));
  }
  return {
    success: true,
    data: result,
    pagination: { total: result.length, size: 20, totalPages: 1, page: 0, hasPrevious: false, hasNext: false },
  };
};

export const getApplicationById = async (id) => {
  await delay(200);
  const app = applications.find((a) => a.id === Number(id));
  return app ? { success: true, data: app } : { success: false, message: "Not found" };
};

export const updateApplication = async (id, data) => {
  await delay(200);
  return { success: true, message: "Application updated" };
};

export const deleteApplication = async (id) => {
  await delay(200);
  return { success: true };
};

export default { getApplications, getApplicationById, updateApplication, deleteApplication };
