import React, { useState } from "react";
import { useFormContext } from "./FormContext";
import { StepFooter } from "./StepFooter";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const INTERESTS = [
  "Business & Management",
  "IT & Computer Science",
  "Accounting & Finance",
  "Arts & Humanities",
  "Nursing",
  "Pharma & Healthcare",
  "Education",
  "Engineering & Technology",
  "Food Sciences",
  "Law",
  "Sports",
  "Tourism & Hospitality",
  "Logistics & Supply Chain",
  "Fashion & Design",
  "Media & Journalism",
  "Music",
  "Psychology",
  "Science",
  "Architecture",
  "Artificial Intelligence",
  "Data Science",
  "Cyber Security",
  "Digital Marketing",
];

export default function Step3Interest() {
  const { data, updateData, nextStep } = useFormContext();
  const [search, setSearch] = useState("");

  const selectedInterests = data.interests || [];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      updateData({ interests: selectedInterests.filter((i) => i !== interest) });
    } else {
      updateData({ interests: [...selectedInterests, interest] });
    }
  };

  const filteredInterests = INTERESTS.filter(i => i.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col h-full w-full">
      <h2 className="text-3xl font-bold text-[#111827] mb-8">Specify Your Field of Interest</h2>
      
      <div className="flex flex-wrap gap-3 mb-8">
        {filteredInterests.map((interest) => {
          const isSelected = selectedInterests.includes(interest);
          return (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={cn(
                "px-5 py-3 rounded-full text-sm font-medium transition-all border",
                isSelected 
                  ? "bg-[#8B6AE8] text-white border-[#8B6AE8] shadow-md shadow-[#8B6AE8]/20" 
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              )}
            >
              {interest}
            </button>
          );
        })}
      </div>

      <div className="relative mb-32 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input 
          className="w-full pl-12 py-6 rounded-2xl bg-white border-gray-200 shadow-sm text-lg"
          placeholder="Search fields..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <StepFooter 
        onContinue={nextStep} 
        disabled={selectedInterests.length === 0} 
      />
    </div>
  );
}
