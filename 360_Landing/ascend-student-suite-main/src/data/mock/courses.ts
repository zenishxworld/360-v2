// Mock Courses — sourced from /mock-data/courses.json
// Do NOT create Supabase tables for this data.

export interface Course {
  id: number;
  universityId: number;
  name: string;
  degreeLevel: string;
  language: string;
  duration: string;
  tuitionFee: string;
  fieldOfStudy: string;
  description: string;
}

export const mockCourses: Course[] = [
  { id: 1, universityId: 1, name: "M.Sc. Computer Science", degreeLevel: "Master", language: "English", duration: "4 semesters", tuitionFee: "€0", fieldOfStudy: "Computer Science", description: "Comprehensive computer science program with specializations in AI, Software Engineering, and Data Science." },
  { id: 2, universityId: 1, name: "B.Sc. Informatics", degreeLevel: "Bachelor", language: "German/English", duration: "6 semesters", tuitionFee: "€0", fieldOfStudy: "Computer Science", description: "Undergraduate program covering all aspects of computer science and information systems." },
  { id: 3, universityId: 2, name: "M.Eng. Mechanical Engineering", degreeLevel: "Master", language: "English", duration: "3 semesters", tuitionFee: "£33,972/year", fieldOfStudy: "Engineering", description: "Advanced mechanical engineering program with research-led teaching." },
  { id: 4, universityId: 2, name: "B.A. Computer Science", degreeLevel: "Bachelor", language: "English", duration: "6 semesters", tuitionFee: "£33,972/year", fieldOfStudy: "Computer Science", description: "A broad computer science education with strong theoretical foundations." },
  { id: 5, universityId: 3, name: "M.Sc. Data Science", degreeLevel: "Master", language: "English", duration: "4 semesters", tuitionFee: "CHF 1,298/semester", fieldOfStudy: "Data Science", description: "Rigorous program covering machine learning, statistics, and big data technologies." },
  { id: 6, universityId: 4, name: "MBA", degreeLevel: "Master", language: "English", duration: "12 months", tuitionFee: "£63,000", fieldOfStudy: "Business", description: "Top-ranked MBA program developing future business leaders." },
  { id: 7, universityId: 4, name: "M.Sc. Computer Science", degreeLevel: "Master", language: "English", duration: "3 semesters", tuitionFee: "£35,080/year", fieldOfStudy: "Computer Science", description: "Advanced computer science program with world-class research opportunities." },
  { id: 8, universityId: 5, name: "B.Eng. Electrical Engineering", degreeLevel: "Bachelor", language: "English", duration: "6 semesters", tuitionFee: "£34,000/year", fieldOfStudy: "Engineering", description: "A comprehensive electrical engineering program with strong industry links." },
  { id: 9, universityId: 7, name: "M.Sc. Mechanical Engineering", degreeLevel: "Master", language: "German/English", duration: "4 semesters", tuitionFee: "€0", fieldOfStudy: "Engineering", description: "Advanced mechanical engineering with focus on production and automotive." },
  { id: 10, universityId: 8, name: "M.Sc. Computer Science", degreeLevel: "Master", language: "English", duration: "4 semesters", tuitionFee: "€0", fieldOfStudy: "Computer Science", description: "Research-oriented computer science program with multiple specialization tracks." },
  { id: 11, universityId: 1, name: "M.Sc. Data Engineering", degreeLevel: "Master", language: "English", duration: "4 semesters", tuitionFee: "€0", fieldOfStudy: "Data Science", description: "Focus on big data systems, ETL pipelines, and cloud data platforms." },
  { id: 12, universityId: 3, name: "M.Sc. Robotics & AI", degreeLevel: "Master", language: "English", duration: "4 semesters", tuitionFee: "CHF 1,298/semester", fieldOfStudy: "Engineering", description: "Cutting-edge robotics combined with artificial intelligence." },
  { id: 13, universityId: 6, name: "M.Sc. Computer Science", degreeLevel: "Master", language: "English", duration: "4 semesters", tuitionFee: "€3,500/year", fieldOfStudy: "Computer Science", description: "International computer science program at Europe's oldest university." },
  { id: 14, universityId: 9, name: "M.Sc. Artificial Intelligence", degreeLevel: "Master", language: "English", duration: "4 semesters", tuitionFee: "€3,900/year", fieldOfStudy: "Computer Science", description: "Comprehensive AI program covering deep learning, NLP, and computer vision." },
  { id: 15, universityId: 10, name: "M.Sc. Software Engineering", degreeLevel: "Master", language: "English", duration: "3 semesters", tuitionFee: "€2,500/year", fieldOfStudy: "Computer Science", description: "Practical software engineering education with industry projects." }
];
