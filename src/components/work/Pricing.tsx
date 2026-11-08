import { useTranslations } from "next-intl";
import { PLANS } from "@/content/work";
import { Section } from "@/components/ui/Section";

export function Pricing() {
  const t = useTranslations("Work.pricing");

  return (
    <Section id="pricing" eyebrow={t("eyebrow")} title={t("title")} className="pb-24 sm:pb-32">
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-[repeat(auto-fit,minmax(17rem,1fr))] md:gap-5">
        {PLANS.map(({ key, featured }) => (
          <li
            key={key}
            className={`flex flex-col gap-3 rounded-card p-6 sm:gap-4 sm:p-9 ${
              featured ? "bg-forest-ink text-mist md:-my-3 md:py-12" : "bg-white"
            }`}
          >
            {featured && (
              <span className="self-start rounded-pill bg-lichen px-3 py-1 text-[13px] font-bold text-forest-ink">{t("badge")}</span>
            )}
            <h3 className="text-[22px] sm:text-[26px]">{t(`plans.${key}.title`)}</h3>
            <p className="font-display text-[30px] leading-tight font-semibold tracking-[-0.02em] sm:text-[40px]">{t(`plans.${key}.price`)}</p>
            <p className={`text-[15px] sm:text-base ${featured ? "text-mist-2" : "text-ink-muted"}`}>{t(`plans.${key}.body`)}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
