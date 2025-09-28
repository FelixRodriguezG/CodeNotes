import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

// Función generadora de API para cualquier tabla
export function createTableApi(table) {
  return {
    list: async () => {
      const { data, error } = await supabase.from(table).select();
      if (error) throw error;
      return data;
    },
    get: async (id) => {
      const { data, error } = await supabase.from(table).select().eq("id", id).single();
      if (error) throw error;
      return data;
    },
    create: async (item) => {
      const { data, error } = await supabase.from(table).insert([item]).select().single();
      if (error) throw error;
      return data;
    },
    update: async (id, item) => {
      const { data, error } = await supabase.from(table).update(item).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    remove: async (id) => {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
      return true;
    },
  };
}

// Ejemplo de uso:
export const NotesApi = createTableApi("notes");
export const UsersApi = createTableApi("users"); // Si tienes una tabla "users"