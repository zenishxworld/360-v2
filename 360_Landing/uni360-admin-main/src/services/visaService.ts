const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getVisaChecklists = async (params = {}) => {
  await delay(300);
  return {
    success: true,
    data: [
      { id: 1, country: "Germany", items: [{ name: "Valid Passport", status: "COMPLETED" }, { name: "University Admission", status: "PENDING" }] },
      { id: 2, country: "UK", items: [{ name: "CAS Letter", status: "COMPLETED" }, { name: "Financial Evidence", status: "PENDING" }] },
    ],
  };
};

export const getVisaAppointments = async () => {
  await delay(300);
  return {
    success: true,
    data: [
      { id: 1, studentName: "John Doe", type: "APS Interview", date: "2025-05-15", location: "Berlin", status: "SCHEDULED" },
    ],
  };
};

export const getMeetingUrl = async () => {
  await delay(200);
  return { success: true, data: { url: "#" } };
};

export const getAllVisaAppointments = async () => getVisaAppointments();
export const createVisaAppointment = async (payload) => ({ success: true, data: { id: Math.floor(Math.random() * 1000), ...payload, status: "SCHEDULED" } });
export const updateAppointmentStatus = async (id, status) => ({ success: true });
export const getStudentVisaAppointments = async (studentId) => ({ success: true, data: [] });
export const getMeetingUrls = async () => ({ success: true, data: [] });
export const saveMeetingUrl = async (data) => ({ success: true });

export type VisaAppointment = { id: number; studentName: string; type: string; date: string; location: string; status: string };
export type AppointmentStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED";
export type CreateAppointmentPayload = { studentName: string; type: string; date: string; location: string };

export default { getVisaChecklists, getVisaAppointments, getMeetingUrl, getAllVisaAppointments, createVisaAppointment, updateAppointmentStatus, getStudentVisaAppointments, getMeetingUrls, saveMeetingUrl };
