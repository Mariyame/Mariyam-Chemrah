
import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mariyamchemrah.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/en", priority: 1.0 },
    { path: "/en/hire", priority: 0.9 },
    { path: "/en/build", priority: 0.9 },
  ];

  return routes.map(({ path, priority }) => ({
    url: new URL(path, SITE_URL).toString(),
    changeFrequency: "monthly",
    priority,
  }));
}
