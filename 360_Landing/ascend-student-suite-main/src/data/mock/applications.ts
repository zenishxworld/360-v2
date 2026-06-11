// Mock Applications — sourced from /mock-data/applications.json
// Do NOT create Supabase tables for this data.

export type ApplicationStatus = "DRAFT" | "SUBMITTED" | "UNDER_REVIEW" | "ACCEPTED" | "REJECTED";

export interface ApplicationDocument {
  id: number;
  name: string;
  status: string;
}

export interface Application {
  id: number;
  studentId: number;
  studentName: string;
  universityId: number;
  universityName: string;
  courseId: number;
  courseName: string;
  country: string;
  status: ApplicationStatus;
  workflowStage: string;
  assignedAdminId: number;
  assignedAdminName: string;
  appliedDate: string;
  lastUpdated: string;
  targetSemester: string;
  isUrgent: boolean;
  progress: number;
  documents: ApplicationDocument[];
  notes: string;
}

export const mockApplications: Application[] = [
  {
    id: 1, studentId: 1, studentName: "John Doe", universityId: 1,
    universityName: "Technical University of Munich", courseId: 1,
    courseName: "M.Sc. Computer Science", country: "Germany",
    status: "UNDER_REVIEW", workflowStage: "DOCUMENT_VERIFICATION",
    assignedAdminId: 3, assignedAdminName: "Sarah Wilson",
    appliedDate: "2025-03-10T08:00:00Z", lastUpdated: "2025-04-05T14:30:00Z",
    targetSemester: "Winter 2025/26", isUrgent: false, progress: 65,
    documents: [
      { id: 1, name: "Transcript", status: "APPROVED" },
      { id: 2, name: "SOP", status: "PENDING" },
      { id: 3, name: "Passport", status: "APPROVED" }
    ],
    notes: "All documents verified except SOP"
  },
  {
    id: 2, studentId: 1, studentName: "John Doe", universityId: 2,
    universityName: "University of Cambridge", courseId: 3,
    courseName: "M.Eng. Mechanical Engineering", country: "UK",
    status: "ACCEPTED", workflowStage: "OFFER_LETTER",
    assignedAdminId: 4, assignedAdminName: "James Smith",
    appliedDate: "2025-01-15T09:00:00Z", lastUpdated: "2025-04-10T10:00:00Z",
    targetSemester: "Fall 2025", isUrgent: false, progress: 95,
    documents: [
      { id: 4, name: "Transcript", status: "APPROVED" },
      { id: 5, name: "LOR", status: "APPROVED" },
      { id: 6, name: "IELTS", status: "APPROVED" },
      { id: 7, name: "CV", status: "APPROVED" }
    ],
    notes: "Offer letter issued"
  },
  {
    id: 3, studentId: 1, studentName: "John Doe", universityId: 3,
    universityName: "ETH Zurich", courseId: 5,
    courseName: "M.Sc. Data Science", country: "Switzerland",
    status: "DRAFT", workflowStage: "INITIAL",
    assignedAdminId: 3, assignedAdminName: "Sarah Wilson",
    appliedDate: "2025-04-01T12:00:00Z", lastUpdated: "2025-04-01T12:00:00Z",
    targetSemester: "Fall 2025", isUrgent: false, progress: 10,
    documents: [],
    notes: "Application just started"
  }
];
