import { Link } from "react-router-dom";

export default function NoteCard({ note }) {
  return (
    <div className="card">
      <h3>{note.title}</h3>
      <div className="flex gap-4">
        <Link className="btn" to={`/albums/${note.id}`}>
          Ver
        </Link>
        <Link className="btn btn-secondary" to={`/albums/${note.id}/edit`}>
          Editar
        </Link>
      </div>
    </div>
  );
}