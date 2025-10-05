export default function Spinner({ className = "" }) {
  return (
    <span
      className={
        "inline-block border-2 border-current border-r-transparent rounded-full animate-spin " +
        className
      }
      aria-label="Cargando"
    />
  );
}