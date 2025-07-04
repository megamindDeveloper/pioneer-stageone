"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import FadeLoader from "./Loader";
import Navbar from "./Navbar";
import { useProgress } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

/**
 * ✅ Helper: degrees ➜ radians
 */
const degToRad = (degrees: number) => degrees * (Math.PI / 180);

/**
 * ✅ CameraModel
 */
function CameraModel({ onModelReady }: { onModelReady: () => void }) {
  const { scene } = useGLTF("/models/VREC-Z820DC_New_TEST09.glb");
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    if (scene && group.current) {
      group.current.visible = true;

      scene.traverse((node: any) => {
        if (node.isMesh) {
          node.material.side = THREE.DoubleSide;
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });

      // ✅ Set initial transform
      group.current.position.set(-2.88, -2, 12);
      group.current.scale.set(100, 100, 100);
      group.current.rotation.set(degToRad(-90), degToRad(0), degToRad(0));

      // ✅ Notify model is ready
      onModelReady();

      // ✅ 3-second delay before starting GSAP animation
      const timer = setTimeout(() => {
        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            defaults: { ease: "slow(0.7, 0.7, false)", duration: 6 },
          });
          const isMobile = window.innerWidth <= 768;
          const scale = isMobile ? 50 : 120;
          tl.to(group.current!.position, { x: -1, y: -0.5, z: 0.5 }, 0)
            .to(group.current!.scale, { x: scale, y: scale, z: scale }, 0)
            .to(
              group.current!.rotation,
              {
                x: degToRad(-10),
                y: degToRad(-40),
                z: degToRad(0),
              },
              0
            );
        });

        return () => ctx.revert();
      }, 1800); // Delay of 3 seconds

      // ✅ Cleanup timer on unmount
      return () => clearTimeout(timer);
    }
  }, [scene, onModelReady]);

  return (
    <group ref={group} visible={false}>
      <primitive object={scene} />
    </group>
  );
}

/**
 * ✅ CameraScene
 */
export default function CameraScene() {
  const [isModelReady, setIsModelReady] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isModelReady) {
      // Delay text animation until model animation finishes
      const timer = setTimeout(() => {
        const tl = gsap.timeline();
        tl.fromTo(headingRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 3.5, ease: "power2.out" }).fromTo(
          subheadingRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
          "-=1.8" // start slightly earlier
        );
      }, 2500); // model animation takes ~8s + 1s delay = start at 9s

      return () => clearTimeout(timer);
    }
  }, [isModelReady]);
  const { progress, loaded, total } = useProgress();
  const [showLoader, setShowLoader] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loaded === total && isModelReady) {
      setShowLoader(false);
    }
  }, [loaded, total, isModelReady]);
  useEffect(() => {
    if (isModelReady && canvasRef.current) {
      gsap.fromTo(canvasRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "power2.out" });
    }
  }, [isModelReady]);
  useEffect(() => {
    if (isModelReady && navbarRef.current) {
      gsap.fromTo(navbarRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 0.3 });
    }
  }, [isModelReady]);
  return (
    <>
      {/* Loader sits on top */}
      {showLoader && <FadeLoader isModelReady={isModelReady} />}

      <div id="scroll-container" className="relative overflow-hidden bg-gradient-to-t">
        <div ref={navbarRef} className="opacity-0">
          <Navbar />
        </div>

        {/* Headings and content */}
        <div className="absolute w-full text-center z-10 pointer-events-none">
          <h1
            ref={headingRef}
            className="text-white font-['Helvetica_Neue','Helvetica','Arial','sans-serif'] font-medium text-[48px] xl:text-[76px] lg:text-[52px]  opacity-0 translate-y-16"
          >
            Ahead of What’s Ahead
          </h1>
          <p
            ref={subheadingRef}
            className="text-[#ABABAB] font-['Helvetica_Neue','Helvetica','Arial','sans-serif'] font-normal text-[28px] xl:text-[28px] lg:text-[24px]  md:text-[28px] opacity-0 translate-y-16"
          >
            Discover Pioneer’s Smart Dashcam Range
          </p>
        </div>
        <div ref={canvasRef} className="opacity-0 transition-opacity">
          {/* 3D Scene */}
          <Canvas
            camera={{ position: [0, 1, 18], fov: 40 }}
            style={{
              width: "100vw",
              height: "100vh",
              position: "sticky",
              top: 0,
            }}
            shadows
          >
            <Suspense fallback={false}>
              <CameraModel onModelReady={() => setIsModelReady(true)} />
              <group rotation={[4, 2, 0]}>
                <Environment files="/hdri/studio_small_06_2k.hdr" background={false} blur={100} />
              </group>
            </Suspense>
          </Canvas>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-44 z-20 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D] to-transparent" />
      </div>
    </>
  );
}

useGLTF.preload("/models/VREC-Z820DC_New_TEST09.glb");
