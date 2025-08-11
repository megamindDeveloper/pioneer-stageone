"use client";

import React, {
  Suspense,
  useRef,
  useEffect,
  useState,
  useMemo,
} from "react";
import {
  Canvas,
  useFrame,
  useThree,
} from "@react-three/fiber";
import {
  Environment,
  useGLTF,
  useTexture,
  AdaptiveDpr,
  useProgress,
  PerformanceMonitor,
} from "@react-three/drei";
import * as THREE from "three";
import { SRGBColorSpace } from "three";
import FadeLoader from "@/components/CommonComponents/Loader";
// import Model1TextOverlay from "../Textoverlay/Textoverlay"; // Uncomment if needed

// Pre-load assets
useGLTF.preload("/models/car.glb");
useGLTF.preload("/models/VREC-Z820dc-opt.glb");
useGLTF.preload("/models/VREC-Z820dc-opt.glb");
useTexture.preload("/modelImages/CommonModelImages/aiNight.png");

// ========== MOBILE DETECTION ==========
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => {
      setIsMobile(
        window.innerWidth < 768 ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      );
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ========== RESOURCE DISPOSAL ==========
function disposeScene(scene: THREE.Object3D) {
  scene.traverse((obj: any) => {
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
      else obj.material.dispose();
    }
    if (obj.texture) obj.texture.dispose();
  });
}

// ========== ANIMATION DATA ==========
const animationData = [
  { time: 0.0, position: [0.0081, 1.2133, 0.38], quaternion: [0.0, 0.0, 0.0, 1.0], fov: 20 },
  { time: 0.0, position: [0.0081, 1.2133, 0.40], quaternion: [0.0, 0.0, 0.0, 1.0], fov: 20 },
  { time: 0.0417, position: [-0.08, 1.213, 0.48], quaternion: [0.02902204, -0.37, -0.0781377, 0.9276399], fov: 20 },
  { time: 0.122, position: [-0.09, 1.216, 0.32], quaternion: [-0.0, -0.75, 0.0000004, 0.61231], fov: 20 },
  { time: 0.1667, position: [-0.0, 1.21, 0.292], quaternion: [0, 1.0, 0.0, 0.0], fov: 20 },
  { time: 0.1667, position: [-0.00, 1.205, 0.26], quaternion: [0, 1.0, 0, 0], fov: 20 },
  { time: 0.2083, position: [-0.00, 1.2136, 0.1], quaternion: [0.0, 1.0, -0.00000004, 0.00000004], fov: 20 },
  { time: 0.25, position: [-0.0093, 1.2509, -2.2], quaternion: [0.00000002, 0.99999607, 0.00280268, 0.00000016], fov: 20 },
  { time: 0.2917, position: [-0.0093, 3.9288, -3.2975], quaternion: [0.00000007, 0.9208445, 0.38993004, 0.00000008], fov: 35 },
  { time: 0.3333, position: [-0.0093, 6.6768, 0.0038], quaternion: [-0.0000001, 0.70092404, 0.71323591, 0.0000003], fov: 40 },
  { time: 0.3333, position: [-0.0093, 6.6768, 0.0038], quaternion: [-0.0000001, 0.70092404, 0.71323591, 0.0000003], fov: 40 },
  { time: 0.3333, position: [-0.0093, 6.6768, 0.0038], quaternion: [-0.0000001, 0.70092404, 0.71323591, 0.0000003], fov: 40 },
  { time: 0.375, position: [-0.0093, 6.6768, 2.0115], quaternion: [-0.50217175, 0.49781877, 0.50217175, 0.49781883], fov: 20 },
  { time: 0.375, position: [-0.0092, 6.6768, -9], quaternion: [-0.50217175, 0.49781877, 0.50217175, 0.49781883], fov: 20 },
];
const degToRad = (degrees: number): number => degrees * (Math.PI / 180);

