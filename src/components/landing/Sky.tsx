"use client";

import Link from "next/link";
import type { CSSProperties, SVGProps } from "react";
import type { Hover } from "./Soil";
import type { Path } from "@/lib/choice";


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

const LEAVES = [
  { d: "M110 210 C84 196 58 200 34 220 C60 230 90 226 110 210 Z", origin: "110px 210px", scale: "--leaf-a", delay: 100 },
  { d: "M112 160 C138 140 164 142 188 158 C164 172 136 172 112 160 Z", origin: "112px 160px", scale: "--leaf-b", delay: 250 },
  { d: "M114 100 C92 84 70 84 52 96 C72 110 96 110 114 100 Z", origin: "114px 100px", scale: "--leaf-c", delay: 400 },
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


function Sprout() {
  const grow = "transform 0.8s var(--ease-spring)";
  return (
    <svg
      width="220"
      height="280"
      viewBox="0 0 220 280"
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-1/2 -ms-27.5 overflow-visible"
    >
      {/* stem: drawn with pathLength + dashoffset */}
      <path
        d="M110 280 C110 230 104 180 112 120 C116 90 112 60 118 30"
        pathLength={100}
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        className="stroke-moss transition-[stroke-dashoffset] duration-1000 ease-grow"
        style={{ strokeDasharray: 100, strokeDashoffset: "var(--stem-offset)" }}
      />
      {LEAVES.map((l) => (
        <path
          key={l.d}
          d={l.d}
          className="fill-moss"
          style={{
            transformBox: "view-box",
            transformOrigin: l.origin,
            transform: `scale(var(${l.scale}))`,
            transition: grow,
            transitionDelay: `${l.delay}ms`,
          }}
        />
      ))}
      {/* top bud in lichen, appears last */}
      <path
        d="M118 30 C126 12 142 4 162 4 C156 22 140 34 118 30 Z"
        className="fill-lichen stroke-moss"
        strokeWidth="2"
        style={{
          transformBox: "view-box",
          transformOrigin: "118px 30px",
          transform: "scale(var(--leaf-c))",
          transition: grow,
          transitionDelay: "550ms",
        }}
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
        className="sun absolute inset-e-[14%] size-33 transition-[top] duration-900 ease-grow"
        style={{ top: "var(--sun-top)" }}
      />

      {SEEDS.map((p, i) => (
        <Seed
          key={i}
          className="pointer-events-none absolute text-moss animate-drift"
          style={{ left: p.x, top: p.y, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }}
        />
      ))}

      <Sprout />

      {/* content */}
      <div className="container-page pointer-events-none relative pb-24">
        <div className="flex max-w-140 flex-col gap-4">
          <p className="eyebrow text-moss">Above ground · founders, businesses, teams</p>
          <p className="font-display text-h1 font-semibold">
            I have an idea to <span className="accent-word text-moss">grow.</span>
          </p>
          <div className="flex flex-wrap items-center gap-3.5">
            <span className="btn bg-forest-ink text-paper">Let’s build it together →</span>
            <span className="text-[15px] text-ink-muted">websites · SaaS · APIs · e-commerce</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
