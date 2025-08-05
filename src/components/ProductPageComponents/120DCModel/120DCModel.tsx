"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { motion, useInView } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const degToRad = (degrees: number) => degrees * (Math.PI / 180);

function CombinedModelAnimation({ onLoadComplete, clipRef }: { onLoadComplete: () => void, clipRef: React.RefObject<HTMLDivElement>; }) {
  const { scene: cameraModelScene } = useGLTF("/models/VREC_H120SC.glb");
  const cameraModelGroupRef = useRef<THREE.Group>(null);
  const viewerCamera = useThree((state) => state.camera);
  const viewerCameraRef = useRef<THREE.PerspectiveCamera>();
  const cameraModelRotation = useRef(new THREE.Euler(0, 0, 0));


  viewerCamera.position.set(0.0063, 0, 0.3); // x, y, z
  viewerCamera.rotation.set(0, 0, 0);
  // viewerCamera.lookAt(0, 0, 0); // ensure it's looking at the model
  viewerCamera.updateProjectionMatrix();
  useEffect(() => {
    if (!cameraModelScene || !cameraModelGroupRef.current) return;

    viewerCameraRef.current = viewerCamera as THREE.PerspectiveCamera;

    cameraModelScene.traverse((node: any) => {
      if (node.isMesh) {
        node.material.side = THREE.DoubleSide;
        node.castShadow = true;
        node.receiveShadow = true;
        node.geometry.computeVertexNormals();
      }
    });

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
        },
      });
      const modelCenter = new THREE.Vector3();
      new THREE.Box3().setFromObject(cameraModelScene).getCenter(modelCenter);
       tl.addLabel("start")
       
        .to(viewerCameraRef.current!.position, { x: 0.0063, y: 0, z: 0.3 }, "start")
        .to(viewerCameraRef.current!.rotation, { x: degToRad(0), y: degToRad(0), z: degToRad(0) }, "start");
      tl.addLabel("adjust-fov")
        .to(viewerCameraRef.current!, {
          fov: 25,
          onUpdate: () => viewerCameraRef.current!.updateProjectionMatrix(),
        }, "adjust-fov")
        .to(viewerCameraRef.current!.position, { x: -0.09, y: 0, z: 0.2 }, "adjust-fov")
        .to(viewerCameraRef.current!.rotation, { x: degToRad(0), y: degToRad(-35), z: degToRad(0) }, "adjust-fov");
      tl.addLabel("rotate-90")
        .to(cameraModelRotation.current, {
          y: cameraModelRotation.current.y + degToRad(70),
          duration: 1,
        }, "rotate-90");
      tl.addLabel("clip-transition")
        .to(clipRef.current, {
          keyframes: [
            { clipPath: "polygon(69% 0%, 75% 0%, 60% 50%, 75% 100%, 69% 100%, 0% 100%, 0% 0%)" },
            { clipPath: "polygon(100% 0%, 100% 0%, 60% 50%, 100% 100%, 100% 100%, 0% 100%, 0% 0%)" },
            { clipPath: "polygon(100% 0.25%, 100% 50%, 60% 50%, 100% 50%, 100% 100%, 0% 100%, 0% 0%)" }
          ],
          duration: 2,
          ease: "power2.inOut",
        }, "rotate-90+=0.2"); // Delay slightly after rotate-90

      tl.addLabel("rotate-180")
        .to(cameraModelRotation.current, {
          y: degToRad(85), // rotate model to face back
          duration: 1,
        }, "rotate-180")
        .to(viewerCameraRef.current!.position, {
          x: -0.19,  // keep same as adjust-fov
          y: 0,
          z: 0.2,
          duration: 1,
        }, "rotate-180")
        .to(viewerCameraRef.current!, {
          fov: 25,
          onUpdate: () => viewerCameraRef.current!.updateProjectionMatrix(),
          duration: 1,
        }, "rotate-180");

      tl.addLabel("show-back")
        .to(cameraModelRotation.current, {
          y: degToRad(150), // rotate model to face back
          duration: 1,
        }, "show-back")
        .to(viewerCameraRef.current!.position, {
          x: -0.138,  // keep same as adjust-fov
          y: 0,
          z: 0.2,
          duration: 1,
        }, "show-back")
        .to(viewerCameraRef.current!, {
          fov: 25,
          onUpdate: () => viewerCameraRef.current!.updateProjectionMatrix(),
          duration: 1,
        }, "show-back");
      tl.addLabel("show-backk")
        .to(cameraModelRotation.current, {
          y: degToRad(150), // rotate model to face back
          duration: 1,
        }, "show-backk")
        .to(viewerCameraRef.current!.position, {
          x: -0.138,  // keep same as adjust-fov
          y: 0,
          z: 0.2,
          duration: 1,
        }, "show-backk")
        .to(viewerCameraRef.current!, {
          fov: 25,
          onUpdate: () => viewerCameraRef.current!.updateProjectionMatrix(),
          duration: 1,
        }, "show-backkk");
      tl.addLabel("show-backkk")
        .to(cameraModelRotation.current, {
          y: degToRad(150), // rotate model to face back
          duration: 1,
        }, "show-backkk")
        .to(viewerCameraRef.current!.position, {
          x: -0.138,  // keep same as adjust-fov
          y: 0,
          z: 0.2,
          duration: 1,
        }, "show-backkk")
        .to(viewerCameraRef.current!, {
          fov: 25,
          onUpdate: () => viewerCameraRef.current!.updateProjectionMatrix(),
          duration: 1,
        }, "show-backkk");
      tl.addLabel("go-right")
        .to(cameraModelRotation.current, {
          y: degToRad(210), // rotate model to face back
          duration: 1,
        }, "go-right")
        .to(viewerCameraRef.current!.position, {
          x: -0.08,  // keep same as adjust-fov
          y: -0.001,
          z: 0.2,
          duration: 1,
        }, "go-right")
        .to(viewerCameraRef.current!, {
          fov: 25,
          onUpdate: () => viewerCameraRef.current!.updateProjectionMatrix(),
          duration: 1,
        }, "go-right");
    });

    return () => ctx.revert();
  }, [cameraModelScene, onLoadComplete]);
  useFrame(() => {
    if (cameraModelGroupRef.current) {
      cameraModelGroupRef.current.rotation.x += (cameraModelRotation.current.x - cameraModelGroupRef.current.rotation.x) * 0.1;
      cameraModelGroupRef.current.rotation.y += (cameraModelRotation.current.y - cameraModelGroupRef.current.rotation.y) * 0.1;
      cameraModelGroupRef.current.rotation.z += (cameraModelRotation.current.z - cameraModelGroupRef.current.rotation.z) * 0.1;
    }
  });

  return (
    <group ref={cameraModelGroupRef}>
      <primitive object={cameraModelScene} />
    </group>
  );
}

export default function Model3() {
  const [modelIsReady, setModelIsReady] = useState(false);
  const containerRef = useRef(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(containerRef, {
    rootMargin: true,
    margin: "0px 0px -99.999% 0px",
  });

  return (
    <motion.div
      ref={containerRef}
      id="model-scroll-container"
      style={{ height: "1500vh" }}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
    >


      <Canvas
        camera={{ position: [0, 0, 1], fov: 1, near: 0.01, far: 500 }}
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
          <CombinedModelAnimation clipRef={clipRef}
            onLoadComplete={() => setModelIsReady(true)} />
        </Suspense>
      </Canvas>

    </motion.div>
  );
}

useGLTF.preload("/models/VREC_H120SC.glb");