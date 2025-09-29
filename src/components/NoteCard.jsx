import { Link } from "react-router-dom";

export default function NoteCard({ note }) {
  return (
    <article className="card">
      <h3>{note.title}</h3>
      

      <div className="flex gap-4 justify-end mt-auto">
        <Link className="btn btn-outline" to={`/notes/${note.id}`}>
          Ver
        </Link>
        <Link className="btn btn-secondary " to={`/notes/${note.id}/edit`}>
          Editar
        </Link>
      </div>
      
    </article>
  );
}