# CLAUDE.md — Redes con Lu

## Qué es este proyecto
Sitio web / portfolio personal de **Lourdes ("Lu")**, community manager y creadora de contenido.
Muestra su trabajo gestionando redes sociales y, eventualmente, ofrece sus servicios.

Referencia visual de estructura (NO de estilo): https://somosrayo.com.ar/
Tomamos de ahí el ESQUELETO (hero → qué hago → muestra de trabajo → servicios → contacto),
NO la paleta ni el look. Esto tiene que verse más moderno y propio.

## Tono y voz
- Español rioplatense, cercano, profesional pero con onda. Tuteo.
- Lu habla en primera persona ("Gestiono", "Creo contenido que...").
- Nada de jerga corporativa fría tipo plantilla.

## Stack
- **Vite + React + TypeScript**
- **Tailwind CSS** para estilos (toda la paleta vive en `tailwind.config`)
- **Motion** (`motion/react`, ex Framer Motion) para animaciones de scroll, entrada y hover
- **Spline** (`@splinetool/react-spline`) para la escena 3D del hero (embebible, liviana)
- Iconos: `lucide-react`
- Deploy pensado para **Vercel** o **Netlify** (sitio estático, sin backend)

## Reglas de arquitectura
- **Sin backend, sin base de datos.** Es un sitio estático. Todo el contenido vive en data/archivos locales.
- Componentes en `src/components/`, secciones en `src/sections/`.
- Data editable (stats, redes, trabajos) centralizada en `src/data/` para que Lu la toque fácil sin meterse en JSX.
- TypeScript estricto. Props tipadas.
- Mobile-first SIEMPRE. El público viene de IG/TikTok, miran desde el celu.

## Dirección de diseño
**Dirección elegida: EQUILIBRADO / ELEGANTE.** Moderno y con impacto, pero que respire y no abrume.
- **Moderno, visual, "entra por los ojos".** Mucho cuidado en tipografía, espaciado y micro-interacciones.
- Animaciones de scroll suaves (fade + slide al aparecer secciones), hover states con vida.
- **3D sutil SOLO en el hero** (escena Spline liviana, algo flotando suave que no marea). El resto: efectos 2D refinados (gradientes animados, glassmorphism sutil, parallax liviano).
- NADA de 3D pesado ni movimiento que canse o maree. Elegante > recargado.
- Rendimiento es prioridad: nada que trabe en mobile. Lazy-load del 3D, imágenes optimizadas.
- Dark mode opcional pero no obligatorio en v1.

### Paleta (PLACEHOLDER — ajustar a gusto de Lu)
Definir en `tailwind.config`. Arrancamos con una propuesta moderna y cálida,
distinta a la de Rayo. Lu elige los colores finales.
```
primary:   #7C3AED  (violeta vibrante)
secondary: #F472B6  (rosa)
accent:    #FBBF24  (amarillo cálido)
dark:      #0F0F1A
light:     #FAFAFF
```
> Si Lu ya tiene colores de marca, reemplazar TODO esto por los de ella.

## Secciones (orden propuesto)
1. **Hero** — nombre "Redes con Lu", tagline potente, CTA ("Trabajemos juntos"), escena 3D Spline de fondo.
2. **Qué hago** — 3 pilares (estrategia / contenido / gestión), estilo cards con icono.
3. **Números** — stats con contador animado al entrar en viewport (seguidores totales, cuentas gestionadas, etc.).
4. **Mi trabajo** — grilla de cuentas que gestiona. Cada card linkea a la cuenta y muestra embed o thumbnail del contenido real.
5. **Servicios** — qué ofrece Lu, presentado en cards/packs (estrategia, contenido, gestión integral, etc.). Cada uno con descripción de lo que incluye. **NO hay pago ni carrito online**: el CTA de cada servicio es "Consultar por WhatsApp" y abre un chat con mensaje prearmado.
6. **Contacto** — CTA principal a WhatsApp (con mensaje prellenado tipo "Hola Lu, me interesa tu servicio de..."). Opcional: form simple que también termina en WhatsApp o mailto. Sin backend.

## Conversión: todo va a WhatsApp
El sitio NO vende ni cobra online. Es vidriera + captación.
- Todos los CTA de servicios/contacto abren WhatsApp con `https://wa.me/<numero>?text=<mensaje>`.
- El mensaje viene prearmado según el contexto (ej: desde el pack "X" → "Hola Lu, me interesa el pack X").
- Número de WhatsApp configurable en `src/data/contact.ts`.

## Integración de redes (IMPORTANTE — sin API)
NO usar la API de Instagram/TikTok (Basic Display API deprecada, requiere backend + tokens).
En su lugar:
- **Embeds oficiales**: código de insertar de cada post de IG / video de TikTok.
- **Stats hardcodeadas** en `src/data/stats.ts`, mostradas con contador animado. Lu las actualiza a mano.
- Cada cuenta gestionada = una card con foto, handle, métricas y link directo al perfil.

### Cuentas que gestiona (completar handles reales en src/data/)
- Cuenta del abuelo: ~40K seguidores en IG, ~150K en TikTok (la más fuerte, destacarla)
- Su propia cuenta
- 2 cuentas más (completar)

## Qué NO hacer
- No meter backend, DB ni API keys.
- No copiar literal el diseño de Rayo (es solo referencia de estructura).
- No sobrecargar de 3D: mata la performance en mobile.
- No hardcodear contenido suelto en los componentes: usar `src/data/`.

## Flujo de trabajo
- Cambios incrementales, sección por sección. Mostrar resultado y ajustar.
- Después de cada sección, correr el dev server y revisar en mobile (responsive).
