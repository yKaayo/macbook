import { Environment, Lightformer, SpotLight } from "@react-three/drei";

const StudioLights = () => {
  return (
    <group>
      <Environment resolution={256}>
        <group>
          <Lightformer
            form="rect"
            intensity={15}
            position={[-10, 10, -10]}
            scale={10}
            rotateY={Math.PI / 2}
          />
          <Lightformer
            form="rect"
            intensity={15}
            position={[10, 10, 10]}
            scale={10}
            rotateY={Math.PI / 2}
          />
        </group>
      </Environment>

      <SpotLight
        position={[0, 4.6, 1.5]}
        angle={Math.PI / 2}
        decay={0}
        intensity={Math.PI * 0.5}
      />

      <SpotLight
        position={[0, 2, 4]}
        angle={30}
        decay={2}
        intensity={Math.PI * 0.5}
      />
    </group>
  );
};

export default StudioLights;
