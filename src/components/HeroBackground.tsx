import { Suspense, lazy } from 'react'

// 3D real (Three.js / React Three Fiber) cargado de forma diferida: no traba el
// primer pintado y, mientras carga, se ven los lavados de color de base.
const Scene3D = lazy(() => import('./Scene3D'))

/**
 * Fondo del hero (tema claro), en capas:
 *  1. blobs pastel para dar color al foco del hero
 *  2. escena 3D de logos flotando (lazy)
 *  3. viñeta clara para asegurar contraste del texto
 */
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* 1 · glows de color (sobre la base clara del body) */}
      <div className="animate-float absolute -left-24 top-[-10%] h-[55vmin] w-[55vmin] rounded-full bg-secondary/50 blur-[100px]" />
      <div
        className="animate-float absolute right-[-10%] top-[12%] h-[50vmin] w-[50vmin] rounded-full bg-primary/30 blur-[110px]"
        style={{ animationDelay: '-2s' }}
      />
      <div
        className="animate-float absolute bottom-[-15%] left-[25%] h-[45vmin] w-[45vmin] rounded-full bg-accent/40 blur-[120px]"
        style={{ animationDelay: '-4s' }}
      />

      {/* 2 · 3D */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      {/* 3 · viñeta clara para legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-light/40 via-transparent to-light/80" />
    </div>
  )
}
