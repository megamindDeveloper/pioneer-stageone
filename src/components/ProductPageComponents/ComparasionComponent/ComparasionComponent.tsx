"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

import { IconDotsVertical } from "@tabler/icons-react";

import { cn } from "@/lib/utils";
import { SparklesCore } from "./Sparkles";

const tabs = [
  {
    title: "Drive late?",
    image1: "/images/GLOW_BEFORE.webp",
    image2: "/images/GLOW_AFTER.webp",
    headline: "Designed for the Details",
    subtext:
      "Most dashcams blur the truth at night. The Z820DC, equipped with night vision AI and a STARVIS sensor, captures license plates, movements and moments even in low light.",
  },
  {
    title: "On the road daily?",
    image1: "/images/NOISE_BEFORE.webp",
    image2: "/images/NOISE_AFTER.webp",
    headline: "Clarity That Keeps Up With Your Commute",
    subtext: "From sharp sunlight to shadowy underpasses, the Sony STARVIS sensor adapts in real time—handling glare, contrast, and light shifts with ease for clear, consistent footage in every driving condition.",
  },
  {
    title: "Prefer Dual 4K Coverage?",
    image1: "/images/car-was-broken.webp",
    image2: "/images/car-was-broken.webp ",
    headline: "Coverage That Keeps Both Ends Clear",
    subtext:
      "The VREC-Z820DC captures ultra-sharp 4K footage from the front and Full HD from the rear. With dual cameras working together, you get full-scene clarity, whether you're on the move or parked.",
  },
];

export const Compare = () => {
  const [sliderXPercent, setSliderXPercent] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const currentTab = tabs[activeTab];

  const handleStart = (clientX: number) => setIsDragging(true);
  const handleEnd = () => setIsDragging(false);

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = (x / rect.width) * 100;
    requestAnimationFrame(() => {
      setSliderXPercent(Math.max(0, Math.min(100, percent)));
    });
  };

  return (
    <section className="w-full bg-[#020202ff] text-white flex flex-col  items-center py-16 px-4">
      {/* Heading */}
      <div className="text-center  max-w-xl mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">See What Most Cameras Miss</h2>
        <p className=" text-[#ABABAB] text-[13px] w-full md:text-base">
          Real footage in real conditions. The VREC-Z820DC doesn’t just record, it gives you clarity and context.
        </p>
      </div>

      {/* Conditional Rendering */}
      <div className="w-full  max-w-7xl h-[80vh] rounded-xl overflow-hidden bg-gradient-to-t from-black via-black/60 relative">
        {activeTab !== 2 ? (
          <div
            ref={sliderRef}
            className="relative w-full h-[800px] overflow-hidden"
            style={{ cursor: "col-resize" }}
            onMouseDown={(e) => handleStart(e.clientX)}
            onMouseUp={handleEnd}
            onMouseMove={(e) => isDragging && handleMove(e.clientX)}
            onMouseLeave={handleEnd}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onTouchEnd={handleEnd}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          >
            {/* Handlebar */}
            <motion.div
              className="h-full w-px absolute top-0 z-30 bg-gradient-to-b from-transparent via-white to-transparent"
              style={{ left: `${sliderXPercent}%` }}
              transition={{ duration: 0 }}
            >
              <div className="w-36 h-full [mask-image:radial-gradient(100px_at_left,white,transparent)] absolute top-1/2 -translate-y-1/2 left-0 bg-gradient-to-r from-white/40 via-transparent to-transparent opacity-50" />
              <div className="w-10 h-1/2 [mask-image:radial-gradient(50px_at_left,white,transparent)] absolute top-1/2 -translate-y-1/2 left-0 bg-gradient-to-r from-white/60 via-transparent to-transparent opacity-100" />
              <div className="w-10 h-3/4 top-1/2 -translate-y-1/2 absolute -right-10 [mask-image:radial-gradient(100px_at_left,white,transparent)]">
                <MemoizedSparklesCore
                  background="transparent"
                  minSize={0.4}
                  maxSize={1}
                  particleDensity={800}
                  className="w-full h-full"
                  particleColor="#FFFFFF"
                />
              </div>
              <div className="h-5 w-5 rounded-md top-1/2 -translate-y-1/2 bg-white z-30 -right-2.5 absolute flex items-center justify-center shadow-lg">
                <IconDotsVertical className="h-4 w-4 text-black" />
              </div>
            </motion.div>

            {/* Before Image */}

            <motion.div
              className="absolute inset-0 z-20 w-full h-full overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)` }}
              transition={{ duration: 0 }}
            >
              <img src={currentTab.image1} alt="Before" className="object-cover w-full h-full select-none" draggable={false} />
            </motion.div>

            {/* After Image */}
            <img
              src={currentTab.image2}
              alt="After"
              className="absolute top-0 left-0 z-[] object-cover w-full h-full select-none "
              draggable={false}
            />

            {/* Overlay text */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-50 px-4 w-[70%]">
              <h3 className="text-white text-lg md:text-2xl font-semibold">{currentTab.headline}</h3>
              <p className="text-white text-sm md:text-base mt-2">{currentTab.subtext}</p>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full bg-gradient-to-t from-black via-black/60 to-transparent">
            <img src={currentTab.image2} alt="Full View" className="absolute top-0 left-0 w-full h-full object-cover z-10" draggable={false} />
            {/* Overlay below text */}
            <div className="absolute inset-0 z-[15] bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

            {/* Text should now sit above the overlay */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-20 px-4 w-[70%]">
              <h3 className="text-white text-lg md:text-2xl font-semibold">{currentTab.headline}</h3>
              <p className="text-white text-sm md:text-base mt-2">{currentTab.subtext}</p>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-30 space-x-28 mt-12 py-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={cn(
              "relative font-semibold text-sm transition-all duration-300",
              activeTab === index
                ? "text-white after:content-[''] cursor-pointer after:absolute after:left-1/2 after:-translate-x-1/2    after:bottom-[-8px] after:w-[180px] after:h-[2px] after:bg-white after:rounded-full"
                : "text-gray-400 "
            )}
          >
            {tab.title}
          </button>
        ))}
      </div>
    </section>
  );
};

const MemoizedSparklesCore = React.memo(SparklesCore);
