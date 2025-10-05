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
        <span className="w-5 h-5 text-warning font-bold">&lt;LightMode /&gt;</span>
      ) : (
        <span className="w-5 h-5 font-bold">&lt;DarkMode /&gt;</span>
      )}
    </button>
  );
}