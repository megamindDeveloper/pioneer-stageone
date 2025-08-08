"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FourKVideo from "../TextComponents/FourKVideo";
import SharpVision from "../TextComponents/SharpVision";
import DynamicContent from "../TextComponents/DynamicContent";
import GSensor from "../TextComponents/GSensor";
import DriveAlert from "../TextComponents/DriveAlert";
import OptionalParking from "../TextComponents/OptionalParking";
import GpsLogger from "../TextComponents/GpsLogger";
gsap.registerPlugin(ScrollTrigger);

type Stage = "s3" | "s4" | "s5" | "s6" | "s7" | "s8" | "s9" | "s10" | "s11" | "s12" | null;

export default function Model2LensOverlayText() {
  const [stage, setStage] = useState<Stage>(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#model-scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          console.log("Scroll Progress:", p.toFixed(3));

          if (p === 0) setStage(null);
          else if (p > 0 && p < 0.041) setStage("s3");
          else if (p >= 0.137 && p < 0.237) setStage("s4");
          else if (p >= 0.272 && p < 0.338) setStage("s5");
          else if (p >= 0.393 && p < 0.41) setStage("s6");
          else if (p >= 0.449 && p < 0.475) setStage("s7");
          else if (p >= 0.48 && p < 0.52) setStage("s8");
          else if (p >= 0.609 && p < 0.63) setStage("s9");
          else if (p >= 0.68 && p < 0.76) setStage("s10");
          else if (p >= 0.861 && p < 0.958) setStage("s11");
          else if (p >= 0.982 && p < 0.991) setStage("s12");
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
          highlightedText="STARVIS 2 Sensor + HDR"
          heading="Sharp Vision in Every Frame"
          subheading="Equipped with Sony's STARVIS 2 sensor and HDR processing, the VREC-H520DC devilvers clear, balanced video with improved constrast and visibility, especially in challenging lighting "
        />
      </div>
    ),
    s5: (
      <div>
        <DynamicContent
          style="flex-col items-center justify-end sm:items-start sm:justify-center"
          highlightedText="Consistent Clarity in Any Light"
          heading="High Dynamic Range"
          subheading="HDR keeps exposure balanced so footage stays sharp and detailed whether you're driving under bright sunlight, through shadows or into low-light conditions."
        />
      </div>
    ),
    s6: (
      <div>
        <GSensor
          style="flex items-end sm:items-center justify-center sm:justify-end "
          highlightedText="Automatic Event Recording"
          heading="Built-in G-Sensor"
          subheading="Stay protected with built-in G-sensor technology that automatically locks important footage during emergencies."
        />
      </div>
    ),
    s7: (
      <div>
        <DynamicContent
          style="flex-col items-center justify-end sm:items-start sm:justify-center"
          highlightedText="Sharp On-Screen Clarity"
          heading='3.2" IPS Display'
          subheading="The 8.1 cm built-in screen lets you review footage and adjust settings with sharp detail, all without taking up space on your dash."
        />
      </div>
    ),
    s8: (
      <div>
        <DriveAlert
          highlightedText="ADAS Enabled"
          heading="Smart Alerts for Safer Driving"
          subheading="Smart Alerts for Safer Driving Get audio alerts for lane departure, forward collision and stop-and-go alert so you stay aware of your surroundings and respond faster to sudden changes on the road."
          alert1Image="/Images/svgs/laneIcon.svg"
          alert2Image="/Images/svgs/collisionIcon.svg"
          alert3Image="/Images/svgs/stopnGoIcon.svg"
          alert1="Lane Departure Alert"
          alert2="Forward Collision Alert"
          alert3="Stop & Go Alert"
        />
      </div>
    ),
    s9: (
      <div>
        <p className="text-cherryRed text-xl font-bold text-center">Dual Camera Setup</p>
        <h2 className="text-[56px] text-white text-center font-medium">Front and Rear in Focus</h2>
        <p className="text-pretty text-[#ABABAB] text-center max-w-xl mx-auto">
          The VREC‑H520DC captures your journey from both ends with 2K clarity in front and Full HD behind, giving you balanced, high-quality footage
          wherever the road takes you.
        </p>
      </div>
    ),

    s10: (
      // <div>
      //   <FieldOfVision

      //     highlightedText="See More Than Just the Lane Ahead"
      //     heading="139° Wide-Angle Lens"
      //     subheading="Captures multiple lanes and surrounding details, giving you a broader view of every situation on the road."

      //   />
      // </div>
      <div className=""></div>
    ),

    s11: (
      <OptionalParking
        style="flex flex-col items-center sm:items-start justify-center sm:justify-center "
        highlightedText="Stay Secure While Parked"
        heading="Optional Parking Mode"
        subheading="Parking mode requires additional installation of an external Hardwire Kit, which enables power supply to the Dash Camera directly from the vehicle battery."
        description="*Disclaimer: Parking mode requires additional installation of an external Hardwire Kit, which enables power supply to the Dash Camera directly from the vehicle battery."
      />
    ),
    s12: (
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
    s3: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s4: "bottom-24 right-24 z-[100]",
    s5: "top-1/2 left-1/4 z-[100] -translate-x-1/2 -translate-y-1/2",
    s6: "top-1/2 right-1 z-[100] -translate-x-1/2 -translate-y-1/2",
    s7: "top-140 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s8: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s9: "top-32 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s10: "top-1/2 left-1/4 z-[100] -translate-x-1/2 -translate-y-1/2",
    s11: "top-1/2 left-70 z-[100] -translate-x-1/2 -translate-y-1/2",
    s12: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
  };

  const currentOverlay = stage ? overlays[stage] : null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {currentOverlay && (
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 2, y: 0 }}
          exit={{ opacity: 0, y: 1 }}
          transition={{ duration: 0.4 }}
          className={`fixed transition-all ease-in-out duration-300 ${overlayPosition[stage || "default"]} pointer-events-none`}
        >
          {currentOverlay}
        </motion.div>
        // <div
        //   className={`fixed transition-all ease-in-out duration-300 ${overlayPosition[stage || "default"]
        //     } pointer-events-none`}
        // >
        //   {currentOverlay}
        // </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
