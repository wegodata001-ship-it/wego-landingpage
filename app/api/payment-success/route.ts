import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, createAuthToken, createAuthCookieHeader } from "@/lib/auth";

function randomPassword(length = 10) {
  const chars = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < length; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export async function POST(request: Request) {
  const body = await request.json();
  const sessionId = String(body.sessionId ?? "").trim();
  const emailRaw = String(body.email ?? "").trim().toLowerCase();

  if (!sessionId || !emailRaw) {
    return NextResponse.json({ error: "sessionId and email are required." }, { status: 400 });
  }

  try {
    const session = await prisma.checkoutSession.findUnique({
      where: { id: sessionId },
      include: { package: true },
    });

    if (!session || session.status !== "pending") {
      return NextResponse.json({ error: "Invalid or expired checkout session." }, { status: 400 });
    }

    const projectKey = session.project_key;
    const pkg = session.package;

    const existing = await prisma.user.findFirst({
      where: { email: emailRaw, project_key: projectKey },
    });

    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please sign in instead." },
        { status: 409 }
      );
    }

    const passwordPlain = randomPassword(12);
    const passwordHash = hashPassword(passwordPlain);

    const user = await prisma.user.create({
      data: {
        email: emailRaw,
        password: passwordHash,
        project_key: projectKey,
      },
    });

    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + pkg.durationDays * 24 * 60 * 60 * 1000);

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

    await prisma.checkoutSession.update({
      where: { id: sessionId },
      data: {
        status: "completed",
        email: emailRaw,
        subscriptionId: subscription.id,
        completedAt: new Date(),
      },
    });

    const token = createAuthToken(user.id, projectKey);
    const response = NextResponse.json({
      success: true,
      email: emailRaw,
      password: passwordPlain,
      project_key: projectKey,
      subscriptionId: subscription.id,
    });
    response.headers.set("Set-Cookie", createAuthCookieHeader(token));

    // TODO: email login credentials (e.g. Resend / SMTP) — keep response body for now.
    return response;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Could not complete registration." }, { status: 500 });
  }
}
