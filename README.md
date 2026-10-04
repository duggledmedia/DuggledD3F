# Duggled — GitHub + Vercel

Versión del 4 de octubre de 2026, adaptada a Next.js nativo. Incluye el hero 3D reversible, las últimas correcciones de botones y banners, capturas locales, iconos y metadatos.

## Publicar
1. Descomprimí el ZIP.
2. Creá un repositorio en GitHub y subí el CONTENIDO de duggled-vercel. package.json debe quedar en la raíz.
3. En Vercel, elegí Add New → Project e importá ese repositorio.
4. Framework: Next.js. Root Directory: ./ si subiste el contenido. Si subiste la carpeta entera, elegí duggled-vercel.
5. Node.js 22.x. Conservá el comando de instalación detectado y el build de package.json.
6. Deploy.

Opcional: configurá NEXT_PUBLIC_SITE_URL con la URL completa de tu dominio definitivo y volvé a desplegar. Sin esa variable, utiliza el dominio del proyecto de Vercel. No requiere claves API para el hero ni para los trabajos.

## Desarrollo
Node.js 22.13 o superior y pnpm 11.25.0.

```sh
pnpm install
pnpm dev
```

Para producción: pnpm build y pnpm start.

## Estructura
lib/content.ts contiene textos, proyectos y WhatsApp. lib/narrative.ts controla el scroll; lib/cinema-world.ts contiene Three.js. Estilos en app/globals.css. Todas las imágenes y los iconos están en public. Las capturas se sirven como archivos locales, no se generan al visitar la página. El muro de Tiendita es una recreación ilustrativa. Las fuentes están en public/projects/sources.json y public/screens/sources.json.

El ZIP contiene código fuente, sin dependencias instaladas, cachés ni historial Git. Las bibliotecas se instalan durante el deploy.
