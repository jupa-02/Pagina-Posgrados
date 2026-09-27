'use client';

import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

const PARTNERS = [
  "FONDUCAR",
  "ACUACAR",
  "FONRECAR",
  "FENALCO BOLÍVAR",
  "SUPERSOLIDARIA",
  "COOACEDED",
  "ASONAL",
  "CÁMARA DE COMERCIO",
  "ACRIP BOLÍVAR",
  "PROCAPS",
  "PROSPERIDAD SOCIAL",
  "MINISTERIO DEL TRABAJO",
  "RAMA JUDICIAL BOLÍVAR",
  "SURTIGAS - BRILLA"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function Partnerships() {
  // Duplicamos el arreglo para que el scroll sea infinito y sin cortes
  const scrollItems = [...PARTNERS, ...PARTNERS];

  return (
    <section className="py-20 bg-[#FAF9F5] border-y border-stone-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-udec-crimson)] mb-3 block">
            Alianzas y Convenios Institucionales
          </span>
          <h2 className="text-3xl lg:text-4xl font-serif text-stone-900 mb-4 leading-tight">
            Convenios de Descuento Corporativo
          </h2>
          <p className="text-stone-600 font-light text-sm sm:text-base leading-relaxed">
            Alianzas vigentes con entidades públicas y privadas para tarifas preferenciales en formación continua y posgrados.
          </p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden bg-white/70 py-6 border-y border-stone-200/50">
        
        {/* Gradientes laterales para efecto de difuminado sutil */}
        <div className="absolute top-0 left-0 w-28 h-full bg-gradient-to-r from-[#FAF9F5] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-28 h-full bg-gradient-to-l from-[#FAF9F5] to-transparent z-10 pointer-events-none" />
        
        <div className="flex w-max animate-scroll">
          {scrollItems.map((partner, index) => (
            <div 
              key={index}
              className="flex items-center px-8 group cursor-default"
            >
              <span className="text-lg md:text-xl font-sans font-bold text-stone-500 uppercase tracking-widest whitespace-nowrap transition-colors duration-300 group-hover:text-[var(--color-udec-crimson)]">
                {partner}
              </span>
              {/* Separador */}
              <span className="text-stone-300 ml-8 text-xl font-light">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
