"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface PaymentFormProps {
  projectKey: string;
  packageId: string;
  email?: string;
}

export default function PaymentForm({ projectKey, packageId, email }: PaymentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function handlePayment() {
    if (!email) {
      setStatus("Please sign in or sign up before completing payment.");
      return;
    }
    setLoading(true);
    setStatus("Processing payment...");

    const response = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ project_key: projectKey, packageId, email }),
    });

    const body = await response.json();
    if (!response.ok) {
      setStatus(body.message || "Payment failed.");
      setLoading(false);
      return;
    }

    router.push(`/dashboard?project_key=${encodeURIComponent(projectKey)}`);
  }

  return (
    <div className="card">
      <h2 className="section-title">Payment</h2>
      <p>project_key: {projectKey}</p>
      <p>User: {email || "Not signed in"}</p>
      <button className="btn" type="button" onClick={handlePayment} disabled={loading || !email}>
        {loading ? "Completing payment..." : "Pay now"}
      </button>
      {status ? <p className="status">{status}</p> : null}
      {!email ? (
        <p className="status">
          Please <a href={`/login?project_key=${encodeURIComponent(projectKey)}`}>login</a> or{" "}
          <a href={`/signup?project_key=${encodeURIComponent(projectKey)}`}>signup</a> to continue.
        </p>
      ) : null}
    </div>
  );
}
