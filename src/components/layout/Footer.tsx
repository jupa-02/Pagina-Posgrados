import { MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Logo & Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src="https://unicartagena.edu.co/images/logo/logo-unicaragena.svg" 
                alt="Logo Universidad de Cartagena" 
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">
              Posgrados y Educación Continua de la Facultad de Ciencias Económicas. Formación de excelencia para los desafíos globales.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/posgrados_unicartagena/?hl=es" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-sm bg-gray-800 flex items-center justify-center hover:bg-[var(--color-udec-crimson)] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-serif font-medium mb-6">Navegación</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">Inicio</Link>
              </li>
              <li>
                <Link href="/#programas" className="text-gray-400 hover:text-white text-sm transition-colors">Oferta Académica</Link>
              </li>
              <li>
                <Link href="/inscripcion" className="text-gray-400 hover:text-white text-sm transition-colors">Proceso de Inscripción</Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-400 hover:text-white text-sm transition-colors">Admisiones y Contacto</Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-serif font-medium mb-6">Información de Contacto</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--color-udec-crimson)] mt-0.5" />
                <div>
                  <h5 className="font-medium text-sm mb-1">Sede San Agustín</h5>
                  <p className="text-gray-400 text-sm font-light">Centro Histórico, Carrera 6 #36-100<br/>Cartagena de Indias</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[var(--color-udec-crimson)] mt-0.5" />
                <div>
                  <h5 className="font-medium text-sm mb-1">Líneas de Atención</h5>
                  <p className="text-gray-400 text-sm font-light">(+57) 605 669 8181 Ext. 123<br/>01 8000 955 432</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[var(--color-udec-crimson)] mt-0.5" />
                <div>
                  <h5 className="font-medium text-sm mb-1">Correos Electrónicos</h5>
                  <p className="text-gray-400 text-sm font-light break-words">posgrados@unicartagena.edu.co</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs font-light">
            © {new Date().getFullYear()} Facultad de Ciencias Económicas - Universidad de Cartagena. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/admin/asignacion" className="text-gray-500 hover:text-[#C2A661] text-xs transition-colors">Admin IPAS</Link>
            <Link href="/coordinadores/asignacion" className="text-gray-500 hover:text-[#C2A661] text-xs transition-colors">Coordinadores IPAS</Link>
            <Link href="#" className="text-gray-500 hover:text-white text-xs transition-colors">Políticas de Privacidad</Link>
            <Link href="#" className="text-gray-500 hover:text-white text-xs transition-colors">Términos y Condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
