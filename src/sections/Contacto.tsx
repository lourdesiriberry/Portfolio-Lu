import { useState, type FormEvent } from 'react'
import { motion } from 'motion/react'
import { MessageCircle, Send } from 'lucide-react'
import { whatsappLink } from '../data/contact'
import Reveal from '../components/Reveal'

export default function Contacto() {
  const [nombre, setNombre] = useState('')
  const [mensaje, setMensaje] = useState('')

  // Sin backend: el form arma el texto y abre WhatsApp con todo prellenado.
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const texto =
      `Hola Lu! Soy ${nombre || 'una persona interesada'}. ` +
      (mensaje ? mensaje : 'Me gustaría trabajar con vos en mis redes.')
    window.open(whatsappLink(texto), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contacto" className="scroll-mt-20 px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <Reveal className="overflow-hidden rounded-3xl border border-dark/10 bg-gradient-to-br from-secondary/35 via-blush/25 to-primary/20 p-8 shadow-sm shadow-dark/[0.04] sm:p-12">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Hablemos
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Tu negocio ya tiene todo para <span className="text-gradient">crecer</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-balance text-base text-dark/70 sm:text-lg">
              Ahora necesitás una estrategia que lo impulse. Escribime y empecemos.
            </p>
          </div>

          {/* CTA directo */}
          <div className="mt-8 flex justify-center">
            <motion.a
              href={whatsappLink('Hola Lu! Quiero hablar sobre gestionar mis redes 🙌')}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-secondary to-primary px-7 py-3.5 text-base font-semibold text-dark shadow-lg shadow-primary/30"
            >
              <MessageCircle className="h-5 w-5" />
              Escribime por WhatsApp
            </motion.a>
          </div>

          {/* Separador */}
          <div className="my-8 flex items-center gap-4 text-xs uppercase tracking-widest text-dark/40">
            <span className="h-px flex-1 bg-dark/10" />o dejame tus datos<span className="h-px flex-1 bg-dark/10" />
          </div>

          {/* Form (también termina en WhatsApp) */}
          <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-4">
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              className="w-full rounded-xl border border-dark/15 bg-white/80 px-4 py-3 text-base text-dark placeholder:text-dark/40 outline-none transition-colors focus:border-primary"
            />
            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Contame de tu proyecto: qué hacés, qué redes tenés y qué buscás."
              rows={4}
              className="w-full resize-none rounded-xl border border-dark/15 bg-white/80 px-4 py-3 text-base text-dark placeholder:text-dark/40 outline-none transition-colors focus:border-primary"
            />
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-full border border-dark/15 bg-white/70 px-6 py-3.5 text-base font-semibold text-dark transition-colors hover:border-primary/40"
            >
              Enviar por WhatsApp
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
