"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const features = [
  {
    id: "innovation",
    title: "Trusted Innovation for Over 85 Years",
    content: `For over 85 years, Pioneer has led in precision engineering and innovation. Our dashcams are built for real drivers, combining reliable performance, smart safety features, and clear recording that never misses a moment.`,
    image: "/featureImages/feature1.png",
  },
  {
    id: "control",
    title: "Control That Goes Beyond the Camera",
    content: `With intuitive controls and app connectivity, you stay in charge—before, during, and after the drive.`,
    image: "/featureImages/feature2.png",
  },
  {
    id: "conditions",
    title: "Built for Real-World Conditions",
    content: `Rugged and reliable, these dashcams are tested for heat, vibration, and unexpected bumps.`,
    image: "/featureImages/feature3.png",
  },
];

export default function FeatureAccordion() {
  const [activeId, setActiveId] = useState("innovation");

  const currentFeature = features.find((f) => f.id === activeId);

  return (
    <section className="bg-black text-white p-8 md:p-12 rounded-3xl max-w-7xl xl:max-w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Accordion Content */}
      <div>
        {features.map((feature) => {
          const isActive = feature.id === activeId;
          return (
            <div
              key={feature.id}
              className="border-b border-white/20 py-6 cursor-pointer"
              onClick={() => setActiveId(feature.id)}
            >
              <div className="flex justify-between items-center text-lg font-medium">
              <h2 className="text-2xl md:text-3xl font-medium lg:text-[32px] mb-3 whitespace-pre-line">{feature.title}</h2>
                <span className="text-2xl">
                  {isActive ? (
                    <motion.span
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      –
                    </motion.span>
                  ) : (
                    "+"
                  )}
                </span>
              </div>
              <AnimatePresence>
                {isActive && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-4 text-[#ABABAB] whitespace-pre-line"
                  >
                    {feature.content}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Image Section */}
      <div className="relative w-full h-64 md:h-96">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFeature?.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={currentFeature?.image || ""}
              alt={currentFeature?.title || ""}
              fill
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
