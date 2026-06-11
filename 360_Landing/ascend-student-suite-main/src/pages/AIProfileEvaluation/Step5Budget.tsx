import React from "react";
import { useFormContext } from "./FormContext";
import { StepFooter } from "./StepFooter";
import { Slider } from "@/components/ui/slider";

export default function Step5Budget() {
  const { data, updateData, nextStep } = useFormContext();

  const handleSliderChange = (value: number[]) => {
    updateData({ budget: value[0] });
  };

  const budgetValue = data.budget || 15;

  return (
    <div className="flex flex-col h-full w-full">
      <h2 className="text-3xl font-bold text-[#111827] mb-12">What's your estimated budget for studying abroad? (per year)</h2>
      
      <div className="px-4 mt-8 mb-16">
        <div className="relative">
          {/* Tooltip hovering over slider */}
          <div 
            className="absolute -top-12 -translate-x-1/2 bg-[#8B6AE8] text-white px-4 py-2 rounded-lg font-bold shadow-md transition-all duration-200"
            style={{ left: `${((budgetValue - 5) / 35) * 100}%` }}
          >
            ₹{budgetValue}{budgetValue === 40 ? '+' : ''} Lakh
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#8B6AE8]"></div>
          </div>
          
          <Slider 
            value={[budgetValue]} 
            onValueChange={handleSliderChange} 
            min={5} 
            max={40} 
            step={5} 
            className="py-4"
          />
        </div>
        
        <div className="flex justify-between text-gray-400 font-medium mt-4 px-1">
          <span>₹5L</span>
          <span>₹20L</span>
          <span>₹40L+</span>
        </div>
      </div>

      <div className="bg-[#F4EEFF] border border-[#8B6AE8]/30 rounded-2xl p-8 flex flex-col items-center justify-center max-w-sm mx-auto w-full shadow-sm">
        <span className="text-gray-600 font-medium mb-2">Budget Up To</span>
        <span className="text-4xl font-black text-[#8B6AE8]">₹{budgetValue}{budgetValue === 40 ? '+' : ''} Lakh</span>
      </div>

      <StepFooter 
        onContinue={nextStep} 
      />
    </div>
  );
}
