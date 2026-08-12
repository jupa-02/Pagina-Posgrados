import React from 'react';
import { Asignacion } from '../../lib/ipas/solver';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface Props {
  asignaciones: Asignacion[];
}

export default function BIDashboard({ asignaciones }: Props) {
  if (asignaciones.length === 0) return null;

  // KPIs
  const totalAsignados = asignaciones.length;
  const totalEstudiantes = asignaciones.reduce((sum, a) => sum + a.solicitud.E, 0);
  const totalCapacidad = asignaciones.reduce((sum, a) => sum + a.salon.capacidad, 0);
  const ioaGlobal = (totalEstudiantes / totalCapacidad) * 100;
  
  const totalStreaming = asignaciones.filter(a => a.salon.techStreaming).length;
  const streamingUsed = asignaciones.filter(a => a.salon.techStreaming && a.solicitud.reqStreaming).length;
  const streamingEfficiency = totalStreaming === 0 ? 0 : (streamingUsed / totalStreaming) * 100;

  // Data for Charts
  // 1. IOA (Ocupación vs Vacío)
  const ioaData = [
    { name: 'Capacidad Ocupada', value: totalEstudiantes },
    { name: 'Sillas Vacías (Holgura)', value: totalCapacidad - totalEstudiantes },
  ];
  const ioaColors = ['#111827', '#E5E7EB'];

  // 2. IDH (Franja Horaria)
  const valleCount = asignaciones.filter(a => a.solicitud.franjaHorariaPuntos === 100).length;
  const mediaCount = asignaciones.filter(a => a.solicitud.franjaHorariaPuntos === 50).length;
  const picoCount = asignaciones.filter(a => a.solicitud.franjaHorariaPuntos === 0).length;
  const idhData = [
    { name: 'Valle (Jue-Vie AM)', cantidad: valleCount },
    { name: 'Media (Vie PM)', cantidad: mediaCount },
    { name: 'Pico (Vie N-Sab AM)', cantidad: picoCount },
  ];

  // 3. FIDE (Profesores Foráneos)
  const intCount = asignaciones.filter(a => a.solicitud.docenteForaneoPuntos === 100).length;
  const nacCount = asignaciones.filter(a => a.solicitud.docenteForaneoPuntos === 50).length;
  const locCount = asignaciones.filter(a => a.solicitud.docenteForaneoPuntos === 0).length;
  const fideData = [
    { name: 'Foráneo/Viáticos', value: intCount },
    { name: 'Sector Externo', value: nacCount },
    { name: 'Planta Interna', value: locCount },
  ];
  const fideColors = ['#7A1B22', '#C2A661', '#9CA3AF'];

  return (
    <div className="bg-white rounded-xl shadow-refined border-refined overflow-hidden">
      <div className="bg-[#111827] text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold font-serif">Telemetría Académica y Analítica de Negocios</h3>
          <p className="text-sm text-gray-400 font-medium">Dashboard de Resultados del Óptimo Global (Operations Research)</p>
        </div>
      </div>
      
      <div className="p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-50 border border-gray-100 p-4 rounded-lg">
            <div className="text-xs text-gray-500 font-bold uppercase mb-1">Total Asignaciones</div>
            <div className="text-3xl font-black text-[#111827]">{totalAsignados} <span className="text-sm font-normal text-gray-500">cursos</span></div>
          </div>
          <div className="bg-gray-50 border border-gray-100 p-4 rounded-lg">
            <div className="text-xs text-gray-500 font-bold uppercase mb-1">Volumen de Alumnos</div>
            <div className="text-3xl font-black text-[#111827]">{totalEstudiantes} <span className="text-sm font-normal text-gray-500">impactados</span></div>
          </div>
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
            <div className="text-xs text-blue-800 font-bold uppercase mb-1">Eficiencia Instalada (IOA)</div>
            <div className="text-3xl font-black text-blue-900">{ioaGlobal.toFixed(1)}%</div>
          </div>
          <div className="bg-green-50 border border-green-100 p-4 rounded-lg">
            <div className="text-xs text-green-800 font-bold uppercase mb-1">Eficiencia Tecnológica</div>
            <div className="text-3xl font-black text-green-900">{streamingEfficiency.toFixed(1)}%</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Chart 1: IOA */}
          <div className="h-64 flex flex-col items-center">
            <h4 className="text-sm font-bold text-gray-700 mb-2">Utilización de Planta (IOA)</h4>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={ioaData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {ioaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={ioaColors[index % ioaColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`${value} Sillas`, '']} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2: FIDE */}
          <div className="h-64 flex flex-col items-center border-l border-gray-100 pl-8">
            <h4 className="text-sm font-bold text-gray-700 mb-2">Inversión Docente (FIDE)</h4>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={fideData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                  {fideData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={fideColors[index % fideColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 3: IDH */}
          <div className="h-64 flex flex-col items-center border-l border-gray-100 pl-8">
            <h4 className="text-sm font-bold text-gray-700 mb-2">Desconcentración Horaria (IDH)</h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={idhData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" tick={{fontSize: 10}} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#C2A661" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
}
