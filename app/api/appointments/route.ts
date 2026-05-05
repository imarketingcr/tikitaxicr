import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

// CR business hours: Mon–Fri 08:00–16:00 UTC-6
function isValidCRSlot(isoUTC: string): boolean {
  const d = new Date(isoUTC);
  const crDate = new Date(
    d.toLocaleString("en-US", { timeZone: "America/Costa_Rica" })
  );
  const day = crDate.getDay(); // 0=Sun … 6=Sat
  const hour = crDate.getHours();
  return day >= 1 && day <= 5 && hour >= 8 && hour < 16;
}

async function findNextAvailableSlot(
  supabase: ReturnType<typeof createServiceClient>,
  startISO: string
): Promise<string | null> {
  let candidate = new Date(startISO);
  candidate.setUTCHours(candidate.getUTCHours() + 1); // try next hour first

  for (let i = 0; i < 40; i++) {
    const iso = candidate.toISOString();
    if (!isValidCRSlot(iso)) {
      // Jump to next Monday 08:00 CR (UTC+6)
      const crDate = new Date(
        candidate.toLocaleString("en-US", { timeZone: "America/Costa_Rica" })
      );
      const day = crDate.getDay();
      const daysUntilMon = day === 0 ? 1 : day === 6 ? 2 : 0;
      if (daysUntilMon > 0) {
        candidate.setUTCDate(candidate.getUTCDate() + daysUntilMon);
      }
      // Reset to 08:00 CR = 14:00 UTC
      candidate.setUTCHours(14, 0, 0, 0);
      continue;
    }

    const { data } = await supabase
      .from("appointments")
      .select("id")
      .eq("scheduled_at", iso)
      .neq("status", "cancelled")
      .maybeSingle();

    if (!data) return iso;
    candidate.setUTCHours(candidate.getUTCHours() + 1);
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      first_name,
      last_name,
      email,
      country,
      phone,
      scheduled_at,
      places_of_interest,
      special_requests,
      language_preference,
      contact_preference,
    } = body;

    // Basic required field check
    if (!first_name || !last_name || !email || !country || !phone || !scheduled_at) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate slot falls in business hours
    if (!isValidCRSlot(scheduled_at)) {
      return NextResponse.json(
        {
          message:
            "Selected time is outside business hours (Mon–Fri 8:00–16:00 Costa Rica time).",
          code: "OUTSIDE_HOURS",
        },
        { status: 422 }
      );
    }

    const supabase = createServiceClient();

    // Check slot availability
    const { data: existing } = await supabase
      .from("appointments")
      .select("id")
      .eq("scheduled_at", scheduled_at)
      .neq("status", "cancelled")
      .maybeSingle();

    if (existing) {
      const nextAvailable = await findNextAvailableSlot(supabase, scheduled_at);
      return NextResponse.json(
        {
          message: "That time slot is already taken.",
          code: "SLOT_TAKEN",
          nextAvailable,
        },
        { status: 409 }
      );
    }

    // Upsert client (by email)
    const { data: client, error: clientError } = await supabase
      .from("clients")
      .upsert(
        {
          first_name,
          last_name,
          email,
          phone,
          country,
          language_preference: language_preference ?? "en",
          contact_preference: contact_preference ?? "email",
        },
        { onConflict: "email", ignoreDuplicates: false }
      )
      .select()
      .single();

    if (clientError || !client) {
      console.error("Client upsert error:", clientError);
      return NextResponse.json(
        { message: "Failed to save client information." },
        { status: 500 }
      );
    }

    // Create appointment
    const { data: appointment, error: apptError } = await supabase
      .from("appointments")
      .insert({
        client_id: client.id,
        scheduled_at,
        duration_minutes: 60,
        status: "pending" as const,
        places_of_interest: places_of_interest ?? null,
        special_requests: special_requests ?? null,
        airport_arrival_at: null,
        airport_departure_at: null,
        admin_notes: null,
      })
      .select()
      .single();

    if (apptError || !appointment) {
      console.error("Appointment insert error:", apptError);
      return NextResponse.json(
        { message: "Failed to create appointment." },
        { status: 500 }
      );
    }

    // Fire-and-forget: send email + WhatsApp notifications
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    fetch(`${appUrl}/api/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client, appointment }),
    }).catch(console.error);

    fetch(`${appUrl}/api/whatsapp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client, appointment }),
    }).catch(console.error);

    return NextResponse.json(
      { ...appointment, client },
      { status: 201 }
    );
  } catch (err) {
    console.error("Appointment API error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Admin: list all appointments
export async function GET(req: NextRequest) {
  const supabase = createServiceClient();
  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const clientId = url.searchParams.get("client_id");

  let query = supabase
    .from("appointments")
    .select("*, client:clients(*)")
    .order("scheduled_at", { ascending: true });

  if (status) query = query.eq("status", status as "pending" | "confirmed" | "completed" | "cancelled");
  if (clientId) query = query.eq("client_id", clientId);

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
