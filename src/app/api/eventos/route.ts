import { NextResponse } from "next/server";
import { getEventos } from "@/lib/eventos/db";

export async function GET() {
  const eventos = getEventos();
  return NextResponse.json({ eventos });
}
