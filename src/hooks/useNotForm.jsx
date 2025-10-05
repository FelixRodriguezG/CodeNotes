import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useNoteForm({ id, selected, actions }) {
  const navigate = useNavigate();
  const titleInputRef = useRef(null);
  const isEditing = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    summary: "",
    body: "",
    tags: [],
  });

  useEffect(() => {
    if (isEditing) actions.fetchNote(id);
  }, [id, actions, isEditing]);

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

  return {
    form,
    setForm,
    isEditing,
    titleInputRef,
    navigate
  };
}