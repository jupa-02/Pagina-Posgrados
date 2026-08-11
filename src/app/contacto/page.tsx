import Navbar from '@/components/layout/Navbar';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { CATALOGO_PROGRAMAS } from '@/data/programasData';

export default function Contacto() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Navbar />
      
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-serif text-gray-900 mb-6">Admisiones y Contacto</h1>
          <p className="text-lg text-gray-600 font-light">
            Estamos aquí para guiarte en tu proceso de admisión a la Universidad de Cartagena. 
            Déjanos tus datos o comunícate a través de nuestras líneas oficiales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div className="bg-[var(--color-udec-stone)] p-10 rounded-sm">
            <h3 className="text-2xl font-serif text-gray-900 mb-8">Solicita información</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Nombre Completo</label>
                  <input type="text" className="w-full bg-white border-refined p-3 focus:outline-none focus:border-gray-900 transition-colors" placeholder="Tu nombre" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Teléfono</label>
                  <input type="tel" className="w-full bg-white border-refined p-3 focus:outline-none focus:border-gray-900 transition-colors" placeholder="+57 300 000 0000" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Correo Electrónico</label>
                <input type="email" className="w-full bg-white border-refined p-3 focus:outline-none focus:border-gray-900 transition-colors" placeholder="tu@email.com" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Programa de Interés</label>
                <select defaultValue="" className="w-full bg-white border-refined p-3 focus:outline-none focus:border-gray-900 transition-colors text-gray-600">
                  <option value="" disabled>Seleccione un programa...</option>
                  {CATALOGO_PROGRAMAS.map(prog => (
                    <option key={prog.id} value={prog.id}>{prog.titulo}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Mensaje Adicional</label>
                <textarea rows={4} className="w-full bg-white border-refined p-3 focus:outline-none focus:border-gray-900 transition-colors" placeholder="¿Tienes alguna duda específica?"></textarea>
              </div>

              <button type="button" className="w-full bg-[var(--color-udec-crimson)] text-white py-4 text-sm font-bold tracking-wide uppercase hover:bg-gray-900 transition-colors flex justify-center items-center gap-2 mt-4">
                Enviar Solicitud
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-12 lg:pl-10">
            <div>
              <h3 className="text-xl font-serif text-gray-900 mb-6">Oficina de Posgrados</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 rounded-sm">
                    <MapPin className="w-6 h-6 text-[var(--color-udec-crimson)] stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Sede San Agustín</h4>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">Centro Histórico, Carrera 6 #36-100<br/>Cartagena de Indias, Colombia</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 rounded-sm">
                    <Phone className="w-6 h-6 text-[var(--color-udec-crimson)] stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Líneas de Atención</h4>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">(+57) 605 669 8181 Ext. 123<br/>Línea Gratuita: 01 8000 955 432</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 rounded-sm">
                    <Mail className="w-6 h-6 text-[var(--color-udec-crimson)] stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Correo Electrónico</h4>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">posgrados@unicartagena.edu.co<br/>admisiones@unicartagena.edu.co</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-gray-200">
              <h3 className="text-xl font-serif text-gray-900 mb-4">Horario de Atención</h3>
              <p className="text-sm text-gray-600 font-light">
                <strong>Lunes a Viernes:</strong> 8:00 AM - 12:00 PM y 2:00 PM - 6:00 PM<br/>
                <strong>Sábados:</strong> 8:00 AM - 12:00 PM (Solo atención virtual)
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
