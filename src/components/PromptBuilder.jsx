import React, { useState } from 'react';
import { Eye, Download, Copy, Home, Users, Briefcase, Images, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { toast } from '../hooks/use-toast';
import { colorPalettes } from '../mock/mockData';
import PromptPreview from './PromptPreview';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ServicesPage from './ServicesPage';
import GalleryPage from './GalleryPage';
import ContactPage from './ContactPage';

const PromptBuilder = () => {
  const [projectName, setProjectName] = useState('');
  const [websiteType, setWebsiteType] = useState('');
  const [selectedPalette, setSelectedPalette] = useState(colorPalettes[0]);
  const [customColors, setCustomColors] = useState({
    primary: '#2563eb',
    secondary: '#7c3aed',
    accent: '#f59e0b',
    background: '#ffffff',
    text: '#1f2937'
  });
  const [useCustomColors, setUseCustomColors] = useState(false);
  const [languages, setLanguages] = useState('Español, Inglés');
  const [selectedPages, setSelectedPages] = useState(['home']);
  const [pageData, setPageData] = useState({
    home: {},
    about: {},
    services: {},
    gallery: {},
    contact: {}
  });
  const [showPreview, setShowPreview] = useState(false);
  const [floatingButtons, setFloatingButtons] = useState({
    whatsapp: { enabled: false, number: '', message: 'Hola, me gustaría obtener más información' },
    facebook: { enabled: false, url: '' },
    instagram: { enabled: false, url: '' },
    tiktok: { enabled: false, url: '' },
    twitter: { enabled: false, url: '' },
    youtube: { enabled: false, url: '' }
  });

  const pageTemplates = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'about', name: 'About Us', icon: Users },
    { id: 'services', name: 'Services', icon: Briefcase },
    { id: 'gallery', name: 'Gallery', icon: Images },
    { id: 'contact', name: 'Contact', icon: Mail }
  ];

  const updatePageData = (pageId, sectionId, field, value) => {
    setPageData(prev => ({
      ...prev,
      [pageId]: {
        ...prev[pageId],
        [sectionId]: {
          ...prev[pageId]?.[sectionId],
          [field]: value
        }
      }
    }));
  };

  const togglePage = (pageId) => {
    setSelectedPages(prev => 
      prev.includes(pageId) 
        ? prev.filter(p => p !== pageId)
        : [...prev, pageId]
    );
  };

  const generatePrompt = () => {
    const colors = useCustomColors ? customColors : selectedPalette.colors;
    
    return {
      projectName,
      websiteType,
      colorPalette: colors,
      languages: languages.split(',').map(l => l.trim()),
      floatingButtons: floatingButtons,
      pages: selectedPages.map(pageId => ({
        name: pageTemplates.find(p => p.id === pageId)?.name,
        data: pageData[pageId]
      })),
      stack: {
        css: 'Tailwind CSS (CDN)',
        animations: 'GSAP, AOS',
        carousel: 'Swiper.js',
        lightbox: 'GLightbox',
        smoothScroll: 'Lenis',
        icons: 'Font Awesome'
      }
    };
  };

  const downloadPrompt = (format) => {
    const data = generatePrompt();
    
    if (!projectName) {
      toast({
        title: 'Error',
        description: 'Por favor ingresa un nombre de proyecto',
        variant: 'destructive'
      });
      return;
    }

    let content = '';
    let filename = '';
    let mimeType = '';

    if (format === 'md') {
      content = generateMarkdown(data);
      filename = `${projectName.replace(/\s+/g, '-')}-prompt.md`;
      mimeType = 'text/markdown';
    } else if (format === 'json') {
      content = JSON.stringify(data, null, 2);
      filename = `${projectName.replace(/\s+/g, '-')}-prompt.json`;
      mimeType = 'application/json';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Éxito',
      description: `Prompt descargado como ${filename}`
    });
  };

  const generateMarkdown = (data) => {
    let md = `# Prompt para Crear: ${data.projectName}\n\n`;
    md += `> Actúa como un **arquitecto de producto web premium** (diseñador UX/UI + redactor + front-end dev) capaz de entregar **código HTML/CSS/JS puro** listo para producción. **Vas a generar y entregarás todo en un único bloque organizado según el archivo html a utilizar con sus correspondientes css y js.**\n\n`;
    
    // FASE 1: Stack y CDNs
    md += `## FASE 1) Stack y CDNs\n\n`;
    md += `### Lista exacta de \`<link>\` / \`<script>\` a incluir:\n\n`;
    md += `- **Tailwind CSS** via CDN:\n`;
    md += `  \`\`\`html\n  <script src="https://cdn.tailwindcss.com"></script>\n  \`\`\`\n\n`;
    md += `- **GSAP** (animaciones):\n`;
    md += `  \`\`\`html\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>\n`;
    md += `  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>\n  \`\`\`\n\n`;
    md += `- **Swiper.js** (carrusel):\n`;
    md += `  \`\`\`html\n  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">\n`;
    md += `  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>\n  \`\`\`\n\n`;
    md += `- **AOS** (Animate On Scroll):\n`;
    md += `  \`\`\`html\n  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">\n`;
    md += `  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>\n  \`\`\`\n\n`;
    md += `- **GLightbox** (lightbox para galería):\n`;
    md += `  \`\`\`html\n  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css">\n`;
    md += `  <script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>\n  \`\`\`\n\n`;
    md += `- **Lenis** (smooth scroll):\n`;
    md += `  \`\`\`html\n  <script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js"></script>\n  \`\`\`\n\n`;
    md += `- **Font Awesome** (iconos):\n`;
    md += `  \`\`\`html\n  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">\n  \`\`\`\n\n`;
    md += `### Meta Tags HEAD:\n`;
    md += `\`\`\`html\n<head>\n`;
    md += `  <meta charset="UTF-8">\n`;
    md += `  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n`;
    md += `  <meta name="description" content="Descripción del sitio">\n`;
    md += `  <meta property="og:title" content="${data.projectName}">\n`;
    md += `  <meta property="og:description" content="Descripción del sitio">\n`;
    md += `  <meta property="og:image" content="URL de imagen principal">\n`;
    md += `  <title>${data.projectName}</title>\n`;
    md += `</head>\n\`\`\`\n\n`;
    
    // FASE 2: Estructura de archivos
    md += `## FASE 2) Estructura de Archivos\n\n`;
    md += `\`\`\`\n`;
    md += `proyecto/\n`;
    md += `├── index.html\n`;
    if (data.pages.some(p => p.name === 'About Us')) md += `├── about.html\n`;
    if (data.pages.some(p => p.name === 'Services')) md += `├── services.html\n`;
    if (data.pages.some(p => p.name === 'Gallery')) md += `├── gallery.html\n`;
    if (data.pages.some(p => p.name === 'Contact')) md += `├── contact.html\n`;
    md += `├── assets/\n`;
    md += `│   ├── css/\n`;
    md += `│   │   └── custom.css\n`;
    md += `│   ├── js/\n`;
    md += `│   │   └── main.js\n`;
    md += `│   └── img/\n`;
    md += `│       └── (todas las imágenes)\n`;
    md += `\`\`\`\n\n`;
    
    // FASE 3: Paleta de Colores
    md += `## FASE 3) Paleta de Colores del Proyecto\n\n`;
    md += `Utilizar esta paleta en todo el sitio:\n\n`;
    md += `- **Primary:** ${data.colorPalette.primary}\n`;
    md += `- **Secondary:** ${data.colorPalette.secondary}\n`;
    md += `- **Accent:** ${data.colorPalette.accent}\n`;
    md += `- **Background:** ${data.colorPalette.background}\n`;
    md += `- **Text:** ${data.colorPalette.text}\n\n`;
    md += `### Configuración CSS:\n`;
    md += `\`\`\`css\n`;
    md += `:root {\n`;
    md += `  --color-primary: ${data.colorPalette.primary};\n`;
    md += `  --color-secondary: ${data.colorPalette.secondary};\n`;
    md += `  --color-accent: ${data.colorPalette.accent};\n`;
    md += `  --color-background: ${data.colorPalette.background};\n`;
    md += `  --color-text: ${data.colorPalette.text};\n`;
    md += `}\n\`\`\`\n\n`;
    
    // FASE 4: Idiomas
    md += `## FASE 4) Idiomas del Contenido\n\n`;
    md += `Todo el contenido debe estar disponible en: **${data.languages.join(', ')}**\n\n`;
    
    // FASE 5: PÁGINAS Y CONTENIDO
    md += `## FASE 5) PÁGINAS Y CONTENIDO DETALLADO\n\n`;
    
    data.pages.forEach(page => {
      md += `### ${page.name.toUpperCase()}\n\n`;
      
      if (page.name === 'Home') {
        md += `**Tipo:** Landing Page completa con 10 secciones\n\n`;
      } else {
        md += `**Tipo:** Página secundaria con 10 secciones específicas\n\n`;
      }
      
      let sectionNum = 1;
      Object.entries(page.data).forEach(([sectionId, fields]) => {
        if (Object.keys(fields).length > 0) {
          md += `#### Sección ${sectionNum}: ${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}\n\n`;
          
          Object.entries(fields).forEach(([field, value]) => {
            if (value) {
              const fieldName = field.replace(/([A-Z])/g, ' $1').replace(/([0-9])/g, ' $1').trim();
              md += `**${fieldName}:** ${value}\n\n`;
            }
          });
          
          md += `\n`;
          sectionNum++;
        }
      });
      
      md += `\n---\n\n`;
    });
    
    // FASE 6: Snippets de código
    md += `## FASE 6) Snippets de Código e Inicialización\n\n`;
    md += `### Header con Navegación Responsive\n\n`;
    md += `\`\`\`html\n`;
    md += `<header class="fixed w-full top-0 z-50 bg-white shadow-md">\n`;
    md += `  <nav class="container mx-auto px-4 py-4 flex justify-between items-center">\n`;
    md += `    <div class="text-2xl font-bold" style="color: ${data.colorPalette.primary}">${data.projectName}</div>\n`;
    md += `    <button id="menuToggle" class="md:hidden">\n`;
    md += `      <i class="fas fa-bars text-2xl"></i>\n`;
    md += `    </button>\n`;
    md += `    <ul id="menu" class="hidden md:flex gap-6">\n`;
    data.pages.forEach(page => {
      const fileName = page.name === 'Home' ? 'index.html' : page.name.toLowerCase().replace(/\\s+/g, '') + '.html';
      md += `      <li><a href="${fileName}" class="hover:opacity-70">${page.name}</a></li>\n`;
    });
    md += `    </ul>\n`;
    md += `  </nav>\n`;
    md += `</header>\n`;
    md += `\`\`\`\n\n`;
    
    md += `### Botones Flotantes (Redes Sociales)\n\n`;
    const enabledButtons = Object.entries(data.floatingButtons).filter(([_, btn]) => btn.enabled);
    if (enabledButtons.length > 0) {
      md += `Incluir botones flotantes fijos en todas las páginas:\n\n`;
      enabledButtons.forEach(([platform, config]) => {
        if (platform === 'whatsapp') {
          md += `- **WhatsApp**: ${config.number} - Mensaje: "${config.message}"\n`;
        } else {
          md += `- **${platform.charAt(0).toUpperCase() + platform.slice(1)}**: ${config.url}\n`;
        }
      });
      
      md += `\n\`\`\`html\n`;
      md += `<div class="fixed bottom-6 right-6 flex flex-col gap-3 z-50">\n`;
      enabledButtons.forEach(([platform, config]) => {
        const icons = {
          whatsapp: { icon: 'fa-whatsapp', color: '#25D366' },
          facebook: { icon: 'fa-facebook-f', color: '#1877F2' },
          instagram: { icon: 'fa-instagram', color: '#E4405F' },
          tiktok: { icon: 'fa-tiktok', color: '#000000' },
          twitter: { icon: 'fa-twitter', color: '#1DA1F2' },
          youtube: { icon: 'fa-youtube', color: '#FF0000' }
        };
        const { icon, color } = icons[platform];
        let href = '';
        if (platform === 'whatsapp') {
          href = `https://wa.me/${config.number}?text=${encodeURIComponent(config.message)}`;
        } else {
          href = config.url;
        }
        md += `  <a href="${href}" target="_blank" class="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform" style="background: ${color}">\n`;
        md += `    <i class="fab ${icon} text-white text-2xl"></i>\n`;
        md += `  </a>\n`;
      });
      md += `</div>\n\`\`\`\n\n`;
    } else {
      md += `No se configuraron botones flotantes.\n\n`;
    }
    
    md += `### Inicialización JavaScript\n\n`;
    md += `\`\`\`javascript\n`;
    md += `// AOS Init\n`;
    md += `AOS.init({\n`;
    md += `  duration: 1000,\n`;
    md += `  once: true\n`;
    md += `});\n\n`;
    md += `// Lenis Smooth Scroll\n`;
    md += `const lenis = new Lenis();\n`;
    md += `function raf(time) {\n`;
    md += `  lenis.raf(time);\n`;
    md += `  requestAnimationFrame(raf);\n`;
    md += `}\n`;
    md += `requestAnimationFrame(raf);\n\n`;
    md += `// Swiper Init\n`;
    md += `const swiper = new Swiper('.swiper', {\n`;
    md += `  loop: true,\n`;
    md += `  autoplay: { delay: 3000 },\n`;
    md += `  pagination: { el: '.swiper-pagination' }\n`;
    md += `});\n\n`;
    md += `// GLightbox Init\n`;
    md += `const lightbox = GLightbox();\n\n`;
    md += `// GSAP ScrollTrigger\n`;
    md += `gsap.registerPlugin(ScrollTrigger);\n`;
    md += `gsap.from('.fade-in', {\n`;
    md += `  opacity: 0,\n`;
    md += `  y: 50,\n`;
    md += `  scrollTrigger: {\n`;
    md += `    trigger: '.fade-in',\n`;
    md += `    start: 'top 80%'\n`;
    md += `  }\n`;
    md += `});\n`;
    md += `\`\`\`\n\n`;
    
    md += `### Formulario de Contacto con Validación\n\n`;
    md += `\`\`\`html\n`;
    md += `<form id="contactForm" class="space-y-4">\n`;
    md += `  <input type="text" name="name" placeholder="Nombre" required class="w-full p-3 border rounded">\n`;
    md += `  <input type="email" name="email" placeholder="Email" required class="w-full p-3 border rounded">\n`;
    md += `  <textarea name="message" placeholder="Mensaje" required class="w-full p-3 border rounded"></textarea>\n`;
    md += `  <button type="submit" class="px-6 py-3 rounded" style="background: ${data.colorPalette.primary}; color: white">Enviar</button>\n`;
    md += `</form>\n\n`;
    md += `<script>\n`;
    md += `document.getElementById('contactForm').addEventListener('submit', (e) => {\n`;
    md += `  e.preventDefault();\n`;
    md += `  // Aquí va la lógica de envío\n`;
    md += `  alert('Formulario enviado con éxito');\n`;
    md += `});\n`;
    md += `</script>\n`;
    md += `\`\`\`\n\n`;
    
    md += `---\n\n`;
    md += `## INSTRUCCIONES FINALES\n\n`;
    md += `1. Crear todas las páginas HTML con la estructura completa\n`;
    md += `2. Implementar todas las secciones con el contenido proporcionado\n`;
    md += `3. Usar las imágenes sugeridas (nombres de archivo proporcionados)\n`;
    md += `4. Aplicar la paleta de colores en todos los elementos\n`;
    md += `5. Implementar todas las animaciones e interacciones mencionadas\n`;
    md += `6. Asegurar que el sitio sea 100% responsivo\n`;
    md += `7. Incluir menú hamburguesa funcional en móvil\n`;
    md += `8. Optimizar para SEO con meta tags apropiados\n`;
    md += `9. Código limpio, semántico y comentado\n`;
    md += `10. Listo para producción\n\n`;

    return md;
  };

  const copyToClipboard = () => {
    const data = generatePrompt();
    const md = generateMarkdown(data);
    navigator.clipboard.writeText(md);
    toast({
      title: 'Copiado',
      description: 'Prompt copiado al portapapeles'
    });
  };

  const fillWithExample = () => {
    setProjectName('Sitio Web Corporativo Premium');
    setWebsiteType('Corporativo');
    setLanguages('Español, Inglés');
    setSelectedPages(['home', 'about', 'services', 'gallery', 'contact']);
    
    // Configurar botones flotantes de ejemplo
    setFloatingButtons({
      whatsapp: { enabled: true, number: '34912345678', message: 'Hola, me gustaría obtener más información' },
      facebook: { enabled: true, url: 'https://facebook.com/empresapremium' },
      instagram: { enabled: true, url: 'https://instagram.com/empresapremium' },
      tiktok: { enabled: false, url: '' },
      twitter: { enabled: false, url: '' },
      youtube: { enabled: true, url: 'https://youtube.com/@empresapremium' }
    });
    
    // Datos de ejemplo para Home
    const homeData = {
      hero: {
        titulo: 'Transformamos Tu Negocio Digital',
        subtitulo: 'Soluciones innovadoras para empresas del futuro',
        textoCTA: 'Comenzar Ahora',
        imagenes: 'hero-bg.jpg, hero-overlay.png'
      },
      features: {
        titulo: 'Nuestros Servicios',
        descripcion: 'Ofrecemos soluciones integrales para tu empresa',
        feature1: 'Desarrollo Web Personalizado',
        feature2: 'Marketing Digital Estratégico',
        feature3: 'Consultoría Tecnológica',
        imagenes: 'feature1.jpg, feature2.jpg, feature3.jpg'
      },
      benefits: {
        titulo: 'Por Qué Elegirnos',
        descripcion: 'Beneficios que marcan la diferencia',
        beneficio1: 'Más de 10 años de experiencia',
        beneficio2: 'Equipo de profesionales certificados',
        beneficio3: 'Soporte 24/7 personalizado',
        imagenes: 'benefits-bg.jpg'
      },
      howItWorks: {
        titulo: 'Cómo Trabajamos',
        paso1: 'Análisis inicial y planificación estratégica',
        paso2: 'Desarrollo e implementación',
        paso3: 'Lanzamiento y optimización continua',
        imagenes: 'process-step1.svg, process-step2.svg, process-step3.svg'
      },
      testimonials: {
        titulo: 'Lo Que Dicen Nuestros Clientes',
        testimonio1: 'Excelente servicio, superaron nuestras expectativas - Juan Pérez, CEO TechCorp',
        testimonio2: 'Profesionales de primer nivel, altamente recomendados - María García, Directora Marketing',
        testimonio3: 'Resultados increíbles en tiempo récord - Carlos López, Fundador StartupXYZ',
        imagenes: 'client1.jpg, client2.jpg, client3.jpg'
      },
      stats: {
        stat1Numero: '500+',
        stat1Texto: 'Proyectos Completados',
        stat2Numero: '98%',
        stat2Texto: 'Clientes Satisfechos',
        stat3Numero: '15',
        stat3Texto: 'Años de Experiencia'
      },
      portfolio: {
        titulo: 'Proyectos Destacados',
        proyecto1: 'E-commerce para retail líder - Incremento del 300% en ventas online',
        proyecto2: 'Plataforma SaaS para gestión empresarial - 10,000+ usuarios activos',
        proyecto3: 'App móvil de delivery - Disponible en iOS y Android',
        imagenes: 'portfolio1.jpg, portfolio2.jpg, portfolio3.jpg'
      },
      pricing: {
        titulo: 'Planes y Precios',
        plan1: 'Plan Básico',
        precio1: '$999/mes',
        plan2: 'Plan Profesional',
        precio2: '$1,999/mes',
        plan3: 'Plan Enterprise',
        precio3: 'Personalizado'
      },
      faq: {
        pregunta1: '¿Cuánto tiempo toma un proyecto?',
        respuesta1: 'Depende de la complejidad, típicamente entre 4-12 semanas',
        pregunta2: '¿Ofrecen soporte post-lanzamiento?',
        respuesta2: 'Sí, todos nuestros planes incluyen soporte continuo',
        pregunta3: '¿Trabajan con tecnologías específicas?',
        respuesta3: 'Trabajamos con las últimas tecnologías del mercado'
      },
      cta: {
        titulo: '¿Listo para Comenzar?',
        descripcion: 'Contáctanos hoy y lleva tu negocio al siguiente nivel',
        textoCTA: 'Solicitar Cotización',
        imagenes: 'cta-bg.jpg'
      }
    };

    // Datos de ejemplo para About
    const aboutData = {
      intro: {
        titulo: 'Sobre Nosotros',
        descripcionCorta: 'Somos una empresa líder en soluciones digitales',
        imagenes: 'about-hero.jpg'
      },
      historia: {
        titulo: 'Nuestra Historia',
        añoFundacion: '2010',
        historiaCompleta: 'Fundada en 2010, hemos crecido de un pequeño equipo a una empresa reconocida internacionalmente, sirviendo a clientes en más de 20 países.',
        imagenes: 'historia.jpg, timeline-bg.jpg'
      },
      mision: {
        titulo: 'Nuestra Misión',
        misionTexto: 'Transformar negocios a través de soluciones tecnológicas innovadoras que impulsen el crecimiento y la eficiencia operativa.',
        imagenes: 'mision.jpg'
      },
      vision: {
        titulo: 'Nuestra Visión',
        visionTexto: 'Ser la empresa de tecnología más confiable y admirada, reconocida por nuestra excelencia y compromiso con el éxito de nuestros clientes.',
        imagenes: 'vision.jpg'
      },
      valores: {
        titulo: 'Nuestros Valores',
        valor1: 'Innovación constante',
        valor2: 'Integridad en cada acción',
        valor3: 'Excelencia en el servicio',
        valor4: 'Trabajo en equipo',
        imagenes: 'valores-bg.jpg'
      },
      equipo: {
        titulo: 'Nuestro Equipo',
        miembro1Nombre: 'Roberto Martínez',
        miembro1Cargo: 'CEO y Fundador',
        miembro2Nombre: 'Ana Silva',
        miembro2Cargo: 'Directora de Tecnología',
        miembro3Nombre: 'Diego Torres',
        miembro3Cargo: 'Director Creativo',
        imagenes: 'team1.jpg, team2.jpg, team3.jpg'
      },
      logros: {
        titulo: 'Logros y Reconocimientos',
        logro1: 'Premio a la Innovación Empresarial 2023',
        logro2: 'Certificación ISO 9001:2015',
        logro3: 'Top 10 Empresas Tech del País',
        imagenes: 'awards.jpg'
      },
      timeline: {
        titulo: 'Nuestra Evolución',
        evento1Año: '2010',
        evento1Desc: 'Fundación de la empresa',
        evento2Año: '2015',
        evento2Desc: 'Expansión internacional',
        evento3Año: '2023',
        evento3Desc: 'Más de 500 proyectos completados'
      },
      cultura: {
        titulo: 'Cultura Empresarial',
        descripcion: 'Fomentamos un ambiente de colaboración, aprendizaje continuo e innovación',
        aspecto1: 'Flexibilidad laboral',
        aspecto2: 'Desarrollo profesional',
        aspecto3: 'Balance vida-trabajo',
        imagenes: 'cultura.jpg, office.jpg'
      },
      ctaAbout: {
        titulo: 'Únete a Nuestro Equipo',
        descripcion: 'Estamos buscando talento para formar parte de nuestra familia',
        textoCTA: 'Ver Vacantes',
        imagenes: 'hiring-bg.jpg'
      }
    };

    // Datos de ejemplo para Services
    const servicesData = {
      heroServices: {
        titulo: 'Nuestros Servicios',
        descripcion: 'Soluciones completas para impulsar tu negocio',
        imagenes: 'services-hero.jpg'
      },
      servicio1: {
        nombreServicio: 'Desarrollo Web',
        descripcionCorta: 'Sitios web modernos y responsivos',
        descripcionLarga: 'Creamos sitios web personalizados utilizando las últimas tecnologías para garantizar rendimiento, seguridad y escalabilidad.',
        beneficios: 'Diseño responsivo, SEO optimizado, Velocidad superior',
        precio: 'Desde $2,500',
        imagenes: 'web-dev.jpg, web-dev-detail.jpg'
      },
      servicio2: {
        nombreServicio: 'Marketing Digital',
        descripcionCorta: 'Estrategias que generan resultados',
        descripcionLarga: 'Campañas integrales de marketing digital que aumentan tu visibilidad online y convierten visitantes en clientes.',
        beneficios: 'SEO/SEM, Redes Sociales, Email Marketing',
        precio: 'Desde $1,500/mes',
        imagenes: 'marketing.jpg, marketing-detail.jpg'
      },
      servicio3: {
        nombreServicio: 'Desarrollo de Apps',
        descripcionCorta: 'Apps nativas e híbridas',
        descripcionLarga: 'Aplicaciones móviles para iOS y Android que ofrecen experiencias excepcionales a tus usuarios.',
        beneficios: 'UI/UX superior, Alto rendimiento, Mantenimiento incluido',
        precio: 'Desde $5,000',
        imagenes: 'app-dev.jpg, app-screens.jpg'
      },
      servicio4: {
        nombreServicio: 'Consultoría IT',
        descripcionCorta: 'Asesoría tecnológica experta',
        descripcionLarga: 'Análisis y recomendaciones estratégicas para optimizar tu infraestructura tecnológica.',
        beneficios: 'Auditoría completa, Plan de acción, Seguimiento continuo',
        precio: '$200/hora',
        imagenes: 'consultoria.jpg'
      },
      proceso: {
        titulo: 'Nuestro Proceso de Trabajo',
        paso1: 'Descubrimiento y análisis de necesidades',
        paso2: 'Diseño y prototipado',
        paso3: 'Desarrollo e implementación',
        paso4: 'Pruebas y lanzamiento',
        imagenes: 'proceso.jpg'
      },
      paquetes: {
        titulo: 'Paquetes Especiales',
        paquete1: 'Startup',
        precio1: '$4,999',
        incluye1: 'Web + Marketing básico + 3 meses soporte',
        paquete2: 'Business',
        precio2: '$9,999',
        incluye2: 'Web + App + Marketing completo + 6 meses soporte',
        paquete3: 'Enterprise',
        precio3: 'Personalizado',
        incluye3: 'Solución completa a medida + soporte dedicado 24/7'
      },
      diferenciadores: {
        titulo: 'Por Qué Somos Diferentes',
        diferenciador1: 'Metodología ágil probada',
        diferenciador2: 'Equipo multidisciplinario senior',
        diferenciador3: 'Garantía de satisfacción 100%',
        imagenes: 'diferenciadores.jpg'
      },
      casosExito: {
        titulo: 'Casos de Éxito',
        caso1: 'Tienda online para moda - 200% aumento en conversiones',
        resultado1: 'ROI positivo en 3 meses',
        caso2: 'App de fitness - 50,000 descargas en primer mes',
        resultado2: '4.8 estrellas en App Store',
        imagenes: 'caso1.jpg, caso2.jpg'
      },
      ctaServices: {
        titulo: 'Solicita una Consulta Gratuita',
        descripcion: 'Analizamos tu proyecto sin compromiso',
        textoCTA: 'Agendar Consulta',
        imagenes: 'cta-services.jpg'
      }
    };

    // Datos de ejemplo para Gallery
    const galleryData = {
      heroGallery: {
        titulo: 'Nuestro Portafolio',
        descripcion: 'Proyectos que nos enorgullecen',
        imagenes: 'gallery-hero.jpg'
      },
      categoria1: {
        nombreCategoria: 'Sitios Web',
        descripcion: 'Diseños web modernos y funcionales',
        imagenes: 'cat-web.jpg'
      },
      proyecto1: {
        nombreProyecto: 'E-commerce Moda Urbana',
        cliente: 'Fashion Store Inc',
        descripcion: 'Plataforma de comercio electrónico completa con pasarela de pagos',
        tecnologias: 'React, Node.js, Stripe',
        resultados: 'Incremento del 250% en ventas online',
        imagenes: 'proyecto1-main.jpg, proyecto1-1.jpg, proyecto1-2.jpg'
      },
      proyecto2: {
        nombreProyecto: 'Portal Corporativo',
        cliente: 'Tech Solutions Global',
        descripcion: 'Sitio corporativo multilingüe con CMS personalizado',
        tecnologias: 'Vue.js, Laravel, MySQL',
        resultados: 'Reducción del 40% en tiempo de actualización de contenido',
        imagenes: 'proyecto2-main.jpg, proyecto2-1.jpg'
      },
      proyecto3: {
        nombreProyecto: 'App de Delivery',
        cliente: 'QuickFood',
        descripcion: 'Aplicación móvil para pedidos de comida con tracking en tiempo real',
        tecnologias: 'React Native, Firebase',
        resultados: '10,000+ usuarios activos mensuales',
        imagenes: 'proyecto3-main.jpg, proyecto3-screens.jpg'
      },
      categoria2: {
        nombreCategoria: 'Aplicaciones Móviles',
        descripcion: 'Apps innovadoras para iOS y Android',
        imagenes: 'cat-apps.jpg'
      },
      proyecto4: {
        nombreProyecto: 'App Fitness Tracker',
        cliente: 'HealthyLife',
        descripcion: 'App de seguimiento de actividad física y nutrición',
        tecnologias: 'Swift, Kotlin, Node.js',
        resultados: '4.8 estrellas en tiendas, 50K+ descargas',
        imagenes: 'proyecto4-main.jpg, proyecto4-ui.jpg'
      },
      proyecto5: {
        nombreProyecto: 'Plataforma Educativa',
        cliente: 'EduLearn',
        descripcion: 'Sistema de gestión de aprendizaje online',
        tecnologias: 'Angular, Python, PostgreSQL',
        resultados: '5,000+ estudiantes registrados',
        imagenes: 'proyecto5-main.jpg, proyecto5-dashboard.jpg'
      },
      testimoniosGallery: {
        titulo: 'Lo Que Dicen Nuestros Clientes',
        testimonio1: 'El equipo superó todas nuestras expectativas, entrega impecable',
        cliente1: 'María González - Fashion Store',
        testimonio2: 'Profesionales dedicados que realmente entienden las necesidades del negocio',
        cliente2: 'Carlos Ruiz - Tech Solutions',
        imagenes: 'testimonial1.jpg, testimonial2.jpg'
      },
      ctaGallery: {
        titulo: '¿Quieres Ver Tu Proyecto Aquí?',
        descripcion: 'Convierte tu idea en realidad',
        textoCTA: 'Iniciar Proyecto',
        imagenes: 'cta-gallery.jpg'
      }
    };

    // Datos de ejemplo para Contact
    const contactData = {
      heroContact: {
        titulo: 'Contáctanos',
        descripcion: 'Estamos aquí para ayudarte',
        imagenes: 'contact-hero.jpg'
      },
      infoContacto: {
        telefono: '+34 912 345 678',
        email: 'info@empresapremium.com',
        direccion: 'Calle Mayor 123, 28013 Madrid, España',
        horario: 'Lunes a Viernes: 9:00 - 18:00',
        imagenes: 'contact-info.jpg'
      },
      formulario: {
        tituloFormulario: 'Envíanos un Mensaje',
        camposRequeridos: 'Nombre, Email, Teléfono, Mensaje',
        mensajeExito: 'Gracias por contactarnos, responderemos en menos de 24 horas',
        imagenes: 'form-bg.jpg'
      },
      mapa: {
        titulo: 'Encuéntranos',
        direccionCompleta: 'Calle Mayor 123, Planta 5, Oficina 501, 28013 Madrid, España',
        coordenadas: '40.4168, -3.7038',
        indicaciones: 'Cerca de la Puerta del Sol, metro más cercano: Sol (líneas 1, 2, 3)'
      },
      oficinas: {
        titulo: 'Nuestras Oficinas',
        oficina1Nombre: 'Sede Madrid',
        oficina1Direccion: 'Calle Mayor 123, Madrid',
        oficina2Nombre: 'Sucursal Barcelona',
        oficina2Direccion: 'Passeig de Gràcia 45, Barcelona',
        imagenes: 'oficina-madrid.jpg, oficina-barcelona.jpg'
      },
      redesSociales: {
        titulo: 'Síguenos en Redes Sociales',
        facebook: 'facebook.com/empresapremium',
        instagram: '@empresapremium',
        twitter: '@empresapremium',
        linkedin: 'linkedin.com/company/empresapremium',
        youtube: 'youtube.com/@empresapremium'
      },
      faqContact: {
        pregunta1: '¿Cuál es el tiempo de respuesta?',
        respuesta1: 'Respondemos a todos los mensajes en menos de 24 horas laborables',
        pregunta2: '¿Hacen reuniones presenciales?',
        respuesta2: 'Sí, ofrecemos reuniones presenciales en nuestras oficinas o en tu empresa',
        pregunta3: '¿Atienden fuera de horario?',
        respuesta3: 'Para clientes con soporte premium, ofrecemos atención 24/7'
      },
      atencionCliente: {
        titulo: 'Atención al Cliente',
        descripcion: 'Múltiples canales para comunicarte con nosotros',
        whatsapp: '+34 600 123 456',
        chatEnLinea: 'Disponible en horario de oficina',
        imagenes: 'support.jpg'
      },
      newsletter: {
        titulo: 'Suscríbete a Nuestro Newsletter',
        descripcion: 'Recibe noticias, consejos y ofertas exclusivas',
        textoCTA: 'Suscribirse',
        imagenes: 'newsletter-bg.jpg'
      },
      ctaContact: {
        titulo: 'Trabajemos Juntos',
        descripcion: 'Estamos listos para hacer realidad tu proyecto',
        textoCTA: 'Comenzar Ahora',
        imagenes: 'cta-contact.jpg'
      }
    };

    setPageData({
      home: homeData,
      about: aboutData,
      services: servicesData,
      gallery: galleryData,
      contact: contactData
    });

    toast({
      title: '¡Listo!',
      description: 'Todos los campos han sido llenados con datos de ejemplo'
    });
  };

  const clearAll = () => {
    setProjectName('');
    setWebsiteType('');
    setLanguages('Español, Inglés');
    setSelectedPages(['home']);
    setPageData({
      home: {},
      about: {},
      services: {},
      gallery: {},
      contact: {}
    });
    setUseCustomColors(false);
    setSelectedPalette(colorPalettes[0]);
    setFloatingButtons({
      whatsapp: { enabled: false, number: '', message: 'Hola, me gustaría obtener más información' },
      facebook: { enabled: false, url: '' },
      instagram: { enabled: false, url: '' },
      tiktok: { enabled: false, url: '' },
      twitter: { enabled: false, url: '' },
      youtube: { enabled: false, url: '' }
    });

    toast({
      title: 'Limpiado',
      description: 'Todos los campos han sido limpiados'
    });
  };

  const getPageIcon = (pageId) => {
    const page = pageTemplates.find(p => p.id === pageId);
    const Icon = page?.icon;
    return Icon ? <Icon className="w-4 h-4" /> : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
            Generador de Prompts Web
          </h1>
          <p className="text-slate-600 text-lg mb-4">Crea prompts profesionales para desarrollar sitios web completos con HTML, CSS y JavaScript</p>
          
          <div className="flex gap-3 justify-center">
            <Button 
              onClick={fillWithExample} 
              variant="outline" 
              size="lg"
              className="gap-2 border-green-500 text-green-700 hover:bg-green-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Llenar con Ejemplo
            </Button>
            <Button 
              onClick={clearAll} 
              variant="outline" 
              size="lg"
              className="gap-2 border-red-500 text-red-700 hover:bg-red-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Limpiar Todo
            </Button>
          </div>
        </div>

        <div className="grid gap-6 mb-6">
          <Card className="border-2 border-blue-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardTitle className="text-2xl">⚙️ Configuración del Proyecto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <Label htmlFor="projectName" className="text-base font-semibold">Nombre del Proyecto *</Label>
                <Input
                  id="projectName"
                  placeholder="Ej: Sitio Corporativo Tech Solutions"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="websiteType" className="text-base font-semibold">Tipo de Sitio Web</Label>
                <Input
                  id="websiteType"
                  placeholder="Ej: Corporativo, E-commerce, Portfolio, Blog"
                  value={websiteType}
                  onChange={(e) => setWebsiteType(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="languages" className="text-base font-semibold">Idiomas (separados por comas)</Label>
                <Input
                  id="languages"
                  placeholder="Español, Inglés"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-base font-semibold">🎨 Paleta de Colores</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setUseCustomColors(!useCustomColors)}
                  >
                    {useCustomColors ? 'Usar Paletas' : 'Personalizar'}
                  </Button>
                </div>

                {useCustomColors ? (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {Object.keys(customColors).map(key => (
                      <div key={key}>
                        <Label className="text-xs capitalize">{key}</Label>
                        <Input
                          type="color"
                          value={customColors[key]}
                          onChange={(e) => setCustomColors(prev => ({ ...prev, [key]: e.target.value }))}
                          className="h-10 cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {colorPalettes.map((palette, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedPalette(palette)}
                        className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                          selectedPalette.name === palette.name
                            ? 'border-blue-600 shadow-lg ring-2 ring-blue-200'
                            : 'border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        <div className="flex gap-1 mb-2">
                          <div className="w-6 h-6 rounded shadow-sm" style={{ backgroundColor: palette.colors.primary }} />
                          <div className="w-6 h-6 rounded shadow-sm" style={{ backgroundColor: palette.colors.secondary }} />
                          <div className="w-6 h-6 rounded shadow-sm" style={{ backgroundColor: palette.colors.accent }} />
                        </div>
                        <p className="text-xs font-medium text-slate-900">{palette.name}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-cyan-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50">
              <CardTitle className="text-2xl">📄 Páginas del Sitio Web</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600 mb-4">Selecciona las páginas que tendrá tu sitio web. Cada página tiene 10 secciones específicas.</p>
              <div className="flex flex-wrap gap-3">
                {pageTemplates.map(page => {
                  const Icon = page.icon;
                  return (
                    <Button
                      key={page.id}
                      variant={selectedPages.includes(page.id) ? 'default' : 'outline'}
                      onClick={() => togglePage(page.id)}
                      className="flex items-center gap-2 transition-all hover:scale-105"
                      size="lg"
                    >
                      <Icon className="w-5 h-5" />
                      {page.name}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="text-2xl">🔘 Botones Flotantes (Redes Sociales)</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600 mb-4">Configura botones flotantes que aparecerán en todas las páginas del sitio</p>
              
              <div className="space-y-4">
                {/* WhatsApp */}
                <div className="flex items-start gap-3 p-4 border rounded-lg bg-green-50 border-green-200">
                  <input
                    type="checkbox"
                    checked={floatingButtons.whatsapp.enabled}
                    onChange={(e) => setFloatingButtons(prev => ({
                      ...prev,
                      whatsapp: { ...prev.whatsapp, enabled: e.target.checked }
                    }))}
                    className="mt-1 w-5 h-5 cursor-pointer"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      <Label className="font-semibold text-green-700">WhatsApp</Label>
                    </div>
                    {floatingButtons.whatsapp.enabled && (
                      <>
                        <Input
                          placeholder="Número con código de país (ej: 34912345678)"
                          value={floatingButtons.whatsapp.number}
                          onChange={(e) => setFloatingButtons(prev => ({
                            ...prev,
                            whatsapp: { ...prev.whatsapp, number: e.target.value }
                          }))}
                          className="bg-white"
                        />
                        <Input
                          placeholder="Mensaje predeterminado"
                          value={floatingButtons.whatsapp.message}
                          onChange={(e) => setFloatingButtons(prev => ({
                            ...prev,
                            whatsapp: { ...prev.whatsapp, message: e.target.value }
                          }))}
                          className="bg-white"
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Facebook */}
                <div className="flex items-start gap-3 p-4 border rounded-lg bg-blue-50 border-blue-200">
                  <input
                    type="checkbox"
                    checked={floatingButtons.facebook.enabled}
                    onChange={(e) => setFloatingButtons(prev => ({
                      ...prev,
                      facebook: { ...prev.facebook, enabled: e.target.checked }
                    }))}
                    className="mt-1 w-5 h-5 cursor-pointer"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <Label className="font-semibold text-blue-700">Facebook</Label>
                    </div>
                    {floatingButtons.facebook.enabled && (
                      <Input
                        placeholder="URL de tu página de Facebook"
                        value={floatingButtons.facebook.url}
                        onChange={(e) => setFloatingButtons(prev => ({
                          ...prev,
                          facebook: { ...prev.facebook, url: e.target.value }
                        }))}
                        className="bg-white"
                      />
                    )}
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-3 p-4 border rounded-lg bg-pink-50 border-pink-200">
                  <input
                    type="checkbox"
                    checked={floatingButtons.instagram.enabled}
                    onChange={(e) => setFloatingButtons(prev => ({
                      ...prev,
                      instagram: { ...prev.instagram, enabled: e.target.checked }
                    }))}
                    className="mt-1 w-5 h-5 cursor-pointer"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                      </svg>
                      <Label className="font-semibold text-pink-700">Instagram</Label>
                    </div>
                    {floatingButtons.instagram.enabled && (
                      <Input
                        placeholder="URL de tu perfil de Instagram"
                        value={floatingButtons.instagram.url}
                        onChange={(e) => setFloatingButtons(prev => ({
                          ...prev,
                          instagram: { ...prev.instagram, url: e.target.value }
                        }))}
                        className="bg-white"
                      />
                    )}
                  </div>
                </div>

                {/* TikTok */}
                <div className="flex items-start gap-3 p-4 border rounded-lg bg-slate-50 border-slate-200">
                  <input
                    type="checkbox"
                    checked={floatingButtons.tiktok.enabled}
                    onChange={(e) => setFloatingButtons(prev => ({
                      ...prev,
                      tiktok: { ...prev.tiktok, enabled: e.target.checked }
                    }))}
                    className="mt-1 w-5 h-5 cursor-pointer"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-6 h-6 text-slate-800" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                      </svg>
                      <Label className="font-semibold text-slate-700">TikTok</Label>
                    </div>
                    {floatingButtons.tiktok.enabled && (
                      <Input
                        placeholder="URL de tu perfil de TikTok"
                        value={floatingButtons.tiktok.url}
                        onChange={(e) => setFloatingButtons(prev => ({
                          ...prev,
                          tiktok: { ...prev.tiktok, url: e.target.value }
                        }))}
                        className="bg-white"
                      />
                    )}
                  </div>
                </div>

                {/* Twitter */}
                <div className="flex items-start gap-3 p-4 border rounded-lg bg-sky-50 border-sky-200">
                  <input
                    type="checkbox"
                    checked={floatingButtons.twitter.enabled}
                    onChange={(e) => setFloatingButtons(prev => ({
                      ...prev,
                      twitter: { ...prev.twitter, enabled: e.target.checked }
                    }))}
                    className="mt-1 w-5 h-5 cursor-pointer"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-6 h-6 text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      <Label className="font-semibold text-sky-700">Twitter / X</Label>
                    </div>
                    {floatingButtons.twitter.enabled && (
                      <Input
                        placeholder="URL de tu perfil de Twitter/X"
                        value={floatingButtons.twitter.url}
                        onChange={(e) => setFloatingButtons(prev => ({
                          ...prev,
                          twitter: { ...prev.twitter, url: e.target.value }
                        }))}
                        className="bg-white"
                      />
                    )}
                  </div>
                </div>

                {/* YouTube */}
                <div className="flex items-start gap-3 p-4 border rounded-lg bg-red-50 border-red-200">
                  <input
                    type="checkbox"
                    checked={floatingButtons.youtube.enabled}
                    onChange={(e) => setFloatingButtons(prev => ({
                      ...prev,
                      youtube: { ...prev.youtube, enabled: e.target.checked }
                    }))}
                    className="mt-1 w-5 h-5 cursor-pointer"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <Label className="font-semibold text-red-700">YouTube</Label>
                    </div>
                    {floatingButtons.youtube.enabled && (
                      <Input
                        placeholder="URL de tu canal de YouTube"
                        value={floatingButtons.youtube.url}
                        onChange={(e) => setFloatingButtons(prev => ({
                          ...prev,
                          youtube: { ...prev.youtube, url: e.target.value }
                        }))}
                        className="bg-white"
                      />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-slate-200 shadow-xl mb-6">
          <CardHeader className="bg-slate-50">
            <CardTitle className="text-2xl">✍️ Contenido de las Páginas</CardTitle>
            <p className="text-sm text-slate-600 mt-2">Completa la información para cada sección de tus páginas</p>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="home">
              <TabsList className="grid w-full mb-6" style={{ gridTemplateColumns: `repeat(${selectedPages.length}, 1fr)` }}>
                {selectedPages.map(pageId => {
                  const page = pageTemplates.find(p => p.id === pageId);
                  const Icon = page?.icon;
                  return (
                    <TabsTrigger key={pageId} value={pageId} className="flex items-center gap-2 py-3">
                      {Icon && <Icon className="w-4 h-4" />}
                      {page?.name}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {selectedPages.map(pageId => (
                <TabsContent key={pageId} value={pageId} className="space-y-4">
                  {pageId === 'home' && <HomePage data={pageData} onChange={updatePageData} />}
                  {pageId === 'about' && <AboutPage data={pageData} onChange={updatePageData} />}
                  {pageId === 'services' && <ServicesPage data={pageData} onChange={updatePageData} />}
                  {pageId === 'gallery' && <GalleryPage data={pageData} onChange={updatePageData} />}
                  {pageId === 'contact' && <ContactPage data={pageData} onChange={updatePageData} />}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-3 justify-center bg-white p-6 rounded-lg shadow-lg border-2 border-slate-200">
          <Button onClick={() => setShowPreview(true)} variant="outline" size="lg" className="gap-2">
            <Eye className="w-5 h-5" />
            Vista Previa
          </Button>
          <Button onClick={() => downloadPrompt('md')} size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Download className="w-5 h-5" />
            Descargar MD
          </Button>
          <Button onClick={() => downloadPrompt('json')} size="lg" className="gap-2 bg-cyan-600 hover:bg-cyan-700">
            <Download className="w-5 h-5" />
            Descargar JSON
          </Button>
          <Button onClick={copyToClipboard} variant="outline" size="lg" className="gap-2">
            <Copy className="w-5 h-5" />
            Copiar al Portapapeles
          </Button>
        </div>
      </div>

      {showPreview && (
        <PromptPreview
          data={generatePrompt()}
          onClose={() => setShowPreview(false)}
          generateMarkdown={generateMarkdown}
        />
      )}
    </div>
  );
};

export default PromptBuilder;
