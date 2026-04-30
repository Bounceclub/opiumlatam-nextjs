'use client';

import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import SearchOverlay from './SearchOverlay';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/noticias', label: 'Noticias' },
    { href: '/discusion', label: 'Discusión' },
    { href: '/resenas', label: 'Reseñas' },
    { href: '/eventos', label: 'Eventos' },
  ];

  return (
    <>
      <header className="bg-[var(--hdr)] border-b-3 border-[var(--head)] sticky top-0 z-[300] backdrop-blur-[12px] transition-all">
        <div className="max-w-[1380px] mx-auto flex items-center justify-between px-4 sm:px-6 py-3 gap-4 sm:gap-6">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 overflow-x-auto scrollbar-none">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-barlow-condensed text-sm font-bold tracking-widest uppercase text-[var(--text2)] no-underline px-4 py-3 whitespace-nowrap cursor-pointer border-b-3 border-transparent -mb-1 transition-all hover:text-[var(--head)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-[var(--text2)] hover:text-[var(--head)] transition-colors"
              aria-label="Buscar"
            >
              <Search size={16} />
            </button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-[var(--text2)] hover:text-[var(--head)] transition-colors"
              aria-label="Buscar"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[var(--text2)] hover:text-[var(--head)] transition-colors"
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-[var(--border)]">
            <div className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-barlow-condensed text-sm font-bold tracking-widest uppercase text-[var(--text2)] no-underline px-6 py-4 border-b border-[var(--border)] hover:bg-[var(--bg2)] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
                <span className="font-barlow-condensed text-sm font-bold tracking-widest uppercase text-[var(--text2)]">
                  Tema
                </span>
                <ThemeToggle />
              </div>
            </div>
          </nav>
        )}
      </header>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
