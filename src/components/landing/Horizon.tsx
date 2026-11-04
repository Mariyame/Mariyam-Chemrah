import { Seed } from "./Seed";

export function Horizon() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 z-10 h-0 transition-[top] duration-800 ease-grow"
      style={{ top: "var(--horizon, 50%)" }}
    >
      <div aria-hidden="true" className="soil-line absolute inset-x-0 -top-[3px]" />

      <p
        aria-hidden="true"
        className="absolute -top-8 inset-s-gutter font-mono text-[13px] text-ink-muted max-sm:-top-6 max-sm:text-[11px]"
      >
        Hello, I’m Mariyam — full-stack engineer.
      </p>
      <p
        aria-hidden="true"
        className="absolute top-3.5 inset-e-gutter font-mono text-[13px] text-mist-3 max-sm:top-2.5 max-sm:text-[11px]"
      >
        Which way are you growing?
      </p>

      <Seed />
    </div>
  );
}
