'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('opiumTheme') as 'light' | 'dark' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('opiumTheme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 bg-[var(--bg2)] border border-[var(--border)] px-3 py-1.5 cursor-pointer font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text2)] transition-all hover:border-[var(--head)] hover:text-[var(--head)]"
      aria-label="Cambiar tema"
    >
      <div className="w-[26px] h-[15px] bg-[var(--border2)] rounded-full relative flex-shrink-0">
        <div
          className={`absolute top-[2px] left-[2px] w-[11px] h-[11px] rounded-full bg-[var(--head)] transition-transform ${
            theme === 'dark' ? 'translate-x-[11px]' : ''
          }`}
        />
      </div>
      <span>{theme === 'light' ? 'Día' : 'Noche'}</span>
    </button>
  );
}
