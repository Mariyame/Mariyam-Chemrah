import { useTranslations } from "next-intl";
import { PRACTICE_KEYS } from "@/content/hire";
import { Section } from "@/components/ui/Section";

export function Practice() {
  const t = useTranslations("Hire.practice");
  return (
    <Section id="practice" eyebrow={t("eyebrow")} title={t("title")}>
      <ul className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
        {PRACTICE_KEYS.map((k) => (
          <li key={k} className="card card-hover flex flex-col gap-1.5 rounded-tile p-4 sm:gap-2.5 sm:rounded-card sm:p-7">
            <code className="text-xs text-accent sm:text-sm">{t(`items.${k}.code`)}</code>
            <h3 className="text-lg sm:text-[22px]">{t(`items.${k}.title`)}</h3>
            <p className="text-sm leading-normal text-mist-2 sm:text-base sm:leading-relaxed">{t(`items.${k}.body`)}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
