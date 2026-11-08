import type { ReactNode } from "react";

/* Shared renderers for the tags used in messages/*.json:
   <accent>…</accent>   italic accent word ("take root", "engineer.")
   <muted>…</muted>     softer part of a headline
   <br></br>            line break
   Use:  t.rich("hero.title", rich)  */
export const rich = {
  accent: (chunks: ReactNode) => <span className="accent-word">{chunks}</span>,
  muted: (chunks: ReactNode) => <span className="font-normal text-fg-muted">{chunks}</span>,
  br: () => <br />,
};
