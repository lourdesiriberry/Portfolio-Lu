import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { works, type Work } from '../data/works'
import SectionHeading from '../components/SectionHeading'
import { InstagramIcon, TikTokIcon } from '../components/BrandIcons'

function MetricBadge({ platform, count }: { platform: string; count: string }) {
  const Icon = platform === 'TikTok' ? TikTokIcon : InstagramIcon
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-light/80 ring-1 ring-white/10">
      <Icon className="h-3.5 w-3.5 text-secondary" />
      {count}
      <span className="text-light/40">{platform}</span>
    </span>
  )
}

function WorkCard({ work, index }: { work: Work; index: number }) {
  const initial = work.name.trim().charAt(0).toUpperCase()
  return (
    <motion.a
      href={work.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-white/25 ${
        work.featured ? 'sm:col-span-2' : ''
      }`}
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-secondary/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Avatar: foto si hay, si no inicial con gradiente */}
          {work.image ? (
            <img
              src={work.image}
              alt={work.name}
              className="h-14 w-14 rounded-full object-cover ring-2 ring-white/10"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-primary font-display text-xl font-bold text-dark">
              {initial}
            </div>
          )}
          <div>
            <h3 className="font-display text-lg font-semibold leading-tight">{work.name}</h3>
            <p className="text-sm text-light/50">@{work.handle}</p>
          </div>
        </div>

        {work.featured && (
          <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent ring-1 ring-accent/30">
            Destacada
          </span>
        )}
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-light/60">{work.description}</p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {work.metrics.map((m) => (
          <MetricBadge key={m.platform} platform={m.platform} count={m.count} />
        ))}
        <ArrowUpRight className="ml-auto h-5 w-5 text-light/40 transition-all group-hover:text-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </motion.a>
  )
}

export default function MiTrabajo() {
  return (
    <section id="trabajo" className="scroll-mt-20 px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Mi trabajo"
          title="Cuentas que gestiono"
          subtitle="Comunidades reales que crecen con estrategia y contenido. Tocá cada una para ver el perfil."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {works.map((work, i) => (
            <WorkCard key={work.handle} work={work} index={i} />
          ))}
        </div>

        {/* Espacio para embeds reales de IG/TikTok cuando Lu los quiera sumar */}
      </div>
    </section>
  )
}
