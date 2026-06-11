import students from "../../../../mock-data/students.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getUsers = async (params = {}) => {
  await delay(300);
  let result = [...students];
  if (params.search) {
    const s = params.search.toLowerCase();
    result = result.filter((u) => u.firstName.toLowerCase().includes(s) || u.lastName.toLowerCase().includes(s) || u.email.toLowerCase().includes(s));
  }
  if (params.status) result = result.filter((u) => u.status === params.status);
  return { success: true, data: result, pagination: { total: result.length, page: 0, size: 20, totalPages: 1 } };
};

export const getUserById = async (id) => {
  await delay(200);
  const user = students.find((s) => s.id === Number(id));
  return user ? { success: true, data: user } : { success: false, message: "User not found" };
};

export const updateUser = async (id, data) => {
  await delay(200);
  return { success: true, message: "User updated" };
};

export const deleteUser = async (id) => {
  await delay(200);
  return { success: true };
};

export const createUser = async (data) => {
  await delay(400);
  return { success: true, data: { id: Math.floor(Math.random() * 1000), ...data } };
};

export default { getUsers, getUserById, updateUser, deleteUser, createUser };
