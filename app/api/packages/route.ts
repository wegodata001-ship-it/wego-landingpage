import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getActiveProjectKey } from "@/lib/project-isolation";

/** Public catalog — scoped by project_key (defaults from NEXT_PUBLIC_PROJECT_KEY / env). */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectKey = String(searchParams.get("project_key") ?? getActiveProjectKey()).trim();

  try {
    const packages = await prisma.package.findMany({
      where: { project_key: projectKey },
      orderBy: { price: "asc" },
    });

    return NextResponse.json(packages);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
