import React from "react";
import { Course } from "./CourseDetailModal";
import { MapPin, Clock, Calendar, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  const getMatchColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-700 border-green-200";
    if (score >= 75) return "bg-purple-100 text-purple-700 border-purple-200";
    return "bg-orange-100 text-orange-700 border-orange-200";
  };

  return (
    <div 
      onClick={() => onClick(course)}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all cursor-pointer overflow-hidden flex flex-col h-full"
    >
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center p-2 border border-gray-100">
            <img src={course.universityLogo} alt={course.universityName} className="max-w-full max-h-full object-contain" />
          </div>
          
          <div className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border",
            getMatchColor(course.matchScore)
          )} title="Based on budget, academic profile, country preference and intake.">
            <Sparkles className="w-3 h-3" />
            {course.matchScore}% Match
          </div>
        </div>

        <h3 className="text-xl font-bold text-[#111827] mb-2 line-clamp-2" title={course.courseName}>
          {course.courseName}
        </h3>
        
        <div className="text-gray-500 font-medium mb-1 line-clamp-1">
          {course.universityName}
        </div>
        
        <div className="flex items-center text-sm text-gray-400 gap-1 mb-6">
          <MapPin className="w-4 h-4" />
          {course.city}, {course.country}
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
          <div>
            <div className="text-gray-400 text-xs uppercase font-semibold tracking-wider mb-1">Tuition Fee</div>
            <div className="font-semibold text-gray-900">{course.tuitionFee}</div>
          </div>
          <div>
            <div className="text-gray-400 text-xs uppercase font-semibold tracking-wider mb-1">App Fee</div>
            <div className="font-semibold text-gray-900">{course.applicationFee}</div>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <Clock className="w-4 h-4 text-gray-400" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            {course.intake}
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-100 p-4 bg-gray-50/50 flex justify-center text-[#8B6AE8] font-medium text-sm group-hover:bg-[#8B6AE8] group-hover:text-white transition-colors">
        View Course Details
      </div>
    </div>
  );
};
