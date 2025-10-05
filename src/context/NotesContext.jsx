import { createContext, useContext, useReducer, useCallback } from "react";
import { NotesApi } from "../api/supabaseClient";

const NotesContext = createContext(null);

const initialState = {
  notes: [],
  selected: null,
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "ERROR":
      return { ...state, loading: false, error: action.error };
    case "SET_NOTES":
      return { ...state, loading: false, notes: action.notes };
    case "SET_SELECTED":
      return { ...state, loading: false, selected: action.note };
    case "ADD_NOTE":
      return {
        ...state,
        loading: false,
        notes: [action.note, ...state.notes],
      };
    case "UPDATE_NOTE":
      return {
        ...state,
        loading: false,
        notes: state.notes.map((n) =>
          n.id === action.note.id ? action.note : n
        ),
        selected:
          state.selected && state.selected.id === action.note.id
            ? action.note
            : state.selected,
      };
    case "REMOVE_NOTE":
      return {
        ...state,
        loading: false,
        notes: state.notes.filter((n) => n.id !== action.id),
        selected:
          state.selected && state.selected.id === action.id
            ? null
            : state.selected,
      };
    default:
      return state;
  }
}

export function NotesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchNotes = useCallback(async () => {
    dispatch({ type: "LOADING" });
    try {
      const data = await NotesApi.list();
      dispatch({ type: "SET_NOTES", notes: data });
    } catch (err) {
      dispatch({ type: "ERROR", error: err.message });
    }
  }, []);

  const fetchNote = useCallback(
    async (id) => {
      if (!id) return;

      // Verificar si ya tenemos la nota en el estado
      const existingNote = state.notes.find((note) => note.id === id);
      if (existingNote && state.selected?.id === id) {
        return;
      }

      dispatch({ type: "LOADING" });
      try {
        const data = await NotesApi.get(id);
        dispatch({ type: "SET_SELECTED", note: data });
      } catch (err) {
        dispatch({ type: "ERROR", error: err.message });
      }
    },
    [state.notes, state.selected]
  );

  const createNote = useCallback(async (payload) => {
    dispatch({ type: "LOADING" });
    try {
      const data = await NotesApi.create(payload);
      dispatch({ type: "ADD_NOTE", note: data });
      return data;
    } catch (err) {
      dispatch({ type: "ERROR", error: err.message });
      throw err;
    }
  }, []);

  const updateNote = useCallback(async (id, payload) => {
    dispatch({ type: "LOADING" });
    try {
      const data = await NotesApi.update(id, payload);
      dispatch({ type: "UPDATE_NOTE", note: data });
      return data;
    } catch (err) {
      dispatch({ type: "ERROR", error: err.message });
      throw err;
    }
  }, []);

  const deleteNote = useCallback(async (id) => {
    dispatch({ type: "LOADING" });
    try {
      await NotesApi.remove(id);
      dispatch({ type: "REMOVE_NOTE", id });
    } catch (err) {
      dispatch({ type: "ERROR", error: err.message });
      throw err;
    }
  }, []);

  const value = {
    ...state,
    actions: { fetchNotes, fetchNote, createNote, updateNote, deleteNote },
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes debe usarse dentro de <NotesProvider>");
  return ctx;
}
