"use client";

import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import { getStringArray } from "@/lib/i18n/nested";
import {
  DEFAULT_MARKETING_REELS,
  reelShortcodeFromPermalink,
  type MarketingReel,
} from "@/lib/reels-data";
import arMessages from "@/messages/ar.json";
import heMessages from "@/messages/he.json";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type PreviewPayload = {
  thumbnailUrl: string | null;
  videoUrl: string | null;
};

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function posterFallbackGradient(index: number): string {
  const hues = [
    "214, 45%, 38%",
    "38, 55%, 42%",
    "220, 50%, 36%",
    "43, 48%, 40%",
    "210, 48%, 35%",
    "35, 52%, 38%",
  ];
  const h = hues[index % hues.length]!;
  return `linear-gradient(165deg, hsla(${h}, 0.85) 0%, hsl(222, 47%, 11%) 48%, hsl(222, 40%, 8%) 100%)`;
}

function useReelPreviewMap(reels: MarketingReel[]) {
  const [map, setMap] = useState<Record<string, PreviewPayload>>({});
  const [loading, setLoading] = useState(true);
  const reelsKey = useMemo(() => reels.map((r) => r.permalink).join("|"), [reels]);
  const reelsRef = useRef(reels);
  reelsRef.current = reels;

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      const list = reelsRef.current;
      const entries = await Promise.all(
        list.map(async (r) => {
          if (r.previewVideoSrc || r.posterSrc) {
            return [r.permalink, { thumbnailUrl: null, videoUrl: null } satisfies PreviewPayload] as const;
          }
          try {
            const res = await fetch(`/api/reels/preview?url=${encodeURIComponent(r.permalink)}`);
            const data = (await res.json()) as PreviewPayload;
            return [
              r.permalink,
              { thumbnailUrl: data.thumbnailUrl ?? null, videoUrl: data.videoUrl ?? null },
            ] as const;
          } catch {
            return [r.permalink, { thumbnailUrl: null, videoUrl: null }] as const;
          }
        }),
      );
      if (cancelled) return;
      setMap(Object.fromEntries(entries));
      setLoading(false);
    }
    void run();
    return () => {
      cancelled = true;
    };
  }, [reelsKey]);

  return { previewMap: map, previewsLoading: loading };
}

function ReelMedia({
  reel,
  index,
  preview,
  previewPending,
  displayLabel,
}: {
  reel: MarketingReel;
  index: number;
  preview: PreviewPayload | undefined;
  previewPending: boolean;
  displayLabel: string;
}) {
  const { t } = useLandingI18n();
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const previewAlt = `${t("reels.previewAlt")} — ${displayLabel}`;

  const localVideo = reel.previewVideoSrc;
  const remoteVideo = preview?.videoUrl && !videoFailed ? preview.videoUrl : undefined;
  const poster =
    reel.thumbnailOverrideSrc ||
    reel.posterSrc ||
    preview?.thumbnailUrl ||
    undefined;

  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap || (!localVideo && !remoteVideo)) return;

    const io = new IntersectionObserver(
      (entries) => {
        const [e] = entries;
        if (!e) return;
        if (e.isIntersecting && e.intersectionRatio >= 0.28) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.28, 0.55] },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [localVideo, remoteVideo]);

  useEffect(() => {
    setVideoFailed(false);
  }, [localVideo, remoteVideo]);

  const thumbOnlyUrl =
    !localVideo && !remoteVideo && !videoFailed
      ? reel.thumbnailOverrideSrc || reel.posterSrc || preview?.thumbnailUrl || undefined
      : videoFailed
        ? reel.thumbnailOverrideSrc || reel.posterSrc || preview?.thumbnailUrl || undefined
        : undefined;

  if (videoFailed && thumbOnlyUrl) {
    return (
      <div className="lp-reels-card__media">
        {thumbOnlyUrl.startsWith("/") ? (
          <Image
            src={thumbOnlyUrl}
            alt=""
            fill
            className="lp-reels-card__img"
            sizes="(max-width: 768px) 40vw, 210px"
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element -- CDN */
          <img src={thumbOnlyUrl} alt="" className="lp-reels-card__thumb-img" loading="lazy" />
        )}
      </div>
    );
  }

  if (localVideo || remoteVideo) {
    return (
      <div ref={wrapRef} className="lp-reels-card__media">
        <video
          ref={videoRef}
          className="lp-reels-card__video"
          src={localVideo || remoteVideo}
          poster={poster || undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setVideoFailed(true)}
        />
      </div>
    );
  }

  const staticThumb = reel.thumbnailOverrideSrc || reel.posterSrc;
  if (staticThumb) {
    return (
      <div className="lp-reels-card__media">
        {staticThumb.startsWith("/") ? (
          <Image
            src={staticThumb}
            alt={previewAlt}
            fill
            className="lp-reels-card__img"
            sizes="(max-width: 768px) 40vw, 210px"
            loading="lazy"
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element -- optional external poster URL */
          <img
            src={staticThumb}
            alt={previewAlt}
            className="lp-reels-card__thumb-img"
            loading="lazy"
          />
        )}
      </div>
    );
  }

  if (preview?.thumbnailUrl) {
    return (
      <div className="lp-reels-card__media">
        {/* eslint-disable-next-line @next/next/no-img-element -- Instagram CDN */}
        <img
          src={preview.thumbnailUrl}
          alt=""
          className="lp-reels-card__thumb-img"
          loading="lazy"
        />
      </div>
    );
  }

  if (previewPending) {
    return (
      <div className="lp-reels-card__poster-fallback lp-reels-card__poster-fallback--loading" aria-hidden>
        <span className="lp-reels-card__shimmer" />
      </div>
    );
  }

  return (
    <div
      className="lp-reels-card__poster-fallback"
      style={{ background: posterFallbackGradient(index) }}
      aria-hidden
    >
      <span className="lp-reels-card__poster-noise" />
      <span className="lp-reels-card__poster-hint">{t("reels.posterHint")}</span>
    </div>
  );
}

