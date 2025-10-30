// Components
import Divisor from "./components/Divisor";
import Footer from "./components/Footer";
import Graphic from "./components/Graphic";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Product from "./components/Product";
import Showcase from "./components/Showcase";
import System from "./components/System";

const App = () => {
  return (
    <div className="overflow-hidden bg-black">
      <NavBar />
      <Hero />
      <Divisor />
      <Graphic />
      <Divisor />
      <Product />
      <Divisor />
      <Showcase />
      <System />
      <Footer />
    </div>
  );
};

export default App;
