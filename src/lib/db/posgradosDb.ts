import fs from 'fs';
import path from 'path';

export interface EmpresaEntity {
  nit: string;
  razonSocial: string;
  contactoNombre: string;
  contactoEmail: string;
  contactoTelefono: string;
  creditosTotales: number;
  creditosUsados: number;
  creditosDisponibles: number;
  planNombre: string;
  fechaAfiliacion: string;
  colaboradoresAsignados: {
    id: string;
    documento: string;
    nombre: string;
    email: string;
    cursoId: string;
    cursoTitulo: string;
    creditosConsumidos: number;
    fechaAsignacion: string;
    progreso: number;
    estado: 'En Curso' | 'Completado' | 'Certificado';
  }[];
}

export interface InscripcionEntity {
  id: string;
  documento: string;
  tipoDoc: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  cursoId: string;
  cursoTitulo: string;
  cursoCodigo: string;
  modalidad: string;
  tipoInscripcion: 'Particular' | 'Bolsa Corporativa';
  empresaNit?: string;
  empresaNombre?: string;
  montoCOP: number;
  creditosUsados?: number;
  estadoPago: 'PENDIENTE' | 'CONFIRMADO' | 'FALLIDO';
  metodoPago: 'PSE' | 'TARJETA' | 'BOLSA_EMPRESAS' | 'CONVENIO_TESORERIA';
  referenciaPago: string;
  codigoAprobacion?: string;
  fechaCreacion: string;
  fechaConfirmacion?: string;
  estadoSMA: 'Pendiente Carga' | 'Sincronizado';
}

export interface TransaccionFinancieraEntity {
  id: string;
  referencia: string;
  tipo: 'COMPRA_BOLSA_EMPRESAS' | 'INSCRIPCION_PARTICULAR';
  montoCOP: number;
  pagadorNombre: string;
  pagadorEmail: string;
  pagadorIdentificacion: string;
  empresaNit?: string;
  cursoId?: string;
  paqueteCreditos?: number;
  estado: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';
  pasarela: 'WOMPI_PSE' | 'PAYU_COLOMBIA' | 'TESORERIA_UDEC_DIRECTA';
  codigoAprobacion?: string;
  fechaCreacion: string;
  fechaAprobacion?: string;
}

interface DatabaseSchema {
  empresas: Record<string, EmpresaEntity>;
  inscripciones: Record<string, InscripcionEntity>;
  transacciones: Record<string, TransaccionFinancieraEntity>;
}

const DB_PATH = path.join(process.cwd(), 'scratch', 'posgrados_db.json');

