import { useEffect, useRef } from "react";
import Button from "./button";

export default function Modal({ open, title, children, onClose }) {
    const modalRef = useRef(null);
    const titleId = "modal-title";

    useEffect(() => {
        if (open && modalRef.current) {
            // Enfoca el modal al abrir
            modalRef.current.focus();
        }
        // Cierra con Escape
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        if (open) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [ open, onClose ]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
        >
            <div
                ref={modalRef}
                tabIndex={-1}
                className="bg-overlay rounded shadow-lg p-6 min-w-[300px] outline-none"
            >
                <h2 id={titleId} className="text-lg  text-heading font-bold mb-4">
                    {title}
                </h2>
                <div className="text-muted flex items-center gap-3">{children}

                <Button
                    variant="outline"
                    className="mt-4 w-fit ml-auto inline-block"
                    onClick={onClose}>
                    Cancelar
                </Button>
                </div>

            </div>
        </div>
    );
}