'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { 
  Users, UserCheck, Clock, Percent, Search, RefreshCw, 
  Download, QrCode, ArrowLeft, CheckCircle2, XCircle, FileSpreadsheet
} from 'lucide-react';

export default function DashboardPage() {
  const [asistentes, setAsistentes] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({
    total_inscritos: 0,
    total_asistieron: 0,
    total_pendientes: 0,
    porcentaje_asistencia: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchData = async (q: string = '') => {
    try {
      setLoading(true);
      const res = await fetch(`/api/eventos/asistentes?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setAsistentes(data.asistentes || []);
      setStats(data.estadisticas || { total_inscritos: 0, total_asistieron: 0, total_pendientes: 0, porcentaje_asistencia: 0 });
    } catch (e) {
      console.error('Error fetching dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchQuery);
  }, [searchQuery]);

  const handleToggle = async (id: string) => {
    try {
      setTogglingId(id);
      const res = await fetch(`/api/eventos/asistentes/${id}/toggle`, {
        method: 'POST',
      });
      if (res.ok) {
        await fetchData(searchQuery);
      }
    } catch (e) {
      console.error('Error toggling attendance:', e);
    } finally {
      setTogglingId(null);
    }
  };

  const handleExportCsv = () => {
    if (!asistentes.length) return;

    const headers = ['Nombre', 'Documento', 'Correo', 'Programa', 'Estado Asistencia', 'Fecha Asistencia', 'Método'];
    const rows = asistentes.map((a) => [
      `"${a.nombre}"`,
      `"${a.documento}"`,
      `"${a.correo}"`,
      `"${a.programa || ''}"`,
      `"${a.estado_asistencia === 'asistio' ? 'Asistió' : 'Pendiente'}"`,
      `"${a.fecha_asistencia ? new Date(a.fecha_asistencia).toLocaleString() : ''}"`,
      `"${a.metodo_asistencia || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `asistencia_posgrados_udc_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />

      <div className="pt-28 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        
        {/* Cabecera del Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold mb-1">
              <Link href="/eventos" className="hover:text-gray-900 flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Eventos
              </Link>
              <span>/</span>
              <span className="text-[#7A1B22]">Panel de Asistencia</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
              Control de Asistencia en Tiempo Real
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              I Simposio Internacional de Posgrados — Universidad de Cartagena
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchData(searchQuery)}
              className="inline-flex items-center gap-1.5 bg-white text-gray-700 border border-gray-200 px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </button>

            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 bg-white text-gray-700 border border-gray-200 px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-gray-50 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              Descargar CSV
            </button>

            <Link
              href="/eventos/scanner"
              className="inline-flex items-center gap-1.5 bg-[#7A1B22] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-[#8f2029] transition-colors"
            >
              <QrCode className="w-3.5 h-3.5" />
              Abrir Escáner Móvil
            </Link>
          </div>
        </div>

        {/* Métricas / KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-200/70 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Inscritos</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">{stats.total_inscritos}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/70 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Asistieron</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1">{stats.total_asistieron}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/70 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pendientes</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1">{stats.total_pendientes}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/70 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">% Asistencia</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#7A1B22] mt-1">{stats.porcentaje_asistencia}%</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-50 text-[#7A1B22] flex items-center justify-center">
              <Percent className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Barra de Búsqueda de Respaldo */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200/80 mb-6 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por Nombre, Cédula / Documento o Correo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-sm text-gray-900 focus:outline-none placeholder:text-gray-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-gray-400 hover:text-gray-600 font-semibold"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Tabla de Asistentes */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Asistente</th>
                  <th className="py-3.5 px-4">Documento / Cédula</th>
                  <th className="py-3.5 px-4">Correo</th>
                  <th className="py-3.5 px-4">Programa</th>
                  <th className="py-3.5 px-4">Estado</th>
                  <th className="py-3.5 px-4">Hora Ingreso</th>
                  <th className="py-3.5 px-4 text-center">Acción Manual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                {asistentes.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400 font-medium">
                      No se encontraron registros de asistentes.
                    </td>
                  </tr>
                ) : (
                  asistentes.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-gray-900">
                        {a.nombre}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-medium text-gray-700">
                        {a.documento}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        {a.correo}
                      </td>
                      <td className="py-3.5 px-4 text-gray-500">
                        {a.programa || 'Posgrados UdeC'}
                      </td>
                      <td className="py-3.5 px-4">
                        {a.estado_asistencia === 'asistio' ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full text-[11px]">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Asistió
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full text-[11px]">
                            <Clock className="w-3 h-3 text-amber-600" /> Pendiente
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-gray-500 font-mono text-[11px]">
                        {a.fecha_asistencia ? new Date(a.fecha_asistencia).toLocaleTimeString() : '—'}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          disabled={togglingId === a.id}
                          onClick={() => handleToggle(a.id)}
                          className={`px-3 py-1.5 rounded-lg font-bold text-[11px] transition-all shadow-sm cursor-pointer disabled:opacity-50 ${
                            a.estado_asistencia === 'asistio'
                              ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                          }`}
                        >
                          {a.estado_asistencia === 'asistio' ? 'Desmarcar' : 'Confirmar Ingreso'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
