import { notFound } from "next/navigation";
import { isDbDisabled } from "@/lib/db-disabled";
import PaymentClient from "./PaymentClient";

export const dynamic = "force-dynamic";

export default async function PaymentPage({ searchParams }: { searchParams: { session?: string } }) {
  const sessionId = searchParams.session?.trim();
  if (!sessionId) notFound();

  if (isDbDisabled()) notFound();

  try {
    const { prisma } = await import("@/lib/prisma");
    const session = await prisma.checkoutSession.findUnique({
      where: { id: sessionId },
      include: { package: true },
    });

    if (!session || session.status !== "pending") notFound();

    return <PaymentClient sessionId={session.id} projectKey={session.project_key} package={session.package} />;
  } catch {
    notFound();
  }
}
