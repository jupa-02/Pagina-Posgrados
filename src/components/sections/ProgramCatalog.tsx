'use client';

import { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  Filter, 
  X, 
  Building2, 
  UserCheck, 
  ArrowRight, 
  CheckCircle2, 
  Calendar,
  ChevronRight,
  BookOpen,
  Award,
  FileText,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CURSOS_EDUCACION_CONTINUA, AREAS_TEMATICAS, CursoEducacionContinua } from '@/data/cursosEducacionContinua';

function getCourseImage(curso: CursoEducacionContinua): string {
  const t = curso.titulo.toLowerCase();
  const a = curso.areaKey;
  if (a === 'salud') {
    if (t.includes('hospital') || t.includes('clínic')) return 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80';
    if (t.includes('cuenta') || t.includes('factura') || t.includes('glosa')) return 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80';
    if (t.includes('médic') || t.includes('acto')) return 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80';
    return 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80';
  }
  if (a === 'finanzas') {
    if (t.includes('bursatil') || t.includes('mercado') || t.includes('capital')) return 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80';
    if (t.includes('valoración') || t.includes('riesgo')) return 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80';
    return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';
  }
  if (a === 'revisoria') {
    if (t.includes('sistema') || t.includes('información')) return 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80';
    return 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80';
  }
  if (a === 'organizaciones') {
    if (t.includes('logística') || t.includes('operaciones')) return 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80';
    return 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80';
  }
  if (t.includes('estrategia') || t.includes('prospectiva')) return 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80';
  return 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80';
}

