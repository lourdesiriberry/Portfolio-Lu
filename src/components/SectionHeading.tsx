import Reveal from './Reveal'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  subtitle?: string
  className?: string
}

/** Encabezado de sección consistente: eyebrow + título + subtítulo opcional. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className = '',
}: SectionHeadingProps) {
  return (
    <Reveal className={`mx-auto max-w-2xl text-center ${className}`}>
      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-xl text-balance text-base text-light/60 sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
