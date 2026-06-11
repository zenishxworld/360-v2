// Document Store — local document state management
// Do NOT integrate Supabase Storage yet.

import { localStorageService } from "@/services/localStorage";
import { Document, DocumentStatus, DocumentType, mockDocuments, DOCUMENT_CATEGORIES } from "@/data/mock/documents";

const DOCS_KEY = "student_documents";

export interface UploadDocumentInput {
  name: string;
  type: DocumentType;
  category: string;
  applicationId?: number;
  fileSize: number;
  fileType: string;
}

export const documentStore = {
  getAll(): Document[] {
    const stored = localStorageService.get<Document[]>(DOCS_KEY, []);
    return stored.length > 0 ? stored : mockDocuments;
  },

  getByStudent(studentId: number): Document[] {
    return this.getAll().filter(d => d.studentId === studentId);
  },

  getByApplication(applicationId: number): Document[] {
    return this.getAll().filter(d => d.applicationId === applicationId);
  },

  getByCategory(category: string): Document[] {
    return this.getAll().filter(d => d.category === category);
  },

  upload(input: UploadDocumentInput): Document {
    const docs = this.getAll();
    const newDoc: Document = {
      id: Math.max(0, ...docs.map(d => d.id)) + 1,
      studentId: 1, // mock student
      applicationId: input.applicationId ?? null,
      name: input.name,
      type: input.type,
      category: input.category,
      status: "UPLOADED",
      uploadDate: new Date().toISOString(),
      fileSize: input.fileSize,
      fileType: input.fileType,
      remarks: null,
    };
    docs.push(newDoc);
    localStorageService.set(DOCS_KEY, docs);
    return newDoc;
  },

  updateStatus(id: number, status: DocumentStatus, remarks?: string): Document | undefined {
    const docs = this.getAll();
    const doc = docs.find(d => d.id === id);
    if (doc) {
      doc.status = status;
      if (remarks !== undefined) doc.remarks = remarks;
      localStorageService.set(DOCS_KEY, docs);
    }
    return doc;
  },

  delete(id: number): void {
    const docs = this.getAll().filter(d => d.id !== id);
    localStorageService.set(DOCS_KEY, docs);
  },

  getStats() {
    const docs = this.getAll();
    const uploaded = docs.filter(d => d.status === "UPLOADED" || d.status === "APPROVED").length;
    const pending = docs.filter(d => d.status === "PENDING").length;
    const approved = docs.filter(d => d.status === "APPROVED").length;
    return {
      total: docs.length,
      uploaded,
      pending,
      approved,
    };
  },

  getCategoryCounts() {
    const docs = this.getAll();
    const counts: Record<string, { total: number; uploaded: number }> = {};
    for (const [key, cat] of Object.entries(DOCUMENT_CATEGORIES)) {
      const catDocs = docs.filter(d => d.category === cat.label);
      counts[key] = {
        total: catDocs.length,
        uploaded: catDocs.filter(d => d.status === "UPLOADED" || d.status === "APPROVED").length,
      };
    }
    return counts;
  },

  seed(): void {
    localStorageService.set(DOCS_KEY, mockDocuments);
  },
};
