import documents from "../../../../mock-data/documents.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getDocuments = async (filters = {}) => {
  await delay(300);
  let result = [...documents];
  if (filters.studentId) result = result.filter((d) => d.studentId === Number(filters.studentId));
  if (filters.status) result = result.filter((d) => d.status === filters.status);
  return { success: true, data: result };
};

export const uploadDocument = async (file, metadata = {}) => {
  await delay(500);
  return {
    success: true,
    data: { id: Math.floor(Math.random() * 1000), name: file.name || "document.pdf", status: "PENDING", uploadDate: new Date().toISOString() },
  };
};

export const deleteDocument = async (documentId) => {
  await delay(200);
  return { success: true };
};

export const downloadDocument = async (documentId) => {
  await delay(200);
  return { success: true, url: "#" };
};

export const downloadDocumentById = async (id) => ({ success: true, url: "#" });

export default { getDocuments, uploadDocument, deleteDocument, downloadDocument, downloadDocumentById };
