import { useState, useMemo } from 'react'
import { LangContext } from './lib/lang-context'
import { ServiceProvider } from './lib/service-context'
import { translations, defaultLanguage, type Language } from './lib/translations'
import Header from './components/header'
import Hero from './components/hero'
import Services from './components/services'
import Portfolio from './components/portfolio'
import Contact from './components/contact'
import Footer from './components/footer'
import Chatbot from './components/chatbot'

export default function App() {
  const [lang, setLang] = useState<Language>(defaultLanguage)

  const value = useMemo(
    () => ({ lang, t: translations[lang], setLang }),
    [lang],
  )

  return (
    <LangContext.Provider value={value}>
      <ServiceProvider>
        <main className="min-h-screen w-full bg-black text-white">
          <Header />
          <Hero />
          <Services />
          <Portfolio />
          <Contact />
          <Footer />
          <Chatbot />
        </main>
      </ServiceProvider>
    </LangContext.Provider>
  )
}
