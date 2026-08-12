import React from 'react';
import { Asignacion } from '../../lib/ipas/solver';
import { SALONES_DB } from '../../data/salonesData';

interface Props {
  asignaciones: Asignacion[];
}

export default function ArchitecturalGrid({ asignaciones }: Props) {
  const getAsignacion = (salonId: string, bloque: 'A' | 'B') => {
    return asignaciones.find(a => a.salon.id === salonId && a.bloque === bloque);
  };

  if (SALONES_DB.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold font-serif text-[#111827]">Malla Arquitectónica y Ocupación</h3>
          <p className="text-sm text-gray-500 font-medium">Asignación quincenal en Bloque A (Semanas 1 y 3) y Bloque B (Semanas 2 y 4)</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SALONES_DB.map(salon => {
          const asigA = getAsignacion(salon.id, 'A');
          const asigB = getAsignacion(salon.id, 'B');

          // Cálculo de progreso de ocupación
          const ocuA = asigA ? (asigA.solicitud.E / salon.capacidad) * 100 : 0;
          const ocuB = asigB ? (asigB.solicitud.E / salon.capacidad) * 100 : 0;
          const avgOcu = (ocuA + ocuB) / (asigA && asigB ? 2 : (asigA || asigB ? 1 : 1));

          return (
            <div key={salon.id} className="bg-white rounded-xl shadow-refined border border-gray-200 overflow-hidden flex flex-col hover:border-[#C2A661] transition-colors">
              
              {/* Header de la Tarjeta del Salón */}
              <div className="bg-[#FAFAFA] border-b border-gray-200 p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold text-[#7A1B22]">{salon.nombre}</h4>
                  <span className="bg-[#111827] text-white text-xs font-bold px-2 py-1 rounded">Cap: {salon.capacidad}</span>
                </div>
                
                {/* Indicador Global de Aprovechamiento */}
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                  <div className={`h-1.5 rounded-full ${avgOcu > 90 ? 'bg-red-500' : avgOcu > 50 ? 'bg-green-500' : 'bg-gray-400'}`} style={{ width: `${avgOcu}%` }}></div>
                </div>
                <div className="text-[10px] text-gray-400 text-right uppercase tracking-wider">{avgOcu > 0 ? `${avgOcu.toFixed(0)}% Uso Promedio` : 'Vacío'}</div>

                {/* Badges de Hardware/Accesibilidad */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {salon.esPrimeraPlanta && <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg> 1ra Planta</span>}
                  {salon.tieneRampa && <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">♿ Rampa</span>}
                  {salon.tieneAscensor && <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">↕️ Ascensor</span>}
                  {salon.techStreaming && <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#C2A661]/10 text-[#7A1B22] px-1.5 py-0.5 rounded border border-[#C2A661]/20">📹 Streaming Autónomo</span>}
                  {salon.techSoftware && <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded">💻 Licencias Espec.</span>}
                </div>
              </div>
              
              {/* Bloques */}
              <div className="p-4 flex-1 grid grid-cols-1 gap-3">
                {/* Bloque A */}
                <div className={`p-3 rounded border ${asigA ? 'bg-red-50/30 border-red-100' : 'bg-gray-50/50 border-dashed border-gray-200'}`}>
                  <div className="text-xs font-bold text-gray-500 mb-1">BLOQUE A</div>
                  {asigA ? (
                    <div>
                      <div className="font-bold text-sm text-[#111827] leading-tight mb-2">{asigA.solicitud.nombrePrograma}</div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{asigA.solicitud.E} est.</span>
                        <span className="font-bold text-[#7A1B22]">IPAS: {asigA.resultadoIpas.total.toFixed(1)}</span>
                      </div>
                      {asigA.solicitud.tieneDocenteInvitado && (
                         <div className="mt-2 pt-2 border-t border-red-100/50 text-[10px] text-[#7A1B22]">
                            <strong className="block">✈️ Invitado {asigA.solicitud.docenteForaneoPuntos === 100 ? 'Internacional/Nacional' : 'Local'}</strong>
                            <span className="text-gray-500">{asigA.solicitud.fechaInicioDocente} al {asigA.solicitud.fechaFinDocente}</span>
                         </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-400 text-xs italic py-2 text-center">Disponible</div>
                  )}
                </div>

                {/* Bloque B */}
                <div className={`p-3 rounded border ${asigB ? 'bg-red-50/30 border-red-100' : 'bg-gray-50/50 border-dashed border-gray-200'}`}>
                  <div className="text-xs font-bold text-gray-500 mb-1">BLOQUE B</div>
                  {asigB ? (
                    <div>
                      <div className="font-bold text-sm text-[#111827] leading-tight mb-2">{asigB.solicitud.nombrePrograma}</div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{asigB.solicitud.E} est.</span>
                        <span className="font-bold text-[#7A1B22]">IPAS: {asigB.resultadoIpas.total.toFixed(1)}</span>
                      </div>
                      {asigB.solicitud.tieneDocenteInvitado && (
                         <div className="mt-2 pt-2 border-t border-red-100/50 text-[10px] text-[#7A1B22]">
                            <strong className="block">✈️ Invitado {asigB.solicitud.docenteForaneoPuntos === 100 ? 'Internacional/Nacional' : 'Local'}</strong>
                            <span className="text-gray-500">{asigB.solicitud.fechaInicioDocente} al {asigB.solicitud.fechaFinDocente}</span>
                         </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-400 text-xs italic py-2 text-center">Disponible</div>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
