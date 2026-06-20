import { motion } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'
import HeroBackground from '../components/HeroBackground'
import { whatsappLink, HERO_WHATSAPP_MESSAGE } from '../data/contact'

// ────────────────────────────────────────────────────────────
// COPY DEL TAGLINE — Lu elige una de las 3 (las otras quedan de
// referencia). Cambiá esta constante por la opción elegida.
// 1) 'Convierto tus redes en una comunidad que te elige.'
// 2) 'Gestiono, creo y hago crecer las redes que importan.'
// 3) 'Estrategia, contenido y gestión. Tus redes, con onda.'
const TAGLINE = 'Convierto tus redes en una comunidad que te elige.'
// ────────────────────────────────────────────────────────────

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
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-light/80 backdrop-blur-sm"
        >
          <Sparkles className="h-4 w-4 text-accent" />
          Community Manager &amp; creadora de contenido
        </motion.div>

        {/* Nombre / título principal */}
        <motion.h1
          variants={item}
          className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl"
        >
          Redes <span className="text-gradient">con Lu</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl text-balance text-lg text-light/70 sm:text-xl"
        >
          {TAGLINE}
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
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-secondary to-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/30"
          >
            Trabajemos juntos
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </motion.a>

          <a
            href="#trabajo"
            className="text-sm font-medium text-light/60 underline-offset-4 transition-colors hover:text-light hover:underline"
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
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="h-1.5 w-1 rounded-full bg-light/60"
          />
        </div>
      </motion.div>
    </section>
  )
}
