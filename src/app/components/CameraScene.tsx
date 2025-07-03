"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

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
      }, 1000); // Delay of 3 seconds

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

function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} color={"#ffffff"} />
      <directionalLight
        intensity={2.5}
        color={"#ffffff"}
        position={[10, 10, 10]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </>
  );
}

/**
 * ✅ CameraScene
 */
export default function CameraScene() {
  const [isModelReady, setIsModelReady] = useState(false);

  return (
    <div id="scroll-container" className="overflow-hidden">
      {/* 👆 You can adjust the height for how long you want to scroll */}
      <div>

        <h1></h1>
      </div>
      <div>
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
          <Suspense fallback={null}>
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
