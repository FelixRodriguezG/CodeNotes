import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function ErrorMessage({ message, className = "" }) {
  return (
    <div
      role="alert"
      className={`flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2 font-semibold ${className}`}
    >
      <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
      <span className="font-bold">Error:</span> {message}
    </div>
  );
}
