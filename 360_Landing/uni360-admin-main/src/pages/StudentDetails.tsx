import React, { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Mail, Phone, MapPin, Calendar, GraduationCap,
  FileText, BookOpen, Star, Globe, Briefcase, Check, X,
  AlertCircle, Clock, Plus, Trash2, ChevronDown, ChevronUp,
  Edit3, User, Flag, Award, TrendingUp, Building, Target,
  CheckCircle2, Circle, Zap, StickyNote, Save,
} from 'lucide-react';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import {
  mockStudents, mockApplications, mockDocuments, mockInterestedUniversities,
  mockSavedCourses, mockTimeline,
  getNotesForStudent, saveNote, deleteNote,
  type MockApplication, type MockDocument, type AppStatus, type DocStatus,
  type MockNote,
} from '../store/mockStore';

// ── Helpers ──────────────────────────────────────────────────

const getInitials = (f: string, l: string) => `${f[0] ?? ''}${l[0] ?? ''}`.toUpperCase();

const gradients = [
  'from-violet-500 to-purple-600', 'from-blue-500 to-cyan-600',
  'from-emerald-500 to-teal-600', 'from-orange-500 to-amber-600',
  'from-pink-500 to-rose-600',   'from-indigo-500 to-blue-600',
];

const studentIndex = (id: string) =>
  mockStudents.findIndex((s) => s.id === id) % gradients.length;

const appStatusCfg: Record<AppStatus, { bg: string; badge: string }> = {
  Draft:         { bg: 'bg-gray-100',   badge: 'text-gray-600' },
  Submitted:     { bg: 'bg-blue-100',   badge: 'text-blue-700' },
  'Under Review':{ bg: 'bg-amber-100',  badge: 'text-amber-700' },
  Accepted:      { bg: 'bg-emerald-100',badge: 'text-emerald-700' },
  Rejected:      { bg: 'bg-red-100',    badge: 'text-red-700' },
};

const docStatusCfg: Record<DocStatus, { bg: string; icon: React.ElementType }> = {
  Approved: { bg: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  Pending:  { bg: 'bg-amber-100  text-amber-700',   icon: Clock },
  Rejected: { bg: 'bg-red-100    text-red-700',     icon: X },
  Missing:  { bg: 'bg-gray-100   text-gray-500',    icon: Circle },
};

const ALL_APP_STATUSES: AppStatus[] = ['Draft', 'Submitted', 'Under Review', 'Accepted', 'Rejected'];

const timelineIconMap: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  preferences:    { icon: Star,           color: 'text-amber-600',  bg: 'bg-amber-100' },
  recommendation: { icon: Zap,            color: 'text-violet-600', bg: 'bg-violet-100' },
  university:     { icon: Building,       color: 'text-blue-600',   bg: 'bg-blue-100' },
  application:    { icon: FileText,       color: 'text-indigo-600', bg: 'bg-indigo-100' },
  document:       { icon: GraduationCap,  color: 'text-teal-600',   bg: 'bg-teal-100' },
  status:         { icon: TrendingUp,     color: 'text-emerald-600',bg: 'bg-emerald-100' },
};

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

const fmtDateTime = (d: string) =>
  new Date(d).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

// ── Main Component ────────────────────────────────────────────

