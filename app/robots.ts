
import { business } from "./lib/business";
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
    sitemap: `${business.url}/sitemap.xml`,
  } satisfies MetadataRoute.Robots
}
