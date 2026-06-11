import applications from "../../../../mock-data/applications.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getApplications = async (filters) => {
  await delay(300);
  let result = [...applications];
  if (filters?.status) result = result.filter((a) => a.status === filters.status);
  if (filters?.workflowStage) result = result.filter((a) => a.workflowStage === filters.workflowStage);
  if (filters?.countryCode) {
    const countryMap = { DE: "Germany", UK: "UK" };
    result = result.filter((a) => a.country === (countryMap[filters.countryCode] || filters.countryCode));
  }
  if (filters?.isUrgent !== undefined) result = result.filter((a) => a.isUrgent === filters.isUrgent);
  return {
    success: true,
    data: result,
    totalPages: 1,
    totalElements: result.length,
    pagination: { total: result.length, size: 20, totalPages: 1, page: 0, hasPrevious: false, hasNext: false },
    stageSummary: {
      total: result.length,
      claimPending: result.filter((a) => a.status === "CLAIM_PENDING").length,
      underReview: result.filter((a) => a.status === "UNDER_REVIEW").length,
      completed: result.filter((a) => a.status === "COMPLETED").length,
    },
  };
};

export const getApplicationById = async (applicationId) => {
  await delay(200);
  const app = applications.find((a) => a.id === Number(applicationId));
  if (app) return { success: true, data: [app] };
  return { success: false, message: "Application not found" };
};

export const updateApplication = async (applicationId, updates) => {
  await delay(300);
  return { success: true, data: [{ id: applicationId, ...updates }], message: "Application updated successfully" };
};