type ReelCardProps = {
  reel: MarketingReel;
  index: number;
  preview: PreviewPayload | undefined;
  previewPending: boolean;
  isActive: boolean;
  onOpen: () => void;
  displayLabel: string;
};

function ReelCard({ reel, index, preview, previewPending, isActive, onOpen, displayLabel }: ReelCardProps) {
  return (
    <motion.div
      className={`lp-reels-card-wrap${isActive ? " is-active" : ""}`}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: { delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
        }),
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      custom={index}
    >
      <button type="button" className="lp-reels-card" onClick={onOpen}>
        <span className="lp-reels-card__glow" aria-hidden />
        <span className="lp-reels-card__shine" aria-hidden />
        <span className="lp-reels-card__active-ring" aria-hidden />
        <div className="lp-reels-card__frame">
          <ReelMedia
            reel={reel}
            index={index}
            preview={preview}
            previewPending={previewPending}
            displayLabel={displayLabel}
          />
          <div className="lp-reels-card__overlay" />
          <span className="lp-reels-card__label">{displayLabel}</span>
          <span className="lp-reels-card__play-wrap" aria-hidden>
            <PlayIcon className="lp-reels-card__play" />
          </span>
        </div>
      </button>
    </motion.div>
  );
}

export function MarketingReelsShowcase({ reels = DEFAULT_MARKETING_REELS }: { reels?: MarketingReel[] }) {
  const { t, locale } = useLandingI18n();
  const msgRoot = (locale === "ar" ? arMessages : heMessages) as Record<string, unknown>;
  const categories = useMemo(() => getStringArray(msgRoot, "reels.categories"), [msgRoot]);

  const [open, setOpen] = useState<MarketingReel | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { previewMap, previewsLoading } = useReelPreviewMap(reels);

  const close = useCallback(() => setOpen(null), []);

  const openHeadingLabel = open
    ? (() => {
        const idx = reels.findIndex((r) => r.permalink === open.permalink);
        return idx >= 0 ? categories[idx] ?? open.label : open.label;
      })()
    : "";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  useEffect(() => {
    const track = scrollerRef.current;
    if (!track) return;

    const updateActive = () => {
      const rect = track.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const wraps = track.querySelectorAll<HTMLElement>(".lp-reels-card-wrap");
      let best = 0;
      let bestDist = Infinity;
      wraps.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const mid = r.left + r.width / 2;
        const d = Math.abs(mid - centerX);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActiveIndex(best);
    };

    updateActive();
    track.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      track.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [reels.length]);

  const scrollByDir = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".lp-reels-card-wrap");
    const w = card?.offsetWidth ?? 260;
    const gap = 12;
    el.scrollBy({ left: dir * (w + gap), behavior: "smooth" });
  };

  const openEmbedSrc = open
    ? (() => {
        const code = reelShortcodeFromPermalink(open.permalink);
        return code ? `https://www.instagram.com/reel/${code}/embed/?hidecaption=true` : null;
      })()
    : null;

  return (
    <section id="reels" className="lp-section lp-reels" aria-labelledby="lp-reels-heading">
      <div className="lp-reels__ambient" aria-hidden>
        <div className="lp-reels__blob lp-reels__blob--a" />
        <div className="lp-reels__blob lp-reels__blob--b" />
        <div className="lp-reels__ambient-tint" />
        <div className="lp-reels__streak" />
        <div className="lp-reels__particles">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className="lp-reels__particle" />
          ))}
        </div>
        <svg className="lp-reels__arc" viewBox="0 0 1200 100" preserveAspectRatio="none" aria-hidden>
          <path
            d="M0,70 Q400,20 800,60 T1200,40"
            fill="none"
            stroke="url(#lpReelsArc)"
            strokeWidth="1"
            opacity="0.35"
          />
          <defs>
            <linearGradient id="lpReelsArc" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59,130,246,0)" />
              <stop offset="45%" stopColor="rgba(96,165,250,0.4)" />
              <stop offset="55%" stopColor="rgba(212,175,55,0.28)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="lp-container lp-reels__inner">
        <motion.header
          className="lp-reels__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="lp-reels__brand-row">
            <InstagramGlyph className="lp-reels__ig" />
            <p className="lp-reels__eyebrow">{t("reels.eyebrow")}</p>
          </div>
          <h2 id="lp-reels-heading" className="lp-reels__title">
            <span className="lp-reels__title-line1">{t("reels.title1")}</span>
            <span className="lp-reels__title-line2">{t("reels.title2")}</span>
          </h2>
          <p className="lp-reels__subtitle">{t("reels.subtitle")}</p>
          <div className="lp-reels__divider" aria-hidden />
        </motion.header>

        <div className="lp-reels__slider-shell">
          <button
            type="button"
            className="lp-reels__arrow lp-reels__arrow--prev"
            aria-label={t("reels.prev")}
            onClick={() => scrollByDir(-1)}
          />
          <button
            type="button"
            className="lp-reels__arrow lp-reels__arrow--next"
            aria-label={t("reels.next")}
            onClick={() => scrollByDir(1)}
          />

          <div ref={scrollerRef} className="lp-reels__track" tabIndex={0} role="region" aria-label={t("reels.region")}>
            {reels.map((reel, i) => (
              <ReelCard
                key={reel.permalink}
                reel={reel}
                index={i}
                preview={previewMap[reel.permalink]}
                previewPending={previewsLoading && !reel.previewVideoSrc && !reel.posterSrc}
                isActive={i === activeIndex}
                onOpen={() => setOpen(reel)}
                displayLabel={categories[i] ?? reel.label}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key={open.permalink}
            className="lp-reels-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button type="button" className="lp-reels-modal__backdrop" aria-label={t("reels.close")} onClick={close} />
            <motion.div
              className="lp-reels-modal__dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="lp-reels-modal-heading"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <button type="button" className="lp-reels-modal__close" onClick={close} aria-label={t("reels.closeBtn")}>
                ×
              </button>
              <h3 id="lp-reels-modal-heading" className="lp-reels-modal__heading">
                {openHeadingLabel}
              </h3>
              <div className="lp-reels-modal__frame">
                {openEmbedSrc ? (
                  <iframe
                    title={t("reels.iframeTitle")}
                    src={openEmbedSrc}
                    className="lp-reels-modal__iframe"
                    allow="encrypted-media; picture-in-picture"
                    loading="lazy"
                  />
                ) : (
                  <p className="lp-reels-modal__fallback">{t("reels.fallbackEmbed")}</p>
                )}
              </div>
              <a
                href={open.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="lp-reels-modal__cta lp-btn lp-btn--gold lp-btn-pricing-gradient"
              >
                {t("reels.openInstagram")}
              </a>
              <p className="lp-reels-modal__hint">{t("reels.hint")}</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
