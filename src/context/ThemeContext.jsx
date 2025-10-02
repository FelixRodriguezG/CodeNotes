import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    // preferencia del sistema (fallback)
    return window.matchMedia?.('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    // 1) atributo para tus tokens (p. ej., :root[data-theme="light"] {...})
    root.setAttribute('data-theme', theme);

    // 2) clase .dark solo cuando es oscuro (para utilidades `dark:` de Tailwind)
    root.classList.toggle('dark', theme === 'dark');

    // 3) pista al navegador para UI nativa
    root.style.colorScheme = theme;

    // persistencia
    localStorage.setItem('theme', theme);
  }, [theme]);

  // (opcional) reaccionar si el usuario cambia el tema del sistema
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const handler = (e) => {
      const saved = localStorage.getItem('theme');
      // solo auto-ajusta si el usuario no ha cambiado manualmente durante la sesión
      if (!saved) setTheme(e.matches ? 'light' : 'dark');
    };
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme debe usarse dentro de ThemeProvider');
  return ctx;
}
