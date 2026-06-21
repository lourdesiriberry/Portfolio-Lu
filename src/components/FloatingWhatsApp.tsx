import { motion } from 'motion/react'
import { whatsappLink } from '../data/contact'
import { WhatsAppIcon } from './BrandIcons'

// Botón flotante de WhatsApp (abajo a la derecha, siempre visible).
// Abre el chat directo con el número de Lu y un mensaje prearmado.
export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={whatsappLink('Hola Lu! Quiero hacer crecer mis redes 🙌')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribime por WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.9, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40"
    >
      {/* halo sutil para llamar la atención */}
      <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-40 motion-safe:animate-ping" />
      <WhatsAppIcon className="h-7 w-7" />
    </motion.a>
  )
}
