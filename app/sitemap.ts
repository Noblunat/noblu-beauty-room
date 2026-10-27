import type { MetadataRoute } from "next"
import { contentRevisions } from "./lib/contentRevisions"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://noblu.pl"

  // Explicit content revisions remain stable across builds and requests.
  const pages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/manicure-krakow`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/stylizacja-rzes-krakow`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/przedluzanie-rzes-krakow`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pedicure-krakow`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/cennik`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rezerwacja`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
  return pages.map(entry => ({ ...entry, lastModified: contentRevisions[entry.url.slice(baseUrl.length) || "/"].date }))
}
