// Constants
import { navLinks } from "../constants";

// Icons
import logoIcon from "../assets/icons/logo.svg"
import searchIcon from "../assets/icons/search.svg"
import bagIcon from "../assets/icons/bag.svg"

const NavBar = () => {
  return (
    <header className="container mx-auto flex h-[54px] justify-between py-3">
      <img className="h-[120%] -top-[10%] relative" src={logoIcon} alt="Logo" />

      <nav className="flex items-center gap-3">
        <ul>
          {navLinks.map(({ label }) => (
            <li
              className="text-white duration-300 hover:text-neutral-300"
              key={label}
            >
              <a href={label}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="h-full flex gap-5">
        <img className="h-full" src={searchIcon} alt="" />
        <img className="h-full" src={bagIcon} alt="" />
      </div>
    </header>
  );
};

export default NavBar;
