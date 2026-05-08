/**
 * Tenant isolation for deployments where multiple businesses share one Supabase + Postgres backend.
 *
 * Canonical env: `NEXT_PUBLIC_PROJECT_KEY` — must match `SiteSettings.id`, `Package.project_key`,
 * `Lead.project_key`, checkout rows, storage prefixes, etc.
 *
 * Priority for the default tenant when no request-scoped `project_key` is provided:
 * 1. NEXT_PUBLIC_PROJECT_KEY
 * 2. NEXT_PUBLIC_WEGOBIZ_USER_ID (legacy alias)
 * 3. DEFAULT_PROJECT_KEY (server-only optional override)
 * 4. `demo` — local fallback only; production should always set (1).
 */

export function getActiveProjectKey(): string {
  return (
    process.env.NEXT_PUBLIC_PROJECT_KEY?.trim() ||
    process.env.NEXT_PUBLIC_WEGOBIZ_USER_ID?.trim() ||
    process.env.DEFAULT_PROJECT_KEY?.trim() ||
    "demo"
  );
}

/** @deprecated Prefer {@link getActiveProjectKey} — same value, legacy WegoBiz naming. */
export function getWegoBizDefaultUserId(): string {
  return getActiveProjectKey();
}

const PATH_SAFE = /^[a-zA-Z0-9_-]+$/;

/** Restrict storage object keys to safe path segments (no `../`, slashes from untrusted input). */
export function sanitizeProjectKeyForPath(projectKey: string): string {
  const s = projectKey.trim().slice(0, 128);
  if (PATH_SAFE.test(s)) return s;
  return s.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 64) || "tenant";
}

/**
 * Optional hardening for payment webhooks: set `ALLOWED_PROJECT_KEYS=key1,key2`.
 * If unset, any non-empty project_key that passes DB lookups is accepted (multi-tenant mode).
 */
export function isWebhookProjectKeyAllowed(projectKey: string): boolean {
  const raw = process.env.ALLOWED_PROJECT_KEYS?.trim();
  if (!raw) return true;
  const allowed = new Set(
    raw
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean),
  );
  return allowed.has(projectKey);
}

/** Attach tenant id to analytics / logging payloads so events never mix businesses. */
export function withProjectAnalyticsScope<T extends Record<string, unknown>>(
  projectKey: string,
  payload: T,
): T & { project_key: string } {
  return { ...payload, project_key: projectKey };
}
