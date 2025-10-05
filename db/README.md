# Configuración de la Base de Datos

## Estructura y Datos de Ejemplo

El archivo `setup.sql` contiene todo el código necesario para configurar la base de datos, incluyendo:

- Creación de la tabla `notes`
- Función y trigger para `updated_at`
- Datos de ejemplo con snippets y apuntes

## Pasos para configurar

1. Abre el [Dashboard de Supabase](https://app.supabase.com)
2. Selecciona tu proyecto
3. Ve a SQL Editor
4. Copia y pega el contenido de `setup.sql`
5. Ejecuta la query y verifica que no hay errores

## Verificación

Para comprobar que todo se ha creado correctamente:

```sql
-- Verificar estructura
SELECT * FROM public.notes LIMIT 1;

-- Verificar trigger
UPDATE public.notes
SET title = title || ' (updated)'
WHERE id = (SELECT id FROM public.notes LIMIT 1);

-- Verificar que updated_at se actualizó
SELECT title, updated_at
FROM public.notes
ORDER BY updated_at DESC
LIMIT 1;
```

## Datos de ejemplo incluidos

Los datos de ejemplo incluyen snippets y apuntes sobre:

- React Hooks (useDebounce)
- SQL JOIN básico
- Grid CSS auto-fit
- Manipulación de arrays en JS
- Fetch con async/await
- Validación de email con regex
- Dark mode con CSS
- Promise.allSettled
- Componente Button en React
- Regex para contraseñas seguras
