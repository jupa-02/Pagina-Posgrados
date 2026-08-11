'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, MapPin, Calendar, BookOpen, GraduationCap, ArrowRight, Download, CheckCircle2, ShieldCheck, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import { PROGRAMAS_DB, getCampusName } from '@/data/programasData';

export default function ProgramDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const programa = PROGRAMAS_DB[resolvedParams.id as keyof typeof PROGRAMAS_DB] || PROGRAMAS_DB['1'];
  
  const [activeTab, setActiveTab] = useState<'descripcion' | 'perfil'>('descripcion');

  return (
    <main className="flex min-h-screen flex-col bg-[#FDFCF9]">
      <Navbar />
      
      {/* Premium Hero Banner */}
      <div className="relative pt-40 pb-32 overflow-hidden bg-white">
        {/* Abstract Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-orange-50/20 opacity-80" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--color-udec-crimson)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/#programas" className="inline-flex items-center text-sm text-gray-500 hover:text-[var(--color-udec-crimson)] font-medium mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Volver a la oferta académica
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <span className="px-3 py-1 bg-[var(--color-udec-crimson)]/10 text-[var(--color-udec-crimson)] text-xs font-bold uppercase tracking-[0.15em] rounded-sm">
                    {programa.categoria}
                  </span>
                  <span className="flex items-center text-sm text-gray-600 font-serif italic">
                    <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                    {programa.facultad}
                  </span>
                  <span className="flex items-center text-sm text-gray-600 font-serif italic">
                    <MapPin className="w-4 h-4 mr-2 text-[var(--color-udec-crimson)]" />
                    {getCampusName(programa.facultad)}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 leading-[1.1] mb-8">
                  {programa.titulo}
                </h1>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-8 border-y border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Modalidad</span>
                    <div className="flex items-center text-sm font-medium text-gray-900">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-3">
                        <MapPin className="w-4 h-4 text-[var(--color-udec-crimson)]" />
                      </div>
                      <span className="line-clamp-2">{programa.modalidad || 'Presencial'}</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Duración</span>
                    <div className="flex items-center text-sm font-medium text-gray-900">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-3">
                        <Clock className="w-4 h-4 text-[var(--color-udec-crimson)]" />
                      </div>
                      <span className="line-clamp-2">{programa.duracion || 'Pendiente'}</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">SNIES</span>
                    <div className="flex items-center text-sm font-medium text-gray-900">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-3">
                        <ShieldCheck className="w-4 h-4 text-[var(--color-udec-crimson)]" />
                      </div>
                      Certificado
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating Glassmorphism Action Card */}
            <div className="lg:col-span-5 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 rounded-2xl -z-10" />
                
                <h3 className="text-2xl font-serif text-gray-900 mb-2">Inscripciones Abiertas</h3>
                <p className="text-sm text-gray-500 mb-8 font-light">Asegura tu cupo para el próximo periodo académico y avanza en tu carrera.</p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-4 border-b border-gray-100">
                    <span className="text-sm text-gray-500 font-medium">Inversión Aproximada</span>
                    <span className="font-semibold text-gray-900 max-w-[50%] text-right text-sm">
                      {programa.inversion || 'Consultar liquidación'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-100">
                    <span className="text-sm text-gray-500 font-medium">Próximo Inicio</span>
                    <span className="font-semibold text-gray-900 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-[var(--color-udec-crimson)]" />
                      Siguiente Semestre
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <Link href="/inscripcion" className="w-full bg-[var(--color-udec-crimson)] text-white py-4 rounded-full text-sm font-bold tracking-wide uppercase hover:bg-gray-900 transition-all flex justify-center items-center gap-2 hover:shadow-lg hover:-translate-y-0.5">
                    Iniciar Inscripción
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button className="w-full bg-transparent text-gray-900 border border-gray-200 py-4 rounded-full text-sm font-bold tracking-wide hover:bg-gray-50 hover:border-gray-300 transition-all flex justify-center items-center gap-2">
                    <Download className="w-4 h-4 text-gray-400" />
                    Descargar Plan de Estudios
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="lg:w-8/12">
          {/* Tab Navigation */}
          <div className="flex gap-8 border-b border-gray-200 mb-12">
            <button 
              onClick={() => setActiveTab('descripcion')}
              className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors relative ${activeTab === 'descripcion' ? 'text-[var(--color-udec-crimson)]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Acerca del Programa
              {activeTab === 'descripcion' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-udec-crimson)]" />
              )}
            </button>
            <button 
              onClick={() => setActiveTab('perfil')}
              className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors relative ${activeTab === 'perfil' ? 'text-[var(--color-udec-crimson)]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Perfil del Egresado
              {activeTab === 'perfil' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-udec-crimson)]" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px]">
            <AnimatePresence mode="wait">
              {activeTab === 'descripcion' ? (
                <motion.div
                  key="descripcion"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-[var(--color-udec-crimson)]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-serif text-gray-900 mb-4">Presentación</h2>
                      <p className="text-lg text-gray-600 font-light leading-relaxed">
                        {programa.descripcion !== 'Programa oficial de la Universidad de Cartagena enfocado en la alta calidad académica.' 
                          ? programa.descripcion 
                          : 'Este programa de posgrado está diseñado para responder a las necesidades y dinámicas del entorno regional, nacional e internacional. Con un fuerte componente investigativo y práctico, buscamos formar líderes capaces de generar impacto real en su campo de acción, utilizando las herramientas y metodologías más avanzadas de la academia contemporánea.'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="perfil"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-serif text-gray-900 mb-4">Competencias</h2>
                      <p className="text-lg text-gray-600 font-light leading-relaxed mb-8">
                        {programa.perfilEgresado !== 'Profesional altamente capacitado con visión transformadora.'
                          ? programa.perfilEgresado
                          : 'Nuestros egresados se caracterizan por su alto nivel de análisis, capacidad de liderazgo y visión transformadora. Estarán preparados para asumir retos complejos en su sector, liderando equipos multidisciplinarios e impulsando la innovación continua en sus organizaciones.'}
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          'Liderazgo estratégico y toma de decisiones',
                          'Visión global e innovadora',
                          'Investigación aplicada al sector',
                          'Alta responsabilidad ética y social'
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-center text-gray-600 font-light">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}

