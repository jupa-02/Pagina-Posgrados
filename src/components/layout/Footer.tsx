import { MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#FAF9F5] text-stone-900 pt-16 pb-10 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Logo & Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-5">
              <img 
                src="https://unicartagena.edu.co/images/logo/logo-unicaragena.svg" 
                alt="Logo Universidad de Cartagena" 
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed mb-6">
              Departamento de Posgrados y Educación Continua. Facultad de Ciencias Económicas, Universidad de Cartagena. Formación de excelencia para los desafíos globales.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://www.instagram.com/posgrados_unicartagena/?hl=es" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-white border border-stone-300 flex items-center justify-center hover:bg-[var(--color-udec-crimson)] hover:text-white hover:border-[var(--color-udec-crimson)] transition-colors text-stone-600 shadow-sm"
                aria-label="Instagram Posgrados"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-base font-serif font-semibold text-stone-900 mb-4">Navegación</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="text-stone-600 hover:text-[var(--color-udec-crimson)] transition-colors">Inicio</Link>
              </li>
              <li>
                <Link href="/#programas" className="text-stone-600 hover:text-[var(--color-udec-crimson)] transition-colors">Cursos Cortos y Módulos</Link>
              </li>
              <li>
                <Link href="/empresas" className="text-stone-600 hover:text-[var(--color-udec-crimson)] transition-colors">UdeC Empresas</Link>
              </li>
              <li>
                <Link href="/contacto" className="text-stone-600 hover:text-[var(--color-udec-crimson)] transition-colors">Admisiones y Contacto</Link>
              </li>
              <li>
                <Link href="/inscripcion" className="text-stone-600 hover:text-[var(--color-udec-crimson)] transition-colors">Inscripción en Línea</Link>
              </li>
            </ul>
          </div>

          {/* Sedes y Contacto */}
          <div className="lg:col-span-2">
            <h4 className="text-base font-serif font-semibold text-stone-900 mb-4">Información Institucional</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[var(--color-udec-crimson)] mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-stone-900 mb-0.5">Campus Piedra de Bolívar</h5>
                  <p className="text-stone-600 font-light leading-relaxed text-xs">
                    Facultad de Ciencias Económicas<br />
                    Cartagena de Indias, Colombia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[var(--color-udec-gold)] mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-stone-900 mb-0.5">Sede Magangué</h5>
                  <p className="text-stone-600 font-light leading-relaxed text-xs">
                    Programas Regionales en Salud y Control<br />
                    Magangué, Bolívar
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[var(--color-udec-crimson)] mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-stone-900 mb-0.5">Líneas de Atención</h5>
                  <p className="text-stone-600 font-light leading-relaxed text-xs">
                    (+57) 605 669 8181 • Ext. 123<br />
                    01 8000 955 432
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[var(--color-udec-crimson)] mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-stone-900 mb-0.5">Correo Electrónico</h5>
                  <p className="text-stone-600 font-light break-all leading-relaxed text-xs">
                    posgrados@unicartagena.edu.co
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
          <p className="text-stone-500 font-light text-[11px]">
            © {new Date().getFullYear()} Departamento de Posgrados y Educación Continua — Facultad de Ciencias Económicas, Universidad de Cartagena.
          </p>
          <div className="flex gap-5 text-stone-500 text-[11px]">
            <Link href="/admin/sma-bridge" className="hover:text-[var(--color-udec-crimson)] transition-colors font-medium">Puente SMA</Link>
            <Link href="/admin/asignacion" className="hover:text-[var(--color-udec-crimson)] transition-colors">Admin IPAS</Link>
            <Link href="/coordinadores/asignacion" className="hover:text-[var(--color-udec-crimson)] transition-colors">Coordinadores IPAS</Link>
            <Link href="/contacto" className="hover:text-[var(--color-udec-crimson)] transition-colors">Admisiones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
