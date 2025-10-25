import { useEffect, useRef } from "react";

// Video
import heroVideo from "../assets/videos/hero.mp4";

const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 2.4;
  }, []);

  return (
    <main className="container mx-auto flex min-h-[calc(100dvh-54px)] flex-col items-center justify-center gap-3 px-3 md:gap-5 md:px-0">
      <h2 className="text-[clamp(16px,1.8vw,3rem)] font-semibold text-white">
        Macbook Pro
      </h2>

      <div className="relative">
        <span
          className="absolute inset-0 text-center text-[clamp(24px,5vw,6rem)] font-semibold text-balance blur-[.4px]"
          style={{
            background:
              "linear-gradient(90deg, #007BFF99, #8A2BE299, #FF000099, #FFD70099)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            WebkitTextStroke: "2px transparent",
          }}
        >
          Criado pela Inteligência Apple
        </span>

        <h1 className="relative z-1 text-center text-[clamp(24px,5vw,6rem)] font-semibold text-balance text-white">
          Criado pela Inteligência Apple
        </h1>

        <div
          className="absolute inset-0 my-auto h-1/3 w-full blur-2xl"
          style={{
            background:
              "linear-gradient(90deg, #007BFF98, #8A2BE298, #FF000098, #FFD70098)",
          }}
        ></div>
      </div>

      <video
        ref={videoRef}
        src={heroVideo}
        autoPlay
        preload="auto"
        playsInline
        muted
        className="md:-my-[5vw]"
      />

      <button
        className="relative z-1 rounded-full bg-blue-600 px-4 py-1.5 text-lg font-semibold text-white"
        aria-label="Comprar Macbook Pro agora"
      >
        Comprar agora
      </button>

      <p className="text-center text-[clamp(14px,1.2vw,20px)] text-balance">
        De R$10.999 por apenas R$700/mês em 12x sem juros
      </p>
    </main>
  );
};

export default Hero;
