'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';
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
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="flex items-center justify-center">
                <img 
                  src="https://unicartagena.edu.co/images/logo/logo-unicaragena.svg" 
                  alt="Logo Universidad de Cartagena" 
                  className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col border-l border-gray-300 pl-4 ml-4">
                <span className="text-xl font-serif text-gray-900 tracking-tight leading-none mb-1">
                  Posgrados y Educación Continua
                </span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mt-1">
                  Ciencias Económicas - UdeC
                </span>
              </div>
            </Link>
          </div>

          {/* Enlaces y CTAs (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/"
              className={`text-sm font-semibold tracking-wide uppercase transition-colors ${
                isScrolled ? 'text-gray-900 hover:text-[var(--color-udec-crimson)]' : 'text-gray-900 hover:text-[var(--color-udec-crimson)]'
              }`}
            >
              Inicio
            </Link>
            <Link 
              href="/#programas"
              className={`text-sm font-semibold tracking-wide uppercase transition-colors ${
                isScrolled ? 'text-gray-900 hover:text-[var(--color-udec-crimson)]' : 'text-gray-900 hover:text-[var(--color-udec-crimson)]'
              }`}
            >
              Programas
            </Link>
            <Link 
              href="/empresas"
              className={`text-sm font-semibold tracking-wide uppercase transition-colors flex items-center gap-1 ${
                isScrolled ? 'text-gray-900 hover:text-[var(--color-udec-crimson)]' : 'text-gray-900 hover:text-[var(--color-udec-crimson)]'
              }`}
            >
              UdeC Empresas <span className="bg-[var(--color-udec-crimson)] text-white text-[9px] px-1.5 py-0.5 rounded-sm">NUEVO</span>
            </Link>
            <Link 
              href="/contacto"
              className={`text-sm font-semibold tracking-wide uppercase transition-colors ${
                isScrolled ? 'text-gray-900 hover:text-[var(--color-udec-crimson)]' : 'text-gray-900 hover:text-[var(--color-udec-crimson)]'
              }`}
            >
              Admisiones
            </Link>

            <Link href="/inscripcion">
              <button className={`px-6 py-3 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
                isScrolled 
                  ? 'bg-gray-900 text-white hover:bg-[var(--color-udec-crimson)]' 
                  : 'bg-gray-900 text-white hover:bg-[var(--color-udec-crimson)]'
              }`}>
                Inscripciones
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 ${isScrolled ? 'text-gray-900' : 'text-gray-900'}`}
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
          className="md:hidden bg-white border-t border-gray-100 mt-4"
        >
          <div className="px-4 py-6 space-y-2 shadow-xl">
            <Link href="/#programas" className="block px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-sm">
              Programas
            </Link>
            <Link href="/empresas" className="block px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-sm">
              UdeC Empresas <span className="bg-[var(--color-udec-crimson)] text-white text-[9px] px-1.5 py-0.5 rounded-sm ml-2">NUEVO</span>
            </Link>
            <Link href="/contacto" className="block px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-sm">
              Admisiones
            </Link>
            <Link
              href="/login"
              className="mt-6 flex justify-center items-center gap-2 bg-[var(--color-udec-crimson)] text-white px-5 py-3 rounded-sm text-base font-medium"
            >
              <User className="w-5 h-5" />
              Acceso Estudiantes
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
