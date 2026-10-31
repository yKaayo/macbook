import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Components
import Characteristics from "./components/Characteristics";
import Divisor from "./components/Divisor";
import Footer from "./components/Footer";
import Graphic from "./components/Graphic";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Product from "./components/Product";
import Showcase from "./components/Showcase";
import System from "./components/System";

const App = () => {
  const [heroReady, setHeroReady] = useState(false);
  const lenisRef = useRef(null);
  const handleHeroReady = useCallback(() => setHeroReady(true), []);

  useEffect(() => {
    const lenis = new Lenis({ anchors: true }); // anchors: links #grafico, #mac... rolam suave
    lenisRef.current = lenis;

    const onTick = (time) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (heroReady) {
      lenis.start();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    } else {
      lenis.stop();
    }
  }, [heroReady]);

  useEffect(() => {
    if (!heroReady) return;

    let timer;
    const refresh = () => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };

    const observer = new ResizeObserver(refresh);
    observer.observe(document.body);
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("load", refresh);
    };
  }, [heroReady]);

  return (
    <div className="overflow-hidden bg-black" aria-busy={!heroReady}>
      <NavBar />
      <Hero onReady={handleHeroReady} />
      <Divisor />
      <Graphic />
      <Divisor />
      <Divisor />
      <Product />
      <Showcase />
      <div className="md:h-[200px]" />
      <System />
      <div className="h-[3600px]" />
      <Characteristics />
      <Footer />
    </div>
  );
};

export default App;
