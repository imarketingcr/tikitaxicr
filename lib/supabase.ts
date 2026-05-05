// Browser / client-side Supabase client (no next/headers dependency)
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side / browser client — safe to import in Client Components
export function createBrowserClient() {
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}

// Service role client — server-side only, bypasses RLS for admin ops
// Only import this in Server Components or API Routes, not in Client Components
export function createServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient<Database>(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
