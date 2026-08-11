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

  return (
    <div className="page-wrap">
      <div id="main-nav">
        <nav className="site-nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? "current" : "")}>home</NavLink>
          <NavLink to="/playground" className={({ isActive }) => (isActive ? "current" : "")}>playground</NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "current" : "")}>contact</NavLink>
        </nav>
        <button id="theme-toggle" className="theme-btn" aria-label="Toggle theme" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      {children}

      <div id="main-footer">
        <footer>
          <p>&copy; 2026 IdkAnythin07. All rights reserved.</p>
          <Link to="/secret" className="secret-button">secret</Link>
        </footer>
      </div>
    </div>
  );
}
