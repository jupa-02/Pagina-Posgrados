'use client';
import React, { useState } from 'react';

export default function RequestForm() {
  const [formData, setFormData] = useState({
    programaId: '',
    estudiantes: 15,
    tecnologiaRequerida: false,
    docenteForaneoPuntos: 0,
    franjaHorariaPuntos: 100, // Default Valle
    nivelFormacion: 'Maestría',
    requiereAccesibilidad: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos de solicitud enviados:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 p-6 rounded-lg text-green-800 border border-green-200">
        <h3 className="text-xl font-bold mb-2">¡Solicitud Registrada!</h3>
        <p>Los datos han sido pre-procesados y están listos para la Fase 2 (Feasibility Check). El IPAS se calculará cuando el administrador ejecute el algoritmo.</p>
        <button onClick={() => setSubmitted(false)} className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Registrar Otra Solicitud
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Fase 1: Pre-procesamiento y Elicitación de Microdatos</h2>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Programa / Solicitante</label>
          <select 
            className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
            value={formData.programaId}
            onChange={(e) => setFormData({...formData, programaId: e.target.value})}
            required
          >
            <option value="">Seleccione un programa...</option>
            <option value="1">Doctorado en Administración</option>
            <option value="3">Maestría en Desarrollo Territorial</option>
            <option value="4">Maestría en Gestión de Organizaciones</option>
            <option value="7">Especialización en Gestión Gerencial</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nivel de Formación (Define Tipo de Salón)</label>
          <select 
            className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
            value={formData.nivelFormacion}
            onChange={(e) => setFormData({...formData, nivelFormacion: e.target.value})}
          >
            <option value="Doctorado">Doctorado (Requiere Sala de Seminarios)</option>
            <option value="Maestría">Maestría (Requiere Magistral/Auditorio)</option>
            <option value="Especialización">Especialización (Requiere Magistral)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Estudiantes Matriculados (C)</label>
          <input 
            type="number" 
            min="1" max="100" 
            className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
            value={formData.estudiantes}
            onChange={(e) => setFormData({...formData, estudiantes: parseInt(e.target.value)})}
            required
          />
          <p className="text-xs text-gray-500 mt-1">El algoritmo descartará salones con capacidad menor a este número.</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Franja Horaria Solicitada (IDH)</label>
          <select 
            className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
            value={formData.franjaHorariaPuntos}
            onChange={(e) => setFormData({...formData, franjaHorariaPuntos: parseInt(e.target.value)})}
          >
            <option value={100}>Franja Valle (Jueves/Viernes AM) - Mayor puntaje</option>
            <option value={50}>Franja Media (Viernes PM)</option>
            <option value={0}>Franja Pico (Viernes Noche/Sábado AM) - Menor puntaje</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Docente Invitado (FIDE)</label>
          <select 
            className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
            value={formData.docenteForaneoPuntos}
            onChange={(e) => setFormData({...formData, docenteForaneoPuntos: parseInt(e.target.value)})}
          >
            <option value={100}>Docente Internacional / Nacional (Requiere tiquetes)</option>
            <option value={50}>Docente Invitado Sector Empresarial Local</option>
            <option value={0}>Docente de Planta / Regular</option>
          </select>
        </div>

        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <input 
            type="checkbox" 
            id="tecnologia"
            className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            checked={formData.tecnologiaRequerida}
            onChange={(e) => setFormData({...formData, tecnologiaRequerida: e.target.checked})}
          />
          <div>
            <label htmlFor="tecnologia" className="font-semibold text-gray-800 block">Requiere Infraestructura Tecnológica (ICT)</label>
            <span className="text-sm text-gray-600">Marque solo si el sílabo exige software/streaming. Restricción dura en Fase 2.</span>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-red-50 p-3 rounded-lg border border-red-200">
          <input 
            type="checkbox" 
            id="accesibilidad"
            className="h-5 w-5 text-red-600 rounded border-red-300 focus:ring-red-500"
            checked={formData.requiereAccesibilidad}
            onChange={(e) => setFormData({...formData, requiereAccesibilidad: e.target.checked})}
          />
          <div>
            <label htmlFor="accesibilidad" className="font-semibold text-red-800 block">Cláusula Inclusiva (Movilidad Reducida)</label>
            <span className="text-sm text-red-600">Fuerza asignación en Primera Planta. Use solo con soporte médico.</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button type="submit" className="w-full bg-blue-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-800 transition-colors">
          Enviar Microdatos al Motor IPAS
        </button>
      </div>
    </form>
  );
}
