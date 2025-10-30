import emailIcon from "../assets/icons/email.svg";
import imageIcon from "../assets/icons/image.svg";
import bookIcon from "../assets/icons/book.svg";
import cloudIcon from "../assets/icons/cloud.svg";
import toolIcon from "../assets/icons/tool.svg";

export const navLinks = [
  { label: "Início", href: "#" },
  { label: "Gráfico", href: "#grafico" },
  { label: "Mac", href: "#mac" },
  { label: "Chip", href: "#chip" },
  { label: "Sistema", href: "#sistema" },
  { label: "Características", href: "#caracteristicas" },
];

export const noChangesParts = [
  "Object_84",
  "Object_37",
  "Object_34",
  "Object_12",
  "Object_80",
  "Object_35",
  "Object_36",
  "Object_13",
  "Object_125",
  "Object_76",
  "Object_33",
  "Object_42",
  "Object_58",
  "Object_52",
  "Object_21",
  "Object_10",
];

export const features = [
  {
    icon: emailIcon,
    highlight: "Email IA",
    text: "Resuma e elabore respostas para e-mails instantaneamente, mantendo sua caixa de entrada sempre sob controle",
    styles: "md:left-20",
  },
  {
    icon: imageIcon,
    highlight: "Image AI",
    text: "Crie ou edite imagens com facilidade. Basta digitar o que você imagina, e deixe a IA dar vida à sua visão",
    styles: "md:right-20",
  },
  {
    icon: bookIcon,
    highlight: "Summarize AI",
    text: "Transforme artigos longos, relatórios ou anotações em resumos claros e concisos em apenas alguns segundos",
    styles: "md:left-20",
  },
  {
    icon: cloudIcon,
    highlight: "AirDrop",
    text: "Compartilhe fotos, arquivos grandes e mais sem fio entre seu iPhone, Mac e outros dispositivos Apple",
    styles: "md:right-20",
  },
  {
    icon: toolIcon,
    highlight: "Writing Tool",
    text: "Escreva de forma mais inteligente e rápida. Seja para blogs, ensaios ou legendas, a IA aprimora suas palavras",
    styles: "md:left-20",
  },
];
