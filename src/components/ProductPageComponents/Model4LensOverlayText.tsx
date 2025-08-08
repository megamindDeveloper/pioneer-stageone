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
import OptionalParking from "../TextComponents/OptionalParking";


gsap.registerPlugin(ScrollTrigger);

type Stage = "s3" | "s4" | "s5" | "s6" | "s7" | "s8" | "s9" | "s10" | "s11" | null;

export default function Model4LensOverlayText() {
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
          else if (p > 0 && p < 0.052) setStage("s3");
          else if (p >= 0.079 && p < 0.144) setStage("s4");
          else if (p >= 0.229 && p < 0.264) setStage("s9");
          else if (p >= 0.375 && p < 0.44) setStage("s5");
          else if (p >= 0.549 && p < 0.89) setStage("s6");
          else if (p >= 0.931 && p < 0.999) setStage("s10");
          // else if (p >= 0.976 && p < 0.999) setStage("s7");
          // else if (p >= 0.585 && p < 0.595) setStage("s8");
          // else if (p >= 0.980 && p < 0.991) setStage("s11");
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
          highlightedText="Sharper Footage in Any Light"
          heading="1.5K Recording with WDR"
          subheading="The VREC-H120SC captures clear, steady video in all kinds of light, combining 1.5K resolution with smart brightness control for better visibility day and night.(Resolution can be enabled through the ZenVue app.)"
        />
      </div>
    ),
    s4: (
      <div>
        <SharpVision
          highlightedText="Made to Fit Effortlessly"
          heading="Compact By Design"
          subheading="With its streamlined design, the VREC-H120SC fits neatly behind your rear-view mirror, keeping your dash tidy while capturing the road ahead with clarity."
        />
      </div>
    ),

    s9: (
      <div>asas</div>

      // <div>
      //   <FieldOfVision

      //     highlightedText="A minimal build that delivers maximum road coverage"
      //     heading="120° Field of View"
      //     subheading="Whether a bike cuts in from the side or something happens just outside your lane, this lens captures it. Designed to record the bigger picture without needing a bulky setup."

      //   />
      // </div>
    ),
    s5: (
      <div>
        <DynamicContent
          style="flex-col items-center justify-end sm:items-start sm:justify-center"
          highlightedText="Store More Footage with Ease"
          heading="Supports up to 128GB microSD"
          subheading="Gives you the space to record and save more of your drives without worrying about running out of memory."
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
    // s7: (
    //   <div>

    //     <DriveAlert

    //       highlightedText="Timely Warnings When It Matters"
    //       heading="ADAS Alerts"
    //       subheading="Get audio cues for lane departure and forward collision so you can stay aware, avoid surprises and respond faster on busy roads."
    //       alert1Image="/Images/svgs/laneIcon.svg"
    //       alert2Image="/Images/svgs/collisionIcon.svg"
    //       alert3Image="/Images/svgs/stopnGoIcon.svg"
    //       alert1="Lane Departure Alert"
    //       alert2="Forward Collision Alert"
    //       alert3="Stop & Go Alert"

    //     />
    //   </div>
    // ),
    // s8: (
    //   <div>
    //     <p className="text-cherryRed text-xl font-bold text-center">
    //       Every Angle Matters
    //     </p>
    //     <h2 className="text-[56px] text-white text-center font-medium">
    //       Dual Camera setup
    //     </h2>
    //     <p className="text-pretty text-[#ABABAB] text-center max-w-xl mx-auto">
    //       The VREC-Z820DC pairs a 4K front and HD rear camera to record both directions at once, delivering clearer evidence and wider coverage.
    //     </p>
    //   </div>
    // ),

    s10: (
      <OptionalParking
        style="flex flex-col items-center sm:items-start justify-center sm:justify-center "
        highlightedText="Stay Secure While Parked"
        heading="Optional Parking Mode"
        subheading="Parking mode requires additional installation of an external Hardwire Kit, which enables power supply to the Dash Camera directly from the vehicle battery."
        description="*Disclaimer: Parking mode requires additional installation of an external Hardwire Kit, which enables power supply to the Dash Camera directly from the vehicle battery."
      />
    ),

    // s11: (
    //   <GpsLogger

    //     highlightedText='Every Trip Logged'
    //     heading='GPS Logger'
    //     subheading='Automatically record your driving routes with GPS logging, making it easy to revisit past trips whenever needed.'
    //     description='*Disclaimer: Route tracking is available only for footage downloaded to the user’s mobile device via the app. An active internet connection is required to display route details on the map.'

    //   />
    // ),
  };

  // Custom overlay divs
  const overlayPosition = {
    default: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s3: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s4: "bottom-1/3 right-24 z-[100]",
    s5: "top-1/2 left-1/4 z-[100] -translate-x-1/2 -translate-y-1/2",
    s6: "top-160 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s7: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s8: "top-32 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s9: "top-32 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s10: "top-1/2 left-260 z-[100] -translate-x-1/2 -translate-y-1/2",
    s11: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
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
