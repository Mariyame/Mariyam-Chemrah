import Link from "next/link";
import { LogoMark } from "./Logo";

const LOCALES = [
  { code: "en", label: "EN", href: "/" },
  { code: "fr", label: "FR", href: "/fr" },
  { code: "ar", label: "العربية", href: "/ar" },
] as const;


export function Header({ locale = "en" }: { locale?: string }) {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-20">
      <div className="container-page flex items-center justify-between py-5">
        <span className="flex items-center gap-3 text-forest-ink">
          <LogoMark size={38} />
          <span className="font-display text-[19px] font-semibold tracking-[-0.02em]">Mariyam Chemrah</span>
        </span>

        <nav aria-label="Language" className="pointer-events-auto flex gap-1.5">
          {LOCALES.map((l) => {
            const active = l.code === locale;
            return (
              <Link
                key={l.code}
                href={l.href}
                hrefLang={l.code}
                lang={l.code}
                aria-current={active ? "page" : undefined}
                className={`inline-flex h-10 min-w-11 items-center justify-center rounded-pill px-3 text-[13px] no-underline transition-colors ${
                  l.code === "ar" ? "font-arabic text-sm" : "font-mono"
                } ${
                  active
                    ? "bg-forest-ink text-paper hover:text-paper"
                    : "border-[1.5px] border-forest-ink text-forest-ink hover:bg-forest-ink hover:text-paper"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
