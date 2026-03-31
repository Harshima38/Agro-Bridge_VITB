import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import enTranslations from '../locales/en.json';
import hiTranslations from '../locales/hi.json';
import { useAuth } from './AuthContext';

type Language = 'en' | 'hi';
type TranslationKeys = keyof typeof enTranslations;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  
  // Default to localStorage or 'en'
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem('agro_lang') as Language) || 'en';
  });

  // Auto-switch based on role if logged in natively (Farmer -> Hindi)
  useEffect(() => {
    if (user && !localStorage.getItem('agro_lang_explicit')) {
      if (user.role === 'farmer') {
        setLangState('hi');
      } else if (user.role === 'student') {
        setLangState('en');
      }
    }
  }, [user]);

  const setLang = (newLang: Language) => {
    localStorage.setItem('agro_lang', newLang);
    localStorage.setItem('agro_lang_explicit', 'true'); // mark explicit user choice
    setLangState(newLang);
  };

  const t = (key: TranslationKeys): string => {
    const dictionary = lang === 'hi' ? hiTranslations : enTranslations;
    return dictionary[key] || enTranslations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div className={lang === 'hi' && user?.role === 'farmer' ? "text-[110%]" : ""}>
         {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be inside LanguageProvider');
  return context;
};
