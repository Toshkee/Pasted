import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Library Insider sign-up. Validates and acknowledges; persistence is intentionally left as the
 * single integration point (the live site stores these in Supabase `lead_magnet_submissions`).
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { firstName, email, city } = (body ?? {}) as Record<string, unknown>;
  const name = typeof firstName === "string" ? firstName.trim() : "";
  const mail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (!name || name.length > 80) return NextResponse.json({ ok: false, error: "Please add your first name." }, { status: 422 });
  if (!EMAIL.test(mail) || mail.length > 200) return NextResponse.json({ ok: false, error: "That email doesn’t look right." }, { status: 422 });

  // TODO(integration): insert { first_name, email, city, source: "library" } into the existing Supabase table.
  void city;

  return NextResponse.json({ ok: true });
}
