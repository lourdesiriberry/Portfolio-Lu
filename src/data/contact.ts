// Datos de contacto centralizados. Lu edita acá sin tocar JSX.

// Número de WhatsApp en formato internacional, SOLO dígitos (sin +, espacios ni guiones).
// +54 9 11 4444-6104  ->  '5491144446104'
export const WHATSAPP_NUMBER = '5491144446104'

// Handle de Instagram laboral de Lu (sin @). Se muestra en el footer.
export const INSTAGRAM_HANDLE = 'redesconlu'

/**
 * Construye un link de WhatsApp con mensaje prearmado.
 * @param message texto que aparece prellenado en el chat
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

// Mensaje por defecto del CTA principal del hero.
export const HERO_WHATSAPP_MESSAGE =
  'Hola Lu! Vi tu sitio y me gustaría trabajar con vos en mis redes 🙌'
