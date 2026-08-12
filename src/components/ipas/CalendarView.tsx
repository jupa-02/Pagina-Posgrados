import React from 'react';
import { Asignacion } from '../../lib/ipas/solver';
import { SALONES_DB } from '../../data/salonesData';

interface Props {
  asignaciones: Asignacion[];
}

export default function CalendarView({ asignaciones }: Props) {
  const getAsignacion = (salonId: string, bloque: 'A' | 'B') => {
    return asignaciones.find(a => a.salon.id === salonId && a.bloque === bloque);
  };

  if (SALONES_DB.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-refined border border-gray-200 overflow-hidden mt-8">
      <div className="bg-[#7A1B22] px-6 py-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold font-serif text-white">Calendario Tradicional de Ocupación</h3>
          <p className="text-sm text-red-200 font-medium">Modelo Espejo de Alternancia Quincenal</p>
        </div>
        <div className="text-xs bg-black/20 text-white px-3 py-1 rounded border border-white/20">
          Vista Tabular
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#FAFAFA]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-[#111827] w-1/3 border-b">Espacio Físico / Salón</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-[#111827] w-1/3 border-l border-b">Bloque A (Semanas 1 y 3)</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-[#111827] w-1/3 border-l border-b">Bloque B (Semanas 2 y 4)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {SALONES_DB.map(salon => {
              const asigA = getAsignacion(salon.id, 'A');
              const asigB = getAsignacion(salon.id, 'B');

              return (
                <tr key={salon.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-[#7A1B22]">{salon.nombre}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Cap: {salon.capacidad} est. | {salon.tipo}
                    </div>
                  </td>
                  
                  {/* Bloque A */}
                  <td className={`px-4 py-4 text-center border-l ${asigA ? 'bg-red-50/20' : 'bg-[#FAFAFA]'}`}>
                    {asigA ? (
                      <div>
                        <span className="block font-bold text-[#111827] text-sm mb-1">{asigA.solicitud.nombrePrograma}</span>
                        <span className="inline-block text-xs bg-white border border-gray-200 text-gray-600 px-2 py-1 rounded-full shadow-sm">
                          {asigA.solicitud.E} est. | IPAS: {asigA.resultadoIpas.total.toFixed(1)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm font-medium text-gray-400 italic">Libre</span>
                    )}
                  </td>

                  {/* Bloque B */}
                  <td className={`px-4 py-4 text-center border-l ${asigB ? 'bg-red-50/20' : 'bg-[#FAFAFA]'}`}>
                    {asigB ? (
                      <div>
                        <span className="block font-bold text-[#111827] text-sm mb-1">{asigB.solicitud.nombrePrograma}</span>
                        <span className="inline-block text-xs bg-white border border-gray-200 text-gray-600 px-2 py-1 rounded-full shadow-sm">
                          {asigB.solicitud.E} est. | IPAS: {asigB.resultadoIpas.total.toFixed(1)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm font-medium text-gray-400 italic">Libre</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
