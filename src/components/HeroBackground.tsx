import { Suspense, lazy } from 'react'

// 3D real (Three.js / React Three Fiber) cargado de forma diferida: no traba el
// primer pintado y, mientras carga, se ve el gradiente de base.
const Scene3D = lazy(() => import('./Scene3D'))

/**
 * Fondo del hero, en capas:
 *  1. base oscura + blobs de gradiente (color de marca, ambiente)
 *  2. escena 3D de formas flotando (lazy)
 *  3. viñeta para asegurar contraste del texto
 */
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* 1 · base + glow de color */}
      <div className="absolute inset-0 bg-dark" />
      <div className="animate-float absolute -left-24 top-[-10%] h-[55vmin] w-[55vmin] rounded-full bg-primary/30 blur-[100px]" />
      <div
        className="animate-float absolute right-[-10%] top-[15%] h-[50vmin] w-[50vmin] rounded-full bg-secondary/25 blur-[110px]"
        style={{ animationDelay: '-2s' }}
      />
      <div
        className="animate-float absolute bottom-[-15%] left-[25%] h-[40vmin] w-[40vmin] rounded-full bg-accent/15 blur-[120px]"
        style={{ animationDelay: '-4s' }}
      />

      {/* 2 · 3D */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      {/* 3 · viñeta para legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-dark/40 to-dark" />
    </div>
  )
}
