"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  description: string;
  isCurrent?: boolean;
}

const experienceData: ExperienceItem[] = [
  {
    role: "Executive",
    company: "InsuranceDekho.com",
    duration: "June 2024 - December 2024",
    description: "Working as an Executive in InsuranceDekho.com...",
    isCurrent: true,
  },
  {
    role: "Data Analyst Intern",
    company: "Codewave Solutions Pvt Ltd",
    duration: "October 2023 - March 2024",
    description: "Assisted senior analysts in data collection, cleaning, and analysis...",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="container mx-auto section-padding">
      <h2 className="text-3xl font-bold text-center mb-12">Experience</h2>
      <div className="relative pl-6 border-l-2 border-primary/30 space-y-12">
        {experienceData.map((exp, index) => (
          <div key={index} className="relative">
            <div className="absolute left-[-2.10rem] top-1 h-6 w-6 rounded-full flex items-center justify-center bg-primary ring-4 ring-primary/20">
              {/* Replace with a static SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </div>
            <div className="ml-8">
              <h3 className="text-xl font-semibold">{exp.role}</h3>
              <p className="text-muted-foreground">{exp.company}</p>
              <p className="text-sm text-muted-foreground">{exp.duration}</p>
              <p className="mt-2">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
