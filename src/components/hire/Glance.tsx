import { useTranslations } from "next-intl";
import { GLANCE_KEYS } from "@/content/hire";

/* Four facts. Phone: 2×2 grid with hairlines. Desktop: one row. */
export function Glance() {
  const t = useTranslations("Hire.glance");
  return (
    <section aria-label={t("ariaLabel")} className="border-y border-line bg-bg-alt">
      <dl className="container-page grid grid-cols-2 max-sm:px-0 lg:grid-cols-4">
        {GLANCE_KEYS.map((k, i) => (
          <div
            key={k}
            className={`flex flex-col-reverse px-5 py-6 sm:px-0 sm:py-8 sm:pe-6 ${
              i % 2 === 0 ? "max-sm:border-e max-sm:border-line" : ""
            } ${i < 2 ? "max-sm:border-b max-sm:border-line" : ""}`}
          >
            <dt className="mt-1.5 text-[13px] text-fg-muted sm:text-sm">{t(`items.${k}.label`)}</dt>
            <dd className="font-display text-[28px] leading-none font-semibold sm:text-[40px]">{t(`items.${k}.value`)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
