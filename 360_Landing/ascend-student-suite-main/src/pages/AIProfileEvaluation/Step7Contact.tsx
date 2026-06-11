import React, { useState, useEffect } from "react";
import { useFormContext } from "./FormContext";
import { StepFooter } from "./StepFooter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  countryCode: z.string().min(1, "Code required"),
  phone: z.string().min(8, "Valid phone number required").regex(/^\d+$/, "Only numbers allowed"),
});

export default function Step7Contact() {
  const { data, updateData, nextStep } = useFormContext();
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const result = contactSchema.safeParse({
      name: data.name || "",
      email: data.email || "",
      countryCode: data.countryCode || "+91",
      phone: data.phone || "",
    });

    if (result.success) {
      setErrors({});
      setIsValid(true);
    } else {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });
      setErrors(formattedErrors);
      setIsValid(false);
    }
  };

  useEffect(() => {
    // initialize default country code if empty
    if (!data.countryCode) {
      updateData({ countryCode: "+91" });
    }
  }, []);

  useEffect(() => {
    validate();
  }, [data.name, data.email, data.countryCode, data.phone]);

  const handleChange = (field: string, value: string) => {
    updateData({ [field]: value });
  };

  return (
    <div className="flex flex-col h-full w-full pb-32">
      <h2 className="text-3xl font-bold text-[#111827] mb-8">Let's get your contact details</h2>
      
      <div className="space-y-6 max-w-lg">
        <div className="space-y-2">
          <Label className="text-gray-700">Full Name</Label>
          <Input 
            placeholder="John Doe"
            className="h-14 rounded-xl bg-white border-gray-200"
            value={data.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          {errors.name && data.name !== undefined && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700">Email Address</Label>
          <Input 
            type="email"
            placeholder="john@example.com"
            className="h-14 rounded-xl bg-white border-gray-200"
            value={data.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {errors.email && data.email !== undefined && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700">WhatsApp Number</Label>
          <div className="flex gap-3">
            <Input 
              className="h-14 rounded-xl bg-white border-gray-200 w-24 text-center"
              value={data.countryCode || "+91"}
              onChange={(e) => handleChange("countryCode", e.target.value)}
              placeholder="+91"
            />
            <Input 
              type="tel"
              placeholder="9876543210"
              className="h-14 rounded-xl bg-white border-gray-200 flex-1"
              value={data.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
          {(errors.phone || errors.countryCode) && data.phone !== undefined && (
            <p className="text-red-500 text-sm mt-1">{errors.phone || errors.countryCode}</p>
          )}
        </div>
      </div>

      <StepFooter 
        onContinue={nextStep} 
        disabled={!isValid || !data.name || !data.email || !data.phone} 
      />
    </div>
  );
}
