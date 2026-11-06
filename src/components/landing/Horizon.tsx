import { Seed } from "./Seed";
import { useTranslations } from "next-intl";

export function Horizon() {
  const t = useTranslations("Landing.horizon");
  return (
    <div
      className="pointer-events-none absolute inset-x-0 z-10 h-0 transition-[top] duration-800 ease-grow"
      style={{ top: "var(--horizon, 50%)" }}
    >
      <div aria-hidden="true" className="soil-line absolute inset-x-0 -top-0.75" />

      <p
        aria-hidden="true"
        className="absolute -top-8 inset-s-gutter font-mono text-[13px] text-ink-muted max-sm:-top-6 max-sm:text-[11px] max-sm:hidden"
      >
        {t('greeting')}
      </p>
      <p
        aria-hidden="true"
        className="absolute top-3.5 inset-e-gutter font-mono text-[13px] text-mist-3 max-sm:top-2.5 max-sm:text-[11px] max-sm:hidden "
      >
        {t('question')}
      </p>

      <Seed />
    </div>
  );
}
