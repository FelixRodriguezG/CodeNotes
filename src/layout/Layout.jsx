import { useState, useRef, useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"
import Header from "../components/Header"

import Button from "../components/button"

import logo from "../assets/logo.svg"
import favicon from "../assets/favicon.svg"

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false)
  const asideRef = useRef(null)
  const mainRef = useRef(null)
  const navbarRef = useRef(null)
  const location = useLocation()

  // Enfoca el sidebar al cargar/cambiar de ruta
  useEffect(() => {
    if (asideRef.current) {
      asideRef.current.focus()
    }
  }, [location])

  // Si no hay foco y se presiona Tab, enfoca el primer elemento del Navbar
  useEffect(() => {
    const handleTab = (e) => {
      const active = document.activeElement
      
      if (e.key === "Tab" && !e.shiftKey) {
        // Si el foco está en body o main, redirigir al Navbar
        if (active === document.body || active === mainRef.current) {
          e.preventDefault()
          
          // Expandir sidebar temporalmente
          setCollapsed(false)
          
          // Enfocar el primer enlace del Navbar
          setTimeout(() => {
            const firstLink = asideRef.current?.querySelector('a, button')
            if (firstLink) {
              firstLink.focus()
            }
          }, 50)
        }
      }
    }
    
    window.addEventListener("keydown", handleTab)
    return () => window.removeEventListener("keydown", handleTab)
  }, [])

  // Manejar eventos del teclado en el aside
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setCollapsed(prev => !prev)
    }
    if (e.key === "Escape") {
      setCollapsed(true)
      e.target.blur()
    }
  }

  // Manejar blur del aside (solo colapsar si el foco sale completamente del sidebar)
  const handleAsideBlur = (e) => {
    // Verificar si el nuevo foco está dentro del aside
    if (!asideRef.current?.contains(e.relatedTarget)) {
      setCollapsed(true)
    }
  }

  return (
    <div
      className="layout-app"
      data-collapsed={collapsed ? "true" : "false"}
    >
      <aside
        ref={asideRef}
        tabIndex={-1}
        className={[
          "area-sidebar justify-around items-center md:justify-start md:items-start bg-[var(--sidebar-item-active-bg)] overflow-hidden",
          "md:transition-[width] md:duration-300",
          "flex md:flex-col gap-8 border-r-1 border-muted",
          collapsed ? "md:w-[56px]" : "md:w-[220px]",
        ].join(" ")}
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
        onBlur={handleAsideBlur}
        onKeyDown={handleKeyDown}
      >
        <div className="h-18  object-cover overflow-hidden">
        {/* logo */}
        {collapsed ? (
          <img
            src={favicon}
            alt="DevNotes Short Logo"
            className="hidden md:flex md:h-18 shrink-0 "
          />
        ) : (
          <img
            src={logo}
            alt="DevNotes Logo"
            className={`hidden h-18 md:block ${
              collapsed ? "opacity-0" : "w-auto"
            }`}
          />
        )}

        </div>


        {/* Contenido del menú */}
        <Navbar
          ref={navbarRef}
          collapsed={collapsed}
          onRequestExpand={() => setCollapsed(false)}
        />

      </aside>

      {/* Resto del layout */}
      <header className="area-header bg-bg p-4 border-b-1 border-muted">
        <Header />
      </header>
      <main ref={mainRef} className="area-main p-4 bg-[var(--sidebar-bg)]">
        <Outlet />
      </main>
    </div>
  )
}