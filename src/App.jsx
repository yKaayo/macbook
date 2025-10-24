// Components
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Product from "./components/Product";

const App = () => {
  return (
    <div className="bg-black">
      <NavBar />
      <Hero />
      <Product />
    </div>
  );
};

export default App;
