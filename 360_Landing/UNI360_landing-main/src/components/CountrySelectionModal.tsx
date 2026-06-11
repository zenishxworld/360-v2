import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CountrySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelection: (countries: string[]) => void;
}

export const CountrySelectionModal = ({ isOpen, onClose, onSelection }: CountrySelectionModalProps) => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const countries = [
  {
    code: "germany",
    name: "Germany",
    flag: "/germany logo.png",
    description: "World-renowned engineering and technology programs",
    benefits: ["Free/Low tuition fees", "Post-study work visa", "Strong economy", "English-taught programs"]
  },
  {
    code: "uk",
    name: "United Kingdom",
    flag: "/uk logo.png",
    description: "Prestigious universities with global recognition",
    benefits: ["1-year Master's programs", "Graduate visa route", "Rich academic heritage", "Diverse culture"]
  },
  {
    code: "italy",
    name: "Italy",
    flag: "",
    description: "Affordable world-class education in the heart of Europe",
    benefits: ["Low tuition from €890/year", "12-month stay-back visa", "Rich cultural heritage", "17,000+ programs"]
  },
  {
    code: "serbia",
    name: "Serbia",
    flag: "",
    description: "Most affordable European education with high visa success",
    benefits: ["Tuition from €1,500/year", "90%+ visa success rate", "No IELTS required", "Growing Indian community"]
  }
];

  const handleCountrySelect = (countryCode: string) => {
    if (selectedCountries.includes(countryCode)) {
      setSelectedCountries(selectedCountries.filter(c => c !== countryCode));
    } else {
      setSelectedCountries([...selectedCountries, countryCode]);
    }
  };

  const handleConfirm = () => {
    onSelection(selectedCountries.length > 0 ? selectedCountries : ["germany", "uk", "italy", "serbia"]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center mb-4">
            Choose Your Study Destination
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-center text-muted-foreground">
            Select the country(ies) where you'd like to pursue your studies. 
            We'll customize your experience accordingly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            {countries.map((country) => (
              <Button
                key={country.code}
                onClick={() => {
                  onSelection([country.code]);
                  onClose();
                }}
                variant={selectedCountries.includes(country.code) ? "default" : "outline"}
                className="flex items-center gap-3 px-6 py-8 text-lg font-semibold min-w-[200px]"
              >
                <img 
  src={country.flag} 
  alt={`${country.name} flag`} 
  className="w-8 h-6 object-cover rounded"
/>
                <span>{country.name}</span>
              </Button>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => {
                onSelection(["germany", "uk", "serbia"]);
                onClose();
              }}
              className="btn-hero px-8 py-3"
            >
              Choose Both Countries
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};