'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Check, ChevronRight, CreditCard, User, BookOpen } from 'lucide-react';
import { CATALOGO_PROGRAMAS } from '@/data/programasData';

export default function Inscripcion() {
  const [step, setStep] = useState(1);
  const [selectedProgramId, setSelectedProgramId] = useState('');

  return (
    <main className="flex min-h-screen flex-col bg-[var(--color-udec-stone)]">
      <Navbar />
      
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-4">Proceso de Inscripción</h1>
          <p className="text-lg text-gray-600 font-light">
            Complete sus datos para generar el recibo de pago o procesar el pago en línea a través de PSE.
          </p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-gray-300 z-0"></div>
          
          <div className="relative z-10 flex flex-col items-center gap-2 bg-[var(--color-udec-stone)] px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step >= 1 ? 'border-[var(--color-udec-crimson)] bg-[var(--color-udec-crimson)] text-white' : 'border-gray-300 bg-white text-gray-400'}`}>
              <User className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-900">Datos Personales</span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2 bg-[var(--color-udec-stone)] px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step >= 2 ? 'border-[var(--color-udec-crimson)] bg-[var(--color-udec-crimson)] text-white' : 'border-gray-300 bg-white text-gray-400'}`}>
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Programa Académico</span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2 bg-[var(--color-udec-stone)] px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step >= 3 ? 'border-[var(--color-udec-crimson)] bg-[var(--color-udec-crimson)] text-white' : 'border-gray-300 bg-white text-gray-400'}`}>
              <CreditCard className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Pago de Derechos</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 lg:p-12 border-refined shadow-sm">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-serif text-gray-900 mb-6">1. Datos Personales</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Nombres</label>
                    <input type="text" className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-gray-900 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Apellidos</label>
                    <input type="text" className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-gray-900 transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Tipo de Documento</label>
                    <select className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-gray-900 transition-colors">
                      <option>Cédula de Ciudadanía</option>
                      <option>Cédula de Extranjería</option>
                      <option>Pasaporte</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Número de Documento</label>
                    <input type="text" className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-gray-900 transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Correo Electrónico</label>
                    <input type="email" className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-gray-900 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Teléfono Celular</label>
                    <input type="tel" className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-gray-900 transition-colors" />
                  </div>
                </div>

                <div className="pt-8 flex justify-end">
                  <button 
                    type="button" 
                    onClick={() => setStep(2)}
                    className="bg-gray-900 text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[var(--color-udec-crimson)] transition-colors flex items-center gap-2"
                  >
                    Siguiente <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-serif text-gray-900 mb-6">2. Selección de Programa</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Programa de Posgrado al que aspira</label>
                  <select 
                    value={selectedProgramId}
                    onChange={(e) => setSelectedProgramId(e.target.value)}
                    className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-gray-900 transition-colors text-lg font-serif"
                  >
                    <option value="" disabled>Seleccione un programa...</option>
                    {CATALOGO_PROGRAMAS.map(prog => (
                      <option key={prog.id} value={prog.id}>{prog.titulo}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-gray-50 p-6 border-refined mt-8">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Resumen de Liquidación</h4>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Valor de Inscripción (PIN)</span>
                    <span className="font-medium text-gray-900">$ 250.000 COP</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Descuento Egresado (Opcional)</span>
                    <span className="font-medium text-[var(--color-udec-crimson)]">-$ 0</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 mt-2">
                    <span className="text-lg font-serif text-gray-900">Total a Pagar</span>
                    <span className="text-xl font-bold text-gray-900">$ 250.000 COP</span>
                  </div>
                </div>

                <div className="pt-8 flex justify-between">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    Atrás
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setStep(3)}
                    className="bg-gray-900 text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[var(--color-udec-crimson)] transition-colors flex items-center gap-2"
                  >
                    Ir a Pagar <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-serif text-gray-900 mb-4">Datos Registrados Exitosamente</h2>
                <p className="text-gray-600">Tu información ha sido guardada en nuestra base de datos para el seguimiento de tu admisión. Por favor procede con el pago del PIN.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button className="flex flex-col items-center p-8 border-refined hover:border-[var(--color-udec-crimson)] transition-colors group">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/PSE_logo.png" alt="PSE" className="h-12 object-contain mb-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span className="font-bold text-gray-900 group-hover:text-[var(--color-udec-crimson)] transition-colors">Pago en Línea (PSE)</span>
                  <span className="text-xs text-gray-500 mt-2 text-center">Débito a cuenta de ahorros o corriente</span>
                </button>
                
                <button className="flex flex-col items-center p-8 border-refined hover:border-gray-900 transition-colors group">
                  <CreditCard className="w-12 h-12 text-gray-400 mb-4 group-hover:text-gray-900 transition-colors" />
                  <span className="font-bold text-gray-900">Descargar Recibo</span>
                  <span className="text-xs text-gray-500 mt-2 text-center">Para pago en ventanilla bancaria</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
