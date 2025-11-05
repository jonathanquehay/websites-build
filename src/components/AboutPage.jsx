import React from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const AboutPage = ({ data, onChange }) => {
  const sections = [
    { id: 'intro', name: 'Introducción/Hero', fields: ['titulo', 'descripcionCorta', 'imagenes'] },
    { id: 'historia', name: 'Nuestra Historia', fields: ['titulo', 'añoFundacion', 'historiaCompleta', 'imagenes'] },
    { id: 'mision', name: 'Misión', fields: ['titulo', 'misionTexto', 'imagenes'] },
    { id: 'vision', name: 'Visión', fields: ['titulo', 'visionTexto', 'imagenes'] },
    { id: 'valores', name: 'Valores', fields: ['titulo', 'valor1', 'valor2', 'valor3', 'valor4', 'imagenes'] },
    { id: 'equipo', name: 'Nuestro Equipo', fields: ['titulo', 'miembro1Nombre', 'miembro1Cargo', 'miembro2Nombre', 'miembro2Cargo', 'miembro3Nombre', 'miembro3Cargo', 'imagenes'] },
    { id: 'logros', name: 'Logros y Reconocimientos', fields: ['titulo', 'logro1', 'logro2', 'logro3', 'imagenes'] },
    { id: 'timeline', name: 'Línea de Tiempo', fields: ['titulo', 'evento1Año', 'evento1Desc', 'evento2Año', 'evento2Desc', 'evento3Año', 'evento3Desc'] },
    { id: 'cultura', name: 'Cultura Empresarial', fields: ['titulo', 'descripcion', 'aspecto1', 'aspecto2', 'aspecto3', 'imagenes'] },
    { id: 'ctaAbout', name: 'Llamado a la Acción', fields: ['titulo', 'descripcion', 'textoCTA', 'imagenes'] }
  ];

  const updateField = (sectionId, field, value) => {
    onChange('about', sectionId, field, value);
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
                    placeholder="Ej: historia.jpg, equipo.jpg, valores-bg.png"
                    value={data?.about?.[section.id]?.[field] || ''}
                    onChange={(e) => updateField(section.id, field, e.target.value)}
                  />
                ) : field.includes('Completa') || field.includes('Texto') || field.includes('descripcion') || field.includes('Desc') ? (
                  <Textarea
                    placeholder={`Ingresa ${field}...`}
                    value={data?.about?.[section.id]?.[field] || ''}
                    onChange={(e) => updateField(section.id, field, e.target.value)}
                    rows={3}
                  />
                ) : (
                  <Input
                    placeholder={`Ingresa ${field}...`}
                    value={data?.about?.[section.id]?.[field] || ''}
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

export default AboutPage;