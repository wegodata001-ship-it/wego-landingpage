"use client";

import type { useContactForm } from "@/components/contact/use-contact-form";
import { motion } from "framer-motion";

type FormApi = ReturnType<typeof useContactForm>;

type Props = {
  form: FormApi;
  formId: string;
  variant?: "section" | "compact";
};

export function ContactForm({ form, formId, variant = "section" }: Props) {
  const { t, fields, state, errorMessage, update, submit } = form;
  const rootClass = variant === "section" ? "lp-contact-form lp-contact-form--section" : "lp-contact-form";

  if (state === "success") {
    return (
      <motion.div
        className="lp-contact-success lp-contact-success--section"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        role="status"
      >
        <div className="lp-contact-success__icon" aria-hidden>
          <svg viewBox="0 0 52 52" width="56" height="56">
            <circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.35" />
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 27l8 8 16-18"
            />
          </svg>
        </div>
        <h3 className="lp-contact-success__title">{t("contact.successTitle")}</h3>
        <p className="lp-contact-success__text">{t("contact.successBody")}</p>
        <button type="button" className="lp-btn lp-btn--ghost lp-btn--ripple" onClick={() => form.reset()}>
          {t("contact.sendAnother")}
        </button>
      </motion.div>
    );
  }

  return (
    <form
      id={formId}
      className={rootClass}
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
      noValidate
    >
      <div className="lp-contact-form__grid">
        <label className="lp-contact-field">
          <span>{t("contact.nameLabel")}</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            value={fields.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder={t("contact.namePlaceholder")}
            disabled={state === "loading"}
          />
        </label>
        <label className="lp-contact-field">
          <span>{t("contact.phoneLabel")}</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            required
            dir="ltr"
            className="lp-contact-field__ltr"
            value={fields.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder={t("contact.phonePlaceholder")}
            disabled={state === "loading"}
          />
        </label>
      </div>
      <label className="lp-contact-field">
        <span>
          {t("contact.businessLabel")}{" "}
          <em className="lp-contact-field__optional">{t("contact.optional")}</em>
        </span>
        <input
          type="text"
          name="business"
          value={fields.business}
          onChange={(e) => update("business", e.target.value)}
          placeholder={t("contact.businessPlaceholder")}
          disabled={state === "loading"}
        />
      </label>
      <label className="lp-contact-field">
        <span>{t("contact.messageLabel")}</span>
        <textarea
          name="message"
          rows={5}
          required
          value={fields.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder={t("contact.messagePlaceholder")}
          disabled={state === "loading"}
        />
      </label>

      {state === "error" ? (
        <p className="lp-contact-form__error" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        className="lp-btn lp-btn--gold lp-btn--ripple lp-contact-form__submit"
        disabled={state === "loading"}
        aria-busy={state === "loading"}
      >
        {state === "loading" ? (
          <span className="lp-contact-form__loading">
            <span className="lp-contact-form__spinner" aria-hidden />
            {t("contact.sending")}
          </span>
        ) : (
          t("contact.submit")
        )}
      </button>
    </form>
  );
}