// ========== INTERPOLATION HELPERS ==========
function interpolateCamera(time: number, dashcamGroupRef?: React.RefObject<THREE.Group | null>) {
  const totalFrames = animationData.length;
  const frameIndex = time * (totalFrames - 1);
  const frame1 = Math.floor(frameIndex);
  const frame2 = Math.min(frame1 + 1, totalFrames - 1);
  const t = frameIndex - frame1;

  const keyframe1 = animationData[frame1];
  const keyframe2 = animationData[frame2];

  const pos1 = new THREE.Vector3(...keyframe1.position);
  const pos2 = new THREE.Vector3(...keyframe2.position);
  const position = pos1.lerp(pos2, t);

  const isProblematicRange = keyframe1.time === 0.0417 && keyframe2.time === 0.0833;

  let quaternion: THREE.Quaternion;

  if (isProblematicRange) {
    const quat1 = new THREE.Quaternion(...keyframe1.quaternion);
    const quat2 = new THREE.Quaternion(...keyframe2.quaternion);
    const normalQuaternion = new THREE.Quaternion();
    normalQuaternion.slerpQuaternions(quat1, quat2, t);

    let target: THREE.Vector3;
    if (dashcamGroupRef?.current) {
      target = new THREE.Vector3();
      dashcamGroupRef.current.getWorldPosition(target);
    } else {
      target = new THREE.Vector3(0, 1.2, 0.3);
    }

    const direction = new THREE.Vector3().subVectors(position, target).normalize();
    const distance = new THREE.Vector3(...keyframe1.position).distanceTo(target);
    const newPosition = new THREE.Vector3().copy(target).add(direction.multiplyScalar(distance));
    const blendFactor = THREE.MathUtils.smoothstep(0, 1, t);
    position.lerpVectors(position, newPosition, blendFactor);

    const tempCamera = new THREE.PerspectiveCamera();
    tempCamera.position.copy(position);
    tempCamera.lookAt(target);
    const lookAtQuaternion = tempCamera.quaternion.clone();

    const smoothBlend = THREE.MathUtils.smoothstep(0.4, 0.6, t);
    quaternion = new THREE.Quaternion();
    quaternion.slerpQuaternions(normalQuaternion, lookAtQuaternion, smoothBlend);
  } else {
    const quat1 = new THREE.Quaternion(...keyframe1.quaternion);
    const quat2 = new THREE.Quaternion(...keyframe2.quaternion);
    quaternion = new THREE.Quaternion();
    quaternion.slerpQuaternions(quat1, quat2, t);
  }

  const fov1 = keyframe1.fov;
  const fov2 = keyframe2.fov;
  const focalLength = THREE.MathUtils.lerp(fov1, fov2, t);

  return { position, quaternion, focalLength };
}

function interpolateCameraFromScroll(scrollProgress: number, dashcamGroupRef?: React.RefObject<THREE.Group | null>) {
  return interpolateCamera(scrollProgress, dashcamGroupRef);
}

