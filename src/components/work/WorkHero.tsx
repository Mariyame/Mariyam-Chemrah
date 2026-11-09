import Image from "next/image";
import { useTranslations } from "next-intl";
import { CONTACT } from "@/config/site";
import { HERO_CHIPS, HERO_STAT_KEYS } from "@/content/work";
import { Icon } from "@/components/ui/Icon";
import { rich } from "@/lib/rich";
import { assets } from "config/assets";

export function WorkHero() {
  const t = useTranslations("Work.hero");

  return (
    <section id="top" className="container-page flex flex-wrap items-center gap-10 pt-6 sm:pt-10 lg:gap-12">
      {/* text */}
      <div className="flex min-w-0 flex-[1_1_30rem] flex-col gap-6 sm:gap-7">
        <p className="inline-flex items-center gap-2.5 self-start rounded-pill bg-bg-alt py-2 ps-2.5 pe-4 text-sm font-semibold">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-accent shadow-[0_0_0_4px_var(--color-lichen)]" />
          {t("badge")}
        </p>

        <h1 className="text-[clamp(2.75rem,6.4vw,5.5rem)] leading-[0.98] tracking-[-0.035em]">
          {t.rich("title", rich)}
        </h1>

        <p className="max-w-[34em] text-lead text-fg-muted">{t("intro")}</p>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={`mailto:${CONTACT.email}`} className="btn-primary">
            {t("ctaPrimary")}
            <Icon name="arrowRight" size={18} strokeWidth={2} className="rtl:-scale-x-100" />
          </a>
          <a href="#work" className="btn-outline">{t("ctaSecondary")}</a>
        </div>

        <dl className="gap-3 border-t border-line py-5 flex flex-wrap sm:gap-8">
          {HERO_STAT_KEYS.map((k) => (
            <div key={k} className="flex flex-col-reverse">
              <dt className="mt-1 text-xs leading-snug text-fg-muted sm:text-sm">{t(`stats.${k}.label`)}</dt>
              <dd className="font-display text-[26px] leading-none font-semibold sm:text-[32px]">{t(`stats.${k}.value`)}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* portrait on an organic pebble */}
      <div className="relative flex h-105 min-w-0 flex-[1_1_22rem] items-end justify-center sm:h-135 lg:h-155">
        <div aria-hidden="true" className="blob absolute inset-x-[6%] bottom-0 h-[82%] bg-lichen" />
        <Image
          src={assets.profile.nomadPortrait}
          alt={t("photoAlt")}
          width={1100}
          height={1374}
          priority
          sizes="(min-width: 1024px) 560px, 90vw"
          className="relative h-full w-auto max-w-full object-contain object-bottom"
        />
        <span className="float-badge inset-e-0s top-[32%] right-0 bg-white text-forest-ink max-sm:text-xs">
          <span aria-hidden="true" className="me-2 inline-block size-2 rounded-full bg-moss" />
          {HERO_CHIPS[0]}
        </span>
        <span className="float-badge inset-s-0 bottom-[16%] border-forest-ink bg-forest-ink text-mist [animation-delay:1.4s] max-sm:text-xs">
          <span aria-hidden="true" className="me-2 inline-block size-2 rounded-full bg-lichen" />
          {HERO_CHIPS[1]}
        </span>
      </div>
    </section>
  );
}
