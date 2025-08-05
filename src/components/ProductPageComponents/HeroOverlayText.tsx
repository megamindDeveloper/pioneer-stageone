"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Stage = "s1" | null;

type OverlayContent = {
  title: string;
  heading: string;
  description: string;
};

type HeroOverlayTextProps = {
  overlays: {
    [K in Stage]?: OverlayContent;
  };
};

export default function HeroOverlayText({ overlays }: HeroOverlayTextProps) {
  const [stage, setStage] = useState<Stage>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#model0-scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;

          if (p < 0.2) setStage(null);
          else if (p >= 0.2 && p < 0.5) setStage(null);
          else if (p >= 0.5 && p < 0.9) setStage("s1");
          else setStage(null);
        },
      });
    });

    return () => ctx.revert();
  }, []);

  if (typeof window === "undefined") return null;

  const currentOverlay = stage && overlays[stage];

  return ReactDOM.createPortal(
    <AnimatePresence>
      {currentOverlay && (
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="fixed top-1/2 mx-auto text-center z-[100] w-[900px] -translate-x-1/2 -translate-y-1/2 pointer-events-none left-1/2 px-32"
        >
          <div>
            <p className="text-cherryRed text-[16px] font-bold text-center">
              {currentOverlay.title}
            </p>
            <h2 className="text-[48px] text-white text-center font-medium">
              {currentOverlay.heading}
            </h2>
            <p className="text-pretty text-[16px] text-[#ABABAB] text-center max-w-lg mx-auto">
              {currentOverlay.description}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}