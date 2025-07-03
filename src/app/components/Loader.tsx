"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function FadeLoader({ isModelReady }: { isModelReady: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement>(null);
  const cornerRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [resolution, setResolution] = useState("0x0");
  const [timer, setTimer] = useState("00:00:00");
  const [fps, setFps] = useState(0);
  const [showDot, setShowDot] = useState(true);
  const [visible, setVisible] = useState(true);
  const [isProgressDone, setIsProgressDone] = useState(false);

  // Blinking dot
  useEffect(() => {
    const dotBlink = setInterval(() => {
      setShowDot(prev => !prev);
    }, 500);
    return () => clearInterval(dotBlink);
  }, []);

  // Main animation effect
  useEffect(() => {
    const start = performance.now();

    // Timer
    const timerInterval = setInterval(() => {
      const elapsed = Math.floor((performance.now() - start) / 1000);
      const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
      const seconds = String(elapsed % 60).padStart(2, "0");
      setTimer(`00:${minutes}:${seconds}`);
    }, 1000);

    // Resolution update
    const updateResolution = () => {
      setResolution(`${window.innerWidth}x${window.innerHeight}`);
    };
    updateResolution();
    window.addEventListener("resize", updateResolution);

    // FPS measurement
    let frames = 0;
    let lastSecond = Math.floor(performance.now() / 1000);
    const measureFPS = (now: number) => {
      frames++;
      const currentSecond = Math.floor(now / 1000);
      if (currentSecond !== lastSecond) {
        setFps(frames);
        frames = 0;
        lastSecond = currentSecond;
      }
      requestAnimationFrame(measureFPS);
    };
    requestAnimationFrame(measureFPS);

    // GSAP intro animation
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.fromTo(centerRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1 });
    tl.fromTo(cornersRef.current, { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.5");
    tl.fromTo(cornerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.5");

    // Counter animation
    const counter = { val: 0 };
    gsap.to(counter, {
      val: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        const val = Math.floor(counter.val);
        setProgress(val);
        if (val === 100) setIsProgressDone(true);
      },
    });

    return () => {
      tl.kill();
      gsap.killTweensOf(counter);
      clearInterval(timerInterval);
      window.removeEventListener("resize", updateResolution);
    };
  }, []);

  // Fade out when both model is ready and progress hits 100%
  useEffect(() => {
    if (isModelReady && isProgressDone) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => setVisible(false),
      });
    }
  }, [isModelReady, isProgressDone]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center text-white font-mono select-none transition-opacity"
    >
      <div className="relative w-full h-full">
        {/* FPS & Resolution Info */}
        <div className="absolute top-16 left-16 text-gray-400 leading-tight">
          <p>{fps}fps</p>
          <p>{resolution}</p>
        </div>
        <div className="absolute top-16 right-16 flex flex-row text-gray-400 leading-tight gap-2 items-center">
          <div
            className={`w-3 h-3 rounded-full ${showDot ? "bg-[#e8a451]" : "bg-transparent"} transition duration-300`}
          />
          <p>{timer}</p>
        </div>

        {/* Border Corners */}
        <div ref={cornersRef} className="absolute inset-0 pointer-events-none opacity-0">
          {/* Top Left */}
          <div className="absolute top-8 left-8 w-10 h-px bg-gray-500" />
          <div className="absolute top-8 left-8 h-10 w-px bg-gray-500" />
          {/* Top Right */}
          <div className="absolute top-8 right-8 w-10 h-px bg-gray-500" />
          <div className="absolute top-8 right-8 h-10 w-px bg-gray-500" />
          {/* Bottom Left */}
          <div className="absolute bottom-8 left-8 w-10 h-px bg-gray-500" />
          <div className="absolute bottom-8 left-8 h-10 w-px bg-gray-500" />
          {/* Bottom Right */}
          <div className="absolute bottom-8 right-8 w-10 h-px bg-gray-500" />
          <div className="absolute bottom-8 right-8 h-10 w-px bg-gray-500" />
        </div>

        {/* Center Loading */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div ref={centerRef} className="text-[20px] tracking-widest opacity-0 p-20">
            {progress}%
          </div>
          <div ref={cornerRef} className="absolute inset-0 pointer-events-none opacity-0">
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gray-700" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-gray-700" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-gray-700" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
