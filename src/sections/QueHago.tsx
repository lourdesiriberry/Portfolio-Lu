import { motion } from 'motion/react'
import { pillars } from '../data/pillars'
import SectionHeading from '../components/SectionHeading'

export default function QueHago() {
  return (
    <section id="que-hago" className="scroll-mt-20 px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Qué hago"
          title="Tres formas de potenciar tus redes"
          subtitle="Desde el plan hasta el día a día. Elegí lo que necesitás o dejá todo en mis manos."
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

                <div className="inline-flex rounded-xl bg-gradient-to-br from-secondary/50 to-primary/30 p-3 ring-1 ring-dark/[0.06]">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-dark/65">{pillar.description}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
