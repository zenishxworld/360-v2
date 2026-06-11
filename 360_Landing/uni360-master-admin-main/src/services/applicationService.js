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

export const fetchApplications = async (params) => getApplications(params);
export const fetchApplicationById = async (id) => getApplicationById(id);

export const fetchApplicationAnalytics = async () => ({ success: true, data: { total: 48, byStatus: { DRAFT: 5, CLAIM_PENDING: 8, UNDER_REVIEW: 20, COMPLETED: 15 }, byCountry: { Germany: 30, UK: 18 } } });
export const mapApplicationStatus = (status) => status || "DRAFT";
export const mapWorkflowStage = (stage) => stage || "DOCUMENT_COLLECTION";
export const getStatusColor = (status) => {
  const map = { DRAFT: "gray", CLAIM_PENDING: "yellow", UNDER_REVIEW: "blue", COMPLETED: "green", REJECTED: "red" };
  return map[status] || "gray";
};
export const getStudentProfileForSuperAdmin = async (id) => ({ success: true, data: { id: Number(id), firstName: "John", lastName: "Doe", email: "john@example.com" } });

export default { getApplications, getApplicationById, updateApplication, deleteApplication, fetchApplications, fetchApplicationById, fetchApplicationAnalytics, mapApplicationStatus, mapWorkflowStage, getStatusColor, getStudentProfileForSuperAdmin };
