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
    content: `With the Pioneer ZenVue app, you can instantly view, download, and share your footage, turning your smartphone into a seamless command center for your dashcam.`,
    image: "/featureImages/feature2.png",
  },
  {
    id: "conditions",
    title: "Built for Real-World Conditions",
    content: `With STARVIS night vision, GPS, ADAS and 24/7 parking protection, Pioneer dashcams deliver clear footage, smart safety and all-round confidence in one seamless system.`,
    image: "/featureImages/feature3.png",
  },
];

export default function FeatureAccordion() {
  const [activeId, setActiveId] = useState("innovation");

  const currentFeature = features.find((f) => f.id === activeId);

  return (
    <section className="bg-black text-white p-8 md:p-12 rounded-3xl max-w-6xl  mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-20">
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
                    <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="15.8203" y1="0.380859" x2="15.8203" y2="30.3809" stroke="#E2E2E2" strokeWidth="3"/>
                    <line x1="30.5703" y1="15.6309" x2="0.570312" y2="15.6309" stroke="#E2E2E2" strokeWidth="3"/>
                    </svg>
                    
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