// ========== MAIN COMPONENTS ==========
function useCameraAnimationSync(
  scrollProgress: number,
  carScene: THREE.Group,
  dashcamGroupRef: React.RefObject<THREE.Group | null>,
  dashcamOffsetGroupRef: React.RefObject<THREE.Group | null>,
  setLensAnimation: (isAnimating: boolean) => void,
  isMobile: boolean
) {
  const { camera } = useThree();
  const explodedRef = useRef(false);
  const cameraMountWorldMatrix = new THREE.Matrix4();
  const lastUpdate = useRef(0);

  // PATCH: Memoized objects to prevent excessive garbage collection in the render loop.
  const positionTemp = useMemo(() => new THREE.Vector3(), []);
  const quaternionTemp = useMemo(() => new THREE.Quaternion(), []);

  useFrame(() => {
    // if (isMobile && performance.now() - lastUpdate.current < 33) return; // Optional throttling

    const inExplodeRange = scrollProgress >= 0.195 && scrollProgress < 0.235;

    if (inExplodeRange && !explodedRef.current) {
      console.log("🎯 Scroll in range → EXPLODE");
      setLensAnimation(true);
      explodedRef.current = true;
    }

    if (!inExplodeRange && explodedRef.current) {
      console.log("🎯 Scroll out of range → COLLAPSE");
      setLensAnimation(false);
      explodedRef.current = false;
    }

    const start = 0.06;
    const end = 1.0;
    const progressInRange = THREE.MathUtils.clamp((scrollProgress - start) / (end - start), 0, 1);
    const { position, quaternion, focalLength } = interpolateCameraFromScroll(progressInRange, dashcamGroupRef);

    camera.position.copy(position);
    camera.quaternion.copy(quaternion);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = focalLength;
      camera.updateProjectionMatrix();
    }

    const cameraMount = carScene.getObjectByName("CameraMountFront");
    if (cameraMount && dashcamGroupRef?.current && dashcamOffsetGroupRef?.current) {
      cameraMount.updateWorldMatrix(true, false);
      cameraMountWorldMatrix.copy(cameraMount.matrixWorld);
      dashcamGroupRef.current.matrix.copy(cameraMountWorldMatrix);
      dashcamGroupRef.current.matrix.decompose(dashcamGroupRef.current.position, dashcamGroupRef.current.quaternion, dashcamGroupRef.current.scale);
    }

    lastUpdate.current = performance.now();
  });
}

function Blender2JSScene({
  onLoadComplete,
  scrollProgress,
  setCarSceneRef,
  dashcamGroupRef,
  dashcamOffsetGroupRef,
  isMobile,
}: {
  onLoadComplete: () => void;
  scrollProgress: number;
  setCarSceneRef: (ref: THREE.Group) => void;
  dashcamGroupRef: React.RefObject<THREE.Group | null>;
  dashcamOffsetGroupRef: React.RefObject<THREE.Group | null>;
  isMobile: boolean;
}) {
  const carGLTF = useGLTF(isMobile ? "/models/car.glb" : "/models/car.glb");
  const dashcamGLTF = useGLTF(isMobile ? "/models/VREC-Z820dc-opt.glb" : "/models/VREC-Z820DC.glb");
  const rearCamGLTF = useGLTF("/models/REARCAM.glb");

  const imageTextureRef = useRef<THREE.Texture | null>(null);
  const windshieldObjects = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    const carScene = carGLTF.scene;
    const dashcamScene = dashcamGLTF.scene;
    const rearcamScene = rearCamGLTF.scene;

    setCarSceneRef(carScene);

    carScene.traverse((node) => {
      if (node instanceof THREE.Mesh && node.name.toLowerCase().includes("windshield")) {
        windshieldObjects.current.push(node);
      }
    });

    onLoadComplete();

    return () => {
      [carGLTF.scene, dashcamGLTF.scene, rearCamGLTF.scene].forEach((sceneObj) => {
        disposeScene(sceneObj);
      });

      if (imageTextureRef.current) {
        imageTextureRef.current.dispose();
        imageTextureRef.current = null;
      }
    };
  }, [carGLTF, dashcamGLTF, rearCamGLTF, onLoadComplete, setCarSceneRef]);

  return (
    <>
      <primitive object={carGLTF.scene} />
      <group ref={dashcamGroupRef}>
        <group ref={dashcamOffsetGroupRef}>
          <primitive object={dashcamGLTF.scene} />
        </group>
      </group>
      <primitive object={rearCamGLTF.scene} />
    </>
  );
}

