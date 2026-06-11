import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  MapPin,
  GraduationCap,
  Calendar,
  Clock,
  Building2,
  BookOpen,
  FileText,
  Loader2,
  RefreshCw,
  MessageSquare,
  CheckCircle2,
  XCircle,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { serbiaLeadsAPI, type SerbiaLeadResponse } from "../services/serbiaLeads";

// ─── Constants ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { color: string; bg: string; dot: string; label: string }> = {
  NEW_LEAD: { color: "text-blue-700", bg: "bg-blue-50", dot: "bg-blue-500", label: "New Lead" },
  CONTACTED: { color: "text-amber-700", bg: "bg-amber-50", dot: "bg-amber-500", label: "Contacted" },
  DOCUMENT_PENDING: { color: "text-purple-700", bg: "bg-purple-50", dot: "bg-purple-500", label: "Document Pending" },
  QUALIFIED: { color: "text-emerald-700", bg: "bg-emerald-50", dot: "bg-emerald-500", label: "Qualified" },
  CONVERTED: { color: "text-green-700", bg: "bg-green-50", dot: "bg-green-500", label: "Converted" },
  REJECTED: { color: "text-red-700", bg: "bg-red-50", dot: "bg-red-500", label: "Rejected" },
};

const STATUS_FLOW: Record<string, string[]> = {
  NEW_LEAD: ["CONTACTED", "REJECTED"],
  CONTACTED: ["DOCUMENT_PENDING", "QUALIFIED", "REJECTED"],
  DOCUMENT_PENDING: ["QUALIFIED", "REJECTED"],
  QUALIFIED: ["CONVERTED", "REJECTED"],
  CONVERTED: [],
  REJECTED: [],
};

const INTAKE_LABELS: Record<string, string> = {
  february_2026: "February 2026 (Spring)",
  march_2026: "March 2026 (Spring)",
  september_2026: "September 2026 (Fall)",
  october_2026: "October 2026 (Fall)",
  january_2027: "January 2027 (Winter)",
  february_2027: "February 2027 (Spring)",
};

const DEGREE_LABELS: Record<string, string> = {
  bachelor: "Bachelor's Degree",
  master: "Master's Degree",
  phd: "PhD / Doctorate",
  diploma: "Diploma / Certificate",
};

const formatDate = (iso?: string) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ─── Component ────────────────────────────────────────────────────────────

const SerbiaLeadDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<SerbiaLeadResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    if (id) loadLead();
  }, [id]);

  const loadLead = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await serbiaLeadsAPI.getLeadById(id);
      setLead(data);
      setSelectedStatus(data.status);
    } catch (err: any) {
      setError(err?.message || "Failed to load lead details");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!id || !selectedStatus || selectedStatus === lead?.status) return;
    setUpdatingStatus(true);
    try {
      const updated = await serbiaLeadsAPI.updateLeadStatus(id, { status: selectedStatus });
      setLead(updated);
    } catch (err: any) {
      setError(err?.message || "Failed to update status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const statusCfg = lead ? STATUS_CONFIG[lead.status] || STATUS_CONFIG.NEW_LEAD : STATUS_CONFIG.NEW_LEAD;
  const availableStatuses = lead ? (STATUS_FLOW[lead.status] || []) : [];

  // ─── Loading ────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // ─── Error ──────────────────────────────────────────────────────────────

  if (error || !lead) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-8 pb-8 text-center">
            <XCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
            <p className="text-red-700 text-sm mb-4">{error || "Lead not found"}</p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate("/serbia-leads")}>
                Back to Leads
              </Button>
              <Button variant="outline" onClick={loadLead}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate("/serbia-leads")}
        className="mb-4 -ml-3 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Serbia Leads
      </Button>

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
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Serbia Lead Details</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={`${statusCfg.bg} ${statusCfg.color} text-xs`}>
                {statusCfg.label}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Submitted {formatDate(lead.submitted_at)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Student Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="w-5 h-5 text-primary" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <dt className="text-xs text-muted-foreground mb-1">Name</dt>
                  <dd className="text-sm font-medium text-foreground">{lead.student_name || "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground mb-1">Email</dt>
                  <dd className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                    {lead.student_email || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground mb-1">Student ID</dt>
                  <dd className="text-sm font-mono text-foreground">{lead.student_id}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Study Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <GraduationCap className="w-5 h-5 text-primary" />
                Study Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <dt className="text-xs text-muted-foreground mb-1">Preferred Intake</dt>
                  <dd className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                    {INTAKE_LABELS[lead.preferred_intake] || lead.preferred_intake || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground mb-1">Preferred Degree</dt>
                  <dd className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />
                    {DEGREE_LABELS[lead.preferred_degree] || lead.preferred_degree || "—"}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Universities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="w-5 h-5 text-primary" />
                Interested Universities
              </CardTitle>
            </CardHeader>
            <CardContent>
              {lead.interested_universities?.length > 0 ? (
                <div className="space-y-2">
                  {lead.interested_universities.map((uni, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-secondary/10 border border-secondary/20"
                    >
                      <Building2 className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="text-sm text-foreground">{uni}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">No universities selected</p>
              )}
            </CardContent>
          </Card>

          {/* Courses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="w-5 h-5 text-primary" />
                Interested Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              {lead.interested_courses?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {lead.interested_courses.map((course, i) => (
                    <Badge key={i} variant="secondary" className="text-xs px-3 py-1.5">
                      <BookOpen className="w-3 h-3 mr-1.5" />
                      {course}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">No courses selected</p>
              )}
            </CardContent>
          </Card>

          {/* Additional Notes */}
          {lead.additional_notes && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="w-5 h-5 text-primary" />
                  Additional Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground whitespace-pre-wrap">{lead.additional_notes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Status Update */}
        <div className="space-y-5">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Update Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current Status */}
              <div>
                <div className="text-xs text-muted-foreground mb-1">Current Status</div>
                <Badge className={`${statusCfg.bg} ${statusCfg.color} text-sm px-3 py-1`}>
                  {statusCfg.label}
                </Badge>
              </div>

              {/* Status Select */}
              {lead.status !== "CONVERTED" && lead.status !== "REJECTED" && (
                <div>
                  <label className="block text-xs text-muted-foreground mb-2">
                    New Status
                  </label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select new status" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableStatuses.map((status) => {
                        const cfg = STATUS_CONFIG[status];
                        return (
                          <SelectItem key={status} value={status}>
                            <span className={`${cfg?.color || ""}`}>{cfg?.label || status}</span>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>

                  <Button
                    onClick={handleStatusUpdate}
                    disabled={updatingStatus || selectedStatus === lead.status}
                    className="w-full mt-3"
                  >
                    {updatingStatus ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Update Status
                      </>
                    )}
                  </Button>
                </div>
              )}

              {(lead.status === "CONVERTED" || lead.status === "REJECTED") && (
                <div className={`p-3 rounded-lg text-sm ${
                  lead.status === "CONVERTED"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                  <CheckCircle2 className="w-4 h-4 inline mr-1.5" />
                  This lead has been {lead.status === "CONVERTED" ? "converted" : "rejected"}.
                  No further status changes can be made.
                </div>
              )}

              {/* Timeline */}
              <div className="pt-3 border-t border-border">
                <h4 className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Timeline
                </h4>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Submitted</span>
                    <span>{formatDate(lead.submitted_at)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Updated</span>
                    <span>{formatDate(lead.updated_at)}</span>
                  </div>
                  {lead.updated_by && (
                    <div className="flex justify-between">
                      <span>Updated By</span>
                      <span className="text-foreground">{lead.updated_by}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SerbiaLeadDetails;
