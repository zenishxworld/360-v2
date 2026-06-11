import React from "react";
import { useFormContext } from "./FormContext";
import { StepFooter } from "./StepFooter";
import { cn } from "@/lib/utils";
import { GraduationCap, BookOpen, ScrollText, BookMarked, Briefcase, Award } from "lucide-react";

const EDUCATION_LEVELS = [
  { id: "UG", title: "Undergraduate", subtitle: "(Bachelor's Degree)", icon: BookOpen },
  { id: "PG", title: "Postgraduate", subtitle: "(Master's Degree)", icon: GraduationCap },
  { id: "PHD", title: "Doctorate", subtitle: "(PhD)", icon: ScrollText },
  { id: "DIPLOMA", title: "Diploma / Certificate", subtitle: "Programs", icon: BookMarked },
  { id: "MBA", title: "MBA", subtitle: "Master of Business Admin", icon: Briefcase },
  { id: "EXEC", title: "Executive Education", subtitle: "For Professionals", icon: Award },
];

export default function Step2Education() {
  const { data, updateData, nextStep } = useFormContext();

  const handleSelect = (level: string) => {
    updateData({ degreeLevel: level });
  };

  return (
    <div className="flex flex-col h-full w-full">
      <h2 className="text-3xl font-bold text-[#111827] mb-8">What level of education do you want to pursue?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-32">
        {EDUCATION_LEVELS.map((level) => {
          const isSelected = data.degreeLevel === level.title;
          const Icon = level.icon;
          return (
            <button
              key={level.id}
              onClick={() => handleSelect(level.title)}
              className={cn(
                "flex flex-col items-start p-6 rounded-[20px] bg-white border text-left transition-all hover:-translate-y-[2px]",
                isSelected 
                  ? "border-[#8B6AE8] bg-[#F4EEFF] shadow-[0_0_0_2px_rgba(139,106,232,0.2)]" 
                  : "border-[#E5E7EB] hover:border-gray-300 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
              )}
            >
              <div className={cn(
                "p-3 rounded-xl mb-4",
                isSelected ? "bg-[#8B6AE8] text-white" : "bg-gray-100 text-gray-500"
              )}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="font-semibold text-xl text-[#111827] mb-1">{level.title}</span>
              <span className="text-gray-500">{level.subtitle}</span>
            </button>
          );
        })}
      </div>

      <StepFooter 
        onContinue={nextStep} 
        disabled={!data.degreeLevel} 
      />
    </div>
  );
}
