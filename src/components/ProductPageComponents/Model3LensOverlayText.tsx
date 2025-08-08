"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DynamicContent from "../TextComponents/DynamicContent";
import DriveAlert from "../TextComponents/DriveAlert";
import OptionalParking from "../TextComponents/OptionalParking";
import GpsLogger from "../TextComponents/GpsLogger";
import FourKVideo from "../TextComponents/FourKVideo";
import GSensor from "../TextComponents/GSensor";


gsap.registerPlugin(ScrollTrigger);

type Stage = "s3" | "s4" | "s5" | "s6" | "s7" | "s8" | "s9" | "s10" | "s11" | null;

export default function Model3LensOverlayText() {
  const [stage, setStage] = useState<Stage>(null);
  const overlayRef = useRef(null)

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
          else if (p >= 0.100 && p < 0.152) setStage("s4");
          else if (p >= 0.183 && p < 0.284) setStage("s5");
          else if (p >= 0.347 && p < 0.375) setStage("s6");
          else if (p >= 0.385 && p < 0.420) setStage("s7");
          else if (p >= 0.525 && p < 0.549) setStage("s8");
          else if (p >= 0.643 && p < 0.720) setStage("s9");
          else if (p >= 0.828 && p < 0.944) setStage("s10");
          else if (p >= 0.960 && p < 0.991) setStage("s11");






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
      <div

      >
        <FourKVideo

          highlightedText="Precision in Motion"
          heading="Full HD Recording"
          subheading="The front camera records in crisp 1080p, giving you sharp visuals for everyday drives, traffic incidents or unexpected moments." />
      </div>
    ),
    s4: (
       <div>
              <GSensor
                style='flex items-end sm:items-center justify-center sm:justify-end '
      
      
                highlightedText='Automatic Event Recording'
                heading='Built-in G-Sensor'
                subheading='Stay protected with built-in G-sensor technology that automatically locks important footage during emergencies.'
      
              />
            </div>
      // <div>
      //   <SharpVision

      //     highlightedText="Clarity That Goes Further"
      //     heading="High-Performance Imaging"
      //     subheading='The VREC-Z820DC uses a Sony STARVIS IMX415 sensor, an f/1.8 aperture and a 7-layer glass lens. Together, they capture sharp, bright footage with accurate detail even in low or uneven lighting.'
      //   />
      // </div>
    ),
    s5: (
      <div>
        <DynamicContent
          style="flex-col items-center justify-end sm:items-start sm:justify-center"
          highlightedText='Clear View at a Glance'
          heading='3″ IPS Display'
          subheading="The 7.6 cm screen lets you review footage, adjust settings, and see live video clearly right from the dash without needing your phone."

        />
      </div>
    ),
    s6: (
      <div>
        <p className="text-cherryRed text-xl font-bold text-center">
        Clarity in Changing Light
        </p>
        <h2 className="text-[56px] mx text-white text-center font-medium">
       Wide Dynamic Range (WDR)
        </h2>
        <p className="text-pretty text-[#ABABAB]  text-center max-w-xl mx-auto">
From tunnels to tree cover, WDR balances bright and dark areas in real time so your footage stays detailed and easy to review.        </p>
      </div>
    ),
    s7: (
      <div>

        <DriveAlert

          highlightedText="Timely Warnings When It Matters"
          heading="ADAS Alerts"
          subheading="Get audio cues for lane departure and forward collision so you can stay aware, avoid surprises and respond faster on busy roads."
          alert1Image="/Images/svgs/laneIcon.svg"
          alert2Image="/Images/svgs/collisionIcon.svg"
          alert3Image="/Images/svgs/stopnGoIcon.svg"
          alert1="Lane Departure Alert"
          alert2="Forward Collision Alert"
          alert3="Stop & Go Alert"



        />
      </div>
    ),
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
    s9: (
      <div>asas</div>

      // <div>
      //   <FieldOfVision

      //     highlightedText="See More Than Just the Lane Ahead"
      //     heading="139° Wide-Angle Lens"
      //     subheading="Captures multiple lanes and surrounding details, giving you a broader view of every situation on the road."

      //   />
      // </div>
    ),

    s10: (
      <OptionalParking
        style='flex flex-col items-center sm:items-start justify-center sm:justify-center '

        highlightedText='Stay Secure While Parked'
        heading='Optional Parking Mode'
        subheading='Parking mode requires additional installation of an external Hardwire Kit, which enables power supply to the Dash Camera directly from the vehicle battery.'
        description='*Disclaimer: Parking mode requires additional installation of an external Hardwire Kit, which enables power supply to the Dash Camera directly from the vehicle battery.'


      />
    ),

    s11: (
      <GpsLogger

        highlightedText='Every Trip Logged'
        heading='GPS Logger'
        subheading='Automatically record your driving routes with GPS logging, making it easy to revisit past trips whenever needed.'
        description='*Disclaimer: Route tracking is available only for footage downloaded to the user’s mobile device via the app. An active internet connection is required to display route details on the map.'

      />
    ),
  };

  // Custom overlay divs
  const overlayPosition = {
    default: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s3: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s4: "top-10 right-24 z-[100]",
    s5: "top-1/2 left-1/4 z-[100] -translate-x-1/2 -translate-y-1/2",
    s6: "bottom-1 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s7: "top-100 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s8: "top-32 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s9: "top-32 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s10: "top-1/2 left-1/4 z-[100] -translate-x-1/2 -translate-y-1/2",
    s11: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",




  };

  const currentOverlay = stage ? overlays[stage] : null;

  return ReactDOM.createPortal(
    <AnimatePresence >
      {currentOverlay && (
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 2, y: 0 }}
          exit={{ opacity: 0, y: 1 }}
          transition={{ duration: 0.4 }}
          className={`fixed transition-all ease-in-out duration-300 ${
            overlayPosition[stage || "default"]
          } pointer-events-none`}
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