import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

// Images
import graphicImg1 from "../assets/images/graphicImg1.webp";
import graphicImg2 from "../assets/images/graphicImg2.webp";
import graphicImg3 from "../assets/images/graphicImg3.webp";

const images = [graphicImg1, graphicImg2, graphicImg3];

const Graphic = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imgsRef = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setImagesLoaded(true);
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;

    const imagePromises = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
          resolve();
        };
        img.onerror = reject;
        img.src = src;
      });
    });

    Promise.all(imagePromises).catch((error) => {
      console.error("Erro ao carregar imagens:", error);
      setImagesLoaded(true);
    });
  }, [isMobile]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const [firstImg, middleImg, lastImg] = imgsRef.current;
      if (!firstImg || !middleImg || !lastImg) return;

      gsap.set([firstImg, middleImg, lastImg], {
        opacity: 0.5,
        scale: 0.8,
        x: 0,
        y: 200,
        rotate: 0,
      });
      gsap.set(firstImg, { x: -100 });
      gsap.set(middleImg, { opacity: 1, y: 150 });
      gsap.set(lastImg, { x: 100 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=150%",
            scrub: true,
            pin: true,
            invalidateOnRefresh: true,
            refreshPriority: 3, // maior = recalculado primeiro (de cima para baixo)
          },
        })
        .to(
          firstImg,
          { x: "-50%", y: 0, rotate: -15, opacity: 0.5, scale: 0.8, ease: "power2.in" },
          0,
        )
        .to(
          middleImg,
          { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1, ease: "power2.in" },
          0,
        )
        .to(
          lastImg,
          { x: "50%", y: 0, rotate: 15, opacity: 0.5, scale: 0.8, ease: "power2.in" },
          0,
        )
        .fromTo(
          contentRef.current,
          { opacity: 0 },
          { opacity: 1, ease: "power2.in" },
        );
    });

    return () => mm.revert();
  }, { dependencies: [isMobile], scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="grafico"
      className="container mx-auto flex min-h-svh flex-col items-center justify-center pt-[56px]"
    >
      <h2 className="mx-auto mb-10 w-4/5 text-center text-3xl font-semibold text-balance text-white md:text-5xl">
        O próximo nível de gráficos de alta definição
      </h2>

      <div className="relative grid h-full w-full grid-cols-2 md:block md:place-items-center">
        {!imagesLoaded && !isMobile && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white">Carregando...</div>
          </div>
        )}
        {images.map((image, i) => (
          <img
            ref={(el) => (imgsRef.current[i] = el)}
            key={i}
            src={image}
            alt="Imagens com alta definição"
            loading="eager"
            className={`object-cover md:absolute md:h-full md:w-auto ${i === 0 && "ms-auto -rotate-12 md:ms-0 md:rotate-0"} ${i === 1 && "absolute top-1/2 left-1/2 z-1 h-full w-fit -translate-x-1/2 -translate-y-1/2 md:top-auto md:bottom-0 md:left-auto md:translate-x-0 md:translate-y-0"} ${i === 2 && "rotate-12 md:rotate-0"} `}
          />
        ))}
      </div>

      <div ref={contentRef} id="graphicContent" className="mx-auto mt-20 w-4/5">
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