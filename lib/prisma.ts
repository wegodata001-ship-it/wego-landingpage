import { PrismaClient } from "@prisma/client";
import { isDbDisabled } from "@/lib/db-disabled";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

function getPrismaClient(): PrismaClient {
  if (isDbDisabled()) {
    throw new Error(
      "[prisma] DISABLE_DB=true — guard with isDbDisabled() before calling prisma.",
    );
  }
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  return globalForPrisma.prisma;
}

/** Lazy proxy — no PrismaClient construction at import time (safe for `next build`). */
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient();
    const value = Reflect.get(client, prop, client);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
