import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Users, Search, Eye, MapPin, GraduationCap, FileText,
  BookOpen, Star, TrendingUp, UserCheck, UserX, Clock,
  ChevronRight, Filter, BarChart2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  getStudentSummaries,
  type StudentSummary,
  type AppStatus,
} from '../store/mockStore';

// ── Helpers ──────────────────────────────────────────────────

const statusConfig: Record<string, { bg: string; dot: string; label: string }> = {
  active:    { bg: 'bg-emerald-100 text-emerald-800', dot: 'bg-emerald-500', label: 'Active' },
  pending:   { bg: 'bg-amber-100  text-amber-800',   dot: 'bg-amber-500',   label: 'Pending' },
  inactive:  { bg: 'bg-gray-100   text-gray-600',    dot: 'bg-gray-400',    label: 'Inactive' },
  suspended: { bg: 'bg-red-100    text-red-800',     dot: 'bg-red-500',     label: 'Suspended' },
};

const appStatusColor: Record<AppStatus, string> = {
  Draft:         'bg-gray-100 text-gray-600',
  Submitted:     'bg-blue-100 text-blue-700',
  'Under Review':'bg-amber-100 text-amber-700',
  Accepted:      'bg-emerald-100 text-emerald-700',
  Rejected:      'bg-red-100 text-red-700',
};

const getInitials = (first: string, last: string) =>
  `${first[0] ?? ''}${last[0] ?? ''}`.toUpperCase();

const gradientPalette = [
  'from-violet-500 to-purple-600',
  'from-blue-500 to-cyan-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-amber-600',
  'from-pink-500 to-rose-600',
  'from-indigo-500 to-blue-600',
];

// ── Component ─────────────────────────────────────────────────

export const Students: React.FC = () => {
  const navigate = useNavigate();
  const summaries = useMemo(() => getStudentSummaries(), []);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return summaries.filter((s) => {
      const name = `${s.student.firstName} ${s.student.lastName}`.toLowerCase();
      const matchSearch =
        name.includes(search.toLowerCase()) ||
        s.student.email.toLowerCase().includes(search.toLowerCase()) ||
        s.student.nationality.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === 'all' || s.student.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [summaries, search, statusFilter]);

  // Stats
  const total     = summaries.length;
  const active    = summaries.filter((s) => s.student.status === 'active').length;
  const pending   = summaries.filter((s) => s.student.status === 'pending').length;
  const inactive  = summaries.filter((s) => s.student.status === 'inactive' || s.student.status === 'suspended').length;
  const avgProgress = Math.round(
    summaries.reduce((sum, s) => sum + s.student.profileProgress, 0) / (summaries.length || 1)
  );

  return (
    <div className="space-y-6">
      {/* ── Page Header ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <h1 className="text-3xl font-bold uni-text-primary flex items-center gap-2">
            <Users className="w-8 h-8 text-primary" />
            Students
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage all students — their applications, documents, and progress
          </p>
        </div>
      </motion.div>

      {/* ── Summary Stats ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { label: 'Total Students', value: total,    icon: Users,     color: 'text-violet-600', bg: 'bg-violet-50' },
          { label: 'Active',         value: active,   icon: UserCheck, color: 'text-emerald-600',bg: 'bg-emerald-50' },
          { label: 'Pending',        value: pending,  icon: Clock,     color: 'text-amber-600',  bg: 'bg-amber-50' },
          { label: 'Avg. Progress',  value: `${avgProgress}%`, icon: BarChart2, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((stat, i) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* ── Search & Filters ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or nationality…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'active', 'pending', 'inactive', 'suspended'].map((s) => (
            <Button
              key={s}
              size="sm"
              variant={statusFilter === s ? 'default' : 'outline'}
              onClick={() => setStatusFilter(s)}
              className="capitalize"
            >
              {s === 'all' ? (
                <><Filter className="w-3.5 h-3.5 mr-1" />All</>
              ) : s}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* ── Results count ────────────────────────────── */}
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {total} students
      </div>

      {/* ── Student Cards Grid ───────────────────────── */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No students match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((summary, idx) => (
            <StudentCard
              key={summary.student.id}
              summary={summary}
              gradientIdx={idx % gradientPalette.length}
              onClick={() => navigate(`/students/${summary.student.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ── Student Card ──────────────────────────────────────────────

interface StudentCardProps {
  summary: StudentSummary;
  gradientIdx: number;
  onClick: () => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ summary, gradientIdx, onClick }) => {
  const { student, totalApplications, totalDocuments, interestedCount, currentStatus } = summary;
  const sc = statusConfig[student.status] ?? statusConfig.inactive;
  const gradient = gradientPalette[gradientIdx];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <Card className="border border-border/60 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden h-full">
        {/* Gradient top bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />

        <CardContent className="p-5 space-y-4">
          {/* ─ Header row ─ */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 shrink-0">
                <AvatarFallback className={`bg-gradient-to-br ${gradient} text-white font-bold text-sm`}>
                  {getInitials(student.firstName, student.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <h3 className="font-semibold text-base truncate">
                  {student.firstName} {student.lastName}
                </h3>
                <p className="text-xs text-muted-foreground truncate">{student.email}</p>
                <p className="text-xs text-muted-foreground">{student.phone}</p>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${sc.bg}`}>
              <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${sc.dot}`} />
              {sc.label}
            </span>
          </div>

          {/* ─ Key info ─ */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-primary/60" />
              <span className="truncate">{student.targetCountries.join(', ')}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <GraduationCap className="w-3.5 h-3.5 shrink-0 text-primary/60" />
              <span className="truncate">{student.targetCourse}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground col-span-2">
              <BookOpen className="w-3.5 h-3.5 shrink-0 text-primary/60" />
              <span className="truncate">{student.englishProficiency} · GPA {student.gpa}</span>
            </div>
          </div>

          {/* ─ Stats row ─ */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: FileText,      label: 'Applications', value: totalApplications, color: 'text-blue-600' },
              { icon: TrendingUp,    label: 'Documents',    value: totalDocuments,    color: 'text-violet-600' },
              { icon: Star,          label: 'Interested',   value: interestedCount,   color: 'text-amber-600' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center bg-muted/40 rounded-lg p-2 text-center">
                <stat.icon className={`w-4 h-4 ${stat.color} mb-0.5`} />
                <span className="text-base font-bold">{stat.value}</span>
                <span className="text-[10px] text-muted-foreground leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* ─ Profile progress ─ */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Profile Completion</span>
              <span className="font-medium">{student.profileProgress}%</span>
            </div>
            <Progress value={student.profileProgress} className="h-1.5" />
          </div>

          {/* ─ Footer row ─ */}
          <div className="flex items-center justify-between pt-1 border-t border-border/40">
            <Badge
              className={`text-xs px-2 py-0.5 border-0 ${
                appStatusColor[currentStatus as AppStatus] ?? 'bg-gray-100 text-gray-600'
              }`}
            >
              {currentStatus}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-7 gap-1 group-hover:text-primary transition-colors"
              onClick={(e) => { e.stopPropagation(); onClick(); }}
            >
              View Profile
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Students;