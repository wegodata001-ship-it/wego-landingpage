import { getActiveProjectKey } from "@/lib/project-isolation";

/** Multi-tenant key used by Lead.project_key and SaaS tables. URL/query may use `project_key` or legacy `projectId`. */

export type ProjectKeyParams = { project_key?: string; projectId?: string };

export function resolveProjectKey(params: ProjectKeyParams | undefined, fallback?: string): string {
  const fb = fallback ?? getActiveProjectKey();
  const raw = params?.project_key ?? params?.projectId;
  const key = typeof raw === "string" ? raw.trim() : "";
  return key || fb;
}

export function resolveProjectKeyFromBody(body: Record<string, unknown>, fallback?: string): string {
  const fb = fallback ?? getActiveProjectKey();
  const raw = body.project_key ?? body.projectId;
  const key = typeof raw === "string" ? String(raw).trim() : "";
  return key || fb;
}
