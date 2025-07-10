"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Typography } from "@/components/CommonComponents/Typography/Typography";

const features = [
  {
    id: "innovation",
    title: "Trusted Innovation for Over \n 85 Years",
    content: `For over 85 years, Pioneer has led in precision engineering and innovation. Our dashcams are built for real drivers, combining reliable performance, smart safety features, and clear recording that never misses a moment.`,
    image: "/featureImages/feature1.png",
    imageClass: "object-cover object-center w-", // 👈 custom class
  },
  {
    id: "control",
    title: "Control That Goes Beyond\n the Camera",
    content: `With the Pioneer ZenVue app, you can instantly view, download, and share your footage, turning your smartphone into a seamless command center for your dashcam.`,
    image: "/featureImages/feature2.png",
    imageClass: "object-cover object-center", // 👈 different class
  },
  {
    id: "conditions",
    title: "Built for Real-World\n Conditions",
    content: `With STARVIS night vision, GPS, ADAS and 24/7 parking protection, Pioneer dashcams deliver clear footage, smart safety and all-round confidence in one seamless system.`,
    image: "/featureImages/feature3.png",
    imageClass: "object-contain object-center", // 👈 fallback class
  },
];

export default function FeatureAccordion() {
  const [activeId, setActiveId] = useState("innovation");

  const currentFeature = features.find((f) => f.id === activeId);

  return (
    <section className="relative bg-black text-white px-4 pl-20 py-12 md:py-16 rounded-3xl max-w-6xl mx-auto mt-20 overflow-hidden">
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Accordion Content */}
        <div className="relative z-20">
          {features.map((feature) => {
            const isActive = feature.id === activeId;
            return (
              <div key={feature.id} className="border-b border-white/20 py-6 cursor-pointer" onClick={() => setActiveId(feature.id)}>
                <div className="flex justify-between items-center text-lg font-medium">
                  <Typography variant="body" className="text-white  t whitespace-pre-line">
                    {feature.title}
                  </Typography>
                  <span className="text-2xl">
                    {isActive ? (
                      <motion.span initial={{ rotate: 0 }} animate={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                        <svg width="31" height="4" viewBox="0 0 31 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g opacity="0.25">
                            <line x1="30.7559" y1="2.43555" x2="0.755859" y2="2.43554" stroke="#E2E2E2" strokeWidth="3" />
                          </g>
                        </svg>
                      </motion.span>
                    ) : (
                      <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="15.8203" y1="0.380859" x2="15.8203" y2="30.3809" stroke="#E2E2E2" strokeWidth="3" />
                        <line x1="30.5703" y1="15.6309" x2="0.570312" y2="15.6309" stroke="#E2E2E2" strokeWidth="3" />
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
                      transition={{
                        duration: 0.6,
                        ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for smoother curve
                      }}
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
      </div>

      {/* Image Section - absolutely positioned on right */}
      <div className="absolute top-0 right-0 w-1/2 -mr-4 h-full z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFeature?.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1], // same easing for smooth fade
            }}
            className="absolute inset-0"
          >
            {/* ✅ Wrapper to support fill layout */}
            {currentFeature?.id === "innovation" && (
              <div className="relative w-full h-full pt-32">
                <Image
                  src={currentFeature?.image || ""}
                  alt={currentFeature?.title || ""}
                  width={500}
                  height={100}
                  className="object- object-center"
                />
                {/* Overlay */}
                {currentFeature?.id === "innovation" && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 pointer-events-none" />
                )}
              </div>
            )}
            {currentFeature?.id !== "innovation" && (
              <div className="relative w-full h-full">
                <Image src={currentFeature?.image || ""} alt={currentFeature?.title || ""} fill className={currentFeature?.imageClass} />

                {currentFeature?.id === "control" && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-transparent to-transparent z-10 pointer-events-none" />
                )}
                {currentFeature?.id === "conditions" && (
                  <div className="absolute inset-0 bg-gradient-radial from-black/60 to-transparent z-10 pointer-events-none" />
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
