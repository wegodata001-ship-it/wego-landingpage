/** Default Wego Business WhatsApp (054-546-7273 → E.164). Override via NEXT_PUBLIC_WHATSAPP_PHONE. */
export const DEFAULT_WHATSAPP_PHONE = "972545467273";

export function getWhatsAppPhoneDigits(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_PHONE?.trim() || DEFAULT_WHATSAPP_PHONE;
  return raw.replace(/\D/g, "") || DEFAULT_WHATSAPP_PHONE;
}

/** WhatsApp click-to-chat with URL-encoded message. */
export function buildWhatsAppLink(message: string): string {
  const phone = getWhatsAppPhoneDigits();
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
