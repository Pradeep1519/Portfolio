"use client"; // Add this directive at the top

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Calendar } from "lucide-react";

export default function EducationSection() {
  return (
    <section
      id="education"
      className="relative container mx-auto section-padding bg-transparent text-white rounded-lg overflow-hidden"
    >
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
        Education
      </h2>

      {/* Grid Layout for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg p-4">
          <CardHeader className="flex flex-row items-start space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Bachelor of Technology (B.Tech)</CardTitle>
              <CardDescription className="text-base">Computer Science Engineering</CardDescription>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Calendar className="mr-1.5 h-4 w-4" />
                <span>Graduated: 2024</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Relevant coursework included Data Structures, Algorithms, Database Management Systems, Machine Learning Fundamentals, and Software Engineering. Engaged in various projects focusing on data analysis and application development.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg p-4">
          <CardHeader className="flex flex-row items-start space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">S.B.S Intercollege Surajpur (12th)</CardTitle>
              <CardDescription className="text-base">Science Stream</CardDescription>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Calendar className="mr-1.5 h-4 w-4" />
                <span>Higher Secondary: 2020</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Completed my 12th grade with a focus on Science, achieving a strong foundation in Mathematics and Physics. Participated in various extracurricular activities, including science fairs and coding competitions.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg p-4">
          <CardHeader className="flex flex-row items-start space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Green Noida Public School (10th)</CardTitle>
              <CardDescription className="text-base">Mathematics and Science</CardDescription>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Calendar className="mr-1.5 h-4 w-4" />
                <span>Secondary: 2018</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Achieved a solid academic foundation in Mathematics and Science, laying the groundwork for my future studies in Computer Science. Actively participated in school events and competitions, showcasing my leadership and teamwork skills.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
