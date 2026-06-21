import { motion } from 'motion/react'
import { Check, ArrowRight } from 'lucide-react'
import { services, servicesIntro, includedInAll } from '../data/services'
import { whatsappLink } from '../data/contact'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

export default function Servicios() {
  return (
    <section id="servicios" className="scroll-mt-20 px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Servicios"
          title="Elegí cómo querés hacer crecer tus redes"
        />

        {/* Intro de la sección */}
        <Reveal className="mx-auto mt-6 max-w-2xl space-y-4 text-center text-base text-dark/65">
          {servicesIntro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>

        {/* Lo que incluyen todos los packs */}
        <Reveal className="mx-auto mt-10 max-w-3xl rounded-2xl border border-dark/[0.08] bg-white/80 p-6 shadow-sm shadow-dark/[0.04] sm:p-8">
          <p className="text-center font-display text-sm font-bold uppercase tracking-[0.15em] text-primary">
            Todos los packs incluyen
          </p>
          <ul className="mx-auto mt-5 grid max-w-xl gap-x-6 gap-y-3 sm:grid-cols-2">
            {includedInAll.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-dark/80">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
              className={`relative flex flex-col rounded-2xl border p-7 backdrop-blur-sm ${
                service.highlight
                  ? 'border-transparent bg-gradient-to-b from-primary/15 to-white/80 ring-2 ring-primary/40 shadow-lg shadow-primary/10 lg:scale-[1.03]'
                  : 'border-dark/[0.08] bg-white/80 shadow-sm shadow-dark/[0.04]'
              }`}
            >
              {service.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-secondary to-primary px-4 py-1 text-xs font-semibold text-dark shadow-lg shadow-primary/30">
                  Más elegido
                </span>
              )}

              <h3 className="text-center font-display text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
                {service.name}
              </h3>
              <p className="mt-2 text-center text-sm text-dark/60">{service.tagline}</p>

              {/* Precio (informativo — no se paga online, el CTA abre WhatsApp) */}
              <div className="mt-6 flex items-end justify-center gap-2 border-b border-dark/10 pb-6">
                <span className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                  {service.price}
                </span>
                {service.priceNote && (
                  <span className="pb-1 text-sm text-dark/55">{service.priceNote}</span>
                )}
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-dark/80">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={whatsappLink(service.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={`group mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.03] ${
                  service.highlight
                    ? 'bg-gradient-to-r from-secondary to-primary text-dark shadow-lg shadow-primary/30'
                    : 'border border-dark/15 bg-white/70 text-dark hover:border-primary/40'
                }`}
              >
                Consultar por WhatsApp
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
