"use client";

import { useCallback, useState, type MouseEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import { Header } from "./Header";
import { Horizon } from "./Horizon";
import { Sky } from "./Sky";
import { Soil, type Hover } from "./Soil";
import { prefersReducedMotion, rememberChoice, type Path } from "@/lib/choice";


const FLOOD: Record<Path, string> = {
  work: "var(--color-paper)",
  hire: "var(--color-night-soil)",
};


type Chosen = { path: Path; x: number; y: number; open: boolean } | null;


export function ForkScene() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const [hover, setHover] = useState<Hover>(null);
  const [chosen, setChosen] = useState<Chosen>(null);

  const sky = hover === "sky" ? 1.32 : hover === "soil" ? 0.68 : 1;

  const handleHover = useCallback(
    (h: Hover) => {
      setHover(h);
      if (h) router.prefetch(h === "sky" ? "/work" : "/hire");
    },
    [router],
  );

  const handleChoose = useCallback(
    (path: Path, e: MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      rememberChoice(path);

      if (prefersReducedMotion()) {
        router.push(`/${path}`);
        return;
      }
      // keyboard "click" has no coordinates → expand from the centre
      const x = e.clientX || window.innerWidth / 2;
      const y = e.clientY || window.innerHeight / 2;
      setChosen({ path, x, y, open: false });
      // next frame: start the expansion (so the transition runs from 0)
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setChosen((c) => (c ? { ...c, open: true } : c))),
      );
    },
    [router],
  );

  return (
    <main
      id="main"
      className="relative flex h-dvh min-h-160 flex-col overflow-hidden bg-night-soil sm:min-h-190"
      style={{ ["--horizon" as string]: `${(sky / 2) * 100}%` }}
    >
      <h1 className="sr-only">Mariyam Chemrah — choose your path: start a project or hire an engineer</h1>

      <Sky hover={hover} onHover={handleHover} onChoose={handleChoose} grow={sky} />
      <Soil hover={hover} onHover={handleHover} onChoose={handleChoose} grow={2 - sky} />

      <Horizon />
      <Header locale={locale} />

      {chosen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-50 transition-[clip-path] duration-700 ease-grow"
          style={{
            background: FLOOD[chosen.path],
            clipPath: `circle(${chosen.open ? "150%" : "0%"} at ${chosen.x}px ${chosen.y}px)`,
          }}
          onTransitionEnd={() => router.push(`/${chosen.path}`)}
        />
      )}
    </main>
  );
}
