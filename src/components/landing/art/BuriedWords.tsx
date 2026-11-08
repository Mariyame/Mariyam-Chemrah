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


export function BuriedWords({ glow, reveal }: { glow?: boolean; reveal?: boolean }) {
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