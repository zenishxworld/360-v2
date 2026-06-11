import documents from "../../../../mock-data/documents.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

export const downloadDocument = async (id) => {
  await delay(200);
  return { success: true, url: "#" };
};

export default { getDocuments, uploadDocument, deleteDocument, downloadDocument };