const MemoizedTimeline = React.memo(function Timeline({ scrollProgress }: { scrollProgress: number }) {
  const totalFrames = animationData.length + 1;
  const frameIndex = scrollProgress * (totalFrames - 1);
  const frame1 = Math.floor(frameIndex);
  const frame2 = Math.min(frame1 + 1, totalFrames - 1);
  const t = frameIndex - frame1;

  return (
    <div
      style={{
        position: "fixed",
        left: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        background: "rgba(0,0,0,0.8)",
        padding: "20px",
        borderRadius: "10px",
        color: "white",
        fontFamily: "monospace",
        fontSize: "12px",
        zIndex: 1000,
        minWidth: "120px",
      }}
    >
      <div style={{ marginBottom: "10px", fontWeight: "bold", textAlign: "center" }}>Timeline</div>
      {animationData.map((keyframe, index) => {
        const isActive = index === frame1;
        const keyframeTime = index / (totalFrames - 1);

        return (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
              padding: "4px",
              borderRadius: "4px",
              background: isActive ? "rgba(255, 255, 0, 0.3)" : "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "all 0.2s ease",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: isActive ? "#ffff00" : "#666",
                marginRight: "8px",
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{ fontWeight: isActive ? "bold" : "normal" }}>{keyframeTime.toFixed(4)}</div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#aaa",
                  marginTop: "2px",
                }}
              >
                KF {index + 1}
              </div>
            </div>
          </div>
        );
      })}

      <div
        style={{
          marginTop: "15px",
          padding: "8px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "4px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "14px", fontWeight: "bold" }}>{scrollProgress.toFixed(4)}</div>
        <div style={{ fontSize: "10px", color: "#aaa" }}>Progress</div>
      </div>

      <div
        style={{
          marginTop: "10px",
          padding: "8px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "4px",
          fontSize: "9px",
          color: "#aaa",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: "4px" }}>Debug:</div>
        <div style={{ fontSize: "8px", marginBottom: "2px", color: "#ffff00" }}>Frame Index: {frameIndex.toFixed(3)}</div>
        <div style={{ fontSize: "8px", marginBottom: "2px", color: "#ffff00" }}>
          Frame1: {frame1} | Frame2: {frame2}
        </div>
        <div style={{ fontSize: "8px", marginBottom: "2px", color: "#ffff00" }}>Interpolation: {t.toFixed(3)}</div>
        {animationData.map((keyframe, index) => {
          const isActive = index === frame1;
          const keyframeTime = index / (totalFrames - 1);
          return (
            <div
              key={index}
              style={{
                color: isActive ? "#ffff00" : "#666",
                fontSize: "8px",
                marginBottom: "2px",
              }}
            >
              KF{index + 1}: {keyframeTime.toFixed(4)} | Active: {isActive ? "YES" : "NO"}
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: "10px",
          padding: "8px",
          background: scrollProgress >= 0.0417 && scrollProgress <= 0.0833 ? "rgba(255,0,0,0.3)" : "rgba(255,255,255,0.1)",
          borderRadius: "4px",
          textAlign: "center",
          border: scrollProgress >= 0.0417 && scrollProgress <= 0.0833 ? "2px solid #ff0000" : "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <div style={{ fontSize: "10px", fontWeight: "bold" }}>
          {scrollProgress >= 0.0417 && scrollProgress <= 0.0833 ? "🚨 LOOKAT ACTIVE" : "Normal Mode"}
        </div>
        <div style={{ fontSize: "9px", color: "#aaa" }}>0.0417 → 0.0833</div>
      </div>
    </div>
  );
});

function CameraAnimation({
  scrollProgress,
  carScene,
  dashcamGroupRef,
  dashcamOffsetGroupRef,
  setLensAnimation,
  isMobile,
}: {
  scrollProgress: number;
  carScene: THREE.Group;
  dashcamGroupRef: React.RefObject<THREE.Group | null>;
  dashcamOffsetGroupRef: React.RefObject<THREE.Group | null>;
  setLensAnimation: (isAnimating: boolean) => void;
  isMobile: boolean;
}) {
  useCameraAnimationSync(scrollProgress, carScene, dashcamGroupRef, dashcamOffsetGroupRef, setLensAnimation, isMobile);
  return null;
}

// PATCH: Move scroll logic into a dedicated component to access R3F context
function ScrollMonitor({ setScrollProgress, modelIsReady }: { setScrollProgress: (progress: number) => void; modelIsReady: boolean }) {
  const { invalidate } = useThree();
  const targetProgress = useRef(0);

  useEffect(() => {
    if (!modelIsReady) return;
    if (typeof window === "undefined") return;
    let cleanup: (() => void) | undefined;
    const initGSAP = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.config({ limitCallbacks: true });
        gsap.timeline({
          scrollTrigger: {
            trigger: "#blender2js-scroll-container-model1",
            start: "top top",
            end: "bottom bottom",
            scrub: 0,
            onUpdate: (self) => {
              targetProgress.current = self.progress;
              invalidate(); // PATCH: Trigger render on demand
            },
          },
        });

        // Use a lerp on the progress to smooth it out
        gsap.ticker.add(() => {
          setScrollProgress((prev) => THREE.MathUtils.lerp(prev, targetProgress.current, 0.2));
        });

        cleanup = () => {
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      } catch (err) {
        console.error("Failed to load GSAP:", err);
      }
    };

    initGSAP();
    return () => cleanup?.();
  }, [modelIsReady, invalidate, setScrollProgress]);

  return null;
}

