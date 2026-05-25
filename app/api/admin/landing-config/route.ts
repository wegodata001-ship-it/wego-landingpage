import { NextResponse } from "next/server";
import { API_ROUTE_DYNAMIC, apiDisabledResponse } from "@/lib/api-db-mock";
import { isDatabaseAvailable } from "@/lib/db-disabled";
import { DEFAULT_LANDING_CONFIG, mergeLandingConfig, type LandingConfig } from "@/lib/landing-config";
import { loadLandingPageConfig } from "@/lib/load-landing-page-config";
import { getActiveProjectKey } from "@/lib/project-isolation";

/** Never statically optimize — avoids DB access during `next build` collection. */
export const dynamic = API_ROUTE_DYNAMIC;
export const revalidate = 0;
export const runtime = "nodejs";

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

function parseBodyLanding(raw: unknown): LandingConfig | null {
  if (!isRecord(raw)) return null;
  return mergeLandingConfig(raw);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const projectKey = url.searchParams.get("project_key")?.trim() || getActiveProjectKey();

  try {
    if (!isDatabaseAvailable()) {
      return NextResponse.json({
        project_key: projectKey,
        config: { ...DEFAULT_LANDING_CONFIG },
        warning: "Database disabled or not configured; returning defaults.",
      });
    }

    const config = await loadLandingPageConfig(projectKey);
    return NextResponse.json({ project_key: projectKey, config });
  } catch (e) {
    console.error("[GET /api/admin/landing-config]", e);
    return NextResponse.json({
      project_key: projectKey,
      config: { ...DEFAULT_LANDING_CONFIG },
      error: "Failed to load landing config; using defaults.",
    });
  }
}

export async function POST(req: Request) {
  try {
    if (!isDatabaseAvailable()) {
      return apiDisabledResponse("Database not available (DISABLE_DB or DATABASE_URL missing).");
    }

    let body: { project_key?: string; config?: unknown };
    try {
      body = (await req.json()) as { project_key?: string; config?: unknown };
    } catch {
      return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
    }

    const projectKey = typeof body.project_key === "string" ? body.project_key.trim() : getActiveProjectKey();
    const parsed = body.config !== undefined ? parseBodyLanding(body.config) : null;
    if (!parsed) {
      return NextResponse.json({ message: "Invalid config payload" }, { status: 400 });
    }

    const { prisma } = await import("@/lib/prisma");

    const existingRow = await prisma.siteSettings.findFirst({ where: { id: projectKey } });
    const existingLc = (existingRow?.localizedContent as Record<string, unknown>) || {};

    const newLc = {
      ...existingLc,
      landing: parsed,
    };

    await prisma.siteSettings.upsert({
      where: { id: projectKey },
      create: {
        id: projectKey,
        localizedContent: newLc as object,
        heroTitle: parsed.heroTitle,
        heroSubtitle: parsed.heroSubtitle,
      },
      update: {
        localizedContent: newLc as object,
        heroTitle: parsed.heroTitle,
        heroSubtitle: parsed.heroSubtitle,
      },
    });

    return NextResponse.json({ ok: true, project_key: projectKey });
  } catch (e) {
    console.error("[POST /api/admin/landing-config]", e);
    return NextResponse.json({ message: "Failed to save landing config" }, { status: 500 });
  }
}
