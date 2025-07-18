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
      )
        .fromTo(
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
        )
        .to(
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
      <div ref={containerRef} className="h-[530vh]">
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
          <div
            ref={headingRef}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
            style={{
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              willChange: "transform, opacity",
            }}
          >
            <h1 className="text-4xl md:text-7xl font-bold text-white text-center px-4">
              4K Clarity Meets AI Intelligence
            </h1>
            <p className="text-[40px] text-[#ABABAB] mt-4">
              VREC-Z820DC Keeps the Road on Record
            </p>
            <button className="bg-[#262626] px-2 pl-6 py-2 cursor-pointer rounded-full text-white mt-6 flex text-2xl font-medium items-center">
              Scroll to Explore
              <img
                src="/icons/chevDownCircle.svg"
                alt="Arrow Down"
                className="ml-2 "
              />
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
