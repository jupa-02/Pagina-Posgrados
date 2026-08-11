import React from 'react';
import RequestForm from '../../../components/ipas/RequestForm';

export default function CoordinadoresPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">Portal de Solicitudes de Infraestructura</h1>
          <p className="mt-3 text-lg text-gray-600">Diligencie los microdatos oficiales. El motor algorítmico IPAS procesará las solicitudes sin sesgos.</p>
        </div>
        
        <RequestForm />
        
        <div className="mt-8 text-sm text-gray-500 text-center">
          <p>La información ingresada debe ser estrictamente cuantitativa o paramétrica.</p>
          <p>Basado en el Modelo de Asignación Multicriterio de Espacios Físicos.</p>
        </div>
      </div>
    </div>
  );
}
