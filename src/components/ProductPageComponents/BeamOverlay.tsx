"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BeamOverlaySVG() {
  const overlayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: "#model2-scroll-container",
          start: "top+=200 top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      })
        .addLabel("beamStart", "keyframe2")
        .fromTo(
          overlayRef.current,
          { autoAlpha: 0, y: 0 },
          { autoAlpha: 1, y: -300, duration: 1 },
          "beamStart"
        )
        .addLabel("beamEnd", "keyframe3")
        .to(overlayRef.current, { autoAlpha: 0, y: -500, duration: 1 }, "beamEnd");
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-30">
      <svg
        ref={overlayRef}
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="beamGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f1f1f" stopOpacity="1" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points="0,0 100,0 50,30"
          fill="url(#beamGradient)"
        />
      </svg>
    </div>
  );
}
