'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-6 xl:gap-10">
          
          {/* Logo Institucional Oficial */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
              <div className="flex items-center justify-center flex-shrink-0">
                <img 
                  src="https://unicartagena.edu.co/images/logo/logo-unicaragena.svg" 
                  alt="Logo Universidad de Cartagena" 
                  className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col border-l border-gray-300 pl-3 sm:pl-4">
                <span className="text-sm sm:text-base font-serif font-semibold text-gray-900 tracking-tight leading-tight">
                  Departamento de Posgrados y Educación Continua
                </span>
                <span className="text-[10px] sm:text-[11px] text-gray-500 font-bold uppercase tracking-wider leading-none mt-1">
                  Facultad de Ciencias Económicas
                </span>
              </div>
            </Link>
          </div>

          {/* Enlaces y CTAs (Desktop) */}
          <div className="hidden lg:flex items-center gap-3.5 xl:gap-6 flex-shrink-0 ml-auto">
            <Link 
              href="/"
              className="text-[11px] xl:text-xs font-semibold tracking-wider uppercase transition-colors text-gray-700 hover:text-[var(--color-udec-crimson)]"
            >
              Inicio
            </Link>

            <Link 
              href="/#programas"
              className="text-[11px] xl:text-xs font-semibold tracking-wider uppercase transition-colors text-gray-700 hover:text-[var(--color-udec-crimson)]"
            >
              Cursos Cortos
            </Link>

            <Link 
              href="/empresas"
              className="text-[11px] xl:text-xs font-semibold tracking-wider uppercase transition-colors text-gray-700 hover:text-[var(--color-udec-crimson)]"
            >
              UdeC Empresas
            </Link>

            <Link 
              href="/contacto"
              className="text-[11px] xl:text-xs font-semibold tracking-wider uppercase transition-colors text-gray-700 hover:text-[var(--color-udec-crimson)]"
            >
              Admisiones
            </Link>

            <Link href="/inscripcion">
              <button className="px-3.5 py-2 xl:px-5 xl:py-2.5 text-[11px] xl:text-xs font-bold tracking-[0.1em] uppercase transition-all duration-300 bg-gray-900 text-white hover:bg-[var(--color-udec-crimson)] shadow-sm rounded-sm">
                Inscripciones
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="lg:hidden bg-white border-t border-gray-100 mt-4 shadow-xl"
        >
          <div className="px-5 py-6 space-y-3">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded-sm"
            >
              Inicio
            </Link>
            <Link 
              href="/#programas" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded-sm"
            >
              Cursos Cortos (124 Módulos)
            </Link>
            <Link 
              href="/empresas" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded-sm"
            >
              UdeC Empresas
            </Link>
            <Link 
              href="/contacto" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded-sm"
            >
              Admisiones y Contacto
            </Link>
            <div className="pt-4 border-t border-gray-100">
              <Link
                href="/inscripcion"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center block bg-[var(--color-udec-crimson)] text-white px-5 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gray-900 transition-colors"
              >
                Inscripciones en Línea
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
