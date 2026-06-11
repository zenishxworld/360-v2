import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import imgBelgrade from "../assets/STUDY-IN-SERBIA/University of belgrade.webp";
import imgNoviSad from "../assets/STUDY-IN-SERBIA/University of Novi Sad.jpg";
import imgNis from "../assets/STUDY-IN-SERBIA/University of Nis.jpg";
import imgKragujevac from "../assets/STUDY-IN-SERBIA/University of Kragujevac.webp";
import imgSingidunum from "../assets/STUDY-IN-SERBIA/Singidunum University.avif";
import bgFagaras from "../assets/compressed-serbia/aerial-drone-view-fagaras-romania.jpg";
import bgChernivtsi from "../assets/compressed-serbia/aerial-view-residence-bukovinian-dalmatian-metropolitans-chernivtsi-national-university-chernivtsi-touristic-destination-western-ukraine.jpg";
import bgPrague from "../assets/compressed-serbia/day-view-prague-castle.jpg";
import bgVienna from "../assets/compressed-serbia/evening-view-town-hall-vienna.jpg";
import bgGraduates from "../assets/compressed-serbia/low-angle-students-graduated.jpg";
import bgBarcelona from "../assets/compressed-serbia/palau-nacional-barcelona-spain-cloudy-sky (1).jpg";
import bgSerbiaIndia from "../assets/compressed-serbia/serbia-india image.png";
import bgIasi from "../assets/compressed-serbia/view-palace-culture-iasi-romania.jpg";
import bgQuickFacts from "../assets/compressed-serbia/esztergom-hungary-basilica-our-lady-esztergom-by-river-danube-discover-beauties-hungary_527096-53372.jpg";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import AuthPopup, { AuthUtils } from "@/components/AuthPopup";
import { paymentAPI } from "@/services/api";
import {
  GraduationCap, MapPin, Clock, Users, BookOpen,
  Globe, Briefcase, Home, ChevronDown, ChevronUp,
  ArrowRight, Phone, Award, Building2,
  Landmark, CheckCircle2, FileText,
  ShieldCheck, TrendingUp, Banknote, Zap, Star, ExternalLink,
  Heart, Info, ChevronRight, Sparkles, Search, Filter,
  Plane, Wifi, Coffee, Train
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
      {!isLast && <div className="absolute left-[19px] top-9 bottom-0 w-0.5 bg-gradient-to-b from-accent/30 to-accent/5" />}
      <div ref={circleRef} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 transition-all duration-300 shadow-md ${
        isLast ? "bg-green-500 shadow-green-500/30" : "bg-accent shadow-accent/20"
      } ${inView ? "scale-100" : "scale-75"}`}>
        {isLast ? <Plane className="w-4 h-4" /> : StepIcon ? <StepIcon className="w-4 h-4" /> : step.s}
      </div>
      <div ref={cardRef} className={`bg-white rounded-xl border border-border p-3 sm:p-4 flex-1 shadow-sm transition-all duration-300 group hover:shadow-lg hover:border-accent/25 hover:-translate-y-0.5 ${inView ? "opacity-100" : "opacity-0"}`}>
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="text-sm font-semibold text-gunmetal">{step.t}</h4>
          <span className="shrink-0 px-2 py-0.5 bg-accent/10 text-accent text-[9px] font-bold rounded-full">{step.tag}</span>
        </div>
        <p className="text-xs text-muted-foreground">{step.d}</p>
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

// ── Scholarship data ──
const SCHOLARSHIPS = [
  {
    cat: "Government", icon: "Landmark",
    n: "World in Serbia Scholarship", a: "Full Tuition + Stipend", amount: 8000,
    e: "International students, merit-based",
    color: "from-blue-500 to-blue-600", bgLight: "bg-blue-50", textColor: "text-blue-700", badgeColor: "bg-blue-500/10 text-blue-600",
    b: ["Full tuition fee waiver", "Monthly living stipend", "Health insurance coverage"],
    details: "The Serbian Government's flagship scholarship program for international students. Covers full tuition, provides a monthly stipend for living expenses, and includes health insurance for the duration of study.",
    link: "https://www.srbija.gov.rs/",
    deadline: "Usually February – April each year"
  },
  {
    cat: "Government", icon: "Award",
    n: "Ministry of Education Scholarship", a: "Up to €3,000/year", amount: 3000,
    e: "Students from partner countries",
    color: "from-emerald-500 to-emerald-600", bgLight: "bg-emerald-50", textColor: "text-emerald-700", badgeColor: "bg-emerald-500/10 text-emerald-600",
    b: ["Partial tuition coverage", "Based on bilateral agreements", "Renewable annually"],
    details: "Serbia's Ministry of Education offers scholarships based on bilateral agreements with India and other countries. Students must be nominated by their home country's Ministry of Education.",
    link: null,
    deadline: "Varies by country agreement (typically March – May)"
  },
  {
    cat: "University", icon: "GraduationCap",
    n: "University of Belgrade Merit Award", a: "20-50% Tuition Waiver", amount: 2500,
    e: "International students, high academic merit",
    color: "from-purple-500 to-purple-600", bgLight: "bg-purple-50", textColor: "text-purple-700", badgeColor: "bg-purple-500/10 text-purple-600",
    b: ["Partial tuition reduction", "Merit-based renewal", "Available across all faculties"],
    details: "The University of Belgrade offers merit-based scholarships for outstanding international students. Students with high academic records are automatically considered during the application process.",
    link: "https://www.bg.ac.rs/en/",
    deadline: "Same as program application deadline"
  },
  {
    cat: "University", icon: "Building2",
    n: "Singidunum University Scholarship", a: "Up to 30% Discount", amount: 1500,
    e: "All international applicants",
    color: "from-amber-500 to-amber-600", bgLight: "bg-amber-50", textColor: "text-amber-700", badgeColor: "bg-amber-500/10 text-amber-600",
    b: ["Tuition fee reduction", "English-taught programs eligible", "No separate application needed"],
    details: "Singidunum University in Belgrade offers automatic tuition discounts for international students enrolled in English-taught programs. One of the most accessible scholarship options in Serbia.",
    link: "https://www.singidunum.ac.rs/en/",
    deadline: "Rolling admission - apply anytime"
  },
  {
    cat: "EU", icon: "Globe",
    n: "Erasmus+ Exchange Program", a: "€800-1,200/month", amount: 1200,
    e: "Students at Erasmus-partner universities",
    color: "from-rose-500 to-rose-600", bgLight: "bg-rose-50", textColor: "text-rose-700", badgeColor: "bg-rose-500/10 text-rose-600",
    b: ["Monthly mobility grant", "No tuition fees during exchange", "European study credit recognition"],
    details: "Serbian universities participate in Erasmus+ programs enabling students to study in EU countries. Once enrolled in a Serbian university, students can apply for semester exchanges across 30+ European countries.",
    link: null,
    deadline: "October – November (for spring semester)"
  },
  {
    cat: "University", icon: "GraduationCap",
    n: "Novi Sad Early Bird Discount", a: "15% Tuition Reduction", amount: 750,
    e: "Early applicants, all nationalities",
    color: "from-teal-600 to-teal-700", bgLight: "bg-teal-50", textColor: "text-teal-700", badgeColor: "bg-teal-500/10 text-teal-600",
    b: ["Automatic early application benefit", "No merit conditions required", "Stackable with other discounts"],
    details: "The University of Novi Sad rewards early applications with a tuition reduction. Students who apply and confirm enrollment before a set deadline automatically receive the discount, no special application required.",
    link: "https://www.uns.ac.rs/index.php/en/",
    deadline: "Usually 3 months before intake"
  },
];

const SCHOLARSHIP_CATEGORIES = [
  { id: "all", label: "All Scholarships", icon: "Sparkles" },
  { id: "Government", label: "Government", icon: "Landmark" },
  { id: "University", label: "University", icon: "GraduationCap" },
  { id: "EU", label: "EU Programs", icon: "Globe" },
];

const CAT_ICONS: Record<string, any> = {
  Government: Landmark, University: GraduationCap, EU: Globe,
};

// ── Scholarship category filter button ──
const FilterBtn = ({ active, icon: Icon, label, onClick }: { active: boolean; icon: any; label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border ${
      active
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

// ── Scholarships Section ──
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
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={sectionRef} className={`text-center mb-8 sm:mb-10 transition-all duration-700 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 id="scholarships-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gunmetal mb-3">Scholarships in Serbia</h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">Serbia offers government, university, and EU scholarship programs that can significantly reduce your study costs. Explore your options below.</p>
        </div>

        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10 transition-all duration-700 delay-150 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {stats.map((stat, i) => (
            <div key={i} className="bg-gradient-to-br from-accent/5 to-accent/[0.02] rounded-xl sm:rounded-2xl border border-accent/10 p-4 sm:p-5 text-center hover:shadow-md hover:border-accent/20 transition-all duration-300 group">
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent mx-auto mb-1.5 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-lg sm:text-xl font-bold text-gunmetal">{stat.v}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{stat.l}</div>
            </div>
          ))}
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((s, i) => {
            const Icon = CAT_ICONS[s.cat] || Award;
            const isExpanded = expandedScholarship === i;

            return (
              <AnimatedCard key={i} delay={i * 100}>
                <div className={`bg-white rounded-xl sm:rounded-2xl border border-border p-5 sm:p-6 shadow-[var(--card-shadow)] transition-all duration-500 group ${isExpanded ? "shadow-xl border-accent/30" : "hover:shadow-[var(--glow-primary)] hover:-translate-y-1.5"}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-9 h-9 rounded-lg ${s.badgeColor} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${s.badgeColor}`}>{s.cat}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-gunmetal mb-2 leading-snug">{s.n}</h3>
                  <span className={`inline-block px-2.5 py-1 ${s.bgLight} ${s.textColor} text-[10px] sm:text-xs font-bold rounded-full mb-3`}>{s.a}</span>
                  <div className="mb-3">
                    <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                      <span>Funding level</span>
                      <span className="font-semibold text-gunmetal">{s.a}</span>
                    </div>
                    <AmountBar value={s.amount} max={maxAmount} />
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    <span className="font-medium text-gunmetal">Eligibility:</span> {s.e}
                  </p>
                  <ul className="space-y-1.5 mb-3">
                    {s.b.map((b, j) => (
                      <li key={j} className="flex items-start gap-1.5 text-[11px] sm:text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setExpandedScholarship(isExpanded ? null : i)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-accent/5 hover:bg-accent/10 text-accent text-xs font-semibold transition-all duration-200"
                  >
                    <Info className="w-3 h-3" />
                    {isExpanded ? "Show less" : "More details"}
                    <ChevronRight className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} />
                  </button>
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

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No scholarships match this category.</p>
            <button onClick={() => setScholarshipFilter("all")} className="mt-2 text-xs text-accent font-semibold hover:underline">View all scholarships</button>
          </div>
        )}

        <AnimatedCard delay={300}>
          <div className="mt-10 text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/[0.02] border border-accent/10">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-auto mb-2" />
            <h3 className="text-base sm:text-lg font-bold text-gunmetal mb-1">Need help finding the right scholarship?</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 max-w-lg mx-auto">Our experts can match you with Serbia scholarships based on your academic background, financial needs, and chosen program.</p>
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

// ── ANIMATED UNIVERSITY STACK CARD ──
const AnimatedUniversityCard = ({ u, i, total }: { u: any, i: number, total: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track this card's scroll progress when it's sticky
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "start -100%"]
  });

  // Calculate target scale based on position in stack (each previous card scales down slightly more)
  const targetScale = 1 - ((total - i) * 0.05);

  // When card reaches top and we scroll past it, it scales down and fades into the background slightly
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const opacityOverlay = useTransform(scrollYProgress, [0, 1], [0, 0.6]);

  // Subtle image parallax effect
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <div 
      ref={cardRef}
      className="md:sticky flex flex-col items-center w-full mb-12 md:mb-[10vh]"
      style={{
        top: `calc(10vh + ${i * 1.5}rem)`,
        height: "70vh",
        minHeight: "450px",
        maxHeight: "800px",
        zIndex: i,
      }}
    >
      <motion.a 
        href={u.website} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ scale, y }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative w-full max-w-5xl rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border border-white/20 group h-full transform-gpu"
      >
        {/* Parallax Image Container */}
        <motion.div style={{ y: imageY }} className="absolute inset-[-15%] w-[130%] h-[130%] origin-top">
          {u.img ? (
            <img src={u.img} alt={u.n} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          ) : (
            <div className={`w-full h-full ${u.cssClass || 'bg-gunmetal'}`} />
          )}
        </motion.div>
        
        {/* Darkening overlay when scrolling past */}
        <motion.div style={{ opacity: opacityOverlay }} className="absolute inset-0 bg-black z-20 pointer-events-none" />

        {/* Deep Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-gunmetal via-gunmetal/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gunmetal/20 group-hover:bg-transparent transition-colors duration-500 z-10" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 lg:p-16 z-30">
          {/* Top Right Badge */}
          <div className="absolute top-6 right-6 sm:top-10 sm:right-10 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-lg">
            {u.r}
          </div>

          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3 text-accent font-bold text-sm sm:text-base tracking-wide uppercase">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              {u.c}, Serbia
            </div>
            
            <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
              {u.n}
            </h3>
            
            <p className="text-sm sm:text-lg lg:text-xl text-white/80 font-medium mb-6 sm:mb-8 leading-relaxed line-clamp-3 sm:line-clamp-none">
              {u.h}
            </p>
            
            {/* Tags & CTA Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/20">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {u.p.map((pr: string, j: number) => (
                  <span key={j} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-md border border-white/10 text-white font-semibold text-xs sm:text-sm rounded-xl tracking-wide">
                    {pr}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-2 text-accent text-sm sm:text-base font-bold group-hover:gap-4 transition-all duration-300 whitespace-nowrap">
                Explore Programs <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>
        </div>
      </motion.a>
    </div>
  );
};

// ── STUDY IN SERBIA ──
const StudyInSerbia = () => {
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [reqTab, setReqTab] = useState<"bachelor" | "master">("bachelor");
  const [expandedScholarship, setExpandedScholarship] = useState<number | null>(null);
  const [scholarshipFilter, setScholarshipFilter] = useState<string>("all");
  const [courseTab, setCourseTab] = useState<"bachelor" | "master">("bachelor");

  const CALENDLY = "https://calendly.com/uni360degreetech/30min";
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const bookCall = () => {
    if (AuthUtils.isAuthenticated()) { setCurrentUser(AuthUtils.getCurrentUser()); setShowPaymentPopup(true); }
    else setShowAuthPopup(true);
  };

  // Redirect to student portal for Serbia lead collection flow
  const STUDENT_PORTAL_URL = import.meta.env.VITE_STUDENT_PORTAL_URL || 'http://localhost:5173';
  const applyNow = () => {
    if (AuthUtils.isAuthenticated()) {
      // Redirect directly to Serbia interest form in student portal
      window.location.href = `${STUDENT_PORTAL_URL}/serbia-interest`;
    } else {
      // Redirect to student portal login, which will then go to serbia-interest
      window.location.href = `${STUDENT_PORTAL_URL}/login?redirect=/serbia-interest`;
    }
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

  const universities = [
    { n: "University of Belgrade", short: "UB", r: "QS #801-1000", c: "Belgrade", t: "Public", p: ["Engineering", "Law", "Medicine"], h: "Serbia's largest and oldest university, founded in 1808. Offers 300+ study programs across 31 faculties.", website: "https://www.bg.ac.rs/en/", cssClass: "uni-belgrade", img: imgBelgrade },
    { n: "University of Novi Sad", short: "UNS", r: "QS #801-1000", c: "Novi Sad", t: "Public", p: ["Sciences", "Technology", "Arts"], h: "A modern comprehensive university in Serbia's second city. Known for strong technical and natural science programs.", website: "https://www.uns.ac.rs/index.php/en/", cssClass: "uni-novisad", img: imgNoviSad },
    { n: "University of Nis", short: "UNIS", r: "Regional Leader", c: "Nis", t: "Public", p: ["Economics", "Engineering", "Medicine"], h: "One of Serbia's four major universities, offering affordable tuition and a vibrant student community in Nis.", website: "https://www.ni.ac.rs/en/", cssClass: "uni-nis", img: imgNis },
    { n: "University of Kragujevac", short: "UNIKG", r: "Regional Leader", c: "Kragujevac", t: "Public", p: ["Medicine", "Sciences", "Engineering"], h: "A growing university in central Serbia with a strong medical school and engineering faculty.", website: "https://www.kg.ac.rs/index_en.php", cssClass: "uni-kragujevac", img: imgKragujevac },
    { n: "Singidunum University", short: "SINGIDU", r: "Top Private", c: "Belgrade", t: "Private", p: ["Business", "IT", "Media"], h: "Serbia's leading private university with English-taught programs in Business, IT, and Communications.", website: "https://www.singidunum.ac.rs/en/", cssClass: "uni-singi", img: imgSingidunum },
  ];

  const faqs = [
    { q: "Can I study in Serbia without IELTS?", a: "Yes. Many Serbian universities accept Medium of Instruction (MOI) certificates from Indian schools and universities instead of IELTS. Some universities also conduct internal English proficiency interviews. This makes Serbia one of the most accessible European destinations for Indian students." },
    { q: "Is MOI accepted by Serbian universities?", a: "Yes, MOI (Medium of Instruction) certificates from schools and universities where English was the language of instruction are widely accepted. You will typically need MOI from your 10+2 school or undergraduate college, certified by the relevant authority." },
    { q: "What is the total cost of studying in Serbia?", a: "The total cost including tuition fees (EUR 500-5,000/year), accommodation (EUR 150-300/month), food (EUR 100-150/month), and other expenses works out to approximately Rs. 6-7 Lakhs for a full year of study. This makes Serbia one of the most affordable European study destinations." },
    { q: "Can I work while studying in Serbia?", a: "Yes, international students can work up to 20 hours per week during semesters and full-time during holidays. Common student jobs include tutoring, hospitality, IT support, and language teaching. Monthly earnings typically range from EUR 300-600." },
    { q: "Is Serbia safe for Indian students?", a: "Serbia has a welcoming environment for international students and is considered a safe country. Belgrade and Novi Sad are modern European cities with good infrastructure, public transport, and a growing international student community. Many Indian students study there without safety concerns." },
    { q: "What are the best universities in Serbia for Indian students?", a: "The University of Belgrade, University of Novi Sad, and Singidunum University are the most popular among Indian students. Singidunum is particularly known for English-taught business and IT programs. Public universities offer lower tuition while private universities may offer more English-medium options." },
    { q: "How long does the Serbia student visa take?", a: "Serbia student visa processing typically takes 2-4 weeks after submitting all required documents. It is advisable to apply at least 6-8 weeks before your course start date to allow for any delays. You need a valid offer letter, financial proof, and accommodation details." },
    { q: "How much bank balance is required for a Serbia student visa?", a: "You typically need to show funds equivalent to approximately EUR 3,600-4,800 (roughly Rs. 3-4 Lakhs) covering one year of living expenses, in addition to your tuition fees. This demonstrates financial stability to the Serbian consulate." },
    { q: "What is the visa success rate for Serbia?", a: "Serbia has one of the highest student visa approval rates in Europe, with success rates typically above 90% for well-prepared applications from Indian students. The process is more straightforward compared to countries like Germany or the UK." },
    { q: "Are Serbian degrees recognized in India and globally?", a: "Yes. Serbian universities are recognized by UGC, AIU (Association of Indian Universities), and international bodies. Degrees from Serbia are accepted in EU countries, Canada, the US, and other destinations for further studies or employment. Serbia's academic framework follows the European Bologna Process." },
    { q: "What intakes are available in Serbia?", a: "Serbian universities typically offer two intakes: February/March (Spring/Winter Intake) and September/October (Autumn/Fall Intake). The October intake is the main intake with more program options. Deadlines are usually 2-3 months before the intake date." },
    { q: "Can I get PR or stay back after studying in Serbia?", a: "After completing your degree, you can apply for a temporary residence permit for job searching (typically 6-12 months). After 5 years of continuous legal residence (including study years), you may be eligible for permanent residency in Serbia." },
    { q: "What are the English-taught programs available in Serbia?", a: "Several universities in Serbia offer fully English-taught programs, particularly in Business Administration, Computer Science, IT, International Relations, and some Engineering fields. Singidunum University and the University of Belgrade have the widest range of English-medium programs." },
    { q: "What are the minimum academic requirements for Serbia?", a: "For Bachelor's programs: 10+2 with a minimum of 50-60% marks. For Master's programs: a Bachelor's degree with 55-60% aggregate. Medical programs (MBBS) may require higher scores. Serbia is relatively accessible compared to other European destinations." },
    { q: "What is the cost of accommodation in Serbia?", a: "Student dormitories cost approximately EUR 80-150 per month. Private apartments range from EUR 200-400/month for a single room in Belgrade. Shared apartments are more affordable at EUR 150-250 per person. Novi Sad and Nis are cheaper than Belgrade." },
    { q: "What part-time jobs are available for Indian students in Serbia?", a: "Common jobs for international students include restaurant and cafe work, IT freelancing, tutoring English or other subjects, delivery services, administrative roles, and internships. The local minimum wage is around EUR 450/month, but part-time work yields proportionally less." },
    { q: "Is Serbian language required to study in Serbia?", a: "Not for English-taught programs. However, learning basic Serbian is recommended for daily life and accessing more part-time work opportunities. Serbian uses the Cyrillic script but is written in Latin alphabet too. Many people in cities speak English." },
    { q: "What documents are required for Serbia university admission?", a: "Typically: 10th and 12th marksheets, degree certificate (for Masters), passport copy, SOP (Statement of Purpose), CV/Resume, MOI certificate or IELTS score, passport-sized photographs, and application fee. Some universities may require additional subject-specific documents." },
    { q: "How do I apply to Serbian universities?", a: "Most Serbian universities have online application portals. You can also work with education consultants like Uni360 who have established relationships with Serbian universities. Applications typically require academic documents, SOP, and language proof. Processing time is usually 2-6 weeks." },
    { q: "What is the quality of education in Serbia?", a: "Serbian universities follow the European Bologna Process and offer internationally recognized degrees. The University of Belgrade is among the top universities in Southeast Europe. Faculty are well-qualified, with many professors holding international academic experience. Research opportunities are available at public universities." },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Custom Keyframe Animations */}
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
        /* Serbia flag colors: red, blue, white */
        .hero-blob-top { background: radial-gradient(circle, #C6363C 0%, #fff 40%, #0C4076 70%, transparent 100%); transform: translate(30%, -40%); }
        .hero-blob-bottom { background: radial-gradient(circle, #0C4076 0%, #fff 40%, #C6363C 70%, transparent 100%); transform: translate(-30%, 40%); }
        .stripe-delay-1 { animation-delay: 0.1s; }
        .stripe-delay-2 { animation-delay: 0.2s; }
        .stripe-delay-3 { animation-delay: 0.3s; }
        .flag-card-bg { background: linear-gradient(135deg, #C6363C 0%, #C6363C 33%, #0C4076 33%, #0C4076 66%, #fff 66%, #fff 100%); }
        .cta-gradient-bg { background: linear-gradient(135deg, hsl(var(--primary)) 0%, #1a2226 100%); }
        .uni-belgrade { background: linear-gradient(135deg, #8b1a1a 0%, #a8323a 50%, #c94b4b 100%); }
        .uni-novisad { background: linear-gradient(135deg, #0d3b66 0%, #1a6b9e 50%, #2894c2 100%); }
        .uni-nis { background: linear-gradient(135deg, #1a3a5c 0%, #2d5a8c 50%, #4a7ab9 100%); }
        .uni-kragujevac { background: linear-gradient(135deg, #3a1a5c 0%, #5a2d8c 50%, #7a4ab9 100%); }
        .uni-singi { background: linear-gradient(135deg, #1a4a2a 0%, #2d7a4a 50%, #4aaa6a 100%); }
        .card-delay-0 { animation-delay: 0s; } .card-delay-1 { animation-delay: 0.15s; } .card-delay-2 { animation-delay: 0.3s; } .card-delay-3 { animation-delay: 0.45s; } .card-delay-4 { animation-delay: 0.6s; }
        @media (prefers-reduced-motion: reduce) {
          .animate-float-up, .animate-float-in, .animate-shimmer, .animate-flag, .animate-pulse-dot, .animate-stripe-slide, .animate-ticker, .animate-card-reveal { animation: none; }
          .opacity-0-anim { opacity: 1; }
          .animate-card-reveal { opacity: 1; }
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <Navigation selectedCountries={["serbia"]} onCountrySelect={() => { }} />

      {/* ═══════════ 1. HERO ═══════════ */}
      <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-20 sm:pb-32 overflow-hidden" aria-labelledby="hero-heading">
        <div className="absolute inset-0 z-0 bg-[hsl(var(--section-muted))]/20">
          <img src={bgPrague} alt="Study in Europe" className="absolute left-0 top-0 w-full lg:w-3/4 h-full object-cover object-center opacity-20 sm:opacity-40 lg:opacity-80 [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] lg:[mask-image:linear-gradient(to_left,transparent_10%,black_60%)] mix-blend-multiply" />
        </div>

        {/* Animated Background Gradients (Serbian Flag Inspired) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] bg-[#C6363C] z-0" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[80px] bg-[#0C4076] z-0" 
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column — Copy */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center lg:text-left space-y-6 lg:space-y-8 z-10"
            >
              <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gunmetal leading-[1.1] tracking-tight">
                Study in <span className="text-accent relative inline-block">
                  Serbia
                  <motion.svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 20" preserveAspectRatio="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
                    <defs>
                      <linearGradient id="serbia-flag" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#C6363C" /> {/* Serbian Red */}
                        <stop offset="50%" stopColor="#0C4076" /> {/* Serbian Blue */}
                        <stop offset="100%" stopColor="#FFFFFF" /> {/* Serbian White */}
                      </linearGradient>
                    </defs>
                    <path d="M0,10 Q50,20 100,10" fill="none" stroke="url(#serbia-flag)" strokeWidth="5" strokeLinecap="round" />
                  </motion.svg>
                </span><br />
                Without any English Test
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
                Earn a European degree with affordable tuition fees, low living costs, and a total study budget starting around Rs. 4-5 Lakhs.
              </p>

              {/* Trust badges — Staggered entrance */}
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.5 }
                  }
                }}
                className="flex flex-wrap gap-3 justify-center lg:justify-start"
              >
                {[
                  { label: "No IELTS Required", color: "text-[#C6363C]" },
                  { label: "No MOI Required", color: "text-[#0C4076]" },
                  { label: "English Programs", color: "text-[#C6363C]" },
                  { label: "Affordable Fees", color: "text-[#0C4076]" },
                ].map((badge, i) => (
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    key={i} 
                    className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-border/60 rounded-full shadow-sm text-xs sm:text-sm font-semibold text-gunmetal hover:border-accent/40 hover:shadow-md transition-all cursor-default"
                  >
                    <CheckCircle2 className={`w-4 h-4 ${badge.color} shrink-0`} />
                    {badge.label}
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
              >
                <Button onClick={applyNow} className="group relative overflow-hidden bg-accent hover:bg-accent text-white px-8 py-6 text-base font-bold rounded-2xl shadow-[0_8px_30px_rgba(224,141,60,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(224,141,60,0.4)]">
                  <span className="relative z-10 flex items-center gap-2">Apply Now for Serbia <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </Button>
                <Button variant="outline" className="group px-8 py-6 text-base font-bold rounded-2xl border-2 border-border hover:border-gunmetal hover:bg-gunmetal hover:text-white transition-all shadow-sm hover:shadow-lg"
                  onClick={() => document.getElementById("why")?.scrollIntoView({ behavior: "smooth" })}>
                  Check Eligibility <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" aria-hidden="true" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Column — Floating Cards Photo Collage */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2, delayChildren: 0.4 }
                }
              }}
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-none mx-auto h-[450px] sm:h-[500px] lg:h-[600px] flex items-center justify-center pointer-events-none mt-12 lg:mt-0"
            >
              {/* Main floating card */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 150, scale: 0.8 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.5, duration: 1.2 } }
                }}
                className="absolute w-[75%] lg:w-[85%] z-20 pointer-events-none"
                style={{ right: "5%", top: "10%" }}
              >
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden border border-white/20 backdrop-blur-sm pointer-events-auto"
                  style={{ rotate: -2 }}
                >
                  <div className="relative aspect-[4/3] group cursor-pointer">
                    <img src={imgBelgrade} alt="University of Belgrade campus" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-md bg-white/20 backdrop-blur-md flex items-center justify-center"><GraduationCap className="w-3.5 h-3.5 text-white" /></div>
                        <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] text-white font-bold tracking-wider">EST. 1808</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">University of Belgrade</h3>
                      <p className="text-xs text-white/70 mt-1 font-medium">QS #801-1000 · 31 Faculties</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Top left floating card */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 150, scale: 0.8 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.5, duration: 1.2 } }
                }}
                className="absolute w-[45%] z-30 pointer-events-none"
                style={{ left: "0%", top: "5%" }}
              >
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="shadow-[0_15px_40px_rgba(0,0,0,0.12)] rounded-2xl overflow-hidden border border-white/40 pointer-events-auto"
                  style={{ rotate: 3 }}
                >
                  <div className="relative aspect-square group">
                    <img src={imgNoviSad} alt="University of Novi Sad" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <h3 className="text-sm font-bold text-white">Novi Sad</h3>
                      <p className="text-[10px] text-white/80">Cultural Capital</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Stat glass card */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 150, scale: 0.8 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.5, duration: 1.2 } }
                }}
                className="absolute z-40 pointer-events-none"
                style={{ bottom: "15%", left: "0%" }}
              >
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2 }}
                  className="bg-white/90 backdrop-blur-xl border border-white/50 shadow-[0_20px_40px_rgba(0,0,0,0.08)] rounded-2xl p-4 flex items-center gap-4 pointer-events-auto"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <Banknote className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Total Budget</div>
                    <div className="text-xl font-extrabold text-gunmetal">₹4-5 Lakhs/yr</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Bottom right feature card */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 150, scale: 0.8 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.5, duration: 1.2 } }
                }}
                className="absolute z-10 w-[40%] pointer-events-none"
                style={{ right: "0%", bottom: "5%" }}
              >
                <motion.div 
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.5 }}
                  className="bg-gradient-to-br from-gunmetal to-gunmetal/90 border border-white/10 shadow-2xl rounded-2xl p-4 pointer-events-auto"
                  style={{ rotate: -5 }}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#C6363C]/20 flex items-center justify-center"><CheckCircle2 className="w-3.5 h-3.5 text-[#C6363C]" /></div>
                      <span className="text-xs font-bold text-white">No IELTS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#0C4076]/20 flex items-center justify-center"><Globe className="w-3.5 h-3.5 text-[#0C4076]" /></div>
                      <span className="text-xs font-bold text-white">Schengen Path</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"><Briefcase className="w-3.5 h-3.5 text-white" /></div>
                      <span className="text-xs font-bold text-white">20 hrs/wk Work</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ 2. WHY STUDY IN SERBIA ═══════════ */}
      <section id="why" className="py-20 sm:py-28 scroll-mt-20 relative overflow-hidden bg-[hsl(var(--section-muted))]/30" aria-labelledby="why-heading">
        {/* Subtle Serbian Flag Ambient Glows */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#C6363C]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0C4076]/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14 sm:mb-20"
          >
            <h2 id="why-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gunmetal mb-4 tracking-tight">
              A European Education,<br className="hidden sm:block" /> Unmatched <span className="text-accent">Value</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto font-medium">
              Discover why Serbia is becoming one of Europe's most sought-after study destinations for Indian students.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[minmax(180px,auto)]"
          >
            {[
              { 
                i: <Banknote className="w-8 h-8" />, 
                t: "Affordable Education", 
                d: "Tuition fees start from just EUR 1800/year at public universities. Even private universities rarely exceed EUR 2,000/year — a fraction of UK or US costs.",
                colSpan: "md:col-span-2 lg:col-span-2",
                rowSpan: "md:row-span-2",
                highlight: true,
                bgImage: bgFagaras
              },
              { 
                i: <CheckCircle2 className="w-6 h-6" />, 
                t: "No IELTS / MOI", 
                d: "Selected universities accept Indian high school English marks directly. Skip the exams.",
                colSpan: "md:col-span-1 lg:col-span-2",
                rowSpan: "md:row-span-1",
                highlight: false
              },
              { 
                i: <GraduationCap className="w-6 h-6" />, 
                t: "European Degrees", 
                d: "Bologna Process degrees recognized across 48 countries.",
                colSpan: "md:col-span-1 lg:col-span-1",
                rowSpan: "md:row-span-1",
                highlight: false
              },
              { 
                i: <Globe className="w-6 h-6" />, 
                t: "English Programs", 
                d: "Fully English-taught degrees in Pharma, IT, Business, and Healthcare.",
                colSpan: "md:col-span-1 lg:col-span-1",
                rowSpan: "md:row-span-1",
                highlight: false
              },
              { 
                i: <Home className="w-6 h-6" />, 
                t: "Low Living Costs", 
                d: "EUR 150-200/month covers food, housing, and transport.",
                colSpan: "md:col-span-2 lg:col-span-2",
                rowSpan: "md:row-span-1",
                highlight: true,
                bgImage: bgIasi
              },
              { 
                i: <Briefcase className="w-6 h-6" />, 
                t: "Work Rights", 
                d: "Work up to 20 hrs/week without a separate permit.",
                colSpan: "md:col-span-1 lg:col-span-1",
                rowSpan: "md:row-span-1",
                highlight: false
              },
              { 
                i: <Plane className="w-6 h-6" />, 
                t: "EU Travel", 
                d: "2 hours from Germany, France, and Italy.",
                colSpan: "md:col-span-1 lg:col-span-1",
                rowSpan: "md:row-span-1",
                highlight: false
              },
              { 
                i: <ShieldCheck className="w-6 h-6" />, 
                t: "Safe Environment", 
                d: "Consistently ranked as one of the safest countries in Southeast Europe.",
                colSpan: "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
                highlight: false
              },
              { 
                i: <Users className="w-6 h-6" />, 
                t: "Indian Community", 
                d: "Growing student network and vibrant cultural support.",
                colSpan: "md:col-span-2 md:row-span-1 lg:col-span-3 lg:row-span-1",
                highlight: true,
                bgImage: bgSerbiaIndia
              },
            ].map((x, i) => (
              <motion.div 
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
                }}
                className={`group relative overflow-hidden p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
                  x.highlight 
                    ? "bg-gradient-to-br from-gunmetal to-gunmetal/90 border-gunmetal text-white shadow-xl hover:shadow-2xl hover:-translate-y-1" 
                    : "bg-white border-border/60 hover:border-accent/30 shadow-sm hover:shadow-[0_8px_30px_rgba(224,141,60,0.12)] hover:-translate-y-1"
                } ${x.colSpan} ${x.rowSpan}`}
              >
                {/* Subtle background glow effect on hover */}
                {!x.highlight && (
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                )}
                
                {x.bgImage && (
                  <>
                    <img src={x.bgImage} alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gunmetal/80" />
                  </>
                )}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className={`mb-6 ${x.highlight ? "text-white" : "text-accent"}`}>
                    <div className={`p-3 rounded-2xl inline-block group-hover:scale-110 transition-transform duration-300 ease-out ${
                      x.highlight ? "bg-white/10" : "bg-accent/10"
                    }`}>
                      {x.i}
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg sm:text-xl mb-3 ${x.highlight ? "text-white" : "text-gunmetal"}`}>
                      {x.t}
                    </h4>
                    <p className={`text-sm sm:text-base leading-relaxed ${x.highlight ? "text-white/80" : "text-muted-foreground"}`}>
                      {x.d}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 3. QUICK FACTS ═══════════ */}
      <section id="facts" className="py-20 sm:py-32 bg-gunmetal scroll-mt-20 relative overflow-hidden" aria-labelledby="facts-heading">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src={bgQuickFacts} alt="Study in Serbia" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-b from-gunmetal via-gunmetal/60 to-gunmetal" />
        </div>

        {/* Ambient Dark Mode Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/3 translate-x-1/3 pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-24"
          >
            <h2 id="facts-heading" className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-md">
              Serbia Quick Facts
            </h2>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto font-medium">
              Key numbers and facts about studying in Serbia as an Indian student.
            </p>
          </motion.div>

          {/* Stats Dashboard */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16"
          >
            {[
              { n: 5, s: "+", l: "Major Universities", icon: Building2 },
              { n: 99, s: "%+", l: "Visa Success Rate", icon: ShieldCheck },
              { n: 20, s: "hrs", l: "Work Per Week", icon: Briefcase },
              { n: 4000, s: "-5000", l: "Rupees Total Budget", icon: Banknote },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } }
                }}
                className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 text-center border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:border-accent/50 hover:bg-white/10 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(224,141,60,0.15)] transition-all duration-500 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto rounded-[1.5rem] bg-accent/20 flex items-center justify-center text-accent mb-8 group-hover:scale-110 group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_0_30px_rgba(224,141,60,0.5)] group-hover:rotate-6 transition-all duration-500">
                    <stat.icon className="w-10 h-10" />
                  </div>
                  <div className="text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 flex justify-center items-baseline gap-1 drop-shadow-lg">
                    <CountingNumber target={stat.n} />
                    <span className="text-accent text-3xl lg:text-4xl font-bold">{stat.s}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white/60 uppercase tracking-widest">{stat.l}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Fact Cards */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
            }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          >
            {[
              { icon: <MapPin className="w-5 h-5" />, label: "Capital", value: "Belgrade", sub: "Also the largest city" },
              { icon: <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">дин</span>, label: "Currency", value: "Serbian Dinar", sub: "1 EUR = ~117 RSD" },
              { icon: <Globe className="w-5 h-5" />, label: "Language", value: "Serbian + English", sub: "Many English programs" },
              { icon: <GraduationCap className="w-5 h-5" />, label: "Tuition Fees", value: "EUR 1500-3,000", sub: "Per academic year" },
              { icon: <Home className="w-5 h-5" />, label: "Living Cost", value: "EUR 150-200", sub: "Per month" },
              { icon: <Briefcase className="w-5 h-5" />, label: "Part-Time Work", value: "20 hrs/week", sub: "EUR 300-600/month" },
              { icon: <Clock className="w-5 h-5" />, label: "Intakes", value: <span className="text-xs sm:text-sm leading-tight block mt-1">Jan - Feb<br />Sept - Oct<br />March - April</span>, sub: "Three intakes yearly" },
              { icon: <Banknote className="w-5 h-5" />, label: "Total Budget", value: "4000/5000 EUR", sub: "Approx. per year" },
            ].map((f, i) => (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="bg-white/60 backdrop-blur-md rounded-2xl border border-border p-5 hover:bg-white transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-gunmetal group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    {f.icon}
                  </div>
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-1">{f.label}</div>
                <div className="text-base font-extrabold text-gunmetal mb-1">{f.value}</div>
                <div className="text-[10px] text-muted-foreground font-medium">{f.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 4. COST OF STUDYING ═══════════ */}
      <section id="cost" className="py-20 sm:py-28 relative overflow-hidden scroll-mt-20 bg-white" aria-labelledby="cost-heading">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14 sm:mb-20"
          >
            <h2 id="cost-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gunmetal mb-4 tracking-tight">
              Europe at an <span className="text-accent">Indian Budget</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto font-medium">
              Complete your European education starting around Rs. 4-5 Lakhs per year — one of the most affordable options in Europe.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Tuition fees & Living Costs Bento */}
            <div className="space-y-6">
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl border border-border shadow-sm p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-gunmetal mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent"><GraduationCap className="w-5 h-5" /></div>
                  Tuition Fees (Per Year)
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { type: "Public Bachelor's", range: "EUR 1,500 - 2,000" },
                    { type: "Public Master's", range: "EUR 800 - 3,000" },
                    { type: "Private Bachelor's", range: "EUR 1,500 - 3,000" },
                    { type: "Private Master's", range: "EUR 2,000 - 4,000" },
                  ].map((fee, i) => (
                    <div key={i} className="bg-[hsl(var(--section-muted))] rounded-2xl p-4 border border-border/50">
                      <div className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">{fee.type}</div>
                      <div className="text-base sm:text-lg font-extrabold text-gunmetal">{fee.range}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl border border-border shadow-sm p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-gunmetal mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent"><Home className="w-5 h-5" /></div>
                  Monthly Living Costs
                </h3>
                <div className="space-y-4">
                  {[
                    { item: "Accommodation", range: "EUR 40 - 250" },
                    { item: "Food & Groceries", range: "EUR 50 - 70" },
                    { item: "Transport & Health", range: "EUR 20 - 30" },
                    { item: "Leisure & Misc", range: "EUR 35 - 40" },
                  ].map((x, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-border/40 last:border-b-0 text-sm">
                      <span className="text-muted-foreground font-medium">{x.item}</span>
                      <span className="font-bold text-gunmetal">{x.range}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-4 mt-2 border-t border-border/60">
                    <span className="text-sm font-bold text-gunmetal uppercase tracking-wide">Monthly Total</span>
                    <span className="text-xl font-extrabold text-accent">EUR 150 - 220</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Visual Comparison Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gunmetal rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
            >
              {/* Background Image inside chart */}
              <div className="absolute inset-0 z-0">
                <img src={bgIasi} alt="" className="w-full h-full object-cover mix-blend-overlay opacity-40" />
                <div className="absolute inset-0 bg-gunmetal/80" />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/20 rounded-full blur-[60px]" />
              
              <div className="relative z-10">
                <h4 className="text-2xl font-bold text-white mb-2">Serbia vs Other Destinations</h4>
                <p className="text-white/60 text-sm mb-8 font-medium">Average Annual Tuition Fees</p>

                <div className="space-y-6">
                  {[
                    { country: "Serbia", amount: 1200, max: 20000, color: "bg-accent", highlight: true },
                    { country: "Germany", amount: 1500, max: 20000, color: "bg-white/80" },
                    { country: "Ireland", amount: 12000, max: 20000, color: "bg-white/60" },
                    { country: "UK", amount: 16000, max: 20000, color: "bg-white/40" },
                    { country: "Australia", amount: 18000, max: 20000, color: "bg-white/20" },
                  ].map((c, i) => (
                    <div key={i} className="group">
                      <div className="flex justify-between text-sm mb-2">
                        <span className={`font-bold ${c.highlight ? "text-accent" : "text-white"}`}>{c.country}</span>
                        <span className={`${c.highlight ? "text-accent" : "text-white/80"} font-medium`}>EUR {c.amount.toLocaleString()}</span>
                      </div>
                      <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(c.amount / c.max) * 100}%` }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 1, delay: 0.5 + (i * 0.1), ease: "easeOut" }}
                          className={`h-full ${c.color} rounded-full`} 
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Highlight box */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2 }}
                  className="mt-10 bg-accent/10 border border-accent/20 rounded-2xl p-5 backdrop-blur-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-white shrink-0 shadow-lg shadow-accent/30">
                      <Star className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base mb-1">Rs. 4-5 Lakhs/yr Total</h4>
                      <p className="text-sm text-white/70 leading-relaxed font-medium">Includes tuition, accommodation, food, and transport for a full academic year. Europe's best value.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════ 5. UNIVERSITIES ═══════════ */}
      <section id="universities" className="py-20 sm:py-28 scroll-mt-20 relative bg-[hsl(var(--section-muted))]/30" aria-labelledby="universities-heading">
        <div className="absolute inset-0 z-0">
          <img src={bgBarcelona} alt="Universities" className="w-full h-full object-cover object-center opacity-80 [mask-image:linear-gradient(to_bottom,transparent_10%,black_100%)] mix-blend-multiply" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14 sm:mb-20"
          >
            <h2 id="universities-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gunmetal mb-4 tracking-tight">
              Top Universities in Serbia
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto font-medium">
              Serbia's universities offer internationally recognized degrees at a fraction of Western European costs.
            </p>
          </motion.div>

          <div className="relative flex flex-col items-center mt-12 sm:mt-20 pb-10">
            {universities.map((u, i) => (
              <AnimatedUniversityCard key={i} u={u} i={i} total={universities.length} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 6. POPULAR COURSES ═══════════ */}
      <section id="courses" className="py-20 sm:py-28 bg-white scroll-mt-20 relative overflow-hidden" aria-labelledby="courses-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 id="courses-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gunmetal mb-4 tracking-tight">
              Popular Courses in Serbia
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto font-medium">
              Choose from a wide range of English-taught programs across disciplines, recognized globally.
            </p>
          </motion.div>

          {/* Tab switcher */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-[hsl(var(--section-muted))] rounded-full p-1.5 shadow-inner" role="tablist" aria-label="Degree level">
              <button role="tab" aria-selected={courseTab === "bachelor"} onClick={() => setCourseTab("bachelor")}
                className={`relative px-6 py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 ${courseTab === "bachelor" ? "text-white" : "text-muted-foreground hover:text-gunmetal"}`}>
                {courseTab === "bachelor" && (
                  <motion.div layoutId="courseTab" className="absolute inset-0 bg-accent rounded-full shadow-md" />
                )}
                <span className="relative z-10">Bachelor's Programs</span>
              </button>
              <button role="tab" aria-selected={courseTab === "master"} onClick={() => setCourseTab("master")}
                className={`relative px-6 py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 ${courseTab === "master" ? "text-white" : "text-muted-foreground hover:text-gunmetal"}`}>
                {courseTab === "master" && (
                  <motion.div layoutId="courseTab" className="absolute inset-0 bg-accent rounded-full shadow-md" />
                )}
                <span className="relative z-10">Master's Programs</span>
              </button>
            </div>
          </div>

          <motion.div layout className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={courseTab}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
                  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
                }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
              >
                {(courseTab === "bachelor" ? [
                  { i: <Zap className="w-6 h-6" />, t: "Computer Science", d: "Top choice for Indian students" },
                  { i: <TrendingUp className="w-6 h-6" />, t: "Artificial Intelligence", d: "Emerging program" },
                  { i: <Building2 className="w-6 h-6" />, t: "Engineering", d: "Civil, Mechanical, Electrical" },
                  { i: <Briefcase className="w-6 h-6" />, t: "Business Admin", d: "Management & MBA prep" },
                  { i: <BookOpen className="w-6 h-6" />, t: "Architecture", d: "Design and urban planning" },
                  { i: <ShieldCheck className="w-6 h-6" />, t: "Pharmacy", d: "5-year integrated program" },
                  { i: <Heart className="w-6 h-6" />, t: "Medicine (MBBS)", d: "6-year program in English" },
                  { i: <Globe className="w-6 h-6" />, t: "Int'l Relations", d: "Politics & diplomacy focus" },
                ] : [
                  { i: <Zap className="w-6 h-6" />, t: "Data Science", d: "Analytics and AI focus" },
                  { i: <TrendingUp className="w-6 h-6" />, t: "Artificial Intelligence", d: "Machine learning & deep learning" },
                  { i: <Briefcase className="w-6 h-6" />, t: "MBA", d: "International business focus" },
                  { i: <Building2 className="w-6 h-6" />, t: "Software Engineering", d: "Advanced development skills" },
                  { i: <Heart className="w-6 h-6" />, t: "Bioengineering", d: "Medical technology intersection" },
                  { i: <Star className="w-6 h-6" />, t: "Business Analytics", d: "Data-driven decisions" },
                  { i: <Globe className="w-6 h-6" />, t: "Int'l Management", d: "Global business skills" },
                  { i: <GraduationCap className="w-6 h-6" />, t: "Computer Networks", d: "Cybersecurity & networking" },
                ]).map((c, i) => (
                  <motion.div 
                    key={i} 
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
                    }}
                    className="group bg-[hsl(var(--section-muted))]/50 rounded-2xl p-4 sm:p-6 border border-border hover:bg-white hover:border-accent/30 hover:shadow-[0_8px_30px_rgba(224,141,60,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center sm:items-start sm:text-left"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-border flex items-center justify-center text-gunmetal mb-3 sm:mb-4 group-hover:bg-accent group-hover:text-white group-hover:border-accent shadow-sm transition-all duration-300 [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">
                      {c.i}
                    </div>
                    <h3 className="text-sm sm:text-lg font-bold text-gunmetal mb-1.5 sm:mb-2 group-hover:text-accent transition-colors duration-300 leading-tight">{c.t}</h3>
                    <p className="text-[10px] sm:text-sm text-muted-foreground font-medium leading-snug">{c.d}</p>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <Button onClick={applyNow} className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg font-bold rounded-full shadow-lg shadow-accent/25 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              Apply Now for Serbia
              <ArrowRight className="ml-2 w-5 h-5 inline-block group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 7. IELTS/MOI ADVANTAGE ═══════════ */}
      <section id="ielts" className="py-20 sm:py-28 bg-[hsl(var(--section-muted))] scroll-mt-20 relative overflow-hidden" aria-labelledby="ielts-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14 sm:mb-20"
          >
            <h2 id="ielts-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gunmetal mb-4 tracking-tight">
              Study in Serbia <span className="text-green-600">Without IELTS</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto font-medium">
              Skip the exams. Many Serbian universities accept simple alternatives, making your application faster and stress-free.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Accepted Alternatives */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-4"
            >
              <h3 className="text-xl font-bold text-gunmetal mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                What is Accepted Instead?
              </h3>
              
              <div className="space-y-4">
                {[
                  { t: "MOI Certificate from School", d: "Medium of Instruction certificate from your 10+2 school, confirming English was the teaching language.", tag: "Most Common" },
                  { t: "MOI from Undergraduate College", d: "For Master's applicants, MOI from your degree-granting institution is accepted by most universities.", tag: "For Master's" },
                  { t: "Internal English Interview", d: "Some universities conduct a basic online interview to assess your English directly.", tag: "Online" },
                  { t: "English Medium Background", d: "Students who completed all prior education in English may not need extra proof.", tag: "Easiest" },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-border hover:border-green-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h4 className="text-base font-bold text-gunmetal">{item.t}</h4>
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] uppercase font-bold tracking-wider rounded-full">{item.tag}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.d}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Comparison Table */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="bg-white rounded-3xl border border-border shadow-xl overflow-hidden">
                <div className="p-6 sm:p-8 bg-gunmetal text-white">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                    <Star className="w-6 h-6 text-accent" />
                    Serbia vs Traditional Route
                  </h3>
                  <p className="text-white/60 text-sm mt-2 font-medium">Why Serbia is the smarter choice for Indian students.</p>
                </div>
                
                <div className="grid grid-cols-12 text-xs sm:text-sm font-bold bg-[hsl(var(--section-muted))] border-b border-border/50">
                  <div className="col-span-5 p-4 sm:p-5 text-muted-foreground uppercase tracking-wider">Factor</div>
                  <div className="col-span-4 p-4 sm:p-5 text-accent text-center bg-accent/[0.03] uppercase tracking-wider">Serbia</div>
                  <div className="col-span-3 p-4 sm:p-5 text-muted-foreground text-center uppercase tracking-wider">UK/Ireland</div>
                </div>
                
                <div className="divide-y divide-border/40">
                  {[
                    { factor: "IELTS Required", serbia: "Optional", other: "Mandatory" },
                    { factor: "Min. IELTS Score", serbia: "Not needed", other: "6.5-7.0" },
                    { factor: "Tuition per year", serbia: "EUR 1.5K-3K", other: "EUR 15-20K" },
                    { factor: "Living costs/mo", serbia: "EUR 150-250", other: "EUR 800-1,500" },
                    { factor: "Visa Processing", serbia: "2-4 weeks", other: "6-12 weeks" },
                    { factor: "Part-time work", serbia: "20 hrs/wk", other: "20 hrs/wk" },
                    { factor: "EU recognition", serbia: "Bologna", other: "Bologna" },
                  ].map((row, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, backgroundColor: "rgba(255,255,255,0)" }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ backgroundColor: "rgba(240,240,240,0.5)" }}
                      className="grid grid-cols-12 transition-colors duration-200"
                    >
                      <div className="col-span-5 p-4 sm:p-5 text-sm font-medium text-gunmetal flex items-center">{row.factor}</div>
                      <div className="col-span-4 p-4 sm:p-5 text-sm font-extrabold text-accent text-center bg-accent/[0.02] flex items-center justify-center">{row.serbia}</div>
                      <div className="col-span-3 p-4 sm:p-5 text-sm font-medium text-muted-foreground text-center flex items-center justify-center">{row.other}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-6 p-6 bg-green-50 border border-green-200 rounded-2xl flex gap-4 items-start"
              >
                <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-green-700" />
                </div>
                <p className="text-sm text-green-800 leading-relaxed font-medium">
                  <strong className="font-extrabold text-green-900 block mb-1">Save time and money:</strong> 
                  Applying to Serbia without IELTS means faster applications (2-4 weeks vs. 3-6 months), lower overall costs, and one less barrier to starting your European education journey.
                </p>
              </motion.div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* ═══════════ 8. ADMISSION + VISA ═══════════ */}
      <section id="admission-visa" className="py-20 sm:py-28 bg-white scroll-mt-20 relative overflow-hidden" aria-labelledby="admission-heading">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/[0.02] rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-20"
          >
            <h2 id="admission-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gunmetal mb-4 tracking-tight">
              Admission & Visa Process
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto font-medium">
              From choosing your program to arriving in Serbia, here is your complete step-by-step roadmap.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column: Requirements */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gunmetal flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <FileText className="w-5 h-5" />
                  </div>
                  Requirements
                </h3>
              </div>

              {/* Tab Switcher for Requirements */}
              <div className="inline-flex bg-[hsl(var(--section-muted))] rounded-full p-1.5 shadow-inner mb-8 w-full sm:w-auto">
                <button role="tab" aria-selected={reqTab === "bachelor"} onClick={() => setReqTab("bachelor")}
                  className={`relative flex-1 sm:flex-none px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${reqTab === "bachelor" ? "text-white" : "text-muted-foreground hover:text-gunmetal"}`}>
                  {reqTab === "bachelor" && (
                    <motion.div layoutId="reqTab" className="absolute inset-0 bg-accent rounded-full shadow-md" />
                  )}
                  <span className="relative z-10">Bachelor's</span>
                </button>
                <button role="tab" aria-selected={reqTab === "master"} onClick={() => setReqTab("master")}
                  className={`relative flex-1 sm:flex-none px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${reqTab === "master" ? "text-white" : "text-muted-foreground hover:text-gunmetal"}`}>
                  {reqTab === "master" && (
                    <motion.div layoutId="reqTab" className="absolute inset-0 bg-accent rounded-full shadow-md" />
                  )}
                  <span className="relative z-10">Master's</span>
                </button>
              </div>

              <div className="relative min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={reqTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {[
                      ...(reqTab === "bachelor"
                        ? [
                            { l: "10th Marksheet", d: "Passed with minimum 50% marks", icon: FileText, tip: "Original and notarized copies required" },
                            { l: "12th Marksheet", d: "Minimum 50-60% aggregate", icon: FileText, tip: "Science stream for Engineering/Medicine programs" },
                            { l: "Passport", d: "Valid for at least 18 months", icon: ShieldCheck, tip: "Apply early — passport can take 4-6 weeks" },
                            { l: "SOP", d: "Statement of Purpose (500-1000 words)", icon: BookOpen, tip: "Clearly explain why you chose Serbia and the specific program" },
                            { l: "NO MOI / NO IELTS", d: "Only Applicable if asked from University MOI from school or IELTS", icon: Globe, tip: "Get MOI certified by your school principal and district education officer" },
                          ]
                        : [
                            { l: "Bachelor's Degree", d: "In a related field with 55-60% aggregate", icon: GraduationCap, tip: "3 or 4-year degrees from Indian universities are accepted" },
                            { l: "Academic Transcripts", d: "All semester marksheets", icon: FileText, tip: "Get official transcripts issued by your university" },
                            { l: "SOP", d: "Statement of Purpose highlighting research goals", icon: BookOpen, tip: "Focus on academic goals and why Serbia specifically" },
                            { l: "CV / Resume", d: "Academic and work experience", icon: Briefcase, tip: "Include internships, projects, and relevant skills" },
                            { l: "Passport", d: "Valid for the entire course duration", icon: ShieldCheck, tip: "Ensure at least 6 months validity beyond course end date" },
                          ])
                    ].map((r, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group flex items-start gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300"
                      >
                        <div className="w-12 h-12 rounded-xl bg-[hsl(var(--section-muted))] flex items-center justify-center text-gunmetal shrink-0 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                          <r.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-bold text-gunmetal group-hover:text-accent transition-colors duration-300">{r.l}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{r.d}</p>
                          <div className="mt-3 py-2 px-3 bg-blue-50 rounded-lg border border-blue-100/50">
                            <p className="text-xs text-blue-800 font-medium flex items-start gap-2">
                              <span className="shrink-0 mt-0.5">💡</span> {r.tip}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right Column: Timeline */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-gunmetal mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                Visa Timeline
              </h3>

              <div className="relative pl-6 sm:pl-8 border-l-2 border-border/50 space-y-8 sm:space-y-10">
                {[
                  { s: 1, t: "Choose University & Program", d: "Research and shortlist Serbian universities offering your desired program.", tag: "Week 1-2", icon: GraduationCap, tip: "Use Uni360 to shortlist universities that match your profile and accept MOI." },
                  { s: 2, t: "Receive Offer Letter", d: "Submit your application and receive the official offer letter from the university.", tag: "1 - 2 weeks", icon: FileText, tip: "Keep your offer letter safe — it is the most important visa document." },
                  { s: 3, t: "Prepare Documents", d: "Gather passport, financial proof (EUR 4,800+), accommodation proof, and health insurance.", tag: "2-4 weeks", icon: ShieldCheck, tip: "Open a bank account and maintain the required balance for at least 3 months before applying." },
                  { s: 4, t: "Apply for Visa", d: "Submit Serbia student visa application at the Serbian Embassy or consulate in India.", tag: "2-4 weeks", icon: Globe, tip: "Apply through the Serbian Embassy in New Delhi. Book appointment slots early as they fill quickly." },
                  { s: 5, t: "Visa Approval", d: "Receive your Serbia student visa and prepare for travel bookings.", tag: "2-4 weeks", icon: CheckCircle2, tip: "Once approved, book your flights and organize accommodation in Serbia." },
                  { s: 6, t: "Fly to Serbia", d: "Arrive and settle in.", tag: "Day 1", icon: Plane, tip: "Register with local police within 24 hours of arrival. Your university will guide you through the process." },
                ].map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1 }}
                    className="relative group"
                  >
                    {/* Timeline Node */}
                    <div className="absolute -left-[35px] sm:-left-[43px] w-6 h-6 sm:w-8 sm:h-8 bg-white border-2 border-border rounded-full flex items-center justify-center group-hover:border-accent group-hover:bg-accent transition-colors duration-300 z-10">
                      <span className="text-[10px] sm:text-xs font-bold text-muted-foreground group-hover:text-white">{step.s}</span>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-border shadow-sm hover:shadow-xl hover:border-accent/30 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                            <step.icon className="w-4 h-4" />
                          </div>
                          <h4 className="text-base sm:text-lg font-bold text-gunmetal group-hover:text-accent transition-colors">{step.t}</h4>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[hsl(var(--section-muted))] text-muted-foreground text-xs font-bold whitespace-nowrap self-start">
                          ⏱ {step.tag}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{step.d}</p>
                      <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-100/30">
                        <p className="text-xs text-blue-800 font-medium">
                          <strong>Pro Tip:</strong> {step.tip}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ 9. SCHOLARSHIPS ═══════════ */}
      {/* <ScholarshipsSection expandedScholarship={expandedScholarship} setExpandedScholarship={setExpandedScholarship} scholarshipFilter={scholarshipFilter} setScholarshipFilter={setScholarshipFilter} /> */}

      {/* ═══════════ 10. STUDENT LIFE ═══════════ */}
      <section id="student-life" className="py-20 sm:py-28 relative overflow-hidden scroll-mt-20 bg-white" aria-labelledby="student-life-heading">
        <div className="absolute inset-0 z-0">
          <img src={bgChernivtsi} alt="Student Life Campus" className="absolute left-0 top-0 w-full lg:w-2/3 h-full object-cover object-left opacity-80 [mask-image:linear-gradient(to_right,black_20%,transparent_100%)] mix-blend-multiply" />
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3 z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14 sm:mb-20"
          >
            <h2 id="student-life-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gunmetal mb-4 tracking-tight">
              Student Life in Serbia
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto font-medium">
              Serbia offers a vibrant, affordable, and culturally rich student experience right in the heart of Europe.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Top Cities */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-6"
            >
              <h3 className="text-2xl font-bold text-gunmetal mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <MapPin className="w-5 h-5" />
                </div>
                Top Student Cities
              </h3>
              
              <div className="space-y-4">
                {[
                  { n: "Belgrade", tag: "Capital & Cultural Hub", d: "A dynamic city with a thriving nightlife, rich history, and the largest concentration of universities and Indian students.", hl: ["University of Belgrade", "Nightlife Capital", "International Hub"] },
                  { n: "Novi Sad", tag: "Cultural Capital of Europe", d: "A charming city known for the Exit music festival, European Capital of Culture 2022, and a strong student community.", hl: ["University of Novi Sad", "Exit Festival", "Danube River"] },
                  { n: "Nis", tag: "Historical City", d: "The third largest city in Serbia with affordable living costs, warm community, and quality universities.", hl: ["University of Nis", "Most Affordable", "Historical Heritage"] },
                ].map((c, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-white rounded-2xl border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[hsl(var(--section-muted))] flex items-center justify-center text-gunmetal font-bold text-lg shrink-0 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                      {c.n.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h4 className="text-base font-bold text-gunmetal group-hover:text-accent transition-colors duration-300">{c.n}</h4>
                        <span className="px-2 py-0.5 bg-accent/10 text-accent text-[10px] uppercase font-bold tracking-wider rounded-full">{c.tag}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2">{c.d}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {c.hl.map((h, j) => (
                          <span key={j} className="px-2 py-1 bg-[hsl(var(--section-muted))] text-gunmetal text-[10px] font-bold rounded-md border border-border/50">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Life Highlights Bento Box */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <h3 className="text-2xl font-bold text-gunmetal mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <Star className="w-5 h-5" />
                </div>
                Life Highlights
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { i: <Coffee className="w-6 h-6" />, t: "Cafe Culture", d: "Belgrade is famous for its cafe culture. Spend evenings in riverside kafanas.", color: "bg-orange-100 text-orange-600", border: "hover:border-orange-200" },
                  { i: <Train className="w-6 h-6" />, t: "Public Transport", d: "Affordable trams, buses and trolleys. Monthly pass costs around EUR 15-20.", color: "bg-blue-100 text-blue-600", border: "hover:border-blue-200" },
                  { i: <Users className="w-6 h-6" />, t: "Indian Community", d: "Active Indian Student Associations in Belgrade provide cultural support.", color: "bg-purple-100 text-purple-600", border: "hover:border-purple-200" },
                  { i: <Globe className="w-6 h-6" />, t: "European Travel", d: "Explore Budapest, Vienna, Sarajevo, and Croatia on student budgets.", color: "bg-green-100 text-green-600", border: "hover:border-green-200" },
                  { i: <Wifi className="w-6 h-6" />, t: "Digital Life", d: "Fast internet, coworking spaces, and a growing startup ecosystem in Belgrade.", color: "bg-cyan-100 text-cyan-600", border: "hover:border-cyan-200" },
                  { i: <Heart className="w-6 h-6" />, t: "Food & Culture", d: "Try cevapi, pljeskavica, and burek. Many affordable restaurants near campuses.", color: "bg-rose-100 text-rose-600", border: "hover:border-rose-200" },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className={`bg-white rounded-2xl border border-border p-5 hover:shadow-lg transition-all duration-300 group ${item.border}`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:-translate-y-1 ${item.color}`}>
                      {item.i}
                    </div>
                    <h4 className="text-lg font-bold text-gunmetal mb-2">{item.t}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">{item.d}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* ═══════════ 11. PART-TIME WORK ═══════════ */}
      <section id="part-time" className="py-20 sm:py-28 bg-white scroll-mt-20 relative overflow-hidden" aria-labelledby="part-time-heading">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 id="part-time-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gunmetal mb-6 tracking-tight">
                Part-Time Work in Serbia
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg mb-8 font-medium">
                International students in Serbia can work up to <strong className="text-gunmetal font-bold">20 hours per week</strong> during semesters, helping to offset living expenses and gain European work experience.
              </p>

              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-green-50 rounded-2xl border border-green-200 p-6 text-center shadow-sm"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold text-green-700 mb-1">20<span className="text-sm font-medium">hrs/wk</span></div>
                  <div className="text-sm font-bold text-green-800">Work Rights</div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-accent/10 rounded-2xl border border-accent/20 p-6 text-center shadow-sm"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-accent mb-1">€300-600<span className="text-sm font-medium">/mo</span></div>
                  <div className="text-sm font-bold text-accent">Est. Earnings</div>
                </motion.div>
              </div>

              <div className="space-y-3">
                {[
                  { r: "Restaurant & Cafe Work", s: "EUR 5-8/hour", i: <Coffee className="w-5 h-5" /> },
                  { r: "IT Freelancing", s: "EUR 10-20/hour", i: <Zap className="w-5 h-5" /> },
                  { r: "English Tutoring", s: "EUR 8-15/hour", i: <BookOpen className="w-5 h-5" /> },
                  { r: "Delivery Services", s: "EUR 5-7/hour", i: <Plane className="w-5 h-5" /> },
                  { r: "Administrative Roles", s: "EUR 6-10/hour", i: <Briefcase className="w-5 h-5" /> },
                ].map((x, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex items-center justify-between p-4 bg-white rounded-xl border border-border shadow-sm hover:border-accent/30 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(var(--section-muted))] text-gunmetal flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                        {x.i}
                      </div>
                      <span className="text-sm sm:text-base font-bold text-gunmetal">{x.r}</span>
                    </div>
                    <span className="text-sm font-extrabold text-accent bg-accent/10 px-3 py-1 rounded-lg">{x.s}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="p-8 bg-gunmetal rounded-3xl border border-gunmetal shadow-2xl relative overflow-hidden">
                {/* Decorative background circle */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                
                <h4 className="font-extrabold text-white text-xl mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-accent" /> Monthly Budget Example
                </h4>
                
                <div className="space-y-1 relative z-10">
                  {[
                    { label: "Part-time earnings (20hrs/wk)", amount: "+EUR 450", color: "text-green-400", bg: "bg-green-500/10" },
                    { label: "Accommodation (dormitory)", amount: "-EUR 70", color: "text-red-400", bg: "bg-red-500/10" },
                    { label: "Food & groceries", amount: "-EUR 70", color: "text-red-400", bg: "bg-red-500/10" },
                    { label: "Transport & utilities", amount: "-EUR 40", color: "text-red-400", bg: "bg-red-500/10" },
                    { label: "Miscellaneous", amount: "-EUR 40", color: "text-red-400", bg: "bg-red-500/10" },
                  ].map((row, i) => (
                    <div key={i} className={`flex justify-between items-center py-3 px-4 rounded-lg border border-white/5 ${row.bg}`}>
                      <span className="text-white/80 font-medium text-sm">{row.label}</span>
                      <span className={`font-bold ${row.color}`}>{row.amount}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/10 relative z-10">
                  <span className="text-lg font-bold text-white">Net Monthly Savings</span>
                  <div className="bg-green-500/20 border border-green-500/30 px-4 py-2 rounded-xl">
                    <span className="text-xl font-extrabold text-green-400">+EUR 230/mo</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-accent/5 border border-accent/20 rounded-2xl flex gap-4 items-start shadow-sm">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 text-accent" />
                </div>
                <p className="text-sm text-gunmetal leading-relaxed font-medium">
                  <strong className="font-extrabold text-accent block mb-1">Work-life balance:</strong> 
                  Serbian universities have reasonable academic workloads, allowing students to balance studies and part-time work effectively. Many students in IT fields find higher-paying freelance work as their skills develop.
                </p>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* ═══════════ 12. CAREER OPPORTUNITIES ═══════════ */}
      <section id="career" className="py-20 sm:py-28 scroll-mt-20 relative overflow-hidden bg-[hsl(var(--section-muted))]/30" aria-labelledby="career-heading">
        <div className="absolute inset-0 z-0">
          <img src={bgGraduates} alt="Graduates" className="w-full h-full object-cover object-top opacity-60 [mask-image:linear-gradient(to_bottom,black_10%,transparent_100%)] mix-blend-multiply" />
        </div>
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/[0.05] via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/[0.02] rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-20"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs sm:text-sm font-bold tracking-widest uppercase mb-4 shadow-sm">
              <TrendingUp className="w-4 h-4" /> Career
            </span>
            <h2 id="career-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gunmetal mb-6 tracking-tight">
              Career Opportunities
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto font-medium">
              A Serbian degree opens doors across Europe and globally. Serbia's growing tech and business ecosystem offers excellent graduate opportunities.
            </p>
          </motion.div>

          {/* Industry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { i: <Zap className="w-6 h-6" />, t: "Software Engineering", d: "Belgrade's growing tech sector. Avg EUR 25K-40K", color: "text-blue-600", bg: "bg-blue-100", border: "hover:border-blue-300" },
              { i: <TrendingUp className="w-6 h-6" />, t: "Data Science & AI", d: "High demand across Europe. EUR 30K-50K", color: "text-purple-600", bg: "bg-purple-100", border: "hover:border-purple-300" },
              { i: <Briefcase className="w-6 h-6" />, t: "Business Consulting", d: "International firms in Serbia. EUR 20K-35K", color: "text-amber-600", bg: "bg-amber-100", border: "hover:border-amber-300" },
              { i: <Globe className="w-6 h-6" />, t: "International Trade", d: "Serbia's EU accession drives demand. EUR 20K-30K", color: "text-green-600", bg: "bg-green-100", border: "hover:border-green-300" },
              { i: <Heart className="w-6 h-6" />, t: "Healthcare & Pharma", d: "Strong healthcare sector. EUR 18K-30K", color: "text-rose-600", bg: "bg-rose-100", border: "hover:border-rose-300" },
              { i: <Building2 className="w-6 h-6" />, t: "Architecture & Civil", d: "Infrastructure boom in Serbia. EUR 15K-25K", color: "text-cyan-600", bg: "bg-cyan-100", border: "hover:border-cyan-300" },
            ].map((c, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group bg-white rounded-2xl border border-border p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${c.border}`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${c.bg} ${c.color}`}>
                    {c.i}
                  </div>
                  <h4 className="text-lg font-extrabold text-gunmetal group-hover:text-accent transition-colors duration-300">{c.t}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">{c.d}</p>
              </motion.div>
            ))}
          </div>

          {/* Career pathway highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Award className="w-8 h-8" />, title: "EU Recognition", desc: "Serbian degrees follow the Bologna Process and are recognized across 48 European countries for further education and employment.", color: "text-blue-600", bg: "bg-blue-100", shadow: "shadow-blue-500/10" },
              { icon: <Briefcase className="w-8 h-8" />, title: "Internship Opportunities", desc: "Many Serbian universities have industry partnerships offering internship placements during your course in local and international companies.", color: "text-green-600", bg: "bg-green-100", shadow: "shadow-green-500/10" },
              { icon: <Globe className="w-8 h-8" />, title: "Global Career Pathways", desc: "Graduates can pursue careers in EU member states, Canada, Australia, or return to India with a European degree advantage.", color: "text-purple-600", bg: "bg-purple-100", shadow: "shadow-purple-500/10" },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className={`p-8 bg-white rounded-3xl border border-border shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group`}
              >
                <div className={`w-20 h-20 rounded-2xl mb-6 flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 ${item.bg} ${item.color} ${item.shadow}`}>
                  {item.icon}
                </div>
                <h3 className="font-extrabold text-gunmetal text-xl mb-4 group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 13. FAQ ═══════════ */}
      <section id="faq" className="py-16 sm:py-20 bg-white scroll-mt-20" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-3">FAQ</span>
            <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold text-gunmetal mb-2">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-sm">Everything Indian students need to know about studying in Serbia.</p>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[hsl(var(--section-muted))] rounded-xl border border-border overflow-hidden transition-all duration-200">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-panel-sr-${i}`}
                  id={`faq-q-sr-${i}`}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset">
                  <span className="text-sm font-semibold text-gunmetal pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 text-accent shrink-0" aria-hidden="true" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />}
                </button>
                <div id={`faq-panel-sr-${i}`} role="region" aria-labelledby={`faq-q-sr-${i}`}
                  className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-80" : "max-h-0"}`}>
                  <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-3">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 14. FINAL CTA ═══════════ */}
      <section id="cta" className="py-20 sm:py-28 bg-[hsl(var(--section-muted))] scroll-mt-20 relative overflow-hidden" aria-labelledby="cta-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden p-8 sm:p-14 lg:p-20 text-center bg-gunmetal shadow-2xl"
          >
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
              <img src={bgVienna} alt="Europe at Night" className="w-full h-full object-cover object-center mix-blend-overlay opacity-40" />
              <div className="absolute inset-0 bg-gunmetal/90" />
            </div>
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(224,141,60,0.15),transparent_50%)] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/[0.1] rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4" />

            {/* Serbia flag accent stripe */}
            <div className="absolute top-0 left-0 right-0 h-1.5 flex z-10">
              <div className="flex-1 bg-[#C6363C] shadow-[0_0_10px_rgba(198,54,60,0.5)]" />
              <div className="flex-1 bg-[#0C4076] shadow-[0_0_10px_rgba(12,64,118,0.5)]" />
              <div className="flex-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>
            
            <div className="relative z-20">
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                id="cta-heading" 
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight"
              >
                Ready to Study in <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-300">Serbia</span>?
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-white/70 text-base sm:text-lg mb-10 max-w-2xl mx-auto font-medium"
              >
                Get personalized guidance, university shortlisting, application support, and visa assistance from Uni360. Your European journey starts here.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button onClick={applyNow} className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-base font-extrabold rounded-2xl shadow-xl hover:shadow-[0_0_30px_rgba(224,141,60,0.4)] transition-all duration-300 group">
                  Apply Now for Serbia
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button onClick={bookCall} variant="outline"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10 px-8 py-6 text-base font-extrabold rounded-2xl backdrop-blur-sm transition-all duration-300">
                  <Phone className="w-5 h-5 mr-2" aria-hidden="true" /> Book Free Counselling
                </Button>
                <Button
                  onClick={() => window.open("https://wa.me/+919XXXXXXXXX?text=Hi, I want to know more about studying in Serbia", "_blank")}
                  variant="outline"
                  className="border-[#25D366]/30 bg-[#25D366]/10 text-white hover:bg-[#25D366]/20 px-8 py-6 text-base font-extrabold rounded-2xl backdrop-blur-sm transition-all duration-300">
                  WhatsApp Us
                </Button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-12 text-white/60 text-sm font-medium"
              >
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" aria-hidden="true" /> Free University Shortlisting</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" aria-hidden="true" /> Application Support</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" aria-hidden="true" /> Visa Guidance</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" aria-hidden="true" /> Post-Arrival Support</span>
              </motion.div>
            </div>
          </motion.div>
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
      {showAuthPopup && <AuthPopup isOpen onClose={() => setShowAuthPopup(false)} onAuthSuccess={onAuth} title="Sign in to book your consultation" subtitle="Please sign in to schedule your 1:1 call with our Serbia experts" initialMode="login" skipPortalRedirect />}

      {/* Payment popup */}
      {showPaymentPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl p-4 w-80 mx-4">
            <div className="text-center mb-5">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3"><Phone className="w-5 h-5 text-primary" aria-hidden="true" /></div>
              <h2 className="text-lg font-bold text-primary">Book Your 1:1 Call</h2>
              <p className="text-sm text-muted-foreground mt-1">with a UNI 360° Serbia expert</p>
            </div>
            {currentUser && (
              <div className="bg-muted rounded-lg p-3 mb-4 text-sm border border-border">
                <p className="text-muted-foreground text-xs mb-1">Booking as:</p>
                <p className="font-semibold text-primary">{currentUser.name || currentUser.fullName || `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim()}</p>
                <p className="text-muted-foreground text-xs">{currentUser.email}</p>
              </div>
            )}
            <div className="flex items-center justify-between bg-secondary/30 rounded-lg px-4 py-3 mb-4 border border-secondary">
              <span className="text-sm text-muted-foreground">Consultation Fee</span><span className="text-lg font-bold text-primary">Rs. 1</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1 mb-4 px-1">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" aria-hidden="true" /> 15-min 1:1 video call</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" aria-hidden="true" /> Personalized Serbia university guidance</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" aria-hidden="true" /> Scholarship & visa insights</li>
            </ul>
            {paymentError && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-3" role="alert">
                <p className="text-destructive text-xs">{paymentError}</p>
              </div>
            )}
            <Button onClick={doPay} disabled={paymentLoading} className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              {paymentLoading ? <><span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" aria-hidden="true" />Processing...</> : "Pay Rs. 1 & Book Call"}
            </Button>
            <button onClick={() => setShowPaymentPopup(false)} className="w-full text-center text-xs text-muted-foreground mt-3 hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline">Cancel</button>
          </div>
        </div>
      )}

      {/* SEO Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": "https://uni360degree.com/study-in-serbia",
            "url": "https://uni360degree.com/study-in-serbia",
            "name": "Study in Serbia for Indian Students | No IELTS | Uni360",
            "description": "Complete guide to studying in Serbia for Indian students. Affordable European education from Rs. 6-7 Lakhs/year. No IELTS required at selected universities. Expert guidance from Uni360.",
            "inLanguage": "en-IN",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://uni360degree.com/" },
                { "@type": "ListItem", "position": 2, "name": "Study Abroad", "item": "https://uni360degree.com/study-abroad" },
                { "@type": "ListItem", "position": 3, "name": "Study in Serbia", "item": "https://uni360degree.com/study-in-serbia" }
              ]
            }
          },
          {
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "Can I study in Serbia without IELTS?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Many Serbian universities accept MOI (Medium of Instruction) certificates from Indian schools instead of IELTS." } },
              { "@type": "Question", "name": "What is the total cost of studying in Serbia?", "acceptedAnswer": { "@type": "Answer", "text": "The total yearly cost including tuition, accommodation, food, and living expenses is approximately Rs. 6-7 Lakhs." } },
              { "@type": "Question", "name": "Can I work while studying in Serbia?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, international students can work up to 20 hours per week during semesters without a separate work permit." } }
            ]
          },
          {
            "@type": "EducationalOrganization",
            "name": "Uni360",
            "url": "https://uni360degree.com",
            "description": "Uni360 is a leading education consultancy helping Indian students study abroad in Serbia, Italy, Germany, and other European countries."
          }
        ]
      })}} />
    </div>
  );
};

export default StudyInSerbia;
