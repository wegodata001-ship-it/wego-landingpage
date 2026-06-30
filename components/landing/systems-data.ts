import type { SystemScreenType } from "./SystemMockups";

export type SystemCardId = "financial" | "team" | "integrated" | "custom";

export type SystemCardDef = {
  id: SystemCardId;
  icon: SystemCardId;
  screen: SystemScreenType;
  featured?: boolean;
};

/** Static structure — copy lives in messages/he.json & messages/ar.json */
export const systemCards: SystemCardDef[] = [
  { id: "financial", icon: "financial", screen: "finance" },
  { id: "team", icon: "team", screen: "employees" },
  { id: "integrated", icon: "integrated", screen: "dashboard", featured: true },
  { id: "custom", icon: "custom", screen: "ai" },
];
