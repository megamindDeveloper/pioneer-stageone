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
  const { scene: cameraModelScene, nodes: cameraNodes } = useGLTF("/models/VREC_H520DC.glb");
  const { scene: carModelScene, nodes } = useGLTF("/models/car.glb");
  const { scene: rearCamScene } = useGLTF("/models/REARCAM.glb");
  const rearCamRef = useRef();
  const rearMountRef = useRef();
  const cameraModelGroupRef = useRef();
  const carModelGroupRef = useRef();
  const viewerCamera = useThree((state) => state.camera);
  const viewerCameraRef = useRef();
  const imagePlaneRef = useRef();
  const imageTextureRef = useRef();

  const cameraModelPosition = useRef(new THREE.Vector3(-2, 0, 13));
  const cameraModelRotation = useRef(new THREE.Euler(0, 0, 0));
  const cameraModelScale = useRef(new THREE.Vector3(100, 100, 100));
  const [readyToAttach, setReadyToAttach] = useState(false);

  const carPosition = useRef(new THREE.Vector3(0, -10, 30));
  const carRotation = useRef(new THREE.Euler(0, Math.PI, 0));
  const carScale = useRef(new THREE.Vector3(10, 10, 10));
  const mountedCameraScale = useRef(new THREE.Vector3(3, 3, 3)); // default when attached

  const [isCameraAttached, setIsCameraAttached] = useState(false);
  const dummyMountRef = useRef(null);
  const displayMountRef = useRef(null);
  useEffect(() => {
    const mount = nodes["CameraMountFront"];
    const backMount = carModelScene.getObjectByName("CameraMountBack");

    if (mount) {
      dummyMountRef.current = mount;
    }
    if (backMount) {
      rearMountRef.current = backMount;
    }
  }, [nodes]);
  useEffect(() => {
    if (!rearCamScene || !carModelScene) return;

    const backMount = carModelScene.getObjectByName("CameraMountRear");
    if (backMount) {
      rearMountRef.current = backMount;

      backMount.add(rearCamScene);
      rearCamScene.position.set(0, 0, 0);
      rearCamScene.rotation.set(0, degToRad(180), 0);
      rearCamScene.scale.set(1, 1, 1);
    } else {
      console.warn("CameraMountBack not found in car model");
    }
  }, [rearCamScene, carModelScene]);

  console.log("rearCamScene", rearCamScene);
  console.log("rearMountRef", rearMountRef.current);

  useEffect(() => {
    const displayMount = cameraModelScene.getObjectByName("DISPLAY");
    if (displayMount) {
      console.log("Found DISPLAY as object:", displayMount);
      displayMountRef.current = displayMount;
    } else {
      console.log("DISPLAY not found");
    }
    // Load image texture
    // Load image texture
    const loader = new THREE.TextureLoader();
    loader.load("/images/820Screen.webp", (texture) => {
      imageTextureRef.current = texture;

      // Create image plane
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(6.3, 2.2),
        new THREE.MeshBasicMaterial({ transparent: false }) // no map yet
      );
      plane.visible = false;
      imagePlaneRef.current = plane;

      if (displayMountRef.current) {
        displayMountRef.current.add(plane);
        plane.position.set(0, 0, -0.2);
      }

      // ✅ Load both textures
      const loader = new THREE.TextureLoader();
      loader.load("/images/820Screen.webp", (texture) => {
        // ✅ Flip horizontally
        texture.center.set(0.5, 0.5);
        texture.repeat.x = -1;
        texture.needsUpdate = true;

        imageTextureRef.current = texture;
        plane.userData.imageMap = texture;

        if (!plane.material.map) {
          plane.material.map = texture;
          plane.material.needsUpdate = true;
        }
      });

      const video = document.createElement("video");
      video.src = "/video/video.mp4";
      video.crossOrigin = "anonymous";
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      video.load();

      const videoTexture = new THREE.VideoTexture(video);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.format = THREE.RGBAFormat;

      plane.userData.videoMap = videoTexture;
      plane.userData.videoEl = video;
    });
  }, [cameraNodes]);
  useEffect(() => {
    console.log("Camera nodes:");
    Object.keys(cameraNodes).forEach((key) => {
      console.log(key); // check what names are available
    });
  }, [cameraNodes]);

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
            console.log(self.progress);
            const direction = self.progress > lastProgress ? "down" : "up";
            console.log(self.progress);
            if (carModelGroupRef.current) {
              if (direction === "down" && self.progress > 0.4) {
                carModelGroupRef.current.visible = true;
              }
              if (direction === "up" && self.progress < 0.4) {
                carModelGroupRef.current.visible = false;

                // cameraModelScale.current.set(100, 100, 100); // Restore scale on detach
              }
            }

            if (direction === "down" && self.progress > 0.6224875930521082 && !isCameraAttached) {
              setIsCameraAttached(true);
              setReadyToAttach(true); // ✅ ensure it’s ready in case GSAP skipped it
              // cameraModelScale.current.set(100, 100, 100);
            }

            if (direction === "up" && self.progress < 0.5224875930521092) {
              setIsCameraAttached(false);
              // cameraModelScale.current.set(100, 100, 100);
            }
            if (self.progress >= 0.417) {
              const { videoMap, videoEl } = imagePlaneRef.current.userData;
              if (videoMap) {
                if (imagePlaneRef.current.material.map !== videoMap) {
                  imagePlaneRef.current.material.map = videoMap;
                  imagePlaneRef.current.material.needsUpdate = true;
                }
                if (videoEl && videoEl.paused) videoEl.play();
                imagePlaneRef.current.visible = true;
              } else {
                // fallback: hide until video is ready
                imagePlaneRef.current.visible = false;
              }
            } else if (self.progress >= 0.27 && self.progress <= 0.36) {
              const { imageMap, videoEl } = imagePlaneRef.current.userData;
              if (imageMap && imagePlaneRef.current.material.map !== imageMap) {
                imagePlaneRef.current.material.map = imageMap;
                imagePlaneRef.current.material.needsUpdate = true;
              }
              if (videoEl && !videoEl.paused) videoEl.pause();
              imagePlaneRef.current.visible = true;
            } else {
              const { videoEl } = imagePlaneRef.current.userData;
              imagePlaneRef.current.visible = false;
              if (videoEl && !videoEl.paused) videoEl.pause();
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
        .to(cameraModelPosition.current, { x: 7, y: 3, z: 2 }, "rotate-and-scale")
        .to(
          cameraModelRotation.current,
          {
            x: 0,
            y: degToRad(120),
            z: 0,
          },
          "rotate-and-scale"
        );
      tl.addLabel("rotate-and-scalee")
        .to(cameraModelPosition.current, { x: 7, y: 3, z: 0 }, "rotate-and-scale")
        .to(
          cameraModelRotation.current,
          {
            x: 0,
            y: degToRad(120),
            z: 0,
          },
          "rotate-and-scalee"
        );
      tl.addLabel("rotate-and-scaleee")
        .to(cameraModelPosition.current, { x: -8, y: 2, z: 0 }, "rotate-and-scaleee")
        .to(
          cameraModelRotation.current,
          {
            x: 0,
            y: degToRad(430),
            z: 0,
          },
          "rotate-and-scaleee"
        );
      tl.addLabel("final-pose")
        .to(cameraModelPosition.current, { x: 0, y: 3, z: 0 }, "final-pose")
        .to(
          cameraModelRotation.current,
          {
            x: 0,
            y: degToRad(540),
            z: 0,
          },
          "final-pose"
        );
      tl.addLabel("final-posee")
        // .to(cameraModelScale.current, { x: 50, y: 50, z: 50 }, "final-posee")
        .to(cameraModelPosition.current, { x: 0, y: 6, z: 0 }, "final-posee");
      tl.addLabel("final-poseee")
        .to(cameraModelScale.current, { x: 50, y: 50, z: 50 }, "final-poseee")
        .to(cameraModelPosition.current, { x: 0, y: 4, z: 0 }, "final-poseee");

      tl.addLabel("camera-attach")
        .to(cameraModelScale.current, { x: 40, y: 40, z: 40 }, "camera-attach")
        .to(cameraModelPosition.current, { x: 0, y: 2, z: 0 }, "camera-attach")
        .to(carScale.current, { x: 5, y: 5, z: 5 }, "camera-attach")
        .to(cameraModelScale.current, { x: 30, y: 30, z: 30 }, "camera-attach")
        .to(carPosition.current, { x: 0, y: -4, z: 5 }, "camera-attach")
        .to(cameraModelScale.current, { x: 7, y: 7, z: 7 }, "camera-attach");

      tl.addLabel("top-view")
        .to(cameraModelScale.current, { x: 2, y: 2, z: 2 }, "camera-attach")
        .to(carPosition.current, { x: 0, y: -20, z: 0 }, "top-view")
        .to(
          viewerCamera.position,
          {
            x: 0,
            y: 20, // pull back far enough to see the whole car
            z: 0,
            ease: "none",
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
            ease: "none",
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
            ease: "none",
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
            ease: "none",
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
            ease: "none",
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

          ease: "none",
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

  useFrame((state) => {
    const cameraGroup = cameraModelGroupRef.current;
    const carGroup = carModelGroupRef.current;
    const mount = dummyMountRef.current;
    const scene = state.scene;

    if (!cameraGroup || !mount) return;

    const targetPos = new THREE.Vector3();
    const targetQuat = new THREE.Quaternion();
    if (!isCameraAttached) {
      const normalizedEuler = cameraModelRotation.current.clone();
      normalizedEuler.y = THREE.MathUtils.euclideanModulo(normalizedEuler.y + Math.PI, 2 * Math.PI) - Math.PI;

      const targetQ = new THREE.Quaternion().setFromEuler(normalizedEuler);
      cameraGroup.quaternion.slerp(targetQ, 0.1);
    }

    if (isCameraAttached && readyToAttach) {
      mount.getWorldPosition(targetPos);
      mount.getWorldQuaternion(targetQuat);

      const dist = cameraGroup.getWorldPosition(new THREE.Vector3()).distanceTo(targetPos);

      if (dist > 0.01) {
        // Smoothly approach mount
        cameraGroup.position.lerp(targetPos, 0.1);
        cameraGroup.quaternion.slerp(targetQuat, 0.1);
        cameraGroup.scale.lerp(mountedCameraScale.current, 0.1);
      } else if (cameraGroup.parent !== mount) {
        // ✅ When close enough, do real reparenting
        mount.add(cameraGroup);
        cameraGroup.position.set(0, 0, 0); // local to mount
        cameraGroup.quaternion.set(0, 0, 0, 1);
        cameraGroup.scale.copy(mountedCameraScale.current);
      }
    } else if (!isCameraAttached && cameraGroup.parent !== scene) {
      // Reset parenting
      setReadyToAttach(false);
      scene.add(cameraGroup);
    }

    // Sync transforms when detached
    if (!isCameraAttached) {
      cameraGroup.position.lerp(cameraModelPosition.current, 0.1);
      const targetQ = new THREE.Quaternion().setFromEuler(cameraModelRotation.current);
      cameraGroup.quaternion.slerp(targetQ, 0.1);
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
      style={{ height: "4000vh" }}
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

useGLTF.preload("/models/VREC_H520DC.glb");
