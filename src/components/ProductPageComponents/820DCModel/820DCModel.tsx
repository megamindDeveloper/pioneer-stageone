"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import LensOverlayText from "../LensOverlayText";
import { motion, useInView } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * ✅ Helper: degrees ➜ radians
 */
const degToRad = (degrees: number) => degrees * (Math.PI / 180);

/**
 * ✅ CameraModel Component
 */
function Model1({ onModelReady }: { onModelReady: () => void }) {
  const { scene } = useGLTF("/models/VREC-Z820DC_LOW POLY.glb");
  const group = useRef<THREE.Group>(null);

  // Refs to store animated properties
  const targetPosition = useRef(new THREE.Vector3(-2.95, 3.65, 15));
  const targetScale = useRef(new THREE.Vector3(100, 100, 100));
  const targetRotation = useRef(new THREE.Euler(0, 0, 0));

  useEffect(() => {
    if (!scene || !group.current) return;
    console.log("🔍 Listing all child nodes in GLTF scene:");
    scene.traverse((node: any) => {
      if (node.isMesh) {
        console.log("🧩 Mesh Name:", node.name);
      }
    });
    const g = group.current;
    g.visible = true;
    g.position.copy(targetPosition.current);
    g.scale.copy(targetScale.current);
    g.rotation.copy(targetRotation.current);

    // Prepare mesh
    scene.traverse((node: any) => {
      if (node.isMesh) {
        node.material.side = THREE.DoubleSide;
        node.castShadow = true;
        node.receiveShadow = true;
        node.geometry.computeVertexNormals();
      }
    });

    // Collect lens parts
    // Instead of "obj_2", "obj_3", etc. use just "2", "3", ...
    const lensParts = Array.from({ length: 7 }, (_, i) =>
      g.getObjectByName(`${i + 1}`)
    )
      .filter(Boolean)
      .reverse(); // ← reverse so part "8" explodes first

    lensParts.forEach((part) => {
      if (part) part.position.z = 0.02222222;
    });

    onModelReady();
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#model1-scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
      const customLensZPositions = [0.04, 0.055, 0.07, 0.08, 0.09, 0.1];
      // Animate target refs (not directly group)
      tl.addLabel("keyframe1")
        .to(
          targetPosition.current,
          { x: -5, y: 2.75, z: 0.5, ease: "none" },
          "keyframe1"
        )
        .to(
          targetScale.current,
          { x: 80, y: 80, z: 80, ease: "none" },
          "keyframe1"
        )
        .to(
          targetRotation.current,
          {
            x: degToRad(-10),
            y: degToRad(60),
            z: degToRad(20),
            ease: "none",
          },
          "keyframe1"
        )

        .addLabel("lens-explode");

      lensParts.forEach((part, i) => {
        tl.to(
          part.position,
          {
            z: customLensZPositions[i] || 0,
            ease: "power2.out",
          },
          "lens-explode"
        );
      });

      tl.addLabel("lens-collapse");
      lensParts.forEach((part) => {
        tl.to(
          part.position,
          { z: 0.02222222, ease: "power2.inOut" },
          "lens-collapse"
        );
      });

      tl.addLabel("keyframe2")
        .to(
          targetPosition.current,
          { x: 7, y: 2, z: 0, ease: "sine.inOut" },
          "keyframe2"
        )
        .to(
          targetScale.current,
          { x: 60, y: 60, z: 60, ease: "sine.inOut" },
          "keyframe2"
        )
        .to(
          targetRotation.current,
          {
            x: 0,
            y: degToRad(120),
            z: 0,
            ease: "sine.inOut",
          },
          "keyframe2"
        )

        .addLabel("keyframe3")
        .to(
          targetPosition.current,
          { x: 0, y: 3.1, z: 10, ease: "sine.inOut" },
          "keyframe3"
        )
        .to(
          targetScale.current,
          { x: 58, y: 58, z: 56, ease: "sine.inOut" },
          "keyframe3"
        )
        .to(
          targetRotation.current,
          {
            x: 0,
            y: degToRad(183),
            z: 0,
            ease: "sine.inOut",
          },
          "keyframe3"
        );
    });

    return () => ctx.revert();
  }, [scene, onModelReady]);

  // Smooth frame update
  useFrame(() => {
    if (group.current) {
      group.current.position.lerp(targetPosition.current, 0.1);
      group.current.scale.lerp(targetScale.current, 0.1);
      group.current.rotation.x +=
        (targetRotation.current.x - group.current.rotation.x) * 0.1;
      group.current.rotation.y +=
        (targetRotation.current.y - group.current.rotation.y) * 0.1;
      group.current.rotation.z +=
        (targetRotation.current.z - group.current.rotation.z) * 0.1;
    }
  });

  return (
    <group ref={group} visible={false}>
      <primitive object={scene} />
    </group>
  );
}

/**
 * ✅ CameraScene
 */
export default function CameraSceneModel1() {
  const [isModelReady, setIsModelReady] = useState(false);
  const [showText, setShowText] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    rootMargin: true,
    margin: "0px 0px -99.999% 0px",
  });
  return (
    <>
      <motion.div
        ref={containerRef}
        id="model-scroll-container"
        style={{ height: "1000vh" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        className="du"
      >
        <Canvas
          camera={{ position: [0, 1, 18], fov: 40, near: 0.01, far: 500 }}
          style={{
            background: "#0d0d0d",
            width: "100vw",
            height: "100vh",
            position: "sticky",
            top: 0,
            zIndex: 0,
          }}
          shadows
        >
          <Suspense fallback={null}>
            {isModelReady && (
              <Environment files="/hdri/07.hdr" background={false} />
            )}
            <Model1 onModelReady={() => setIsModelReady(true)} />
          </Suspense>
        </Canvas>
      </motion.div>
    </>
  );
}

useGLTF.preload("/models/VREC-Z820DC_LOW POLY.glb");
