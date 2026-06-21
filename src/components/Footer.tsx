import { whatsappLink, INSTAGRAM_HANDLE, HERO_WHATSAPP_MESSAGE } from '../data/contact'
import { InstagramIcon } from './BrandIcons'

export default function Footer() {
  return (
    <footer className="border-t border-dark/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-display text-lg font-bold">
            Redes <span className="text-gradient">con Lu</span>
          </p>
          <p className="mt-1 text-sm text-dark/55">
            Community management &amp; contenido · Hecho con onda.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="rounded-full border border-dark/10 p-2.5 text-dark/70 transition-colors hover:border-primary hover:text-primary"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <a
            href={whatsappLink(HERO_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-dark/10 px-4 py-2 text-sm font-medium text-dark/80 transition-colors hover:border-primary hover:text-dark"
          >
            Escribime
          </a>
        </div>
      </div>
    </footer>
  )
}
