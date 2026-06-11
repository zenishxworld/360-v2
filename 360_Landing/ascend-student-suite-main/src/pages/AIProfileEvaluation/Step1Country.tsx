import React, { useState } from "react";
import { useFormContext } from "./FormContext";
import { StepFooter } from "./StepFooter";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const COUNTRIES = [
  { name: "France", flag: "🇫🇷" },
  { name: "Ireland", flag: "🇮🇪" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Denmark", flag: "🇩🇰" },
  { name: "Malta", flag: "🇲🇹" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Poland", flag: "🇵🇱" },
  { name: "Latvia", flag: "🇱🇻" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Greece", flag: "🇬🇷" },
  { name: "Spain", flag: "🇪🇸" },
  { name: "Estonia", flag: "🇪🇪" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "Hungary", flag: "🇭🇺" },
  { name: "Lithuania", flag: "🇱🇹" },
  { name: "Switzerland", flag: "🇨🇭" },
  { name: "Sweden", flag: "🇸🇪" },
  { name: "Finland", flag: "🇫🇮" },
  { name: "Cyprus", flag: "🇨🇾" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "Dubai", flag: "🇦🇪" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "USA", flag: "🇺🇸" },
  { name: "New Zealand", flag: "🇳🇿" },
];

export default function Step1Country() {
  const { data, updateData, nextStep } = useFormContext();
  const [search, setSearch] = useState("");

  const selectedCountries = data.countries || [];

  const toggleCountry = (country: string) => {
    if (selectedCountries.includes(country)) {
      updateData({ countries: selectedCountries.filter((c) => c !== country) });
    } else {
      updateData({ countries: [...selectedCountries, country] });
    }
  };

  const filteredCountries = COUNTRIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col h-full w-full">
      <h2 className="text-3xl font-bold text-[#111827] mb-6">Where do you aspire to study?</h2>
      
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input 
          className="w-full pl-12 py-6 rounded-2xl bg-white border-gray-200 shadow-sm text-lg"
          placeholder="Looking for another country? Type it here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-32">
        {filteredCountries.map((country) => {
          const isSelected = selectedCountries.includes(country.name);
          return (
            <button
              key={country.name}
              onClick={() => toggleCountry(country.name)}
              className={cn(
                "flex items-center p-4 h-[60px] rounded-[14px] bg-white border transition-all hover:-translate-y-[2px]",
                isSelected 
                  ? "border-[#8B6AE8] bg-[#F4EEFF] shadow-[0_0_0_2px_rgba(139,106,232,0.2)]" 
                  : "border-[#E5E7EB] hover:border-gray-300 shadow-sm"
              )}
            >
              <span className="text-2xl mr-3">{country.flag}</span>
              <span className="font-medium text-[#111827]">{country.name}</span>
            </button>
          );
        })}
      </div>

      <StepFooter 
        onContinue={nextStep} 
        disabled={selectedCountries.length === 0} 
      />
    </div>
  );
}
