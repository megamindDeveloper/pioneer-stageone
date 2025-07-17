"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { motion, useInView } from "framer-motion";
import BeamOverlay from "../BeamOverlay";
import BeamOverlaySVG from "../BeamOverlay";

gsap.registerPlugin(ScrollTrigger);

// ✅ Helper: Convert degrees to radians
const degToRad = (degrees: number) => degrees * (Math.PI / 180);

/* -----------------------------------------------------
 ✅ VideoPlane Component - Displays the embedded video texture
----------------------------------------------------- */
function VideoPlane({
  url,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
}: {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}) {
  const textureRef = useRef<THREE.VideoTexture | null>(null);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = url;
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;

    video.play().catch(console.error);

    const texture = new THREE.VideoTexture(video);
    texture.colorSpace = THREE.SRGBColorSpace;
    textureRef.current = texture;

    return () => {
      video.pause();
      video.src = "";
      texture.dispose();
    };
  }, [url]);

  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[16, 9]} /> {/* Adjust for video aspect ratio */}
      <meshBasicMaterial toneMapped={false} side={THREE.DoubleSide}>
        {textureRef.current && (
          <primitive attach="map" object={textureRef.current} />
        )}
      </meshBasicMaterial>
    </mesh>
  );
}

/* -----------------------------------------------------
 ✅ CameraController Component - Handles camera transitions via GSAP
----------------------------------------------------- */
function CameraController({ onModelReady }: { onModelReady: () => void }) {
  const { camera } = useThree();
  const cameraRef = useRef<THREE.PerspectiveCamera>();

  useEffect(() => {
    cameraRef.current = camera as THREE.PerspectiveCamera;

    // ✅ Set initial position and rotation
    camera.position.set(0, 2.3, -0.1);
    camera.rotation.set(degToRad(0), degToRad(180), degToRad(0));

    onModelReady();

    // ✅ GSAP timeline with ScrollTrigger for camera movement + FOV
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#model2-scroll-container",
          start: "top+=200 top",
          scrub: 1.5,
          invalidateOnRefresh: true,
          end: "bottom bottom",
        },
      });

      // 📌 KEYFRAME 1.5 - Zoom into rear screen (preparing rear view + alert)
      // tl.addLabel("keyframe1_5", "keyframe1-=1")
      //   .to(camera.position, { x: 0, y: 2.3, z: -4.5, duration: 1, ease: "power2.out" }, "keyframe1_5")
      //   .to(
      //     camera,
      //     {
      //       fov: 12, // Slight zoom for emphasis
      //       onUpdate: () => camera.updateProjectionMatrix(),
      //       duration: 1,
      //       ease: "power1.inOut",
      //     },
      //     "keyframe1_5"
      //   )
      //   .to(
      //     "#screen-alert-overlay",
      //     {
      //       autoAlpha: 1,
      //       scale: 1,
      //       duration: 0.8,
      //       ease: "back.out(1.7)",
      //     },
      //     "keyframe1_5"
      //   );

      // 📌 KEYFRAME 1 - Rear Camera View (behind the car)
      tl.addLabel("keyframe1")
        .to(
          camera.position,
          { x: 0, y: 2.5, z: -5.7, ease: "none" },
          "keyframe1"
        )
        .to(
          camera.rotation,
          { x: 0, y: degToRad(180), z: 0, ease: "none" },
          "keyframe1"
        )
        .to(
          camera,
          {
            fov: 18,
            onUpdate: () => camera.updateProjectionMatrix(),
            ease: "none",
          },
          "keyframe1"
        );

      // 📌 KEYFRAME 2 - Top View (flat, centered above car)
      tl.addLabel("keyframe2")
        .to(
          camera.position,
          { x: 0, y: 10, z: 0, ease: "sine.inOut" },
          "keyframe2"
        )
        .to(
          camera.rotation,
          { x: degToRad(90), y: degToRad(180), z: 0, ease: "sine.inOut" },
          "keyframe2"
        )
        .to(
          camera,
          {
            fov: 19,
            onUpdate: () => camera.updateProjectionMatrix(),
            ease: "sine.inOut",
          },
          "keyframe2"
        );

      // 📌 KEYFRAME 3 - Wide Top View (zoomed out overhead shot)
      tl.addLabel("keyframe3")
        .to(
          camera.position,
          { x: 0, y: 20, z: 0, ease: "sine.inOut" },
          "keyframe3"
        )
        .to(
          camera.rotation,
          { x: degToRad(90), y: degToRad(180), z: 0, ease: "sine.inOut" },
          "keyframe3"
        )
        .to(
          camera,
          {
            fov: 30,
            onUpdate: () => camera.updateProjectionMatrix(),
            ease: "sine.inOut",
          },
          "keyframe3"
        );

      // 📌 KEYFRAME 4 - Dynamic Angle View (angled top-right view)
      tl.addLabel("keyframe4")
        .to(
          camera.position,
          { x: 0, y: 15, z: -5, ease: "sine.inOut" },
          "keyframe4"
        )
        .to(
          camera.rotation,
          {
            x: degToRad(90),
            y: degToRad(180),
            z: degToRad(-90),
            ease: "sine.inOut",
          },
          "keyframe4"
        )
        .to(
          camera,
          {
            fov: 24,
            onUpdate: () => camera.updateProjectionMatrix(),
            ease: "sine.inOut",
          },
          "keyframe4"
        );

      // 📌 KEYFRAME 5 - Far Out View (camera pulling away)
      tl.addLabel("keyframe5")
        .to(
          camera.position,
          { x: 0, y: 15, z: -15, ease: "sine.inOut" },
          "keyframe5"
        )
        .to(
          camera.rotation,
          {
            x: degToRad(90),
            y: degToRad(180),
            z: degToRad(-90),
            ease: "sine.inOut",
          },
          "keyframe5"
        )
        .to(
          camera,
          {
            fov: 24,
            onUpdate: () => camera.updateProjectionMatrix(),
            ease: "sine.inOut",
          },
          "keyframe5"
        );
    });

    return () => ctx.revert();
  }, [camera, onModelReady]);

  return null;
}

