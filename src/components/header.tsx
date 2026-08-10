import { useState, useEffect } from 'react'
import { motion, AnimatePresence, type Variants } from 'motion/react'
import { useLang } from '../lib/lang-context'
import type { Language } from '../lib/translations'

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025, delayChildren: 0.3 } },
}

const letter: Variants = {
  hidden: { opacity: 0, filter: 'blur(8px)', y: 6 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

function Tagline({ text, className }: { text: string; className?: string }) {
  const chars = Array.from(text)
  return (
    <motion.p
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label={text}
      className={className}
    >
      {chars.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          variants={letter}
          className="inline-block whitespace-pre"
        >
          {ch}
        </motion.span>
      ))}
    </motion.p>
  )
}

export default function Header() {
  const { lang, t, setLang } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    if (id === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-6 md:p-8">
        {/* Left: built-by credit (stays in black bar, hides on scroll) */}
        <motion.div
          animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -8 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 max-w-xs"
        >
          <p className="text-[10px] md:text-xs text-neutral-500 tracking-widest uppercase">
            built by Prokop Šimek
          </p>
        </motion.div>

        {/* Right: language switch + hamburger menu (hide on scroll) */}
        <motion.div
          animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -8 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-4"
        >
          <div className="flex items-center gap-2">
            {(['cz', 'en', 'de'] as Language[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`px-2 py-1 text-xs tracking-widest rounded transition-colors ${
                  lang === l
                    ? 'text-white bg-white/10'
                    : 'text-neutral-500 hover:text-white'
                }`}
              >
                {t.langSwitch[l]}
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex flex-col items-end gap-1.5 p-2"
          >
            <span
              className={`block h-0.5 w-7 bg-white transition-transform duration-300 ${
                menuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-7 bg-white transition-opacity duration-300 ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block h-0.5 w-7 bg-white transition-transform duration-300 ${
                menuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </motion.div>
      </header>

      {/* Tagline - left side, lower, hides on scroll */}
      <motion.div
        animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -20 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed top-40 md:top-52 left-0 z-30 px-6 md:px-8 pointer-events-none w-full sm:w-[90vw] md:w-[600px] lg:w-[700px]"
      >
        <Tagline
          text={t.tagline}
          className="text-left text-base md:text-2xl text-white font-bold italic tracking-tight whitespace-nowrap [text-shadow:0_0_20px_rgba(255,255,255,0.5),0_0_40px_rgba(8,148,255,0.3)]"
        />
      </motion.div>

      {/* Navigation panel - small, top-right corner */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Click-away backdrop (transparent) */}
            <motion.div
              key="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              key="nav-panel"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed top-20 right-6 md:right-8 z-40 bg-black/95 backdrop-blur-sm border border-neutral-800 rounded-lg px-6 py-5 flex flex-col gap-4 min-w-[180px]"
            >
              <button
                onClick={() => scrollTo('')}
                className="text-left text-base md:text-lg font-light hover:text-neutral-400 transition-colors"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => scrollTo('sluzby')}
                className="text-left text-base md:text-lg font-light hover:text-neutral-400 transition-colors"
              >
                {t.nav.services}
              </button>
              <button
                onClick={() => scrollTo('portfolio')}
                className="text-left text-base md:text-lg font-light hover:text-neutral-400 transition-colors"
              >
                {t.nav.portfolio}
              </button>
              <button
                onClick={() => scrollTo('kontakt')}
                className="text-left text-base md:text-lg font-light hover:text-neutral-400 transition-colors"
              >
                {t.nav.contact}
              </button>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}