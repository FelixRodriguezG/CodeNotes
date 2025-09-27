import React from 'react'
import { useParams } from 'react-router-dom';

export default function NoteForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);

  return (
    <div>
      <h1>{isEditing ? 'Editar Nota' : 'Crear Nueva Nota'}</h1>
      {/* Formulario */}
    </div>
  );
}
