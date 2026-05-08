"use client";

import { useState, type FormEvent } from "react";

interface PackageFormProps {
  projectKey: string;
}

export default function PackageForm({ projectKey }: PackageFormProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("0");
  const [durationDays, setDurationDays] = useState("30");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const response = await fetch("/api/admin/packages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project_key: projectKey, name, price, durationDays }),
    });

    const data = await response.json();
    if (!response.ok) {
      setStatus(data?.message || "Unable to create package.");
      setLoading(false);
      return;
    }

    setStatus("Package created successfully.");
    setName("");
    setPrice("0");
    setDurationDays("30");
    setLoading(false);
  }

  return (
    <section className="card">
      <h2 className="section-title">Create package</h2>
      <form onSubmit={handleSubmit} className="section-grid" style={{ gap: "1rem" }}>
        <label className="label">
          Name
          <input className="input" value={name} onChange={(event) => setName(event.target.value)} required />
        </label>
        <label className="label">
          Price
          <input className="input" type="number" step="0.01" value={price} onChange={(event) => setPrice(event.target.value)} required />
        </label>
        <label className="label">
          Duration days
          <input className="input" type="number" value={durationDays} onChange={(event) => setDurationDays(event.target.value)} required />
        </label>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Create package"}
        </button>
      </form>
      {status ? <p className="status">{status}</p> : null}
    </section>
  );
}
