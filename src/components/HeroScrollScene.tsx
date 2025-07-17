"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HeroScrollScene() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const imageWrapperRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Create a single timeline for all animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4570", // Adjusted for smoother scroll
          scrub: 1, // Even smoother
          refreshPriority: -1,
          fastScrollEnd: true, // Optimize for fast scrolling
        },
      });

      // Add all animations to the timeline
      tl.fromTo(
        headingRef.current,
        {
          scale: 1,
          opacity: 1,
        },
        {
          scale: 3.3,
          opacity: 0,
          ease: "power2.inOut",
          duration: 1,
        },
        0
      ).fromTo(
        imageWrapperRef.current,
        {
          scale: 3,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          ease: "power2.inOut",
          duration: 1,
        },
        0
      ).to(
        imageWrapperRef.current,
        {
          opacity: 0,
          ease: "power2.inOut",
          duration: 1,
        },
        1 // Start fade out after 1.5 seconds into the timeline
      );

      // Optimize ScrollTrigger performance
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
        syncInterval: 60, // Sync every 60ms instead of default 200ms
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Spacer BEFORE */}
      <section className="h-[1px] bg-gray-900 text-white flex items-center justify-center"></section>
      {/* Container that provides scroll distance */}
      <div ref={containerRef} className="h-[300vh]">
        {/* Sticky Hero Section */}
        <section
          ref={sectionRef}
          className="sticky top-0 bg-black text-white overflow-hidden h-screen"
          style={{
            transform: "translateZ(0)", // Force hardware acceleration
            backfaceVisibility: "hidden",
            perspective: "1000px",
          }}
        >
          {/* Image */}
          <div
            ref={imageWrapperRef}
            className="absolute inset-0 z-0"
            style={{
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          >
            <Image
              src="/images/lens.webp"
              alt="Lens Image"
              fill
              loading="eager"
              className="object-cover"
              priority
            />
          </div>

          {/* Heading */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <h1
              ref={headingRef}
              className="text-4xl md:text-7xl font-bold text-white text-center px-4"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                willChange: "transform, opacity",
              }}
            >
              4K Clarity Meets AI Intelligence
            </h1>
          </div>
        </section>
      </div>
    </>
  );
}