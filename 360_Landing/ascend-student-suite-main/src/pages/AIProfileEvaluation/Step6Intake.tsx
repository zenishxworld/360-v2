import React from "react";
import { useFormContext } from "./FormContext";
import { StepFooter } from "./StepFooter";
import { cn } from "@/lib/utils";
import { Calendar, CalendarCheck2, CalendarClock, HelpCircle } from "lucide-react";

const INTAKES = [
  { id: "jan", title: "January Intake", icon: Calendar },
  { id: "may", title: "May Intake", icon: CalendarCheck2 },
  { id: "sep", title: "September Intake", icon: CalendarClock },
  { id: "tbd", title: "Not Yet Decided", icon: HelpCircle },
];

export default function Step6Intake() {
  const { data, updateData, nextStep } = useFormContext();

  const handleSelect = (intake: string) => {
    updateData({ intake });
  };

  return (
    <div className="flex flex-col h-full w-full">
      <h2 className="text-3xl font-bold text-[#111827] mb-8">When do you plan to commence your studies?</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-32">
        {INTAKES.map((intake) => {
          const isSelected = data.intake === intake.title;
          const Icon = intake.icon;
          return (
            <button
              key={intake.id}
              onClick={() => handleSelect(intake.title)}
              className={cn(
                "flex flex-col items-center justify-center p-8 rounded-[20px] bg-white border transition-all hover:-translate-y-[2px] text-center",
                isSelected 
                  ? "border-[#8B6AE8] bg-[#F4EEFF] shadow-[0_0_0_2px_rgba(139,106,232,0.2)]" 
                  : "border-[#E5E7EB] hover:border-gray-300 shadow-sm"
              )}
            >
              <div className={cn(
                "p-4 rounded-2xl mb-4 transition-colors",
                isSelected ? "bg-[#8B6AE8] text-white" : "bg-gray-100 text-gray-500"
              )}>
                <Icon className="w-8 h-8" />
              </div>
              <span className="font-semibold text-lg text-[#111827]">{intake.title}</span>
            </button>
          );
        })}
      </div>

      <StepFooter 
        onContinue={nextStep} 
        disabled={!data.intake} 
      />
    </div>
  );
}
