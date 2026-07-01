import { Suspense, lazy, useEffect, useState } from 'react'

// 3D real (Three.js / React Three Fiber). Es pesado (~240KB + costo de CPU/GPU),
// así que lo cargamos SOLO en pantallas grandes (desktop). En mobile se muestran
// únicamente los glows de color: la página abre mucho más rápido en el celu y
// ni siquiera descarga Three.js.
const Scene3D = lazy(() => import('./Scene3D'))

const DESKTOP_QUERY = '(min-width: 1024px)'

export default function HeroBackground() {
  const [show3D, setShow3D] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY)
    const update = () => setShow3D(mq.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
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

      {/* 2 · 3D — solo en desktop (en mobile no se carga, para que abra rápido) */}
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
