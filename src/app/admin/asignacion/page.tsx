'use client';
import React, { useState, useMemo } from 'react';
import TraceabilityMatrix from '../../../components/ipas/TraceabilityMatrix';
import CollisionAlert from '../../../components/ipas/CollisionAlert';
import CalendarView from '../../../components/ipas/CalendarView';
import ArchitecturalGrid from '../../../components/ipas/ArchitecturalGrid';
import BIDashboard from '../../../components/ipas/BIDashboard';
import { SALONES_DB } from '../../../data/salonesData';
import { SOLICITUDES_DB } from '../../../data/solicitudesData';
import { ejecutarOptimizacionIPAS, Asignacion } from '../../../lib/ipas/solver';
import { esViable } from '../../../lib/ipas/calculator';

export default function AdminIPASPage() {
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
  const [executed, setExecuted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'posgradoseco2026FalcTg') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // BUG FIX: Calculate rejected requests dynamically from real data
  const rejectedRequests = useMemo(() => {
    if (SOLICITUDES_DB.length === 0 || SALONES_DB.length === 0) return [];
    return SOLICITUDES_DB
      .filter(sol => !SALONES_DB.some(salon => esViable(sol, salon)))
      .map(sol => ({
        programa: sol.nombrePrograma,
        razon: `Ningún salón del inventario cumple con las restricciones duras (Aforo E=${sol.E}${sol.reqStreaming ? ', Streaming' : ''}${sol.reqSoftware ? ', Software' : ''}${sol.reqAccesibilidad ? ', Accesibilidad: ' + sol.tipoAccesibilidad : ''}).`
      }));
  }, []);

  const handleExecute = () => {
    const resultado = ejecutarOptimizacionIPAS(SOLICITUDES_DB, SALONES_DB);
    setAsignaciones(resultado);
    setExecuted(true);
  };

  const isProductionReady = SALONES_DB.length === 0;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-refined border-refined max-w-md w-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-serif font-bold text-[#7A1B22] mb-2">Acceso Restringido</h1>
            <p className="text-gray-500 text-sm">Portal Administrativo IPAS</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#111827] mb-1">Contraseña de Administrador</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-[#111827] border-gray-300 rounded p-2.5 border bg-white focus:border-[#C2A661] focus:ring-1 focus:ring-[#C2A661] outline-none transition-all"
                placeholder="••••••••••••"
                required
              />
              {authError && (
                <p className="text-[#7A1B22] text-xs font-bold mt-2">Contraseña incorrecta. Acceso denegado.</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-[#111827] hover:bg-[#7A1B22] text-white font-bold py-3 px-4 rounded transition-colors shadow-sm"
            >
              Autenticar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10">
      <div className="max-w-6xl mx-auto px-4">
        
        <header className="mb-8 border-b border-gray-200 pb-5">
          <h1 className="text-3xl font-serif font-bold text-[#7A1B22] mb-2">Panel Administrativo IPAS</h1>
          <p className="text-[#111827] opacity-80">
            Consola central de resolución de Operations Research. Este módulo orquesta la Fase 3, 4 y 5 del algoritmo para la asignación óptima de la infraestructura académica.
          </p>
        </header>

        {isProductionReady ? (
          <div className="bg-white p-8 rounded-xl shadow-refined border-refined text-center">
            <h2 className="text-xl font-bold text-[#111827] mb-3">Sistema en Modo Producción</h2>
            <p className="text-gray-500 mb-6 max-w-lg mx-auto">
              La base de datos se encuentra vacía a la espera de las solicitudes paramétricas de los coordinadores y la sincronización con el inventario de la Facultad.
            </p>
            <button disabled className="bg-gray-300 text-gray-500 font-medium px-6 py-3 rounded cursor-not-allowed shadow-sm">
              Ejecutar Algoritmo de Optimización (Deshabilitado)
            </button>
          </div>
        ) : (
          <>
            {/* Phase 2: Dynamic Alert System */}
            <CollisionAlert collisions={rejectedRequests} />

            {/* Execution Dashboard */}
            <div className="bg-white p-8 rounded-xl shadow-refined border-refined flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-xl font-bold text-[#111827]">Estado del Pool de Datos (Modo Desarrollo)</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Solicitudes en el pool: {SOLICITUDES_DB.length} | Salones en inventario: {SALONES_DB.length} | Rechazadas por restricciones duras: {rejectedRequests.length}
                  {executed && (
                    <> | Descartes algorítmicos: {SOLICITUDES_DB.length - rejectedRequests.length - asignaciones.length}</>
                  )}
                </p>
              </div>
              
              <button 
                onClick={handleExecute}
                className="bg-[#111827] hover:bg-[#7A1B22] text-white font-bold py-3 px-8 rounded transition-colors shadow-refined whitespace-nowrap"
              >
                {executed ? 'Recalcular Algoritmo IPAS' : 'Ejecutar Algoritmo de Optimización'}
              </button>
            </div>

            {/* Phase 5: Results */}
            {executed && (
              <div className="mt-8 space-y-8">
                
                <BIDashboard asignaciones={asignaciones} />

                <ArchitecturalGrid asignaciones={asignaciones} />

                <CalendarView asignaciones={asignaciones} />
                
                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-[#7A1B22]">Matriz de Trazabilidad (Fase 5)</h2>
                      <p className="text-sm text-[#111827] opacity-80 mt-1">
                        Desglose detallado de la función objetivo. Este registro prueba matemáticamente que la asignación no tuvo sesgos.
                      </p>
                    </div>
                    <button className="text-sm text-[#7A1B22] font-bold bg-[#C2A661]/20 px-4 py-2 rounded hover:bg-[#C2A661]/30 transition-colors border border-[#C2A661]/30 whitespace-nowrap">
                      Exportar Resolución (PDF)
                    </button>
                  </div>
                  <TraceabilityMatrix asignaciones={asignaciones} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
