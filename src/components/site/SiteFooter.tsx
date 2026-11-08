import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CONTACT, LINKS, ROUTES, type Page } from "@/config/site";

/* Bottom line of both pages: copyright · links · switch to the other path. */
export function SiteFooter({ page, location }: { page: Page; location: string }) {
  const c = useTranslations("Common");
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line pt-7 text-sm text-fg-muted">
      <span>
        {c("copyright", { year })} · {location}
      </span>
      <nav aria-label={c("mainNav")} className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <a href={LINKS.linkedin} className="text-fg">{c("links.linkedin")}</a>
        <a href={LINKS.github} className="text-fg">{c("links.github")}</a>
        {page === "work" ? (
          <a href={LINKS.freelancePlatforms} className="text-fg">{c("links.freelancePlatforms")}</a>
        ) : (
          <a href={`tel:${CONTACT.phone}`} className="text-fg">{c("links.call")}</a>
        )}
        <Link href={page === "work" ? ROUTES.hire : ROUTES.work} className="font-semibold text-accent">
          {page === "work" ? c("switchPath.toHire") : c("switchPath.toWork")} →
        </Link>
      </nav>
    </div>
  );
}
