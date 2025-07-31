"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

const degToRad = (degrees) => degrees * (Math.PI / 180);

gsap.registerPlugin(ScrollTrigger);

function CameraCarMountScene({ onLoadComplete }) {
  const { scene: frontCameraModelScene } = useGLTF("/models/VREC-Z820DC_LOW POLY.glb");
  const { scene: rearCameraModelScene } = useGLTF("/models/REARCAM.glb");
  const { scene: carModelScene, nodes } = useGLTF("/models/car.glb");

  const frontCameraRef = useRef();
  const rearCameraRef = useRef();
  const carModelRef = useRef();
  const frontMountRef = useRef(null);
  const rearMountRef = useRef(null);

  const viewerCamera = useThree((state) => state.camera);

  useEffect(() => {
    frontMountRef.current = nodes["CameraMountFront"];
    rearMountRef.current = nodes["CameraMountRear"];
  }, [nodes]);

  useEffect(() => {
    frontCameraModelScene.traverse((node) => {
      if (node.isMesh) {
        node.material.side = THREE.DoubleSide;
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    rearCameraModelScene.traverse((node) => {
      if (node.isMesh) {
        node.material.side = THREE.DoubleSide;
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    carModelScene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        node.material.transparent = true;
        node.material.opacity = 0; // Initial opacity reduced
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
        },
      });

      tl.addLabel("start")
        .to(viewerCamera.position, {
          x: 0,
          y: 2,
          z: 5,
          duration: 1,
          onUpdate: () => viewerCamera.updateProjectionMatrix(),
        }, "start")
        .to(viewerCamera.rotation, {
          x: degToRad(0),
          y: degToRad(0),
          z: 0,
          duration: 1,
        }, "start")
        .to(viewerCamera, {
          fov: 35,
          duration: 1,
          onUpdate: () => viewerCamera.updateProjectionMatrix(),
        }, "start")
        .to(carModelScene.children.map(n => n.material), {
          opacity: 1,
          duration: 1,
          onUpdate: () => carModelScene.traverse(n => n.material && (n.material.needsUpdate = true)),
        }, "start")

        .addLabel("hide-car")
        .to(carModelScene.children.map(n => n.material), {
          opacity: 0,
          duration: 1,
          onUpdate: () => carModelScene.traverse(n => n.material && (n.material.needsUpdate = true)),
        }, "hide-car")

        .addLabel("show-car")
        .to(carModelScene.children.map(n => n.material), {
          opacity: 1,
          duration: 1,
          onUpdate: () => carModelScene.traverse(n => n.material && (n.material.needsUpdate = true)),
        }, "show-car");
    });

    return () => ctx.revert();
  }, [frontCameraModelScene, rearCameraModelScene, carModelScene, onLoadComplete]);

  useFrame(() => {
    if (frontMountRef.current && frontCameraRef.current && frontCameraRef.current.parent !== frontMountRef.current) {
      frontMountRef.current.add(frontCameraRef.current);
      frontCameraRef.current.position.set(0, 0, 0);
      frontCameraRef.current.quaternion.set(0, 0, 0, 1);
    }
    if (rearMountRef.current && rearCameraRef.current && rearCameraRef.current.parent !== rearMountRef.current) {
      rearMountRef.current.add(rearCameraRef.current);
      rearCameraRef.current.position.set(0, 0, 0);
      rearCameraRef.current.quaternion.set(0, 0, 0, 1);
    }
  });

  return (
    <>
      <group ref={frontCameraRef}>
        <primitive object={frontCameraModelScene} />
      </group>
      <group ref={rearCameraRef}>
        <primitive object={rearCameraModelScene} />
      </group>
      <group ref={carModelRef}>
        <primitive object={carModelScene} />
      </group>
    </>
  );
}

export default function CameraToCarScene() {
  const [modelIsReady, setModelIsReady] = useState(false);
  const containerRef = useRef(null);

  return (
    <div id="model-scroll-container" ref={containerRef} style={{ height: "3000vh" }}>
      <Canvas
        camera={{ position: [0, 0, 0], fov: 10, near: 0.01, far: 500 }}
        style={{ background: "#0D0D0D", width: "100vw", height: "100vh", position: "sticky", top: 0 }}
        shadows
      >
        <Suspense fallback={null}>
          {modelIsReady && <Environment files="/hdri/07.hdr" background={false} />}
          <CameraCarMountScene onLoadComplete={() => setModelIsReady(true)} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/VREC-Z820DC_LOW POLY.glb");
useGLTF.preload("/models/REARCAM.glb");
useGLTF.preload("/models/car.glb");
