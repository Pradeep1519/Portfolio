"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
// import Lottie from "react-lottie-player";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });


export default function HeroSection() {
  const [animationData, setAnimationData] = useState(null); // State to hold animation data
  const [currentRole, setCurrentRole] = useState("Data Analyst");
  const roles = ["Data Analyst", "Business Analyst"];
  const [scrollOpacity, setScrollOpacity] = useState(1); // State for scroll button opacity
  const tiltRef = useRef(null);

  // Fetch Lottie animation data
  useEffect(() => {
    if (typeof window !== "undefined") {
      fetch("/lottie/hero-background.json")
        .then((response) => response.json())
        .then((data) => setAnimationData(data))
        .catch((error) => console.error("Error loading animation:", error));
    }
  }, []);

  // Rotate roles every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prevRole) =>
        roles[(roles.indexOf(prevRole) + 1) % roles.length]
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle scroll opacity
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const maxScroll = 100; // Maximum scroll position for full opacity fade-out
        const currentScroll = window.scrollY;
        const opacity = Math.max(0, 1 - currentScroll / maxScroll); // Calculate opacity
        setScrollOpacity(opacity);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Initialize VanillaTilt
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("vanilla-tilt").then((VanillaTilt) => {
        if (tiltRef.current) {
          VanillaTilt.default.init(tiltRef.current, {
            max: 25,
            speed: 400,
            glare: true,
            "max-glare": 0.5,
          });
        }
      });
    }
  }, []);

  return (
    <section
      id="home"
      className="relative w-full h-[calc(100vh-4rem)] flex items-center justify-center text-center overflow-hidden section-padding"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Animated Blobs */}
        <div className="blob"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>

        {/* Lottie Animation */}
        {animationData && (
          <Lottie
            loop
            animationData={animationData}
            play
            className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        <h1
          ref={tiltRef}
          className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6"
        >
          <span className="block">
            Hi, I&apos;m{" "}
            <span className="gradient-text animate-gradient">Pradeep</span>
          </span>
          <span className="block text-primary mt-4">
            <span className="animated-role animate-fade">{currentRole}</span>
          </span>
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-lg md:text-xl text-black dark:text-white/90">
          Transforming data into actionable insights and building robust database solutions.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" asChild className="transition-transform hover:scale-105 shadow-lg">
            <Link href="#projects">View My Work</Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="transition-transform hover:scale-105 shadow-lg">
            <a href="/resume.pdf" download="Pradeep_Kumar_Resume.pdf">
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll-Down Arrow */}
      <div
        className="absolute bottom-10 animate-bounce transition-opacity duration-300"
        style={{ opacity: scrollOpacity }}
      >
        <a href="#about" className="text-primary text-2xl">
          ↓ Scroll Down
        </a>
      </div>
    </section>
  );
}

