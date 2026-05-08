import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wego Business SaaS",
  description: "Multi-tenant landing page subscription platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
