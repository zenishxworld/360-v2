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

export default { getVisaChecklists, getVisaAppointments, getMeetingUrl };
