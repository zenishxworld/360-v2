import React from "react";
import { FormProvider, useFormContext } from "./FormContext";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Steps
import { Step1Country, Step2Education, Step3Interest, Step4Background, Step5Budget, Step6Intake, Step7Contact, Step8OTP } from "./steps";

const AI_MESSAGES: Record<number, string> = {
  1: "Choose your destination country. Where do you aspire to study?",
  2: "Select your desired degree level.",
  3: "Choose your field of interest.",
  4: "Tell us about your academic background.",
  5: "What's your estimated budget for studying abroad?",
  6: "When do you plan to commence your studies?",
  7: "Let's get your contact details so we can send your evaluation.",
  8: "Almost there! Enter the OTP sent to your number.",
};

const WizardLayout: React.FC = () => {
  const { currentStep, prevStep } = useFormContext();
  const navigate = useNavigate();

  const progressValue = (currentStep / 8) * 100;

  const handleBack = () => {
    if (currentStep === 1) {
      navigate(-1);
    } else {
      prevStep();
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F6F8] flex flex-col font-sans">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-200 fixed top-0 left-0 z-50">
        <div 
          className="h-full bg-[#8B6AE8] transition-all duration-500 ease-in-out"
          style={{ width: `${progressValue}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col pt-4">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="text-gray-500 hover:text-gray-900 hover:bg-gray-200/50 rounded-full h-10 px-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div className="font-semibold text-gray-500">
            Step {currentStep} of 8
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto px-6 pb-24">
          
          {/* Left Side: AI Guide Panel */}
          <div className="lg:w-1/3 flex flex-col pt-10 lg:pr-12 mb-8 lg:mb-0 items-center lg:items-start text-center lg:text-left">
            <div className="w-24 h-24 rounded-full bg-[#F4EEFF] flex items-center justify-center mb-6 border-2 border-[#8B6AE8] shadow-sm">
              <Sparkles className="w-10 h-10 text-[#8B6AE8]" />
              {/* Replace Sparkles with an AI Mascot Image if available later */}
            </div>
            <div className="relative">
              <div className="bg-[#FFF7EB] border border-[#F3C87A] rounded-2xl p-6 shadow-sm text-[#111827] text-lg leading-relaxed relative z-10">
                {AI_MESSAGES[currentStep]}
              </div>
              {/* Speech pointer triangle */}
              <div className="absolute -top-3 left-10 w-6 h-6 bg-[#FFF7EB] border-t border-l border-[#F3C87A] transform rotate-45 z-0 lg:left-10 lg:top-[-10px]"></div>
            </div>
          </div>

          {/* Right Side: Step Content */}
          <div className="lg:w-2/3 w-full max-w-2xl mx-auto pt-10 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {currentStep === 1 && <Step1Country />}
                {currentStep === 2 && <Step2Education />}
                {currentStep === 3 && <Step3Interest />}
                {currentStep === 4 && <Step4Background />}
                {currentStep === 5 && <Step5Budget />}
                {currentStep === 6 && <Step6Intake />}
                {currentStep === 7 && <Step7Contact />}
                {currentStep === 8 && <Step8OTP />}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

export default function AIProfileEvaluation() {
  return (
    <FormProvider>
      <WizardLayout />
    </FormProvider>
  );
}
