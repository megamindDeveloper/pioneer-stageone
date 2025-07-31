"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { motion, useInView } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const degToRad = (degrees) => degrees * (Math.PI / 180);

function CombinedModelAnimation({ onLoadComplete }) {
  const { scene: cameraModelScene } = useGLTF("/models/VREC-Z820DC_LOW POLY.glb");
  const { scene: carModelScene, nodes } = useGLTF("/models/car.glb");

  const cameraModelGroupRef = useRef();
  const carModelGroupRef = useRef();
  const viewerCamera = useThree((state) => state.camera);
  const viewerCameraRef = useRef();

  const cameraModelPosition = useRef(new THREE.Vector3(-3, 2.5, 10));
  const cameraModelRotation = useRef(new THREE.Euler(0, 0, 0));
  const cameraModelScale = useRef(new THREE.Vector3(100, 100, 100));

  const carPosition = useRef(new THREE.Vector3(0, -10, 30));
  const carRotation = useRef(new THREE.Euler(0, Math.PI, 0));
  const carScale = useRef(new THREE.Vector3(10, 10, 10));
  const mountedCameraScale = useRef(new THREE.Vector3(3, 3, 3)); // default when attached

  const [isCameraAttached, setIsCameraAttached] = useState(false);
  const dummyMountRef = useRef(null);

  useEffect(() => {
    const mount = nodes["CameraMountFront"];
    if (mount) {
      dummyMountRef.current = mount;
    }
  }, [nodes]);

  useEffect(() => {
    if (!cameraModelScene || !carModelScene || !cameraModelGroupRef.current || !carModelGroupRef.current) return;

    viewerCameraRef.current = viewerCamera;

    cameraModelScene.traverse((node) => {
      if (node.isMesh) {
        node.material.side = THREE.DoubleSide;
        node.castShadow = true;
        node.receiveShadow = true;
        node.geometry.computeVertexNormals();
      }
    });

    const lensElements = Array.from({ length: 7 }, (_, i) => cameraModelGroupRef.current.getObjectByName(`${i + 1}`))
      .filter(Boolean)
      .reverse();
    lensElements.forEach((part) => {
      if (part) part.position.z = 0;
    });

    onLoadComplete();
    ScrollTrigger.refresh();

    let lastProgress = 0;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#model-scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            console.log(self.progress)
            const direction = self.progress > lastProgress ? "down" : "up";
            console.log(self.progress);
            if (carModelGroupRef.current) {
              if (direction === "down" && self.progress > 0.4) {
                carModelGroupRef.current.visible = true;
              }
              if (direction === "up" && self.progress < 0.4) {
                carModelGroupRef.current.visible = false;

                cameraModelScale.current.set(100, 100, 100); // Restore scale on detach
              }
            }

            if (direction === "down" && self.progress > 0.457 && !isCameraAttached) {
              setIsCameraAttached(true);
            }
            if (direction === "up" && self.progress < 0.457) {
              setIsCameraAttached(false);
            }

            lastProgress = self.progress;
          },
        },
      });

      // Timeline animation
      tl.addLabel("zoom-out")
        .to(
          viewerCamera,
          {
            fov: 40,
            duration: 1,
            onUpdate: () => viewerCamera.updateProjectionMatrix(),
          },
          "zoom-out"
        )
        .to(
          viewerCamera.position,
          {
            x: 0,
            y: 2,
            z: 20,
            duration: 1,
          },
          "zoom-out"
        )
        .to(cameraModelPosition.current, { x: -6, y: 3, z: 0.5 }, "zoom-out")
        .to(
          cameraModelRotation.current,
          {
            x: degToRad(-20),
            y: degToRad(55),
            z: degToRad(20),
          },
          "zoom-out"
        );

      tl.addLabel("lens-explode");
      lensElements.forEach((part, i) => {
        tl.to(part.position, { z: [0.02, 0.06, 0.05, 0.06, 0.07, 0.01][i] || 0 }, "lens-explode");
      });
      tl.addLabel("lens-collapse");
      lensElements.forEach((part) => {
        tl.to(part.position, { z: 0 }, "lens-collapse");
      });

      tl.addLabel("rotate-and-scale")
        .to(cameraModelPosition.current, { x: 7, y: 5, z: 0 }, "rotate-and-scale")
        .to(
          cameraModelRotation.current,
          {
            x: 0,
            y: degToRad(120),
            z: 0,
          },
          "rotate-and-scale"
        );

      tl.addLabel("final-pose")
        .to(cameraModelPosition.current, { x: 0, y: 9, z: 0 }, "final-pose")
        .to(
          cameraModelRotation.current,
          {
            x: 0,
            y: degToRad(180),
            z: 0,
          },
          "final-pose"
        );
      tl.addLabel("final-posee")
        .to(cameraModelScale.current, { x: 50, y: 50, z: 50 }, "final-posee")
        .to(cameraModelPosition.current, { x: 0, y: 5, z: 0 }, "final-posee");

      tl.addLabel("camera-attach")
        // .to(cameraModelScale.current, { x: 12, y: 12, z: 12 }, "camera-attach")
        .to(carScale.current, { x: 5, y: 5, z: 5 }, "camera-attach")
        .to(carPosition.current, { x: 0, y: -4, z: 5 }, "camera-attach")
        .to(cameraModelScale.current, { x: 0.1, y: 0.1, z: 0.1 }, "camera-attach")
        .to(cameraModelPosition.current, { x: 0, y:1, z: 0 }, "camera-attach");
      tl.addLabel("top-view")
        .to(carPosition.current, { x: 0, y: -20, z: 0 }, "top-view")
        .to(
          viewerCamera.position,
          {
            x: 0,
            y: 20, // pull back far enough to see the whole car
            z: 0,
            duration: 1.2,
            ease: "power2.out",
            onUpdate: () => viewerCamera.updateProjectionMatrix(),
          },
          "top-view"
        )
        .to(
          viewerCamera.rotation,
          {
            x: degToRad(-90),
            y: 0,
            z: 0,
            duration: 1.2,
            ease: "power2.out",
          },
          "top-view"
        )
        .to(
          viewerCamera,
          {
            fov: 45, // widen field of view to show more
            duration: 1.2,
            onUpdate: () => viewerCamera.updateProjectionMatrix(),
          },
          "top-view"
        );
      tl.addLabel("aerial-right-view")
        // Move car toward screen right
        .to(
          carPosition.current,
          {
            x: 0, // Increase X for more rightward movement
            y: -20,
            z: 20,
            duration: 1.5,
            ease: "power2.out",
          },
          "aerial-right-view"
        )

        // Keep top-down camera but pull out further to fit car + space
        .to(
          viewerCamera.position,
          {
            x: 0,
            y: 40, // Higher up
            z: 0,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => viewerCamera.updateProjectionMatrix(),
          },
          "aerial-right-view"
        )

        // Rotate to keep top-down but tilt a bit for better parallax
        .to(
          viewerCamera.rotation,
          {
            x: degToRad(-90),
            y: 0,
            z: degToRad(-90), // slight angle gives feeling of motion
            duration: 1.5,
            ease: "power2.out",
          },
          "aerial-right-view"
        )

        .to(
          viewerCamera,
          {
            fov: 15, // slightly tighter to emphasize motion
            duration: 1.5,
            onUpdate: () => viewerCamera.updateProjectionMatrix(),
          },
          "aerial-right-view"
        );
      tl.addLabel("outFromTheScreen").to(
        carPosition.current,
        {
          x: 0, // Increase X for more rightward movement
          y: -20,
          z: -40,
          duration: 1.5,
          ease: "power2.out",
        },
        "outFromTheScreen"
      );
      // .to(viewerCamera, {
      //   fov: 55,
      //   duration: 1.2,
      //   onUpdate: () => viewerCamera.updateProjectionMatrix(),
      // }, "aerial-right-view");
    });

    return () => ctx.revert();
  }, [cameraModelScene, carModelScene, onLoadComplete]);

  useFrame(() => {
    const cameraGroup = cameraModelGroupRef.current;
    const carGroup = carModelGroupRef.current;

    if (isCameraAttached && dummyMountRef.current && cameraGroup) {
      const mountWorldPos = new THREE.Vector3();
      const mountWorldQuat = new THREE.Quaternion();

      dummyMountRef.current.getWorldPosition(mountWorldPos);
      dummyMountRef.current.getWorldQuaternion(mountWorldQuat);

      cameraGroup.position.lerp(mountWorldPos, 0.2);
      cameraGroup.quaternion.slerp(mountWorldQuat, 0.2);
    } else if (cameraGroup) {
      cameraGroup.position.lerp(cameraModelPosition.current, 0.1);

      // ✅ New fix: interpolate using quaternions to avoid 360° spins
      const targetQuat = new THREE.Quaternion().setFromEuler(cameraModelRotation.current);
      cameraGroup.quaternion.slerp(targetQuat, 0.1);
    }

    if (isCameraAttached) {
      cameraGroup.scale.lerp(mountedCameraScale.current, 0.1);
    } else {
      cameraGroup.scale.lerp(cameraModelScale.current, 0.1);
    }

    if (carGroup) {
      carGroup.position.lerp(carPosition.current, 0.1);
      carGroup.rotation.x += (carRotation.current.x - carGroup.rotation.x) * 0.1;
      carGroup.rotation.y += (carRotation.current.y - carGroup.rotation.y) * 0.1;
      carGroup.rotation.z += (carRotation.current.z - carGroup.rotation.z) * 0.1;
      carGroup.scale.lerp(carScale.current, 0.1);
    }
  });

  return (
    <>
      <group ref={cameraModelGroupRef}>
        <primitive object={cameraModelScene} />
      </group>
      <group ref={carModelGroupRef} visible={false}>
        <primitive object={carModelScene} />
      </group>
    </>
  );
}

export default function CameraToCarScene() {
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
      style={{ height: "3000vh" }}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 18], fov: 30, near: 0.01, far: 500 }}
        style={{ background: "#0D0D0D", width: "100vw", height: "100vh", position: "sticky", top: 0 }}
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

useGLTF.preload("/models/VREC-Z820DC_LOW POLY.glb");
