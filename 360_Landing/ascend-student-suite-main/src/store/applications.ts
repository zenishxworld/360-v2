// Application Store — local application state management
// No Supabase, No Backend, No Database

import { localStorageService } from "@/services/localStorage";
import { Application, ApplicationStatus, mockApplications } from "@/data/mock/applications";

const APPS_KEY = "student_applications";

export interface NewApplication {
  studentId: number;
  studentName: string;
  universityId: number;
  universityName: string;
  courseId: number;
  courseName: string;
  country: string;
  targetSemester: string;
}

export const applicationStore = {
  getAll(): Application[] {
    const stored = localStorageService.get<Application[]>(APPS_KEY, []);
    return stored.length > 0 ? stored : mockApplications;
  },

  getById(id: number): Application | undefined {
    return this.getAll().find(a => a.id === id);
  },

  getByStudent(studentId: number): Application[] {
    return this.getAll().filter(a => a.studentId === studentId);
  },

  create(newApp: NewApplication): Application {
    const apps = this.getAll();
    const application: Application = {
      id: Math.max(0, ...apps.map(a => a.id)) + 1,
      studentId: newApp.studentId,
      studentName: newApp.studentName,
      universityId: newApp.universityId,
      universityName: newApp.universityName,
      courseId: newApp.courseId,
      courseName: newApp.courseName,
      country: newApp.country,
      status: "DRAFT",
      workflowStage: "INITIAL",
      assignedAdminId: 0,
      assignedAdminName: "Unassigned",
      appliedDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      targetSemester: newApp.targetSemester,
      isUrgent: false,
      progress: 5,
      documents: [],
      notes: "Application created",
    };
    apps.push(application);
    localStorageService.set(APPS_KEY, apps);
    return application;
  },

  updateStatus(id: number, status: ApplicationStatus): Application | undefined {
    const apps = this.getAll();
    const app = apps.find(a => a.id === id);
    if (app) {
      app.status = status;
      app.lastUpdated = new Date().toISOString();
      localStorageService.set(APPS_KEY, apps);
    }
    return app;
  },

  updateProgress(id: number, progress: number): Application | undefined {
    const apps = this.getAll();
    const app = apps.find(a => a.id === id);
    if (app) {
      app.progress = Math.min(100, Math.max(0, progress));
      app.lastUpdated = new Date().toISOString();
      localStorageService.set(APPS_KEY, apps);
    }
    return app;
  },

  delete(id: number): void {
    const apps = this.getAll().filter(a => a.id !== id);
    localStorageService.set(APPS_KEY, apps);
  },

  getStats() {
    const apps = this.getAll();
    const active = apps.filter(a => a.status !== "REJECTED").length;
    const accepted = apps.filter(a => a.status === "ACCEPTED").length;
    const submitted = apps.filter(a => a.status !== "DRAFT").length;
    return {
      total: apps.length,
      active,
      accepted,
      submitted,
      successRate: submitted > 0 ? Math.round((accepted / submitted) * 100) : 0,
    };
  },

  seed(): void {
    localStorageService.set(APPS_KEY, mockApplications);
  },
};
