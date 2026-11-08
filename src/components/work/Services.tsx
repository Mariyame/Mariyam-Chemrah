import { useTranslations } from "next-intl";
import { SERVICES } from "@/content/work";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";

export function Services() {
  const t = useTranslations("Work.services");

  return (
    <Section id="services" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} introSide>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] sm:gap-5">
        {SERVICES.map(({ key, icon }) => (
          <li
            key={key}
            className="card card-hover flex gap-4 border-transparent p-5 sm:flex-col sm:gap-3.5 sm:p-8"
          >
            <Icon name={icon} size={32} strokeWidth={1.6} className="text-accent" />
            <div>
              <h3 className="mb-1 text-xl sm:text-2xl">{t(`items.${key}.title`)}</h3>
              <p className="text-[15px] text-fg-muted sm:text-base">{t(`items.${key}.body`)}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
