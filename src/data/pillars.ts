import { Waypoints, SquarePlay, LayoutDashboard, type LucideIcon } from 'lucide-react'

export type Pillar = {
  icon: LucideIcon
  title: string
  subtitle: string
  description: string
}

// "¿Cómo puedo ayudarte?" — 3 pilares. Lu edita títulos, subtítulos y textos acá.
export const pillars: Pillar[] = [
  {
    icon: Waypoints,
    title: 'Estrategia',
    subtitle: 'Pensá tus redes con intención',
    description:
      'Defino a quién le hablás, qué te diferencia y creo un plan de contenido alineado con tus objetivos.',
  },
  {
    icon: SquarePlay,
    title: 'Contenido',
    subtitle: 'Creo contenido que frena el scroll',
    description:
      'Posteos, reels y videos pensados para conectar con tu audiencia. Me ocupo de las ideas, los guiones, la edición y los textos, siempre respetando la voz de tu marca.',
  },
  {
    icon: LayoutDashboard,
    title: 'Gestión',
    subtitle: 'Me encargo del día a día de tus redes',
    description:
      'Publicaciones, interacción con la comunidad, respuestas y seguimiento constante. Vos enfocate en tu negocio, de las redes me ocupo yo.',
  },
]
