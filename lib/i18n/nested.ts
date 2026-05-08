export function getNested(obj: unknown, path: string): unknown {
  const parts = path.split(".").filter(Boolean);
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur === null || cur === undefined) return undefined;
    if (Array.isArray(cur) && /^\d+$/.test(p)) {
      cur = cur[Number(p)];
      continue;
    }
    if (typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  return cur;
}

export function tFromMessages(messages: Record<string, unknown>, path: string): string {
  const v = getNested(messages, path);
  return typeof v === "string" ? v : path;
}

export function getStringArray(messages: Record<string, unknown>, path: string): string[] {
  const v = getNested(messages, path);
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
}
