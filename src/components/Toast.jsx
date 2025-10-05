import { useEffect } from "react";

export default function Toast({
  message,
  type = "success",
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const baseStyles =
    "fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl z-[100] transition-all duration-300 flex items-center min-w-[200px] justify-center font-medium";
  const typeStyles = {
    success:
      "bg-success/90 text-white ring-1 ring-success/30 shadow-success/20",
    error: "bg-danger/90 text-white ring-1 ring-danger/30 shadow-danger/20",
    info: "bg-info/90 text-white ring-1 ring-info/30 shadow-info/20",
  };

  return (
    <div className={`${baseStyles} ${typeStyles[type]}`}>
      <div className="flex items-center gap-2">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>
    </div>
  );
}
