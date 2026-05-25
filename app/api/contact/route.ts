import { NextResponse } from "next/server";
import { sendContactEmailViaBrevo } from "@/lib/send-contact-email";

export const dynamic = "force-dynamic";

const MAX = {
  name: 120,
  phone: 40,
  business: 160,
  message: 4000,
} as const;

function trimField(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: "invalid_json" }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, error: "invalid_body" }, { status: 400 });
    }

    const raw = body as Record<string, unknown>;
    const name = trimField(raw.name, MAX.name);
    const phone = trimField(raw.phone, MAX.phone);
    const business = trimField(raw.business, MAX.business);
    const message = trimField(raw.message, MAX.message);

    if (name.length < 2) {
      return NextResponse.json({ success: false, error: "name_required" }, { status: 400 });
    }
    if (!isValidPhone(phone)) {
      return NextResponse.json({ success: false, error: "phone_invalid" }, { status: 400 });
    }
    if (message.length < 5) {
      return NextResponse.json({ success: false, error: "message_required" }, { status: 400 });
    }

    const referer = request.headers.get("referer")?.trim();
    const origin = request.headers.get("origin")?.trim();
    const sourceFromBody = trimField(raw.source, 200);
    const source = sourceFromBody || referer || origin || "WEGO Business Landing";

    const submittedAt = new Date().toISOString();

    await sendContactEmailViaBrevo({
      name,
      phone,
      business,
      message,
      source,
      submittedAt,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[api/contact] send failed:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    const isConfig = message.includes("not configured");
    return NextResponse.json(
      {
        success: false,
        error: isConfig ? "email_not_configured" : "send_failed",
      },
      { status: isConfig ? 503 : 500 },
    );
  }
}