export default function ProgramCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeAreaKey, setActiveAreaKey] = useState<string>('todas');
  const [selectedSede, setSelectedSede] = useState<string>('todas');
  const [selectedModalidad, setSelectedModalidad] = useState<string>('todas');
  const [selectedCursoModal, setSelectedCursoModal] = useState<CursoEducacionContinua | null>(null);
  const [modalTab, setModalTab] = useState<'presentacion' | 'temario' | 'metodologia' | 'certificacion'>('presentacion');

  const [visibleCount, setVisibleCount] = useState<number>(12);

  useEffect(() => {
    setVisibleCount(12);
  }, [searchTerm, activeAreaKey, selectedSede, selectedModalidad]);

  const filteredCursos = useMemo(() => {
    return CURSOS_EDUCACION_CONTINUA.filter((curso) => {
      const matchesSearch = 
        curso.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curso.docente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curso.programaOrigen.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curso.codigo.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesArea = activeAreaKey === 'todas' || curso.areaKey === activeAreaKey;
      
      const matchesSede = 
        selectedSede === 'todas' || 
        (selectedSede === 'magangue' && curso.sede.includes('Magangué')) ||
        (selectedSede === 'cartagena' && curso.sede.includes('Cartagena'));

      const matchesModalidad = 
        selectedModalidad === 'todas' || 
        curso.modalidad.toLowerCase().includes(selectedModalidad.toLowerCase());

      return matchesSearch && matchesArea && matchesSede && matchesModalidad;
    });
  }, [searchTerm, activeAreaKey, selectedSede, selectedModalidad]);

  const displayedCursos = useMemo(() => {
    return filteredCursos.slice(0, visibleCount);
  }, [filteredCursos, visibleCount]);

  return (
    <section className="py-24 w-full bg-[#FDFCF9] relative" id="programas">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Area */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 pb-8 border-b border-gray-200 gap-6">
          <div className="max-w-3xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-udec-crimson)] mb-2 block">
              Oferta Académica de Posgrados
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-4 leading-tight">
              Cursos Cortos y Certificaciones Ejecutivas
            </h2>
            <p className="text-gray-500 font-light text-base sm:text-lg">
              Explora nuestros <strong className="text-gray-900 font-medium">{CURSOS_EDUCACION_CONTINUA.length} módulos de posgrado</strong> dictados por docentes titulares. Formación ágil para profesionales y programas por créditos para empresas.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full lg:w-96">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-[var(--color-udec-crimson)] transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Buscar por curso, docente o área..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-full text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all shadow-xs"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Pills (Áreas Temáticas FCE) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {AREAS_TEMATICAS.map((area) => {
            const isActive = activeAreaKey === area.key;
            return (
              <button
                key={area.key}
                onClick={() => setActiveAreaKey(area.key)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 flex-shrink-0 ${
                  isActive
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-white border border-gray-200/80 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                <span>{area.nombre}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {area.totalCursos}
                </span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 bg-white p-4 rounded-xl border border-gray-200/70 shadow-2xs">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="font-semibold text-gray-600 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              Filtros:
            </span>

            {/* Sede selector */}
            <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-lg border border-gray-200">
              <span className="text-[10px] uppercase font-bold text-gray-400 px-2">Sede:</span>
              <button
                onClick={() => setSelectedSede('todas')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  selectedSede === 'todas' ? 'bg-white text-gray-900 font-bold shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setSelectedSede('cartagena')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  selectedSede === 'cartagena' ? 'bg-white text-gray-900 font-bold shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Cartagena
              </button>
              <button
                onClick={() => setSelectedSede('magangue')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  selectedSede === 'magangue' ? 'bg-white text-gray-900 font-bold shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Magangué
              </button>
            </div>

            {/* Modalidad selector */}
            <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-lg border border-gray-200">
              <span className="text-[10px] uppercase font-bold text-gray-400 px-2">Modalidad:</span>
              <button
                onClick={() => setSelectedModalidad('todas')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  selectedModalidad === 'todas' ? 'bg-white text-gray-900 font-bold shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setSelectedModalidad('híbrida')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  selectedModalidad === 'híbrida' ? 'bg-white text-gray-900 font-bold shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Híbrida
              </button>
              <button
                onClick={() => setSelectedModalidad('virtual')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  selectedModalidad === 'virtual' ? 'bg-white text-gray-900 font-bold shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Virtual
              </button>
            </div>
          </div>

          <div className="text-xs text-gray-500">
            Mostrando <strong className="text-gray-900 font-semibold">{filteredCursos.length}</strong> cursos disponibles
          </div>
        </div>

        {/* Courses Grid with Robust Cards & Images */}
        {filteredCursos.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-gray-200">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-serif text-gray-900 mb-2">No se encontraron cursos con estos criterios</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto mb-6 font-light">
              Pruebe cambiando los filtros de sede, modalidad o término de búsqueda.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveAreaKey('todas');
                setSelectedSede('todas');
                setSelectedModalidad('todas');
              }}
              className="px-5 py-2.5 bg-gray-900 text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[var(--color-udec-crimson)] transition-colors"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {displayedCursos.map((curso) => {
              const coverImage = getCourseImage(curso);
              return (
                <div
                  key={curso.id}
                  className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200/80 hover:shadow-xl hover:border-gray-300 transition-all duration-300 overflow-hidden"
                >
                  {/* Card Visual Header */}
                  <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                    <img 
                      src={coverImage} 
                      alt={curso.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.92]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/95 text-gray-900 shadow-sm backdrop-blur-xs">
                        {curso.area}
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-xs border border-white/20">
                        {curso.creditosAcademicos} Créditos
                      </span>
                    </div>

                    {/* Bottom overlay badge */}
                    <div className="absolute bottom-2.5 left-3 text-white text-[11px] font-medium flex items-center gap-1.5 drop-shadow">
                      <MapPin className="w-3.5 h-3.5 text-amber-300" />
                      <span>{curso.sede.includes('Magangué') ? 'Sede Magangué' : 'Campus Cartagena'}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Course Title */}
                      <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2 leading-snug group-hover:text-[var(--color-udec-crimson)] transition-colors line-clamp-2">
                        {curso.titulo}
                      </h3>

                      {/* Professor Row */}
                      <div className="flex items-center gap-2 mb-4 text-xs text-gray-600">
                        <UserCheck className="w-4 h-4 text-[var(--color-udec-crimson)] flex-shrink-0" />
                        <span className="font-medium text-gray-800 truncate">Prof. {curso.docente}</span>
                      </div>

                      {/* Attributes */}
                      <div className="grid grid-cols-2 gap-2 py-3 border-y border-gray-100 text-xs text-gray-500 mb-5">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span>{curso.duracionHoras} Horas</span>
                        </div>
                        <div className="flex items-center gap-1.5 justify-end">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span className="truncate">{curso.proximoInicio.split(' ')[0]} {curso.proximoInicio.split(' ')[1]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Pricing & Sales Conversion Footer */}
                    <div>
                      <div className="flex items-baseline justify-between mb-4">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Inversión Particular</span>
                          <span className="text-base font-bold font-mono text-gray-900">{curso.inversionIndividual}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-blue-700 block tracking-wider">Plan Empresas</span>
                          <span className="text-xs font-semibold text-blue-950">{curso.creditosEmpresa} Créditos</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            setSelectedCursoModal(curso);
                            setModalTab('presentacion');
                          }}
                          className="w-full py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-semibold tracking-wide transition-colors text-center"
                        >
                          Ver Temario
                        </button>

                        <Link
                          href={`/inscripcion?curso=${curso.id}`}
                          className="w-full py-2.5 px-3 bg-gray-900 hover:bg-[var(--color-udec-crimson)] text-white rounded-xl text-xs font-bold tracking-wide transition-colors text-center flex items-center justify-center gap-1 shadow-sm"
                        >
                          Inscribirme
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredCursos.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount(prev => prev + 12)}
              className="px-8 py-3.5 bg-white border border-gray-300 hover:border-gray-900 text-gray-900 font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-2xs hover:shadow-xs"
            >
              Cargar Más Cursos ({filteredCursos.length - visibleCount} restantes)
            </button>
          </div>
        )}

      </div>

      {/* QUICK VIEW MODAL */}
      <AnimatePresence>
        {selectedCursoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-gray-100"
            >
              <button
                onClick={() => setSelectedCursoModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-50 text-[var(--color-udec-crimson)] border border-orange-100">
                  {selectedCursoModal.area}
                </span>
                <span className="text-xs font-mono font-medium text-gray-400">
                  {selectedCursoModal.codigo}
                </span>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  {selectedCursoModal.creditosEmpresa} Créditos Plan Empresas
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-4 leading-snug">
                {selectedCursoModal.titulo}
              </h2>

              {/* Tab Navigation (Inspired by top university portfolios with modern clean UI) */}
              <div className="flex border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar gap-2">
                <button
                  onClick={() => setModalTab('presentacion')}
                  className={`pb-3 px-3 text-xs font-bold tracking-wide uppercase transition-all whitespace-nowrap border-b-2 flex items-center gap-1.5 ${
                    modalTab === 'presentacion'
                      ? 'border-[var(--color-udec-crimson)] text-[var(--color-udec-crimson)]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Presentación & Perfil
                </button>

                <button
                  onClick={() => setModalTab('temario')}
                  className={`pb-3 px-3 text-xs font-bold tracking-wide uppercase transition-all whitespace-nowrap border-b-2 flex items-center gap-1.5 ${
                    modalTab === 'temario'
                      ? 'border-[var(--color-udec-crimson)] text-[var(--color-udec-crimson)]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Temario & Estructura
                </button>

                <button
                  onClick={() => setModalTab('metodologia')}
                  className={`pb-3 px-3 text-xs font-bold tracking-wide uppercase transition-all whitespace-nowrap border-b-2 flex items-center gap-1.5 ${
                    modalTab === 'metodologia'
                      ? 'border-[var(--color-udec-crimson)] text-[var(--color-udec-crimson)]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Docente & Metodología
                </button>

                <button
                  onClick={() => setModalTab('certificacion')}
                  className={`pb-3 px-3 text-xs font-bold tracking-wide uppercase transition-all whitespace-nowrap border-b-2 flex items-center gap-1.5 ${
                    modalTab === 'certificacion'
                      ? 'border-[var(--color-udec-crimson)] text-[var(--color-udec-crimson)]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  Certificación Oficial
                </button>
              </div>

              {/* Tab 1: Presentación & Perfil */}
              {modalTab === 'presentacion' && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Justificación del Curso</h4>
                    <p className="text-sm text-gray-600 font-light leading-relaxed">
                      {selectedCursoModal.descripcion}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/80">
                    <span className="text-gray-400 uppercase font-bold text-[10px] block mb-1">Público Objetivo & Perfil de Ingreso</span>
                    <p className="text-xs text-gray-700 leading-relaxed font-light">
                      {selectedCursoModal.perfilDirigido}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Competencias que Desarrollarás</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedCursoModal.competencias.map((comp, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-gray-700 font-light p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100/60">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{comp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Temario & Estructura */}
              {modalTab === 'temario' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-200/80 text-center">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Intensidad</span>
                      <strong className="text-sm text-gray-900">{selectedCursoModal.duracionHoras} Horas</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Créditos FCE</span>
                      <strong className="text-sm text-gray-900">{selectedCursoModal.creditosEmpresa} Créditos</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Nivel</span>
                      <strong className="text-sm text-gray-900">Posgrado / Ejecutivo</strong>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Estructura Modular del Aprendizaje</h4>
                    <div className="space-y-3 text-xs">
                      <div className="p-3.5 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-gray-900">Módulo 1: Fundamentación Teórica y Marco Regulatorio</span>
                          <span className="text-gray-400 font-mono text-[11px]">Semana 1</span>
                        </div>
                        <p className="text-gray-500 font-light">Bases conceptuales, directrices normativas aplicables y contexto económico del sector.</p>
                      </div>

                      <div className="p-3.5 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-gray-900">Módulo 2: Análisis de Casos y Toma de Decisiones</span>
                          <span className="text-gray-400 font-mono text-[11px]">Semana 2</span>
                        </div>
                        <p className="text-gray-500 font-light">Metodologías cuantitativas y cualitativas aplicadas a dilemas organizacionales reales.</p>
                      </div>

                      <div className="p-3.5 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-gray-900">Módulo 3: Taller Aplicado y Presentación de Solución</span>
                          <span className="text-gray-400 font-mono text-[11px]">Semana 3-4</span>
                        </div>
                        <p className="text-gray-500 font-light">Elaboración de propuesta de valor o auditoría práctica evaluada por el docente titular.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Docente & Metodología */}
              {modalTab === 'metodologia' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200/80">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-800">
                        <UserCheck className="w-6 h-6 text-[var(--color-udec-crimson)]" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Docente Titular Asignado</span>
                        <strong className="text-base text-gray-900">{selectedCursoModal.docente}</strong>
                        <span className="text-xs text-gray-500 block">Facultad de Ciencias Económicas • Universidad de Cartagena</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 font-light leading-relaxed">
                      Docente con amplia trayectoria investigativa y vinculación en programas de {selectedCursoModal.programaOrigen}. Experto en docencia orientada a resolución de problemas del entorno productivo caribe y nacional.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-white border border-gray-200">
                      <span className="text-gray-400 uppercase font-bold text-[10px] block mb-1">Modalidad de Impartición</span>
                      <p className="text-gray-900 font-semibold">{selectedCursoModal.modalidad}</p>
                      <p className="text-gray-500 font-light mt-1">Sesiones sincrónicas + talleres prácticos con soporte en el Campus Virtual UdeC.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-gray-200">
                      <span className="text-gray-400 uppercase font-bold text-[10px] block mb-1">Sede de Ejecución</span>
                      <p className="text-gray-900 font-semibold">{selectedCursoModal.sede}</p>
                      <p className="text-gray-500 font-light mt-1">Aulas inteligentes de posgrados con conectividad de alta velocidad y biblioteca especializada.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Certificación & Homologación */}
              {modalTab === 'certificacion' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/70">
                    <div className="flex items-center gap-3 mb-2">
                      <ShieldCheck className="w-6 h-6 text-amber-600 flex-shrink-0" />
                      <h4 className="font-serif font-semibold text-gray-900 text-sm">
                        Certificado Digital con Verificación QR Institucional
                      </h4>
                    </div>
                    <p className="text-xs text-gray-600 font-light leading-relaxed mb-3">
                      Al completar satisfactoriamente el curso, la <strong>Universidad de Cartagena</strong> expide el certificado oficial de Educación Continua respaldado por la resolución de aprobación de la Facultad de Ciencias Económicas.
                    </p>
                    <div className="flex flex-wrap gap-2 text-[11px] text-gray-700">
                      <span className="px-2.5 py-1 bg-white rounded-md border border-amber-200/60 font-medium">Requisito: 80% Asistencia</span>
                      <span className="px-2.5 py-1 bg-white rounded-md border border-amber-200/60 font-medium">Aprobación Proyecto Final</span>
                      <span className="px-2.5 py-1 bg-white rounded-md border border-amber-200/60 font-medium">Válido para Hoja de Vida</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-xs">
                    <div className="flex items-center gap-2 mb-1.5">
                      <GraduationCap className="w-4 h-4 text-blue-800" />
                      <strong className="text-blue-900">Homologabilidad de Créditos a Posgrados</strong>
                    </div>
                    <p className="text-blue-800/80 font-light leading-relaxed">
                      Si el estudiante decide continuar sus estudios en la especialización o maestría de la cual procede este módulo (<strong>{selectedCursoModal.programaOrigen}</strong>), estos {selectedCursoModal.creditosEmpresa} créditos podrán ser homologados formalmente mediante solicitud al Consejo de Facultad.
                    </p>
                  </div>
                </div>
              )}

              {/* Simple 3-step enrollment guide */}
              <div className="mt-8 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-[11px] text-gray-400 uppercase font-bold tracking-wider mb-2">
                  <span>Ruta de Matrícula Ágil</span>
                  <span className="text-emerald-600 font-semibold normal-case">Sin filas ni trámites presenciales</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-gray-50 rounded-xl">
                    <span className="font-bold text-gray-900 block">1. Registro</span>
                    <span className="text-[10px] text-gray-500 font-light">Datos básicos en 2 min</span>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-xl">
                    <span className="font-bold text-gray-900 block">2. Pago / Bolsa</span>
                    <span className="text-[10px] text-gray-500 font-light">PSE, Tarjeta o Crédito</span>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-xl">
                    <span className="font-bold text-gray-900 block">3. Aula Virtual</span>
                    <span className="text-[10px] text-gray-500 font-light">Credenciales al instante</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
                <div>
                  <span className="text-xs text-gray-400 block font-light">Inversión Particular</span>
                  <span className="text-xl font-bold font-mono text-gray-900">{selectedCursoModal.inversionIndividual}</span>
                  <span className="text-xs text-blue-700 font-medium block mt-0.5">o {selectedCursoModal.creditosEmpresa} Créditos Plan Empresas</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    href={`/inscripcion?curso=${selectedCursoModal.id}`}
                    className="w-full sm:w-auto text-center px-6 py-3 bg-[var(--color-udec-crimson)] hover:bg-black text-white text-xs font-bold tracking-widest uppercase rounded-full transition-colors shadow-sm"
                  >
                    Inscribirme Ahora
                  </Link>

                  <Link
                    href="/empresas"
                    className="w-full sm:w-auto text-center px-5 py-3 border border-gray-300 hover:border-gray-900 text-gray-900 text-xs font-bold tracking-widest uppercase rounded-full transition-colors"
                  >
                    Plan Empresas
                  </Link>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
