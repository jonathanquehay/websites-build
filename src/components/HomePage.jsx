import React from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const HomePage = ({ data, onChange }) => {
  const sections = [
    { id: 'hero', name: 'Hero Principal', fields: ['titulo', 'subtitulo', 'textoCTA', 'imagenes'] },
    { id: 'features', name: 'Características/Servicios', fields: ['titulo', 'descripcion', 'feature1', 'feature2', 'feature3', 'imagenes'] },
    { id: 'benefits', name: 'Beneficios', fields: ['titulo', 'descripcion', 'beneficio1', 'beneficio2', 'beneficio3', 'imagenes'] },
    { id: 'howItWorks', name: 'Cómo Funciona', fields: ['titulo', 'paso1', 'paso2', 'paso3', 'imagenes'] },
    { id: 'testimonials', name: 'Testimonios', fields: ['titulo', 'testimonio1', 'testimonio2', 'testimonio3', 'imagenes'] },
    { id: 'stats', name: 'Estadísticas/Números', fields: ['stat1Numero', 'stat1Texto', 'stat2Numero', 'stat2Texto', 'stat3Numero', 'stat3Texto'] },
    { id: 'portfolio', name: 'Portafolio/Casos de Éxito', fields: ['titulo', 'proyecto1', 'proyecto2', 'proyecto3', 'imagenes'] },
    { id: 'pricing', name: 'Precios/Planes', fields: ['titulo', 'plan1', 'precio1', 'plan2', 'precio2', 'plan3', 'precio3'] },
    { id: 'faq', name: 'Preguntas Frecuentes', fields: ['pregunta1', 'respuesta1', 'pregunta2', 'respuesta2', 'pregunta3', 'respuesta3'] },
    { id: 'cta', name: 'Llamado a la Acción Final', fields: ['titulo', 'descripcion', 'textoCTA', 'imagenes'] }
  ];

  const updateField = (sectionId, field, value) => {
    onChange('home', sectionId, field, value);
  };

  return (
    <div className="space-y-6">
      {sections.map((section, idx) => (
        <Card key={section.id}>
          <CardHeader>
            <CardTitle className="text-lg">Sección {idx + 1}: {section.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {section.fields.map(field => (
              <div key={field}>
                <Label className="capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</Label>
                {field === 'imagenes' ? (
                  <Input
                    placeholder="Ej: hero-bg.jpg, feature1.png, icon1.svg"
                    value={data?.home?.[section.id]?.[field] || ''}
                    onChange={(e) => updateField(section.id, field, e.target.value)}
                  />
                ) : field.includes('descripcion') || field.includes('respuesta') ? (
                  <Textarea
                    placeholder={`Ingresa ${field}...`}
                    value={data?.home?.[section.id]?.[field] || ''}
                    onChange={(e) => updateField(section.id, field, e.target.value)}
                    rows={3}
                  />
                ) : (
                  <Input
                    placeholder={`Ingresa ${field}...`}
                    value={data?.home?.[section.id]?.[field] || ''}
                    onChange={(e) => updateField(section.id, field, e.target.value)}
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HomePage;