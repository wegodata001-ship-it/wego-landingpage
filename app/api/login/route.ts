import { NextResponse } from "next/server";
import { API_ROUTE_DYNAMIC, apiDisabledResponse } from "@/lib/api-db-mock";
import { isDbDisabled } from "@/lib/db-disabled";
import { createAuthToken, createAuthCookieHeader, comparePasswords } from "@/lib/auth";
import { resolveProjectKeyFromBody } from "@/lib/project-key";

export const dynamic = API_ROUTE_DYNAMIC;
export const revalidate = 0;

/** Alias for `/api/auth/login` — same behavior + optional project_key. */
export async function POST(request: Request) {
  if (isDbDisabled()) {
    return apiDisabledResponse("Authentication is disabled while DISABLE_DB=true.");
  }

  const body = await request.json();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "").trim();
  const projectKey = resolveProjectKeyFromBody(body as Record<string, unknown>);

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const { prisma } = await import("@/lib/prisma");
  const user = await prisma.user.findFirst({
    where: { email, project_key: projectKey },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (!comparePasswords(password, user.password)) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const token = createAuthToken(user.id, projectKey);
  const response = NextResponse.json({
    success: true,
    userId: user.id,
    email: user.email,
    project_key: projectKey,
  });
  response.headers.set("Set-Cookie", createAuthCookieHeader(token));
  return response;
}
