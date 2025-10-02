import { NavLink } from "react-router-dom";

export default function Navbar({ collapsed, onRequestExpand }) {
  const handleFocus = () => { if (collapsed) onRequestExpand?.(); };

  // Label: oculto en móvil, animación solo en ≥ md
  const labelClasses = [
    "hidden md:inline-block",
    "whitespace-nowrap overflow-hidden",
    "md:transition-[opacity,width] md:duration-300",
    collapsed ? "md:w-0 md:opacity-0" : "md:w-20 md:opacity-100",
  ].join(" ");

  const linkClasses = (isActive) =>
    [
      "links group rounded-md",
      "flex items-center",                  
      "h-full md:h-auto",                  
      "justify-center md:justify-start",   
      "p-0 md:px-2 md:py-2",               
      "focus-visible:outline-2 focus-visible:outline-ring",
      isActive && "links-active",
    ].filter(Boolean).join(" ");

  return (
    <nav
      aria-label="Navegación principal"
      data-collapsed={collapsed ? "true" : "false"}
      onFocus={handleFocus}
      className="w-full h-full"
    >
      <ul
        className={[
          "flex h-full items-stretch px-0", // base móvil (barra inferior)
          "justify-around gap-0",           // móvil: repartidos
          "md:flex-col md:justify-start md:items-stretch md:gap-5 md:px-2", // desktop: arriba/izq
        ].join(" ")}
      >
        {/* Home */}
        <li className="flex-1 md:flex-none">
          <NavLink to="." end aria-label="Home" className={({ isActive }) => linkClasses(isActive)}>
            <span className="w-4 h-4 flex items-center justify-center shrink-0">
              <svg
                className="w-6 h-6 transition-transform md:group-hover:scale-150 will-change-transform origin-center"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M5 12h-2l9-9 9 9h-2" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
              </svg>
            </span>
            <span className={labelClasses}>Home</span>
          </NavLink>
        </li>

        {/* Notas */}
        <li className="flex-1 md:flex-none">
          <NavLink to="notes" className={({ isActive }) => linkClasses(isActive)}>
            <span className="w-4 h-4 flex items-center justify-center shrink-0">
              <svg
                className="w-6  h-6 transition-transform md:group-hover:scale-150 will-change-transform origin-center"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M5 5a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
                <path d="M9 7h6" />
                <path d="M9 11h6" />
                <path d="M9 15h4" />
              </svg>
            </span>
            <span className={labelClasses}>Notas</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
