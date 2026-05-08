import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PackageForm from "./PackageForm";
import { resolveProjectKey } from "@/lib/project-key";

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: { project_key?: string; projectId?: string };
}) {
  const projectKey = resolveProjectKey(searchParams);

  const [users, packages, subscriptions, payments] = await Promise.all([
    prisma.user.findMany({ where: { project_key: projectKey } }),
    prisma.package.findMany({ where: { project_key: projectKey }, orderBy: { name: "asc" } }),
    prisma.subscription.findMany({
      where: { project_key: projectKey },
      include: { package: true, user: true },
    }),
    prisma.payment.findMany({ where: { project_key: projectKey }, orderBy: { id: "desc" } }),
  ]);

  const now = new Date();

  return (
    <main className="container">
      <section className="card">
        <h1 className="section-title">Admin panel</h1>
        <p>
          project_key: <strong>{projectKey}</strong>
        </p>
        <div className="section-grid" style={{ gap: "1rem", marginTop: "1rem" }}>
          <Link className="btn" href={`/admin/landing?project_key=${encodeURIComponent(projectKey)}`}>
            עריכת דף נחיתה
          </Link>
          <Link className="btn" href={`/lp/demo-landing?project_key=${encodeURIComponent(projectKey)}`}>
            Open landing page
          </Link>
          <Link className="btn btn-secondary" href={`/dashboard?project_key=${encodeURIComponent(projectKey)}`}>
            Open dashboard
          </Link>
        </div>
      </section>

      <section className="card" style={{ marginTop: "1.5rem" }}>
        <h2 className="section-title">Users</h2>
        {users.length ? (
          <div className="section-grid">
            {users.map((u) => {
              const activeSubscription = subscriptions.find(
                (s) => s.userId === u.id && s.endDate > now
              );
              return (
                <div key={u.id} className="card">
                  <p>
                    <strong>{u.email}</strong>
                  </p>
                  <p>Status: {activeSubscription ? "active" : "inactive"}</p>
                  <p>ID: {u.id}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No users found.</p>
        )}
      </section>

      <section className="section-grid" style={{ gap: "1rem", marginTop: "1.5rem" }}>
        <PackageForm projectKey={projectKey} />
      </section>

      <section className="card" style={{ marginTop: "1.5rem" }}>
        <h2 className="section-title">Packages</h2>
        {packages.length ? (
          <div className="section-grid">
            {packages.map((pkg) => (
              <div key={pkg.id} className="card">
                <p>
                  <strong>{pkg.name}</strong>
                </p>
                {pkg.description ? <p className="status" style={{ fontSize: "0.9rem" }}>{pkg.description}</p> : null}
                <p>Price: ${pkg.price.toFixed(2)}</p>
                <p>Duration: {pkg.durationDays} days</p>
                <p>ID: {pkg.id}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No packages found.</p>
        )}
      </section>

      <section className="card" style={{ marginTop: "1.5rem" }}>
        <h2 className="section-title">Subscriptions</h2>
        {subscriptions.length ? (
          <div className="section-grid">
            {subscriptions.map((subscription) => (
              <div key={subscription.id} className="card">
                <p>User: {subscription.user.email}</p>
                <p>Package: {subscription.package.name}</p>
                <p>
                  DB status: <strong>{subscription.status}</strong>
                </p>
                <p>Lifecycle: {subscription.endDate > now ? "active window" : "expired window"}</p>
                <p>Ends: {subscription.endDate.toISOString().slice(0, 10)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No subscriptions found.</p>
        )}
      </section>

      <section className="card" style={{ marginTop: "1.5rem" }}>
        <h2 className="section-title">Payments</h2>
        {payments.length ? (
          <div className="section-grid">
            {payments.map((payment) => (
              <div key={payment.id} className="card">
                <p>Transaction: {payment.transactionId}</p>
                <p>Amount: ${payment.amount.toFixed(2)}</p>
                <p>Email: {payment.email}</p>
                <p>Status: {payment.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No payments logged yet.</p>
        )}
      </section>
    </main>
  );
}
