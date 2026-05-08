import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAuthToken, createAuthCookieHeader, comparePasswords } from "@/lib/auth";
import { resolveProjectKeyFromBody } from "@/lib/project-key";

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "").trim();
  const projectKey = resolveProjectKeyFromBody(body as Record<string, unknown>);

  if (!email || !projectKey || !password) {
    return NextResponse.json({ message: "Email, password, and project_key are required." }, { status: 400 });
  }

  const user = await prisma.user.findFirst({
    where: { email, project_key: projectKey },
  });

  if (!user || !comparePasswords(password, user.password)) {
    return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
  }

  const token = createAuthToken(user.id, projectKey);
  const response = NextResponse.json({ message: "Signed in successfully." });
  response.headers.set("Set-Cookie", createAuthCookieHeader(token));
  return response;
}
