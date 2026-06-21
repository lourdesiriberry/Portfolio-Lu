import { motion } from 'motion/react'
import { pillars } from '../data/pillars'
import SectionHeading from '../components/SectionHeading'

export default function QueHago() {
  return (
    <section id="que-hago" className="scroll-mt-20 px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="¿Cómo puedo ayudarte?"
          title="Tres maneras de potenciar tus redes"
          subtitle="Desde la estrategia hasta la gestión diaria. Elegí el servicio que necesitás o dejá todo en mis manos."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-dark/[0.08] bg-white/80 p-7 shadow-sm shadow-dark/[0.04] backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                {/* glow al hover */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="inline-flex rounded-2xl bg-gradient-to-br from-primary to-[#2BA8E0] p-3.5 shadow-lg shadow-primary/25">
                  <Icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold tracking-tight">{pillar.title}</h3>
                <p className="mt-2 font-display text-base font-bold text-dark/90">{pillar.subtitle}</p>
                <p className="mt-2 text-sm leading-relaxed text-dark/65">{pillar.description}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
