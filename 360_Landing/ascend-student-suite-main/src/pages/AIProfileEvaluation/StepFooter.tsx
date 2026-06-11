import React from "react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "./FormContext";

interface StepFooterProps {
  onContinue: () => void;
  disabled?: boolean;
  continueText?: string;
}

export const StepFooter: React.FC<StepFooterProps> = ({ onContinue, disabled, continueText = "Continue" }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
      <div className="max-w-3xl mx-auto flex justify-end">
        <Button 
          onClick={onContinue} 
          disabled={disabled}
          className="bg-[#8B6AE8] hover:bg-[#7251d1] text-white px-10 py-6 rounded-full text-lg shadow-lg font-medium transition-all"
        >
          {continueText}
        </Button>
      </div>
    </div>
  );
};
