'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Users, 
  GraduationCap, 
  ShieldCheck, 
  Clock, 
  Download, 
  Plus, 
  Search, 
  Check, 
  TrendingUp, 
  CreditCard,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import { 
  CURSOS_EDUCACION_CONTINUA, 
  PAQUETES_CREDITOS_EMPRESAS, 
  DEMO_EMPRESA_COLABORADORES 
} from '@/data/cursosEducacionContinua';

export default function EmpresasClient() {
  // Simulator State
  const [colaboradoresCount, setColaboradoresCount] = useState<number>(15);
  const [cursosPorPersona, setCursosPorPersona] = useState<number>(2);

  // Corporate Portal State (Live Demo)
  const [activeCompany, setActiveCompany] = useState<string>('Clínica Mar de Indias S.A.');
  const [totalCredits, setTotalCredits] = useState<number>(100);
  const [employees, setEmployees] = useState(DEMO_EMPRESA_COLABORADORES);
  const [portalSearch, setPortalSearch] = useState<string>('');
  const [portalStatusFilter, setPortalStatusFilter] = useState<string>('todos');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState<boolean>(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [selectedCertDemo, setSelectedCertDemo] = useState<any | null>(null);

  // New Employee Form in Modal
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeRole, setNewEmployeeRole] = useState('');
  const [newEmployeeEmail, setNewEmployeeEmail] = useState('');
  const [newEmployeeCourseId, setNewEmployeeCourseId] = useState(CURSOS_EDUCACION_CONTINUA[0]?.id || '1');

  // Contact Form State
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactData, setContactData] = useState({
    empresa: '',
    nit: '',
    nombre: '',
    cargo: '',
    email: '',
    telefono: '',
    paquete: 'growth',
    mensaje: ''
  });

  // Calculate dynamic simulator values
  const totalCreditosEstimados = colaboradoresCount * cursosPorPersona * 2;
  const ahorroPorcentaje = colaboradoresCount >= 30 ? 35 : colaboradoresCount >= 10 ? 25 : 15;
  const precioParticularEstimado = totalCreditosEstimados * 420000;
  const precioBolsaEstimado = precioParticularEstimado * (1 - ahorroPorcentaje / 100);
  const ahorroDinero = precioParticularEstimado - precioBolsaEstimado;

  // Portal calculated metrics
  const creditosConsumidos = useMemo(() => {
    return employees.reduce((acc, emp) => acc + emp.creditosUsados, 0);
  }, [employees]);

  const creditosDisponibles = Math.max(0, totalCredits - creditosConsumidos);
  const porcentajeUso = Math.min(100, Math.round((creditosConsumidos / totalCredits) * 100));

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = 
        emp.nombre.toLowerCase().includes(portalSearch.toLowerCase()) ||
        emp.cursoAsignado.toLowerCase().includes(portalSearch.toLowerCase()) ||
        emp.docente.toLowerCase().includes(portalSearch.toLowerCase()) ||
        emp.cargo.toLowerCase().includes(portalSearch.toLowerCase());

      const matchesStatus = 
        portalStatusFilter === 'todos' || 
        (portalStatusFilter === 'completado' && emp.estado === 'Certificado Emitido') ||
        (portalStatusFilter === 'en_curso' && emp.estado === 'En Curso');

      return matchesSearch && matchesStatus;
    });
  }, [employees, portalSearch, portalStatusFilter]);

  const handleAssignCredits = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmployeeName || !newEmployeeEmail) return;

    const selectedCourse = CURSOS_EDUCACION_CONTINUA.find(c => c.id === newEmployeeCourseId) || CURSOS_EDUCACION_CONTINUA[0];

    const newEmp = {
      id: `emp-${Date.now()}`,
      nombre: newEmployeeName,
      cargo: newEmployeeRole || 'Colaborador',
      empresa: activeCompany,
      correo: newEmployeeEmail,
      cursoAsignado: selectedCourse.titulo,
      area: selectedCourse.area,
      docente: selectedCourse.docente,
      creditosUsados: selectedCourse.creditosEmpresa,
      progreso: 20,
      estado: 'En Curso',
      fechaAsignacion: 'Hoy'
    };

    // Sincronizar en segundo plano con la base de datos persistente posgradosDb
    fetch('/api/empresas/asignar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        empresaNit: '900123456-1',
        colaboradorDocumento: `CC-${Math.floor(100000000 + Math.random() * 900000000)}`,
        colaboradorNombre: newEmployeeName,
        colaboradorEmail: newEmployeeEmail,
        cursoId: selectedCourse.id,
        cursoTitulo: selectedCourse.titulo,
        creditosRequeridos: selectedCourse.creditosEmpresa || 2
      })
    }).catch(err => console.warn('Sync posgradosDb:', err));

    setEmployees([newEmp, ...employees]);
    setIsAssignModalOpen(false);
    setNewEmployeeName('');
    setNewEmployeeRole('');
    setNewEmployeeEmail('');

    setSuccessToast(`¡Asignados exitosamente ${selectedCourse.creditosEmpresa} créditos a ${newEmp.nombre}!`);
    setTimeout(() => {
      setSuccessToast(null);
    }, 4500);
  };

  const [isBuyingCredits, setIsBuyingCredits] = useState(false);

  const handleComprarBolsaPSE = async (creditos: number, montoCOP: number) => {
    setIsBuyingCredits(true);
    try {
      const res = await fetch('/api/pagos/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: 'EMPRESA_BOLSA',
          data: {
            nit: '900123456-1',
            razonSocial: activeCompany,
            contactoNombre: 'Director de Talento Humano',
            contactoEmail: 'talento@empresa.com',
            contactoTelefono: '300 123 4567',
            creditos,
            montoCOP
          }
        })
      });
      const data = await res.json();
      if (data.urlPasarelaSimulada) {
        window.location.href = data.urlPasarelaSimulada;
      }
    } catch (err) {
      console.error(err);
      alert('Error iniciando pasarela de pagos');
    } finally {
      setIsBuyingCredits(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      if (scriptUrl) {
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'empresa',
            nombreEmpresa: contactData.empresa,
            nit: contactData.nit,
            sector: 'N/A',
            numEmpleados: 'N/A',
            cargoContacto: contactData.cargo,
            nombreContacto: contactData.nombre,
            email: contactData.email,
            telefono: contactData.telefono,
            planInteres: contactData.paquete,
            mensaje: contactData.mensaje
          })
        });
      }
      setContactSubmitted(true);
    } catch (error) {
      console.error(error);
      alert('Error enviando la solicitud corporativa.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF9] text-gray-900 font-sans selection:bg-[var(--color-udec-crimson)] selection:text-white">
      <Navbar />

      {/* SUCCESS TOAST NOTIFICATION */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed top-24 right-6 z-50 bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl border border-gray-700 flex items-center gap-3 text-sm"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white">Transacción Registrada</p>
              <p className="text-gray-300 text-xs font-light">{successToast}</p>
            </div>
            <button onClick={() => setSuccessToast(null)} className="text-gray-400 hover:text-white ml-2">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* HERO SECTION EDITORIAL (ESTILO ORIGINAL ELEGANTE) */}
        <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-udec-crimson)] opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gray-500 mb-8 border border-gray-200 rounded-full bg-white/50 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-udec-crimson)]" />
                UdeC Corporate
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif leading-[1.05] tracking-tight text-gray-900 mb-6">
                El prestigio académico <br />
                <span className="text-[var(--color-udec-crimson)] italic font-light">alcanza a su talento.</span>
              </h1>
            </div>
            
            <div className="lg:col-span-4 lg:pb-4 flex flex-col items-start lg:items-end text-left lg:text-right">
              <p className="text-lg md:text-xl text-gray-600 font-light max-w-sm mb-8 leading-relaxed">
                Elevamos la competitividad de las empresas más exigentes mediante formación superior estructurada, flexible y certificada por 200 años de historia.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="#portal" 
                  className="group flex items-center gap-3 px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-full transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
                >
                  <span className="font-medium text-sm tracking-wide">Probar Portal Demo</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BENTO GRID SECTION: EL BANCO DE CRÉDITOS (ESTILO ORIGINAL RESTAURADO) */}
        <section className="py-24 bg-white border-y border-gray-100 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight mb-4">
                  Despídase de las licencias que no usa.
                </h2>
                <p className="text-lg text-gray-500 font-light">
                  Presentamos el Banco de Créditos Universitarios: una membresía flexible diseñada para corporaciones.
                </p>
              </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px]">
              
              {/* Main Feature - Large */}
              <div className="md:col-span-2 md:row-span-2 bg-[#FDFCF9] rounded-3xl p-10 border border-gray-200/60 relative overflow-hidden group hover:shadow-xl hover:border-gray-300/60 transition-all duration-500">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Building2 className="w-48 h-48 text-[var(--color-udec-crimson)]" />
                </div>
                <div className="relative z-10 h-full flex flex-col">
                  <span className="text-[var(--color-udec-crimson)] font-semibold text-sm tracking-widest uppercase mb-4">Asignación Dinámica</span>
                  <h3 className="text-3xl font-serif text-gray-900 mb-6 max-w-sm leading-snug">Invierta únicamente en el aprendizaje real.</h3>
                  <p className="text-gray-600 font-light text-lg leading-relaxed max-w-md mt-auto">
                    A diferencia de las plataformas SaaS, usted compra créditos universitarios. Distribuya la formación estratégicamente entre sus colaboradores según el rol que necesiten cubrir en Finanzas, Auditoría en Salud o Estrategia.
                  </p>
                </div>
              </div>

              {/* Stat Card */}
              <div className="bg-gray-900 text-white rounded-3xl p-8 border border-gray-800 relative overflow-hidden group hover:bg-black transition-colors duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />
                <div className="relative z-10 h-full flex flex-col justify-center">
                  <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-2">Reasignación Total</span>
                  <h3 className="text-5xl font-light font-serif mb-2 text-white group-hover:scale-105 transform origin-left transition-transform duration-500">100%</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Si un talento se retira, los créditos no consumidos retornan automáticamente a su banco corporativo. Cero desperdicio.
                  </p>
                </div>
              </div>

              {/* Graphic Card */}
              <div className="bg-white rounded-3xl p-8 border border-gray-200/60 flex flex-col relative overflow-hidden hover:shadow-lg transition-all duration-500">
                <div className="flex-1 flex items-center justify-center mb-6">
                  <div className="w-full max-w-[180px] aspect-square rounded-full border border-dashed border-gray-300 relative flex items-center justify-center">
                    <div className="absolute inset-2 rounded-full border border-gray-100 bg-gray-50 flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-[var(--color-udec-crimson)]" />
                    </div>
                  </div>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-1">Certificación Oficial</h4>
                <p className="text-gray-500 text-sm font-light">Títulos que sí pesan en el mercado laboral.</p>
              </div>

              {/* Horizontal Feature */}
              <div className="md:col-span-2 bg-[#FDFCF9] rounded-3xl p-8 border border-gray-200/60 flex items-center justify-between hover:shadow-lg transition-all duration-500 group overflow-hidden relative">
                <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-[var(--color-udec-crimson)]/5 to-transparent rounded-tl-full" />
                <div className="relative z-10 max-w-md">
                  <span className="inline-block p-3 rounded-2xl bg-white border border-gray-100 shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-gray-700" />
                  </span>
                  <h4 className="text-2xl font-serif text-gray-900 mb-2">Panel Ejecutivo en Tiempo Real</h4>
                  <p className="text-gray-500 font-light text-sm">Monitoree la progresión académica y notas de su equipo desde un dashboard centralizado y elegante.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SIMULADOR INTERACTIVO DE CRÉDITOS */}
        <section className="py-24 bg-[#FDFCF9] relative border-b border-gray-200" id="simulador">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-udec-crimson)] mb-2 block">
                Calculadora para Directores de RRHH
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 mb-4">
                Simulador de Créditos y Ahorro Corporativo
              </h2>
              <p className="text-gray-500 font-light text-base">
                Estime cuántos créditos requiere su organización y descubra el ahorro proyectado frente a compras individuales particulares.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Controls Column */}
              <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/80 shadow-sm space-y-8">
                <div>
                  <div className="flex justify-between items-baseline mb-3">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-800">
                      1. Número de Colaboradores a Capacitar
                    </label>
                    <span className="text-2xl font-serif font-bold text-[var(--color-udec-crimson)] font-mono">
                      {colaboradoresCount} <span className="text-sm font-sans font-normal text-gray-500">empleados</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="60"
                    step="1"
                    value={colaboradoresCount}
                    onChange={(e) => setColaboradoresCount(Number(e.target.value))}
                    className="w-full accent-[var(--color-udec-crimson)] cursor-pointer h-2 bg-gray-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-gray-400 mt-2 font-mono">
                    <span>3 PyME</span>
                    <span>15 Empresa Mediana</span>
                    <span>40+ Gran Empresa</span>
                    <span>60 Máx</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-3">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-800">
                      2. Módulos o Cursos Cortos por Persona al Año
                    </label>
                    <span className="text-2xl font-serif font-bold text-gray-900 font-mono">
                      {cursosPorPersona} <span className="text-sm font-sans font-normal text-gray-500">cursos ({cursosPorPersona * 2} créditos)</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setCursosPorPersona(num)}
                        className={`py-3 rounded-xl border text-sm font-bold transition-all ${
                          cursosPorPersona === num
                            ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {num} {num === 1 ? 'Curso' : 'Cursos'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-600 leading-relaxed font-light">
                  <strong className="text-gray-900 font-medium block mb-1">Total de Inscripciones Proyectadas:</strong>
                  Con este plan, su organización podrá realizar <strong className="text-gray-900">{colaboradoresCount * cursosPorPersona} matrículas</strong> en cualquiera de los 124 cursos del catálogo FCE (Economía de la Salud, Finanzas Corporativas, Auditoría, NIIF o Gestión Gerencial).
                </div>
              </div>

              {/* Output Summary Card */}
              <div className="lg:col-span-5 bg-gray-900 text-white p-8 sm:p-10 rounded-3xl border border-gray-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-udec-crimson)]/20 rounded-full blur-2xl pointer-events-none" />

                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full inline-block mb-6">
                  Diagnóstico Presupuestal
                </span>

                <h3 className="text-2xl font-serif mb-6 text-white">Plan de Créditos Sugerido</h3>

                <div className="space-y-4 mb-8 text-sm">
                  <div className="flex justify-between items-center py-2.5 border-b border-gray-800">
                    <span className="text-gray-400 font-light">Créditos Requeridos:</span>
                    <span className="text-xl font-bold font-mono text-white">{totalCreditosEstimados} Créditos</span>
                  </div>

                  <div className="flex justify-between items-center py-2.5 border-b border-gray-800">
                    <span className="text-gray-400 font-light">Bolsa Recomendada:</span>
                    <span className="text-amber-300 font-bold">
                      {totalCreditosEstimados <= 35 ? 'Pack Starter (30 Cr)' : totalCreditosEstimados <= 90 ? 'Pack Growth (80 Cr)' : 'Pack Enterprise (200+ Cr)'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2.5 border-b border-gray-800">
                    <span className="text-gray-400 font-light">Ahorro Corporativo:</span>
                    <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded">
                      {ahorroPorcentaje}% de descuento
                    </span>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-gray-400 text-xs font-light">Inversión Particular Equivalente:</span>
                      <span className="text-xs text-gray-500 line-through font-mono">
                        ${precioParticularEstimado.toLocaleString('es-CO')} COP
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-medium text-white">Inversión con Bolsa Corporativa:</span>
                      <span className="text-2xl font-bold text-white font-mono">
                        ${precioBolsaEstimado.toLocaleString('es-CO')} COP
                      </span>
                    </div>
                    <p className="text-xs text-emerald-400 font-medium text-right mt-1">
                      Ahorro directo de ${ahorroDinero.toLocaleString('es-CO')} COP
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => handleComprarBolsaPSE(totalCreditosEstimados, precioBolsaEstimado)}
                    disabled={isBuyingCredits}
                    className="w-full py-4 bg-[var(--color-udec-crimson)] hover:bg-black text-white rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                  >
                    <CreditCard className="w-4 h-4" />
                    {isBuyingCredits ? 'Generando Liquidación...' : 'Comprar Bolsa con PSE (Activación en Vivo)'}
                  </button>

                  <Link
                    href="#diagnostico"
                    className="w-full py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border border-white/20"
                  >
                    Solicitar Propuesta para este Plan
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* DEMO EN VIVO DEL PORTAL CORPORATIVO (SECCIÓN CLAVE SOLICITADA) */}
        <section className="py-24 bg-white relative border-b border-gray-200" id="portal">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-udec-crimson)] block mb-2">
                  Trazabilidad y Control Total
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 leading-tight mb-3">
                  Portal Corporativo UdeC (Demo en Vivo)
                </h2>
                <p className="text-gray-500 font-light text-base">
                  Visualice cómo su empresa monitorea en tiempo real en qué cursos se van consumiendo los créditos, qué empleados están activos y descargue sus certificaciones universitarias oficiales.
                </p>
              </div>

              {/* Company Switcher */}
              <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200">
                <span className="text-xs text-gray-500 font-medium pl-2">Empresa Simulada:</span>
                <select
                  value={activeCompany}
                  onChange={(e) => setActiveCompany(e.target.value)}
                  className="bg-white border border-gray-300 text-gray-900 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-gray-900"
                >
                  <option value="Clínica Mar de Indias S.A.">Clínica Mar de Indias S.A.</option>
                  <option value="Puerto Bahía Cartagena">Puerto Bahía Cartagena</option>
                  <option value="Audigroup Caribe S.A.S.">Audigroup Caribe S.A.S.</option>
                </select>
              </div>
            </div>

            {/* DASHBOARD CONTAINER */}
            <div className="bg-[#FDFCF9] rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
              
              {/* Dashboard Topbar */}
              <div className="bg-gray-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-udec-crimson)] flex items-center justify-center font-serif text-xl font-bold shadow-md">
                    {activeCompany.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-serif font-medium">{activeCompany}</h3>
                      <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Convenio Activo
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs font-light">
                      Bolsa Corporativa: 100 Créditos de Formación
                    </p>
                  </div>
                </div>

                {/* Actions: Recargar Bolsa & Asignar Créditos */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleComprarBolsaPSE(50, 12600000)}
                    disabled={isBuyingCredits}
                    className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-amber-300" />
                    {isBuyingCredits ? 'Conectando...' : 'Recargar Bolsa vía PSE'}
                  </button>

                  <button
                    onClick={() => setIsAssignModalOpen(true)}
                    className="px-6 py-2.5 bg-[var(--color-udec-crimson)] hover:bg-black text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <Plus className="w-4 h-4" />
                    Asignar Créditos a Colaborador
                  </button>
                </div>
              </div>

              {/* 4 Metric Cards */}
              <div className="p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-5 border-b border-gray-200 bg-white">
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                  <span className="text-[11px] uppercase font-bold text-gray-400 tracking-wider block mb-1">
                    Bolsa Contratada
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-mono text-gray-900">{totalCredits}</span>
                    <span className="text-xs text-gray-500">Créditos</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                  <span className="text-[11px] uppercase font-bold text-emerald-700 tracking-wider block mb-1">
                    Créditos Consumidos
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-mono text-emerald-900">{creditosConsumidos}</span>
                    <span className="text-xs text-emerald-700">Créditos ({porcentajeUso}%)</span>
                  </div>
                  <div className="w-full bg-emerald-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${porcentajeUso}%` }} />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100">
                  <span className="text-[11px] uppercase font-bold text-blue-700 tracking-wider block mb-1">
                    Créditos Disponibles
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-mono text-blue-900">{creditosDisponibles}</span>
                    <span className="text-xs text-blue-700">Créditos listos</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-100">
                  <span className="text-[11px] uppercase font-bold text-purple-700 tracking-wider block mb-1">
                    Colaboradores Activos
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-mono text-purple-900">{employees.length}</span>
                    <span className="text-xs text-purple-700">Profesionales</span>
                  </div>
                </div>
              </div>

              {/* Table Toolbar */}
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Buscar colaborador o curso..."
                      value={portalSearch}
                      onChange={(e) => setPortalSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto text-xs">
                    <span className="text-gray-400 font-semibold text-[10px] uppercase">Filtrar:</span>
                    <button
                      onClick={() => setPortalStatusFilter('todos')}
                      className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                        portalStatusFilter === 'todos' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Todos ({employees.length})
                    </button>
                    <button
                      onClick={() => setPortalStatusFilter('en_curso')}
                      className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                        portalStatusFilter === 'en_curso' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      En Curso
                    </button>
                    <button
                      onClick={() => setPortalStatusFilter('completado')}
                      className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                        portalStatusFilter === 'completado' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Certificados Emitidos
                    </button>
                  </div>
                </div>

                {/* EMPLOYEES & COURSES TABLE */}
                <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-3.5 px-4">Colaborador / Cargo</th>
                        <th className="py-3.5 px-4">Curso Asignado FCE</th>
                        <th className="py-3.5 px-4">Docente a Cargo</th>
                        <th className="py-3.5 px-4 text-center">Créditos</th>
                        <th className="py-3.5 px-4">Progreso</th>
                        <th className="py-3.5 px-4">Estado</th>
                        <th className="py-3.5 px-4 text-right">Certificación</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredEmployees.map((emp) => (
                        <tr key={emp.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="py-4 px-4">
                            <div className="font-semibold text-gray-900 text-sm">{emp.nombre}</div>
                            <div className="text-gray-500 text-[11px] font-light">{emp.cargo} • {emp.correo}</div>
                          </td>
                          <td className="py-4 px-4 max-w-[280px]">
                            <div className="font-medium text-gray-900 leading-snug">{emp.cursoAsignado}</div>
                            <div className="text-[10px] text-gray-400 font-light">{emp.area}</div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-gray-700">
                            <span className="font-medium">{emp.docente}</span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                              {emp.creditosUsados} Cr
                            </span>
                          </td>
                          <td className="py-4 px-4 w-32">
                            <div className="flex items-center gap-2">
                              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${
                                    emp.progreso === 100 ? 'bg-emerald-500' : 'bg-blue-600'
                                  }`}
                                  style={{ width: `${emp.progreso}%` }}
                                />
                              </div>
                              <span className="text-[10px] font-mono text-gray-500">{emp.progreso}%</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              emp.estado === 'Certificado Emitido'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}>
                              {emp.estado === 'Certificado Emitido' ? (
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Clock className="w-3 h-3 text-blue-600" />
                              )}
                              {emp.estado}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right whitespace-nowrap">
                            {emp.estado === 'Certificado Emitido' ? (
                              <button
                                onClick={() => setSelectedCertDemo(emp)}
                                className="text-emerald-700 hover:text-emerald-900 font-semibold inline-flex items-center gap-1 hover:underline text-[11px]"
                              >
                                <Download className="w-3.5 h-3.5" />
                                Diploma UdeC
                              </button>
                            ) : (
                              <span className="text-gray-400 text-[11px] font-light">En Desarrollo</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* CO-CREATION LABS: SOLUCIONES A MEDIDA (ESTILO ORIGINAL RESTAURADO) */}
        <section className="py-32 bg-[#FDFCF9] relative">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              
              <div className="lg:sticky lg:top-32 self-start">
                <span className="text-[var(--color-udec-crimson)] font-semibold text-xs tracking-widest uppercase mb-4 block">
                  Soluciones a Medida
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-[1.1] mb-6">
                  UdeC Co-Creation Labs
                </h2>
                <p className="text-xl text-gray-600 font-light leading-relaxed mb-10">
                  Transformamos los manuales y procesos internos de su empresa en rutas de certificación rigurosas, diseñadas por doctores en educación y docentes titulares de la Facultad de Ciencias Económicas.
                </p>
                <div className="w-24 h-px bg-gray-300" />
              </div>

              <div className="space-y-12">
                {[
                  {
                    num: "01",
                    title: "Auditoría de Conocimiento",
                    desc: "Extraemos el núcleo de su negocio a partir de sus manuales operativos y lineamientos corporativos."
                  },
                  {
                    num: "02",
                    title: "Ingeniería Pedagógica",
                    desc: "Nuestro cuerpo docente estructura el material aplicando neuroeducación avanzada para asegurar retención y aplicación inmediata."
                  },
                  {
                    num: "03",
                    title: "Campus Virtual Privado",
                    desc: "Lanzamos su academia corporativa bajo la infraestructura de la Universidad de Cartagena, otorgando certificados oficiales verificables."
                  }
                ].map((step, idx) => (
                  <div key={idx} className="group flex gap-8">
                    <div className="flex-shrink-0">
                      <span className="text-4xl font-serif font-light text-gray-300 group-hover:text-[var(--color-udec-crimson)] transition-colors duration-300">
                        {step.num}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-medium text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-lg text-gray-500 font-light leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* CTA FINAL & FORMULARIO DE DIAGNÓSTICO INSTITUCIONAL */}
        <section id="diagnostico" className="py-32 bg-gray-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-serif font-light mb-8">
              El talento exige prestigio.
            </h2>
            <p className="text-xl text-gray-400 font-light mb-12">
              Agende una reunión con nuestros asesores académicos corporativos para estructurar el plan de créditos de su organización.
            </p>

            {contactSubmitted ? (
              <div className="p-8 bg-white/10 rounded-3xl border border-white/20 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-xl font-serif font-medium text-white mb-2">Solicitud de Diagnóstico Recibida</h3>
                <p className="text-sm text-gray-300 font-light">
                  Un asesor corporativo de posgrados se comunicará con {contactData.nombre || 'su empresa'} en las próximas 24 horas hábiles.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="bg-white/5 p-8 rounded-3xl border border-white/10 text-left space-y-4 max-w-xl mx-auto backdrop-blur-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-300 mb-1">Empresa *</label>
                    <input
                      type="text"
                      required
                      placeholder="Razón Social"
                      value={contactData.empresa}
                      onChange={(e) => setContactData({ ...contactData, empresa: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-300 mb-1">NIT *</label>
                    <input
                      type="text"
                      required
                      placeholder="900.123.456-7"
                      value={contactData.nit}
                      onChange={(e) => setContactData({ ...contactData, nit: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-300 mb-1">Nombre del Contacto *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nombre y Apellido"
                      value={contactData.nombre}
                      onChange={(e) => setContactData({ ...contactData, nombre: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-300 mb-1">Correo Corporativo *</label>
                    <input
                      type="email"
                      required
                      placeholder="contacto@empresa.com"
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-colors shadow-xl text-sm tracking-wide flex items-center justify-center gap-2 mt-4"
                >
                  Agendar Diagnóstico Institucional
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </section>

      </main>

      {/* MODAL: ASIGNAR CRÉDITOS A COLABORADOR */}
      <AnimatePresence>
        {isAssignModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 text-left"
            >
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-bold uppercase text-[var(--color-udec-crimson)] mb-2">
                <Building2 className="w-4 h-4" />
                Gestión de Bolsa de Créditos
              </div>

              <h3 className="text-2xl font-serif text-gray-900 mb-2">
                Asignar Créditos a Colaborador
              </h3>
              <p className="text-xs text-gray-500 mb-6 font-light">
                Seleccione el empleado y el curso del catálogo. Los créditos correspondientes serán descontados automáticamente de su bolsa ({creditosDisponibles} Cr disponibles).
              </p>

              <form onSubmit={handleAssignCredits} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">Nombre Completo del Colaborador *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Dr. Mauricio Castillo"
                    value={newEmployeeName}
                    onChange={(e) => setNewEmployeeName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-gray-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">Cargo / Puesto</label>
                    <input
                      type="text"
                      placeholder="Ej. Auditor Médico"
                      value={newEmployeeRole}
                      onChange={(e) => setNewEmployeeRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">Correo Corporativo *</label>
                    <input
                      type="email"
                      required
                      placeholder="mcastillo@empresa.com"
                      value={newEmployeeEmail}
                      onChange={(e) => setNewEmployeeEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">Curso Corto a Asignar *</label>
                  <select
                    value={newEmployeeCourseId}
                    onChange={(e) => setNewEmployeeCourseId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-gray-900"
                  >
                    {CURSOS_EDUCACION_CONTINUA.map((c) => (
                      <option key={c.id} value={c.id}>
                        [{c.area}] {c.titulo} (Prof. {c.docente}) — {c.creditosEmpresa} Cr
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                  <div className="flex justify-between items-center mb-1">
                    <span>Consumo en Créditos:</span>
                    <strong className="font-mono text-sm">2 Créditos</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Saldo Disponible:</span>
                    <strong className="font-mono text-sm">{creditosDisponibles} Cr &rarr; {Math.max(0, creditosDisponibles - 2)} Cr</strong>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAssignModalOpen(false)}
                    className="px-5 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gray-900 hover:bg-[var(--color-udec-crimson)] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors shadow-sm"
                  >
                    Confirmar y Asignar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DIPLOMA PREVIEW MODAL */}
      <AnimatePresence>
        {selectedCertDemo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative border-8 border-gray-100 text-center"
            >
              <button
                onClick={() => setSelectedCertDemo(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-4 border-double border-[var(--color-udec-gold)] p-8 rounded-2xl bg-[#FCFBF7]">
                <img 
                  src="https://unicartagena.edu.co/images/logo/logo-unicaragena.svg" 
                  alt="UdeC" 
                  className="h-12 mx-auto mb-4"
                />
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gray-500 block mb-2">
                  Facultad de Ciencias Económicas • Educación Continua
                </span>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-1">
                  Certificado de Aprobación
                </h3>
                <p className="text-xs text-gray-500 font-light mb-6">
                  Se certifica que el profesional
                </p>

                <h4 className="text-2xl font-serif italic text-[var(--color-udec-crimson)] mb-2 font-semibold">
                  {selectedCertDemo.nombre}
                </h4>
                <p className="text-xs text-gray-500 mb-6">
                  con el cargo de <strong className="text-gray-800">{selectedCertDemo.cargo}</strong> en <strong className="text-gray-800">{selectedCertDemo.empresa}</strong>
                </p>

                <p className="text-xs text-gray-700 font-light max-w-md mx-auto leading-relaxed mb-6">
                  Cursó y aprobó satisfactoriamente el módulo ejecutivo de posgrado en:
                  <strong className="block text-sm font-serif font-bold text-gray-900 mt-1">
                    {selectedCertDemo.cursoAsignado}
                  </strong>
                  con una intensidad de 32 horas académicas (2 Créditos), dictado por el docente titular {selectedCertDemo.docente}.
                </p>

                <div className="flex justify-between items-end pt-8 border-t border-gray-200 text-[10px] text-gray-500">
                  <div className="text-center">
                    <div className="w-32 h-px bg-gray-400 mx-auto mb-1" />
                    <span>Decano Facultad de Ciencias Económicas</span>
                  </div>
                  <div className="text-center">
                    <span className="font-mono text-gray-400 block">QR-VERIFIED</span>
                    <span className="text-emerald-700 font-bold">Acreditado UdeC</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={() => setSelectedCertDemo(null)}
                  className="px-6 py-2.5 bg-gray-900 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[var(--color-udec-crimson)]"
                >
                  Cerrar Vista Previa
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
