import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { whatsappLink, HERO_WHATSAPP_MESSAGE } from '../data/contact'

const links = [
  { href: '#que-hago', label: 'Cómo te ayudo' },
  { href: '#numeros', label: 'Resultados' },
  { href: '#trabajo', label: 'Proyectos' },
  { href: '#servicios', label: 'Planes' },
  { href: '#contacto', label: 'Hablemos' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloquear scroll del body con el menú mobile abierto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-dark/10 bg-light/80 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="font-display text-lg font-bold tracking-tight">
          Redes <span className="text-gradient">con Lu</span>
        </a>

        {/* Links desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-dark/70 transition-colors hover:text-dark"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={whatsappLink(HERO_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-gradient-to-r from-secondary to-primary px-5 py-2 text-sm font-semibold text-dark shadow-md shadow-primary/20 transition-transform hover:scale-105 md:inline-flex"
        >
          Trabajemos juntos
        </a>

        {/* Botón menú mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Menú mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-dark/10 bg-light/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-2 py-3 text-base font-medium text-dark/80 transition-colors hover:bg-dark/5 hover:text-dark"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href={whatsappLink(HERO_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-gradient-to-r from-secondary to-primary px-5 py-3 text-center text-base font-semibold text-dark"
                >
                  Trabajemos juntos
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
