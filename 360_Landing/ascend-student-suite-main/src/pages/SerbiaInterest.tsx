import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Building2,
  FileText,
  Send,
  CheckCircle2,
  ArrowLeft,
  Loader2,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { serbiaLeadAPI, type SerbiaLeadRequest } from "@/services/serbia";
import { useToast } from "@/hooks/use-toast";

// ─── Constants ────────────────────────────────────────────────────────────────

const INTAKE_OPTIONS = [
  { value: "february_2026", label: "February 2026 (Spring)" },
  { value: "march_2026", label: "March 2026 (Spring)" },
  { value: "september_2026", label: "September 2026 (Fall)" },
  { value: "october_2026", label: "October 2026 (Fall)" },
  { value: "january_2027", label: "January 2027 (Winter)" },
  { value: "february_2027", label: "February 2027 (Spring)" },
];

const DEGREE_OPTIONS = [
  { value: "bachelor", label: "Bachelor's Degree" },
  { value: "master", label: "Master's Degree" },
  { value: "phd", label: "PhD / Doctorate" },
  { value: "diploma", label: "Diploma / Certificate" },
];

const SERBIA_UNIVERSITIES = [
  "University of Belgrade",
  "University of Novi Sad",
  "University of Niš",
  "Singidunum University",
  "Metropolitan University",
];

const SERBIA_COURSES = [
  "Computer Science",
  "Software Engineering",
  "Data Science",
  "Artificial Intelligence",
  "Information Technology",
  "Cyber Security",
  "Business Informatics",
  "Mechanical Engineering",
  "Electrical Engineering",
  "International Business",
];

// ─── Component ────────────────────────────────────────────────────────────────

