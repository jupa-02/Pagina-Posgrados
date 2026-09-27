import { NextRequest, NextResponse } from "next/server";
import { getAsistentes, getEstadisticas } from "@/lib/eventos/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const eventoId = searchParams.get("evento_id") || "evento-posgrados-2026";
  const query = (searchParams.get("q") || "").toLowerCase().trim();

  let asistentes = getAsistentes(eventoId);

  if (query) {
    asistentes = asistentes.filter(
      (a) =>
        a.nombre.toLowerCase().includes(query) ||
        a.documento.toLowerCase().includes(query) ||
        a.correo.toLowerCase().includes(query) ||
        (a.programa && a.programa.toLowerCase().includes(query))
    );
  }

  const estadisticas = getEstadisticas(eventoId);

  return NextResponse.json({
    estadisticas,
    asistentes,
  });
}