const INITIAL_DB: DatabaseSchema = {
  empresas: {
    '900123456-1': {
      nit: '900123456-1',
      razonSocial: 'Clínica del Mar S.A.S.',
      contactoNombre: 'Dra. María Fernanda Herrera',
      contactoEmail: 'mherrera@clinicadelmar.com',
      contactoTelefono: '300 456 7890',
      creditosTotales: 50,
      creditosUsados: 16,
      creditosDisponibles: 34,
      planNombre: 'Plan Corporativo Plus (50 Cr)',
      fechaAfiliacion: '2026-09-01',
      colaboradoresAsignados: [
        {
          id: 'COL-001',
          documento: '1047489211',
          nombre: 'Dra. Carolina Méndez Polo',
          email: 'cmendez@clinicadelmar.com',
          cursoId: '1',
          cursoTitulo: 'Auditoría Médica y Pertinencia Clínica',
          creditosConsumidos: 2,
          fechaAsignacion: '2026-09-15',
          progreso: 100,
          estado: 'Certificado'
        },
        {
          id: 'COL-002',
          documento: '73198422',
          nombre: 'Dr. Roberto Paternina',
          email: 'rpaternina@clinicadelmar.com',
          cursoId: '3',
          cursoTitulo: 'Auditoría de Cuentas Médicas y Facturación en Salud',
          creditosConsumidos: 2,
          fechaAsignacion: '2026-09-18',
          progreso: 85,
          estado: 'En Curso'
        }
      ]
    },
    '890480110-5': {
      nit: '890480110-5',
      razonSocial: 'Sociedad Portuaria Regional de Cartagena',
      contactoNombre: 'Ing. Carlos Mendoza',
      contactoEmail: 'cmendoza@puertocartagena.com',
      contactoTelefono: '310 987 6543',
      creditosTotales: 100,
      creditosUsados: 42,
      creditosDisponibles: 58,
      planNombre: 'Plan Alianza Estratégica (100 Cr)',
      fechaAfiliacion: '2026-08-15',
      colaboradoresAsignados: []
    }
  },
  inscripciones: {
    'INS-2026-001': {
      id: 'INS-2026-001',
      documento: '1143890123',
      tipoDoc: 'CC',
      nombres: 'Mariana',
      apellidos: 'Gómez Vergara',
      email: 'mariana.gomez@gmail.com',
      telefono: '315 222 3344',
      cursoId: '28',
      cursoTitulo: 'Decisiones Financieras y Creación de Valor',
      cursoCodigo: 'FCE-FIN-03',
      modalidad: 'Virtual Streaming',
      tipoInscripcion: 'Particular',
      montoCOP: 780000,
      estadoPago: 'CONFIRMADO',
      metodoPago: 'PSE',
      referenciaPago: 'REF-UDEC-2026-0925-A1',
      codigoAprobacion: 'CUS-994821',
      fechaCreacion: '2026-09-25T14:30:00Z',
      fechaConfirmacion: '2026-09-25T14:32:15Z',
      estadoSMA: 'Pendiente Carga'
    }
  },
  transacciones: {
    'TXN-2026-001': {
      id: 'TXN-2026-001',
      referencia: 'REF-UDEC-2026-0925-A1',
      tipo: 'INSCRIPCION_PARTICULAR',
      montoCOP: 780000,
      pagadorNombre: 'Mariana Gómez Vergara',
      pagadorEmail: 'mariana.gomez@gmail.com',
      pagadorIdentificacion: '1143890123',
      cursoId: '28',
      estado: 'APROBADO',
      pasarela: 'WOMPI_PSE',
      codigoAprobacion: 'CUS-994821',
      fechaCreacion: '2026-09-25T14:30:00Z',
      fechaAprobacion: '2026-09-25T14:32:15Z'
    }
  }
};

function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const dir = path.dirname(DB_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_DB, null, 2), 'utf-8');
      return INITIAL_DB;
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading posgrados db, using initial:', error);
    return INITIAL_DB;
  }
}

function writeDb(db: DatabaseSchema) {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing posgrados db:', error);
  }
}

// ----------------- EXPORTED DATABASE ACTIONS -----------------

export function getEmpresasDb(): EmpresaEntity[] {
  const db = readDb();
  return Object.values(db.empresas);
}

export function getEmpresaByNit(nit: string): EmpresaEntity | null {
  const db = readDb();
  return db.empresas[nit] || null;
}

export function comprarBolsaCreditos(params: {
  nit: string;
  razonSocial: string;
  contactoNombre: string;
  contactoEmail: string;
  contactoTelefono: string;
  creditos: number;
  montoCOP: number;
  referencia: string;
  pasarela?: 'WOMPI_PSE' | 'PAYU_COLOMBIA' | 'TESORERIA_UDEC_DIRECTA';
}) {
  const db = readDb();
  const nitKey = params.nit.trim();

  let empresa = db.empresas[nitKey];
  if (!empresa) {
    empresa = {
      nit: params.nit,
      razonSocial: params.razonSocial,
      contactoNombre: params.contactoNombre,
      contactoEmail: params.contactoEmail,
      contactoTelefono: params.contactoTelefono,
      creditosTotales: params.creditos,
      creditosUsados: 0,
      creditosDisponibles: params.creditos,
      planNombre: `Bolsa de ${params.creditos} Créditos`,
      fechaAfiliacion: new Date().toISOString().slice(0, 10),
      colaboradoresAsignados: []
    };
  } else {
    empresa.creditosTotales += params.creditos;
    empresa.creditosDisponibles += params.creditos;
    empresa.contactoNombre = params.contactoNombre || empresa.contactoNombre;
    empresa.contactoEmail = params.contactoEmail || empresa.contactoEmail;
  }

  db.empresas[nitKey] = empresa;

  // Registrar transacción
  const txnId = `TXN-${Date.now()}`;
  db.transacciones[txnId] = {
    id: txnId,
    referencia: params.referencia,
    tipo: 'COMPRA_BOLSA_EMPRESAS',
    montoCOP: params.montoCOP,
    pagadorNombre: params.contactoNombre,
    pagadorEmail: params.contactoEmail,
    pagadorIdentificacion: params.nit,
    empresaNit: params.nit,
    paqueteCreditos: params.creditos,
    estado: 'APROBADO',
    pasarela: params.pasarela || 'WOMPI_PSE',
    codigoAprobacion: `APR-${Math.floor(100000 + Math.random() * 900000)}`,
    fechaCreacion: new Date().toISOString(),
    fechaAprobacion: new Date().toISOString()
  };

  writeDb(db);
  return { empresa, transaccion: db.transacciones[txnId] };
}

