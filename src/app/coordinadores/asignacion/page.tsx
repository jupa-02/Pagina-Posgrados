import React from 'react';
import RequestForm from '../../../components/ipas/RequestForm';

export default function CoordinadoresPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-serif font-bold text-[#7A1B22] mb-3">
            Sistema IPAS
          </h1>
          <h2 className="text-xl font-medium text-[#111827] mb-2">
            Índice de Priorización de Asignación de Salones
          </h2>
          <p className="text-[#111827] opacity-70 max-w-2xl mx-auto">
            Módulo de captura paramétrica para Coordinadores de Posgrado. La rigurosidad de los datos ingresados garantiza una distribución matemática equitativa y eficiente de la infraestructura física.
          </p>
        </header>

        <RequestForm />
      </div>
    </div>
  );
}
