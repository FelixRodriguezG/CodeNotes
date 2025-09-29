import { Link } from "react-router-dom";

export default function Navbar({ collapsed, onRequestExpand }) {
  const handleFocus = () => {
    if (collapsed) onRequestExpand?.();
  };

  return (
    <nav
      aria-label="Navegación principal"
      data-collapsed={collapsed ? "true" : "false"}
      onFocus={handleFocus}
      className="w-full"
    >
      <ul className="flex  md:flex-col gap-5 mx-2">
        <li className="links">
          <Link to="/" aria-label="Home" className="flex gap-2 group items-center ">
            <span className="w-6 h-6 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 transition-transform group-hover:scale-150"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M5 12h-2l9-9 9 9h-2" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
              </svg>
            </span>
            <span className={
              "inline-block transition-all duration-200" +
              (collapsed
                ? " opacity-0 pointer-events-none"
                : " w-20 opacity-100  ml-2 whitespace-nowrap")
            }>Home</span>
          </Link>
        </li>
        <li className="links">
          <Link to="/notes" className="flex gap-2 items-center group">
            <span className="w-6 h-6 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 transition-transform group-hover:scale-150"
                viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M5 5a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
                <path d="M9 7h6" />
                <path d="M9 11h6" />
                <path d="M9 15h4" />
              </svg>
            </span>
            <span className={
              "inline-block transition-all duration-200" +
              (collapsed
                ? " opacity-0 pointer-events-none"
                : " w-20 opacity-100 ml-2 whitespace-nowrap")
            }>Notas</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
