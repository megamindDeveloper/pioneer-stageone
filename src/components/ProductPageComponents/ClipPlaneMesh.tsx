"use client";

import { useLoader, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ClipPlaneMesh() {
  const texture = useLoader(TextureLoader, "/images/beamOverlay.png");
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // ✅ Project the mesh directly in front of the camera (centered)
    const distanceFromCamera = 0.05;

    const direction = new THREE.Vector3(0, 0, -1); // Camera looks down -Z
    direction.applyQuaternion(camera.quaternion);

    const targetPosition = new THREE.Vector3();
    targetPosition.copy(camera.position).addScaledVector(direction, distanceFromCamera);

    mesh.position.copy(targetPosition);
    mesh.quaternion.copy(camera.quaternion); // Face the same direction

    mesh.scale.set(0, 0, 0); // start invisible
    mesh.material.opacity = 0;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#model-scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.addLabel("rotate-90")
      .to(mesh.scale, {
        x: 0.3,
        y: 0.3,
        duration: 2,
        ease: "power2.inOut",
      }, "rotate-90")
      .to(mesh.material, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.inOut",
      }, "rotate-90");
  }, []);

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0}
        side={THREE.DoubleSide}
        depthWrite={false}
        color="white"
      />
    </mesh>
  );
}
