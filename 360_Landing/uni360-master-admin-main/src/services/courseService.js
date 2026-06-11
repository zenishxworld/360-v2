import courses from "../../../../mock-data/courses.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getCourses = async (params = {}) => {
  await delay(300);
  let result = [...courses];
  if (params.universityId) result = result.filter((c) => c.universityId === Number(params.universityId));
  if (params.degreeLevel) result = result.filter((c) => c.degreeLevel === params.degreeLevel);
  return { success: true, data: result };
};

export const getCourseById = async (id) => {
  await delay(200);
  return courses.find((c) => c.id === Number(id)) || null;
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

export default { getCourses, getCourseById, createCourse, updateCourse, deleteCourse };
