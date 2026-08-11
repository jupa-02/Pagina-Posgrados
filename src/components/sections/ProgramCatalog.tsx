'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, ChevronRight, BookOpen, MapPin, Clock, CircleDollarSign, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CATALOGO_PROGRAMAS, getCampusName } from '@/data/programasData';

const CATEGORIAS = ['Todos', 'Doctorados', 'Maestrías', 'Especializaciones'];

export default function ProgramCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedFacultades, setSelectedFacultades] = useState<string[]>([]);
  const [selectedModalidades, setSelectedModalidades] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Accordion state
  const [expandedSections, setExpandedSections] = useState({
    rol: true,
    nivel: true,
    modalidad: true,
    facultades: false,
  });

  // Dynamic filter lists based on available data
  const { facultades, modalidades, roles } = useMemo(() => {
    const facs = new Set<string>();
    const mods = new Set<string>();
    const rls = new Set<string>();
    CATALOGO_PROGRAMAS.forEach(p => {
      if (p.facultad) facs.add(p.facultad);
      if (p.modalidad) mods.add(p.modalidad);
      if (p.roles) p.roles.forEach((r: string) => rls.add(r));
    });
    return {
      facultades: Array.from(facs).sort(),
      modalidades: Array.from(mods).sort(),
      roles: Array.from(rls).sort()
    };
  }, []);

  const filteredPrograms = useMemo(() => {
    return CATALOGO_PROGRAMAS.filter((programa) => {
      const matchesSearch = programa.titulo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'Todos' || programa.categoria === activeCategory;
      const matchesFacultad = selectedFacultades.length === 0 || selectedFacultades.includes(programa.facultad);
      const matchesModalidad = selectedModalidades.length === 0 || selectedModalidades.includes(programa.modalidad || 'Presencial');
      const matchesRole = selectedRoles.length === 0 || (programa.roles && programa.roles.some((r: string) => selectedRoles.includes(r)));
      return matchesSearch && matchesCategory && matchesFacultad && matchesModalidad && matchesRole;
    });
  }, [searchTerm, activeCategory, selectedFacultades, selectedModalidades, selectedRoles]);

  const toggleFilter = (item: string, list: string[], setList: (val: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const clearFilters = () => {
    setSelectedFacultades([]);
    setSelectedModalidades([]);
    setSelectedRoles([]);
    setActiveCategory('Todos');
    setSearchTerm('');
  };

  const toggleAccordion = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Prevent background scroll when mobile filter is open
  useEffect(() => {
    if (isMobileFiltersOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileFiltersOpen]);

  return (
    <section className="py-24 w-full bg-[#FDFCF9]" id="programas">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 pb-8 border-b border-gray-200">
          <div className="max-w-3xl">
            <h2 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-4">Descubre tu Potencial</h2>
            <p className="text-gray-500 font-light text-lg">
              Explora nuestros {CATALOGO_PROGRAMAS.length} programas de posgrado. Encuentra la maestría, especialización o doctorado perfecto para avanzar en tu carrera profesional.
            </p>
          </div>
          <div className="mt-8 md:mt-0 w-full md:w-96">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[var(--color-udec-crimson)] transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Buscar por programa o palabra clave..."
                className="block w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-udec-crimson)] focus:border-transparent transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-12 relative">
          
          {/* Mobile Filter Toggle */}
          <button 
            className="lg:hidden flex items-center justify-center gap-2 w-full py-3.5 bg-[var(--color-udec-crimson)] text-white font-medium rounded-xl shadow-md active:scale-95 transition-all z-10"
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <Filter className="w-5 h-5" />
            Filtrar Programas
          </button>

          {/* Mobile Overlay & Sidebar Container */}
          <>
            {/* Overlay for mobile */}
            <AnimatePresence>
              {isMobileFiltersOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 lg:hidden"
                  onClick={() => setIsMobileFiltersOpen(false)}
                />
              )}
            </AnimatePresence>

            {/* Sidebar Filters */}
            <aside 
              className={`
                fixed inset-y-0 right-0 z-50 w-[85vw] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col
                lg:relative lg:w-1/4 lg:max-w-none lg:shadow-none lg:bg-transparent lg:transform-none lg:z-0 lg:flex-shrink-0 lg:block
                ${isMobileFiltersOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
              `}
            >
              {/* Sticky Container for Desktop / Scrollable content for Mobile */}
              <div className="flex flex-col h-full lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)] bg-white lg:p-6 lg:rounded-2xl lg:shadow-sm lg:border lg:border-gray-100 overflow-hidden">
                
                {/* Header (Mobile & Desktop) */}
                <div className="flex justify-between items-center p-6 lg:p-0 border-b border-gray-100 lg:border-none flex-shrink-0">
                  <h3 className="text-xl lg:text-lg font-serif font-semibold text-gray-900">Filtros</h3>
                  
                  {/* Close button for Mobile */}
                  <button onClick={() => setIsMobileFiltersOpen(false)} className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                    <X className="w-6 h-6" />
                  </button>

                  {/* Clear for Desktop (only shows if filters active) */}
                  {(selectedFacultades.length > 0 || selectedModalidades.length > 0 || activeCategory !== 'Todos' || searchTerm !== '') && (
                    <button onClick={clearFilters} className="hidden lg:flex text-sm text-[var(--color-udec-crimson)] hover:underline items-center gap-1">
                      Limpiar
                    </button>
                  )}
                </div>

                {/* Scrollable Filters Area */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-0 lg:mt-6 space-y-6 custom-scrollbar">
                  
                  {/* Rol Accordion */}
                  <div className="border-b border-gray-100 pb-4">
                    <button 
                      className="flex justify-between items-center w-full text-left"
                      onClick={() => toggleAccordion('rol')}
                    >
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-udec-crimson)]">¿Qué rol buscas?</h4>
                      {expandedSections.rol ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </button>

                    <AnimatePresence>
                      {expandedSections.rol && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mt-4"
                        >
                          <div className="space-y-3">
                            {roles.map((r) => (
                              <label key={r} className="flex items-center cursor-pointer group">
                                <div className="relative flex items-center">
                                  <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={selectedRoles.includes(r)}
                                    onChange={() => toggleFilter(r, selectedRoles, setSelectedRoles)}
                                  />
                                  <div className="w-5 h-5 border border-gray-300 rounded bg-white peer-checked:bg-[var(--color-udec-crimson)] peer-checked:border-[var(--color-udec-crimson)] transition-all flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                </div>
                                <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{r}</span>
                              </label>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Categoría Accordion */}
                  <div className="border-b border-gray-100 pb-4">
                    <button 
                      className="flex justify-between items-center w-full text-left"
                      onClick={() => toggleAccordion('nivel')}
                    >
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Nivel Académico</h4>
                      {expandedSections.nivel ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </button>
                    
                    <AnimatePresence>
                      {expandedSections.nivel && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mt-4"
                        >
                          <div className="flex flex-col gap-2">
                            {CATEGORIAS.map((category) => (
                              <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`text-left px-3 py-2 rounded-lg text-sm transition-all flex justify-between items-center ${
                                  activeCategory === category
                                    ? 'bg-[var(--color-udec-crimson)]/10 text-[var(--color-udec-crimson)] font-medium'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                              >
                                {category}
                                {activeCategory === category && <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-udec-crimson)]" />}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Modalidad Accordion */}
                  <div className="border-b border-gray-100 pb-4">
                    <button 
                      className="flex justify-between items-center w-full text-left"
                      onClick={() => toggleAccordion('modalidad')}
                    >
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Modalidad</h4>
                      {expandedSections.modalidad ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </button>

                    <AnimatePresence>
                      {expandedSections.modalidad && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mt-4"
                        >
                          <div className="space-y-3">
                            {modalidades.map((mod) => (
                              <label key={mod} className="flex items-center cursor-pointer group">
                                <div className="relative flex items-center">
                                  <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={selectedModalidades.includes(mod)}
                                    onChange={() => toggleFilter(mod, selectedModalidades, setSelectedModalidades)}
                                  />
                                  <div className="w-5 h-5 border border-gray-300 rounded bg-white peer-checked:bg-[var(--color-udec-crimson)] peer-checked:border-[var(--color-udec-crimson)] transition-all flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                </div>
                                <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{mod}</span>
                              </label>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Facultad Accordion */}
                  <div className="pb-4">
                    <button 
                      className="flex justify-between items-center w-full text-left"
                      onClick={() => toggleAccordion('facultades')}
                    >
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Facultades</h4>
                      {expandedSections.facultades ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </button>

                    <AnimatePresence>
                      {expandedSections.facultades && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mt-4"
                        >
                          {/* No max-height here, we let the parent scrollable area handle it! */}
                          <div className="space-y-3 pb-4">
                            {facultades.map((fac) => (
                              <label key={fac} className="flex items-start cursor-pointer group">
                                <div className="relative flex items-center mt-0.5">
                                  <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={selectedFacultades.includes(fac)}
                                    onChange={() => toggleFilter(fac, selectedFacultades, setSelectedFacultades)}
                                  />
                                  <div className="w-5 h-5 border border-gray-300 rounded bg-white peer-checked:bg-[var(--color-udec-crimson)] peer-checked:border-[var(--color-udec-crimson)] transition-all flex items-center justify-center flex-shrink-0">
                                    <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                </div>
                                <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors leading-snug">{fac}</span>
                              </label>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>

                {/* Mobile Footer Fixed Actions */}
                <div className="lg:hidden p-6 border-t border-gray-100 flex gap-4 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                  <button 
                    onClick={clearFilters}
                    className="flex-1 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Limpiar
                  </button>
                  <button 
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="flex-1 py-3 text-sm font-medium text-white bg-[var(--color-udec-crimson)] rounded-xl shadow-md hover:bg-red-800 transition-colors"
                  >
                    Ver Resultados
                  </button>
                </div>

              </div>
            </aside>
          </>

          {/* Program Grid */}
          <div className="lg:w-3/4">
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-medium text-gray-500">
                Mostrando <strong className="text-gray-900">{filteredPrograms.length}</strong> programas
              </span>
            </div>

            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8"
            >
              <AnimatePresence>
                {filteredPrograms.length > 0 ? (
                  filteredPrograms.map((programa) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      key={programa.id}
                      className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden"
                    >
                      <Link href={`/programas/${programa.id}`} className="cursor-pointer flex flex-col h-full w-full">
                        
                        {/* Header Badges */}
                        <div className="p-6 pb-4">
                          <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                            <span className="px-3 py-1 bg-orange-50 text-[var(--color-udec-crimson)] text-[10px] font-bold uppercase tracking-widest rounded-sm border border-orange-100/50">
                              {programa.categoria}
                            </span>
                            <span className="px-3 py-1 bg-gray-50 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded-sm border border-gray-100">
                              {programa.modalidad || 'Presencial'}
                            </span>
                          </div>

                          <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2 group-hover:text-[var(--color-udec-crimson)] transition-colors line-clamp-2 leading-tight">
                            {programa.titulo}
                          </h3>
                        </div>

                        {/* Metadatos / Indicadores Rápidos */}
                        <div className="px-6 flex-grow flex flex-col justify-end">
                          <div className="space-y-2 mb-6">
                            <div className="flex items-center text-sm text-gray-500 font-light line-clamp-1">
                              <BookOpen className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                              <span className="truncate">{programa.facultad}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 font-light">
                              <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                              <span className="truncate">{getCampusName(programa.facultad)}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-100 mt-auto">
                            <div className="flex flex-col">
                              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Duración</span>
                              <div className="flex items-center text-xs font-medium text-gray-900">
                                <Clock className="w-3.5 h-3.5 text-[var(--color-udec-crimson)] mr-1.5" />
                                <span className="truncate">{programa.duracion || 'Consultar'}</span>
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Inversión aprox.</span>
                              <div className="flex items-center text-xs font-medium text-gray-900">
                                <CircleDollarSign className="w-3.5 h-3.5 text-[var(--color-udec-crimson)] mr-1.5" />
                                <span className="truncate">{programa.inversion || 'Consultar liquidación'}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Hover Footer CTA */}
                        <div className="bg-gray-50 p-4 border-t border-gray-100 flex items-center justify-center text-[var(--color-udec-crimson)] font-semibold text-sm tracking-wide group-hover:bg-[var(--color-udec-crimson)] group-hover:text-white transition-colors duration-300">
                          Ver detalles del programa
                          <ChevronRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-32 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-dashed border-gray-200">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-50 mb-6">
                      <Search className="w-8 h-8 text-[var(--color-udec-crimson)]" />
                    </div>
                    <h3 className="text-2xl font-serif text-gray-900 mb-2">Sin resultados</h3>
                    <p className="text-gray-500 font-light max-w-md">
                      No encontramos programas que coincidan con todos tus filtros. Intenta eliminar algunos para ver más opciones.
                    </p>
                    <button 
                      onClick={clearFilters}
                      className="mt-6 px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
                    >
                      Limpiar todos los filtros
                    </button>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #E5E7EB;
          border-radius: 20px;
        }
      `}} />
    </section>
  );
}
