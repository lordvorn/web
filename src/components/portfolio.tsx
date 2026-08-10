import { motion } from 'motion/react'
import { useLang } from '../lib/lang-context'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
  CarouselIndicator,
} from './core/carousel'

const fade = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
}

const screenshotImages = [
  '/screenshots/edufin-1.png',
  '/screenshots/edufin-2.png',
  '/screenshots/edufin-3.png',
  '/screenshots/edufin-4.png',
  '/screenshots/edufin-5.png',
]

export default function Portfolio() {
  const { t } = useLang()

  return (
    <section
      id="portfolio"
      className="relative w-full bg-gradient-to-b from-black via-neutral-950 to-black py-24 md:py-32 px-6 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12 md:mb-20">
          {t.portfolio.title}
        </h2>

        {t.portfolio.projects.map((project, i) => {
          const isRight = i % 2 === 0
          const screenshots = t.portfolio.screenshots

          return (
            <motion.div
              key={project.name}
              custom={i}
              variants={fade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className={`flex flex-col ${isRight ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 md:gap-16 items-center mb-24 last:mb-0`}
            >
              {/* Project info */}
              <div className="flex-1 w-full">
                {/* Category label */}
                <span className="text-xs text-blue-400 tracking-widest uppercase font-bold">
                  {project.category}
                </span>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mt-1 mb-2">
                  {project.name}
                </h3>

                {/* Subtitle */}
                <p className="text-sm md:text-base text-blue-300 font-bold uppercase tracking-wide mb-4">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-10 max-w-lg">
                  {project.description}
                </p>

                {/* Tech stack label */}
                <span className="text-xs text-neutral-500 tracking-widest uppercase block mb-3">
                  {project.stackLabel}
                </span>

                {/* Main stack pills */}
                <ul className="flex flex-wrap gap-2 mb-3">
                  {project.stackMain.map((tech) => (
                    <li
                      key={tech}
                      className="px-3 py-1.5 rounded-md border border-white/20 bg-white/5 text-xs md:text-sm text-neutral-300 font-bold"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                {/* Detail stack pills */}
                <ul className="flex flex-wrap gap-2 opacity-65 hover:opacity-100 transition-opacity">
                  {project.stackDetails.map((tech) => (
                    <li
                      key={tech}
                      className="px-3 py-1.5 rounded-md border border-white/15 bg-white/[0.03] text-xs md:text-sm text-neutral-400"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                {/* CTA buttons */}
                <div className="flex gap-3 mt-8">
                  <a
                    href={project.liveUrl || '#'}
                    target={project.liveUrl ? '_blank' : undefined}
                    rel={project.liveUrl ? 'noopener noreferrer' : undefined}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-black font-bold text-sm transition-colors ${project.liveUrl ? 'bg-white hover:bg-neutral-200' : 'bg-neutral-700 cursor-default pointer-events-none'}`}
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${project.liveUrl ? 'bg-green-500' : 'bg-neutral-500'}`} />
                      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${project.liveUrl ? 'bg-green-500' : 'bg-neutral-500'}`} />
                    </span>
                    {t.portfolio.ctaLiveDemo}
                  </a>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-md border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-colors"
                    >
                      {t.portfolio.ctaGitHub}
                    </a>
                  )}
                </div>
              </div>

              {/* Carousel */}
              <div className="flex-1 w-full">
                <div className="relative w-full max-w-sm mx-auto">
                  <Carousel>
                    <CarouselContent>
                      {screenshots.map((shot, si) => (
                        <CarouselItem key={si} className="p-2">
                          <div className="relative w-full overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
                            <img
                              alt={shot.description}
                              src={screenshotImages[si] ?? screenshotImages[0]}
                              className="object-contain w-full h-auto block"
                              draggable={false}
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselNavigation alwaysShow />
                    <CarouselIndicator />
                  </Carousel>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}