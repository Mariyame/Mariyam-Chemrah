import type { CSSProperties } from "react";


export type Side = "sky" | "soil";
export type Hover = Side | null;
export type Path = "work" | "hire";

export const ROUTES: Record<Side, `/${Path}`> = { sky: "/work", soil: "/hire" };
export const PATH_OF: Record<Side, Path> = { sky: "work", soil: "hire" };


export const FLOOD: Record<Path, string> = {
  work: "var(--color-paper)",
  hire: "var(--color-night-soil)",
};


const SCENE = {
  idle: { sky: 1,    sun: "22%", stem: 42, leafA: 0.7, leafB: 0.45, leafC: 0, roots: 60, lantern: "0px" },
  sky:  { sky: 1.32, sun: "10%", stem: 0,  leafA: 1,   leafB: 1,    leafC: 1, roots: 88, lantern: "0px" },
  soil: { sky: 0.68, sun: "46%", stem: 80, leafA: 0,   leafB: 0,    leafC: 0, roots: 0,  lantern: "210px" },
} as const;


export function sceneVars(hover: Hover): CSSProperties {
  const s = SCENE[hover ?? "idle"];
  return {
    "--sky": s.sky,
    "--soil": 2 - s.sky,
    "--horizon": `${(s.sky / 2) * 100}%`,
    "--sun-top": s.sun,
    "--stem-offset": s.stem,
    "--leaf-a": s.leafA,
    "--leaf-b": s.leafB,
    "--leaf-c": s.leafC,
    "--root-offset": s.roots,
    "--lr": s.lantern,
  } as CSSProperties;
}


export const WHEN_OTHER_CHOSEN = {
  sky: {
    fold: "group-data-[hover=soil]/scene:grid-rows-[0fr] group-data-[hover=soil]/scene:opacity-0",
    title: "group-data-[hover=soil]/scene:scale-[0.78]",
    pad: "group-data-[hover=soil]/scene:pb-14",
    hide: "group-data-[hover=soil]/scene:opacity-0",
  },
  soil: {
    fold: "group-data-[hover=sky]/scene:grid-rows-[0fr] group-data-[hover=sky]/scene:opacity-0",
    title: "group-data-[hover=sky]/scene:scale-[0.78]",
    pad: "group-data-[hover=sky]/scene:pt-14",
    hide: "group-data-[hover=sky]/scene:opacity-0",
  },
} as const;
