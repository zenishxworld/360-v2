const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockAdmins = [
  { id: 1, username: "admin", email: "admin@uni360.com", firstName: "Admin", lastName: "Super", userType: "MASTER_ADMIN", status: "ACTIVE" },
  { id: 2, username: "sarah.wilson", email: "sarah.wilson@uni360.com", firstName: "Sarah", lastName: "Wilson", userType: "ADMIN", status: "ACTIVE" },
  { id: 3, username: "james.smith", email: "james.smith@uni360.com", firstName: "James", lastName: "Smith", userType: "COUNSELOR", status: "ACTIVE" },
];

export const fetchAdmins = async (params = {}) => {
  await delay(300);
  return {
    success: true,
    data: { users: mockAdmins, pagination: { total: mockAdmins.length, page: 1, totalPages: 1, pageSize: 10 } },
  };
};

export const getAdmins = async (params = {}) => {
  await delay(300);
  return { success: true, data: mockAdmins };
};

export const getAdminById = async (id) => {
  await delay(200);
  const admin = mockAdmins.find((a) => a.id === Number(id)) || mockAdmins[0];
  return { success: true, data: admin };
};

export const createAdmin = async (adminData) => {
  await delay(400);
  return { success: true, data: { id: Math.floor(Math.random() * 1000), ...adminData, status: "ACTIVE" } };
};

export const updateAdmin = async (id, adminData) => {
  await delay(200);
  return { success: true };
};

export const deleteAdmin = async (id) => {
  await delay(200);
  return { success: true };
};

// Additional methods that might be called by adminRequestsSlice
export const fetchAdminFilters = async (params) => ({ success: true, data: { roles: ["ADMIN", "COUNSELOR", "SUPER_ADMIN"], statuses: ["ACTIVE", "INACTIVE", "PENDING"] } });
export const fetchAdminPermissions = async (adminUuid) => ({ success: true, data: { permissions: ["READ", "WRITE", "DELETE"] } });
export const updateAdminPermissions = async (adminUuid, permissionsData) => ({ success: true, data: { permissions: permissionsData.permissions } });
export const fetchAllPermissions = async () => ({ success: true, data: ["ALL", "MANAGE_STUDENTS", "MANAGE_APPLICATIONS", "MANAGE_DOCUMENTS", "MANAGE_PAYMENTS"] });
export const getClientIP = async () => "127.0.0.1";

export default { getAdmins, getAdminById, createAdmin, updateAdmin, deleteAdmin, fetchAdmins, fetchAdminFilters, fetchAdminPermissions, updateAdminPermissions, fetchAllPermissions, getClientIP };
