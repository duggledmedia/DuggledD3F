import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Rocket, 
  Phone,
  Star,
  ExternalLink,
  Quote,
  ChevronRight,
  Zap
} from 'lucide-react';
import { NeuButton, NeuCard } from './components/NeumorphicElements';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ServiceCategory, PortfolioItem, Testimonial } from './types';

function App() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Data Structure for Services
  const servicesData: ServiceCategory[] = [
    {
      id: "web-dev",
      categoryTitle: "1. Diseño & Desarrollo Web",
      ctaText: "Cotizar Web",
      items: [
        { title: "Landing Page / One Page", description: "Web de una sola página para captar clientes o leads.", price: "USD 280 – USD 450" },
        { title: "Web Institucional", description: "Sitio profesional para empresa o marca. Responsive + formulario (5-10 secciones).", price: "USD 450 – USD 800" },
        { title: "Ecommerce Básico", description: "Tienda online con pasarela de pagos y gestión de hasta 50 productos.", price: "USD 800 – USD 2.000" },
        { title: "Web a Medida / Ecommerce Avanzado", description: "Integraciones, funcionalidades especiales, CRM, API.", price: "USD 2.000 – USD 4.500+" },
        { title: "Mantenimiento Web Mensual", description: "Actualizaciones, backups y soporte.", price: "USD 40 – USD 100 / mes" }
      ]
    },
    {
      id: "seo",
      categoryTitle: "2. SEO – Posicionamiento Web",
      ctaText: "Mejorar Posicionamiento",
      items: [
        { title: "SEO Básico (On-page + Local)", description: "Optimización de tu sitio para búsquedas locales.", price: "USD 300 – USD 600 / mes" },
        { title: "SEO Profesional Completo", description: "Estrategia, palabras clave + contenidos + mejoras técnicas.", price: "USD 600 – USD 900 / mes" },
        { title: "Auditoría SEO", description: "Análisis completo de tu web con recomendaciones.", price: "USD 150 – USD 400 (único pago)" }
      ]
    },
    {
      id: "paid-media",
      categoryTitle: "3. Paid Media – Publicidad Digital",
      ctaText: "Lanzar Campaña",
      items: [
        { title: "Configuración Inicial (Google & Meta)", description: "Setup estratégico + segmentación + KPIs.", price: "USD 250 – USD 450 (único pago)" },
        { title: "Gestión Mensual de Ads", description: "Optimización continua + reportes.", price: "USD 350 – USD 800 / mes" }
      ]
    },
    {
      id: "social-media",
      categoryTitle: "4. Social Media & Community Management",
      ctaText: "Gestionar Redes",
      items: [
        { title: "Gestión Mensual Básica", description: "4–8 publicaciones (Post + historias + redacción).", price: "USD 200 – USD 350 / mes" },
        { title: "Plan Completo (Incluye Reels)", description: "Posts + stories + reels + estrategia de contenidos.", price: "USD 350 – USD 600 / mes" },
        { title: "Gestión Premium (Multi-plataforma)", description: "Instagram + Meta + TikTok + reportes avanzados.", price: "USD 600 – USD 1.200 / mes" }
      ]
    },
    {
      id: "content",
      categoryTitle: "5. Marketing de Contenidos",
      ctaText: "Crear Contenido",
      items: [
        { title: "Artículos / Blog SEO", description: "Texto profesional optimizado para captar tráfico.", price: "USD 30 – USD 80 / artículo" },
        { title: "Pack Mensual de Artículos", description: "Serie de 4 contenidos mensuales.", price: "USD 100 – USD 280 / mes" },
        { title: "Email Marketing", description: "Campañas de newsletter o automatizaciones.", price: "USD 60 – USD 150 / campaña" }
      ]
    },
    {
      id: "branding",
      categoryTitle: "6. Diseño Gráfico & Branding",
      ctaText: "Diseñar Marca",
      items: [
        { title: "Logo + Paleta + Guía", description: "Identidad visual completa.", price: "USD 150 – USD 450" },
        { title: "Material Gráfico para Redes", description: "Piezas individuales de alto impacto.", price: "USD 20 – USD 60 / pieza" },
        { title: "Guiones para Videos", description: "Estructuras persuasivas para tus videos.", price: "USD 30 – USD 100 / guion" }
      ]
    },
    {
      id: "packs",
      categoryTitle: "7. Paquetes Todo-En-Uno",
      ctaText: "Elegir Pack",
      highlight: true,
      items: [
        { title: "Pack Presencia Digital Starter", description: "Landing Page + SEO básico + 8 publicaciones/mes.", price: "USD 800 – USD 1.100" },
        { title: "Pack Crecimiento Social & Ads", description: "12 publicaciones + Gestión de Ads + Reportes mensuales.", price: "USD 1.200 – USD 1.800" },
        { title: "Pack Ecommerce Full", description: "Tienda online + SEO + Community Management + Ads.", price: "USD 2.500 – USD 4.000" },
        { title: "Pack Premium Corporativo", description: "Web profesional + Branding + SEO + Ads + Social Media.", price: "USD 2.000 – USD 3.500" }
      ]
    }
  ];

  const portfolioItems: PortfolioItem[] = [
    { 
      title: "GreenLife Market", 
      category: "E-Commerce", 
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      title: "Estudio Jurídico AL", 
      category: "Institucional", 
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      title: "Burger House", 
      category: "Landing Page", 
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800&auto=format&fit=crop" 
    },
  ];

  const testimonials: Testimonial[] = [
    { name: "Carlos M.", company: "TechSolutions", text: "La automatización del chat nos ahorró horas de atención al cliente. Increíble.", stars: 5 },
    { name: "Ana Laura G.", company: "Emprendedora", text: "Mi sitio web carga rapidísimo y el diseño neumórfico llamó mucho la atención.", stars: 5 },
    { name: "Roberto F.", company: "Consultora RF", text: "Excelente relación precio-calidad. El plan Standard fue perfecto para nosotros.", stars: 4 },
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-neu-accent selection:text-white pb-20 overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-neu-base/80 backdrop-blur-md shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src="https://xnvaqwwcfmpybhodcipl.supabase.co/storage/v1/object/public/DUGW%202026/Ltipo%20Dbg.png" 
              alt="Duggled Logo" 
              className="h-10 md:h-12 w-auto object-contain drop-shadow-md"
            />
          </div>
          <div className="hidden lg:flex gap-6">
            <a href="#services" className="text-gray-600 font-medium hover:text-neu-accent transition-colors">Servicios</a>
            <a href="#portfolio" className="text-gray-600 font-medium hover:text-neu-accent transition-colors">Portafolio</a>
            <a href="#testimonials" className="text-gray-600 font-medium hover:text-neu-accent transition-colors">Clientes</a>
          </div>
          <NeuButton href="https://wa.me/5491133510232" primary className="text-sm">
            <Phone size={16} /> <span className="hidden sm:inline">Contactar</span>
          </NeuButton>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6">
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-20 left-10 w-40 h-40 md:w-64 md:h-64 bg-neu-base rounded-full shadow-neu-flat opacity-50 blur-sm animate-pulse" />
        <div className="absolute bottom-20 right-10 w-60 h-60 md:w-96 md:h-96 bg-neu-base rounded-full shadow-neu-pressed opacity-30" />

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div style={{ y: y1, opacity }}>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-2 rounded-full bg-neu-base shadow-neu-pressed mb-6">
                <span className="text-neu-accent font-bold text-xs md:text-sm tracking-widest uppercase flex items-center gap-2">
                  <Zap size={14} className="fill-neu-accent" />
                  Potencia Digital 360°
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-gray-700 leading-tight mb-6">
                Diseño Web que <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neu-accent to-orange-400">Vende.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 mb-8 max-w-lg">
                Renovamos tu marca con estrategias persuasivas, diseño neumórfico y automatizaciones inteligentes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <NeuButton primary href="#services" className="w-full sm:w-auto">
                  Ver Servicios
                </NeuButton>
                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-neu-base shadow-neu-flat w-full sm:w-auto justify-center sm:justify-start">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                  <span className="font-bold text-gray-600">Desde USD 40</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div style={{ y: y2 }} className="hidden md:flex justify-center relative">
             <div className="relative w-80 h-80 lg:w-96 lg:h-96 aspect-square">
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 right-0 w-32 h-32 lg:w-48 lg:h-48 bg-neu-base rounded-3xl shadow-neu-flat flex items-center justify-center z-20"
                >
                  <Rocket size={48} className="text-neu-accent lg:w-16 lg:h-16" />
                </motion.div>

                <motion.div 
                   animate={{ y: [0, 30, 0] }}
                   transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                   className="absolute bottom-0 left-0 w-24 h-24 lg:w-40 lg:h-40 bg-neu-base rounded-full shadow-neu-pressed flex items-center justify-center z-10"
                >
                   <Star size={32} className="text-gray-400 lg:w-12 lg:h-12 fill-gray-400" />
                </motion.div>

                <motion.div
                   className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 lg:w-80 lg:h-80 bg-neu-base rounded-[3rem] shadow-neu-flat border-8 border-neu-base flex items-center justify-center overflow-hidden p-6"
                >
                   <img 
                      src="https://xnvaqwwcfmpybhodcipl.supabase.co/storage/v1/object/public/DUGW%202026/Ltipo%20Dbg.png" 
                      alt="Duggled Logo" 
                      className="w-full h-auto opacity-80"
                   />
                </motion.div>
             </div>
          </motion.div>
        </div>
      </header>

      {/* NEW DETAILED SERVICES SECTION */}
      <section id="services" className="py-24 px-6 relative bg-neu-base">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-700 mb-6">Nuestros Servicios</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Soluciones integrales para digitalizar y escalar tu negocio. Elige la categoría que necesitas.
            </p>
          </div>

          <div className="space-y-12">
            {servicesData.map((category, idx) => (
              <div key={category.id}>
                <NeuCard 
                  className={`relative p-8 md:p-10 ${
                    category.highlight 
                      ? 'border-2 border-neu-accent/20 bg-gradient-to-br from-neu-base to-orange-50/50' 
                      : ''
                  }`}
                  delay={idx * 0.1}
                >
                  {category.highlight && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 md:left-10 md:translate-x-0 bg-neu-accent text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg z-10 w-max uppercase tracking-wider">
                      Más Vendido
                    </div>
                  )}

                  <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
                    {/* Header of Category */}
                    <div className="lg:w-1/3 space-y-4">
                      <h3 className="text-2xl md:text-3xl font-black text-gray-700 leading-tight">
                        {category.categoryTitle}
                      </h3>
                      <div className="w-16 h-1 bg-neu-accent rounded-full"></div>
                      <p className="text-gray-500 text-sm">
                        Soluciones profesionales adaptadas al mercado actual. Precios competitivos y calidad garantizada.
                      </p>
                      <div className="pt-4">
                         <NeuButton 
                           primary 
                           className="w-full lg:w-auto text-sm" 
                           href={`https://wa.me/5491133510232?text=Hola,%20me%20interesa%20saber%20mas%20sobre%20${category.categoryTitle}`}
                         >
                           {category.ctaText} <ChevronRight size={16} />
                         </NeuButton>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="lg:w-2/3 grid gap-4">
                      {category.items.map((item, itemIdx) => (
                        <div 
                          key={itemIdx} 
                          className="bg-neu-base shadow-neu-pressed rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/50"
                        >
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-700 text-lg mb-1">{item.title}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                          </div>
                          <div className="text-right md:min-w-[140px]">
                            <span className="block text-neu-accent font-bold text-lg">{item.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </NeuCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-6 bg-neu-base relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-black text-gray-700 mb-4">Trabajos Recientes</h2>
             <p className="text-gray-500">La calidad que tu marca merece.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <NeuCard key={index} className="group overflow-hidden cursor-pointer h-full flex flex-col p-0 pb-6">
                {/* Browser Mockup Header */}
                <div className="bg-gray-200 px-4 py-3 flex gap-2 border-b border-gray-300/50">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                
                <div className="h-56 overflow-hidden mb-6 relative border-b border-gray-100">
                   <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                         <ExternalLink className="text-white" size={32} />
                      </div>
                   </div>
                </div>
                <div className="px-8 flex justify-between items-end flex-1">
                  <div>
                    <h4 className="text-xl font-bold text-gray-700 mb-1">{item.title}</h4>
                    <span className="inline-block px-3 py-1 bg-neu-base shadow-neu-pressed rounded-full text-xs text-neu-accent font-bold uppercase tracking-wide">
                        {item.category}
                    </span>
                  </div>
                </div>
              </NeuCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-black text-gray-700 mb-4">Clientes Satisfechos</h2>
             <p className="text-gray-500">Ellos ya despegaron con Duggled.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             {testimonials.map((t, i) => (
               <NeuCard key={i} className="flex flex-col h-full" delay={i * 0.2}>
                  <Quote size={32} className="text-neu-accent/20 mb-4" />
                  <p className="text-gray-600 italic mb-6 flex-1">"{t.text}"</p>
                  <div className="flex items-center justify-between border-t border-gray-300/30 pt-4">
                     <div>
                        <h4 className="font-bold text-gray-700 text-sm">{t.name}</h4>
                        <span className="text-xs text-gray-500">{t.company}</span>
                     </div>
                     <div className="flex gap-1">
                        {[...Array(t.stars)].map((_, si) => (
                           <Star key={si} size={14} className="fill-yellow-400 text-yellow-400" />
                        ))}
                     </div>
                  </div>
               </NeuCard>
             ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-gray-700 mb-8">
            ¿Listo para despegar?
          </h2>
          <div className="flex justify-center">
             <NeuButton primary className="text-lg md:text-xl px-20 py-5 w-full sm:w-auto min-w-[300px]" href="https://wa.me/5491133510232">
                Agendar Consultoría
             </NeuButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-400 text-sm bg-neu-base/50">
        <div className="flex justify-center mb-4">
            <img 
              src="https://xnvaqwwcfmpybhodcipl.supabase.co/storage/v1/object/public/DUGW%202026/Ltipo%20Dbg.png" 
              alt="Duggled Logo Footer" 
              className="h-8 w-auto opacity-50 grayscale"
            />
        </div>
        <p>© {new Date().getFullYear()} Duggled. Todos los derechos reservados.</p>
        <p className="mt-2">Diseño Web, Marketing & Automatización</p>
      </footer>

      <FloatingWhatsApp />
    </div>
  );
}

export default App;