import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useRef, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";

// Components
import StudioLights from "./three/StudioLights";
import MacbookModel from "./models/Macbook";

// Constants
import { features } from "../constants/index";

const Scene = ({ onGroupReady, onInvalidateReady }) => {
  const groupRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const invalidate = useThree((state) => state.invalidate);
  const { position, rotation } = useSelector((state) => state.laptop);

  useEffect(() => {
    onInvalidateReady(invalidate);
  }, [invalidate, onInvalidateReady]);

  useEffect(() => {
    let frame;
    let frameCount = 0;

    const warmUpScene = () => {
      invalidate();
      frameCount += 1;
      if (frameCount < 4) {
        frame = requestAnimationFrame(warmUpScene);
      }
    };

    frame = requestAnimationFrame(warmUpScene);

    return () => cancelAnimationFrame(frame);
  }, [invalidate]);

  useEffect(() => {
    if (groupRef.current) {
      onGroupReady(groupRef.current);
    }
    invalidate();
  }, [invalidate, onGroupReady]);

  return (
    <>
      <StudioLights environmentFrames={4} />
      <ambientLight intensity={0.5} />
      {isMobile && (
        <directionalLight
          position={[2, 4, 5]}
          intensity={2}
        />
      )}
      <group ref={groupRef}>
        <MacbookModel
          scale={isMobile ? 0.045 : 0.1}
          position={position}
          rotation={rotation}
        />
      </group>
    </>
  );
};

const System = () => {
  const containerRef = useRef(null);
  const invalidateRef = useRef(() => {});
  const [groupObject, setGroupObject] = useState(null);

  useGSAP(() => {
    if (!groupObject || !containerRef.current) return;

    const modelTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3600",
        scrub: 1,
        pin: true,
        pinSpacing: false,
        refreshPriority: 1,
        onUpdate: () => invalidateRef.current(),
      },
    });

    modelTimeline.to(groupObject.rotation, {
      y: Math.PI * 2,
      ease: "power1.inOut",
    });

    const boxes = gsap.utils.toArray(".box1, .box2, .box3, .box4, .box5");
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3600",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    boxes.forEach((box, i) => {
      const isLast = i === boxes.length - 1;
      timeline
        .to(box, { opacity: 1, y: 0, duration: 1 }, i === 0 ? 0 : "-=0.3")
        .to(box, { opacity: 0, y: -200, duration: 1 }, isLast ? null : "+=0.5");
    });
  }, [groupObject]);

  return (
    <section id="sistema" className="relative">
      <h2>See it all in a new light.</h2>

      <div ref={containerRef} className="relative h-[calc(100dvh-56px)] w-full">
        <Canvas frameloop="demand" style={{ touchAction: "none" }}>
          <ambientLight intensity={0.5} />
          <Scene
            onGroupReady={setGroupObject}
            onInvalidateReady={(invalidate) => {
              invalidateRef.current = invalidate;
            }}
          />
        </Canvas>

        <div className="absolute inset-0">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`absolute w-full px-5 text-white md:w-[35%] md:px-0 box${i + 1} top-1/4 -translate-y-1/2 opacity-0 md:top-1/2 ${feature.styles}`}
            >
              <img
                src={feature.icon}
                alt={feature.highlight}
                className="mb-2 size-8 md:size-10"
              />
              <h3 className="mb-1 text-lg font-semibold md:text-2xl">
                {feature.highlight}
              </h3>
              <p className="text-sm md:text-base">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default System;