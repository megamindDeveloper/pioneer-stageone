"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Define prop types
interface HeroScrollSceneProps {
  heading: string;
  subheading: string;
  imageSrc?: string;
}

export default function HeroScrollScene({ heading, subheading, imageSrc }: HeroScrollSceneProps) {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const imageWrapperRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2570",
          scrub: 1,
          refreshPriority: -1,
          fastScrollEnd: true,
        },
      });

      tl.fromTo(headingRef.current, { scale: 1, opacity: 1 }, { scale: 3.3, opacity: 0, ease: "power2.inOut", duration: 1 }, 0)
        .fromTo(imageWrapperRef.current, { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, ease: "power2.inOut", duration: 1 }, 0)
        .to(imageWrapperRef.current, { opacity: 0, ease: "power2.inOut", duration: 1 }, 1);

      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
        syncInterval: 60,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="h-[1px] bg-gray-900 text-white flex items-center justify-center" />
      <div ref={containerRef} className="h-[730vh]">
        <section
          ref={sectionRef}
          className="sticky top-0 bg-black text-white overflow-hidden h-screen"
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            perspective: "1000px",
          }}
        >
          {imageSrc && (
            <div
              ref={imageWrapperRef}
              className="absolute inset-0 z-0"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
              }}
            >
              <Image src={imageSrc} alt="Lens Image" fill loading="eager" className="object-cover" priority />
            </div>
          )}

          <div
            ref={headingRef}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
            style={{
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              willChange: "transform, opacity",
            }}
          >
            <h1 className="text-4xl md:text-7xl font-bold text-white text-center px-4">{heading}</h1>
            <p className="text-[40px] text-[#ABABAB] mt-4">{subheading}</p>
            <button className="bg-[#262626] px-2 pl-6 py-2 cursor-pointer rounded-full text-white mt-6 flex text-2xl font-medium items-center">
              Scroll to Explore
              <img src="/icons/chevDownCircle.svg" alt="Arrow Down" className="ml-2" />
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
