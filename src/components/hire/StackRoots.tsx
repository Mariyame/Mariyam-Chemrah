import { useTranslations } from "next-intl";
import { CANOPY, ROOTS } from "@/content/hire";
import { Section } from "@/components/ui/Section";

/* Canopy (front end) above the soil line, roots (back end…) below it.
   Desktop: roots fan out from one SVG. Phone: one vertical root with branches. */
export function StackRoots() {
  const t = useTranslations("Hire.stack");

  return (
    <Section id="stack" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
      {/* canopy */}
      <div className="rounded-t-card border border-line bg-surface p-5 sm:p-8">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2 sm:mb-5">
          <h3 className="text-xl sm:text-2xl">{t("canopy.title")}</h3>
          <span className="font-mono text-xs text-fg-muted sm:text-[13px]">{t("canopy.hint")}</span>
        </div>
        <ul className="flex flex-wrap gap-2 sm:gap-2.5">
          {CANOPY.primary.map((tech) => <li key={tech} className="tag-accent">{tech}</li>)}
          {CANOPY.secondary.map((tech) => <li key={tech} className="tag">{tech}</li>)}
        </ul>
      </div>

      {/* soil line */}
      <div className="flex items-center gap-3 bg-soil-deep px-5 py-3 font-mono text-[11px] tracking-[0.1em] text-soil-text uppercase sm:gap-4 sm:px-8 sm:py-3.5 sm:text-[13px] sm:tracking-[0.12em]">
        <span>{t("soilLine.label")}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-soil" />
        <span>{t("soilLine.protocols")}</span>
      </div>

      {/* roots */}
      <div className="relative rounded-b-card border border-t-0 border-line bg-bg-alt px-4 pb-4 sm:px-8 sm:pb-8">
        <svg aria-hidden="true" viewBox="0 0 1200 60" preserveAspectRatio="none" className="block h-12 w-full max-sm:hidden">
          <path
            d="M600 0 C600 30 150 20 150 60 M600 0 C600 30 450 30 450 60 M600 0 C600 30 750 30 750 60 M600 0 C600 30 1050 20 1050 60"
            fill="none"
            stroke="var(--color-glow)"
            strokeOpacity="0.45"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {/* phone: trunk on the start side */}
        <span aria-hidden="true" className="absolute start-5 top-0 bottom-10 w-px bg-glow/45 sm:hidden" />

        <ul className="grid grid-cols-1 gap-2.5 pt-4 ps-5 sm:grid-cols-2 sm:gap-4 sm:pt-0 sm:ps-0 lg:grid-cols-4">
          {ROOTS.map(({ key, items }) => (
            <li key={key} className="relative rounded-tile border border-line bg-surface p-4 sm:p-6">
              <span aria-hidden="true" className="absolute -start-[17px] top-6 h-px w-4 bg-glow/45 sm:hidden" />
              <h3 className="mb-1.5 text-lg sm:mb-3 sm:text-xl">{t(`roots.${key}`)}</h3>
              <p className="font-mono text-[13px] leading-[1.8] text-mist-2 sm:text-sm">{items.join(" · ")}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
