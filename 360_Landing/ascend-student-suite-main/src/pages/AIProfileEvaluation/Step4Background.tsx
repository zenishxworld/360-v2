import React from "react";
import { useFormContext } from "./FormContext";
import { StepFooter } from "./StepFooter";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function Step4Background() {
  const { data, updateData, nextStep } = useFormContext();

  const years = Array.from({ length: 26 }, (_, i) => (2010 + i).toString());

  const isValid = 
    data.qualification && 
    data.graduationYear && 
    data.score && 
    data.scoreType && 
    (data.englishTestRequired === false || (data.englishTestRequired === true && data.englishTestType && data.englishScore));

  return (
    <div className="flex flex-col h-full w-full pb-32">
      <h2 className="text-3xl font-bold text-[#111827] mb-8">What's Your Education Level So Far?</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-gray-700">Highest Qualification</Label>
            <Select 
              value={data.qualification} 
              onValueChange={(val) => updateData({ qualification: val })}
            >
              <SelectTrigger className="h-14 rounded-xl bg-white border-gray-200">
                <SelectValue placeholder="Select Qualification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High School">High School</SelectItem>
                <SelectItem value="Diploma">Diploma</SelectItem>
                <SelectItem value="Bachelor's Degree">Bachelor's Degree</SelectItem>
                <SelectItem value="Master's Degree">Master's Degree</SelectItem>
                <SelectItem value="Doctorate">Doctorate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700">Passing Year</Label>
            <Select 
              value={data.graduationYear} 
              onValueChange={(val) => updateData({ graduationYear: val })}
            >
              <SelectTrigger className="h-14 rounded-xl bg-white border-gray-200">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-gray-700">Score Type</Label>
            <Select 
              value={data.scoreType} 
              onValueChange={(val) => updateData({ scoreType: val })}
            >
              <SelectTrigger className="h-14 rounded-xl bg-white border-gray-200">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CGPA">CGPA</SelectItem>
                <SelectItem value="Percentage">Percentage</SelectItem>
                <SelectItem value="GPA">GPA</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700">Score</Label>
            <Input 
              type="text"
              placeholder={data.scoreType === 'Percentage' ? 'e.g. 85' : 'e.g. 8.5'}
              className="h-14 rounded-xl bg-white border-gray-200"
              value={data.score || ""}
              onChange={(e) => updateData({ score: e.target.value })}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <Label className="text-gray-700 mb-4 block">Have you taken an English Proficiency Test?</Label>
          <RadioGroup 
            className="flex gap-6"
            value={data.englishTestRequired === true ? "yes" : data.englishTestRequired === false ? "no" : undefined}
            onValueChange={(val) => {
              updateData({ 
                englishTestRequired: val === "yes",
                englishTestType: val === "no" ? undefined : data.englishTestType,
                englishScore: val === "no" ? undefined : data.englishScore
              })
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="test-yes" />
              <Label htmlFor="test-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="test-no" />
              <Label htmlFor="test-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {data.englishTestRequired && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100 mt-4">
            <div className="space-y-2">
              <Label className="text-gray-700">Which Test?</Label>
              <Select 
                value={data.englishTestType} 
                onValueChange={(val) => updateData({ englishTestType: val })}
              >
                <SelectTrigger className="h-14 rounded-xl bg-white border-gray-200">
                  <SelectValue placeholder="Select Test" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IELTS">IELTS</SelectItem>
                  <SelectItem value="TOEFL">TOEFL</SelectItem>
                  <SelectItem value="PTE">PTE</SelectItem>
                  <SelectItem value="Duolingo">Duolingo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700">Overall Score</Label>
              <Input 
                type="text"
                placeholder="Enter score"
                className="h-14 rounded-xl bg-white border-gray-200"
                value={data.englishScore || ""}
                onChange={(e) => updateData({ englishScore: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>

      <StepFooter 
        onContinue={nextStep} 
        disabled={!isValid} 
      />
    </div>
  );
}
