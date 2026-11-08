import { useTranslations } from "next-intl";
import { STACK_STRIP } from "@/content/work";

export function StackStrip() {
  const t = useTranslations("Work.stackStrip");
  return (
    <div className="mt-12 bg-forest-ink text-mist sm:mt-0">
      <div className="container-page flex flex-col gap-3 py-5 font-mono text-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-8">
        <p className="text-lichen">
          {t("label")} <span aria-hidden="true" className="sm:hidden">↓</span>
          <span aria-hidden="true" className="max-sm:hidden rtl:inline-block rtl:-scale-x-100">→</span>
        </p>
        <ul className="flex flex-wrap gap-2 sm:contents">
          {STACK_STRIP.map((tech) => (
            <li key={tech} className="rounded-lg border border-line-dark-3 px-2.5 py-1 sm:border-0 sm:p-0">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
