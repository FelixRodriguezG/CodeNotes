import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import NoteCard from "../components/NoteCard";
import { SearchBar } from "../components/SearchBar";
import { useNotesSearch } from "../hooks/useNotesSearch";

export default function NotesList() {
  const { notes, loading, error, actions } = useNotes();
  const { filteredNotes, handleSearch } = useNotesSearch(notes);

  useEffect(() => {
    if (!notes.length) actions.fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && !notes.length) return <Loader />;
  if (error && !notes.length) return <ErrorMessage message={error} />;

  return (
    <section className="m-0 md:container md:m-auto md:p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl"># Notes</h1>
        <Link className="btn btn-primary" to="/notes/new">
          Nueva Nota
        </Link>
      </div>

      <SearchBar onSearch={handleSearch} />

      <div className="grid-cards mt-6">
        {filteredNotes.length > 0 ? (
          filteredNotes
            .slice(0, 24)
            .map((note) => <NoteCard key={note.id} note={note} />)
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No se encontraron notas que coincidan con los criterios de
              búsqueda
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
