import { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Lottie
import menuAnim from "../assets/lottie/burguerMenu.json";

// Constants
import { navLinks } from "../constants";

// Icon
import logoIcon from "../assets/icons/logo.svg";

const NavBar = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const lottieRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!lottieRef.current) return;

    const anim = lottieRef.current;

    if (menuIsOpen) {
      anim.setDirection(1);
      anim.play();
    } else {
      anim.setDirection(-1);
      anim.play();
    }
  }, [menuIsOpen]);

  const menuRef = useRef(null);

  useGSAP(() => {
    if (!menuRef.current || !isMobile) return;

    if (menuIsOpen) {
      gsap.to(menuRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
        pointerEvents: "auto",
      });
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -8,
        duration: 0.3,
        ease: "power2.in",
        pointerEvents: "none",
      });
    }
  }, [menuIsOpen, isMobile]);

  return (
    <header className="relative container mx-auto flex h-[54px] justify-between px-5 py-3 sm:px-0">
      <a href="/">
        <img
          className="relative -top-[10%] h-[120%]"
          src={logoIcon}
          alt="Logo"
        />
      </a>

      <div
        ref={menuRef}
        className={`absolute top-full left-0 z-1 flex w-full items-center px-3 md:relative md:top-0 md:w-4/5 md:px-0 lg:w-[72%] xl:w-4/6 ${!menuIsOpen && (!isMobile ? "" : "hidden")}`}
      >
        <div className="flex w-full flex-col justify-between rounded-lg bg-white p-3 md:flex-row md:bg-transparent">
          <nav className="flex items-center gap-3">
            <ul className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
              {navLinks.map(({ label, href }) => (
                <li
                  className="text-black duration-500 hover:text-neutral-800 md:text-white md:hover:text-neutral-400"
                  key={label}
                >
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-5 flex h-full items-center gap-5 md:mt-0">
            <button className="h-6 w-6 md:h-7 md:w-7" aria-label="Pesquisar">
              <svg viewBox="0 0 512 512" className="h-full w-full">
                <path
                  className="stroke-black md:stroke-white"
                  d="M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z"
                  style={{
                    fill: "none",
                    strokeMiterlimit: 10,
                    strokeWidth: "32px",
                  }}
                />
                <line
                  className="stroke-black md:stroke-white"
                  style={{
                    fill: "none",
                    strokeLinecap: "round",
                    strokeMiterlimit: 10,
                    strokeWidth: "32px",
                  }}
                  x1="338.29"
                  x2="448"
                  y1="338.29"
                  y2="448"
                />
              </svg>
            </button>

            <button
              className="h-6 w-6 md:h-7 md:w-7"
              aria-label="Carrinho de compras"
            >
              <svg viewBox="0 0 48 48" className="h-full w-full">
                <path
                  className="fill-black md:fill-white"
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M43,46H5c-2.209,0-4-1.791-4-4l4-24c0.678-3.442,2.668-4,4.877-4h2.652  
        C14.037,7.052,18.602,2,24,2s9.963,5.052,11.471,12h2.652c2.209,0,4.199,0.558,4.877,4l4,24C47,44.209,45.209,46,43,46z 
        M24,4c-4.352,0-8.045,4.178-9.418,10h18.837C32.045,8.178,28.353,4,24,4z 
        M41,18c-0.308-1.351-0.957-2-2.37-2h-2.828  
        C35.925,16.976,36,17.975,36,19c0,0.552-0.447,1-1,1s-1-0.448-1-1
        c0-1.027-0.069-2.031-0.201-3H14.201C14.07,16.969,14,17.973,14,19
        c0,0.552-0.447,1-1,1s-1-0.448-1-1
        c0-1.025,0.075-2.024,0.197-3H9.369C7.957,16,7.309,16.649,7,18L3,42
        c0,1.104,0.896,2,2,2h38c1.104,0,2-0.896,2-2L41,18z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <button
        className="md:hidden"
        onClick={() => setMenuIsOpen((prev) => !prev)}
        aria-label="Menu"
        aria-expanded={menuIsOpen}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={menuAnim}
          loop={false}
          autoplay={false}
          className="h-full w-full"
        />
      </button>
    </header>
  );
};

export default NavBar;
