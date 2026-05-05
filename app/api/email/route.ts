import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { formatCRDateTime } from "@/lib/utils";
import type { Client, Appointment } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { client, appointment } = (await req.json()) as {
      client: Client;
      appointment: Appointment;
    };

    const isEn = client.language_preference === "en";
    const locale = isEn ? "en-US" : "es-CR";
    const formattedTime = formatCRDateTime(appointment.scheduled_at, locale);

    const subject = isEn
      ? `Your TikiTaxi CR consultation is confirmed — ${formattedTime}`
      : `Tu consulta con TikiTaxi CR está confirmada — ${formattedTime}`;

    const html = isEn
      ? buildEmailEn(client, appointment, formattedTime)
      : buildEmailEs(client, appointment, formattedTime);

    await resend.emails.send({
      from: "TikiTaxi CR <noreply@tikitaxicr.com>",
      to: client.email,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ message: "Email failed" }, { status: 500 });
  }
}

function buildEmailEn(client: Client, appt: Appointment, formattedTime: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Consultation Confirmed</title></head>
<body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9fafb;">
  <div style="background:#133d2a;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
    <h1 style="color:white;font-size:28px;margin:0;">TikiTaxi<span style="color:#fbbf24;">CR</span></h1>
    <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;">Your Costa Rica Travel Expert</p>
  </div>
  <div style="background:white;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;">
    <h2 style="color:#133d2a;font-size:22px;">Hi ${client.first_name}! Your consultation is confirmed. 🎉</h2>
    <p style="color:#374151;">Thank you for booking a consultation with TikiTaxi CR. We're excited to help you explore Costa Rica!</p>
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;margin:20px 0;">
      <p style="margin:0 0 8px;font-weight:600;color:#166534;">📅 Your appointment</p>
      <p style="margin:0;color:#374151;font-size:18px;font-weight:600;">${formattedTime}</p>
      <p style="margin:4px 0 0;color:#6b7280;font-size:14px;">Costa Rica time (GMT-6) · 1 hour video call</p>
    </div>
    ${appt.places_of_interest ? `<p style="color:#374151;"><strong>Places you want to visit:</strong> ${appt.places_of_interest}</p>` : ""}
    <p style="color:#374151;">We'll send you a video call link before your appointment. In the meantime, feel free to reach out on WhatsApp if you have any questions.</p>
    <p style="color:#6b7280;font-size:14px;margin-top:32px;">— The TikiTaxi CR Team 🌴</p>
  </div>
</body>
</html>`;
}

function buildEmailEs(client: Client, appt: Appointment, formattedTime: string) {
  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Consulta Confirmada</title></head>
<body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9fafb;">
  <div style="background:#133d2a;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
    <h1 style="color:white;font-size:28px;margin:0;">TikiTaxi<span style="color:#fbbf24;">CR</span></h1>
    <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;">Tu Experto en Viajes por Costa Rica</p>
  </div>
  <div style="background:white;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;">
    <h2 style="color:#133d2a;font-size:22px;">¡Hola ${client.first_name}! Tu consulta está confirmada. 🎉</h2>
    <p style="color:#374151;">Gracias por reservar una consulta con TikiTaxi CR. ¡Estamos emocionados de ayudarte a explorar Costa Rica!</p>
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;margin:20px 0;">
      <p style="margin:0 0 8px;font-weight:600;color:#166534;">📅 Tu cita</p>
      <p style="margin:0;color:#374151;font-size:18px;font-weight:600;">${formattedTime}</p>
      <p style="margin:4px 0 0;color:#6b7280;font-size:14px;">Hora de Costa Rica (GMT-6) · 1 hora de videollamada</p>
    </div>
    ${appt.places_of_interest ? `<p style="color:#374151;"><strong>Lugares que deseas visitar:</strong> ${appt.places_of_interest}</p>` : ""}
    <p style="color:#374151;">Te enviaremos el enlace de la videollamada antes de tu cita. Mientras tanto, puedes contactarnos por WhatsApp si tienes alguna pregunta.</p>
    <p style="color:#6b7280;font-size:14px;margin-top:32px;">— El equipo de TikiTaxi CR 🌴</p>
  </div>
</body>
</html>`;
}
