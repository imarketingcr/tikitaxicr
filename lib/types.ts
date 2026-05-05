// Application types (flat, simple — avoids complex Supabase generic issues before types are generated)

export type Client = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  language_preference: "en" | "es";
  contact_preference: "email" | "whatsapp";
  created_at: string;
};

export type Appointment = {
  id: string;
  client_id: string;
  scheduled_at: string;
  duration_minutes: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  places_of_interest: string | null;
  special_requests: string | null;
  airport_arrival_at: string | null;
  airport_departure_at: string | null;
  admin_notes: string | null;
  created_at: string;
};

export type AdminUser = {
  id: string;
  email: string;
  created_at: string;
};

export type AppointmentWithClient = Appointment & { client: Client };

export type BookingFormData = {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  phone: string;
  phone_country_code: string;
  appointment_date: string;
  appointment_time: string;
  places_of_interest: string;
  special_requests: string;
  language_preference: "en" | "es";
  contact_preference: "email" | "whatsapp";
};

// Minimal Database type for Supabase client generics
// Run `supabase gen types typescript` to replace with the real generated type
export type Database = {
  public: {
    Tables: {
      clients: {
        Row: Client;
        Insert: Omit<Client, "id" | "created_at"> & { id?: string; created_at?: string };
        Update: Partial<Omit<Client, "id">>;
        Relationships: [];
      };
      appointments: {
        Row: Appointment;
        Insert: Omit<Appointment, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<Appointment, "id">>;
        Relationships: [];
      };
      admin_users: {
        Row: AdminUser;
        Insert: Omit<AdminUser, "created_at"> & { created_at?: string };
        Update: Partial<Omit<AdminUser, "id">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
