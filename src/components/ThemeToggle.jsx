import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="hover:scale-110 transition-transform ease-fluid"
      aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {theme === 'dark' ? (
        <SunIcon className="w-5 h-5 text-warning" />
      ) : (
        <MoonIcon className="w-5 h-5 text-text" />
      )}
    </button>
  );
}