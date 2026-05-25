"use client";

import { useAccessibility } from "@/components/accessibility/accessibility-provider";
import { useEffect, useState } from "react";

export function ReadingLine() {
  const { settings } = useAccessibility();
  const [top, setTop] = useState(0);

  useEffect(() => {
    if (!settings.readingLine) return;

    const onMove = (e: MouseEvent) => {
      setTop(e.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [settings.readingLine]);

  if (!settings.readingLine) return null;

  return (
    <div
      className="wego-a11y-reading-line"
      aria-hidden
      style={{ top: `${top}px` }}
    />
  );
}
