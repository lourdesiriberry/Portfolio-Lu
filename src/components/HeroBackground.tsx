// Fondo del hero: solo glows de color (livianísimo, sin Three.js).
// Los íconos 3D chiquitos ahora viven cerca del título (HeroIcons), con CSS.
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="animate-float absolute -left-24 top-[-10%] h-[55vmin] w-[55vmin] rounded-full bg-secondary/50 blur-[100px]" />
      <div
        className="animate-float absolute right-[-10%] top-[12%] h-[50vmin] w-[50vmin] rounded-full bg-primary/30 blur-[110px]"
        style={{ animationDelay: '-2s' }}
      />
      <div
        className="animate-float absolute bottom-[-15%] left-[25%] h-[45vmin] w-[45vmin] rounded-full bg-accent/40 blur-[120px]"
        style={{ animationDelay: '-4s' }}
      />

      {/* viñeta clara para legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-light/40 via-transparent to-light/80" />
    </div>
  )
}
