"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useProgress } from "@react-three/drei";
import Image from "next/image";
import image from '../../../public/logo/image.png'
export default function FadeLoader({ isModelReady }: { isModelReady: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement>(null);
  const cornerRef = useRef<HTMLDivElement>(null);
  const contentGroupRef = useRef<HTMLDivElement>(null);

  const { progress, loaded, total } = useProgress();

  const [visible, setVisible] = useState(true);
  const [showDot, setShowDot] = useState(true);
  const [resolution, setResolution] = useState("0x0");
  const [timer, setTimer] = useState("00:00:00");

  const [stage, setStage] = useState<"loading" | "contentOut" | "fadeOut">("loading");

  // Blinking dot
  useEffect(() => {
    const interval = setInterval(() => setShowDot((prev) => !prev), 1000);
    return () => clearInterval(interval);
  }, []);

  // Timer & resolution
  useEffect(() => {
    const start = performance.now();

    const timerInterval = setInterval(() => {
      const elapsed = Math.floor((performance.now() - start) / 1000);
      const min = String(Math.floor(elapsed / 60)).padStart(2, "0");
      const sec = String(elapsed % 60).padStart(2, "0");
      setTimer(`00:${min}:${sec}`);
    }, 1000);

    const updateResolution = () => {
      setResolution(`${window.innerWidth}x${window.innerHeight}`);
    };
    updateResolution();
    window.addEventListener("resize", updateResolution);

    return () => {
      clearInterval(timerInterval);
      window.removeEventListener("resize", updateResolution);
    };
  }, []);

  // Entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.fromTo(centerRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1 });
    tl.fromTo(cornersRef.current, { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.5");
    tl.fromTo(cornerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.5");
    return () => tl.kill();
  }, []);

  // ✅ Fade out when assets + model are ready
  useEffect(() => {
    const assetsLoaded = loaded === total;
    if (assetsLoaded && isModelReady && stage === "loading") {
      setStage("contentOut");

      const tl = gsap.timeline();
      tl.to(contentGroupRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          setStage("fadeOut");
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
            onComplete: () => setVisible(false),
          });
        },
      });
    }
  }, [loaded, total, isModelReady, stage]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#0D0D0D] z-50 flex items-center justify-center text-white font-mono select-none transition-opacity"
    >
      <div ref={contentGroupRef} className="relative w-full h-full">
        {/* Top Left Info */}
        <div className="absolute top-16 left-16 text-gray-400 leading-tight">
          <p>{resolution}</p>
        </div>
        <div className="absolute top-24 left-16 text-gray-400 leading-tight">
         <Image src={image} alt="logo" className="w-32"/>
        </div>

        {/* Top Right Timer */}
        <div className="absolute top-16 right-16 flex gap-2 items-center text-gray-400 leading-tight">
          <div className={`w-3 h-3 rounded-full ${showDot ? "bg-[#AD2239]" : "bg-transparent"} transition`} />
          <p>{timer}</p>
        </div>

        {/* Border Corners */}
        <div ref={cornersRef} className="absolute inset-0 pointer-events-none opacity-100">
          <div className="absolute top-8 left-8 w-10 h-px bg-[#AD2239]" />
          <div className="absolute top-8 left-8 h-10 w-px bg-[#AD2239]" />
          <div className="absolute top-8 right-8 w-10 h-px bg-[#AD2239]" />
          <div className="absolute top-8 right-8 h-10 w-px bg-[#AD2239]" />
          <div className="absolute bottom-8 left-8 w-10 h-px bg-[#AD2239]" />
          <div className="absolute bottom-8 left-8 h-10 w-px bg-[#AD2239]" />
          <div className="absolute bottom-8 right-8 w-10 h-px bg-[#AD2239]" />
          <div className="absolute bottom-8 right-8 h-10 w-px bg-[#AD2239]" />
        </div>

        {/* Center Loading % */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div ref={centerRef} className="text-[20px] tracking-widest opacity-100 p-20">
            {Math.round(progress)}%
          </div>

          <div ref={cornerRef} className="absolute inset-0 pointer-events-none opacity-0">
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#AD2239]" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#AD2239]" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#AD2239]" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#AD2239]" />
          </div>
        </div>
      </div>
    </div>
  );
}
