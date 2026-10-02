import Logo from './Logo';
import { useLanguage } from '../i18n/useLanguage';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <Logo />
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Awal Rebh. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
