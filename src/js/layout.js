export function injectLayout() {
  const currentPath = window.location.pathname;
  const isHome = currentPath === '/' || currentPath.endsWith('index.html');

  // Load theme preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  // Build the Nav
  const navHTML = `
    <nav class="site-nav">
      <a href="/index.html" class="${isHome ? 'current' : ''}" ${isHome ? 'aria-current="page"' : ''}>home</a>
      <a href="/index.html#about">about</a>
      <a href="/pages/playground.html" class="${currentPath.includes('/pages/playground.html') ? 'current' : ''}" ${currentPath.includes('/pages/playground.html') ? 'aria-current="page"' : ''}>playground</a>
      <a href="/pages/contact.html" class="${currentPath.includes('/pages/contact.html') ? 'current' : ''}" ${currentPath.includes('/pages/contact.html') ? 'aria-current="page"' : ''}>contact</a>
    </nav>
    <button id="theme-toggle" class="theme-btn" aria-label="Toggle theme">
      ${savedTheme === 'light' ? '🌙' : '☀️'}
    </button>
  `;

  // Build the Footer
  const footerHTML = `
    <footer>
      <p>&copy; 2026 IdkAnythin07. All rights reserved.</p>
      <a href="/pages/secret.html" class="secret-button">secret</a>
    </footer>
  `;

  const headerElement = document.getElementById("main-nav");
  if (headerElement) {
    headerElement.innerHTML = navHTML;

    // Theme Switcher Logic
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        if (newTheme === 'light') {
          document.documentElement.setAttribute('data-theme', 'light');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
        
        localStorage.setItem('theme', newTheme);
        themeBtn.textContent = newTheme === 'light' ? '🌙' : '☀️';
        
        // Dispatch custom event for editor or terminal
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: newTheme }));
      });
    }
  }

  const footerElement = document.getElementById("main-footer");
  if (footerElement) {
    footerElement.innerHTML = footerHTML;
  }
}
