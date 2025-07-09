import { useGLTF } from "@react-three/drei";

export default function VRECZ820DC(props: any) {
  const { scene } = useGLTF("/models/VREC-Z820DC_LOW POLY.glb"); // Ensure this path matches your public folder setup
  return (
    <group scale={[40, 40, 40]} position={[0, 0, 0]}  rotation={[0, 0, 0]}  >
    <primitive object={scene} {...props} />
  </group>
  );
}
