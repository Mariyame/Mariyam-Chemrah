import type { Metadata } from "next";
import Link from "next/link";
import { ForkScene } from "@/components/landing/ForkScene";

export const metadata: Metadata = {
  title: { absolute: "Mariyam Chemrah — Senior Full-Stack Engineer · Choose your path" },
  description:
    "Have an idea to grow, or hiring an engineer? Pick your path to Mariyam Chemrah’s freelance or engineering portfolio.",
  alternates: { canonical: "/" },
};

/* Server component: the fork is the only client island. The <noscript> links
   keep both paths reachable without JavaScript (and for crawlers). */
export default function Home() {
  return (
    <>
      <ForkScene locale="en" />
      <noscript>
        <nav aria-label="Choose your path" className="container-page flex gap-4 py-8">
          <Link href="/work" className="btn-primary">I have an idea to grow</Link>
          <Link href="/hire" className="btn-outline">I’m hiring an engineer</Link>
        </nav>
      </noscript>
    </>
  );
}
