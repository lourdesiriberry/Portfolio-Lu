# Sobre el sitio — Redes con Lu

Documento **funcional / explicativo**: qué es la web, qué contiene cada sección y
cómo editarla. (Para el detalle técnico y el historial de decisiones, ver
[`BITACORA-TECNICA.md`](./BITACORA-TECNICA.md).)

---

## Qué es

Sitio web / portfolio personal de **Lourdes ("Lu")**, community manager y creadora de
contenido. Funciona como **vidriera + captación de clientes**: muestra qué hace, sus
resultados, las cuentas que gestiona y sus planes de trabajo. **No vende ni cobra
online**: todos los botones llevan a **WhatsApp** con un mensaje ya escrito.

- **Online:** https://redesconlu.com.ar (dominio propio) — también responde
  `https://redesconlu.netlify.app`
- **Repositorio:** https://github.com/lourdesiriberry/Portfolio-Lu
- **Hosting:** Netlify. Cada `git push` a `main` **publica solo** (deploy automático).

## Tono y voz

Español rioplatense, cercano y profesional pero con onda. Lu habla en **primera persona
singular** ("Gestiono", "Creo contenido…") — es ella sola, **no un equipo**.

---

## Secciones (en orden)

1. **Barra de navegación (Navbar)** — fija arriba. Links: **Cómo te ayudo · Resultados ·
   Proyectos · Planes · Hablemos** + botón "Trabajemos juntos" (WhatsApp). En celular es
   menú hamburguesa.

2. **Portada (Hero)** — título **REDES CON LU**, la bajada *"Estrategia, contenido y
   gestión para que tu negocio se vea, conecte y crezca"* (se resalta solo "se vea,
   conecte y crezca"), y arriba del título **3 íconos chiquitos animados en 3D**
   (Instagram, TikTok y crecimiento). CTA "Trabajemos juntos".

3. **¿Cómo puedo ayudarte?** — 3 pilares en tarjetas: **Estrategia · Contenido ·
   Gestión**. Cada uno con ícono, un subtítulo en negrita y un texto explicativo.

4. **Resultados (Números)** — 4 métricas con **contador animado** al entrar en pantalla
   (seguidores gestionados, vistas generadas, cuentas que gestiono, años).

5. **Proyectos (Mi trabajo)** — grilla de **cuentas que gestiona Lu**. Cada tarjeta
   muestra nombre, @usuario, descripción, métricas y linkea al perfil. La más fuerte va
   **destacada** (más grande).

6. **Planes (Servicios)** — intro + caja "Todos los packs incluyen" + los 3 packs:
   **DESPEGÁ · CONECTÁ · DESTACÁ** (con precio visible). Cada uno con botón "Consultar por
   WhatsApp". **No hay pago online**; el precio es informativo.

7. **Hablemos (Contacto)** — cierre *"Tu negocio ya tiene todo para crecer. Escribime y
   empecemos."* con botón grande de WhatsApp + un formulario que también termina en
   WhatsApp (sin backend).

8. **Pie (Footer)** + **Botón flotante de WhatsApp** (abajo a la derecha, siempre visible).

---

## Dónde se edita el contenido (sin tocar código)

Todo el contenido editable vive en **`src/data/`**. Lu puede cambiar textos, precios y
datos ahí sin meterse en el diseño:

| Archivo | Qué contiene |
|---|---|
| `src/data/contact.ts` | **Número de WhatsApp**, handle de Instagram, mensajes prearmados |
| `src/data/stats.ts` | Los **números** de la sección Resultados (contador) |
| `src/data/pillars.ts` | Los 3 pilares (**Estrategia / Contenido / Gestión**): título, subtítulo, texto e ícono |
| `src/data/works.ts` | Las **cuentas que gestiona** (nombre, @, link, seguidores, descripción, cuál va destacada) |
| `src/data/services.ts` | Los **planes** (nombre, precio, qué incluye) + intro + "Todos los packs incluyen" |

**Colores y tipografías:** en `tailwind.config.js` (paleta) y `src/index.css`.
**Imagen de preview al compartir el link:** `public/og.jpg` (1200×630).

### Datos actuales cargados

- **WhatsApp:** `+54 9 11 4444-6104` · **Instagram:** `@redesconlu`
- **Cuentas gestionadas:** Lu y Betito (@luybetito, la destacada), Caye y Luli
  (@cayeyluli), St. Michael's College (@stmichaelscollegeadrogue), Ecot Siderúrgicos
  (@ecotsiderurgicos).
- **Planes:** Despegá ($300.000/mes), Conectá ($450.000/mes, el destacado), Destacá
  ($700.000/mes).

---

## Cómo correr el proyecto en local (Windows)

> Ojo: en esta PC `node` **no está en el PATH** y PowerShell bloquea `npm.ps1`. Por eso
> los comandos usan `npm.cmd` y se agrega Node al PATH de la sesión.

```powershell
$env:Path = "C:\Program Files\nodejs;" + $env:Path
cd C:\Users\Lourdes\portfolio\Portfolio-Lu
npm.cmd install        # solo la primera vez
npm.cmd run dev        # levanta el sitio en http://localhost:5173
```

Para publicar cambios: `git add -A`, `git commit -m "..."`, `git push`. Netlify actualiza
el sitio solo en 1-2 minutos.

> **Tip:** después de cambiar la imagen `og.jpg`, WhatsApp/Facebook cachean la vieja.
> Para refrescar: https://developers.facebook.com/tools/debug/ → pegar la URL → "Scrape Again".