const SerbiaInterest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [preferredIntake, setPreferredIntake] = useState("");
  const [preferredDegree, setPreferredDegree] = useState("");
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleUniversity = (uni: string) => {
    setSelectedUniversities((prev) =>
      prev.includes(uni) ? prev.filter((u) => u !== uni) : [...prev, uni]
    );
  };

  const toggleCourse = (course: string) => {
    setSelectedCourses((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );
  };

  const handleSubmit = async () => {
    // Validate
    if (!preferredIntake) {
      toast({ title: "Required", description: "Please select your preferred intake.", variant: "destructive" });
      return;
    }
    if (!preferredDegree) {
      toast({ title: "Required", description: "Please select your preferred degree.", variant: "destructive" });
      return;
    }
    if (selectedUniversities.length === 0) {
      toast({ title: "Required", description: "Please select at least one university.", variant: "destructive" });
      return;
    }
    if (selectedCourses.length === 0) {
      toast({ title: "Required", description: "Please select at least one course.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const payload: SerbiaLeadRequest = {
        preferred_intake: preferredIntake,
        preferred_degree: preferredDegree,
        interested_universities: selectedUniversities,
        interested_courses: selectedCourses,
        additional_notes: additionalNotes || undefined,
      };

      await serbiaLeadAPI.submitLead(payload);
      setSubmitted(true);
      toast({ title: "Success!", description: "Your Serbia study interest has been submitted successfully." });
    } catch (err: any) {
      toast({
        title: "Submission Failed",
        description: err?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Success state ───
  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <Card className="text-center border-green-200 shadow-lg">
            <CardContent className="pt-8 pb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gunmetal mb-2">Interest Submitted!</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Thank you for your interest in studying in Serbia. Our team will review your submission and get back to you soon.
              </p>
              <div className="flex flex-col gap-3">
                <Button onClick={() => navigate("/dashboard")} className="w-full">
                  Back to Dashboard
                </Button>
                <Button variant="outline" onClick={() => {
                  setSubmitted(false);
                  setPreferredIntake("");
                  setPreferredDegree("");
                  setSelectedUniversities([]);
                  setSelectedCourses([]);
                  setAdditionalNotes("");
                }}>
                  Submit Another
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // ─── Form state ───
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-4 -ml-3 text-muted-foreground hover:text-gunmetal"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #C6363C, #0C4076)" }}
            >
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gunmetal">Study in Serbia</h1>
              <p className="text-sm text-muted-foreground">Express your interest in studying at Serbian universities</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Preferred Intake & Degree */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                  Study Preferences
                </CardTitle>
                <CardDescription>Tell us when and what you want to study.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Intake */}
                <div>
                  <label className="block text-sm font-medium text-gunmetal mb-2">
                    Preferred Intake <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {INTAKE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setPreferredIntake(opt.value)}
                        className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 ${
                          preferredIntake === opt.value
                            ? "border-primary bg-primary/10 text-primary shadow-sm"
                            : "border-border bg-white text-muted-foreground hover:border-primary/30 hover:bg-primary/5"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Degree */}
                <div>
                  <label className="block text-sm font-medium text-gunmetal mb-2">
                    Preferred Degree <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {DEGREE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setPreferredDegree(opt.value)}
                        className={`flex items-center gap-2 px-3 py-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                          preferredDegree === opt.value
                            ? "border-primary bg-primary/10 text-primary shadow-sm"
                            : "border-border bg-white text-muted-foreground hover:border-primary/30 hover:bg-primary/5"
                        }`}
                      >
                        <GraduationCap className="w-4 h-4" />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Universities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Building2 className="w-5 h-5 text-primary" />
                  Interested Universities
                </CardTitle>
                <CardDescription>
                  Select the universities you're interested in.{" "}
                  <span className="text-red-500">*</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SERBIA_UNIVERSITIES.map((uni) => (
                    <button
                      key={uni}
                      type="button"
                      onClick={() => toggleUniversity(uni)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-sm text-left transition-all duration-200 ${
                        selectedUniversities.includes(uni)
                          ? "border-primary bg-primary/10 text-primary shadow-sm"
                          : "border-border bg-white text-muted-foreground hover:border-primary/30 hover:bg-primary/5"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                          selectedUniversities.includes(uni)
                            ? "border-primary bg-primary text-white"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedUniversities.includes(uni) && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                      {uni}
                    </button>
                  ))}
                </div>
                {selectedUniversities.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {selectedUniversities.map((uni) => (
                      <Badge key={uni} variant="secondary" className="text-xs">
                        {uni}
                      </Badge>
                    ))}
                  </div>
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
                <CardDescription>
                  Select the courses you're interested in.{" "}
                  <span className="text-red-500">*</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SERBIA_COURSES.map((course) => (
                    <button
                      key={course}
                      type="button"
                      onClick={() => toggleCourse(course)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-sm text-left transition-all duration-200 ${
                        selectedCourses.includes(course)
                          ? "border-primary bg-primary/10 text-primary shadow-sm"
                          : "border-border bg-white text-muted-foreground hover:border-primary/30 hover:bg-primary/5"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                          selectedCourses.includes(course)
                            ? "border-primary bg-primary text-white"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedCourses.includes(course) && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                      {course}
                    </button>
                  ))}
                </div>
                {selectedCourses.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {selectedCourses.map((course) => (
                      <Badge key={course} variant="secondary" className="text-xs">
                        {course}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="w-5 h-5 text-primary" />
                  Additional Notes
                </CardTitle>
                <CardDescription>Any other information you'd like to share with us.</CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="E.g., specific questions, scholarship interests, accommodation preferences..."
                  rows={4}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-gunmetal placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar - Summary & Submit */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Summary</CardTitle>
                <CardDescription>Review your selections before submitting.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Intake */}
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Preferred Intake</div>
                  <div className="text-sm font-medium text-gunmetal">
                    {preferredIntake
                      ? INTAKE_OPTIONS.find((o) => o.value === preferredIntake)?.label
                      : <span className="text-muted-foreground/60 italic">Not selected</span>}
                  </div>
                </div>

                {/* Degree */}
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Preferred Degree</div>
                  <div className="text-sm font-medium text-gunmetal">
                    {preferredDegree
                      ? DEGREE_OPTIONS.find((o) => o.value === preferredDegree)?.label
                      : <span className="text-muted-foreground/60 italic">Not selected</span>}
                  </div>
                </div>

                {/* Universities */}
                <div>
                  <div className="text-xs text-muted-foreground mb-1">
                    Universities ({selectedUniversities.length})
                  </div>
                  {selectedUniversities.length > 0 ? (
                    <div className="space-y-1">
                      {selectedUniversities.map((u) => (
                        <div key={u} className="text-sm text-gunmetal flex items-center gap-1.5">
                          <Building2 className="w-3 h-3 text-muted-foreground" />
                          {u}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground/60 italic">None selected</div>
                  )}
                </div>

                {/* Courses */}
                <div>
                  <div className="text-xs text-muted-foreground mb-1">
                    Courses ({selectedCourses.length})
                  </div>
                  {selectedCourses.length > 0 ? (
                    <div className="space-y-1">
                      {selectedCourses.map((c) => (
                        <div key={c} className="text-sm text-gunmetal flex items-center gap-1.5">
                          <BookOpen className="w-3 h-3 text-muted-foreground" />
                          {c}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground/60 italic">None selected</div>
                  )}
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full"
                  size="lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Interest
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting, you agree to be contacted about studying in Serbia.
                </p>
              </CardContent>
            </Card>

            {/* Quick Info Card */}
            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-primary" />
                  <h4 className="text-sm font-semibold text-gunmetal">What happens next?</h4>
                </div>
                <ol className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                    Our team reviews your interest submission
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                    A Uni360 counselor contacts you for guidance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                    You receive personalized university recommendations
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</span>
                    We help with application and admission process
                  </li>
                </ol>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SerbiaInterest;
