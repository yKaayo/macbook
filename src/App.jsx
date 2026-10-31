import { useCallback, useEffect, useState } from "react";
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
  const handleHeroReady = useCallback(() => setHeroReady(true), []);

  useEffect(() => {
    document.documentElement.style.overflow = heroReady ? "" : "hidden";
    document.body.style.overflow = heroReady ? "" : "hidden";

    if (heroReady) {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
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
