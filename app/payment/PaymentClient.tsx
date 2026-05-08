"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Package } from "@prisma/client";
import { buildWhatsAppLink } from "@/lib/whatsapp";

type Props = {
  sessionId: string;
  projectKey: string;
  package: Package;
};

function parseFeatures(features: unknown): string[] {
  if (Array.isArray(features)) {
    return features.filter((x): x is string => typeof x === "string");
  }
  return [];
}

export default function PaymentClient({ sessionId, projectKey, package: pkg }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<"form" | "paying" | "success" | "error">("form");
  const [error, setError] = useState<string | null>(null);
  const [creds, setCreds] = useState<{ email: string; password: string } | null>(null);

  const features = parseFeatures(pkg.features);
  const wa = buildWhatsAppLink(`אני רוצה להתחיל עם החבילה ${pkg.name} (Wego Business)`);

  async function handleFakePay() {
    if (!email.trim()) {
      setError("נא להזין אימייל לקבלת פרטי התחברות.");
      return;
    }
    setError(null);
    setPhase("paying");

    try {
      const res = await fetch("/api/payment-success", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ sessionId, email: email.trim().toLowerCase() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "התשלום נכשל.");
        setPhase("error");
        return;
      }

      setCreds({ email: data.email, password: data.password });
      setPhase("success");
    } catch {
      setError("שגיאת רשת. נסו שוב.");
      setPhase("error");
    }
  }

  if (phase === "success" && creds) {
    return (
      <main className="container">
        <section className="card payment-success-card" style={{ maxWidth: 520, margin: "2rem auto", textAlign: "center" }}>
          <div className="payment-success-check" aria-hidden>
            ✓
          </div>
          <h1 className="section-title" style={{ marginTop: "1rem" }}>
            התשלום הושלם בהצלחה
          </h1>
          <p className="status" style={{ marginBottom: "1.25rem" }}>
            שמרו את פרטי ההתחברות במקום בטוח:
          </p>
          <div
            style={{
              background: "#f1f5f9",
              borderRadius: 12,
              padding: "1rem",
              marginBottom: "1.25rem",
              textAlign: "left",
              direction: "ltr",
            }}
          >
            <p style={{ margin: "0.35rem 0" }}>
              <strong>Email:</strong> {creds.email}
            </p>
            <p style={{ margin: "0.35rem 0" }}>
              <strong>Password:</strong> {creds.password}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "stretch" }}>
            <Link className="btn" href={`/dashboard?project_key=${encodeURIComponent(projectKey)}`}>
              כניסה למערכת (דשבורד)
            </Link>
            <Link className="btn btn-secondary" href={`/login?project_key=${encodeURIComponent(projectKey)}`}>
              מסך התחברות
            </Link>
            {wa ? (
              <a className="btn btn-secondary" href={wa} target="_blank" rel="noreferrer">
                שליחה בוואטסאפ
              </a>
            ) : null}
          </div>
          <p className="status" style={{ marginTop: "1rem", fontSize: "0.85rem" }}>
            חיברנו אתכם אוטומטית — אפשר לעבור ישר לדשבורד.
          </p>
        </section>
        <style jsx>{`
          .payment-success-check {
            width: 72px;
            height: 72px;
            margin: 0 auto;
            border-radius: 50%;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: white;
            font-size: 2.25rem;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: pop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          @keyframes pop {
            from {
              transform: scale(0);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="container">
      <section className="card" style={{ maxWidth: 520, margin: "2rem auto" }}>
        <h1 className="section-title">תשלום (דמו)</h1>
        <p className="status">חבילה: {pkg.name}</p>
        <p style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0.5rem 0 1rem" }}>
          ₪{pkg.price.toLocaleString("he-IL")}
        </p>
        {pkg.description ? <p className="status">{pkg.description}</p> : null}
        {features.length ? (
          <ul className="status" style={{ paddingInlineStart: "1.2rem" }}>
            {features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        ) : null}

        <label className="label" style={{ marginTop: "1.25rem" }}>
          אימייל ליצירת החשבון
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={phase === "paying"}
            required
          />
        </label>

        {error ? (
          <p className="status" style={{ color: "#b91c1c" }}>
            {error}
          </p>
        ) : null}

        <button type="button" className="btn" style={{ marginTop: "1rem", width: "100%" }} disabled={phase === "paying"} onClick={() => void handleFakePay()}>
          {phase === "paying" ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="payment-spinner" />
              מעבדים תשלום…
            </span>
          ) : (
            "שלם עכשיו"
          )}
        </button>

        <p className="status" style={{ marginTop: "1rem", fontSize: "0.85rem" }}>
          <button type="button" className="btn-secondary" style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }} onClick={() => router.back()}>
            חזרה
          </button>
        </p>

        <style jsx>{`
          .payment-spinner {
            width: 18px;
            height: 18px;
            border: 2px solid rgba(255, 255, 255, 0.35);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.7s linear infinite;
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </section>
    </main>
  );
}
