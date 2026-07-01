import { Suspense, lazy, useEffect, useState } from 'react'

// 3D real (Three.js / React Three Fiber). Se carga en TODOS los dispositivos
// (también en mobile) pero DIFERIDO: primero se pinta el contenido — la página
// abre rápido — y recién después aparecen los íconos 3D en movimiento.
const Scene3D = lazy(() => import('./Scene3D'))

export default function HeroBackground() {
  const [show3D, setShow3D] = useState(false)

  useEffect(() => {
    // Esperamos al primer pintado para no competir con la carga inicial.
    const id = window.setTimeout(() => setShow3D(true), 600)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* 1 · glows de color (livianos, en todos los dispositivos) */}
      <div className="animate-float absolute -left-24 top-[-10%] h-[55vmin] w-[55vmin] rounded-full bg-secondary/50 blur-[100px]" />
      <div
        className="animate-float absolute right-[-10%] top-[12%] h-[50vmin] w-[50vmin] rounded-full bg-primary/30 blur-[110px]"
        style={{ animationDelay: '-2s' }}
      />
      <div
        className="animate-float absolute bottom-[-15%] left-[25%] h-[45vmin] w-[45vmin] rounded-full bg-accent/40 blur-[120px]"
        style={{ animationDelay: '-4s' }}
      />

      {/* 2 · 3D diferido (también en mobile: aparece a los ~0.6s en movimiento) */}
      {show3D && (
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      )}

      {/* 3 · viñeta clara para legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-light/40 via-transparent to-light/80" />
    </div>
  )
}
