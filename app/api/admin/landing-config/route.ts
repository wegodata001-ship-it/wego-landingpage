import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEFAULT_LANDING_CONFIG, mergeLandingConfig, type LandingConfig } from "@/lib/landing-config";
import { loadLandingPageConfig } from "@/lib/load-landing-page-config";

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

function parseBodyLanding(raw: unknown): LandingConfig | null {
  if (!isRecord(raw)) return null;
  return mergeLandingConfig(raw);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const projectKey = url.searchParams.get("project_key")?.trim() || "demo";
  try {
    const config = await loadLandingPageConfig(projectKey);
    return NextResponse.json({ project_key: projectKey, config });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ project_key: projectKey, config: { ...DEFAULT_LANDING_CONFIG } });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { project_key?: string; config?: unknown };
    const projectKey = typeof body.project_key === "string" ? body.project_key.trim() : "demo";
    const parsed = body.config !== undefined ? parseBodyLanding(body.config) : null;
    if (!parsed) {
      return NextResponse.json({ message: "Invalid config payload" }, { status: 400 });
    }

    const existingRow =
      (await prisma.siteSettings.findFirst({ where: { id: projectKey } })) ??
      (await prisma.siteSettings.findFirst({ where: { id: "default" } }));
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
    console.error(e);
    return NextResponse.json({ message: "Failed to save" }, { status: 500 });
  }
}
