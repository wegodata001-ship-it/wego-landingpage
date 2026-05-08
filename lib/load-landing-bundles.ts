import {
  mergeLandingConfig,
  mergeLandingConfigForLocale,
  isRecord,
  type LandingConfig,
} from "@/lib/landing-config";
import { DEFAULT_LANDING_CONFIG_AR } from "@/lib/landing-defaults-ar";

export type LandingBundles = { he: LandingConfig; ar: LandingConfig };

/** Detect DB shape: `{ he, ar }` branches vs legacy flat `LandingConfig`. */
export function splitLandingBranches(raw: unknown): {
  heRaw: unknown;
  arRaw: unknown;
  legacyFlat: boolean;
} {
  if (!isRecord(raw)) {
    return { heRaw: undefined, arRaw: undefined, legacyFlat: true };
  }
  const hasBranches = "he" in raw || "ar" in raw;
  if (hasBranches) {
    return {
      heRaw: raw.he,
      arRaw: raw.ar,
      legacyFlat: false,
    };
  }
  return { heRaw: raw, arRaw: undefined, legacyFlat: true };
}

export async function loadLandingBundles(projectKey: string): Promise<LandingBundles> {
  try {
    const { prisma } = await import("@/lib/prisma");
    const row =
      (await prisma.siteSettings.findFirst({ where: { id: projectKey } })) ??
      (await prisma.siteSettings.findFirst({ where: { id: "default" } }));

    const lc = row?.localizedContent as Record<string, unknown> | null | undefined;
    const rawLanding = lc?.landing;

    const { heRaw, arRaw } = splitLandingBranches(rawLanding);

    let he = mergeLandingConfig(heRaw);
    let ar = mergeLandingConfigForLocale(arRaw, DEFAULT_LANDING_CONFIG_AR);

    if (row?.heroTitle?.trim()) {
      he = { ...he, heroTitle: row.heroTitle.trim() };
    }
    if (row?.heroSubtitle?.trim()) {
      he = { ...he, heroSubtitle: row.heroSubtitle.trim() };
    }

    return { he, ar };
  } catch {
    return {
      he: mergeLandingConfig(undefined),
      ar: mergeLandingConfigForLocale(undefined, DEFAULT_LANDING_CONFIG_AR),
    };
  }
}
