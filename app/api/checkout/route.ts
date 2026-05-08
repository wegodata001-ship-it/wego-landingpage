import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveProjectKeyFromBody } from "@/lib/project-key";

export async function POST(request: Request) {
  const body = await request.json();
  const packageId = String(body.packageId ?? "").trim();
  const projectKey = resolveProjectKeyFromBody(body as Record<string, unknown>);
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : undefined;

  if (!packageId) {
    return NextResponse.json({ message: "packageId is required." }, { status: 400 });
  }

  try {
    const pkg = await prisma.package.findFirst({
      where: { id: packageId, project_key: projectKey },
    });

    if (!pkg) {
      return NextResponse.json({ message: "Package not found." }, { status: 404 });
    }

    const session = await prisma.checkoutSession.create({
      data: {
        project_key: projectKey,
        packageId: pkg.id,
        email: email || null,
        status: "pending",
      },
    });

    return NextResponse.json({
      success: true,
      redirectUrl: `/payment?session=${encodeURIComponent(session.id)}`,
      sessionId: session.id,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Checkout unavailable." }, { status: 500 });
  }
}