/* -----------------------------------------------------
 ✅ CameraModel Component - Loads the car model & attaches video
----------------------------------------------------- */
/* -----------------------------------------------------
 ✅ CameraModel Component - Loads the car model & attaches video
----------------------------------------------------- */
function CameraModel() {
  const { scene } = useGLTF("/models/PIONEER CAR4.glb");
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    if (scene && group.current) {
      group.current.visible = true;

      // ✅ Apply base settings to all meshes
      scene.traverse((node: any) => {
        if (node.isMesh) {
          if (node.name === "GlassPart") {
            node.material.side = THREE.DoubleSide;
            node.material.wireframe = true;
          } else {
            node.material.side = THREE.FrontSide;
          }

          node.castShadow = true;
          node.receiveShadow = true;
          node.geometry.computeVertexNormals();
        }
      });

      // ✅ Initial transform
      group.current.position.set(0, 0, 0);
      group.current.scale.set(2, 2, 2); // Default scale
      group.current.rotation.set(0, 0, 0);

      // ✅ GSAP timeline to animate model position + scale
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#model2-scroll-container",
            start: "top+=200 top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });

        // // 📌 KEYFRAME 1_5
        // tl.addLabel("keyframe1_5")
        //   .to(group.current.position, { x: 0, y: 0, z: 0, ease: "sine.inOut" }, "keyframe1_5")
        //   .to(group.current.scale, { x: 2, y: 2, z: 2, ease: "sine.inOut" }, "keyframe1_5");

        // 📌 KEYFRAME 1
        tl.addLabel("keyframe1")
          .to(
            group.current.position,
            { x: 0, y: 0, z: 0, ease: "none" },
            "keyframe1"
          )
          .to(
            group.current.scale,
            { x: 2, y: 2, z: 2, ease: "none" },
            "keyframe1"
          );

        // 📌 KEYFRAME 2
        tl.addLabel("keyframe2")
          .to(
            group.current.position,
            { x: 0, y: 0, z: 0, ease: "sine.inOut" },
            "keyframe2"
          )
          .to(
            group.current.scale,
            { x: 2, y: 2, z: 2, ease: "sine.inOut" },
            "keyframe2"
          );

        // 📌 KEYFRAME 3
        tl.addLabel("keyframe3")
          .to(
            group.current.position,
            { x: 0, y: 0, z: 0, ease: "sine.inOut" },
            "keyframe3"
          )
          .to(
            group.current.scale,
            { x: 2, y: 2, z: 2, ease: "sine.inOut" },
            "keyframe3"
          );

        // 📌 KEYFRAME 4
        tl.addLabel("keyframe4")
          .to(
            group.current.position,
            { x: 0, y: 0, z: -10, ease: "sine.inOut" },
            "keyframe4"
          )
          .to(
            group.current.scale,
            { x: 2, y: 2, z: 2, ease: "sine.inOut" },
            "keyframe4"
          );

        // 📌 KEYFRAME 5
        tl.addLabel("keyframe5")
          .to(
            group.current.position,
            { x: 0, y: 0, z: 0, ease: "sine.inOut" },
            "keyframe5"
          )
          .to(
            group.current.scale,
            { x: 2, y: 2, z: 2, ease: "sine.inOut" },
            "keyframe5"
          );
      });

      return () => ctx.revert();
    }
  }, [scene]);

  return (
    <group ref={group} visible={false}>
      <primitive object={scene} />
      <VideoPlane
        url="/video/video.mp4"
        position={[0.0, 1.167, 0.45]}
        rotation={[0, 0, 0]}
        scale={[0.0043, 0.0029, 0.0]}
      />
    </group>
  );
}

/* -----------------------------------------------------
 ✅ CarCameraScene Component - Full Section with Scroll Animation
----------------------------------------------------- */
export default function CarCameraScene() {
  const [isModelReady, setIsModelReady] = useState(false);
  const containerRef = useRef(null);

  // ✅ Detects when in view (fade in/out)
  const isInView = useInView(containerRef, {
    rootMargin: true,
    margin: "0px 0px -99.999% 0px",
  });

  return (
    <>
      <BeamOverlaySVG />
      <motion.div
        ref={containerRef}
        id="model2-scroll-container"
        style={{ height: "600vh" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        className="du"
      >
        <Canvas
          gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
          camera={{ position: [0, 1, 18], fov: 10, near: 0.1, far: 500 }}
          style={{
            background: "#0d0d0d",
            width: "100vw",
            height: "100vh",
            position: "sticky",
            top: 0,
          }}
          shadows
        >
          <Suspense fallback={null}>
            <CameraController onModelReady={() => setIsModelReady(true)} />
            <CameraModel />
            <Environment files="/hdri/custom.hdr" background={false} />
          </Suspense>
        </Canvas>

        {/* 🔴 Alert Overlay UI */}
        <div
          id="screen-alert-overlay"
          className="fixed top-1/2 left-1/2 z-40 opacity-0 scale-75 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
        >
          <img
            src="/icons/triangle-alert.svg"
            alt="Alert"
            className="w-24 h-24 animate-pulse"
          />
        </div>
      </motion.div>
    </>
  );
}
