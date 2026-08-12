'use client';
import React, { useState } from 'react';

// Subcomponente para Tooltips rápidos
const InfoTooltip = ({ text }: { text: string }) => (
  <span className="group relative inline-block ml-2 cursor-help">
    <svg className="w-4 h-4 text-[#C2A661]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
    <div className="opacity-0 w-64 bg-[#111827] text-white text-xs rounded-lg py-2 px-3 absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
      {text}
      <svg className="absolute text-[#111827] h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
    </div>
  </span>
);

export default function RequestForm() {
  const [formData, setFormData] = useState({
    programaId: '',
    estudiantes: 15,
    reqProyector: true,
    reqStreaming: false,
    reqSoftware: false,
    tieneDocenteInvitado: false,
    docenteForaneoPuntos: 0,
    fechaInicioDocente: '',
    fechaFinDocente: '',
    modalidadDocente: 'Presencial',
    franjaHorariaPuntos: 100,
    nivelFormacion: 'Maestría',
    reqAccesibilidad: false,
    tipoAccesibilidad: 'Ninguna',
  });
  
  const [submitted, setSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Usar nombrePrograma basado en programaId para que no quede en blanco
      const programNameMap: Record<string, string> = {
        '1': 'Doctorado en Administración',
        '2': 'Maestría en Gestión de Organizaciones',
        '3': 'Maestría en Desarrollo Territorial',
      };
      
      const payload = {
        ...formData,
        nombrePrograma: programNameMap[formData.programaId] || `Programa ${formData.programaId}`
      };

      const res = await fetch('/api/ipas/solicitudes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error('Error al conectar con la base de datos');
      
      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Error desconocido');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#FAFAFA] p-8 rounded-xl shadow-refined border-refined max-w-3xl mx-auto">
        <h3 className="text-2xl font-serif text-[#7A1B22] mb-3">Solicitud Registrada Exitosamente</h3>
        <p className="text-[#111827] opacity-80 mb-6">Los parámetros y restricciones del programa han sido ingresados al modelo de Operations Research y serán procesados en la siguiente iteración del Índice de Priorización de Asignación de Salones (IPAS).</p>
        <button onClick={() => setSubmitted(false)} className="bg-[#111827] text-white px-6 py-2 rounded font-medium hover:bg-[#7A1B22] transition-colors">
          Registrar Nueva Solicitud
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-refined border-refined max-w-4xl mx-auto">
      <div className="border-b border-gray-200 pb-5 mb-8">
        <h2 className="text-3xl font-serif text-[#111827] mb-2">Levantamiento Paramétrico IPAS</h2>
        <p className="text-sm text-gray-500 max-w-2xl">
          Complete este formulario con absoluta rigurosidad. Los datos ingresados determinan el vector de viabilidad ($V_i$) y el cálculo de maximización de la función objetivo. 
        </p>
      </div>
      
      <div className="space-y-8">
        {/* PARÁMETROS BÁSICOS */}
        <section>
          <h3 className="text-xl font-bold text-[#7A1B22] mb-4 flex items-center gap-2">
            <span className="bg-[#7A1B22] text-white w-6 h-6 flex items-center justify-center rounded-full text-sm">1</span>
            Demanda Estudiantil y Formato Académico
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FAFAFA] p-5 rounded-lg border-refined">
            
            <div>
              <label className="flex items-center text-sm font-bold text-[#111827] mb-1">
                Programa de Posgrado <InfoTooltip text="Identificador único del programa. Base para el cálculo del emparejamiento bipartito." />
              </label>
              {/* IMPORTANT: text-[#111827] forces the text color to fix the Safari/Dark mode bug */}
              <select className="w-full text-[#111827] border-gray-300 rounded p-2.5 border bg-white focus:border-[#C2A661] focus:ring-1 focus:ring-[#C2A661] outline-none transition-all" required value={formData.programaId} onChange={e => setFormData({...formData, programaId: e.target.value})}>
                <option value="">Seleccione el programa...</option>
                <option value="1">Doctorado en Administración</option>
                <option value="3">Maestría en Desarrollo Territorial</option>
              </select>
            </div>
            
            <div>
              <label className="flex items-center text-sm font-bold text-[#111827] mb-1">
                Aforo Estimado Estricto (E) <InfoTooltip text="Número exacto de estudiantes. Determina la eficiencia del uso del salón (IOA)." />
              </label>
              <input type="number" min="1" max="100" required className="w-full text-[#111827] border-gray-300 rounded p-2.5 border bg-white focus:border-[#C2A661] focus:ring-1 focus:ring-[#C2A661] outline-none transition-all" value={formData.estudiantes} onChange={e => { const v = parseInt(e.target.value); setFormData({...formData, estudiantes: isNaN(v) ? 0 : v}); }} />
            </div>
            
            <div>
              <label className="flex items-center text-sm font-bold text-[#111827] mb-1">
                Nivel de Formación (FAP) <InfoTooltip text="Doctorados se priorizan en salas de junta; Maestrías en aulas magistrales." />
              </label>
              <select className="w-full text-[#111827] border-gray-300 rounded p-2.5 border bg-white focus:border-[#C2A661] focus:ring-1 focus:ring-[#C2A661] outline-none transition-all" value={formData.nivelFormacion} onChange={e => setFormData({...formData, nivelFormacion: e.target.value})}>
                <option value="Doctorado">Doctorado (Mesas U / Seminario)</option>
                <option value="Maestría">Maestría / Especialización (Magistral)</option>
              </select>
            </div>
            
            <div>
              <label className="flex items-center text-sm font-bold text-[#111827] mb-1">
                Franja Horaria Solicitada (IDH) <InfoTooltip text="Mover el programa a una franja valle (Jueves) otorga puntos extra en el algoritmo." />
              </label>
              <select className="w-full text-[#111827] border-gray-300 rounded p-2.5 border bg-white focus:border-[#C2A661] focus:ring-1 focus:ring-[#C2A661] outline-none transition-all" value={formData.franjaHorariaPuntos} onChange={e => setFormData({...formData, franjaHorariaPuntos: parseInt(e.target.value)})}>
                <option value={100}>Valle (Jueves - Viernes AM)</option>
                <option value={50}>Media (Viernes PM)</option>
                <option value={0}>Pico (Viernes Noche - Sábado AM)</option>
              </select>
            </div>

          </div>
        </section>

        {/* RESTRICCIONES TECNOLÓGICAS */}
        <section>
          <h3 className="text-xl font-bold text-[#7A1B22] mb-4 flex items-center gap-2">
            <span className="bg-[#7A1B22] text-white w-6 h-6 flex items-center justify-center rounded-full text-sm">2</span>
            Restricciones Tecnológicas Exactas (ICT)
          </h3>
          <div className="bg-[#FAFAFA] p-5 rounded-lg border-refined">
            <p className="text-sm text-gray-600 mb-4 bg-yellow-50 border border-yellow-200 p-3 rounded text-justify">
              <strong>Advertencia de Eficiencia:</strong> Marque <em>únicamente</em> los recursos tecnológicos consignados en el sílabo oficial. Seleccionar erróneamente forzará al algoritmo a descartar salones y dañará la puntuación de su programa.
            </p>
            
            <div className="space-y-4">
              <label className="flex items-start gap-3 p-3 bg-white border border-gray-200 hover:border-[#C2A661] rounded transition-colors cursor-pointer shadow-sm">
                <input type="checkbox" checked={formData.reqProyector} onChange={e => setFormData({...formData, reqProyector: e.target.checked})} className="mt-1 w-4 h-4 text-[#C2A661] rounded focus:ring-[#C2A661]" />
                <div>
                  <span className="block font-bold text-[#111827]">Proyector Interactivo (Estándar)</span>
                  <span className="block text-xs text-gray-500 mt-0.5">El 95% del inventario cuenta con esto.</span>
                </div>
              </label>
              
              <label className="flex items-start gap-3 p-3 bg-white border border-gray-200 hover:border-[#C2A661] rounded transition-colors cursor-pointer shadow-sm">
                <input type="checkbox" checked={formData.reqStreaming} onChange={e => setFormData({...formData, reqStreaming: e.target.checked})} className="mt-1 w-4 h-4 text-[#C2A661] rounded focus:ring-[#C2A661]" />
                <div>
                  <span className="block font-bold text-[#111827]">Sistema de Streaming Autónomo</span>
                  <span className="block text-xs text-gray-500 mt-0.5">Hardware dedicado: Cámaras de seguimiento automático. SOLO para clases con estudiantes remotos.</span>
                </div>
              </label>
              
              <label className="flex items-start gap-3 p-3 bg-white border border-gray-200 hover:border-[#C2A661] rounded transition-colors cursor-pointer shadow-sm">
                <input type="checkbox" checked={formData.reqSoftware} onChange={e => setFormData({...formData, reqSoftware: e.target.checked})} className="mt-1 w-4 h-4 text-[#C2A661] rounded focus:ring-[#C2A661]" />
                <div>
                  <span className="block font-bold text-[#111827]">Licenciamiento Especializado de Software</span>
                  <span className="block text-xs text-gray-500 mt-0.5">Requiere acceso a terminales con Stata, RStudio, SPSS, EViews o MATLAB. Limita severamente la disponibilidad.</span>
                </div>
              </label>
            </div>
          </div>
        </section>

        {/* PARÁMETROS DOCENTE */}
        <section>
          <h3 className="text-xl font-bold text-[#7A1B22] mb-4 flex items-center gap-2">
            <span className="bg-[#7A1B22] text-white w-6 h-6 flex items-center justify-center rounded-full text-sm">3</span>
            Factor de Inversión Docente (FIDE)
          </h3>
          <div className={`bg-[#FAFAFA] p-5 rounded-lg border-refined transition-all ${formData.tieneDocenteInvitado ? 'ring-1 ring-[#C2A661]' : ''}`}>
            <div className="flex items-center gap-3 mb-2">
              <input type="checkbox" id="tieneDocente" checked={formData.tieneDocenteInvitado} onChange={e => setFormData({...formData, tieneDocenteInvitado: e.target.checked, docenteForaneoPuntos: e.target.checked ? 100 : 0})} className="w-5 h-5 text-[#C2A661] rounded border-gray-300 focus:ring-[#C2A661]" />
              <label htmlFor="tieneDocente" className="text-base font-bold text-[#111827] cursor-pointer">El curso requiere inversión por Docente Foráneo o Invitado Especial</label>
            </div>
            <p className="text-xs text-gray-500 mb-5 ml-8">El modelo protege financieramente la inversión de la Facultad priorizando la calidad del salón.</p>
            
            {formData.tieneDocenteInvitado && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200 ml-8 animate-in fade-in slide-in-from-top-2">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-[#111827] mb-1">Procedencia (Nivel de Viáticos)</label>
                  <select className="w-full text-[#111827] border-gray-300 rounded p-2.5 border bg-white focus:border-[#C2A661] focus:ring-1 focus:ring-[#C2A661] outline-none transition-all" value={formData.docenteForaneoPuntos} onChange={e => setFormData({...formData, docenteForaneoPuntos: parseInt(e.target.value)})}>
                    <option value={100}>Internacional / Nacional con Tiquetes + Hotel (Alta Prioridad FIDE)</option>
                    <option value={50}>Invitado Sector Empresarial Local (Media Prioridad FIDE)</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-[#111827] mb-1">Modalidad de Impartición <InfoTooltip text="Define cómo se entregará la clase, afectando si se requiere Streaming obligatorio." /></label>
                  <select className="w-full text-[#111827] border-gray-300 rounded p-2.5 border bg-white focus:border-[#C2A661] focus:ring-1 focus:ring-[#C2A661] outline-none transition-all" value={formData.modalidadDocente} onChange={e => setFormData({...formData, modalidadDocente: e.target.value})}>
                    <option value="Presencial">Presencial 100% (El docente viaja físicamente)</option>
                    <option value="Virtual">Virtual 100% (Docente transmite, estudiantes presenciales)</option>
                    <option value="Híbrida">Híbrida (Docente presencial + Streaming a otras sedes)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#111827] mb-1">Fecha Llegada / Inicio</label>
                  <input type="date" required={formData.tieneDocenteInvitado} className="w-full text-[#111827] border-gray-300 rounded p-2.5 border bg-white focus:border-[#C2A661] focus:ring-1 focus:ring-[#C2A661] outline-none transition-all" value={formData.fechaInicioDocente} onChange={e => setFormData({...formData, fechaInicioDocente: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#111827] mb-1">Fecha Salida / Fin</label>
                  <input type="date" required={formData.tieneDocenteInvitado} className="w-full text-[#111827] border-gray-300 rounded p-2.5 border bg-white focus:border-[#C2A661] focus:ring-1 focus:ring-[#C2A661] outline-none transition-all" value={formData.fechaFinDocente} onChange={e => setFormData({...formData, fechaFinDocente: e.target.value})} />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ACCESIBILIDAD */}
        <section>
          <h3 className="text-xl font-bold text-[#7A1B22] mb-4 flex items-center gap-2">
            <span className="bg-[#7A1B22] text-white w-6 h-6 flex items-center justify-center rounded-full text-sm">4</span>
            Cláusula de Inclusión y Accesibilidad (Hard Constraint)
          </h3>
          <div className="bg-[#FAFAFA] p-5 rounded-lg border-refined">
            <div className="flex items-center gap-3 mb-2">
              <input type="checkbox" id="reqAcc" checked={formData.reqAccesibilidad} onChange={e => setFormData({...formData, reqAccesibilidad: e.target.checked, tipoAccesibilidad: e.target.checked ? 'Solo Primera Planta' : 'Ninguna'})} className="w-5 h-5 text-[#C2A661] rounded border-gray-300 focus:ring-[#C2A661]" />
              <label htmlFor="reqAcc" className="text-base font-bold text-[#111827] cursor-pointer">Requerimientos de movilidad reducida en el cohorte</label>
            </div>
            <p className="text-xs text-gray-500 mb-5 ml-8">Esta restricción veta matemáticamente edificaciones sin rampas o ascensores activos. El algoritmo no la romperá bajo ninguna circunstancia.</p>

            {formData.reqAccesibilidad && (
              <div className="pt-2 ml-8 animate-in fade-in slide-in-from-top-2">
                <label className="block text-sm font-bold text-[#111827] mb-1">Especificación Arquitectónica</label>
                <select className="w-full text-[#111827] border-gray-300 rounded p-2.5 border bg-white focus:border-[#C2A661] focus:ring-1 focus:ring-[#C2A661] outline-none transition-all" value={formData.tipoAccesibilidad} onChange={e => setFormData({...formData, tipoAccesibilidad: e.target.value})}>
                  <option value="Silla de Ruedas">Usuario en Silla de Ruedas (Requiere Rampa / Ascensor OBLIGATORIO)</option>
                  <option value="Solo Primera Planta">Movilidad Reducida / Muletas (Bloqueado a 1ra Planta exclusivamente)</option>
                </select>
              </div>
            )}
          </div>
        </section>
      </div>

      {submitError && <div className="text-[#7A1B22] font-bold mt-4">{submitError}</div>}
      <div className="mt-10 pt-6 border-t border-gray-200">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-[#7A1B22] hover:bg-[#111827] text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-refined text-lg disabled:opacity-50"
        >
          {isSubmitting ? 'Registrando en Base de Datos...' : 'Registrar Solicitud en la Base de Datos'}
        </button>
        <p className="text-center text-xs text-gray-400 mt-4 font-mono uppercase tracking-wider">
          Validación Continua IPAS v1.2
        </p>
      </div>
    </form>
  );
}
