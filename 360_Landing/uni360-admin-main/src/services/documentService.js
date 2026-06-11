import documents from "../../../../mock-data/documents.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const api = {
  interceptors: { request: { use: () => {} } },
  get: async (url, config) => ({ data: { success: true, data: documents } }),
  post: async (url, data, config) => ({ data: { success: true, data: { id: Math.floor(Math.random() * 1000) } } }),
  delete: async (url) => ({ data: { success: true } }),
};

export const getDocuments = async (params = {}) => {
  await delay(300);
  let result = [...documents];
  if (params.studentId) result = result.filter((d) => d.studentId === Number(params.studentId));
  if (params.status) result = result.filter((d) => d.status === params.status);
  return { success: true, data: result };
};

export const uploadDocument = async (file, metadata) => {
  await delay(500);
  return { success: true, data: { id: Math.floor(Math.random() * 1000), name: file?.name || "document.pdf", status: "PENDING" } };
};

export const deleteDocument = async (id) => {
  await delay(200);
  return { success: true };
};

export const getDocumentViewUrl = async (docId) => ({ success: true, url: "#" });
export const getStudentsList = async () => ({ success: true, data: [{ id: 1, name: "John Doe", email: "john@example.com" }, { id: 2, name: "Jane Smith", email: "jane@example.com" }] });
export const getMyDocuments = async () => getDocuments();
export const downloadDocument = async (docId) => ({ success: true, url: "#" });
export const getPendingDocuments = async () => ({ success: true, data: documents.filter((d) => d.status === "PENDING") });
export const getReviewedDocuments = async () => ({ success: true, data: documents.filter((d) => d.status === "REVIEWED" || d.status === "APPROVED") });
export const getStudentDocuments = async (studentId) => ({ success: true, data: documents.filter((d) => d.studentId === Number(studentId)) });
export const updateDocumentStatus = async (docId, status) => {
  await delay(200);
  return { success: true };
};

export default { getDocuments, uploadDocument, deleteDocument, getDocumentViewUrl, getStudentsList, getMyDocuments, downloadDocument, getPendingDocuments, getReviewedDocuments, getStudentDocuments, updateDocumentStatus };
