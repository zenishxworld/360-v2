import { useState, useEffect, useRef } from "react";
import imgPolimi from "../assets/STUDY-IN-ITALY/politechino di milano.jpg";
import imgSapienza from "../assets/STUDY-IN-ITALY/sapienza university of rome.jpg";
import imgBologna from "../assets/STUDY-IN-ITALY/university of bologna.jpg";
import imgPolito from "../assets/STUDY-IN-ITALY/politecnico di torino university.jpg";
import imgPadua from "../assets/STUDY-IN-ITALY/university of padua.jpg";
import imgPisa from "../assets/STUDY-IN-ITALY/university of pisa.jpg";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import AuthPopup, { AuthUtils } from "@/components/AuthPopup";
import { paymentAPI } from "@/services/api";
import {
  GraduationCap, MapPin, Clock, Users, DollarSign, BookOpen,
  Globe, Briefcase, Home, ChevronDown, ChevronUp,
  ArrowRight, Phone, Award, Building2,
  Landmark, UtensilsCrossed, Palette, CheckCircle2, FileText,
  ShieldCheck, TrendingUp, Banknote, Zap, Star, ExternalLink,
  Heart, Info, ChevronRight, Sparkles, Search, Filter
} from "lucide-react";

// ── Scroll-triggered fade-up ──
const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
};

// ── Animated counter ──
const CountingNumber = ({ target, suffix = "", duration = 1800 }: { target: number; suffix?: string; duration?: number }) => {
  const [v, setV] = useState(0);
  const { ref, inView } = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setV(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
};

// ── Scholarship data ──
const SCHOLARSHIPS = [
  {
    cat: "Government", icon: "Landmark",
    n: "Italian Government (MAECI)", a: "€9,000/year", amount: 9000,
    e: "International students, merit-based",
    color: "from-blue-500 to-blue-600", bgLight: "bg-blue-50", textColor: "text-blue-700", badgeColor: "bg-blue-500/10 text-blue-600",
    b: ["Monthly €900 stipend", "Tuition fee waiver", "Health insurance coverage"],
    details: "The Italian Ministry of Foreign Affairs offers renewable one-year scholarships to foreign students. Covers tuition, health insurance, and provides a monthly stipend of €900 paid directly to the student.",
    link: "https://yesitaly.in/italian-government-scholarships/",
    deadline: "Usually March – June each year"
  },
  {
    cat: "Regional", icon: "Building2",
    n: "DSU Regional Scholarship", a: "€5,000 – €7,000/yr", amount: 6000,
    e: "Family income & merit based",
    color: "from-emerald-500 to-emerald-600", bgLight: "bg-emerald-50", textColor: "text-emerald-700", badgeColor: "bg-emerald-500/10 text-emerald-600",
    b: ["Full tuition waiver", "Free accommodation", "Free meals at university canteen"],
    details: "A need-based regional scholarship covering tuition, accommodation, and meals. Available at most Italian public universities. Students with ISEE under €23,000 get maximum benefits.",
    link: null,
    deadline: "Varies by region (typically June – September)"
  },
  {
    cat: "University", icon: "GraduationCap",
    n: "Politecnico di Milano Merit", a: "€2,000 – €10,000/yr", amount: 5000,
    e: "Academic excellence",
    color: "from-purple-500 to-purple-600", bgLight: "bg-purple-50", textColor: "text-purple-700", badgeColor: "bg-purple-500/10 text-purple-600",
    b: ["Full or partial tuition fee waiver", "Cash stipend (up to €10,000)", "Automatic consideration with application"],
    details: "Politecnico di Milano offers merit-based scholarships for top-performing international students. No separate application needed — students are automatically considered upon applying.",
    link: "https://www.polimi.it/",
    deadline: "Same as program application deadline"
  },
  {
    cat: "Government", icon: "Award",
    n: "Invest Your Talent in Italy", a: "Full + €8,100/yr", amount: 8100,
    e: "Selected countries & courses",
    color: "from-amber-500 to-amber-600", bgLight: "bg-amber-50", textColor: "text-amber-700", badgeColor: "bg-amber-500/10 text-amber-600",
    b: ["Full tuition covered", "€8,100 annual allowance", "Internship placement with Italian companies"],
    details: "A government-funded program for students from select countries (including India). Combines academic study with an internship at an Italian company. Covers full tuition plus living allowance.",
    link: "https://yesitaly.in/invest-your-talent-in-italy/",
    deadline: "Usually February – March each year"
  },
  {
    cat: "EU", icon: "Globe",
    n: "Erasmus Mundus (EMJMD)", a: "Up to €1,400/month", amount: 1400,
    e: "Master's students worldwide",
    color: "from-rose-500 to-rose-600", bgLight: "bg-rose-50", textColor: "text-rose-700", badgeColor: "bg-rose-500/10 text-rose-600",
    b: ["Monthly €1,400 stipend", "Full tuition covered", "Travel + health insurance included"],
    details: "EU-funded joint master's programs across multiple European universities. Students study in at least two different countries. Highly competitive but covers virtually all expenses.",
    link: null,
    deadline: "October – January (year before intake)"
  },
  {
    cat: "University", icon: "GraduationCap",
    n: "Unibo Action 2 — Bologna", a: "€11,000+/year", amount: 11000,
    e: "International students, merit-based",
    color: "from-red-600 to-red-700", bgLight: "bg-red-50", textColor: "text-red-700", badgeColor: "bg-red-500/10 text-red-600",
    b: ["€11,000+ study grant", "Full tuition fee waiver", "Free accommodation + meal vouchers"],
    details: "The University of Bologna — the world's oldest university — offers Unibo Action 2 scholarships to outstanding international students. Covers full tuition, a cash grant of over €11,000, and provides accommodation and meal benefits.",
    link: "https://www.unibo.it/",
    deadline: "Usually April – May each year"
  },
  {
    cat: "University", icon: "Landmark",
    n: "Sapienza Fee Waivers — Rome", a: "Up to €4,260/yr waiver", amount: 4260,
    e: "Non-EU students, income & merit based",
    color: "from-rose-800 to-rose-900", bgLight: "bg-rose-50", textColor: "text-rose-700", badgeColor: "bg-rose-500/10 text-rose-600",
    b: ["Full or partial tuition fee waiver", "No separate application needed", "Renewable annually based on merit"],
    details: "Sapienza University — Europe's largest university — offers automatic fee waivers for international students based on financial need and academic merit. Waivers range from partial reduction to full exemption plus regional DSU benefits.",
    link: "https://www.uniroma1.it/",
    deadline: "Same as admission deadline"
  },
  {
    cat: "University", icon: "GraduationCap",
    n: "Padua International Excellence", a: "€8,000/year", amount: 8000,
    e: "International students, high merit",
    color: "from-orange-600 to-orange-700", bgLight: "bg-orange-50", textColor: "text-orange-700", badgeColor: "bg-orange-500/10 text-orange-600",
    b: ["€8,000 annual cash stipend", "Full tuition fee waiver", "Priority for university housing"],
    details: "The University of Padova — founded in 1222, where Galileo taught — awards International Excellence Scholarships to top-performing students. Includes a generous cash stipend plus full tuition exemption.",
    link: "https://www.unipd.it/",
    deadline: "Usually February – March each year"
  },
  {
    cat: "University", icon: "Building2",
    n: "Politecnico di Torino Merit", a: "€8,000/yr + full waiver", amount: 8000,
    e: "International students, academic merit",
    color: "from-blue-700 to-blue-800", bgLight: "bg-blue-50", textColor: "text-blue-700", badgeColor: "bg-blue-500/10 text-blue-600",
    b: ["€8,000 annual stipend", "Full tuition fee waiver", "Access to company internships"],
    details: "Politecnico di Torino — Italy's premier engineering university — offers merit-based scholarships for international bachelor's and master's students. Strong ties to Ferrari, Lamborghini, and Fiat provide internship pathways.",
    link: "https://www.polito.it/",
    deadline: "Same as program application deadline"
  },
  {
    cat: "University", icon: "Award",
    n: "Cattolica International — Milan", a: "Up to 50% tuition off", amount: 5000,
    e: "International students, merit-based",
    color: "from-yellow-600 to-yellow-700", bgLight: "bg-yellow-50", textColor: "text-yellow-700", badgeColor: "bg-yellow-500/10 text-yellow-600",
    b: ["Up to 50% tuition reduction", "Merit-based renewal", "Available for all degree levels"],
    details: "Università Cattolica del Sacro Cuore — Europe's largest private university — offers International Scholarships reducing tuition by up to 50%. Located in Milan, it's renowned for Business, Economics, and Medicine programs.",
    link: "https://www.unicatt.it/",
    deadline: "Varies by program (typically early spring)"
  },
];

const SCHOLARSHIP_CATEGORIES = [
  { id: "all", label: "All Scholarships", icon: "Sparkles" },
  { id: "Government", label: "Government", icon: "Landmark" },
  { id: "Regional", label: "Regional", icon: "Building2" },
  { id: "University", label: "University", icon: "GraduationCap" },
  { id: "EU", label: "EU Programs", icon: "Globe" },
];

// ── Animated card wrapper ──
const AnimatedCard = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const { ref, inView } = useInView(0.1);
  const delayClass = delay > 0 ? `delay-${delay}` : "";
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
};

