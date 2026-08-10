import { useState } from 'react'
import { motion } from 'motion/react'
import { useLang } from '../lib/lang-context'
import { useService } from '../lib/service-context'
import { Tilt } from './core/tilt'
import { cn } from '../lib/utils'
import { serviceIcons as icons } from './service-icons'

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
  }),
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function ServiceCard({ index }: { index: number }) {
  const { t } = useLang()
  const { setSelectedService } = useService()
  const service = t.services.items[index]
  const [isFlipped, setIsFlipped] = useState(false)

  const scrollToContact = () => {
    setSelectedService({ index, title: service.title })
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Tilt rotationFactor={6} isRevese>
      <div
        className="group relative h-[320px] w-full [perspective:2000px]"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        <div
          className={cn(
            'relative h-full w-full',
            '[transform-style:preserve-3d]',
            'transition-[transform] duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]',
            isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]',
          )}
        >
          {/* Front */}
          <div
            className={cn(
              'absolute inset-0 h-full w-full',
              '[backface-visibility:hidden] [transform:rotateY(0deg)]',
              'overflow-hidden rounded-2xl',
              'bg-neutral-900/30 border border-neutral-800',
              'hover:border-neutral-600 transition-colors',
            )}
          >
            <div className="relative h-full overflow-hidden bg-gradient-to-b from-neutral-900/40 to-black">
              {/* Glow particles */}
              <div aria-hidden="true" className="absolute inset-0 flex items-start justify-center pt-24">
                <div className="relative flex h-[100px] w-[200px] items-center justify-center">
                  {[...Array(10)].map((_, i) => (
                    <div
                      className="absolute h-[50px] w-[50px] rounded-[140px] opacity-0"
                      style={{ animation: `glow-pulse 3s linear infinite ${i * 0.3}s` }}
                      key={i}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="text-white">{icons[index] ?? icons[0]}</div>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl md:text-2xl font-bold text-white leading-snug tracking-tight">
                  {service.title}
                </h3>
                <p className="line-clamp-2 text-sm text-neutral-400 tracking-tight">
                  {service.desc}
                </p>
              </div>
            </div>
          </div>

          {/* Back */}
          <div
            className={cn(
              'absolute inset-0 h-full w-full',
              '[backface-visibility:hidden] [transform:rotateY(180deg)]',
              'rounded-2xl p-6 md:p-7',
              'bg-gradient-to-b from-neutral-900 to-black',
              'border border-neutral-800',
              'flex flex-col',
            )}
          >
            <div className="flex-1 space-y-5">
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-white leading-snug tracking-tight">
                  {service.title}
                </h3>
                <p className="line-clamp-2 text-sm text-neutral-400 tracking-tight">
                  {service.longDesc}
                </p>
              </div>

              <div className="space-y-2">
                {service.features.map((feature, fi) => (
                  <div
                    className="flex items-center gap-2 text-sm text-neutral-300"
                    key={feature}
                    style={{
                      transform: isFlipped ? 'translateX(0)' : 'translateX(-10px)',
                      opacity: isFlipped ? 1 : 0,
                      transitionDelay: `${fi * 50 + 150}ms`,
                      transition: 'transform 0.3s ease, opacity 0.3s ease',
                    }}
                  >
                    <ArrowRight className="text-blue-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-neutral-800 pt-6">
              <button
                onClick={scrollToContact}
                type="button"
                className="group/start relative w-full flex items-center justify-between -m-3 rounded-xl p-3 transition-[transform,background] duration-300 hover:scale-[1.02] active:scale-[0.98] bg-neutral-800/50 hover:bg-blue-500/10"
              >
                <span className="font-medium text-sm text-white transition-colors duration-300 group-hover/start:text-blue-300">
                  {t.services.cta}
                </span>
                <div className="group/icon relative">
                  <div className="absolute inset-[-6px] rounded-lg transition-[transform,opacity] duration-300 scale-90 opacity-0 group-hover/start:scale-100 group-hover/start:opacity-100 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent" />
                  <ArrowRight className="relative z-10 text-blue-400 transition-transform duration-300 group-hover/start:translate-x-0.5 group-hover/start:scale-110" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  )
}

export default function Services() {
  const { t } = useLang()

  return (
    <section
      id="sluzby"
      className="relative w-full bg-gradient-to-b from-black to-neutral-950 py-28 md:py-40 px-6 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-neutral-500 text-xs tracking-widest uppercase mb-3">
          {t.services.subtitle}
        </p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16 md:mb-24">
          {t.services.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {t.services.items.map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className={i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}
            >
              <ServiceCard index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
