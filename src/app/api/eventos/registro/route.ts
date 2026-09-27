import { NextRequest, NextResponse } from "next/server";
import { getEventoById, registrarAsistente, actualizarEstadoCorreo } from "@/lib/eventos/db";
import { sendTicketEmail } from "@/lib/eventos/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { evento_id, nombre, documento, correo, programa } = body;

    if (!nombre || !documento || !correo) {
      return NextResponse.json(
        { error: "Los campos Nombre, Documento (Cédula) y Correo son obligatorios" },
        { status: 400 }
      );
    }

    const eventId = evento_id || "evento-posgrados-2026";
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

    // Enviar el correo con el boleto QR (asíncrono sin bloquear la respuesta inmediata)
    const origin = req.nextUrl.origin;
    sendTicketEmail(asistente, evento, origin).then((res) => {
      if (res.success) {
        actualizarEstadoCorreo(asistente.id, "enviado");
      } else {
        actualizarEstadoCorreo(asistente.id, "fallido");
      }
    });

    return NextResponse.json({
      success: true,
      mensaje: isNew ? "Inscripción completada exitosamente" : "Ya estabas registrado en este evento",
      asistente,
      ticket_url: `${origin}/eventos/ticket/${asistente.ticket_token}`,
    });
  } catch (error: any) {
    console.error("Error en registro:", error);
    return NextResponse.json({ error: error.message || "Error al procesar la inscripción" }, { status: 500 });
  }
}
