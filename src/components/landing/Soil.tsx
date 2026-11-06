"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import type { Path } from "@/lib/choice";
import { Fold } from "./Fold";
import {useTranslations} from "next-intl";

export type Hover = "sky" | "soil" | null;

/* ---------------------------------------------------------------------------
   Data — same values as the landing design (viewBox 0 0 1440 600)
   --------------------------------------------------------------------------- */
const ROOTS = [
  { d: "M720 0 C720 80 700 140 640 200 C590 250 520 280 430 300", w: 3, delay: 0 },
  { d: "M720 0 C722 90 760 150 830 200 C900 250 990 270 1080 330", w: 3, delay: 0 },
  { d: "M720 0 C718 120 710 220 720 340 C726 420 700 480 690 580", w: 3.5, delay: 0 },
  { d: "M640 200 C600 260 560 340 470 420", w: 2, delay: 150 },
  { d: "M830 200 C860 270 900 330 990 420", w: 2, delay: 150 },
  { d: "M430 300 C350 320 260 300 160 340", w: 2, delay: 250 },
  { d: "M1080 330 C1170 350 1250 330 1340 380", w: 2, delay: 250 },
  { d: "M720 340 C760 380 820 420 860 500", w: 1.6, delay: 300 },
  { d: "M720 340 C680 390 620 420 590 500", w: 1.6, delay: 300 },
  { d: "M470 420 C420 460 380 520 300 580", w: 1.4, delay: 400 },
  { d: "M990 420 C1040 470 1080 520 1160 580", w: 1.4, delay: 400 },
  { d: "M160 340 C110 360 70 400 30 470", w: 1.2, delay: 500 },
  { d: "M1340 380 C1380 400 1410 440 1430 500", w: 1.2, delay: 500 },
  { d: "M560 340 C520 360 470 360 420 380", w: 1, delay: 450 },
] as const;

const BURIED = [
  { t: "Laravel", x: "9%", y: "22%", s: 22, r: -6 },
  { t: "Symfony", x: "22%", y: "58%", s: 18, r: 4 },
  { t: "React", x: "38%", y: "30%", s: 26, r: -3 },
  { t: "Next.js", x: "31%", y: "82%", s: 16, r: 8 },
  { t: "TypeScript", x: "52%", y: "70%", s: 20, r: -5 },
  { t: "REST APIs", x: "62%", y: "20%", s: 17, r: 3 },
  { t: "Docker", x: "74%", y: "86%", s: 22, r: -8 },
  { t: "MySQL", x: "86%", y: "62%", s: 18, r: 6 },
  { t: "MongoDB", x: "12%", y: "86%", s: 17, r: -2 },
  { t: "Redis", x: "45%", y: "48%", s: 15, r: 10 },
  { t: "GCP", x: "92%", y: "30%", s: 20, r: -4 },
  { t: "webhooks()", x: "66%", y: "50%", s: 15, r: 5 },
] as const;

const FLIES = [
  { x: "6%", y: "30%", dur: 3, delay: 0 }, { x: "14%", y: "64%", dur: 4, delay: 1.2 },
  { x: "27%", y: "44%", dur: 3.5, delay: 0.4 }, { x: "36%", y: "78%", dur: 5, delay: 2 },
  { x: "48%", y: "58%", dur: 3.2, delay: 1.6 }, { x: "61%", y: "82%", dur: 4.4, delay: 0.8 },
  { x: "70%", y: "66%", dur: 3.8, delay: 2.4 }, { x: "82%", y: "80%", dur: 4.6, delay: 0.2 },
  { x: "90%", y: "48%", dur: 3.4, delay: 1.4 }, { x: "96%", y: "72%", dur: 5.2, delay: 3 },
] as const;

/* ---------------------------------------------------------------------------
   Lantern — writes --lx / --ly straight to the DOM (no React re-render per move)
   --------------------------------------------------------------------------- */
function useLantern<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--lx", `${e.clientX - r.left}px`);
        el.style.setProperty("--ly", `${e.clientY - r.top}px`);
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.setProperty("--lx", "-999px");
      el.style.setProperty("--ly", "-999px");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  return ref;
}

