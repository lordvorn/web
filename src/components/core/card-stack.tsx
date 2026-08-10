import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { cn } from '../../lib/utils'

export interface Screenshot {
  id: string
  image: string
  label: string
  sublabel: string
  description: string
}

interface CardStackProps {
  screenshots: Screenshot[]
  className?: string
}

const CARD_WIDTH = 320
const CARD_OVERLAP = 240

export default function CardStack({ screenshots, className }: CardStackProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const reducedMotion = useReducedMotion() ?? false
  const totalCards = screenshots.length

  const handleToggle = () => setIsExpanded((prev) => !prev)

  return (
    <button
      aria-expanded={isExpanded}
      aria-label={isExpanded ? 'Collapse card stack' : 'Expand card stack'}
      className={cn(
        'relative mx-auto cursor-pointer block',
        'min-h-[440px] w-full max-w-[90vw]',
        'md:max-w-[1200px]',
        'appearance-none border-0 bg-transparent p-0',
        'flex items-center justify-center',
        className,
      )}
      onClick={handleToggle}
      type="button"
    >
      {screenshots.map((shot, index) => {
        const centerOffset = (totalCards - 1) * 5
        const defaultX = index * 10 - centerOffset
        const defaultY = index * 2
        const defaultRotate = index * 1.5

        const totalExpandedWidth = CARD_WIDTH + (totalCards - 1) * (CARD_WIDTH - CARD_OVERLAP)
        const expandedCenterOffset = totalExpandedWidth / 2
        const spreadX = index * (CARD_WIDTH - CARD_OVERLAP) - expandedCenterOffset + CARD_WIDTH / 2
        const spreadRotate = index * 5 - (totalCards - 1) * 2.5

        const collapsedPose = {
          x: defaultX,
          y: defaultY,
          rotate: reducedMotion ? 0 : defaultRotate,
          scale: 1,
        }
        const expandedPose = {
          x: spreadX,
          y: 0,
          rotate: reducedMotion ? 0 : spreadRotate,
          scale: 1,
        }

        const isSvg = shot.image.endsWith('.svg')

        return (
          <motion.div
            key={shot.id}
            animate={{
              ...(isExpanded ? expandedPose : collapsedPose),
              zIndex: totalCards - index,
            }}
            className={cn(
              'absolute inset-0 w-full rounded-2xl p-6',
              'bg-neutral-900/60',
              'border border-neutral-800/40',
              'backdrop-blur-xl backdrop-saturate-150',
              'shadow-[0_8px_20px_rgb(0,0,0,0.3)]',
              'hover:border-neutral-700/30',
              'hover:shadow-[0_12px_40px_rgb(0,0,0,0.4)]',
              'transition-[border-color,box-shadow] duration-300 ease-out',
              'transform-gpu overflow-hidden',
            )}
            initial={collapsedPose}
            style={{
              maxWidth: `${CARD_WIDTH}px`,
              left: '50%',
              marginLeft: `-${CARD_WIDTH / 2}px`,
            }}
            transition={
              reducedMotion
                ? { duration: 0.2, ease: 'easeOut' as const }
                : {
                    type: 'spring',
                    stiffness: 220,
                    damping: 28,
                    mass: 1,
                    delay: isExpanded ? index * 0.04 : 0,
                  }
            }
          >
            <div className="relative z-10">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-lg bg-neutral-900 border border-neutral-700/50 shadow-inner mb-4">
                <img
                  alt={shot.description}
                  className="object-cover w-full h-full"
                  src={shot.image}
                  loading="eager"
                  draggable={false}
                />
                {isSvg && <span className="sr-only">{shot.label}</span>}
              </div>

              <div className="mt-4">
                <div className="space-y-1">
                  <span className="block text-left font-bold text-2xl text-white tracking-tight">
                    {shot.label}
                  </span>
                  <span className="block text-left font-semibold text-xl text-neutral-500 tracking-tight">
                    {shot.sublabel}
                  </span>
                </div>
                <p className="mt-2 text-left text-neutral-400 text-sm">
                  {shot.description}
                </p>
              </div>
            </div>
          </motion.div>
        )
      })}
    </button>
  )
}
