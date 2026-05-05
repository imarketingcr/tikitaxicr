import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const supabase = createServiceClient();
  const url = new URL(req.url);
  const search = url.searchParams.get("search") ?? "";

  let query = supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(
      `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,country.ilike.%${search}%`
    );
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  const body = await req.json();

  const { data, error } = await supabase
    .from("clients")
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
