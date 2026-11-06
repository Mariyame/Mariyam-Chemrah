import type { Metadata } from "next";
import {useTranslations} from 'next-intl';
import Link from "next/link";
import { ForkScene } from "@/components/landing/ForkScene";

export const metadata: Metadata = {
  title: { absolute: "Mariyam Chemrah — Senior Full-Stack Engineer · Choose your path" },
  description:
    "Have an idea to grow, or hiring an engineer? Pick your path to Mariyam Chemrah’s freelance or engineering portfolio.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const t = useTranslations('Landing');
  return (
    <>
      <ForkScene />
      <noscript>
        <nav aria-label="Choose your path" className="container-page flex gap-4 py-8">
          <Link href="/work" className="btn-primary">{t('sky.cta')}</Link>
          <Link href="/hire" className="btn-outline">{t('soil.cta')}</Link>
        </nav>
      </noscript>
    </>
  );
}
