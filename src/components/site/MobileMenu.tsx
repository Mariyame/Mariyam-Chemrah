"use client";

import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

/* Below lg: a round menu button opening a full-width panel under the header.
   Receives the already-translated links from the server (children). */
export function MobileMenu({ children }: { children: ReactNode }) {
  const t = useTranslations("Common");
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? t("closeMenu") : t("openMenu")}
        onClick={() => setOpen((o) => !o)}
        className="grid size-12 place-items-center rounded-full border-[1.5px] border-line-strong text-fg"
      >
        <Icon name={open ? "close" : "menu"} size={20} strokeWidth={2} />
      </button>

      <div
        id={panelId}
        hidden={!open}
        // close after following an in-page link
        onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}
        className="absolute inset-x-0 top-full z-30 border-y border-line bg-bg px-[var(--spacing-gutter)] py-6 shadow-float animate-rise [animation-duration:.25s]"
      >
        {children}
      </div>
    </div>
  );
}
