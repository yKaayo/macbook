// Components
import Divisor from "./components/Divisor";
import Graphic from "./components/Graphic";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Product from "./components/Product";
import Showcase from "./components/Showcase";

const App = () => {
  return (
    <div className="bg-black overflow-hidden">
      <NavBar />
      <Hero />
      <Divisor />
      <Graphic />
      <Divisor />
      <Product />
      <Divisor />
      <Showcase />

    </div>
  );
};

export default App;
