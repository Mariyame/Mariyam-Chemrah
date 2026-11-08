import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  introSide = false,
  className = "",
  children,
}: {
  id?: string;
  eyebrow: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  /** desktop: intro sits beside the title instead of under it */
  introSide?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={`container-page scroll-mt-24 pt-20 pb-10 sm:pt-28 ${className}`}>
      <header className={introSide ? "mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-12" : "mb-10 sm:mb-14"}>
        <div className={introSide ? "min-w-0 flex-[1_1_32rem]" : ""}>
          <p className="eyebrow mb-3.5">{eyebrow}</p>
          <h2 id={headingId} className="max-w-[16em]">{title}</h2>
        </div>
        {intro && (
          <p className={`text-fg-muted ${introSide ? "max-w-[28em] flex-[1_1_20rem]" : "mt-4 max-w-[38em]"}`}>{intro}</p>
        )}
      </header>
      {children}
    </section>
  );
}
