import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveProjectKeyFromBody } from "@/lib/project-key";

export async function POST(request: Request) {
  const body = await request.json();
  const projectKey = resolveProjectKeyFromBody(body as Record<string, unknown>);
  const name = String(body.name || "").trim();
  const price = Number(body.price ?? 0);
  const durationDays = Number(body.durationDays ?? 0);

  if (!projectKey || !name || !price || !durationDays) {
    return NextResponse.json({ message: "Missing required package fields." }, { status: 400 });
  }

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
