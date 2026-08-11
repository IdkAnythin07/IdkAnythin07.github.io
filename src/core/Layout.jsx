import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Layout({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: theme }));
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const navLinkClass = ({ isActive }) =>
    `px-4 py-5 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${
      isActive 
        ? "text-mauve border-mauve" 
        : "text-subtext border-transparent hover:text-text-main hover:border-surface1"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-base text-text-main font-sans">
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-glass-bg border-b border-glass-border">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <nav className="flex space-x-2">
            <NavLink to="/" className={navLinkClass}>home</NavLink>
            <NavLink to="/playground" className={navLinkClass}>playground</NavLink>
            <NavLink to="/contact" className={navLinkClass}>contact</NavLink>
          </nav>
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-surface0 transition-colors cursor-pointer text-lg"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 flex flex-col">
        {children}
      </div>

      <footer className="mt-auto border-t border-glass-border py-8 text-center text-subtext text-sm">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2026 IdkAnythin07. All rights reserved.</p>
          <Link to="/secret" className="text-[10px] text-transparent hover:text-mauve hover:underline transition-colors font-mono">secret</Link>
        </div>
      </footer>
    </div>
  );
}
