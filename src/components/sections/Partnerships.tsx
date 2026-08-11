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
    <section className="py-24 bg-gray-900 border-y border-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 block">
            Alianzas Estratégicas
          </span>
          <h2 className="text-3xl lg:text-4xl font-serif text-white mb-6 leading-tight">
            Nuestros Convenios de Descuento
          </h2>
          <p className="text-gray-400 font-light leading-relaxed">
            Hemos consolidado alianzas con prestigiosas instituciones y empresas para brindarte beneficios exclusivos y tarifas preferenciales en nuestra oferta de posgrados.
          </p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden bg-gray-900 py-8">
        
        {/* Gradientes laterales para efecto de difuminado */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
        
        <div className="flex w-max animate-scroll">
          {scrollItems.map((partner, index) => (
            <div 
              key={index}
              className="flex items-center px-12 group cursor-default"
            >
              <span className="text-xl md:text-2xl font-sans font-bold text-gray-600 uppercase tracking-widest whitespace-nowrap transition-colors duration-500 hover:text-white">
                {partner}
              </span>
              {/* Separador */}
              <span className="text-gray-700 ml-12 text-2xl font-light">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
