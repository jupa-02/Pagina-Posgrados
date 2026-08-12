'use client';
import React, { useState, useMemo, useEffect } from 'react';
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
  
  const [dbMode, setDbMode] = useState<'demo' | 'live'>('live');
  const [liveSolicitudes, setLiveSolicitudes] = useState<any[]>([]);
  const [liveSalones, setLiveSalones] = useState<any[]>([]);
  const [loadingDb, setLoadingDb] = useState(false);
  const [dbError, setDbError] = useState('');

  const activeSolicitudes = dbMode === 'demo' ? SOLICITUDES_DB : liveSolicitudes;
  const activeSalones = dbMode === 'demo' ? SALONES_DB : liveSalones;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'posgradoseco2026FalcTg') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  useEffect(() => {
    if (isAuthenticated && dbMode === 'live') {
      fetchLiveData();
    }
  }, [isAuthenticated]);

  const rejectedRequests = useMemo(() => {
    if (activeSolicitudes.length === 0 || activeSalones.length === 0) return [];
    return activeSolicitudes
      .filter(sol => !activeSalones.some(salon => esViable(sol, salon)))
      .map(sol => ({
        programa: sol.nombrePrograma,
        razon: `Ningún salón del inventario cumple con las restricciones duras (Aforo E=${sol.E}${sol.reqStreaming ? ', Streaming' : ''}${sol.reqSoftware ? ', Software' : ''}${sol.reqAccesibilidad ? ', Accesibilidad: ' + sol.tipoAccesibilidad : ''}).`
      }));
  }, [activeSolicitudes, activeSalones]);

  const fetchLiveData = async () => {
    setLoadingDb(true);
    setDbError('');
    try {
      const [resSol, resSal] = await Promise.all([
        fetch('/api/ipas/solicitudes'),
        fetch('/api/ipas/salones')
      ]);
      
      if (!resSol.ok || !resSal.ok) throw new Error('Falló la conexión con Google Sheets');
      
      const dataSol = await resSol.json();
      const dataSal = await resSal.json();
      
      setLiveSolicitudes(dataSol);
      setLiveSalones(dataSal);
      setDbMode('live');
      setExecuted(false);
    } catch (err: any) {
      setDbError(err.message || 'Error desconocido');
    } finally {
      setLoadingDb(false);
    }
  };

  const handleExecute = () => {
    if (activeSolicitudes.length === 0 || activeSalones.length === 0) {
      alert("No hay datos suficientes para ejecutar el algoritmo.");
      return;
    }
    const resultado = ejecutarOptimizacionIPAS(activeSolicitudes, activeSalones);
    setAsignaciones(resultado);
    setExecuted(true);
  };

  const isProductionReady = activeSalones.length === 0 && !loadingDb && dbMode === 'demo';

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

        <div className="bg-white p-8 rounded-xl shadow-refined border-refined mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-xl font-bold text-[#111827]">Estado del Pool de Datos ({dbMode === 'demo' ? 'Modo Demostración' : 'Modo en Vivo'})</h2>
              <p className="text-sm text-gray-500 mt-1">
                {loadingDb ? 'Sincronizando con Google Sheets...' : `Solicitudes en el pool: ${activeSolicitudes.length} | Salones en inventario: ${activeSalones.length} | Rechazadas por restricciones duras: ${rejectedRequests.length}`}
                {executed && !loadingDb && (
                  <> | Descartes algorítmicos: {activeSolicitudes.length - rejectedRequests.length - asignaciones.length}</>
                )}
              </p>
              {dbError && <p className="text-sm text-[#7A1B22] font-bold mt-2">Error: {dbError}</p>}
            </div>
            
            <div className="flex gap-4 items-center">
              <button
                onClick={() => dbMode === 'demo' ? fetchLiveData() : setDbMode('demo')}
                disabled={loadingDb}
                className={`text-sm font-medium py-2 px-4 rounded border transition-colors ${
                  dbMode === 'live' 
                    ? 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                }`}
              >
                {loadingDb ? 'Conectando...' : dbMode === 'demo' ? 'Conectar a Google Sheets' : 'Volver a Modo Demo'}
              </button>

              <button 
                onClick={handleExecute}
                disabled={loadingDb || activeSalones.length === 0}
                className="bg-[#111827] hover:bg-[#7A1B22] text-white font-bold py-3 px-8 rounded transition-colors shadow-refined whitespace-nowrap disabled:opacity-50"
              >
                {executed ? 'Recalcular Algoritmo IPAS' : 'Ejecutar Algoritmo de Optimización'}
              </button>
            </div>
          </div>
        </div>

        {loadingDb ? (
          <div className="bg-white p-12 rounded-xl shadow-refined border-refined text-center flex flex-col items-center justify-center">
             <div className="w-12 h-12 border-4 border-[#C2A661] border-t-transparent rounded-full animate-spin mb-4"></div>
             <h2 className="text-xl font-bold text-[#111827] mb-2">Conectando con Google Sheets...</h2>
             <p className="text-gray-500">Descargando datos en vivo desde el servidor.</p>
          </div>
        ) : isProductionReady ? (
          <div className="bg-white p-8 rounded-xl shadow-refined border-refined text-center">
            <h2 className="text-xl font-bold text-[#111827] mb-3">Sistema en Modo Producción (Vacío)</h2>
            <p className="text-gray-500 mb-6 max-w-lg mx-auto">
              La base de datos se encuentra vacía a la espera de las solicitudes paramétricas de los coordinadores y la sincronización con el inventario de la Facultad.
            </p>
          </div>
        ) : (
          <>
            {/* Phase 3 & 4: Traceability & Validation */}
            <CollisionAlert collisions={rejectedRequests} />

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
