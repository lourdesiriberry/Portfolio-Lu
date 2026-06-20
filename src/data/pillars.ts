import { Target, PenTool, MessagesSquare, type LucideIcon } from 'lucide-react'

export type Pillar = {
  icon: LucideIcon
  title: string
  description: string
}

// "Qué hago" — 3 pilares. Lu edita títulos y descripciones acá.
export const pillars: Pillar[] = [
  {
    icon: Target,
    title: 'Estrategia',
    description:
      'Pienso tus redes con cabeza: a quién le hablás, qué te diferencia y un plan de contenido que tenga sentido. Nada al azar.',
  },
  {
    icon: PenTool,
    title: 'Contenido',
    description:
      'Creo posteos, reels y videos que frenan el scroll. Ideas, guion, edición y copy con tu voz, listos para publicar.',
  },
  {
    icon: MessagesSquare,
    title: 'Gestión',
    description:
      'Me ocupo del día a día: publicación, comunidad, respuestas y seguimiento. Vos seguí con lo tuyo, de las redes me encargo yo.',
  },
]
