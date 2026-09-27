import nodemailer from "nodemailer";
import { generateQrDataUrl } from "./ticket";
import { Asistente, Evento } from "./types";

let transporterPromise: Promise<nodemailer.Transporter> | null = null;

async function getTransporter(): Promise<nodemailer.Transporter> {
  if (transporterPromise) return transporterPromise;

  transporterPromise = (async () => {
    // Si el usuario configuró SMTP en .env.local (Gmail o correo institucional)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      return nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "465", 10),
        secure: process.env.SMTP_SECURE === "false" ? false : true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    }

    // Fallback gratuito sandbox con Ethereal para pruebas instantáneas sin costo
    const testAccount = await nodemailer.createTestAccount();
    console.log("ℹ️ Usando cuenta sandbox Ethereal:", testAccount.user);
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  })();

  return transporterPromise;
}

export async function sendTicketEmail(
  asistente: Asistente,
  evento: Evento,
  appUrl: string = "http://localhost:3000"
): Promise<{ success: boolean; previewUrl?: string; error?: string }> {
  try {
    const transporter = await getTransporter();
    const qrDataUrl = await generateQrDataUrl(asistente.ticket_token);
    const ticketWebUrl = `${appUrl}/eventos/ticket/${asistente.ticket_token}`;

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f7; margin: 0; padding: 20px; color: #111827; }
        .card { max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .header { background: #002B49; color: #ffffff; padding: 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
        .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; color: #F59E0B; }
        .body { padding: 24px; text-align: center; }
        .badge { display: inline-block; background: #EBF5FF; color: #002B49; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 20px; margin-bottom: 12px; }
        .event-title { font-size: 18px; font-weight: bold; margin: 8px 0; color: #111827; }
        .qr-container { background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 16px; margin: 20px 0; display: inline-block; }
        .qr-img { width: 220px; height: 220px; display: block; margin: 0 auto; }
        .info-table { width: 100%; text-align: left; margin-top: 16px; font-size: 14px; border-collapse: collapse; }
        .info-table td { padding: 8px 4px; border-bottom: 1px solid #f1f5f9; }
        .info-label { color: #64748b; font-weight: 600; width: 40%; }
        .info-value { color: #0f172a; font-weight: 700; }
        .footer { background: #fafafa; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
        .btn { display: inline-block; background: #7A1B22; color: #ffffff !important; text-decoration: none; padding: 10px 24px; border-radius: 6px; font-weight: bold; font-size: 13px; margin-top: 16px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>UNIVERSIDAD DE CARTAGENA</h1>
          <p>Dirección de Posgrados y Educación Continua</p>
        </div>
        <div class="body">
          <div class="badge">ENTRADA OFICIAL AL EVENTO</div>
          <div class="event-title">${evento.nombre}</div>
          <p style="font-size: 13px; color: #475569; margin-top: 0;">${evento.fecha} | ${evento.lugar || "Campus San Agustín / Virtual"}</p>
          
          <div class="qr-container">
            <img src="${qrDataUrl}" alt="Código QR de Acceso" class="qr-img" />
            <p style="margin: 8px 0 0 0; font-size: 11px; color: #64748b; font-weight: 600;">Presenta este código en la entrada del evento</p>
          </div>

          <table class="info-table">
            <tr>
              <td class="info-label">Asistente:</td>
              <td class="info-value">${asistente.nombre}</td>
            </tr>
            <tr>
              <td class="info-label">Documento:</td>
              <td class="info-value">${asistente.documento}</td>
            </tr>
            ${asistente.programa ? `<tr><td class="info-label">Programa:</td><td class="info-value">${asistente.programa}</td></tr>` : ""}
            <tr>
              <td class="info-label">Estado Boleto:</td>
              <td class="info-value" style="color: #10B981;">✓ Válido para 1 Ingreso</td>
            </tr>
          </table>

          <a href="${ticketWebUrl}" class="btn" target="_blank">Ver Entrada Digital en la Web</a>
        </div>
        <div class="footer">
          Universidad de Cartagena — Siempre a la altura de los tiempos.<br>
          Este boleto es personal e intransferible.
        </div>
      </div>
    </body>
    </html>
    `;

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Posgrados Universidad de Cartagena" <posgrados@unicartagena.edu.co>',
      to: asistente.correo,
      subject: `🎟️ Tu Entrada: ${evento.nombre} - Posgrados UdeC`,
      html,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info) || undefined;
    return { success: true, previewUrl };
  } catch (err: any) {
    console.error("Error sending ticket email:", err);
    return { success: false, error: err.message };
  }
}
