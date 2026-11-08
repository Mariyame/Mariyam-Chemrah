import { useTranslations } from "next-intl";
import { CONTACT } from "@/config/site";
import { SiteFooter } from "@/components/site/SiteFooter";
import { rich } from "@/lib/rich";

export function WorkContact() {
  const t = useTranslations("Work.contact");
  const c = useTranslations("Common");

  return (
    <section id="contact" aria-labelledby="contact-title" data-theme="hire" className="relative overflow-hidden bg-forest-ink text-mist">
      {/* growth rings */}
      <svg aria-hidden="true" viewBox="0 0 600 600" className="pointer-events-none absolute -inset-e-48 -top-36 size-115 opacity-[0.12] sm:size-160">
        {[80, 140, 200, 260].map((r) => (
          <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="#C9E26A" strokeWidth="2" />
        ))}
      </svg>

      <div className="container-page relative flex flex-col gap-12 pt-20 pb-10 sm:gap-14 sm:pt-28">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <h2 id="contact-title" className="min-w-0 flex-[1_1_32rem] text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.04em]">
            {t.rich("title", { ...rich, accent: (ch) => <span className="accent-word text-lichen">{ch}</span> })}
          </h2>
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-[0_1_24rem]">
            <p className="text-mist-2">{t("body", { responseTime: t("responseTime") })}</p>
            <a href={`mailto:${CONTACT.email}`} className="btn-highlight break-all">
              <span className="sm:hidden">{c("links.emailMe")}</span>
              <span className="hidden sm:inline">{CONTACT.email}</span>
            </a>
            <a href={`tel:${CONTACT.phone}`} className="btn-outline border-line-dark-3 text-mist">
              {c("links.callMe", { phone: CONTACT.phoneDisplay })}
            </a>
          </div>
        </div>
        <SiteFooter page="work" location={t("footer")} />
      </div>
    </section>
  );
}
