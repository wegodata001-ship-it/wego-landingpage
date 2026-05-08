"use client";

import { getWegoBizDefaultUserId } from "@/lib/wego-env";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [projectKey, setProjectKey] = useState(() => getWegoBizDefaultUserId());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setProjectKey(params.get("project_key")?.trim() || getWegoBizDefaultUserId());
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, project_key: projectKey }),
      credentials: "same-origin",
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data?.message ?? "Unable to sign in.");
      setLoading(false);
      return;
    }

    router.push(`/dashboard?project_key=${projectKey}`);
  }

  return (
    <main className="container">
      <section className="card">
        <h1 className="section-title">התחברות</h1>
        <p>משתמשים מקושרים ל־project_key — אותו מפתח כמו בדף הנחיתה ובתשלום.</p>
        <form onSubmit={handleSubmit} className="section-grid" style={{ gap: "1rem" }}>
          <label className="label">
            Email
            <input
              className="input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          <label className="label">
            Password
            <input
              className="input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              required
            />
          </label>
          <input type="hidden" name="project_key" value={projectKey} />
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "מתחברים…" : "התחברות"}
          </button>
        </form>
        {error ? <p className="status" style={{ color: "#b91c1c" }}>{error}</p> : null}
        <p className="status">
          אין חשבון? <a href={`/signup?project_key=${projectKey}`}>הרשמה</a>
        </p>
      </section>
    </main>
  );
}
