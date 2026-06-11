const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getTasks = async (params = {}) => {
  await delay(300);
  return { success: true, data: [] };
};

export const createTask = async (taskData) => {
  await delay(400);
  return { success: true, data: { id: Math.floor(Math.random() * 1000), ...taskData } };
};

export const updateTask = async (taskId, updates) => {
  await delay(200);
  return { success: true };
};

export const getAllTasks = async (params) => getTasks(params);
export const getTaskDetails = async (id) => ({ success: true, data: { id: Number(id), title: "Review Application", status: "PENDING", priority: "HIGH", createdAt: new Date().toISOString() } });
export const claimTask = async (id) => ({ success: true });
export const getWorkflowProgress = async (appId) => ({ success: true, data: { currentStage: "DOCUMENT_COLLECTION", completedStages: ["INTAKE"], pendingStages: ["VISA", "ENROLLMENT"] } });
export const completeTask = async (id, data) => ({ success: true });
export const getApplication = async (id) => ({ success: true, data: { id: Number(id), studentName: "John Doe", status: "UNDER_REVIEW" } });
export const getCourse = async (id) => ({ success: true, data: { id: Number(id), name: "M.Sc. Computer Science", university: "TU Munich" } });
export const getUniversity = async (id) => ({ success: true, data: { id: Number(id), name: "Technical University of Munich", country: "Germany" } });
export const getTaskRequirements = async (taskId) => ({ success: true, data: { taskId: Number(taskId), requiredDocuments: ["Transcript", "Passport"], requiredActions: ["Verify Documents"] } });
export const setApplicationFlags = async (appId, flags) => ({ success: true });
export const getStudentProfileForAdmin = async (id) => ({ success: true, data: { id: Number(id), firstName: "Jane", lastName: "Student", email: "jane@example.com", nationality: "Indian" } });
export const clearDashboardCache = () => {};

export default { getTasks, createTask, updateTask, getAllTasks, getTaskDetails, claimTask, getWorkflowProgress, completeTask, getApplication, getCourse, getUniversity, getTaskRequirements, setApplicationFlags, getStudentProfileForAdmin, clearDashboardCache };
