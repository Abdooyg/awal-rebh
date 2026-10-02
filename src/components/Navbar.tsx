import { useEffect, useState } from 'react';
import { LogIn, Menu, X } from 'lucide-react';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../i18n/useLanguage';

export default function Navbar({ onAuthClick }: { onAuthClick: () => void }) {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#home', label: t.nav.home },
    { href: '#features', label: t.nav.features },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'border-b border-white/5 bg-ink-950/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <button type="button" onClick={onAuthClick} className="btn-neon px-5 py-2.5 text-sm">
            <LogIn className="h-4 w-4 rtl:-scale-x-100" />
            {t.nav.auth}
          </button>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-200 hover:bg-white/5 md:hidden"
          aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="glass mx-4 mb-4 animate-scale-in rounded-2xl p-4 md:hidden">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-3 font-medium text-slate-200 hover:bg-white/5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
            <LanguageSwitcher fullWidth />
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onAuthClick();
              }}
              className="btn-neon w-full"
            >
              <LogIn className="h-4 w-4 rtl:-scale-x-100" />
              {t.nav.auth}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
