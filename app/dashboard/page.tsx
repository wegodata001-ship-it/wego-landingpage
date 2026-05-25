import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { isDbDisabled } from "@/lib/db-disabled";
import { resolveProjectKey } from "@/lib/project-key";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { project_key?: string; projectId?: string };
}) {
  const projectKey = resolveProjectKey(searchParams);

  if (isDbDisabled()) {
    return (
      <main className="container">
        <section className="card">
          <h1 className="section-title">Dashboard</h1>
          <p>Dashboard is temporarily unavailable (DISABLE_DB=true).</p>
          <Link className="btn" href="/">
            Back to landing page
          </Link>
        </section>
      </main>
    );
  }

  const user = await getCurrentUser();

  if (!user || user.project_key !== projectKey) {
    return (
      <main className="container">
        <section className="card">
          <h1 className="section-title">Dashboard</h1>
          <p>You must be signed in to view your dashboard.</p>
          <Link className="btn" href={`/login?project_key=${encodeURIComponent(projectKey)}`}>
            Sign in
          </Link>
        </section>
      </main>
    );
  }

  const { prisma } = await import("@/lib/prisma");
  const subscription = await prisma.subscription.findFirst({
    where: {
      project_key: projectKey,
      userId: user.id,
      endDate: { gte: new Date() },
    },
    include: { package: true },
    orderBy: { endDate: "desc" },
  });

  const now = new Date();
  const daysLeft = subscription
    ? Math.max(0, Math.ceil((subscription.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <main className="container">
      <section className="card">
        <h1 className="section-title">Your dashboard</h1>
        <p>
          project_key: <strong>{projectKey}</strong>
        </p>
        <div className="section-grid" style={{ gap: "1rem" }}>
          <div className="card">
            <h2 className="section-title">Account</h2>
            <p>Email: {user.email}</p>
          </div>
          <div className="card">
            <h2 className="section-title">Subscription</h2>
            {subscription ? (
              <>
                <p>Package: {subscription.package.name}</p>
                <p>Start date: {subscription.startDate.toISOString().slice(0, 10)}</p>
                <p>End date: {subscription.endDate.toISOString().slice(0, 10)}</p>
                <p>Days left: {daysLeft}</p>
                <Link
                  className="btn"
                  href={`/checkout?project_key=${encodeURIComponent(projectKey)}&packageId=${subscription.packageId}`}
                >
                  Renew
                </Link>
              </>
            ) : (
              <>
                <p>No active subscription found.</p>
                <Link className="btn" href={`/lp/demo-landing?project_key=${encodeURIComponent(projectKey)}`}>
                  Browse packages
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
