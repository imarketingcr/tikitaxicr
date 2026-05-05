import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(" ");
}

// Costa Rica timezone — GMT-6, no DST
export const CR_TIMEZONE = "America/Costa_Rica";

// Business hours: Mon–Fri 08:00–16:00 Costa Rica time
export const BUSINESS_HOURS = { start: 8, end: 16 };

export function isBusinessDay(date: Date): boolean {
  const day = new Date(
    date.toLocaleString("en-US", { timeZone: CR_TIMEZONE })
  ).getDay();
  return day >= 1 && day <= 5; // Mon=1 … Fri=5
}

export function isBusinessHour(date: Date): boolean {
  const crDate = new Date(
    date.toLocaleString("en-US", { timeZone: CR_TIMEZONE })
  );
  const hour = crDate.getHours();
  return hour >= BUSINESS_HOURS.start && hour < BUSINESS_HOURS.end;
}

export function isValidAppointmentSlot(date: Date): boolean {
  return isBusinessDay(date) && isBusinessHour(date);
}

/** Convert a local CR date string + time string to UTC ISO string */
export function crDateTimeToUTC(dateStr: string, timeStr: string): string {
  // dateStr: "YYYY-MM-DD", timeStr: "HH:MM"
  // Costa Rica is UTC-6, no DST
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour, minute] = timeStr.split(":").map(Number);
  // UTC offset for CR is +6 hours
  const utc = new Date(
    Date.UTC(year, month - 1, day, hour + 6, minute)
  );
  return utc.toISOString();
}

/** Format a UTC ISO string to CR local readable string */
export function formatCRDateTime(isoString: string, locale = "en-US"): string {
  return new Intl.DateTimeFormat(locale, {
    timeZone: CR_TIMEZONE,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(isoString));
}

/** Generate all valid 1-hour slots for a given CR date */
export function getSlotsForDate(dateStr: string): string[] {
  const slots: string[] = [];
  for (let h = BUSINESS_HOURS.start; h < BUSINESS_HOURS.end; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
  }
  return slots;
}

/** Next available Monday–Friday date from today */
export function nextBusinessDay(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (!isBusinessDay(d)) d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}
