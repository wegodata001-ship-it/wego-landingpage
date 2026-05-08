import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const AUTH_COOKIE = "wego_auth";
const AUTH_SECRET = process.env.AUTH_SECRET ?? "WEGO_DEMO_SECRET";

function signToken(payload: string) {
  return Buffer.from(`${payload}|${AUTH_SECRET}`).toString("base64");
}

function verifyToken(token: string) {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf8");
    const [payload, secret] = decoded.split("|");
    if (secret !== AUTH_SECRET) return null;
    return payload;
  } catch {
    return null;
  }
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function comparePasswords(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword);
}

export function createAuthToken(userId: string, projectKey: string) {
  return signToken(`${userId}:${projectKey}`);
}

export function getAuthCookieValue() {
  return cookies().get(AUTH_COOKIE)?.value ?? null;
}

export async function getCurrentUser() {
  const token = getAuthCookieValue();
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload) return null;

  const [userId, projectKey] = payload.split(":");
  if (!userId || !projectKey) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, project_key: true },
  });

  if (!user || user.project_key !== projectKey) return null;
  return user;
}

export function createAuthCookieHeader(token: string) {
  return `${AUTH_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`;
}
