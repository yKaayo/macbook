import { navLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="container mx-auto flex flex-col justify-between gap-5 px-5 py-10 md:grid md:grid-cols-3 md:gap-20 md:px-20">
      <nav>
        <ul className="flex flex-col xl:flex-row items-center justify-center xl:justify-between h-full gap-5">
          {navLinks.map((link) => (
            <li key={link.label} className="flex">
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

      <div className="mx-auto min-h-0.5 w-full md:min-w-0.5 rounded-full bg-white md:h-auto md:w-0.5"></div>

      <div className="min-w-max flex items-center justify-center gap-5 md:flex-col md:gap-2 xl:flex-row xl:justify-between xl:w-full">
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
