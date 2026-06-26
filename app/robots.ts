import type { MetadataRoute } from "next"

export default function robots() {
  const allowSite = {
    allow: "/",
  }

  return {
    rules: [
      {
        userAgent: "*",
        ...allowSite,
      },
      {
        userAgent: "OAI-SearchBot",
        ...allowSite,
      },
      {
        userAgent: "GPTBot",
        ...allowSite,
      },
      {
        userAgent: "ChatGPT-User",
        ...allowSite,
      },
    ],
    sitemap: "https://noblu.pl/sitemap.xml",
  } satisfies MetadataRoute.Robots
}
