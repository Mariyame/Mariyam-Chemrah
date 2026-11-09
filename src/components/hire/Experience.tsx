import { useTranslations } from "next-intl";
import { JOBS } from "@/content/hire";
import { Section } from "@/components/ui/Section";

/* Growth rings: the newest role has the most rings. */
function Rings({ count, size }: { count: number; size: number }) {
  const radii = [26, 21, 16, 11, 6].slice(5 - count);
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 56 56" fill="none" stroke="var(--color-glow)" strokeWidth="1.3" strokeOpacity={0.4 + count * 0.1} className="ring-icon shrink-0">
      {radii.map((r) => <circle key={r} cx="28" cy="28" r={r} />)}
      <circle cx="28" cy="28" r="2" fill="var(--color-glow)" />
    </svg>
  );
}

export function Experience() {
  const t = useTranslations("Hire.experience");

  return (
    <Section id="experience" eyebrow={t("eyebrow")} title={t("title")}>
      <ol className="border-b border-line">
        {JOBS.map(({ key, bullets }, i) => {
          const job = (k: string) => `jobs.${key}.${k}`;
          return (
            <li key={key} className="ring-row max-sm:flex-col max-sm:gap-2 max-sm:py-6">
              <div className="flex shrink-0 items-center gap-3 sm:w-56 sm:items-start sm:gap-4">
                <Rings count={JOBS.length - i} size={44} />
                <p className="font-mono text-[13px] leading-normal text-fg-muted sm:text-sm">
                  {t(job("period"), { present: t("present") })}
                </p>
              </div>
              <div className="min-w-0 flex-[1_1_auto">
                <h3 className="text-[22px] sm:text-[26px]">{t(job("role"))}</h3>
                <p className="mb-2 text-sm text-fg-muted sm:mb-3 sm:text-[15px]">{t(job("company"))}</p>
                {bullets ? (
                  <ul className="flex list-disc flex-col gap-1.5 ps-5 text-[15px] text-mist-2 sm:text-base">
                    {Array.from({ length: bullets }, (_, b) => (
                      <li key={b}>{t(job(`bullets.b${b + 1}`))}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[15px] text-mist-2 sm:text-base">{t(job("body"))}</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
