import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import enTranslations from '../locales/en-US.json';
import zhTranslations from '../locales/zh-CN.json';
import itTranslations from '../locales/it-IT.json';

type Translations = typeof enTranslations;

interface LanguageContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Translations> = {
  'en-US': enTranslations,
  'zh-CN': zhTranslations,
  'it-IT': itTranslations
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('telefonehub-locale') || navigator.language || 'en-US';
    }
    return 'en-US';
  });

  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('telefonehub-locale', newLocale);
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale] || translations['en-US'];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }
    
    return typeof value === 'string' ? value : key;
  };

  const isRTL = ['ar', 'he', 'fa'].includes(locale.substring(0, 2));

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', locale);
    }
  }, [locale, isRTL]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

