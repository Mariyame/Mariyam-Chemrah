import { useTranslations } from "next-intl";
import { Seed } from "./Seed";

export function Horizon() {
  const t = useTranslations("Landing.horizon");
  return (
    <div className="pointer-events-none absolute inset-x-0 top-(--horizon) z-10 h-0 transition-[top] duration-800 ease-grow">
      <div aria-hidden="true" className="soil-line absolute inset-x-0 -top-0.75" />
      <p aria-hidden="true" className="absolute -top-8 inset-s-gutter font-mono text-[13px] text-ink-muted max-sm:hidden">
        {t("greeting")}
      </p>
      <p aria-hidden="true" className="absolute top-3.5 inset-e-gutter font-mono text-[13px] text-mist-3 max-sm:hidden">
        {t("question")}
      </p>
      <Seed />
    </div>
  );
}
