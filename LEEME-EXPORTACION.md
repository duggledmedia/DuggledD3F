# Duggled — Proyecto completo

Versión exportada: 4 de octubre de 2026. Incluye los últimos cambios publicados: lupa reforzada en ambos botones, timeline inferior derecho, banners sin logo izquierdo y tarjeta de Mr. Perkins más arriba.

## Abrir en tu computadora
1. Descomprimí este ZIP y abrí la carpeta duggled-studio en tu editor.
2. Instalá Node.js 22.13 o superior y pnpm 11.25.0.
3. En una terminal dentro de esa carpeta, ejecutá:

   pnpm install
   pnpm dev

4. Abrí la dirección local que indique la terminal.

Para compilar: pnpm build.

## Qué incluye
Código fuente, dependencias declaradas y lockfile, configuración, todas las imágenes locales, capturas originales y optimizadas, logo, favicon, iconos, manifest y metadatos. Las capturas no se generan al abrir la web.

El hero usa Three.js y GSAP/ScrollTrigger. lib/content.ts contiene textos, proyectos y enlace a WhatsApp. Las fuentes de imágenes están en public/projects/sources.json y public/screens/sources.json. El muro de Tiendita es una recreación ilustrativa autorizada.

No se incluyen dependencias instaladas (node_modules), cachés ni historial Git. Se reinstalan las dependencias con pnpm install. Es un proyecto con compilación, no un HTML para abrir con doble clic.

Para usar otro dominio, actualizá los enlaces absolutos en app/layout.tsx, app/robots.ts y app/sitemap.ts.