// ── Animated timeline step ──
const AnimatedTimelineStep = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const elRef = useRef<HTMLDivElement>(null);
  const { ref: viewRef, inView } = useInView(0.08);
  useEffect(() => {
    if (elRef.current) elRef.current.style.transitionDelay = `${index * 120}ms`;
  }, [index]);
  return (
    <div
      ref={(node) => { elRef.current = node; (viewRef as React.MutableRefObject<HTMLDivElement | null>).current = node; }}
      className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {children}
    </div>
  );
};

// ── Visa timeline step ──
const VisaStep = ({ step, index, total }: { step: { s: number; t: string; d: string; tag: string; icon: any; tip: string }; index: number; total: number }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref: viewRef, inView } = useInView(0.15);
  const StepIcon = step.icon;
  const isLast = index === total - 1;

  useEffect(() => {
    if (wrapRef.current) wrapRef.current.style.transitionDelay = `${index * 150}ms`;
    if (circleRef.current) circleRef.current.style.transitionDelay = `${index * 150 + 100}ms`;
    if (cardRef.current) cardRef.current.style.transitionDelay = `${index * 150 + 200}ms`;
  }, [index]);

  return (
    <div
      ref={(node) => { wrapRef.current = node; (viewRef as React.MutableRefObject<HTMLDivElement | null>).current = node; }}
      className={`relative flex gap-4 pb-6 last:pb-0 transition-all duration-600 ease-out ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
    >
      {/* Connecting line */}
      {!isLast && <div className="absolute left-[19px] top-9 bottom-0 w-0.5 bg-gradient-to-b from-accent/30 to-accent/5" />}

      {/* Step circle */}
      <div ref={circleRef} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 transition-all duration-300 shadow-md ${isLast ? "bg-green-500 shadow-green-500/30" : "bg-accent shadow-accent/20"
        } ${inView ? "scale-100" : "scale-75"}`}
      >
        {isLast ? <MapPin className="w-4 h-4" /> : StepIcon ? <StepIcon className="w-4 h-4" /> : step.s}
      </div>

      {/* Content card */}
      <div ref={cardRef} className={`bg-white rounded-xl border border-border p-3 sm:p-4 flex-1 shadow-sm transition-all duration-300 group hover:shadow-lg hover:border-accent/25 hover:-translate-y-0.5 ${inView ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="text-sm font-semibold text-gunmetal">{step.t}</h4>
          <span className="shrink-0 px-2 py-0.5 bg-accent/10 text-accent text-[9px] font-bold rounded-full">{step.tag}</span>
        </div>
        <p className="text-xs text-muted-foreground">{step.d}</p>

        {/* Hover tooltip */}
        <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-16">
          <div className="pt-2 mt-2 border-t border-border/50">
            <p className="text-[10px] text-accent/80 leading-relaxed flex items-start gap-1.5">
              <span className="text-accent shrink-0 mt-px">💡</span>
              {step.tip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CAT_ICONS: Record<string, any> = {
  Government: Landmark, Regional: Building2, University: GraduationCap, EU: Globe,
};

// ── Scholarship category filter button ──
const FilterBtn = ({ active, icon: Icon, label, onClick }: { active: boolean; icon: any; label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border ${active
      ? "bg-accent text-white border-accent shadow-lg shadow-accent/20 scale-105"
      : "bg-white text-gunmetal border-border hover:border-accent/40 hover:bg-accent/5 hover:shadow-sm"
      }`}
  >
    <Icon className="w-3.5 h-3.5" />
    {label}
  </button>
);

// ── Amount bar ──
const AmountBar = ({ value, max }: { value: number; max: number }) => {
  const { ref, inView } = useInView(0.2);
  const barRef = useRef<HTMLDivElement>(null);
  const pct = Math.min((value / max) * 100, 100);
  useEffect(() => {
    if (barRef.current) barRef.current.style.setProperty("--bar-width", `${pct}%`);
  }, [pct]);
  return (
    <div ref={ref} className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div
        ref={barRef}
        className={`h-full bg-gradient-to-r from-accent to-accent/60 rounded-full ${inView ? "animate-bar-grow" : ""}`}
      />
    </div>
  );
};

