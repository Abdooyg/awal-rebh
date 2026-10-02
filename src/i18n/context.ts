import { createContext } from 'react';
import type { Language, Translations } from './translations';

export interface LanguageContextValue {
  language: Language;
  dir: 'ltr' | 'rtl';
  t: Translations;
  setLanguage: (language: Language) => void;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);
