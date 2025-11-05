import React from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const ServicesPage = ({ data, onChange }) => {
  const sections = [
    { id: 'heroServices', name: 'Hero Servicios', fields: ['titulo', 'descripcion', 'imagenes'] },
    { id: 'servicio1', name: 'Servicio #1', fields: ['nombreServicio', 'descripcionCorta', 'descripcionLarga', 'beneficios', 'precio', 'imagenes'] },
    { id: 'servicio2', name: 'Servicio #2', fields: ['nombreServicio', 'descripcionCorta', 'descripcionLarga', 'beneficios', 'precio', 'imagenes'] },
    { id: 'servicio3', name: 'Servicio #3', fields: ['nombreServicio', 'descripcionCorta', 'descripcionLarga', 'beneficios', 'precio', 'imagenes'] },
    { id: 'servicio4', name: 'Servicio #4', fields: ['nombreServicio', 'descripcionCorta', 'descripcionLarga', 'beneficios', 'precio', 'imagenes'] },
    { id: 'proceso', name: 'Nuestro Proceso', fields: ['titulo', 'paso1', 'paso2', 'paso3', 'paso4', 'imagenes'] },
    { id: 'paquetes', name: 'Paquetes y Precios', fields: ['titulo', 'paquete1', 'precio1', 'incluye1', 'paquete2', 'precio2', 'incluye2', 'paquete3', 'precio3', 'incluye3'] },
    { id: 'diferenciadores', name: 'Por Qué Elegirnos', fields: ['titulo', 'diferenciador1', 'diferenciador2', 'diferenciador3', 'imagenes'] },
    { id: 'casosExito', name: 'Casos de Éxito', fields: ['titulo', 'caso1', 'resultado1', 'caso2', 'resultado2', 'imagenes'] },
    { id: 'ctaServices', name: 'Llamado a la Acción', fields: ['titulo', 'descripcion', 'textoCTA', 'imagenes'] }
  ];

  const updateField = (sectionId, field, value) => {
    onChange('services', sectionId, field, value);
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
                    placeholder="Ej: servicio1.jpg, servicio2.jpg, proceso-icon.svg"
                    value={data?.services?.[section.id]?.[field] || ''}
                    onChange={(e) => updateField(section.id, field, e.target.value)}
                  />
                ) : field.includes('Larga') || field.includes('descripcion') || field.includes('beneficios') || field.includes('incluye') ? (
                  <Textarea
                    placeholder={`Ingresa ${field}...`}
                    value={data?.services?.[section.id]?.[field] || ''}
                    onChange={(e) => updateField(section.id, field, e.target.value)}
                    rows={3}
                  />
                ) : (
                  <Input
                    placeholder={`Ingresa ${field}...`}
                    value={data?.services?.[section.id]?.[field] || ''}
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

export default ServicesPage;