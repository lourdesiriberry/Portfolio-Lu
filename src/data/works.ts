export type Metric = {
  platform: 'Instagram' | 'TikTok'
  count: string // ej '40K', '150K'
}

export type Work = {
  name: string
  handle: string // sin @
  description: string
  url: string // link directo al perfil (el principal)
  metrics: Metric[]
  /** Card destacada (más grande). Usar en la cuenta más fuerte. */
  featured?: boolean
  /** Foto/thumbnail opcional. Si no hay, se muestra un avatar con la inicial. */
  image?: string
}

// Cuentas que gestiona Lu.
export const works: Work[] = [
  {
    name: 'Lu y Betito',
    handle: 'luybetito',
    description:
      'Tres generaciones juntas: mi abuelo, mi hija y yo. Momentos reales que enamoran y un fenómeno en TikTok.',
    url: 'https://www.instagram.com/luybetito/',
    metrics: [
      { platform: 'TikTok', count: '134K' },
      { platform: 'Instagram', count: '34.2K' },
    ],
    featured: true,
  },
  {
    name: 'Caye y Luli',
    handle: 'cayeyluli',
    description: 'Mamá e hija. Contenido real, risas y mucho amor 💖',
    url: 'https://www.instagram.com/cayeyluli/',
    metrics: [
      { platform: 'TikTok', count: '12.3K' },
      { platform: 'Instagram', count: '4.3K' },
    ],
  },
  {
    name: "St. Michael's College",
    handle: 'stmichaelscollegeadrogue',
    description:
      'Comunicación del colegio: contenido que conecta con toda la comunidad educativa.',
    url: 'https://www.instagram.com/stmichaelscollegeadrogue',
    metrics: [{ platform: 'Instagram', count: '3.5K' }],
  },
  {
    name: 'Ecot Siderúrgicos',
    handle: 'ecotsiderurgicos',
    description:
      'Todo para la construcción: chapas, hierros y caños. Comunicación clara y profesional para llegar a más clientes.',
    url: 'https://www.instagram.com/ecotsiderurgicos/',
    metrics: [{ platform: 'Instagram', count: '1.8K' }],
  },
]
