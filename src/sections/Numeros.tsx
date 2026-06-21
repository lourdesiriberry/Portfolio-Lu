import { motion } from 'motion/react'
import { stats } from '../data/stats'
import Counter from '../components/Counter'

export default function Numeros() {
  return (
    <section id="numeros" className="scroll-mt-20 px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-dark/10 bg-gradient-to-br from-secondary/40 via-blush/25 to-accent/35 px-6 py-14 shadow-sm shadow-dark/[0.04] sm:px-12">
          {/* glow decorativo */}
          <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative grid grid-cols-2 gap-y-10 gap-x-6 text-center lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              >
                <div className="font-display text-4xl font-bold tracking-tight text-gradient sm:text-5xl">
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm font-medium text-dark/70 sm:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
