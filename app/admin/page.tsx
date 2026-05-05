"use client";

import { useState, useEffect, useCallback } from "react";
import { createBrowserClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { formatCRDateTime } from "@/lib/utils";
import type { Client, Appointment } from "@/lib/types";

type ClientWithAppointments = Client & { appointments: Appointment[] };

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelled: "bg-stone-100 text-stone-500 border-stone-200",
};

const STATUS_LABELS = ["pending", "confirmed", "completed", "cancelled"] as const;

export default function AdminDashboard() {
  const router = useRouter();
  const [clients, setClients] = useState<ClientWithAppointments[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ClientWithAppointments | null>(null);
  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [stats, setStats] = useState({ total: 0, upcoming: 0, pending: 0 });
  const [showNewClient, setShowNewClient] = useState(false);
  const [newClient, setNewClient] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    language_preference: "en" as "en" | "es",
    contact_preference: "email" as "email" | "whatsapp",
  });

  const fetchClients = useCallback(async (q = "") => {
    setLoading(true);
    const res = await fetch(`/api/clients?search=${encodeURIComponent(q)}`);
    const data = await res.json();
    // Fetch appointments for each client
    const enriched = await Promise.all(
      (data as Client[]).map(async (c) => {
        const ar = await fetch(`/api/clients/${c.id}`);
        const full = await ar.json();
        return full as ClientWithAppointments;
      })
    );
    setClients(enriched);

    // Stats
    const now = new Date();
    const weekEnd = new Date(now);
    weekEnd.setDate(weekEnd.getDate() + 7);
    const allAppts = enriched.flatMap((c) => c.appointments ?? []);
    setStats({
      total: enriched.length,
      upcoming: allAppts.filter(
        (a) =>
          a.status !== "cancelled" &&
          new Date(a.scheduled_at) >= now &&
          new Date(a.scheduled_at) <= weekEnd
      ).length,
      pending: allAppts.filter((a) => a.status === "pending").length,
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => fetchClients(search), 350);
    return () => clearTimeout(t);
  }, [search, fetchClients]);

  async function signOut() {
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  async function saveNotes(apptId: string) {
    setSavingNotes(true);
    await fetch(`/api/appointments/${apptId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ admin_notes: notes }),
    });
    setSavingNotes(false);
    await fetchClients(search);
    if (selected) {
      const res = await fetch(`/api/clients/${selected.id}`);
      setSelected(await res.json());
    }
  }

  async function updateStatus(apptId: string, status: string) {
    await fetch(`/api/appointments/${apptId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await fetchClients(search);
    if (selected) {
      const res = await fetch(`/api/clients/${selected.id}`);
      setSelected(await res.json());
    }
  }

  async function createClient() {
    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newClient),
    });
    if (res.ok) {
      setShowNewClient(false);
      setNewClient({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        country: "",
        language_preference: "en",
        contact_preference: "email",
      });
      fetchClients(search);
    }
  }

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      {/* Top bar */}
      <header className="bg-emerald-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <p className="font-serif text-xl font-bold">
            TikiTaxi<span className="text-amber-400">CR</span>
          </p>
          <span className="text-white/40 text-sm hidden sm:block">|</span>
          <span className="text-white/70 text-sm hidden sm:block">Admin Dashboard</span>
        </div>
        <button
          onClick={signOut}
          className="text-sm text-white/70 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10"
          aria-label="Sign out"
        >
          Sign Out
        </button>
      </header>

      <main id="main-content" className="flex-1 p-4 md:p-6 lg:p-8">
        {/* Stats */}
        <section aria-label="Dashboard statistics" className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Clients", value: stats.total, color: "emerald" },
            { label: "Upcoming This Week", value: stats.upcoming, color: "blue" },
            { label: "Pending Confirmations", value: stats.pending, color: "amber" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5"
            >
              <p className="text-2xl md:text-3xl font-bold font-serif text-stone-900">
                {s.value}
              </p>
              <p className="text-xs md:text-sm text-stone-500 mt-1">{s.label}</p>
            </div>
          ))}
        </section>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Client list */}
          <section
            aria-labelledby="clients-heading"
            className="lg:w-80 xl:w-96 shrink-0"
          >
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-stone-100 flex items-center justify-between gap-3">
                <h2 id="clients-heading" className="font-semibold text-stone-800 text-sm">
                  Clients
                </h2>
                <button
                  onClick={() => setShowNewClient(true)}
                  aria-label="Add new client"
                  className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  + New
                </button>
              </div>

              <div className="p-3 border-b border-stone-100">
                <label htmlFor="client-search" className="sr-only">
                  Search clients
                </label>
                <input
                  id="client-search"
                  type="search"
                  placeholder="Search name, email, country…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full text-sm bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                  aria-label="Search clients"
                />
              </div>

              <div
                className="divide-y divide-stone-50 max-h-[60vh] overflow-y-auto"
                role="list"
                aria-label="Client list"
              >
                {loading ? (
                  <div className="p-8 text-center text-stone-400 text-sm">Loading…</div>
                ) : clients.length === 0 ? (
                  <div className="p-8 text-center text-stone-400 text-sm">No clients found.</div>
                ) : (
                  clients.map((c) => {
                    const upcoming = (c.appointments ?? []).filter(
                      (a) =>
                        a.status !== "cancelled" &&
                        new Date(a.scheduled_at) >= new Date()
                    );
                    return (
                      <button
                        key={c.id}
                        onClick={() => {
                          setSelected(c);
                          setNotes(
                            c.appointments?.[0]?.admin_notes ?? ""
                          );
                        }}
                        role="listitem"
                        className={`w-full text-left px-4 py-3.5 hover:bg-stone-50 transition-colors ${
                          selected?.id === c.id ? "bg-emerald-50 border-l-2 border-emerald-500" : ""
                        }`}
                        aria-pressed={selected?.id === c.id}
                        aria-label={`View ${c.first_name} ${c.last_name}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="font-semibold text-stone-800 text-sm truncate">
                              {c.first_name} {c.last_name}
                            </p>
                            <p className="text-xs text-stone-400 truncate">{c.email}</p>
                            <p className="text-xs text-stone-400">{c.country}</p>
                          </div>
                          {upcoming.length > 0 && (
                            <span className="shrink-0 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                              {upcoming.length} upcoming
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </section>

          {/* Client detail */}
          <section
            aria-label="Client details"
            className="flex-1"
          >
            {!selected ? (
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-12 text-center text-stone-400">
                <p className="text-4xl mb-3" aria-hidden="true">👆</p>
                <p className="text-sm">Select a client to view their details.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                {/* Client header */}
                <div className="p-6 border-b border-stone-100">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-serif text-xl font-bold text-stone-900">
                        {selected.first_name} {selected.last_name}
                      </h2>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                        <a
                          href={`mailto:${selected.email}`}
                          className="text-sm text-emerald-600 hover:underline"
                        >
                          {selected.email}
                        </a>
                        <span className="text-sm text-stone-500">{selected.phone}</span>
                        <span className="text-sm text-stone-500">{selected.country}</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                          {selected.language_preference === "en" ? "English" : "Español"}
                        </span>
                        <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                          via {selected.contact_preference}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-stone-400 shrink-0">
                      Since {new Date(selected.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Appointments */}
                <div className="p-6 border-b border-stone-100">
                  <h3 className="font-semibold text-stone-800 text-sm mb-4">
                    Appointments ({selected.appointments?.length ?? 0})
                  </h3>

                  {(!selected.appointments || selected.appointments.length === 0) ? (
                    <p className="text-sm text-stone-400">No appointments yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {selected.appointments.map((appt) => (
                        <div
                          key={appt.id}
                          className="border border-stone-100 rounded-xl p-4"
                        >
                          <div className="flex items-start justify-between gap-3 flex-wrap">
                            <div>
                              <p className="text-sm font-semibold text-stone-800">
                                {formatCRDateTime(appt.scheduled_at)}
                              </p>
                              <p className="text-xs text-stone-400">
                                {appt.duration_minutes} min · Costa Rica time
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                                  STATUS_COLORS[appt.status] ?? ""
                                }`}
                              >
                                {appt.status}
                              </span>
                            </div>
                          </div>

                          {appt.places_of_interest && (
                            <p className="text-xs text-stone-500 mt-2">
                              <strong>Places:</strong> {appt.places_of_interest}
                            </p>
                          )}
                          {appt.special_requests && (
                            <p className="text-xs text-stone-500 mt-1">
                              <strong>Special:</strong> {appt.special_requests}
                            </p>
                          )}
                          {appt.airport_arrival_at && (
                            <p className="text-xs text-stone-500 mt-1">
                              <strong>Airport Arrival:</strong>{" "}
                              {formatCRDateTime(appt.airport_arrival_at)}
                            </p>
                          )}
                          {appt.airport_departure_at && (
                            <p className="text-xs text-stone-500 mt-1">
                              <strong>Airport Departure:</strong>{" "}
                              {formatCRDateTime(appt.airport_departure_at)}
                            </p>
                          )}

                          {/* Status change */}
                          <div className="mt-3 flex items-center gap-2 flex-wrap">
                            <label
                              htmlFor={`status-${appt.id}`}
                              className="text-xs text-stone-500 font-medium"
                            >
                              Status:
                            </label>
                            <select
                              id={`status-${appt.id}`}
                              value={appt.status}
                              onChange={(e) =>
                                updateStatus(appt.id, e.target.value)
                              }
                              className="text-xs border border-stone-200 rounded-lg px-2 py-1 bg-white outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100"
                              aria-label={`Change status for appointment on ${formatCRDateTime(appt.scheduled_at)}`}
                            >
                              {STATUS_LABELS.map((s) => (
                                <option key={s} value={s}>
                                  {s.charAt(0).toUpperCase() + s.slice(1)}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Admin notes */}
                          <div className="mt-3">
                            <label
                              htmlFor={`notes-${appt.id}`}
                              className="text-xs text-stone-500 font-medium block mb-1"
                            >
                              Admin Notes
                            </label>
                            <textarea
                              id={`notes-${appt.id}`}
                              rows={2}
                              defaultValue={appt.admin_notes ?? ""}
                              onChange={(e) => setNotes(e.target.value)}
                              className="w-full text-xs border border-stone-200 rounded-lg px-3 py-2 bg-white outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 resize-none"
                              placeholder="Add notes about this appointment…"
                              aria-label="Admin notes for this appointment"
                            />
                            <button
                              onClick={() => saveNotes(appt.id)}
                              disabled={savingNotes}
                              className="mt-1.5 text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                            >
                              {savingNotes ? "Saving…" : "Save Notes"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* New Client Modal */}
      {showNewClient && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="new-client-title"
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
            <h2
              id="new-client-title"
              className="font-serif text-lg font-bold text-stone-900 mb-5"
            >
              New Client
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  ["first_name", "First Name"],
                  ["last_name", "Last Name"],
                  ["email", "Email"],
                  ["phone", "Phone"],
                  ["country", "Country"],
                ] as const
              ).map(([field, label]) => (
                <div
                  key={field}
                  className={field === "email" || field === "phone" || field === "country" ? "col-span-2" : ""}
                >
                  <label
                    htmlFor={`new-${field}`}
                    className="block text-xs font-semibold text-stone-600 mb-1"
                  >
                    {label}
                  </label>
                  <input
                    id={`new-${field}`}
                    type={field === "email" ? "email" : "text"}
                    value={newClient[field]}
                    onChange={(e) =>
                      setNewClient((n) => ({ ...n, [field]: e.target.value }))
                    }
                    className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 outline-none focus:border-emerald-400"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowNewClient(false)}
                className="flex-1 text-sm border border-stone-200 text-stone-600 py-2.5 rounded-xl hover:bg-stone-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createClient}
                className="flex-1 text-sm bg-emerald-600 text-white py-2.5 rounded-xl hover:bg-emerald-700 transition-colors font-semibold"
              >
                Create Client
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
