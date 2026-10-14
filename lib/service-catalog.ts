export type ServiceProduct = {
  id: string;
  label: string;
  category: string;
  title: [string, string];
  description: string;
  price: string;
  unit: string;
  deadline: string;
  image: string;
  imageAlt: string;
  includes: string[];
  exclusions: string;
  setup?: string;
};

export const serviceCatalog: ServiceProduct[] = [
  {
    id: 'landing-qr', label: 'Landing + QR', category: 'PRESENCIA DIGITAL',
    title: ['Una buena impresión.', 'A un escaneo.'],
    description: 'Una landing que presenta tu propuesta y recibe consultas, conectada con tarjetas QR para que cada contacto encuentre tu negocio.',
    price: '390', unit: 'por proyecto', deadline: '5–7 días hábiles',
    image: '/services/landing-qr.webp', imageAlt: 'Diseño conceptual de una landing de Duggled junto a tarjetas QR.',
    includes: ['Landing responsive de hasta 6 secciones, con formulario o WhatsApp y SEO básico.', 'Diseño de tarjeta frente y dorso con QR. Archivos para imprenta y versión digital.', 'Adaptación de textos y dos rondas de ajustes.'],
    exclusions: 'Impresión, dominio, hosting y producción de fotos o videos se cotizan aparte.',
  },
  {
    id: 'menu-qr', label: 'Menú online + QR', category: 'GASTRONOMÍA',
    title: ['Tu carta, siempre', 'sobre la mesa.'],
    description: 'Un menú fácil de consultar desde el celular. Tus platos, fotos y precios, disponibles con un escaneo y listos para actualizar.',
    price: '290', unit: 'por proyecto', deadline: '5–7 días hábiles',
    image: '/services/menu-qr.webp', imageAlt: 'Concepto de menú gastronómico en un celular y un soporte QR para mesa.',
    includes: ['Menú responsive para una sucursal, con hasta 50 productos.', 'Edición de productos y precios, guía de uso y contacto por WhatsApp.', 'QR y diseño de soporte para mesa o mostrador.'],
    exclusions: 'Impresión, fotos, dominio y hosting aparte. No incluye cobro online, gestión de mesas ni comandas.',
  },
  {
    id: 'web-agenda', label: 'Web + agenda', category: 'TURNOS ONLINE',
    title: ['Menos ida y vuelta.', 'Más tiempo para vos.'],
    description: 'Presentá tus servicios y dejá que tus clientes elijan un horario disponible. La reserva y la confirmación llegan sin coordinar cada turno por mensaje.',
    price: '690', unit: 'por proyecto', deadline: '10–15 días hábiles',
    image: '/services/web-agenda.webp', imageAlt: 'Concepto de sitio con calendario de reservas y confirmación en el celular.',
    includes: ['Web de hasta 5 secciones y agenda para un profesional.', 'Disponibilidad, duración de turnos y confirmación por email.', 'Configuración, pruebas y capacitación breve.'],
    exclusions: 'Dominio, hosting y suscripción de agenda aparte. Múltiples profesionales, señas y recordatorios por WhatsApp se cotizan como ampliaciones.',
  },
  {
    id: 'web-corporativa', label: 'Web corporativa', category: 'EMPRESAS',
    title: ['Tu empresa.', 'En su mejor versión.'],
    description: 'Una presencia profesional que explica quién sos, qué hacés y por qué elegirte. Diseño con identidad, información clara y un camino directo al contacto.',
    price: '890', unit: 'por proyecto', deadline: '10–15 días hábiles',
    image: '/services/web-corporativa.webp', imageAlt: 'Diseño conceptual de un sitio corporativo adaptado a computadora y celular.',
    includes: ['Hasta 5 páginas con diseño responsive y animaciones.', 'Adaptación de contenidos, SEO básico y medición inicial.', 'Formulario, WhatsApp, dos rondas de ajustes y puesta online.'],
    exclusions: 'Identidad de marca, dominio, hosting, idiomas y funcionalidades a medida se cotizan aparte.',
  },
  {
    id: 'tienda-online', label: 'Tienda online', category: 'ECOMMERCE',
    title: ['De mirar tu catálogo', 'a hacer un pedido.'],
    description: 'Tu tienda con una experiencia de compra cuidada. Productos, medios de pago y opciones de envío conectados en un mismo lugar.',
    price: '1.190', unit: 'por proyecto', deadline: '15–20 días hábiles',
    image: '/services/tienda-online.webp', imageAlt: 'Concepto de tienda de productos con carrito móvil y caja de envío.',
    includes: ['Configuración y diseño en una plataforma ecommerce existente.', 'Carga inicial de hasta 30 productos con material provisto.', 'Pagos, envíos compatibles, prueba de compra y capacitación.'],
    exclusions: 'Abono de plataforma, dominio, comisiones, fotos y carga adicional aparte. No incluye una plataforma propia ni integraciones con ERP o marketplaces.',
  },
  {
    id: 'mercado-libre', label: 'Mercado Libre', category: 'OPTIMIZACIÓN DE PUBLICACIONES',
    title: ['Mejor presentados.', 'Más fáciles de elegir.'],
    description: 'Revisamos tus publicaciones de Mercado Libre para que la información de tus productos sea más clara, completa y útil al comprar.',
    price: '190', unit: 'pack de hasta 10 publicaciones', deadline: '3–5 días hábiles',
    image: '/services/mercado-libre.webp', imageAlt: 'Concepto de optimización de una publicación y de la fotografía de un producto.',
    includes: ['Diagnóstico de hasta 10 publicaciones, títulos, atributos y descripciones.', 'Mejora básica de una foto provista por publicación.', 'Textos e imágenes listos para cargar, checklist y una ronda de ajustes.'],
    exclusions: 'Servicio de optimización, no una app por suscripción. No incluye fotografía, gestión de cuenta ni pauta. No garantiza posicionamiento ni ventas.',
  },
  {
    id: 'meta-ads', label: 'Meta Ads', category: 'FACEBOOK + INSTAGRAM',
    title: ['Tu marca,', 'en la conversación.'],
    description: 'Planificamos, configuramos y optimizamos tus campañas en Facebook e Instagram según tus objetivos y el presupuesto disponible.',
    price: '300', unit: 'por mes', deadline: '3–5 días hábiles', setup: '150',
    image: '/services/meta-ads.webp', imageAlt: 'Concepto de anuncio en redes sociales y panel de gestión de campañas.',
    includes: ['Una cuenta publicitaria y hasta 3 campañas activas.', 'Públicos, presupuesto, textos y uso de piezas provistas.', 'Medición básica, revisión semanal e informe mensual.'],
    exclusions: 'Inversión en anuncios, piezas nuevas, videos y respuesta a consultas aparte. La activación depende de los accesos y la revisión de Meta.',
  },
  {
    id: 'google-ads', label: 'Google Ads', category: 'CAMPAÑAS DE BÚSQUEDA',
    title: ['Cuando te buscan,', 'hacete encontrar.'],
    description: 'Conectamos tu negocio con personas que están buscando lo que ofrecés. Campañas de búsqueda con seguimiento y ajustes periódicos.',
    price: '350', unit: 'por mes', deadline: '5–7 días hábiles', setup: '180',
    image: '/services/google-ads.webp', imageAlt: 'Concepto de anuncio de búsqueda con una lupa naranja.',
    includes: ['Una cuenta y hasta 3 campañas de búsqueda.', 'Palabras clave, términos negativos, anuncios y conversiones básicas.', 'Revisión semanal de consultas, pujas y presupuesto; informe mensual.'],
    exclusions: 'Inversión publicitaria y landing page aparte. Shopping, YouTube, Display y feeds se cotizan según alcance. Activación sujeta a revisión de Google.',
  },
];
