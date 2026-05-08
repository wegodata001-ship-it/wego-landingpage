import type { ModalFeatureIconType } from "@/components/landing/icons";

export type ServiceModalBody = {
  title: string;
  titleSecondLine?: string;
  highlightWord?: string;
  subtitle: string;
  description: string;
  featureCards: { icon: ModalFeatureIconType; title: string; desc: string }[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  /** If set, this substring in the CTA is styled as brand gold */
  ctaBrandEmbed?: string;
};
