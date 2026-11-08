import { useTranslations } from "next-intl";
import { NAV, LINKS, type Page } from "@/config/site";
import { Icon } from "@/components/ui/Icon";
import { LogoMark } from "@/components/ui/LogoMark";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

/* Shared header for /work and /hire. Server component; only the language
   switcher and the mobile menu are client islands. */
export function SiteHeader({ page }: { page: Page }) {
  const t = useTranslations(page === "work" ? "Work.nav" : "Hire.nav");
  const c = useTranslations("Common");

  const links = NAV[page].map((item) => (
    <a key={item.id} href={`#${item.id}`} className="no-underline">
      {t(item.key)}
    </a>
  ));

  const cta =
    page === "work" ? (
      <a href="#contact" className="btn-inverse px-5 py-3 text-[15px]">{t("cta")}</a>
    ) : (
      <a href={LINKS.resume} download className="btn-outline border-accent px-5 py-3 text-[15px] text-accent">
        <Icon name="download" size={16} strokeWidth={2} />
        {t("resume")}
      </a>
    );

  return (
    <header className="relative z-30">
      <div className="container-page flex items-center justify-between gap-4 py-4 sm:py-5">
        <a href="#top" className="flex min-w-0 items-center gap-2.5 text-fg no-underline sm:gap-3">
          <LogoMark size={36} className="max-sm:size-[30px]" />
          <span className="truncate font-display text-[17px] font-semibold tracking-[-0.02em] sm:text-xl">{c("name")}</span>
        </a>

        <div className="flex items-center gap-3 lg:gap-7">
          <nav aria-label={c("mainNav")} className="hidden items-center gap-7 text-[15px] font-medium lg:flex">
            {links}
            {cta}
          </nav>
          <LanguageSwitcher />
          <MobileMenu>
            <nav aria-label={c("mainNav")} className="flex flex-col gap-1 text-lg font-medium">
              {links.map((l) => (
                <span key={l.key} className="border-b border-line py-3 [&>a]:block">{l}</span>
              ))}
              <div className="pt-4">{cta}</div>
            </nav>
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}
