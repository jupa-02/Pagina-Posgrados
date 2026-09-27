'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Database, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  FileSpreadsheet, 
  Building2, 
  UserCheck, 
  RefreshCw, 
  ExternalLink,
  ShieldCheck,
  Server,
  Layers,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

interface MatriculaRecord {
  id: string;
  documento: string;
  tipoDoc: string;
  nombreCompleto: string;
  email: string;
  telefono: string;
  codigoCurso: string;
  nombreCurso: string;
  modalidad: string;
  tipoInscripcion: 'Particular' | 'Bolsa Corporativa';
  empresaOrigen?: string;
  fechaRegistro: string;
  estadoPago: 'Confirmado' | 'En Proceso';
  estadoSMA: 'Pendiente Carga' | 'Sincronizado' | 'En Lote';
  creditosHomologables: number;
}

const INITIAL_RECORDS: MatriculaRecord[] = [
  {
    id: 'MAT-2026-081',
    documento: '1047489211',
    tipoDoc: 'CC',
    nombreCompleto: 'Dra. Carolina Méndez Polo',
    email: 'cmendez@clinicadelmar.com',
    telefono: '300 456 7890',
    codigoCurso: 'FCE-SAL-01',
    nombreCurso: 'Auditoría Médica y de la Calidad en Salud',
    modalidad: 'Híbrida',
    tipoInscripcion: 'Bolsa Corporativa',
    empresaOrigen: 'Clínica del Mar S.A.S.',
    fechaRegistro: '2026-09-24',
    estadoPago: 'Confirmado',
    estadoSMA: 'Pendiente Carga',
    creditosHomologables: 2
  },
  {
    id: 'MAT-2026-082',
    documento: '73198422',
    tipoDoc: 'CC',
    nombreCompleto: 'Ing. Carlos Mendoza R.',
    email: 'cmendoza@puertocartagena.com',
    telefono: '310 987 6543',
    codigoCurso: 'FCE-ORG-07',
    nombreCurso: 'Modelos de Gestión y Planificación Estratégica',
    modalidad: 'Presencial',
    tipoInscripcion: 'Bolsa Corporativa',
    empresaOrigen: 'Sociedad Portuaria de Cartagena',
    fechaRegistro: '2026-09-25',
    estadoPago: 'Confirmado',
    estadoSMA: 'Pendiente Carga',
    creditosHomologables: 2
  },
  {
    id: 'MAT-2026-083',
    documento: '1143890123',
    tipoDoc: 'CC',
    nombreCompleto: 'Lic. Mariana Gómez V.',
    email: 'mariana.gomez@gmail.com',
    telefono: '315 222 3344',
    codigoCurso: 'FCE-FIN-03',
    nombreCurso: 'Decisiones Financieras y Creación de Valor',
    modalidad: 'Virtual Streaming',
    tipoInscripcion: 'Particular',
    fechaRegistro: '2026-09-25',
    estadoPago: 'Confirmado',
    estadoSMA: 'Pendiente Carga',
    creditosHomologables: 2
  },
  {
    id: 'MAT-2026-084',
    documento: '1050293847',
    tipoDoc: 'CC',
    nombreCompleto: 'Cont. Guillermo Salgado M.',
    email: 'guillermo.salgado@fonducar.org',
    telefono: '301 555 7788',
    codigoCurso: 'FCE-REV-04',
    nombreCurso: 'Control Interno y Gestión del Riesgo en Entidades Solidarias',
    modalidad: 'Presencial',
    tipoInscripcion: 'Bolsa Corporativa',
    empresaOrigen: 'Fonducar',
    fechaRegistro: '2026-09-26',
    estadoPago: 'Confirmado',
    estadoSMA: 'Pendiente Carga',
    creditosHomologables: 2
  },
  {
    id: 'MAT-2026-085',
    documento: '45512890',
    tipoDoc: 'CC',
    nombreCompleto: 'Dra. Beatriz Helena Morales',
    email: 'bmorales@saludbolivar.gov.co',
    telefono: '318 667 9900',
    codigoCurso: 'FCE-SAL-08',
    nombreCurso: 'Evaluación de Tecnologías en Salud y Contratación Integral',
    modalidad: 'Híbrida',
    tipoInscripcion: 'Particular',
    fechaRegistro: '2026-09-26',
    estadoPago: 'Confirmado',
    estadoSMA: 'Pendiente Carga',
    creditosHomologables: 2
  }
];

