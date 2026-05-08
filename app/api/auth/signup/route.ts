import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAuthToken, createAuthCookieHeader, hashPassword } from "@/lib/auth";
import { resolveProjectKeyFromBody } from "@/lib/project-key";

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "").trim();
  const projectKey = resolveProjectKeyFromBody(body as Record<string, unknown>);

  if (!email || !projectKey || !password) {
    return NextResponse.json(
      { message: "Email, password, and project_key are required." },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findFirst({ where: { email, project_key: projectKey } });
  if (existing) {
    return NextResponse.json({ message: "A user with this email already exists in this project." }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: hashPassword(password),
      project_key: projectKey,
    },
  });

  const token = createAuthToken(user.id, projectKey);
  const response = NextResponse.json({ message: "Account created successfully." });
  response.headers.set("Set-Cookie", createAuthCookieHeader(token));
  return response;
}