// ── SCHOLARSHIPS SECTION ──
const ScholarshipsSection = ({
  expandedScholarship, setExpandedScholarship,
  scholarshipFilter, setScholarshipFilter,
}: {
  expandedScholarship: number | null;
  setExpandedScholarship: (v: number | null) => void;
  scholarshipFilter: string;
  setScholarshipFilter: (v: string) => void;
}) => {
  const { ref: sectionRef, inView: sectionInView } = useInView(0.05);
  const filtered = scholarshipFilter === "all" ? SCHOLARSHIPS : SCHOLARSHIPS.filter(s => s.cat === scholarshipFilter);
  const maxAmount = Math.max(...SCHOLARSHIPS.map(s => s.amount));

  const stats = [
    { l: "Scholarship Options", v: SCHOLARSHIPS.length, icon: Sparkles },
    { l: "Max Annual Value", v: `€${(maxAmount / 1000).toFixed(1)}K+`, icon: Banknote },
    { l: "Categories", v: SCHOLARSHIP_CATEGORIES.length - 1, icon: Filter },
    { l: "Coverage Types", v: "Tuition + Living", icon: ShieldCheck },
  ];

  return (
    <section id="scholarships" className="py-16 sm:py-24 bg-white scroll-mt-20 relative overflow-hidden" aria-labelledby="scholarships-heading">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={sectionRef} className={`text-center mb-8 sm:mb-10 transition-all duration-700 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-3">FUNDING</span>
          <h2 id="scholarships-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gunmetal mb-3">Scholarships in Italy</h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">Italy offers some of Europe's most generous scholarship programs — many covering full tuition plus living costs. Explore your options below.</p>
        </div>

        {/* Stats row */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10 transition-all duration-700 delay-150 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {stats.map((stat, i) => (
            <div key={i} className="bg-gradient-to-br from-accent/5 to-accent/[0.02] rounded-xl sm:rounded-2xl border border-accent/10 p-4 sm:p-5 text-center hover:shadow-md hover:border-accent/20 transition-all duration-300 group">
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent mx-auto mb-1.5 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-lg sm:text-xl font-bold text-gunmetal">{stat.v}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{stat.l}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className={`flex flex-wrap justify-center gap-2 mb-8 sm:mb-10 transition-all duration-700 delay-300 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {SCHOLARSHIP_CATEGORIES.map(cat => (
            <FilterBtn
              key={cat.id}
              active={scholarshipFilter === cat.id}
              icon={cat.id === "all" ? Sparkles : CAT_ICONS[cat.id]}
              label={cat.label}
              onClick={() => setScholarshipFilter(cat.id)}
            />
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((s, i) => {
            const Icon = CAT_ICONS[s.cat] || Award;
            const isExpanded = expandedScholarship === i;

            return (
              <AnimatedCard key={i} delay={i * 100}>
                <div className={`bg-white rounded-xl sm:rounded-2xl border border-border p-5 sm:p-6 shadow-[var(--card-shadow)] transition-all duration-500 group ${isExpanded ? "shadow-xl border-accent/30" : "hover:shadow-[var(--glow-primary)] hover:-translate-y-1.5"}`}>
                  {/* Category badge + icon row */}
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-9 h-9 rounded-lg ${s.badgeColor} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${s.badgeColor}`}>{s.cat}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-semibold text-gunmetal mb-2 leading-snug">{s.n}</h3>

                  {/* Amount badge */}
                  <span className={`inline-block px-2.5 py-1 ${s.bgLight} ${s.textColor} text-[10px] sm:text-xs font-bold rounded-full mb-3`}>{s.a}</span>

                  {/* Amount bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                      <span>Funding level</span>
                      <span className="font-semibold text-gunmetal">{s.a}</span>
                    </div>
                    <AmountBar value={s.amount} max={maxAmount} />
                  </div>

                  {/* Eligibility */}
                  <p className="text-xs text-muted-foreground mb-2">
                    <span className="font-medium text-gunmetal">Eligibility:</span> {s.e}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-1.5 mb-3">
                    {s.b.map((b, j) => (
                      <li key={j} className="flex items-start gap-1.5 text-[11px] sm:text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Expand / collapse button */}
                  <button
                    onClick={() => setExpandedScholarship(isExpanded ? null : i)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-accent/5 hover:bg-accent/10 text-accent text-xs font-semibold transition-all duration-200"
                  >
                    <Info className="w-3 h-3" />
                    {isExpanded ? "Show less" : "More details"}
                    <ChevronRight className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} />
                  </button>

                  {/* Expanded details */}
                  <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isExpanded ? "max-h-80 mt-3 opacity-100" : "max-h-0 mt-0 opacity-0"}`}>
                    <div className="pt-3 border-t border-border space-y-2.5">
                      <p className="text-xs text-muted-foreground leading-relaxed">{s.details}</p>
                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span><span className="font-medium text-gunmetal">Deadline:</span> {s.deadline}</span>
                      </div>
                      {s.link && (
                        <a
                          href={s.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Learn more
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No scholarships match this category.</p>
            <button onClick={() => setScholarshipFilter("all")} className="mt-2 text-xs text-accent font-semibold hover:underline">View all scholarships</button>
          </div>
        )}

        {/* Bottom CTA */}
        <AnimatedCard delay={300}>
          <div className="mt-10 text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/[0.02] border border-accent/10">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-auto mb-2" />
            <h3 className="text-base sm:text-lg font-bold text-gunmetal mb-1">Need help finding the right scholarship?</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 max-w-lg mx-auto">Our experts can match you with scholarships based on your profile, academic background, and financial needs.</p>
            <button
              onClick={() => window.open("https://calendly.com/uni360degreetech/30min", "_blank")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
              Free Scholarship Consultation
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </AnimatedCard>
      </div>
    </section>
  );
};

// ── STUDY IN ITALY ──
const StudyInItaly = () => {
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [reqTab, setReqTab] = useState<"bachelor" | "master">("bachelor");
  const [expandedScholarship, setExpandedScholarship] = useState<number | null>(null);
  const [scholarshipFilter, setScholarshipFilter] = useState<string>("all");

  const CALENDLY = "https://calendly.com/uni360degreetech/30min";
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const bookCall = () => {
    if (AuthUtils.isAuthenticated()) { setCurrentUser(AuthUtils.getCurrentUser()); setShowPaymentPopup(true); }
    else setShowAuthPopup(true);
  };
  const onAuth = (u: any) => { setShowAuthPopup(false); setCurrentUser(u); setTimeout(() => setShowPaymentPopup(true), 300); };
  const doPay = async () => {
    setPaymentLoading(true); setPaymentError("");
    try {
      await paymentAPI.checkHealth();
      const order = await paymentAPI.createOrder(100, "INR", "OTHER");
      if (!order?.orderId) { setPaymentError("Order creation failed."); setPaymentLoading(false); return; }
      if (!(window as any).Razorpay) await new Promise<void>((res, rej) => {
        const s = document.createElement("script"); s.src = "https://checkout.razorpay.com/v1/checkout.js";
        s.onload = () => res(); s.onerror = () => rej(new Error("Razorpay load failed")); document.body.appendChild(s);
      });
      new (window as any).Razorpay({
        key: order.keyId, amount: order.amount, currency: order.currency, order_id: order.orderId,
        name: "UNI 360°", description: "1:1 Consultation Call",
        prefill: { name: currentUser?.name || "", email: currentUser?.email || "" },
        theme: { color: "#2C3539" },
        handler: async (r: any) => {
          try {
            const v = await paymentAPI.verifyPayment({ razorpay_order_id: r.razorpay_order_id, razorpay_payment_id: r.razorpay_payment_id, razorpay_signature: r.razorpay_signature });
            if (v?.verified || v?.data?.verified) { setShowPaymentPopup(false); window.open(`${CALENDLY}?name=${encodeURIComponent(currentUser?.name || "")}&email=${encodeURIComponent(currentUser?.email || "")}`, "_blank"); }
            else setPaymentError("Verification failed.");
          } catch { setPaymentError("Verification failed."); }
          setPaymentLoading(false);
        },
        modal: { ondismiss: () => setPaymentLoading(false) },
      }).open();
    } catch (e: any) { setPaymentError(e?.message || "Could not initiate payment."); setPaymentLoading(false); }
  };

  // ── University data with official websites & gradient colors ──
  const universities = [
    { n: "Politecnico di Milano", short: "POLIMI", r: "QS #98", c: "Milan", t: "Public", p: ["Engineering", "Architecture", "Design"], h: "Italy's #1 Technical University — ranked among Europe's top 20 for Engineering & Technology.", website: "https://www.polimi.it/", cssClass: "uni-polimi", img: imgPolimi },
    { n: "Sapienza University", short: "SAPIENZA", r: "QS #128", c: "Rome", t: "Public", p: ["Medicine", "Humanities", "Sciences"], h: "Europe's largest university by enrollment — 115,000+ students across 11 faculties in the heart of Rome.", website: "https://www.uniroma1.it/", cssClass: "uni-sapienza", img: imgSapienza },
    { n: "University of Bologna", short: "UNIBO", r: "QS #138", c: "Bologna", t: "Public", p: ["Law", "Economics", "Arts"], h: "The world's oldest university in continuous operation — founded in 1088, alma mater to Dante & Copernicus.", website: "https://www.unibo.it/", cssClass: "uni-unibo", img: imgBologna },
    { n: "Politecnico di Torino", short: "POLITO", r: "QS #242", c: "Turin", t: "Public", p: ["Automotive", "Aerospace", "CS"], h: "Italy's premier automotive engineering hub — strong ties to Ferrari, Lamborghini, and Fiat.", website: "https://www.polito.it/", cssClass: "uni-polito", img: imgPolito },
    { n: "University of Padova", short: "UNIPD", r: "QS #233", c: "Padua", t: "Public", p: ["Psychology", "Medicine", "Physics"], h: "Founded in 1222 — where Galileo Galilei taught. A leading research university in northern Italy.", website: "https://www.unipd.it/", cssClass: "uni-unipd", img: imgPadua },
    { n: "University of Pisa", short: "UNIPI", r: "QS #323", c: "Pisa", t: "Public", p: ["Sciences", "Engineering", "Medicine"], h: "One of Italy's oldest and most prestigious universities — founded in 1343, home to Galileo Galilei and a leading research hub in Tuscany.", website: "https://www.unipi.it/", cssClass: "uni-pisa", img: imgPisa },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* —— Custom Keyframe Animations —— */}
      <style>{`
        @keyframes float-up { 0% { opacity:0; transform:translateY(30px); } 100% { opacity:1; transform:translateY(0); } }
        @keyframes float-in { 0% { opacity:0; transform:scale(0.92); } 100% { opacity:1; transform:scale(1); } }
        @keyframes shimmer { 0% { background-position:-200% 0; } 100% { background-position:200% 0; } }
        @keyframes flag-wave { 0%,100% { transform:rotate(0deg); } 25% { transform:rotate(1deg); } 75% { transform:rotate(-1deg); } }
        @keyframes pulse-dot { 0%,100% { box-shadow:0 0 0 0 rgba(224,141,60,0.4); } 50% { box-shadow:0 0 0 12px rgba(224,141,60,0); } }
        @keyframes stripe-slide { 0% { width:0%; } 100% { width:100%; } }
        @keyframes ticker-scroll { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
        @keyframes card-reveal { 0% { opacity:0; transform:translateY(40px); } 100% { opacity:1; transform:translateY(0); } }
        .animate-float-up { animation: float-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .animate-float-in { animation: float-in 0.5s cubic-bezier(0.22,1,0.36,1) forwards; }
        .animate-shimmer { background:linear-gradient(90deg,transparent 0%,rgba(224,141,60,0.08) 50%,transparent 100%); background-size:200% 100%; animation:shimmer 3s infinite; }
        .animate-flag { animation:flag-wave 6s ease-in-out infinite; }
        .animate-pulse-dot { animation:pulse-dot 2s infinite; }
        .animate-stripe-slide { animation:stripe-slide 1.2s cubic-bezier(0.22,1,0.36,1) forwards; }
        .animate-ticker { animation:ticker-scroll 30s linear infinite; }
        .animate-ticker:hover { animation-play-state:paused; }
        .animate-card-reveal { animation:card-reveal 0.7s cubic-bezier(0.22,1,0.36,1) forwards; opacity:0; }
        .opacity-0-anim { opacity:0; }
        .delay-100 { animation-delay:0.1s; } .delay-200 { animation-delay:0.2s; } .delay-300 { animation-delay:0.3s; } .delay-400 { animation-delay:0.4s; } .delay-500 { animation-delay:0.5s; }
        /* Hero decorative blobs */
        .hero-blob-top { background: radial-gradient(circle, #009246 0%, #fff 40%, #ce2b37 70%, transparent 100%); transform: translate(30%, -40%); }
        .hero-blob-bottom { background: radial-gradient(circle, #ce2b37 0%, #fff 40%, #009246 70%, transparent 100%); transform: translate(-30%, 40%); }
        /* Stripe animation delays */
        .stripe-delay-1 { animation-delay: 0.1s; }
        .stripe-delay-2 { animation-delay: 0.2s; }
        .stripe-delay-3 { animation-delay: 0.3s; }
        /* Italy flag card background */
        .flag-card-bg { background: linear-gradient(135deg, #009246 0%, #009246 33%, #fff 33%, #fff 66%, #ce2b37 66%, #ce2b37 100%); }
        /* Final CTA gradient */
        .cta-gradient-bg { background: linear-gradient(135deg, hsl(var(--primary)) 0%, #1a2226 100%); }
        /* University gradient cards */
        .uni-polimi { background: linear-gradient(135deg, #1a3a5c 0%, #2d6da4 50%, #4a90d9 100%); }
        .uni-sapienza { background: linear-gradient(135deg, #6b1d21 0%, #a8323a 50%, #c94b4b 100%); }
        .uni-unibo { background: linear-gradient(135deg, #8b1a1a 0%, #c41e3a 50%, #d94f4f 100%); }
        .uni-polito { background: linear-gradient(135deg, #0d3b66 0%, #1a6b9e 50%, #2894c2 100%); }
        .uni-unipd { background: linear-gradient(135deg, #5c1a1a 0%, #8b2e2e 50%, #b54545 100%); }
        .uni-pisa { background: linear-gradient(135deg, #1a2a5c 0%, #2d4a9e 50%, #4a6bd4 100%); }
        /* Card reveal animation delays */
        .card-delay-0 { animation-delay: 0s; }
        .card-delay-1 { animation-delay: 0.15s; }
        .card-delay-2 { animation-delay: 0.3s; }
        .card-delay-3 { animation-delay: 0.4s; }
        .card-delay-4 { animation-delay: 0.5s; }
        .card-delay-5 { animation-delay: 0.6s; }
        @media (prefers-reduced-motion: reduce) {
          .animate-float-up, .animate-float-in, .animate-shimmer, .animate-flag, .animate-pulse-dot, .animate-stripe-slide, .animate-ticker, .animate-card-reveal { animation: none; }
          .opacity-0-anim { opacity: 1; }
          .animate-card-reveal { opacity: 1; }
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <Navigation selectedCountries={["italy"]} onCountrySelect={() => { }} />

      {/* ═══════════ 1. HERO ═══════════ */}
      <section className="relative pt-20 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 overflow-hidden" aria-labelledby="hero-heading">
        {/* Italy tricolor decorative blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.07] hero-blob-top" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.05] hero-blob-bottom" />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--section-muted))]/60 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left */}
            <div className="text-center lg:text-left space-y-5 sm:space-y-6 animate-float-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full text-accent text-xs sm:text-sm font-semibold tracking-wide">
                EUROPEAN EDUCATION EXCELLENCE
              </div>
              <h1 id="hero-heading" className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gunmetal leading-[1.08]">
                Study in <span className="text-accent">Italy</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                Home to the world's oldest university and 100+ institutions. World-class degrees,
                affordable tuition from €890/year, and 12-month post-study work rights — all in the heart of Europe.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button onClick={bookCall} className="bg-accent hover:bg-accent/90 text-white px-7 py-5 text-sm sm:text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <Phone className="w-4 h-4 mr-2" aria-hidden="true" />Book Free Counselling
                </Button>
                <Button variant="outline" className="border-primary/15 text-primary hover:bg-primary/5 px-7 py-5 text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  onClick={() => document.getElementById("why")?.scrollIntoView({ behavior: "smooth" })}>
                  Explore Italy <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Button>
              </div>
            </div>

            {/* Right — Premium Bento-Grid Photo Collage */}
            <div className="relative w-full max-w-md lg:max-w-none mx-auto animate-float-up delay-200 opacity-0-anim">
              <div className="grid grid-cols-12 grid-rows-12 gap-2 sm:gap-2.5 aspect-[4/3.2]">
                {/* Main large image — Polimi */}
                <div className="col-span-7 row-span-8 rounded-2xl overflow-hidden relative group shadow-lg border border-border/20">
                  <img src={imgPolimi} alt="Politecnico di Milano campus" loading="eager" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-5 h-5 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center"><GraduationCap className="w-3 h-3 text-white" /></div>
                      <span className="text-[10px] text-white/70 font-medium">QS #98 Worldwide</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-tight">Politecnico di Milano</h3>
                    <p className="text-[10px] text-white/60 mt-0.5">Italy's #1 Technical University</p>
                  </div>
                </div>

                {/* Top-right — Sapienza */}
                <div className="col-span-5 row-span-5 rounded-2xl overflow-hidden relative group shadow-lg border border-border/20">
                  <img src={imgSapienza} alt="Sapienza University of Rome" loading="eager" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <h3 className="text-xs sm:text-sm font-bold text-white leading-tight">Sapienza, Rome</h3>
                    <p className="text-[9px] text-white/60">QS #128 · 115K+ Students</p>
                  </div>
                </div>

                {/* Mid-right — stat card */}
                <div className="col-span-5 row-span-3 rounded-xl bg-white border border-border shadow-md flex items-center justify-center gap-3 px-3">
                  <div className="text-center">
                    <div className="text-base sm:text-lg font-extrabold text-accent leading-none">€890</div>
                    <div className="text-[8px] sm:text-[9px] text-muted-foreground mt-0.5">Tuition/yr</div>
                  </div>
                  <div className="w-px h-8 bg-border/60" />
                  <div className="text-center">
                    <div className="text-base sm:text-lg font-extrabold text-gunmetal leading-none">96K+</div>
                    <div className="text-[8px] sm:text-[9px] text-muted-foreground mt-0.5">Intl Students</div>
                  </div>
                </div>

                {/* Bottom-left — Bologna */}
                <div className="col-span-4 row-span-4 rounded-xl overflow-hidden relative group shadow-lg border border-border/20">
                  <img src={imgBologna} alt="University of Bologna" loading="eager" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2">
                    <h3 className="text-[10px] sm:text-xs font-bold text-white">Bologna</h3>
                    <p className="text-[8px] text-white/60">Est. 1088 · Oldest</p>
                  </div>
                </div>

                {/* Bottom-center — Pisa */}
                <div className="col-span-4 row-span-4 rounded-xl overflow-hidden relative group shadow-lg border border-border/20">
                  <img src={imgPisa} alt="University of Pisa" loading="eager" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2">
                    <h3 className="text-[10px] sm:text-xs font-bold text-white">Pisa</h3>
                    <p className="text-[8px] text-white/60">QS #323 · Tuscany</p>
                  </div>
                </div>

                {/* Bottom-right — badge card */}
                <div className="col-span-4 row-span-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/15 shadow-md flex flex-col items-center justify-center p-2 gap-1.5">
                  <div className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-[10px] sm:text-xs font-bold text-gunmetal">€9K Scholarship</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    <span className="text-[10px] sm:text-xs font-bold text-gunmetal">12-Month Stay</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-[10px] sm:text-xs font-bold text-gunmetal">20 hrs/wk Work</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 2. WHY STUDY IN ITALY ═══════════ */}
      <section id="why" className="py-16 sm:py-20 bg-white scroll-mt-20" aria-labelledby="why-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-3">WHY ITALY</span>
            <h2 id="why-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gunmetal mb-3">Why Study in Italy?</h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">Discover why 96,000+ international students choose Italy for world-class education and life-changing experiences.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[
              { i: <GraduationCap className="w-5 h-5" />, t: "World-Class Education", d: "Home to Europe's oldest universities with globally recognized degrees and rigorous academic traditions dating back to 1088." },
              { i: <DollarSign className="w-5 h-5" />, t: "Affordable Tuition", d: "Public universities charge as low as €890/year — a fraction of UK, US, or Australian costs for comparable quality." },
              { i: <Globe className="w-5 h-5" />, t: "European Exposure", d: "Schengen visa unlocks travel across 27 countries. Study in Italy, explore Europe on weekends." },
              { i: <Award className="w-5 h-5" />, t: "Generous Scholarships", d: "DSU, MAECI, and university awards up to €9,000/year plus tuition waivers — based on merit and need." },
              { i: <Briefcase className="w-5 h-5" />, t: "Work While Studying", d: "20 hrs/week part-time during semesters, full-time on breaks. 12-month post-study stay-back for career launch." },
              { i: <Users className="w-5 h-5" />, t: "Diverse Community", d: "Join 96,000+ international students from 200+ countries. Build a global network in a welcoming environment." },
            ].map((x, i) => (
              <div key={i} className="flex items-start gap-3 p-4 sm:p-5 bg-secondary/10 rounded-xl border border-secondary/20 hover:bg-secondary/20 transition-colors duration-200">
                <div className="text-accent mt-0.5 shrink-0">{x.i}</div>
                <div>
                  <h4 className="font-semibold text-gunmetal text-sm sm:text-base mb-1">{x.t}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{x.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 3. QUICK FACTS ═══════════ */}
      <section id="facts" className="py-16 sm:py-20 bg-[hsl(var(--section-muted))] scroll-mt-20" aria-labelledby="facts-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-3">AT A GLANCE</span>
            <h2 id="facts-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gunmetal mb-3">Italy Quick Facts</h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">Key numbers that show why Italy is one of Europe's top study destinations.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { i: <Building2 className="w-5 h-5" />, v: 100, s: "+", l: "Universities", sub: "Public & Private" },
              { i: <Users className="w-5 h-5" />, v: 96000, s: "+", l: "International Students", sub: "2023/24 Academic Year" },
              { i: <DollarSign className="w-5 h-5" />, v: 4260, s: "", l: "Avg. Tuition (Public)", sub: "€890 – €4,260/year", isText: true },
              { i: <Clock className="w-5 h-5" />, v: 20, s: " hrs/wk", l: "Part-Time Work", sub: "During Semesters" },
              { i: <ShieldCheck className="w-5 h-5" />, v: 12, s: " Months", l: "Stay-Back Visa", sub: "Post-Graduation" },
              { i: <TrendingUp className="w-5 h-5" />, v: 33000, s: "", l: "Average Salary", sub: "€33,000/year", isText: true },
              { i: <Banknote className="w-5 h-5" />, v: 954, s: "", l: "Monthly Living Cost", sub: "€666 – €954/month", isText: true },
              { i: <Users className="w-5 h-5" />, v: 10000, s: "+", l: "Indian Students", sub: "Currently in Italy" },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-xl sm:rounded-2xl border border-border p-4 sm:p-5 text-center shadow-[var(--card-shadow)] hover:shadow-[var(--glow-primary)] hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto mb-2">{f.i}</div>
                <div className="text-xl sm:text-2xl font-extrabold text-gunmetal">
                  {f.isText ? <span>{f.sub?.split(" – ")[0]}</span> : <><CountingNumber target={f.v} />{f.s}</>}
                </div>
                <div className="text-xs sm:text-sm font-medium text-gunmetal/80 mt-0.5">{f.l}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">{f.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 4. TOP UNIVERSITIES ═══════════ */}
      <section id="universities" className="py-16 sm:py-20 bg-white scroll-mt-20 overflow-hidden" aria-labelledby="universities-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-3">UNIVERSITIES</span>
            <h2 id="universities-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gunmetal mb-3">Top Universities in Italy</h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">From the world's oldest university to Europe's top technical institutes — Italy's academic heritage is unmatched.</p>
          </div>

          {/* ── Auto-Scrolling University Ticker ── */}
          <div className="relative mb-10 sm:mb-14 overflow-hidden rounded-xl border border-border/50 bg-gradient-to-r from-[hsl(var(--section-muted))] via-white to-[hsl(var(--section-muted))] py-3 sm:py-4">
            <div className="flex gap-8 sm:gap-12 animate-ticker whitespace-nowrap w-max">
              {[...universities, ...universities].map((u, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-sm ${u.cssClass}`}>{u.short}</div>
                  <div className="text-left">
                    <div className="text-xs sm:text-sm font-semibold text-gunmetal leading-tight">{u.n}</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">{u.c} · {u.r}</div>
                  </div>
                  <span className="text-muted-foreground/20 text-lg">•</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Featured Top 2 Universities ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mb-6">
            {universities.slice(0, 2).map((u, i) => (
              <a
                key={i}
                href={u.website}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-2xl border border-border shadow-[var(--card-shadow)] hover:shadow-[var(--glow-primary)] hover:-translate-y-1 transition-all duration-500 flex flex-col sm:flex-row animate-card-reveal card-delay-${i}`}
              >
                {/* Image Side */}
                <div className={`relative w-full sm:w-2/5 min-h-[180px] sm:min-h-[220px] overflow-hidden ${u.cssClass}`}>
                  {u.img && (
                    <img
                      src={u.img}
                      alt={u.n}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                  {/* Hover overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Rank badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gunmetal text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">{u.r}</div>
                </div>
                {/* Info Side */}
                <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-base sm:text-lg font-bold text-gunmetal leading-snug group-hover:text-accent transition-colors duration-300">{u.n}</h3>
                    </div>
                    <div className="flex items-center gap-1.5 mb-2"><MapPin className="w-3.5 h-3.5 text-muted-foreground" /><span className="text-xs text-muted-foreground">{u.c}</span><span className="text-muted-foreground/30">·</span><span className="inline-block px-2 py-0.5 bg-primary/5 text-primary text-[10px] rounded-full">{u.t}</span></div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 leading-relaxed">{u.h}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {u.p.map((pr, j) => (<span key={j} className="px-2 py-0.5 bg-secondary/30 text-primary text-[10px] rounded-full">{pr}</span>))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-4 text-accent text-xs font-semibold group-hover:gap-2.5 transition-all duration-300">
                    Visit Official Site <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* ── Remaining 4 Universities Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {universities.slice(2).map((u, i) => (
              <a
                key={i}
                href={u.website}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-white rounded-xl sm:rounded-2xl border border-border overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--glow-primary)] hover:-translate-y-1 transition-all duration-500 animate-card-reveal card-delay-${i + 2}`}
              >
                {/* Card Image Header */}
                <div className={`relative h-36 sm:h-40 overflow-hidden ${u.cssClass}`}>
                  {u.img && (
                    <img
                      src={u.img}
                      alt={u.n}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-gunmetal text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">{u.r}</div>
                </div>
                {/* Card Info */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-sm font-semibold text-gunmetal mb-1.5 leading-snug group-hover:text-accent transition-colors duration-300">{u.n}</h3>
                  <div className="flex items-center gap-1.5 mb-2"><MapPin className="w-3 h-3 text-muted-foreground" /><span className="text-[11px] text-muted-foreground">{u.c}</span></div>
                  <p className="text-[11px] text-muted-foreground mb-2.5 leading-relaxed line-clamp-2">{u.h}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {u.p.slice(0, 3).map((pr, j) => (<span key={j} className="px-1.5 py-0.5 bg-secondary/30 text-primary text-[9px] rounded-full">{pr}</span>))}
                  </div>
                  <div className="flex items-center gap-1 text-accent text-[10px] font-semibold group-hover:gap-2 transition-all duration-300">
                    Official Website <ExternalLink className="w-2.5 h-2.5" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 5. POPULAR COURSES + COST ═══════════ */}
      <section id="courses-cost" className="py-16 sm:py-20 bg-[hsl(var(--section-muted))] scroll-mt-20" aria-labelledby="courses-cost-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Courses */}
            <div>
              <div className="mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-3">PROGRAMS</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gunmetal mb-2">Popular Courses</h2>
                <p className="text-muted-foreground text-sm">17,000+ programs across every discipline.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { i: <Zap className="w-5 h-5" />, t: "Engineering & Tech", n: "500+ Programs" },
                  { i: <TrendingUp className="w-5 h-5" />, t: "Business & Economics", n: "400+ Programs" },
                  { i: <Palette className="w-5 h-5" />, t: "Design & Digital Arts", n: "300+ Programs" },
                  { i: <Building2 className="w-5 h-5" />, t: "Architecture", n: "150+ Programs" },
                  { i: <UtensilsCrossed className="w-5 h-5" />, t: "Hospitality & Tourism", n: "200+ Programs" },
                  { i: <BookOpen className="w-5 h-5" />, t: "Humanities & Arts", n: "600+ Programs" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-xl border border-border hover:shadow-[var(--glow-primary)] transition-all duration-200">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">{c.i}</div>
                    <div><div className="text-xs sm:text-sm font-semibold text-gunmetal">{c.t}</div><div className="text-[10px] sm:text-xs text-muted-foreground">{c.n}</div></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost */}
            <div>
              <div className="mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-3">COST</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gunmetal mb-2">Cost of Studying</h2>
                <p className="text-muted-foreground text-sm">Among Europe's most affordable destinations.</p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl border border-border p-4 shadow-[var(--card-shadow)]">
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-2">Public Bachelor's</div>
                    <div className="text-lg font-extrabold text-gunmetal">€830 – €3,700</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">per academic year</div>
                  </div>
                  <div className="bg-white rounded-xl border border-border p-4 shadow-[var(--card-shadow)]">
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-2">Public Master's</div>
                    <div className="text-lg font-extrabold text-gunmetal">€1,380 – €4,700</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">per academic year</div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-border p-5 shadow-[var(--card-shadow)]">
                  <h4 className="text-sm font-semibold text-gunmetal mb-3 flex items-center gap-2"><Home className="w-4 h-4 text-accent" />Monthly Living Costs</h4>
                  {[{ item: "Rent", range: "€300 – €700" }, { item: "Food", range: "€100 – €450" }, { item: "Transport", range: "€25 – €45" }, { item: "Misc.", range: "€90 – €250" }].map((x, i) => (
                    <div key={i} className="flex justify-between items-center py-1.5 border-b border-border/40 last:border-b-0 text-xs sm:text-sm">
                      <span className="text-muted-foreground">{x.item}</span><span className="font-semibold text-gunmetal">{x.range}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-3 mt-2 border-t border-border">
                    <span className="text-sm font-semibold text-gunmetal">Total</span>
                    <span className="text-base font-extrabold text-accent">€666 – €954/mo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 6. SCHOLARSHIPS — Enhanced ═══════════ */}
      <ScholarshipsSection expandedScholarship={expandedScholarship} setExpandedScholarship={setExpandedScholarship} scholarshipFilter={scholarshipFilter} setScholarshipFilter={setScholarshipFilter} />

      {/* ═══════════ 7. ADMISSION + VISA — Enhanced ═══════════ */}
      <section id="admission-visa" className="py-16 sm:py-24 bg-[hsl(var(--section-muted))] scroll-mt-20 relative overflow-hidden" aria-labelledby="admission-heading">
        {/* Background accents */}
        <div className="absolute top-40 left-0 w-72 h-72 bg-accent/[0.03] rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-blue-500/[0.03] rounded-full blur-3xl translate-x-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-3">APPLY</span>
            <h2 id="admission-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gunmetal mb-3">Admission & Visa Process</h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">From choosing your program to arriving in Italy — here's your complete step-by-step roadmap.</p>
          </div>

          {/* ── Inline animated timeline step ── */}
          <AnimatedTimelineStep index={0}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {/* ─── LEFT: Admission Requirements ─── */}
              <div>
                <h3 className="text-lg font-semibold text-gunmetal mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent" />
                  Admission Requirements
                  <span className="text-[10px] font-normal text-muted-foreground ml-auto bg-secondary/40 px-2 py-0.5 rounded-full">
                    {reqTab === "bachelor" ? "5 items" : "5 items"}
                  </span>
                </h3>
                {/* Tabs */}
                <div className="inline-flex bg-secondary/30 rounded-lg p-1 mb-5 shadow-sm" role="tablist" aria-label="Degree level">
                  <button role="tab" aria-selected={reqTab === "bachelor"} onClick={() => setReqTab("bachelor")} className={`px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${reqTab === "bachelor" ? "bg-white text-gunmetal shadow-sm" : "text-muted-foreground hover:text-gunmetal"}`}>Bachelor's</button>
                  <button role="tab" aria-selected={reqTab === "master"} onClick={() => setReqTab("master")} className={`px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${reqTab === "master" ? "bg-white text-gunmetal shadow-sm" : "text-muted-foreground hover:text-gunmetal"}`}>Master's</button>
                </div>

                <div className="space-y-2.5">
                  {[
                    ...(reqTab === "bachelor"
                      ? [
                        { l: "Academics", d: "Class 12 with 70%+ (GPA 3.0/4.0)", icon: GraduationCap, tip: "CBSE, ISC & State Boards accepted" },
                        { l: "IELTS", d: "Minimum 6.0 overall", icon: Globe, tip: "No band less than 5.5 typically" },
                        { l: "TOEFL iBT", d: "Minimum 80", icon: Globe, tip: "Accepted by most English-taught programs" },
                        { l: "Entrance Exams", d: "IMAT, CENT-S or university-specific", icon: FileText, tip: "Check your program's specific exam requirements early" },
                        { l: "Portfolio", d: "Required for Art, Design & Architecture", icon: Palette, tip: "Showcase 10-15 of your best works" },
                      ]
                      : [
                        { l: "Academics", d: "Bachelor's degree in related field, 67-75%+", icon: GraduationCap, tip: "3 or 4-year degrees both accepted" },
                        { l: "IELTS", d: "Minimum 6.0 overall", icon: Globe, tip: "Some top universities may ask for 6.5" },
                        { l: "TOEFL iBT", d: "Minimum 80", icon: Globe, tip: "Valid for 2 years from test date" },
                        { l: "Work Experience", d: "2-3 years for MBA/Executive programs", icon: Briefcase, tip: "Not mandatory for most Master's" },
                        { l: "Entrance Exams", d: "Not required for most Master's", icon: FileText, tip: "Some technical programs may have specific tests" },
                      ])
                  ].map((r, i) => (
                    <div key={i} className="group flex items-start gap-3 p-3 bg-white rounded-xl border border-border hover:shadow-md hover:border-accent/20 transition-all duration-300 relative">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <r.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-gunmetal">{r.l}</h4>
                          <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px] text-accent font-medium shrink-0">ⓘ</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{r.d}</p>
                        {/* Hover tip */}
                        <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-8">
                          <p className="text-[10px] text-accent/80 mt-1 italic">{r.tip}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ─── RIGHT: Visa Process Timeline ─── */}
              <div>
                <h3 className="text-lg font-semibold text-gunmetal mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                  Visa Process Timeline
                  <span className="text-[10px] font-normal text-muted-foreground ml-auto bg-secondary/40 px-2 py-0.5 rounded-full">6 steps</span>
                </h3>

                <div className="space-y-0">
                  {[
                    { s: 1, t: "University Admission", d: "Secure your acceptance letter from an Italian university.", tag: "1–3 months", icon: GraduationCap, tip: "Apply to 2-3 universities to increase your chances. Keep track of each program's deadline." },
                    { s: 2, t: "Document Preparation", d: "Gather passport, financial proof, accommodation & health insurance.", tag: "4–6 weeks", icon: FileText, tip: "Financial proof: ~€6,000/year minimum. Get health insurance with Schengen coverage." },
                    { s: 3, t: "Visa Application", d: "Apply for Type D Student Visa at the Italian Embassy.", tag: "4–8 weeks", icon: ShieldCheck, tip: "Book your appointment early — slots fill up fast during peak season (June-August)." },
                    { s: 4, t: "Biometrics & Interview", d: "Attend your appointment at the Italian Embassy/Consulate.", tag: "1 day", icon: Users, tip: "Dress formally. Be ready to explain your study plans, finances, and post-graduation intentions." },
                    { s: 5, t: "Visa Approval", d: "Receive your visa and prepare for your journey.", tag: "2–4 weeks", icon: CheckCircle2, tip: "Once approved, book flights and arrange accommodation before you depart." },
                    { s: 6, t: "Arrive in Italy", d: "Complete residence permit & begin your academic journey.", tag: "8 days", icon: MapPin, tip: "Apply for Permesso di Soggiorno within 8 working days. Open a bank account and get a SIM card." },
                  ].map((step, i) => (
                    <VisaStep key={i} step={step} index={i} total={6} />
                  ))}
                </div>
              </div>
            </div>
          </AnimatedTimelineStep>
        </div>
      </section>

      {/* ═══════════ 8. CITIES + CAREER ═══════════ */}
      <section id="cities-career" className="py-16 sm:py-20 bg-white scroll-mt-20" aria-labelledby="cities-career-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Cities */}
            <div>
              <div className="mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-3">CITIES</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gunmetal mb-2">Best Student Cities</h2>
                <p className="text-muted-foreground text-sm">Each city blends academic excellence with unique Italian charm.</p>
              </div>
              <div className="space-y-3">
                {[
                  { n: "Milan", tag: "Fashion & Finance Capital", u: 14, d: "Italy's economic hub with top-ranked technical universities and strong job market.", hl: ["Politecnico di Milano", "Fashion Capital", "Strong Job Market"] },
                  { n: "Rome", tag: "The Eternal City", u: 19, d: "Historic capital with Sapienza, one of Europe's largest. Rich in culture and academic heritage.", hl: ["Sapienza University", "Ancient History", "Cultural Hub"] },
                  { n: "Bologna", tag: "Student Paradise", u: 3, d: "Home to the world's oldest university. Vibrant student life and Italy's food capital.", hl: ["Oldest University", "Student-Friendly", "Food Capital"] },
                  { n: "Turin", tag: "Innovation Hub", u: 4, d: "Automotive capital with Politecnico di Torino. Strong industry links and affordable living.", hl: ["Automotive Hub", "Politecnico di Torino", "Affordable"] },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 sm:p-4 bg-secondary/10 rounded-xl border border-secondary/20 hover:bg-secondary/20 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-bold text-sm shrink-0">{c.u}</div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-semibold text-gunmetal">{c.n}</h4>
                        <span className="text-[10px] text-accent font-medium">{c.tag}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{c.d}</p>
                      <div className="flex flex-wrap gap-1 mt-1.5">{c.hl.map((h, j) => (<span key={j} className="px-1.5 py-0.5 bg-primary/5 text-primary text-[9px] rounded-full">{h}</span>))}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Career */}
            <div>
              <div className="mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-3">CAREER</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gunmetal mb-2">Career Opportunities</h2>
                <p className="text-muted-foreground text-sm">12-month stay-back visa. Strong demand across multiple sectors.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-green-50 rounded-xl border border-green-100 p-4 text-center">
                  <div className="text-2xl font-extrabold text-green-700">20<span className="text-sm font-medium">hrs/wk</span></div>
                  <div className="text-xs text-green-700/70 mt-1">Part-Time Work Rights</div>
                </div>
                <div className="bg-accent/5 rounded-xl border border-accent/20 p-4 text-center">
                  <div className="text-2xl font-extrabold text-accent">12<span className="text-sm font-medium"> months</span></div>
                  <div className="text-xs text-accent/70 mt-1">Stay-Back Visa</div>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { r: "Software Engineer / IT", s: "€28,000 – €40,000", i: <Zap className="w-4 h-4" /> },
                  { r: "Data Analyst / Data Scientist", s: "€30,000 – €45,000", i: <TrendingUp className="w-4 h-4" /> },
                  { r: "Mechanical / Automotive Engineer", s: "€30,000 – €42,000", i: <Briefcase className="w-4 h-4" /> },
                  { r: "Business Analyst", s: "€28,000 – €38,000", i: <Globe className="w-4 h-4" /> },
                  { r: "Graphic Designer", s: "€22,000 – €30,000", i: <Palette className="w-4 h-4" /> },
                  { r: "Marketing & Communications", s: "€24,000 – €30,000", i: <Star className="w-4 h-4" /> },
                ].map((x, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-secondary/10 rounded-xl border border-secondary/20">
                    <div className="flex items-center gap-2.5"><div className="text-accent">{x.i}</div><span className="text-xs sm:text-sm font-medium text-gunmetal">{x.r}</span></div>
                    <span className="text-xs font-bold text-accent">{x.s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 9. FAQ ═══════════ */}
      <section id="faq" className="py-16 sm:py-20 bg-[hsl(var(--section-muted))] scroll-mt-20" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-3">FAQ</span>
            <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold text-gunmetal mb-2">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-2">
            {[
              { q: "Is education in Italy free for Indian students?", a: "Not entirely free, but public universities charge just €890–€4,260/year — far less than UK, US, or Australia. Generous scholarships like DSU and MAECI can further reduce or eliminate costs based on merit and financial need." },
              { q: "Can I get PR after studying in Italy?", a: "Yes. After 5 years of legal residence (including study + post-study work years), you become eligible to apply for Italian Permanent Residency, making it an achievable pathway for Indian students." },
              { q: "Is IELTS required for an Italy student visa?", a: "IELTS is not mandatory for the visa itself, but English-taught programs require it. Minimum score is typically 6.0 overall, varying by university and program." },
              { q: "How much GPA is required for Italy?", a: "Generally, a GPA of 3.0/4.0 (~70%) is needed for undergraduate programs. Competitive fields like Engineering and Medicine may require higher GPAs." },
              { q: "How long does the Italy student visa take?", a: "Type D Student Visa processing typically takes 4–8 weeks, depending on the embassy and your documentation. Apply early — ideally 3 months before your course starts." },
              { q: "Can I work part-time while studying?", a: "Yes — 20 hours/week during semesters and full-time during holidays. No additional work permit is required. Popular jobs: tutoring, hospitality, retail, and paid internships." },
              { q: "Do I need to learn Italian?", a: "Not for English-taught programs. However, basic Italian is highly recommended for daily life, socializing, and accessing more part-time job opportunities." },
              { q: "When should I start my application?", a: "Begin 8–12 months before your intended intake. This allows time for language tests, document prep, university applications, scholarship applications, and visa processing." },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-border overflow-hidden transition-all duration-200">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-q-${i}`}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset">
                  <span className="text-sm font-semibold text-gunmetal pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 text-accent shrink-0" aria-hidden="true" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />}
                </button>
                <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-60" : "max-h-0"}`}>
                  <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-3">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 10. CAREER PROSPECTS ═══════════ */}
      <section id="career-prospects" className="py-16 sm:py-20 bg-[hsl(var(--section-muted))] scroll-mt-20" aria-labelledby="career-prospects-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-3">CAREER</span>
            <h2 id="career-prospects-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gunmetal mb-3">Career Prospects in Italy</h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">Italy's diverse economy offers strong opportunities across creative, tech, and industrial sectors for international graduates.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {[
              { i: <Palette className="w-5 h-5" />, t: "Fashion & Design", d: "Milan — global fashion capital with luxury houses & design studios" },
              { i: <Zap className="w-5 h-5" />, t: "Engineering & Mfg.", d: "Turin & Bologna — automotive, aerospace, industrial automation" },
              { i: <UtensilsCrossed className="w-5 h-5" />, t: "Food & Hospitality", d: "World-renowned culinary scene — tourism, hospitality, F&B" },
              { i: <Building2 className="w-5 h-5" />, t: "Creative Industries", d: "Rome & Florence — art, media, architecture, cultural heritage" },
              { i: <TrendingUp className="w-5 h-5" />, t: "IT & Tech", d: "Growing startup ecosystem — €30K-45K avg for developers" },
              { i: <Globe className="w-5 h-5" />, t: "Marketing & Sales", d: "Global brands seek multilingual talent — €24K-30K starting" },
            ].map((c, i) => (
              <div key={i} className="group bg-white rounded-xl border border-border p-4 sm:p-5 shadow-[var(--card-shadow)] hover:shadow-[var(--glow-primary)] hover:-translate-y-1 transition-all duration-300 text-center focus-within:ring-2 focus-within:ring-ring">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto mb-3 group-hover:bg-accent group-hover:text-white transition-colors duration-300">{c.i}</div>
                <h4 className="text-xs sm:text-sm font-semibold text-gunmetal mb-1">{c.t}</h4>
                <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button onClick={bookCall} className="bg-accent hover:bg-accent/90 text-white px-6 py-4 text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <Phone className="w-4 h-4 mr-2" aria-hidden="true" />Get Career Guidance
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════ 11. FINAL CTA ═══════════ */}
      <section id="cta" className="py-16 sm:py-20 bg-white scroll-mt-20" aria-labelledby="cta-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-14 text-center cta-gradient-bg">
            {/* Italy flag accent stripe */}
            <div className="absolute top-0 left-0 right-0 h-1 flex">
              <div className="flex-1 bg-[#009246]" /><div className="flex-1 bg-white" /><div className="flex-1 bg-[#ce2b37]" />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(224,141,60,0.12),transparent_60%)]" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold mb-5">START YOUR ITALY JOURNEY</span>
              <h2 id="cta-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3">Ready to Study in <span className="text-accent">Italy</span>?</h2>
              <p className="text-white/60 text-sm sm:text-base mb-7 max-w-lg mx-auto">Book a free counselling session. Get personalized guidance on universities, scholarships, visas — everything you need.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={bookCall} className="bg-accent hover:bg-accent/90 text-white px-8 py-5 text-sm sm:text-base font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary">
                  <Phone className="w-4 h-4 mr-2" aria-hidden="true" />Book Free Counselling
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mt-6 text-white/50 text-xs">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />Free Shortlisting</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />Scholarship Help</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />Visa Guidance</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />Post-Arrival Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer hideMckh />

      {/* Desktop side button */}
      <Button onClick={bookCall}
        className="fixed top-1/2 -translate-y-1/2 z-40 text-primary px-3 py-4 rounded-l-md shadow-lg items-center gap-2 font-medium text-sm transform rotate-90 origin-center transition-colors duration-200 whitespace-nowrap hidden md:flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        style={{ right: "-52px", backgroundColor: "hsl(var(--secondary))", border: "1px solid hsl(var(--secondary))" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "hsl(204, 59%, 80%)")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "hsl(var(--secondary))")}>
        <span className="transform rotate-180 text-sm font-semibold">Book 1:1 Call</span>
        <Phone className="h-4 w-4 text-primary transform rotate-180" aria-hidden="true" />
      </Button>

      {/* Auth popup */}
      {showAuthPopup && <AuthPopup isOpen onClose={() => setShowAuthPopup(false)} onAuthSuccess={onAuth} title="Sign in to book your consultation" subtitle="Please sign in to schedule your 1:1 call with our Italy experts" initialMode="login" skipPortalRedirect />}

      {/* Payment popup */}
      {showPaymentPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl p-4 w-80 mx-4">
            <div className="text-center mb-5">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3"><Phone className="w-5 h-5 text-primary" aria-hidden="true" /></div>
              <h2 className="text-lg font-bold text-primary">Book Your 1:1 Call</h2>
              <p className="text-sm text-muted-foreground mt-1">with a UNI 360° Italy expert</p>
            </div>
            {currentUser && (
              <div className="bg-muted rounded-lg p-3 mb-4 text-sm border border-border">
                <p className="text-muted-foreground text-xs mb-1">Booking as:</p>
                <p className="font-semibold text-primary">{currentUser.name || currentUser.fullName || `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim()}</p>
                <p className="text-muted-foreground text-xs">{currentUser.email}</p>
              </div>
            )}
            <div className="flex items-center justify-between bg-secondary/30 rounded-lg px-4 py-3 mb-4 border border-secondary">
              <span className="text-sm text-muted-foreground">Consultation Fee</span><span className="text-lg font-bold text-primary">₹1</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1 mb-4 px-1">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" aria-hidden="true" /> 15-min 1:1 video call</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" aria-hidden="true" /> Personalized university guidance</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" aria-hidden="true" /> Scholarship & visa insights</li>
            </ul>
            {paymentError && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-3" role="alert">
                <p className="text-destructive text-xs">{paymentError}</p>
              </div>
            )}
            <Button onClick={doPay} disabled={paymentLoading} className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              {paymentLoading ? <><span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" aria-hidden="true" />Processing...</> : "Pay ₹1 & Book Call"}
            </Button>
            <button onClick={() => setShowPaymentPopup(false)} className="w-full text-center text-xs text-muted-foreground mt-3 hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyInItaly;
