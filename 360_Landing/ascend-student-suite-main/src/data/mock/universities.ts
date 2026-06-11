// Mock Universities — sourced from /mock-data/universities.json
// Do NOT create Supabase tables for this data.

export interface University {
  id: number;
  name: string;
  code: string;
  country: string;
  city: string;
  state: string;
  type: "PUBLIC" | "PRIVATE";
  ranking: number;
  qsRanking: number;
  description: string;
  website: string;
  language: string;
  degreeLevels: string[];
  programs: string[];
  tuitionFee: string;
  applicationFee: string;
  acceptanceRate: string;
  intake: string[];
  isActive: boolean;
  logoUrl: string;
}

export const mockUniversities: University[] = [
  {
    id: 1, name: "Technical University of Munich", code: "TUM", country: "Germany",
    city: "Munich", state: "Bavaria", type: "PUBLIC", ranking: 41, qsRanking: 37,
    description: "One of Europe's top technical universities, known for excellence in engineering and technology.",
    website: "https://www.tum.de", language: "German/English",
    degreeLevels: ["Bachelor", "Master", "PhD"],
    programs: ["Computer Science", "Engineering", "Physics", "Mathematics", "Chemistry"],
    tuitionFee: "€0 (Public University - Semester fee ~€152)", applicationFee: "€75",
    acceptanceRate: "15%", intake: ["Winter", "Summer"], isActive: true,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/TU_Muenchen_Logo.svg/1200px-TU_Muenchen_Logo.svg.png"
  },
  {
    id: 2, name: "University of Cambridge", code: "CAM", country: "UK",
    city: "Cambridge", state: "England", type: "PUBLIC", ranking: 3, qsRanking: 2,
    description: "World-renowned collegiate research university, one of the oldest and most prestigious in the world.",
    website: "https://www.cam.ac.uk", language: "English",
    degreeLevels: ["Bachelor", "Master", "PhD"],
    programs: ["Computer Science", "Engineering", "Mathematics", "Economics", "Law"],
    tuitionFee: "£33,972 per year (International)", applicationFee: "£60",
    acceptanceRate: "21%", intake: ["Fall"], isActive: true,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/University_of_Cambridge_coat_of_arms.svg/1200px-University_of_Cambridge_coat_of_arms.svg.png"
  },
  {
    id: 3, name: "ETH Zurich", code: "ETH", country: "Switzerland",
    city: "Zurich", state: "Zurich", type: "PUBLIC", ranking: 8, qsRanking: 7,
    description: "Swiss federal institute of technology, consistently ranked among the world's top universities.",
    website: "https://ethz.ch", language: "German/English",
    degreeLevels: ["Bachelor", "Master", "PhD"],
    programs: ["Computer Science", "Engineering", "Natural Sciences", "Architecture"],
    tuitionFee: "CHF 1,298 per semester", applicationFee: "CHF 150",
    acceptanceRate: "27%", intake: ["Fall", "Spring"], isActive: true,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/ETH_Zurich_Logo.svg/1200px-ETH_Zurich_Logo.svg.png"
  },
  {
    id: 4, name: "University of Oxford", code: "OXF", country: "UK",
    city: "Oxford", state: "England", type: "PUBLIC", ranking: 2, qsRanking: 3,
    description: "The oldest university in the English-speaking world, renowned for research and academic excellence.",
    website: "https://www.ox.ac.uk", language: "English",
    degreeLevels: ["Bachelor", "Master", "PhD"],
    programs: ["Computer Science", "Engineering", "Medicine", "Law", "Economics"],
    tuitionFee: "£35,080 per year (International)", applicationFee: "£75",
    acceptanceRate: "17%", intake: ["Fall"], isActive: true,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/University_of_Oxford_arms.svg/1200px-University_of_Oxford_arms.svg.png"
  },
  {
    id: 5, name: "Imperial College London", code: "IMP", country: "UK",
    city: "London", state: "England", type: "PUBLIC", ranking: 7, qsRanking: 6,
    description: "World-leading science, engineering, medicine and business university with a global reputation.",
    website: "https://www.imperial.ac.uk", language: "English",
    degreeLevels: ["Bachelor", "Master", "PhD"],
    programs: ["Computer Science", "Engineering", "Medicine", "Business"],
    tuitionFee: "£34,000 per year (International)", applicationFee: "£80",
    acceptanceRate: "14%", intake: ["Fall"], isActive: true,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Imperial_College_London_logo.svg/1200px-Imperial_College_London_logo.svg.png"
  },
  {
    id: 6, name: "University of Bologna", code: "UNIBO", country: "Italy",
    city: "Bologna", state: "Emilia-Romagna", type: "PUBLIC", ranking: 160, qsRanking: 154,
    description: "The oldest university in the Western world, founded in 1088.",
    website: "https://www.unibo.it", language: "Italian/English",
    degreeLevels: ["Bachelor", "Master", "PhD"],
    programs: ["Computer Science", "Engineering", "Medicine", "Law", "Arts"],
    tuitionFee: "€2,500-4,000 per year", applicationFee: "€50",
    acceptanceRate: "55%", intake: ["Fall"], isActive: true,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Unibo_logo.svg/1200px-Unibo_logo.svg.png"
  },
  {
    id: 7, name: "RWTH Aachen University", code: "RWTH", country: "Germany",
    city: "Aachen", state: "North Rhine-Westphalia", type: "PUBLIC", ranking: 99, qsRanking: 106,
    description: "Germany's largest technical university, known for engineering excellence.",
    website: "https://www.rwth-aachen.de", language: "German/English",
    degreeLevels: ["Bachelor", "Master", "PhD"],
    programs: ["Computer Science", "Engineering", "Natural Sciences"],
    tuitionFee: "€0 (Public University)", applicationFee: "€0",
    acceptanceRate: "30%", intake: ["Winter", "Summer"], isActive: true,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/RWTH_Aachen_Logo.svg/1200px-RWTH_Aachen_Logo.svg.png"
  },
  {
    id: 8, name: "University of Heidelberg", code: "HEI", country: "Germany",
    city: "Heidelberg", state: "Baden-Württemberg", type: "PUBLIC", ranking: 64, qsRanking: 63,
    description: "Germany's oldest university, with a strong focus on research and life sciences.",
    website: "https://www.uni-heidelberg.de", language: "German/English",
    degreeLevels: ["Bachelor", "Master", "PhD"],
    programs: ["Computer Science", "Medicine", "Physics", "Life Sciences"],
    tuitionFee: "€0 (Public University)", applicationFee: "€0",
    acceptanceRate: "25%", intake: ["Winter", "Summer"], isActive: true,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Uni_Heidelberg_Logo.svg/1200px-Uni_Heidelberg_Logo.svg.png"
  },
  {
    id: 9, name: "Politecnico di Milano", code: "POLIMI", country: "Italy",
    city: "Milan", state: "Lombardy", type: "PUBLIC", ranking: 123, qsRanking: 111,
    description: "Italy's top technical university, known for engineering, architecture, and design.",
    website: "https://www.polimi.it", language: "Italian/English",
    degreeLevels: ["Bachelor", "Master", "PhD"],
    programs: ["Computer Science", "Engineering", "Architecture", "Design"],
    tuitionFee: "€3,900 per year", applicationFee: "€50",
    acceptanceRate: "40%", intake: ["Fall"], isActive: true,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Politecnico_di_Milano_logo.svg/1200px-Politecnico_di_Milano_logo.svg.png"
  },
  {
    id: 10, name: "University of Belgrade", code: "BG", country: "Serbia",
    city: "Belgrade", state: "Belgrade", type: "PUBLIC", ranking: 900, qsRanking: 900,
    description: "Serbia's largest and most prestigious university, offering comprehensive programs.",
    website: "https://www.bg.ac.rs", language: "Serbian/English",
    degreeLevels: ["Bachelor", "Master", "PhD"],
    programs: ["Computer Science", "Engineering", "Medicine", "Law", "Economics"],
    tuitionFee: "€2,000-3,000 per year", applicationFee: "€30",
    acceptanceRate: "65%", intake: ["Fall"], isActive: true,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/University_of_Belgrade_logo.svg/1200px-University_of_Belgrade_logo.svg.png"
  },
  {
    id: 11, name: "University of Arts London", code: "UAL", country: "UK",
    city: "London", state: "England", type: "PUBLIC", ranking: 350, qsRanking: 370,
    description: "Europe's largest specialist art and design university.",
    website: "https://www.arts.ac.uk", language: "English",
    degreeLevels: ["Bachelor", "Master"],
    programs: ["Fine Arts", "Design", "Fashion", "Media"],
    tuitionFee: "£25,970 per year", applicationFee: "£45",
    acceptanceRate: "22%", intake: ["Fall"], isActive: true,
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/University_of_the_Arts_London_logo.svg/1200px-University_of_the_Arts_London_logo.svg.png"
  },
  {
    id: 12, name: "University of Stuttgart", code: "USTUTT", country: "Germany",
    city: "Stuttgart", state: "Baden-Württemberg", type: "PUBLIC", ranking: 176, qsRanking: 214,
    description: "Renowned for engineering, especially automotive and aerospace.",
    website: "https://www.uni-stuttgart.de", language: "German/English",
    degreeLevels: ["Bachelor", "Master", "PhD"],
    programs: ["Computer Science", "Engineering", "Aerospace", "Architecture"],
    tuitionFee: "€0 (Public University)", applicationFee: "€75",
    acceptanceRate: "35%", intake: ["Winter", "Summer"], isActive: true,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Uni_Stuttgart_Logo.svg/1200px-Uni_Stuttgart_Logo.svg.png"
  }
];
