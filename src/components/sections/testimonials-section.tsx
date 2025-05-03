"use client"; // Add this directive at the top

import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";

export default function TestimonialsSection() {
  const [newBoyLeftAnimation, setNewBoyLeftAnimation] = useState(null);
  const [newBoyRightAnimation, setNewBoyRightAnimation] = useState(null);

  // Load the new Lottie JSON files asynchronously
  useEffect(() => {
    fetch("/lottie/boy-waiting.json")
      .then((res) => res.json())
      .then((data) => setNewBoyLeftAnimation(data))
      .catch((err) => console.error("Failed to load boy-waiting.json:", err));

    fetch("/lottie/boy-speaking.json")
      .then((res) => res.json())
      .then((data) => setNewBoyRightAnimation(data))
      .catch((err) => console.error("Failed to load boy-speaking.json:", err));
  }, []);

  return (
    <section
      id="testimonials"
      className="relative container mx-auto section-padding bg-transparent text-white rounded-lg overflow-hidden flex flex-col items-center justify-center text-center"
    >
      <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Testimonials
      </h1>

      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 animate-color-shift mb-8">
        Coming Soon
      </h2>

      {/* Animated Boy - Bottom Left */}
      {newBoyLeftAnimation && (
        <div className="absolute bottom-0 left-0 mb-4 ml-4">
          <Lottie
            loop
            animationData={newBoyLeftAnimation}
            play
            className="w-48 h-48"
          />
          <div className="absolute top-0 left-full transform -translate-x-1/2 -translate-y-20 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg p-6 w-64 text-sm flex items-center space-x-2">
            <div className="text-xl">🤔</div>
            <p className="italic">How long do I have to wait?</p>
          </div>
        </div>
      )}

      {/* Animated Boy - Bottom Right */}
      {newBoyRightAnimation && (
        <div className="absolute bottom-0 right-0 mb-4 mr-4">
          <Lottie
            loop
            animationData={newBoyRightAnimation}
            play
            className="w-48 h-48"
          />
          <div className="absolute top-0 right-full transform translate-x-1/2 -translate-y-20 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg p-6 w-64 text-sm flex items-center space-x-2">
            <div className="text-xl">💬</div>
            <p className="italic">Wait… my dream company is on the way!</p>
          </div>
        </div>
      )}
    </section>
  );
}
