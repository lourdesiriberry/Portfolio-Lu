# Bitácora técnica — Redes con Lu

Documento **técnico y de decisiones**, a fondo, para que cualquier sesión/persona futura
entienda **qué se construyó, cómo y por qué**. Complementa al `SOBRE-EL-SITIO.md`
(funcional) y al `CLAUDE.md` (instrucciones del proyecto).

Última actualización: 2026-07-04.

---

## 1. Resumen

Portfolio **estático, sin backend** para Lu (community manager). SPA de una sola página
con anclas por sección. Todo el contenido vive en `src/data/`. La conversión es 100% a
**WhatsApp** (`https://wa.me/<num>?text=<msg>`). Desplegado en **Netlify** con dominio
propio **redesconlu.com.ar**, deploy automático en cada push a `main`.

## 2. Stack técnico

- **Vite** + **React 19** + **TypeScript** (estricto).
- **Tailwind CSS v3** — toda la paleta y tipografías en `tailwind.config.js`. PostCSS +
  autoprefixer.
- **motion** (`motion/react`, ex Framer Motion) — animaciones de entrada, scroll-reveal,
  hover, contadores y los íconos 3D del hero.
- **lucide-react** — íconos. ⚠️ La versión instalada (`1.21.x`) **quitó los íconos de
  marca** (Instagram, TikTok, WhatsApp): esos están hechos a mano como SVG inline en
  `src/components/BrandIcons.tsx`.
- **NO usa** Three.js ni React Three Fiber (ver §6, se probaron y se sacaron por
  performance). Los paquetes `three`, `@react-three/*` y `@splinetool/*` pueden **seguir
  en `package.json` pero están SIN USO** (no se importan → no entran al bundle).

## 3. Estructura del código

```
index.html            → <head> con SEO, Open Graph/Twitter (apuntan a redesconlu.com.ar)
                        y carga de fuentes (Sora + Inter) con preconnect.
netlify.toml          → build command (npm run build), publish (dist), redirect SPA.
tailwind.config.js    → paleta de colores, fuentes (display: Sora, sans: Inter),
                        keyframes (gradient-pan, float) y animaciones.
src/
  index.css           → @tailwind base/components/utilities + body + utilidad .text-gradient
  App.tsx             → arma la página: Navbar + secciones + Footer + FloatingWhatsApp
  main.tsx            → entrypoint React
  components/
    Navbar.tsx        → nav fija, cambia a fondo casi sólido al scrollear, menú mobile
    Footer.tsx
    FloatingWhatsApp.tsx → botón verde fijo abajo-derecha
    HeroBackground.tsx   → glows de color del hero (estáticos, ver §6)
    HeroIcons.tsx        → los 3 íconos chiquitos animados en 3D por CSS (§6)
    BrandIcons.tsx       → SVG inline de Instagram / TikTok / WhatsApp
    SectionHeading.tsx   → encabezado consistente (eyebrow + título + subtítulo)
    Reveal.tsx           → wrapper de animación scroll-reveal (fade + slide)
    Counter.tsx          → contador animado (motion useInView + animate)
  sections/
    Hero.tsx, QueHago.tsx, Numeros.tsx, MiTrabajo.tsx, Servicios.tsx, Contacto.tsx
  data/
    contact.ts, stats.ts, pillars.ts, works.ts, services.ts   → CONTENIDO editable
```

## 4. Diseño visual (estado actual)

- **Tema:** claro. Fondo blanco roto `#FFFBFD` sólido.
- **Paleta** (en `tailwind.config.js`):
  - `primary: #FE688E` (rosa fuerte), `secondary: #C4E6FF` (celeste),
    `accent: #FFF48A` (amarillo), `dark: #1A1320` (texto), `light: #FFFBFD` (fondo).
- **Tipografías:** **Sora** para títulos (`font-display`), **Inter** para textos
  (`font-sans`). Se cargan por `<link>` en `index.html` (más rápido que `@import`).
- **`.text-gradient`**: gradiente celeste→rosa saturado para leerse sobre claro; se usa
  en "con Lu" (navbar/footer), en el resaltado del hero y en los números.
- Efectos: gradientes en botones/paneles, tarjetas claras con sombra, micro-hover.

### Historial de la paleta (importante para un futuro toggle dark/light)
- Arrancó **oscuro** (`#0F0F1A`) con paleta violeta placeholder.
- Se pasó a **claro con tintes** + paleta de Lu → commit **`a33f570`**. Su **padre
  `8cfd2fe`** es el último estado **OSCURO** (referencia de cómo se veía en oscuro).
  `git diff 8cfd2fe a33f570` muestra el cambio dark→light.
- Se probó una **paleta "premium" apagada** (rosa pastel #E5B8C7, celeste #BFDCE7,
  amarillo #F3D66B sobre blanco) pero **Lu la rechazó** y se **revirtió** (nunca se
  commiteó). Quedó la paleta vibrante actual.

## 5. Conversión y contenido

- Todos los CTA usan `whatsappLink(msg)` de `src/data/contact.ts` (número
  `5491144446104`). Cada pack y el hero tienen su mensaje prearmado.
- **Sin API de redes** (la Basic Display de IG está deprecada y pide backend): los números
  son **hardcodeados** en `stats.ts`/`works.ts` y Lu los actualiza a mano.
- **Cuentas gestionadas** (`works.ts`): Lu y Betito (@luybetito, destacada, TikTok 134K /
  IG 34.2K), Caye y Luli (@cayeyluli), St. Michael's College
  (@stmichaelscollegeadrogue), Ecot Siderúrgicos (@ecotsiderurgicos, IG 1.8K).
