import { useEffect, useRef } from "react";
import Button from "./button";

export default function Modal({
  open,
  title,
  children,
  onClose,
  className = "",
  actions,
}) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const titleId = "modal-title";

  useEffect(() => {
    if (open && closeButtonRef.current) {
      // Enfoca el botón de cerrar al abrir
      closeButtonRef.current.focus();
    }

    // Manejo de Escape
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();

      // Atrapar el foco dentro del modal
      if (e.key === "Tab") {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        ref={modalRef}
        className={`bg-overlay rounded shadow-lg p-6 w-full md:w-auto md:max-w-md mx-auto border border-border relative ${className}`}
      >
        <header className="flex justify-between items-center mb-4">
          <h2 id={titleId} className="text-lg text-heading font-bold">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="text-danger absolute right-1 top-2 font-bold text-lg bg-elevated hover:text-fg p-0.5 rounded-sm"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </header>
        <div className="text-muted">{children}</div>
        <div className="mt-4 flex justify-end gap-2">
          {actions || (
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
