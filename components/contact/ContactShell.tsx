"use client";

import { ContactFloatingButton } from "@/components/contact/ContactFloatingButton";
import { ContactProvider } from "@/components/contact/contact-context";
import type { ReactNode } from "react";

export function ContactShell({ children }: { children: ReactNode }) {
  return (
    <ContactProvider>
      {children}
      <ContactFloatingButton />
    </ContactProvider>
  );
}
