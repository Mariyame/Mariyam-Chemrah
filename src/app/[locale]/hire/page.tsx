import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Education } from "@/components/hire/Education";
import { Experience } from "@/components/hire/Experience";
import { Glance } from "@/components/hire/Glance";
import { HireContact } from "@/components/hire/HireContact";
import { HireHero } from "@/components/hire/HireHero";
import { Practice } from "@/components/hire/Practice";
import { StackRoots } from "@/components/hire/StackRoots";
import { SiteHeader } from "@/components/site/SiteHeader";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.hire" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/hire", languages: { en: "/hire", fr: "/fr/hire", ar: "/ar/hire" } },
    openGraph: { url: "/hire", title: t("title"), description: t("description") },
  };
}

/* "Below ground" — tech recruiters. Dark theme. */
export default async function HirePage({ params }: Props) {
  const { locale } = await params;


  return (
    <div data-theme="hire" className="min-h-dvh overflow-x-clip bg-bg text-fg">
      <SiteHeader page="hire" />
      <main id="main">
        <HireHero />
        <Glance />
        <StackRoots />
        <Experience />
        <Practice />
        <Education />
      </main>
      <HireContact />
    </div>
  );
}