// ========== MAIN COMPONENT ==========
export default function Blender2JSPage() {
  const isMobile = useIsMobile();
  const [modelIsReady, setModelIsReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [carScene, setCarScene] = useState<THREE.Group | null>(null);
  const [lensAnimation, setLensAnimation] = useState(false);
  const dashcamGroupRef = useRef<THREE.Group | null>(null);
  const dashcamOffsetGroupRef = useRef<THREE.Group | null>(null);
  const [dpr, setDpr] = useState(isMobile ? 1 : window.devicePixelRatio);

  const { active } = useProgress();

  useEffect(() => {
    if (!active) setModelIsReady(true);
  }, [active]);

  useEffect(() => {
    if (!modelIsReady) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [modelIsReady]);

  return (
    <div
      id="blender2js-scroll-container-model1"
      style={{ height: "3500vh", scrollBehavior: "smooth" }}
    >
      <MemoizedTimeline scrollProgress={scrollProgress} />
      {!modelIsReady && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          <FadeLoader isModelReady={false} />
        </div>
      )}

      <Canvas
        camera={{ position: [0, 5, 15], fov: 20, near: 0.01, far: 1000 }}
        style={{
          background: "#000",
          width: "100vw",
          height: "100vh",
          position: "sticky",
          top: 0,
        }}
        gl={{
          toneMapping: THREE.NoToneMapping,
          outputColorSpace: SRGBColorSpace,
          antialias: !isMobile,
          alpha: false,
          stencil: false,
          powerPreference: "default",
        }}
        dpr={dpr}
        frameloop="demand"
        shadows={!isMobile}
      >
        <PerformanceMonitor onIncline={() => setDpr(window.devicePixelRatio)} onDecline={() => setDpr(1)} />
        <AdaptiveDpr pixelated />
        {/* <BackgroundFade scrollProgress={scrollProgress} /> */}

        <Suspense fallback={null}>
          {/* <IntroImageAnimation scrollProgress={scrollProgress} /> */}
          {!isMobile && <Environment files="/hdri/111.hdr" background={false} />}
          <Blender2JSScene
            scrollProgress={scrollProgress}
            onLoadComplete={() => setModelIsReady(true)}
            setCarSceneRef={(ref) => setCarScene(ref)}
            dashcamGroupRef={dashcamGroupRef}
            dashcamOffsetGroupRef={dashcamOffsetGroupRef}
            isMobile={isMobile}
          />
          {/* {!isMobile && (
            <LensAnimation
              isAnimating={lensAnimation}
              dashcamGroupRef={dashcamGroupRef}
            />
          )} */}
        </Suspense>
        {carScene && (
          <CameraAnimation
            scrollProgress={scrollProgress}
            carScene={carScene}
            dashcamGroupRef={dashcamGroupRef}
            dashcamOffsetGroupRef={dashcamOffsetGroupRef}
            setLensAnimation={setLensAnimation}
            isMobile={isMobile}
          />
        )}
        {modelIsReady && <ScrollMonitor setScrollProgress={setScrollProgress} modelIsReady={modelIsReady} />}
      </Canvas>
    </div>
  );
}