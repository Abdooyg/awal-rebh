import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { LANGUAGES, translations, type Language } from './translations';
import { LanguageContext } from './context';

const STORAGE_KEY = 'awal-rebh-lang';
const DEFAULT_LANGUAGE: Language = 'en';


function isLanguage(value: string | null): value is Language {
  return LANGUAGES.some((l) => l.code === value);
}

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isLanguage(stored) ? stored : DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const dir = LANGUAGES.find((l) => l.code === language)?.dir ?? 'ltr';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo(
    () => ({ language, dir, t: translations[language], setLanguage }),
    [language, dir, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
