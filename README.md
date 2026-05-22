# ICTA Digital — Portafolio web

Sección publicada en `https://digital.icta.cl/` que reúne la línea de
servicios web de ICTA: landing pages, sitios institucionales, dashboards y
plataformas a medida para negocios locales, profesionales, cursos, eventos y
empresas.

## Repos hermanos

| Repo | URL pública | Contenido |
|---|---|---|
| [`icta-consultora`](https://github.com/djwillichile/icta-consultora) | `icta.cl` | Sitio principal de ICTA Ltda. (React) y Worker de contacto |
| **`icta-digital`** *(este)* | `digital.icta.cl` | Portfolio de ICTA Digital |
| `web-icta-planning` *(privado)* | (sin URL) | Specs, docs internos, memory |

## Objetivo

- Mostrar a potenciales clientes ejemplos navegables de los tipos de páginas
  que podemos construir.
- Servir como herramienta comercial para cotizar landing pages, sitios
  institucionales, tiendas online y plataformas SaaS.
- Funcionar de forma autocontenida (HTML + CSS + JS plano), sin frameworks
  ni build, fácil de mantener.

## Estructura de carpetas

```
icta-digital/
├── index.html                       # Vitrina principal (lista de proyectos)
├── README.md                        # Este archivo
├── favicon/                         # Favicons multi-tamaño
├── assets/
│   └── logo.png                     # Logo de ICTA Digital (usado en navbar y OG)
├── terranova-operaciones/           # Plataforma SaaS de capacitación minera/industrial
├── curso-gis/                       # GeoTaller QGIS — curso de cartografía
├── consultora-ambiental/            # Verdara Consultores
├── cafeteria/                       # Café del Roble
├── evento-comunitario/              # Feria de la Plaza
├── profesional-salud/               # Valentina Reyes — psicóloga clínica
├── taller-mecanico/                 # TallerPro
├── boda/                            # Camila & Tomás — web de boda
└── reposteria/                      # Repostería Almendra — tienda online
```

Cada proyecto vive en su propia subcarpeta con un `index.html` autocontenido
(CSS y JS embebidos en el archivo). Los proyectos sin imágenes reales generan
visuales con SVG, gradientes y CSS.

## Stack

- HTML5 semántico
- CSS moderno (custom properties, grid/flex, container queries cuando aplica)
- JavaScript vanilla (sin npm, sin bundler)
- Fuentes de Google Fonts (Inter, Space Grotesk, etc.)
- Iconos: SVG inline

## Proyectos disponibles

| Carpeta | Rubro | Estilo visual | Características clave |
| --- | --- | --- | --- |
| `terranova-operaciones/` | Plataforma SaaS · Capacitación | Oscuro premium dorado/ocre | 17 cursos con badge de modalidad (online/mixta/presencial), 3 planes con shimmer, mockup de certificado |
| `curso-gis/` | Curso técnico | Oscuro azul/cyan, monoespaciada | Imágenes reales de QGIS, hero responsive desktop/mobile, secciones de análisis SIG y trabajo en terreno |
| `consultora-ambiental/` | Consultora institucional | Institucional, verde/azul, técnico | Servicios, casos seleccionados, equipo, contacto |
| `cafeteria/` | Cafetería local | Cálido, café/crema, tipografía serif | Carta del día, horarios, ubicación |
| `evento-comunitario/` | Evento gratuito | Vibrante, rosa/naranja/amarillo | Programa por bloques, organizadores, mapa SVG, registro |
| `profesional-salud/` | Profesional independiente | Limpio, celeste/teal, calmado | Áreas de atención, modalidades, testimonio, reserva |
| `taller-mecanico/` | Servicios técnicos | Industrial, oscuro, naranja/amarillo | Servicios, zonas, horarios, testimonios, agenda |
| `boda/` | Web personal / evento | Elegante, beige/dorado/rosa polvo | Save the date, programa, dress code, RSVP, lista de regalos |
| `reposteria/` | Tienda online | Dulce, rosa/dorado/crema | Catálogo filtrable, carrito que envía a WhatsApp, formulario de torta a medida |

## Formulario de contacto

Cada landing tiene un formulario que apunta al Worker compartido de ICTA
(`https://api.icta.cl/contact`), enviando el campo `_origen: "icta-digital"`
para que el correo de notificación interna identifique la fuente y aplique
el branding correcto.

## Convenciones técnicas

### Banner de demostración

Cada proyecto tiene un banner sticky en `<body>` con badge "Demo activa" +
atribución a ICTA Ltda. La paleta del banner se adapta al rubro (cálido en
cafetería, oscuro en taller, dulce en repostería, etc.). El badge usa una
animación `@keyframes ictaBannerPulse` con nombre único para no chocar con
animaciones existentes.

### WhatsApp y back-link

- Botón flotante de WhatsApp al `+56 9 9292 4314` (número de ICTA).
- Botón "Volver al portafolio" hacia `/`.

### Footer y SEO

- Footer con crédito al estudio: *"Diseño y desarrollo · ICTA Digital"*.
- `<meta name="robots" content="noindex">` en proyectos demo para que los
  buscadores no los indexen como sitios reales (los nombres de personas,
  marcas y productos son ficticios).

### Logos en la vitrina (auto-detect)

La vitrina principal (`index.html`) tiene un sistema JavaScript que detecta
automáticamente logos por convención:

> **Si tu proyecto tiene `<proyecto>/assets/logo.png`, aparecerá en la card
> de la vitrina sin necesidad de tocar HTML.**

El JS hace una precarga con `new Image()` y, si la URL existe, inyecta
`<img class="demo-logo">` en el `.demo-cover`, ocultando el `cover-text`. Si
la URL falla (404), no hace nada y queda el texto.

## Cómo agregar un proyecto nuevo

1. **Crear la carpeta**: `<nombre-rubro>/`.
2. **Copiar un proyecto existente** que se parezca al rubro objetivo y
   usarlo como base.
3. **Adaptar el `index.html`**:
   - Cambiar `<title>`, `<meta description>` y `og:*`.
   - Ajustar la paleta de colores en `:root`.
   - Reemplazar contenido (textos, productos, servicios, equipo).
   - Mantener WhatsApp, back-link, banner sticky y footer.
4. **Agregar la tarjeta** en `index.html` raíz dentro de la grilla `.demos`.
5. **(Opcional) Subir logo**: `<proyecto>/assets/logo.png` → auto-detect lo
   muestra en la vitrina.
6. **Probar localmente** abriendo `index.html` en el navegador.

## Reglas de estilo y contenido

- **Todo el contenido es ficticio pero realista**: nombres de personas,
  marcas, direcciones, productos. No usar marcas reales ni nombres de
  negocios existentes.
- **No prometemos resultados que no podemos garantizar**: la vitrina habla de
  claridad, presencia profesional y canales funcionales — no de "ventas
  garantizadas".
- **Imágenes con licencia limpia**: AI generadas o licenciadas. Si no hay
  imagen real, usar SVG inline, gradientes CSS, iconos Unicode.
- **Nombres de archivo en kebab-case sin acentos ni espacios**.
- **Rutas absolutas desde root** (`/`, `/favicon/...`). El sitio se sirve en
  la raíz de `digital.icta.cl/`.
- **Cada proyecto debe verse distinto**: tipografía, paleta y composición
  específica al rubro.
- **Responsive obligatorio**: probar en móvil (≤ 480px), tablet (≤ 880px) y
  escritorio.
- **`prefers-reduced-motion`**: respetar la preferencia desactivando
  animaciones costosas.

## Cómo convertir un proyecto del portafolio en proyecto real de cliente

Cuando un cliente pide "una página similar a la de la cafetería":

1. **Levantar requisitos**: rubro, contenido real, branding,
   funcionalidades extra.
2. **Duplicar el proyecto base** en un repo nuevo o carpeta separada del
   cliente. **No editar el del portafolio.**
3. **Reemplazar el contenido ficticio** por el del cliente, ajustar paleta a
   su identidad y revisar accesibilidad.
4. **Conectar el formulario** a un endpoint real (Formsubmit, Formspree,
   Google Forms o backend propio). Los proyectos del portafolio simulan el
   envío POSTeando al Worker compartido de ICTA, no a un endpoint del
   cliente.
5. **Reemplazar el WhatsApp** `+56 9 9292 4314` por el del cliente.
6. **Eliminar `<meta robots noindex>`** para indexar el sitio del cliente.
7. **Eliminar el banner de demostración** del `<body>`.
8. **Reemplazar el footer** por el corporativo del cliente.
9. **Configurar dominio y publicación** según el plan contratado.
10. **Revisión técnica antes de entregar**.

## Optimización de imágenes

`terranova-operaciones/` y `curso-gis/` usan PNGs reales que pueden pesar
varios MB. Para optimizar a WebP:

- `terranova-operaciones/optimize-assets.sh` convierte todos los PNG a WebP
  (requiere `cwebp`: `apt install webp` / `brew install webp`).
- El HTML usa `<picture><source type="image/webp"><img src=".png"></picture>`
  cuando aplica.
- Reducción típica: 80–85% (44 MB → ~7 MB).

## Despliegue

Servido desde **Cloudflare Pages**, conectado al branch `main` de este repo.
Sin build step — Pages publica los archivos estáticos directamente.

DNS: `digital.icta.cl` (CNAME a Pages target, gestionado en Cloudflare DNS).

## Licencia

© ICTA Ltda. Todos los derechos reservados.
