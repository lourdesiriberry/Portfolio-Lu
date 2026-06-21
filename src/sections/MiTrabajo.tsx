import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { works, type Work } from '../data/works'
import SectionHeading from '../components/SectionHeading'
import { InstagramIcon, TikTokIcon } from '../components/BrandIcons'

function MetricBadge({ platform, count }: { platform: string; count: string }) {
  const Icon = platform === 'TikTok' ? TikTokIcon : InstagramIcon
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-dark/[0.04] px-3 py-1 text-xs font-medium text-dark/75 ring-1 ring-dark/[0.06]">
      <Icon className="h-3.5 w-3.5 text-primary" />
      {count}
      <span className="text-dark/45">{platform}</span>
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
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-dark/[0.08] bg-white/80 p-6 shadow-sm shadow-dark/[0.04] backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md ${
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
              className="h-14 w-14 rounded-full object-cover ring-2 ring-dark/10"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-primary font-display text-xl font-bold text-dark">
              {initial}
            </div>
          )}
          <div>
            <h3 className="font-display text-lg font-semibold leading-tight">{work.name}</h3>
            <p className="text-sm text-dark/55">@{work.handle}</p>
          </div>
        </div>

        {work.featured && (
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/25">
            Destacada
          </span>
        )}
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-dark/65">{work.description}</p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {work.metrics.map((m) => (
          <MetricBadge key={m.platform} platform={m.platform} count={m.count} />
        ))}
        <ArrowUpRight className="ml-auto h-5 w-5 text-dark/45 transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
          subtitle="Marcas y proyectos que acompaño día a día con estrategia, creatividad y contenido pensado para conectar. Tocá para conocer su perfil."
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
