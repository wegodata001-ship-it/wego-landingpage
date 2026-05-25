export type ContactEmailPayload = {
  name: string;
  phone: string;
  business: string;
  message: string;
  source: string;
  submittedAt: string;
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDisplayDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("ar-IL", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Asia/Jerusalem",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function buildContactEmailHtml(payload: ContactEmailPayload): string {
  const rows = [
    ["الاسم", payload.name],
    ["الهاتف", payload.phone],
    ["اسم العمل", payload.business || "—"],
    ["الرسالة", payload.message],
    ["التاريخ والوقت", formatDisplayDate(payload.submittedAt)],
    ["مصدر الموقع", payload.source],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:12px 16px;border-bottom:1px solid rgba(212,175,55,0.2);color:#a0aec0;font-weight:600;width:140px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:12px 16px;border-bottom:1px solid rgba(212,175,55,0.2);color:#ffffff;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:24px;background:#071018;font-family:Segoe UI,Tahoma,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;">
    <tr>
      <td style="background:linear-gradient(135deg,#0f2744,#0b1a2b);border:1px solid rgba(212,175,55,0.35);border-radius:16px;padding:28px 24px;">
        <p style="margin:0 0 8px;font-size:13px;letter-spacing:0.08em;color:#d4af37;text-transform:uppercase;">WEGO BUSINESS</p>
        <h1 style="margin:0 0 20px;font-size:22px;color:#f5d06f;">رسالة تواصل جديدة من الموقع</h1>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(15,39,68,0.5);border-radius:12px;border:1px solid rgba(212,175,55,0.15);">
          ${tableRows}
        </table>
        <p style="margin:20px 0 0;font-size:12px;color:#64748b;">تم الإرسال عبر نموذج التواصل في wegolandingpage</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function getContactEmailConfig() {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  const senderEmail =
    process.env.BREVO_SENDER_EMAIL?.trim() || process.env.MAIL_FROM?.trim() || "";
  const senderName = (process.env.BREVO_SENDER_NAME?.trim() || "WEGO Business").slice(0, 80);
  const toEmail = (
    process.env.CONTACT_TO_EMAIL?.trim() ||
    process.env.LEAD_TO?.trim() ||
    "wego.biz24@gmail.com"
  ).toLowerCase();

  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpPort = Number(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();

  return { apiKey, senderEmail, senderName, toEmail, smtpHost, smtpPort, smtpUser, smtpPass };
}

/** @deprecated use getContactEmailConfig */
export const getBrevoConfig = getContactEmailConfig;

async function sendViaBrevoApi(
  payload: ContactEmailPayload,
  cfg: ReturnType<typeof getContactEmailConfig>,
): Promise<void> {
  const subject = `رسالة تواصل — ${payload.name}`;
  const htmlContent = buildContactEmailHtml(payload);

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": cfg.apiKey!,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: cfg.senderName, email: cfg.senderEmail },
      to: [{ email: cfg.toEmail }],
      subject,
      htmlContent,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Brevo API ${res.status}${detail ? `: ${detail.slice(0, 400)}` : ""}`);
  }
}

async function sendViaBrevoSmtp(
  payload: ContactEmailPayload,
  cfg: ReturnType<typeof getContactEmailConfig>,
): Promise<void> {
  const nodemailer = await import("nodemailer");
  const subject = `رسالة تواصل — ${payload.name}`;
  const html = buildContactEmailHtml(payload);

  const transport = nodemailer.createTransport({
    host: cfg.smtpHost,
    port: cfg.smtpPort,
    secure: cfg.smtpPort === 465,
    auth: {
      user: cfg.smtpUser,
      pass: cfg.smtpPass,
    },
  });

  await transport.sendMail({
    from: `"${cfg.senderName}" <${cfg.senderEmail}>`,
    to: cfg.toEmail,
    subject,
    html,
  });
}

export async function sendContactEmailViaBrevo(payload: ContactEmailPayload): Promise<void> {
  const cfg = getContactEmailConfig();

  if (cfg.apiKey && cfg.senderEmail) {
    await sendViaBrevoApi(payload, cfg);
    return;
  }

  if (cfg.smtpHost && cfg.smtpUser && cfg.smtpPass && cfg.senderEmail) {
    await sendViaBrevoSmtp(payload, cfg);
    return;
  }

  throw new Error(
    "Email is not configured (BREVO_API_KEY + BREVO_SENDER_EMAIL, or SMTP_HOST + SMTP_USER + SMTP_PASS + MAIL_FROM).",
  );
}
