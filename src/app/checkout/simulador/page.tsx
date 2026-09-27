'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  Building2, 
  ArrowLeft, 
  ExternalLink, 
  Lock, 
  ArrowRight,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

function SimulatorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ref = searchParams.get('ref') || 'REF-UDEC-2026-DEMO';
  
  const [banco, setBanco] = useState('Bancolombia');
  const [tipoPersona, setTipoPersona] = useState('Natural');
  const [isLoading, setIsLoading] = useState(false);
  const [pagoAprobado, setPagoAprobado] = useState(false);
  const [approvalDetails, setApprovalDetails] = useState<any>(null);

  const handleSimularAprobacion = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/pagos/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference: ref,
          status: 'APPROVED',
          approvalCode: `CUS-${Math.floor(100000 + Math.random() * 900000)}`
        })
      });

      const data = await res.json();
      if (data.success) {
        setPagoAprobado(true);
        setApprovalDetails(data);
      } else {
        alert(data.error || 'Error aprobando pago');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 max-w-3xl mx-auto px-4 sm:px-6">
      <Link 
        href="/" 
        className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[var(--color-udec-crimson)] mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver al portal principal
      </Link>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl relative overflow-hidden">
        {/* Institutional header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img 
              src="https://unicartagena.edu.co/images/logo/logo-unicaragena.svg" 
              alt="Universidad de Cartagena" 
              className="h-10 w-auto"
            />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-900 block leading-tight">
                Pasarela Oficial de Pagos • UdeC
              </span>
              <span className="text-[10px] text-gray-500 font-mono">
                Convenio Tesorería PSE / Wompi
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5" />
            Conexión Cifrada 256-bit
          </div>
        </div>

        {!pagoAprobado ? (
          <div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200/80 mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
                Resumen de Transacción
              </span>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-sm font-semibold text-gray-900">Referencia Institucional:</span>
                <span className="text-xs font-mono bg-white px-2.5 py-1 rounded border border-gray-200 text-gray-700 font-bold">
                  {ref}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-gray-900">Entidad Beneficiaria:</span>
                <span className="text-xs text-gray-600 font-medium">Universidad de Cartagena (NIT 890.480.123-5)</span>
              </div>
            </div>

            {/* Simulated PSE Fields */}
            <div className="space-y-5 mb-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  Seleccione su Entidad Financiera (PSE)
                </label>
                <select
                  value={banco}
                  onChange={(e) => setBanco(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--color-udec-crimson)] focus:outline-none"
                >
                  <option value="Bancolombia">Bancolombia</option>
                  <option value="Banco de Bogotá">Banco de Bogotá</option>
                  <option value="Davivienda">Davivienda</option>
                  <option value="BBVA Colombia">BBVA Colombia</option>
                  <option value="Banco de Occidente">Banco de Occidente</option>
                  <option value="Nequi / Daviplata">Nequi / Daviplata</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  Tipo de Cliente
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTipoPersona('Natural')}
                    className={`py-3 px-4 rounded-xl text-xs font-bold border text-center transition-all ${
                      tipoPersona === 'Natural' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Persona Natural (Particular)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipoPersona('Juridica')}
                    className={`py-3 px-4 rounded-xl text-xs font-bold border text-center transition-all ${
                      tipoPersona === 'Juridica' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Persona Jurídica (Empresa)
                  </button>
                </div>
              </div>
            </div>

            {/* Test Simulation Button */}
            <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200/80 mb-8 text-xs text-amber-900">
              <p className="font-bold flex items-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Modo de Demostración & Validación Institucional:
              </p>
              <p className="font-light leading-relaxed">
                Al hacer clic en el botón inferior, se ejecutará el webhook de confirmación bancaria en tiempo real. Si la transacción corresponde a una <strong>Bolsa de Créditos Empresariales</strong>, se activarán de inmediato en el balance de la empresa. Si es una <strong>matrícula particular</strong>, quedará confirmada con su código de aprobación.
              </p>
            </div>

            <button
              onClick={handleSimularAprobacion}
              disabled={isLoading}
              className="w-full py-4 bg-[var(--color-udec-crimson)] hover:bg-black text-white text-xs font-bold tracking-widest uppercase rounded-full transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Validando con Pasarela Financiera...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  Simular y Aprobar Pago Inmediato
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="text-center py-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-2">
              ¡Transacción Aprobada Exitosamente!
            </h2>
            <p className="text-xs text-gray-500 font-mono mb-8">
              Código Único de Aprobación (CUS): {approvalDetails?.transaccion?.codigoAprobacion || 'CUS-884920'}
            </p>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-left text-xs space-y-3 mb-8 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-gray-500">Referencia:</span>
                <span className="font-mono font-bold text-gray-900">{ref}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Estado del Recaudo:</span>
                <span className="font-bold text-emerald-700">CONFIRMADO / LIQUIDADO</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Activación:</span>
                <span className="font-bold text-blue-700">En tiempo real (0 s)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/empresas"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 hover:bg-[var(--color-udec-crimson)] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors shadow-md"
              >
                <Building2 className="w-4 h-4" />
                Ir al Portal de Empresas (Ver Créditos)
              </Link>

              <Link
                href="/admin/sma-bridge"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-gray-300 hover:border-gray-900 text-gray-900 text-xs font-bold uppercase tracking-wider rounded-full transition-colors"
              >
                Ver en Puente SMA (Carga Masiva)
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CheckoutSimuladorPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F8F9FA]">
      <Navbar />
      <Suspense fallback={<div className="pt-40 text-center text-sm text-gray-500">Cargando simulador...</div>}>
        <SimulatorContent />
      </Suspense>
    </main>
  );
}
