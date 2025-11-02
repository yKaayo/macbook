import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Icon
import laptopIcon from "../assets/icons/laptop.svg";
import sunIcon from "../assets/icons/sun.svg";

// Image
import cartoonImg from "../assets/images/cartoon.webp";
import batteryImg from "../assets/images/battery.webp";
import iaImg from "../assets/images/ai.webp";

const Characteristics = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useGSAP(() => {
    gsap.fromTo(
      ".characteristicsCard",
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.4,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#caracteristicas",
          start: !isMobile ? "top 80%" : "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      },
    );
  });


  return (
    <section
      id="caracteristicas"
      className="relative z-10 container mx-auto my-20 flex min-h-screen items-center justify-center bg-black px-5 pt-[56px] md:px-0"
    >
      <div className="grid w-full auto-rows-[minmax(200px,auto)] grid-cols-1 gap-10 md:grid-cols-2 md:grid-rows-2 md:gap-5">
        <div
          style={{ backgroundImage: `url(${cartoonImg})` }}
          className="characteristicsCard relative overflow-hidden bg-cover bg-center bg-no-repeat md:row-span-2"
        >
          <div className="absolute bottom-0 z-1 flex flex-col gap-1 px-10 py-5">
            <img src={laptopIcon} className="size-20" alt="Laptop" />
            <h4 className="text">
              Termine suas demandas <br /> 9.8x mais rápido
            </h4>
          </div>

          <div className="absolute bottom-0 h-[70%] w-full rounded-b-lg bg-gradient-to-t from-zinc-800/95 via-zinc-800/95 to-transparent"></div>
        </div>

        <div className="characteristicsCard animate-gradient-rotate m-1 bg-gradient-to-r from-blue-700 via-purple-700 via-35% to-orange-600 to-90% p-[2px]">
          <div className="relative z-10 flex size-full items-center gap-3 rounded-lg bg-zinc-800 px-10 py-5">
            <img src={iaImg} alt="IA" className="w-20" />
            <h4 className="text">
              Feito com <br />{" "}
              <span className="animate-gradient-rotate bg-gradient-to-r from-blue-700 via-purple-700 via-35% to-orange-600 to-90% bg-clip-text text-transparent">
                Inteligência Apple
              </span>
            </h4>
          </div>
        </div>

        <div className="characteristicsCard relative flex items-center rounded-lg bg-zinc-800 md:row-span-2 md:items-end">
          <div className="flex items-center gap-5 px-10 py-5">
            <img src={batteryImg} alt="Bateria" className="w-20" />
            <h4 className="text">
              Bateria com <br />
              <span className="animate-gradient-rotate bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                24h de duração
              </span>
            </h4>
          </div>
        </div>

        <div className="characteristicsCard flex items-center gap-5 bg-zinc-800 px-10 py-5 md:col-start-1 md:row-start-3">
          <img src={sunIcon} className="size-20" alt="Tela Retina" />
          <h4 className="text">
            Uma incrível <br /> tela de retina líquida
          </h4>
        </div>
      </div>
    </section>
  );
};

export default Characteristics;
