import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState, useEffect, useRef } from "react";

// Image
import chipImg from "../assets/images/mask-logo.svg";

// Video
import gameVideo from "../assets/videos/game.webm";

const SCALE_DIVISOR = 13.5;

const Showcase = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [scale, setScale] = useState(0);
  const [leftHeight, setLeftHeight] = useState(0);
  const chipMaskRef = useRef(null);

  useEffect(() => {
    if (!isMobile) {
      const screenWidth = window.innerWidth;

      const calculateScale = () => {
        setScale(Math.max(screenWidth / SCALE_DIVISOR, 3));
      };

      const calculateLeftHeight = () => {
        if (chipMaskRef.current) {
          const screenHeight = window.innerHeight;

          setLeftHeight(
            screenHeight -
              Math.round(chipMaskRef.current.getBoundingClientRect().height) /
                2,
          );
        }
      };

      calculateScale();
      calculateLeftHeight();

      const handleResize = () => {
        calculateScale();
        calculateLeftHeight();
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isMobile]);

  useGSAP(() => {
    if (!isMobile && scale > 0) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#chip",
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
      });

      timeline
        .fromTo(
          "#videoMasked",
          {
            height: "85%",
            width: "95%",
            borderRadius: "20px 20px 0 0",
          },
          {
            height: "100%",
            width: "100%",
            borderRadius: "0px",
            duration: 30,
          },
        )
        .fromTo(
          "#contentMask",
          {
            alignItems: "end",
          },
          {
            alignItems: "center",
            duration: 0.5,
          },
        )
        .fromTo(
          "#chipMask",
          {
            scale: scale,
          },
          {
            scale: 1.2,
            ease: "power2.inOut",
            duration: 30,
          },
          "<",
        );
    }
  }, [isMobile, scale]);

  return (
    <section id="chip">
      <div
        id="contentMask"
        className="relative flex items-end justify-center overflow-hidden md:h-screen"
      >
        <video
          id="videoMasked"
          autoPlay
          loop
          muted
          playsInline
          className="absolute h-full object-cover"
          style={{
            maskImage: `url(${chipImg})`,
            maskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskImage: `url(${chipImg})`,
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
          }}
        >
          <source src={gameVideo} type="video/webm" />
        </video>

        <div id="chipMask" className="relative">
          <div
            className="hidden w-full bg-black md:block"
            style={{ height: `${leftHeight}px` }}
          ></div>

          <img
            style={{ scale: 1.2 }}
            src={chipImg}
            ref={chipMaskRef}
            alt="Macbook chip logo"
          />

          <div
            className="hidden w-full bg-black md:block"
            style={{ height: `${leftHeight}px` }}
          ></div>
        </div>
      </div>

      <div
        id="chipContent"
        className="container mx-auto px-5 py-20 sm:px-0 md:grid md:grid-cols-2 md:gap-5"
      >
        <div className="mb-20 md:mb-0">
          <h2 className="text-3xl font-semibold text-white">
            Desempenho Foguete
          </h2>

          <div className="mt-7 space-y-5 pe-10">
            <p>
              Apresentamos o{" "}
              <span className="text-white">
                M4, a próxima geração do chip da Apple
              </span>
              . O M4 é o motor do
            </p>
            <p>
              Apple Intelligence no iPad Pro, permitindo que você escreva, crie
              e realize mais tarefas com total fluidez. Tudo isso em um design
              incrivelmente fino, leve e potente.
            </p>
            <p>
              Um novo motor de tela oferece precisão de tirar o fôlego, cores
              exatas e brilho intenso. E uma GPU de última geração com ray
              tracing acelerado por hardware traz gráficos de nível de console
              para as suas mãos.
            </p>
            <a href="#" className="text-blue-600 underline">
              Saiba mais sobre o Apple Intelligence
            </a>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-10 sm:grid sm:grid-cols-2 md:mt-0 md:flex">
          <div className="space-y-2">
            <p>Até</p>
            <h3 className="text-3xl font-semibold text-white">
              4x mais rápido
            </h3>
            <p>em desempenho de renderização profissional que o M2</p>
          </div>

          <div className="w-full space-y-2">
            <p>Até</p>
            <h3 className="text-3xl font-semibold text-white">
              1,5x mais rápido
            </h3>
            <p>em desempenho da CPU que o M2</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
