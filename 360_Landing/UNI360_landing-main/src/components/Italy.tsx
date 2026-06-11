import React from 'react';
import { GraduationCap, MapPin, Clock, Users, DollarSign, BookOpen } from 'lucide-react';
import imgPisa from "../assets/STUDY-IN-ITALY/university of pisa.jpg";

interface ItalyProps {
  selectedCountries: string[];
}

export const Italy = ({ selectedCountries }: ItalyProps) => {
  if (!selectedCountries.includes('italy')) {
    return null;
  }

  const highlights = [
    {
      icon: <DollarSign className="w-4 h-4" />,
      title: "Affordable Tuition",
      description: "Public universities from just €890/year"
    },
    {
      icon: <GraduationCap className="w-4 h-4" />,
      title: "Historic Universities",
      description: "Home to the world's oldest university"
    },
    {
      icon: <Users className="w-4 h-4" />,
      title: "Global Community",
      description: "96,000+ international students"
    },
    {
      icon: <BookOpen className="w-4 h-4" />,
      title: "English Programs",
      description: "17,000+ programs across disciplines"
    }
  ];

  const quickFacts = [
    { label: "Average Salary", value: "€33,000" },
    { label: "Work Rights", value: "20 hrs/week" },
    { label: "Living Cost", value: "€666-954/month" }
  ];

  return (
    <div className="mx-4 sm:mx-6 lg:mx-8 mt-4 sm:mt-16 lg:mt-24 mb-4 sm:mb-6 lg:mb-8 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-border shadow-[var(--card-shadow)] overflow-hidden hover:shadow-[var(--glow-primary)] transition-all duration-300 bg-[hsl(var(--section-muted))]">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0">
        {/* Image First on Mobile */}
        <div className="relative h-40 sm:h-64 lg:h-auto lg:min-h-full order-1 lg:order-2">
          <img 
            src={imgPisa} 
            alt="Pisa Cathedral and Leaning Tower - Iconic Italian landmark"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-accent/30 z-10"></div>
          <div className="absolute inset-0 flex items-center justify-center z-20">
            {/* <div className="text-center space-y-2 sm:space-y-3 p-3 sm:p-4 lg:p-8">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white drop-shadow-lg">Study in Italy</h3>
              <p className="text-xs sm:text-sm lg:text-base text-white/90 drop-shadow">Where History Meets Innovation</p>
            </div> */}
          </div>
        </div>

        {/* Content Second on Mobile */}
        <div className="p-3 sm:p-4 lg:p-8 space-y-3 sm:space-y-4 lg:space-y-6 order-2 lg:order-1">
          {/* Header */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-4 sm:w-8 sm:h-6 lg:w-10 lg:h-7 rounded shadow-sm bg-gradient-to-r from-green-500 via-white to-red-500 flex items-center justify-center">
              <span className="text-[8px] sm:text-[10px] lg:text-xs font-bold text-white drop-shadow-sm">IT</span>
            </div>
            <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gunmetal">
              Study in <span className="text-accent">Italy</span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-xs sm:hidden text-muted-foreground leading-relaxed">
            Affordable world-class education with 100+ universities and rich cultural heritage in the heart of Europe.
          </p>
          <p className="hidden sm:block text-sm lg:text-base text-muted-foreground leading-relaxed">
            Italy combines centuries of academic excellence with affordable education. With 100+ universities, 
            17,000+ English-taught programs, and generous scholarships up to €9,000/year, it's perfect for 
            students seeking quality education in the heart of Europe.
          </p>

          {/* Key Highlights */}
          <div className="space-y-1.5 sm:space-y-3 lg:space-y-4">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gunmetal flex items-center gap-1.5 sm:gap-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-accent" />
              <span className="sm:hidden">Highlights</span>
              <span className="hidden sm:inline">Why Choose Italy?</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-1.5 sm:gap-3">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-1.5 sm:gap-2.5 p-1.5 sm:p-2.5 lg:p-3 bg-secondary/10 rounded-md sm:rounded-xl border border-secondary/20 hover:bg-secondary/20 transition-colors duration-200">
                  <div className="text-accent mt-0.5 flex-shrink-0">
                    {highlight.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium text-gunmetal text-xs sm:text-xs lg:text-sm leading-tight">{highlight.title}</h4>
                    <p className="hidden sm:block text-xs text-muted-foreground mt-0.5 sm:mt-1 leading-tight">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Facts */}
          <div className="space-y-1.5 sm:space-y-3">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gunmetal flex items-center gap-1.5 sm:gap-2">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-accent" />
              Quick Facts
            </h3>

            <div className="space-y-1 sm:space-y-2">
              {quickFacts.map((fact, index) => (
                <div key={index} className="flex justify-between items-center py-0.5 sm:py-1.5 lg:py-2 border-b border-border/50 last:border-b-0">
                  <span className="font-medium text-gunmetal text-xs sm:text-xs lg:text-sm">{fact.label}:</span>
                  <span className="text-muted-foreground text-xs sm:text-xs lg:text-sm text-right">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
