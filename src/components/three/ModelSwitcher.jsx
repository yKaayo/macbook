import { useRef, useEffect, useCallback } from "react";
import { PresentationControls } from "@react-three/drei";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";

import { useSelector } from "react-redux";

// Components
import LargeMacbookModel from "../models/LargeMacbook";
import SmallMacbookModel from "../models/SmallMacbook";

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const ModelSwitcher = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isFirstRender = useRef(true);

  const { selectedScale, position, rotation } = useSelector(
    (state) => state.laptop,
  );
  const showLargeMacbook = selectedScale === 0.08 || selectedScale === 0.05;

  const smallMacbookRef = useRef(null);
  const largeMacbookRef = useRef(null);

  const controlsConfig = {
    snap: true,
    speed: 1.2,
    azimuth: [-Infinity, Infinity],
    config: { mass: 1, tension: 0, friction: 26 },
  };

  const setInitialState = useCallback((group, x, opacity) => {
    if (!group) return;
    gsap.set(group.position, { x });

    group.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.transparent = true;
        child.material.opacity = opacity;
        child.material.needsUpdate = true;
      }
    });
  }, []);

  const fadeMeshes = useCallback((group, opacity) => {
    if (!group) return;
    group.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.transparent = true;
        gsap.to(child.material, { opacity, duration: ANIMATION_DURATION });
      }
    });
  }, []);

  const moveGroup = useCallback((group, x) => {
    if (!group) return;
    gsap.to(group.position, { x, duration: ANIMATION_DURATION });
  }, []);

  useEffect(() => {
    if (showLargeMacbook) {
      setInitialState(largeMacbookRef.current, 0, 1);
      setInitialState(smallMacbookRef.current, -OFFSET_DISTANCE, 0);
    } else {
      setInitialState(smallMacbookRef.current, 0, 1);
      setInitialState(largeMacbookRef.current, OFFSET_DISTANCE, 0);
    }
  }, []);

  useGSAP(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (showLargeMacbook) {
      moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
      moveGroup(largeMacbookRef.current, 0);
      fadeMeshes(smallMacbookRef.current, 0);
      fadeMeshes(largeMacbookRef.current, 1);
    } else {
      moveGroup(smallMacbookRef.current, 0);
      moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);
      fadeMeshes(smallMacbookRef.current, 1);
      fadeMeshes(largeMacbookRef.current, 0);
    }
  }, [selectedScale, showLargeMacbook, moveGroup, fadeMeshes]);

  return (
    <PresentationControls {...controlsConfig}>
      <group ref={smallMacbookRef}>
        <SmallMacbookModel
          scale={isMobile ? 0.045 : 0.085}
          position={position}
          rotation={rotation}
        />
      </group>

      <group ref={largeMacbookRef}>
        <LargeMacbookModel
          scale={isMobile ? 0.06 : 0.105}
          position={position}
          rotation={rotation}
        />
      </group>
    </PresentationControls>
  );
};

export default ModelSwitcher;
