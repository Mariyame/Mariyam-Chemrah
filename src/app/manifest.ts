import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Mariyam Chemrah — Senior Full-Stack Engineer",
    short_name: "Mariyam",
    description:
      "Senior full-stack engineer — SaaS, APIs and e-commerce with Laravel, Symfony, React and Next.js.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    lang: "en",
    dir: "ltr",
    background_color: "#0D1411",
    theme_color: "#0D1411",
    categories: ["portfolio", "business", "developer"],
    icons: [
      { src: "/brand/favicon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" },
      { src: "/icons/icon-192.png", type: "image/png", sizes: "192x192", purpose: "any" },
      { src: "/icons/icon-512.png", type: "image/png", sizes: "512x512", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", type: "image/png", sizes: "512x512", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Hire an engineer", short_name: "Hire", url: "/hire" },
      { name: "Start a project", short_name: "Work", url: "/work" },
    ],
  };
}