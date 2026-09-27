import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAsistenteByToken, getEventoById } from '@/lib/eventos/db';
import { generateQrDataUrl } from '@/lib/eventos/ticket';
import { Calendar, MapPin, Building, ShieldCheck, Printer, ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';

export default async function TicketPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const decodedToken = decodeURIComponent(token);
  const asistente = getAsistenteByToken(decodedToken);

  if (!asistente) {
    notFound();
  }

  const evento = getEventoById(asistente.evento_id) || {
    nombre: 'Evento Institucional Posgrados UdeC',
    fecha: '15 de Septiembre de 2026',
    lugar: 'Claustro San Agustín',
    organizador: 'Posgrados Ciencias Económicas',
  };

  const qrDataUrl = await generateQrDataUrl(decodedToken);

  return (
    <main className="min-h-screen bg-[#F1F5F9] py-8 sm:py-12 px-4 flex flex-col items-center justify-center">
      {/* Botón Volver */}
      <div className="w-full max-w-md mb-4 flex justify-between items-center print:hidden">
        <Link
          href="/eventos"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a Eventos
        </Link>
        <button
          onClick={undefined}
          className="inline-flex items-center gap-1.5 bg-white text-gray-800 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" /> Imprimir / Guardar PDF
        </button>
      </div>

      {/* Tarjeta del Boleto */}
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-200/80">
        
        {/* Cabecera Institucional */}
        <div className="bg-[#002B49] text-white p-6 text-center relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-[#F59E0B]/20 blur-xl"></div>
          <p className="text-[10px] font-bold tracking-widest text-[#F59E0B] uppercase mb-1">
            Universidad de Cartagena
          </p>
          <h1 className="text-base font-serif font-bold text-white tracking-wide">
            Posgrados y Educación Continua
          </h1>
          <div className="mt-3 inline-block bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-white border border-white/20">
            🎟️ Pase de Entrada Oficial
          </div>
        </div>

        {/* Detalles del Evento */}
        <div className="p-6 text-center border-b border-dashed border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
            {evento.nombre}
          </h2>

          <div className="space-y-1.5 text-xs text-gray-600 max-w-xs mx-auto">
            <div className="flex items-center justify-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#7A1B22]" />
              <span>{evento.fecha}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#7A1B22]" />
              <span>{evento.lugar}</span>
            </div>
          </div>
        </div>

        {/* QR Code Central */}
        <div className="p-6 bg-slate-50 flex flex-col items-center justify-center">
          <div className="bg-white p-4 rounded-2xl shadow-sm border-2 border-gray-200/80">
            <img src={qrDataUrl} alt="Código QR de Acceso" className="w-56 h-56 object-contain" />
          </div>
          <p className="text-[11px] text-gray-500 font-semibold mt-3">
            Presenta este código QR en la entrada del evento
          </p>

          {/* Estado de Asistencia */}
          <div className="mt-3">
            {asistente.estado_asistencia === 'asistio' ? (
              <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Asistencia Confirmada
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Entrada Válida (Pendiente de Ingreso)
              </span>
            )}
          </div>
        </div>

        {/* Información del Asistente */}
        <div className="p-6 space-y-3 text-xs">
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-500 font-medium">Asistente:</span>
            <span className="font-bold text-gray-900 text-right">{asistente.nombre}</span>
          </div>

          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-500 font-medium">Documento / Cédula:</span>
            <span className="font-bold text-gray-900">{asistente.documento}</span>
          </div>

          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-500 font-medium">Correo:</span>
            <span className="font-bold text-gray-900 text-right">{asistente.correo}</span>
          </div>

          {asistente.programa && (
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Programa:</span>
              <span className="font-bold text-gray-900 text-right">{asistente.programa}</span>
            </div>
          )}
        </div>

        {/* Pie de Boleto */}
        <div className="bg-gray-100 p-4 text-center text-[10px] text-gray-500 border-t border-gray-200">
          Entrada personal e intransferible. Protegida con firma digital HMAC-SHA256.<br />
          Universidad de Cartagena — Ciencias Económicas
        </div>
      </div>
    </main>
  );
}
