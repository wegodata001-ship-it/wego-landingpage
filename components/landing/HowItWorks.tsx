"use client";

import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import { Fragment } from "react";
import { motion } from "framer-motion";
import type { LandingConfig, LandingHowStepVisual } from "@/lib/landing-config";
import { HowVisualGrowth, HowVisualLeads, HowVisualManage } from "./HowItWorksVisuals";

const HOW_VISUAL_FALLBACK: LandingHowStepVisual[] = ["leads", "manage", "growth"];

function resolveHowVisual(
  step: LandingConfig["howSteps"][number],
  index: number,
): LandingHowStepVisual {
  if (step.visual) return step.visual;
  const t = step.title;
  if ((t.includes("לקוחות") || t.includes("عملاء")) && (t.includes("מביאים") || t.includes("نجلب"))) return "leads";
  if (t.includes("מנהלים") || t.includes("تدير")) return "manage";
  if (t.includes("צמיחה") || t.includes("نمو") || t.includes("النمو")) return "growth";
  return HOW_VISUAL_FALLBACK[index % 3]!;
}

function HowStepVisual({ kind }: { kind: LandingHowStepVisual }) {
  const cls = "lp-how-card__svg";
  switch (kind) {
    case "manage":
      return <HowVisualManage className={cls} />;
    case "growth":
      return <HowVisualGrowth className={cls} />;
    default:
      return <HowVisualLeads className={cls} />;
  }
}

function HowTitle({ title }: { title: string }) {
  const qHe = title.lastIndexOf("?");
  const qAr = title.lastIndexOf("؟");
  const q = Math.max(qHe, qAr);
  if (q === -1) return <>{title}</>;
  return (
    <>
      <span className="lp-how__title-main">{title.slice(0, q)}</span>
      <span className="lp-how__title-gold">{title.slice(q)}</span>
    </>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.12, duration: 0.52, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function HowItWorks() {
  const { landingConfig: config } = useLandingI18n();
  const steps = config.howSteps;

  return (
    <section id="how-it-works" className="lp-section lp-how-premium">
      <div className="lp-how-premium__ambient" aria-hidden>
        <div className="lp-how-premium__blob lp-how-premium__blob--a" />
        <div className="lp-how-premium__blob lp-how-premium__blob--b" />
        <div className="lp-how-premium__corner lp-how-premium__corner--tl" />
        <div className="lp-how-premium__corner lp-how-premium__corner--br" />
        <div className="lp-how-premium__particles">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="lp-how-premium__particle" />
          ))}
        </div>
        <svg className="lp-how-premium__arc" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden>
          <path
            d="M0,90 Q250,20 500,70 T1000,50"
            fill="none"
            stroke="url(#lpHowArc)"
            strokeWidth="1.2"
            opacity="0.4"
          />
          <defs>
            <linearGradient id="lpHowArc" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59,130,246,0)" />
              <stop offset="40%" stopColor="rgba(96,165,250,0.4)" />
              <stop offset="60%" stopColor="rgba(212,175,55,0.3)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="lp-container lp-how-premium__inner">
        <motion.header
          className="lp-how-premium__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="lp-how-premium__title-wrap">
            <h2 className="lp-how-premium__title">
              <HowTitle title={config.howTitle} />
            </h2>
            <div className="lp-how-premium__title-glow" aria-hidden />
          </div>
          <p className="lp-how-premium__subtitle">{config.howSubtitle}</p>
          <div className="lp-how-premium__divider" aria-hidden />
        </motion.header>

        <div className="lp-how-premium__flow">
          {steps.map((step, i) => (
            <Fragment key={`${step.title}-${i}`}>
              <motion.div
                className="lp-how-card-wrap"
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                custom={i}
              >
                <span className="lp-how-card__badge">{i + 1}</span>
                <motion.article
                  className="lp-how-card"
                  whileHover={{ y: -6, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } }}
                >
                  <div className="lp-how-card__shine" aria-hidden />
                  <div className="lp-how-card__border-sweep" aria-hidden />
                  <div className="lp-how-card__visual">
                    <div className="lp-how-card__visual-inner">
                      <HowStepVisual kind={resolveHowVisual(step, i)} />
                    </div>
                    <div className="lp-how-card__visual-glow" aria-hidden />
                  </div>
                  <h3 className="lp-how-card__title">{step.title}</h3>
                  <p className="lp-how-card__desc">{step.desc}</p>
                </motion.article>
              </motion.div>
              {i < steps.length - 1 ? (
                <div className="lp-how-connector" aria-hidden>
                  <span className="lp-how-connector__line" />
                  <span className="lp-how-connector__pulse" />
                  <span className="lp-how-connector__dot lp-how-connector__dot--a" />
                  <span className="lp-how-connector__dot lp-how-connector__dot--b" />
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
