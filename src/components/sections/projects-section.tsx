"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Lottie from "react-lottie-player";

const projectsData = [
  {
    title: "Amazon Future Sale Prediction using Power BI",
    description:
      "An interactive Power BI dashboard that analyzes historical Amazon sales data to predict future trends. Provides actionable insights into seasonal peaks, top-performing categories, and data-driven forecasts.",
    keyFeatures: [
      "Forecasting future sales trends using historical data",
      "Identification of seasonal sales patterns and peak periods",
      "Analysis of top-performing product categories and regions",
      "Data cleaning and transformation for accurate reporting",
    ],
    tools: ["Power BI", "SQL", "Excel", "Data Modeling"],
    imageUrl: "https://picsum.photos/seed/sales-pred/600/400",
    link: "#",
  },
  {
    title: "SQL Database Design for E-commerce",
    description:
      "Design and implementation of a relational database for an e-commerce platform. Focuses on efficient data storage, retrieval, and management using SQL.",
    keyFeatures: [
      "Database schema design with normalization",
      "Implementation of complex SQL queries for data retrieval",
      "Optimization of database performance",
    ],
    tools: ["MySQL", "SQL Server", "Database Design"],
    imageUrl: "https://picsum.photos/seed/ecommerce-db/600/400",
    link: "#",
  },
  {
    title: "Heart Disease Prediction",
    description:
      "A machine learning model to predict heart disease risk using Python and classification algorithms. Provides insights into key risk factors and achieves high accuracy.",
    keyFeatures: [
      "Data preprocessing and feature selection",
      "Implementation of classification algorithms",
      "Model evaluation using metrics like accuracy, precision, and recall",
      "Visualization of model performance and feature importance",
    ],
    tools: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Seaborn"],
    imageUrl: "https://picsum.photos/seed/heart-disease/600/400",
    link: "https://github.com/Pradeep1519/Face_recognition_Attendance_system",
  },
  {
    title: "Call Center Customer Satisfaction Dashboard",
    description:
      "An interactive Power BI dashboard to analyze call center performance and customer satisfaction. Provides insights into KPIs like resolution time, feedback trends, and agent performance.",
    keyFeatures: [
      "Visualization of customer satisfaction trends",
      "Analysis of agent performance metrics",
      "Identification of areas for operational improvement",
    ],
    tools: ["Power BI", "DAX", "Data Modeling"],
    imageUrl: "https://picsum.photos/seed/call-center/600/400",
    link: "#",
  },
  {
    title: "Sales Data Analysis with Python",
    description:
      "A comprehensive analysis of sales data using Python. Involves data cleaning, visualization, and insights generation to support business decisions.",
    keyFeatures: [
      "Data cleaning and preprocessing using Pandas",
      "Visualization of sales trends and patterns",
      "Insights generation for business strategy",
    ],
    tools: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    imageUrl: "https://picsum.photos/seed/sales-analysis/600/400",
    link: "#",
  },
];

export default function ProjectsSection() {
  const [amazonAnimationData, setAmazonAnimationData] = useState(null);
  const [sqlDatabaseAnimationData, setSqlDatabaseAnimationData] = useState(null);
  const [heartDiseaseAnimationData, setHeartDiseaseAnimationData] = useState(null);
  const [callCenterAnimationData, setCallCenterAnimationData] = useState(null);
  const [salesAnalysisAnimationData, setSalesAnalysisAnimationData] = useState(null);
  const [newBoyLeftAnimation, setNewBoyLeftAnimation] = useState(null);
  const [newBoyRightAnimation, setNewBoyRightAnimation] = useState(null);

  useEffect(() => {
    // Fetch the Amazon Sale animation file
    fetch("/lottie/amazon.json")
      .then((response) => response.json())
      .then((data) => setAmazonAnimationData(data))
      .catch((error) => console.error("Error loading Amazon animation:", error));

    // Fetch the SQL Database animation file
    fetch("/lottie/SQL-Database.json")
      .then((response) => response.json())
      .then((data) => setSqlDatabaseAnimationData(data))
      .catch((error) => console.error("Error loading SQL Database animation:", error));

    // Fetch the Heart Disease animation file
    fetch("/lottie/heart.json")
      .then((response) => response.json())
      .then((data) => setHeartDiseaseAnimationData(data))
      .catch((error) => console.error("Error loading Heart Disease animation:", error));

    // Fetch the Call Center animation file
    fetch("/lottie/call.json")
      .then((response) => response.json())
      .then((data) => setCallCenterAnimationData(data))
      .catch((error) => console.error("Error loading Call Center animation:", error));

    // Fetch the Sales Data Analysis animation file
    fetch("/lottie/Python.json")
      .then((response) => response.json())
      .then((data) => setSalesAnalysisAnimationData(data))
      .catch((error) => console.error("Error loading Sales Data Analysis animation:", error));

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
    <section id="projects" className="container mx-auto section-padding">
      <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project, index) => (
          <Card
            key={index}
            className="glassmorphism hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1"
          >
            <div className="relative h-48 w-full overflow-hidden">
              {project.title === "Amazon Future Sale Prediction using Power BI" ? (
                amazonAnimationData && (
                  <Lottie
                    loop
                    animationData={amazonAnimationData}
                    play
                    className="w-full h-full"
                  />
                )
              ) : project.title === "SQL Database Design for E-commerce" ? (
                sqlDatabaseAnimationData && (
                  <Lottie
                    loop
                    animationData={sqlDatabaseAnimationData}
                    play
                    className="w-full h-full"
                  />
                )
              ) : project.title === "Heart Disease Prediction" ? (
                heartDiseaseAnimationData && (
                  <Lottie
                    loop
                    animationData={heartDiseaseAnimationData}
                    play
                    className="w-full h-full"
                  />
                )
              ) : project.title === "Call Center Customer Satisfaction Dashboard" ? (
                callCenterAnimationData && (
                  <Lottie
                    loop
                    animationData={callCenterAnimationData}
                    play
                    className="w-full h-full"
                  />
                )
              ) : project.title === "Sales Data Analysis with Python" ? (
                salesAnalysisAnimationData && (
                  <Lottie
                    loop
                    animationData={salesAnalysisAnimationData}
                    play
                    className="w-full h-full"
                  />
                )
              ) : (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </CardHeader>
            <CardContent className="pt-2">
              <strong>Key Features:</strong>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {project.keyFeatures.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <strong className="mt-4 block">Tools Used:</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tools.map((tool, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-4">
              <Button variant="link" asChild className="p-0 h-auto text-primary hover:underline">
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  View More <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 hover:translate-x-1" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

