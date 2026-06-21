export type Service = {
  name: string
  tagline: string
  /** Precio visible. Texto libre: '$300.000', 'Desde $80.000', 'A convenir'. Lo define Lu. */
  price: string
  /** Aclaración bajo el precio: 'por mes', 'por proyecto', 'pago único', etc. */
  priceNote?: string
  features: string[]
  /** Mensaje prearmado de WhatsApp para este pack. */
  whatsappMessage: string
  /** Pack destacado (resaltado visualmente). */
  highlight?: boolean
}

// Servicios / packs. NO hay pago online: el precio es informativo y el CTA abre WhatsApp.
export const services: Service[] = [
  {
    name: 'Despegá',
    tagline: 'Para tener presencia con una estrategia profesional.',
    price: '$300.000',
    priceNote: 'por mes',
    features: [
      'Estrategia y plan de contenido mensual',
      '8 posteos al mes (reels, carruseles y estáticos)',
      'Réplica en stories',
      '1 visita mensual para crear contenido real',
      'Copy con tu voz',
    ],
    whatsappMessage: 'Hola Lu! Me interesa el plan Despegá. ¿Cómo seguimos? 😊',
  },
  {
    name: 'Conectá',
    tagline: 'Para mayor presencia, manteniendo la estrategia.',
    price: '$450.000',
    priceNote: 'por mes',
    features: [
      'Estrategia y plan de contenido mensual',
      '12 posteos al mes (reels, carruseles y estáticos)',
      '10 stories al mes',
      '2 visitas mensuales para crear contenido real',
      'Gestión de comunidad y mensajes',
    ],
    whatsappMessage: 'Hola Lu! Me interesa el plan Conectá. ¿Me contás más? 🙌',
    highlight: true,
  },
  {
    name: 'Destacá',
    tagline: 'Para quienes buscan una presencia más intensa.',
    price: '$700.000',
    priceNote: 'por mes',
    features: [
      'Estrategia y plan de contenido mensual',
      '16 posteos al mes (reels, carruseles y estáticos)',
      '18 stories al mes',
      '3 visitas mensuales para crear contenido real',
      'Revisión de contenido mensual',
      'Gestión de comunidad y reporte de resultados',
    ],
    whatsappMessage: 'Hola Lu! Me interesa el plan Destacá. ¿Cómo trabajamos? ✨',
  },
]

// Texto introductorio de la sección Servicios (párrafos). Lo edita Lu.
export const servicesIntro: string[] = [
  'Cada negocio es único, por eso estos packs funcionan como una guía inicial y siempre se adaptan a tus objetivos, necesidades y ritmo de trabajo.',
  'Trabajo principalmente en Instagram, pero también desarrollo estrategias y contenido para TikTok y YouTube, según lo que tu marca necesite.',
  'Antes de comenzar, coordino una videollamada para conocer tu proyecto y definir la propuesta que mejor se ajuste a vos.',
]

// Lo que incluyen TODOS los packs.
export const includedInAll: string[] = [
  'Calendario de contenido mensual.',
  'Diseño, redacción y publicación del contenido.',
  'Banco de imágenes y videos profesionales.',
  'Estrategia adaptada a tu marca.',
]
