import { useState, useRef, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

import Button from "../components/button";

import logo from "../assets/logo.svg";
import favicon from "../assets/favicon.svg";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const asideRef = useRef(null);
  const mainRef = useRef(null);
  const navbarRef = useRef(null);
  const location = useLocation();

  // Solo enfoca el sidebar cuando se usa el teclado
  useEffect(() => {
    const handleFirstTab = (e) => {
      if (e.key === "Tab") {
        // Remueve el listener después del primer Tab
        window.removeEventListener("keydown", handleFirstTab);
        if (asideRef.current) {
          asideRef.current.focus();
        }
      }
    };

    window.addEventListener("keydown", handleFirstTab);
    return () => window.removeEventListener("keydown", handleFirstTab);
  }, []);

  // Si no hay foco y se presiona Tab, enfoca el primer elemento del Navbar
  useEffect(() => {
    const handleTab = (e) => {
      const active = document.activeElement;

      if (e.key === "Tab" && !e.shiftKey) {
        // Si el foco está en body o main, redirigir al Navbar
        if (active === document.body || active === mainRef.current) {
          e.preventDefault();

          setCollapsed(false);

          // Enfocar el primer enlace del Navbar
          setTimeout(() => {
            const firstLink = asideRef.current?.querySelector("a, button");
            if (firstLink) {
              firstLink.focus();
            }
          }, 50);
        }
      }
    };

    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, []);

  // Eventos teclado (accesibilidad)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setCollapsed((prev) => !prev);
    }
    if (e.key === "Escape") {
      setCollapsed(true);
      e.target.blur();
    }
  };

  // Manejar blur del aside (solo colapsar si el foco sale completamente del sidebar)
  const handleAsideBlur = (e) => {
    // Verificar si el nuevo foco está dentro del aside
    if (!asideRef.current?.contains(e.relatedTarget)) {
      setCollapsed(true);
    }
  };

  return (
    <div className="layout-app" data-collapsed={collapsed ? "true" : "false"}>
      <aside
        ref={asideRef}
        tabIndex={-1}
        className={[
          "area-sidebar justify-around items-center",
          "md:justify-start md:items-start bg-bg overflow-hidden",
          "md:transition-[width] md:duration-300",
          "flex md:flex-col gap-8",
          collapsed ? "md:w-[56px]" : "md:w-[220px]",
        ].join(" ")}
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
        onBlur={handleAsideBlur}
        onKeyDown={handleKeyDown}
      >
        <div className="relative hidden md:flex h-8 w-full overflow-hidden px-2">
          {/* Logo largo */}
          <img
            src={logo}
            alt="DevNotes Logo"
            aria-hidden={collapsed ? "true" : "false"}
            className={[
              "absolute inset-0 h-8 w-full object-contain",
              "transition-opacity duration-300 ease-[var(--ease-fluid)]",
              collapsed ? "opacity-0" : "opacity-100",
            ].join(" ")}
          />

          {/* Logo corto */}
          <img
            src={favicon}
            alt="DevNotes Short Logo"
            aria-hidden={collapsed ? "false" : "true"}
            className={[
              "absolute inset-0 h-8 w-full object-contain",
              "transition-opacity duration-300 ease-[var(--ease-fluid)]",
              collapsed ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
        </div>

        {/* Contenido del menú */}
        <Navbar
          ref={navbarRef}
          collapsed={collapsed}
          onRequestExpand={() => setCollapsed(false)}
        />
      </aside>

      {/* Resto del layout */}
      <header className="area-header bg-bg px-4 py-2 border-b border-border">
        <Header />
      </header>
      <main ref={mainRef} className="area-main p-2 md:p-4 bg-bg">
        <Outlet />
      </main>
    </div>
  );
}
