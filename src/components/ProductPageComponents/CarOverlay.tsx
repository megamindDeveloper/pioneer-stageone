"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type Stage = "s3" | "s4" | "s5" | null;


export default function CarOverlayContentDivs() {
  const [stage, setStage] = useState<Stage>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#model2-scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
        
          if (p < 0.1) {
            setStage("s3");
          } else if (p >= 0.1 && p < 0.19) {
            setStage(null); // blank zone
          } else if (p >= 0.2 && p < 0.25) {
            setStage("s4");
          } else if (p >= 0.6 && p < 0.8) {
            setStage(null); // another blank zone
          } else if (p >= 0.8) {
            setStage("s5");
          } else {
            setStage(null);
          }
        }        
      });
    });

    return () => ctx.revert();
  }, []);

  if (typeof window === "undefined") return null;

  // Custom overlay divs
  const overlays = {
    s33: (
      <section className="min-h-screen flex flex-col justify-end items-center px-4 py-12 text-center text-white">
      <div className="max-w-xl">
        <p className="text-sm text-red-500 mb-2">Adapts to Any Light</p>
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">
          WDR & HDR Recording
        </h2>
        <p className="text-sm text-gray-400">
          It adjusts exposure in real time, preserving visibility and fine detail, so
          footage stays clear in both bright and low-light conditions.
        </p>
      </div>
    </section>
    ),
    s3: (
      <section className="min-h-screen bg-none text-white flex flex-col justify-between px-6 py-10 text-center">
      
      {/* Top Icon */}
      <div className="pt-20">
        <Image
          src="/images/svgs/dangerIcon.svg" // Replace with your warning icon path
          alt="Warning Icon"
          width={80}
          height={80}
          className="mx-auto"
        />
      </div>

      {/* Bottom Content */}
      <div className="flex flex-col items-center space-y-15 pb-8">
        {/* Headings */}
        <div>
          <p className="text-red-500 text-sm font-medium mb-3">
            Built to Notice Before You Do
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Advanced Driving Alerts
          </h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            The VREC-Z820DC monitors lane position, vehicle distance, and traffic flow to deliver timely alerts and help you stay in control.
          </p>
        </div>

        {/* Alert Features */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-13">
          {/* Lane Departure Alert */}
          <div className="flex flex-col items-center space-y-2">
            <Image
              src="/images/svgs/laneIcon.svg"
              alt="Lane Departure"
              width={60}
              height={60}
            />
            <p className="text-white font-medium text-sm">Lane Departure Alert</p>
          </div>

          {/* Forward Collision Alert */}
          <div className="flex flex-col items-center space-y-2">
            <Image
              src="/images/svgs/collisionIcon.svg"
              alt="Forward Collision"
              width={60}
              height={60}
            />
            <p className="text-white font-medium text-sm">Forward Collision Alert</p>
          </div>

          {/* Stop & Go Alert */}
          <div className="flex flex-col items-center space-y-2">
            <Image
              src="/images/svgs/stopnGoIcon.svg"
              alt="Stop and Go"
              width={60}
              height={60}
            />
            <p className="text-white font-medium text-sm">Stop & Go Alert</p>
          </div>
        </div>
      </div>
    </section>
    ),
    s4: (
      <section className="relative bg-black min-h-screen flex items-center justify-center px-6 md:px-16 overflow-hidden">
      {/* Left Trapezoid */}
      <div className="absolute inset-y-0 left-0 w-1/2 z-0">
        <div className="w-full h-full bg-[#111] clip-left" />
      </div>
    
      {/* Right Trapezoid */}
      <div className="absolute inset-y-0 right-0 w-1/2 z-0">
        <div className="w-full h-full bg-[#111] clip-right" />
      </div>
    
      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col md:flex-row w-full justify-between items-end">
        {/* Left text block */}
        <div className="md:mb-28">
          <p className="text-red-500 text-sm text-center font-medium mb-2">
            Comprehensive Coverage
          </p>
          <h2 className="text-3xl text-center md:text-5xl font-bold leading-tight text-white">
            137° Wide-Angle<br />Lens
          </h2>
        </div>
    
        {/* Right paragraph */}
        <div className="text-gray-400 text-sm text-center md:max-w-sm md:mb-32">
          <p>
            Gives you a broader view of the road, capturing side<br />
            lanes, nearby traffic, and details that narrower lenses<br />
            might miss.
          </p>
        </div>
      </div>
    
      {/* Tailwind clip-path utilities */}
      <style jsx>{`
        .clip-left {
          clip-path: polygon(0 0, 90% 0, 60% 100%, 0% 100%);
        }
        .clip-right {
          clip-path: polygon(10% 0, 100% 0, 100% 100%, 40% 100%);
        }
      `}</style>
    </section>
    
    ),
    s5: (
      <div className="bg-green-500 p-6 rounded-xl text-white shadow-xl">
        This is S5 erferfecontent
      </div>
    ),
  };

  const currentOverlay = stage ? overlays[stage] : null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {currentOverlay && (
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="fixed top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          {currentOverlay}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
