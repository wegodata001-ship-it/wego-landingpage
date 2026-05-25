import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { isDbDisabled } from "@/lib/db-disabled";
import { resolveProjectKey } from "@/lib/project-key";
import PaymentForm from "./PaymentForm";

export const dynamic = "force-dynamic";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams?: { project_key?: string; projectId?: string; packageId?: string };
}) {
  const projectKey = resolveProjectKey(searchParams);
  const packageId = searchParams?.packageId ?? "";

  if (isDbDisabled()) {
    return (
      <main className="container">
        <section className="card">
          <h1 className="section-title">Checkout</h1>
          <p>Checkout is temporarily unavailable (DISABLE_DB=true).</p>
          <Link className="btn" href="/">
            Back to landing page
          </Link>
        </section>
      </main>
    );
  }

  const user = await getCurrentUser();
  const { prisma } = await import("@/lib/prisma");
  const pkg = await prisma.package.findFirst({
    where: { id: packageId, project_key: projectKey },
  });

  if (!pkg) {
    return (
      <main className="container">
        <section className="card">
          <h1 className="section-title">Checkout</h1>
          <p>Selected package could not be found.</p>
          <Link className="btn" href={`/lp/demo-landing?project_key=${encodeURIComponent(projectKey)}`}>
            Return to landing page
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="container">
      <section className="card">
        <h1 className="section-title">Checkout</h1>
        <p>
          project_key: <strong>{projectKey}</strong>
        </p>
        <article className="card">
          <h2>{pkg.name}</h2>
          <p>
            Price: <strong>${pkg.price.toFixed(2)}</strong>
          </p>
          <p>Duration: {pkg.durationDays} days</p>
        </article>
        <PaymentForm projectKey={projectKey} packageId={packageId} email={user?.email ?? undefined} />
      </section>
    </main>
  );
}
