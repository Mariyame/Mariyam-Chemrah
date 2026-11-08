"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Icon } from "@/components/ui/Icon";

/* ≥ 640px: pill group.  < 640px: "EN ▾" disclosure with a list of links.
   Links keep the current page (/work ↔ /fr/work). Theme tokens → works on light & dark. */
export function LanguageSwitcher() {
  const t = useTranslations("Common");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => !wrap.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const short = (l: string) => t(`languages.${l}`);
  const name = (l: string) => t(`languageNames.${l}`);

  return (
    <nav aria-label={t("languageNav")}>
      {/* pills */}
      <ul className="hidden items-center gap-1 rounded-pill border border-line bg-surface p-1 sm:flex">
        {routing.locales.map((l) => {
          const active = l === locale;
          return (
            <li key={l}>
              <Link
                href={pathname}
                locale={l}
                hrefLang={l}
                lang={l}
                aria-current={active ? "page" : undefined}
                className={`inline-flex h-9 min-w-11 items-center justify-center rounded-pill px-3 text-[13px] no-underline transition-colors ${
                  l === "ar" ? "font-arabic text-sm" : "font-mono"
                } ${active ? "bg-fg text-bg hover:text-bg" : "text-fg hover:bg-bg-alt hover:text-fg"}`}
              >
                {short(l)}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* dropdown */}
      <div ref={wrap} className="relative sm:hidden">
        <button
          ref={button}
          type="button"
          aria-expanded={open}
          aria-controls={listId}
          aria-label={t("languageButton", { name: name(locale) })}
          onClick={() => setOpen((o) => !o)}
          className="inline-flex h-11 min-w-14 items-center justify-center gap-1.5 rounded-pill border-[1.5px] border-line-strong px-3 font-mono text-[13px] text-fg"
        >
          {locale === "ar" ? "ع" : short(locale)}
          <Icon name="chevronDown" size={12} strokeWidth={2.5} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
        <ul
          id={listId}
          hidden={!open}
        >
          {routing.locales.map((l) => {
            const active = l === locale;
            return (
              <li key={l}>
                <Link
                  href={pathname}
                  locale={l}
                  hrefLang={l}
                  lang={l}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-11 items-center justify-between gap-4 px-4 text-[15px] no-underline ${
                    active ? "font-semibold text-accent" : "text-fg hover:bg-bg-alt hover:text-fg"
                  } ${l === "ar" ? "font-arabic" : ""}`}
                >
                  <span>{name(l)}</span>
                  {active ? <Icon name="check" size={16} strokeWidth={2.5} /> : <span className="font-mono text-xs text-fg-muted">{l.toUpperCase()}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
