"use client";

import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import { PORTFOLIO_VIDEOS, portfolioVideoSrc, type PortfolioVideo } from "@/lib/portfolio-videos";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function useDragScroll(trackRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let pointerId: number | null = null;
    let startX = 0;
    let scrollStart = 0;
    let moved = false;

    const endDrag = () => {
      pointerId = null;
      el.classList.remove("is-dragging");
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      pointerId = e.pointerId;
      startX = e.clientX;
      scrollStart = el.scrollLeft;
      moved = false;
      el.setPointerCapture(e.pointerId);
      el.classList.add("is-dragging");
    };

    const onPointerMove = (e: PointerEvent) => {
      if (pointerId === null || e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = scrollStart - dx;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (pointerId === null || e.pointerId !== pointerId) return;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
      endDrag();
    };

    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("click", onClick, true);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("click", onClick, true);
    };
  }, [trackRef]);
}

function PortfolioVideoCard({
  item,
  index,
  src,
  title,
  isActive,
  onOpen,
}: {
  item: PortfolioVideo;
  index: number;
  src: string;
  title: string;
  isActive: boolean;
  onOpen: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap) return;

    const io = new IntersectionObserver(
      (entries) => {
        const [e] = entries;
        if (!e) return;
        if (e.isIntersecting && e.intersectionRatio >= 0.35) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.35, 0.6] },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [src]);

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
        <div className="lp-reels-card__frame" ref={wrapRef}>
          <div className="lp-reels-card__media">
            <video
              ref={videoRef}
              className="lp-reels-card__video"
              src={src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
          <div className="lp-reels-card__overlay" aria-hidden />
          <span className="lp-reels-card__badge">{title}</span>
          <span className="lp-reels-card__play-wrap" aria-hidden>
            <PlayIcon className="lp-reels-card__play" />
          </span>
        </div>
      </button>
    </motion.div>
  );
}

export function MarketingReelsShowcase() {
  const { t } = useLandingI18n();
  const videos = PORTFOLIO_VIDEOS;

  const [open, setOpen] = useState<PortfolioVideo | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useDragScroll(scrollerRef);

  const close = useCallback(() => setOpen(null), []);

  const openTitle = open ? t(`reels.videos.${open.titleKey}.title`) : "";
  const openSrc = open ? portfolioVideoSrc(open.file) : "";

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
    if (open && modalVideoRef.current) {
      void modalVideoRef.current.play().catch(() => {});
    }
  }, [open, openSrc]);

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
  }, [videos.length]);

  const scrollByDir = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".lp-reels-card-wrap");
    const w = card?.offsetWidth ?? 260;
    el.scrollBy({ left: dir * (w + 12), behavior: "smooth" });
  };

  return (
    <section id="reels" className="lp-section lp-reels lp-reels--portfolio" aria-labelledby="lp-reels-heading">
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
      </div>

      <div className="lp-container lp-reels__inner">
        <motion.header
          className="lp-reels__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="lp-reels__eyebrow">{t("reels.eyebrow")}</p>
          <h2 id="lp-reels-heading" className="lp-reels__title lp-reels__title--single">
            {t("reels.title")}
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

          <div
            ref={scrollerRef}
            className="lp-reels__track lp-reels__track--draggable"
            tabIndex={0}
            role="region"
            aria-label={t("reels.region")}
          >
            {videos.map((item, i) => (
              <PortfolioVideoCard
                key={item.id}
                item={item}
                index={i}
                src={portfolioVideoSrc(item.file)}
                title={t(`reels.videos.${item.titleKey}.title`)}
                isActive={i === activeIndex}
                onOpen={() => setOpen(item)}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key={open.id}
            className="lp-reels-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button type="button" className="lp-reels-modal__backdrop" aria-label={t("reels.close")} onClick={close} />
            <motion.div
              className="lp-reels-modal__dialog lp-reels-modal__dialog--video"
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
                {openTitle}
              </h3>
              <div className="lp-reels-modal__frame lp-reels-modal__frame--native">
                <video
                  ref={modalVideoRef}
                  className="lp-reels-modal__video"
                  src={openSrc}
                  controls
                  playsInline
                  preload="auto"
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
