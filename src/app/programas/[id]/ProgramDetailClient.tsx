'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Calendar, 
  BookOpen, 
  GraduationCap, 
  ArrowRight, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Building2,
  UserCheck,
  Award,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import { PROGRAMAS_DB, getCampusName } from '@/data/programasData';

export default function ProgramDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const programa = PROGRAMAS_DB[resolvedParams.id as keyof typeof PROGRAMAS_DB] || PROGRAMAS_DB['1'];
  
  const [activeTab, setActiveTab] = useState<'descripcion' | 'temario' | 'competencias' | 'certificacion' | 'empresas'>('descripcion');

  return (
    <main className="flex min-h-screen flex-col bg-[#FDFCF9]">
      <Navbar />
      
      {/* Premium Hero Banner */}
      <div className="relative pt-36 pb-24 overflow-hidden bg-white border-b border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-orange-50/20 opacity-80" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[var(--color-udec-crimson)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/#cursos" className="inline-flex items-center text-xs uppercase font-bold tracking-widest text-gray-500 hover:text-[var(--color-udec-crimson)] mb-8 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Volver al catálogo de cursos cortos
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-[var(--color-udec-crimson)]/10 text-[var(--color-udec-crimson)] text-xs font-bold uppercase tracking-wider rounded-full">
                    {programa.categoria}
                  </span>
                  <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    {programa.codigo || 'FCE-MOD'}
                  </span>
                  <span className="flex items-center text-xs text-gray-600 font-medium">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-[var(--color-udec-crimson)]" />
                    {programa.sede || getCampusName(programa.facultad)}
                  </span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 leading-[1.15] mb-6">
                  {programa.titulo}
                </h1>

                {/* Teacher Box */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-200/80 mb-8 max-w-md">
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-800 text-xs">
                    <UserCheck className="w-5 h-5 text-[var(--color-udec-crimson)]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Docente Investigador FCE</span>
                    <strong className="text-sm text-gray-900">{programa.docente || 'Claustro de Posgrados FCE'}</strong>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Intensidad</span>
                    <div className="flex items-center text-xs font-medium text-gray-900">
                      <Clock className="w-4 h-4 mr-2 text-[var(--color-udec-crimson)] flex-shrink-0" />
                      <span>{programa.duracion}</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Modalidad</span>
                    <div className="flex items-center text-xs font-medium text-gray-900">
                      <Layers className="w-4 h-4 mr-2 text-[var(--color-udec-crimson)] flex-shrink-0" />
                      <span>{programa.modalidad || 'Híbrida'}</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Certificación</span>
                    <div className="flex items-center text-xs font-medium text-gray-900">
                      <ShieldCheck className="w-4 h-4 mr-2 text-emerald-600 flex-shrink-0" />
                      <span>Oficial UdeC</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Action Card */}
            <div className="lg:col-span-5 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white p-7 sm:p-8 rounded-3xl shadow-xl border border-gray-200 relative"
              >
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                  <h3 className="text-xl font-serif text-gray-900">Opciones de Acceso</h3>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    Cupos Disponibles
                  </span>
                </div>

                {/* Plan 1: Particular */}
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 mb-3">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Inscripción Particular</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-bold font-mono text-gray-900">
                      {programa.inversion?.split('(')[0] || '$780.000 COP'}
                    </span>
                    <span className="text-xs text-gray-500 font-light">Pago directo</span>
                  </div>
                </div>

                {/* Plan 2: Empresa */}
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 mb-6">
                  <span className="text-[10px] uppercase font-bold text-blue-700 block mb-1">Plan Empresas (B2B)</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-lg font-bold font-mono text-blue-950">
                      {programa.creditosEmpresa || 2} Créditos Corporativos
                    </span>
                    <span className="text-xs text-blue-700 font-medium">Bolsa flexible</span>
                  </div>
                  <p className="text-[11px] text-blue-800 font-light mt-1">
                    Canjeable con la membresía corporativa de su organización.
                  </p>
                </div>

                <div className="space-y-3">
                  <Link 
                    href={`/inscripcion?curso=${programa.id}`} 
                    className="w-full bg-gray-900 text-white py-3.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[var(--color-udec-crimson)] transition-all flex justify-center items-center gap-2 shadow-md hover:shadow-lg"
                  >
                    Inscribirme de Forma Particular
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link 
                    href="/empresas"
                    className="w-full bg-white text-gray-900 border border-gray-300 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-gray-50 transition-all flex justify-center items-center gap-2 text-center"
                  >
                    <Building2 className="w-4 h-4 text-blue-700" />
                    Canjear con Plan de mi Empresa
                  </Link>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-light">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    Inicio: {programa.proximoInicio || 'Próximo mes'}
                  </span>
                  <span>Código: {programa.codigo || 'FCE-01'}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="lg:w-8/12">
          
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-10 overflow-x-auto no-scrollbar gap-4 sm:gap-8">
            <button 
              onClick={() => setActiveTab('descripcion')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors relative whitespace-nowrap ${activeTab === 'descripcion' ? 'text-[var(--color-udec-crimson)]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Presentación
              {activeTab === 'descripcion' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-udec-crimson)]" />
              )}
            </button>

            <button 
              onClick={() => setActiveTab('temario')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors relative whitespace-nowrap ${activeTab === 'temario' ? 'text-[var(--color-udec-crimson)]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Temario & Estructura
              {activeTab === 'temario' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-udec-crimson)]" />
              )}
            </button>

            <button 
              onClick={() => setActiveTab('competencias')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors relative whitespace-nowrap ${activeTab === 'competencias' ? 'text-[var(--color-udec-crimson)]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Competencias & Perfil
              {activeTab === 'competencias' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-udec-crimson)]" />
              )}
            </button>

            <button 
              onClick={() => setActiveTab('certificacion')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors relative whitespace-nowrap ${activeTab === 'certificacion' ? 'text-[var(--color-udec-crimson)]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Certificación Oficial
              {activeTab === 'certificacion' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-udec-crimson)]" />
              )}
            </button>

            <button 
              onClick={() => setActiveTab('empresas')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors relative whitespace-nowrap ${activeTab === 'empresas' ? 'text-blue-700' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Para Empresas (B2B)
              {activeTab === 'empresas' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-700" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[260px]">
            <AnimatePresence mode="wait">
              {activeTab === 'descripcion' && (
                <motion.div
                  key="descripcion"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-[var(--color-udec-crimson)] flex items-center justify-center flex-shrink-0 mt-1">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-serif text-gray-900 mb-3">Enfoque Académico</h2>
                      <p className="text-base text-gray-600 font-light leading-relaxed mb-4">
                        {programa.descripcion}
                      </p>
                      <p className="text-sm text-gray-500 font-light">
                        Módulo perteneciente a la oferta curricular de <strong className="font-semibold text-gray-800">{programa.programaOrigen || 'Posgrados FCE'}</strong>, homologable dentro de las rutas académicas formales de la Universidad de Cartagena.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'temario' && (
                <motion.div
                  key="temario"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-200/80 text-center">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Intensidad</span>
                      <strong className="text-sm text-gray-900">{programa.duracion}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Créditos FCE</span>
                      <strong className="text-sm text-gray-900">{programa.creditosEmpresa || 2} Créditos</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Modalidad</span>
                      <strong className="text-sm text-gray-900">{programa.modalidad || 'Híbrida'}</strong>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-serif text-gray-900 mb-3">Estructura Modular del Aprendizaje</h3>
                    <div className="space-y-3 text-xs">
                      <div className="p-4 rounded-2xl border border-gray-200 bg-white">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-gray-900 text-sm">Unidad 1: Fundamentación Teórica y Marco Regulatorio</span>
                          <span className="text-gray-400 font-mono text-[11px]">Semana 1</span>
                        </div>
                        <p className="text-gray-600 font-light leading-relaxed">
                          Bases conceptuales avanzadas, directrices del sector y marco analítico para la toma de decisiones estratégicas.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl border border-gray-200 bg-white">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-gray-900 text-sm">Unidad 2: Metodología Aplicada y Análisis de Casos</span>
                          <span className="text-gray-400 font-mono text-[11px]">Semana 2</span>
                        </div>
                        <p className="text-gray-600 font-light leading-relaxed">
                          Talleres prácticos con datos y dilemas de organizaciones colombianas, modelación cuantitativa y evaluación de riesgos.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl border border-gray-200 bg-white">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-gray-900 text-sm">Unidad 3: Taller Aplicado y Sustentación</span>
                          <span className="text-gray-400 font-mono text-[11px]">Semana 3-4</span>
                        </div>
                        <p className="text-gray-600 font-light leading-relaxed">
                          Entrega de proyecto o propuesta de intervención avalada por el docente titular de la Facultad de Ciencias Económicas.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'competencias' && (
                <motion.div
                  key="competencias"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-serif text-gray-900 mb-2">Perfil Profesional Objetivo</h3>
                    <p className="text-sm text-gray-600 font-light leading-relaxed mb-6">
                      {programa.perfilEgresado}
                    </p>

                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Resultados de Aprendizaje</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(programa.competencias || [
                        'Aplicación práctica de marcos normativos y analíticos',
                        'Toma de decisiones fundamentada en evidencia',
                        'Liderazgo y resolución de casos complejos'
                      ]).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'certificacion' && (
                <motion.div
                  key="certificacion"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200">
                    <div className="flex items-center gap-3 mb-3">
                      <ShieldCheck className="w-6 h-6 text-amber-700 flex-shrink-0" />
                      <h4 className="font-serif font-bold text-gray-900 text-base">
                        Certificación Universitaria Oficial con Código QR
                      </h4>
                    </div>
                    <p className="text-sm text-gray-700 font-light leading-relaxed mb-4">
                      Al completar satisfactoriamente el curso, la <strong>Universidad de Cartagena</strong> emite el diploma digital oficial de Educación Continua con registro institucional y código QR para verificación inmediata en hojas de vida y procesos de auditoría laboral.
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-700">
                      <span className="px-3 py-1 bg-white rounded-lg border border-amber-200 font-medium">Asistencia mínima: 80%</span>
                      <span className="px-3 py-1 bg-white rounded-lg border border-amber-200 font-medium">Aprobación Proyecto Final</span>
                      <span className="px-3 py-1 bg-white rounded-lg border border-amber-200 font-medium">Registro en SMA / Posgrados</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 text-xs">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-4 h-4 text-blue-800" />
                      <strong className="text-blue-900 text-sm">Homologabilidad de Créditos a Posgrados FCE</strong>
                    </div>
                    <p className="text-blue-900/80 font-light leading-relaxed">
                      Este módulo es homologable para estudiantes que deseen ingresar posteriormente a programas de especialización o maestría de la Facultad de Ciencias Económicas, mediante solicitud formal ante el Consejo de Facultad.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'empresas' && (
                <motion.div
                  key="empresas"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-6 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-4 text-xs"
                >
                  <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                    <Building2 className="w-4 h-4 text-blue-700" />
                    ¿Desea capacitar a múltiples colaboradores en este curso?
                  </div>
                  <p className="text-gray-600 leading-relaxed font-light">
                    Este curso corto equivale a <strong className="font-semibold text-gray-900">{programa.creditosEmpresa || 2} Créditos Corporativos</strong>. Adquiera una bolsa de formación para su empresa y asigne cupos a demanda con auditoría de notas y certificados en vivo.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/empresas"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-900 hover:bg-blue-950 text-white rounded-full font-bold uppercase tracking-wider text-[11px]"
                    >
                      Ver Planes y Simulador de Empresas
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Simple 3-step rapid registration banner */}
          <div className="mt-12 p-6 rounded-3xl bg-gray-50 border border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-400 uppercase font-bold tracking-wider mb-4">
              <span>Ruta de Matrícula Ágil</span>
              <span className="text-emerald-700 font-semibold normal-case">Proceso 100% en línea</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 bg-white rounded-2xl border border-gray-100 shadow-2xs">
                <span className="font-bold text-gray-900 block mb-0.5">1. Formulario Rápido</span>
                <span className="text-gray-500 font-light text-[11px]">Cédula, correo y celular</span>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-gray-100 shadow-2xs">
                <span className="font-bold text-gray-900 block mb-0.5">2. Pago Seguro</span>
                <span className="text-gray-500 font-light text-[11px]">PSE, Tarjetas o Bolsa Corporativa</span>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-gray-100 shadow-2xs">
                <span className="font-bold text-gray-900 block mb-0.5">3. Activación Inmediata</span>
                <span className="text-gray-500 font-light text-[11px]">Ingreso al aula virtual y cronograma</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
