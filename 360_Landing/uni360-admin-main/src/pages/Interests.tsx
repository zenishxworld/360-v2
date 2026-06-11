import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  GraduationCap, MapPin, Bookmark, Heart, Send,
  FileText, User, Star, Clock
} from "lucide-react";

// ── Local Storage Keys ──────────────────────────────────────
const STORAGE_PREFIX = "uni360_";
const readStore = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
};

interface SavedUniversity { universityId: number; savedAt: string; }
interface SavedCourse { courseId: number; universityId: number; savedAt: string; }
interface StudentPreferences {
  preferredCountries: string[];
  degreeLevel: string;
  targetCourse: string;
  cgpa: number;
  ielts: number;
  toefl: number | null;
  pte: number | null;
  gre: number | null;
  gmat: number | null;
  workExperience: string;
}
interface ApplicationDoc { id: number; name: string; status: string; }
interface Application {
  id: number; studentId: number; studentName: string;
  universityId: number; universityName: string;
  courseId: number; courseName: string;
  country: string; status: string; targetSemester: string;
  progress: number; documents: ApplicationDoc[];
}
interface Document {
  id: number; studentId: number; name: string;
  type: string; category: string; status: string;
  uploadDate: string; fileSize: number; fileType: string;
}

// ── Mock university data for reference ──────────────────────
const MOCK_UNIS: Record<number, { name: string; country: string; qsRanking: number }> = {
  1: { name: "Technical University of Munich", country: "Germany", qsRanking: 37 },
  2: { name: "University of Cambridge", country: "UK", qsRanking: 2 },
  3: { name: "ETH Zurich", country: "Switzerland", qsRanking: 7 },
  4: { name: "University of Oxford", country: "UK", qsRanking: 3 },
  5: { name: "Imperial College London", country: "UK", qsRanking: 6 },
  6: { name: "University of Bologna", country: "Italy", qsRanking: 154 },
  7: { name: "RWTH Aachen University", country: "Germany", qsRanking: 106 },
  8: { name: "University of Heidelberg", country: "Germany", qsRanking: 63 },
  9: { name: "Politecnico di Milano", country: "Italy", qsRanking: 111 },
  10: { name: "University of Belgrade", country: "Serbia", qsRanking: 900 },
};

const MOCK_COURSES: Record<number, { name: string; universityId: number }> = {
  1: { name: "M.Sc. Computer Science", universityId: 1 },
  2: { name: "B.Sc. Informatics", universityId: 1 },
  3: { name: "M.Eng. Mechanical Engineering", universityId: 2 },
  4: { name: "B.A. Computer Science", universityId: 2 },
  5: { name: "M.Sc. Data Science", universityId: 3 },
  6: { name: "MBA", universityId: 4 },
  7: { name: "M.Sc. Computer Science", universityId: 4 },
  8: { name: "B.Eng. Electrical Engineering", universityId: 5 },
  9: { name: "M.Sc. Mechanical Engineering", universityId: 7 },
  10: { name: "M.Sc. Computer Science", universityId: 8 },
};

const STATUS_COLORS: Record<string, string> = {
  DRAFT: "bg-yellow-100 text-yellow-800",
  SUBMITTED: "bg-blue-100 text-blue-800",
  UNDER_REVIEW: "bg-purple-100 text-purple-800",
  ACCEPTED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  UPLOADED: "bg-blue-100 text-blue-800",
  APPROVED: "bg-green-100 text-green-800",
  PENDING: "bg-yellow-100 text-yellow-800",
};