- **Planes** (`services.ts`): Despegá $300.000/mes, Conectá $450.000/mes (destacado, "Más
  elegido"), Destacá $700.000/mes.

## 6. El 3D del hero y la ODISEA de performance (clave)

Esto es lo más importante de entender para no repetir errores:

1. **v1:** el hero tenía un **3D real** con Three.js / React Three Fiber: los logos de
   Instagram/TikTok **extruidos a 3D** (SVGLoader + ExtrudeGeometry) flotando y girando,
   con `<Float>` de drei. Se veía muy bien **en desktop**.
2. **Problema:** ese chunk pesaba **~906 KB (243 KB gzip)** y, peor, hacía render 3D real
   → **en el celular abría extremadamente lento**.
3. Se intentó: cargarlo **solo en desktop** (media query), luego **también en mobile pero
   diferido**. Igual seguía pesado en el celu.
4. **Solución final (commit `ed68058`): se ELIMINÓ Three.js por completo.** Se reemplazó
   por **`HeroIcons.tsx`**: 3 íconos chiquitos (Instagram, TikTok y un ícono de
   crecimiento) como SVG normales, con **animación "3D" por CSS** (motion: `rotateY` +
   `rotateX` + float, con `perspective` y `transformStyle: preserve-3d`). Ubicados
   **arriba del título**. Livianísimo. El bundle pasó de **~356 KB a ~113 KB gzip**.
5. **Safari/iOS seguía lento** (Chrome andaba perfecto). Culpables típicos de Safari, que
   se corrigieron (commits `18f125d` y `f64d86d`):
   - `background-attachment: fixed` en el body → **removido** (Safari lo repinta en cada
     scroll). Ahora el body es color sólido.
   - **Blobs** de color del hero con `blur` gigante (100–120px) **animándose** → ahora
     **estáticos** y con menos blur (70–80px).
   - **`backdrop-blur`** en navbar, píldora del hero y todas las tarjetas → **removido**
     (los fondos eran casi opacos igual, cambio visual mínimo, gran alivio para Safari).
   - **Halo `animate-ping`** del botón de WhatsApp → removido (animación continua).

> **Regla para el futuro:** la performance en mobile (iOS Safari) es prioridad. Evitar
> librerías 3D pesadas, `background-attachment: fixed`, `backdrop-filter` masivo y
> animaciones continuas de elementos con `blur` grande.

## 7. SEO / compartir el link

- `index.html` tiene meta **Open Graph + Twitter** apuntando a `redesconlu.com.ar` y a
  `/og.jpg` (1200×630, la placa de marca de Lu). Incluye `og:image:width/height`,
  `secure_url`, `type` y `alt`.
- Tras cambiar `og.jpg`, WhatsApp/FB cachean: refrescar con el **debugger de Facebook**
  (`developers.facebook.com/tools/debug/` → "Scrape Again").

## 8. Deploy (Netlify)

- Conectado al repo de GitHub; deploy automático en cada push a `main` (config en
  `netlify.toml`: `npm run build` → `dist`).
- Dominio propio **redesconlu.com.ar** conectado (también `redesconlu.netlify.app`).

## 9. Entorno de desarrollo (Windows) — gotchas

- **`node` NO está en el PATH.** Está en `C:\Program Files\nodejs`. Agregarlo a la sesión:
  `$env:Path = "C:\Program Files\nodejs;" + $env:Path`.
- **PowerShell bloquea `npm.ps1`** (execution policy). Usar **`npm.cmd`** (`npm.cmd run
  dev`, `npm.cmd install`) o `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.
- El watcher de **Vite crashea (EBUSY)** si se deja una imagen abierta/bloqueada en
  `public/`. Si se cae el dev server, revisar archivos recién copiados ahí.
- Al commitear aparecen warnings `LF will be replaced by CRLF` — inofensivos (Windows).
- Los mensajes de `git commit` multilínea con here-string de PowerShell (`@' ... '@`)
  fallan si hay `;` antes; usar mensajes de una línea o el here-string como primer comando.

## 10. Hitos (commits)

| Commit | Qué |
|---|---|
| `a779b7f` | Sitio inicial: hero 3D + todas las secciones + deploy |
| `52780d7` | Imagen de preview (OG) con la placa de Lu |
| `8cfd2fe` | **Último estado oscuro** (referencia dark/light) |
| `a33f570` | Pasa a **tema claro** con paleta de Lu |
| `174f08c` | OG/Twitter al dominio propio redesconlu.com.ar |
| `6e4cf81` | Rediseño de copy (singular), packs DESPEGÁ/CONECTÁ/DESTACÁ, íconos línea fina, menú nuevo, hero delicado, botón flotante WhatsApp |
| `5c71010` | Agrega cuenta Ecot Siderúrgicos (4 cuentas) |
| `ed68058` | **Elimina Three.js**; íconos 3D livianos por CSS cerca del título |
| `18f125d` | Perf Safari: saca `background-attachment: fixed`, blobs estáticos, menos blur/backdrop-blur |
| `f64d86d` | Perf Safari: saca `backdrop-blur` de tarjetas y halo del botón WhatsApp |

## 11. Pendientes / ideas

- Confirmar seguidores/handles reales que falten en `works.ts`.
- Stat "Vistas generadas" está conservador (20M+) — se puede subir.
- Si algún día se quiere **dark/light toggle**: usar `git diff 8cfd2fe a33f570` como mapa.
- Los paquetes 3D sin uso (`three`, `@react-three/*`, `@splinetool/*`) se pueden
  desinstalar para limpiar `package.json` (no afecta el bundle actual).
