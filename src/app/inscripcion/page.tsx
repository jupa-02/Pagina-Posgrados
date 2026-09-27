'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Check, ChevronRight, CreditCard, User, BookOpen, Building2, CheckCircle2 } from 'lucide-react';
import { CATALOGO_PROGRAMAS } from '@/data/programasData';

export default function Inscripcion() {
  const [step, setStep] = useState(1);
  const [selectedProgramId, setSelectedProgramId] = useState(CATALOGO_PROGRAMAS[0]?.id || '1');
  const [paymentMode, setPaymentMode] = useState<'particular' | 'empresa'>('particular');
  const [companyNit, setCompanyNit] = useState('');

  // Form Fields State
  const [nombres, setNombres] = useState('Carlos Alberto');
  const [apellidos, setApellidos] = useState('Gómez Vergara');
  const [tipoDoc, setTipoDoc] = useState('CC');
  const [documento, setDocumento] = useState('1143890123');
  const [email, setEmail] = useState('carlos.gomez@gmail.com');
  const [telefono, setTelefono] = useState('300 456 7890');
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedProgram = CATALOGO_PROGRAMAS.find(p => p.id === selectedProgramId) || CATALOGO_PROGRAMAS[0];

  const handlePagar = async (metodo: 'PSE' | 'TARJETA') => {
    setIsProcessing(true);
    try {
      // Intentar enviar datos al Webhook de Google Apps Script si está configurado
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      if (scriptUrl) {
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'inscripcion',
            nombres, apellidos, tipoDoc, documento, email, telefono,
            cursoTitulo: selectedProgram.titulo,
            metodoPago: metodo,
            empresaNit: 'N/A'
          })
        });
      }
      // Simular pasarela
      setTimeout(() => {
        alert('¡Inscripción confirmada! Te hemos enviado un correo de bienvenida.');
        window.location.href = `/`;
      }, 1500);
    } catch (err) {
      console.error(err);
      alert('Error procesando la solicitud.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRedimirCreditosEmpresa = async () => {
    if (!companyNit.trim()) {
      alert('Por favor ingrese el NIT de la empresa conveniada');
      return;
    }
    setIsProcessing(true);
    try {
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      if (scriptUrl) {
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'inscripcion',
            nombres, apellidos, tipoDoc, documento, email, telefono,
            cursoTitulo: selectedProgram.titulo,
            metodoPago: 'Creditos Corporativos',
            empresaNit: companyNit.trim()
          })
        });
      }
      setTimeout(() => {
        alert('¡Créditos redimidos y matrícula confirmada exitosamente! Revisa tu correo.');
        window.location.href = `/`;
      }, 1500);
    } catch (err) {
      console.error(err);
      alert('Error procesando la solicitud.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-[var(--color-udec-stone)]">
      <Navbar />
      
      <div className="pt-36 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-12">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-udec-crimson)] block mb-2">
            Educación Continua • Facultad de Ciencias Económicas
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 mb-4">
            Inscripción a Cursos Cortos
          </h1>
          <p className="text-base text-gray-600 font-light">
            Inscríbase de forma individual o redima los créditos corporativos asignados por su empresa.
          </p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-gray-300 z-0" />
          
          <div className="relative z-10 flex flex-col items-center gap-2 bg-[var(--color-udec-stone)] px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step >= 1 ? 'border-[var(--color-udec-crimson)] bg-[var(--color-udec-crimson)] text-white' : 'border-gray-300 bg-white text-gray-400'}`}>
              <User className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-900">Datos Personales</span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2 bg-[var(--color-udec-stone)] px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step >= 2 ? 'border-[var(--color-udec-crimson)] bg-[var(--color-udec-crimson)] text-white' : 'border-gray-300 bg-white text-gray-400'}`}>
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700">Selección de Curso</span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2 bg-[var(--color-udec-stone)] px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step >= 3 ? 'border-[var(--color-udec-crimson)] bg-[var(--color-udec-crimson)] text-white' : 'border-gray-300 bg-white text-gray-400'}`}>
              <CreditCard className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Confirmación</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 lg:p-12 rounded-3xl border border-gray-200 shadow-sm">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-serif text-gray-900 mb-6">1. Datos del Profesional</h2>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Nombres *</label>
                    <input 
                      type="text" 
                      required 
                      value={nombres} 
                      onChange={(e) => setNombres(e.target.value)} 
                      placeholder="Carlos Alberto" 
                      className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-gray-900 transition-colors text-sm text-gray-900" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Apellidos *</label>
                    <input 
                      type="text" 
                      required 
                      value={apellidos} 
                      onChange={(e) => setApellidos(e.target.value)} 
                      placeholder="Gómez Vergara" 
                      className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-gray-900 transition-colors text-sm text-gray-900" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Tipo de Documento *</label>
                    <select 
                      value={tipoDoc} 
                      onChange={(e) => setTipoDoc(e.target.value)} 
                      className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-gray-900 transition-colors text-sm text-gray-900"
                    >
                      <option value="CC">Cédula de Ciudadanía</option>
                      <option value="CE">Cédula de Extranjería</option>
                      <option value="PA">Pasaporte</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Número de Documento *</label>
                    <input 
                      type="text" 
                      required 
                      value={documento} 
                      onChange={(e) => setDocumento(e.target.value)} 
                      placeholder="1143890123" 
                      className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-gray-900 transition-colors text-sm text-gray-900" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Correo Electrónico *</label>
                    <input 
                      type="email" 
                      required 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="carlos.gomez@empresa.com" 
                      className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-gray-900 transition-colors text-sm text-gray-900" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Teléfono / WhatsApp *</label>
                    <input 
                      type="tel" 
                      required 
                      value={telefono} 
                      onChange={(e) => setTelefono(e.target.value)} 
                      placeholder="(+57) 300 000 0000" 
                      className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-gray-900 transition-colors text-sm text-gray-900" 
                    />
                  </div>
                </div>

                <div className="pt-8 flex justify-end">
                  <button 
                    type="submit" 
                    className="bg-gray-900 text-white px-8 py-3 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[var(--color-udec-crimson)] transition-colors flex items-center gap-2"
                  >
                    Siguiente: Elegir Curso <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-serif text-gray-900 mb-6">2. Selección de Curso Corto</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Curso Corto / Módulo de Educación Continua
                  </label>
                  <select 
                    value={selectedProgramId}
                    onChange={(e) => setSelectedProgramId(e.target.value)}
                    className="w-full bg-white border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-gray-900 transition-colors text-sm"
                  >
                    {CATALOGO_PROGRAMAS.map(prog => (
                      <option key={prog.id} value={prog.id}>
                        [{prog.categoria}] {prog.titulo} — Prof. {prog.docente}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Course Details Card */}
                {selectedProgram && (
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Docente Titular:</span>
                      <strong className="text-gray-900">{selectedProgram.docente}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Intensidad / Modalidad:</span>
                      <strong className="text-gray-900">{selectedProgram.duracion} • {selectedProgram.modalidad}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Sede:</span>
                      <strong className="text-gray-900">{selectedProgram.sede}</strong>
                    </div>
                  </div>
                )}

                {/* Mode of Payment: Particular vs Company */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
                    Modalidad de Inscripción y Pago
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMode('particular')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        paymentMode === 'particular'
                          ? 'border-gray-900 bg-gray-900 text-white shadow-sm'
                          : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="font-bold text-sm block mb-1">Pago Particular</span>
                      <span className={`text-xs block ${paymentMode === 'particular' ? 'text-gray-300' : 'text-gray-500'}`}>
                        Inversión directa por curso ($780.000 COP) vía PSE o tarjeta.
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMode('empresa')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        paymentMode === 'empresa'
                          ? 'border-blue-900 bg-blue-900 text-white shadow-sm'
                          : 'border-blue-200 bg-blue-50/50 text-blue-900 hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 font-bold text-sm">
                        <Building2 className="w-4 h-4" />
                        Plan Bolsa de Empresas
                      </div>
                      <span className={`text-xs block ${paymentMode === 'empresa' ? 'text-blue-200' : 'text-blue-800 font-light'}`}>
                        Redimir con los créditos corporativos de su empresa (2 Créditos).
                      </span>
                    </button>
                  </div>
                </div>

                {paymentMode === 'empresa' && (
                  <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 text-xs">
                    <label className="block font-bold text-blue-900 uppercase tracking-wider mb-2">
                      NIT de la Empresa Conveniada *
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. 900.123.456-7"
                      value={companyNit}
                      onChange={(e) => setCompanyNit(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-blue-300 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-blue-900"
                    />
                    <p className="text-[11px] text-blue-700 mt-2 font-light">
                      El sistema validará el saldo de créditos corporativos disponibles de su organización al confirmar.
                    </p>
                  </div>
                )}

                <div className="pt-6 flex justify-between items-center">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    Atrás
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setStep(3)}
                    className="bg-gray-900 text-white px-8 py-3 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[var(--color-udec-crimson)] transition-colors flex items-center gap-2"
                  >
                    Continuar <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                  <Check className="w-8 h-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-2">Pre-Inscripción Exitosa</h2>
                <p className="text-gray-600 text-xs sm:text-sm font-light max-w-md mx-auto">
                  Hemos registrado su solicitud para el curso <strong className="font-semibold text-gray-900">{selectedProgram.titulo}</strong>.
                </p>
              </div>

              {paymentMode === 'particular' ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs flex justify-between items-center">
                    <span>Monto a Cancelar:</span>
                    <strong className="text-base font-mono text-gray-900">$780.000 COP</strong>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                      onClick={() => handlePagar('PSE')}
                      disabled={isProcessing}
                      className="flex flex-col items-center p-6 border border-gray-200 rounded-2xl hover:border-gray-900 transition-colors group bg-white shadow-2xs hover:shadow-sm"
                    >
                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/PSE_logo.png" alt="PSE" className="h-10 object-contain mb-3 opacity-90 group-hover:opacity-100" />
                      <span className="font-bold text-xs text-gray-900">Pagar con PSE (Bancos Colombia)</span>
                      <span className="text-[10px] text-gray-500 mt-1">Débito inmediato a cuenta corriente o ahorros</span>
                    </button>
                    
                    <button 
                      onClick={() => handlePagar('TARJETA')}
                      disabled={isProcessing}
                      className="flex flex-col items-center p-6 border border-gray-200 rounded-2xl hover:border-gray-900 transition-colors group bg-white shadow-2xs hover:shadow-sm"
                    >
                      <CreditCard className="w-10 h-10 text-gray-400 mb-3 group-hover:text-gray-900 transition-colors" />
                      <span className="font-bold text-xs text-gray-900">Tarjeta de Crédito / Débito</span>
                      <span className="text-[10px] text-gray-500 mt-1">Visa, Mastercard, American Express</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200 text-center space-y-4">
                  <div className="inline-flex items-center gap-1.5 text-blue-900 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-blue-700" />
                    Validación de Bolsa Corporativa
                  </div>
                  <p className="text-xs text-blue-800 font-light max-w-md mx-auto">
                    Se descontarán <strong className="font-bold">{selectedProgram.creditosEmpresa || 2} Créditos</strong> de la bolsa corporativa de la empresa con NIT <strong>{companyNit || 'Ingresado'}</strong>.
                  </p>
                  <button
                    onClick={handleRedimirCreditosEmpresa}
                    disabled={isProcessing}
                    className="px-8 py-3.5 bg-blue-900 hover:bg-blue-950 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                  >
                    Confirmar Matrícula con Créditos Empresa
                  </button>
                </div>
              )}

              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                  }}
                  className="text-xs font-semibold text-gray-500 hover:text-gray-900 underline"
                >
                  Realizar otra inscripción
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
