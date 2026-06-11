import React, { createContext, useContext, useState, ReactNode } from "react";
import { StudentProfile, WizardStep } from "./types";

interface FormContextType {
  data: Partial<StudentProfile>;
  updateData: (newData: Partial<StudentProfile>) => void;
  currentStep: WizardStep;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: WizardStep) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<Partial<StudentProfile>>({
    countries: [],
    interests: [],
    budget: 15, // default to 15 Lakh
  });
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);

  const updateData = (newData: Partial<StudentProfile>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => (Math.min(prev + 1, 8) as WizardStep));
  };

  const prevStep = () => {
    setCurrentStep((prev) => (Math.max(prev - 1, 1) as WizardStep));
  };

  const setStep = (step: WizardStep) => {
    setCurrentStep(step);
  };

  return (
    <FormContext.Provider
      value={{ data, updateData, currentStep, nextStep, prevStep, setStep }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
