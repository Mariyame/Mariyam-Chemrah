import type { IconName } from "@/components/ui/Icon";

/* Structure of the Work page. Keys point into messages → Work.*.
   Only proper nouns (tech names) live here — they are the same in every language. */

export const HERO_STAT_KEYS = ["years", "fullStack", "languages"] as const;

export const HERO_CHIPS = ["Laravel · Symfony", "React · Next.js · TS"] as const;

export const STACK_STRIP = [
  "PHP 8", "Laravel", "Symfony", "React", "Next.js", "TypeScript",
  "WordPress", "MySQL", "MongoDB", "Docker", "GCP",
] as const;

export const SERVICES: readonly { key: string; icon: IconName }[] = [
  { key: "apps", icon: "monitor" },
  { key: "apis", icon: "nodes" },
  { key: "websites", icon: "leaf" },
  { key: "ecommerce", icon: "cart" },
  { key: "analytics", icon: "chart" },
  { key: "care", icon: "heart" },
];

export type Project = {
  key: string;
  tags: readonly string[];
  /** "feature" = large card with visual; "card" = compact text card */
  layout: "feature" | "card";
  tone?: "lichen" | "forest";
  /** optional screenshot in /public; a labelled placeholder is shown otherwise */
  image?: string;
  href?: string;
};

export const PROJECTS: readonly Project[] = [
  { key: "rivulet", tags: ["Laravel", "React Native", "Next.js"], layout: "feature", tone: "lichen", image: "/images/projects/rivulet/cover-app.webp", href: "https://rivulet-three.vercel.app/" },
  { key: "emi", tags: ["Laravel", "Next.js", "CMS"], layout: "feature", tone: "forest", image: "/images/projects/emi/cover.webp", href: "https://www.europemarocimmo.com/" },
  { key: "myWall", tags: ["Laravel", "PayPal", "CMI"], layout: "feature", tone: "lichen", image: "/images/projects/myWall/cover.webp", href: "https://my-wall.fr" },
  { key: "add", tags: ["Laravel queues", "WordPress", "Webhooks"], layout: "feature", tone: "forest", image: "/images/projects/add/cover.webp", href: "https://www.autodealersdigital.com/" },
  { key: "ga4", tags: ["PHP", "GA4 Admin & Data APIs"], layout: "card" },
  { key: "leadTracking", tags: ["JavaScript", "MongoDB", "Python / FastAPI"], layout: "card" },
];

export const PROCESS: readonly { key: string; icon: IconName }[] = [
  { key: "seed", icon: "seed" },
  { key: "root", icon: "roots" },
  { key: "grow", icon: "sprout" },
  { key: "bloom", icon: "bloom" },
];

export const PLANS: readonly { key: string; featured?: boolean }[] = [
  { key: "fixed" },
  { key: "monthly", featured: true },
  { key: "consulting" },
];
