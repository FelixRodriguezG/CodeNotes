import { Link } from "react-router-dom";
import Badge from "./Badge";

export default function NoteCard({ note }) {
  return (
    <Link className="card  flex gap-4" to={`/notes/${note.id}`}>
      <h3 className="text-lg text-heading font-display font-bold py-1.5  rounded-sm">
        {note.title}
      </h3>
      <section className="bg-code-bg h-full py-1 px-3">
      <p className="code ">{note.summary}</p>

      </section>

      <footer className="mt-auto">
        <ul className="flex gap-2 items-center ">
          {(note.tags || []).map((tag, i) => (
            <li className="self-end"  key={i}>
              {/* Puedes asignar variantes por nombre o mapearlas */}
              <Badge variant={tag}>{tag}</Badge>
            </li>
          ))}
        </ul>
      </footer>
    </Link>
  );
}
