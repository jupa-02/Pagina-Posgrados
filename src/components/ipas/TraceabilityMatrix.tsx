import React from 'react';
import { Asignacion } from '../../lib/ipas/solver';

interface Props {
  asignaciones: Asignacion[];
}

export default function TraceabilityMatrix({ asignaciones }: Props) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200 mt-6">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-50 text-gray-700 font-semibold">
          <tr>
            <th className="px-4 py-3">Bloque</th>
            <th className="px-4 py-3">Salón Asignado</th>
            <th className="px-4 py-3">Programa</th>
            <th className="px-4 py-3 text-center">IOA (30%)</th>
            <th className="px-4 py-3 text-center">ICT (30%)</th>
            <th className="px-4 py-3 text-center">FIDE (15%)</th>
            <th className="px-4 py-3 text-center">IDH (15%)</th>
            <th className="px-4 py-3 text-center">FAP (10%)</th>
            <th className="px-4 py-3 text-center font-bold text-blue-900">IPAS Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {asignaciones.map((asig, i) => (
            <tr key={i} className="hover:bg-blue-50 transition-colors">
              <td className="px-4 py-3 font-bold text-gray-900">Bloque {asig.bloque}</td>
              <td className="px-4 py-3">
                <span className="font-semibold text-gray-800">{asig.salon.nombre}</span>
                <div className="text-xs text-gray-500">Cap: {asig.salon.capacidad} | Tech: {asig.salon.tecnologiaValor}</div>
              </td>
              <td className="px-4 py-3">
                <span className="font-semibold">{asig.solicitud.nombrePrograma}</span>
                <div className="text-xs text-gray-500">Est: {asig.solicitud.E} | Req.Tech: {asig.solicitud.tecnologiaRequerida ? 'Sí' : 'No'}</div>
              </td>
              <td className="px-4 py-3 text-center text-blue-800 bg-blue-50/50">{asig.resultadoIpas.ioa.toFixed(1)}</td>
              <td className="px-4 py-3 text-center text-indigo-800 bg-indigo-50/50">{asig.resultadoIpas.ict.toFixed(1)}</td>
              <td className="px-4 py-3 text-center text-purple-800 bg-purple-50/50">{asig.resultadoIpas.fide.toFixed(1)}</td>
              <td className="px-4 py-3 text-center text-green-800 bg-green-50/50">{asig.resultadoIpas.idh.toFixed(1)}</td>
              <td className="px-4 py-3 text-center text-yellow-800 bg-yellow-50/50">{asig.resultadoIpas.fap.toFixed(1)}</td>
              <td className="px-4 py-3 text-center font-black text-blue-900 text-lg bg-blue-100/30">
                {asig.resultadoIpas.total.toFixed(2)}
              </td>
            </tr>
          ))}
          {asignaciones.length === 0 && (
            <tr>
              <td colSpan={9} className="px-4 py-8 text-center text-gray-500 italic">
                No hay asignaciones calculadas. Ejecute el algoritmo.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
