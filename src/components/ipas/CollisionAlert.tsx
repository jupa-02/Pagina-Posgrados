import React from 'react';

interface Collision {
  programa: string;
  razon: string;
}

interface Props {
  collisions: Collision[];
}

export default function CollisionAlert({ collisions }: Props) {
  if (!collisions || collisions.length === 0) return null;

  return (
    <div className="bg-[#FAFAFA] border-l-4 border-[#7A1B22] p-5 rounded-r-lg mb-8 shadow-refined">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-6 w-6 text-[#7A1B22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="ml-4 w-full">
          <h3 className="text-lg font-bold text-[#111827]">Filtro Matemático Activo (Restricciones Duras)</h3>
          <div className="mt-2 text-sm text-gray-600">
            <p className="mb-2">
              Las siguientes solicitudes fueron descartadas de la Función Objetivo antes de la optimización (Violación de Restricciones Duras):
            </p>
            <ul className="list-disc pl-5 space-y-1">
              {collisions.map((c, i) => (
                <li key={i}>
                  <strong>{c.programa}:</strong> {c.razon}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
