"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF, useProgress } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import { Typography } from "../CommonComponents/Typography/Typography";
import { useBreakpoint } from "@/hooks/useBreakPoints";
import { Html } from "@react-three/drei";

const degToRad = (deg: number) => deg * (Math.PI / 180);

function CameraModel({ onModelReady }: { onModelReady: () => void }) {
  const { scene } = useGLTF("/models/VREC-Z820DC_LOW POLY.glb");
  const groupRef = useRef<THREE.Group>(null);
  const breakpoint = useBreakpoint();

  const getModelTransformByBreakpoint = (bp: string) => {
    switch (bp) {
      case "sm":
        return { scale: 55, position: [0.3, 0.3, 0.7] };
      case "md":
        return { scale: 50, position: [-1.3, -1.8, 0.6] };
      case "lg":
        return { scale: 100, position: [-0.5, -2.85, 0.5] };
      case "lg2":
        return { scale: 100, position: [-1, -1.9, 0.5] };
      case "xl":
        return { scale: 110, position: [-0.8, -1.95, 0.4] };
      case "2xl":
        return { scale: 120, position: [-0.6, -2, 0.3] };
      default:
        return { scale: 100, position: [-1, -1.9, 0.5] };
    }
  };

  useEffect(() => {
    if (!scene || !groupRef.current) return;

    groupRef.current.visible = true;

    scene.traverse((node: any) => {
      if (node.isMesh) {
        node.material.side = THREE.DoubleSide;
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });

    groupRef.current.position.set(-2.88, -2.2, 12);
    groupRef.current.scale.set(100, 100, 100);
    groupRef.current.rotation.set(degToRad(-90), 0, 0);

    onModelReady();

    const timer = setTimeout(() => {
      const { scale, position } = getModelTransformByBreakpoint(breakpoint);

      gsap.to(groupRef.current!.position, {
        x: position[0],
        y: position[1],
        z: position[2],
        duration: 6,
        ease: "slow(0.7, 0.7, false)",
      });

      gsap.to(groupRef.current!.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 6,
        ease: "slow(0.7, 0.7, false)",
      });

      const zRotation = breakpoint === "sm" ? degToRad(-20) : degToRad(0);

      gsap.to(groupRef.current!.rotation, {
        x: degToRad(-15),
        y: degToRad(-30),
        z: zRotation,
        duration: 6,
        ease: "slow(0.7, 0.7, false)",
      });
    }, 1800);

    return () => clearTimeout(timer);
  }, [scene, onModelReady]);

  return (
    <group ref={groupRef} visible={false}>
      <primitive object={scene} />
    </group>
  );
}

export default function CameraScene({ onModelReady }: { onModelReady: () => void }) {
  const [isModelReady, setIsModelReady] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isModelReady) {
      onModelReady();

      const tl = gsap.timeline({ delay: 2.5 });
      tl.fromTo(headingRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 3.5, ease: "power2.out" }).fromTo(
        subheadingRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
        "-=1.8"
      );
    }
  }, [isModelReady]);

  useEffect(() => {
    if (isModelReady && canvasRef.current) {
      gsap.fromTo(canvasRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "power2.out" });
    }
  }, [isModelReady]);

  useEffect(() => {
    if (isModelReady && navbarRef.current) {
      gsap.fromTo(
        navbarRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.3,
        }
      );
    }
  }, [isModelReady]);

  return (
    <div id="scroll-container" className="relative overflow-hidden bg-gradient-to-t">
      <div ref={navbarRef} className="opacity-0">
        {/* <Navbar /> */}
      </div>

      <div className="absolute w-full text-center mt-20 lg:mt-24 xl:mt-36 z-10 pointer-events-none flex justify-center flex-col">
        <Typography variant="hero-section-heading" ref={headingRef} className="!text-white  font-medium mx-4 md:mx-auto">
          See Everything. Miss Nothing.
        </Typography>
        <Typography variant="hero-body" ref={subheadingRef} className="text-[#ABABAB] pt-[0.8em]  !font-normal ">
          Engineered for clarity, built for safety.
        </Typography>
      </div>

      <div ref={canvasRef} className="opacity-0 transition-opacity">
        <div className="w-screen sticky top-0 md:h-[100vh] sm:h-[60vh] ">
          <Canvas
            onCreated={({ gl, scene }) => {
              gl.setClearColor("#000000"); // or any hex color
              // Or use: scene.background = new THREE.Color("#ffffff");
            }}
            camera={{ position: [0, 1, 18], fov: 40 }}
            style={{ width: "100vw", height: "100vh", position: "sticky", top: 0 }}
            shadows
          >
            <Suspense fallback={false}>
              <CameraModel onModelReady={() => setIsModelReady(true)} />
              <Environment files="/hdri/07.hdr" background={false} />
              <Html fullscreen>
                <div className="pointer-events-none w-full h-full bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
              </Html>
            </Suspense>
          </Canvas>
        </div>
      </div>
      {/* <div className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-20 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" /> */}
    </div>
  );
}

useGLTF.preload("/models/VREC-Z820DC_LOW POLY.glb");
