import type { Metadata } from "next";
import { getTranslations} from "next-intl/server";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Pricing } from "@/components/work/Pricing";
import { Process } from "@/components/work/Process";
import { Projects } from "@/components/work/Projects";
import { Services } from "@/components/work/Services";
import { StackStrip } from "@/components/work/StackStrip";
import { WorkContact } from "@/components/work/WorkContact";
import { WorkHero } from "@/components/work/WorkHero";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.work" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/work", languages: { en: "/work", fr: "/fr/work", ar: "/ar/work" } },
    openGraph: { url: "/work", title: t("title"), description: t("description") },
  };
}

/* "Above ground" — freelance clients. Light theme. */
export default async function WorkPage({ params }: Props) {
  const { locale } = await params;

  return (
    <div data-theme="work" className="min-h-dvh overflow-x-clip bg-bg text-fg">
      <SiteHeader page="work" />
      <main id="main">
        <WorkHero />
        <StackStrip />
        <Services />
        <Projects />
        <Process />
        <Pricing />
      </main>
      <WorkContact />
    </div>
  );
}
