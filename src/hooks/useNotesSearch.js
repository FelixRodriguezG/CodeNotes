import { useState, useMemo } from 'react';

export function useNotesSearch(notes) {
    const [ filters, setFilters ] = useState({
        searchTerm: '',
        filterBy: 'title',
        dateRange: 'all'
    });

    const filteredNotes = useMemo(() => {
        if (!notes) return [];

        return notes.filter(note => {
            // Filtrar por término de búsqueda
            const searchTerm = filters.searchTerm.toLowerCase();
            if (searchTerm) {
                switch (filters.filterBy) {
                    case 'title':
                        if (!note.title.toLowerCase().includes(searchTerm)) return false;
                        break;
                    case 'summary':
                        if (!note.summary.toLowerCase().includes(searchTerm)) return false;
                        break;
                    case 'tags':
                        if (!note.tags.some(tag => tag.toLowerCase().includes(searchTerm))) return false;
                        break;
                    default:
                        break;
                }
            }

            // Filtrar por fecha
            if (filters.dateRange !== 'all') {
                const noteDate = new Date(note.created_at);
                const today = new Date();
                const diffTime = today - noteDate;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                switch (filters.dateRange) {
                    case 'today':
                        if (diffDays > 1) return false;
                        break;
                    case 'week':
                        if (diffDays > 7) return false;
                        break;
                    case 'month':
                        if (diffDays > 30) return false;
                        break;
                    default:
                        break;
                }
            }

            return true;
        });
    }, [ notes, filters ]);

    const handleSearch = (newFilters) => {
        setFilters(newFilters);
    };

    return {
        filteredNotes,
        handleSearch,
        filters
    };
}