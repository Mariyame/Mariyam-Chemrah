"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import type { Path } from "@/lib/choice";
import {useTranslations} from 'next-intl';

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

const FLIES_MOBILE = [
  { x: "10%", y: "80%", dur: 4,   delay: 0   },
  { x: "48%", y: "90%", dur: 5,   delay: 1.6 },
  { x: "86%", y: "76%", dur: 4.4, delay: 0.8 },
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
      }`}
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

const M_ROOTS = [
  { d: "M195 0 C195 60 170 110 120 150 C80 180 40 190 0 230", w: 2.4, delay: 0 },
  { d: "M195 0 C196 70 230 120 280 160 C320 190 360 200 390 240", w: 2.4, delay: 0.6 },
  { d: "M195 0 C194 100 190 200 196 300 C200 350 190 390 186 420", w: 2.8, delay: 1.2 },
  { d: "M120 150 C100 200 80 260 30 330", w: 1.6, delay: 1.8 },
  { d: "M280 160 C300 220 330 270 370 340", w: 1.6, delay: 2.4 },
  { d: "M196 300 C230 330 260 360 280 420", w: 1.3, delay: 3 },
  { d: "M196 300 C160 330 130 370 110 420", w: 1.3, delay: 0.3 },
  { d: "M30 330 C20 360 10 390 0 410", w: 1, delay: 0.9 },
  { d: "M370 340 C380 370 386 390 390 410", w: 1, delay: 1.5 },
] as const;

const M_BURIED = [
  { t: "Laravel", x: "10%", y: "74%", r: -6, delay: 0 },
  { t: "React", x: "64%", y: "82%", r: 4, delay: 2 },
  { t: "TypeScript", x: "28%", y: "90%", r: -3, delay: 4 },
] as const;

const M_FLIES = [
  { x: "10%", y: "80%", dur: 4, delay: 0 },
  { x: "48%", y: "90%", dur: 5, delay: 1.6 },
  { x: "86%", y: "76%", dur: 4.4, delay: 0.8 },
] as const;

const MOBILE_KEYFRAMES = `
@keyframes mc-root-glow { 0%, 100% { opacity: .05; } 50% { opacity: .45; } }
@keyframes mc-word-reveal { 0%, 100% { opacity: 0; } 35%, 65% { opacity: 1; } }
@keyframes mc-firefly { 0%, 100% { opacity: .08; } 50% { opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .mc-soil-m * { animation: none !important; }
  .mc-soil-m .mc-root { opacity: .3 !important; }
}`;


function MobileSoilArt() {
    const glowId = useId();

  return (
    <div aria-hidden="true" className="mc-soil-m pointer-events-none absolute inset-0 sm:hidden">
      <style>{MOBILE_KEYFRAMES}</style>

      <svg viewBox="0 0 390 420" className="absolute inset-0 size-full">
        <defs>
          {/* = CSS drop-shadow(0 0 5px #8EE08A), but also renders on iOS Safari */}
          <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* dim roots — always there */}
        {M_ROOTS.map((r, i) => (
          <path key={`d${i}`} d={r.d} fill="none" stroke="#24382C" strokeWidth={r.w} strokeLinecap="round" />
        ))}

        {/* glowing roots — each one fades 5% → 45% → 5% over 4s on its own delay,
            so the light appears to travel slowly through the branches */}
        <g filter={`url(#${glowId})`}>
          {M_ROOTS.map((r, i) => (
            <path
              key={`g${i}`}
              className="mc-root"
              d={r.d}
              fill="none"
              stroke="#8EE08A"
              strokeWidth={r.w}
              strokeLinecap="round"
              style={{ opacity: 0.05, animation: `mc-root-glow 4s ease-in-out ${r.delay}s infinite` }}
            />
          ))}
        </g>
      </svg>

      {/* buried words surface one after another */}
      {M_BURIED.map((b) => (
        <span
          key={b.t}
          className="absolute font-mono text-sm"
          style={{
            left: b.x,
            top: b.y,
            color: "#8EE08A",
            textShadow: "0 0 10px rgb(142 224 138 / .8)",
            transform: `rotate(${b.r}deg)`,
            opacity: 0,
            animation: `mc-word-reveal 6s ease-in-out ${b.delay}s infinite`,
          }}
        >
          {b.t}
        </span>
      ))}

      {/* fireflies */}
      {M_FLIES.map((f, i) => (
        <span
          key={i}
          className="absolute size-1 rounded-full"
          style={{
            left: f.x,
            top: f.y,
            background: "#C9E26A",
            boxShadow: "0 0 8px 3px rgb(201 226 106 / .7)",
            animation: `mc-firefly ${f.dur}s ease-in-out ${f.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
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
  const t = useTranslations('Landing.soil');
  const lantern = useLantern<HTMLAnchorElement>();
  const noHover = useNoHover();
  const collapsed = hover === "sky";

  // Only these values change on hover — everything else is CSS.
  // Touch screens can't hover, so their roots are fully grown from the start.
  const vars = {
    "--root-offset": noHover || hover === "soil" ? 0 : hover === "sky" ? 88 : 60,
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
     <div aria-hidden="true" className="pointer-events-none absolute inset-0 max-sm:hidden">
        {/* 1 · dim layer: always visible, barely */}
        <RootPaths />
        <BuriedWords />

        {/* 2 · glowing layer
            mouse: revealed only inside the lantern circle (mask)
            touch: no mask — roots pulse in turn and words surface one by one */}
        <div className={`absolute inset-0 ${noHover ? "" : "lantern"}`}>
          <RootPaths glow pulse={noHover} />
          <BuriedWords glow reveal={noHover} />
        </div>

        {/* 3 · fireflies */}
        {FLIES.map((f, i) => (
          <span
            key={i}
            className="firefly max-sm:hidden"
            style={{ left: f.x, top: f.y, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s` }}
          />
        ))}
      </div>
      

      {/* ===== Phone art (< 640px) — identical to the canvas mobile design ===== */}
      <MobileSoilArt />

      {/* 3 · fireflies */}
      {FLIES_MOBILE.map((f, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="firefly size-1 sm:hidden"
          style={{ left: f.x, top: f.y, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s` }}
        />
      ))}

      {/* 4 · content */}
      <div className={`container-page pointer-events-none relative flex justify-end transition-[padding] duration-800 ease-grow max-sm:px-6 ${
          collapsed ? "pt-14" : "pt-24 max-sm:pt-22"
        }`}>
        <div className="flex max-w-140 flex-col items-end gap-4 text-end">
        <p className="eyebrow text-glow text-shadow:none max-sm:text-[11px] max-sm:tracking-[0.12em]">
          <span className="sm:hidden">{t("eyebrow.mobile")}</span>
          <span className="hidden sm:inline">{t("eyebrow.desktop")}</span>
        </p>
          <p className="font-display text-h1 font-semibold">
            {t.rich("title", {
              accent: (chunks) => (
                <span className="accent-word text-glow">{chunks}</span>
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
