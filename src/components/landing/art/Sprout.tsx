const LEAVES = [
  { d: "M110 210 C84 196 58 200 34 220 C60 230 90 226 110 210 Z", origin: "110px 210px", scale: "--leaf-a", delay: 100 },
  { d: "M112 160 C138 140 164 142 188 158 C164 172 136 172 112 160 Z", origin: "112px 160px", scale: "--leaf-b", delay: 250 },
  { d: "M114 100 C92 84 70 84 52 96 C72 110 96 110 114 100 Z", origin: "114px 100px", scale: "--leaf-c", delay: 400 },
] as const;

export function Sprout() {
  const grow = "transform 0.8s var(--ease-spring)";
  return (
    <svg
      width="220"
      height="280"
      viewBox="0 0 220 280"
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-1/2 -ms-27.5 overflow-visible max-sm:hidden"
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