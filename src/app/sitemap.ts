import type { MetadataRoute } from "next";
import { projects } from "@/lib/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL || "https://develoverz.netlify.app";
  return [
    { url: new URL("/", base).href, changeFrequency: "monthly", priority: 1 },
    ...projects.map(({ slug }) => ({ url: new URL(`/projects/${slug}`, base).href, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}