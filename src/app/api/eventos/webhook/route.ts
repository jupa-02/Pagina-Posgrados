import { NextRequest, NextResponse } from "next/server";
import { getEventoById, registrarAsistente, actualizarEstadoCorreo } from "@/lib/eventos/db";
import { sendTicketEmail } from "@/lib/eventos/email";

const EXPECTED_SECRET = process.env.GOOGLE_WEBHOOK_SECRET || "udc-webhook-secret-key-2026";

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get("x-webhook-secret");
    if (secret && secret !== EXPECTED_SECRET) {
      return NextResponse.json({ error: "Acceso no autorizado: Secret inválido" }, { status: 401 });
    }

    const body = await req.json();
    const { event_id, name, student_id, email, department } = body;

    const nombre = name || body.nombre;
    const documento = student_id || body.documento || body.cedula || body.identificacion;
    const correo = email || body.correo;
    const programa = department || body.programa || body.carrera;
    const eventId = event_id || body.evento_id || "evento-posgrados-2026";

    if (!nombre || !documento || !correo) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios (nombre, documento/cédula, correo)" },
        { status: 400 }
      );
    }

    const evento = getEventoById(eventId);
    if (!evento) {
      return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });
    }

    const { asistente, isNew } = registrarAsistente({
      evento_id: eventId,
      nombre,
      documento,
      correo,
      programa,
    });

    const origin = req.nextUrl.origin;
    sendTicketEmail(asistente, evento, origin).then((res) => {
      if (res.success) {
        actualizarEstadoCorreo(asistente.id, "enviado");
      }
    });

    return NextResponse.json({
      success: true,
      is_new: isNew,
      attendee_id: asistente.id,
      ticket_token: asistente.ticket_token,
      ticket_url: `${origin}/eventos/ticket/${asistente.ticket_token}`,
    });
  } catch (error: any) {
    console.error("Error en webhook de Google Forms:", error);
    return NextResponse.json({ error: error.message || "Error procesando webhook" }, { status: 500 });
  }
}
