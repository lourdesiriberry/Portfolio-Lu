export type Stat = {
  value: number
  prefix?: string
  suffix?: string
  label: string
}

// Números mostrados con contador animado. Lu los actualiza a mano (sin API).
export const stats: Stat[] = [
  { value: 190, suffix: 'K+', label: 'Seguidores gestionados' },
  // Conservador: con 5.6M de likes y videos de +9M de vistas, el real es mucho mayor.
  { value: 20, suffix: 'M+', label: 'Vistas generadas' },
  { value: 4, label: 'Cuentas que gestiono' },
  { value: 5, suffix: '+', label: 'Años creando contenido' },
]
