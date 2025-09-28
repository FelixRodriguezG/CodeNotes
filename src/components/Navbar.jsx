import React from "react";
import { Link } from "react-router-dom";
import homeLogo from "../assets/home.svg";
import noteLogo from "../assets/note.svg";

export default function Navbar({ collapsed, onRequestExpand }) {
  const handleFocus = () => {
    if (collapsed) onRequestExpand?.();
  };

  return (
    <nav
      aria-label="Navegación principal"
      data-collapsed={collapsed ? "true" : "false"}
      onFocus={handleFocus}
    >
      <ul
        className={`flex flex-col gap-5 px-4`}
      >
        <li className="links">
          <Link to="/" aria-label="Home" className="flex gap-2 group">
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
            <span className={collapsed ? "sr-only" : ""}>Home</span>
          </Link>
        </li>
        <li className="links">
          <Link to="/notes" className="flex gap-2 items-center group">
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
  <span className={collapsed ? 'sr-only' : ''}>Notas</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
