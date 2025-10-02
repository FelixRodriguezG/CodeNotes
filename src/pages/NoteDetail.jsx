import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import LoadingScreen from "../components/LoadingScreen";
import ErrorMessage from "../components/ErrorMessage";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import NoteBody from "../components/NoteBody";
import JsonWrapper from "../components/JsonWrapper";
import XmlWrapper from "../components/XmlWrapper";
import Modal from "../components/Modal";
import Button from "../components/button";

export default function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selected, loading, error, actions } = useNotes();
  const [ showModal, setShowModal ] = useState(false);

  useEffect(() => {
    actions.fetchNote(id);
  }, [ id ]);

  if (loading && !selected) return <LoadingScreen />;
  if (error) return <ErrorMessage message={error} />;

  if (!selected) return null;

  const handleDelete = () => {
    setShowModal(true);
  };
  const confirmDelete = async () => {
    await actions.deleteNote(selected.id); // Usa deleteNote, no deleteAlbum
    navigate("/notes");
  };

  const objectToJson = {
    description: selected.summary,
    tags: selected.tags
  }

  return (
    <>
      <article className="text-fg flex flex-col container m-auto h-full text-wrap">
        {/* Boton Volver */}
        <Link
          className="mb-5 md:mb-0 btn btn-outline shadow-sm flex w-fit  items-center ml-auto gap-2"
          to="/notes"
        >
          <ArrowLeftIcon className="w-3 h-3" />
          Volver
        </Link>

        <header className="flex gap-5 justify-between items-center rounded-[var(--radius-sm)]">
          <h1 className="text-sm md:text-xl border border-border px-4 rounded-tl-sm rounded-sm relative z-10 bg-surface text-heading"
          >
            Note - id: # {selected.id}
          </h1>
        </header>

        <section className="bg-bg h-full px-5 flex flex-col gap-4 border border-border z-0 relative">
          <h2 className="flex mx-auto md:justify-end items-center text-xl w-fit md:mx-0 md:ml-auto px-4 mt-2 code rounded-sm text-heading"
          >
            <strong>Título:</strong> {selected.title}
          </h2>

          <JsonWrapper value={objectToJson} />

          <XmlWrapper tag="tags">
            {`${selected.tags.join(", ").toUpperCase()}`}
          </XmlWrapper>

          <section className="code bg-elevated p-4 rounded--md">
            <NoteBody>{selected.body}</NoteBody>
          </section>

          <div className="flex gap-4 ml-5">
            <Link className="btn btn-secondary" to={`/notes/${selected.id}/edit`}>
              Editar
            </Link>
            <Button variant="danger" onClick={handleDelete}>
              Eliminar
            </Button>
          </div>
        </section>
      </article>

      <Modal
        open={showModal}
        title="¿Estas seguro de eliminar esta nota?"
        onClose={() => setShowModal(false)}
      >
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="danger"
            isLoading={false}
            onClick={() => {
              confirmDelete();
              setShowModal(false);
            }}
          >
            Sí, eliminar
          </Button>
        </div>
      </Modal>
    </>
  );
}
