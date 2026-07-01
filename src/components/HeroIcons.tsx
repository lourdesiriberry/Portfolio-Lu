import { motion } from 'motion/react'
import { TrendingUp } from 'lucide-react'
import { InstagramIcon, TikTokIcon } from './BrandIcons'

// Íconos chiquitos (IG, TikTok, crecimiento) con animación 3D por CSS:
// livianísimos (sin Three.js) → rápido en mobile. Se ubican cerca del título.
const ICONS = [
  { Comp: InstagramIcon, color: 'text-[#FE688E]' },
  { Comp: TikTokIcon, color: 'text-dark' },
  { Comp: TrendingUp, color: 'text-[#F4B400]' },
]

export default function HeroIcons() {
  return (
    <div
      className="mb-5 flex items-center justify-center gap-3"
      style={{ perspective: 800 }}
      aria-hidden="true"
    >
      {ICONS.map(({ Comp, color }, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 2.8 + i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.15,
          }}
        >
          <motion.div
            animate={{ rotateY: [-24, 24, -24], rotateX: [6, -6, 6] }}
            transition={{ duration: 3.4 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformStyle: 'preserve-3d' }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md shadow-dark/10 ring-1 ring-dark/5"
          >
            <Comp className={`h-5 w-5 ${color}`} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
