import { useLocale, useTranslations } from "next-intl";
import { CONTACT } from "@/config/site";
import { Icon } from "@/components/ui/Icon";
import { SiteFooter } from "@/components/site/SiteFooter";
import { rich } from "@/lib/rich";
import { assets } from "config/assets";

export function HireContact() {
  const t = useTranslations("Hire.contact");
  const c = useTranslations("Common.links");
  const locale = useLocale();                               
   const resume = locale === "fr" ? assets.documents.fr : assets.documents.en;

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line bg-bg-alt">
      <div className="container-page flex flex-col gap-12 pt-16 pb-10 sm:gap-14 sm:pt-28">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div className="min-w-0 flex-[1_1_32rem]">
            <p className="mb-5 font-mono text-[13px] text-fg-muted sm:text-[15px]">
              <span className="text-accent">~/mariyam</span> {t("prompt")}
            </p>
            <h2 id="contact-title" className="text-[clamp(2.75rem,6.4vw,5.75rem)] leading-[0.95] tracking-[-0.04em]">
              {t.rich("title", rich)}
            </h2>
          </div>
          <div className="flex w-full flex-col gap-3.5 sm:w-auto sm:flex-[0_1_24rem]">
            <a href={`mailto:${CONTACT.email}`} className="btn-primary font-bold break-all">
              <span className="sm:hidden">{c("emailMe")}</span>
              <span className="hidden sm:inline">{CONTACT.email}</span>
            </a>
            <a href={resume} download className="btn-outline">
              <Icon name="download" size={18} strokeWidth={2} />
              {c("downloadResume")}
            </a>
          </div>
        </div>
        <SiteFooter page="hire" location={t("relocation", { preference: t("relocationPreference") })} />
      </div>
    </section>
  );
}
