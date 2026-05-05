import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import { formatCRDateTime } from "@/lib/utils";
import type { Client, Appointment } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const { client, appointment } = (await req.json()) as {
      client: Client;
      appointment: Appointment;
    };

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_WHATSAPP_FROM;

    if (!accountSid || !authToken || !fromNumber) {
      console.warn("Twilio env vars not configured — skipping WhatsApp");
      return NextResponse.json({ skipped: true });
    }

    const twilioClient = twilio(accountSid, authToken);
    const isEn = client.language_preference === "en";
    const locale = isEn ? "en-US" : "es-CR";
    const formattedTime = formatCRDateTime(appointment.scheduled_at, locale);

    const body = isEn
      ? `🌴 *TikiTaxi CR* — Consultation Confirmed!\n\nHi ${client.first_name}! Your free consultation is booked for:\n📅 ${formattedTime}\n(Costa Rica time, GMT-6)\n\nWe'll send your video call link shortly. Questions? Just reply here!\n\n— TikiTaxi CR Team`
      : `🌴 *TikiTaxi CR* — ¡Consulta Confirmada!\n\n¡Hola ${client.first_name}! Tu consulta gratuita está programada para:\n📅 ${formattedTime}\n(Hora de Costa Rica, GMT-6)\n\nTe enviaremos el enlace de videollamada pronto. ¿Preguntas? ¡Solo responde aquí!\n\n— El equipo de TikiTaxi CR`;

    // Notify client (if they chose WhatsApp)
    if (client.contact_preference === "whatsapp" && client.phone) {
      const toNumber = client.phone.startsWith("+")
        ? `whatsapp:${client.phone}`
        : `whatsapp:+${client.phone}`;

      await twilioClient.messages.create({
        from: fromNumber,
        to: toNumber,
        body,
      });
    }

    // Always notify admin
    const adminPhone = process.env.ADMIN_WHATSAPP_NUMBER;
    if (adminPhone) {
      const adminMsg = `📋 *New Booking* — TikiTaxi CR\n\nClient: ${client.first_name} ${client.last_name}\nEmail: ${client.email}\nPhone: ${client.phone}\nCountry: ${client.country}\nTime: ${formattedTime}\nPlaces: ${appointment.places_of_interest ?? "—"}\nSpecial: ${appointment.special_requests ?? "—"}`;

      await twilioClient.messages.create({
        from: fromNumber,
        to: adminPhone.startsWith("whatsapp:") ? adminPhone : `whatsapp:${adminPhone}`,
        body: adminMsg,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("WhatsApp send error:", err);
    return NextResponse.json({ message: "WhatsApp failed" }, { status: 500 });
  }
}
