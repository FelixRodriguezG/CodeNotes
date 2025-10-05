-- Crear tabla notes con summary y body
CREATE TABLE IF NOT EXISTS public.notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text,
  body text,
  tags text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Función para refrescar updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at_notes()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger antes de cada UPDATE
DROP TRIGGER IF EXISTS set_updated_at_notes ON public.notes;
CREATE TRIGGER set_updated_at_notes
BEFORE UPDATE ON public.notes
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at_notes();

-- Seeds con summary y body
INSERT INTO public.notes (title, summary, body, tags)
VALUES
(
  'Hook useDebounce',
  'Hook personalizado en React para retrasar actualizaciones de un valor.',
  '```js
import { useState, useEffect } from "react";

export function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}
```',
  ARRAY['react','hook','snippet']
),
(
  'SQL JOIN básico',
  'Ejemplo de cómo unir datos de dos tablas con una clave foránea.',
  '```sql
SELECT u.name, o.total
FROM users u
JOIN orders o ON u.id = o.user_id;
```',
  ARRAY['sql','join','snippet']
),
(
  'Grid auto-fit en CSS',
  'Plantilla para crear un grid fluido sin media queries.',
  '```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
```',
  ARRAY['css','layout','snippet']
),
(
  'Array chunk en JS',
  'Divide un array en partes más pequeñas del tamaño que indiques.',
  '```js
function chunk(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
```',
  ARRAY['js','array','snippet']
),
(
  'Fetch con async/await',
  'Ejemplo de llamada a una API con manejo de errores usando async/await.',
  '```js
async function getData() {
  try {
    const res = await fetch("/api/data");
    return await res.json();
  } catch (e) {
    console.error(e);
  }
}
```',
  ARRAY['js','http','snippet']
),
(
  'Validación de email con regex',
  'Expresión regular básica para comprobar direcciones de correo.',
  '```js
const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
console.log(emailRegex.test("test@mail.com")); // true
```',
  ARRAY['js','regex','snippet']
),
(
  'Dark mode con prefers-color-scheme',
  'Cómo aplicar estilos oscuros automáticos en función de la preferencia del usuario.',
  '```css
@media (prefers-color-scheme: dark) {
  body {
    background: #111;
    color: #eee;
  }
}
```',
  ARRAY['css','ui','apunte']
),
(
  'Promise.allSettled en JS',
  'Ejecuta varias promesas y obtiene el estado de cada una, éxito o error.',
  '```js
const promises = [
  Promise.resolve("ok"),
  Promise.reject("error")
];

Promise.allSettled(promises).then(results => {
  console.log(results);
});
```',
  ARRAY['js','promise','snippet']
),
(
  'Componente Button en React',
  'Botón sencillo en React con estilos de Tailwind.',
  '```js
export default function Button({ label }) {
  return <button className="px-4 py-2 bg-blue-500 text-white rounded">{label}</button>;
}
```',
  ARRAY['react','component','snippet']
),
(
  'Regex de contraseña segura',
  'Comprueba que una contraseña tenga mayúsculas, minúsculas, número y símbolo.',
  '```js
const passRx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$/;
console.log(passRx.test("A_strong#Pass1")); // true
```',
  ARRAY['js','regex','apunte']
);