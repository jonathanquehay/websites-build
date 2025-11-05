export const mockProjects = [
  {
    id: '1',
    name: 'Corporate Website',
    colorPalette: {
      primary: '#2563eb',
      secondary: '#7c3aed',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937'
    },
    pages: [
      {
        id: 'home',
        name: 'Home',
        sections: [
          {
            id: 's1',
            title: 'Hero Section',
            purpose: 'Main landing section',
            content: 'Welcome to our website',
            images: ['hero-bg.jpg'],
            interactions: 'Fade in on load'
          }
        ]
      }
    ],
    createdAt: new Date().toISOString()
  }
];

export const sectionTemplates = [
  { name: 'Hero', interactions: 'Parallax scroll, fade in' },
  { name: 'Features', interactions: 'Hover cards, reveal on scroll' },
  { name: 'Portfolio', interactions: 'Gallery lightbox, filters' },
  { name: 'Testimonials', interactions: 'Carousel, auto-play' },
  { name: 'CTA', interactions: 'Button hover effects' },
  { name: 'Pricing', interactions: 'Toggle plans, highlight on hover' },
  { name: 'FAQ', interactions: 'Accordion expand/collapse' },
  { name: 'Team', interactions: 'Flip cards, social links' },
  { name: 'Timeline', interactions: 'Scroll-triggered animations' },
  { name: 'Contact', interactions: 'Form validation, map integration' }
];

export const colorPalettes = [
  {
    name: 'Ocean Blue',
    colors: { primary: '#0ea5e9', secondary: '#0284c7', accent: '#06b6d4', background: '#f0f9ff', text: '#0c4a6e' }
  },
  {
    name: 'Forest Green',
    colors: { primary: '#10b981', secondary: '#059669', accent: '#34d399', background: '#f0fdf4', text: '#064e3b' }
  },
  {
    name: 'Sunset Orange',
    colors: { primary: '#f97316', secondary: '#ea580c', accent: '#fb923c', background: '#fff7ed', text: '#7c2d12' }
  },
  {
    name: 'Royal Purple',
    colors: { primary: '#a855f7', secondary: '#9333ea', accent: '#c084fc', background: '#faf5ff', text: '#581c87' }
  },
  {
    name: 'Crimson Red',
    colors: { primary: '#ef4444', secondary: '#dc2626', accent: '#f87171', background: '#fef2f2', text: '#7f1d1d' }
  }
];

export const pageTemplates = [
  { id: 'home', name: 'Home', icon: 'Home' },
  { id: 'about', name: 'About Us', icon: 'Users' },
  { id: 'services', name: 'Services', icon: 'Briefcase' },
  { id: 'gallery', name: 'Gallery', icon: 'Images' },
  { id: 'contact', name: 'Contact', icon: 'Mail' }
];
