import { navLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="container mx-auto flex flex-col justify-between gap-5 px-5 py-10 md:flex-row md:gap-20 md:px-20">
      <nav>
        <ul>
          {navLinks.map((link) => (
            <li key={link.label} className="mb-2">
              <a
                className="text-center text-white duration-300 hover:text-white/75 md:text-start"
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto h-0.5 w-1/2 rounded-full bg-white md:mx-0 md:h-auto md:w-0.5"></div>

      <div className="flex justify-center gap-5 md:flex-col md:gap-2">
        <a className="text-white duration-300 hover:text-white/75" href="#">
          Política de privacidade
        </a>
        <a className="text-white duration-300 hover:text-white/75" href="#">
          Termos de uso
        </a>
        <a className="text-white duration-300 hover:text-white/75" href="#">
          Legal
        </a>
      </div>
    </footer>
  );
};

export default Footer;
