"use client";

import { useState, useEffect } from "react";
import Lottie from "react-lottie-player";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function AboutSection() {
  const [photoBackgroundAnimationData, setPhotoBackgroundAnimationData] = useState(null);
  const [newBoyLeftAnimation, setNewBoyLeftAnimation] = useState(null);
  const [newBoyRightAnimation, setNewBoyRightAnimation] = useState(null);

  useEffect(() => {
    // Fetch the Photo Background animation file
    fetch("/lottie/photo-background.json")
      .then((response) => response.json())
      .then((data) => setPhotoBackgroundAnimationData(data))
      .catch((error) => console.error("Error loading Photo Background animation:", error));
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
    <section id="about" className="relative bg-gray-100 dark:bg-gray-900 py-16">
      {/* Content */}
      <div className="container mx-auto relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
          About Me
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1 flex justify-center relative">
            {/* Photo Background Animation */}
            {photoBackgroundAnimationData && (
              <Lottie
                loop
                animationData={photoBackgroundAnimationData}
                play
                className="absolute -top-20 -left-30 w-[700px] h-[600px] pointer-events-none opacity-70 z-0"
              />
            )}
            {/* Photo */}
            <Image
              src="/images/photo.jpg" // Corrected path
              alt="Pradeep Kumar"
              width={350}
              height={350}
              className="rounded-full shadow-lg border-4 border-primary/20 object-cover transition-transform duration-300 hover:scale-105 relative z-10"
            />
          </div>
          <div className="md:col-span-2">
            <Card className="glassmorphism transition-shadow hover:shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">
                  Pradeep Kumar
                </CardTitle>
              </CardHeader>
              <CardContent className="text-lg text-gray-700 dark:text-gray-300 space-y-4">
                <p>
                  Highly motivated and detail-oriented Data Analyst and SQL Developer, passionate
                  about leveraging data to drive business decisions. I graduated with a B.Tech in
                  Computer Science Engineering in 2024.
                </p>
                <p>
                  My journey into data began with an internship at{" "}
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    Codewave Solutions Pvt Ltd
                  </span>
                  , where I honed my skills in data analysis and visualization as a Data Analyst
                  Intern.
                </p>
                <p>
                  Currently, I am applying my expertise as a{" "}
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    SQL Developer
                  </span>
                  , focusing on creating efficient database structures and extracting valuable
                  insights through complex queries. I thrive in collaborative environments and am
                  proficient in Agile methodologies.
                </p>
                <p>
                  I'm constantly exploring new technologies and techniques in the data science
                  field, always eager to learn and contribute to impactful projects.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
