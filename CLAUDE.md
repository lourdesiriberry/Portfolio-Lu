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
- **3D del hero: React Three Fiber / Three.js** (`@react-three/fiber`, `@react-three/drei`, `three`).
  NO se usó Spline al final (los paquetes de Spline quedaron instalados pero SIN USO).
- Iconos: `lucide-react`
- Deploy en **Netlify** (sitio estático, sin backend). Ver "Estado actual" al final.

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
- **3D sutil SOLO en el hero** (logos de IG/TikTok extruidos a 3D flotando suave, con React Three Fiber). El resto: efectos 2D refinados (gradientes animados, glassmorphism sutil, parallax liviano).
- NADA de 3D pesado ni movimiento que canse o maree. Elegante > recargado.
- Rendimiento es prioridad: nada que trabe en mobile. Lazy-load del 3D, imágenes optimizadas.
- Dark mode opcional pero no obligatorio en v1.

### Paleta FINAL (colores de marca de Lu) — en `tailwind.config`
Sacados de la placa de marca de Lu. Tema **claro con tintes** (fondo claro + lavados pastel).
```
primary:   #FE688E  (rosa fuerte)
secondary: #C4E6FF  (celeste)
accent:    #FFF48A  (amarillo crema)
blush:     #FECFD9  (rosa claro)
dark:      #1A1320  (texto oscuro cálido)
light:     #FFFBFD  (base clara cálida)
```
El fondo claro con tintes se arma en `src/index.css` (radial-gradients pastel).
El gradiente de marca (`.text-gradient`) usa azul→rosa saturado para leerse sobre claro.

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

## Estado actual del proyecto (actualizado 2026-06-20)
**Sitio COMPLETO y DESPLEGADO.** Todas las secciones armadas: Hero (logos 3D), Qué hago,
Números (contador animado), Mi trabajo, Servicios (con precios visibles), Contacto. + Navbar y Footer.

- **Online**: https://redesconlu.netlify.app — deploy automático en cada `push` a `main`.
- **Repo**: github.com/lourdesiriberry/Portfolio-Lu
- **Tema visual**: **CLARO con tintes pastel**.
  - Para volver a OSCURO o armar un toggle **dark/light**: el commit **`a33f570`** pasó de
    oscuro → claro. Su **padre `8cfd2fe`** es el estado OSCURO con la paleta de Lu (referencia
    de cómo se veía en oscuro). `git diff 8cfd2fe a33f570` muestra EXACTO el cambio dark→light
    (clases de color en componentes + `index.css` + `tailwind.config.js`).
- **WhatsApp**: número real de Lu ya cargado en `src/data/contact.ts`.
- **Preview al compartir (OG)**: `public/og.jpg` (1200×630, placa de marca de Lu). Meta tags en
  `index.html` apuntan a `https://redesconlu.netlify.app/og.jpg` (si cambia el dominio, actualizar ahí).
  Tras cambiar la OG, WhatsApp/FB cachean: refrescar con el debugger de Facebook.

### Entorno de desarrollo (Windows) — OJO
- `node` **NO está en el PATH**. Está en `C:\Program Files\nodejs`. Agregarlo al PATH de la
  sesión (`$env:Path = "C:\Program Files\nodejs;" + $env:Path`) o usar ruta completa.
- PowerShell bloquea `npm.ps1` (execution policy). Usar **`npm.cmd run dev`** (con `.cmd`)
  o habilitar una vez: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

### Pendientes / a confirmar
- Links reales de las cuentas en `src/data/works.ts` (cargados con lo que pasó Lu; revisar que abran).
- Stat "Vistas generadas" puesto conservador (20M+) en `src/data/stats.ts` — se puede subir.
