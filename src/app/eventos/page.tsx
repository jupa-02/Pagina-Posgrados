'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { QrCode, CheckCircle2, UserCheck, Calendar, MapPin, Building, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

export default function EventosPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    documento: '',
    correo: '',
    programa: 'Maestría en Administración (MBA)',
  });
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessData(null);

    try {
      const res = await fetch('/api/eventos/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al procesar la inscripción');
      }

      setSuccessData(data);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-[#002B49] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#F59E0B] text-[#002B49] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              Sistema de Asistencia y Entradas QR
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white mb-4">
              Control y Validación de Eventos de Posgrados
            </h1>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
              Inscripción en línea, generación automática de entradas digitales con código QR criptográfico y validación en tiempo real en la puerta del evento.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/eventos/scanner"
                className="inline-flex items-center gap-2 bg-[#7A1B22] hover:bg-[#8f2029] text-white px-5 py-3 rounded-lg font-bold text-sm transition-all shadow-lg shadow-red-950/20"
              >
                <QrCode className="w-4 h-4" />
                Abrir Escáner QR de Puerta
              </Link>
              <Link
                href="/eventos/dashboard"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 rounded-lg font-bold text-sm transition-all"
              >
                <UserCheck className="w-4 h-4" />
                Panel de Asistencia en Vivo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Registro y Detalles */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Columna Izquierda: Información del Evento */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                I Simposio Internacional de Posgrados
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Facultad de Ciencias Económicas — Universidad de Cartagena
              </p>

              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#7A1B22] mt-0.5" />
                  <div>
                    <span className="font-semibold block text-gray-900">Fecha y Hora</span>
                    <span>15 de Septiembre de 2026 — 08:30 AM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#7A1B22] mt-0.5" />
                  <div>
                    <span className="font-semibold block text-gray-900">Lugar</span>
                    <span>Claustro San Agustín, Paraninfo Rafael Núñez</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-[#7A1B22] mt-0.5" />
                  <div>
                    <span className="font-semibold block text-gray-900">Organiza</span>
                    <span>Dirección de Posgrados y Educación Continua</span>
                  </div>
                </div>
              </div>

              <hr className="my-6 border-gray-100" />

              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200/60">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-amber-700 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-amber-900 leading-relaxed">
                    <strong>Boleto 100% Digital y Seguro:</strong> Al completar el formulario o registrarte vía Google Forms, recibirás tu código QR intransferible para presentar en la entrada.
                  </div>
                </div>
              </div>
            </div>

            {/* Accesos rápidos para el personal */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-base mb-2 text-[#F59E0B]">¿Eres parte del equipo organizador?</h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Utiliza el escáner móvil desde tu teléfono para validar asistentes en la entrada o consulta el panel con la lista de inscritos.
              </p>
              <div className="space-y-2">
                <Link
                  href="/eventos/scanner"
                  className="flex items-center justify-between bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors"
                >
                  <span className="flex items-center gap-2"><QrCode className="w-4 h-4 text-emerald-400" /> Escáner de Puerta</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                </Link>
                <Link
                  href="/eventos/dashboard"
                  className="flex items-center justify-between bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors"
                >
                  <span className="flex items-center gap-2"><UserCheck className="w-4 h-4 text-amber-400" /> Dashboard en Vivo</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                </Link>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario de Registro */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Inscripción de Asistentes
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Completa tus datos para generar tu entrada con código QR oficial.
              </p>

              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                  {errorMsg}
                </div>
              )}

              {successData ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    <div>
                      <h3 className="font-bold text-lg text-emerald-900">¡Inscripción Exitosa!</h3>
                      <p className="text-xs text-emerald-700">Se ha generado tu entrada oficial para el evento.</p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-emerald-100 text-sm space-y-2 text-gray-800">
                    <p><strong>Asistente:</strong> {successData.asistente.nombre}</p>
                    <p><strong>Documento / Cédula:</strong> {successData.asistente.documento}</p>
                    <p><strong>Correo Electrónico:</strong> {successData.asistente.correo}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Link
                      href={successData.ticket_url}
                      className="inline-flex items-center justify-center gap-2 bg-[#7A1B22] text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-[#8f2029] transition-all"
                    >
                      <QrCode className="w-4 h-4" />
                      Ver Mi Entrada con Código QR
                    </Link>
                    <button
                      onClick={() => {
                        setSuccessData(null);
                        setFormData({ nombre: '', documento: '', correo: '', programa: 'Maestría en Administración (MBA)' });
                      }}
                      className="px-4 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900 text-center"
                    >
                      Inscribir a otra persona
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Andrés Camilo Pérez Martínez"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002B49] text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Cédula o Documento de Identidad *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. 1047123456"
                        value={formData.documento}
                        onChange={(e) => setFormData({ ...formData, documento: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002B49] text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Ej. aperez@unicartagena.edu.co"
                        value={formData.correo}
                        onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002B49] text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Programa / Dependencia
                    </label>
                    <select
                      value={formData.programa}
                      onChange={(e) => setFormData({ ...formData, programa: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002B49] text-sm"
                    >
                      <option value="Maestría en Administración (MBA)">Maestría en Administración (MBA)</option>
                      <option value="Maestría en Finanzas">Maestría en Finanzas</option>
                      <option value="Maestría en Comercio y Negocios Internacionales">Maestría en Comercio y Negocios Internacionales</option>
                      <option value="Especialización en Gestión de Proyectos">Especialización en Gestión de Proyectos</option>
                      <option value="Especialización en Finanzas Públicas">Especialización en Finanzas Públicas</option>
                      <option value="Especialización en Revisoría Fiscal y Auditoría">Especialización en Revisoría Fiscal y Auditoría</option>
                      <option value="Docente / Administrativo UdeC">Docente / Administrativo UdeC</option>
                      <option value="Público General / Externo">Público General / Externo</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 bg-[#7A1B22] hover:bg-[#8f2029] text-white py-3.5 px-6 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? 'Generando entrada...' : 'Completar Registro y Obtener Entrada QR'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