/* One set of roots, drawn twice: dim (always) and glowing (inside the lantern) */
function RootPaths({ glow, pulse }: { glow?: boolean; pulse?: boolean }) {
  const filterId = useId();
  return (
    <svg
      viewBox="0 0 1440 600"
      preserveAspectRatio="xMidYMin slice"
      className="absolute inset-0 size-full"
      aria-hidden="true"
    >
      {glow && (
        <defs>
          {/* SVG filter glow: renders the same on iOS Safari, unlike CSS drop-shadow on paths */}
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}
      <g filter={glow ? `url(#${filterId})` : undefined}>
        {ROOTS.map((r, i) => (
          <path
            key={i}
            d={r.d}
            pathLength={100}
            fill="none"
            strokeWidth={glow ? r.w + 0.4 : r.w}
            strokeLinecap="round"
            className={`${glow ? "stroke-glow" : "stroke-[#24382C]"} transition-[stroke-dashoffset] duration-[1400ms] ease-grow ${
              pulse ? "animate-root-pulse" : ""
            }`}
            style={{
              strokeDasharray: 100,
              strokeDashoffset: "var(--root-offset)",
              transitionDelay: `${r.delay}ms`,
              // touch: each root pulses in turn (0, .6s, 1.2s …)
              animationDelay: pulse ? `${(i * 0.6) % 3.6}s` : undefined,
            }}
          />
        ))}
      </g>
    </svg>
  );
}

function BuriedWords({ glow, reveal }: { glow?: boolean; reveal?: boolean }) {
  return BURIED.map((b, i) => (
    <span
      key={b.t}
      aria-hidden="true"
      className={`absolute font-mono ${glow ? "text-glow" : "text-[#17241D]"} ${
        reveal ? "animate-word-reveal opacity-0" : ""
      } ${i % 3 !== 0 ? "max-sm:hidden" : ""}`}
      style={{
        left: b.x,
        top: b.y,
        fontSize: b.s,
        transform: `rotate(${b.r}deg)`,
        // touch: words surface one after another
        animationDelay: reveal ? `${(i / 3) * 2}s` : undefined,
      }}
    >
      {b.t}
    </span>
  ));
}

/* True on touch screens (no hover) — they get the autoplay version */
function useNoHover() {
  const [noHover, setNoHover] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const update = () => setNoHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return noHover;
}

/* ---------------------------------------------------------------------------
   <Soil> — the "below ground" half. Parent owns the hover state.
   --------------------------------------------------------------------------- */
export function Soil({
  hover,
  onHover,
  onChoose,
  grow,
}: {
  hover: Hover;
  onHover: (h: Hover) => void;
  onChoose: (path: Path, e: React.MouseEvent<HTMLAnchorElement>) => void;
  grow: number; // flex-grow from the parent (e.g. 0.68 | 1 | 1.32)
}) {
  const lantern = useLantern<HTMLAnchorElement>();
  const collapsed = hover === "soil";
   const t = useTranslations('Landing.soil');  
  // Only these three values change on hover — everything else is CSS.
  const vars = {
    "--root-offset": hover === "soil" ? 0 : hover === "sky" ? 88 : 60,
    "--lr": hover === "soil" ? "210px" : "0px",
    flexGrow: grow,
  } as CSSProperties;

  return (
    <Link
      ref={lantern}
      href="/hire"
      onClick={(e) => onChoose("hire", e)}
      data-theme="hire"
      aria-label="I'm hiring an engineer — open the engineering portfolio"
      onPointerEnter={() => onHover("soil")}
      onPointerLeave={() => onHover(null)}
      onFocus={() => onHover("soil")}
      onBlur={() => onHover(null)}
      style={vars}
      className="relative flex min-h-0 basis-0 cursor-crosshair items-start overflow-hidden bg-night-soil text-mist no-underline transition-[flex-grow] duration-800 ease-grow hover:text-mist"
    >
      {/* 1 · dim layer: always visible, barely */}
      <RootPaths />
      <BuriedWords />

      {/* 2 · glowing layer: revealed only inside the lantern circle */}
      <div aria-hidden="true" className="lantern pointer-events-none absolute inset-0 [@media(hover:none)]:mask-image:none [@media(hover:none)]:animate-twinkle">
        <RootPaths glow />
        <BuriedWords glow />
      </div>

      {/* 3 · fireflies */}
      {FLIES.map((f, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`firefly ${i % 3 !== 0 ? "max-sm:hidden" : ""}`}
          style={{ left: f.x, top: f.y, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s` }}
        />
      ))}

      {/* 4 · content */}
      <div className="container-page pointer-events-none relative flex justify-end pt-24">
        <div className="flex max-w-140 flex-col items-end gap-4 text-end">
          <p className="eyebrow text-glow text-shadow:none">
            <span className="sm:hidden">{t('eyebrow.mobile')}</span>
            <span className="hidden sm:inline">{t('eyebrow.desktop')}</span>
          </p>
          <p className="font-display text-h1 font-semibold">
            {t.rich("title", {
              accent: (chunks) => (
                <span className="accent-word text-moss">{chunks}</span>
              ),
            })}
          </p>
          <span className="btn-highlight bg-glow">{t('cta')}</span>
        </div>
      </div>
      <p aria-hidden="true" 
        className={`pointer-events-none absolute bottom-7 inset-s-gutter font-mono text-sm text-mist-3 transition-opacity duration-500 max-sm:hidden ${
          collapsed ? "opacity-0" : "opacity-100"
        }`}
      >
       {t('hint')}
      </p>
    </Link>
  );
}
