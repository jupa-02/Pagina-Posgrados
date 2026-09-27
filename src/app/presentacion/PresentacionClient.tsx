'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  GraduationCap, 
  Building2, 
  CreditCard, 
  ShieldCheck, 
  FileText, 
  Code2, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  TrendingUp, 
  ExternalLink,
  Volume2,
  Sparkles,
  Maximize2
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

interface Slide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  narration: string;
  durationSec: number;
  highlightMetric?: { label: string; value: string; detail: string };
  bullets: string[];
  ctaUrl?: string;
  ctaText?: string;
  visualTag: string;
  visualColor: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    badge: "01. Contexto & Problemática",
    title: "El Desafío de la Formación de Posgrados Tradicional",
    subtitle: "Por qué las maestrías rígidas de 2 años no responden a la velocidad que exige el sector productivo actual.",
    narration: "En la Universidad de Cartagena contamos con programas de maestría y especialización de altísima calidad. Sin embargo, la realidad económica actual impone dos grandes barreras: primero, los profesionales no siempre disponen de 2 años continuos ni de matrículas superiores a los 10 millones de pesos. Y segundo, las empresas de Mamonal, el sector salud y financiero necesitan capacitar a sus colaboradores en competencias puntuales e inmediatas.",
    durationSec: 14,
    highlightMetric: {
      label: "Tiempo de Salida al Mercado",
      value: "Inmediato",
      detail: "Frente a 18 meses de trámite ministerial en posgrados tradicionales"
    },
    bullets: [
      "Alta tasa de deserción por costos y carga horaria en maestrías tradicionales.",
      "Empresas locales demandan cursos cortos en NIIF, Decisiones Financieras, Finanzas de Salud y Auditoría.",
      "Procesos manuales de inscripción que provocan pérdida del 60% de los interesados en el embudo."
    ],
    ctaUrl: "/#programas",
    ctaText: "Ver Portafolio de Cursos",
    visualTag: "Diagnóstico Regional",
    visualColor: "from-amber-600 to-red-800"
  },
  {
    id: 2,
    badge: "02. Marco Jurídico & Autonomía",
    title: "Educación Continua vs. Sistema SMA: Alcance Legal",
    subtitle: "Decreto 1075 de 2015 (Art. 2.6.6.8) y autonomía de la Facultad de Ciencias Económicas.",
    narration: "Una pregunta clave de la Decanatura y el Consejo es: ¿cómo interactúa esto con el SMA? La respuesta jurídica es contundente: estos son cursos cortos de 32 a 48 horas equivalentes a 2 créditos. De acuerdo con el Decreto 1075 de 2015, pertenecen a Educación Informal/Continua. No otorgan título de magíster, sino Certificado Oficial de Aprobación y Asistencia FCE con código QR. Por tanto, no requieren código SNIES ni matrícula previa en el SMA, permitiéndonos operar con agilidad inmediata.",
    durationSec: 16,
    highlightMetric: {
      label: "Marco Normativo",
      value: "Dec. 1075/2015",
      detail: "Art. 2.6.6.8: Educación Continua sin dependencia obligatoria de SNIES"
    },
    bullets: [
      "Operación 100% autónoma y ágil de la plataforma para recaudo y gestión académica.",
      "Emisión de Certificados Oficiales verificables con código QR y firma de Decanatura.",
      "El SMA se conserva como repositorio histórico cuando el estudiante solicita homologación formal hacia una maestría completa."
    ],
    ctaUrl: "/admin/sma-bridge",
    ctaText: "Explorar Puente SMA",
    visualTag: "Sustento Normativo",
    visualColor: "from-blue-700 to-indigo-900"
  },
  {
    id: 3,
    badge: "03. La Solución Desarrollada",
    title: "Catálogo de 124 Cursos con Experiencia Superior",
    subtitle: "Inspirado en los más altos estándares nacionales (Universidad de Antioquia) con información modular completa.",
    narration: "Desarrollamos una plataforma digital de vanguardia que reúne 124 cursos y módulos ejecutivos de posgrado clasificados en 6 áreas estratégicas. Cada curso cuenta con una ficha técnica en cuatro pestañas: Presentación y Perfil, Temario estructurado, Perfil del docente titular y Certificación oficial, acompañada de una guía de matrícula en tres simples pasos.",
    durationSec: 15,
    highlightMetric: {
      label: "Oferta Académica FCE",
      value: "124 Módulos",
      detail: "Finanzas, Auditoría, Salud, Mercadeo, Gestión Pública y Comercio"
    },
    bullets: [
      "Navegación fluida por facultades y áreas temáticas con motor de búsqueda instantáneo.",
      "Ficha de asignatura estilo UdeA con 4 pestañas interactivas y perfil de egreso.",
      "Flujo de inscripción digital en menos de 2 minutos para particulares y empresas."
    ],
    ctaUrl: "/programas/28",
    ctaText: "Ver Ejemplo Curso en Vivo",
    visualTag: "Catálogo 124 Cursos",
    visualColor: "from-crimson-800 to-red-950"
  },
  {
    id: 4,
    badge: "04. Pasarela de Pagos & Activación",
    title: "Cobros en Línea con Verificación Inmediata (PSE / Wompi)",
    subtitle: "Eliminación total de recibos manuales y activación automática de créditos en base de datos en 2 segundos.",
    narration: "Diseñamos un flujo de recaudo digital totalmente automatizado. Cuando un estudiante o empresa paga a través de PSE o tarjeta, la pasarela de pagos dispara un Webhook asíncrono seguro a nuestro servidor. En milisegundos, el sistema valida la referencia bancaria, actualiza el estado a Aprobado y activa los créditos o la matrícula en la base de datos sin intervención humana.",
    durationSec: 15,
    highlightMetric: {
      label: "Tiempo de Activación",
      value: "< 2 Segundos",
      detail: "Validación criptográfica mediante Webhook bancario automatizado"
    },
    bullets: [
      "Generación de referencias únicas institucionales de pago (REF-UDEC-XXXXXX).",
      "Simulador bancario interactivo para validación en vivo con entidades colombianas.",
      "Base de datos transaccional con trazabilidad para auditoría de Tesorería."
    ],
    ctaUrl: "/checkout/simulador",
    ctaText: "Probar Simulador de Pagos",
    visualTag: "Pasarela Segura",
    visualColor: "from-emerald-700 to-teal-900"
  },
  {
    id: 5,
    badge: "05. Modelo B2B para Empresas",
    title: "Bolsa de Créditos Corporativos y Portal de Autogestión",
    subtitle: "Capacitación a escala para organizaciones con control en tiempo real de consumo por colaborador.",
    narration: "El gran diferenciador para la región es el modelo UdeC Empresas. Las compañías adquieren una bolsa de créditos con descuentos por volumen: Starter de 30 créditos, Growth de 80 créditos y Enterprise de 200 créditos. A través de un portal corporativo exclusivo, el director de Gestión Humana asigna cursos a sus colaboradores con un clic, monitorea en tiempo real el progreso de cada profesional y descarga los diplomas institucionales.",
    durationSec: 16,
    highlightMetric: {
      label: "Ahorro Corporativo",
      value: "Hasta 35%",
      detail: "Bolsa redimible durante 12 meses en cualquier módulo del catálogo"
    },
    bullets: [
      "Simulador presupuestal en vivo que calcula créditos y retorno de inversión empresarial.",
      "Panel de control para directores de talento con estados: En Curso, Completado y Certificado.",
      "Visualización y descarga inmediata del Certificado de Aprobación UdeC con código QR."
    ],
    ctaUrl: "/empresas",
    ctaText: "Abrir Portal Corporativo",
    visualTag: "B2B Corporativo",
    visualColor: "from-purple-800 to-indigo-950"
  },
  {
    id: 6,
    badge: "06. Coordinación Financiera & SMA",
    title: "Manejo de Ingresos con Tesorería y Puente Interoperable",
    subtitle: "Conciliación contable clara para ingresos inmediatos, ingresos diferidos y homologación académica.",
    narration: "Para la Dirección Financiera y Tesorería, el modelo es transparente: el recaudo individual entra como ingreso corriente de extensión. Las bolsas de créditos empresariales ingresan a la cuenta institucional y se registran como ingresos diferidos; a medida que la empresa asigna colaboradores, la plataforma emite un reporte mensual desagregado para el devengo contable y pago de honorarios docentes. Y cuando un estudiante requiere homologación hacia la maestría, el Módulo Puente exporta el lote CSV compatible con el SMA.",
    durationSec: 16,
    highlightMetric: {
      label: "Control Contable",
      value: "Reporte Mensual",
      detail: "Desglose por curso asignado para pago transparente de honorarios docentes"
    },
    bullets: [
      "Canal B2C: Recaudo directo e inmediato a la cuenta de Fondos Especiales FCE.",
      "Canal B2B: Factura Electrónica o PSE con conciliación de ingresos diferidos por créditos.",
      "Módulo Puente SMA: Generación de archivos estructurados para migración masiva sin redigitaciones."
    ],
    ctaUrl: "/admin/sma-bridge",
    ctaText: "Ver Módulo Puente SMA",
    visualTag: "Flujo Financiero",
    visualColor: "from-amber-700 to-stone-900"
  }
];

