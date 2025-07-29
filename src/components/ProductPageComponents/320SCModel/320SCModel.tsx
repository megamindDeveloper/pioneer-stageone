"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { motion, useInView } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * 🔁 Degrees ➜ Radians converter
 */
const degToRad = (degrees: number) => degrees * (Math.PI / 180);

/**
 * ✅ Utility: Displays an image plane (not used in this case but ready to be reused)
 */
function ImageBillboard({
  textureUrl,
  visible,
  opacity = 1,
  position = [0, 0, 0],
  scale = [1, 1, 1],
}: {
  textureUrl: string;
  visible: boolean;
  opacity?: number;
  position?: [number, number, number];
  scale?: [number, number, number];
}) {
  const [texture] = useState(() => new THREE.TextureLoader().load(textureUrl));

  return (
    <mesh visible={visible} position={position} scale={scale}>
      <planeGeometry args={[2, 1.125]} />
      <meshBasicMaterial map={texture} transparent opacity={opacity} toneMapped={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

/**
 * ✅ CombinedModelAnimation Component
 * - Manages both the camera model animation and the car model transition.
 */
function CombinedModelAnimation({ onLoadComplete }: { onLoadComplete: () => void }) {
  const { scene: cameraModelScene } = useGLTF("/models/VREC_H320SC.glb");
  const { scene: carModelScene, nodes } = useGLTF("/models/car.glb");

  const cameraModelGroupRef = useRef<THREE.Group>(null);
  const carModelGroupRef = useRef<THREE.Group>(null);
  const viewerCamera = useThree((state) => state.camera);
  const viewerCameraRef = useRef<THREE.PerspectiveCamera>();

  // Target state values for animation interpolation
  const cameraModelPosition = useRef(new THREE.Vector3(0, 1, 15));
  const cameraModelScale = useRef(new THREE.Vector3(100, 100, 100));
  const cameraModelRotation = useRef(new THREE.Euler(0, 0, 0));

  const carModelPosition = useRef(new THREE.Vector3(0, 0, 0));
  const carModelScale = useRef(new THREE.Vector3(2, 2, 2));
  const carModelRotation = useRef(new THREE.Euler(0, degToRad(180), 0));
  const dummyMountRef = useRef<THREE.Object3D | null>(null);
  useEffect(() => {
    const mount = nodes["CameraMountFront"];
    if (mount) {
      dummyMountRef.current = mount;
      console.log("found");
    } else {
      console.warn("⚠️ 'cameraMount' node not found in GLB. Check naming in Blender.");
    }
  }, [nodes]);

  useEffect(() => {
    if (!cameraModelScene || !carModelScene || !cameraModelGroupRef.current || !carModelGroupRef.current) return;

    // Set car model hidden initially

    // Store camera ref for animation
    viewerCameraRef.current = viewerCamera as THREE.PerspectiveCamera;

    // Ensure camera model renders properly
    cameraModelScene.traverse((node: any) => {
      if (node.isMesh) {
        node.material.side = THREE.DoubleSide;
        node.castShadow = true;
        node.receiveShadow = true;
        node.geometry.computeVertexNormals();
      }
    });

    // 🎯 Lens elements for explode/collapse
    // const lensElements = Array.from({ length: 7 }, (_, i) => cameraModelGroupRef.current!.getObjectByName(`${i + 1}`))
    //   .filter(Boolean)
    //   .reverse();

    // // Initialize lens positions
    // lensElements.forEach((part) => {
    //   if (part) part.position.z = 0.02222222;
    // });

    onLoadComplete();
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#model-scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
          onLeaveBack: () => {
            // Only hide car if you want,
            // but do NOT reset camera positions/rotations/scales.
            if (carModelGroupRef.current) carModelGroupRef.current.visible = false;
          },
        },
      });

      // 🎬 CAMERA MODEL ANIMATIONS
      tl.addLabel("zoom-in")
        .to(cameraModelPosition.current, { x: -5, y: 1.75, z: 0.5 }, "zoom-in")
        .to(cameraModelScale.current, { x: 100, y: 110, z: 100 }, "zoom-in")
        .to(cameraModelRotation.current, { x: degToRad(-20), y: degToRad(55), z: degToRad(20) }, "zoom-in");

      // 🔧 Lens explode
    //   tl.addLabel("lens-explode");
    //   lensElements.forEach((part, i) => {
    //     tl.to(part.position, { z: [0.04, 0.055, 0.07, 0.08, 0.09, 0.1][i] || 0 }, "lens-explode");
    //   });

    //   // 🔧 Lens collapse
    //   tl.addLabel("lens-collapse");
    //   lensElements.forEach((part) => {
    //     tl.to(part.position, { z: 0.02222222 }, "lens-collapse");
    //   });

      // 🔁 Rotation & scale
      tl.addLabel("rotate-and-scale")
        .to(cameraModelPosition.current, { x: 7, y: 2, z: 0 }, "rotate-and-scale")
        .to(cameraModelScale.current, { x: 80, y: 100, z: 80 }, "rotate-and-scale")
        .to(cameraModelRotation.current, { x: 0, y: degToRad(120), z: 0 }, "rotate-and-scale");
      tl.addLabel("finall-pose")
        .to(cameraModelPosition.current, { x: 0.1, y: 3.1, z: 10 }, "finall-pose")
        .to(cameraModelScale.current, { x: 55, y: 55, z: 55 }, "final-pose")
        .to(cameraModelRotation.current, { x: 0, y: degToRad(180), z: 0 }, "final-pose");
      // 🏁 Final pose before transition
      tl.addLabel("final-pose")
        .to(cameraModelPosition.current, { x: 15, y: 3.1, z: 10 }, "final-pose")
        .to(cameraModelScale.current, { x: 55, y: 55, z: 55 }, "final-pose")
        .to(cameraModelRotation.current, { x: 0, y: degToRad(180), z: 0 }, "final-pose");
      tl.add(() => {
        if (dummyMountRef.current && cameraModelGroupRef.current && dummyMountRef.current.children.indexOf(cameraModelGroupRef.current) === -1) {
          dummyMountRef.current.add(cameraModelGroupRef.current);

          // 🔍 Reset local transform
          cameraModelGroupRef.current.position.set(0, -0.009, 0);
          cameraModelGroupRef.current.rotation.set(0, 0, 0);
          cameraModelGroupRef.current.scale.set(1.4, 1.4, 1.4); // Try 1 first, adjust later

          // 🧪 Log the world position for sanity check
          console.log("Mounted camera at", dummyMountRef.current.getWorldPosition(new THREE.Vector3()));
        }
      }, "final-pose+=0.001");

      // 🚗 Show Car + Reset Camera
      tl.add(() => {
        carModelGroupRef.current!.visible = false;
        carModelGroupRef.current!.visible = true;
        viewerCameraRef.current!.position.set(0, 2.4, -0.6);
        viewerCameraRef.current!.rotation.set(0, 0, 0);
      }, "final-pose+=0.002"); // Just after camera mounts
      // tl.to(cameraModelGroupRef.current!.position, {
      //   x: 0.02,
      //   y: 1,
      //   z: -0.01,
      // }, "mounted-adjust");
      
      // tl.to(cameraModelGroupRef.current!.rotation, {
      //   x: degToRad(5),
      //   y: 0,
      //   z: degToRad(1),
      // }, "mounted-adjust");
      
      tl.add(() => {
        carModelGroupRef.current!.visible = false;
      }, 0); // Hide at timeline start, so it shows/hides based on scroll
      // 🚘 Car fly-through animation (camera only)
      
      tl.addLabel("drive-front")
        .to(viewerCameraRef.current!.position, { x: 0, y: 2.4, z: 1 }, "drive-front")
        .to(viewerCameraRef.current!.rotation, { x: 0, y: degToRad(0), z: 0 }, "drive-front")
        .to(
          viewerCameraRef.current!,
          {
            fov: 24,
            onUpdate: () => viewerCameraRef.current!.updateProjectionMatrix(),
          },
          "drive-front"
        );

      tl.addLabel("drive-rear").to(viewerCameraRef.current!.position, { x: 0, y: 2.3, z: 5.7 }, "drive-rear");

      tl.addLabel("top-down")
        .to(viewerCameraRef.current!.position, { x: 0, y: 10, z: 0 }, "top-down")
        .to(viewerCameraRef.current!.rotation, { x: degToRad(-90), y: 0, z: 0 }, "top-down")
        .to(
          viewerCameraRef.current!,
          {
            fov: 50,
            onUpdate: () => viewerCameraRef.current!.updateProjectionMatrix(),
          },
          "top-down"
        );

      tl.addLabel("aerial-view")
        .to(viewerCameraRef.current!.position, { x: 0, y: 30, z: -5 }, "aerial-view")
        .to(viewerCameraRef.current!.rotation, { x: degToRad(-90), y: 0, z: degToRad(-90) }, "aerial-view")
        .to(
          viewerCameraRef.current!,
          {
            fov: 15,
            onUpdate: () => viewerCameraRef.current!.updateProjectionMatrix(),
          },
          "aerial-view"
        );

      // tl.addLabel("rear-aerial")
      //   .to(viewerCameraRef.current!.position, { x: 0, y: 30, z: 13 }, "rear-aerial");
    });

    return () => ctx.revert(); // Cleanup
  }, [cameraModelScene, carModelScene, onLoadComplete]);

  useFrame(() => {
    const cameraModel = cameraModelGroupRef.current;
    const dummyMount = dummyMountRef.current;
    const isMounted = dummyMount && dummyMount.children.includes(cameraModel);

    // Only animate camera model if it's NOT mounted in the dummy
    if (cameraModel && !isMounted) {
      cameraModel.position.lerp(cameraModelPosition.current, 0.1);
      cameraModel.scale.lerp(cameraModelScale.current, 0.1);
      cameraModel.rotation.x += (cameraModelRotation.current.x - cameraModel.rotation.x) * 0.1;
      cameraModel.rotation.y += (cameraModelRotation.current.y - cameraModel.rotation.y) * 0.1;
      cameraModel.rotation.z += (cameraModelRotation.current.z - cameraModel.rotation.z) * 0.1;
    }

    // Always animate car model (unless you plan to reparent it too)
    const carModel = carModelGroupRef.current;
    if (carModel) {
      carModel.position.lerp(carModelPosition.current, 0.1);
      carModel.scale.lerp(carModelScale.current, 0.1);
      carModel.rotation.x += (carModelRotation.current.x - carModel.rotation.x) * 0.1;
      carModel.rotation.y += (carModelRotation.current.y - carModel.rotation.y) * 0.1;
      carModel.rotation.z += (carModelRotation.current.z - carModel.rotation.z) * 0.1;
    }
  });

  return (
    <>
      <group ref={cameraModelGroupRef}>
        <primitive object={cameraModelScene} />
      </group>

      <group ref={carModelGroupRef} visible={false} position={[0, 0, 0]} scale={[100, 100, 100]} rotation={[0, 0, 0]}>
        <primitive object={carModelScene} />
      </group>
    </>
  );
}

/**
 * ✅ Top-level Scene Component
 */
export default function Model3() {
  const [modelIsReady, setModelIsReady] = useState(false);
  const containerRef = useRef(null);
  const isVisible = useInView(containerRef, {
    rootMargin: true,
    margin: "0px 0px -99.999% 0px",
  });

  return (
    <motion.div
      ref={containerRef}
      id="model-scroll-container"
      style={{ height: "2000vh" }}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
    >
      <Canvas
        camera={{ position: [0, 1, 18], fov: 40, near: 0.01, far: 500 }}
        style={{
          background: "#0D0D0D",
          width: "100vw",
          height: "100vh",
          position: "sticky",
          top: 0,
          zIndex: 0,
        }}
        shadows
      >
        <Suspense fallback={null}>
          {modelIsReady && <Environment files="/hdri/07.hdr" background={false} />}
          <CombinedModelAnimation onLoadComplete={() => setModelIsReady(true)} />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}

useGLTF.preload("/models/VREC_H320SC.glb");