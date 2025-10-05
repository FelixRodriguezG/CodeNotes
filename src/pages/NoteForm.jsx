import { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Badge, { KNOWN } from '../components/Badge';
import Toast from "../components/Toast";

export default function NoteForm() {
  // Hooks y estado inicial
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { selected, loading, error, actions } = useNotes();
  const titleInputRef = useRef(null);
  const timeoutRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customTagInput, setCustomTagInput] = useState("");
  const [form, setForm] = useState({
    title: "",
    summary: "",
    body: "",
    tags: [],
  });
  const [toast, setToast] = useState(null);

  // Tags predefinidos memoizados
  const PREDEFINED_TAGS = useMemo(() => 
    Array.from(KNOWN)
      .filter(tag => tag !== 'default')
      .sort(),
    []
  );

  // Efectos
  useEffect(() => {
    if (isEditing && id && !selected) {
      actions.fetchNote(id);
    }
  }, [id, actions, isEditing, selected]);

  useEffect(() => {
    if (isEditing && selected && String(selected.id) === String(id)) {
      setForm({
        title: selected.title || "",
        summary: selected.summary || "",
        body: selected.body || "",
        tags: selected.tags || ["note"],
      });
    }
  }, [selected, id, isEditing]);

  useEffect(() => {
    if (!isEditing || (isEditing && selected)) {
      titleInputRef.current?.focus();
    }
  }, [isEditing, selected]);

  // Cleanup de timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Funciones auxiliares
  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const validateForm = () => {
    if (!form.title.trim()) return "El título es requerido";
    if (!form.summary.trim()) return "El resumen es requerido";
    if (!form.body.trim()) return "El contenido es requerido";
    return null;
  };

  // Manejadores de eventos
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({
      ...f,
      [name]: value,
    }));
  };

  const handleTagSelect = (e) => {
    const tag = e.target.value.trim();
    if (tag && !form.tags.includes(tag)) {
      setForm(f => ({
        ...f,
        tags: [...new Set([...f.tags, tag])]
      }));
      e.target.value = '';
    }
  };

  const handleCustomTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const tag = customTagInput.trim();
      if (tag && !form.tags.includes(tag)) {
        setForm(f => ({
          ...f,
          tags: [...new Set([...f.tags, tag])]
        }));
        setCustomTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    if (!tagToRemove) return;
    setForm(f => ({
      ...f,
      tags: f.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      showToast(validationError, "error");
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditing) {
        const saved = await actions.updateNote(id, form);
        showToast("Nota actualizada correctamente", "success");
        timeoutRef.current = setTimeout(() => {
          navigate(`/notes/${saved.id}`);
        }, 1500);
      } else {
        const created = await actions.createNote(form);
        showToast("Nota creada correctamente", "success");
        timeoutRef.current = setTimeout(() => {
          navigate(`/notes/${created.id}`);
        }, 1500);
      }
    } catch (error) {
      showToast(
        error.message || "Ha ocurrido un error al guardar la nota", 
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (loading && isEditing && !selected) return <Loader />;

  // Render
  return (
    <section className="container mx-auto ">
      <h1 className="text-2xl mb-3"># {isEditing ? "Editar" : "Crear Nueva"} nota</h1>
      {error && <ErrorMessage message={error} />}

      <form className="form " onSubmit={onSubmit}>
        <label className="label">
          Título
          <input
            ref={titleInputRef}
            className="input"
            name="title"
            value={form.title}
            onChange={onChange}
            required
          />
        </label>

        <label className="label">
          Resumen:
          <input
            className="input"
            name="summary"
            value={form.summary}
            onChange={onChange}
            required
          />
        </label>

        <label className="label-col">
          Contenido:
          <textarea
            className="input"
            name="body"
            value={form.body}
            onChange={onChange}
            rows={8}
            required
          />
        </label>

        <footer className="flex gap-4 flex-wrap">

          <label className="label-col">
            Tags predefinidos
            <select 
              className="input"
              onChange={handleTagSelect}
              value=""
              disabled={isSubmitting}
            >
              <option value="" disabled>Seleccionar tag...</option>
              {PREDEFINED_TAGS.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </label>


          <label className="label-col flex-1">
            Tags personalizados
            <input
              className="input"
              placeholder="Escribe y presiona Enter para añadir"
              value={customTagInput}
              onChange={(e) => setCustomTagInput(e.target.value)}
              onKeyDown={handleCustomTagKeyDown}
              disabled={isSubmitting}
            />
          </label>
          <label className="label-col">
            Tags actuales
            <div className="flex flex-wrap gap-2">
              {form.tags.map(tag => (
                <Badge 
                  key={tag}
                  className="flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    className="hover:text-red-500"
                    onClick={() => handleRemoveTag(tag)}
                    disabled={isSubmitting}
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </label>
        </footer>

        <div className="flex gap-4">
          <button 
            className="btn btn-secondary" 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? "Guardando..." 
              : isEditing 
                ? "Guardar" 
                : "Crear"
            }
          </button>
          <Link 
            className="btn btn-danger" 
            to="/notes"
            tabIndex={isSubmitting ? -1 : 0}
          >
            Cancelar
          </Link>
        </div>
      </form>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}