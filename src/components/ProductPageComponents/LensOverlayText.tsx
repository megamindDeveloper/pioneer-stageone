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

          if (p === 0) setStage(null);
          else if (p > 0 && p < 0.2) setStage("s3");
          else if (p >= 0.2 && p < 0.7) setStage("s4");
          else if (p >= 0.75 && p < 0.9) setStage("s5");
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
      <div>
        <p className="text-cherryRed text-xl font-bold text-center">
          Details Stay Intact
        </p>
        <h2 className="text-[56px] text-white text-center font-medium">
          4K Video Resolution
        </h2>
        <p className="text-pretty text-[#ABABAB] text-center max-w-lg mx-auto">
          The VREC-Z820DC records in true 4K, producing sharp video that makes
          plates, signs, and unexpected moments easy to identify when needed.
        </p>
      </div>
    ),
    s4: (
      <div>
        <p className="text-cherryRed text-xl font-bold text-center">
          Clarity That Goes Further
        </p>
        <h2 className="text-[56px] text-white text-center font-medium">
          High-Performance Imaging
        </h2>
        <p className="text-pretty text-[#ABABAB] text-center max-w-xl mx-auto">
          The VREC-Z820DC uses a Sony STARVIS IMX415 sensor, an f/1.8 aperture,
          and a 7-layer glass lens. Together, they capture sharp, bright footage
          with accurate detail even in low or uneven lighting.
        </p>
      </div>
    ),
    s5: (
      <div>
        <p className="text-cherryRed text-xl font-bold text-center">
          Sharp On-Screen Clarity
        </p>
        <h2 className="text-[56px] text-white text-center font-medium">
          3.2" IPS Display
        </h2>
        <p className="text-pretty text-[#ABABAB] text-center max-w-sm mx-auto">
          The 8.1 cm built-in screen lets you review footage and adjust settings
          with sharp detail, all without taking up space on your dash.
        </p>
      </div>
    ),
  };

  // Custom overlay divs
  const overlayPosition = {
    default: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s3: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s4: "bottom-24 right-24 z-[100]",
    s5: "top-1/2 left-1/4 z-[100] -translate-x-1/2 -translate-y-1/2",
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
          className={`fixed transition-all ease-in-out duration-300 ${
            overlayPosition[stage || "default"]
          } pointer-events-none`}
        >
          {currentOverlay}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
