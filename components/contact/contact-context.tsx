"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";

type ContactContextValue = {
  scrollToContact: () => void;
};

const ContactContext = createContext<ContactContextValue | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const scrollToContact = useCallback(() => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        const first = el.querySelector<HTMLInputElement>("input:not([disabled])");
        first?.focus({ preventScroll: true });
      }, 480);
      return;
    }
    window.location.hash = "contact";
  }, []);

  const value = useMemo(() => ({ scrollToContact }), [scrollToContact]);

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
}

/** @deprecated use scrollToContact */
export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) {
    throw new Error("useContact must be used within ContactProvider");
  }
  return { openContact: ctx.scrollToContact, ...ctx };
}

export function useScrollToContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) {
    throw new Error("useScrollToContact must be used within ContactProvider");
  }
  return ctx;
}
