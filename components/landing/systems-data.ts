export type SystemCardId = "financial" | "team" | "integrated" | "custom";

export type SystemCardDef = {
  id: SystemCardId;
  icon: SystemCardId;
  featured?: boolean;
};

/** Static structure — copy lives in messages/he.json & messages/ar.json */
export const systemCards: SystemCardDef[] = [
  { id: "financial", icon: "financial" },
  { id: "team", icon: "team" },
  { id: "integrated", icon: "integrated", featured: true },
  { id: "custom", icon: "custom" },
];
