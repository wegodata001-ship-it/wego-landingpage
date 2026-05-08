/** Multi-tenant key used by Lead.project_key and SaaS tables. URL/query may use `project_key` or legacy `projectId`. */

export type ProjectKeyParams = { project_key?: string; projectId?: string };

export function resolveProjectKey(params: ProjectKeyParams | undefined, fallback = "demo"): string {
  const raw = params?.project_key ?? params?.projectId;
  const key = typeof raw === "string" ? raw.trim() : "";
  return key || fallback;
}

export function resolveProjectKeyFromBody(body: Record<string, unknown>, fallback = "demo"): string {
  const raw = body.project_key ?? body.projectId;
  const key = typeof raw === "string" ? String(raw).trim() : "";
  return key || fallback;
}
