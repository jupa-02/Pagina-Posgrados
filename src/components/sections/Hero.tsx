'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative min-h-screen pt-32 pb-20 bg-[var(--color-udec-stone)] flex flex-col justify-center">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-24">
          
          {/* Typography Column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 pr-0 lg:pr-12"
          >

            
            <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] font-serif font-medium text-gray-900 leading-[1.05] mb-8 tracking-tight">
              Liderazgo que <br />
              <span className="italic text-gray-500">transforma</span> el <br />
              mundo real.
            </h1>
            
            <p className="text-lg text-gray-600 mb-10 max-w-xl leading-relaxed font-light">
              Formación posgradual de excelencia en la Facultad de Ciencias Económicas. Especialízate con programas diseñados para liderar los desafíos globales.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link 
                href="/#programas"
                className="inline-flex justify-center items-center gap-2 bg-[var(--color-udec-crimson)] text-white px-8 py-4 text-sm font-semibold tracking-wide hover:bg-gray-900 transition-colors"
              >
                Explorar Programas
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/contacto"
                className="inline-flex justify-center items-center gap-2 text-gray-900 border border-gray-300 px-8 py-4 text-sm font-semibold hover:border-gray-900 transition-colors"
              >
                Admisiones
              </Link>
            </div>
          </motion.div>

          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Campus Universitario"
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Minimalist badge overlapping */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-refined border-refined max-w-xs rounded-sm">
              <p className="text-sm text-gray-500 font-serif italic mb-1">Acreditación</p>
              <p className="text-base font-medium text-gray-900 leading-tight">Alta Calidad del Ministerio de Educación Nacional.</p>
            </div>
          </motion.div>
        </div>

        {/* Minimalist Stats Divider */}
        <div className="border-t border-gray-200 pt-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8"
          >
            <div>
              <h3 className="text-4xl font-serif text-gray-900 mb-2">11</h3>
              <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">Programas Especializados</p>
            </div>

            <div>
              <h3 className="text-4xl font-serif text-gray-900 mb-2">100%</h3>
              <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">Modalidades Flexibles</p>
            </div>

            <div>
              <h3 className="text-4xl font-serif text-gray-900 mb-2">200<span className="text-2xl text-gray-400"> Años</span></h3>
              <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">De Historia y Prestigio</p>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
