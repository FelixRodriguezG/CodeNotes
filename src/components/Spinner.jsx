export default function Spinner({ className = "" }) {
  return (
    <span
      className={
        "inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin " +
        className
      }
      aria-label="Cargando"
    />
  );
}