export default function SMABridgePage() {
  const [records, setRecords] = useState<MatriculaRecord[]>(INITIAL_RECORDS);
  const [filterType, setFilterType] = useState<'todos' | 'Particular' | 'Bolsa Corporativa'>('todos');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const filteredRecords = records.filter(r => {
    if (filterType === 'todos') return true;
    return r.tipoInscripcion === filterType;
  });

  const handleExportSMA = () => {
    // Generate CSV formatted specifically for SMA batch upload
    const headers = [
      'SMA_COD_ESTUDIANTE',
      'TIPO_DOC',
      'DOCUMENTO',
      'NOMBRES_APELLIDOS',
      'EMAIL',
      'TELEFONO',
      'COD_PROGRAMA_FCE',
      'COD_MODULO',
      'MODALIDAD',
      'TIPO_MATRICULA',
      'EMPRESA_PAGADORA',
      'CREDITOS_HOMOLOGABLES',
      'ESTADO_PAGO',
      'PERIODO_ACADEMICO'
    ];

    const rows = filteredRecords.map((r, idx) => [
      `UDECEST-${r.documento}`,
      r.tipoDoc,
      r.documento,
      `"${r.nombreCompleto}"`,
      r.email,
      r.telefono,
      'POST-EDUCON-FCE',
      r.codigoCurso,
      r.modalidad,
      r.tipoInscripcion,
      `"${r.empresaOrigen || 'PARTICULAR'}"`,
      r.creditosHomologables,
      r.estadoPago,
      '2026-1'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CARGA_MASIVA_SMA_FCE_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Update status in UI
    setRecords(prev => prev.map(r => ({ ...r, estadoSMA: 'Sincronizado' })));
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 5000);
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#F8F9FA]">
      <Navbar />

      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/admin/asignacion" 
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[var(--color-udec-crimson)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Asignación de Salones (IPAS)
          </Link>

          <span className="text-xs font-mono bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-amber-600" />
            Entorno de Interoperabilidad Académica • FCE UdeC
          </span>
        </div>

        {/* Title Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-200/80 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold mb-3">
                <Database className="w-3.5 h-3.5" />
                Puente Técnico con SMA (Sistema de Matrícula Académica)
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif text-gray-900 tracking-tight mb-3">
                Gestión de Matrículas y Sincronización SMA
              </h1>
              <p className="text-gray-600 font-light text-sm sm:text-base max-w-3xl leading-relaxed">
                Esta interfaz resuelve el enlace entre las matrículas ágiles (particulares y de la <strong>Bolsa de Créditos Corporativos</strong>) y el sistema institucional tradicional <strong>SMA (Oracle / Smaix12)</strong>, permitiendo procesar cohortes sin cuellos de botella y generando los archivos de importación oficiales con un solo clic.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="https://sma.unicartagena.edu.co:8443/Smaix12/vista/mainMenu.jsp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-gray-300 hover:border-gray-900 text-gray-700 hover:text-gray-900 text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
              >
                Abrir Portal SMA
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleExportSMA}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-udec-crimson)] hover:bg-red-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                <Download className="w-4 h-4" />
                Exportar Lote a SMA (.CSV)
              </button>
            </div>
          </div>
        </div>

        {downloadSuccess && (
          <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="font-bold">Lote exportado con éxito en formato oficial SMA.</p>
              <p className="text-xs text-emerald-700 font-light">
                El archivo <strong>CARGA_MASIVA_SMA_FCE_2026.csv</strong> contiene los registros validados listos para ser importados por la Secretaría de Posgrados al módulo institucional.
              </p>
            </div>
          </div>
        )}

        {/* 3-Tier Architecture Explanatory Cards (Pie y Cabeza) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[var(--color-udec-crimson)] flex items-center justify-center font-bold text-sm mb-4">
              01
            </div>
            <h3 className="font-serif text-lg font-medium text-gray-900 mb-2">Front-Office Ágil (Nuestra Web)</h3>
            <p className="text-xs text-gray-600 font-light leading-relaxed mb-3">
              Gestiona el catálogo de 124 cursos, la compra de paquetes de créditos empresariales, la inscripción ágil en 3 minutos y la billetera corporativa de RRHH.
            </p>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              0% Fricción para el usuario
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-2xs bg-blue-50/20">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm mb-4">
              02
            </div>
            <h3 className="font-serif text-lg font-medium text-gray-900 mb-2">Módulo Intermedio (Puente FCE)</h3>
            <p className="text-xs text-gray-600 font-light leading-relaxed mb-3">
              Valida los pagos confirmados, descuenta los créditos de la bolsa corporativa y agrupa a los estudiantes en lotes de cohorte listos para legalización académica.
            </p>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Control Total en Posgrados
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-800 flex items-center justify-center font-bold text-sm mb-4">
              03
            </div>
            <h3 className="font-serif text-lg font-medium text-gray-900 mb-2">Sistema Central SMA (UdeC)</h3>
            <p className="text-xs text-gray-600 font-light leading-relaxed mb-3">
              Recibe la carga masiva sin necesidad de reprogramar su código Java JSP/Oracle. Conserva la historia académica oficial y permite homologar créditos a maestrías.
            </p>
            <span className="text-[10px] font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
              100% Viable Institucionalmente
            </span>
          </div>
        </div>

        {/* Filters and Table */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden mb-12">
          <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-serif font-medium text-gray-900">
                Estudiantes Registrados para la Próxima Cohorte ({filteredRecords.length})
              </h2>
              <p className="text-xs text-gray-500 font-light mt-0.5">
                Datos unificados de inscripciones particulares y asignaciones de la Bolsa de Créditos Empresas.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500">Filtrar:</span>
              <div className="inline-flex rounded-lg border border-gray-200 p-0.5 bg-gray-50">
                {(['todos', 'Particular', 'Bolsa Corporativa'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilterType(f)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                      filterType === f ? 'bg-white text-gray-900 shadow-2xs font-semibold' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {f === 'todos' ? 'Todos' : f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Estudiante / Documento</th>
                  <th className="py-3.5 px-4">Curso Seleccionado</th>
                  <th className="py-3.5 px-4">Tipo Inscripción</th>
                  <th className="py-3.5 px-4">Créditos</th>
                  <th className="py-3.5 px-4">Pago</th>
                  <th className="py-3.5 px-4">Estado SMA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRecords.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-4 px-4">
                      <p className="font-semibold text-gray-900">{r.nombreCompleto}</p>
                      <p className="text-gray-500 text-[11px] font-mono">{r.tipoDoc} {r.documento} • {r.email}</p>
                    </td>
                    <td className="py-4 px-4 max-w-xs">
                      <p className="font-medium text-gray-900 truncate" title={r.nombreCurso}>{r.nombreCurso}</p>
                      <p className="text-gray-400 text-[11px] font-mono">{r.codigoCurso} • {r.modalidad}</p>
                    </td>
                    <td className="py-4 px-4">
                      {r.tipoInscripcion === 'Bolsa Corporativa' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 font-semibold text-[10px]">
                          <Building2 className="w-3 h-3" />
                          {r.empresaOrigen}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 font-medium text-[10px]">
                          <UserCheck className="w-3 h-3" />
                          Particular
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-mono font-semibold text-gray-700">
                      {r.creditosHomologables} Cr
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-medium text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        {r.estadoPago}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-semibold ${
                        r.estadoSMA === 'Sincronizado' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {r.estadoSMA}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-gray-50/60 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-2">
            <span>Mostrando {filteredRecords.length} inscripciones de la cohorte actual.</span>
            <div className="flex gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"/> Pago Verificado
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"/> Pendiente de Carga SMA
              </span>
            </div>
          </div>
        </div>

        {/* Technical FAQ / Strategic Decision Document for UdeC Management */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200">
          <h3 className="font-serif text-xl font-medium text-gray-900 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[var(--color-udec-crimson)]" />
            Dictamen Técnico: ¿Por qué SMA no debe ser modificado por código y cómo esta arquitectura es viable?
          </h3>

          <div className="space-y-6 text-sm text-gray-600 font-light leading-relaxed">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">1. Limitación Estructural de SMA (Smaix12)</h4>
              <p>
                SMA fue programado con un paradigma semestral rígido (cédula individual, recibo de liquidación con código de barras bancario, preinscripción de asignaturas semestrales). No cuenta con base de datos para empresas jurídicas (NIT), ni saldo de créditos flexibles, ni reasignación de cupos. Intentar modificar el código Java/JSP y las tablas de Oracle en SMA requeriría autorizaciones de seguridad central, meses de programación por parte del CTIC y auditorías de la Contraloría que detendrían la oferta comercial.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-1">2. Solución Ágil y Segura: Arquitectura Desacoplada</h4>
              <p>
                La mejor práctica internacional (utilizada por universidades líderes como UdeA, Javeriana y UniAndes) es tener una <strong>plataforma ágil de cara al cliente y a las empresas</strong> que realiza la comercialización, gestión de créditos y asignación inmediata, y un <strong>puente administrativo de exportación por lotes</strong> que inyecta la información en SMA únicamente cuando el estudiante inicia clases o requiere registro de notas oficial.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-1">3. Homologación a Programas de Posgrado Formales</h4>
              <p>
                Dado que los 124 cursos cortos provienen de los planes de estudio de las maestrías y especializaciones de la Facultad de Ciencias Económicas, cada curso completado emite un certificado digital con código QR de verificación institucional. Cuando el estudiante decide ingresar a una maestría completa, la coordinación de posgrados aplica el reglamento de homologación vigente y registra las notas en SMA sin necesidad de reescribir el sistema.
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
