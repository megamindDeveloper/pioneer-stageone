"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Stage = "s3" | "s4" | "s5" | null;

export default function LensOverlayContentDivs() {
  const [stage, setStage] = useState<Stage>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#model1-scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;

          if (p < 0.2) setStage("s3");
          else if (p >= 0.2 && p < 0.5) setStage("s4");
          else if (p >= 0.5 && p < 0.9) setStage("s5");
          else setStage(null);
        },
      });
    });

    return () => ctx.revert();
  }, []);

  if (typeof window === "undefined") return null;

  // Custom overlay divs
  const overlays = {
    s3: (
      <div className="bg-red-500 p-6 rounded-xl text-white shadow-xl">
        This is S3 content
      </div>
    ),
    s4: (
      <div className="bg-blue-500 p-6 rounded-xl text-white shadow-xl">
        This is S4 content
      </div>
    ),
    s5: (
      <div className="bg-green-500 p-6 rounded-xl text-white shadow-xl">
        This is S5 content
      </div>
    ),
    s6: (
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
