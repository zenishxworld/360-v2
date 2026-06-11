import students from "../../../../mock-data/students.json";
import universities from "../../../../mock-data/universities.json";
import courses from "../../../../mock-data/courses.json";
import applications from "../../../../mock-data/applications.json";
import notifications from "../../../../mock-data/notifications.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const universityAPI = {
  getUniversities: async (params = {}) => {
    await delay(300);
    let result = [...universities];
    if (params.search) {
      const s = params.search.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(s) ||
          u.city.toLowerCase().includes(s) ||
          u.country.toLowerCase().includes(s)
      );
    }
    if (params.country && params.country !== "all") {
      result = result.filter((u) => u.country === params.country);
    }
    return { data: result, totalCount: result.length };
  },

  getUniversityById: async (id) => {
    await delay(200);
    return universities.find((u) => u.id === Number(id)) || null;
  },

  getUniversityByCode: async (code) => {
    await delay(200);
    return universities.find((u) => u.code === code) || null;
  },

  getDynamicFilters: async (filterBy = null) => {
    await delay(200);
    if (filterBy === "country") return [...new Set(universities.map((u) => u.country))];
    if (filterBy === "city") return [...new Set(universities.map((u) => u.city))];
    if (filterBy === "degreeLevel") return ["Bachelor", "Master", "PhD"];
    return { countries: [...new Set(universities.map((u) => u.country))] };
  },

  searchUniversities: async (searchParams = {}) => {
    await delay(300);
    return { data: universities, totalCount: universities.length };
  },

  getUniversityCourses: async (universityId) => {
    await delay(200);
    return courses.filter((c) => c.universityId === Number(universityId));
  },

  getCities: async () => {
    await delay(200);
    return [...new Set(universities.map((u) => u.city))];
  },

  getFeaturedUniversities: async () => {
    await delay(300);
    return universities.slice(0, 3);
  },
};

const courseAPI = {
  getCourses: async (params = {}) => {
    await delay(300);
    let result = [...courses];
    if (params.search) {
      const s = params.search.toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(s));
    }
    if (params.degreeLevel && params.degreeLevel !== "all") {
      result = result.filter((c) => c.degreeLevel === params.degreeLevel);
    }
    return { data: result, totalCount: result.length };
  },

  getCourseById: async (id) => {
    await delay(200);
    return courses.find((c) => c.id === Number(id)) || null;
  },

  getSubjectAreas: async () => {
    await delay(200);
    return [...new Set(courses.map((c) => c.fieldOfStudy))];
  },

  getDegreeTypes: async () => {
    await delay(200);
    return ["Bachelor", "Master", "PhD", "MBA"];
  },
};

export { universityAPI, courseAPI };
export default { university: universityAPI, course: courseAPI };
