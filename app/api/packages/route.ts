import { NextResponse } from "next/server";
import { API_ROUTE_DYNAMIC, apiEmptyPackagesResponse, ifDbDisabled } from "@/lib/api-db-mock";
import { getActiveProjectKey } from "@/lib/project-isolation";

/** Public catalog — scoped by project_key (defaults from NEXT_PUBLIC_PROJECT_KEY / env). */
export const dynamic = API_ROUTE_DYNAMIC;
export const revalidate = 0;

export async function GET(request: Request) {
  const disabled = ifDbDisabled(() => apiEmptyPackagesResponse());
  if (disabled) return disabled;

  const { searchParams } = new URL(request.url);
  const projectKey = String(searchParams.get("project_key") ?? getActiveProjectKey()).trim();

  try {
    const { prisma } = await import("@/lib/prisma");
    const packages = await prisma.package.findMany({
      where: { project_key: projectKey },
      orderBy: { price: "asc" },
    });

    return NextResponse.json(packages);
  } catch {
    return apiEmptyPackagesResponse();
  }
}