export function iniciarCheckoutBolsa(params: {
  nit: string;
  razonSocial: string;
  contactoNombre: string;
  contactoEmail: string;
  contactoTelefono: string;
  creditos: number;
  montoCOP: number;
}) {
  const db = readDb();
  const nitKey = params.nit.trim();
  const ref = `REF-BOLSA-${Date.now().toString().slice(-6)}`;

  let empresa = db.empresas[nitKey];
  if (!empresa) {
    empresa = {
      nit: params.nit,
      razonSocial: params.razonSocial,
      contactoNombre: params.contactoNombre,
      contactoEmail: params.contactoEmail,
      contactoTelefono: params.contactoTelefono,
      creditosTotales: 0,
      creditosUsados: 0,
      creditosDisponibles: 0,
      planNombre: `Bolsa en Trámite (${params.creditos} Cr)`,
      fechaAfiliacion: new Date().toISOString().slice(0, 10),
      colaboradoresAsignados: []
    };
    db.empresas[nitKey] = empresa;
  }

  const txnId = `TXN-${Date.now()}`;
  db.transacciones[txnId] = {
    id: txnId,
    referencia: ref,
    tipo: 'COMPRA_BOLSA_EMPRESAS',
    montoCOP: params.montoCOP,
    pagadorNombre: params.contactoNombre,
    pagadorEmail: params.contactoEmail,
    pagadorIdentificacion: params.nit,
    empresaNit: params.nit,
    paqueteCreditos: params.creditos,
    estado: 'PENDIENTE',
    pasarela: 'WOMPI_PSE',
    fechaCreacion: new Date().toISOString()
  };

  writeDb(db);
  return { empresa, transaccion: db.transacciones[txnId] };
}


export function asignarCreditoColaborador(params: {
  empresaNit: string;
  colaboradorDocumento: string;
  colaboradorNombre: string;
  colaboradorEmail: string;
  cursoId: string;
  cursoTitulo: string;
  creditosRequeridos: number;
}) {
  const db = readDb();
  const empresa = db.empresas[params.empresaNit];
  if (!empresa) throw new Error('Empresa no encontrada');

  if (empresa.creditosDisponibles < params.creditosRequeridos) {
    throw new Error(`Créditos insuficientes. Disponibles: ${empresa.creditosDisponibles}, Requeridos: ${params.creditosRequeridos}`);
  }

  empresa.creditosDisponibles -= params.creditosRequeridos;
  empresa.creditosUsados += params.creditosRequeridos;

  const colabId = `COL-${Date.now()}`;
  empresa.colaboradoresAsignados.push({
    id: colabId,
    documento: params.colaboradorDocumento,
    nombre: params.colaboradorNombre,
    email: params.colaboradorEmail,
    cursoId: params.cursoId,
    cursoTitulo: params.cursoTitulo,
    creditosConsumidos: params.creditosRequeridos,
    fechaAsignacion: new Date().toISOString().slice(0, 10),
    progreso: 0,
    estado: 'En Curso'
  });

  // Registrar también en inscripciones unificadas
  const insId = `INS-CORP-${Date.now()}`;
  db.inscripciones[insId] = {
    id: insId,
    documento: params.colaboradorDocumento,
    tipoDoc: 'CC',
    nombres: params.colaboradorNombre.split(' ')[0] || params.colaboradorNombre,
    apellidos: params.colaboradorNombre.split(' ').slice(1).join(' ') || '',
    email: params.colaboradorEmail,
    telefono: '300 000 0000',
    cursoId: params.cursoId,
    cursoTitulo: params.cursoTitulo,
    cursoCodigo: `FCE-MOD-${params.cursoId}`,
    modalidad: 'Híbrida',
    tipoInscripcion: 'Bolsa Corporativa',
    empresaNit: params.empresaNit,
    empresaNombre: empresa.razonSocial,
    montoCOP: 0,
    creditosUsados: params.creditosRequeridos,
    estadoPago: 'CONFIRMADO',
    metodoPago: 'BOLSA_EMPRESAS',
    referenciaPago: `BOLSA-${empresa.nit}`,
    codigoAprobacion: `CREDIT-${Date.now()}`,
    fechaCreacion: new Date().toISOString(),
    fechaConfirmacion: new Date().toISOString(),
    estadoSMA: 'Pendiente Carga'
  };

  writeDb(db);
  return { empresa, inscripcion: db.inscripciones[insId] };
}

