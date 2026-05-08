import type { LandingConfig } from "@/lib/landing-config";
import { DEFAULT_LANDING_CONFIG } from "@/lib/landing-config";
import { loadLandingBundles } from "@/lib/load-landing-bundles";

/** Hebrew landing config (backward compatible — DB may store `landing.he` or legacy flat). */
export async function loadLandingPageConfig(projectKey: string): Promise<LandingConfig> {
  try {
    const { he } = await loadLandingBundles(projectKey);
    return he;
  } catch {
    return { ...DEFAULT_LANDING_CONFIG };
  }
}
