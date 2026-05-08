import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveProjectKeyFromBody } from "@/lib/project-key";

export async function POST(request: Request) {
  const body = await request.json();
  const projectKey = resolveProjectKeyFromBody(body as Record<string, unknown>);
  const packageId = String(body.packageId || "").trim();
  const email = String(body.email || "").trim().toLowerCase();

  if (!projectKey || !packageId || !email) {
    return NextResponse.json({ message: "Missing payment payload." }, { status: 400 });
  }

  const pkg = await prisma.package.findFirst({
    where: { id: packageId, project_key: projectKey },
  });

  if (!pkg) {
    return NextResponse.json({ message: "Package not found." }, { status: 404 });
  }

  const transactionId = crypto.randomUUID();
  const response = await fetch(new URL("/api/webhook/payment", request.url), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      project_key: projectKey,
      packageId,
      amount: Number(pkg.price),
      transactionId,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    return NextResponse.json({ message: data?.message || "Payment webhook failed." }, { status: 500 });
  }

  return NextResponse.json({ success: true, transactionId, subscriptionId: data.subscriptionId });
}
