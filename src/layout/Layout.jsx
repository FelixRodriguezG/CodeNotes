import { useState } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Header from "../components/Header"
import Footer from "../components/Footer"

import logo from "../assets/logo.svg"

export default function Layout() {
  const [ collapsed, setCollapsed ] = useState(false)

   // Manejar eventos del teclado
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault() // Prevenir el comportamiento por defecto
      setCollapsed(prev => !prev)
    }
  }

  return (
    <div className="layout-app" data-collapsed={collapsed ? "true" : "false"}>
      <aside className={[
        "area-sidebar relative bg-[var(--sidebar-bg)] overflow-hidden",
        // ancho colapsado vs expandido (solo ≥ md)
        "md:transition-[width] md:duration-300",
        "flex flex-col items-center  gap-8",
        collapsed ? "md:w-[56px]" : "md:w-[220px]",
      ].join(" ")}
      >
        {/* logo */}

        <img
          src={logo}
          alt="DevNotes Logo"
          className={`h-10 mt-3 transition-all duration-300 ${collapsed ? 'opacity-0' : 'w-auto'}`}
          />

        {/* Contenido del menú */}
        <Navbar 
        collapsed={collapsed}
        onRequestExpand={() => setCollapsed(false)}
        />

        {/* Rail vertical clicable */}
        <button
          onClick={() => setCollapsed(v => !v)}
          onKeyDown={handleKeyDown}
          aria-expanded={!collapsed}
          className={[
            "hidden md:flex items-center justify-center",                 // solo en desktop
            "absolute  top-1/2 -translate-y-1/2 w-[56px] z-10",
            " cursor-pointer select-none rotate-180",
            collapsed ? "right-0" : "left-1/2 -translate-x-1/2 ",
            // texto vertical
            collapsed ? "[writing-mode:vertical-rl] [text-orientation:mixed]" : "",
            "[writing-mode:vertical-rl] [text-orientation:mixed]",
            "text-[var(--text-lg)] tracking-[0.2em] uppercase",
            "text-muted hover:text-text",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--btn-outline-ring)]"
          ].join(" ")}
          title={collapsed ? "Click to expand" : "Click to hide"}
        >
          {collapsed ? "Click to expand" : "Click to hide"}
        </button>

      </aside>

      {/* Resto del layout */}
      <header className="area-header bg-surface p-4"><Header /></header>
      <main className="area-main p-4 bg-elevated"> <Outlet /> </main>
      <footer className="area-footer bg-surface p-4"><Footer /></footer>
    </div>
  )
}
