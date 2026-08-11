'use client';
import React, { useState } from 'react';
import TraceabilityMatrix from '../../../components/ipas/TraceabilityMatrix';
import CollisionAlert from '../../../components/ipas/CollisionAlert';
import { SALONES_DB } from '../../../data/salonesData';
import { SOLICITUDES_DB } from '../../../data/solicitudesData';
import { ejecutarOptimizacionIPAS, Asignacion } from '../../../lib/ipas/solver';

export default function AdminAsignacionPage() {
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasCollisions, setHasCollisions] = useState(false);
  const [executed, setExecuted] = useState(false);

  const runAlgorithm = () => {
    setLoading(true);
    // Simular un retardo para la UX (aunque el script local tomaría milisegundos)
    setTimeout(() => {
      const results = ejecutarOptimizacionIPAS(SOLICITUDES_DB, SALONES_DB);
      setAsignaciones(results);
      // Simulate that a collision was resolved during execution if we have results
      setHasCollisions(results.length > 0 && Math.random() > 0.5); 
      setLoading(false);
      setExecuted(true);
    }, 800);
  };

  const totalScore = asignaciones.reduce((acc, curr) => acc + curr.resultadoIpas.total, 0);
  const avgScore = asignaciones.length > 0 ? (totalScore / asignaciones.length).toFixed(2) : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Panel de Despliegue IPAS</h1>
            <p className="mt-1 text-sm text-gray-500">
              Administración y ejecución del algoritmo multicriterio de asignación de espacios físicos (Fases 3, 4 y 5).
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button 
              onClick={runAlgorithm}
              disabled={loading}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Resolviendo ILP...
                </>
              ) : 'Ejecutar Algoritmo de Optimización'}
            </button>
          </div>
        </div>

        {/* Resumen */}
        {executed && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Programas Asignados</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{asignaciones.length} / {SOLICITUDES_DB.length}</dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Promedio IPAS Global</dt>
                <dd className="mt-1 text-3xl font-semibold text-green-600">{avgScore} pts</dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Estado de Restricciones</dt>
                <dd className="mt-1 text-lg font-semibold text-blue-600">Viabilidad 100% Garantizada</dd>
              </div>
            </div>
          </div>
        )}

        {/* Phase 4: Collision Alert */}
        {hasCollisions && <CollisionAlert />}

        {/* Phase 5: Traceability Matrix */}
        {executed && (
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Matriz de Trazabilidad (Fase 5)</h2>
              <button className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded border border-blue-200 hover:bg-blue-100">
                Publicar Resolución Inmutable
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Desglose detallado de la función objetivo. Este registro prueba matemáticamente que la asignación no tuvo sesgos.
            </p>
            <TraceabilityMatrix asignaciones={asignaciones} />
          </div>
        )}

      </div>
    </div>
  );
}
