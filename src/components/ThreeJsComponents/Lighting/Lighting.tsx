import { DirectionalLightProps } from "@/types/lights";
import { DirectionalLight } from "@react-three/fiber";


type SceneProps = {
  directionalLights?: DirectionalLightProps[];
};

export const SceneCanvas = ({ directionalLights = [] }: SceneProps) => {
  return (
    <>
      {directionalLights.map((light, index) => (
        <directionalLight
          key={index}
          position={light.position || [0, 5, 5]}
          intensity={light.intensity ?? 1}
          color={light.color || "white"}
          rotation={light.rotation}
          castShadow={light.castShadow ?? false}
        />
      ))}
    </>
  );
};
