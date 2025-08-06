"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DriveAlert from "@/components/TextComponents/DriveAlert";
import OptionalParking from "@/components/TextComponents/OptionalParking";
import GpsLogger from "@/components/TextComponents/GpsLogger";
import FourKVideo from "@/components/TextComponents/FourKVideo";
import SharpVision from "@/components/TextComponents/SharpVision";
import DynamicContent from "@/components/TextComponents/DynamicContent";
import FieldOfVision from "@/components/TextComponents/FieldOfVision";

gsap.registerPlugin(ScrollTrigger);

type Stage = "s2" | "s3" | "s4" | "s5" | "s6" | "s7" | "s8" | "s9" | "s10" | "s11" | null;

export default function Model1textOverlay() {
  const [stage, setStage] = useState<Stage>(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#blender2js-scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          console.log("Scroll Progress:", p.toFixed(3));

          if (p === 0) setStage(null);
          else if (p >= 0.0178 && p < 0.0675) setStage("s2");
          else if (p >= 0.0877 && p < 0.1113) setStage("s3");
          else if (p >= 0.2566 && p < 0.2982) setStage("s4");
          else if (p >= 0.3595 && p < 0.4079) setStage("s5");
          else if (p >= 0.469 && p < 0.484) setStage("s6");
          else if (p >= 0.505 && p < 0.525) setStage("s7");
          else if (p >= 0.6386 && p < 0.6459) setStage("s8");
          else if (p >= 0.7119 && p < 0.8419) setStage("s9");
          else if (p >= 0.9420 && p < 0.9529) setStage("s10");
          else if (p >= 0.9779 && p < 1) setStage("s11");
          else setStage(null);
        },
      });
    });
    // gsap.to(overlayRef.current, {
    //   opacity: 0,
    //   y: -100,
    //   scrollTrigger: {
    //     trigger: "#model-scroll-container",
    //     start: "center center",
    //     end: "bottom top",
    //     scrub: true,
    //   },
    //   ease: "power2.in",
    // });

    return () => ctx.revert();
  }, []);

  if (typeof window === "undefined") return null;

  // Custom overlay divs
  const overlays = {
    s2: (
      <div>
        <FourKVideo
          highlightedText="Sharp Footage in Low Light"
          heading="AI Powered Night Vision"
          subheading="An 8MP sensor that captures sharp, detailed video with high sensitivity, preserving image quality even during night drives and low-light conditions."
        />
      </div>
    ),
    s3: (
      <div>
        <FourKVideo
          highlightedText="Details Stay Intact"
          heading="4K Video Resolution"
          subheading="The VREC-Z820DC records in true 4K, producing sharp video that makes plates, signs and unexpected moments easy to identify when needed."
        />
      </div>
    ),
    s4: (
      <div>
        <SharpVision
          highlightedText="Clarity That Goes Further"
          heading="High-Performance Imaging"
          subheading="The VREC-Z820DC uses a Sony STARVIS IMX415 sensor, an f/1.8 aperture and a 7-layer glass lens. Together, they capture sharp, bright footage with accurate detail even in low or uneven lighting."
        />
      </div>
    ),
    s5: (
      <div>
        <DynamicContent
          style="flex-col items-center justify-end sm:items-start sm:justify-center"
          highlightedText="Sharp On-Screen Clarity"
          heading='3.2" IPS Display'
          subheading="The 8.1 cm built-in screen lets you review footage and adjust settings with sharp detail, all without taking up space on your dash."
        />
      </div>
    ),
    s6: (
      <div>
        <p className="text-cherryRed text-xl font-bold text-center">Adapts to Any Light</p>
        <h2 className="text-[56px] mx text-white text-center font-medium">WDR & HDR Recording</h2>
        <p className="text-pretty text-[#ABABAB]  text-center max-w-xl mx-auto">
          It adjusts exposure in real time, preserving visibility and fine detail, so footage stays clear in both bright and low-light conditions.
        </p>
      </div>
    ),
    s7: (
      <div>
        <DriveAlert
          highlightedText="Timely Warnings When It Matters"
          heading="ADAS Alerts"
          subheading="Get audio cues for lane departure and forward collision so you can stay aware, avoid surprises and respond faster on busy roads."
          alert1Image="/images/svgs/laneIcon.svg"
          alert2Image="/images/svgs/collisionIcon.svg"
          alert3Image="/images/svgs/stopnGoIcon.svg"
          alert1="Lane Departure Alert"
          alert2="Forward Collision Alert"
          alert3="Stop & Go Alert"
        />
      </div>
    ),
    s8: (
      <div>
        <p className="text-cherryRed text-xl font-bold text-center">Every Angle Matters</p>
        <h2 className="text-[56px] text-white text-center font-medium">Dual Camera setup</h2>
        <p className="text-pretty text-[#ABABAB] text-center max-w-xl mx-auto">
          The VREC-Z820DC pairs a 4K front and HD rear camera to record both directions at once, delivering clearer evidence and wider coverage.
        </p>
      </div>
    ),
    s9: (
      // <div>asas</div>

      <div>
        <FieldOfVision
          highlightedText="See More Than Just the Lane Ahead"
          heading="139° Wide-Angle Lens"
          subheading="Captures multiple lanes and surrounding details, giving you a broader view of every situation on the road."
        />
      </div>
    ),

    s10: (
      <OptionalParking
        style="flex flex-col items-center sm:items-start justify-center sm:justify-center "
        highlightedText="Stay Secure While Parked"
        heading="Optional Parking Mode"
        subheading="Parking mode requires additional installation of an external Hardwire Kit, which enables power supply to the Dash Camera directly from the vehicle battery."
        description="*Disclaimer: Parking mode requires additional installation of an external Hardwire Kit, which enables power supply to the Dash Camera directly from the vehicle battery."
      />
    ),

    s11: (
      <GpsLogger
        highlightedText="Every Trip Logged"
        heading="GPS Logger"
        subheading="Automatically record your driving routes with GPS logging, making it easy to revisit past trips whenever needed."
        description="*Disclaimer: Route tracking is available only for footage downloaded to the user’s mobile device via the app. An active internet connection is required to display route details on the map."
      />
    ),
  };

  // Custom overlay divs
  const overlayPosition = {
    default: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s2: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s3: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s4: "bottom-32 right-32 z-[100]",
    s5: "top-1/2 left-1/4 z-[100] -translate-x-1/2 -translate-y-1/2",
    s6: "bottom-1 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s7: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s8: "top-32 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s9: "top-1/3 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s10: "top-1/2 left-1/4 z-[100] -translate-x-1/2 -translate-y-1/2",
    s11: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
  };

  const currentOverlay = stage ? overlays[stage] : null;

  return ReactDOM.createPortal(
    <AnimatePresence mode="wait">
      {currentOverlay && stage !== "s9" && (
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }} // easeOutCubic
          className={`fixed transition-all ${overlayPosition[stage || "default"]} pointer-events-none`}
        >
          {currentOverlay}
        </motion.div>
      )}

      {stage === "s9" && (
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className={`fixed transition-all ease-in-out duration-300 w-full ${overlayPosition[stage || "default"]} pointer-events-none`}
        >
          {overlays.s9}
        </motion.div>
      )}
    </AnimatePresence>,

    document.body
  );
}
