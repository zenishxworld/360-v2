import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, DollarSign, Clock, Calendar, GraduationCap, MapPin, Award, Globe2, Sparkles } from "lucide-react";

export interface Course {
  id: string;
  universityName: string;
  universityLogo: string;
  courseName: string;
  country: string;
  city: string;
  tuitionFee: string;
  applicationFee: string;
  duration: string;
  intake: string;
  matchScore: number;
}

interface CourseDetailModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({ course, isOpen, onClose }) => {
  if (!course) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-[24px]">
        <DialogHeader className="mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center p-2 shrink-0">
              <img src={course.universityLogo} alt={course.universityName} className="max-w-full max-h-full object-contain" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-[#111827]">{course.courseName}</DialogTitle>
              <DialogDescription className="text-lg text-gray-500 flex items-center gap-2 mt-1">
                {course.universityName} <span className="w-1 h-1 rounded-full bg-gray-300"></span> {course.city}, {course.country}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-8 pb-8">
          {/* AI Recommended Banner */}
          <div className="bg-[#FFF7EB] border border-[#F3C87A] rounded-xl p-4 flex gap-4">
            <div className="mt-1">
              <Sparkles className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#B45309] mb-1">Why UNI 360 AI Recommended This Course</h4>
              <p className="text-[#92400E] text-sm leading-relaxed">
                Based on your budget of ₹15 Lakh, interest in Business & Management, and academic background, this course offers a 95% match. It provides excellent ROI, has strong industry connections, and aligns perfectly with your desired September intake in {course.country}.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="text-gray-500 text-sm mb-1 flex items-center gap-1"><DollarSign className="w-4 h-4"/> Tuition Fee</div>
              <div className="font-semibold text-gray-900">{course.tuitionFee}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="text-gray-500 text-sm mb-1 flex items-center gap-1"><Clock className="w-4 h-4"/> Duration</div>
              <div className="font-semibold text-gray-900">{course.duration}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="text-gray-500 text-sm mb-1 flex items-center gap-1"><Calendar className="w-4 h-4"/> Next Intake</div>
              <div className="font-semibold text-gray-900">{course.intake}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="text-gray-500 text-sm mb-1 flex items-center gap-1"><DollarSign className="w-4 h-4"/> App Fee</div>
              <div className="font-semibold text-gray-900">{course.applicationFee}</div>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-[#8B6AE8]" /> Overview
              </h3>
              <p className="text-gray-600 leading-relaxed">
                This program is designed to equip students with a comprehensive understanding of modern business practices. It blends theoretical knowledge with practical applications, preparing graduates for leadership roles in the global market.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-3">
                <GraduationCap className="w-5 h-5 text-[#8B6AE8]" /> Eligibility Criteria
              </h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Minimum 60% in Bachelor's degree from a recognized university.</li>
                <li>IELTS score of 6.5 overall (no band less than 6.0).</li>
                <li>Statement of Purpose (SOP) and 2 Letters of Recommendation (LORs).</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-[#8B6AE8]" /> Scholarships & Funding
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Merit-based scholarships up to 20% of the tuition fee are available for international students with outstanding academic records.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-3">
                <Globe2 className="w-5 h-5 text-[#8B6AE8]" /> Visa & Career Outcomes
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Graduates are eligible for a 2-year post-study work visa. 92% of alumni secure employment within 6 months of graduation, with top employers including global MNCs and consulting firms.
              </p>
            </section>
          </div>

        </div>

        <div className="border-t pt-4 flex justify-end gap-3 sticky bottom-0 bg-white">
          <Button variant="outline" onClick={onClose} className="rounded-xl">Close</Button>
          <Button className="bg-[#8B6AE8] hover:bg-[#7251d1] text-white rounded-xl">Shortlist Course</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
