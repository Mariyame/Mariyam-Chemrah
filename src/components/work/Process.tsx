import { useTranslations } from "next-intl";
import { PROCESS } from "@/content/work";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";

export function Process() {
  const t = useTranslations("Work.process");

  return (
    <Section id="process" eyebrow={t("eyebrow")} title={t("title")}>
      <ol className="ms-2 flex flex-col gap-7 border-s-2 border-accent ps-7 sm:ms-0 sm:grid sm:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] sm:gap-5 sm:border-s-0 sm:ps-0">
        {PROCESS.map(({ key, icon }, i) => (
          <li key={key} className="relative flex flex-col gap-2.5 sm:border-t-2 sm:border-fg sm:pt-6">
            <span
              aria-hidden="true"
              className={`absolute -start-[37px] top-1 size-4 rounded-full border-2 border-accent sm:hidden ${
                i === PROCESS.length - 1 ? "bg-accent" : "bg-lichen"
              }`}
            />
            <Icon name={icon} size={36} strokeWidth={1.5} className="text-accent max-sm:hidden" />
            <p className="font-mono text-[13px] text-accent">{t(`steps.${key}.label`)}</p>
            <h3 className="text-[21px] sm:text-2xl">{t(`steps.${key}.title`)}</h3>
            <p className="text-[15px] text-fg-muted sm:text-base">{t(`steps.${key}.body`)}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
