"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

const LOCALES = [
  { code: "en", short: "EN", label: "English", href: "/" },
  { code: "fr", short: "FR", label: "Français", href: "/fr" },
  { code: "ar", short: "ع", label: "العربية", href: "/ar" },
] as const;


export function LanguageSwitcher({ locale = "en" }: { locale?: string }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  // Close on outside tap and on Escape (focus returns to the button)
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
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

  const pill = (active: boolean) =>
    `inline-flex h-10 min-w-11 items-center justify-center rounded-pill px-3 text-[13px] no-underline transition-colors ${
      active
        ? "bg-forest-ink text-paper hover:text-paper"
        : "border-[1.5px] border-forest-ink text-forest-ink hover:bg-forest-ink hover:text-paper"
    }`;

  return (
    <nav aria-label="Language" className="pointer-events-auto">
      {/* ---- Desktop: pills ---- */}
      <ul className="hidden gap-1.5 sm:flex">
        {LOCALES.map((l) => (
          <li key={l.code}>
            <Link
              href={l.href}
              hrefLang={l.code}
              lang={l.code}
              aria-current={l.code === locale ? "page" : undefined}
              className={`${pill(l.code === locale)} ${l.code === "ar" ? "font-arabic text-sm" : "font-mono"}`}
            >
              {l.code === "ar" ? l.label : l.short}
            </Link>
          </li>
        ))}
      </ul>

      {/* ---- Mobile: dropdown ---- */}
      <div ref={wrap} className="relative sm:hidden">
        <button
          ref={button}
          type="button"
          aria-expanded={open}
          aria-controls={listId}
          aria-label={`Language: ${current.label}. Change language`}
          onClick={() => setOpen((o) => !o)}
          className="inline-flex h-11 min-w-12 items-center justify-center gap-1.5 rounded-pill border-[1.5px] border-forest-ink bg-paper/70 px-3.5 font-mono text-[13px] text-forest-ink backdrop-blur-sm"
        >
          {current.short}
          <svg
            aria-hidden="true"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-300 ease-grow ${open ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <ul
          id={listId}
          hidden={!open}
          className="absolute end-0 top-[calc(100%+8px)] z-30 min-w-40 overflow-hidden rounded-tile border border-line-light bg-paper py-1.5 shadow-float-strong animate-rise [animation-duration:.25s]"
        >
          {LOCALES.map((l) => {
            const active = l.code === locale;
            return (
              <li key={l.code}>
                <Link
                  href={l.href}
                  hrefLang={l.code}
                  lang={l.code}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-11 items-center justify-between gap-4 px-4 text-[15px] no-underline ${
                    active ? "font-semibold text-moss" : "text-forest-ink hover:bg-sage-paper hover:text-forest-ink"
                  } ${l.code === "ar" ? "font-arabic" : ""}`}
                >
                  <span>{l.label}</span>
                  <span className="font-mono text-xs text-ink-muted">
                    {active ? (
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-moss">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    ) : (
                      l.code.toUpperCase()
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
