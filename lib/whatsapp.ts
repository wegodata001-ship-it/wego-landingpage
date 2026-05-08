/** WhatsApp click-to-chat. Set NEXT_PUBLIC_WHATSAPP_PHONE to E.164 digits only (e.g. 972501234567). */
export function buildWhatsAppLink(message: string): string | null {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_PHONE?.trim();
  if (!raw) return null;
  const phone = raw.replace(/\D/g, "");
  if (!phone) return null;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
