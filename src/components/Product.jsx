import { useState } from "react";
import { useDispatch } from "react-redux";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";

// Slice
import { setColor, setScale } from "../store/slices/laptopSlice";

// Components
import StudioLights from "./three/StudioLights";
import ModelSwitcher from "./three/ModelSwitcher";

const Product = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const colors = ["light", "dark"];
  const sizes = ['14"', '16"'];

  const [selectedBtn, setSelectedBtn] = useState({
    color: colors[0],
    size: sizes[1],
  });

  const handleLaptopSize = (size) => {
    dispatch(setScale(size === '14"' ? 0.1 : 0.08));
    setSelectedBtn((prev) => ({ ...prev, size }));
  };

  const handleLaptopColor = (color) => {
    dispatch(setColor(color === "light" ? "#737373" : "#262626"));
    setSelectedBtn((prev) => ({ ...prev, color }));
  };

  return (
    <section
      id="mac"
      className="relative container mx-auto h-[100svh] min-h-[100svh] pt-[56px]"
    >
      <div className="absolute top-15 left-0 w-full">
        <h2 className="text-center text-3xl font-semibold text-balance text-white md:text-5xl">
          Dê uma olhada mais de perto
        </h2>
      </div>

      {/* 3D */}
      <div className="h-[calc(100svh-56px)] w-full">
        <Canvas
          dpr={[1, 1.5]}
          frameloop="demand"
          gl={{ antialias: false, powerPreference: "high-performance" }}
          style={{ touchAction: "pan-y" }}
        >
          <StudioLights followCamera={!isMobile} />
          <ModelSwitcher />
        </Canvas>
      </div>
      {/* 3D - End */}

      {/* Controller */}
      <div className="absolute bottom-10 left-0 z-1 flex w-full flex-col items-center">
        <p className="mb-3">Macbook Pro {selectedBtn.size}</p>

        <div className="flex items-center gap-5">
          <div className="flex w-fit items-center justify-center gap-3 rounded-full bg-neutral-800 px-2.5 py-2">
            {colors.map((color, i) => (
              <button
                key={i}
                onClick={() => handleLaptopColor(color)}
                aria-label={`Selecionar MacBook ${color === "light" ? "claro" : "escuro"}`}
                className={`size-7 rounded-full transition-all duration-300 ease-in-out ${color === "light" ? "bg-neutral-300" : "bg-neutral-900"} ${selectedBtn.color === color ? "ring-2 ring-neutral-500 ring-offset-2" : ""}`}
              ></button>
            ))}
          </div>
          <div className="flex w-fit items-center justify-center gap-3 rounded-full bg-neutral-800 px-2.5 py-2">
            {sizes.map((size, i) => (
              <button
                key={i}
                onClick={() => handleLaptopSize(size)}
                className={`size-8 rounded-full text-center text-sm font-medium transition-all duration-300 ease-in-out ${selectedBtn.size === size ? "bg-neutral-300 text-black" : "text-white"}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Controller - End */}
    </section>
  );
};

export default Product;
