import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PaymentClient from "./PaymentClient";

export default async function PaymentPage({ searchParams }: { searchParams: { session?: string } }) {
  const sessionId = searchParams.session?.trim();
  if (!sessionId) notFound();

  try {
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
