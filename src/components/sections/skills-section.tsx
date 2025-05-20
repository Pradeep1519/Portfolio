"use client"; // Add this directive at the top

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Database, BarChart3, Activity, Layers3, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic"; 

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

// Updated Skill interface
interface Skill {
  name: string;
  category: string;
}

const skillsData: Skill[] = [
  { name: "Python", category: "Data Analysis" },
  { name: "Pandas", category: "Data Analysis" },
  { name: "NumPy", category: "Data Analysis" },
  { name: "Power Query", category: "Data Analysis" },
  { name: "DAX", category: "Data Analysis" },
  { name: "Excel Formulas", category: "Data Analysis" },
  { name: "Statistical Analysis", category: "Data Analysis" },
  { name: "Data Cleaning", category: "Data Analysis" },
  { name: "Data Wrangling", category: "Data Analysis" },
  { name: "Data Mining", category: "Data Analysis" },
  { name: "Data Modeling", category: "Data Analysis" },
  { name: "Power BI", category: "Data Visualization" },
  { name: "Seaborn", category: "Data Visualization" },
  { name: "Matplotlib", category: "Data Visualization" },
  { name: "Tableau", category: "Data Visualization" },
  { name: "Data Storytelling", category: "Data Visualization" },
  { name: "Interactive Dashboards", category: "Data Visualization" },
  { name: "Visual Analytics", category: "Data Visualization" },
  { name: "Business Intelligence", category: "Data Visualization" },
  { name: "Excel", category: "Data Visualization" },
  { name: "MySQL", category: "SQL" },
  { name: "MS SQL Server", category: "SQL" },
  { name: "Scikit-learn Basic", category: "Machine Learning" },
  { name: "TensorFlow Basics", category: "Machine Learning" },
  { name: "Agile Methodology Basics", category: "Methodologies" },
  { name: "Excel", category: "Tools" },
  { name: "Git Basics", category: "Tools" },
];

const skillCategories = [
  {
    name: "Data Analysis",
    icon: Activity,
    description: "Extracting insights and knowledge from data.",
  },
  {
    name: "Data Visualization",
    icon: BarChart3,
    description: "Creating visual representations of data.",
  },
  {
    name: "SQL",
    icon: Database,
    description: "Managing and querying relational databases.",
  },
  {
    name: "Machine Learning",
    icon: BrainCircuit,
    description: "Building predictive models (Foundational).",
  },
  {
    name: "Methodologies",
    icon: Users,
    description: "Workflow and project management approaches.",
  },
  {
    name: "Tools",
    icon: Layers3,
    description: "Essential software and platforms.",
  },
];

export default function SkillsSection() {
  const [animationData, setAnimationData] = useState(null);
  const [newBoyLeftAnimation, setNewBoyLeftAnimation] = useState(null);
  const [newBoyRightAnimation, setNewBoyRightAnimation] = useState(null);

  // Load the Lottie JSON file asynchronously
  useEffect(() => {
    fetch("/lottie/my-skills.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load Lottie animation:", err));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetch("/lottie/boy-waiting.json")
        .then((res) => res.json())
        .then((data) => setNewBoyLeftAnimation(data))
        .catch((err) => console.error("Failed to load boy-waiting.json:", err));

      fetch("/lottie/boy-speaking.json")
        .then((res) => res.json())
        .then((data) => setNewBoyRightAnimation(data))
        .catch((err) => console.error("Failed to load boy-speaking.json:", err));
    }
  }, []);

  return (
    <section
      id="skills"
      className="relative container mx-auto section-padding bg-transparent text-white rounded-lg overflow-hidden"
    >
      {/* Lottie Animation Background - Left */}
      {animationData && (
        <Lottie
          loop
          animationData={animationData}
          play
          className="absolute top-0 left-0 w-1/3 h-full -z-10 object-cover opacity-30 mix-blend-multiply dark:mix-blend-screen"
        />
      )}

      {/* Lottie Animation Background - Right */}
      {animationData && (
        <Lottie
          loop
          animationData={animationData}
          play
          className="absolute top-0 right-0 w-1/3 h-full -z-10 object-cover opacity-30 mix-blend-multiply dark:mix-blend-screen"
        />
      )}

      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
        My Skills
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category) => {
          const categorySkills = skillsData.filter(
            (skill) => skill.category === category.name
          );
          if (categorySkills.length === 0) return null;

          const Icon = category.icon;
          return (
            <Card
              key={category.name}
              className="glassmorphism hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <Icon className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle className="text-xl">{category.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="pt-4 flex-grow">
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <Badge
                      key={skill.name}
                      variant="secondary"
                      className="text-sm transition-transform hover:scale-110 cursor-default"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
