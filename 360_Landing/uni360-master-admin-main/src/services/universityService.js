import universities from "../../../../mock-data/universities.json";
import courses from "../../../../mock-data/courses.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getUniversities = async (params = {}) => {
  await delay(300);
  let result = [...universities];
  if (params.search) {
    const s = params.search.toLowerCase();
    result = result.filter((u) => u.name.toLowerCase().includes(s));
  }
  if (params.country && params.country !== "all") result = result.filter((u) => u.country === params.country);
  return { success: true, data: result, pagination: { total: result.length, page: 0, size: 20 } };
};

export const getUniversityById = async (id) => {
  await delay(200);
  return universities.find((u) => u.id === Number(id)) || null;
};

export const createUniversity = async (data) => {
  await delay(400);
  return { success: true, data: { id: Math.floor(Math.random() * 1000), ...data } };
};

export const updateUniversity = async (id, data) => {
  await delay(200);
  return { success: true };
};

export const deleteUniversity = async (id) => {
  await delay(200);
  return { success: true };
};

export const getCourses = async (universityId) => {
  await delay(200);
  return courses.filter((c) => c.universityId === Number(universityId));
};

export const createCourse = async (data) => {
  await delay(400);
  return { success: true, data: { id: Math.floor(Math.random() * 1000), ...data } };
};

export const updateCourse = async (id, data) => {
  await delay(200);
  return { success: true };
};

export const deleteCourse = async (id) => {
  await delay(200);
  return { success: true };
};

export default { getUniversities, getUniversityById, createUniversity, updateUniversity, deleteUniversity, getCourses, createCourse, updateCourse, deleteCourse };