export default function Interests() {
  const [activeTab, setActiveTab] = useState("applications");

  const savedUnis = readStore<SavedUniversity[]>("saved_universities", []);
  const savedCourses = readStore<SavedCourse[]>("saved_courses", []);
  const preferences = readStore<StudentPreferences>("student_preferences", {
    preferredCountries: [], degreeLevel: "", targetCourse: "",
    cgpa: 0, ielts: 0, toefl: null, pte: null, gre: null, gmat: null, workExperience: "",
  });
  const applications = readStore<Application[]>("student_applications", []);
  const documents = readStore<Document[]>("student_documents", []);

  const appStats = {
    total: applications.length,
    draft: applications.filter(a => a.status === "DRAFT").length,
    submitted: applications.filter(a => a.status === "SUBMITTED").length,
    underReview: applications.filter(a => a.status === "UNDER_REVIEW").length,
    accepted: applications.filter(a => a.status === "ACCEPTED").length,
    rejected: applications.filter(a => a.status === "REJECTED").length,
  };

  return (
    <motion.div
      className="p-6 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-2xl font-bold text-[#2C3539] mb-1">Student Interests</h1>
      <p className="text-muted-foreground text-sm mb-8">
        Overview of student preferences, saved items, applications, and documents
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="applications">Applications ({appStats.total})</TabsTrigger>
          <TabsTrigger value="saved">Saved Items</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="documents">Documents ({documents.length})</TabsTrigger>
        </TabsList>

        {/* Applications Tab */}
        <TabsContent value="applications">
          {/* Stats */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
            {[
              { label: "Total", value: appStats.total },
              { label: "Drafts", value: appStats.draft, color: "text-yellow-600" },
              { label: "Submitted", value: appStats.submitted, color: "text-blue-600" },
              { label: "In Review", value: appStats.underReview, color: "text-purple-600" },
              { label: "Accepted", value: appStats.accepted, color: "text-green-600" },
              { label: "Rejected", value: appStats.rejected, color: "text-red-600" },
            ].map(s => (
              <Card key={s.label} className="p-3 text-center bg-white border">
                <p className={cn("text-xl font-bold", s.color || "text-[#2C3539]")}>{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </Card>
            ))}
          </div>

          {applications.length === 0 ? (
            <Card className="p-8 text-center">
              <Send className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No applications yet</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {applications.map(app => (
                <Card key={app.id} className="p-4 bg-white border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-[#2C3539]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#2C3539]">{app.universityName}</p>
                        <p className="text-sm text-muted-foreground">{app.courseName}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <MapPin className="w-3 h-3" /> {app.country}
                          <span>·</span>
                          <Clock className="w-3 h-3" /> {app.targetSemester}
                          <span>·</span>
                          <User className="w-3 h-3" /> {app.studentName}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#E08D3C] rounded-full" style={{ width: `${app.progress}%` }} />
                      </div>
                      <Badge className={cn("text-xs", STATUS_COLORS[app.status] || "")}>
                        {app.status}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Saved Items Tab */}
        <TabsContent value="saved">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Saved Universities */}
            <div>
              <h3 className="font-semibold text-[#2C3539] mb-3 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-[#E08D3C]" /> Saved Universities ({savedUnis.length})
              </h3>
              {savedUnis.length === 0 ? (
                <Card className="p-4 text-center text-sm text-muted-foreground">
                  No saved universities
                </Card>
              ) : (
                <div className="space-y-2">
                  {savedUnis.map(s => {
                    const uni = MOCK_UNIS[s.universityId];
                    return (
                      <Card key={s.universityId} className="p-3 bg-white border">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                          <span className="font-medium text-sm">{uni?.name || `ID #${s.universityId}`}</span>
                          {uni && <Badge variant="secondary" className="text-[10px]">{uni.country} · QS #{uni.qsRanking}</Badge>}
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1">
                          Saved {new Date(s.savedAt).toLocaleDateString()}
                        </p>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Saved Courses */}
            <div>
              <h3 className="font-semibold text-[#2C3539] mb-3 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-[#C4DFF0]" /> Saved Courses ({savedCourses.length})
              </h3>
              {savedCourses.length === 0 ? (
                <Card className="p-4 text-center text-sm text-muted-foreground">
                  No saved courses
                </Card>
              ) : (
                <div className="space-y-2">
                  {savedCourses.map(s => {
                    const course = MOCK_COURSES[s.courseId];
                    const uni = MOCK_UNIS[s.universityId];
                    return (
                      <Card key={s.courseId} className="p-3 bg-white border">
                        <span className="font-medium text-sm">{course?.name || `Course #${s.courseId}`}</span>
                        <p className="text-xs text-muted-foreground">{uni?.name || `Uni #${s.universityId}`}</p>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card className="p-6 bg-white border">
            <h3 className="font-semibold text-[#2C3539] mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-[#E08D3C]" /> Student Preferences
            </h3>
            {!preferences.preferredCountries.length && !preferences.degreeLevel ? (
              <p className="text-muted-foreground text-sm">Student hasn't set preferences yet.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {preferences.preferredCountries.length > 0 && (
                  <div className="p-3 rounded-xl bg-gray-50">
                    <p className="text-xs text-muted-foreground">Countries</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {preferences.preferredCountries.map(c => (
                        <Badge key={c} variant="secondary" className="text-[10px]">{c}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {preferences.degreeLevel && (
                  <DetailCard label="Degree" value={preferences.degreeLevel} />
                )}
                {preferences.targetCourse && (
                  <DetailCard label="Target Course" value={preferences.targetCourse} />
                )}
                {preferences.cgpa > 0 && (
                  <DetailCard label="CGPA" value={String(preferences.cgpa)} />
                )}
                {preferences.ielts > 0 && (
                  <DetailCard label="IELTS" value={String(preferences.ielts)} />
                )}
                {preferences.toefl && (
                  <DetailCard label="TOEFL" value={String(preferences.toefl)} />
                )}
                {preferences.pte && (
                  <DetailCard label="PTE" value={String(preferences.pte)} />
                )}
                {preferences.gre && (
                  <DetailCard label="GRE" value={String(preferences.gre)} />
                )}
                {preferences.gmat && (
                  <DetailCard label="GMAT" value={String(preferences.gmat)} />
                )}
                {preferences.workExperience && (
                  <DetailCard label="Work Experience" value={preferences.workExperience} />
                )}
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          {documents.length === 0 ? (
            <Card className="p-8 text-center">
              <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No documents uploaded</p>
            </Card>
          ) : (
            <div className="space-y-2">
              {documents.map(doc => (
                <Card key={doc.id} className="p-3 bg-white border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-blue-400 bg-blue-50 p-1.5 rounded-lg" />
                    <div>
                      <p className="font-medium text-sm text-[#2C3539]">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.category} · {doc.fileSize > 0 ? `${(doc.fileSize / 1024).toFixed(0)} KB` : "—"}
                        {doc.uploadDate && ` · ${new Date(doc.uploadDate).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                  <Badge className={cn("text-xs", STATUS_COLORS[doc.status] || "")}>
                    {doc.status}
                  </Badge>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl bg-gray-50">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-semibold text-[#2C3539] text-sm">{value}</p>
    </div>
  );
}
