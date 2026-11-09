"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";

const PETALS = [
  [95, 28, 16, 30, "lichen", 0], [95, 162, 16, 30, "lichen", 0], [28, 95, 30, 16, "lichen", 0], [162, 95, 30, 16, "lichen", 0],
  [48, 48, 15, 28, "glow", -45], [142, 142, 15, 28, "glow", -45], [142, 48, 15, 28, "glow", 45], [48, 142, 15, 28, "glow", 45],
] as const;

export function Seed() {
  const t = useTranslations("Landing.seed");
  const [bloomed, setBloomed] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!bloomed) return setToast(false);
    setToast(true);
    const id = setTimeout(() => setToast(false), 4200);
    return () => clearTimeout(id);
  }, [bloomed]);

  return (
    <div className="absolute left-1/2 top-0 size-0">
      {bloomed && (
        <svg aria-hidden="true" viewBox="0 0 190 190" className="absolute -left-23.75 -top-23.75 size-47.5 animate-[spin_18s_linear_infinite] max-sm:-left-17.5 max-sm:-top-17.5 max-sm:size-35">
          <g className="origin-center animate-pop">
            {PETALS.map(([cx, cy, rx, ry, c, rot], i) => (
              <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill={`var(--color-${c})`} transform={rot ? `rotate(${rot} ${cx} ${cy})` : undefined} />
            ))}
          </g>
        </svg>
      )}
      <button
        type="button"
        onClick={() => setBloomed((b) => !b)}
        aria-pressed={bloomed}
        aria-label={bloomed ? t("close") : t("plant")}
        className="pointer-events-auto absolute -left-11.5 -top-11.5 grid size-23 cursor-pointer place-items-center rounded-full border-[3px] border-soil bg-paper p-0 text-forest-ink shadow-seed animate-[float_3.2s_ease-in-out_infinite] max-sm:-left-8.5 max-sm:-top-8.5 max-sm:size-17"
      >
        <LogoMark size={62} className="max-sm:size-11.5" />
      </button>
      <p
        role="status"
        aria-live="polite"
        className={`pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 text-center font-mono transition-all duration-500
          top-[104px] w-[340px] text-[13px] text-lichen
          max-sm:top-[52px] max-sm:w-[min(80vw,280px)] max-sm:rounded-2xl max-sm:border max-sm:border-line-dark-2 max-sm:bg-night-soil/90 max-sm:px-4 max-sm:py-2.5 max-sm:text-[12px] max-sm:leading-snug max-sm:shadow-lg max-sm:backdrop-blur-md
          ${toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 max-sm:invisible"}`}
      >
        {bloomed ? t("found") : ""}
      </p>
    </div>
  );
}
