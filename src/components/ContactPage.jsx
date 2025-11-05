import React from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const ContactPage = ({ data, onChange }) => {
  const sections = [
    { id: 'heroContact', name: 'Hero Contacto', fields: ['titulo', 'descripcion', 'imagenes'] },
    { id: 'infoContacto', name: 'Información de Contacto', fields: ['telefono', 'email', 'direccion', 'horario', 'imagenes'] },
    { id: 'formulario', name: 'Formulario de Contacto', fields: ['tituloFormulario', 'camposRequeridos', 'mensajeExito', 'imagenes'] },
    { id: 'mapa', name: 'Mapa de Ubicación', fields: ['titulo', 'direccionCompleta', 'coordenadas', 'indicaciones'] },
    { id: 'oficinas', name: 'Nuestras Oficinas', fields: ['titulo', 'oficina1Nombre', 'oficina1Direccion', 'oficina2Nombre', 'oficina2Direccion', 'imagenes'] },
    { id: 'redesSociales', name: 'Redes Sociales', fields: ['titulo', 'facebook', 'instagram', 'twitter', 'linkedin', 'youtube'] },
    { id: 'faqContact', name: 'Preguntas Frecuentes', fields: ['pregunta1', 'respuesta1', 'pregunta2', 'respuesta2', 'pregunta3', 'respuesta3'] },
    { id: 'atencionCliente', name: 'Atención al Cliente', fields: ['titulo', 'descripcion', 'whatsapp', 'chatEnLinea', 'imagenes'] },
    { id: 'newsletter', name: 'Newsletter', fields: ['titulo', 'descripcion', 'textoCTA', 'imagenes'] },
    { id: 'ctaContact', name: 'Llamado a la Acción Final', fields: ['titulo', 'descripcion', 'textoCTA', 'imagenes'] }
  ];

  const updateField = (sectionId, field, value) => {
    onChange('contact', sectionId, field, value);
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
                    placeholder="Ej: contacto-bg.jpg, oficina1.jpg, mapa-icon.svg"
                    value={data?.contact?.[section.id]?.[field] || ''}
                    onChange={(e) => updateField(section.id, field, e.target.value)}
                  />
                ) : field.includes('descripcion') || field.includes('respuesta') || field.includes('direccion') || field.includes('Completa') || field.includes('indicaciones') ? (
                  <Textarea
                    placeholder={`Ingresa ${field}...`}
                    value={data?.contact?.[section.id]?.[field] || ''}
                    onChange={(e) => updateField(section.id, field, e.target.value)}
                    rows={3}
                  />
                ) : (
                  <Input
                    placeholder={`Ingresa ${field}...`}
                    value={data?.contact?.[section.id]?.[field] || ''}
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

export default ContactPage;