'use client';

import React, { createContext, useContext, useState } from 'react';

export enum Language {
  KA = 'KA',
  ENG = 'ENG',
}

interface LanguageContextType {
  language: Language;
  changeLanguage: (newLanguage: Language) => Language;
  renderLanguage: (ka: string, eng: string) => string;
}

const defaultLanguageContext: LanguageContextType = {
  language: Language.KA,
  renderLanguage: (ka: string) => ka,
  changeLanguage: (newLanguage: Language) => newLanguage,
};

const LanguageContext = createContext<LanguageContextType>(defaultLanguageContext);

export function LanguageProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [language, setLanguage] = useState(Language.KA);

  const changeLanguage = (newLanguage: Language): Language => {
    setLanguage(newLanguage);

    return newLanguage;
  };

  const renderLanguage = (ka: string, eng: string): string => {
    if (language === Language.KA) {
      return ka;
    }
    if (language === Language.ENG) {
      return eng;
    }
    return ka;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, renderLanguage }}>{children}</LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  return useContext(LanguageContext);
};
