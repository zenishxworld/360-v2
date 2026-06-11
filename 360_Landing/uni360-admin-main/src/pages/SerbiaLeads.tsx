import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  GraduationCap,
  Calendar,
  Clock,
  ChevronRight,
  User,
  Mail,
  Loader2,
  Filter,
  Building2,
  BookOpen,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { serbiaLeadsAPI, type SerbiaLeadResponse } from "../services/serbiaLeads";

// ─── Status config ─────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { color: string; bg: string; dot: string; label: string }> = {
  NEW_LEAD: {
    color: "text-blue-700",
    bg: "bg-blue-50",
    dot: "bg-blue-500",
    label: "New Lead",
  },
  CONTACTED: {
    color: "text-amber-700",
    bg: "bg-amber-50",
    dot: "bg-amber-500",
    label: "Contacted",
  },
  DOCUMENT_PENDING: {
    color: "text-purple-700",
    bg: "bg-purple-50",
    dot: "bg-purple-500",
    label: "Document Pending",
  },
  QUALIFIED: {
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    dot: "bg-emerald-500",
    label: "Qualified",
  },
  CONVERTED: {
    color: "text-green-700",
    bg: "bg-green-50",
    dot: "bg-green-500",
    label: "Converted",
  },
  REJECTED: {
    color: "text-red-700",
    bg: "bg-red-50",
    dot: "bg-red-500",
    label: "Rejected",
  },
};

const INTAKE_LABELS: Record<string, string> = {
  february_2026: "Feb 2026 (Spring)",
  march_2026: "Mar 2026 (Spring)",
  september_2026: "Sep 2026 (Fall)",
  october_2026: "Oct 2026 (Fall)",
  january_2027: "Jan 2027 (Winter)",
  february_2027: "Feb 2027 (Spring)",
};

const DEGREE_LABELS: Record<string, string> = {
  bachelor: "Bachelor's",
  master: "Master's",
  phd: "PhD",
  diploma: "Diploma",
};

const formatDate = (iso?: string) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ─── Component ────────────────────────────────────────────────────────────

const SerbiaLeads: React.FC = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<SerbiaLeadResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await serbiaLeadsAPI.getAllLeads();
      setLeads(data || []);
    } catch (err: any) {
      setError(err?.message || "Failed to load Serbia leads");
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      !searchTerm ||
      lead.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.student_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.interested_universities?.some((u) =>
        u.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      lead.interested_courses?.some((c) =>
        c.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const counts = {
    all: leads.length,
    NEW_LEAD: leads.filter((l) => l.status === "NEW_LEAD").length,
    CONTACTED: leads.filter((l) => l.status === "CONTACTED").length,
    QUALIFIED: leads.filter((l) => l.status === "QUALIFIED").length,
    CONVERTED: leads.filter((l) => l.status === "CONVERTED").length,
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #C6363C, #0C4076)" }}
          >
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Serbia Leads</h1>
            <p className="text-sm text-muted-foreground">
              Manage study interest submissions for Serbia
            </p>
          </div>
        </div>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "All Leads", count: counts.all, color: "bg-primary/10 text-primary" },
          { label: "New", count: counts.NEW_LEAD, color: "bg-blue-50 text-blue-700" },
          { label: "Contacted", count: counts.CONTACTED, color: "bg-amber-50 text-amber-700" },
          { label: "Qualified", count: counts.QUALIFIED, color: "bg-emerald-50 text-emerald-700" },
        ].map((kpi, i) => (
          <Card key={i} className="border-border">
            <CardContent className="pt-4 pb-4">
              <div className="text-2xl font-bold text-foreground">{kpi.count}</div>
              <div className={`text-xs font-medium mt-0.5 ${kpi.color} inline-block px-2 py-0.5 rounded-full`}>
                {kpi.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email, university, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="NEW_LEAD">New Lead</SelectItem>
            <SelectItem value="CONTACTED">Contacted</SelectItem>
            <SelectItem value="DOCUMENT_PENDING">Document Pending</SelectItem>
            <SelectItem value="QUALIFIED">Qualified</SelectItem>
            <SelectItem value="CONVERTED">Converted</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Leads Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6 pb-6 text-center">
            <p className="text-red-700 text-sm mb-3">{error}</p>
            <button
              onClick={loadLeads}
              className="text-sm font-medium text-red-700 underline hover:no-underline"
            >
              Try again
            </button>
          </CardContent>
        </Card>
      ) : filteredLeads.length === 0 ? (
        <Card className="border-border">
          <CardContent className="pt-12 pb-12 text-center">
            <MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              {leads.length === 0
                ? "No Serbia leads yet. Leads will appear here when students submit their interest."
                : "No leads match your filters."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredLeads.map((lead, i) => {
            const statusCfg = STATUS_CONFIG[lead.status] || STATUS_CONFIG.NEW_LEAD;
            return (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className="border-border hover:border-primary/30 hover:shadow-sm cursor-pointer transition-all duration-200"
                  onClick={() => navigate(`/serbia-leads/${lead.id}`)}
                >
                  <CardContent className="pt-4 pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      {/* Student Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-4 h-4 text-muted-foreground shrink-0" />
                          <h3 className="font-semibold text-foreground text-sm truncate">
                            {lead.student_name || "Unknown Student"}
                          </h3>
                          <Badge className={`${statusCfg.bg} ${statusCfg.color} text-[10px]`}>
                            {statusCfg.label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {lead.student_email || "—"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(lead.submitted_at)}
                          </span>
                        </div>
                      </div>

                      {/* Quick Info */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                        <div className="hidden sm:flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5" />
                          {DEGREE_LABELS[lead.preferred_degree] || lead.preferred_degree || "—"}
                        </div>
                        <div className="hidden sm:flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5" />
                          {lead.interested_universities?.length || 0} universities
                        </div>
                        <div className="hidden sm:flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          {lead.interested_courses?.length || 0} courses
                        </div>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Count */}
      {filteredLeads.length > 0 && (
        <p className="text-xs text-muted-foreground mt-4">
          Showing {filteredLeads.length} of {leads.length} lead{leads.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
};

export default SerbiaLeads;
