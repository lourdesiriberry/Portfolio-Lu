import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import { ExtrudeGeometry, Vector3, DoubleSide } from 'three'
import type { Group, Mesh, BufferGeometry } from 'three'

// Respeta a quien prefiere menos movimiento (accesibilidad).
const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Tope de cuánto puede flotar cada ícono (para que no se desplacen y se tapen).
const FLOAT_RANGE: [number, number] = [-0.12, 0.12]

// Logos (paths de marca, viewBox 24x24) que extruimos a 3D.
const IG_PATH =
  'M12 2.162c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z'
const TT_PATH =
  'M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z'

type IconDef = {
  path: string
  color: string
  scale: number
  pos: [number, number, number]
  float: { speed: number; rot: number; floatI: number }
  spin: number
}

// Íconos de IG y TikTok repartidos alrededor del texto.
const ICONS: IconDef[] = [
  { path: IG_PATH, color: '#FE688E', scale: 1.7, pos: [-2.7, 0.6, -1], float: { speed: 1.1, rot: 0.4, floatI: 1 }, spin: 0.25 },
  { path: TT_PATH, color: '#2BA8E0', scale: 1.6, pos: [2.8, -0.5, -0.4], float: { speed: 1.3, rot: 0.4, floatI: 1.1 }, spin: -0.3 },
  { path: IG_PATH, color: '#F4B400', scale: 1.0, pos: [2.4, 1.7, -1.2], float: { speed: 1.6, rot: 0.5, floatI: 1.2 }, spin: 0.35 },
  { path: TT_PATH, color: '#FE688E', scale: 1.0, pos: [-2.3, -1.5, -0.8], float: { speed: 1.5, rot: 0.5, floatI: 1.1 }, spin: 0.3 },
  { path: IG_PATH, color: '#2BA8E0', scale: 0.85, pos: [-3.1, 1.6, -1.4], float: { speed: 1.4, rot: 0.5, floatI: 1 }, spin: -0.28 },
]

/** Convierte un path SVG (viewBox 24) en una geometría 3D centrada y normalizada (~1 unidad). */
function useIconGeometry(path: string): BufferGeometry {
  return useMemo(() => {
    const svg = `<svg viewBox="0 0 24 24"><path d="${path}"/></svg>`
    const { paths } = new SVGLoader().parse(svg)
    const shapes = paths.flatMap((p) => SVGLoader.createShapes(p))
    const geom = new ExtrudeGeometry(shapes, {
      depth: 6,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 0.5,
      bevelSegments: 3,
      steps: 1,
    })
    geom.computeBoundingBox()
    const bb = geom.boundingBox!
    const size = bb.getSize(new Vector3())
    const center = bb.getCenter(new Vector3())
    geom.translate(-center.x, -center.y, -center.z)
    const s = 1 / Math.max(size.x, size.y)
    geom.scale(s, s, s)
    return geom
  }, [path])
}

function Icon({ icon }: { icon: IconDef }) {
  const geom = useIconGeometry(icon.path)
  const mesh = useRef<Mesh>(null)

  // Giro lento sobre el eje Y para que se vea el volumen 3D.
  useFrame((_, delta) => {
    if (mesh.current && !REDUCED) mesh.current.rotation.y += delta * icon.spin
  })

  return (
    <Float
      speed={REDUCED ? 0 : icon.float.speed}
      rotationIntensity={REDUCED ? 0 : icon.float.rot}
      floatIntensity={REDUCED ? 0 : icon.float.floatI}
      floatingRange={FLOAT_RANGE}
    >
      {/* scale.y negativo: el SVG tiene el eje Y invertido */}
      <mesh ref={mesh} geometry={geom} position={icon.pos} scale={[icon.scale, -icon.scale, icon.scale]}>
        <meshStandardMaterial
          color={icon.color}
          roughness={0.3}
          metalness={0.2}
          emissive={icon.color}
          emissiveIntensity={0.1}
          side={DoubleSide}
        />
      </mesh>
    </Float>
  )
}

function Icons() {
  const group = useRef<Group>(null)

  // Parallax MUY sutil siguiendo el puntero (sin orbitar, no se tapan).
  useFrame((state) => {
    if (!group.current || REDUCED) return
    const { x, y } = state.pointer
    group.current.rotation.x += (y * 0.06 - group.current.rotation.x) * 0.04
    group.current.rotation.y += (x * 0.06 - group.current.rotation.y) * 0.04
  })

  return (
    <group ref={group}>
      {ICONS.map((icon, i) => (
        <Icon key={i} icon={icon} />
      ))}
    </group>
  )
}

export default function Scene3D() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={1.3} />
      <directionalLight position={[5, 5, 5]} intensity={2.2} />
      <pointLight position={[-6, 2, 4]} color="#FE688E" intensity={60} />
      <pointLight position={[6, -2, 2]} color="#C4E6FF" intensity={60} />
      <Icons />
    </Canvas>
  )
}
