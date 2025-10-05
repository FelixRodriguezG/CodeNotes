import { useState, useCallback, memo } from "react";
import Modal from "./Modal";

// Componente del formulario memoizado
const SearchForm = memo(function SearchForm({
  filters,
  onSearchChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="search-form">
      <div className="search-input-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="search-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          name="searchTerm"
          id="searchTerm"
          value={filters.searchTerm}
          onChange={onSearchChange}
          placeholder="Buscar en las notas..."
          aria-label="Término de búsqueda"
          className="search-input"
        />
      </div>

      <div className="search-filters">
        <select
          name="filterBy"
          id="filterBy"
          value={filters.filterBy}
          onChange={onSearchChange}
          aria-label="Filtrar por"
          className="search-select"
        >
          <option value="title">Título</option>
          <option value="summary">Resumen</option>
          <option value="tags">Etiquetas</option>
        </select>

        <select
          name="dateRange"
          id="dateRange"
          value={filters.dateRange}
          onChange={onSearchChange}
          aria-label="Rango de fechas"
          className="search-select"
        >
          <option value="all">Todas las fechas</option>
          <option value="today">Hoy</option>
          <option value="week">Esta semana</option>
          <option value="month">Este mes</option>
        </select>

        <button type="submit" className="search-button">
          Buscar
        </button>
      </div>
    </form>
  );
});

export function SearchBar({ onSearch }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: "",
    filterBy: "title",
    dateRange: "all",
  });

  const handleSearchChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSearch(filters);
      if (isModalOpen) setIsModalOpen(false);
    },
    [filters, isModalOpen, onSearch]
  );

  return (
    <div className="search-container">
      {/* Botón móvil */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="search-mobile-button"
        aria-label="Abrir búsqueda"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      {/* Versión desktop */}
      <div className="search-desktop">
        <SearchForm
          filters={filters}
          onSearchChange={handleSearchChange}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Modal móvil */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Buscar notas"
      >
        <div className="search-modal-content">
          <SearchForm
            filters={filters}
            onSearchChange={handleSearchChange}
            onSubmit={handleSubmit}
          />
        </div>
      </Modal>
    </div>
  );
}
