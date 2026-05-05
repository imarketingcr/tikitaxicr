"use client";

import { useState } from "react";
import { createBrowserClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createBrowserClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="font-serif text-3xl font-bold text-emerald-800">
            TikiTaxi<span className="text-amber-500">CR</span>
          </p>
          <p className="text-stone-500 text-sm mt-1">Admin Dashboard</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl border border-stone-100 shadow-xl shadow-stone-200/40 p-8"
          aria-label="Admin login form"
        >
          <h1 className="font-serif text-xl font-bold text-stone-900 mb-6">
            Sign in
          </h1>

          {error && (
            <div
              role="alert"
              aria-live="assertive"
              className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm"
            >
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-sm font-semibold text-stone-700 mb-1"
              >
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm font-semibold text-stone-700 mb-1"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              aria-disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all mt-2"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </div>
        </form>

        <p className="text-center text-xs text-stone-400 mt-4">
          TikiTaxi CR Admin · Restricted Access
        </p>
      </div>
    </div>
  );
}
