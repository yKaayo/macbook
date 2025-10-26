// Components
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Product from "./components/Product";
import Showcase from "./components/Showcase";

const App = () => {
  return (
    <div className="bg-black">
      <NavBar />
      <Hero />
      <Product />
      <Showcase />
    </div>
  );
};

export default App;
