import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { ArrowUpRight, GraduationCap, Building2, BookOpen, Clock, Users, ArrowRight } from 'lucide-react';

export default function EmpresasPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF9] text-gray-900 font-sans selection:bg-[var(--color-udec-crimson)] selection:text-white">
      <Navbar />
      
      <main>
        {/* HERO SECTION EDITORIAL */}
        <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
          {/* Subtle decorative blurring */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-udec-crimson)] opacity-[0.02] blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gray-500 mb-8 border border-gray-200 rounded-full bg-white/50 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-udec-crimson)]"></span>
                UdeC Corporate
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif leading-[1.05] tracking-tight text-gray-900 mb-6">
                El prestigio académico <br/>
                <span className="text-[var(--color-udec-crimson)] italic font-light">alcanza a su talento.</span>
              </h1>
            </div>
            
            <div className="lg:col-span-4 lg:pb-4 flex flex-col items-start lg:items-end text-left lg:text-right">
              <p className="text-lg md:text-xl text-gray-600 font-light max-w-sm mb-8 leading-relaxed">
                Elevamos la competitividad de las empresas más exigentes mediante formación superior estructurada, flexible y certificada por 200 años de historia.
              </p>
              <div className="flex gap-4">
                <Link href="#diagnostico" className="group flex items-center gap-3 px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-full transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
                  <span className="font-medium text-sm tracking-wide">Iniciar Diagnóstico</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BENTO GRID SECTION: EL BANCO DE CRÉDITOS */}
        <section className="py-24 bg-white border-y border-gray-100 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight mb-4">
                  Despídase de las licencias que no usa.
                </h2>
                <p className="text-lg text-gray-500 font-light">
                  Presentamos el Banco de Créditos Universitarios: una membresía flexible diseñada para corporaciones.
                </p>
              </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px]">
              
              {/* Main Feature - Large */}
              <div className="md:col-span-2 md:row-span-2 bg-[#FDFCF9] rounded-3xl p-10 border border-gray-200/60 relative overflow-hidden group hover:shadow-xl hover:border-gray-300/60 transition-all duration-500">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Building2 className="w-48 h-48 text-[var(--color-udec-crimson)]" />
                </div>
                <div className="relative z-10 h-full flex flex-col">
                  <span className="text-[var(--color-udec-crimson)] font-semibold text-sm tracking-widest uppercase mb-4">Asignación Dinámica</span>
                  <h3 className="text-3xl font-serif text-gray-900 mb-6 max-w-sm leading-snug">Invierta únicamente en el aprendizaje real.</h3>
                  <p className="text-gray-600 font-light text-lg leading-relaxed max-w-md mt-auto">
                    A diferencia de las plataformas SaaS, usted compra créditos universitarios. Distribuya la formación estratégicamente entre sus colaboradores según el rol que necesiten cubrir.
                  </p>
                </div>
              </div>

              {/* Stat Card */}
              <div className="bg-gray-900 text-white rounded-3xl p-8 border border-gray-800 relative overflow-hidden group hover:bg-black transition-colors duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <div className="relative z-10 h-full flex flex-col justify-center">
                  <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-2">Reasignación Total</span>
                  <h3 className="text-5xl font-light font-serif mb-2 text-white group-hover:scale-105 transform origin-left transition-transform duration-500">100%</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Si un talento se retira, los créditos no consumidos retornan automáticamente a su banco corporativo. Cero desperdicio.
                  </p>
                </div>
              </div>

              {/* Graphic Card */}
              <div className="bg-white rounded-3xl p-8 border border-gray-200/60 flex flex-col relative overflow-hidden hover:shadow-lg transition-all duration-500">
                <div className="flex-1 flex items-center justify-center mb-6">
                  <div className="w-full max-w-[200px] aspect-square rounded-full border border-dashed border-gray-300 relative flex items-center justify-center animate-[spin_60s_linear_infinite]">
                    <div className="absolute inset-2 rounded-full border border-gray-100 bg-gray-50 flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-[var(--color-udec-crimson)] animate-[spin_60s_linear_infinite_reverse]" />
                    </div>
                  </div>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Certificación Oficial</h4>
                <p className="text-gray-500 text-sm font-light">Títulos que sí pesan en el mercado laboral.</p>
              </div>

              {/* Horizontal Feature */}
              <div className="md:col-span-2 bg-[#FDFCF9] rounded-3xl p-8 border border-gray-200/60 flex items-center justify-between hover:shadow-lg transition-all duration-500 group overflow-hidden relative">
                <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-[var(--color-udec-crimson)]/5 to-transparent rounded-tl-full"></div>
                <div className="relative z-10 max-w-md">
                  <span className="inline-block p-3 rounded-2xl bg-white border border-gray-100 shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-gray-700" />
                  </span>
                  <h4 className="text-2xl font-serif text-gray-900 mb-2">Panel Ejecutivo</h4>
                  <p className="text-gray-500 font-light text-sm">Monitoree la progresión académica de su equipo desde un dashboard centralizado y elegante.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CO-CREATION LABS: ASYMMETRIC LIST */}
        <section className="py-32 bg-[#FDFCF9] relative">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              
              <div className="lg:sticky lg:top-32 self-start">
                <span className="text-[var(--color-udec-crimson)] font-semibold text-xs tracking-widest uppercase mb-4 block">Soluciones a Medida</span>
                <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-[1.1] mb-6">
                  UdeC Co-Creation Labs
                </h2>
                <p className="text-xl text-gray-600 font-light leading-relaxed mb-10">
                  Transformamos los manuales y procesos internos de su empresa en rutas de certificación rigurosas, diseñadas por doctores en educación.
                </p>
                <div className="w-24 h-px bg-gray-300"></div>
              </div>

              <div className="space-y-12">
                {[
                  {
                    num: "01",
                    title: "Auditoría de Conocimiento",
                    desc: "Extraemos el núcleo de su negocio a partir de sus manuales operativos y lineamientos corporativos."
                  },
                  {
                    num: "02",
                    title: "Ingeniería Pedagógica",
                    desc: "Nuestro cuerpo docente estructura el material aplicando neuroeducación avanzada para asegurar retención."
                  },
                  {
                    num: "03",
                    title: "Campus Virtual Privado",
                    desc: "Lanzamos su academia corporativa bajo la infraestructura de la Universidad, otorgando certificados oficiales."
                  }
                ].map((step, idx) => (
                  <div key={idx} className="group flex gap-8">
                    <div className="flex-shrink-0">
                      <span className="text-4xl font-serif font-light text-gray-300 group-hover:text-[var(--color-udec-crimson)] transition-colors duration-300">
                        {step.num}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-medium text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-lg text-gray-500 font-light leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="diagnostico" className="py-32 bg-gray-900 text-white text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-serif font-light mb-8">
              El talento exige prestigio.
            </h2>
            <p className="text-xl text-gray-400 font-light mb-12">
              Agende una reunión con nuestros asesores académicos corporativos.
            </p>
            <button className="px-10 py-5 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-colors shadow-xl text-sm tracking-wide flex items-center justify-center gap-3 mx-auto">
              Agendar Diagnóstico Institucional
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

      </main>
      
    </div>
  );
}
