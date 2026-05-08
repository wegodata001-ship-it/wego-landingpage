import { Cairo, Rubik } from "next/font/google";
import type { ReactNode } from "react";

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-landing-he",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-landing-ar",
  display: "swap",
});

export default function LandingGroupLayout({ children }: { children: ReactNode }) {
  return <div className={`${rubik.variable} ${cairo.variable} landing-font-vars`}>{children}</div>;
}
