"use client";

import dynamic from "next/dynamic";
import { AccessibilityButton } from "@/components/accessibility/accessibility-button";
import { AccessibilityProvider } from "@/components/accessibility/accessibility-provider";
import type { ReactNode } from "react";

const AccessibilityPanel = dynamic(
  () => import("@/components/accessibility/accessibility-panel").then((m) => m.AccessibilityPanel),
  { ssr: false },
);

export function AccessibilityShell({ children }: { children: ReactNode }) {
  return (
    <AccessibilityProvider>
      {children}
      <AccessibilityButton />
      <AccessibilityPanel />
    </AccessibilityProvider>
  );
}
