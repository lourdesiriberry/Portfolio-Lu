import { motion } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'
import HeroBackground from '../components/HeroBackground'
import HeroIcons from '../components/HeroIcons'
import { whatsappLink, HERO_WHATSAPP_MESSAGE } from '../data/contact'

// Animación de entrada: fade + slide suave, escalonado.
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
      {/* Fondo 3D (formas flotando con React Three Fiber, lazy-loaded) */}
      <HeroBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        {/* Eyebrow */}
        <motion.div
          variants={item}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white/70 px-4 py-1.5 text-sm font-medium text-dark/70 shadow-sm backdrop-blur-sm"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          Community Manager &amp; creadora de contenido
        </motion.div>

        {/* Íconos 3D chiquitos (IG, TikTok, crecimiento) cerca del título */}
        <motion.div variants={item}>
          <HeroIcons />
        </motion.div>

        {/* Nombre / título principal */}
        <motion.h1
          variants={item}
          className="font-display text-3xl font-medium uppercase tracking-[0.2em] sm:text-5xl"
        >
          Redes con Lu
        </motion.h1>

        {/* Tagline — se resalta solo el resultado */}
        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-balance text-lg text-dark/70 sm:text-xl"
        >
          Estrategia, contenido y gestión para que tu negocio{' '}
          <span className="font-semibold text-gradient">se vea, conecte y crezca</span>.
        </motion.p>

        {/* CTA principal → WhatsApp */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.a
            href={whatsappLink(HERO_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-secondary to-primary px-7 py-3.5 text-base font-semibold text-dark shadow-lg shadow-primary/30"
          >
            Trabajemos juntos
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </motion.a>

          <a
            href="#trabajo"
            className="text-sm font-medium text-dark/60 underline-offset-4 transition-colors hover:text-dark hover:underline"
          >
            Mirá mi trabajo
          </a>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll, sutil */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-dark/20 p-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="h-1.5 w-1 rounded-full bg-dark/40"
          />
        </div>
      </motion.div>
    </section>
  )
}
