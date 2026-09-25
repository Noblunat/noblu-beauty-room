import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://noblu.pl"

  return [
    {
      url: baseUrl,
      lastModified: "2026-09-25",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/manicure-krakow`,
      lastModified: "2026-09-25",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/stylizacja-rzes-krakow`,
      lastModified: "2026-09-25",
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/przedluzanie-rzes-krakow`,
      lastModified: "2026-09-25",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pedicure-krakow`,
      lastModified: "2026-09-25",
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/cennik`,
      lastModified: "2026-09-23",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rezerwacja`,
      lastModified: "2026-09-24",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      lastModified: "2026-09-23",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
