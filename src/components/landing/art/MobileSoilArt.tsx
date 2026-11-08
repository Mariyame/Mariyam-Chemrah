import { useId } from "react";

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


export function MobileSoilArt() {
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