export const HERO_CHIP_KEYS = ["remote", "hours", "languages"] as const;

export const GLANCE_KEYS = ["years", "php", "react", "endToEnd"] as const;

export const CANOPY = {
  primary: ["React", "Next.js", "TypeScript"],
  secondary: ["JavaScript ES6+", "Tailwind CSS", "HTML5 / CSS3", "Twig"],
} as const;

export const ROOTS: readonly { key: string; items: readonly string[] }[] = [
  { key: "backend", items: ["PHP 8+", "Laravel", "Symfony", "API Platform", "Python", "FastAPI"] },
  { key: "data", items: ["MySQL", "MongoDB", "Redis", "ORM"] },
  { key: "devops", items: ["Docker", "Git / GitHub", "Google Cloud Platform"] },
  { key: "integrations", items: ["GA4 APIs", "Google Admin API", "PayPal", "CMI", "WordPress", "Sylius"] },
];


export const JOBS: readonly { key: string; bullets?: number }[] = [
  { key: "independent" },
  { key: "autoDealers", bullets: 5 },
  { key: "delit" },
  { key: "myWall" },
  { key: "irma" },
];

export const PRACTICE_KEYS = ["solid", "review", "performance", "docs"] as const;

export const DEGREE_KEYS = ["bachelor", "technician"] as const;
export const CERT_KEYS = ["delf", "voxy", "duolingo"] as const;


export const LANGUAGES: readonly { key: string; level: number }[] = [
  { key: "arabic", level: 100 },
  { key: "french", level: 78 },
  { key: "english", level: 72 },
];
