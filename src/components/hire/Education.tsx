import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { CERT_KEYS, DEGREE_KEYS, LANGUAGES } from "@/content/hire";
import { Section } from "@/components/ui/Section";

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-card border border-line p-5 sm:p-7">
      <h3 className="font-mono text-xs font-medium tracking-[0.12em] text-fg-muted uppercase sm:text-[13px]">{title}</h3>
      {children}
    </div>
  );
}

function Entry({ title, detail }: { title: string; detail: string }) {
  return (
    <div>
      <p className="font-bold">{title}</p>
      <p className="text-sm text-fg-muted sm:text-[15px]">{detail}</p>
    </div>
  );
}

export function Education() {
  const t = useTranslations("Hire.education");

  return (
    <Section id="education" eyebrow={t("eyebrow")} title={t("title")} className="pb-24 sm:pb-32">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] md:gap-4">
        <Panel title={t("headings.education")}>
          {DEGREE_KEYS.map((k) => <Entry key={k} title={t(`degrees.${k}.title`)} detail={t(`degrees.${k}.school`)} />)}
        </Panel>

        <Panel title={t("headings.certifications")}>
          {CERT_KEYS.map((k) => <Entry key={k} title={t(`certs.${k}.title`)} detail={t(`certs.${k}.detail`)} />)}
        </Panel>

        <Panel title={t("headings.languages")}>
          <ul className="flex flex-col gap-3.5">
            {LANGUAGES.map(({ key, level }) => (
              <li key={key}>
                <div className="flex justify-between gap-3 font-bold">
                  <span>{t(`languages.${key}.name`)}</span>
                  <span className="font-mono text-sm font-normal text-fg-muted">{t(`languages.${key}.level`)}</span>
                </div>
                <div
                  role="meter"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={level}
                  aria-label={t(`languages.${key}.name`)}
                  className="mt-2 h-1 rounded bg-line"
                >
                  <div className="h-1 rounded bg-accent" style={{ width: `${level}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </Section>
  );
}
