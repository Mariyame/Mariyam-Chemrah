"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Path } from "@/lib/choice";
import {useTranslations} from 'next-intl';
import { RootPaths } from "./art/RootPaths";
import { BuriedWords } from "./art/BuriedWords";
import { MobileSoilArt } from "./art/MobileSoilArt";

export type Hover = "sky" | "soil" | null;

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

        <RootPaths />
        <BuriedWords />

        <div className={`absolute inset-0 ${noHover ? "" : "lantern"}`}>
          <RootPaths glow pulse={noHover} />
          <BuriedWords glow reveal={noHover} />
        </div>

        {FLIES.map((f, i) => (
          <span
            key={i}
            className="firefly max-sm:hidden"
            style={{ left: f.x, top: f.y, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s` }}
          />
        ))}
      </div>
      

      <MobileSoilArt />

      {FLIES_MOBILE.map((f, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="firefly size-1 sm:hidden"
          style={{ left: f.x, top: f.y, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s` }}
        />
      ))}

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
          <span className="btn-highlight bg-glow max-sm:min-h-10 max-sm:gap-1.5 max-sm:px-4 max-sm:py-2.5 max-sm:text-sm">
            {t("cta")} 
          </span>
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
