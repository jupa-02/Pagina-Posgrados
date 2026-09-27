'use client';

import Link from 'next/link';
import { Building2, ArrowRight, Check, ShieldCheck, Sparkles, PieChart, Users, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BolsaCreditosBanner() {
  return (
    <section className="py-20 bg-[#F4F1EA] text-stone-900 relative overflow-hidden border-t border-stone-200">
      {/* Decorative ambient subtle warmth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-udec-gold)]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-udec-crimson)]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text and Value Prop */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-semibold uppercase tracking-wider text-[var(--color-udec-crimson)] mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-udec-gold)]" />
              Nuevo Programa Corporativo FCE
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light leading-tight mb-6 text-stone-900">
              Bolsa de Créditos Universitarios: <br />
              <span className="italic text-stone-600 font-serif">Capacitación empresarial con 0% desperdicio.</span>
            </h2>

            <p className="text-stone-700 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-xl">
              Su empresa adquiere un paquete de créditos académicos que sus colaboradores redimen libremente en cualquiera de nuestros 124 cursos ejecutivos. A través de un <strong className="text-stone-900 font-semibold">Portal de Gestión Corporativo</strong>, usted visualiza en tiempo real en qué cursos se consumen los créditos, qué empleados están inscritos y descarga sus certificados oficiales.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-stone-600 leading-snug">
                  <strong className="text-stone-900 font-medium">Reasignación 100% libre:</strong> Si un empleado se retira, los créditos retornan a la bolsa.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-stone-600 leading-snug">
                  <strong className="text-stone-900 font-medium">Trazabilidad en vivo:</strong> Auditoría de notas, asistencia y certificaciones al instante.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/empresas"
                className="inline-flex justify-center items-center gap-2 px-7 py-3.5 bg-[var(--color-udec-crimson)] text-white hover:bg-[var(--color-udec-crimson-dark)] font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Conocer Planes de Créditos
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link 
                href="/empresas#portal"
                className="inline-flex justify-center items-center gap-2 px-7 py-3.5 border border-stone-300 hover:border-stone-400 bg-white text-stone-800 font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-sm"
              >
                <BarChart3 className="w-4 h-4 text-[var(--color-udec-crimson)]" />
                Ver Demo del Portal
              </Link>
            </div>
          </div>

          {/* Mini Interactive Preview Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-xl relative">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-5 h-5 text-[var(--color-udec-crimson)]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700">Panel RRHH • Vista Previa</span>
                </div>
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  Bolsa Activa (100 Cr)
                </span>
              </div>

              {/* Progress bar of credits */}
              <div className="mb-6">
                <div className="flex justify-between items-end text-xs mb-2">
                  <span className="text-stone-500">Consumo de Créditos Corporativos</span>
                  <span className="text-stone-900 font-mono font-medium">72 / 100 Cr (72%)</span>
                </div>
                <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-600" style={{ width: '54%' }} title="Consumidos (54 Cr)" />
                  <div className="h-full bg-blue-600" style={{ width: '18%' }} title="En Curso (18 Cr)" />
                  <div className="h-full bg-stone-300" style={{ width: '28%' }} title="Disponibles (28 Cr)" />
                </div>
                <div className="flex justify-between text-[10px] text-stone-500 mt-2">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"/> 54 Cr Finalizados</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600 inline-block"/> 18 Cr En curso</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-stone-400 inline-block"/> 28 Cr Disponibles</span>
                </div>
              </div>

              {/* Sample Employees Rows */}
              <div className="space-y-3 mb-6">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/70 flex items-center justify-between text-xs">
                  <div>
                    <p className="text-stone-900 font-medium">Dra. Carolina Méndez</p>
                    <p className="text-stone-500 text-[11px]">Auditoría Médica y Pertinencia Clínica</p>
                  </div>
                  <span className="text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[10px]">
                    2 Cr • 100%
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/70 flex items-center justify-between text-xs">
                  <div>
                    <p className="text-stone-900 font-medium">Ing. Andrés Torres</p>
                    <p className="text-stone-500 text-[11px]">Finanzas Corporativas y Capital</p>
                  </div>
                  <span className="text-blue-700 font-semibold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded text-[10px]">
                    2 Cr • 80%
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/70 flex items-center justify-between text-xs">
                  <div>
                    <p className="text-stone-900 font-medium">Cont. Guillermo Salgado</p>
                    <p className="text-stone-500 text-[11px]">Normas NIA / Aseguramiento</p>
                  </div>
                  <span className="text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[10px]">
                    2 Cr • 100%
                  </span>
                </div>
              </div>

              <div className="text-center pt-2 border-t border-stone-100">
                <Link 
                  href="/empresas#portal"
                  className="text-[var(--color-udec-crimson)] hover:underline text-xs font-semibold tracking-wide inline-flex items-center gap-1 transition-colors"
                >
                  Interactuar con el simulador completo de asignación &rarr;
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
