import Image from "next/image";
import { useTranslations } from "next-intl";
import { PROJECTS, type Project } from "@/content/work";
import { Section } from "@/components/ui/Section";

function Visual({ project, placeholder }: { project: Project; placeholder: string }) {
  const lichen = project.tone === "lichen";
  return (
    <div
      className={`relative flex min-h-55 flex-[1_1_28rem] items-center justify-center overflow-hidden sm:min-h-85 ${
        lichen ? "bg-lichen" : "bg-moss"
      }`}
    >
      {/* growth rings */}
      <svg aria-hidden="true" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        {[60, 100, 140].map((r, i) => (
          <circle key={r} cx="320" cy="250" r={r} fill="none" stroke={lichen ? "#14281D" : "#C9E26A"} strokeOpacity={0.18 - i * 0.04} strokeWidth="1.5" />
        ))}
      </svg>
      {project.image ? (
        <Image src={project.image} alt="" width={1280} height={800} className="relative w-[78%] rounded-2xl shadow-float-strong" />
      ) : (
        <div
          className={`relative flex aspect-16/10 w-[78%] items-center justify-center rounded-2xl border-2 border-dashed font-mono text-sm ${
            lichen ? "border-moss bg-paper text-forest-ink" : "border-lichen bg-forest-ink text-mist"
          }`}
        >
          {placeholder}
        </div>
      )}
    </div>
  );
}

function Tags({ tags, dark }: { tags: readonly string[]; dark?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag} className={`rounded-pill px-3.5 py-1.5 text-sm font-semibold ${dark ? "bg-[#22382A]" : "bg-sage-paper"}`}>
          {tag}
        </li>
      ))}
    </ul>
  );
}

export function Projects() {
  const t = useTranslations("Work.work");
  const features = PROJECTS.filter((p) => p.layout === "feature");
  const cards = PROJECTS.filter((p) => p.layout === "card");

  return (
    <Section id="work" eyebrow={t("eyebrow")} title={t("title")}>
      <div className="flex flex-col gap-6">
        {features.map((p, i) => {
          const dark = p.tone === "forest";
          return (
            <article
              key={p.key}
              className={`flex overflow-hidden rounded-panel ${dark ? "flex-wrap-reverse bg-forest-ink text-mist" : "flex-wrap bg-white"} ${
                i % 2 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <Visual project={p} placeholder={t("screenshot")} />
              <div className="flex flex-[1_1_26rem] flex-col justify-center gap-4 p-6 sm:p-12">
                <p className={`font-mono text-[13px] ${dark ? "text-lichen" : "text-moss"}`}>{t(`projects.${p.key}.category`)}</p>
                <h3 className="text-[26px] leading-tight sm:text-[34px]">{t(`projects.${p.key}.title`)}</h3>
                <p className={dark ? "text-mist-2" : "text-ink-muted"}>{t(`projects.${p.key}.body`)}</p>
                <Tags tags={p.tags} dark={dark} />
              </div>
            </article>
          );
        })}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cards.map((p) => (
            <article key={p.key} className="flex flex-col gap-3.5 rounded-panel bg-white p-6 sm:p-10">
              <p className="font-mono text-[13px] text-moss">{t(`projects.${p.key}.category`)}</p>
              <h3 className="text-2xl sm:text-[28px]">{t(`projects.${p.key}.title`)}</h3>
              <p className="text-ink-muted">{t(`projects.${p.key}.body`)}</p>
              <p className="font-mono text-[13px] text-ink-muted">{p.tags.join(" · ")}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
