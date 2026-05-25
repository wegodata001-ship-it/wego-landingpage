import { NextResponse } from "next/server";
import {
  API_ROUTE_DYNAMIC,
  apiDisabledResponse,
  apiEmptyListResponse,
  ifDbDisabled,
} from "@/lib/api-db-mock";
import { isDbDisabled } from "@/lib/db-disabled";
import { resolveProjectKeyFromBody } from "@/lib/project-key";

export const dynamic = API_ROUTE_DYNAMIC;
export const revalidate = 0;

export async function GET() {
  const disabled = ifDbDisabled(() => apiEmptyListResponse({ packages: [] }));
  if (disabled) return disabled;

  try {
    const { prisma } = await import("@/lib/prisma");
    const { getActiveProjectKey } = await import("@/lib/project-isolation");
    const packages = await prisma.package.findMany({
      where: { project_key: getActiveProjectKey() },
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ success: true, items: packages });
  } catch {
    return apiEmptyListResponse({ packages: [] });
  }
}

export async function POST(request: Request) {
  if (isDbDisabled()) {
    return apiDisabledResponse("Package creation is disabled while DISABLE_DB=true.");
  }

  const body = await request.json();
  const projectKey = resolveProjectKeyFromBody(body as Record<string, unknown>);
  const name = String(body.name || "").trim();
  const price = Number(body.price ?? 0);
  const durationDays = Number(body.durationDays ?? 0);

  if (!projectKey || !name || !price || !durationDays) {
    return NextResponse.json({ message: "Missing required package fields." }, { status: 400 });
  }

  const { prisma } = await import("@/lib/prisma");
  const pkg = await prisma.package.create({
    data: {
      project_key: projectKey,
      name,
      price,
      durationDays,
    },
  });

  return NextResponse.json({ success: true, package: pkg });
}
