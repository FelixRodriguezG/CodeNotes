import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import LoadingScreen from "../components/LoadingScreen";
import ErrorMessage from "../components/ErrorMessage";
import NoteBody from "../components/NoteBody";
import Badge from "../components/Badge";
import Modal from "../components/Modal";
import Button from "../components/button";
import Toast from "../components/Toast";

export default function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selected, loading, error, actions } = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      actions.fetchNote(id);
    }
  }, [id]);

  const handleDelete = () => setShowModal(true);

  const confirmDelete = async () => {
    try {
      if (!selected || !selected.id) {
        throw new Error("No hay nota seleccionada para eliminar");
      }

      setShowModal(false);
      setIsDeleting(true);

      await actions.deleteNote(selected.id);

      setToast({
        message: "¡Nota eliminada exitosamente!",
        type: "success",
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate("/notes");
    } catch (err) {
      setIsDeleting(false);
      setToast({
        message: err.message || "No se pudo eliminar la nota",
        type: "error",
      });

      // No necesitamos redirección aquí, el useEffect se encargará de ello
    }
  };

  // Efecto para manejar la navegación cuando no hay nota seleccionada
  useEffect(() => {
    if (!selected && !isDeleting && !loading) {
      navigate("/notes");
    }
  }, [selected, isDeleting, loading, navigate]);

  // Manejo de estados de carga y error
  if (loading && !selected) return <LoadingScreen />;
  if (error) return <ErrorMessage message={error} />;

  // Si estamos eliminando pero no hay nota seleccionada, mostramos loading
  if (!selected && isDeleting) {
    return <LoadingScreen />;
  }

  // Si no hay nota seleccionada, mostramos loading mientras se realiza la navegación
  if (!selected) {
    return <LoadingScreen />;
  }

  return (
    <>
      <article
        className={`text-fg flex gap-3 flex-col md:container md:mx-auto max-h-full ${
          isDeleting ? "opacity-50" : ""
        }`}
      >
        <header className="flex gap-5 items-center">
          <h1 className="text-2xl"># Note Details</h1>
          <Link
            className="mb-5 md:mb-0 btn btn-outline shadow-sm flex w-fit items-center gap-2"
            to="/notes"
          >
            <ArrowLeftIcon className="w-3 h-3" />
            Volver
          </Link>
        </header>

        <section className="bg-bg h-full px-5 flex flex-col gap-4 border border-border z-0 relative py-5">
          <h2 className="text-sm md:text-xl border border-border px-2 py-1 rounded-tr-sm rounded-tl-sm relative z-10 text-heading">
            Note - id: # {selected.id}
          </h2>

          <header className="flex flex-col gap-2">
            <h3 className="flex text-base mx-auto md:justify-end items-center md:text-xl w-fit px-2 py-1 font-mono rounded-sm text-heading">
              <strong>Título:</strong> {selected.title}
            </h3>
            <h3 className="text-lg">Resumen:</h3>
            <blockquote className="blockquoute w-fit">
              {selected.summary}
            </blockquote>
            <h3 className="flex gap-2.5">
              Tags:
              <ul className="flex gap-2 items-center">
                {(selected.tags || []).map((tag, i) => (
                  <li className="self-end" key={i}>
                    <Badge variant={tag}>{tag}</Badge>
                  </li>
                ))}
              </ul>
            </h3>
          </header>

          <section className="code p-2 rounded-md">
            <NoteBody>{selected.body}</NoteBody>
          </section>

          <div className="flex gap-4 ml-auto">
            <Link
              className="btn btn-secondary"
              to={`/notes/${selected.id}/edit`}
            >
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
        title="¿Estás seguro de eliminar esta nota?"
        onClose={() => setShowModal(false)}
        actions={
          <>
            <Button
              variant="danger"
              isLoading={loading}
              onClick={confirmDelete}
            >
              Sí, eliminar
            </Button>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
          </>
        }
      >
        <p className="text-subtle dark:text-muted">
          Esta acción no se puede deshacer.
        </p>
      </Modal>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          duration={2000}
        />
      )}
    </>
  );
}
