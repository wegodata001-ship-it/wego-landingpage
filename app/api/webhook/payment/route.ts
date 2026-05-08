import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isWebhookProjectKeyAllowed } from "@/lib/project-isolation";

/** Payment provider webhook — completes subscription after successful charge. */
export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email || "").trim().toLowerCase();
  const projectKey = String(body.project_key ?? body.projectId ?? "").trim();
  const packageId = String(body.packageId || "").trim();
  const amount = Number(body.amount ?? 0);
  const transactionId = String(body.transactionId || "").trim();

  if (!email || !projectKey || !packageId || !transactionId || !Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ message: "Invalid webhook payload." }, { status: 400 });
  }

  if (!isWebhookProjectKeyAllowed(projectKey)) {
    return NextResponse.json({ message: "Project not allowed for this deployment." }, { status: 403 });
  }

  const user = await prisma.user.findFirst({
    where: { email, project_key: projectKey },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found for project." }, { status: 404 });
  }

  const pkg = await prisma.package.findFirst({
    where: { id: packageId, project_key: projectKey },
  });

  if (!pkg) {
    return NextResponse.json({ message: "Package not found." }, { status: 404 });
  }

  const startDate = new Date();
  const endDate = new Date(startDate.valueOf() + pkg.durationDays * 24 * 60 * 60 * 1000);

  const subscription = await prisma.subscription.create({
    data: {
      project_key: projectKey,
      userId: user.id,
      packageId: pkg.id,
      startDate,
      endDate,
      status: "active",
    },
  });

  await prisma.payment.create({
    data: {
      project_key: projectKey,
      email,
      amount,
      transactionId,
      status: "completed",
    },
  });

  return NextResponse.json({ success: true, subscriptionId: subscription.id });
}
