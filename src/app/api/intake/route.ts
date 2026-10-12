import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Consultation intake. Validates and acknowledges; the answers also travel to Calendly as a prefilled
 * note, so nothing is lost even before this is wired to the CRM (live site: Supabase `eligibility_submissions`).
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!name || !EMAIL.test(email)) return NextResponse.json({ ok: false }, { status: 422 });

  // TODO(integration): persist the intake alongside the booking.
  return NextResponse.json({ ok: true });
}
