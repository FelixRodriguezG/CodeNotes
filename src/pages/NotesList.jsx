import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import NoteCard from "../components/NoteCard";

export default function NotesList() {
  const { notes, loading, error, actions } = useNotes();

  useEffect(() => {
    if (!notes.length) actions.fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && !notes.length) return <Loader />;
  if (error && !notes.length) return <ErrorMessage message={error} />;

  return (
    <section className="md:container m-auto">
      <div className="flex items-center justify-between mb-4 ">
        <h1 className="text-2xl"># Notes</h1>
        <Link className="btn btn-primary" to="/notes/new">
          New card
        </Link>
      </div>

      <div className="grid-cards">
        {notes.slice(0, 24).map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </section>
  )
}
