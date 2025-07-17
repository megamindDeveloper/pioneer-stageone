"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HeroScrollScene() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const imageWrapperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section (without animations)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=3100",
        scrub: true,
        pin: true,
      });

      // Animate heading: scale + fade
      gsap.fromTo(
        headingRef.current,
        { scale: 1, opacity: 1 },
        {
          scale: 3.3,
          opacity: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=1100",
            scrub: 1,
          },
        }
      );

      // Animate image: fade in + scale down
      gsap.fromTo(
        imageWrapperRef.current,
        { scale: 3, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=1100",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Spacer BEFORE */}
      <section className="h-screen bg-gray-900 text-white flex items-center justify-center">
        <h2 className="text-3xl">Scroll to Reveal Hero</h2>
      </section>

      {/* Pinned Hero Section */}
      <section
        ref={sectionRef}
        className="relative bg-black text-white overflow-hidden h-screen"
      >
        {/* Image */}
        <div
          ref={imageWrapperRef}
          className="absolute inset-0 z-0 will-change-transform"
        >
          <Image
            src="/images/lens.webp"
            alt="Lens Image"
            fill
            className="object-cover"
          />
        </div>

        {/* Heading */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h1
            ref={headingRef}
            className="text-4xl md:text-7xl font-bold text-white text-center px-4 will-change-transform"
          >
            4K Clarity Meets AI Intelligence
          </h1>
        </div>
      </section>

      {/* Spacer AFTER */}
      <section className="h-screen bg-white text-black flex items-center justify-center">
        <h2 className="text-3xl font-semibold">Next Section</h2>
      </section>
    </>
  );
}
