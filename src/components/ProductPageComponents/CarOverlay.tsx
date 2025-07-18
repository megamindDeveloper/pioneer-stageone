"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type Stage = "s3" | "s4" | "s5" | "s6" | "s7" | "s8" | null;

export default function CarOverlayContentDivs() {
  const [stage, setStage] = useState<Stage>(null);
  const s5OverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // General stage transitions
      ScrollTrigger.create({
        trigger: "#model2-scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (p === 0) setStage(null);
          else if (p > 0 && p < 0.05) setStage("s3");
          else if (p >= 0.05 && p < 0.12) setStage("s4");
          else if (p >= 0.29 && p < 0.37) setStage("s5");
          else if (p >= 0.58 && p < 0.7) setStage("s6");
          else if (p >= 0.8 && p < 0.86) setStage("s7");
          else if (p >= 0.94 && p < 1) setStage("s8");
          else setStage(null);
        },
      });

      // GSAP control for s5 overlay
      gsap.set(s5OverlayRef.current, { autoAlpha: 0, y: "-100%" });

      ScrollTrigger.create({
        trigger: "#model2-scroll-container",
        start: "50% center", // Adjust as needed
        end: "60% center", // Adjust as needed
        scrub: true,
        onEnter: () => {
          gsap.to(s5OverlayRef.current, {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(s5OverlayRef.current, {
            y: "-100%",
            autoAlpha: 0,
            duration: 0.6,
            ease: "power3.in",
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  if (typeof window === "undefined") return null;

  const overlaysPositions = {
    default: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s3: "top-1/2 left-1/2 z-[100] -translate-x-1/2 translate-y-[50%]",
    s4: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s5: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s6: "top-1/2 left-0 z-[100] -translate-y-[40%]",
    s7: "top-1/2 left-24 z-[100] -translate-y-[30%]",
    s8: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
  };

  // Overlay content map
  const overlays = {
    s3: (
      <div className="text-center max-w-xl mx-auto pb-12">
        <p className="text-cherryRed text-xl font-medium mb-2">
          Adapts to Any Light
        </p>
        <h2 className="text-3xl md:text-5xl font-medium mb-4 text-white">
          WDR & HDR Recording
        </h2>
        <p className="text-gray-400 text-lg">
          It adjusts exposure in real time, preserving visibility and fine
          detail, so footage stays clear in both bright and low-light
          conditions.
        </p>
      </div>
    ),
    s4: (
      <section className="min-h-screen bg-none text-white flex flex-col justify-between px-6 py-10 text-center">
        <div className="pt-28">
          <Image
            src="/images/svgs/dangerIcon.svg"
            alt="Warning Icon"
            width={80}
            height={80}
            className="mx-auto w-full h-[10rem]"
          />
        </div>

        <div className="flex flex-col items-center space-y-15 pb-12 pt-32">
          <div className="text-center max-w-xl mx-auto pb-0">
            <p className="text-cherryRed text-xl font-medium mb-2">
              Built to Notice Before You Do
            </p>
            <h2 className="text-3xl md:text-5xl font-medium mb-4 text-white">
              Advanced Driving Alerts
            </h2>
            <p className="text-gray-400 text-lg">
              The VREC-Z820DC monitors lane position, vehicle distance, and
              traffic flow to deliver timely alerts and help you stay in
              control.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-13">
            <div className="flex flex-col items-center space-y-2">
              <Image
                src="/images/svgs/laneIcon.svg"
                alt="Lane Departure"
                width={60}
                height={60}
              />
              <p className="text-white font-medium text-sm">
                Lane Departure Alert
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Image
                src="/images/svgs/collisionIcon.svg"
                alt="Forward Collision"
                width={60}
                height={60}
              />
              <p className="text-white font-medium text-sm">
                Forward Collision Alert
              </p>
            </div>
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
    s5: (
      <section className="min-h-screen text-white flex justify-center px-4 py-10">
        <div className="text-center max-w-xl mx-auto pb-12">
          <p className="text-red-500 text-sm font-medium mb-2">
            Every Angle Matters
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Dual Camera Set-up
          </h2>
          <p className="text-gray-400 text-sm">
            The VREC-Z820DC pairs a 4K front and HD rear camera to record both
            directions at once, delivering clearer evidence and wider coverage.
          </p>
        </div>
      </section>
    ),
    s6: (
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-16 overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row w-[90vw] gap-[35rem] justify-center items-end">
          <div className="md:mb-28">
            <p className="text-red-500 text-sm text-center font-medium mb-2">
              Comprehensive Coverage
            </p>
            <h2 className="text-3xl text-center md:text-5xl font-bold leading-tight text-white">
              137° Wide-Angle
              <br />
              Lens
            </h2>
          </div>
          <div className="text-gray-400 text-sm text-center md:max-w-sm md:mb-32">
            <p>
              Gives you a broader view of the road, capturing side
              <br />
              lanes, nearby traffic, and details that narrower lenses
              <br />
              might miss.
            </p>
          </div>
        </div>
      </section>
    ),
    s7: (
      <div>
        <div className="text-center max-w-xl mx-auto pb-12">
          <p className="text-cherryRed text-xl font-medium mb-2">
          Monitors While You’re Away
          </p>
          <h2 className="text-3xl md:text-5xl font-medium mb-4 text-white">
          Optional Parking Mode
          </h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
          Parking mode requires additional installation of an external Hardwire Kit, which enables power supply to the Dash Camera directly from the vehicle battery.
          </p>
        </div>
        <p className="text-[#313131] text-lg text-center max-w-md mx-auto mt-36">
        Disclaimer: Parking mode requires additional installation of an external Hardwire Kit, which enables power supply to the Dash Camera directly from the vehicle battery.
        </p>
      </div>
    ),
    s8: (
      <div className="text-center max-w-xl mx-auto pb-12">
        <p className="text-cherryRed text-xl font-medium mb-2">
          Every Trip Logged
        </p>
        <h2 className="text-3xl md:text-5xl font-medium mb-4 text-white">
          Built-in GPS
        </h2>
        <p className="text-gray-400 text-lg max-w-sm">
          Accurate location and speed data are added to every video so you know
          exactly where and how incidents happened.
        </p>
      </div>
    ),
  };

  return ReactDOM.createPortal(
    <>
      <AnimatePresence>
        {stage && overlays[stage] && (
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`fixed ${
              overlaysPositions[stage || "default"]
            } pointer-events-none`}
          >
            {overlays[stage]}
          </motion.div>
        )}
      </AnimatePresence>

      {/* GSAP-controlled s5 overlay */}
    </>,
    document.body
  );
}
