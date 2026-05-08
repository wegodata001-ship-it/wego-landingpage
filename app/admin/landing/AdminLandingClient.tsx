"use client";

import { useCallback, useEffect, useState } from "react";
import { DEFAULT_LANDING_CONFIG, type LandingConfig } from "@/lib/landing-config";

type Props = {
  projectKey: string;
};

export default function AdminLandingClient({ projectKey }: Props) {
  const [jsonText, setJsonText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [previewNonce, setPreviewNonce] = useState(0);
  const [origin, setOrigin] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/landing-config?project_key=${encodeURIComponent(projectKey)}`);
      const data = (await res.json()) as { config?: LandingConfig };
      const cfg = data.config ?? DEFAULT_LANDING_CONFIG;
      setJsonText(JSON.stringify(cfg, null, 2));
    } catch {
      setMessage("טעינה נכשלה.");
      setJsonText(JSON.stringify(DEFAULT_LANDING_CONFIG, null, 2));
    } finally {
      setLoading(false);
    }
  }, [projectKey]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    setOrigin(typeof window !== "undefined" ? window.location.origin : "");
  }, []);

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      let parsed: unknown;
      try {
        parsed = JSON.parse(jsonText);
      } catch {
        setMessage("JSON לא תקין — בדקו פסיקים ומירכאות.");
        setSaving(false);
        return;
      }
      const res = await fetch("/api/admin/landing-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_key: projectKey, config: parsed }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { message?: string };
        setMessage(err.message ?? "שמירה נכשלה.");
        setSaving(false);
        return;
      }
      setMessage("נשמר. רעננו את תצוגת המקדימה אם צריך.");
      setPreviewNonce((n) => n + 1);
    } catch {
      setMessage("שגיאת רשת.");
    } finally {
      setSaving(false);
    }
  }

  const previewSrc = origin ? `${origin}/?project_key=${encodeURIComponent(projectKey)}&t=${previewNonce}` : "";

  return (
    <main className="container" style={{ maxWidth: 1200 }}>
      <section className="card">
        <h1 className="section-title">עריכת דף נחיתה</h1>
        <p>
          project_key: <strong>{projectKey}</strong>
        </p>
        <p style={{ fontSize: "0.95rem", opacity: 0.85 }}>
          התוכן נשמר ב־<code>SiteSettings.localizedContent.landing</code>. ניתן לערוך את כל הבלוקים כאן כ־JSON (כותרות, רשימות, המלצות, מחירון טקסטואלי).
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1rem" }}>
          <button type="button" className="btn" disabled={loading || saving} onClick={() => void save()}>
            {saving ? "שומר…" : "שמור"}
          </button>
          <button type="button" className="btn btn-secondary" disabled={loading} onClick={() => void load()}>
            טען מחדש מהשרת
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setPreviewNonce((n) => n + 1)}>
            רענון תצוגה מקדימה
          </button>
        </div>
        {message ? <p style={{ marginTop: "0.75rem" }}>{message}</p> : null}
      </section>

      <div className="section-grid" style={{ marginTop: "1.5rem", alignItems: "stretch" }}>
        <section className="card" style={{ minHeight: 480 }}>
          <h2 className="section-title">JSON — תצורת דף נחיתה</h2>
          {loading ? (
            <p>טוען…</p>
          ) : (
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              spellCheck={false}
              style={{
                width: "100%",
                minHeight: 420,
                fontFamily: "ui-monospace, monospace",
                fontSize: "0.85rem",
                padding: "0.75rem",
                borderRadius: 8,
                border: "1px solid rgba(0,0,0,0.15)",
              }}
            />
          )}
        </section>

        <section className="card" style={{ minHeight: 480 }}>
          <h2 className="section-title">תצוגה מקדימה חיה</h2>
          <p style={{ fontSize: "0.9rem", opacity: 0.85 }}>
            לאחר שמירה, רעננו את ה־iframe. הדף הציבורי משתמש ב־NEXT_PUBLIC_PROJECT_KEY; ודאו שהוא תואם ל־project_key הזה כדי לראות את אותו תוכן.
          </p>
          {origin ? (
            <iframe
              key={previewNonce}
              title="Landing preview"
              src={previewSrc}
              style={{
                width: "100%",
                minHeight: 520,
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: 8,
                marginTop: "0.75rem",
              }}
            />
          ) : (
            <p style={{ marginTop: "1rem" }}>טוען תצוגה מקדימה…</p>
          )}
        </section>
      </div>
    </main>
  );
}
