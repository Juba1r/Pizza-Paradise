export function ThemeScript() {
  const script = `
    (function() {
      try {
        var t = localStorage.getItem('pizza-paradise-theme');
        var isDark = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
        var theme = isDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.classList.add(theme);
        document.documentElement.classList.remove(isDark ? 'light' : 'dark');
      } catch(e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