export const StudentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const student = useMemo(() => mockStudents.find((s) => s.id === id), [id]);
  const gradient = gradients[studentIndex(id ?? '0')];

  // ── Local state for mutable data ──
  const [applications, setApplications] = useState<MockApplication[]>(
    () => mockApplications.filter((a) => a.studentId === id)
  );
  const [documents, setDocuments] = useState<MockDocument[]>(
    () => mockDocuments.filter((d) => d.studentId === id)
  );
  const [notes, setNotes] = useState<MockNote[]>(() => getNotesForStudent(id ?? ''));
  const [noteInput, setNoteInput] = useState('');
  const [activeStatusMenu, setActiveStatusMenu] = useState<string | null>(null);

  // Dialog state
  const [docDialog, setDocDialog] = useState<MockDocument | null>(null);
  const [docAction, setDocAction] = useState<'approve' | 'reject' | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const interestedUniversities = useMemo(
    () => mockInterestedUniversities.filter((u) => u.studentId === id),
    [id]
  );
  const savedCourses = useMemo(
    () => mockSavedCourses.filter((c) => c.studentId === id),
    [id]
  );
  const timeline = useMemo(
    () => mockTimeline.filter((t) => t.studentId === id).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ),
    [id]
  );

  // ── Handlers ──────────────────────────────────────────────

  const handleStatusChange = useCallback((appId: string, newStatus: AppStatus) => {
    setApplications((prev) =>
      prev.map((a) => a.id === appId ? { ...a, status: newStatus } : a)
    );
    setActiveStatusMenu(null);
    toast({ title: 'Status Updated', description: `Application status changed to "${newStatus}"` });
  }, [toast]);

  const handleDocAction = useCallback((action: 'approve' | 'reject', reason?: string) => {
    if (!docDialog) return;
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === docDialog.id
          ? { ...d, status: action === 'approve' ? 'Approved' : 'Rejected', remarks: reason ?? d.remarks }
          : d
      )
    );
    toast({ title: action === 'approve' ? 'Document Approved' : 'Document Rejected', description: docDialog.name });
    setDocDialog(null);
    setDocAction(null);
    setRejectReason('');
  }, [docDialog, toast]);

  const handleAddNote = useCallback(() => {
    if (!noteInput.trim() || !id) return;
    const newNote: MockNote = {
      id: `note-${Date.now()}`,
      studentId: id,
      content: noteInput.trim(),
      createdAt: new Date().toISOString(),
      createdBy: 'Admin',
    };
    saveNote(newNote);
    setNotes((prev) => [...prev, newNote]);
    setNoteInput('');
    toast({ title: 'Note Saved' });
  }, [noteInput, id, toast]);

  const handleDeleteNote = useCallback((noteId: string) => {
    deleteNote(noteId);
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
    toast({ title: 'Note Deleted' });
  }, [toast]);

  // ── Not found ─────────────────────────────────────────────

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <AlertCircle className="w-12 h-12 text-muted-foreground" />
        <p className="text-muted-foreground">Student not found.</p>
        <Button onClick={() => navigate('/students')}>Back to Students</Button>
      </div>
    );
  }

  const fullName = `${student.firstName} ${student.lastName}`;
  const docsByCategory = {
    Personal:  documents.filter((d) => d.category === 'Personal'),
    Academic:  documents.filter((d) => d.category === 'Academic'),
    Language:  documents.filter((d) => d.category === 'Language'),
    Financial: documents.filter((d) => d.category === 'Financial'),
    SOP:       documents.filter((d) => d.category === 'SOP'),
    LOR:       documents.filter((d) => d.category === 'LOR'),
  };

  return (
    <div className="space-y-6">
      {/* ── Back + Header ─────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Button variant="ghost" size="sm" onClick={() => navigate('/students')} className="mb-4 gap-1.5">
          <ArrowLeft className="w-4 h-4" />
          Back to Students
        </Button>

        {/* Profile banner */}
        <Card className="overflow-hidden border-0 shadow-md">
          <div className={`h-24 bg-gradient-to-r ${gradient} relative`}>
            <div className="absolute inset-0 bg-black/10" />
          </div>
          <CardContent className="p-5 pt-0 -mt-10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="flex items-end gap-4">
                <Avatar className="h-20 w-20 border-4 border-background shadow-lg shrink-0">
                  <AvatarFallback className={`bg-gradient-to-br ${gradient} text-white font-bold text-2xl`}>
                    {getInitials(student.firstName, student.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div className="pb-1">
                  <h1 className="text-2xl font-bold">{fullName}</h1>
                  <p className="text-sm text-muted-foreground">{student.email}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="text-xs gap-1">
                      <Flag className="w-3 h-3" />{student.nationality}
                    </Badge>
                    <Badge variant="outline" className="text-xs gap-1">
                      <MapPin className="w-3 h-3" />{student.targetCountries.join(', ')}
                    </Badge>
                    <Badge variant="outline" className="text-xs gap-1">
                      <GraduationCap className="w-3 h-3" />{student.targetCourse}
                    </Badge>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      student.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                      student.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="flex gap-3 pb-1 shrink-0">
                {[
                  { label: 'Applications', value: applications.length, color: 'text-blue-600' },
                  { label: 'Documents',    value: documents.length,    color: 'text-violet-600' },
                  { label: 'Interested',   value: interestedUniversities.length, color: 'text-amber-600' },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Profile Completion</span>
                <span className="font-medium">{student.profileProgress}%</span>
              </div>
              <Progress value={student.profileProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Tabs ──────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-muted p-1 rounded-lg">
            {[
              { value: 'overview',    label: 'Overview',              icon: User },
              { value: 'applications',label: 'Applications',          icon: FileText },
              { value: 'universities',label: 'Interested Universities',icon: Building },
              { value: 'courses',     label: 'Saved Courses',         icon: BookOpen },
              { value: 'documents',   label: 'Documents',             icon: GraduationCap },
              { value: 'preferences', label: 'Preferences',           icon: Target },
              { value: 'notes',       label: 'Notes',                 icon: StickyNote },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5"
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ═══════════════════════════════════════════════
              TAB: OVERVIEW
          ═══════════════════════════════════════════════ */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Personal Information */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {[
                    { icon: Mail,     label: 'Email',            value: student.email },
                    { icon: Phone,    label: 'Phone',            value: student.phone },
                    { icon: Calendar, label: 'Date of Birth',    value: fmtDate(student.dateOfBirth) },
                    { icon: Flag,     label: 'Nationality',      value: student.nationality },
                    { icon: User,     label: 'Gender',           value: student.gender },
                    { icon: MapPin,   label: 'Address',          value: student.address },
                    { icon: FileText, label: 'Passport No.',     value: student.passportNumber },
                    { icon: Phone,    label: 'Emergency Contact',value: student.emergencyContact },
                    { icon: User,     label: 'Counselor',        value: student.assignedCounselor },
                  ].map((row) => (
                    <div key={row.label} className="flex items-start gap-2">
                      <row.icon className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-muted-foreground w-32 shrink-0">{row.label}</span>
                      <span className="font-medium">{row.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Academic Information */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-primary" />Academic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {[
                    { icon: GraduationCap, label: 'Education Level', value: student.educationLevel },
                    { icon: BookOpen,      label: 'Field of Study',  value: student.fieldOfStudy },
                    { icon: Target,        label: 'Target Course',   value: student.targetCourse },
                    { icon: Award,         label: 'GPA / CGPA',      value: `${student.gpa}` },
                    { icon: Globe,         label: 'English Score',   value: student.englishProficiency },
                    { icon: TrendingUp,    label: 'GRE Score',       value: student.greScore ?? 'N/A' },
                    { icon: Briefcase,     label: 'Work Experience', value: student.workExperience },
                    { icon: Calendar,      label: 'Target Intake',   value: student.targetIntake },
                  ].map((row) => (
                    <div key={row.label} className="flex items-start gap-2">
                      <row.icon className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-muted-foreground w-32 shrink-0">{row.label}</span>
                      <span className="font-medium">{row.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Country Choices & Course Interests */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" />Country Choices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {student.targetCountries.map((c) => (
                      <Badge key={c} variant="outline" className="gap-1">
                        <MapPin className="w-3 h-3" />{c}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground mb-2">Target Intake</p>
                    <Badge variant="secondary">{student.targetIntake}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Score Summary */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />Score Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'GPA', value: `${student.gpa} / 4.0`, color: 'bg-blue-50 border-blue-200 text-blue-700' },
                      { label: 'English', value: student.englishProficiency, color: 'bg-violet-50 border-violet-200 text-violet-700' },
                      { label: 'GRE', value: student.greScore ?? 'N/A', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
                      { label: 'Experience', value: student.workExperience, color: 'bg-amber-50 border-amber-200 text-amber-700' },
                    ].map((s) => (
                      <div key={s.label} className={`border rounded-lg p-3 text-center ${s.color}`}>
                        <p className="text-xs opacity-70">{s.label}</p>
                        <p className="font-bold mt-0.5 text-sm">{s.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Timeline */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />Student Timeline
                </CardTitle>
                <CardDescription>Chronological journey of this student</CardDescription>
              </CardHeader>
              <CardContent>
                {timeline.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">No timeline events yet.</p>
                ) : (
                  <div className="relative">
                    <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />
                    <div className="space-y-4">
                      {timeline.map((event, i) => {
                        const cfg = timelineIconMap[event.type] ?? timelineIconMap.status;
                        return (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex gap-4 relative"
                          >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 ${cfg.bg}`}>
                              <cfg.icon className={`w-4 h-4 ${cfg.color}`} />
                            </div>
                            <div className="flex-1 bg-muted/40 rounded-lg p-3">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-semibold">{event.event}</p>
                                <span className="text-xs text-muted-foreground whitespace-nowrap">{fmtDate(event.date)}</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ═══════════════════════════════════════════════
              TAB: APPLICATIONS
          ═══════════════════════════════════════════════ */}
          <TabsContent value="applications" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">
                Applications <span className="text-muted-foreground font-normal">({applications.length})</span>
              </h2>
            </div>

            {applications.length === 0 ? (
              <EmptyState icon={FileText} message="No applications yet for this student." />
            ) : (
              <div className="space-y-3">
                {applications.map((app) => {
                  const cfg = appStatusCfg[app.status];
                  return (
                    <Card key={app.id} className="border border-border/60">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2">
                              <Building className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                              <div>
                                <p className="font-semibold">{app.university}</p>
                                <p className="text-sm text-muted-foreground">{app.course}</p>
                                <div className="flex flex-wrap gap-2 mt-1.5">
                                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />{app.country}
                                  </span>
                                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />{app.targetSemester}
                                  </span>
                                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="w-3 h-3" />Applied {fmtDate(app.appliedDate)}
                                  </span>
                                  {app.isUrgent && (
                                    <Badge className="bg-red-100 text-red-700 text-xs border-0 gap-1">
                                      <Zap className="w-3 h-3" />Urgent
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="mt-3 space-y-1">
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Progress</span>
                                <span>{app.progress}%</span>
                              </div>
                              <Progress value={app.progress} className="h-1.5" />
                            </div>

                            {app.notes && (
                              <p className="text-xs text-muted-foreground mt-2 italic">{app.notes}</p>
                            )}
                          </div>

                          {/* Status Dropdown */}
                          <div className="relative shrink-0">
                            <button
                              onClick={() => setActiveStatusMenu(activeStatusMenu === app.id ? null : app.id)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${cfg.bg} ${cfg.badge} border-transparent hover:border-current`}
                            >
                              {app.status}
                              {activeStatusMenu === app.id
                                ? <ChevronUp className="w-3 h-3" />
                                : <ChevronDown className="w-3 h-3" />
                              }
                            </button>

                            <AnimatePresence>
                              {activeStatusMenu === app.id && (
                                <motion.div
                                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                                  transition={{ duration: 0.12 }}
                                  className="absolute right-0 mt-1 bg-card border border-border rounded-xl shadow-xl z-20 overflow-hidden min-w-[160px]"
                                >
                                  {ALL_APP_STATUSES.map((status) => (
                                    <button
                                      key={status}
                                      onClick={() => handleStatusChange(app.id, status)}
                                      className={`w-full text-left px-4 py-2 text-xs hover:bg-muted transition-colors flex items-center gap-2
                                        ${app.status === status ? 'bg-primary/5 font-semibold text-primary' : ''}
                                      `}
                                    >
                                      {app.status === status && <Check className="w-3 h-3" />}
                                      {app.status !== status && <div className="w-3" />}
                                      {status}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* ═══════════════════════════════════════════════
              TAB: INTERESTED UNIVERSITIES
          ═══════════════════════════════════════════════ */}
          <TabsContent value="universities" className="space-y-4 mt-4">
            <h2 className="text-base font-semibold">
              Interested Universities <span className="text-muted-foreground font-normal">({interestedUniversities.length})</span>
            </h2>

            {interestedUniversities.length === 0 ? (
              <EmptyState icon={Building} message="No saved universities yet." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(['Dream', 'Target', 'Safe'] as const).map((type) => {
                  const unis = interestedUniversities.filter((u) => u.type === type);
                  if (unis.length === 0) return null;
                  const typeColor = {
                    Dream:  'bg-violet-100 text-violet-700 border-violet-200',
                    Target: 'bg-blue-100   text-blue-700   border-blue-200',
                    Safe:   'bg-emerald-100text-emerald-700 border-emerald-200',
                  }[type];
                  const headerColor = {
                    Dream: 'text-violet-700', Target: 'text-blue-700', Safe: 'text-emerald-700',
                  }[type];
                  return (
                    <div key={type} className="space-y-2">
                      <h3 className={`text-sm font-semibold flex items-center gap-1.5 ${headerColor}`}>
                        <Star className="w-4 h-4" />{type} Universities ({unis.length})
                      </h3>
                      {unis.map((u) => (
                        <Card key={u.id} className="border border-border/60">
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="text-sm font-semibold">{u.university}</p>
                                <p className="text-xs text-muted-foreground">{u.course}</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                  <MapPin className="w-3 h-3" />{u.country}
                                </p>
                              </div>
                              <Badge className={`text-xs border ${typeColor} shrink-0`}>{type}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              Saved {fmtDate(u.savedDate)}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* ═══════════════════════════════════════════════
              TAB: SAVED COURSES
          ═══════════════════════════════════════════════ */}
          <TabsContent value="courses" className="space-y-4 mt-4">
            <h2 className="text-base font-semibold">
              Saved Courses <span className="text-muted-foreground font-normal">({savedCourses.length})</span>
            </h2>

            {savedCourses.length === 0 ? (
              <EmptyState icon={BookOpen} message="No saved courses yet." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {savedCourses.map((c) => (
                  <Card key={c.id} className="border border-border/60">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="font-semibold text-sm">{c.course}</p>
                          <p className="text-xs text-muted-foreground">{c.university}</p>
                          <div className="flex gap-3 mt-1.5">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />{c.country}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />{c.duration}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Saved {fmtDate(c.savedDate)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ═══════════════════════════════════════════════
              TAB: DOCUMENTS
          ═══════════════════════════════════════════════ */}
          <TabsContent value="documents" className="space-y-4 mt-4">
            <h2 className="text-base font-semibold">
              Documents <span className="text-muted-foreground font-normal">({documents.length})</span>
            </h2>

            {documents.length === 0 ? (
              <EmptyState icon={GraduationCap} message="No documents uploaded yet." />
            ) : (
              <div className="space-y-4">
                {(Object.entries(docsByCategory) as [string, MockDocument[]][]).map(([cat, docs]) => {
                  if (docs.length === 0) return null;
                  return (
                    <div key={cat}>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5" />{cat}
                        <span className="text-xs font-normal">({docs.length})</span>
                      </h3>
                      <div className="space-y-2">
                        {docs.map((doc) => {
                          const dCfg = docStatusCfg[doc.status];
                          return (
                            <Card key={doc.id} className="border border-border/60">
                              <CardContent className="p-3">
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-3 min-w-0">
                                    <div className="p-2 bg-muted rounded-lg shrink-0">
                                      <FileText className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-sm font-medium truncate">{doc.name}</p>
                                      <p className="text-xs text-muted-foreground">
                                        Uploaded {fmtDate(doc.uploadDate)}
                                        {doc.remarks && ` · ${doc.remarks}`}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 shrink-0">
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 ${dCfg.bg}`}>
                                      <dCfg.icon className="w-3 h-3" />
                                      {doc.status}
                                    </span>
                                    {(doc.status === 'Pending' || doc.status === 'Missing') && (
                                      <>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="h-7 px-2 text-xs text-emerald-600 hover:text-emerald-700 hover:border-emerald-300"
                                          onClick={() => setDocuments((prev) =>
                                            prev.map((d) => d.id === doc.id ? { ...d, status: 'Approved' } : d)
                                          )}
                                        >
                                          <Check className="w-3.5 h-3.5 mr-1" />Approve
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="h-7 px-2 text-xs text-red-600 hover:text-red-700 hover:border-red-300"
                                          onClick={() => { setDocDialog(doc); setDocAction('reject'); }}
                                        >
                                          <X className="w-3.5 h-3.5 mr-1" />Reject
                                        </Button>
                                      </>
                                    )}
                                    {doc.status === 'Approved' && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 px-2 text-xs text-red-500 hover:text-red-600"
                                        onClick={() => setDocuments((prev) =>
                                          prev.map((d) => d.id === doc.id ? { ...d, status: 'Rejected' } : d)
                                        )}
                                      >
                                        <X className="w-3.5 h-3.5 mr-1" />Revoke
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* ═══════════════════════════════════════════════
              TAB: PREFERENCES
          ═══════════════════════════════════════════════ */}
          <TabsContent value="preferences" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />Study Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {[
                    { label: 'Target Countries',   value: student.targetCountries.join(', ') },
                    { label: 'Education Level',    value: student.educationLevel },
                    { label: 'Target Course',      value: student.targetCourse },
                    { label: 'Field of Study',     value: student.fieldOfStudy },
                    { label: 'Target Intake',      value: student.targetIntake },
                  ].map((row) => (
                    <div key={row.label} className="flex gap-2">
                      <span className="text-muted-foreground w-36 shrink-0">{row.label}</span>
                      <span className="font-medium">{row.value}</span>
                    </div>
                  ))}
                  <div>
                    <p className="text-muted-foreground mb-2">Countries</p>
                    <div className="flex flex-wrap gap-2">
                      {student.targetCountries.map((c) => (
                        <Badge key={c} variant="outline" className="gap-1">
                          <MapPin className="w-3 h-3" />{c}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />Academic Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {[
                    { label: 'CGPA / GPA',        value: `${student.gpa} / 4.0` },
                    { label: 'English Proficiency',value: student.englishProficiency },
                    { label: 'GRE Score',          value: student.greScore ?? 'Not provided' },
                    { label: 'Work Experience',    value: student.workExperience },
                    { label: 'Nationality',        value: student.nationality },
                  ].map((row) => (
                    <div key={row.label} className="flex gap-2">
                      <span className="text-muted-foreground w-36 shrink-0">{row.label}</span>
                      <span className="font-medium">{row.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Profile Completion Breakdown */}
              <Card className="md:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />Profile Completion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { label: 'Personal Info',  done: true },
                      { label: 'Academic Info',  done: true },
                      { label: 'Test Scores',    done: !!student.englishProficiency },
                      { label: 'Work Experience',done: student.workExperience !== '0 years' },
                      { label: 'Preferences',    done: student.targetCountries.length > 0 },
                      { label: 'Documents',      done: documents.filter((d) => d.status === 'Approved').length > 0 },
                    ].map((item) => (
                      <div key={item.label} className={`flex items-center gap-2 p-3 rounded-lg ${item.done ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-50 text-gray-500'}`}>
                        {item.done
                          ? <CheckCircle2 className="w-4 h-4 shrink-0" />
                          : <Circle className="w-4 h-4 shrink-0" />
                        }
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Overall Completion</span>
                      <span className="font-semibold">{student.profileProgress}%</span>
                    </div>
                    <Progress value={student.profileProgress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ═══════════════════════════════════════════════
              TAB: NOTES
          ═══════════════════════════════════════════════ */}
          <TabsContent value="notes" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">
                Admin Notes <span className="text-muted-foreground font-normal">({notes.length})</span>
              </h2>
            </div>

            {/* Add note */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-primary" />Add a note
                  </label>
                  <Textarea
                    placeholder="Write an admin note about this student…"
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      onClick={handleAddNote}
                      disabled={!noteInput.trim()}
                      className="gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />Save Note
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes list */}
            {notes.length === 0 ? (
              <EmptyState icon={StickyNote} message="No notes yet. Add a note above." />
            ) : (
              <div className="space-y-3">
                {[...notes].reverse().map((note) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="border border-border/60">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {note.createdBy} · {fmtDateTime(note.createdAt)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-red-500 shrink-0"
                            onClick={() => handleDeleteNote(note.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* ── Document Rejection Dialog ─────────────────── */}
      <Dialog open={!!docDialog && docAction === 'reject'} onOpenChange={() => { setDocDialog(null); setDocAction(null); setRejectReason(''); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Document</DialogTitle>
            <DialogDescription>{docDialog?.name} — Provide a reason for rejection.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Textarea
              placeholder="Enter rejection reason…"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => { setDocDialog(null); setDocAction(null); setRejectReason(''); }}>
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                disabled={!rejectReason.trim()}
                onClick={() => handleDocAction('reject', rejectReason)}
              >
                Reject Document
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ── Shared Empty State ────────────────────────────────────────

const EmptyState: React.FC<{ icon: React.ElementType; message: string }> = ({ icon: Icon, message }) => (
  <div className="text-center py-12 text-muted-foreground">
    <Icon className="w-10 h-10 mx-auto mb-3 opacity-30" />
    <p className="text-sm">{message}</p>
  </div>
);

export default StudentDetails;