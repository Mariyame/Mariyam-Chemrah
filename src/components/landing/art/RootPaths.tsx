
import { useId } from "react";

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


export function RootPaths({ glow, pulse }: { glow?: boolean; pulse?: boolean }) {
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