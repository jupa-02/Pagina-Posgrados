import fs from "fs";
import path from "path";
import { Asistente, CheckInResponse, EstadisticasEvento, Evento } from "./types";
import { generateSignedToken, verifySignedToken } from "./crypto";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "eventos_asistencia.json");

interface DatabaseSchema {
  eventos: Evento[];
  asistentes: Asistente[];
}

function ensureDataFile(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    const initialData: DatabaseSchema = {
      eventos: [
        {
          id: "evento-posgrados-2026",
          nombre: "I Simposio Internacional de Posgrados y Educación Continua UdeC",
          descripcion: "Evento académico de apertura de programas de posgrado y maestrías de la Facultad de Ciencias Económicas.",
          lugar: "Claustro San Agustín - Paraninfo Rafael Núñez",
          fecha: "2026-09-15 08:30 AM",
          organizador: "Dirección de Posgrados Ciencias Económicas",
          activo: true,
        },
      ],
      asistentes: [],
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2), "utf8");
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading database file, resetting:", e);
    return { eventos: [], asistentes: [] };
  }
}

function saveData(data: DatabaseSchema) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

export function getEventos(): Evento[] {
  const db = ensureDataFile();
  return db.eventos;
}

export function getEventoById(id: string): Evento | undefined {
  const db = ensureDataFile();
  return db.eventos.find((e) => e.id === id);
}

export function getAsistentes(eventoId?: string): Asistente[] {
  const db = ensureDataFile();
  if (eventoId) {
    return db.asistentes.filter((a) => a.evento_id === eventoId);
  }
  return db.asistentes;
}

export function getAsistenteByToken(token: string): Asistente | undefined {
  const db = ensureDataFile();
  return db.asistentes.find((a) => a.ticket_token === token);
}

export function getEstadisticas(eventoId: string): EstadisticasEvento {
  const asistentes = getAsistentes(eventoId);
  const total_inscritos = asistentes.length;
  const total_asistieron = asistentes.filter((a) => a.estado_asistencia === "asistio").length;
  const total_pendientes = total_inscritos - total_asistieron;
  const porcentaje_asistencia = total_inscritos > 0 ? Math.round((total_asistieron / total_inscritos) * 100) : 0;

  return {
    total_inscritos,
    total_asistieron,
    total_pendientes,
    porcentaje_asistencia,
  };
}

export function registrarAsistente(params: {
  evento_id: string;
  nombre: string;
  documento: string;
  correo: string;
  programa?: string;
}): { asistente: Asistente; isNew: boolean } {
  const db = ensureDataFile();
  const cleanDoc = params.documento.trim();
  const cleanEmail = params.correo.trim().toLowerCase();

  // Buscar si ya existe registrado en este evento por documento o correo
  const existing = db.asistentes.find(
    (a) =>
      a.evento_id === params.evento_id &&
      (a.documento === cleanDoc || a.correo.toLowerCase() === cleanEmail)
  );

  if (existing) {
    return { asistente: existing, isNew: false };
  }

  const id = "ast_" + Math.random().toString(36).substring(2, 10) + "_" + Date.now().toString(36);
  const ticket_token = generateSignedToken({
    aid: id,
    eid: params.evento_id,
    doc: cleanDoc,
    iat: Date.now(),
  });

  const nuevoAsistente: Asistente = {
    id,
    evento_id: params.evento_id,
    nombre: params.nombre.trim(),
    documento: cleanDoc,
    correo: cleanEmail,
    programa: params.programa?.trim() || "Posgrados UdeC",
    ticket_token,
    estado_asistencia: "no_asistio",
    fecha_asistencia: null,
    metodo_asistencia: null,
    estado_correo: "pendiente",
    fecha_registro: new Date().toISOString(),
  };

  db.asistentes.push(nuevoAsistente);
  saveData(db);

  return { asistente: nuevoAsistente, isNew: true };
}

export function actualizarEstadoCorreo(id: string, estado: "enviado" | "fallido") {
  const db = ensureDataFile();
  const index = db.asistentes.findIndex((a) => a.id === id);
  if (index !== -1) {
    db.asistentes[index].estado_correo = estado;
    saveData(db);
  }
}

/**
 * Realiza la validación en tiempo real del código QR escaneado en la puerta
 */
export function verificarYRegistrarCheckIn(
  token: string,
  metodo: "qr_scanner" | "manual_staff" = "qr_scanner"
): CheckInResponse {
  // 1. Validar la firma criptográfica HMAC-SHA256
  const verification = verifySignedToken(token);
  if (!verification.valid || !verification.payload) {
    return {
      valido: false,
      estado: "INVALID_TICKET",
      mensaje: verification.error || "El código QR es inválido o no pertenece a la Universidad de Cartagena.",
    };
  }

  const db = ensureDataFile();
  const index = db.asistentes.findIndex((a) => a.ticket_token === token);

  if (index === -1) {
    return {
      valido: false,
      estado: "NOT_FOUND",
      mensaje: "No se encontró ningún asistente registrado con este boleto.",
    };
  }

  const asistente = db.asistentes[index];

  // 2. Comprobar si ya fue utilizado (Detección de duplicados / reingresos)
  if (asistente.estado_asistencia === "asistio") {
    return {
      valido: false,
      estado: "ALREADY_CHECKED_IN",
      mensaje: `⚠️ Este boleto YA FUE USADO previamente por ${asistente.nombre}.`,
      asistente: {
        id: asistente.id,
        nombre: asistente.nombre,
        documento: asistente.documento,
        correo: asistente.correo,
        programa: asistente.programa,
        fecha_asistencia: asistente.fecha_asistencia,
      },
      fecha_anterior: asistente.fecha_asistencia,
    };
  }

  // 3. Registrar asistencia exitosa
  const nowIso = new Date().toISOString();
  db.asistentes[index].estado_asistencia = "asistio";
  db.asistentes[index].fecha_asistencia = nowIso;
  db.asistentes[index].metodo_asistencia = metodo;
  saveData(db);

  return {
    valido: true,
    estado: "SUCCESS",
    mensaje: `✓ ¡Entrada Confirmada! Bienvenido(a), ${asistente.nombre}.`,
    asistente: {
      id: asistente.id,
      nombre: asistente.nombre,
      documento: asistente.documento,
      correo: asistente.correo,
      programa: asistente.programa,
      fecha_asistencia: nowIso,
    },
  };
}

/**
 * Permite al personal cambiar manualmente el estado (check-in manual de respaldo o desmarcar)
 */
export function toggleAsistenciaManual(id: string): { success: boolean; asistente?: Asistente } {
  const db = ensureDataFile();
  const index = db.asistentes.findIndex((a) => a.id === id);

  if (index === -1) {
    return { success: false };
  }

  const current = db.asistentes[index];
  const isCheckedIn = current.estado_asistencia === "asistio";

  db.asistentes[index].estado_asistencia = isCheckedIn ? "no_asistio" : "asistio";
  db.asistentes[index].fecha_asistencia = isCheckedIn ? null : new Date().toISOString();
  db.asistentes[index].metodo_asistencia = isCheckedIn ? null : "manual_staff";
  saveData(db);

  return { success: true, asistente: db.asistentes[index] };
}
