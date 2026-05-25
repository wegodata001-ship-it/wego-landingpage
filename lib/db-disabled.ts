/**
 * Temporary deploy flag: static landing on Vercel without Prisma/Supabase.
 * Set DISABLE_DB=true in Production + Preview. Schemas and models stay in repo.
 */
export function isDbDisabled(): boolean {
  return process.env.DISABLE_DB === "true";
}

/** True when real DB calls are allowed (not disabled and DATABASE_URL is set). */
export function isDatabaseAvailable(): boolean {
  if (isDbDisabled()) return false;
  return Boolean(process.env.DATABASE_URL?.trim());
}
