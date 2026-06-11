import students from "../../../../mock-data/students.json";
import applications from "../../../../mock-data/applications.json";
import courses from "../../../../mock-data/courses.json";
import notifications from "../../../../mock-data/notifications.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const apiRequest = async (endpoint, options = {}) => {
  await delay(200);
  return { success: true, data: {} };
};

export const getStudentProfile = async () => {
  await delay(300);
  return { success: true, data: students[0] };
};

export const getProfileBuilder = async () => {
  await delay(200);
  return { success: true, data: { stepsStatus: [], steps: [] } };
};

export const getProfileBuilderConfig = async () => {
  await delay(300);
  return { success: true, data: {} };
};

export const getProfileProgress = async () => {
  await delay(200);
  return { success: true, data: { percentage: 75, completionPercentage: 75 } };
};

export const getCurrentStep = async () => {
  await delay(200);
  return null;
};

export const getProfileSteps = async () => {
  await delay(200);
  return [];
};

export const validateStep = async (stepId, stepData) => {
  await delay(300);
  return { success: true, data: { valid: true, errors: [], warnings: [] } };
};

export const resetProfileBuilder = async () => {
  await delay(200);
  return { success: true };
};

export const validateProfile = async (profileData) => {
  await delay(300);
  return { success: true };
};

export const saveProfileData = async (profileData) => {
  await delay(300);
  return { success: true, data: profileData };
};

export const loadProfileData = async () => {
  await delay(200);
  return { success: true, data: students[0] };
};

export const getStudentApplications = async (countryCode) => {
  await delay(300);
  let result = applications.filter((a) => a.studentId === 1);
  if (countryCode === "DE") result = result.filter((a) => a.country === "Germany");
  if (countryCode === "UK") result = result.filter((a) => a.country === "UK");
  return result;
};

export const createApplication = async (applicationData) => {
  await delay(500);
  return { success: true, data: { id: Math.floor(Math.random() * 1000), ...applicationData, status: "DRAFT", workflowStage: "INITIAL_REVIEW" } };
};

export const getApplicationById = async (applicationId) => {
  await delay(200);
  const app = applications.find((a) => a.id === Number(applicationId));
  return app || { success: true, data: { id: applicationId, status: "DRAFT" } };
};

export const updateApplication = async (applicationId, updateData) => {
  await delay(300);
  return { success: true, data: { id: applicationId, ...updateData } };
};

export const submitApplication = async (applicationId, submitData) => {
  await delay(400);
  return { success: true, data: { id: applicationId, status: "SUBMITTED" } };
};

export const getApplicationProgress = async (applicationId) => {
  await delay(200);
  return { success: true, data: { percentage: 50 } };
};

export const getAllCourses = async (params = {}) => {
  await delay(300);
  let result = [...courses];
  if (params.search) {
    const s = params.search.toLowerCase();
    result = result.filter((c) => c.name.toLowerCase().includes(s));
  }
  return { success: true, data: result };
};

export const fetchAllFavoriteCourses = async () => {
  await delay(400);
  return [];
};

export const addCourseToFavorites = async (courseId) => {
  await delay(200);
  return { success: true };
};

export const removeCourseFromFavorites = async (courseId) => {
  await delay(200);
  return { success: true };
};

export const getFavoriteCourses = async () => {
  await delay(200);
  return [];
};

export const getNotifications = async () => {
  await delay(300);
  return notifications.filter((n) => n.userId === 1);
};

export const getNotificationById = async (notificationId) => {
  await delay(200);
  return notifications.find((n) => n.id === Number(notificationId)) || null;
};

export const getUnreadNotificationsCount = async () => {
  await delay(200);
  const unread = notifications.filter((n) => n.userId === 1 && !n.read);
  return { success: true, data: { count: unread.length } };
};

export const markNotificationAsRead = async (notificationId) => {
  await delay(200);
  return { success: true };
};

export const markAllNotificationsAsRead = async () => {
  await delay(200);
  return { success: true };
};

export const isProfileComplete = async () => {
  await delay(200);
  return false;
};

export const getProfileCompletionPercentage = async () => {
  await delay(200);
  return 75;
};

const isNotFound = (error) => false;

export const getVisaChecklist = async (country) => {
  await delay(300);
  return {
    success: true,
    data: [
      { id: 1, item: "Valid Passport", status: "COMPLETED" },
      { id: 2, item: "University Admission Letter", status: "IN_PROGRESS" },
      { id: 3, item: "Proof of Financial Resources", status: "PENDING" },
      { id: 4, item: "Health Insurance", status: "COMPLETED" },
      { id: 5, item: "Visa Application Form", status: "PENDING" },
    ],
  };
};

export const getVisaTracker = async (country) => {
  await delay(300);
  return {
    success: true,
    data: { stage: "DOCUMENT_COLLECTION", percentage: 40, estimatedTime: "4-6 weeks" },
  };
};

export const updateVisaTracker = async (payload) => {
  await delay(200);
  return { success: true };
};

export const getVisaAppointments = async () => {
  await delay(300);
  return {
    success: true,
    data: [
      { id: 1, type: "APS Interview", date: "2025-05-15", time: "14:00", location: "Berlin", status: "SCHEDULED" },
    ],
  };
};

export const getMeetingUrl = async (section) => {
  await delay(200);
  return { success: true, data: { url: "#" } };
};

export default {
  getStudentProfile,
  getProfileBuilder,
  getProfileBuilderConfig,
  getProfileProgress,
  getCurrentStep,
  getProfileSteps,
  validateStep,
  validateProfile,
  resetProfileBuilder,
  getStudentApplications,
  createApplication,
  getApplicationById,
  updateApplication,
  submitApplication,
  getApplicationProgress,
  getAllCourses,
  fetchAllFavoriteCourses,
  addCourseToFavorites,
  removeCourseFromFavorites,
  getFavoriteCourses,
  getNotifications,
  getNotificationById,
  getUnreadNotificationsCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  isProfileComplete,
  getProfileCompletionPercentage,
  saveProfileData,
  loadProfileData,
  getVisaChecklist,
  getVisaTracker,
  updateVisaTracker,
  getVisaAppointments,
  getMeetingUrl,
};
