import { createContext, useContext } from 'react'
import { translations, defaultLanguage, type Language, type Translation } from './translations'

interface LangContextValue {
  lang: Language
  t: Translation
  setLang: (l: Language) => void
}

export const LangContext = createContext<LangContextValue>({
  lang: defaultLanguage,
  t: translations[defaultLanguage],
  setLang: () => {},
})

export const useLang = () => useContext(LangContext)