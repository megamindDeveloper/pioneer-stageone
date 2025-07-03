"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import FadeLoader from "./Loader";

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
            defaults: { ease: "expo.out", duration: 8 },
          });

          tl.to(group.current!.position, { x: 0, y: 1, z: 0.5 }, 0)
            .to(group.current!.scale, { x: 80, y: 80, z: 80 }, 0)
            .to(
              group.current!.rotation,
              {
                x: degToRad(0),
                y: degToRad(-40),
                z: degToRad(0),
              },
              0
            );
        });

        return () => ctx.revert();
      }, 310); // Delay of 3 seconds

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

  useEffect(() => {
    if (isModelReady) {
      // Delay text animation until model animation finishes
      const timer = setTimeout(() => {
        const tl = gsap.timeline();
        tl.fromTo(headingRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }).fromTo(
          subheadingRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
          "-=0.8" // start slightly earlier
        );
      }, 1500); // model animation takes ~8s + 1s delay = start at 9s

      return () => clearTimeout(timer);
    }
  }, [isModelReady]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 5000); // ⏳ Delay for 5 seconds for design purposes

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="scroll-container" className="overflow-hidden">
      {/* 👆 You can adjust the height for how long you want to scroll */}
      <div className="absolute px-auto transform  text-center z-10 pointer-events-none w-[100%]">
        <h1 ref={headingRef} className="text-white font-bold text-[66px] opacity-0 translate-y-16">
          Ahead of What’s Ahead
        </h1>
        <p ref={subheadingRef} className="text-[#ABABAB] text-[28px] opacity-0 translate-y-16">
          Discover Pioneer’s Smart Dashcam Range
        </p>
      </div>

      <div>
      {!isModelReady && <FadeLoader isModelReady={isModelReady} />
    }
        <Canvas
          camera={{ position: [0, 1, 18], fov: 40, near: 0.1, far: 1000 }}
          style={{
            background: "#0D0D0D",
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
    </div>
  );
}

useGLTF.preload("/models/VREC-Z820DC_New_TEST09.glb");
