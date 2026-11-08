export const CONTACT = {
  email: "mariam.chemrah@gmail.com",
  phone: "+212640505810",
  phoneDisplay: "+212 640 505 810",
} as const;

export const LINKS = {
  linkedin: "https://www.linkedin.com/in/mariyam-chemrah-2a236199/",
  github: "https://github.com/Mariyame",
  freelancePlatforms: "mariam.chemrah@gmail.com",
  resume: "/cv/mariyam-chemrah.pdf",
} as const;

export const ROUTES = {
  home: "/",
  work: "/work",
  hire: "/hire",
  chooseAgain: "/?choose",
} as const;

export type Page = "work" | "hire";

/** In-page navigation: section id → key in `<Page>.nav.<key>` */
export const NAV: Record<Page, readonly { id: string; key: string }[]> = {
  work: [
    { id: "services", key: "services" },
    { id: "work", key: "work" },
    { id: "process", key: "process" },
    { id: "pricing", key: "pricing" },
  ],
  hire: [
    { id: "stack", key: "stack" },
    { id: "experience", key: "experience" },
    { id: "practice", key: "practice" },
    { id: "education", key: "education" },
  ],
};
