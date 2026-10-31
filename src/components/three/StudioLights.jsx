import {
  Environment,
  Lightformer,
  PerspectiveCamera,
  SpotLight,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";

const CAMERA_POSITION = [0, 0, 5];

const EnvironmentFollowsCamera = () => {
  const scene = useThree((state) => state.scene);

  useFrame(({ camera }) => {
    scene.environmentRotation.set(
      0,
      Math.atan2(camera.position.x, camera.position.z),
      0,
    );
  });

  useEffect(() => () => scene.environmentRotation.set(0, 0, 0), [scene]);

  return null;
};

const Spots = ({ offset = [0, 0, 0] }) => {
  const [ox, oy, oz] = offset;

  return (
    <>
      <SpotLight
        position={[0 + ox, 4.6 + oy, 1.5 + oz]}
        angle={Math.PI / 2}
        decay={0}
        intensity={Math.PI * 0.5}
      />

      <SpotLight
        position={[0 + ox, 2 + oy, 4 + oz]}
        angle={30}
        decay={2}
        intensity={Math.PI * 0.5}
      />
    </>
  );
};

const StudioLights = ({ followCamera = false }) => {
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

      {followCamera ? (
        <>
          <EnvironmentFollowsCamera />

          <PerspectiveCamera
            makeDefault
            position={CAMERA_POSITION}
            fov={75}
            near={0.1}
            far={1000}
          >
            <Spots offset={CAMERA_POSITION.map((value) => -value)} />
          </PerspectiveCamera>
        </>
      ) : (
        <Spots />
      )}
    </group>
  );
};

export default StudioLights;