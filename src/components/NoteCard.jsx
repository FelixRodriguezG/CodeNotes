import { Link } from "react-router-dom";

export default function NoteCard({ note }) {
  return (
    <Link className="card block text-amber-50 " to={`/notes/${note.id}`}>
     
        <h3>{note.title}</h3>
        
      
    </Link>
  );
}