export default function PresentacionClient() {
  const [activeTab, setActiveTab] = useState<'video' | 'remotion' | 'documento'>('video');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentSlide = SLIDES[currentSlideIndex];

  // Auto-play timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      const stepMs = 100;
      const totalSteps = (currentSlide.durationSec * 1000) / stepMs;
      
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // Next slide
            if (currentSlideIndex < SLIDES.length - 1) {
              setCurrentSlideIndex(currentSlideIndex + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 100;
            }
          }
          return prev + (100 / totalSteps);
        });
      }, stepMs);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentSlideIndex, currentSlide.durationSec]);

  const handleNext = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
      setProgress(0);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
      setProgress(0);
    }
  };

  const handleRestart = () => {
    setCurrentSlideIndex(0);
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-[#0E131F] text-white font-sans selection:bg-[var(--color-udec-crimson)] selection:text-white pb-20">
      <Navbar />

      <main className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP BAR / NAVIGATION OF SHOWCASE */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-400">
                Pitch Institucional & Validación Técnica
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-bold leading-tight">
              Plataforma de Educación Continua FCE
            </h1>
            <p className="text-gray-400 text-sm mt-1 font-light max-w-2xl">
              Facultad de Ciencias Económicas • Universidad de Cartagena • Presentación Ejecutiva para Decanatura, Comité de Posgrados y Dirección Financiera
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-gray-900/90 p-1.5 rounded-2xl border border-gray-800">
            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'video' ? 'bg-[var(--color-udec-crimson)] text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              Presentación Interactiva
            </button>
            <button
              onClick={() => setActiveTab('documento')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'documento' ? 'bg-[var(--color-udec-crimson)] text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Propuesta Formal
            </button>
            <button
              onClick={() => setActiveTab('remotion')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'remotion' ? 'bg-[var(--color-udec-crimson)] text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Código Remotion
            </button>
          </div>
        </div>

        {/* TAB 1: PRESENTACIÓN INTERACTIVA (WALKTHROUGH / VIDEO SIMULATOR) */}
        {activeTab === 'video' && (
          <div className="mt-8 space-y-8">
            
            {/* VIDEO PLAYER SCREEN / MAIN STAGE */}
            <div className="relative rounded-3xl bg-gray-950 border border-gray-800 shadow-2xl overflow-hidden min-h-[580px] flex flex-col justify-between p-8 sm:p-12">
              
              {/* Dynamic Gradient Background based on slide */}
              <div className={`absolute inset-0 bg-gradient-to-br ${currentSlide.visualColor} opacity-20 pointer-events-none transition-all duration-700`} />
              
              {/* Top Bar inside Player */}
              <div className="relative z-10 flex items-center justify-between border-b border-gray-800/80 pb-6">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://unicartagena.edu.co/images/logo/logo-unicaragena.svg" 
                    alt="UdeC" 
                    className="h-9 w-auto brightness-200"
                  />
                  <div>
                    <span className="text-[11px] font-bold tracking-widest uppercase text-gray-300 block">
                      Universidad de Cartagena
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      Posgrados y Educación Continua FCE
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono bg-white/10 px-3 py-1 rounded-full text-amber-300 border border-amber-400/20">
                    Escena {currentSlideIndex + 1} de {SLIDES.length}
                  </span>
                  <span className="text-xs font-mono text-gray-400">
                    {Math.round(currentSlide.durationSec * (progress / 100))}s / {currentSlide.durationSec}s
                  </span>
                </div>
              </div>

              {/* Slide Body Content */}
              <div className="relative z-10 my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Column: Titles & Narrative */}
                <div className="lg:col-span-7 space-y-5">
                  <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-white border border-white/20">
                    {currentSlide.badge}
                  </span>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-bold leading-[1.1]">
                    {currentSlide.title}
                  </h2>

                  <p className="text-lg text-gray-300 font-light leading-relaxed">
                    {currentSlide.subtitle}
                  </p>

                  {/* Bullet points */}
                  <div className="space-y-2.5 pt-2">
                    {currentSlide.bullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  {/* Narration Script Box */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300 leading-relaxed font-light mt-4 flex items-start gap-3">
                    <Volume2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300 font-semibold block mb-0.5">Guión de Locución Institucional:</strong>
                      "{currentSlide.narration}"
                    </div>
                  </div>
                </div>

                {/* Right Column: Visual Highlight Card */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="p-8 rounded-3xl bg-gray-900/90 border border-gray-700/80 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-udec-crimson)]/20 rounded-full blur-2xl pointer-events-none" />
                    
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full inline-block mb-4">
                      {currentSlide.visualTag}
                    </span>

                    {currentSlide.highlightMetric && (
                      <div className="mb-6">
                        <span className="text-xs uppercase font-bold text-gray-400 tracking-wider block mb-1">
                          {currentSlide.highlightMetric.label}
                        </span>
                        <div className="text-4xl sm:text-5xl font-serif font-bold text-white mb-2">
                          {currentSlide.highlightMetric.value}
                        </div>
                        <p className="text-xs text-gray-300 font-light leading-relaxed">
                          {currentSlide.highlightMetric.detail}
                        </p>
                      </div>
                    )}

                    {currentSlide.ctaUrl && (
                      <Link
                        href={currentSlide.ctaUrl}
                        target="_blank"
                        className="w-full py-3.5 px-5 bg-white hover:bg-gray-100 text-gray-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group"
                      >
                        {currentSlide.ctaText || "Ver en Vivo"}
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    )}
                  </div>
                </div>

              </div>

              {/* Player Bottom Control Bar */}
              <div className="relative z-10 pt-6 border-t border-gray-800 space-y-4">
                
                {/* Progress bar */}
                <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[var(--color-udec-crimson)] h-full transition-all duration-100 ease-linear rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  
                  {/* Playback Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-12 h-12 rounded-full bg-[var(--color-udec-crimson)] hover:bg-red-700 text-white flex items-center justify-center transition-transform hover:scale-105 shadow-lg shadow-red-900/30"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>

                    <button
                      onClick={handleRestart}
                      className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                      title="Reiniciar presentación"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <div className="h-6 w-px bg-gray-800 mx-1" />

                    <button
                      onClick={handlePrev}
                      disabled={currentSlideIndex === 0}
                      className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:hover:bg-gray-800 text-white transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={handleNext}
                      disabled={currentSlideIndex === SLIDES.length - 1}
                      className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:hover:bg-gray-800 text-white transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <span className="text-xs text-gray-400 pl-2">
                      {isPlaying ? 'Reproduciendo automáticamente' : 'Pausado • Use flechas para avanzar'}
                    </span>
                  </div>

                  {/* Thumbnail / Scene quick jump */}
                  <div className="flex items-center gap-1.5 overflow-x-auto">
                    {SLIDES.map((slide, idx) => (
                      <button
                        key={slide.id}
                        onClick={() => {
                          setCurrentSlideIndex(idx);
                          setProgress(0);
                        }}
                        className={`h-2.5 rounded-full transition-all ${
                          idx === currentSlideIndex 
                            ? 'w-8 bg-[var(--color-udec-crimson)]' 
                            : 'w-2.5 bg-gray-800 hover:bg-gray-600'
                        }`}
                        title={`Ir a Escena ${idx + 1}`}
                      />
                    ))}
                  </div>

                </div>

              </div>

            </div>

            {/* QUICK LINK HUB TO VERIFY EVERYTHING LIVE */}
            <div className="bg-gray-900/60 rounded-3xl p-8 border border-gray-800">
              <h3 className="text-xl font-serif font-bold text-white mb-2">
                Accesos Directos para Pruebas y Demostración en Vivo
              </h3>
              <p className="text-xs text-gray-400 font-light mb-6">
                Todas las funcionalidades presentadas en este video están 100% implementadas y pueden ser probadas en tiempo real:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  href="/#programas"
                  className="p-4 rounded-2xl bg-gray-800/60 border border-gray-700 hover:border-gray-500 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <GraduationCap className="w-5 h-5 text-amber-400" />
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white" />
                  </div>
                  <strong className="text-sm text-white block">Catálogo 124 Cursos</strong>
                  <span className="text-xs text-gray-400 font-light">Filtros por área y buscador</span>
                </Link>

                <Link
                  href="/programas/28"
                  className="p-4 rounded-2xl bg-gray-800/60 border border-gray-700 hover:border-gray-500 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white" />
                  </div>
                  <strong className="text-sm text-white block">Ficha Tipo UdeA</strong>
                  <span className="text-xs text-gray-400 font-light">4 pestañas con temario y QR</span>
                </Link>

                <Link
                  href="/checkout/simulador"
                  className="p-4 rounded-2xl bg-gray-800/60 border border-gray-700 hover:border-gray-500 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <CreditCard className="w-5 h-5 text-emerald-400" />
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white" />
                  </div>
                  <strong className="text-sm text-white block">Simulador Pasarela PSE</strong>
                  <span className="text-xs text-gray-400 font-light">Webhook de activación en 2s</span>
                </Link>

                <Link
                  href="/empresas"
                  className="p-4 rounded-2xl bg-gray-800/60 border border-gray-700 hover:border-gray-500 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Building2 className="w-5 h-5 text-purple-400" />
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white" />
                  </div>
                  <strong className="text-sm text-white block">Portal UdeC Empresas</strong>
                  <span className="text-xs text-gray-400 font-light">Bolsa de créditos y empleados</span>
                </Link>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PROPUESTA INSTITUCIONAL INTEGRADA */}
        {activeTab === 'documento' && (
          <div className="mt-8 bg-white text-gray-900 rounded-3xl p-8 sm:p-14 shadow-2xl border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-gray-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-udec-crimson)] block mb-1">
                  Documento Oficial de Trabajo
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
                  Propuesta Institucional y Técnica para Decanatura y Tesorería
                </h2>
                <p className="text-xs text-gray-500 font-mono mt-1">
                  Archivo fuente: docs/PROPUESTA_INSTITUCIONAL_EDUCACION_CONTINUA_FCE_UDEC.md
                </p>
              </div>

              <a
                href="/docs/PROPUESTA_INSTITUCIONAL_EDUCACION_CONTINUA_FCE_UDEC.md"
                download
                className="px-5 py-2.5 bg-gray-900 hover:bg-[var(--color-udec-crimson)] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Descargar Documento MD
              </a>
            </div>

            {/* Document Content View */}
            <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-6">
              
              <div className="p-6 bg-amber-50/70 border border-amber-200 rounded-2xl">
                <h4 className="text-amber-900 font-serif font-bold text-lg mb-2">
                  Eje Central de la Propuesta: Desagregación Modular y Autonomía
                </h4>
                <p className="text-amber-800 text-xs leading-relaxed">
                  Esta propuesta viabiliza que la Universidad de Cartagena comercialice de inmediato 124 cursos de corta estancia (módulos ejecutivos de posgrado de 32 a 48 horas) amparados bajo el <strong>Decreto 1075 de 2015, Artículo 2.6.6.8 (Educación Informal)</strong>. No requiere registro calificado SNIES ni matrícula previa en SMA, abriendo una fuente de ingresos directos para la Facultad y ofreciendo a las empresas de la región un esquema B2B de bolsas de crédito formativo.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                  <h5 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Canal B2C (Persona Natural)
                  </h5>
                  <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-4">
                    <li>Precio oficial: COP $780.000 por curso (32 horas / 2 créditos).</li>
                    <li>Pago directo en la web vía botón PSE o tarjeta de crédito.</li>
                    <li>Acreditación contable automática en Fondos Especiales FCE.</li>
                    <li>Certificado de aprobación emitido con código QR de verificación.</li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                  <h5 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-purple-600" />
                    Canal B2B (Bolsas Corporativas)
                  </h5>
                  <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-4">
                    <li>Paquetes por volumen: Starter (30 Cr), Growth (80 Cr), Enterprise (200 Cr).</li>
                    <li>Pago mediante PSE corporativo o Factura Electrónica a 30 días.</li>
                    <li>Ingreso registrado como pasivo diferido en Tesorería.</li>
                    <li>Desagregación contable mensual conforme los empleados son asignados.</li>
                  </ul>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 space-y-2">
                <h5 className="font-bold uppercase tracking-wider text-blue-950 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  Módulo Puente SMA (/admin/sma-bridge)
                </h5>
                <p>
                  El sistema tradicional SMA se preserva intacto sin intervenciones invasivas de código. Cuando un estudiante que aprobó módulos cortos solicita homologar sus créditos hacia la Maestría completa oficial, el administrador genera el archivo CSV estructurado por lotes desde el Módulo Puente para cargarlo al SMA de manera limpia y auditada.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: REMOTION CODE SHOWCASE */}
        {activeTab === 'remotion' && (
          <div className="mt-8 bg-gray-950 rounded-3xl p-8 sm:p-12 border border-gray-800 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-gray-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
                  Código de Composición Remotion
                </span>
                <h2 className="text-2xl font-serif font-bold text-white">
                  Generación de Video MP4 con Remotion
                </h2>
                <p className="text-xs text-gray-400 font-light mt-1">
                  Archivo listo para renderizar con: <code className="text-amber-300 font-mono">npx remotion render src/remotion/Root.tsx VideoInstitucional out/video.mp4</code>
                </p>
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 font-mono text-xs text-gray-300 overflow-x-auto leading-relaxed">
              <pre>{`// src/remotion/VideoInstitucionalFCE.tsx
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const VideoInstitucionalFCE = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: '#0E131F', color: '#ffffff', fontFamily: 'sans-serif' }}>
      
      {/* ESCENA 1: EL DESAFÍO INSTITUCIONAL (0s - 12s) */}
      <Sequence from={0} durationInFrames={fps * 12}>
        <SceneProblem frame={frame} fps={fps} />
      </Sequence>

      {/* ESCENA 2: CATÁLOGO DE 124 CURSOS MODULARES (12s - 25s) */}
      <Sequence from={fps * 12} durationInFrames={fps * 13}>
        <SceneCatalog frame={frame} fps={fps} />
      </Sequence>

      {/* ESCENA 3: PASARELA DE PAGOS Y ACTIVACIÓN EN TIEMPO REAL (25s - 38s) */}
      <Sequence from={fps * 25} durationInFrames={fps * 13}>
        <ScenePayments frame={frame} fps={fps} />
      </Sequence>

      {/* ESCENA 4: MODELO B2B - BOLSA DE CRÉDITOS EMPRESAS (38s - 52s) */}
      <Sequence from={fps * 38} durationInFrames={fps * 14}>
        <SceneCorporate frame={frame} fps={fps} />
      </Sequence>

      {/* ESCENA 5: MARCO LEGAL Y ARTICULACIÓN CON SMA Y TESORERÍA (52s - 65s) */}
      <Sequence from={fps * 52} durationInFrames={fps * 13}>
        <SceneFinancialAndSMA frame={frame} fps={fps} />
      </Sequence>

    </AbsoluteFill>
  );
};`}</pre>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
