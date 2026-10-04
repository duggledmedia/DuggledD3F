# Duggled — Del caos al orden
Sitio editorial mobile first. El hero contiene una escena Three.js real, una cámara PerspectiveCamera y una timeline GSAP / ScrollTrigger reversible de cinco etapas. No utiliza video.

## Desarrollo
`pnpm dev` · `pnpm build`

## Estructura
- `lib/content.ts`: textos, proyectos, navegación y contacto.
- `lib/narrative.ts`: timeline principal; títulos se desplazan desde abajo y salen hacia arriba, sin fades.
- `lib/cinema-world.ts`: cámara, geometría, planos UI en profundidad, ensamblaje y señales. Three.js se carga de forma diferida solo si no hay reduced motion.

El recorrido ocupa 600 alturas de viewport. El cierre permanece durante el último tramo antes de liberar el sticky. Las microanimaciones usan un reloj separado y no cambian el progreso del scroll. El render se pausa fuera de pantalla y con la pestaña oculta. Pixel ratio limitado, geometría y sombras simplificadas en mobile, ajuste automático de calidad y fallback ante falta o pérdida de WebGL.
- `components/duggled/`: header y hero.
- `app/globals.css`: tokens, composición responsive y reduced motion.
- `app/layout.tsx`, `robots.ts`, `sitemap.ts`: SEO y datos estructurados.

El logo y el teléfono se recuperaron del sitio actual. El portfolio presenta Body Supply, Locos x la Tecnología y La Tiendita Tech, con los servicios indicados por el dueño. Los mockups editoriales usan logos y productos recuperados de los sitios y del perfil público de Instagram. No son capturas literales de los sitios. Instagram permitió recuperar la identidad del perfil, pero no el feed; no se inventaron publicaciones, métricas o testimonios. Las fuentes están en public/projects/sources.json.

Para pasar al dominio definitivo, actualizar metadataBase, canonical, schema, robots y sitemap. La publicación inicial es privada y no modifica duggled.com.ar.

Reduced motion presenta las cinco etapas como contenido estático indexable. Navegación por teclado, acceso para saltar la animación y enlaces de WhatsApp disponibles sin formularios o backend ficticios.

Las tarjetas del hero usan capturas públicas de interfaces como referencia visual. `public/screens/sources.json` conserva sus fuentes. La pantalla de compra confirmada es una interfaz ilustrativa propia. Estas imágenes no representan cuentas conectadas ni resultados de Duggled. Se cargan por URL local y se ajustan sin deformación; Web usa la primera pantalla de una tienda de ejemplo Shopify.
