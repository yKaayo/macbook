import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

// Images
import graphicImg1 from "../assets/images/graphicImg1.webp";
import graphicImg2 from "../assets/images/graphicImg2.webp";
import graphicImg3 from "../assets/images/graphicImg3.webp";

const Graphic = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const imgsRef = useRef([]);

  const images = [graphicImg1, graphicImg2, graphicImg3];

  useGSAP(() => {
    if (isMobile || imgsRef.current.length === 0) return;

    gsap.set(imgsRef.current, {
      opacity: 0.5,
      scale: 0.8,
      y: 200,
    });

    gsap.set(imgsRef.current[0], {
      x: -100,
    });
    gsap.set(imgsRef.current[1], {
      opacity: 1,
      y: 150,
    });
    gsap.set(imgsRef.current[2], {
      x: 100,
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#grafico",
        start: "top top",
        end: "+=150%",
        scrub: true,
        pin: true,
      },
    });

    timeline
      .to(
        imgsRef.current[0],
        {
          x: "-50%",
          y: 0,
          rotate: -15,
          opacity: 0.5,
          scale: 0.8,
          ease: "power2.in",
        },
        0,
      )
      .to(
        imgsRef.current[1],
        {
          x: 0,
          y: 0,
          rotate: 0,
          opacity: 1,
          scale: 1,
          ease: "power2.in",
        },
        0,
      )
      .to(
        imgsRef.current[2],
        {
          x: "50%",
          y: 0,
          rotate: 15,
          opacity: 0.5,
          scale: 0.8,
          ease: "power2.in",
        },
        0,
      )
      .fromTo(
        "#graphicContent",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          ease: "power2.in",
        },
      );
  }, [isMobile]);

  return (
    <section
      id="grafico"
      className="container mx-auto flex min-h-svh flex-col items-center justify-center pt-[56px]"
    >
      <h3 className="mx-auto mb-10 w-4/5 text-center">
        O próximo nível de gráficos de alta definição
      </h3>

      <div className="relative grid h-full w-full grid-cols-2 md:block md:place-items-center">
        {images.map((image, i) => (
          <img
            ref={(el) => (imgsRef.current[i] = el)}
            key={i}
            src={image}
            alt="Imagens com alta definição"
            className={`object-cover md:absolute md:h-full md:w-auto ${i === 0 && "ms-auto -rotate-12 md:ms-0 md:rotate-0"} ${i === 1 && "absolute top-1/2 left-1/2 z-1 h-full w-fit -translate-x-1/2 -translate-y-1/2 md:top-auto md:bottom-0 md:left-auto md:translate-x-0 md:translate-y-0"} ${i === 2 && "rotate-12 md:rotate-0"} `}
          />
        ))}
      </div>

      <div id="graphicContent" className="mx-auto mt-20 w-4/5">
        <p className="text-center text-balance">
          Gráficos no limite da realidade. Seus fluxos de trabalho mais intensos
          agora rodam com uma fluidez instantânea que acompanha a sua
          criatividade. A GPU da nova família de chips M4 traz um motor de ray
          tracing de segunda geração com aceleração de hardware que renderiza
          imagens em tempo recorde.{" "}
          <span className="text-center font-medium text-balance text-white">
            O resultado? Uma experiência de jogo incrivelmente imersiva e
            realista, como você nunca viu.
          </span>{" "}
          Com o Dynamic Caching, a memória on-chip é otimizada de forma
          inteligente, elevando a utilização média da GPU. Prepare-se para um
          salto colossal no desempenho dos seus jogos e aplicativos
          profissionais mais pesados.
        </p>
      </div>
    </section>
  );
};

export default Graphic;
