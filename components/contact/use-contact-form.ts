"use client";

import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import { useCallback, useState } from "react";

export type ContactFormFields = {
  name: string;
  phone: string;
  business: string;
  message: string;
};

const INITIAL: ContactFormFields = { name: "", phone: "", business: "", message: "" };

export type ContactFormState = "idle" | "loading" | "success" | "error";

export function contactErrorMessage(t: (path: string) => string, code: string | undefined): string {
  switch (code) {
    case "name_required":
      return t("contact.errors.name");
    case "phone_invalid":
      return t("contact.errors.phone");
    case "message_required":
      return t("contact.errors.message");
    case "email_not_configured":
      return t("contact.errors.config");
    default:
      return t("contact.errors.generic");
  }
}

export function useContactForm() {
  const { t } = useLandingI18n();
  const [fields, setFields] = useState<ContactFormFields>(INITIAL);
  const [state, setState] = useState<ContactFormState>("idle");
  const [errorCode, setErrorCode] = useState<string | undefined>();

  const update = useCallback((key: keyof ContactFormFields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    setState((s) => (s === "error" ? "idle" : s));
    setErrorCode(undefined);
  }, []);

  const reset = useCallback(() => {
    setFields(INITIAL);
    setState("idle");
    setErrorCode(undefined);
  }, []);

  const submit = useCallback(async () => {
    if (state === "loading") return;

    setState("loading");
    setErrorCode(undefined);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name,
          phone: fields.phone,
          business: fields.business,
          message: fields.message,
          source: typeof window !== "undefined" ? `${window.location.origin}/#contact` : "",
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { success?: boolean; error?: string };

      if (!res.ok || !data.success) {
        setErrorCode(data.error);
        setState("error");
        return;
      }

      setState("success");
    } catch {
      setErrorCode("send_failed");
      setState("error");
    }
  }, [fields, state]);

  return {
    t,
    fields,
    state,
    errorCode,
    errorMessage: contactErrorMessage(t, errorCode),
    update,
    reset,
    submit,
  };
}
