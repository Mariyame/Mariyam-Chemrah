"use client";

import { useState } from "react";
import { LogoMark } from "./Logo";

const PETALS = [
  { cx: 95, cy: 28, rx: 16, ry: 30, fill: "var(--color-lichen)" },
  { cx: 95, cy: 162, rx: 16, ry: 30, fill: "var(--color-lichen)" },
  { cx: 28, cy: 95, rx: 30, ry: 16, fill: "var(--color-lichen)" },
  { cx: 162, cy: 95, rx: 30, ry: 16, fill: "var(--color-lichen)" },
  { cx: 48, cy: 48, rx: 15, ry: 28, fill: "var(--color-glow)", rot: -45 },
  { cx: 142, cy: 142, rx: 15, ry: 28, fill: "var(--color-glow)", rot: -45 },
  { cx: 142, cy: 48, rx: 15, ry: 28, fill: "var(--color-glow)", rot: 45 },
  { cx: 48, cy: 142, rx: 15, ry: 28, fill: "var(--color-glow)", rot: 45 },
];


export function Seed() {
  const [bloomed, setBloomed] = useState(false);

  return (
    <div className="absolute left-1/2 top-0 size-0">
      {bloomed && (
        <svg
          aria-hidden="true"
          viewBox="0 0 190 190"
          className="absolute -left-23.75 -top-23.75 size-47.5 animate-[spin_18s_linear_infinite]"
        >
          <g className="origin-center animate-pop">
            {PETALS.map((p, i) => (
              <ellipse
                key={i}
                cx={p.cx}
                cy={p.cy}
                rx={p.rx}
                ry={p.ry}
                fill={p.fill}
                transform={p.rot ? `rotate(${p.rot} ${p.cx} ${p.cy})` : undefined}
              />
            ))}
          </g>
        </svg>
      )}

      <button
        type="button"
        onClick={() => setBloomed((b) => !b)}
        aria-pressed={bloomed}
        aria-label={bloomed ? "Close the flower" : "Plant the seed"}
        className="pointer-events-auto absolute -left-11.5 -top-11.5 grid size-23 cursor-pointer place-items-center rounded-full border-[3px] border-soil bg-paper p-0 text-forest-ink shadow-seed animate-[float_3.2s_ease-in-out_infinite] max-sm:-left-8.5 max-sm:-top-8.5 max-sm:size-8.5"
      >
        <LogoMark size={62} className="max-sm:size-11.5" />
      </button>

      <p
        role="status"
        aria-live="polite"
        className="absolute -left-42.5 top-26 w-85 text-center font-mono text-[13px] text-lichen"
      >
        {bloomed ? "You found the seed. Every great product starts with one." : ""}
      </p>
    </div>
  );
}
