import React from 'react';
import { Asignacion } from '../../lib/ipas/solver';

interface Props {
  asignaciones: Asignacion[];
}

export default function TraceabilityMatrix({ asignaciones }: Props) {
  if (asignaciones.length === 0) return null;

  return (
    <div className="overflow-hidden shadow-refined border border-gray-200 rounded-xl mt-6 bg-white">
      <div className="bg-[#111827] px-6 py-4 flex items-center justify-between">
        <h3 className="text-xl font-bold font-serif text-white">Matriz de Trazabilidad Algorítmica</h3>
        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">Log de Auditoría Inmutable</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#FAFAFA]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Espacio & Bloque</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Programa Beneficiado</th>
              <th className="px-3 py-4 text-center text-[10px] font-bold text-[#7A1B22] uppercase tracking-wider bg-red-50/50" title="Índice de Ocupación de Aforo">IOA<br/>(30%)</th>
              <th className="px-3 py-4 text-center text-[10px] font-bold text-[#7A1B22] uppercase tracking-wider bg-red-50/50" title="Infraestructura Científico Tecnológica">ICT<br/>(30%)</th>
              <th className="px-3 py-4 text-center text-[10px] font-bold text-[#7A1B22] uppercase tracking-wider bg-red-50/50" title="Factor Inversión Docente">FIDE<br/>(15%)</th>
              <th className="px-3 py-4 text-center text-[10px] font-bold text-[#7A1B22] uppercase tracking-wider bg-red-50/50" title="Índice de Desconcentración Horaria">IDH<br/>(15%)</th>
              <th className="px-3 py-4 text-center text-[10px] font-bold text-[#7A1B22] uppercase tracking-wider bg-red-50/50" title="Factor de Arquitectura Pedagógica">FAP<br/>(10%)</th>
              <th className="px-6 py-4 text-center text-xs font-black text-[#C2A661] uppercase tracking-wider bg-[#111827]">Suma<br/>IPAS</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {asignaciones.map((asig, i) => {
              const reqTech = asig.solicitud.reqProyector || asig.solicitud.reqStreaming || asig.solicitud.reqSoftware;
              const hasDocente = asig.solicitud.tieneDocenteInvitado;

              return (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  
                  {/* Celda Espacio */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded bg-[#7A1B22]/10 text-[#7A1B22] font-black text-lg border border-[#7A1B22]/20">
                        {asig.bloque}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-[#111827]">{asig.salon.nombre}</div>
                        <div className="text-xs text-gray-500">Cap: {asig.salon.capacidad} | {asig.salon.tipo}</div>
                      </div>
                    </div>
                  </td>

                  {/* Celda Programa */}
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-[#111827] max-w-[200px] truncate" title={asig.solicitud.nombrePrograma}>
                      {asig.solicitud.nombrePrograma}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <span className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200">
                        {asig.solicitud.E} est.
                      </span>
                      {reqTech && (
                        <span className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">
                          Tecnología Req.
                        </span>
                      )}
                      {hasDocente && (
                        <span className="text-[10px] font-semibold bg-[#C2A661]/10 text-[#7A1B22] px-2 py-0.5 rounded border border-[#C2A661]/20">
                          Invitado Especial
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Variables */}
                  <td className="px-3 py-4 text-center whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-800">{asig.resultadoIpas.ioa.toFixed(1)}</span>
                  </td>
                  <td className="px-3 py-4 text-center whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-800">{asig.resultadoIpas.ict.toFixed(1)}</span>
                  </td>
                  <td className="px-3 py-4 text-center whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-800">{asig.resultadoIpas.fide.toFixed(1)}</span>
                  </td>
                  <td className="px-3 py-4 text-center whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-800">{asig.resultadoIpas.idh.toFixed(1)}</span>
                  </td>
                  <td className="px-3 py-4 text-center whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-800">{asig.resultadoIpas.fap.toFixed(1)}</span>
                  </td>

                  {/* Total */}
                  <td className="px-6 py-4 text-center whitespace-nowrap bg-[#FAFAFA] border-l border-gray-200">
                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#111827] text-[#C2A661] font-black text-lg shadow-sm">
                      {asig.resultadoIpas.total.toFixed(1)}
                    </div>
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
