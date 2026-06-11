import React, { useState } from "react";
import { CourseCard } from "../../components/profile-evaluation/CourseCard";
import { CourseDetailModal, Course } from "../../components/profile-evaluation/CourseDetailModal";
import { UNI360AIChatDrawer } from "../../components/profile-evaluation/UNI360AIChatDrawer";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data based on the requirements
const MOCK_COURSES: Course[] = [
  {
    id: "1",
    universityName: "University of Warwick",
    universityLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/University_of_Warwick_logo.svg/1200px-University_of_Warwick_logo.svg.png",
    courseName: "MSc Business with Consulting",
    country: "United Kingdom",
    city: "Coventry",
    tuitionFee: "£29,950",
    applicationFee: "£60",
    duration: "1 Year",
    intake: "Sep 2026",
    matchScore: 95
  },
  {
    id: "2",
    universityName: "Trinity College Dublin",
    universityLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/Trinity_College_Dublin_shield.svg/1200px-Trinity_College_Dublin_shield.svg.png",
    courseName: "MSc Digital Marketing Strategy",
    country: "Ireland",
    city: "Dublin",
    tuitionFee: "€20,500",
    applicationFee: "€50",
    duration: "1 Year",
    intake: "Sep 2026",
    matchScore: 92
  },
  {
    id: "3",
    universityName: "Technical University of Munich",
    universityLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Logo_of_the_Technical_University_of_Munich.svg/1200px-Logo_of_the_Technical_University_of_Munich.svg.png",
    courseName: "MSc Data Engineering and Analytics",
    country: "Germany",
    city: "Munich",
    tuitionFee: "€0 (No Tuition)",
    applicationFee: "€150/sem",
    duration: "2 Years",
    intake: "Oct 2026",
    matchScore: 88
  },
  {
    id: "4",
    universityName: "University of Toronto",
    universityLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coa.svg/1200px-Utoronto_coa.svg.png",
    courseName: "Master of Management of Innovation",
    country: "Canada",
    city: "Toronto",
    tuitionFee: "$58,000 CAD",
    applicationFee: "$120 CAD",
    duration: "1 Year",
    intake: "Sep 2026",
    matchScore: 85
  },
  {
    id: "5",
    universityName: "RMIT University",
    universityLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/51/RMIT_University_Logo.svg/1200px-RMIT_University_Logo.svg.png",
    courseName: "Master of Information Technology",
    country: "Australia",
    city: "Melbourne",
    tuitionFee: "$38,400 AUD",
    applicationFee: "$100 AUD",
    duration: "2 Years",
    intake: "Feb 2026",
    matchScore: 78
  },
  {
    id: "6",
    universityName: "NEOMA Business School",
    universityLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Neoma_Business_School_logo.svg/1200px-Neoma_Business_School_logo.svg.png",
    courseName: "MSc Global Management",
    country: "France",
    city: "Rouen",
    tuitionFee: "€18,500",
    applicationFee: "€100",
    duration: "1 Year",
    intake: "Sep 2026",
    matchScore: 72
  }
];

export default function AIProfileEvaluationResults() {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <div className="min-h-screen bg-[#F6F6F8] font-sans pb-24 relative">
      
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/ai-profile-evaluation")}
            className="text-gray-500 hover:text-gray-900 rounded-full h-10 px-4 mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Edit Profile
          </Button>
          <div className="flex-1 text-center font-bold text-xl text-[#8B6AE8]">
            UNI 360 AI MATCH
          </div>
          <div className="w-24"></div> {/* Spacer for center alignment */}
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-[#8B6AE8] text-white pt-16 pb-32 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Discover the Right Courses for You</h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto">
          Based on your profile, here are the most suitable programs curated by UNI 360 AI.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-20 flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* Left Sidebar - Filters */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-6 border border-gray-100 lg:sticky lg:top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-xl text-[#111827]">Filters</h2>
              <SlidersHorizontal className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Country</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#8B6AE8]">
                  <option>All Countries</option>
                  <option>United Kingdom</option>
                  <option>Ireland</option>
                  <option>Germany</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Course Type</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#8B6AE8]">
                  <option>Master's Degree</option>
                  <option>Bachelor's Degree</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Intake</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#8B6AE8]">
                  <option>Any Intake</option>
                  <option>September</option>
                  <option>January</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Tuition Range</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#8B6AE8]">
                  <option>Any Budget</option>
                  <option>Under ₹10 Lakh</option>
                  <option>₹10L - ₹20L</option>
                  <option>Over ₹20L</option>
                </select>
              </div>

              <Button className="w-full bg-[#8B6AE8] hover:bg-[#7251d1] text-white rounded-xl py-6 mt-4 font-semibold">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side - Grid */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_COURSES.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onClick={(c) => setSelectedCourse(c)}
              />
            ))}
          </div>
        </div>

      </div>

      <CourseDetailModal 
        isOpen={!!selectedCourse} 
        onClose={() => setSelectedCourse(null)} 
        course={selectedCourse} 
      />

      <UNI360AIChatDrawer />

    </div>
  );
}
