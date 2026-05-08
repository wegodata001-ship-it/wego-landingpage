"use client";

import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import { motion } from "framer-motion";
import type { LandingConfig, LandingSolutionVisual } from "@/lib/landing-config";
import {
  ResultsVisualControl,
  ResultsVisualDecisions,
  ResultsVisualMarketing,
} from "./SolutionResultsVisuals";

const VISUAL_FALLBACK: LandingSolutionVisual[] = ["decisions", "control", "marketing"];

function resolveVisual(
  card: LandingConfig["solutionCards"][number],
  index: number,
): LandingSolutionVisual {
  if (card.visual) return card.visual;
  const t = card.title;
  if (t.includes("החלטות") || t.includes("قرارات")) return "decisions";
  if (t.includes("שליטה") || t.includes("تحكم") || t.includes("التحكم")) return "control";
  if (t.includes("שיווק") || t.includes("تسويق")) return "marketing";
  return VISUAL_FALLBACK[index % 3]!;
}

function ResultsVisual({ kind }: { kind: LandingSolutionVisual }) {
  const cls = "lp-results-card__svg";
  switch (kind) {
    case "control":
      return <ResultsVisualControl className={cls} />;
    case "marketing":
      return <ResultsVisualMarketing className={cls} />;
    default:
      return <ResultsVisualDecisions className={cls} />;
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function SolutionSection() {
  const { landingConfig: config } = useLandingI18n();
  return (
    <section id="solution" className="lp-section lp-results">
      <div className="lp-results__ambient" aria-hidden>
        <div className="lp-results__blob lp-results__blob--a" />
        <div className="lp-results__blob lp-results__blob--b" />
        <div className="lp-results__blob lp-results__blob--c" />
        <div className="lp-results__streak" />
        <div className="lp-results__particles" aria-hidden>
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className="lp-results__particle" />
          ))}
        </div>
        <svg className="lp-results__curve" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden>
          <path
            d="M0,120 Q300,40 600,100 T1200,80"
            fill="none"
            stroke="url(#lpResultsCurve)"
            strokeWidth="1"
            opacity="0.35"
          />
          <defs>
            <linearGradient id="lpResultsCurve" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59,130,246,0)" />
              <stop offset="45%" stopColor="rgba(96,165,250,0.45)" />
              <stop offset="55%" stopColor="rgba(212,175,55,0.35)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="lp-container lp-results__inner">
        <motion.header
          className="lp-results__header"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="lp-results__title-wrap">
            <h2 className="lp-results__title">{config.solutionTitle}</h2>
            <div className="lp-results__title-glow" aria-hidden />
          </div>
          <div className="lp-results__divider" aria-hidden />
        </motion.header>

        <div className="lp-results__grid">
          {config.solutionCards.map((c, i) => {
            const kind = resolveVisual(c, i);
            return (
              <ResultCard key={`${c.title}-${i}`} card={c} index={i} visualKind={kind} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ResultCard({
  card,
  index,
  visualKind,
}: {
  card: LandingConfig["solutionCards"][number];
  index: number;
  visualKind: LandingSolutionVisual;
}) {
  return (
    <motion.article
      className="lp-results-card"
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      custom={index}
      whileHover={{ y: -8, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } }}
    >
      <div className="lp-results-card__shine" aria-hidden />
      <div className="lp-results-card__border-sweep" aria-hidden />
      <div className="lp-results-card__visual">
        <div className="lp-results-card__visual-inner">
          <ResultsVisual kind={visualKind} />
        </div>
        <div className="lp-results-card__visual-glow" aria-hidden />
      </div>
      <h3 className="lp-results-card__title">{card.title}</h3>
      <p className="lp-results-card__body">{card.body}</p>
    </motion.article>
  );
}
