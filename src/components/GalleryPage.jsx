import React from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const GalleryPage = ({ data, onChange }) => {
  const sections = [
    { id: 'heroGallery', name: 'Hero Galería', fields: ['titulo', 'descripcion', 'imagenes'] },
    { id: 'categoria1', name: 'Categoría #1', fields: ['nombreCategoria', 'descripcion', 'imagenes'] },
    { id: 'proyecto1', name: 'Proyecto #1', fields: ['nombreProyecto', 'cliente', 'descripcion', 'tecnologias', 'resultados', 'imagenes'] },
    { id: 'proyecto2', name: 'Proyecto #2', fields: ['nombreProyecto', 'cliente', 'descripcion', 'tecnologias', 'resultados', 'imagenes'] },
    { id: 'proyecto3', name: 'Proyecto #3', fields: ['nombreProyecto', 'cliente', 'descripcion', 'tecnologias', 'resultados', 'imagenes'] },
    { id: 'categoria2', name: 'Categoría #2', fields: ['nombreCategoria', 'descripcion', 'imagenes'] },
    { id: 'proyecto4', name: 'Proyecto #4', fields: ['nombreProyecto', 'cliente', 'descripcion', 'tecnologias', 'resultados', 'imagenes'] },
    { id: 'proyecto5', name: 'Proyecto #5', fields: ['nombreProyecto', 'cliente', 'descripcion', 'tecnologias', 'resultados', 'imagenes'] },
    { id: 'testimoniosGallery', name: 'Testimonios de Clientes', fields: ['titulo', 'testimonio1', 'cliente1', 'testimonio2', 'cliente2', 'imagenes'] },
    { id: 'ctaGallery', name: 'Llamado a la Acción', fields: ['titulo', 'descripcion', 'textoCTA', 'imagenes'] }
  ];

  const updateField = (sectionId, field, value) => {
    onChange('gallery', sectionId, field, value);
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
                <Label className="capitalize">{field.replace(/([A-Z])/g, ' $1').replace(/([0-9])/g, ' $1').trim()}</Label>
                {field === 'imagenes' ? (
                  <Input
                    placeholder="Ej: galeria1.jpg, galeria2.jpg, proyecto1-main.jpg, proyecto1-detail1.jpg"
                    value={data?.gallery?.[section.id]?.[field] || ''}
                    onChange={(e) => updateField(section.id, field, e.target.value)}
                  />
                ) : field.includes('descripcion') || field.includes('resultados') || field.includes('tecnologias') || field.includes('testimonio') ? (
                  <Textarea
                    placeholder={`Ingresa ${field}...`}
                    value={data?.gallery?.[section.id]?.[field] || ''}
                    onChange={(e) => updateField(section.id, field, e.target.value)}
                    rows={3}
                  />
                ) : (
                  <Input
                    placeholder={`Ingresa ${field}...`}
                    value={data?.gallery?.[section.id]?.[field] || ''}
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

export default GalleryPage;