import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { CONTACT, LINKS } from "@/config/site";
import { HERO_CHIP_KEYS } from "@/content/hire";
import { Icon } from "@/components/ui/Icon";
import { rich } from "@/lib/rich";
import { assets } from "config/assets";


const RINGS = [
  { r: 110, o: 0.5 }, { r: 140, o: 0.32 }, { r: 168, o: 0.22 },
  { r: 194, o: 0.14 }, { r: 218, o: 0.09 }, { r: 240, o: 0.05 },
];

export function HireHero() {
  const t = useTranslations("Hire.hero");
  const c = useTranslations("Common.links");
  const locale = useLocale();
  const resume = locale === "fr" ? assets.documents.fr : assets.documents.en;

  return (
    <section id="top" className="container-page flex flex-wrap-reverse items-center gap-10 pt-4 sm:pt-8">
      {/* text */}
      <div className="flex min-w-0 flex-[1_1_34rem] animate-rise flex-col gap-6 sm:gap-7">
        <p className="prompt text-[15px]">
          <span className="text-accent">~/mariyam</span> {t("prompt")}
        </p>

        <h1 className="text-[clamp(1.75rem,4.6vw,5rem)] leading-[0.95] tracking-[-0.04em]">{t.rich("title", rich)}</h1>

        <p className="max-w-[36em] text-lead text-mist-2">{t("intro")}</p>

        <ul className="flex flex-wrap gap-2.5">
          {HERO_CHIP_KEYS.map((k, i) => (
            <li key={k} className="chip text-[13px] sm:text-sm">
              {i === 0 && <span aria-hidden="true" className="chip-dot" />}
              {t(`chips.${k}`)}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={`mailto:${CONTACT.email}`} className="btn-primary font-bold">
            {t("ctaPrimary")}
            <Icon name="arrowRight" size={18} strokeWidth={2} className="rtl:-scale-x-100" />
          </a>
          <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-3 sm:pb-0 pb-6">
            <a href={resume} download className="btn-outline px-3 py-0 text-sm sm:hidden">{c("resume")}</a>
            <a href={LINKS.github} className="btn-outline px-3 text-sm sm:px-6 py-0 sm:text-base">
              <Icon name="github" size={18} className="max-sm:hidden" />
              {c("github")}
            </a>
            <a href={LINKS.linkedin} className="btn-outline px-3 text-sm py-0 sm:px-6 sm:text-base">
              <Icon name="linkedin" size={18} className="max-sm:hidden" />
              {c("linkedin")}
            </a>
          </div>
        </div>
      </div>

      {/* portrait inside growth rings */}
      <div className="relative flex h-110 min-w-0 flex-[1_1_24rem] animate-rise items-end justify-center [animation-delay:250ms] sm:h-160 lg:h-195">
        <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
          <svg viewBox="0 0 500 500" className="w-[118%] max-w-none animate-breathe translate-y-[-4%]">
            <circle cx="250" cy="250" r="110" className="fill-surface" />
            {RINGS.map(({ r, o }) => (
              <circle key={r} cx="250" cy="250" r={r} fill="none" stroke="var(--color-glow)" strokeOpacity={o} strokeWidth="1.2" />
            ))}
            <circle cx="390" cy="152" r="4" fill="var(--color-glow)" className="animate-twinkle" />
            <circle cx="98" cy="330" r="3" fill="var(--color-glow)" className="animate-twinkle [animation-delay:.8s]" />
            <circle cx="300" cy="470" r="2.5" fill="var(--color-glow)" className="animate-twinkle [animation-delay:1.6s]" />
          </svg>
        </div>

        <Image
          src={assets.profile.professionalPortrait}
          alt={t("photoAlt")}
          width={1000}
          height={1882}
          priority
          sizes="(min-width: 1024px) 420px, 60vw"
          className="fade-bottom relative h-full w-auto max-w-full object-contain object-bottom"
        />

        <p className="float-badge inset-e-0 top-[16%] max-sm:text-xs">
          <span className="block text-fg-muted">{t("badges.experienceLabel")}</span>
          {t.rich("badges.experienceValue", rich)}
        </p>
        <p className="float-badge inset-s-0 bottom-[14%] [animation-delay:1.4s] max-sm:text-xs">
          <span className="block text-fg-muted">{t("badges.statusLabel")}</span>
          <span aria-hidden="true" className="me-1.5 text-accent animate-twinkle">●</span>
          {t("badges.statusValue")}
        </p>
      </div>
    </section>
  );
}
