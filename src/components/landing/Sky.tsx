"use client";


import Link from "next/link";
import type { CSSProperties, SVGProps } from "react";
import type { Hover } from "./Soil";
import { Fold } from "./Fold";
import { Sprout } from "./art/Sprout";
import type { Path } from "@/lib/choice";
import {useTranslations} from 'next-intl';


const SEEDS = [
  { x: "8%", y: "78%", dur: 9, delay: 0 },
  { x: "18%", y: "88%", dur: 11, delay: 2 },
  { x: "30%", y: "70%", dur: 10, delay: 4.5 },
  { x: "42%", y: "90%", dur: 12, delay: 1 },
  { x: "58%", y: "82%", dur: 9.5, delay: 3 },
  { x: "66%", y: "92%", dur: 13, delay: 6 },
  { x: "74%", y: "76%", dur: 10.5, delay: 0.5 },
  { x: "84%", y: "88%", dur: 11.5, delay: 5 },
  { x: "92%", y: "80%", dur: 9, delay: 7 },
] as const;

const STATE = {
  sky:  { sun: "10%", stem: 0,  a: 1,   b: 1,    c: 1 },
  idle: { sun: "22%", stem: 42, a: 0.7, b: 0.45, c: 0 },
  soil: { sun: "46%", stem: 80, a: 0,   b: 0,    c: 0 },
} as const;


function Seed(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="22" height="26" viewBox="0 0 22 26" fill="none" aria-hidden="true" {...props}>
      <path d="M11 26 V10" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M11 10 L3 3 M11 10 L7 1 M11 10 L11 0 M11 10 L15 1 M11 10 L19 3"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Sky({
  hover,
  onHover,
  onChoose,
  grow,
}: {
  hover: Hover;
  onHover: (h: Hover) => void;
  onChoose: (path: Path, e: React.MouseEvent<HTMLAnchorElement>) => void;
  grow: number; 
}) {
  const s = STATE[hover ?? "idle"];
  const collapsed = hover === "soil";
  const t = useTranslations('Landing.sky');
  const vars = {
    "--sun-top": s.sun,
    "--stem-offset": s.stem,
    "--leaf-a": s.a,
    "--leaf-b": s.b,
    "--leaf-c": s.c,
    flexGrow: grow,
  } as CSSProperties;

  return (
    <Link
      href="/work"
      onClick={(e) => onChoose("work", e)}
      data-theme="work"
      aria-label="I have an idea to grow — open the freelance portfolio"
      onPointerEnter={() => onHover("sky")}
      onPointerLeave={() => onHover(null)}
      onFocus={() => onHover("sky")}
      onBlur={() => onHover(null)}
      style={vars}
      className="relative flex min-h-0 basis-0 items-end overflow-hidden bg-sage-paper text-forest-ink no-underline transition-[flex-grow] duration-800 ease-grow hover:text-forest-ink"
    >
     
      <div
        aria-hidden="true"
        className="sun absolute inset-e-[14%] size-33 transition-[top] duration-900 ease-grow max-sm:size-13 max-sm:shadow-[0_0_0_10px_rgb(201_226_106/.28),0_0_0_22px_rgb(201_226_106/.12)]"
        style={{ top: "var(--sun-top)" }}
      />

      {SEEDS.map((p, i) => (
        <Seed
          key={i}
          className={`pointer-events-none absolute text-moss animate-drift ${i > 2 ? "max-sm:hidden" : ""}`}
          style={{ left: p.x, top: p.y, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }}
        />
      ))}

      <Sprout />

      {/* content */}
      <div
        className={`container-page pointer-events-none relative transition-[padding] duration-800 ease-grow ${
          collapsed ? "pb-14" : "pb-[clamp(3rem,6vh,6rem)] max-sm:pb-12"
        }`}
      >
        <div className="flex max-w-140 flex-col">
          <Fold open={!collapsed} className="pb-4">
            <p className="eyebrow text-moss max-sm:text-[11px] max-sm:tracking-[0.12em]">
              <span className="sm:hidden">{t("eyebrow.mobile")}</span>
              <span className="hidden sm:inline">{t("eyebrow.desktop")}</span>
            </p>
          </Fold>

          <p
            className={`origin-bottom-left font-display text-h1 font-semibold transition-transform duration-800 ease-grow max-sm:text-[36px] max-sm:leading-none rtl:origin-bottom-right ${
              collapsed ? "scale-[0.78]" : "scale-100"
            }`}
          >
            {t.rich("title", {
              accent: (chunks) => <span className="accent-word text-moss">{chunks}</span>,
            })}
          </p>

          <Fold open={!collapsed} className="pt-2">
            <div className="flex flex-wrap items-center gap-3.5">
              <span className="btn bg-forest-ink text-paper max-sm:min-h-10 max-sm:gap-1.5 max-sm:px-4 max-sm:py-2.5 max-sm:text-sm">
                {t("cta")}
              </span>
              <span className="text-[15px] text-ink-muted max-sm:hidden">{t("services")}</span>
            </div>
          </Fold>
        </div>
      </div>
    </Link>
  );
}
