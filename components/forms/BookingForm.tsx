"use client";

import { useState, useCallback } from "react";
import { useI18n } from "@/lib/i18n";
import { COUNTRIES } from "@/lib/countries";
import { isBusinessDay, isBusinessHour, crDateTimeToUTC, getSlotsForDate, nextBusinessDay, formatCRDateTime } from "@/lib/utils";

type FormState = {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  phone_country_code: string;
  phone: string;
  appointment_date: string;
  appointment_time: string;
  places_of_interest: string;
  special_requests: string;
  language_preference: "en" | "es";
  contact_preference: "email" | "whatsapp";
};

type FieldErrors = Partial<Record<keyof FormState | "form", string>>;

const INITIAL: FormState = {
  first_name: "",
  last_name: "",
  email: "",
  country: "",
  phone_country_code: "+1",
  phone: "",
  appointment_date: nextBusinessDay(),
  appointment_time: "08:00",
  places_of_interest: "",
  special_requests: "",
  language_preference: "en",
  contact_preference: "email",
};

export function BookingForm() {
  const { t, locale } = useI18n();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ confirmedAt: string } | null>(null);
  const [showTimeTooltip, setShowTimeTooltip] = useState(false);
  const [suggestedTime, setSuggestedTime] = useState<string | null>(null);

  const set = useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) => {
      setForm((f) => ({ ...f, [key]: value }));
      setErrors((e) => ({ ...e, [key]: undefined }));
    },
    []
  );

  function validate(): boolean {
    const e: FieldErrors = {};
    if (!form.first_name.trim()) e.first_name = t.booking.errors.required;
    if (!form.last_name.trim()) e.last_name = t.booking.errors.required;
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = t.booking.errors.email;
    if (!form.country) e.country = t.booking.errors.required;
    if (!form.phone.trim() || form.phone.length < 5)
      e.phone = t.booking.errors.phone;
    if (!form.places_of_interest.trim())
      e.places_of_interest = t.booking.errors.required;

    // Validate date/time slot
    const dateObj = new Date(`${form.appointment_date}T${form.appointment_time}:00`);
    if (!isBusinessDay(dateObj) || !isBusinessHour(dateObj)) {
      e.appointment_time = t.booking.errors.outsideHours;
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const utcTime = crDateTimeToUTC(form.appointment_date, form.appointment_time);
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          phone: `${form.phone_country_code}${form.phone}`,
          scheduled_at: utcTime,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.code === "SLOT_TAKEN" && data.nextAvailable) {
          // Auto-suggest next available slot
          const d = new Date(data.nextAvailable);
          // Convert UTC to CR local
          const crLocal = new Date(d.getTime() - 6 * 60 * 60 * 1000);
          const newDate = crLocal.toISOString().split("T")[0];
          const newTime = crLocal.toISOString().split("T")[1].substring(0, 5);
          set("appointment_date", newDate);
          set("appointment_time", newTime);
          setSuggestedTime(formatCRDateTime(data.nextAvailable, locale === "es" ? "es-CR" : "en-US"));
          setErrors({ appointment_time: t.booking.errors.slotTaken });
        } else {
          setErrors({ form: data.message || t.booking.errors.generic });
        }
        return;
      }

      setSuccess({ confirmedAt: formatCRDateTime(data.scheduled_at, locale === "es" ? "es-CR" : "en-US") });
    } catch {
      setErrors({ form: t.booking.errors.generic });
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="text-center py-16 px-6 animate-fade-in-up"
      >
        <div className="text-5xl mb-6" aria-hidden="true">🎉</div>
        <h3
          className="text-3xl font-bold mb-3"
          style={{ color: "#D4A017", fontFamily: "var(--font-righteous-var), cursive" }}
        >
          {t.booking.success.title}
        </h3>
        <p className="text-lg mb-4" style={{ color: "rgba(245,240,232,0.8)" }}>{t.booking.success.message}</p>
        <p className="font-semibold text-xl" style={{ color: "#D4A017" }}>{success.confirmedAt}</p>
      </div>
    );
  }

  const availableSlots = getSlotsForDate(form.appointment_date);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Booking consultation form"
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      {/* Form-level error */}
      {errors.form && (
        <div
          role="alert"
          aria-live="assertive"
          className="col-span-full bg-red-900/30 border border-red-500 text-red-300 rounded-xl px-4 py-3 text-sm"
        >
          {errors.form}
        </div>
      )}

      {/* First Name */}
      <Field
        id="first_name"
        label={t.booking.firstName}
        error={errors.first_name}
        required
      >
        <input
          id="first_name"
          type="text"
          autoComplete="given-name"
          value={form.first_name}
          onChange={(e) => set("first_name", e.target.value)}
          aria-required="true"
          aria-invalid={!!errors.first_name}
          aria-describedby={errors.first_name ? "first_name-error" : undefined}
          className={inputClass(!!errors.first_name)}
        />
      </Field>

      {/* Last Name */}
      <Field
        id="last_name"
        label={t.booking.lastName}
        error={errors.last_name}
        required
      >
        <input
          id="last_name"
          type="text"
          autoComplete="family-name"
          value={form.last_name}
          onChange={(e) => set("last_name", e.target.value)}
          aria-required="true"
          aria-invalid={!!errors.last_name}
          aria-describedby={errors.last_name ? "last_name-error" : undefined}
          className={inputClass(!!errors.last_name)}
        />
      </Field>

      {/* Email */}
      <Field
        id="email"
        label={t.booking.email}
        error={errors.email}
        required
        className="col-span-full md:col-span-1"
      >
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass(!!errors.email)}
        />
      </Field>

      {/* Country */}
      <Field
        id="country"
        label={t.booking.country}
        error={errors.country}
        required
      >
        <select
          id="country"
          value={form.country}
          onChange={(e) => {
            set("country", e.target.value);
            const c = COUNTRIES.find((c) => c.code === e.target.value);
            if (c) set("phone_country_code", c.dialCode);
          }}
          aria-required="true"
          aria-invalid={!!errors.country}
          className={inputClass(!!errors.country)}
        >
          <option value="">{locale === "es" ? "Selecciona tu país" : "Select your country"}</option>
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </Field>

      {/* Phone */}
      <Field
        id="phone"
        label={t.booking.phone}
        error={errors.phone}
        required
        className="col-span-full"
      >
        <div className="flex gap-2">
          <select
            aria-label="Phone country code"
            value={form.phone_country_code}
            onChange={(e) => set("phone_country_code", e.target.value)}
            className="w-28 shrink-0 rounded-xl border border-[#333] px-3 py-3 text-sm bg-[#0d0d0d] text-[#F5F0E8] focus:border-[#D4A017] outline-none"
          >
            {COUNTRIES.map((c) => (
              <option key={`${c.code}-${c.dialCode}`} value={c.dialCode}>
                {c.dialCode}
              </option>
            ))}
          </select>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value.replace(/\D/g, ""))}
            placeholder="8888 8888"
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={`flex-1 ${inputClass(!!errors.phone)}`}
          />
        </div>
      </Field>

      {/* Date */}
      <Field
        id="appointment_date"
        label={t.booking.date}
        error={errors.appointment_date}
        required
      >
        <input
          id="appointment_date"
          type="date"
          value={form.appointment_date}
          min={nextBusinessDay()}
          onChange={(e) => {
            set("appointment_date", e.target.value);
            // Check if selected date is a weekend
            const d = new Date(`${e.target.value}T08:00:00`);
            if (!isBusinessDay(d)) {
              setErrors((prev) => ({
                ...prev,
                appointment_time: t.booking.errors.outsideHours,
              }));
            }
          }}
          aria-required="true"
          className={inputClass(!!errors.appointment_date)}
        />
      </Field>

      {/* Time */}
      <Field
        id="appointment_time"
        label={
          <span className="flex items-center gap-1.5">
            {t.booking.time}
            <button
              type="button"
              aria-label="Time zone information"
              onClick={() => setShowTimeTooltip((v) => !v)}
              className="text-emerald-500 hover:text-emerald-700 focus-visible:outline-emerald-500"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </span>
        }
        error={errors.appointment_time}
        required
      >
        {showTimeTooltip && (
          <div
            role="tooltip"
            className="mb-2 text-xs rounded-lg px-3 py-2"
            style={{ background: "#1a1a1a", border: "1px solid rgba(212,160,23,0.3)", color: "#D4A017" }}
          >
            {t.booking.timeTooltip}
            {suggestedTime && (
              <p className="mt-1 font-semibold">
                {locale === "es" ? "Próximo disponible:" : "Next available:"} {suggestedTime}
              </p>
            )}
          </div>
        )}
        <select
          id="appointment_time"
          value={form.appointment_time}
          onChange={(e) => set("appointment_time", e.target.value)}
          aria-required="true"
          aria-invalid={!!errors.appointment_time}
          aria-describedby={errors.appointment_time ? "appointment_time-error" : "time-hint"}
          className={inputClass(!!errors.appointment_time)}
        >
          {availableSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot} (Costa Rica time)
            </option>
          ))}
        </select>
        <p id="time-hint" className="mt-1 text-xs text-white/40">
          GMT-6 · No DST · Mon–Fri only
        </p>
      </Field>

      {/* Places of Interest */}
      <Field
        id="places_of_interest"
        label={t.booking.places}
        error={errors.places_of_interest}
        required
        className="col-span-full"
      >
        <textarea
          id="places_of_interest"
          rows={3}
          value={form.places_of_interest}
          onChange={(e) => set("places_of_interest", e.target.value)}
          placeholder={t.booking.placesPlaceholder}
          aria-required="true"
          aria-invalid={!!errors.places_of_interest}
          className={`resize-none ${inputClass(!!errors.places_of_interest)}`}
        />
      </Field>

      {/* Special Requests */}
      <Field
        id="special_requests"
        label={t.booking.special}
        className="col-span-full"
      >
        <textarea
          id="special_requests"
          rows={2}
          value={form.special_requests}
          onChange={(e) => set("special_requests", e.target.value)}
          placeholder={t.booking.specialPlaceholder}
          className={inputClass(false)}
        />
      </Field>

      {/* Language preference */}
      <fieldset className="col-span-full md:col-span-1">
        <legend className="text-sm font-semibold mb-2" style={{ color: "#D4A017" }}>
          {t.booking.language}
        </legend>
        <div className="flex gap-4">
          {(["en", "es"] as const).map((lang) => (
            <label
              key={lang}
              className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: "rgba(245,240,232,0.8)" }}
            >
              <input
                type="radio"
                name="language_preference"
                value={lang}
                checked={form.language_preference === lang}
                onChange={() => set("language_preference", lang)}
                className="w-4 h-4 accent-[#8B0000]"
              />
              {lang === "en" ? t.booking.languageEn : t.booking.languageEs}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Contact preference */}
      <fieldset className="col-span-full md:col-span-1">
        <legend className="text-sm font-semibold mb-2" style={{ color: "#D4A017" }}>
          {t.booking.contact}
        </legend>
        <div className="flex gap-4">
          {(["email", "whatsapp"] as const).map((method) => (
            <label
              key={method}
              className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: "rgba(245,240,232,0.8)" }}
            >
              <input
                type="radio"
                name="contact_preference"
                value={method}
                checked={form.contact_preference === method}
                onChange={() => set("contact_preference", method)}
                className="w-4 h-4 accent-[#8B0000]"
              />
              {method === "email" ? t.booking.contactEmail : t.booking.contactWhatsapp}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Submit */}
      <div className="col-span-full pt-2">
        <button
          type="submit"
          disabled={loading}
          aria-disabled={loading}
          className="w-full disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-lg py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-[1.01] shadow-lg focus-visible:outline-amber-400"
          style={{ background: "linear-gradient(135deg, #8B0000, #5a0000)", fontFamily: "var(--font-righteous-var), cursive" }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
              </svg>
              {t.booking.submitting}
            </span>
          ) : (
            t.booking.submit
          )}
        </button>
      </div>
    </form>
  );
}

// Field wrapper
function Field({
  id,
  label,
  error,
  required,
  className = "",
  children,
}: {
  id: string;
  label: React.ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label
        htmlFor={id}
        className="text-sm font-semibold"
        style={{ color: "#D4A017" }}
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          aria-live="polite"
          className="text-xs text-red-600 flex items-center gap-1"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="5.5" stroke="currentColor" />
            <path d="M6 4v2.5M6 8v.5" stroke="currentColor" strokeLinecap="round" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200",
    "bg-[#0d0d0d] text-[#F5F0E8] placeholder:text-white/30",
    hasError
      ? "border border-red-500 focus:border-red-400"
      : "border border-[#333] focus:border-[#D4A017]",
  ].join(" ");
}
