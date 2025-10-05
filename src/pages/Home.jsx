import { Link } from "react-router-dom";
import {
  DocumentTextIcon,
  CodeBracketIcon,
  TagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import Card from "../components/Card";
import Button from "../components/Button";

const cards = [
  {
    icon: DocumentTextIcon,
    content:
      "Utiliza Markdown para dar formato a tus notas, con soporte para listas, tablas, enlaces y más.",
  },
  {
    icon: CodeBracketIcon,
    content:
      "Almacena fragmentos de código con resaltado de sintaxis para más de 50 lenguajes.",
  },
  {
    icon: TagIcon,
    content:
      "Clasifica tus notas y snippets con etiquetas personalizadas para una fácil recuperación.",
  },
  {
    icon: MagnifyingGlassIcon,
    content:
      "Encuentra lo que necesitas al instante con una búsqueda rápida que filtra por título, contenido y etiquetas.",
  },
];

export default function Home() {
  return (
    <section className="flex flex-col gap-1 container mx-auto">
      <header className="flex flex-col gap-2">
        <h1 className="mono text-4xl md:text-7xl text-wrap text-center">
          Tu <span className="text-success">segudo cerebro</span> como
          desarrollador
        </h1>
        <p className="text-xl w-full md:text-3xl text-muted md:w-[70%] text-center mx-auto">
          DevNotes es el lugar donde tus notas, ideas y snippets de código
          conviven. Organiza tu conocimiento, acelera tu flujo de trabajo y
          nunca más pierdas una línea de código útil.
        </p>
      </header>
      <section className="mx-auto" aria-labelledby="features-title">
        <h2 id="features-title" className="sr-only">
          Características principales
        </h2>
        <ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-5"
          role="list"
        >
          {cards.map((card, idx) => (
            <li key={idx}>
              <Card icon={card.icon} content={card.content} />
            </li>
          ))}
        </ul>
      </section>
      <footer className="text-center">
        <Link to="/notes">
          <Button size="lg" className="py-2">
            Empezar a Organizar
          </Button>
        </Link>
      </footer>
    </section>
  );
}
