import { motion, type Variants } from 'motion/react'
import { useLang } from '../lib/lang-context'
import { GlowEffect } from './core/glow-effect'

const fade: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: 'easeOut' },
  }),
}

export default function Hero() {
  const { t } = useLang()

  const handleExplore = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleConsult = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Spline iframe - covers viewport on desktop */}
      <div className="absolute inset-0 hidden md:block">
        <iframe
          src="https://my.spline.design/theeternalarc-ZqzCh58hycjcXX1I7lzH5myS-pHK/"
          title="Spline 3D scene"
          frameBorder={0}
          width="100%"
          height="100%"
        />
      </div>

      {/* Mobile fallback: black background */}
      <div className="absolute inset-0 md:hidden bg-black" />

      {/* EXPLORE link (bottom center) */}
      <motion.a
        href="#portfolio"
        onClick={handleExplore}
        variants={fade}
        initial="hidden"
        animate="visible"
        custom={0.8}
        whileHover={{ x: 4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm md:text-base tracking-widest uppercase z-10"
      >
        {t.explore}
      </motion.a>

      {/* Consultation CTA (bottom right) with glow effect */}
      <motion.a
        href="#kontakt"
        onClick={handleConsult}
        variants={fade}
        initial="hidden"
        animate="visible"
        custom={1}
        whileHover={{ scale: 1.03 }}
        className="absolute bottom-36 right-8 md:bottom-44 md:right-12 z-10"
      >
        <span className="relative block px-6 py-3.5 rounded-md text-xs md:text-sm tracking-widest uppercase text-black font-bold bg-white hover:bg-neutral-200 shadow-lg shadow-white/20 transition-colors">
          <GlowEffect
            colors={['#0894FF', '#C959DD', '#FF2E54', '#FF9004']}
            mode="colorShift"
            blur="medium"
            duration={4}
            className="opacity-60 rounded-md"
          />
          <span className="relative">{t.heroConsult}</span>
        </span>
      </motion.a>
    </section>
  )
}
