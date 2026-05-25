import { NextResponse } from "next/server";
import { isDbDisabled } from "@/lib/db-disabled";

/** Use on API route modules to avoid static collection / build-time DB access. */
export const API_ROUTE_DYNAMIC = "force-dynamic" as const;

export function apiDisabledResponse(message = "Database temporarily disabled.") {
  return NextResponse.json({ success: false, message, disabled: true }, { status: 503 });
}

export function apiEmptyListResponse(extra: Record<string, unknown> = {}) {
  return NextResponse.json({ success: true, items: [], ...extra });
}

export function apiEmptyPackagesResponse() {
  return NextResponse.json([]);
}

/** Early return for route handlers when DISABLE_DB=true. */
export function ifDbDisabled<T extends Response>(factory: () => T): T | null {
  if (!isDbDisabled()) return null;
  return factory();
}
