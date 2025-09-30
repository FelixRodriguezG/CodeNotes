import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import LoadingScreen from "../components/LoadingScreen";
import ErrorMessage from "../components/ErrorMessage";
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

  return (
    <>
      <article className="text-white">
        <h1>Nota #{selected.id}</h1>
        <p>
          <strong>Título:</strong> {selected.title}
        </p>
        <div className="">
          <Link className="btn" to={`/notes/${selected.id}/edit`}>
            Editar
          </Link>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
          <Link className="btn secondary" to="/notes">
            Volver
          </Link>
        </div>
      </article>

      {/* Modal confirmación de eliminacion de nota*/}
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