export function crearInscripcionParticular(params: {
  documento: string;
  tipoDoc: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  cursoId: string;
  cursoTitulo: string;
  cursoCodigo: string;
  modalidad: string;
  montoCOP: number;
  metodoPago: 'PSE' | 'TARJETA' | 'CONVENIO_TESORERIA';
}) {
  const db = readDb();
  const insId = `INS-${Date.now()}`;
  const ref = `REF-UDEC-${Date.now().toString().slice(-6)}`;

  const nuevaInscripcion: InscripcionEntity = {
    id: insId,
    documento: params.documento,
    tipoDoc: params.tipoDoc,
    nombres: params.nombres,
    apellidos: params.apellidos,
    email: params.email,
    telefono: params.telefono,
    cursoId: params.cursoId,
    cursoTitulo: params.cursoTitulo,
    cursoCodigo: params.cursoCodigo,
    modalidad: params.modalidad,
    tipoInscripcion: 'Particular',
    montoCOP: params.montoCOP,
    estadoPago: 'PENDIENTE',
    metodoPago: params.metodoPago,
    referenciaPago: ref,
    fechaCreacion: new Date().toISOString(),
    estadoSMA: 'Pendiente Carga'
  };

  db.inscripciones[insId] = nuevaInscripcion;

  // Registrar transacción pendiente
  const txnId = `TXN-${Date.now()}`;
  db.transacciones[txnId] = {
    id: txnId,
    referencia: ref,
    tipo: 'INSCRIPCION_PARTICULAR',
    montoCOP: params.montoCOP,
    pagadorNombre: `${params.nombres} ${params.apellidos}`,
    pagadorEmail: params.email,
    pagadorIdentificacion: params.documento,
    cursoId: params.cursoId,
    estado: 'PENDIENTE',
    pasarela: 'WOMPI_PSE',
    fechaCreacion: new Date().toISOString()
  };

  writeDb(db);
  return { inscripcion: nuevaInscripcion, transaccion: db.transacciones[txnId] };
}

export function confirmarPagoWebhook(referencia: string, codigoAprobacion?: string) {
  const db = readDb();

  // Buscar transacción
  const txn = Object.values(db.transacciones).find(t => t.referencia === referencia);
  if (!txn) return { success: false, message: 'Transacción no encontrada' };

  txn.estado = 'APROBADO';
  txn.codigoAprobacion = codigoAprobacion || `APR-${Math.floor(100000 + Math.random() * 900000)}`;
  txn.fechaAprobacion = new Date().toISOString();

  // Actualizar inscripción si aplica
  const ins = Object.values(db.inscripciones).find(i => i.referenciaPago === referencia);
  if (ins) {
    ins.estadoPago = 'CONFIRMADO';
    ins.codigoAprobacion = txn.codigoAprobacion;
    ins.fechaConfirmacion = new Date().toISOString();
  }

  // Si fue compra de bolsa
  if (txn.tipo === 'COMPRA_BOLSA_EMPRESAS' && txn.empresaNit && txn.paqueteCreditos) {
    const empresa = db.empresas[txn.empresaNit];
    if (empresa) {
      empresa.creditosTotales += txn.paqueteCreditos;
      empresa.creditosDisponibles += txn.paqueteCreditos;
    }
  }

  writeDb(db);
  return { success: true, txn, inscripcion: ins };
}

export function getInscripcionesDb(): InscripcionEntity[] {
  const db = readDb();
  return Object.values(db.inscripciones);
}

export function getTransaccionesDb(): TransaccionFinancieraEntity[] {
  const db = readDb();
  return Object.values(db.transacciones);
}
